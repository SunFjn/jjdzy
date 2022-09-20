var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BossZCManager = (function () {
    function BossZCManager() {
    }
    BossZCManager.enter = function (mid) {
        if (mid === void 0) { mid = 0; }
        ARPGMapManager.enter(0, UIConst.BOSS_BATTLEFIELD_CROSS, false);
        if (!this.timer) {
            this.timer = BossZCTimer.createInstance();
        }
        this.timer.show1();
        GGlobal.socketMgr.registerReconnectHD("BossZCManager", Handler.create(this, this.onSocketClose));
        GGlobal.modelWorldNet.listen(Model_WorldNet.WORLD_SOCKET_CLOSE, this.worldNetCross, this);
        GGlobal.control.listen(Enum_MsgType.BOSSZC_READYTIME, BossZCManager.setTimer, BossZCManager);
        this.inAcitvity = 1;
    };
    BossZCManager.exite = function () {
        var s = this;
        if (!this.inAcitvity) {
            return;
        }
        this.inAcitvity = 0;
        if (this.timer)
            this.timer.hide1();
        this.timer = null;
        ModelArpgMap.getInstance().isAutoExite = true;
        GGlobal.modelBossZc.CGExite();
        GGlobal.socketMgr.removeReconnectHD("BossZCManager");
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        if (GGlobal.modelBossZc.sceneType == 1) {
            GGlobal.layerMgr.open(UIConst.BOSS_BATTLEFIELD_LOCAL);
        }
        else {
            GGlobal.layerMgr.open(UIConst.BOSS_BATTLEFIELD_CROSS);
        }
        GGlobal.control.remove(Enum_MsgType.BOSSZC_READYTIME, BossZCManager.setTimer, BossZCManager);
        GGlobal.modelWorldNet.remove(Model_WorldNet.WORLD_SOCKET_CLOSE, this.worldNetCross, this);
    };
    BossZCManager.worldNetCross = function () {
        var m = GGlobal.modelBossZc;
        if (m.sceneType == Model_BossZC.CROSS) {
            ViewCommonWarn.text("检测网络异常，已从跨服玩法中退出");
            GGlobal.modelBossZc.CGExite();
            BossZCManager.exite();
        }
    };
    BossZCManager.onSocketClose = function () {
        this.exite();
    };
    BossZCManager.setTimer = function () {
        var st = GGlobal.modelBossZc.sceneState;
        if (st == 3) {
            if (this.timer)
                this.timer.hide1();
            this.timer = null;
        }
        else if (st == 1 || st == 2) {
            if (!this.timer) {
                this.timer = BossZCTimer.createInstance();
            }
            this.timer.show1();
        }
    };
    BossZCManager.enterBattle = function () {
        if (this.timer)
            this.timer.hide1();
    };
    BossZCManager.battleEnd = function (result, arr) {
        if (arr === void 0) { arr = []; }
        if (result == 1) {
            BossZCManager.enter();
            ViewCommonWin.show(arr, 5000, this, "确定", null, null, true);
        }
        else {
            BossZCManager.exite();
            ViewCommonFail.show(5000, this, "退出", BossZCManager.exite, null, null, true);
        }
    };
    BossZCManager.inAcitvity = 0;
    return BossZCManager;
}());
__reflect(BossZCManager.prototype, "BossZCManager");
