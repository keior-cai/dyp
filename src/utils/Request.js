import Axios from 'axios'

import { Toast } from 'vant'

export const Get = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params : data
    }).then(res => {
      const data = res.data
      if (data.code == -999) {
        window.location.href = data.data
      } else if (data.code != 0){
      	Toast.fail({
      	  message : data.message,
      	  showClose: true,
      	  duration: 1500,
      	})
      } else {
        return resolve(data)
      }
    }).catch(res => {
      Toast.fail('网络异常')
		})
  })
}

export const Post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    Axios.post(url, data , {
      timeout: 30000
    }).then(res => {
      const data = res.data
      if (data.code == -999) {
          window.location.href = data.data
      } else if (data.code != 0) {
       Toast.fail({
      	  message : data.message,
      	  showClose: true,
      	  duration: 1500,
      	})
      } else {
        return resolve(data)
      }
    }).catch(res => {
      Toast.fail('网络异常')
    })
  })
}
