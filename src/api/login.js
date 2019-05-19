import request from '@/utils/request'

export function login (username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

export function getInfo () {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function logon(user) {
  return request({
    url: '/user/logon',
    method: 'post',
    params: {
      username: user.username,
      password: user.password
    }
  })
}
