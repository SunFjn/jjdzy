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
var SGYT_CountryRankRewardItem = (function (_super) {
    __extends(SGYT_CountryRankRewardItem, _super);
    function SGYT_CountryRankRewardItem() {
        return _super.call(this) || this;
    }
    SGYT_CountryRankRewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoYiTong", "SGYT_CountryRankRewardItem"));
    };
    SGYT_CountryRankRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.gridArr = [self.grid0, self.grid1, self.grid2, self.grid3];
    };
    SGYT_CountryRankRewardItem.prototype.setVo = function (cfg) {
        var self = this;
        self.rankLb.setVar("rank", cfg.rank + "").flushVars();
        var arr = JSON.parse(cfg.reward1).concat(JSON.parse(cfg.reward2)).concat(JSON.parse(cfg.reward3));
        var rewardArr = ConfigHelp.makeItemListArr(arr);
        for (var i = 0; i < self.gridArr.length; i++) {
            self.gridArr[i].vo = rewardArr[i];
        }
        self.dataGroup.visible = true;
        self.promptLb.visible = false;
    };
    SGYT_CountryRankRewardItem.URL = "ui://z4ijxlqkiv4ok";
    return SGYT_CountryRankRewardItem;
}(fairygui.GComponent));
__reflect(SGYT_CountryRankRewardItem.prototype, "SGYT_CountryRankRewardItem");
