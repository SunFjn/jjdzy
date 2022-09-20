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
var TeamRoleItem = (function (_super) {
    __extends(TeamRoleItem, _super);
    function TeamRoleItem() {
        return _super.call(this) || this;
    }
    TeamRoleItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "TeamRoleItem"));
    };
    TeamRoleItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.head = (s.getChild("head"));
        s.levelLb = (s.getChild("levelLb"));
        s.powerLb = (s.getChild("powerLb"));
        s.leaderImg = (s.getChild("leaderImg"));
        s.closeBt = (s.getChild("closeBt"));
        s.closeBt.addClickListener(s.delHanlder, s);
    };
    TeamRoleItem.prototype.delHanlder = function () {
        var s = this;
        if (s.memberID == Model_player.voMine.id) {
            GGlobal.modelCrossTeam.CG_TEAM_LEAVETEAM();
            GGlobal.modelCrossTeam.CG_LOOK_TEAM_DATA(Model_CrossTeam.fubenID);
        }
        else {
            GGlobal.modelCrossTeam.CG_TEAM_DELETE_MEMBER(s.memberID);
        }
    };
    /**U:队员名字L:队员IDI:机器人IDS:头像IDS:头像框IDS:队员等级L:队员战力 */
    TeamRoleItem.prototype.setVo = function (arr) {
        var s = this;
        var type = arr[0];
        var nameStr = arr[1];
        var headId = arr[4];
        var frameId = arr[5];
        if (arr[3] > 0) {
            s.memberID = arr[3];
            s.head.setdata(RoleUtil.getHeadRole(headId), 0, nameStr, 0, true, RoleUtil.getHeadRole("" + frameId));
        }
        else {
            s.memberID = arr[2];
            s.head.setdata(headId, 0, nameStr, 0, false, frameId);
        }
        s.levelLb.text = "Lv." + arr[6];
        s.powerLb.text = "战力：" + ConfigHelp.numToStr(arr[7]);
        s.leaderImg.visible = type == 1;
        s.closeBt.visible = Model_CrossTeam.isLeader == 1 || s.memberID == Model_player.voMine.id;
    };
    TeamRoleItem.URL = "ui://yqpfulefiad82y";
    return TeamRoleItem;
}(fairygui.GComponent));
__reflect(TeamRoleItem.prototype, "TeamRoleItem");
