<template>
  <div class="c1">
    <div class="c2">
      <div class="c3">标题:</div>
      <div class="c4"><el-input placeholder="请输入" /></div>
    </div>
  </div>
  <div class="c1">
    <div class="c2">
      <div class="c3">图片:</div>
      <div class="c4 flex">
        <div class="b1">
          <el-image
            v-if="imgSrc"
            style="width: 120px; height: 120px"
            :src="imgSrc"
            fit="contain"
          ></el-image>
        </div>
        <div class="b2" @click="showImg = true">
          <i class="custom-icon custom-icon-jia_sekuai"></i>
        </div>
      </div>
    </div>
  </div>
  <div class="c1">
    <div class="c2">
      <div class="c3">详情:</div>
      <vue-ueditor-wrap
        v-model="msg"
        :config="editorConfig"
        editor-id="editor-demo-01"
      ></vue-ueditor-wrap>
    </div>
  </div>
  <div class="footer">
    <el-button>重置</el-button>
    <el-button type="primary">确定</el-button>
  </div>

  <anImg v-model:show="showImg" @getImg="getImg" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import anImg from "@/components/an_img.vue";

const showImg = ref(false);
const imgSrc = ref("");
function getImg(data: any) {
  console.log(data);
  imgSrc.value = data;
}

const msg = ref("<h2>Hello World!</h2>");
const editorConfig = {
  UEDITOR_HOME_URL: "/UEditor/", // 访问 UEditor 静态资源的根路径，可参考常见问题1
  serverUrl: "//ueditor.szcloudplus.com/cos", // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
};
</script>

<style lang="scss" scoped>
.c1 {
  margin-bottom: 10px;
}

.c3 {
  line-height: 30px;
}

.c4 {
  .b1 {
    .el-image {
      margin-right: 5px;
      border: 1px dashed #ccc;
      border-radius: 5px;
      display: block;
    }
  }
  .b2 {
    height: 122px;
    width: 122px;
    line-height: 122px;
    text-align: center;
    border: 1px dashed #ccc;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      border-color: var(--el-color-primary);
    }
  }
}
</style>
