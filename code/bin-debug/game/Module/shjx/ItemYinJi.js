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
var ItemYinJi = (function (_super) {
    __extends(ItemYinJi, _super);
    function ItemYinJi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemYinJi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.iconLock.displayObject.touchEnabled = true;
        Utils.DisplayUtil.addPop(this.iconLock.displayObject);
        this.iconLock.displayObject.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLock, this);
    };
    ItemYinJi.prototype.onLock = function () {
        var opeType = this._data.entityData.isLock == 1 ? 0 : 1;
        GGlobal.modelSHJX.CG863(this._data.type, this._data.equipPos, this._data.entityData.position, opeType);
    };
    ItemYinJi.prototype.setData = function (value) {
        this._data = value;
        this.iconLock.icon = value.entityData.isLock == 1 ? "ui://4aepcdbwk0ep3w" : "ui://4aepcdbwrjpy1v";
        this.maskImg.visible = value.entityData.isLock == 1;
        this.typeIcon.url = ModelSH.icNameUrls[value.entityData.type - 1];
        IconUtil.setImg(this.iconType, "resource/image/shouling/" + ModelSH.icUrls[value.entityData.type - 1] + ".png");
        var cfg = Config.shjxstar_266[value.entityData.starID];
        if (cfg) {
            this.txtNum.text = cfg.star + "";
            this.txtAttr.text = ConfigHelp.attrString(JSON.parse(cfg.attr), "+");
        }
    };
    ItemYinJi.prototype.getData = function () {
        return this._data;
    };
    ItemYinJi.URL = "ui://4aepcdbwrjpys";
    return ItemYinJi;
}(fairygui.GComponent));
__reflect(ItemYinJi.prototype, "ItemYinJi");
