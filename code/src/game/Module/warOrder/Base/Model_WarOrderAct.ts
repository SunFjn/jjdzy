class Model_WarOrderAct extends BaseModel {
    public constructor() {
        super();
    }

    /** 状态 不可领 */
    static STATE_NONE = 0;
    /** 状态 可以领取 */
    static STATE_CAN_GET = 1;
    /** 状态 已领取 */
    static SATTE_DONE = 2;

    private _voWarOrder: { [id: number]: VoWarOrder } = {}
    public getWarOrder(hdid) {
        let t = this
        let vo = t._voWarOrder[hdid]
        if (vo == null) {
            vo = new VoWarOrder()
            t._voWarOrder[hdid] = vo
        }
        return vo;
    }

    public setActVo(act) {
        let t = this
        let vo = t.getWarOrder(act.id)
        vo.hAct = act
    }

    public listenServ(mgr: WebSocketMgr) {
        let self = this;
        self.socket = mgr;
        mgr.regHand(12250, self.GC12250, self);
        mgr.regHand(12252, self.GC12252, self);
        mgr.regHand(12254, self.GC12254, self);
        mgr.regHand(12256, self.GC12256, self);
        mgr.regHand(12258, self.GC12258, self);
        mgr.regHand(12260, self.GC12260, self);
        mgr.regHand(12262, self.GC12262, self);
    }
    /**打开战令界面返回*/
    private GC12250(self: Model_WarOrderAct, cmd: BaseBytes): void {
        let t_change = false;
        let len = cmd.readShort();
        let arr1 = []
        for (let i = 0; i < len; i++) {
            let type = cmd.readInt();
            let size = cmd.readShort();
            let arr2 = []
            for (let j = 0; j < size; j++) {
                let arg2 = cmd.readInt();
                let arg3 = cmd.readByte();
                arr2[j] = [arg2, arg3]
            }
            arr1[i] = [type, arr2]
        }
        let upgradeFlag = cmd.readByte();
        let levelId = cmd.readInt();
        let curExp = cmd.readInt();
        let buyNum = cmd.readInt();
        let hdId = cmd.readInt();

        let voWarO = self.getWarOrder(hdId)
        if (!voWarO.hAct) {//没有打开界面
            return;
        }
        if (voWarO.update({ upgradeFlag: upgradeFlag, levelId: levelId, curExp: curExp, buyNum: buyNum })) {
            t_change = true;
        }

        for (let i = 0; i < arr1.length; i++) {
            let type = arr1[i][0];
            let arr2 = arr1[i][1];
            for (let j = 0; j < arr2.length; j++) {
                let arg2 = arr2[j][0]
                let arg3 = arr2[j][1]
                let t_rewardVo = self.getRewardVoById(arg2, voWarO.hAct);
                if (t_rewardVo) {
                    if (t_rewardVo.updateState(type, arg3)) {
                        t_change = true;
                    }
                }
            }
        }

        if (t_change) {
            self.reddotCheckReward(voWarO.hAct);
            GGlobal.control.notify(Enum_MsgType.WARORDERL_OPENUI, hdId);
        }
    }

    /**领取战令奖励*/
    public CG12251(type: number, level: number, getState: number, sid: number): void {
        const self = this
        let ba = self.getBytes();
        ba.writeInt(type)
        ba.writeInt(level)
        ba.writeInt(getState)
        ba.writeInt(sid)
        self.sendSocket(12251, ba);
    }

    /**领取战令奖励返回*/
    private GC12252(self: Model_WarOrderAct, cmd: BaseBytes): void {
        let t_change = false;

        let t_result = cmd.readByte();
        let t_getType = cmd.readInt();
        let t_type = cmd.readInt();
        let t_levelId = cmd.readInt();
        let t_hdId = cmd.readInt();

        if (t_result == 3) //成功
        {

            let voWarO = self.getWarOrder(t_hdId)
            if (t_getType == 1) {
                //一键领取
                let t_rewardList = self.getRewardVoList(voWarO.hAct);
                for (let v of t_rewardList) {
                    if (v.state0 == Model_WarOrderAct.STATE_CAN_GET) {
                        v.state0 = Model_WarOrderAct.SATTE_DONE;
                        t_change = true;
                    }
                    if (v.state1 == Model_WarOrderAct.STATE_CAN_GET) {
                        v.state1 = Model_WarOrderAct.SATTE_DONE;
                        t_change = true;
                    }
                }
            }
            else {
                //单独领取
                let t_vo = self.getRewardVoById(t_levelId, voWarO.hAct);
                if (t_vo && t_vo.updateState(t_type, Model_WarOrderAct.SATTE_DONE)) {
                    t_change = true;
                }
            }

            if (t_change) {
                self.reddotCheckReward(voWarO.hAct);
                GGlobal.control.notify(Enum_MsgType.WarOrder_REWARD_UPDATE);
            }
        }
    }

    /**打开周任务UI*/
    public CG12253(sid: number): void {
        const self = this
        let ba = self.getBytes();
        ba.writeInt(sid)
        self.sendSocket(12253, ba);
    }

    /**打开周任务UI返回*/
    private GC12254(self: Model_WarOrderAct, cmd: BaseBytes): void {
        let t_change = false;
        let len = cmd.readShort();
        for (let i = 0; i < len; i++) {
            let arg1 = cmd.readInt(); //任务类型
            let arg2 = cmd.readInt(); //当前的任务类型完成计数
            let size = cmd.readShort();
            for (let j = 0; j < size; j++) {
                let arg3 = cmd.readInt(); //任务id
                let arg4 = cmd.readByte(); //任务状态 0未完成 1可领取 2已领取
                let t_vo = self.getTaskWeekByTaskId(arg3);
                if (t_vo && t_vo.update(arg2, arg4)) {
                    t_change = true;
                }
            }
        }
        let t_hdId = cmd.readInt();
        let voWarO = self.getWarOrder(t_hdId)
        if (t_change) {
            self.reddotCheckTaskWeek(voWarO.hAct);
            GGlobal.control.notify(Enum_MsgType.WarOrder_TASK_UPDATE);
        }
    }

    /**领取周任务奖励*/
    public CG12255(type: number, taskId: number, getState: number, sid: number): void {
        const self = this
        let ba = self.getBytes();
        ba.writeInt(type)
        ba.writeInt(taskId)
        ba.writeInt(getState)
        ba.writeInt(sid)
        self.sendSocket(12255, ba);
    }

    /**领取周任务奖励返回*/
    private GC12256(self: Model_WarOrderAct, cmd: BaseBytes): void {
        let t_change = false;

        let t_result = cmd.readByte();
        let t_taskType = cmd.readInt();
        let t_taskId = cmd.readInt();
        let t_levelId = cmd.readInt();
        let t_curExp = cmd.readInt();
        let t_type = cmd.readInt();
        let t_hdId = cmd.readInt();
        if (t_result == 1) {
            //成功
            let t_vo = self.getTaskWeekByTaskId(t_taskId);
            if (t_vo && t_vo.state != Model_WarOrderAct.SATTE_DONE) {
                t_change = true;
            }
            if (t_type == 1) {
                t_change = true;
            }
            let voWarO = self.getWarOrder(t_hdId)
            if (voWarO.levelId != t_levelId) {
                t_change = true;
            }
            if (voWarO.curExp != t_curExp) {
                t_change = true;
            }

            if (t_change) {
                GGlobal.modelWarOrder.CG12253(t_hdId);
                self.getOpenUIData(t_hdId);//重新请求更新奖励列表数据
            }
        } else {
            ViewCommonWarn.text("暂无奖励可领")
        }
    }

    /**打开每日任务UI*/
    public CG12257(sid: number): void {
        const self = this
        let ba = self.getBytes();
        ba.writeInt(sid)
        self.sendSocket(12257, ba);
    }

    /**打开每日任务UI返回*/
    private GC12258(self: Model_WarOrderAct, cmd: BaseBytes): void {
        let t_change = false;
        let len = cmd.readShort();
        for (let i = 0; i < len; i++) {
            let arg1 = cmd.readInt(); //任务类型
            let arg2 = cmd.readInt(); //当前的任务类型完成计数
            let size = cmd.readShort();
            for (let j = 0; j < size; j++) {
                let arg3 = cmd.readInt(); //任务id
                let arg4 = cmd.readByte(); //任务状态 0未完成 1可领取 2已领取

                let t_vo = self.getTaskDayByTaskId(arg3);
                if (t_vo && t_vo.update(arg2, arg4)) {
                    t_change = true;
                }
            }
        }
        let t_hdId = cmd.readInt();
        let voWarO = self.getWarOrder(t_hdId)
        if (t_change) {
            self.reddotCheckTaskDay(voWarO.hAct);
            GGlobal.control.notify(Enum_MsgType.WarOrder_TASK_UPDATE);
        }
    }

    /**领取每日任务奖励*/
    public CG12259(type: number, taskId: number, getState: number, sid: number): void {
        const self = this
        let ba = self.getBytes();
        ba.writeInt(type)
        ba.writeInt(taskId)
        ba.writeInt(getState)
        ba.writeInt(sid)
        self.sendSocket(12259, ba);
    }

    /**领取每日任务奖励返回*/
    private GC12260(self: Model_WarOrderAct, cmd: BaseBytes): void {
        let t_change = false;

        let t_result = cmd.readByte();
        let t_taskType = cmd.readInt();
        let t_taskId = cmd.readInt();
        let t_levelId = cmd.readInt();
        let t_curExp = cmd.readInt();
        let t_type = cmd.readInt();
        let t_hdId = cmd.readInt();
        if (t_result == 1) {
            //成功
            let t_vo = self.getTaskDayByTaskId(t_taskId);
            if (t_vo && t_vo.state != Model_WarOrderAct.SATTE_DONE) {
                t_change = true;
            }
            if (t_type == 1) {
                t_change = true;
            }
            let voWarO = self.getWarOrder(t_hdId)
            if (voWarO.levelId != t_levelId) {
                t_change = true;
            }
            if (voWarO.curExp != t_curExp) {
                t_change = true;
            }
            if (t_change) {
                GGlobal.modelWarOrder.CG12257(t_hdId);
                self.getOpenUIData(t_hdId);//重新请求更新奖励列表数据
            }
        } else {
            ViewCommonWarn.text("暂无奖励可领")
        }
    }

    /**购买等级*/
    public CG12261(sid: number): void {
        const self = this
        let ba = self.getBytes();
        ba.writeInt(sid)
        self.sendSocket(12261, ba);
    }

    /**购买等级返回*/
    private GC12262(self: Model_WarOrderAct, cmd: BaseBytes): void {
        let state = cmd.readByte()
        let level = cmd.readInt()
        let buyNum = cmd.readInt()
        let hdid = cmd.readInt()
        if (state == 0) {
            let t_change = false;
            let voWarO = self.getWarOrder(hdid)
            if (voWarO.levelId != level) {
                t_change = true;
            }
            if (voWarO.buyNum != buyNum) {
                t_change = true;
            }
            if (t_change) {
                GGlobal.modelWarOrder.CG12257(hdid);
                GGlobal.modelWarOrder.CG12253(hdid);
                self.getOpenUIData(hdid); //重新请求更新奖励列表数据
            }
            ViewCommonWarn.text("购买成功，等级+1")
        } else {
            ViewCommonWarn.text(["已达到最大购买次数", "砖石不足"][state - 1])
        }
    }

    private getOpenUIData(pData) {
        let cfgXT: Ixitong_001 = Config.xitong_001[pData];
        if (cfgXT.or == 1) {
            GGlobal.modelActivity.CG_OPENACT(pData);
        } else {
            GGlobal.modelEightLock.CG4571(pData);
        }
    }

    // public actVo: Vo_Activity;

    private _taskDayMap: { [taskId: number]: VoWarOrderTask } = {};
    private _taskWeekMap: { [taskId: number]: VoWarOrderTask } = {};
    private _rewardVoMap: { [id: number]: VoWarOrderReward } = {};
    // public initOpen = false;



    // public con0Count = 0;
    // public con1Count = 1;

    private _setupFlag = false;
    public setup() {
        if (this._setupFlag)
            return;
        this._setupFlag = true;

        {
            let t_cfg = Config.kssj1_338;
            for (let k in t_cfg) {
                let t_vo = new VoWarOrderReward();
                t_vo.id = ~~k;
                this._rewardVoMap[t_vo.id] = t_vo;
            }
        }

        {
            for (let k in Config.xslday1_338) {
                let t_vo = new VoWarOrderTask();
                t_vo.taskId = ~~k;
                t_vo.cfg = Config.xslday1_338[k]
                this._taskDayMap[t_vo.taskId] = t_vo;
            }
        }

        {
            for (let k in Config.xslweek1_338) {
                let t_vo = new VoWarOrderTask();
                t_vo.taskId = ~~k;
                t_vo.cfg = Config.xslweek1_338[k]
                this._taskWeekMap[t_vo.taskId] = t_vo;
            }
        }
    }

    //=========================================== API ==========================================
    private _taskDayListQsMap: { [qs: number]: VoWarOrderTask[] } = {};
    public getTaskDayList(qs): VoWarOrderTask[] {
        let t = this;
        let t_list = t._taskDayListQsMap[qs];
        if (t_list === undefined) {
            t._taskDayListQsMap[qs] = t_list = [];
            for (let k in t._taskDayMap) {
                let t_vo = t._taskDayMap[k];
                if (t_vo && t_vo.cfg.qs == qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    private _typeDayListQsMap: { [qs: number]: { [type: number]: VoWarOrderTask[] } } = {};
    public getTypeDayListMap(actVo: Vo_Activity) {
        let t = this;
        let t_qs = actVo.qs;
        let t_typeVoListMap = t._typeDayListQsMap[t_qs];
        if (t_typeVoListMap === undefined) {
            t._typeDayListQsMap[t_qs] = t_typeVoListMap = {};
            let t_allList = t.getTaskDayList(t_qs);
            for (let v of t_allList) {
                let t_type = v.type;
                let t_voList = t_typeVoListMap[t_type];
                if (!t_voList) {
                    t_typeVoListMap[t_type] = t_voList = [];
                }
                t_voList.push(v);
            }
        }
        return t_typeVoListMap;
    }

    private _taskWeekListQsMap: { [qs: number]: VoWarOrderTask[] } = {};
    public getTaskWeekList(qs): VoWarOrderTask[] {
        let t = this;
        let t_list = t._taskWeekListQsMap[qs];
        if (t_list === undefined) {
            t._taskWeekListQsMap[qs] = t_list = [];
            for (let k in t._taskWeekMap) {
                let t_vo = t._taskWeekMap[k];
                if (t_vo && t_vo.cfg.qs == qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    private _typeWeekListQsMap: { [qs: number]: { [type: number]: VoWarOrderTask[] } } = {};
    public getTypeWeekListMap(actVo: Vo_Activity) {
        let t = this;
        if (!actVo) return;
        let t_qs = actVo.qs;
        let t_typeVoListMap = t._typeWeekListQsMap[t_qs];
        if (t_typeVoListMap === undefined) {
            t._typeWeekListQsMap[t_qs] = t_typeVoListMap = {};
            let t_allList = t.getTaskWeekList(t_qs);
            for (let v of t_allList) {
                let t_type = v.type;
                let t_voList = t_typeVoListMap[t_type];
                if (!t_voList) {
                    t_typeVoListMap[t_type] = t_voList = [];
                }
                t_voList.push(v);
            }
        }
        return t_typeVoListMap;
    }

    private _rewardVoListMap: { [qs: number]: VoWarOrderReward[] } = {};
    public getRewardVoList(actVo: Vo_Activity): VoWarOrderReward[] {
        let t = this;
        if (!actVo) return;
        let t_qs = actVo.qs;
        let t_list = t._rewardVoListMap[t_qs];
        if (t_list === undefined) {
            t._rewardVoListMap[t_qs] = t_list = [];
            for (let k in t._rewardVoMap) {
                let t_vo = t._rewardVoMap[k];
                if (t_vo && t_vo.cfg.lv != 0 && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }


    public getTaskDayByTaskId(pTaskId: number): VoWarOrderTask {
        return this._taskDayMap[pTaskId];
    }

    public getTaskWeekByTaskId(pTaskId: number): VoWarOrderTask {
        return this._taskWeekMap[pTaskId];
    }

    public getRewardVoById(pId: number, actVo: Vo_Activity): VoWarOrderReward {
        let t = this;
        if (!actVo) return;
        let t_qs = actVo.qs;
        let t_id = t_qs * 1000 + pId;
        return t._rewardVoMap[t_id];
    }

    private _maxBuy = {}
    public getBuyCtMax(qs) {
        let t = this;
        if (!t._maxBuy[qs]) {
            t._maxBuy[qs] = 0
            for (let key in Config.kssjbuy1_338) {
                let val = Config.kssjbuy1_338[key]
                if (val.qs == qs) {
                    t._maxBuy[qs]++;
                }
            }
        }
        return t._maxBuy[qs]
    }
    //最大等级
    private _maxLv = {}
    public getLvMax(qs) {
        let t = this
        if (!t._maxLv[qs]) {
            let level = 0;
            while (true) {
                let key = qs * 1000 + level
                if (!Config.kssj1_338[key]) {
                    t._maxLv[qs] = level - 1
                    return level - 1;
                }
                level++;
            }
        }
        return t._maxLv[qs]
    }

    //===================================== private method =====================================
    public reddotCheckAll(actVo: Vo_Activity) {
        if (!actVo) return;
        let t = this;
        let groupId = actVo.groupId
        let t_value1 = ReddotMgr.ins().getValue(groupId + "_1");
        let t_value2 = ReddotMgr.ins().getValue(groupId + "_2");
        let t_value3 = ReddotMgr.ins().getValue(groupId + "_3");
        let t_all = 0;
        if (t_value1 || t_value2 || t_value3) {
            t_all = 1;
        }
        ReddotMgr.ins().setValue(actVo.groupId + "", t_all);
        let sf = GGlobal.reddot;
        sf.setCondition(actVo.groupId, 0, t_all > 0 ? true : false);
        sf.notify(actVo.groupId, actVo.groupId);
    }

    public reddotCheckReward(actVo: Vo_Activity) {
        if (!actVo) return;
        let t = this;
        let t_value = 0;
        let t_voList = t.getRewardVoList(actVo);
        for (let v of t_voList) {
            if (v.state0 == Model_WarOrderAct.STATE_CAN_GET || v.state1 == Model_WarOrderAct.STATE_CAN_GET) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(actVo.groupId + "_1", t_value);
        t.reddotCheckAll(actVo);
    }

    public reddotCheckTaskDay(actVo: Vo_Activity) {
        if (!actVo) return;
        let t = this;
        let t_value = 0;
        let t_voList = t.getTaskDayList(actVo.qs);
        for (let v of t_voList) {
            if (v.state == Model_WarOrderAct.STATE_CAN_GET) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(actVo.groupId + "_2", t_value);
        t.reddotCheckAll(actVo);
    }

    public reddotCheckTaskWeek(actVo: Vo_Activity) {
        if (!actVo) return;
        let t = this;
        let t_value = 0;
        let t_voList = t.getTaskWeekList(actVo.qs);
        for (let v of t_voList) {
            if (v.state == Model_WarOrderAct.STATE_CAN_GET) {
                t_value = 1;
                break;
            }
        }
        ReddotMgr.ins().setValue(actVo.groupId + "_3", t_value);
        t.reddotCheckAll(actVo);
    }
}
