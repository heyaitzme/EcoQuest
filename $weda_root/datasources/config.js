import datasetProfiles from './dataset-profiles'
const dataSourceProfiles = require('./datasource-profiles.js')
import config from '../common/config'

/**
 * 数据源基本配置
 */
const CLOUD_CONFIG =  {
  /** 当前是否处于正式发布模式 */
  isProd: true,
  /** 低码应用ID */
  appID: 'app-knOvn7Zo',
  /** 云开发环境ID */
  envID: 'eco-quest-3gwkqe8gdf32aa70',
  /** 应用端ID */
  tcbClientId: 'AOJ8yAABpRixAI3zpmg',
  /** 云开发资源所属的微信app id */
  resourceAppid: '',
  /** 数据源描述对象数组 */
  dataSourceProfiles: dataSourceProfiles,
  /**
   * 新的dataset变量配置对象
   * key 为页面ID(全局为$global), val 为变量配置数组
   */
  datasetProfiles: datasetProfiles,
  /**
   * 确定调用链路
   */
  endpointType: config.endpointType,
  /**
   * 调用链路为 tcb-api 时有效
   * 私有化需要设置
   */
  tcbApiOrigin: config.tcbApiOrigin,
  /**
   * 是否是处于私有化版本
   */
  isPrivate: config.isPrivate,
  privatelink: undefined,
  getPrivatelinkAdapter: async function() {
    return require.async('../packages/$wd_system/index.js').then(({ tcbPrivatelinkAdapter }) => {
      return tcbPrivatelinkAdapter
    })
  },
  __defaultLoginType__: 'openId'
}

export default CLOUD_CONFIG

export const AEGIS_CONFIG = {
  id: 'lXHFsBpTjIzNADiczY', // 项目ID，即上报key
  reportApiSpeed: true, // 接口测速
  reportAssetSpeed: true, // 静态资源测速
  ext1: CLOUD_CONFIG.appID,
  ext3: [
    CLOUD_CONFIG.envID,
    '100038978651',
    '1.9.4',
    '3.2.10',
    wx.getAccountInfoSync()?.miniProgram?.appId || '',
  ].join('|'),
  version: "0.0.2",
  env: wx.getSystemInfoSync().platform === 'devtools' ? 'development' : CLOUD_CONFIG.isProd ? 'production' : 'pre',
  hostUrl: 'https://rumt-zh.com', // 上报域名，中国大陆 rumt-zh.com
  spa: true, // spa 页面需要开启，页面切换的时候上报pv
  beforeRequest: function(data) {
    if (data.logType === 'pv') {
      return false;
    }
    return data;
  }
}

