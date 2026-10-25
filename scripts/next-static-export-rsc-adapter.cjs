const fs = require('node:fs/promises')
const { getStaticExportRscTargetPath } = require('./next-static-export-rsc-path.cjs')

const adapter = {
  name: 'static-export-rsc-path-fix',

  async onBuildComplete({ outputs }) {
    let movedCount = 0

    for (const output of outputs.staticFiles) {
      const targetPath = getStaticExportRscTargetPath(output.filePath)
      if (!targetPath) continue

      try {
        await fs.access(targetPath)
        throw new Error(`Refusing to overwrite existing RSC payload: ${targetPath}`)
      } catch (error) {
        if (error.code !== 'ENOENT') throw error
      }

      await fs.rename(output.filePath, targetPath)
      output.filePath = targetPath
      movedCount += 1
    }

    if (movedCount > 0) {
      console.info(`Normalized ${movedCount} static RSC payload path(s) for export.`)
    }
  },
}

module.exports = adapter
