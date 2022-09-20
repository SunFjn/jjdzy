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
var CrossTeamRankInfo = (function (_super) {
    __extends(CrossTeamRankInfo, _super);
    function CrossTeamRankInfo() {
        return _super.call(this) || this;
    }
    CrossTeamRankInfo.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "CrossTeamRankInfo"));
    };
    CrossTeamRankInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbMyhurt = (this.getChild("lbMyhurt"));
        this.btn = (this.getChild("btn"));
    };
    CrossTeamRankInfo.prototype.listen = function () {
        var s = this;
        GGlobal.control.listen(Enum_MsgType.CROSS_TEAM_RANK_UPDATE, s.setdata, s);
        s.resetPosition();
    };
    CrossTeamRankInfo.prototype.removeList = function () {
        var s = this;
        GGlobal.control.remove(Enum_MsgType.CROSS_TEAM_RANK_UPDATE, s.setdata, s);
    };
    CrossTeamRankInfo.show = function () {
        var s = this;
        if (!s.instance)
            s.instance = s.createInstance();
        s.instance.listen();
        GGlobal.layerMgr.UI_floorUI_1.addChild(s.instance);
    };
    CrossTeamRankInfo.hide = function () {
        var s = this;
        s.instance.removeList();
        s.instance.clearDatta();
        if (s.instance.parent)
            GGlobal.layerMgr.UI_floorUI_1.removeChild(s.instance);
    };
    CrossTeamRankInfo.prototype.setdata = function () {
        var s = this;
        var d = Model_CrossTeam.rankData;
        if (d.length) {
            s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(Model_CrossTeam.myhurt) + "               " + d[0][0] + "：" + ConfigHelp.getYiWanText(d[0][1]);
        }
        else {
            s.lbMyhurt.text = "自己：" + ConfigHelp.getYiWanText(Model_CrossTeam.myhurt);
        }
    };
    CrossTeamRankInfo.prototype.clearDatta = function () {
        var s = this;
        s.lbMyhurt.text = "";
    };
    CrossTeamRankInfo.prototype.resetPosition = function () {
        var s = this;
        s.setXY((fairygui.GRoot.inst.width - s.width) >> 1, 380);
    };
    CrossTeamRankInfo.URL = "ui://yqpfulefl3q83k";
    return CrossTeamRankInfo;
}(fairygui.GComponent));
__reflect(CrossTeamRankInfo.prototype, "CrossTeamRankInfo");
