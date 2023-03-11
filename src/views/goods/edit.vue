<template>
<div>
  <div class="c1">
    <div class="c2">
      <div class="c3">标题:</div>
      <div class="c4"><el-input placeholder="请输入" v-model="pageData.title" /></div>
    </div>
  </div>

  <div class="c1">
    <div class="c2">
      <div class="c3">图片-单张:</div>
      <div class="c4 flex">
        <div class="b1">
          <div class="c8 flex list-group-item" v-if="pageData.img">
            <el-image
              style="width: 100%; height: 100%"
              :src="pageData.img"
              fit="contain"
            ></el-image>
            <div class="c10" @click="pageData.img = ''">删除</div>
          </div>
        </div>
        <div class="b2" @click="imgOption.name = 'img';showImg = true">
          <i class="custom-icon custom-icon-jia_sekuai"></i>
        </div>
      </div>
    </div>
  </div>

  <div class="c1">
    <div class="c2">
      <div class="c3">图片-最多5张-可以拖拽排序:</div>
      <div class="c4 flex">
        <div class="b1">
          <draggable
            class="list-group flex"
            tag="transition-group"
            :component-data="{
              tag: 'div',
              type: 'transition-group',
              name: !drag ? 'flip-list' : null,
            }"
            v-model="pageData.imgList"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
            item-key="v"
          >
            <template #item="{ element, index }">
              <div class="c8 flex list-group-item">
                <el-image
                  style="width: 100%; height: 100%"
                  :src="element"
                  fit="contain"
                ></el-image>
                <div class="c10" @click="pageData.imgList.splice(index, 1)">
                  删除
                </div>
              </div>
            </template>
          </draggable>
        </div>
        <div class="b2" @click="imgOption.name = 'list';showImg = true;" v-if="pageData.imgList.length < 5">
          <i class="custom-icon custom-icon-jia_sekuai"></i>
        </div>
      </div>
    </div>
  </div>

  <div class="c1">
    <div class="c2">
      <div class="c3">详情:</div>
      <editor ref="editorRef" @selectImg="imgOption.name = 'editor';showImg = true;"/>
    </div>
  </div>

  <div class="footer-bg"></div>

  <div class="footer flex">
    <el-button>取消</el-button>
    <el-button type="primary" @click="subForm">确定</el-button>
  </div>

  <anImg v-model:show="showImg" @getImg="getImg" :data="imgOption"/>
</div>
</template>

<script lang="ts">
export default {
  name: "GoodsEdit",
};
</script>

<script setup lang="ts">
import { ref, reactive,onMounted } from "vue";
import anImg from "@/components/an_img.vue";
import editor from "@/components/editor/index.vue";
import draggable from "vuedraggable"; //拖拽组件配置信息

const drag = ref(false);
const dragOptions = {
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "ghost",
};

const pageData = reactive<any>({
  title:'',
  imgList: [],
  img: "",
});

const imgOption = ref({
  name:'list'
})

const showImg = ref(false);

const editorRef = ref<any>(null);

onMounted(()=>{
  //编辑器默认值
  editorRef.value.content = '<h2>Hello World!</h2>'
})

function getImg(data: any) {
  if(imgOption.value.name === 'list'){
    pageData.imgList.push(data.imgUrl);
  }
  if(imgOption.value.name === 'img'){
    pageData.img = data.imgUrl;
  }
  if(imgOption.value.name === 'editor'){
    //编辑器选择图片
    editorRef.value.editorObj.execCommand(
				'inserthtml', 
				`<p><img style='max-width:100%' src='${data.imgUrl}'/></p>`
			);
  }
}
//提交
function subForm(){
  console.log('详情',editorRef.value.content);
}
</script>

<style lang="scss" scoped>
.c1 {
  margin-bottom: 20px;
}

.c3 {
  line-height: 30px;
}

.c4 {
  .b2 {
    height: 120px;
    width: 120px;
    line-height: 120px;
    text-align: center;
    border: 1px dashed #ccc;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      border-color: var(--el-color-primary);
    }
  }
}

.c8 {
  margin-right: 10px;
  width: 120px;
  height: 120px;
  position: relative;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px dashed #d9d9d9;
}

.c8:hover {
  border-color: var(--el-color-primary);
  cursor: move;
}

.c8:hover .c10 {
  opacity: 1;
}

.c8 img {
  width: 100%;
  height: 100%;
  display: block;
}

.c9 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.c10 {
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: pointer;
  width: 100%;
  background: var(--el-color-primary);
  opacity: 0;
  transition: 0.3s;
  text-align: center;
  color: #fff;
  line-height: 30px;
}

.footer{
  padding: 10px;
  justify-content: flex-end;
  background: #fcfcfc;


}
</style>
