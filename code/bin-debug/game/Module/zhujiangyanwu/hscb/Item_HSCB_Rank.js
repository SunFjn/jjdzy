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
var Item_HSCB_Rank = (function (_super) {
    __extends(Item_HSCB_Rank, _super);
    function Item_HSCB_Rank() {
        return _super.call(this) || this;
    }
    Item_HSCB_Rank.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "Item_HSCB_Rank"));
    };
    Item_HSCB_Rank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.labName = (this.getChild("labName"));
        this.labPower = (this.getChild("labPower"));
        this.labRank = (this.getChild("labRank"));
        this.labLayer = (this.getChild("labLayer"));
        this.imgNo = (this.getChild("imgNo"));
        this.img = (this.getChild("img"));
    };
    Item_HSCB_Rank.prototype.setVo = function (v, index) {
        this.imgNo.visible = v ? false : true;
        this.labName.text = v ? v.name + "" : "";
        this.labLayer.text = v ? v.params + "" : "";
        this.labPower.text = v ? v.power + "" : "";
        if (index <= 3) {
            this.img.visible = true;
            this.img.url = CommonManager.getUrl("zjyw", "" + index);
            this.labRank.text = "";
        }
        else {
            this.img.visible = false;
            this.labRank.text = index + "";
        }
    };
    Item_HSCB_Rank.URL = "ui://7a366usaql4nu";
    return Item_HSCB_Rank;
}(fairygui.GComponent));
__reflect(Item_HSCB_Rank.prototype, "Item_HSCB_Rank");
