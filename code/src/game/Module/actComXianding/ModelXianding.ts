/**
 * 限定武将模块管理
 * @author: lujiahao 
 * @date: 2019-09-12 11:28:31 
 */
class ModelXianding extends BaseModel {
    constructor() {
        super();
    }

    private _voMap: { [id: number]: VoXiandingTask } = {};
    private _rewardVoMap: { [id: number]: VoXiandingReward } = {};
    private _groupTypeVoListMap: { [groupType: number]: VoXiandingTask[] } = {};

    /** 活跃度积分 */
    public curScore = 0;
    /** 活跃度最大值 */
    public maxScore = 0;

    private _groupTypeList: number[] = [
        Enum_Xianding.GROUP_DAIY,
        Enum_Xianding.GROUP_ACT,
        Enum_Xianding.GROUP_HELP,
        Enum_Xianding.GROUP_CONSUME,
    ];

    public setup() {
        let t_cfg = Config.xdwj_757;
        for (let k in t_cfg) {
            let t_vo = new VoXiandingTask();
            t_vo.id = ~~k;
            this._voMap[t_vo.id] = t_vo;
        }

        let t_rewardCfg = Config.xdwjhy_757;
        for (let k in t_rewardCfg) {
            let t_rewardVo = new VoXiandingReward();
            t_rewardVo.id = ~~k;
            this._rewardVoMap[t_rewardVo.id] = t_rewardVo;
            this.maxScore = t_rewardVo.cfg.hy > this.maxScore ? t_rewardVo.cfg.hy : this.maxScore;
        }
    }

    //========================================= 协议相关 ========================================
    public listenServ(m: WebSocketMgr) {
        super.listenServ(m);

        m.regHand(8720, this.GC_WuJiangGoal_openUI_8720, this);
        m.regHand(8722, this.GC_WuJiangGoal_getReward_8722, this);
        m.regHand(8724, this.GC_WuJiangGoal_getActReward_8724, this);
    }

    /**8720 [I-[B-I-[I-B]]]-I-[I-B] 打开界面返回 [I:任务组[B:任务类型I:当前类型完成值[I:任务id(该值和任务状态为空时代表玩家没达到开启条件)B:任务状态0不可领 1可领取 2已领取]任务领取数据]任务类型完成数据]任务分组数据rwzTaskDataI:活跃度ActivityNum[I:宝箱idB:宝箱领取状态0未领取 1可领取 2已领取]宝箱数据rewardboxs*/
    public GC_WuJiangGoal_openUI_8720(self: ModelXianding, data: BaseBytes): void {

        let t_change = false;
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg1 = data.readInt(); //任务组类型
            let len1 = data.readShort();
            for (let i = 0; i < len1; i++) {
                let arg2 = data.readByte(); //任务类型
                let arg3 = data.readInt(); //当前的任务类型完成计数
                let len2 = data.readShort();
                for (let i = 0; i < len2; i++) {
                    let arg4 = data.readInt(); //任务id
                    let arg5 = data.readByte(); //任务状态 0:未完成 1:可领取 2：已领取

                    let t_vo = self.getTaskVoById(arg4);
                    if (t_vo && t_vo.update(true, arg3, arg5)) {
                        t_change = true;
                    }
                }
            }
        }

