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
var Item_ActCom_Rank = (function (_super) {
    __extends(Item_ActCom_Rank, _super);
    function Item_ActCom_Rank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item_ActCom_Rank.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_SystemRank", "Item_ActCom_Rank"));
    };
    Item_ActCom_Rank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    Item_ActCom_Rank.prototype.setData = function (vo, index) {
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
            this.jdTxt.text = vo.count + "";
        }
    };
    Item_ActCom_Rank.URL = "ui://qz5r0meldsdy4";
    return Item_ActCom_Rank;
}(fairygui.GComponent));
__reflect(Item_ActCom_Rank.prototype, "Item_ActCom_Rank");
