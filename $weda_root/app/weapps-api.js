// 必须优先初始化数据源
import '../datasources/index';
import { observable } from 'mobx'
import { createMpApp, generateDatasetQuery, watchAndSyncDatasetState2Local, createComputed, _lodashGet as lodashGet } from '@cloudbase/weda-client';

import appGlobal from '../app/app-global'
import { default as cloudConfig } from '../datasources/config'
import { createDataset } from '../common/cloud-sdk'

import config from '../common/config';

import state from '../lowcode/state'
import computed from '../lowcode/computed'
const common = {}

const mainAppKey = '__weappsMainApp';
let GLOBAL_DATASET_SYNC_DISPOSES = [];





export const app = createGlboalApi()
export const $app = new Proxy({}, { get: function(obj, prop){ return app[prop] }});
export const $w = new Proxy(
  {},
  {
    get(_, prop) {
      return app.__internal__.$w?.[prop];
    },
  },
);

globalThis.__wedaGlobal__ = new Proxy({
  app,
  $w
}, {
  get(_, prop) {
    switch(prop) {
      case 'app':
      case '$app':
        return app
      case '$w':
        return $w
    }
    return undefined
  }
})

function createGlboalApi() {
  const mpApp = createMpApp({
    appConfig: {
      id: cloudConfig.appID,
      envId: cloudConfig.envID,
      staticResourceDomain: config.domain,
      privatelink: cloudConfig.privatelink,
      envVersion: cloudConfig.isProd ? 'production' : 'preview',
      ...({
  "label": "用户中心",
  "loginConfigVersion": "v1_d08f869080065f6284282e673bd8e895",
  "basename": "$weda_root",
  "pages": [
    {
      "id": "index",
      "type": ""
    }
  ]
})
    },
  });
  const globalAPI = Object.assign(mpApp, {
    state: observable(state),
    computed: createComputed(computed),
    common,
    ...mpApp,
    // ... other sdk apis & apis from mp
  }) // The global api exposed to lowcode

  /**
   * @deprecated utils._getConfig
   */
  globalAPI.utils._getConfig = () => {
    return globalAPI.__internal__.getConfig()
  }

  let dataset = createDataset('$global', undefined, {
    appId: globalAPI.id
  })
  dataset.query = generateDatasetQuery({
  }, {
    $app: globalAPI,
    $w: globalAPI.__internal__.$w,
  })

  GLOBAL_DATASET_SYNC_DISPOSES.forEach((dispose) => {
    dispose?.();
  });
  GLOBAL_DATASET_SYNC_DISPOSES = [];
  globalAPI.dataset = dataset
  GLOBAL_DATASET_SYNC_DISPOSES = watchAndSyncDatasetState2Local(globalAPI.id, '$global', globalAPI.dataset.state);

  globalAPI.state.dataset = dataset
  globalAPI.setState = (userSetState) => {
    Object.keys(userSetState).forEach((keyPath) => {
      globalAPI.utils.set(globalAPI.dataset.state, keyPath, userSetState[keyPath]);
    });
  };

  const subPackageName = ''
  if (subPackageName) {
    // is sub app
    globalAPI.mainApp = appGlobal[mainAppKey]
    const mpApp = getApp()
    mpApp && (mpApp.subApp = globalAPI)
  } else {
    // is mainApp
    appGlobal[mainAppKey] = globalAPI
  }

  // # expose some sdk modules
  /* const sdkModsIncluded = ['flow', 'getPageOptions', 'getLaunchOptions']
  sdkModsIncluded.forEach(key => {
    globalAPI[key] = sdk[key]
  }) */

  return globalAPI
}
