<template>
  <div ref="scrollRef">
    <!-- 内部页面演示 -->
    <div class="c1">
      <el-divider content-position="left">
        不参与Menu的路由,左侧menu中没有，也不会在头部标签中存在
      </el-divider>
      <router-link to="/test">{{ $t("page.t1") }}</router-link>
    </div>

    <!-- 页面缓存 -->
    <div class="c1">
      <el-divider content-position="left">页面缓存</el-divider>
      <div class="flex">
        <div class="mr-10">{{ $t("page.t3") }}：{{ num }}</div>
        <el-button @click="num++">{{ $t("page.t2") }}++</el-button>
      </div>
    </div>

    <!-- 节流 -->
    <div class="c1">
      <el-divider content-position="left">节流 - 1秒内只执行一次</el-divider>
      <div class="flex">
        <div>点击的次数：{{ throttle.clidkDdata }}</div>
        <div style="margin: 0 20px">
          程序实际处理的次数：{{ throttle.upData }}
        </div>
        <el-button
          @click="
            throttle.clidkDdata += 1;
            throttleFn();
          "
        >
          快速点击
        </el-button>
      </div>
    </div>

    <!-- 防抖 -->
    <div class="c1">
      <el-divider content-position="left"
        >防抖 -
        1秒内，无论点了多少次，只有某一次点击后在1秒内没有再操作，这一次才被判定有效</el-divider
      >
      <div class="flex">
        <div>点击的次数：{{ debounce.clidkDdata }}</div>
        <div style="margin: 0 20px">
          程序实际处理的次数：{{ debounce.upData }}
        </div>
        <el-button
          @click="
            debounce.clidkDdata += 1;
            debounceFn();
          "
        >
          快速点击
        </el-button>
      </div>
    </div>

    <!-- 复制功能 -->
    <div class="c1">
      <el-divider content-position="left">复制功能</el-divider>
      <div v-if="isSupported">
        <div class="mb-10">复制的内容：{{ text }}</div>
        <div class="flex">
          <div>需要复制的内容：</div>
          <div>
            <el-input type="text" v-model="copyText" />
          </div>
          <el-button @click="copy(copyText)">
            <span v-if="!copied">复制文字</span> <span v-else>复制成功</span>
          </el-button>
        </div>
      </div>
      <div v-else>您的浏览器不支持剪贴板API</div>
    </div>

    <!-- 动态加载script -->
    <div class="c1">
      <el-divider content-position="left">动态加载script</el-divider>
      <div id="container"></div>
    </div>
    
  </div>
</template>

<script lang="ts">
export default {
  name: "home",
};
</script>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  useClipboard,
  useScriptTag,
  useThrottleFn,
  useDebounceFn,
} from "@vueuse/core";
const num = ref(0);

//复制文本
const copyText = ref("hello");
const { text, copy, copied, isSupported } = useClipboard();

//节流
const throttle = reactive({
  clidkDdata: 0,
  upData: 0,
});
const throttleFn = useThrottleFn(() => {
  throttle.upData += 1;
}, 1000);

//防抖
const debounce = reactive({
  clidkDdata: 0,
  upData: 0,
});
const debounceFn = useDebounceFn(() => {
  debounce.upData += 1;
}, 1000);

//动态加载script  腾讯地图演示
useScriptTag(
  "https://map.qq.com/api/gljs?v=1.exp&key=OGQBZ-EDOC6-LD3ST-MBLI3-M53O6-UHF5K",
  (el: HTMLScriptElement) => {
    const TMap = (window as any).TMap; // TMap地图实例

    let center = new TMap.LatLng(39.98412, 116.307484);
    //定义map变量，调用 TMap.Map() 构造函数创建地图
    const map = new TMap.Map(document.getElementById("container"), {
      center: center, //设置地图中心点坐标
      zoom: 15, //设置地图缩放级别
      pitch: 43.5, //设置俯仰角
      rotation: 45, //设置地图旋转角度
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function geoSuccess(event) {
          console.log(
            "获取当前经纬度",
            event.coords.latitude + ", " + event.coords.longitude
          );
          map.setCenter(
            new TMap.LatLng(event.coords.latitude, event.coords.longitude)
          );
          //创建并初始化MultiMarker
          new TMap.MultiMarker({
            map: map, //指定地图容器
            //样式定义
            styles: {
              //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
              myStyle: new TMap.MarkerStyle({
                width: 25, // 点标记样式宽度（像素）
                height: 35, // 点标记样式高度（像素）
                anchor: { x: 16, y: 32 },
              }),
            },
            //点标记数据数组
            geometries: [
              {
                id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
                styleId: "myStyle", //指定样式id
                position: new TMap.LatLng(
                  event.coords.latitude,
                  event.coords.longitude
                ), //点标记坐标位置
                properties: {
                  //自定义属性
                  title: "marker1",
                },
              },
            ],
          });
        },
        function geoError(event) {
          console.log("位置授权失败：" + event.code + ". " + event.message);
        }
      );
    }
  }
);
</script>

<style scoped lang="scss">
.c1 {
  padding-bottom: 30px;
  .mb-10 {
    margin-bottom: 10px;
  }
  .mr-10 {
    margin-right: 10px;
  }

  /*地图(容器)显示大小*/
  #container {
    width: 100%;
    height: 260px;
  }
}

html.dark {
  .c1 a {
    color: #fff;
  }
}
</style>
