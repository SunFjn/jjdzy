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
var Child_CountryBoss_MyRank = (function (_super) {
    __extends(Child_CountryBoss_MyRank, _super);
    function Child_CountryBoss_MyRank() {
        return _super.call(this) || this;
    }
    Child_CountryBoss_MyRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "Child_CountryBoss_MyRank"));
    };
    Child_CountryBoss_MyRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.list = (s.getChild("list"));
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHandler;
        s.rankLb = (s.getChild("rankLb"));
        s.jifenLb = (s.getChild("jifenLb"));
    };
    Child_CountryBoss_MyRank.prototype.renderHandler = function (index, obj) {
        if (index < GGlobal.modelCtryBoss.myRankArr.length) {
            obj.updateShow(index + 1, GGlobal.modelCtryBoss.myRankArr[index].name, GGlobal.modelCtryBoss.myRankArr[index].hurt);
        }
        else {
            obj.updateShow(index + 1, null, 0);
        }
    };
    Child_CountryBoss_MyRank.prototype.updateShow = function () {
        var s = this;
        s.list.numItems = 10;
        var index = 0;
        var model = GGlobal.modelCtryBoss;
        for (var i = 0; i < model.myRankArr.length; i++) {
            if (model.myRankArr[i].playerId == Model_player.voMine.id) {
                index = i + 1;
                break;
            }
        }
        if (index == 0) {
            s.rankLb.text = "我的排名：10+";
        }
        else {
            s.rankLb.text = "我的排名：" + index;
        }
        s.jifenLb.text = "我的伤害：" + ConfigHelp.getYiWanText(model.myhurt);
    };
    Child_CountryBoss_MyRank.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    Child_CountryBoss_MyRank.URL = "ui://uwzc58njp1wo28";
    return Child_CountryBoss_MyRank;
}(fairygui.GComponent));
__reflect(Child_CountryBoss_MyRank.prototype, "Child_CountryBoss_MyRank");
