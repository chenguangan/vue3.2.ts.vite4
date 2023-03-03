import axios from 'axios' //引入axios
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据
import { ElMessage } from 'element-plus'

// 创建axios实例
const instance = axios.create({
    timeout: 8000, // 请求超时时间
})

instance.defaults.baseURL = '/myApi/';//请求环境
 
// 设置 post默认 Content-Type
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
 
 
// 设置请求拦截器
instance.interceptors.request.use(
    (config: any) => {
        if (config.method == 'post') {
            config.data = JSON.stringify(config.data)
        }
        return config
    },
    err => {
        // 请求错误
        return Promise.reject(err)
    })
 
 
// 设置响应拦截器
instance.interceptors.response.use(
    (response: any) => {
        if (response.status == 200) {
             return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        // 超时处理
        let originalRequest = error.config
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
            ElMessage({
                type:"error",
                message:"请检查网络再重新连接"
            })
            return Promise.reject('请检查网络再重新连接')
        }
        if (error.response.status) {
            return Promise.reject(error.response)
        }
    }
)

/**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
 function get(url: string, params: any = {}){
    return new Promise((resolve: any, reject: any) =>{
        instance.get(url, {
            params:params
        })
        .then((res:any)=> {
            resolve(res.data);
        })
        .catch((err:any) => {
            reject(err)
        })
    });
}

/**
  * post方法，对应post请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
function post(url: string, params: any = {}) {
    return new Promise((resolve: any, reject: any) => {
        instance.post(url, QS.stringify(params))
        .then((res:any)=> {
            resolve(res.data);
        })
        .catch((err:any) => {
            reject(err)
        })
    });
}

export default {post,get}
