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
var ViewTrueNameReward = (function (_super) {
    __extends(ViewTrueNameReward, _super);
    function ViewTrueNameReward() {
        var _this = _super.call(this) || this;
        _this.loadRes("trueName", "trueName_atlas0");
        return _this;
    }
    ViewTrueNameReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("trueName", "ViewTrueNameReward"));
    };
    ViewTrueNameReward.prototype.childrenCreated = function () {
        GGlobal.createPack("trueName");
        this.view = fairygui.UIPackage.createObject("trueName", "ViewTrueNameReward").asCom;
        this.contentPane = this.view;
        this.btnSure = (this.view.getChild("btnSure"));
        this.lb = (this.view.getChild("lb"));
        this.list = (this.view.getChild("list"));
        this.list.itemRenderer = this.renderItem;
        this.list.callbackThisObj = this;
        _super.prototype.childrenCreated.call(this);
    };
    ViewTrueNameReward.prototype.onShown = function () {
        var s = this;
        s.btnSure.addClickListener(s.onSure, s);
        s._listData = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(5901)));
        s.list.numItems = s._listData.length;
    };
    ViewTrueNameReward.prototype.onHide = function () {
        var s = this;
        GGlobal.layerMgr.close(UIConst.TRUE_NAME_REWARD);
        s.btnSure.removeClickListener(s.onSure, s);
        GGlobal.modelTrueName.CGGET_REWARD();
        s.list.numItems = 0;
    };
    ViewTrueNameReward.prototype.onSure = function () {
        this.closeEventHandler(null);
    };
    ViewTrueNameReward.prototype.renderItem = function (index, obj) {
        var item = obj;
        item.vo = this._listData[index];
    };
    ViewTrueNameReward.URL = "ui://girq9ndumu0i5";
    return ViewTrueNameReward;
}(UIModalPanel));
__reflect(ViewTrueNameReward.prototype, "ViewTrueNameReward");
