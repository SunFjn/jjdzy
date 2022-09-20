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
var VHeChengTab = (function (_super) {
    __extends(VHeChengTab, _super);
    function VHeChengTab() {
        return _super.call(this) || this;
    }
    VHeChengTab.createInstance = function () {
        return (fairygui.UIPackage.createObject("rongLian", "VHeChengTab"));
    };
    VHeChengTab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.selectImg = (this.getChild("selectImg"));
        this.grid = (this.getChild("grid"));
        this.maskBg = (this.getChild("maskBg"));
        this.labName = (this.getChild("labName"));
        this.maskBg.visible = false;
    };
    Object.defineProperty(VHeChengTab.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
            this.grid.tipEnabled = false;
            this.grid.isShowEff = true;
            var item = Model_RongLian.getHCItem(v);
            this.grid.vo = item;
            this.labName.text = item.name;
            this.labName.color = Color.getColorInt(item.quality);
            this.grid.checkNotice = Model_RongLian.checkHeChengVo(v);
        },
        enumerable: true,
        configurable: true
    });
    VHeChengTab.URL = "ui://ny9kb4yznflug";
    return VHeChengTab;
}(fairygui.GButton));
__reflect(VHeChengTab.prototype, "VHeChengTab");
