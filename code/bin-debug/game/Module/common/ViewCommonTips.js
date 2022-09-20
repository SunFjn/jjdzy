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
var ViewCommonTips = (function (_super) {
    __extends(ViewCommonTips, _super);
    function ViewCommonTips() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewCommonTips.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "View_WFSM_Panel").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.list.itemRenderer = this.renderHander;
        this.list.callbackThisObj = this;
        _super.prototype.childrenCreated.call(this);
    };
    ViewCommonTips.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.show(arg);
    };
    ViewCommonTips.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.TIP_STRING);
        this.list.numItems = 0;
    };
    ViewCommonTips.prototype.show = function (obj) {
        var data = {};
        data["id"] = 1;
        data["tips"] = obj;
        this._vo = data;
        this.list.numItems = 1;
        this.list.scrollToView(0);
    };
    ViewCommonTips.prototype.renderHander = function (index, obj) {
        var item = obj;
        item.vo = this._vo.tips;
    };
    ViewCommonTips.URL = "ui://jvxpx9emah3c3ap";
    return ViewCommonTips;
}(UIModalPanel));
__reflect(ViewCommonTips.prototype, "ViewCommonTips");
