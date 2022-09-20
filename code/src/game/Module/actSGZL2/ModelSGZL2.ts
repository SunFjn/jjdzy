/**
 * 三国战令（动态活动）模块管理器
 * @author: lujiahao 
 * @date: 2019-11-14 15:57:53 
 */
class ModelSGZL2 extends BaseModel {
    constructor() {
        super();
    }

    private _taskVoMap: { [taskId: number]: VoSGZL2Task } = {};
    private _rewardVoMap: { [id: number]: VoSGZL2Reward } = {};
    private _shopVoMap: { [id: number]: VoSGZL2Shop } = {};
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
            let t_cfg = Config.sgzljl_332;
            for (let k in t_cfg) {
                let t_vo = new VoSGZL2Reward();
                t_vo.id = ~~k;
                this._rewardVoMap[t_vo.id] = t_vo;
            }
        }

        {
            let t_cfg = Config.sgzlrw_332;
            for (let k in t_cfg) {
                let t_vo = new VoSGZL2Task();
                t_vo.taskId = ~~k;
                this._taskVoMap[t_vo.taskId] = t_vo;
            }
        }

        {
            let t_cfg = Config.sgzlshop_332;
            for (let k in t_cfg) {
                let t_vo = new VoSGZL2Shop();
                t_vo.id = ~~k;
                this._shopVoMap[t_vo.id] = t_vo;
            }
        }
    }
    //========================================= 协议相关 ========================================
    public listenServ(mgr: WebSocketMgr) {
        super.listenServ(mgr);
        //注册GC方法
        mgr.regHand(10400, this.GC_WarOrderAct_openUI_10400, this);
        mgr.regHand(10402, this.GC_WarOrderAct_getWarOrderReward_10402, this);
        mgr.regHand(10404, this.GC_WarOrderAct_openTaskUI_10404, this);
        mgr.regHand(10406, this.GC_WarOrderAct_getReward_10406, this);
        mgr.regHand(10408, this.GC_WarOrderAct_openShopUI_10408, this);
        mgr.regHand(10410, this.GC_WarOrderAct_buy_10410, this);
    }

    /**10400 [I-[I-B]]-B-I-I 打开战令界面返回 [I:战令类型 0普通 1进阶[I:战令等级B:领取状态 0未领取 1可领取 2已领取]]战令数据sendDataB:进阶战令状态 0普通(未购买) 1进阶(已购买)buyStateI:战令等级levelI:战令经验exp*/
    public GC_WarOrderAct_openUI_10400(self: ModelSGZL2, data: BaseBytes): void {
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
            GGlobal.control.notify(Enum_MsgType.SGZL2_REWARD_UPDATE);
        }
    }

    /**
     * 发送领取战令奖励的请求
     * @param pGetType 领取类型 0单个领取 1一键领取
     * @param pType 战令类型 0普通 1进阶 一键领取时，该参数没意义
     * @param pId 指定的奖励id 一键领取时，该参数没意义
     */
    public cmdSendGetReward(pGetType: number, pType: number = 0, pId: number = 0): void {
        /**10401 I-I-I 领取战令奖励 I:战令类型 0普通 1进阶typeI:战令等级levelI:领取方式 0普通领取 1一键领取getState*/
        let t = this;
        var bates = this.getBytes();
        bates.writeInt(pType);
        bates.writeInt(pId);
        bates.writeInt(pGetType);
        this.sendSocket(10401, bates);
    }

    /**10402 B-I-I-I 领取战令奖励返回 B:状态 0没有购买进阶战令不能领取 1该等级奖励不可领取 2没有可领取的奖励 3成功stateI:领取方式 0普通 1一键getStateI:战令类型typeI:战令等级level*/
    public GC_WarOrderAct_getWarOrderReward_10402(self: ModelSGZL2, data: BaseBytes): void {
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
            GGlobal.control.notify(Enum_MsgType.SGZL2_REWARD_UPDATE);
        }
    }

    /**10403  打开任务UI */
    public cmdSendRequestTaskList(): void {
        var bates = this.getBytes();
        this.sendSocket(10403, bates);
    }

    /**10404 [I-I-[I-B]] 打开任务UI返回 [I:任务类型I:该类型任务的完成度[I:任务idB:任务状态]]任务数据taskData*/
    public GC_WarOrderAct_openTaskUI_10404(self: ModelSGZL2, data: BaseBytes): void {
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
            GGlobal.control.notify(Enum_MsgType.SGZL2_TASK_UPDATE);
        }
    }

    /**10405 I-I 领取任务奖励 I:任务类型typeI:任务idtaskId*/
    public cmdSendGetTaskReward(pTaskId: number): void {
        let t_vo = this.getTaskVoByTaskId(pTaskId);
        if (!t_vo)
            return;

        var bates = this.getBytes();
        bates.writeInt(t_vo.cfg.leixing);
        bates.writeInt(pTaskId);
        this.sendSocket(10405, bates);
    }

    /**10406 B-I-I-I-I 领取任务奖励返回 B:结果 0失败 1成功stateI:失败(1未完成任务 2已领取)，成功返回任务类型typeI:任务idtaskIdI:战令等级levelI:战令经验exp*/
    public GC_WarOrderAct_getReward_10406(self: ModelSGZL2, data: BaseBytes): void {
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
            GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SGZL2); //重新请求更新奖励列表数据
            GGlobal.control.notify(Enum_MsgType.SGZL2_REWARD_UPDATE);
            GGlobal.control.notify(Enum_MsgType.SGZL2_TASK_UPDATE);
        }
    }

    /**10407  打开商店页面 */
    public cmdSendRequestShop(): void {
        var bates = this.getBytes();
        this.sendSocket(10407, bates);
    }

    /**10408 [I-I]-I-I 打开商店页面 [I:配置表idI:已购买数量]商店列表shopListI:背包中的白银令prop1I:背包中的黄金令prop2*/
    public GC_WarOrderAct_openShopUI_10408(self: ModelSGZL2, data: BaseBytes): void {
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
            GGlobal.control.notify(Enum_MsgType.SGZL2_SHOP_UPDATE);
        }
    }

    /**10409 I 购买商品 I:配置表idid*/
    public cmdSendBuy(pId: number): void {
        let t_vo = this.getShopVoById(pId);
        if (!t_vo)
            return;

        if (!t_vo.checkCanBuy())
            return;

        var bates = this.getBytes();
        bates.writeInt(pId);
        this.sendSocket(10409, bates);
    }

    /**10410 B-I 购买商品 B:状态 0商品不存在 1成功 2道具不足 3商品已卖完stateI:购买的配置表idid*/
    public GC_WarOrderAct_buy_10410(self: ModelSGZL2, data: BaseBytes): void {
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
            GGlobal.control.notify(Enum_MsgType.SGZL2_SHOP_UPDATE);
        }
    }

    //=========================================== API ==========================================
    private _taskVoListQsMap: { [qs: number]: VoSGZL2Task[] } = {};
    public getTaskVoList(): VoSGZL2Task[] {
        let t = this;
        let t_qs = t.getCurQs();
        let t_list = t._taskVoListQsMap[t_qs];
        if (t_list === undefined) {
            t._taskVoListQsMap[t_qs] = t_list = [];
            for (let k in t._taskVoMap) {
                let t_vo = t._taskVoMap[k];
                if (t_vo && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    private _typeVoListQsMap: { [qs: number]: { [type: number]: VoSGZL2Task[] } } = {};
    public getTypeVoListMap() {
        let t = this;
        let t_qs = t.getCurQs();
        let t_typeVoListMap = t._typeVoListQsMap[t_qs];
        if (t_typeVoListMap === undefined) {
            t._typeVoListQsMap[t_qs] = t_typeVoListMap = {};
            let t_allList = t.getTaskVoList();
            for (let v of t_allList) {
                let t_type = v.cfg.leixing;
                let t_voList = t_typeVoListMap[t_type];
                if (!t_voList) {
                    t_typeVoListMap[t_type] = t_voList = [];
                }
                t_voList.push(v);
            }
        }
        return t_typeVoListMap;
    }

    private _rewardVoListMap: { [qs: number]: VoSGZL2Reward[] } = {};
    public getRewardVoList(): VoSGZL2Reward[] {
        let t = this;
        let t_qs = t.getCurQs();
        let t_list = t._rewardVoListMap[t_qs];
        if (t_list === undefined) {
            t._rewardVoListMap[t_qs] = t_list = [];
            for (let k in t._rewardVoMap) {
                let t_vo = t._rewardVoMap[k];
                if (t_vo && t_vo.cfg.dengji != 0 && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    private _shopVoListQsMap: { [qs: number]: VoSGZL2Shop[] } = {};
    public getShopVoList(): VoSGZL2Shop[] {
        let t = this;
        let t_qs = t.getCurQs();
        let t_list = t._shopVoListQsMap[t_qs];
        if (t_list === undefined) {
            t._shopVoListQsMap[t_qs] = t_list = [];
            for (let k in t._shopVoMap) {
                let t_vo = t._shopVoMap[k];
                if (t_vo && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    public getTaskVoByTaskId(pTaskId: number): VoSGZL2Task {
        return this._taskVoMap[pTaskId];
    }

    public getRewardVoById(pId: number): VoSGZL2Reward {
        let t_qs = this.getCurQs();
        let t_id = t_qs * 1000 + pId + 1;
        return this._rewardVoMap[t_id];
    }

    public getShopVoById(pId: number): VoSGZL2Shop {
        return this._shopVoMap[pId];
    }

    /** 获取当前活动期数 */
    public getCurQs(): number {
        let t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SGZL2);
        if (t_actVo)
            return t_actVo.qs;
        else
            return 1;
    }

    //===================================== private method =====================================
    public reddotCheckAll() {
        let t_value1 = GGlobal.reddot.checkCondition(UIConst.ACTCOM_SGZL2, 1);
        let t_value2 = GGlobal.reddot.checkCondition(UIConst.ACTCOM_SGZL2, 2);
        let t_all = false;
        if (t_value1 || t_value2 || !this.initOpen) {
            t_all = true;
        }
        GGlobal.reddot.setCondition(UIConst.ACTCOM_SGZL2, 0, t_all);
        GGlobal.control.notify(UIConst.ACTCOM_SGZL2);
        GGlobal.reddot.notify(UIConst.ACTCOM_SGZL2);
        GGlobal.reddot.notify(UIConst.ACTCOM);
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
        GGlobal.reddot.setCondition(UIConst.ACTCOM_SGZL2, 1, t_value);
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
        GGlobal.reddot.setCondition(UIConst.ACTCOM_SGZL2, 2, t_value);
        this.reddotCheckAll();
    }

    public reddotCheckShop() {
    }
    //======================================== handler =========================================
}