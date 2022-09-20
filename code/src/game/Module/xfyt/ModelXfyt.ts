/**
 * 消费摇骰管理器
 * @author: lujiahao 
 * @date: 2019-10-30 10:07:45 
 */
class ModelXfyt extends BaseModel {
    constructor() {
        super();
    }

    private _cfgRollMap: { [id: number]: CfgRollXfyt } = {};

    /** 是否播放动画 */
    public isPlayMc = true;

    /** 当前消费额 */
    public curChangeValue = 0;
    /** 当前期数 */
    public curQs = 1;
    /** 剩余摇骰次数 */
    public remain = 0;
    /** 已经摇过的次数 */
    public rolledCount = 0;

    /** 移动步数（用于成功后做动画步数） */
    public step = 0;

    /** 走过的总步数，用于计算当前圈数 */
    public totolStep = 0;

    public info: VoRollXfyt = new VoRollXfyt();

    private _setupFlag = false;
    public setup() {
        if (this._setupFlag)
            return;
        this._setupFlag = true;
    }

    //========================================= 协议相关 ========================================
    //协议处理
    public listenServ(mgr: WebSocketMgr) {
        this.socket = mgr;

        mgr.regHand(10020, this.GC_RollDice_openUI_10020, this);
        mgr.regHand(10022, this.GC_RollDice_rolldice_10022, this);
    }

    /**10020 I-I-I-I-B-I 打开消费摇骰界面返回 I:格子IdidI:剩余摇骰次数numI:当前消费元宝yuanbaoI:期数 qsB:显示骰子点数 diceNumI:总步数totalNum*/
    public GC_RollDice_openUI_10020(self: ModelXfyt, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readInt(); //格子id
        let arg2 = data.readInt(); //剩余次数
        let arg3 = data.readInt(); //当前消费额度
        let arg4 = data.readInt(); //期数
        let arg5 = data.readByte(); //上次点数
        let arg6 = data.readInt(); //走过的总步数

        if (self.info.update(arg1)) {
            t_change = true;
        }
        if (self.remain != arg2) {
            self.remain = arg2;
            t_change = true;
        }
        if (self.curChangeValue != arg3) {
            self.curChangeValue = arg3;
            t_change = true;
        }
        if (self.curQs != arg4) {
            self.curQs = arg4;
            t_change = true;
        }
        if (self.step != arg5) {
            self.step = arg5;
            t_change = true;
        }
        if (self.totolStep != arg6) {
            self.totolStep = arg6;
            t_change = true;
        }

        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.XFYT_UPDATE);
        }
    }

    /**10021  摇骰 */
    public CG_RollDice_rolldice_10021(): void {
        let t = this;
        let t_limit = t.rollTimesLimit;
        let t_hasTimes = t.hadRollCount;
        if (t_hasTimes >= t_limit) {
            ViewCommonWarn.text(`已达到摇骰次数上限，上限为${t_limit}次`);
            return;
        }
        if (t.remain <= 0) {
            ViewCommonWarn.text("摇骰次数不足");
            return;
        }
        var bates = this.getBytes();
        this.sendSocket(10021, bates);
    }

    public resultList: IGridImpl[] = [];
    /**10022 B-I-B-I 摇骰返回 B:状态：1.成功 2.背包已满 3.剩余次数不足stateI:格子id idB:骰子点数diceNumI:剩余次数num*/
    public GC_RollDice_rolldice_10022(self: ModelXfyt, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readByte(); //结果
        let arg2 = data.readInt(); //格子id
        let arg3 = data.readByte(); //摇出点数（移动步数）
        let arg4 = data.readInt(); //剩余次数
        let arg5 = data.readInt(); //已摇次数
        let arg6 = data.readInt(); //走过的总步数

        switch (arg1) {
            case 1:
                if (self.info.update(arg2)) {
                    self.remain = arg4;
                    self.step = arg3;
                    self.totolStep = arg6;
                    self.rolledCount = arg5;
                    t_change = true;

                    //计算得到的奖励列表
                    self.resultList.length = 0;
                    let t_stepCount = 0;
                    let t_curId = self.info.lastId;
                    while (t_stepCount < self.step) {
                        let t_curCfg = self.getCfgRoll(t_curId);
                        let t_nextCfg = self.getCfgRoll(t_curCfg.cfg.next);
                        if (t_nextCfg.rewardItem)
                            self.resultList.push(t_nextCfg.rewardItem);
                        t_stepCount++;
                        t_curId = t_curCfg.cfg.next;
                    }
                }
                break;
            case 2:
                ViewCommonWarn.text("背包已满");
                break;
            case 3:
                break;
        }

        if (t_change) {
            self.reddotCheck();
            GGlobal.control.notify(Enum_MsgType.XFYT_ROLL_SUCCESS);
        }
    }

    //=========================================== API ==========================================
    /** 获取摇骰配置 */
    public getCfgRoll(pId: number): CfgRollXfyt {
        let t = this;
        let t_vo = t._cfgRollMap[pId];
        if (t_vo === undefined) {
            if (Config.xfyt_763[pId]) {
                t_vo = new CfgRollXfyt();
                t_vo.id = pId;
                t._cfgRollMap[pId] = t_vo;
            }
            else
                t._cfgRollMap[pId] = null;
        }
        return t_vo;
    }

    /** 获取当前期数获取次数所需的元宝消耗数 */
    public get maxChargeValue(): number {
        let t = this;
        let t_cfg = Config.xfytsx_763[t.curQs];
        if (t_cfg) {
            return t_cfg.xf;
        }
        else
            return 0;
    }

    /** 获取当前期数摇骰次数上限 */
    public get rollTimesLimit(): number {
        let t = this;
        let t_cfg = Config.xfytsx_763[t.curQs];
        if (t_cfg) {
            return t_cfg.cs;
        }
        else
            return 0;
    }

    /** 根据消费额计算出的可摇骰次数 */
    public get canRollTimes(): number {
        let t = this;
        let t_curValue = t.curChangeValue;
        let t_perCount = t.maxChargeValue;
        let t_hasTimes = ~~(t_curValue / t_perCount);
        return Math.min(t_hasTimes, t.rollTimesLimit)
    }

    /** 已经摇骰的次数 */
    public get hadRollCount(): number {
        let t = this;
        return t.canRollTimes - t.remain;
    }

    /** 获取当前期数和圈数的配置数据列表 */
    public getCurCfgRollList(): CfgRollXfyt[] {
        let t = this;
        let t_round = t.info.round;
        let t_qs = t.curQs;
        let t_list: CfgRollXfyt[] = [];
        for (let i = 0; i < EnumXfyt.POS_COUNT; i++) {
            let t_pos = i + 1;
            let t_id = t_qs * 1000 + t_round * 100 + t_pos;
            let t_cfg = t.getCfgRoll(t_id);
            t_list.push(t_cfg);
        }
        return t_list;
    }

    //===================================== private method =====================================
    private reddotCheck() {
        let t = this;
        let t_value = t.remain > 0;
        GGlobal.reddot.setCondition(UIConst.ACTCOM_XFYT, 0, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    }
    //======================================== handler =========================================
}