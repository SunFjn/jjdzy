/**
 * 三国战令模块管理器
 * @author: lujiahao 
 * @date: 2019-09-19 14:11:10 
 */
class ModelSGZL extends BaseModel {
    constructor() {
        super();
    }

    private _taskVoMap: { [taskId: number]: VoSGZLTask } = {};
    private _rewardVoMap: { [id: number]: VoSGZLReward } = {};
    private _shopVoMap: { [id: number]: VoSGZLShop } = {};
    public initOpen = false;

    /** 是否进阶过 */
    public upgradeFlag = 0;
    /** 战令等级id */
    public levelId = 0;
    /** 当前战令经验 */
    public curExp = 0;

    public con0Count = 0;
    public con1Count = 1;

    private _setupFlag = false;
    public setup() {
        if (this._setupFlag)
            return;
        this._setupFlag = true;

        {
            let t_cfg = Config.sgzljl_017;
            for (let k in t_cfg) {
                let t_vo = new VoSGZLReward();
                t_vo.id = ~~k;
                this._rewardVoMap[t_vo.id] = t_vo;
            }
        }

        {
            let t_cfg = Config.sgzlrw_017;
            for (let k in t_cfg) {
                let t_vo = new VoSGZLTask();
                t_vo.taskId = ~~k;
                this._taskVoMap[t_vo.taskId] = t_vo;
            }
        }

        {
            let t_cfg = Config.sgzlshop_017;
            for (let k in t_cfg) {
                let t_vo = new VoSGZLShop();
                t_vo.id = ~~k;
                this._shopVoMap[t_vo.id] = t_vo;
            }
        }
    }
    //========================================= 协议相关 ========================================
    public listenServ(m: WebSocketMgr) {
        super.listenServ(m);
        //注册GC方法
        m.regHand(8850, this.GC_WarOrderActive_openUI_8850, this);
        m.regHand(8852, this.GC_WarOrderActive_getWarOrderReward_8852, this);
        m.regHand(8854, this.GC_WarOrderActive_openTaskUI_8854, this);
        m.regHand(8856, this.GC_WarOrderActive_getReward_8856, this);
        m.regHand(8858, this.GC_WarOrderActive_openShopUI_8858, this);
        m.regHand(8860, this.GC_WarOrderActive_buy_8860, this);
    }

    /**8850 [I-[I-B]]-B-I-I 打开战令界面返回 [I:战令类型 0普通 1进阶[I:战令等级B:领取状态 0未领取 1可领取 2已领取]]战令数据sendDataB:进阶战令状态 0普通(未购买) 1进阶(已购买)buyStateI:战令等级levelI:战令经验exp*/
    public GC_WarOrderActive_openUI_8850(self: ModelSGZL, data: BaseBytes): void {
        let t_change = false;

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg1 = data.readInt();
            let len1 = data.readShort();
            for (let i = 0; i < len1; i++) {
                let arg2 = data.readInt();
                let arg3 = data.readByte();

                let t_rewardVo = self.getRewardVoById(arg2);
                if (t_rewardVo) {
                    if (t_rewardVo.updateState(arg1, arg3)) {
                        t_change = true;
                    }
                }
            }
        }
        let arg4 = data.readByte();
        let arg5 = data.readInt();
        let arg6 = data.readInt();

        if (arg4 != self.upgradeFlag) {
            self.upgradeFlag = arg4;
            t_change = true;
        }

        if (arg5 != self.levelId) {
            self.levelId = arg5;
            t_change = true;
        }

        if (arg6 != self.curExp) {
            self.curExp = arg6;
            t_change = true;
            // console.log("Reward查询经验==========", self.curExp);
        }

        if (!self.initOpen) {
            self.initOpen = true;
            self.reddotCheckAll();
        }

