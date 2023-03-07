<!--
  功能：修改密码
  时间：2023年02月24日 18:11:29
-->
<template>
  <div class="root" ref="rootRef">
    <div class="c1">
      <div class="c6">更改管理员登录密码</div>
      <div class="c7">修改成功后,下次登录生效！</div>
      <div class="c3 flex">
        <div class="c4">当前密码：</div>
        <div class="c5">
          <el-input
            size="large"
            v-model="form.oldpass"
            minlength="5"
            maxlength="32"
            placeholder="请输入原密码"
            show-password
          />
        </div>
      </div>
      <div class="c3 flex">
        <div class="c4">新密码：</div>
        <div class="c5">
          <el-input
            size="large"
            v-model="form.pass_a"
            minlength="5"
            maxlength="32"
            placeholder="请输入新密码,如：An@123456"
            show-password
            @input="checkPass"
          />
          <div class="flex c8">
            <!-- {{password_strength}} -->
            <div
              v-for="(v, i) in passTips"
              :key="i"
              :class="v == password_strength ? 'true' : ''"
            >
              {{ v }}
            </div>
          </div>
        </div>
      </div>
      <div class="c3 flex">
        <div class="c4">确认密码：</div>
        <div class="c5">
          <el-input
            size="large"
            v-model="form.pass_b"
            minlength="5"
            maxlength="32"
            placeholder="请确认新密码"
            show-password
          />
        </div>
      </div>
      <div class="c2">
        <el-button size="large" @click="reset">重置</el-button>
        <el-button size="large" type="primary" @click="subPass">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";

const form = reactive({
  oldpass: "",
  pass_a: "",
  pass_b: "",
});

const reset = () => {
  password_strength.value = "";
  form.oldpass = "";
  form.pass_a = "";
  form.pass_b = "";
};

// 一、密码长度:
// 5 分: 小于等于 4 个字符， 10 分: 5 到 7 字符 ， 25 分: 大于等于 8 个字符
// 二、字母:
// 0 分: 没有字母， 10 分: 全都是小（大）写字母， 20 分: 大小写混合字母
// 三、数字:
// 0 分: 没有数字， 10 分: 1 个数字， 20 分: 大于等于 3 个数字
// 四、符号:
// 0 分: 没有符号， 10 分: 1 个符号， 25 分: 大于 1 个符号
// 五、奖励:
// 2 分: 字母和数字， 3 分: 字母、数字和符号， 5 分: 大小写字母、数字和符号

// 最后的评分标准:
// = 90: 非常安全
// = 80: 安全
// = 70: 非常强
// = 60: 强
// = 50: 一般
// = 25: 弱
// = 0: 非常弱

const passTips = ref([
  "非常弱",
  "弱",
  "一般",
  "强",
  "非常强",
  "安全",
  "非常安全",
]);

function checkPassword(str:string) {
  // 第一步先判断各分类长度
  let num = 0; //数字
  let lowerCase = 0; //小写字母
  let upperCase = 0; //大写字母
  let special = 0; //特殊字符
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c >= 48 && c <= 57) {
      //数字
      num++;
    } else if (c >= 65 && c <= 90) {
      //大写字母
      upperCase++;
    } else if ((c == 97 && c <= 122)) {
      //小写字母
      lowerCase++;
    } else {
      special++;
    }
  }
  // 第二步 计算分数
  let wholeMark = 0;
  let numMark = 0;
  let caseMark = 0;
  let specialMark = 0;
  let reward = 0;
  // 整长度分数
  if (str.length <= 4) {
    wholeMark = 5;
  } else if (str.length > 4 && str.length <= 8) {
    wholeMark = 10;
  } else {
    wholeMark = 25;
  }
  // 奖励分数
  if ((lowerCase || upperCase) && num) {
    reward = 2;
    if (special) {
      reward = 3;
      if (lowerCase && upperCase) {
        reward = 5;
      }
    }
  }
  // 字母分数
  if (lowerCase || upperCase) {
    caseMark = 10;
    if (lowerCase && upperCase) {
      caseMark = 20;
    }
  }
  // 数字分数
  if (num) {
    numMark = 10;
    if (num >= 3) {
      numMark = 20;
    }
  }
  // 符号分数
  if (special) {
    specialMark = 10;
    if (special > 1) {
      specialMark = 25;
    }
  }
  console.log(wholeMark, numMark, caseMark, specialMark, reward);
  let totalMark = wholeMark + numMark + caseMark + specialMark + reward;
  console.log(totalMark);
  let strength = "";
  if (totalMark < 25) {
    strength = "非常弱";
  } else if (totalMark >= 25 && totalMark < 50) {
    strength = "弱";
  } else if (totalMark >= 50 && totalMark < 60) {
    strength = "一般";
  } else if (totalMark >= 60 && totalMark < 70) {
    strength = "强";
  } else if (totalMark >= 70 && totalMark < 80) {
    strength = "非常强";
  } else if (totalMark >= 86 && totalMark < 90) {
    strength = "安全";
  } else {
    strength = "非常安全";
  }
  return strength;
}

const password_strength = ref("");
const checkPass = (data:string) => {
  if (data) {
    password_strength.value = checkPassword(data);
  } else {
    password_strength.value = "";
  }
};

const adminData:any = JSON.parse(localStorage.getItem("login") as string);
const subPass = () => {
  if (form.oldpass == "") return ElMessage.error("请输入原密码");
  if (form.pass_a == "") return ElMessage.error("请输入新密码");
  if (form.pass_b == "") return ElMessage.error("请确认新密码");
  if (form.pass_a != form.pass_b) return ElMessage.error("新密码不一致");
  // api.post('a/other/upPass_a', {
  // 	...form,
  // 	id: adminData.id
  // }).then(res => {
  // 	if (res.code == 200) {
  // 		ElMessage.success('修改成功，下次登录生效')
  // 		showPass.value = false;
  // 	} else {
  // 		ElMessage.error('修改失败,原密码输入有误')
  // 	}
  // })
};
</script>

<style scoped lang="scss">
.root {
  overflow: hidden;
  position: relative;

  .c1 {
    max-width: 640px;
    padding: 50px 10px;
    margin: 0 auto;
  }

  .c2 {
    margin-top: 20px;
    text-align: left;

    .el-button {
      width: 100px;
    }
  }

  .c4 {
    width: 100px;
  }

  .c5 {
    flex: 1;
  }

  .c7 {
    margin: 20px 0;
    font-size: 14px;
  }

  .c8 {
    justify-content: space-between;
  }

  .c8 div {
    font-size: 12px;
    background: #ddd;
    color: #666;
    width: 13%;
    text-align: center;
    border-radius: 12px;
    padding: 2px 0;
  }

  .c8 div.true {
    background: var(--el-color-primary);
    color: #fff;
  }

  .el-input {
    margin: 10px auto;
  }
}

html.dark {
  .root {
  }
}

@media screen and (max-width: 960px) {
  .root {
  }
}
</style>
