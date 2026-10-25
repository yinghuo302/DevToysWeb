import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import path from 'node:path'
import { describe, it } from 'node:test'

const requireFromRepo = createRequire(path.join(process.cwd(), 'package.json'))
const { getStaticExportRscTargetPath } = requireFromRepo(
  './scripts/next-static-export-rsc-path.cjs',
) as {
  getStaticExportRscTargetPath: (filePath: string) => string | null
}

describe('static export RSC paths', () => {
  it('flattens nested Windows payload paths into the filename Next requests', () => {
    const source =
      'C:\\build\\dist\\zh-CN\\encoders\\base64-encoder-decoder\\__next.$d$locale\\$d$category\\$d$tool\\__PAGE__.txt'
    const target =
      'C:\\build\\dist\\zh-CN\\encoders\\base64-encoder-decoder\\__next.$d$locale.$d$category.$d$tool.__PAGE__.txt'

    assert.equal(getStaticExportRscTargetPath(source), target)
  })

  it('flattens nested POSIX payload paths too', () => {
    const source =
      '/build/dist/en/encoders/base64-encoder-decoder/__next.$d$locale/$d$category/$d$tool/__PAGE__.txt'
    const target =
      '/build/dist/en/encoders/base64-encoder-decoder/__next.$d$locale.$d$category.$d$tool.__PAGE__.txt'

    assert.equal(getStaticExportRscTargetPath(source), target)
  })

  it('leaves already-flat payloads and unrelated files unchanged', () => {
    assert.equal(
      getStaticExportRscTargetPath('/dist/en/__next.$d$locale.$d$category.__PAGE__.txt'),
      null,
    )
    assert.equal(getStaticExportRscTargetPath('/dist/en/assets/image.png'), null)
  })
})
