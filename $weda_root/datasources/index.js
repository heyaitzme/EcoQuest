import { auth, getWedaAPI, app as clientApp } from '@cloudbase/weda-client'
import { default as config, AEGIS_CONFIG } from './config'

clientApp.init({
  ...config,
  // 设置数据源请求的 loading 及 toast 处理
  beforeDSRequest: (cfg) => {
    const { app } = getWedaAPI();
    if (!cfg.options || !cfg.options.showLoading) return;
    app.showLoading();
  },
  afterDSRequest: (cfg, error, result) => {
    const { app } = getWedaAPI();
    if (!cfg.options) return;
    if (cfg.options.showLoading) app.hideLoading();
    if (!cfg.options.showToast) return;
    const isSuccess = !error && result && !result.code;
    app.showToast({ icon: isSuccess ? 'success' : 'error' });
  },
})


require.async('../packages/$wd_system/index.js').then(({ Aegis }) => {
  let _aegis = new Aegis(AEGIS_CONFIG);
  const app = getApp();
  if(!app.globalData) {
    app.globalData = {}
  }
  app.globalData._aegis = _aegis;
})


// 防止报类型不匹配warning
const originWarn = console.warn;
const warningSkipRegexp = /(type-uncompatible)|(slot "[\w-]*?" is not found)/;
console.warn = (...args) => {
  // 只看第一条
  const shouldSkip = args.length > 0 && args[0][0] === '[' && args[0][1] === 'C' && warningSkipRegexp.test(args[0]);
  if (!shouldSkip) {
    originWarn(...args);
  }
};
