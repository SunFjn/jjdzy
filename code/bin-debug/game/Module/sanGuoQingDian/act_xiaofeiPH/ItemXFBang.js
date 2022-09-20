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
var ItemXFBang = (function (_super) {
    __extends(ItemXFBang, _super);
    function ItemXFBang() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemXFBang.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ItemXFBang.prototype.setData = function (index) {
        this.setIndex(index);
        var player = GGlobal.modelSGQD.paiHangDatas[index];
        if (player && player.name) {
            this.txtName.text = player.name;
            this.txtJiFen.text = player.cost + "";
            this.iconCost.visible = true;
            this.iconXWYD.visible = false;
        }
        else {
            this.iconXWYD.visible = true;
            this.txtName.text = "";
            this.txtJiFen.text = "";
            this.iconCost.visible = false;
        }
    };
    ItemXFBang.prototype.setIndex = function (value) {
        if (value < 3) {
            this.iconPM.icon = CommonManager.getUrl("common", "rank_" + (value + 1));
            this.txtPM.text = "";
        }
        else {
            this.iconPM.icon = null;
            this.txtPM.text = (value + 1) + "";
        }
    };
    ItemXFBang.URL = "ui://kdt501v2tipml";
    return ItemXFBang;
}(fairygui.GComponent));
__reflect(ItemXFBang.prototype, "ItemXFBang");
