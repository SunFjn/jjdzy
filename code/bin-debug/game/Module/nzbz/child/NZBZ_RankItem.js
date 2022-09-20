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
var NZBZ_RankItem = (function (_super) {
    __extends(NZBZ_RankItem, _super);
    function NZBZ_RankItem() {
        return _super.call(this) || this;
    }
    NZBZ_RankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("nzbz", "NZBZ_RankItem"));
    };
    NZBZ_RankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbRank = (this.getChild("lbRank"));
        this.lbName = (this.getChild("lbName"));
        this.jifenLb = (this.getChild("jifenLb"));
        this.countryLb = (this.getChild("countryLb"));
        this.boxImg = (this.getChild("boxImg"));
        this.boxImg.touchable = true;
        this.boxImg.addClickListener(this.boxHandler, this);
    };
    NZBZ_RankItem.prototype.boxHandler = function () {
        for (var key in Config.nzbz_226) {
            var cfg = Config.nzbz_226[key];
            if (Math.floor(cfg.id / 10) == 2) {
                var rankArr = JSON.parse(cfg.rank);
                if (this.rank >= rankArr[0][0] && this.rank <= rankArr[0][1]) {
                    var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
                    View_BoxReward_Show.show(arr, "排名第" + this.rank + "可领取");
                    break;
                }
            }
        }
    };
    //I:排名U:玩家名称B:国家I:积分
    NZBZ_RankItem.prototype.show = function (arr) {
        this.rank = arr[0];
        this.lbRank.text = "" + arr[0];
        this.lbName.text = "" + arr[1];
        this.countryLb.url = CommonManager.getCommonUrl("country" + arr[2]);
        this.jifenLb.text = "" + arr[3];
    };
    NZBZ_RankItem.URL = "ui://xzyn0qe3l3h39";
    return NZBZ_RankItem;
}(fairygui.GComponent));
__reflect(NZBZ_RankItem.prototype, "NZBZ_RankItem");
