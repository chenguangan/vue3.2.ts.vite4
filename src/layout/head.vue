<template>
  <!-- 头部 -->
  <div class="header flex">
    <!-- logo -->
    <div class="c1">AN-admin</div>

    <!-- 面包屑 -->
    <div class="c2 flex">
      <div class="c3 flex">
        <div
          class="b1"
          @click="sysStore.init.isCollapse = !sysStore.init.isCollapse"
        >
          <i class="custom-icon" v-if="sysStore.init.isCollapse">&#xe622;</i>
          <i class="custom-icon" v-else>&#xe624;</i>
        </div>
        <div class="b2">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">{{
              $t("menu.t1")
            }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="getCurrent.length && getCurrent[0].path != '/'">{{
              getCurrent[0].lang
                ? $t(getCurrent[0].lang)
                : getCurrent[0].name
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>

      <div class="flex c10">
        <div class="b1">
          <el-popover placement="bottom" :width="100" trigger="hover">
            <div style="text-align: center">
              <div style="margin-bottom: 10px">
                <el-button style="width: 100%" @click="router.push('/pass')">{{
                  $t("sys.t4")
                }}</el-button>
              </div>
              <div>
                <el-button style="width: 100%" @click="loginOut">{{
                  $t("sys.t5")
                }}</el-button>
              </div>
            </div>
            <template #reference>
              <div>{{ $t("sys.t1") }}</div>
            </template>
          </el-popover>
        </div>

        <div class="b1">
          <el-popover placement="bottom" :width="150" trigger="hover">
            <p style="text-align: center; line-height: 30px">
              {{ $t("sys.t6") }}
            </p>
            <div style="text-align: center">
              <div style="margin-bottom: 10px">
                <el-button
                  style="width: 100%"
                  :type="sysStore.init.language == 'zh-CN' ? 'primary' : ''"
                  @click="switchLang('zh-CN')"
                  >{{ $t("sys.t7") }}</el-button
                >
              </div>
              <div>
                <el-button
                  style="width: 100%"
                  :type="sysStore.init.language == 'en' ? 'primary' : ''"
                  @click="switchLang('en')"
                  >{{ $t("sys.t8") }}</el-button
                >
              </div>
            </div>
            <template #reference>
              <i class="custom-icon">&#xe617;</i>
            </template>
          </el-popover>
        </div>

        <!-- 控制暗黑模式 -->
        <el-switch
          v-model="isDark"
          style="--el-switch-on-color: #393d49; --el-switch-off-color: #393d49"
          inline-prompt
          :active-text="$t('sys.t2')"
          :inactive-text="$t('sys.t3')"
        />
        <div class="b1"><theme-color /></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useSysStore } from "@/store/sys";
import { useDark } from "@vueuse/core";
import { useRouter } from "vue-router";
import themeColor from "./components/theme-color.vue";
import { useTagsViewHook } from "@/composition/useTagViewApi";

const { getCurrent } = useTagsViewHook();

const isDark = useDark();
const router = useRouter();
const sysStore = useSysStore();
const { locale } = useI18n();

const switchLang = (lang: string) => {
  sysStore.init.language = lang;
  locale.value = lang;
  localStorage.setItem("lang", lang);
};

function loginOut() {
  localStorage.removeItem("user");
  router.push("/login");
}
</script>

<style scoped lang="scss">
.header {
  height: 48px;
  background: #393d49;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  z-index: 9;
  justify-content: space-between;
  .c1 {
    font-size: 26px;
    padding-left: 20px;
    color: #fff;
    font-weight: bold;
    width: 200px;
  }
  .c2 {
    flex: 1;
    justify-content: space-between;
  }
  .c3 {
    .b1 i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }
    .b2 {
      margin: 0 20px;
      :deep(.el-breadcrumb__inner) {
        color: #fff;
      }
      :deep(.el-breadcrumb__inner a) {
        color: #fff;
      }
    }
  }

  .c10 {
    .b1 {
      margin-right: 10px;
      line-height: 48px;
      color: #fff;
      padding: 0 10px;
      font-size: 14px;
      cursor: pointer;
      i {
        font-size: 20px;
        color: #fff;
        position: relative;
        top: 2px;
      }
    }

    .b2 {
      line-height: 30px;
    }

    :deep(.el-sub-menu__title) {
      line-height: 46px;
    }
    :deep(.el-menu-item) {
      line-height: 46px;
    }
  }
}
:deep(.el-menu) {
  border: none;
}
</style>
