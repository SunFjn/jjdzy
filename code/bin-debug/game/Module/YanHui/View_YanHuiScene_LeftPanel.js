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
var View_YanHuiScene_LeftPanel = (function (_super) {
    __extends(View_YanHuiScene_LeftPanel, _super);
    function View_YanHuiScene_LeftPanel() {
        return _super.call(this) || this;
    }
    View_YanHuiScene_LeftPanel.createInstance = function () {
        if (!View_YanHuiScene_LeftPanel._instance) {
            View_YanHuiScene_LeftPanel._instance = (fairygui.UIPackage.createObject("YanHui", "View_YanHuiScene_LeftPanel"));
        }
        return View_YanHuiScene_LeftPanel._instance;
    };
    View_YanHuiScene_LeftPanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.resetPosition();
    };
    View_YanHuiScene_LeftPanel.prototype.showNotice = function () {
        var self = this;
        var model = GGlobal.modelYanHui;
        self.toastBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.YANHUI);
        self.applyBt.checkNotice = model.applyList.length > 0;
    };
    View_YanHuiScene_LeftPanel.prototype.onShown = function () {
        var self = this;
        self.register(true);
    };
    View_YanHuiScene_LeftPanel.prototype.onHide = function () {
        var self = this;
        self.register(false);
    };
    View_YanHuiScene_LeftPanel.prototype.register = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.inviteBt, egret.TouchEvent.TOUCH_TAP, self.OnInvite, self);
        EventUtil.register(pFlag, self.toastBt, egret.TouchEvent.TOUCH_TAP, self.OnToast, self);
        EventUtil.register(pFlag, self.battleBt, egret.TouchEvent.TOUCH_TAP, self.OnBattle, self);
        EventUtil.register(pFlag, self.applyBt, egret.TouchEvent.TOUCH_TAP, self.OnApply, self);
        GGlobal.reddot.register(pFlag, UIConst.YANHUI, self.showNotice, self);
        GGlobal.control.register(pFlag, UIConst.YANHUI_APPLY, self.showNotice, self);
    };
    View_YanHuiScene_LeftPanel.prototype.OnApply = function () {
        var model = GGlobal.modelYanHui;
        if (model.roleID == Model_player.voMine.id) {
            GGlobal.layerMgr.open(UIConst.YANHUI_APPLY);
        }
        else {
            ViewCommonWarn.text("无此权限");
        }
    };
    View_YanHuiScene_LeftPanel.prototype.OnInvite = function () {
        var model = GGlobal.modelYanHui;
        if (model.roleID == Model_player.voMine.id) {
            if (TimeUitl.cool("yanhui_invite", 10000)) {
                GGlobal.modelYanHui.CG_House_yaoqing_11465();
            }
        }
        else {
            ViewCommonWarn.text("主人才可发出邀请");
        }
    };
    View_YanHuiScene_LeftPanel.prototype.OnToast = function () {
        GGlobal.layerMgr.open(UIConst.YANHUI_TOAST);
    };
    View_YanHuiScene_LeftPanel.prototype.OnBattle = function () {
        GGlobal.layerMgr.open(UIConst.YANHUI_BATTLE);
    };
    View_YanHuiScene_LeftPanel.prototype.resetPosition = function () {
        var self = this;
        self.setXY(-GGlobal.layerMgr.offx, (App.stageHeight - self.height) / 2);
    };
    View_YanHuiScene_LeftPanel.URL = "ui://4x7dk3lhgz25f";
    return View_YanHuiScene_LeftPanel;
}(fairygui.GComponent));
__reflect(View_YanHuiScene_LeftPanel.prototype, "View_YanHuiScene_LeftPanel");
