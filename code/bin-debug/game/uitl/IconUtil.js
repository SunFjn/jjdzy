var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var IconUtil = (function () {
    function IconUtil() {
    }
    IconUtil.setImg1 = function (url, img, loadCom) {
        IconUtil.setImg(img, url, loadCom);
    };
    IconUtil.setImg = function (img, url, loadCom) {
        if (img == null)
            return;
        var ic = IconUtil;
        if (url) {
            var fullUrl = RESManager.getVersionUrl(url);
            var preUrl = ic.imgMap[img.hashCode];
            if (preUrl && preUrl != fullUrl) {
                ic.reduceUrlCounter(preUrl);
                ic.imgMap[img.hashCode] = fullUrl;
                ImageLoader.instance.loader(url, img, loadCom);
            }
            else if (!preUrl) {
                ic.imgMap[img.hashCode] = fullUrl;
                ImageLoader.instance.loader(url, img, loadCom);
            }
        }
        else {
            preUrl = ic.imgMap[img.hashCode];
            if (preUrl) {
                ic.reduceUrlCounter(preUrl);
                delete ic.imgMap[img.hashCode];
            }
            ImageLoader.instance.removeLoader(img);
            img.texture = null;
        }
    };
    IconUtil.addUrlCounter = function (fullUrl) {
        var ic = IconUtil;
        if (ic.urlCounterMap[fullUrl]) {
            ic.urlCounterMap[fullUrl].count++;
        }
        else {
            ic.urlCounterMap[fullUrl] = {};
            ic.urlCounterMap[fullUrl].count = 1;
        }
    };
    IconUtil.reduceUrlCounter = function (fullUrl) {
        var ic = IconUtil;
        if (ic.urlCounterMap[fullUrl]) {
            ic.urlCounterMap[fullUrl].count--;
            ic.urlCounterMap[fullUrl].lifeTime = egret.getTimer();
            // if (!ic.urlCounterMap[fullUrl] && RES.hasRes(fullUrl) && this.checkCanRelease(fullUrl)) {
            // RES.destroyRes(fullUrl);
            // ic.urlCounterMap[fullUrl].lifeTime = egret.getTimer(); 
            // }
        }
    };
    IconUtil.checkIconLife = function () {
        var time1 = 120000;
        if (true)
            time1 = 5000;
        var now = egret.getTimer();
        var ic = IconUtil;
        for (var key in ic.urlCounterMap) {
            if (ic.urlCounterMap[key].count == 0 && RES.hasRes(key) && ic.checkCanRelease(key)) {
                if (now - ic.urlCounterMap[key].lifeTime > time1) {
                    RES.destroyRes(key);
                    delete ic.urlCounterMap[key];
                    RESManager.wechatInvild = 1;
                }
            }
        }
    };
    IconUtil.checkCanRelease = function (fullUrl) {
        var item = RES["config"].getResource(fullUrl);
        if (item) {
            var data = RES["host"]["get"](item);
            if (!data) {
                return false;
            }
            return true;
        }
        return false;
    };
    IconUtil.imgMap = {};
    IconUtil.urlCounterMap = {};
    return IconUtil;
}());
__reflect(IconUtil.prototype, "IconUtil");
