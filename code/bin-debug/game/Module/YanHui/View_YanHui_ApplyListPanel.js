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
var View_YanHui_ApplyListPanel = (function (_super) {
    __extends(View_YanHui_ApplyListPanel, _super);
    function View_YanHui_ApplyListPanel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_YanHui_ApplyListPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "View_YanHui_ApplyListPanel"));
    };
    View_YanHui_ApplyListPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var self = this;
        self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_ApplyListPanel").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
    };
    View_YanHui_ApplyListPanel.prototype.renderHandler = function (index, item) {
        item.setVo(GGlobal.modelYanHui.applyList[index]);
    };
    View_YanHui_ApplyListPanel.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelYanHui;
        self.boxBt.selected = model.applySt == 0;
        self.list.numItems = model.applyList.length;
    };
    View_YanHui_ApplyListPanel.prototype.onShown = function () {
        var self = this;
        self.register(true);
        self.updateShow();
    };
    View_YanHui_ApplyListPanel.prototype.onHide = function () {
        var self = this;
        self.register(false);
        self.list.numItems = 0;
    };
    View_YanHui_ApplyListPanel.prototype.register = function (pFlag) {
        var self = this;
        EventUtil.register(pFlag, self.rejectBt, egret.TouchEvent.TOUCH_TAP, self.OnHandler, self);
        EventUtil.register(pFlag, self.agreeBt, egret.TouchEvent.TOUCH_TAP, self.OnHandler, self);
        EventUtil.register(pFlag, self.boxBt, egret.TouchEvent.TOUCH_TAP, self.OnHandler, self);
        GGlobal.control.register(pFlag, UIConst.YANHUI_APPLY, self.updateShow, self);
    };
    View_YanHui_ApplyListPanel.prototype.OnHandler = function (evt) {
        var self = this;
        var model = GGlobal.modelYanHui;
        var bt = evt.target;
        switch (bt.hashCode) {
            case self.rejectBt.hashCode:
                if (self.list.numItems > 0) {
                    model.CG11483(-1, 0);
                }
                break;
            case self.agreeBt.hashCode:
                if (self.list.numItems > 0) {
                    model.CG11483(2, 0);
                }
                break;
            case self.boxBt.hashCode:
                if (self.boxBt.selected) {
                    model.CG11481(0);
                }
                else {
                    model.CG11481(1);
                }
                break;
        }
    };
    View_YanHui_ApplyListPanel.URL = "ui://4x7dk3lhowxnx";
    return View_YanHui_ApplyListPanel;
}(UIModalPanel));
__reflect(View_YanHui_ApplyListPanel.prototype, "View_YanHui_ApplyListPanel");
