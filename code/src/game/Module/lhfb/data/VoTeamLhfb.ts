/**
 * 轮回副本队伍信息
 * @author: lujiahao 
 * @date: 2020-03-04 11:13:14 
 */
class VoTeamLhfb {
    /** 队伍id 0则没有队伍 */
    private _teamId = 0;
    public get teamId() {
        return this._teamId;
    }
    public set teamId(value) {
        let t = this;
        if (t._teamId != value) {
            t._teamId = value;
            GGlobal.control.notify(Enum_MsgType.LHFB_TEAM_ID_CHANGE);
        }
    }
    /** 队长id */
    public leaderId = 0;
    /** 轮回id */
    public lunhuiId = 0;
    /** 星数 */
    public star = 1;

    /** 成员列表 */
    public memberList: VoTeamMemberLhfb[] = [];

    constructor() {
    }
    //=========================================== API ==========================================
    public clear() {
        let t = this;
        t.teamId = 0;
        t.leaderId = 0;
        t.lunhuiId = 0;
        t.star = 1;
        t.memberList.length = 0;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}