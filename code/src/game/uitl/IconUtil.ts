class IconUtil {
    private static imgMap: any = {};
    private static urlCounterMap: any = {};
    public static setImg1(url: string,img: fairygui.GLoader, loadCom?: Handler) {
        IconUtil.setImg(img, url, loadCom);
    }
    public static setImg(img: fairygui.GLoader, url: string, loadCom?: Handler) {
        if (img == null) return;
        let ic = IconUtil;
        if (url) {
            var fullUrl = RESManager.getVersionUrl(url);
            var preUrl: string = ic.imgMap[img.hashCode];
            if (preUrl && preUrl != fullUrl) {
                ic.reduceUrlCounter(preUrl);
                ic.imgMap[img.hashCode] = fullUrl;
                ImageLoader.instance.loader(url, img, loadCom)
            } else if (!preUrl) {
                ic.imgMap[img.hashCode] = fullUrl;
                ImageLoader.instance.loader(url, img, loadCom)
            }
        } else {
            preUrl = ic.imgMap[img.hashCode];
            if (preUrl) {
                ic.reduceUrlCounter(preUrl);
                delete ic.imgMap[img.hashCode];
            }
            ImageLoader.instance.removeLoader(img);
            img.texture = null;
        }
    }

    public static addUrlCounter(fullUrl: string) {
        let ic = IconUtil;
        if (ic.urlCounterMap[fullUrl]) {
            ic.urlCounterMap[fullUrl].count++;
        } else {
            ic.urlCounterMap[fullUrl] = {};
            ic.urlCounterMap[fullUrl].count = 1;
        }
    }
    public static reduceUrlCounter(fullUrl: string) {
        let ic = IconUtil;
        if (ic.urlCounterMap[fullUrl]) {
            ic.urlCounterMap[fullUrl].count--;
            ic.urlCounterMap[fullUrl].lifeTime = egret.getTimer();
            // if (!ic.urlCounterMap[fullUrl] && RES.hasRes(fullUrl) && this.checkCanRelease(fullUrl)) {
            // RES.destroyRes(fullUrl);
            // ic.urlCounterMap[fullUrl].lifeTime = egret.getTimer(); 
            // }
        }
    }

    public static checkIconLife() {
        let time1 = 120000;
        if (DEBUG) time1 = 5000;
        let now = egret.getTimer();
        let ic = IconUtil;
        for (let key in ic.urlCounterMap) {
            if (ic.urlCounterMap[key].count == 0 && RES.hasRes(key) && ic.checkCanRelease(key)) {
                if (now - ic.urlCounterMap[key].lifeTime > time1) {
                    RES.destroyRes(key);
                    delete ic.urlCounterMap[key];
                    RESManager.wechatInvild = 1;
                }
            }
        }
    }

    public static checkCanRelease(fullUrl) {
        var item = RES["config"].getResource(fullUrl);
        if (item) {
            var data = RES["host"]["get"](item);
            if (!data) {
                return false;
            }
            return true;
        }
        return false;
    }
}