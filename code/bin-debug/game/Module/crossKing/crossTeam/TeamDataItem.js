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
var TeamDataItem = (function (_super) {
    __extends(TeamDataItem, _super);
    function TeamDataItem() {
        return _super.call(this) || this;
    }
    TeamDataItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "TeamDataItem"));
    };
    TeamDataItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.head = (s.getChild("head"));
        s.numLb = (s.getChild("numLb"));
        s.joinBt = (s.getChild("joinBt"));
        s.joinBt.addClickListener(s.joinHandle, s);
    };
    TeamDataItem.prototype.joinHandle = function (event) {
        GGlobal.modelCrossTeam.CG_TEAM_JOINTEAM(this.teamID, Model_CrossTeam.fubenID);
    };
    /**U:队长名S:头像IDS:头像框IDB:总人数 */
    TeamDataItem.prototype.setVo = function (nameStr, teamID, headId, frameId, roleNum) {
        var s = this;
        s.teamID = teamID;
        s.head.setdata(headId, 0, nameStr, 0, false, frameId);
        s.numLb.text = "人数：" + HtmlUtil.fontNoSize(roleNum + "/3", Color.getColorStr(2));
    };
    TeamDataItem.URL = "ui://yqpfulefoiih2z";
    return TeamDataItem;
}(fairygui.GComponent));
__reflect(TeamDataItem.prototype, "TeamDataItem");
