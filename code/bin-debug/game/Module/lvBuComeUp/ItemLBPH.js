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
var ItemLBPH = (function (_super) {
    __extends(ItemLBPH, _super);
    function ItemLBPH() {
        return _super.call(this) || this;
    }
    ItemLBPH.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.iconPM = this.getChild("iconPM");
        this.txtPM = this.getChild("txtPM");
        this.txtName = this.getChild("txtName");
        this.txtJiFen = this.getChild("txtJiFen");
    };
    Object.defineProperty(ItemLBPH.prototype, "vo", {
        set: function (data) {
            this.txtName.text = data[1];
            this.txtJiFen.text = data[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemLBPH.prototype, "index", {
        set: function (value) {
            if (value < 3) {
                this.iconPM.url = CommonManager.getUrl("common", "rank_" + (value + 1));
                this.txtPM.text = "";
            }
            else {
                this.iconPM.icon = null;
                this.txtPM.text = (value + 1) + "";
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemLBPH.URL = "ui://01fuz6zc100umh";
    return ItemLBPH;
}(fairygui.GComponent));
__reflect(ItemLBPH.prototype, "ItemLBPH");
