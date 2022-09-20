var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 轮回副本队伍信息
 * @author: lujiahao
 * @date: 2020-03-04 11:13:14
 */
var VoTeamLhfb = (function () {
    function VoTeamLhfb() {
        /** 队伍id 0则没有队伍 */
        this._teamId = 0;
        /** 队长id */
        this.leaderId = 0;
        /** 轮回id */
        this.lunhuiId = 0;
        /** 星数 */
        this.star = 1;
        /** 成员列表 */
        this.memberList = [];
    }
    Object.defineProperty(VoTeamLhfb.prototype, "teamId", {
        get: function () {
            return this._teamId;
        },
        set: function (value) {
            var t = this;
            if (t._teamId != value) {
                t._teamId = value;
                GGlobal.control.notify(Enum_MsgType.LHFB_TEAM_ID_CHANGE);
            }
        },
        enumerable: true,
        configurable: true
    });
    //=========================================== API ==========================================
    VoTeamLhfb.prototype.clear = function () {
        var t = this;
        t.teamId = 0;
        t.leaderId = 0;
        t.lunhuiId = 0;
        t.star = 1;
        t.memberList.length = 0;
    };
    return VoTeamLhfb;
}());
__reflect(VoTeamLhfb.prototype, "VoTeamLhfb");
