/**
 * 队伍成员数据结构
 * @author: lujiahao 
 * @date: 2019-12-10 10:54:13 
 */
class VoTeamMemberKfwz {
    public posIndex = -1;

    /** 玩家id */
    public roleId = 0;
    /** 头像 */
    public head = 0;
    /** 头像框 */
    public headGrid = 0;
    /** 玩家名字 */
    public name = "";
    /** 等级 */
    public level = 0;
    /** 战力 */
    public power = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    /** 是否队长 */
    public get isLeader(): boolean {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        return t_model.teamVo.leaderId > 0 && t.roleId == t_model.teamVo.leaderId;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}