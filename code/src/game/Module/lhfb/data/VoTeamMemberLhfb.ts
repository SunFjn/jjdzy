/**
 * 队伍成员数据结构
 * @author: lujiahao 
 * @date: 2020-03-04 11:11:03 
 */
class VoTeamMemberLhfb {
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
    /** 轮回id */
    public lunhuiId = 0;

    constructor() {
    }
    //=========================================== API ==========================================
    /** 是否队长 */
    public get isLeader(): boolean {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        return t_model.teamVo.leaderId > 0 && t.roleId == t_model.teamVo.leaderId;
    }

    /** 排序权值 */
    public get sortValue(): number {
        let t = this;
        let t_value = 0;
        if (t.isLeader) {
            t_value += 100000;
        }
        t_value += t.level;
        return t_value;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}