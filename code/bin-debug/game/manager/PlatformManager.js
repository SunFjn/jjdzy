var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlatformManager = (function () {
    function PlatformManager() {
    }
    /**
     * 根据策划表判断是否属于当前平台
    */
    PlatformManager.getPlatform = function (str) {
        var ret = false;
        if (GGlobal.loginArg.pfcode) {
            ret = GGlobal.loginArg.pfcode == str;
        }
        return ret;
    };
    PlatformManager.getPfIndex = function () {
        if (!PlatformManager._pfIndex) {
            var ret = GGlobal.loginArg.pfcode;
            if (ret) {
                for (var keys in Config.ptdyb_316) {
                    var v = Config.ptdyb_316[keys];
                    if (PlatformManager.isYiXin1377) {
                        if (v.pfcode == "ztsgzj01-yx") {
                            PlatformManager._pfIndex = v.wd;
                            break;
                        }
                    }
                    else if (ret.indexOf(v.pfcode) != -1) {
                        PlatformManager._pfIndex = v.wd;
                        break;
                    }
                }
            }
        }
        return PlatformManager._pfIndex;
    };
    PlatformManager.isWx = function () {
        if (PlatformManager._wxst == -1) {
            try {
                if (wx) {
                    PlatformManager._wxst = 1;
                }
            }
            catch (e) {
                PlatformManager._wxst = 0;
            }
        }
        return PlatformManager._wxst == 1;
    };
    Object.defineProperty(PlatformManager, "isWanZi", {
        /**万紫*/
        get: function () {
            return PlatformManager.checkPlatform("wzsgzj01");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformManager, "isDuoYu", {
        /**多娱*/
        get: function () {
            return PlatformManager.checkPlatform("dysgzj01");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformManager, "isGaoRe", {
        /**高热*/
        get: function () {
            return PlatformManager.checkPlatform("grsgzj01");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformManager, "is1377", {
        /**赞钛 1377*/
        get: function () {
            return PlatformManager.checkPlatform("ztsgzj01");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformManager, "isYiXin1377", {
        //ztsgzj01-yxapk	壹心-安卓
        //ztsgzj01-yxios	壹心-iOS
        get: function () {
            return PlatformManager.checkPlatform("ztsgzj01-yx");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformManager, "isTanWan", {
        /**贪玩*/
        get: function () {
            return PlatformManager.checkPlatform("twsgzj01") || PlatformManager.checkPlatform("twsgzj02");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformManager, "is350", {
        /**350*/
        get: function () {
            return PlatformManager.checkPlatform("swsgzj01");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformManager, "is915", {
        /**915 千腾*/
        get: function () {
            return PlatformManager.checkPlatform("jywsgzj01");
        },
        enumerable: true,
        configurable: true
    });
    PlatformManager.checkPlatform = function (pf) {
        return GGlobal.loginArg && GGlobal.loginArg.pfcode && GGlobal.loginArg.pfcode.indexOf(pf) != -1;
    };
    /**
     * 0无，1 微端1,2 微端2,
    */
    PlatformManager._pfIndex = 0;
    PlatformManager._wxst = -1;
    return PlatformManager;
}());
__reflect(PlatformManager.prototype, "PlatformManager");
