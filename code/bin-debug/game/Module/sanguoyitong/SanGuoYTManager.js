var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SanGuoYTManager = (function () {
    function SanGuoYTManager() {
    }
    SanGuoYTManager.enter = function (mid) {
        if (mid === void 0) { mid = 0; }
        ARPGMapManager.enter(0, UIConst.SANGUO_YITONG, false);
        GGlobal.socketMgr.registerReconnectHD("SanGuoYTManager", Handler.create(this, this.onSocketClose));
        GGlobal.layerMgr.open(UIConst.SANGUO_YITONG_SCENE);
        View_SanGuoYT_ButtomUI.createInstance().toShow();
    };
    SanGuoYTManager.exite = function () {
        var s = this;
        if (GGlobal.sceneType == SceneCtrl.WDTX_PVE) {
            GGlobal.mapscene.sceneCtrl.onExit();
        }
        ModelArpgMap.getInstance().isAutoExite = true;
        GGlobal.socketMgr.removeReconnectHD("SanGuoYTManager");
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        GGlobal.layerMgr.close2(UIConst.SANGUO_YITONG_SCENE);
        View_SanGuoYT_ButtomUI.createInstance().toHide();
        ARPGMapManager.exite();
    };
    SanGuoYTManager.enterBattle = function () {
        ViewMainTopUI1.instance.visible = true;
        ViewMainTopUI.instance.visible = false;
    };
    SanGuoYTManager.exiteBattle = function () {
        if (!GGlobal.modelSanGuoYT.state) {
            DEBUGWARING.log("三国一统已结束！！！");
            // GGlobal.layerMgr.open(UIConst.WENDINGTX_RET);
            return;
        }
        ViewMainTopUI.instance.visible = true;
        ViewMainTopUI1.instance.visible = false;
    };
    SanGuoYTManager.onSocketClose = function () {
        this.exite();
    };
    SanGuoYTManager.battleEnd = function (result, arr) {
        if (arr === void 0) { arr = []; }
        if (result == 1) {
            ViewCommonWin.show(arr, 5000, this, "确定", null, null, true);
        }
        else {
            ViewCommonFail.show(5000, this, "退出", SanGuoYTManager.exiteBattle, null, null, true);
        }
    };
    return SanGuoYTManager;
}());
__reflect(SanGuoYTManager.prototype, "SanGuoYTManager");
