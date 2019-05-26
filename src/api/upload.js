import request from '@/utils/request'

export function merge (uid, flag, filename, identifier, totalSize, type) {
  return request({
    url: 'upload/mergeFile',
    method: 'post',
    params: {
      uid,
      flag,
      filename,
      identifier,
      totalSize,
      type
    }
  })
}

export function getPublicFiles () {
  return request({
    url: 'file/public',
    method: 'get'
  })
}

export function getPrivateFiles (uid) {
  return request({
    url: 'file/private',
    method: 'get',
    params: {
      uid
    }
  })
}
