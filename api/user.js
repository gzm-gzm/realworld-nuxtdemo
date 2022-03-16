import {
  request
} from "../plugins/request";//使用按需加载request


export const login = (data) => {
  return request({
    method: "POST",
    url: '/api/users/login',
    data
  })
}


export const register = (data) => {
  return request({
    method: "POST",
    url: '/api/users',
    data
  })
}

export const getUserInfo = () => {
  return request({
    method: "GET",
    url: '/api/user'
  })
}

export const updateUserInfo = (data) => {
  return request({
    method: "PUT",
    url: '/api/user',
    data: {
      user: data
    }
  })
}

export const getProfileInfo = (username) => {
  return request({
    method: "GET",
    url: `/api/profiles/${username}`
  })
}

export const putFollow = (username) => {
  return request({
    method: "POST",
    url: `/api/profiles/${username}/follow`
  })
}

export const deleteFollow = (username) => {
  return request({
    method: "DELETE",
    url: `/api/profiles/${username}/follow`
  })
}