        let arg6 = data.readInt(); //活跃度
        if (self.curScore != arg6) {
            self.curScore = arg6;
            t_change = true;
        }
        let len2 = data.readShort();
        for (let i = 0; i < len2; i++) {
            let arg7 = data.readInt(); //宝箱id
            let arg8 = data.readByte(); //宝箱状态 0不可领 1可领 2已领

            let t_rewardVo = self.getRewardVoById(arg7);
            if (t_rewardVo && t_rewardVo.update(arg8)) {
                t_change = true;
            }
        }

        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.XIANDING_UPDATE);
        }
    }

    /**
     * 8721 B-I 领取任务奖励
     * @param pTaskId 任务idtaskId
     */
    public cmdSendGetTaskReward(pTaskId: number): void {
        let t_vo = this.getTaskVoById(pTaskId);
        if (!t_vo)
            return;

        var bates = this.getBytes();
        bates.writeByte(t_vo.cfg.rwlx);
        bates.writeInt(pTaskId);
        this.sendSocket(8721, bates);
    }

    /**8722 B-B-I-I 领取奖励返回 B:结果0成功 1失败stateB:失败(1没完成任务 2已领取) 成功：任务类型typeI:任务idtaskIdI:活跃度ActivityNum*/
    public GC_WuJiangGoal_getReward_8722(self: ModelXianding, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readByte(); //结果 0失败 1成功
        let arg2 = data.readByte();
        let arg3 = data.readInt(); //任务id
        let arg4 = data.readInt(); //活跃度总值
        if (arg1 == 1) {
            let t_vo = self.getTaskVoById(arg3);
            if (t_vo) {
                if (t_vo.state != Enum_Xianding.TASK_STATE_DONE) {
                    t_vo.state = Enum_Xianding.TASK_STATE_DONE;
                    t_change = true;
                }
            }

            if (self.curScore != arg4) {
                self.curScore = arg4;
                t_change = true;

                let t_rewardVoList = self.getRewardVoListByQs(self.getCurQs());
                for (let v of t_rewardVoList) {
                    if (v.state == Enum_Xianding.TASK_STATE_DONE)
                        continue;
                    if (self.curScore >= v.cfg.hy) {
                        if (v.update(Enum_Xianding.TASK_STATE_CAN_GET))
                            t_change = true;
                    }
                    else {
                        if (v.update(Enum_Xianding.TASK_STATE_NONE))
                            t_change = true;
                    }
                }
            }
        }

        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.XIANDING_UPDATE);
        }
    }

    /**8723 B 领取活跃宝箱奖励 B:对应期数的宝箱id(区分期数)boxid*/
    public cmdSendGetScoreReward(pBoxId: number): void {
        let t_rewardVo = this.getRewardVoById(pBoxId);
        if (t_rewardVo && t_rewardVo.state == Enum_Xianding.TASK_STATE_CAN_GET) {
            var bates = this.getBytes();
            bates.writeByte(pBoxId);
            this.sendSocket(8723, bates);
        }
    }

    /**8724 B-B-B 领取活跃宝箱奖励返回 B:状态0失败 1成功stateB:宝箱idboxidB:状态0未领取 1可领取 2已领取boxState*/
    public GC_WuJiangGoal_getActReward_8724(self: ModelXianding, data: BaseBytes): void {
        let t_change = false;
        let arg1 = data.readByte();
        let arg2 = data.readByte();
        let arg3 = data.readByte();
        if (arg1 == 1) //成功
        {
            let t_vo = self.getRewardVoById(arg2);
            if (t_vo && t_vo.update(arg3)) {
                t_change = true;
            }
        }

        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.XIANDING_REWARD_UPDATE);
        }
    }

    //=========================================== API ==========================================
    /**
     * 通过任务组类型获取任务数据列表
     * @param pGroupType 任务组类型
     */
    public getTaskVoListByGroupType(pGroupType: number): VoXiandingTask[] {
        let t_voList = this._groupTypeVoListMap[pGroupType];
        if (!t_voList) {
            this._groupTypeVoListMap[pGroupType] = t_voList = [];
            for (let k in this._voMap) {
                let t_vo = this._voMap[k];
                if (t_vo.cfg.rwz == pGroupType) {
                    t_voList.push(t_vo);
                }
            }
        }
        return t_voList;
    }

    /** 获取当前期数 */
    public getCurQs(): number {
        let t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_XIANDING);
        if (t_actVo)
            return t_actVo.qs;
        else
            return 1;
    }

    public getTaskVoById(pId: number): VoXiandingTask {
        return this._voMap[pId];
    }

    public getRewardVoById(pId: number): VoXiandingReward {
        return this._rewardVoMap[pId];
    }

    private _qsRewardListMap: { [qs: number]: VoXiandingReward[] } = {};
    public getRewardVoListByQs(pQs: number): VoXiandingReward[] {
        let t_list = this._qsRewardListMap[pQs];
        if (t_list === undefined) {
            this._qsRewardListMap[pQs] = t_list = [];
            for (let k in this._rewardVoMap) {
                let t_vo = this._rewardVoMap[k];
                if (t_vo.cfg.qs == pQs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    /** 红点检查 */
    public reddotCheck() {
        let t_allRed = false; //总红点
        //标签页红点
        for (let v of this._groupTypeList) {
            let t_value = false;
            let t_taskVoList = this.getTaskVoListByGroupType(v);
            for (let t_vo of t_taskVoList) {
                if (t_vo.isOpen && t_vo.state == Enum_Xianding.TASK_STATE_CAN_GET) {
                    t_value = true;
                    break;
                }
            }
            if (t_value)
                t_allRed = true;
            GGlobal.reddot.setCondition(UIConst.ACTCOM_XIANDING, v, t_value);
        }

        //活跃度红点
        let t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_XIANDING);
        if (t_actVo && t_actVo.status == 1) {
            let t_value = false;
            let t_rewardVoList = this.getRewardVoListByQs(t_actVo.qs);
            for (let v of t_rewardVoList) {
                if (v.state == Enum_Xianding.TASK_STATE_CAN_GET) {
                    t_value = true;
                    break;
                }
            }
            if (t_value)
                t_allRed = true;
            GGlobal.reddot.setCondition(UIConst.ACTCOM_XIANDING, 99, t_value);
        }

        GGlobal.reddot.setCondition(UIConst.ACTCOM_XIANDING, 0, t_allRed);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}