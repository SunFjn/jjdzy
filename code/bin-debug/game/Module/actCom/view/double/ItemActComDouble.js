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
var ItemActComDouble = (function (_super) {
    __extends(ItemActComDouble, _super);
    function ItemActComDouble() {
        return _super.call(this) || this;
    }
    ItemActComDouble.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComDouble", "ItemActComDouble"));
    };
    ItemActComDouble.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.img = (this.getChild("img"));
        this.btn = (this.getChild("btn"));
        this.btn.addClickListener(this.onClick, this);
    };
    Object.defineProperty(ItemActComDouble.prototype, "vo", {
        set: function (v) {
            this._vo = v;
            IconUtil.setImg(this.img, Enum_Path.ACTCOM_URL + "double" + (v + 1) + ".png");
        },
        enumerable: true,
        configurable: true
    });
    ItemActComDouble.prototype.clean = function () {
        _super.prototype.clean.call(this);
        IconUtil.setImg(this.img, null);
    };
    ItemActComDouble.prototype.onClick = function (e) {
        switch (this._vo) {
            case 0:
                GGlobal.layerMgr.open(UIConst.BOSS);
                break;
            case 1:
                GGlobal.layerMgr.open(UIConst.QMBOSS);
                break;
            case 2:
                GGlobal.layerMgr.open(UIConst.CROSS_TEAM);
                break;
            case 3:
                GGlobal.layerMgr.open(UIConst.SJMJ1);
                break;
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
    };
    ItemActComDouble.URL = "ui://746rywv8e3qh1";
    return ItemActComDouble;
}(fairygui.GComponent));
__reflect(ItemActComDouble.prototype, "ItemActComDouble");
