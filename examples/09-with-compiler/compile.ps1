npx babel Counter.jsx `
  --out-dir . `
  --extensions .js,.mjs,.jsx `
  --out-file-extension .mjs `
  --plugins=babel-plugin-react-compiler,@babel/plugin-transform-react-jsx