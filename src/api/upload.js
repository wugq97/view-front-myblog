import request from '@/utils/request'

export function merge (filename, identifier, totalSize, type) {
  return request({
    url: 'upload/mergeFile',
    method: 'post',
    params: {
      filename,
      identifier,
      totalSize,
      type
    }
  })
}
