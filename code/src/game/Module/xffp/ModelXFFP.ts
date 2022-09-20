/**
 * 消费翻牌模块管理
 * @author: lujiahao 
 * @date: 2019-09-07 11:56:17 
 */
class ModelXFFP extends BaseModel {
    constructor() {
        super();
    }

    /** 奖池奖励物品列表map key：期数 value：奖励物品列表  */
    private _rewardVoListMap: { [qs: number]: VoXffpReward[] } = {};
    private _rewardVoMap: { [id: number]: VoXffpReward } = {};

    /** 当前消费额 */
    public curChargeValue = 0;
    /** 已翻牌次数 */
    public fpCount = 0;
    /** 当前期数 */
    public curQs = 1;

    /** 当前进度id 进度为0则为超过最大进度 */
    public curPbId = 0;

    public setup() {
        let t_cfg = Config.xhdxffpxfb_318;
        for (let k in t_cfg) {
            let t_rewardVo = new VoXffpReward();
            t_rewardVo.id = ~~k;
            let t_rewardList = this._rewardVoListMap[t_rewardVo.cfg.qs];
            if (!t_rewardList) {
                this._rewardVoListMap[t_rewardVo.cfg.qs] = t_rewardList = [];
            }
            else {
                let t_lastVo = t_rewardList[t_rewardList.length - 1];
                t_rewardVo.lastVo = t_lastVo;
                t_lastVo.nextVo = t_rewardVo;
            }
            t_rewardList.push(t_rewardVo);
            this._rewardVoMap[t_rewardVo.id] = t_rewardVo;
        }

        this.updateCurPbId();
    }

    //========================================= 协议相关 ========================================
    public listenServ(m: WebSocketMgr) {
        super.listenServ(m);
        //注册GC方法
        m.regHand(8600, this.GC_ConsumeTurnCardAct_openUI_8600, this);
        m.regHand(8602, this.GC_ConsumeTurnCardAct_turn_8602, this);
    }

    /**8600 I-I-I-[I-I-B] 打开界面返回 I:消费元宝数量numI:期数qsI:已翻牌次数times[I:消费翻牌消费表idI:位置，从0开始B:状态（0未抽中 1已抽中）]翻牌列表turntableList*/
    public GC_ConsumeTurnCardAct_openUI_8600(self: ModelXFFP, data: BaseBytes): void {
        let t_change = false;

        let arg1 = data.readInt();
        if (arg1 != self.curChargeValue) {
            self.curChargeValue = arg1;
            t_change = true;

            self.updateCurPbId();
        }

        let arg2 = data.readInt();
        if (arg2 != self.curQs) {
            self.curQs = arg2;
            t_change = true;

            self.updateCurPbId();
        }

        let arg3 = data.readInt();
        if (arg3 != self.fpCount) {
            self.fpCount = arg3;
            t_change = true;
        }

        let len = data.readShort();
        for (let i = 0; i < len; i++) {
            let arg4 = data.readInt();
            let arg5 = data.readInt();
            let arg6 = data.readByte();
            let t_vo = self.getRewardVoById(arg4);
            if (t_vo) {
                if (t_vo.update(arg5, arg6)) {
                    t_change = true;
                }
            }
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.XFFP_UPDATE);
        }
        self.reddotCheck();
    }

    /**8601 I 翻牌 I:位置，从0开始index*/
    public cmdSendFlopCard(pIndex: number): void {

        if (!TimeUitl.cool("ModelXFFP.cmdSendFlopCard", 500))
            return;

        let t_remain = this.remainFpCount;
        if (t_remain < 1) {
            ViewCommonWarn.text("剩余翻牌次数不足");
            return;
        }

        let t_voList = this.getRewardVoListByQs(this.curQs);
        if (!t_voList)
            return;
        for (let v of t_voList) {
            if (v.index > -1 && v.index == pIndex) {
                //防止翻牌位置重复的判断
                return;
            }
        }

        var bates = this.getBytes();
        bates.writeInt(pIndex);
        this.sendSocket(8601, bates);
    }

    /**8602 B-I-I 翻牌返回 B:状态：1：成功，2：抽奖次数不足stateI:抽取的档次，为消费翻牌消费表ididI:位置，从0开始index*/
    public GC_ConsumeTurnCardAct_turn_8602(self: ModelXFFP, data: BaseBytes): void {
        let t_change = false;
        let arg1 = data.readByte();
        let t_id = data.readInt();
        let t_index = data.readInt();
        if (arg1 == 1) {
            //成功
            let t_vo = self.getRewardVoById(t_id);
            if (t_vo) {
                if (t_vo.update(t_index, 1)) {
                    t_change = true;
                }
            }
            self.fpCount += 1; //更新翻牌次数

            self.reddotCheck();
        }

        if (t_change) {
            GGlobal.control.notify(Enum_MsgType.XFFP_FLOP_SUCCESS, { id: t_id })
        }
    }

    //=========================================== API ==========================================
    public getRewardVoById(pId: number): VoXffpReward {
        return this._rewardVoMap[pId];
    }

    /**
     * 通过期数获取奖池物品列表
     * @param pQs 期数
     */
    public getRewardVoListByQs(pQs: number): VoXffpReward[] {
        return this._rewardVoListMap[pQs];
    }

    public get actVo(): Vo_Activity {
        let t_actVo = GGlobal.modelActivity.get(UIConst.ACTCOM, UIConst.XFFP);
        return t_actVo;
    }

    /** 剩余可翻牌次数 */
    public get remainFpCount(): number {
        let t_remain = 0;
        let t_max = this.curMaxFpCount;
        t_remain = t_max - this.fpCount;
        t_remain = t_remain < 0 ? 0 : t_remain;
        return t_remain;
    }

    /** 当前翻牌次数最大值 */
    public get curMaxFpCount(): number {
        let t_max = 0;
        let t_curPbVo = this.getRewardVoById(this.curPbId);
        if (t_curPbVo) {
            let t_lastVo = t_curPbVo.lastVo;
            if (t_lastVo) {
                t_max = t_lastVo.cfg.times;
            }
        }
        else {
            //满进度则取当前期数的最后一个数据的times
            let t_list = this.getRewardVoListByQs(this.curQs);
            t_max = t_list[t_list.length - 1].cfg.times;
        }
        return t_max;
    }

    /** 更新当前的进度id */
    public updateCurPbId() {
        let t_voList = this.getRewardVoListByQs(this.curQs);
        let t_curValue = this.curChargeValue;
        let t_curPbId = 0;
        if (t_voList) {
            for (let i = 0; i < t_voList.length; i++) {
                let t_vo = t_voList[i];
                if (t_curValue < t_vo.ybValue) {
                    t_curPbId = t_vo.id;
                    break;
                }
            }
        }
        this.curPbId = t_curPbId;
    }

    //===================================== private method =====================================
    private reddotCheck() {
        let t_remain = this.remainFpCount;
        let t_value = t_remain > 0;
        GGlobal.reddot.setCondition(UIConst.XFFP, 0, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    }
    //======================================== handler =========================================
}