<template>
  <div>
    <div class="c1">
      <div class="c2">
        <div class="c3">标题:</div>
        <div class="c4">
          <el-input placeholder="请输入" v-model="pageData.title" />
        </div>
      </div>
    </div>

    <div class="c1">
      <div class="c2">
        <div class="c3">图片-单张:</div>
        <div class="c4 flex">
          <up-img v-model="pageData.img" @pickImg="pickImg('img')" />
        </div>
      </div>
    </div>

    <div class="c1">
      <div class="c2">
        <div class="c3">图片-最多3张-可以拖拽排序:</div>
        <div class="c4 flex">
          <up-img
            v-model="pageData.imgList"
            @pickImg="pickImg('list', $event)"
            :max="3"
          />
        </div>
      </div>
    </div>

    <div class="c1">
      <div class="c2">
        <div class="c3">详情:</div>
        <editor ref="editorRef" @selectImg="pickImg('editor')" />
      </div>
    </div>

    <div class="footer-bg"></div>

    <div class="footer flex">
      <el-button>取消</el-button>
      <el-button type="primary" @click="subForm">确定</el-button>
    </div>

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
.c1 {
  margin-bottom: 20px;
}

.c3 {
  line-height: 30px;
}

.footer {
  padding: 10px;
  justify-content: flex-end;
  background: #fcfcfc;
}
</style>
