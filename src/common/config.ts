const ENV = import.meta.env //引入环境变量
console.log('当前环境 '+ ENV.VITE_BASE_API);

let dev = ENV.DEV; //是否测试模式 1是 0否
let baseUrl = ENV.VITE_BASE_API;
let domain = ENV.VITE_BASE_URL;

let serverImg = domain+'uploads/';//服务器图片前缀

export default {
    dev,
	serverImg,
	domain,
	baseUrl,
}
