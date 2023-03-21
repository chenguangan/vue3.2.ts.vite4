<template>
  <div class="page-bg">
    <editPage @subForm="subForm">
      <div class="item">
        <div class="label">标题:</div>
        <el-input
          placeholder="请输入"
          maxlength="100"
          v-model="pageData.title"
          show-word-limit
        />
      </div>

      <div class="item">
        <div class="label">图片-单张:</div>
        <up-img v-model="pageData.img" @pickImg="pickImg('img')" />
      </div>

      <div class="item">
        <div class="label">图片-最多3张-可以拖拽排序:</div>
        <up-img
          v-model="pageData.imgList"
          @pickImg="pickImg('list', $event)"
          :max="3"
        />
      </div>

      <div class="item">
        <div class="label">详情:</div>
        <editor ref="editorRef" @selectImg="pickImg('editor')" />
      </div>
    </editPage>

    <layer-img v-model="imgOption.show" @getImg="getImg" />
  </div>
</template>

<script lang="ts">
export default {
  name: "GoodsEdit",
};
</script>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import editPage from "@/components/edit-page.vue";
import layerImg from "@/components/layer-img.vue";
import upImg from "@/components/up-img.vue";
import editor from "@/components/editor/index.vue";

const pageData = reactive<any>({
  title: "",
  imgList: [],
  img: [],
});

const imgOption = reactive({
  option: {
    name: "",
    index: -1,
  },
  show: false,
});

//name 是需要操作的图片字段名称
//如果是替换 才会有index参数返回，index就是需要替换的数组下标
function pickImg(name: string, index?: number) {
  imgOption.option.name = name;
  imgOption.option.index = index ?? -1;
  imgOption.show = true;
}

const editorRef = ref<any>(null);

onMounted(() => {
  //编辑器默认值
  editorRef.value.content = "<h2>Hello World!</h2>";
});

function getImg(data: any) {
  //多图上传
  if (imgOption.option.name === "list") {
    if (imgOption.option.index != -1) {
      pageData.imgList[imgOption.option.index] = data.imgUrl;
    } else {
      pageData.imgList.push(data.imgUrl);
    }
  }
  //单图上传
  if (imgOption.option.name === "img") {
    pageData.img[0] = data.imgUrl;
  }
  //编辑器图片上传
  if (imgOption.option.name === "editor") {
    //编辑器选择图片
    editorRef.value.editorObj.execCommand(
      "inserthtml",
      `<p><img style='max-width:100%' src='${data.imgUrl}'/></p>`
    );
  }
}
//提交
function subForm() {
  console.log("详情", editorRef.value.content);
}
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 20px;
}

.label {
  line-height: 30px;
}
</style>
