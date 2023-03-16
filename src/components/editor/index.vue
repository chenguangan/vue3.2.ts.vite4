<template>
  <div class="flex a-editor">
    <div class="left">
      <div class="c2">模板列表</div>
      <el-scrollbar max-height="598px">
        <div
          v-for="(v, i) in list"
          :key="i"
          class="c1 flex"
          @click="insertData(v)"
        >
          <div v-html="v"></div>
        </div>
      </el-scrollbar>
    </div>
    <div style="width: calc(100% - 355px)">
      <vue-ueditor-wrap
        @before-init="addCustomButton"
        v-model="content"
        :config="editorConfig"
        forceInit
        @ready="ready"
        :editor-id="'editor-demo-' + Math.round(Math.random() * 99)"
      >
      </vue-ueditor-wrap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import list from "./template";
import config from "@/common/config";

const emit = defineEmits(["selectImg"]); //自定义事件
const content = ref("");
const editorObj = ref<any>(null);

const ready = (editorInstance: any) => {
  editorObj.value = editorInstance;
};


//自定义插图图片按钮
const addCustomButton = (editorId: any) => {
  (window as any).UE.registerUI(
    "my-custom-button",
    (editor: any, uiName: any) => {
      const btn = new (window as any).UE.ui.Button({
        name: uiName,
        title: "插入图片",
        cssRules: `background-image: url('http://qiniu.other.88an.top/other/2022505165171543874531.png') !important; background-size: cover;`,
        onclick() {
          editorObj.value = editor; //获取编辑器实例对象
          emit("selectImg", "editor");
        },
      });
      return btn;
    },
    0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */,
    editorId
  );
  //   window.UE.registerUI(
  //     "my-template",
  //     (editor, uiName) => {
  //       const btn = new window.UE.ui.Button({
  //         name: uiName,
  //         title: "插入模板",
  //         cssRules: `background-image: url('http://qiniu.other.88an.top/other/2022426165096559604482.png') !important; background-size: cover;`,
  //         onclick() {
  // 		  editorObj.value = editor;//获取编辑器实例对象
  // 		//   console.log('插入模板哦')
  // 			tempShow.value = true;
  //         },
  //       });
  //       return btn;
  //     },
  //     0,/* 指定添加到工具栏上的哪个位置，默认时追加到最后 */
  //     editorId
  //   );
};

//插入模板数据
const insertData = (data: string) => {
  editorObj.value.execCommand("inserthtml", "<br/>" + data);
};

//编辑器配置
const editorConfig = {
  zIndex: 2000,
  autoHeightEnabled: false,
  initialFrameHeight: 510,
  UEDITOR_HOME_URL: config.dev
    ? "/UEditor/"
    : `${config.baseUrl}vue3vite2/UEditor/`, // 访问 UEditor 静态资源的根路径，可参考常见问题1
  serverUrl: "//www.baidu.com", // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
  toolbars: [
    [
      "source", //源代码
      "undo", //撤销
      "redo", //重做
      "indent", //首行缩进
      "justifyleft", //居左对齐
      "justifyright", //居右对齐
      "justifycenter", //居中对齐
      "justifyjustify", //两端对齐
      "directionalityltr", //从左向右输入
      "directionalityrtl", //从右向左输入
      "rowspacingtop", //段前距
      "rowspacingbottom", //段后距
      "inserttable", //插入表格
      "insertrow", //前插入行
      "insertcol", //前插入列
      "mergeright", //右合并单元格
      "mergedown", //下合并单元格
      "deleterow", //删除行
      "deletecol", //删除列
      "splittorows", //拆分成行
      "splittocols", //拆分成列
      "splittocells", //完全拆分单元格
      "deletecaption", //删除表格标题
      "inserttitle", //插入标题
      "mergecells", //合并多个单元格
      "deletetable", //删除表格
      "insertparagraphbeforetable", //"表格前插入行"
      "edittable", //表格属性
      "edittd", //单元格属性
    ],
    [
      "bold", //加粗
      // 'snapscreen', //截图
      "italic", //斜体
      "underline", //下划线
      "strikethrough", //删除线
      "subscript", //下标
      "fontborder", //字符边框
      "superscript", //上标

      "blockquote", //引用
      "pasteplain", //纯文本粘贴模式
      "selectall", //全选
      // 'print', //打印
      "horizontal", //分隔线
      "removeformat", //清除格式

      "unlink", //取消链接
      "link", //超链接
      "emotion", //表情
      "spechars", //特殊字符
      "searchreplace", //查询替换
      "anchor", //锚点
      // 'map', //Baidu地图
      // 'gmap', //Google地图
      "forecolor", //字体颜色
      "backcolor", //背景色
      "insertorderedlist", //有序列表
      "insertunorderedlist", //无序列表
      // 'pagebreak', //分页
      // 'insertframe', //插入Iframe
      "imagenone", //默认
      "imageleft", //左浮动
      "imageright", //右浮动
      "imagecenter", //居中
    ],
    [
      "|",
      "time", //时间
      "date", //日期
      "formatmatch", //格式刷
      // 'attachment', //附件
      // 'wordimage', //图片转存
      "lineheight", //行间距
      "edittip ", //编辑提示
      // 'autotypeset', //自动排版
      // 'webapp', //百度应用
      "touppercase", //字母大写
      "tolowercase", //字母小写
      "background", //背景
      // 'template', //模板
      // 'scrawl', //涂鸦
      // 'music', //音乐
      "cleardoc", //清空文档
      "drafts", // 从草稿箱加载
      // 'preview', //预览
      "fullscreen", //全屏
      // 'charts', // 图表
      "insertcode", //代码语言
      "fontfamily", //字体
      "fontsize", //字号
      "paragraph", //段落格式
      "customstyle", //自定义标题
    ],
  ],
};
defineExpose({ content, editorObj }); //暴露数据给父组件通过ref调用
</script>

<style scoped lang="scss">
.a-editor {
  align-items: flex-start;
}
.left {
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 5px;
  .c1 {
    padding: 10px;
    justify-content: center;
    margin-bottom: 30px;
  }
  .c1:hover {
    background: #f6f6f6;
    cursor: pointer;
  }
  .c2 {
    padding: 0 10px;
  }
}
</style>
