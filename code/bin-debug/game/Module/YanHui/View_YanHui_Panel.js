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
var View_YanHui_Panel = (function (_super) {
    __extends(View_YanHui_Panel, _super);
    function View_YanHui_Panel() {
        var _this = _super.call(this) || this;
        _this.curPage = 1;
        _this.totPage = 1;
        _this.pageMax = 6;
        _this.setSkin("YanHui", "YanHui_atlas0", "View_YanHui_Panel");
        return _this;
    }
    View_YanHui_Panel.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "View_YanHui_Panel"));
    };
    View_YanHui_Panel.prototype.setExtends = function () {
        YanHuiManager.setExtends();
    };
    View_YanHui_Panel.prototype.initView = function () {
        var self = this;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
    };
    View_YanHui_Panel.prototype.renderHandler = function (index, item) {
        var self = this;
        var model = GGlobal.modelYanHui;
        item.setVo(model.yanhuiArr[(self.curPage - 1) * self.pageMax + index]);
    };
    View_YanHui_Panel.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelYanHui;
        self.totPage = Math.ceil(model.yanhuiArr.length / self.pageMax) + (model.yanhuiArr.length % self.pageMax == 0 ? 1 : 0);
        self.pageLb.text = self.curPage + "/" + self.totPage;
        if (self.curPage != self.totPage) {
            self.list.numItems = self.pageMax;
        }
        else {
            self.list.numItems = model.yanhuiArr.length % self.pageMax;
        }
    };
    View_YanHui_Panel.prototype.onShown = function () {
        var self = this;
        self.register(true);
        GGlobal.modelYanHui.CG_House_openListUI_11451();
    };
    View_YanHui_Panel.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        self.register(false);
    };
    View_YanHui_Panel.prototype.register = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.leftBt, egret.TouchEvent.TOUCH_TAP, self.pageHandler, self);
        EventUtil.register(pFlag, self.rightBt, egret.TouchEvent.TOUCH_TAP, self.pageHandler, self);
        EventUtil.register(pFlag, self.holdBt, egret.TouchEvent.TOUCH_TAP, self.onHold, self);
        EventUtil.register(pFlag, self.smLb, egret.TouchEvent.TOUCH_TAP, self.openWFSM, self);
        GGlobal.reddot.register(pFlag, UIConst.YANHUI, self.updateShow, self);
    };
    View_YanHui_Panel.prototype.openWFSM = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.YANHUI);
    };
    View_YanHui_Panel.prototype.onHold = function () {
        if (GGlobal.modelYanHui.yanHuiID > 0) {
            return ViewCommonWarn.text("同一时间只能参加一场宴会");
        }
        GGlobal.layerMgr.open(UIConst.YANHUI_HOLD);
    };
    View_YanHui_Panel.prototype.pageHandler = function (evt) {
        var self = this;
        var bt = evt.target;
        switch (bt.id) {
            case self.leftBt.id:
                if (self.curPage <= 1)
                    return;
                self.curPage--;
                break;
            case self.rightBt.id:
                if (self.curPage >= self.totPage)
                    return;
                self.curPage++;
                break;
        }
        self.updateShow();
    };
    View_YanHui_Panel.URL = "ui://4x7dk3lhh7qe0";
    return View_YanHui_Panel;
}(UIPanelBase));
__reflect(View_YanHui_Panel.prototype, "View_YanHui_Panel");
