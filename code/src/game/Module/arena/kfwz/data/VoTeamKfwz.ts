/**
 * 跨服王者队伍信息
 * @author: lujiahao 
 * @date: 2019-12-09 21:01:44 
 */
class VoTeamKfwz {
    /** 队伍id 0则没有队伍 */
    public teamId = 0;
    /** 队长id */
    public leaderId = 0;

    /** 自动进入的初始时间戳（ms） */
    public autoEnterStartTs = 0;

    /** 成员列表 */
    public memberList: VoTeamMemberKfwz[] = [];

    constructor() {
    }

    //=========================================== API ==========================================
    /**
     * 调换两个成员位置
     * @param pIndex1 
     * @param pIndex2 
     */
    public changeMemberPos(pIndex1: number, pIndex2: number) {
        let t = this;
        t.memberList[pIndex1].posIndex = pIndex2;
        t.memberList[pIndex2].posIndex = pIndex1;
        [t.memberList[pIndex1], t.memberList[pIndex2]] = [t.memberList[pIndex2], t.memberList[pIndex1]];
    }

    public clear() {
        let t = this;
        t.teamId = 0;
        t.leaderId = 0;
        t.memberList.length = 0;
    }

    /** 是否可进入 */
    public get canEnter(): boolean {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        if (!t_model.isInTeam)
            return false;
        if (t_model.remain <= 0)
            return false;
        if (!t_model.isInAct)
            return false;
        return true;
    }

    /** 距离自动开始的剩余秒数(s) */
    public get remainAutoEnterSeconds(): number {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        let t_remainSeconds = 0;
        let t_remainSecondsAuto = 99999;
        let t_remainSecondsFull = 99999;
        let t_curTime = Model_GlobalMsg.getServerTime();
        if (t_model.autoStartFlag && t.autoEnterStartTs > 0) {
            let t_needTime = t_model.autoStartTime * 1000;
            let t_passTime = t_curTime - t.autoEnterStartTs;
            t_remainSecondsAuto = Math.floor((t_needTime - t_passTime) / 1000);
            t_remainSecondsAuto = t_remainSecondsAuto < 0 ? 0 : t_remainSecondsAuto;
        }
        // if (t_model.autoFull2StartFlag && t.autoFullStartTs > 0) {
        //     let t_needTime = t_model.curAutoFull2StartTime * 1000;
        //     let t_passTime = t_curTime - t.autoFullStartTs;
        //     t_remainSecondsFull = Math.floor((t_needTime - t_passTime) / 1000);
        //     t_remainSecondsFull = t_remainSecondsFull < 0 ? 0 : t_remainSecondsFull;
        // }
        t_remainSeconds = Math.min(t_remainSecondsAuto, t_remainSecondsFull);
        if (t_remainSeconds == 99999)
            return 0;
        return t_remainSeconds;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}