import { $w as baseAPI } from '../../app/weapps-api'

export const $page = {
  "__internal__": {
    "active": false,
    "packageName": ""
  },
  "uuid": "index",
  "label": "主应用(在搭建微信云模板时为空壳)"
};

export const $w = new Proxy(
  baseAPI,
  {
    get(target, prop) {
      /**
       * 使用当前实例进行覆盖
       */
      if (prop === '$page' || prop === 'page') {
        return $page;
      }

      // 代理页面级 query
      if ($page.dataset?.query?.[prop]) {
        return $page.dataset.query[prop];
      }

      // 代理页面 flow
      if ($page.__internal__.eventFlows?.[prop]) {
        return $page.__internal__.eventFlows[prop];
      }

      // 尝试代理页面级别组件实例
      const pageWidget = $page.widgets?.[prop];
      if (pageWidget) {
        return pageWidget._userWidget;
      }
      return target[prop]
    },
  },
);

$page.__internal__.$w = $w
