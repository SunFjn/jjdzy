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
var View_SanGuoYT_ZLP = (function (_super) {
    __extends(View_SanGuoYT_ZLP, _super);
    function View_SanGuoYT_ZLP() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_SanGuoYT_ZLP.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("sanGuoYiTong", "View_SanGuoYT_ZLP").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        _super.prototype.childrenCreated.call(this);
    };
    View_SanGuoYT_ZLP.prototype.renderHandler = function (index, item) {
    };
    View_SanGuoYT_ZLP.prototype.onShown = function () {
    };
    View_SanGuoYT_ZLP.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.SANGUO_YITONG_ZLP);
    };
    View_SanGuoYT_ZLP.URL = "ui://z4ijxlqklcejc";
    return View_SanGuoYT_ZLP;
}(UIModalPanel));
__reflect(View_SanGuoYT_ZLP.prototype, "View_SanGuoYT_ZLP");
