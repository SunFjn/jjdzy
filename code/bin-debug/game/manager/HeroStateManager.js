var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HeroStateManager = (function () {
    function HeroStateManager() {
    }
    /**
     * 当前状态是否操作某个系统
     * 状态在系统限制表配置，新增状态需要在checkCondition添加
    */
    HeroStateManager.isCanDO = function (id, isMsg) {
        if (isMsg === void 0) { isMsg = true; }
        var ret = true;
        var tips;
        var cfg = Config.xitongxianzhi_001;
        if (cfg && cfg[id]) {
            var iCfg = cfg[id];
            var systemName = iCfg.name;
            for (var key in iCfg) {
                var val = iCfg[key]; //1为状态限制此功能
                if (val == 1) {
                    tips = this.checkCondition(key, isMsg);
                    if (tips) {
                        ret = false;
                        break;
                    }
                }
            }
        }
        if (isMsg && tips) {
            ViewCommonWarn.text(tips);
        }
        return ret;
    };
    /**
     * return null;//不限制
     * return msg
    */
    HeroStateManager.checkCondition = function (stateName, isMsg) {
        if (isMsg === void 0) { isMsg = false; }
        var msg;
        var isCanDo;
        switch (stateName) {
            case "guanqia"://关卡
                isCanDo = GGlobal.sceneType == SceneCtrl.GUANQIA;
                msg = isCanDo ? "关卡中不可进行操作" : null;
                break;
            case "guanqiaBoss"://关卡BOSS
                isCanDo = GGlobal.modelGuanQia.inGuanQiaBoss();
                msg = isCanDo ? "关卡BOSS中不可进行操作" : null;
                break;
            case "city"://主城
                isCanDo = GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN);
                msg = isCanDo ? "主城中不可进行操作" : null;
                break;
            case "teamfb"://组队副本
                isCanDo = GGlobal.sceneType == SceneCtrl.CROSS_TEAM;
                msg = isCanDo ? "组队副本中不可进行操作" : null;
                break;
            case "xuezhandaodi"://血战到底
                isCanDo = GGlobal.sceneType == SceneCtrl.WARTODEAD;
                msg = isCanDo ? "副本中不可进行操作" : null;
                break;
            case "sjmj":
                isCanDo = GGlobal.sceneType == SceneCtrl.CROSS_SJMJ;
                msg = isCanDo ? "副本中不可进行操作" : null;
                break;
            case "fhly":
                isCanDo = GGlobal.modelFengHuoLY.inActivity;
                msg = isCanDo ? "烽火狼烟中不可进行操作" : null;
                break;
            case "bosszc":
            case "bosszc1":
                isCanDo = Model_BossZC.isInScene;
                msg = isCanDo ? "BOSS战场中不可进行操作" : null;
                break;
            case "help":
                isCanDo = GGlobal.sceneType == SceneCtrl.GUANQIABOSS_HELP;
                msg = isCanDo ? "关卡协助中不可进行操作" : null;
                break;
            case "kuang":
                isCanDo = GGlobal.layerMgr.isOpenView(UIConst.CROSS_MINERAL);
                msg = isCanDo ? "矿藏中不可进行操作" : null;
                break;
            case "lu":
                isCanDo = GGlobal.layerMgr.isOpenView(UIConst.QXZL);
                msg = isCanDo ? "群雄逐鹿中不可进行操作" : null;
                break;
            case "cao":
                isCanDo = GGlobal.modelLiangCao.isInScene;
                msg = isCanDo ? "群雄逐鹿中不可进行操作" : null;
                break;
            case "home":
                isCanDo = HomeModel.inHome;
                msg = isCanDo ? "府邸中不可进行操作" : null;
                break;
            case "lhfb":
                isCanDo = GGlobal.modelLhfb.isInAct;
                msg = isCanDo ? "轮回副本不可进行操作" : null;
                break;
        }
        return msg;
    };
    HeroStateManager.wuJLimit = function () {
        if (GGlobal.modelFengHuoLY.inActivity) {
            ViewCommonWarn.text("烽火狼烟中不可对武将进行操作");
            return true;
        }
        if (Model_BossZC.isInScene) {
            ViewCommonWarn.text("BOSS战场中不可对武将进行操作");
            return true;
        }
        if (Model_Syzlb.batIng) {
            ViewCommonWarn.text("三英战吕布中不可对武将进行操作");
            return true;
        }
        if (GGlobal.modelKfwz.isInBattle) {
            ViewCommonWarn.text("跨服王者战斗中不可对武将进行操作");
            return true;
        }
        if (GGlobal.modelLhfb.isInBattle) {
            ViewCommonWarn.text("轮回副本战斗中不可对武将进行操作");
            return true;
        }
        return false;
    };
    return HeroStateManager;
}());
__reflect(HeroStateManager.prototype, "HeroStateManager");
