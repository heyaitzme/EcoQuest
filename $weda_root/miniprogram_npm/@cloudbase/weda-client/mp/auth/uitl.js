import { callWedaApiFn } from '../../common/models/request';
import { getWedaAPI } from '../app';
import { getAccessToken, loginScope } from './user';
export async function checkAnonymous() {
    let isAnonymous = true;
    try {
        const { accessToken } = await getAccessToken();
        isAnonymous = !accessToken;
        const { app } = getWedaAPI();
        // 私密链路有token则不是匿名; tcb链路会匿名登录需要多验证scope === 'anonymous'
        if (accessToken && app.__internal__.getCloudSdkConfig('endpointType') === 'tcb-api') {
            const scope = await loginScope();
            isAnonymous = scope === 'anonymous';
        }
    }
    catch (e) { }
    return isAnonymous;
}
export function findLoginPage() {
    const { app } = getWedaAPI();
    const { pages = [], loginConfigVersion } = app.__internal__.getConfig();
    const custom = pages.find((item) => item.type === 'login');
    if (loginConfigVersion) {
        return (custom || {
            id: 'login',
            packageName: '$wd_system',
            uuid: '$wd_system/login',
            type: 'login',
        });
    }
}
let _AUTH_CACHE_MAP = {};
export async function getAccessPermission(appId, packageName = '', pageId, isAdminPortal = false) {
    let cacheKey = `${appId}-${pageId}`;
    if (packageName) {
        const matched = packageName.match(/packages\/(.*)$/);
        const subKey = matched?.[1] || packageName;
        cacheKey = `${appId}-${subKey}-${pageId}`;
    }
    if (_AUTH_CACHE_MAP[cacheKey] !== undefined) {
        return _AUTH_CACHE_MAP[cacheKey];
    }
    const res = await callWedaApiFn('DescribeResourcesPermission', {
        ResourceType: isAdminPortal ? 'modelApp' : 'app',
        ResourceIdList: [cacheKey],
        AppResourceId: appId,
    });
    if (Array.isArray(res)) {
        const resourceInfo = res.find((i) => i.ResourceId === cacheKey);
        const isAccess = !!resourceInfo?.IsAccess;
        _AUTH_CACHE_MAP[cacheKey] = {
            isAccess,
            roleId: resourceInfo?.RoleId,
        };
        return _AUTH_CACHE_MAP[cacheKey];
    }
    else {
        throw new Error(`鉴权接口返回参数不正确 - ${JSON.stringify(res)}`);
    }
}
export function cleanAccessPermissionCache() {
    _AUTH_CACHE_MAP = {};
}
export function redirectToLogin(currentPage = undefined) {
    // 去登录则清空权限缓存。
    cleanAccessPermissionCache();
    const { app } = getWedaAPI();
    const loginPage = findLoginPage();
    if (!currentPage) {
        currentPage = app.utils.getCurrentPage() || {};
    }
    const loginPageUUID = loginPage?.uuid || loginPage?.id;
    const currentUUID = currentPage.uuid || currentPage.id;
    if (loginPageUUID === currentUUID) {
        return true;
    }
    if (loginPage) {
        app.redirectTo({
            pageId: loginPage.id,
            packageName: loginPage.packageName,
            params: {
                sourcePagePackageName: currentPage.__internal__.packageName || undefined,
                sourcePageId: currentPage.id,
                sourcePageParams: currentPage.params || currentPage.dataset?.params,
            },
        });
    }
    else {
        app.showToast({
            title: '用户未登录',
            icon: 'error',
        });
    }
}
let _AUTH_CONFIG_CACHE = null;
export async function getAuthConfig(isAdminPortal = false) {
    const { app } = getWedaAPI();
    if (_AUTH_CONFIG_CACHE) {
        return _AUTH_CONFIG_CACHE;
    }
    try {
        const res = await app.cloud.callWedaApi({
            action: 'DescribeRuntimeResourceStrategy',
            data: {
                ResourceType: isAdminPortal ? 'modelApp' : 'app',
                ResourceId: app.id,
            },
        });
        const settingData = {};
        // 云api不支持map只能传字符串，需要转换
        res.forEach((item) => {
            settingData[item.Key] = ['AllowRegister', 'NeedLogin'].includes(item.Key) ? item.Value === '1' : item.Value;
        });
        _AUTH_CONFIG_CACHE = settingData;
        return _AUTH_CONFIG_CACHE;
    }
    catch (e) {
        return {
            NeedLogin: false,
            RejectStrategy: 'show_warning',
        };
    }
}
