import{d as g,u as f,r as v,a as h,c as x,b as e,e as l,f as i,w as y,F as w,g as r,p as V,h as b,o as k,i as z,k as I,j as C,l as M,_ as S}from"./index-101face8.js";const n=a=>(V("data-v-f8184600"),a=a(),b(),a),N=n(()=>e("div",{class:"g-bg"},[e("div",{class:"g-polygon g-polygon-1"}),e("div",{class:"g-polygon g-polygon-2"}),e("div",{class:"g-polygon g-polygon-3"})],-1)),B={class:"root flex"},U={class:"c2"},j=n(()=>e("div",{class:"c3"},"后台管理",-1)),F=n(()=>e("div",{class:"c4"},"vue3.2 + ts + vite + element-plus",-1)),q={class:"c5"},D={class:"c6"},E={class:"c6"},J={class:"c6 flex"},L={class:"c10"},O=["src"],R=n(()=>e("div",{class:"c8"},[e("a",{href:"http://www.88an.top"},"www.88an.top")],-1)),T=g({__name:"login",setup(a){const p=f(),d=v(Math.random()),u=()=>{d.value=Math.random()},o=h({user:"admin",pass:"admin",code:"1234"}),_=()=>{localStorage.setItem("user",JSON.stringify(o)),p.push("/")};return(Y,s)=>{const c=r("el-input"),m=r("el-button");return k(),x(w,null,[N,e("div",B,[e("div",U,[j,F,e("div",q,[e("div",D,[l(c,{placeholder:"请输入账号","prefix-icon":i(z),clearable:!0,size:"large",modelValue:o.user,"onUpdate:modelValue":s[0]||(s[0]=t=>o.user=t),modelModifiers:{trim:!0}},null,8,["prefix-icon","modelValue"])]),e("div",E,[l(c,{placeholder:"请输入密码",type:"password","show-password":!0,size:"large",clearable:!0,"prefix-icon":i(I),modelValue:o.pass,"onUpdate:modelValue":s[1]||(s[1]=t=>o.pass=t),modelModifiers:{trim:!0}},null,8,["prefix-icon","modelValue"])]),e("div",J,[l(c,{placeholder:"请输入验证码",clearable:!0,size:"large","prefix-icon":i(C),modelValue:o.code,"onUpdate:modelValue":s[2]||(s[2]=t=>o.code=t),modelModifiers:{trim:!0}},null,8,["prefix-icon","modelValue"]),e("div",L,[e("img",{src:"http://qiniu.other.88an.top/note/20180301_cover_ca05e9209.jpg?v="+d.value,alt:"",onClick:u},null,8,O)])]),l(m,{size:"large",type:"primary",class:"c7",onClick:_},{default:y(()=>[M(" 登录 ")]),_:1})])])]),R],64)}}});const G=S(T,[["__scopeId","data-v-f8184600"]]);export{G as default};
