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
var TipEquip = (function (_super) {
    __extends(TipEquip, _super);
    function TipEquip() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    TipEquip.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TipEquip"));
    };
    TipEquip.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "TipEquip").asCom;
        this.contentPane = this.view;
        this.childTip = (this.view.getChild("childTip"));
        this.btnUse = (this.view.getChild("btnUse"));
        _super.prototype.childrenCreated.call(this);
    };
    TipEquip.prototype.onShown = function () {
        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
        this.btnUse.addClickListener(this.onClickPuton, this);
        this.childTip.lbDes.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        this.childTip.lbSource.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        this.show(this._args);
    };
    TipEquip.prototype.onHide = function () {
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
        this.btnUse.removeClickListener(this.onClickPuton, this);
        this.childTip.lbDes.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        this.childTip.lbSource.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        GGlobal.layerMgr.close(UIConst.TIP_EQUIP);
    };
    TipEquip.prototype.show = function (obj) {
        var vo = obj;
        this._vo = vo;
        this.childTip.vo = vo;
    };
    TipEquip.prototype.onClickPuton = function () {
        if (Model_Equip.wearEquip(this._vo)) {
            this.closeEventHandler(null);
        }
    };
    TipEquip.prototype.resize = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
    };
    TipEquip.URL = "ui://jvxpx9em7g6v25";
    return TipEquip;
}(UIModalPanel));
__reflect(TipEquip.prototype, "TipEquip");
