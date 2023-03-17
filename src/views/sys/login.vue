<template>
  <div class="g-bg">
    <div class="g-polygon g-polygon-1"></div>
    <div class="g-polygon g-polygon-2"></div>
    <div class="g-polygon g-polygon-3"></div>
  </div>
  <div class="root flex">
    <div class="c2">
      <div class="c3">{{$t('sys.t9')}}</div>
      <div class="c4">vue3.2 + ts + vite + element-plus</div>
      <div class="c5">
        <div class="c6">
          <el-input
            :placeholder="$t('sys.t11')"
            :prefix-icon="User"
            :clearable="true"
            size="large"
            v-model.trim="formData.user"
          >
          </el-input>
        </div>
        <div class="c6">
          <el-input
            :placeholder="$t('sys.t12')"
            type="password"
            :show-password="true"
            size="large"
            :clearable="true"
            :prefix-icon="Key"
            v-model.trim="formData.pass"
          >
          </el-input>
        </div>

        <div class="c6 flex">
          <el-input
            :placeholder="$t('sys.t13')"
            :clearable="true"
            size="large"
            :prefix-icon="CollectionTag"
            v-model.trim="formData.code"
          >
          </el-input>
          <div class="c10">
            <img :src="'http://qiniu.other.88an.top/note/20180301_cover_ca05e9209.jpg?v='+yzmImg" alt="" @click="shuaxinYzm" />
          </div>
        </div>
        <el-button size="large" type="primary" class="c7" @click="subLogin">
          {{$t('sys.t10')}}
        </el-button>
      </div>
    </div>
  </div>
  <div class="c8"><a href="http://www.88an.top">www.88an.top</a></div>
</template>

<script setup lang="ts">
import { reactive, inject, ref } from "vue";
// import lang from "@/components/lang.vue"
// import md5 from 'js-md5';

import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { User,Key,CollectionTag } from '@element-plus/icons-vue'
const router = useRouter();

// let api = inject('api'); //引入全局方法

const yzmImg = ref(Math.random());
const shuaxinYzm = () => {
  yzmImg.value = Math.random();
};

// api.get('a/index/getConfig', {
// 	type: 1
// }).then(res => {
// 	console.log(res)
// }).catch(err => {
// 	console.log(err);
// })

// api.post('a/index/getConfig').then(res => {
// 	console.log(res)
// }).catch(err => {
// 	console.log(err);
// })
const formData = reactive({
  user: "admin",
  pass: "admin",
  code: "1234",
});
const subLogin = () => {
  // if(formData.user == '') return ElMessage.error('请输入账号')
  // if(formData.pass == '') return ElMessage.error('请输入密码')
  // if(formData.code == '') return ElMessage.error('请输入验证码')
  // api.post('a/Login/loginAdmin',formData).then(res => {
  // 	if(res.code == 200){
  localStorage.setItem("user", JSON.stringify(formData));
  router.push("/");
  // 	}else{
  // 		ElMessage.error(res.msg)
  // 	}
  // })
};
</script>
<style lang="scss" scoped>
.g-polygon {
  position: absolute;
  top: 50vh;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.5;
}
.g-polygon-1 {
  background: #ffee55;
  clip-path: polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%);
}

.g-polygon-2 {
  background: #e950d1;
  clip-path: polygon(10% 0, 100% 70%, 100% 100%, 20% 90%);
}

.g-polygon-3 {
  background: rgba(87, 80, 233);
  clip-path: polygon(80% 0, 100% 70%, 100% 100%, 20% 90%);
}
.g-bg::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(150px);
  z-index: 1;
}
.root {
  position: relative;
  z-index: 9;
  background: none;
  flex-direction: column;
  height: calc(100vh - 50px);
  justify-content: center;
  .c2 {
    width: 330px;
    text-align: center;
    margin-top: -20vh;
  }
  .c3 {
    margin-bottom: 10px;
    font-weight: 300;
    font-size: 30px;
    color: #000;
    text-align: center;
  }
  .c4 {
    font-weight: 300;
    color: #999;
  }
  .c5 {
    margin-top: 20px;
  }
  .c6 {
    margin: 10px auto;
  }
  .c7 {
    width: 100%;
  }
  .c9 {
    position: fixed;
    left: 10px;
    top: 10px;
  }
  .c10 {
    width: 152px;
    margin-left: 10px;
  }
  .c10 img {
    width: 100%;height: 38px;
    position: relative;
    top:1px;
    cursor: pointer;
  }
}
.c8 {
  text-align: center;
  z-index: 9;
  position: relative;
}
.c8 a {
  color: #555;
  font-size: 15px;
}
</style>
