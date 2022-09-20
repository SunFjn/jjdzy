/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform1 {

    getUserInfo(): Promise<any>;
    login(): Promise<any>;
    checkUpdate(): any;
    update(): Promise<any>;
}

class DebugPlatform implements Platform1 {
    async getUserInfo() {
        return { nickName: "username" }
    }
    async login() {
    }
    checkUpdate() {
        try {
            const updateManager = wx.getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                console.log("@@版本是否有更新(hasUpdate):" + res.hasUpdate);// 请求完新版本信息的回调
                if (res.hasUpdate) {
                    fileUtils.fs.remove("temp_UI/");
                    fileUtils.fs.remove("temp_config/");
                    fileUtils.fs.remove("temp_sound/");
                    fileUtils.fs.remove("temp_map/");
                }
                return res.hasUpdate;
            });
        } catch (e) {
            return false;
        }
    }
    async update() {
        return new Promise(function (resolve) {
            try {
                const updateManager = wx.getUpdateManager();
                updateManager.onUpdateReady(function () {
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success: function (res) {
                            if (res.confirm) {
                                console.log("@@新版本下载成功");
                                updateManager.applyUpdate();// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                resolve();
                            }
                        }
                    })
                })
                updateManager.onUpdateFailed(function () {
                    console.log("@@新版本下载失败");
                    resolve();
                });
            } catch (e) {
                resolve();
            }
        })
    }
}
if (!window.platform1) {
    window.platform1 = new DebugPlatform();
}
declare let platform1: Platform1;

declare interface Window {
    platform1: Platform1
}

/**
 * 调用原wx的API
 */
declare namespace wx {
    let login: Function;
    let getUserInfo: Function;
    let getUpdateManager: Function;
    let showModal: Function;
    let getFileSystemManager: Function;
    let triggerGC:Function;
    let createInnerAudioContext;
}



