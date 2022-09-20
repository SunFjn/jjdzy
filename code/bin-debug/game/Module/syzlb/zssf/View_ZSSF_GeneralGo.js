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
var View_ZSSF_GeneralGo = (function (_super) {
    __extends(View_ZSSF_GeneralGo, _super);
    function View_ZSSF_GeneralGo() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_ZSSF_GeneralGo.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "View_ZSSF_GeneralGo"));
    };
    View_ZSSF_GeneralGo.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("syzlb", "View_ZSSF_GeneralGo").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    View_ZSSF_GeneralGo.prototype.renderHandler = function (index, item) {
        var self = this;
        item.onShow(self.listArr[index]);
    };
    View_ZSSF_GeneralGo.prototype.onShown = function () {
        var self = this;
        if (self._args == 5) {
            self.promptLb.text = "暂无可派遣的神将[color=#ff0000][size=24]\n皇庭只可派遣神将镇守[/size][/color]";
        }
        else {
            self.promptLb.text = "暂无可派遣的武将";
        }
        self.listArr = GGlobal.modelzssf.getHasWujiang(self._args);
        self.list.numItems = self.listArr.length;
        if (self.list.numItems > 0)
            self.list.selectedIndex = 0;
        self.listGroup.visible = self.list.numItems > 0;
        self.promptLb.visible = self.list.numItems <= 0;
        self.gobt.addClickListener(self.onGo, self);
    };
    View_ZSSF_GeneralGo.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
    };
    View_ZSSF_GeneralGo.prototype.onGo = function () {
        var self = this;
        var model = GGlobal.modelzssf;
        model.cityID = self._args;
        model.goGeneralID = self.listArr[self.list.selectedIndex].type;
        model.CG_GuardArea_dispatch_10903(self._args, model.goGeneralID);
    };
    View_ZSSF_GeneralGo.URL = "ui://3o8q23uucenr18";
    return View_ZSSF_GeneralGo;
}(UIModalPanel));
__reflect(View_ZSSF_GeneralGo.prototype, "View_ZSSF_GeneralGo");
