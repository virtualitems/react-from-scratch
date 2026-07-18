const path = require('node:path')
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')

const projectRoot = path.resolve(__dirname, '..', '..')

module.exports = mergeConfig(getDefaultConfig(projectRoot), {
  projectRoot,
  resolver: {
    nodeModulesPaths: [path.join(projectRoot, 'node_modules')]
  }
})
