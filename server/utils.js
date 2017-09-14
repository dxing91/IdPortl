function isValidMimeType(mimeType) {
  return (mimeType === 'application/pdf' || mimeType === 'image/jpeg' || mimeType === 'image/png')
}

exports.isValidMimeType = isValidMimeType
