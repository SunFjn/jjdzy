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
var Country_RankItem = (function (_super) {
    __extends(Country_RankItem, _super);
    function Country_RankItem() {
        return _super.call(this) || this;
    }
    Country_RankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "Country_RankItem"));
    };
    Country_RankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.boxImg = (s.getChild("boxImg"));
        s.lbRank = (s.getChild("lbRank"));
        s.lbName = (s.getChild("lbName"));
        s.jifenLb = (s.getChild("jifenLb"));
        s.promptImg = (s.getChild("promptImg"));
        s.boxImg.addClickListener(s.boxHandler, this);
    };
    Country_RankItem.prototype.boxHandler = function () {
        var s = this;
        for (var key in Config.gjbsgr_738) {
            var cfg = Config.gjbsgr_738[key];
            var arr = JSON.parse(cfg.rank);
            if (arr[0][0] <= s.rank && arr[0][1] >= s.rank) {
                var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
                View_BoxReward_Show.show(rewardArr, "奖励邮件发放");
                break;
            }
        }
    };
    Country_RankItem.prototype.updateShow = function (rank, name, hurt) {
        var s = this;
        s.rank = rank;
        s.lbRank.text = "第" + rank + "名";
        if (name) {
            s.promptImg.visible = false;
            s.lbName.visible = true;
            s.lbName.text = name;
        }
        else {
            s.promptImg.visible = true;
            s.lbName.visible = false;
        }
        s.jifenLb.text = ConfigHelp.getYiWanText(hurt) + "";
    };
    Country_RankItem.URL = "ui://uwzc58njp1wo2h";
    return Country_RankItem;
}(fairygui.GComponent));
__reflect(Country_RankItem.prototype, "Country_RankItem");
