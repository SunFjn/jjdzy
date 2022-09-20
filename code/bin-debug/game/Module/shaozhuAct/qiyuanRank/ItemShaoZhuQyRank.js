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
 * 少主祈愿排名item
 */
var ItemShaoZhuQyRank = (function (_super) {
    __extends(ItemShaoZhuQyRank, _super);
    function ItemShaoZhuQyRank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemShaoZhuQyRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ItemShaoZhuQyRank.prototype.setData = function (vo, index) {
        //  this.rankTxt.text = "第" + (index + 1) +"名";
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
    ItemShaoZhuQyRank.URL = "ui://w5ll6n5jze8t2a";
    return ItemShaoZhuQyRank;
}(fairygui.GComponent));
__reflect(ItemShaoZhuQyRank.prototype, "ItemShaoZhuQyRank");
