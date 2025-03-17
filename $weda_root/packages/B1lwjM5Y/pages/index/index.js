import { createPage, PAGE_ROOT_SYMBOL } from '../../../../common/weapp-page'
import { concatClassList, px2rpx } from '@cloudbase/weda-client'
import { app, $app } from '../../../../app/weapps-api'
import { $0 as handlers } from '../../app/handlers'
const lifecycle = {}
const state = {}
const computed = {}
import { $page, $w } from './api'
import { widgetProps } from './data'





/** widget event listeners **/
const evtListeners = {"ontext1$tap": [
      {
          key: 'wh2200gi95d',
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
      $w.auth.currentUser.type===2
    )}}
        }
    ],"ontext1$wh2200gi95d_success": [
      {
          key: 'wij5hfhlnmh',
          sourceKey: 'platform:navigateTo',
          handler: function({args}){ return $app.navigateTo(...args)},
          args: {
  "params": [
    {
      "mode": "weDa",
      "pageId": "u_ge_ren_xin_xi",
      "params": {},
      "packageName": "B1lwjM5Y"
    }
  ]
},
          argsBinds: {}
        }
    ],"ongrid2$tap": [
      {
          key: 'w84asvilnft',
          sourceKey: 'platform:navigateTo',
          handler: function({args}){ return $app.navigateTo(...args)},
          args: {
  "params": [
    {
      "mode": "weDa",
      "pageId": "u_ge_ren_xin_xi",
      "params": {},
      "packageName": "B1lwjM5Y"
    }
  ]
},
          argsBinds: {}
        }
    ],"ongrid3$tap": [
      {
          key: 'wctznqld84t',
          sourceKey: 'platform:navigateTo',
          handler: function({args}){ return $app.navigateTo(...args)},
          args: {
  "params": [
    {
      "mode": "weDa",
      "pageId": "u_chang_jian_wen_ti",
      "params": {},
      "packageName": "B1lwjM5Y"
    }
  ]
},
          argsBinds: {}
        }
    ],"onindex$show": [
      {
          key: 'wi9tb7lo7sq',
          sourceKey: 'platform:callQuery',
          handler: function({data, $w}){ return $w[data.id]?.[data.method](data.data)},
          args: {
  "params": [
    {
      "id": "queryUserInfo",
      "method": "trigger"
    }
  ]
},
          argsBinds: {}
        }
    ],}

const dataBinds = {
  [PAGE_ROOT_SYMBOL]: {
    
  },
  image2: { 'src': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.auth.currentUser.avatarUrl||"https://lowcode-5g5llxbq5bc9299e-1300677802.tcloudbaseapp.com/resources/2024-08/lowcode-1923240"
    )}
  },
  text1: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.auth.currentUser.nickName||"默认昵称"
    )}
  },
  button1: { '_waDisplay': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      false
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.button1.style}; if(!display) {style.display = "none"}; return style })((
false
))
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
  id: 'index',
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
  resetShare: true,
  datasetProfile
})
