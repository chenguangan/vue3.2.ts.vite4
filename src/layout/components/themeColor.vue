<!--
  功能：更换主题
  时间：2023年03月01日 11:29:22
-->
<template>
  <el-color-picker
    v-model="themeColor"
    @change="changeColor"
    :predefine="themeColorArr"
  />
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

//转换颜色
function colorRgba(sHex: any) {
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = sHex.toLowerCase();
  var alpha:any = 1;
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4 || sColor.length === 5) {
      var sColorNew = "#";
      for (var i = 1; i < sColor.length; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 如果有透明度再执行
    if (sColor.length === 9) {
      alpha = (parseInt("0x" + sColor.slice(7, 9)) / 255).toFixed(2);
    }
    //  处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
  } else {
    return sColor;
  }
}

//切换颜色
function changeColor(e: any) {
  const pre = "--el-color-primary";

  const el = document.documentElement;
  el.style.setProperty(pre, e);
  // 这里是覆盖原有颜色的核心代码

  let num = 10;
  for (let i = 1; i < num; i += 1) {
    el.style.setProperty(
      `${pre}-light-${i}`,
      colorRgba(e).replace("1\)", "\." + (num - i) + "\)")
    );
  }

  el.style.setProperty(
    `--el-color-primary-light-03`,
    colorRgba(e).replace("1\)", "\.03\)")
  );
  el.style.setProperty(`--el-color-primary-dark-2`, e);
  el.style.setProperty(`--el-button-active-bg-color`, e);
  localStorage.setItem("themeColor", e);
  themeColor.value = e;
}

// 预设颜色
const themeColorArr = ref([
  "#009688",
  "#0940bd",
  "#ff4500",
  "#ff8c00",
  "#c71585",
  "#ff5c93",
]);

// 默认颜色
const themeColor = ref(
  localStorage.getItem("themeColor") || themeColorArr.value[0]
);

changeColor(themeColor.value);
</script>

<style scoped lang="scss"></style>
