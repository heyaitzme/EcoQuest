import { createPage, PAGE_ROOT_SYMBOL } from '../../../../common/weapp-page'
import { concatClassList, px2rpx } from '@cloudbase/weda-client'
import { app, $app } from '../../../../app/weapps-api'
import { $2 as handlers } from '../../app/handlers'
const lifecycle = {}
const state = {}
const computed = {}
import { $page, $w } from './api'
import { widgetProps } from './data'





/** widget event listeners **/
const evtListeners = {"onicon2$tap": [
      {
          key: '',
          sourceKey: 'platform:invoke',
          handler: function({data, $w}){ return $app.invoke({...data, component: $w[data?.component]?._widget});},
          args: {
  "params": [
    {
      "method": "dealContentState",
      "params": {},
      "component": "card2",
      "module": "gsd-h5-react"
    }
  ]
},
          argsBinds: {'params.0.params.state': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.card2.contentState === `show` ? `hide` : `show`
    )}}
        }
    ],"onu_chang_jian_wen_ti$show": [
      {
          key: 'w037sxl423t',
          sourceKey: 'platform:callQuery',
          handler: function({data, $w}){ return $w[data.id]?.[data.method](data.data)},
          args: {
  "params": [
    {
      "id": "queryQAConfig",
      "method": "trigger"
    }
  ]
},
          argsBinds: {}
        }
    ],"onu_chang_jian_wen_ti$w037sxl423t_success": [
      {
          key: 'waz9mfkeekf',
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
      !$w.queryQAConfig.data?.records?.length
    )}}
        }
    ],"onu_chang_jian_wen_ti$waz9mfkeekf_success": [
      {
          key: 'wae3b18n21y',
          sourceKey: 'platform:_setStateVal',
          handler: function({args}){ return $app._setStateVal(...args)},
          args: {
  "params": [
    {
      "varPath": "$page.show"
    }
  ]
},
          argsBinds: {'params.0.val': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      true
    )}}
        }
    ],"onu_chang_jian_wen_ti$waz9mfkeekf_fail": [
      {
          key: 'w3ndju6yib2',
          sourceKey: 'platform:_setStateVal',
          handler: function({args}){ return $app._setStateVal(...args)},
          args: {
  "params": [
    {
      "varPath": "$page.show"
    }
  ]
},
          argsBinds: {'params.0.val': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      false
    )}}
        }
    ],}

const dataBinds = {
  [PAGE_ROOT_SYMBOL]: {
    
  },
  repeater1: { 'data': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.queryQAConfig?.data?.records
    )}
  },
  repeater1_item: { '_waFor': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.queryQAConfig?.data?.records
    )}
  },
  text2: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      `NO.${$w.index_listView1 + 1}`
    )}
  },
  text3: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.question
    )}
  },
  icon2: { 'name': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.card2.contentState === `show` ? `chevronup` : `chevrondown`
    )}
  },
  text6: { 'text': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.item_listView1.answer
    )}
  },
  container1: { '_waDisplay': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      $w.page.dataset.state.show
    )},'style': ($page, lists, forItems, event, $context, $w, params) => {const $for = forItems; const $index=lists?.[0]?.currentIndex; return(
      ((display)=>{ const style = {...widgetProps.container1.style}; if(!display) {style.display = "none"}; return style })((
$w.page.dataset.state.show
))
    )}
  },
}

const query = {
  queryQAConfig: { 
    ...({
  "id": "queryQAConfig",
  "name": "queryQAConfig",
  "type": "model",
  "trigger": "manual",
  "description": "",
  "data": {
    "params": [
      {
        "params": {
          "select": {
            "$master": true
          },
          "getCount": true
        },
        "methodName": "wedaGetRecordsV2",
        "dataSourceName": "cjwtpz_3utswpt"
      }
    ]
  }
}),
    handler: (...args) => $app.cloud.callDataSource(...args),
    dataBinds: {},
    eventHandlers: {}
  },
}

const eventFlows = [
]

const datasetProfile = {
  "state": {
    "show": {
      "name": "show",
      "label": "",
      "varType": "state",
      "dataType": "boolean",
      "initialValue": false
    }
  }
}

createPage({
  app,
  pageContext: $page,
  id: 'u_chang_jian_wen_ti',
  widgetProps,
  lifecycle,
  state,
  computed,
  evtListeners,
  dataBinds,
  handlers,
  query,
  eventFlows,
  pageAttributes: {},
  resetShare: false,
  datasetProfile
})
