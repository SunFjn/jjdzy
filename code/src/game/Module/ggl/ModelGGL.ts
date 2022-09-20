/**
 * 刮刮乐模块管理
 * @author: lujiahao 
 * @date: 2020-02-17 12:03:40 
 */
class ModelGGL extends BaseModel {
    constructor() {
        super();
    }

    private _voMap: { [id: number]: VoGGLCfg } = {};
    private _keyVoMap: { [key: string]: VoGGLCfg };

    /** 已抽奖的奖励列表 */
    public rewardList: VoGGLTemp[] = [];
    public rewardVo: VoGGLTemp;
    /** 剩余免费次数 */
    public freeCount = 0;
    /** 每日免费次数 */
    public maxFree = 3;

    private _setupFlag = false;
    public setup() {
        if (this._setupFlag)
            return;
        this._setupFlag = true;

        let t = this;

        {
            let t_cfg = Config.ggl_336;
            for (let k in t_cfg) {
                let t_vo = new VoGGLCfg();
                t_vo.id = ~~k;
                t._voMap[t_vo.id] = t_vo;
            }
        }
    }

    //========================================= 协议相关 ========================================
    public listenServ(mgr: WebSocketMgr) {
        super.listenServ(mgr);
        //注册GC方法
        mgr.regHand(11790, this.GC_ScratchTicket_openUI_11790, this);
        mgr.regHand(11792, this.GC_ScratchTicket_draw_11792, this);
        mgr.regHand(11794, this.GC_ScratchTicket_getReward_11794, this);
    }

    /**11790 B-[B-B-I-I]-B-I-I 返回界面信息 B:免费次数freeNum[B:位置序号B:道具类型I:道具idI:道具数量]刮卡奖励内容rewardDataB:获得奖励的道具类型typeI:获得奖励的道具idtoolIdI:获得奖励的道具数量num*/
    public GC_ScratchTicket_openUI_11790(self: ModelGGL, data: BaseBytes): void {
        let t_change = false;
        let t_remove = false;
        let t = self;
        let arg1 = data.readByte();
        if (t.freeCount != arg1) {
            t.freeCount = arg1;
            t_change = true;
        }
        let len = data.readShort();
        if (len == 0 && t.rewardList.length > 0) {
            t_change = true;
            t_remove = true;
        }
        for (let i = 0; i < len; i++) {
            let arg2 = data.readByte(); //位置序号 从1开始
            let arg3 = data.readByte(); //道具类型
            let arg4 = data.readInt(); //道具id
            let arg5 = data.readInt(); //道具数量

            let t_vo = t.rewardList[i];
            if (!t_vo) {
                t.rewardList[i] = t_vo = new VoGGLTemp();
            }
            if (t_vo.update({ indexId: arg2, itemType: arg3, itemId: arg4, count: arg5 })) {
                t_change = true;
            }
        }
        //抽中的物品信息
        let arg6 = data.readByte(); //抽中的物品类型
        let arg7 = data.readInt(); //抽中的物品id
        let arg8 = data.readInt(); //抽中的物品数量

        for (let v of t.rewardList) {
            if (v.itemType == arg6 && v.itemId == arg7 && v.count == arg8) {
                v.isReward = true;
                t.rewardVo = v;
            }
            else {
                v.isReward = false;
            }
        }

        t.reddotCheck();

        if (t_change) {
            if (t_remove) {
                t.clearRewardList();
            }
            else {
                GGlobal.control.notify(Enum_MsgType.GGL_UPDATE);
            }
        }

    }

    /**11791  购买刮卡抽奖 */
    public CG_ScratchTicket_draw_11791(): void {
        let t = this;
        if (t.freeCount <= 0) {
            if (!FastAPI.checkItemEnough(EnumGGL.CONSUME_ID, 1, true))
                return;
        }
        var bates = this.getBytes();
        this.sendSocket(11791, bates);
    }

    /**11792 B-B 抽奖操作结果 B:结果：0：失败，1：成功rtnCodeB:失败：（1:道具不足）type*/
    public GC_ScratchTicket_draw_11792(self: ModelGGL, data: BaseBytes): void {
        let arg1 = data.readByte();
        let arg2 = data.readByte();
        switch (arg1) {
            case 0: //失败
                ViewCommonWarn.text("抽奖失败");
                break;
            case 1: //成功
                break;
        }
    }

    /**11793  刮开刮刮卡领奖 */
    public CG_ScratchTicket_getReward_11793(): void {
        var bates = this.getBytes();
        this.sendSocket(11793, bates);
    }

    /**11794 B 领取奖励结果 B:结果：0：失败，1：成功rtnCode*/
    public GC_ScratchTicket_getReward_11794(self: ModelGGL, data: BaseBytes): void {
        let t = self;
        let arg1 = data.readByte();
        switch (arg1) {
            case 0: //失败
                ViewCommonWarn.text("领取奖励失败");
                break;
            case 1: //成功
                // t.clearRewardList();
                break;
        }
    }

    //=========================================== API ==========================================
    /** 获取当前活动期数 */
    public getCurQs(): number {
        let t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_GGL);
        if (t_actVo)
            return t_actVo.qs;
        else
            return 1;
    }

    /** 清空抽奖列表 */
    public clearRewardList() {
        let t = this;
        if (t.rewardList.length == 0)
            return;
        t.rewardList.length = 0;
        // t.rewardVo = null;
        GGlobal.control.notify(Enum_MsgType.GGL_UPDATE);
    }

    private _voListMap: { [qs: number]: VoGGLCfg[] } = {};
    /**
     * 获取奖励展示列表
     */
    public getVoList(): VoGGLCfg[] {
        let t = this;
        let t_qs = t.getCurQs();
        let t_list = t._voListMap[t_qs];
        if (t_list === undefined) {
            t._voListMap[t_qs] = t_list = [];
            for (let k in t._voMap) {
                let t_vo = t._voMap[k];
                if (t_vo && t_vo.cfg.qs == t_qs) {
                    t_list.push(t_vo);
                }
            }
        }
        return t_list;
    }

    /**
     * 通过key获取配置vo
     * @param pKey 物品id_物品数量
     */
    public getVoCfgByKey(pKey: string): VoGGLCfg {
        let t = this;
        if (!t._keyVoMap) {
            t._keyVoMap = {};
            for (let k in t._voMap) {
                let t_vo = t._voMap[k];
                let t_key = StringUtil.combinKey([t_vo.itemVo.id, t_vo.itemVo.count]);
                t._keyVoMap[t_key] = t_vo;
            }
        }
        return t._keyVoMap[pKey];
    }
    //===================================== private method =====================================
    private reddotCheck() {
        let t = this;
        let t_value = false
        if (t.freeCount > 0) {
            t_value = true;
        }
        else {
            if (FastAPI.checkItemEnough(EnumGGL.CONSUME_ID, 1))
                t_value = true;
            else
                t_value = false;
        }
        GGlobal.reddot.setCondition(UIConst.ACTCOM_GGL, 0, t_value);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    }
    //======================================== handler =========================================
}
