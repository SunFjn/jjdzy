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
var YJDQ_RankItem = (function (_super) {
    __extends(YJDQ_RankItem, _super);
    function YJDQ_RankItem() {
        return _super.call(this) || this;
    }
    YJDQ_RankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("FuBen", "YJDQ_RankItem"));
    };
    YJDQ_RankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbRank = (this.getChild("lbRank"));
        this.lbName = (this.getChild("lbName"));
        this.lbLv = (this.getChild("lbLv"));
        this.powerLb = (this.getChild("powerLb"));
    };
    YJDQ_RankItem.prototype.show = function (arr) {
        var arr1 = ["", "普通", "困难", "噩梦", "传说"];
        this.lbRank.text = arr[0] + "";
        this.lbName.text = arr[1];
        if (arr[3] <= 0) {
            this.lbLv.text = arr1[1] + "0波";
        }
        else {
            var cfg = Config.yiqi_007[arr[3]];
            this.lbLv.text = arr1[arr[2]] + cfg.bo + "波";
        }
        this.powerLb.text = arr[4] + "";
    };
    YJDQ_RankItem.URL = "ui://pkuzcu87ejh46";
    return YJDQ_RankItem;
}(fairygui.GComponent));
__reflect(YJDQ_RankItem.prototype, "YJDQ_RankItem");
