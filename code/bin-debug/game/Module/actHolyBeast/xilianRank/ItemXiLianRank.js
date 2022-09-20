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
/**
 * 洗练排名item
 */
var ItemXiLianRank = (function (_super) {
    __extends(ItemXiLianRank, _super);
    function ItemXiLianRank() {
        return _super.call(this) || this;
    }
    ItemXiLianRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "ItemXiLianRank"));
    };
    ItemXiLianRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.rankTxt = (this.getChild("rankTxt"));
        this.nameTxt = (this.getChild("nameTxt"));
        this.jdTxt = (this.getChild("jdTxt"));
        this.rankImg = (this.getChild("rankImg"));
    };
    ItemXiLianRank.prototype.setData = function (vo, index) {
        this.rankImg.visible = false;
        this.rankTxt.visible = false;
        if (index < 3) {
            this.rankImg.visible = true;
            this.rankImg.url = CommonManager.getCommonUrl("rank_" + (index + 1));
        }
        else {
            this.rankTxt.visible = true;
            this.rankTxt.text = "第" + (index + 1) + "名";
        }
        if (!vo) {
            this.nameTxt.text = "虚位以待";
            this.jdTxt.text = "";
        }
        else {
            this.nameTxt.text = vo.name;
            this.jdTxt.text = vo.jdCount + "";
        }
    };
    ItemXiLianRank.URL = "ui://d5y9ngt6cl031o";
    return ItemXiLianRank;
}(fairygui.GComponent));
__reflect(ItemXiLianRank.prototype, "ItemXiLianRank");
