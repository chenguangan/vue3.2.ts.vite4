<!--
  功能：选择图片组件
  时间：2023年03月06日 17:38:14
-->
<template>
  <el-dialog
    v-model="props.show"
    title="选择图片"
    width="1200px"
    draggable
    :before-close="close"
  >
    <div class="an-img">
      <div class="flex v1">
        <el-image
          class="v2"
          v-for="(v, i) in pageData.list"
          :key="i"
          @click="ok(v)"
          :src="v+'?imageView2/0/format/webp/q/75'"
          fit="contain"
        ></el-image>
      </div>
    </div>
    <template #footer>
      <div class="flex footer">
        <div>
          <el-pagination
            background
            @current-change="switchCurrentChange"
            v-model:currentPage="pageData.page"
            :default-page-size="pageData.limit"
            layout="total,prev, pager, next"
            :total="pageData.total"
          >
          </el-pagination>
        </div>
        <div>
          <el-button type="primary">上传图片</el-button>
          <el-button type="primary">裁剪上传</el-button>
          <el-button @click="ok()">取消</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits,reactive } from "vue";
const emit = defineEmits(["update:show", "getImg"]);
const props = defineProps({
  //是否显示
  show: {
    type: Boolean,
    default: false,
  },
  //选择图片携带的参数
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

// 页面数据
const pageData = reactive({
  //列表
  list: [
    'http://qiniu.other.88an.top/other/verify1.jpg',
    'http://qiniu.other.88an.top/other/verify2.jpg',
    'http://qiniu.other.88an.top/other/verify3.jpg',
    'http://qiniu.other.88an.top/other/verify4.jpg',
    'http://qiniu.other.88an.top/other/verify5.jpg',
  ],
  spaceList: '',
  total: 0,
  page: 1,
  limit: 65,
  selectIndex: -1,
  selectValue: null,
});


const close = () => {
  emit("update:show", false);
};

// 点击分页
const switchCurrentChange = (val:number) => {
  console.log(`当前页: ${val}`);
  // document.getElementById("right").scrollTop = 0;//滚动条置顶
  // getList();
};


function ok(data?: any) {
  emit("update:show", false);
  if (data) {
    emit("getImg", {
      ...props.data,
      imgUrl:data
    });
  }
}
</script>
<style scoped lang="scss">
.an-img {
  .v1 {
    flex-wrap: wrap;
  }
  .v2 {
    border: 1px solid #f1f1f1;
    width: 80px;
    height: 80px;
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      border-color: var(--el-color-primary);
    }

    &:nth-child(13n) {
      margin-right: 0;
    }
  }
}
.footer{
  justify-content: space-between;
}
</style>
