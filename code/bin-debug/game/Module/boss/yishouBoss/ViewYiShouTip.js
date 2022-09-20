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
var ViewYiShouTip = (function (_super) {
    __extends(ViewYiShouTip, _super);
    function ViewYiShouTip() {
        var _this = _super.call(this) || this;
        _this.timeUpdate = function () {
            var self = _this;
            self._time--;
            if (self._time <= 0) {
                YiShouBossCtrl.getInst().startResult();
            }
            else {
                self.btnExite.text = "退出(" + self._time + "s)";
            }
        };
        _this.onSure = function () {
            if (Model_player.voMine.yuanbao < ConfigHelp.getSystemNum(7302)) {
                ViewCommonWarn.text("元宝不足");
                YiShouBossCtrl.getInst().startResult();
            }
            else {
                YiShouBossCtrl.getInst().startRevive();
            }
        };
        _this.onExite = function () {
            YiShouBossCtrl.getInst().startResult();
        };
        _this.eventFun = function (v) {
            var self = _this;
            var regster = EventUtil.register;
            regster(v, self.btnSure, egret.TouchEvent.TOUCH_TAP, self.onSure, self);
            regster(v, self.btnExite, egret.TouchEvent.TOUCH_TAP, self.onExite, self);
        };
        _this._time = 20;
        _this.loadRes("Boss", "Boss_atlas0");
        return _this;
    }
    ViewYiShouTip.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "ViewYiShouTip"));
    };
    ViewYiShouTip.prototype.childrenCreated = function () {
        var self = this;
        self.isClosePanel = false;
        self.view = fairygui.UIPackage.createObject("Boss", "ViewYiShouTip").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
        self.lbTip.text = BroadCastManager.reTxt("是否花费<font color='#FFC344'>{0}元宝</font>复活？\n（退出战斗BOSS血量将回满）", ConfigHelp.getSystemNum(7302));
    };
    ViewYiShouTip.prototype.closeEventHandler = function (evt) {
        _super.prototype.closeEventHandler.call(this, evt);
        YiShouBossCtrl.getInst().startResult();
    };
    ViewYiShouTip.prototype.onShown = function () {
        var self = this;
        self._time = 20;
        self.eventFun(1);
        Timer.instance.listen(self.timeUpdate, self, 1000);
        self.btnExite.text = "退出(" + self._time + "s)";
    };
    ViewYiShouTip.prototype.onHide = function () {
        var self = this;
        self.eventFun(0);
        Timer.instance.remove(self.timeUpdate, self);
        GGlobal.layerMgr.close(UIConst.YSBOSSREVIVE);
    };
    ViewYiShouTip.URL = "ui://47jfyc6el44i3o";
    return ViewYiShouTip;
}(UIModalPanel));
__reflect(ViewYiShouTip.prototype, "ViewYiShouTip");
