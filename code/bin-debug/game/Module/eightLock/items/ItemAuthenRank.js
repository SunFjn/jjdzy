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
 * 鉴定排名item
 */
var ItemAuthenRank = (function (_super) {
    __extends(ItemAuthenRank, _super);
    function ItemAuthenRank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemAuthenRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ItemAuthenRank.prototype.setData = function (vo, index) {
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
    ItemAuthenRank.URL = "ui://hincjqblze8t1s";
    return ItemAuthenRank;
}(fairygui.GComponent));
__reflect(ItemAuthenRank.prototype, "ItemAuthenRank");
