var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var RESManager = (function (_super) {
    __extends(RESManager, _super);
    function RESManager() {
        var _this = _super.call(this) || this;
        _this.map = {};
        _this.loadQueue = [];
        _this.ref0List = [];
        return _this;
    }
    RESManager.prototype.refRes = function (val, type) {
        var res = this.map[val];
        if (!res) {
            res = RESObj.create(type);
            res.val = val;
            this.map[val] = res;
            this.loadQueue.push(res);
            this.loadNext();
        }
        else {
            if (res.inDList) {
                var index = this.ref0List.indexOf(res);
                res.inDList = false;
                this.ref0List.splice(index, 1);
            }
        }
        res.refCount++;
        return res;
    };
    RESManager.prototype.reduceRes = function (val) {
        var res = this.map[val];
        if (res) {
            res.refCount--;
            if (res.refCount <= 0) {
                res.ref0Time = egret.getTimer();
                if (!res.inDList) {
                    res.inDList = true;
                    this.ref0List.push(res);
                }
            }
        }
        return res;
    };
    RESManager.prototype.onLoaded = function () {
        this.loadingRes = null;
        this.loadNext();
    };
    RESManager.prototype.loadNext = function () {
        if (!this.loadingRes && this.loadQueue.length) {
            while (this.loadQueue.length) {
                var res = this.loadQueue.shift();
                if (res) {
                    this.loadingRes = res;
                    res.startLoad();
                    break;
                }
            }
        }
    };
    RESManager.prototype.checkDestory1 = function () {
        var count = 0;
        while (this.ref0List.length) {
            if (count > 2) {
                break;
            }
            count++;
            var res = this.ref0List.shift();
            res.inDList = false;
            if (res.refCount == 0) {
                if (true) {
                    // ViewCommonWarn.text("releaseMC:" + res.val);
                }
                this.destoryRes(res);
                RESManager.wechatInvild = 1;
            }
        }
    };
    RESManager.prototype.destoryRes = function (resobj) {
        if (resobj === this.loadingRes) {
            return;
        }
        delete this.map[resobj.val];
        if (resobj.state == -1) {
            var loadindex = this.loadQueue.indexOf(resobj);
            if (loadindex >= 0) {
                this.loadQueue.splice(loadindex, 1);
            }
        }
        resobj.dispose();
    };
    RESManager.getVersionUrl = function (url) {
        if (url == "resource/default.res.json") {
            if (true) {
                if (url == "resource/default.res.json") {
                    url = "default.res" + ".json";
                    return url;
                }
                return GGlobal.resHead + url;
            }
            else {
                url = "default.res" + "_" + GGlobal.clientversion + ".json";
                return url;
            }
        }
        if (true) {
            return GGlobal.resHead + url;
        }
        var cfgUrl = RESManager.getGameCFGUrl(url);
        if (cfgUrl != url) {
            return cfgUrl;
        }
        var versionObj = ResourceVersionConfig.urlDic;
        if (versionObj) {
            var ver = 1;
            var realKey = url;
            if (url.indexOf("resource/") == 0) {
                realKey = url.slice(9);
            }
            if (versionObj[realKey]) {
                ver = versionObj[realKey];
            }
            var urls = url.split(".");
            url = urls[0] + "_v" + ver + "." + urls[1];
        }
        url = GGlobal.resHead + url;
        return url;
    };
    //gameCfg配置里的url
    RESManager.getGameCFGUrl = function (url) {
        var versionObj = ResourceVersionConfig.urlDic;
        if (Model_GlobalMsg.resVer && versionObj && Model_GlobalMsg.resArr && Model_GlobalMsg.resArr.length) {
            var curV = versionObj["resource/default.res.json"];
            if (Model_GlobalMsg.resVer == curV) {
                if (Model_GlobalMsg.resArr.indexOf(url) != -1) {
                    return "resource/" + Model_GlobalMsg.resVer + "/" + url;
                }
            }
        }
        return url;
    };
    RESManager.getPartVersion = function (url) {
        var versionObj = ResourceVersionConfig.urlDic;
        var ver = 1;
        if (versionObj) {
            if (versionObj[url]) {
                ver = versionObj[url];
            }
        }
        return ver;
    };
    //此处用于清理图集,动画图集有额外的规则，不适用这个方法清理
    RESManager.destoryRes = function (url, needHead) {
        if (needHead === void 0) { needHead = false; }
        if (needHead)
            url = RESManager.getVersionUrl(url);
        if (url && IconUtil.checkCanRelease(url)) {
            RES.destroyRes(url);
        }
    };
    //加载完成的纹理集再在此处添加。
    RESManager.recordUrl = function (url, texture) {
        if (texture) {
            RESManager.totalTexture[url] = texture;
        }
    };
    RESManager.removeUrl = function (url) {
        if (RESManager.totalTexture[url]) {
            delete RESManager.totalTexture[url];
        }
    };
    RESManager.wechatGC = function () {
        if (PlatformManager.isWx() && RESManager.wechatInvild) {
            wx.triggerGC();
            RESManager.wechatInvild = 0;
        }
    };
    RESManager.recordMapInvild = function (cfgid, st) {
        var self = this;
        var cfg = Config.map_200[cfgid];
        if (!cfg) {
            return;
        }
        var mapid = cfg.s;
        var temp = {};
        if (!self._mapSrc[mapid]) {
            self._mapSrc[mapid] = temp;
            temp.urls = [];
        }
        temp = self._mapSrc[mapid];
        temp.state = st;
    };
    RESManager.addMapBlockURL = function (url, mapid) {
        var self = this;
        var now = egret.getTimer();
        var temp = {};
        temp = self._mapSrc[mapid];
        temp.state = 1;
        if (temp.urls.indexOf(url) == -1) {
            temp.urls.push(url);
        }
    };
    RESManager.checkMapSRC = function () {
        var self = this;
        for (var mapid in self._mapSrc) {
            var item = self._mapSrc[mapid];
            if (item.state == 0 && item.urls && item.urls.length) {
                while (item.urls.length) {
                    RES.destroyRes(item.urls.shift());
                }
                delete self._mapSrc[mapid];
            }
        }
    };
    RESManager.checkRes = function (ctx) {
        var self = this;
        var nowTime = ctx;
        if (self._nextCheckT == 0)
            self._nextCheckT = nowTime;
        if (nowTime > self._nextCheckT) {
            var checkt = 60000;
            if (true)
                checkt = 5000;
            self._lastCount = self._lastCount % 4;
            switch (self._lastCount) {
                case 1:
                    if (GGlobal.resMgr) {
                        IconUtil.checkIconLife();
                    }
                    break;
                case 2:
                    if (GGlobal.resMgr) {
                        GGlobal.layerMgr.checkPanelLife();
                    }
                    break;
                case 3:
                    if (GGlobal.resMgr) {
                        GGlobal.resMgr.checkDestory1();
                    }
                    break;
                case 0:
                    RESManager.checkMapSRC();
                    break;
            }
            self._lastCount++;
            self._nextCheckT += checkt;
        }
        RESManager.wechatGC();
    };
    //==========================================定时检测游戏纹理集的引用情况================
    RESManager.totalTexture = {};
    RESManager.wechatInvild = 0;
    //===================地图资源特殊处理
    RESManager._mapSrc = {};
    //===================地图资源特殊处理
    RESManager._lastCount = 0;
    RESManager._nextCheckT = 0;
    return RESManager;
}(egret.EventDispatcher));
__reflect(RESManager.prototype, "RESManager");
