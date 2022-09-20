var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跨服王者队伍信息
 * @author: lujiahao
 * @date: 2019-12-09 21:01:44
 */
var VoTeamKfwz = (function () {
    function VoTeamKfwz() {
        /** 队伍id 0则没有队伍 */
        this.teamId = 0;
        /** 队长id */
        this.leaderId = 0;
        /** 自动进入的初始时间戳（ms） */
        this.autoEnterStartTs = 0;
        /** 成员列表 */
        this.memberList = [];
    }
    //=========================================== API ==========================================
    /**
     * 调换两个成员位置
     * @param pIndex1
     * @param pIndex2
     */
    VoTeamKfwz.prototype.changeMemberPos = function (pIndex1, pIndex2) {
        var t = this;
        t.memberList[pIndex1].posIndex = pIndex2;
        t.memberList[pIndex2].posIndex = pIndex1;
        _a = [t.memberList[pIndex2], t.memberList[pIndex1]], t.memberList[pIndex1] = _a[0], t.memberList[pIndex2] = _a[1];
        var _a;
    };
    VoTeamKfwz.prototype.clear = function () {
        var t = this;
        t.teamId = 0;
        t.leaderId = 0;
        t.memberList.length = 0;
    };
    Object.defineProperty(VoTeamKfwz.prototype, "canEnter", {
        /** 是否可进入 */
        get: function () {
            var t = this;
            var t_model = GGlobal.modelKfwz;
            if (!t_model.isInTeam)
                return false;
            if (t_model.remain <= 0)
                return false;
            if (!t_model.isInAct)
                return false;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoTeamKfwz.prototype, "remainAutoEnterSeconds", {
        /** 距离自动开始的剩余秒数(s) */
        get: function () {
            var t = this;
            var t_model = GGlobal.modelKfwz;
            var t_remainSeconds = 0;
            var t_remainSecondsAuto = 99999;
            var t_remainSecondsFull = 99999;
            var t_curTime = Model_GlobalMsg.getServerTime();
            if (t_model.autoStartFlag && t.autoEnterStartTs > 0) {
                var t_needTime = t_model.autoStartTime * 1000;
                var t_passTime = t_curTime - t.autoEnterStartTs;
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
        },
        enumerable: true,
        configurable: true
    });
    return VoTeamKfwz;
}());
__reflect(VoTeamKfwz.prototype, "VoTeamKfwz");