        if (t_change) {
            self.reddotCheckReward();
            GGlobal.control.notify(Enum_MsgType.SGZL_REWARD_UPDATE);
        }
    }

    /**
     * 发送领取战令奖励的请求
     * @param pGetType 领取类型 0单个领取 1一键领取
     * @param pType 战令类型 0普通 1进阶 一键领取时，该参数没意义
     * @param pId 指定的奖励id 一键领取时，该参数没意义
     */
    public cmdSendGetReward(pGetType: number, pType: number = 0, pId: number = 0): void {
        //8851 I-I-I 领取战令奖励 I:战令类型 0普通 1进阶typeI:战令等级levelI:领取方式 0普通领取 1一键领取getState
        if (pGetType == 1) {
            let t_value = GGlobal.reddot.checkCondition(UIConst.ACTHB_SGZL, 1);
            if (!t_value) {
                ViewCommonWarn.text("当前没有可领取的奖励");
                return;
            }
        }
        var bates = this.getBytes();
        bates.writeInt(pType);
        bates.writeInt(pId);
        bates.writeInt(pGetType);
        this.sendSocket(8851, bates);
    }

    /**8852 B-I-I-I 领取战令奖励返回 B:状态 0没有购买进阶战令不能领取 1该等级奖励不可领取 2没有可领取的奖励 3成功stateI:领取方式 0普通 1一键getStateI:战令类型typeI:战令等级level*/
    public GC_WarOrderActive_getWarOrderReward_8852(self: ModelSGZL, data: BaseBytes): void {
        let t_change = false;

        let t_result = data.readByte();
        let t_getType = data.readInt();
        let t_type = data.readInt();
        let t_levelId = data.readInt();

        if (t_result == 3) //成功
        {
            if (t_getType == 1) {
                //一键领取
                let t_rewardList = self.getRewardVoList();
                for (let v of t_rewardList) {
                    if (v.state0 == Enum_SGZL.STATE_CAN_GET) {
                        v.state0 = Enum_SGZL.SATTE_DONE;
                        t_change = true;
                    }
                    if (v.state1 == Enum_SGZL.STATE_CAN_GET) {
                        v.state1 = Enum_SGZL.SATTE_DONE;
                        t_change = true;
                    }
                }
            }
            else {
                //单独领取
                let t_vo = self.getRewardVoById(t_levelId);
                if (t_vo && t_vo.updateState(t_type, Enum_SGZL.SATTE_DONE)) {
                    t_change = true;
                }
            }
        }

        if (t_change) {
            self.reddotCheckReward();
            GGlobal.control.notify(Enum_MsgType.SGZL_REWARD_UPDATE);
        }
    }

    /**8853  打开任务UI */
    public cmdSendRequestTaskList(): void {
        var bates = this.getBytes();
        this.sendSocket(8853, bates);
    }

    /**8854 [I-I-[I-B]] 打开任务UI返回 [I:任务类型I:该类型任务的完成度[I:任务idB:任务状态]]任务数据taskData*/
    public GC_WarOrderActive_openTaskUI_8854(self: ModelSGZL, data: BaseBytes): void {
        let t_change = false;
        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg1 = data.readInt(); //任务类型
            let arg2 = data.readInt(); //当前的任务类型完成计数
            let len1 = data.readShort();
            for (let i = 0; i < len1; i++) {
                let arg3 = data.readInt(); //任务id
                let arg4 = data.readByte(); //任务状态 0未完成 1可领取 2已领取

                let t_vo = self.getTaskVoByTaskId(arg3);
                if (t_vo && t_vo.update(arg2, arg4)) {
                    t_change = true;
                }
            }
        }

        if (t_change) {
            self.reddotCheckTask();
            GGlobal.control.notify(Enum_MsgType.SGZL_TASK_UPDATE);
        }
    }

    /**8855 I-I 领取任务奖励 I:任务类型typeI:任务idtaskId*/
    public cmdSendGetTaskReward(pTaskId: number): void {
        let t_vo = this.getTaskVoByTaskId(pTaskId);
        if (!t_vo)
            return;

        var bates = this.getBytes();
        bates.writeInt(t_vo.cfg.leixing);
        bates.writeInt(pTaskId);
        this.sendSocket(8855, bates);
    }

    /**8856 B-I-I-I-I 领取任务奖励返回 B:结果 0失败 1成功stateI:失败(1未完成任务 2已领取)，成功返回任务类型typeI:任务idtaskIdI:战令等级levelI:战令经验exp*/
    public GC_WarOrderActive_getReward_8856(self: ModelSGZL, data: BaseBytes): void {
        let t_change = false;

        let t_result = data.readByte();
        let t_taskType = data.readInt();
        let t_taskId = data.readInt();
        let t_levelId = data.readInt();
        let t_curExp = data.readInt();

        // console.log("领取后的经验=========", t_curExp);


        if (t_result == 1) {
            //成功
            let t_vo = self.getTaskVoByTaskId(t_taskId);
            if (t_vo && t_vo.state != Enum_SGZL.SATTE_DONE) {
                t_vo.state = Enum_SGZL.SATTE_DONE;
                t_change = true;
            }

            if (self.levelId != t_levelId) {
                self.levelId = t_levelId;
                t_change = true;
            }

            if (self.curExp != t_curExp) {
                self.curExp = t_curExp;
                t_change = true;
            }
        }

        if (t_change) {
            self.reddotCheckTask();
            GGlobal.modelEightLock.CG4571(UIConst.ACTHB_SGZL); //重新请求更新奖励列表数据
            GGlobal.control.notify(Enum_MsgType.SGZL_REWARD_UPDATE);
            GGlobal.control.notify(Enum_MsgType.SGZL_TASK_UPDATE);
        }
    }

    /**8857  打开商店页面 */
    public cmdSendRequestShop(): void {
        var bates = this.getBytes();
        this.sendSocket(8857, bates);
    }

    /**8858 [I-I]-I-I 打开商店页面返回 [I:配置表idI:已购买数量]商店列表shopListI:背包中的白银令prop1I:背包中的黄金令prop2*/
    public GC_WarOrderActive_openShopUI_8858(self: ModelSGZL, data: BaseBytes): void {
        let t_change = false;

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg1 = data.readInt(); //商店id
            let arg2 = data.readInt(); //已购买数量

            let t_vo = self.getShopVoById(arg1);
            if (t_vo && t_vo.update(arg2)) {
                t_change = true;
            }
        }

        let arg3 = data.readInt();
        let arg4 = data.readInt();
        if (self.con0Count != arg3) {
            self.con0Count = arg3;
            t_change = true;
        }

        if (self.con1Count != arg4) {
            self.con1Count = arg4
            t_change = true;
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.SGZL_SHOP_UPDATE);
        }
    }

    /**8859 I 购买商品 I:配置表idid*/
    public cmdSendBuy(pId: number): void {
        let t_vo = this.getShopVoById(pId);
        if (!t_vo)
            return;

        if (!t_vo.checkCanBuy())
            return;

        var bates = this.getBytes();
        bates.writeInt(pId);
        this.sendSocket(8859, bates);
    }

    /**8860 B-I 购买商品返回 B:状态 0商品不存在 1成功 2道具不足 3商品已卖完stateI:购买的配置表idid*/
    public GC_WarOrderActive_buy_8860(self: ModelSGZL, data: BaseBytes): void {
        let t_change = false;

        let t_result = data.readByte();
        let t_shopId = data.readInt();

        switch (t_result) {
            case 1:
                let t_vo = self.getShopVoById(t_shopId);
                if (t_vo) {
                    t_vo.buyCount += 1;
                    t_change = true;
                }
                break;
            case 2:
                t_vo = self.getShopVoById(t_shopId);
                if (t_vo) {
                    ViewCommonWarn.text("缺少道具：" + HtmlUtil.fontNoSize(t_vo.consumeItem.name, Color.getColorStr(t_vo.consumeItem.quality)));
                }
                break;

            case 3:
                ViewCommonWarn.text("商品已卖完");
                break;
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.SGZL_SHOP_UPDATE);
        }
    }

    //=========================================== API ==========================================
    private _taskVoList: VoSGZLTask[];
    public getTaskVoList(): VoSGZLTask[] {
        if (this._taskVoList === undefined) {
            this._taskVoList = [];
            for (let k in this._taskVoMap) {
                this._taskVoList.push(this._taskVoMap[k]);
            }
        }
        return this._taskVoList;
    }

    private _typeVoListMap: { [type: number]: VoSGZLTask[] };
    public getTypeVoListMap() {
        if (this._typeVoListMap === undefined) {
            let t_allList = this.getTaskVoList();
            this._typeVoListMap = {};
            for (let v of t_allList) {
                let t_type = v.cfg.leixing;
                let t_voList = this._typeVoListMap[t_type];
                if (!t_voList) {
                    this._typeVoListMap[t_type] = t_voList = [];
                }
                t_voList.push(v);
            }
        }
        return this._typeVoListMap;
    }

    private _rewardVoList: VoSGZLReward[];
    public getRewardVoList(): VoSGZLReward[] {
        if (this._rewardVoList === undefined) {
            this._rewardVoList = [];
            for (let k in this._rewardVoMap) {
                let t_id = ~~k;
                if (t_id == 0)
                    continue;
                this._rewardVoList.push(this._rewardVoMap[k]);
            }
        }
        return this._rewardVoList;
    }

    private _shopVoList: VoSGZLShop[];
    public getShopVoList(): VoSGZLShop[] {
        if (this._shopVoList === undefined) {
            this._shopVoList = [];
            for (let k in this._shopVoMap) {
                this._shopVoList.push(this._shopVoMap[k]);
            }
        }
        return this._shopVoList;
    }

    public getTaskVoByTaskId(pTaskId: number): VoSGZLTask {
        return this._taskVoMap[pTaskId];
    }

    public getRewardVoById(pId: number): VoSGZLReward {
        return this._rewardVoMap[pId];
    }

    public getShopVoById(pId: number): VoSGZLShop {
        return this._shopVoMap[pId];
    }

    //===================================== private method =====================================
    public reddotCheckAll() {
        let t_value1 = GGlobal.reddot.checkCondition(UIConst.ACTHB_SGZL, 1);
        let t_value2 = GGlobal.reddot.checkCondition(UIConst.ACTHB_SGZL, 2);
        let t_all = false;
        if (t_value1 || t_value2 || !this.initOpen) {
            t_all = true;
        }
        GGlobal.reddot.setCondition(UIConst.ACTHB_SGZL, 0, t_all);
        GGlobal.control.notify(UIConst.ACTHB_SGZL);
        GGlobal.reddot.notify(UIConst.ACTHB_SGZL);
    }

    public reddotCheckReward() {
        let t_value = false;
        let t_voList = this.getRewardVoList();
        for (let v of t_voList) {
            if (v.state0 == Enum_SGZL.STATE_CAN_GET || v.state1 == Enum_SGZL.STATE_CAN_GET) {
                t_value = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.ACTHB_SGZL, 1, t_value);
        this.reddotCheckAll();
    }

    public reddotCheckTask() {
        let t_value = false;
        let t_voList = this.getTaskVoList();
        for (let v of t_voList) {
            if (v.state == Enum_SGZL.STATE_CAN_GET) {
                t_value = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.ACTHB_SGZL, 2, t_value);
        this.reddotCheckAll();
    }

    public reddotCheckShop() {
    }
    //======================================== handler =========================================
}