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
var ViewActHolyBMuB = (function (_super) {
    __extends(ViewActHolyBMuB, _super);
    function ViewActHolyBMuB() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewActHolyBMuB.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "ViewActHolyBMuB"));
    };
    ViewActHolyBMuB.prototype.childrenCreated = function () {
        GGlobal.createPack("shouhunJX");
        this.view = fairygui.UIPackage.createObject("shouhunJX", "ViewActHolyBMuB").asCom;
        this.contentPane = this.view;
        this.list = (this.view.getChild("list"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewActHolyBMuB.prototype.onShown = function () {
        this.addListen();
        this.update();
    };
    ViewActHolyBMuB.prototype.onHide = function () {
        this.removeListen();
        this.list.numItems = 0;
    };
    ViewActHolyBMuB.prototype.addListen = function () {
        GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_XUNBAO_MUBIAO, this.update, this);
    };
    ViewActHolyBMuB.prototype.removeListen = function () {
        GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_XUNBAO_MUBIAO, this.update, this);
        GGlobal.layerMgr.close(UIConst.ACT_HOLYB_XBMUBIAO);
    };
    ViewActHolyBMuB.prototype.update = function () {
        this._listData = Model_HuoDong.getListData(GGlobal.modelSHXunbao.xbMuBiaoArr);
        this.list.numItems = this._listData.length;
    };
    ViewActHolyBMuB.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.setVo(this._listData[index], index);
    };
    ViewActHolyBMuB.URL = "ui://d5y9ngt6phvv8";
    return ViewActHolyBMuB;
}(UIModalPanel));
__reflect(ViewActHolyBMuB.prototype, "ViewActHolyBMuB");
