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
var WuShengRankItem = (function (_super) {
    __extends(WuShengRankItem, _super);
    function WuShengRankItem() {
        return _super.call(this) || this;
    }
    WuShengRankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("wushengList", "WuShengRankItem"));
    };
    WuShengRankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.rankLb = (this.getChild("rankLb"));
        this.nameLb = (this.getChild("nameLb"));
        this.powerLb = (this.getChild("powerLb"));
        this.rankImg = (this.getChild("rankImg"));
    };
    //玩家idU:玩家姓名L:玩家战力B:排名
    WuShengRankItem.prototype.show = function (arr, rank) {
        this.rankImg.visible = false;
        this.rankLb.visible = false;
        if (rank <= 3) {
            this.rankImg.visible = true;
            this.rankImg.url = CommonManager.getCommonUrl("rank_" + rank);
        }
        else {
            this.rankLb.visible = true;
            this.rankLb.text = rank + "";
        }
        if (arr) {
            this.nameLb.text = HtmlUtil.fontNoSize(arr[1], Color.getColorStr(1));
            this.powerLb.text = arr[2] + "";
        }
        else {
            this.nameLb.text = HtmlUtil.fontNoSize("虚位以待", Color.getColorStr(1));
            this.powerLb.text = "";
        }
    };
    WuShengRankItem.URL = "ui://a8l39nm9rkjpc";
    return WuShengRankItem;
}(fairygui.GComponent));
__reflect(WuShengRankItem.prototype, "WuShengRankItem");
