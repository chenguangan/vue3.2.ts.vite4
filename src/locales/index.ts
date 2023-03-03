import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN.json';
import en from './en.json';

const i18n = createI18n({
    legacy: false,
    globalInjection: true,// 全局注入 $t 函数
    locale: localStorage.getItem('lang') || 'zh-CN',        //默认显示的语言 
    messages: {
        'zh-CN':zhCN,    //引入语言文件
		'en':en
    }
})

export {i18n};