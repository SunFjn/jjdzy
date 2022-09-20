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
var SJXS_RankItem = (function (_super) {
    __extends(SJXS_RankItem, _super);
    function SJXS_RankItem() {
        return _super.call(this) || this;
    }
    SJXS_RankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_SJXS", "SJXS_RankItem"));
    };
    SJXS_RankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
    };
    SJXS_RankItem.prototype.renderHandler = function (index, grid) {
        grid.isShowEff = grid.tipEnabled = true;
        grid.vo = this.rewardList[index];
    };
    SJXS_RankItem.prototype.setVo = function (cfg) {
        var self = this;
        self.vo = cfg;
        self.rewardList = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        self.list.numItems = self.rewardList.length;
        var rankArr = JSON.parse(cfg.rank);
        if (rankArr[0][0] == rankArr[0][1]) {
            self.rankLb.text = rankArr[0][0] + "";
        }
        else {
            self.rankLb.text = rankArr[0][0] + "-" + rankArr[0][1];
        }
    };
    SJXS_RankItem.prototype.clean = function () {
        var self = this;
        self.list.numItems = 0;
    };
    SJXS_RankItem.URL = "ui://iwvd88mqr3je9";
    return SJXS_RankItem;
}(fairygui.GComponent));
__reflect(SJXS_RankItem.prototype, "SJXS_RankItem");
