var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 队伍成员数据结构
 * @author: lujiahao
 * @date: 2020-03-04 11:11:03
 */
var VoTeamMemberLhfb = (function () {
    function VoTeamMemberLhfb() {
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
        /** 轮回id */
        this.lunhuiId = 0;
    }
    Object.defineProperty(VoTeamMemberLhfb.prototype, "isLeader", {
        //=========================================== API ==========================================
        /** 是否队长 */
        get: function () {
            var t = this;
            var t_model = GGlobal.modelLhfb;
            return t_model.teamVo.leaderId > 0 && t.roleId == t_model.teamVo.leaderId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoTeamMemberLhfb.prototype, "sortValue", {
        /** 排序权值 */
        get: function () {
            var t = this;
            var t_value = 0;
            if (t.isLeader) {
                t_value += 100000;
            }
            t_value += t.level;
            return t_value;
        },
        enumerable: true,
        configurable: true
    });
    return VoTeamMemberLhfb;
}());
__reflect(VoTeamMemberLhfb.prototype, "VoTeamMemberLhfb");
