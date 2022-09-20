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
var VLingLongItem = (function (_super) {
    __extends(VLingLongItem, _super);
    function VLingLongItem() {
        return _super.call(this) || this;
    }
    VLingLongItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("lingLong", "VLingLongItem"));
    };
    VLingLongItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.item = (this.getChild("item"));
        this.img = (this.getChild("img"));
        this.item.isShowEff = true;
        this.item.tipEnabled = true;
    };
    Object.defineProperty(VLingLongItem.prototype, "vo", {
        set: function (v) {
            this.item.vo = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VLingLongItem.prototype, "index", {
        set: function (i) {
            this.img.visible = (i % 2 == 0);
        },
        enumerable: true,
        configurable: true
    });
    VLingLongItem.URL = "ui://1xperbsykaqa1";
    return VLingLongItem;
}(fairygui.GComponent));
__reflect(VLingLongItem.prototype, "VLingLongItem");
