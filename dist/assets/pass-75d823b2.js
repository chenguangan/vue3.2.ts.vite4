import{d as E,a as P,r as V,b as C,o as x,c as k,e as s,f as p,F as U,m as A,n as F,t as T,w as y,j as z,E as w,p as j,l as D,_ as J}from"./index-a647f3e1.js";const u=f=>(j("data-v-30c5a4ab"),f=f(),D(),f),L={class:"root",ref:"rootRef"},O={class:"c1"},R=u(()=>s("div",{class:"c6"},"更改管理员登录密码",-1)),q=u(()=>s("div",{class:"c7"},"修改成功后,下次登录生效！",-1)),G={class:"c3 flex"},H=u(()=>s("div",{class:"c4"},"当前密码：",-1)),K={class:"c5"},Q={class:"c3 flex"},W=u(()=>s("div",{class:"c4"},"新密码：",-1)),X={class:"c5"},Y={class:"flex c8"},Z={class:"c3 flex"},$=u(()=>s("div",{class:"c4"},"确认密码：",-1)),ee={class:"c5"},se={class:"c2"},ae=E({__name:"pass",setup(f){const e=P({oldpass:"",pass_a:"",pass_b:""}),I=()=>{h.value="",e.oldpass="",e.pass_a="",e.pass_b=""},M=V(["非常弱","弱","一般","强","非常强","安全","非常安全"]);function S(t){let o=0,n=0,c=0,a=0;for(let b=0;b<t.length;b++){let d=t.charCodeAt(b);d>=48&&d<=57?o++:d>=65&&d<=90?c++:d==97&&d<=122?n++:a++}let r=0,m=0,g=0,v=0,_=0;t.length<=4?r=5:t.length>4&&t.length<=8?r=10:r=25,(n||c)&&o&&(_=2,a&&(_=3,n&&c&&(_=5))),(n||c)&&(g=10,n&&c&&(g=20)),o&&(m=10,o>=3&&(m=20)),a&&(v=10,a>1&&(v=25)),console.log(r,m,g,v,_);let l=r+m+g+v+_;console.log(l);let i="";return l<25?i="非常弱":l>=25&&l<50?i="弱":l>=50&&l<60?i="一般":l>=60&&l<70?i="强":l>=70&&l<80?i="非常强":l>=86&&l<90?i="安全":i="非常安全",i}const h=V(""),N=t=>{t?h.value=S(t):h.value=""};JSON.parse(localStorage.getItem("login"));const B=()=>{if(e.oldpass=="")return w.error("请输入原密码");if(e.pass_a=="")return w.error("请输入新密码");if(e.pass_b=="")return w.error("请确认新密码");if(e.pass_a!=e.pass_b)return w.error("新密码不一致")};return(t,o)=>{const n=C("el-input"),c=C("el-button");return x(),k("div",L,[s("div",O,[R,q,s("div",G,[H,s("div",K,[p(n,{size:"large",modelValue:e.oldpass,"onUpdate:modelValue":o[0]||(o[0]=a=>e.oldpass=a),minlength:"5",maxlength:"32",placeholder:"请输入原密码","show-password":""},null,8,["modelValue"])])]),s("div",Q,[W,s("div",X,[p(n,{size:"large",modelValue:e.pass_a,"onUpdate:modelValue":o[1]||(o[1]=a=>e.pass_a=a),minlength:"5",maxlength:"32",placeholder:"请输入新密码,如：An@123456","show-password":"",onInput:N},null,8,["modelValue"]),s("div",Y,[(x(!0),k(U,null,A(M.value,(a,r)=>(x(),k("div",{key:r,class:F(a==h.value?"true":"")},T(a),3))),128))])])]),s("div",Z,[$,s("div",ee,[p(n,{size:"large",modelValue:e.pass_b,"onUpdate:modelValue":o[2]||(o[2]=a=>e.pass_b=a),minlength:"5",maxlength:"32",placeholder:"请确认新密码","show-password":""},null,8,["modelValue"])])]),s("div",se,[p(c,{size:"large",onClick:I},{default:y(()=>[z("重置")]),_:1}),p(c,{size:"large",type:"primary",onClick:B},{default:y(()=>[z("确定")]),_:1})])])],512)}}});const oe=J(ae,[["__scopeId","data-v-30c5a4ab"]]);export{oe as default};