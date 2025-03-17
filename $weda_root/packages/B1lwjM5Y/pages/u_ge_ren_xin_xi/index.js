import { createPage, PAGE_ROOT_SYMBOL } from '../../../../common/weapp-page'
import { concatClassList, px2rpx } from '@cloudbase/weda-client'
import { app, $app } from '../../../../app/weapps-api'
import { $1 as handlers } from '../../app/handlers'
const lifecycle = {}
const state = {}
const computed = {}
import { $page, $w } from './api'
import { widgetProps } from './data'





/** widget event listeners **/
const evtListeners = {"onform1$onDataChange": [
      {
          key: '',
          sourceKey: ':',
          handler: ({event})=>{
      if(event.currentTarget) {
        $app.utils.set(event.currentTarget._scope, 'dataContext.data', event?.detail?.data);
        $app.utils.set(event.currentTarget._scope, 'dataContext.state', event?.detail?.state);
      }
    },
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onbutton1$tap": [
      {
          key: 'w0280auq5ch',
          sourceKey: 'platform:utils.If',
          handler: function({args}){ return $app.utils.If(...args)},
          args: {
  "params": [
    {
      "alternate": false,
      "consequent": true
    }
  ]
},
          argsBinds: {'params.0.condition': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.form1.value.avatarUrl&&$w.form1.value.nickName
    )}}
        }
    ],"onbutton1$w0280auq5ch_success": [
      {
          key: 'wdqstak8gv5',
          sourceKey: 'u_ge_ren_xin_xi:updateUserInfo',
          handler: handlers.updateUserInfo,
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onbutton1$wdqstak8gv5_success": [
      {
          key: 'wt1gc8gzwl4',
          sourceKey: 'platform:showToast',
          handler: function({args}){ return $app.showToast(...args)},
          args: {
  "params": [
    {
      "icon": "success",
      "title": "保存成功",
      "duration": 1500
    }
  ]
},
          argsBinds: {}
        }
    ],"onbutton1$wt1gc8gzwl4_success": [
      {
          key: 'wnivfhbu3vt',
          sourceKey: 'platform:navigateBack',
          handler: function({args}){ return $app.navigateBack(...args)},
          args: {
  "params": [
    {}
  ]
},
          argsBinds: {}
        }
    ],"onbutton1$w0280auq5ch_fail": [
      {
          key: 'wg17rxakk5l',
          sourceKey: 'platform:showToast',
          handler: function({args}){ return $app.showToast(...args)},
          args: {
  "params": [
    {
      "icon": "warning",
      "title": "请填写完整信息",
      "duration": 1500
    }
  ]
},
          argsBinds: {}
        }
    ],}

const dataBinds = {
  [PAGE_ROOT_SYMBOL]: {
    
  },
  form1: { 'value': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ({
    avatarUrl:$w.auth.currentUser.avatarUrl,
    nickName:$w.auth.currentUser.nickName
})
    )}
  },
  uploadImage1: { 'callbacks.beforeUpload': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      result => {
  // console.log('beforeUpload', result);
  return true; // 可以通过返回false，禁用默认上传逻辑，自定义上传
  // return false;
}
    )}
  },
}

const query = {
}

const eventFlows = [
]

const datasetProfile = {
  "state": {}
}

createPage({
  app,
  pageContext: $page,
  id: 'u_ge_ren_xin_xi',
  widgetProps,
  lifecycle,
  state,
  computed,
  evtListeners,
  dataBinds,
  handlers,
  query,
  eventFlows,
  pageAttributes: {"appShareMessage":{"title":"","enable":false,"pageId":"","params":[],"imageUrl":"","packageName":""}},
  resetShare: false,
  datasetProfile
})
