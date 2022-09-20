var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 队伍成员数据结构
 * @author: lujiahao
 * @date: 2019-12-10 10:54:13
 */
var VoTeamMemberKfwz = (function () {
    function VoTeamMemberKfwz() {
        this.posIndex = -1;
        /** 玩家id */
        this.roleId = 0;
        /** 头像 */
        this.head = 0;
        /** 头像框 */
        this.headGrid = 0;
        /** 玩家名字 */
        this.name = "";
        /** 等级 */
        this.level = 0;
        /** 战力 */
        this.power = 0;
    }
    Object.defineProperty(VoTeamMemberKfwz.prototype, "isLeader", {
        //=========================================== API ==========================================
        /** 是否队长 */
        get: function () {
            var t = this;
            var t_model = GGlobal.modelKfwz;
            return t_model.teamVo.leaderId > 0 && t.roleId == t_model.teamVo.leaderId;
        },
        enumerable: true,
        configurable: true
    });
    return VoTeamMemberKfwz;
}());
__reflect(VoTeamMemberKfwz.prototype, "VoTeamMemberKfwz");
