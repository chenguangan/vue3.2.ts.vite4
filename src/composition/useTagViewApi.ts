import { reactive } from "vue";
import staticRoutes from "@/router/staticRoutes";
import { useRouter } from "vue-router";

const tags = reactive({
  routers: [{ path: "/", name: "首页" }],
});

export function useTagsViewHook() {
  const router = useRouter();

  /**
   * @param value String 当前menu对应的路由path
   * @param parentPath string 当前路由中父级路由
   */
  function setMenu(indexPath: any) {
    //判断tags里面是否已经包含点击的路由
    const hasValue = tags.routers.some((item, index) => {
      return item.path === indexPath;
    });

    //递归路由 匹配点击的路由
    function concatPath(arr: any, value: any) {
      if (!hasValue) {
        arr.forEach((constItem: any, constIndex: any) => {
          //如果匹配 直接push进tags
          if (constItem.path === value) {
            tags.routers.push({ path: value, name: constItem.name });
          } else {
            // 否则 查询是否还有子菜单，调用自身 继续查询
            if (constItem?.children?.length > 0) {
              concatPath(constItem.children, value);
            }
          }
        });
      }
    }
    concatPath(staticRoutes, indexPath);
  }

  /**
   * @param value String 当前删除tag路由
   * @param current Objct 当前激活路由对象
   */
  function deleteTag(value: any, current: any) {
    new Promise((resolve, reject) => {
      let valueIndex = tags.routers.findIndex((item, index) => {
        return item.path === value.path;
      });
      tags.routers.splice(valueIndex, 1);
      resolve(true);
    }).then(() => {
      if (current === value.path) {
        // 如果删除当前激活tag就自动切换到最后一个tag
        let newRoute = tags.routers.slice(-1);
        router.push({
          path: newRoute[0].path,
        });
      }
    });
  }
  return {
    tags, // 动态路由
    setMenu, // 设置动态路由
    deleteTag, // 删除tagview
  };
}
