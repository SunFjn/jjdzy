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
var Child_CountryBoss_Rank = (function (_super) {
    __extends(Child_CountryBoss_Rank, _super);
    function Child_CountryBoss_Rank() {
        return _super.call(this) || this;
    }
    Child_CountryBoss_Rank.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "Child_CountryBoss_Rank"));
    };
    Child_CountryBoss_Rank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.lbRank0 = (s.getChild("lbRank0"));
        s.countryIcon0 = (s.getChild("countryIcon0"));
        s.passLb0 = (s.getChild("passLb0"));
        s.boxImg0 = (s.getChild("boxImg0"));
        s.lbRank1 = (s.getChild("lbRank1"));
        s.countryIcon1 = (s.getChild("countryIcon1"));
        s.passLb1 = (s.getChild("passLb1"));
        s.boxImg1 = (s.getChild("boxImg1"));
        s.rankLb = (s.getChild("rankLb"));
        s.lbRank2 = (s.getChild("lbRank2"));
        s.countryIcon2 = (s.getChild("countryIcon2"));
        s.passLb2 = (s.getChild("passLb2"));
        s.boxImg2 = (s.getChild("boxImg2"));
        s.boxImg0.data = 1;
        s.boxImg1.data = 2;
        s.boxImg2.data = 3;
        s.boxImg0.addClickListener(s.boxHandler, s);
        s.boxImg1.addClickListener(s.boxHandler, s);
        s.boxImg2.addClickListener(s.boxHandler, s);
    };
    Child_CountryBoss_Rank.prototype.boxHandler = function (event) {
        var cfg = Config.gjbsgj_738[event.target.data];
        if (cfg) {
            var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.jiangli));
            View_BoxReward_Show.show(arr, "奖励邮件发放");
        }
    };
    Child_CountryBoss_Rank.prototype.updateShow = function () {
        var model = GGlobal.modelCtryBoss;
        var s = this;
        s.countryIcon0.url = model.countryRankArr.length > 0 ? CommonManager.getCommonUrl("country" + model.countryRankArr[0].countryId) : "ui://uwzc58njqnae1k";
        s.countryIcon1.url = model.countryRankArr.length > 1 ? CommonManager.getCommonUrl("country" + model.countryRankArr[1].countryId) : "ui://uwzc58njqnae1k";
        s.countryIcon2.url = model.countryRankArr.length > 2 ? CommonManager.getCommonUrl("country" + model.countryRankArr[2].countryId) : "ui://uwzc58njqnae1k";
        s.passLb0.text = model.countryRankArr.length > 0 ? model.countryRankArr[0].countryNum + "" : "0";
        s.passLb1.text = model.countryRankArr.length > 1 ? model.countryRankArr[1].countryNum + "" : "0";
        s.passLb2.text = model.countryRankArr.length > 2 ? model.countryRankArr[2].countryNum + "" : "0";
        s.rankLb.text = "我的国家：" + Model_Country.getCountryName(Model_player.voMine.country);
    };
    Child_CountryBoss_Rank.URL = "ui://uwzc58njp1wo27";
    return Child_CountryBoss_Rank;
}(fairygui.GComponent));
__reflect(Child_CountryBoss_Rank.prototype, "Child_CountryBoss_Rank");
