const getStaticExportRscTargetPath = (filePath) => {
  if (!filePath.endsWith('.txt')) return null

  const segments = filePath.split(/[\\/]/)
  const markerIndex = segments.findIndex((segment) => segment.startsWith('__next.'))
  if (markerIndex < 0 || markerIndex === segments.length - 1) return null

  const separator = filePath.includes('\\') && !filePath.includes('/') ? '\\' : '/'
  const prefix = segments.slice(0, markerIndex).join(separator)
  const flattenedFilename = segments.slice(markerIndex).join('.')
  const basePath = prefix || (filePath.startsWith(separator) ? separator : '')

  return basePath
    ? `${basePath}${basePath.endsWith(separator) ? '' : separator}${flattenedFilename}`
    : flattenedFilename
}

module.exports = { getStaticExportRscTargetPath }
