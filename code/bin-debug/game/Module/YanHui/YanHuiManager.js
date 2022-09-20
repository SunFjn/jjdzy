var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var YanHuiManager = (function () {
    function YanHuiManager() {
        this.isEnterYanHui = false;
    }
    YanHuiManager.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(YanHuiListItem.URL, YanHuiListItem);
        f(YanHui_ToumamentItem.URL, YanHui_ToumamentItem);
        f(YanHui_JingJiuItem.URL, YanHui_JingJiuItem);
        f(YanHui_JingJiuRewardItem.URL, YanHui_JingJiuRewardItem);
        f(YanHui_FWRewardItem.URL, YanHui_FWRewardItem);
        f(View_YanHuiScene_LeftPanel.URL, View_YanHuiScene_LeftPanel);
        f(View_YanHuiScene_TopPanel.URL, View_YanHuiScene_TopPanel);
        f(YanHui_ApplyListItem.URL, YanHui_ApplyListItem);
    };
    YanHuiManager.getInstance = function () {
        if (!this._instanc)
            this._instanc = new YanHuiManager();
        return this._instanc;
    };
    YanHuiManager.prototype.enter = function (mid) {
        if (mid === void 0) { mid = 0; }
        var self = this;
        var b = GGlobal.layerMgr.UI_MainBottom;
        b.addChild(View_YanHuiScene_LeftPanel.createInstance());
        b.addChild(View_YanHuiScene_TopPanel.createInstance());
        View_YanHuiScene_LeftPanel.createInstance().onShown();
        View_YanHuiScene_TopPanel.createInstance().onShown();
        ARPGMapManager.enter(0, UIConst.YANHUI, false);
        GGlobal.socketMgr.registerReconnectHD("YanHuiManager", Handler.create(self, self.onSocketClose));
        GGlobal.modelWorldNet.listen(Model_WorldNet.WORLD_SOCKET_CLOSE, self.worldNetCross, self);
        self.isEnterYanHui = true;
        if (!self.btnExit) {
            self.btnExit = GGlobal.commonpkg.createObject("CloseBt").asButton;
            self.btnExit.width = 67;
            self.btnExit.height = 75;
            self.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, self.exitFuBenHandle, self);
        }
        self.btnExit.setXY(fairygui.GRoot.inst.width + GGlobal.layerMgr.offx - 70, App.stageHeight - 80);
        b.addChild(self.btnExit);
        GGlobal.control.listen(UIConst.YANHUI_PVE_END, self.showReslt, self);
    };
    YanHuiManager.prototype.exitFuBenHandle = function () {
        var self = this;
        ViewAlert.show("退出宴会场景？", Handler.create(self, self.okHandler));
    };
    YanHuiManager.prototype.okHandler = function () {
        //发送失败协议
        GGlobal.modelYanHui.CG_Yanhui_quit_11467();
    };
    YanHuiManager.prototype.exite = function () {
        var self = this;
        var b = GGlobal.layerMgr.UI_MainBottom;
        MainUIController.showBottomExite(false);
        GGlobal.layerMgr.closeAllPanel();
        ModelArpgMap.getInstance().isAutoExite = true;
        View_YanHuiScene_LeftPanel.createInstance().onHide();
        View_YanHuiScene_TopPanel.createInstance().onHide();
        b.removeChild(View_YanHuiScene_LeftPanel.createInstance());
        b.removeChild(View_YanHuiScene_TopPanel.createInstance());
        b.removeChild(self.btnExit);
        self.isEnterYanHui = false;
        GGlobal.socketMgr.removeReconnectHD("YanHuiManager");
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        GGlobal.modelWorldNet.remove(Model_WorldNet.WORLD_SOCKET_CLOSE, self.worldNetCross, self);
        GGlobal.control.remove(UIConst.YANHUI_PVE_END, self.showReslt, self);
    };
    YanHuiManager.prototype.worldNetCross = function () {
        var self = this;
        ViewCommonWarn.text("检测网络异常，已从跨服玩法中退出");
        GGlobal.modelYanHui.CG_Yanhui_quit_11467();
        self.exite();
    };
    YanHuiManager.prototype.onSocketClose = function () {
        this.exite();
    };
    YanHuiManager.prototype.enterBattle = function () {
        var self = this;
        ViewMainTopUI1.instance.visible = true;
        ViewMainTopUI.instance.visible = false;
        View_YanHuiScene_LeftPanel.createInstance().visible = false;
        View_YanHuiScene_TopPanel.createInstance().visible = false;
        self.btnExit.visible = false;
    };
    YanHuiManager.prototype.exiteBattle = function () {
        var self = this;
        ViewMainTopUI.instance.visible = true;
        ViewMainTopUI1.instance.visible = false;
        ARPGMapManager.enter(0, UIConst.YANHUI, false);
        GGlobal.modelYanHui.CG_BATTLEEND_REENTERSCENE();
        View_YanHuiScene_LeftPanel.createInstance().visible = true;
        View_YanHuiScene_TopPanel.createInstance().visible = true;
        self.btnExit.visible = true;
    };
    YanHuiManager.prototype.showReslt = function (arg) {
        var self = this;
        self._arg = arg;
        Timer.instance.callLater(self.delayShowResultPanel, 200, self);
    };
    YanHuiManager.prototype.delayShowResultPanel = function () {
        var self = this;
        var arg = self._arg;
        if (arg.ret == 1) {
            ViewCommonWin.show(arg.awards, 5000, self, "确定", self.exiteBattle);
        }
        else {
            ViewCommonFail.show(5000, self, "退出", self.exiteBattle);
        }
    };
    return YanHuiManager;
}());
__reflect(YanHuiManager.prototype, "YanHuiManager");
