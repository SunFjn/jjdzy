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
var ItemSHJXC = (function (_super) {
    __extends(ItemSHJXC, _super);
    function ItemSHJXC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemSHJXC.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ItemSHJXC.prototype.setData = function (value) {
        this._data = value;
        if (value) {
            this.visible = true;
            var arr = value.split(/\,/gi);
            var pos = Number(arr[2]);
            IconUtil.setImg(this.iconType, "resource/image/shouling/" + ModelSH.icUrls[pos - 1] + ".png");
            this.txtNum.text = Config.shjxstar_266[arr[1]].star;
        }
        else {
            this.visible = false;
        }
    };
    ItemSHJXC.URL = "ui://fx4pr5qesh622h";
    return ItemSHJXC;
}(fairygui.GComponent));
__reflect(ItemSHJXC.prototype, "ItemSHJXC");
