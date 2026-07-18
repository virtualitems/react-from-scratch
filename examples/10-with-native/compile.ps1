param(
  [Parameter(Position = 0)]
  [string]$EntryFile = "",

  [string]$ApplicationId = "com.reactfromscratch"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$InvocationDirectory = (Get-Location).Path
$ExampleDirectory = $PSScriptRoot
$ProjectRoot = (Resolve-Path (Join-Path $ExampleDirectory "..\..")).Path

if ([string]::IsNullOrWhiteSpace($EntryFile)) {
  $EntryFilePath = Join-Path $ExampleDirectory "index.js"
} elseif ([System.IO.Path]::IsPathRooted($EntryFile)) {
  $EntryFilePath = $EntryFile
} else {
  $EntryFilePath = Join-Path $InvocationDirectory $EntryFile
}

$EntryFilePath = (Resolve-Path $EntryFilePath).Path
$MetroConfig = (Resolve-Path (Join-Path $ExampleDirectory "metro.config.cjs")).Path
$AssetsDirectory = Join-Path $ProjectRoot "android\app\src\main\assets"
$BundleFile = Join-Path $AssetsDirectory "index.android.bundle"
$GradleWrapper = Join-Path $ProjectRoot "android\gradlew.bat"
$ApkFile = Join-Path $ProjectRoot "android\app\build\outputs\apk\debug\app-debug.apk"

function Assert-CommandSucceeded {
  param([string]$Step)

  if ($LASTEXITCODE -ne 0) {
    throw "$Step failed with exit code $LASTEXITCODE."
  }
}

if (-not (Test-Path $GradleWrapper)) {
  throw "android\gradlew.bat was not found under $ProjectRoot."
}

New-Item -ItemType Directory -Force $AssetsDirectory | Out-Null
Set-Location $ProjectRoot

Write-Host "Generating JavaScript bundle..."
& npx.cmd react-native bundle --config $MetroConfig --platform android --dev true --entry-file $EntryFilePath --bundle-output $BundleFile
Assert-CommandSucceeded "Bundle generation"

Write-Host "Building debug APK..."
& $GradleWrapper -p android :app:assembleDebug
Assert-CommandSucceeded "Android build"

if (-not (Test-Path $ApkFile)) {
  throw "APK was not found at $ApkFile."
}

Write-Host "Checking connected Android device..."
& adb.exe -d get-state
Assert-CommandSucceeded "Device detection"

Write-Host "Installing APK..."
& adb.exe -d install -r $ApkFile
Assert-CommandSucceeded "APK installation"

Write-Host "Launching application..."
& adb.exe -d shell am start -S -n "$ApplicationId/.MainActivity"
Assert-CommandSucceeded "Application launch"

Write-Host ""
Write-Host "Done."
Write-Host "Entry: $EntryFilePath"
Write-Host "Metro config: $MetroConfig"
Write-Host "APK: $ApkFile"
