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
var View_XuTian_CangKu = (function (_super) {
    __extends(View_XuTian_CangKu, _super);
    function View_XuTian_CangKu() {
        var _this = _super.call(this) || this;
        _this.itemRender = function (idx, obj) {
            var item = obj;
            item.vo = _this.rewArr[idx];
        };
        _this.update = function () {
            var self = _this;
            var model = GGlobal.model_XuTian;
            self.rewArr = model.cangKu;
            self.list.numItems = self.rewArr.length;
        };
        _this.loadRes("xuTian", "xuTian_atlas0");
        return _this;
    }
    View_XuTian_CangKu.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("xuTian");
        self.view = fairygui.UIPackage.createObject("xuTian", "View_XuTian_CangKu").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        _super.prototype.childrenCreated.call(this);
    };
    View_XuTian_CangKu.prototype.onShown = function () {
        var self = this;
        self.update();
        var model = GGlobal.model_XuTian;
        model.CG_OPEN_WARE();
        self.registerEvent(true);
    };
    View_XuTian_CangKu.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        self.registerEvent(false);
    };
    View_XuTian_CangKu.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.model_XuTian.register(pFlag, Model_XuTian.CANG_KU, self.update, self);
    };
    return View_XuTian_CangKu;
}(UIModalPanel));
__reflect(View_XuTian_CangKu.prototype, "View_XuTian_CangKu");
