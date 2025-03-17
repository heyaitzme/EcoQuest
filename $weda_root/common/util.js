/* eslint-disable no-restricted-syntax */
'use strict';
import { auth } from '@cloudbase/weda-client';
const { checkAnonymous, __internal__ = {}} = auth;
const { getAuthConfig, redirectToLogin, getAccessPermission, findLoginPage, cleanAccessPermissionCache } = __internal__
import { getWedaAPI } from '@cloudbase/weda-client'

let LOGIN_CONFIG = {
  "logo": "https://sso-1303824488.cos.ap-shanghai.myqcloud.com/logo.svg",
  "backgroundColor": "#ffffff",
  "miniprogram": [
    {
      "id": "__miniprogram_pwdfree",
      "label": "wx3b4d181a1ac4704a(免登录)",
      "type": "miniprogram_pwdfree",
      "enable": true,
      "isOpposition": true,
      "providerSubType": "NO_AUTH_LOGIN",
      "wxAppId": "wx3b4d181a1ac4704a"
    }
  ],
  "web": [
    {
      "id": "__password",
      "label": "账户密码登录",
      "type": "password",
      "enable": true
    },
    {
      "id": "__sms",
      "label": "短信验证码",
      "type": "sms",
      "enable": true
    }
  ],
  "agreement": {
    "enable": false,
    "items": [
      {
        "label": "隐私协议",
        "type": "privacy",
        "value": "",
        "enable": false
      },
      {
        "label": "用户协议",
        "type": "user",
        "value": "",
        "enable": false
      }
    ]
  },
  "userRegistry": {
    "enable": false
  },
  "access": {
    "needLogin": true,
    "noPermissionPolicy": "show_warning",
    "defaultRoleId": "1663436551092715522",
    "defaultExternalRoleId": "1712387676222926850",
    "whiteListPageIds": "",
    "configVersion": "v1"
  },
  "security": {
    "expiresTime": 2592000,
    "enableLoginStatusShare": false
  }
}

export function findStatusPage() {
  const { app } = getWedaAPI();
  const { pages = [] } = app.__internal__.getConfig();
  return pages.find((item) => item.type === 'status');
}

export function formatErrorMsg(e) {
  let msg = e?.errMsg || e?.error_description || e?.message;
  const uri = e?.error_uri;
  msg = `${msg}${uri ? `-${uri}` : ''}`;
  if (msg.startsWith('request:fail')) {
    msg = `网络故障, 请检查本地网络连接是否正常(${msg})`;
  }
  return msg;
}

/**
 * 检查页面权限
 **/
export async function checkAuth(app, appId, $page) {
  

	const loginConfig = await getLoginConfig();
  // openid 登录特殊处理，不在登录页登录，在原地静默登录
	const hasOpenIdLoginType = loginConfig?.miniprogram?.find(v => v.type === 'openid_login')?.enable;
  const hasUnionIdLoginType = loginConfig?.miniprogram?.find(v => v.type === 'unionid_login')?.enable;

  const loginPage = findLoginPage(app);
  const loginPageUUID = loginPage?.uuid || loginPage?.id
  const currentUUID = $page.uuid || $page.id
  if (loginPageUUID === currentUUID) {
    return true;
  }
  const status = findStatusPage(app);
  if (status?.id === $page.id) {
    return true;
  }
  wx.showNavigationBarLoading();
  const requestList = [getAccessPermission(appId, $page.__internal__.packageName, $page.id, false)];
  // 暂时先认为有登录页则自定义登录功能开启且生效
  if (loginPage || hasOpenIdLoginType || hasUnionIdLoginType) {
    requestList.push(getAuthConfig(false));
  }
  try {
    const [accessData, authConfig] = await Promise.all(requestList);

    const isAnonymousUser = await checkAnonymous();
    // 如果当前页面匿名用户无权限访问
    if (!accessData?.isAccess) {
      // 当前匿名情况下，且需要登录后访问应用
      if (isAnonymousUser && (authConfig?.NeedLogin || authConfig?.RejectStrategy == 'to_login')) {
        if(hasOpenIdLoginType){
          // 开启了openId静默登录，则进行openid登录
          const result = await app.cloud.openIdLoginInWxApp();
          cleanAccessPermissionCache?.()
          return result
        } else if (hasUnionIdLoginType) {
          // 开启了unionId静默登录，则进行unionId登录
          const result = await app.cloud.unionIdLoginInWxApp();
          cleanAccessPermissionCache?.()
          return result
        }
        else if (loginPage) {
          // 开启了手机号授权登录，则判断是否跳转到登录页面
          redirectToLogin($page);
        }
      } else {
        app.showToast({
          title: ['-2', '-4'].includes(accessData?.roleId) ? '默认访客无权限' : '页面无访问权限',
          icon: 'error',
        });
      }
    } else if (authConfig?.NeedLogin && isAnonymousUser) {
      // 此分支逻辑本不应该前端判断是否登录，历史原因后端短期内搞不定，后续后端优化后删除
      // 如果当前页面匿名用户有权限访问，且需要登录后访问应用，则按配置进行登录
      if (hasOpenIdLoginType) {
        // openId静默登录
        const result = await app.cloud.openIdLoginInWxApp();
        cleanAccessPermissionCache?.()
        return result
      } else if (hasUnionIdLoginType) {
        // 开启了unionId静默登录
        const result = await app.cloud.unionIdLoginInWxApp();
        cleanAccessPermissionCache?.()
        return result
      } else if (loginPage) {
        try {
          redirectToLogin($page);
          return false;
        } catch (e) {
          redirectToLogin($page);
          return false;
        }
      }
    }

    return accessData?.isAccess;
  } catch (e) {
    if(app?.__internal__?.activePage?.id === $page.id) {
      throw new Error(formatErrorMsg(e))
    }
    return false;
  } finally {
    wx.hideNavigationBarLoading();
  }
}



export async function getExpiredMessage(createdTime = 0) {
  if (wx.getSystemInfoSync().platform === 'devtools') {
    return ;
  }

}

export async function getLoginConfig() {
  const { app } = getWedaAPI()
  
  const { staticResourceDomain, loginConfigVersion, id } = app.__internal__?.getConfig() || {};
  if (staticResourceDomain && loginConfigVersion && id) {
    const url = app.__internal__?.resolveStaticResourceUrl?.(`/__auth/app/app-knOvn7Zo/login.config.v1_d08f869080065f6284282e673bd8e895.json`)
    if (!LOGIN_CONFIG) {
      LOGIN_CONFIG = await new Promise((resolve, reject) => {
        wx.request({
          url,
          success: res => {
            if(String(res.statusCode).startsWith('2')){
              resolve(res.data)
            } else {
              reject(new Error(`statusCode: ${res.statusCode} 获取${url}失败`))
            }
          },
          fail: e => {
            const error = new Error(e.errMsg)
            error.code = e.errno
            reject(error)
          }
        })
      })
    }
    return LOGIN_CONFIG
  } else {
    throw new Error('缺少登录配置');
  }
  
}
