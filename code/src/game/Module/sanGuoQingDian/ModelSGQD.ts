class ModelSGQD extends BaseModel {
    public static msg_datas_hldh = "msg_datas_hldh";//豪礼兑换
    public static msg_datas_hyyl = "msg_datas_hyyl";//活跃有礼
    public static msg_datas_jijin = "msg_datas_jijin";//基金
    public static msg_datas_xfph = "msg_datas_xfph";//消费排行
    public static msg_notice = "msg_notice";//红点
    public static msg_datas_zhuanpan = "msg_datas_zhuanpan";//转盘
    public static msg_rank_zhuanpan = "msg_rank_zhuanpan";//转盘排行榜
    public static msg_buy_zhuanpan = "msg_buy_zhuanpan";//转盘动画
    public static msg_buy_zhuanpan_fail = "msg_buy_zhuanpan_fail";//转盘动画
    /**单笔返利 */
    public static msg_datas_danbifanli = "msg_datas_danbifanli";
    /**累充返利 */
    public static msg_datas_leichongfanli = "msg_datas_leichongfanli";
    /**登陆有礼 */
    public static msg_datas_dengluyouli = "msg_datas_dengluyouli";

    public static shopArr: { cfg: Isgqdsc_261, buyNum: number }[] = [];

    public listenServ(wsm: WebSocketMgr) {
        super.listenServ(wsm);
        const self = this;
        wsm.regHand(4060, self.GC4060, self);
        wsm.regHand(4082, self.GC4082, self);
        wsm.regHand(4084, self.GC4084, self);
        wsm.regHand(4102, self.GC4102, self);
        wsm.regHand(4104, self.GC4104, self);
        wsm.regHand(4122, self.GCOpenUI4122, self);
        wsm.regHand(4124, self.GCBuy4124, self);
        wsm.regHand(4126, self.GCOpenRank4126, self);
        wsm.regHand(4128, self.GCOpenUI4128, self);
        wsm.regHand(4130, self.GCDrawReward4130, self);
        wsm.regHand(4910, self.getDanBiFanLiData, self);
        wsm.regHand(4912, self.getDBFLReward, self);
        wsm.regHand(4890, self.getDLYLData, self);
        wsm.regHand(4892, self.getDLYLReward, self);
        wsm.regHand(4930, self.getLCFLData, self);
        wsm.regHand(4932, self.getLCFLReward, self);

        wsm.regHand(8130, self.GC_OPEN_SGQD_SHOP, self);
        wsm.regHand(8132, self.GC_SGQD_SHOP_BUY, self);
    }

    /**8130	返回界面信息 [I:商品编号I:已购买数量]已购商品数据*/
    public GC_OPEN_SGQD_SHOP(self: ModelSGQD, data: BaseBytes) {
        ModelSGQD.shopArr = [];
        for (let i = 0, len = data.readShort(); i < len; i++) {
            let itemId = data.readInt();
            let buyNum = data.readInt();
            let cfg = Config.sgqdsc_261[itemId];
            ModelSGQD.shopArr.push({ cfg, buyNum });

        }
        ModelSGQD.shopArr.sort(self.shopSort);
        GGlobal.control.notify(UIConst.SGQD_SHOP);
    }

    public shopSort(a: { cfg: Isgqdsc_261, buyNum: number }, b: { cfg: Isgqdsc_261, buyNum: number }) {
        return a.cfg.id - b.cfg.id;
    }

    /**8131 购买商品 I:商品编号*/
    public CG_SGQD_BUYITEM(id) {
        let ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(8131, ba);
    }

    /**8132 购买结果返回 B:结果：0：失败，1：成功I:失败：(1:已达限购次数，2：元宝不足)，成功：商品编号I:已购数量 */
    public GC_SGQD_SHOP_BUY(self: ModelSGQD, data: BaseBytes) {
        let result = data.readByte();
        let itemId = data.readInt();
        let buyNum = data.readInt();
        if (result == 1) {
            ViewCommonWarn.text("购买成功");
            for (let i = 0; i < ModelSGQD.shopArr.length; i++) {
                if (ModelSGQD.shopArr[i].cfg.id == itemId) {
                    ModelSGQD.shopArr[i].buyNum = buyNum;
                    break;
                }
            }
            GGlobal.control.notify(UIConst.SGQD_SHOP);
        }
    }

    /**登陆有礼配表 */
    private _DLYLCfg;
    /**登陆有礼配表 */
    public get DengLuYouLiCfg() {
        if (!this._DLYLCfg) {
            let arr = [];
            let lib = Config.sgdlyj_261;
            for (let key in lib) {
                let temp = lib[key];
                let cfg = new VO_DeLuYouJiang();
                cfg.init(temp);
                arr[cfg.id] = cfg;
            }
            this._DLYLCfg = arr;
        }
        return this._DLYLCfg;
    }
    /**累充返利配表 */
    private _LCFLCfg;
    /**累充返利配表 */
    public get LeiChongFanLiCfg() {
        if (!this._LCFLCfg) {
            let arr = [];
            let lib = Config.sglcfl_261;
            for (let key in lib) {
                let temp = lib[key];
                let cfg = new VO_LeiChongFanLi();
                cfg.init(temp);
                arr[cfg.id] = cfg;
            }
            this._LCFLCfg = arr;
        }
        return this._LCFLCfg;
    }

    /**接收单笔返利的奖励数据 */
    private getDBFLReward(self: ModelSGQD, bytes: BaseBytes) {
        //领取奖励结果 B:结果：0：失败，1：成功I:失败：（1：没领取次数），成功：奖励项idB:可领取次数B:剩余次数
        let result = bytes.readByte();//领取结果
        let id = bytes.readInt();//id 
        let count = bytes.readByte();//可领取次数
        let lastNum = bytes.readByte();//剩余次数
        if (result == 0) {
            ViewCommonWarn.text("领取失败");
            return;
        }
        GGlobal.control.notify(Enum_MsgType.DANBIFANLIREWARD, { result: result, id: id, count: count, lastNum: lastNum });
    }
    /**接收登陆有礼的奖励数据 */
    private getDLYLReward(self: ModelSGQD, bytes: BaseBytes) {
        let result = bytes.readByte();
        let id = bytes.readInt();
        if (result == 0) {
            ViewCommonWarn.text("领取失败");
            return;
        }
        GGlobal.control.notify(Enum_MsgType.DENGLUYOULIREWARD, { result: result, id: id });
    }
    /**接收累充返利的奖励数据 */
    private getLCFLReward(self: ModelSGQD, bytes: BaseBytes) {
        let result = bytes.readByte();
        let id = bytes.readInt();
        if (result == 0) {
            ViewCommonWarn.text("领取失败");
            return
        }
        GGlobal.control.notify(Enum_MsgType.LEICHONGFANLIReward, { result: result, id: id });
    }
    /**单笔返利配表 */
    private _danbifanliCfg;
    /**单笔返利配表 */
    public get DanBiFanLiCfg() {
        if (!this._danbifanliCfg) {
            let arr = [];
            let lib = Config.sgdbfl_261;
            for (let key in lib) {
                let temp = lib[key];
                let cfg = new VO_DanBiFanLi();
                cfg.init(temp);
                arr[cfg.id] = cfg;
            }
            this._danbifanliCfg = arr;
        }
        return this._danbifanliCfg;
    }
    /**单笔返利的 id arr */
    // static DANBIFANLIARR : number[];

    /**单笔返利数据 */
    static DBFLData = [];
    /**登陆有礼数据 */
    static DLYLData = [];
    /**累充返利数据 */
    static LCFLData = [];
    /**接收单笔返利的服务器数据 */
    private getDanBiFanLiData(self: ModelSGQD, bytes: BaseBytes) {
        let length = bytes.readShort();
        let vo: VO_DanBiFanLi;
        let data = [];
        ModelSGQD.DBFLData = [];
        // ModelSGQD.DANBIFANLIARR = [];
        for (let i = 0; i < length; i++) {
            let id = bytes.readInt();
            let count = bytes.readByte();
            let lastNum = bytes.readByte();
            vo = self.DanBiFanLiCfg[id];
            vo.count = count;
            vo.lastNum = lastNum;
            data[i] = vo;
            //            ModelSGQD.DANBIFANLIARR[i] = id;
        }
        ModelSGQD.DBFLData = data;
        GGlobal.reddot.setCondition(UIConst.DANBIFANLI, 0, self.getNoti(UIConst.DANBIFANLI));
        GGlobal.control.notify(Enum_MsgType.DANBIFANLI, { data: data });
    }
    /**接收登陆有礼数据 */
    private getDLYLData(self: ModelSGQD, bytes: BaseBytes) {
        let loginDay = bytes.readByte();//登陆天数
        let vo: VO_DeLuYouJiang;
        let length = bytes.readShort();
        let data = [];
        for (let i = 0; i < length; ++i) {
            let day = bytes.readInt();
            let isGet = bytes.readByte();
            vo = self.DengLuYouLiCfg[day];
            vo.state = isGet;
            vo.loginDay = loginDay;
            data[i] = vo;
        }
        ModelSGQD.DLYLData = data;
        GGlobal.reddot.setCondition(UIConst.DENGLUSONGLI, 0, self.getNoti(UIConst.DENGLUSONGLI));
        GGlobal.control.notify(Enum_MsgType.DENGLUYOULI, { data: data });
    }
    /**接收累充返利数据*/
    private getLCFLData(self: ModelSGQD, bytes: BaseBytes) {
        let currentValue = bytes.readInt();    //当前充值金额
        let length = bytes.readShort();
        let vo: VO_LeiChongFanLi;
        let data = [];
        ModelSGQD.LCFLData = [];
        for (let i = 0; i < length; ++i) {
            let id = bytes.readInt();
            let state = bytes.readByte();
            vo = self.LeiChongFanLiCfg[id];
            vo.state = state;
            data[i] = vo;
        }
        ModelSGQD.LCFLData = data;
        GGlobal.reddot.setCondition(UIConst.LEICHONGFANLI, 0, self.getNoti(UIConst.LEICHONGFANLI));
        GGlobal.control.notify(Enum_MsgType.LEICHONGFANLI, { data: data, currentValue: currentValue });
    }

    public getAct(id: number) {
        for (let i = 0, len = this._datas.length; i < len; i++) {
            const data = this._datas[i];
            if (data.id == id) {
                return data;
            }
        }
        return this._datas[0];
    }
    private _datas: Vo_Activity[];
    private _sortDtas = [];
    private _regDay: number = -1;
    public getActs() {
        if (!this._datas || this._regDay != Model_GlobalMsg.kaifuDay) {
            this._regDay = Model_GlobalMsg.kaifuDay;
            this._datas = GGlobal.modelActivity.getGroup(UIConst.SANGUOQD);
            this._sortDtas = [];
            let arr = JSON.parse(Config.xtcs_004[5303].other)
            for (let i = 0; i < this._datas.length; ++i) {
                for (let j = 0; j < arr.length; ++j) {
                    if (this._datas[i].id == arr[j][1]) {
                        if (!this._sortDtas[arr[j][0]]) {
                            this._sortDtas[arr[j][0]] = this._datas[i];
                        }
                    }
                }
            }
            ArrayUitl.cleannull(this._sortDtas);
        }
        return this._sortDtas;
    }
    public canBeOpen(id: number, msg: boolean) {
        return ModuleManager.isOpen(id, msg);
    }
    public huoYueYouLi: number = 1;
    /**获取红点状态的 */
    public getNoti(data: Vo_Activity | number) {
        const id = typeof data == "number" ? data : data.id;
        switch (id) {
            case UIConst.XIAOFEIPH:
                return false;
            case UIConst.JiJin:
                return this.noticeJJ();
            case UIConst.HaoLiDuiHuan:
                return this.noticeAllHL();
            case UIConst.HUOYUEYOULI:
                return !!(this.huoYueYouLi);
            case UIConst.DENGLUSONGLI:
                return this.noticeDLYL();
            case UIConst.DANBIFANLI:
                return this.noticeDBFL();
            case UIConst.LEICHONGFANLI:
                return this.noticeLCFL();
        }
    }
    /**获取累充返利红点状态 */
    private noticeLCFL() {
        let temp = ModelSGQD.LCFLData;
        if (temp) {
            for (let i = 0; i < temp.length; ++i) {
                if (temp[i].state == 1) {
                    return true;
                }
            }
        }
        return false;
    }

    /**获取单笔返利红点状态 */
    private noticeDBFL() {
        let temp = ModelSGQD.DBFLData;
        if (temp) {
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].count > 0) {
                    return true;
                }
            }
        }
        return false;
    }
    /**获取登陆有礼红点状态 */
    private noticeDLYL() {
        let temp = ModelSGQD.DLYLData;
        if (temp) {
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].state == 1) {
                    return true;
                }
            }
        }
        return false;
    }

    public paiHangDatas: IXiaoFeiPH[] = [];
    /**打开界面 [U:名字,如果不满足消费门槛，则为空字符串I:消费数，如果不满足消费门槛，则为0]排行I:第一名职业时装（job*1000+时装id），没有则为0I:专属神兵I:我的排行，没有上榜则为0I:我的消费 */
    private GC4060(self: ModelSGQD, bytes: BaseBytes) {
        const len = bytes.readShort();
        var datas: IXiaoFeiPH[] = [];
        for (let i = 0; i < len; i++) {
            var data: any = {};
            data.name = bytes.readUTF();
            data.cost = bytes.readInt();
            datas.push(data);
        }
        // datas.sort((a, b) => -a.cost + b.cost);
        var mineInfo: any = {};
        if (datas[0]) {
            datas[0].modId = bytes.readInt();
            datas[0].godWeapon = bytes.readInt();
        } else {
            bytes.readInt();//清掉一个int
            bytes.readInt();
        }
        mineInfo.paiming = bytes.readInt();
        mineInfo.cost = bytes.readInt();
        if (datas[0]) {
            datas[0].horseId = bytes.readInt();
        } else {
            bytes.readInt();
        }
        self.paiHangDatas = datas;
        self.notify(ModelSGQD.msg_datas_xfph, mineInfo);
    }
    public jiJinInfo: IJiJin;
    /**打开基金 */
    public CG4081() { this.sendSocket(4081, this.getBytes()) }
    private GC4082(self: ModelSGQD, bytes: BaseBytes) {
        self.jiJinInfo = self.jiJinInfo || <any>{};
        self.jiJinInfo.state = bytes.readByte();
        self.jiJinInfo.loginDay = bytes.readByte();
        self.jiJinInfo.states = self.jiJinInfo.states || <any>{};
        for (let i = 0, len = bytes.readShort(); i < len; i++) {
            self.jiJinInfo.states[bytes.readShort()] = bytes.readByte();
        }
        self.notify(ModelSGQD.msg_datas_jijin);
        GGlobal.reddot.setCondition(UIConst.JiJin, 0, self.getNoti(UIConst.JiJin));
        self.notify(ModelSGQD.msg_notice);
    }
    /**基金领取 */
    public CG4083(id: number) {
        const bytes = this.getBytes();
        bytes.writeShort(id);
        this.sendSocket(4083, bytes);
    }
    private GC4084(self, bytes) {
        const state = bytes.readByte();
        if (state == 1) {
            self.CG4081();
        } else {
            //B:结果 1成功 2系统未开启 3活动未开启 4配置表不存在 5非本期奖励ID 6已领取 7登录天数不足 8背包已满 9本期活动结算中，请稍后再试
            ViewCommonWarn.text(["", "", "系统未开启", "活动未开启", "配置表不存在", "非本期奖励ID", "已领取", "登录天数不足", "背包已满", "本期活动结算中，请稍后再试"][state]);
            if (state == 8) {
                Model_RongLian.ALERT_ONEKEY();
            }
        }
    }
    public noticeJJ() {
        const states = this.jiJinInfo && this.jiJinInfo.states;
        for (let key in states) {
            if (states[key] == 1) {
                return true;
            }
        }
        return false;
    }

    private _HLdatas: Ihldh_741[];
    public getHLDatas() {
        const self = this;
        if (!self._HLdatas || self._HLdatas.length == 0) {
            self._HLdatas = [];
            const lib = Config.hldh_741;
            const act = GGlobal.modelActivity.get(UIConst.SANGUOQD, UIConst.HaoLiDuiHuan);
            if (act) {
                for (let key in lib) {
                    const cfg = lib[key];
                    if (cfg.qishu == act.qs) {
                        self._HLdatas.push(cfg);
                    }
                }
            }
        }
        return this._HLdatas;
    }
    public haoLiInfo: any = {};
    public haoLiHave: boolean = false;
    /**打开豪礼兑换 */
    public CG4101() { this.sendSocket(4101, this.getBytes()) }
    private GC4102(self: ModelSGQD, bytes: BaseBytes) {
        self._HLdatas = null;
        const len = bytes.readShort();
        for (let i = 0; i < len; i++) {
            self.haoLiInfo[bytes.readShort()] = bytes.readByte();
        }
        self.haoLiHave = true;
        self.notify(ModelSGQD.msg_datas_hldh);
        GGlobal.reddot.setCondition(UIConst.HaoLiDuiHuan, 0, self.getNoti(UIConst.HaoLiDuiHuan));
        GGlobal.modelSGQD.notify(ModelSGQD.msg_notice);
    }
    /**领取豪礼 */
    public CG4103(id: number) {
        const bytes = this.getBytes();
        bytes.writeShort(id);
        this.sendSocket(4103, bytes);
    }
    private GC4104(self, bytes) {
        const state = bytes.readByte();
        if (state == 1) {
            self.CG4101();
        } else {
            //1成功 2系统未开启 3活动未开启 4配置表不存在 5非本期奖励ID 6兑换次数已用完 7道具不足 8背包已满
            ViewCommonWarn.text(["", "", "系统未开启", "活动未开启", "配置表不存在", "非本期奖励", "兑换次数不足", "道具不足", "背包已满"][state]);
        }
    }
    public noticeHL(data: Ihldh_741) {
        const needs = JSON.parse(data.cailiao);
        let bool = true;
        for (let i = 0; i < needs.length; i++) {
            const arr = needs[i];
            var cnt = Model_Bag.getItemCount(arr[1]);
            if (cnt < arr[2]) {
                bool = false;
                break;
            }
        }
        if (needs.length == 0) {
            bool = false;
        }
        const rewards = JSON.parse(data.daoju);
        const xianZhi = data.cishu;
        const dhCnt = GGlobal.modelSGQD.haoLiInfo[data.id] == null ? 0 : GGlobal.modelSGQD.haoLiInfo[data.id];
        if (xianZhi > 0 && dhCnt >= xianZhi) {
            bool = false;
        }
        return bool;
    }
    public noticeAllHL() {
        const datas = this.getHLDatas();
        for (let i = 0; i < datas.length; i++) {
            const data = datas[i];
            const not = this.noticeHL(data);
            if (not) {
                return true;
            }
        }
        return false;
    }
    public noticeAll() {
        const acts = this.getActs();
        for (let i = 0; acts && i < acts.length; i++) {
            const act = acts[i];
            const not = this.getNoti(act.id);
            if (not == true) {
                return true;
            }
        }
        return false;
    }


    //三国转盘
    public static zpQs: number = 0;//期数
    public static zpLogArr: any[];
    public static skipTween: boolean = false;
    public static zpRankArr: any[] = [];
    public static zpBuyArr: any[] = [];
    public static zpRankMy: number = 0;
    public static zpCtMy: number = 0;
    public static zpRewardArr: Vo_ZhuanPanTarget[] = [];
    /**4129 领取目标奖励 I:要领取的奖励id    */
    public CGDrawReward4129(rewardId: number) {
        const bytes = this.getBytes();
        bytes.writeInt(rewardId);
        this.sendSocket(4129, bytes);
    }

    /**4127 打开目标奖励界面   */
    public CGOpenUI4127() {
        const bytes = this.getBytes();
        this.sendSocket(4127, bytes);
    }
    /**打开UI */
    public CGOpenUI4121() {
        const bytes = this.getBytes();
        this.sendSocket(4121, bytes);
    }
    /**抽奖 B:次数 1单抽 2十连抽 */
    public CGBuy4123(type) {
        const bytes = this.getBytes();
        bytes.writeByte(type);
        this.sendSocket(4123, bytes);
    }
    /**打开排行榜 */
    public CGOpenRank4125() {
        const bytes = this.getBytes();
        this.sendSocket(4125, bytes);
    }
    /**发送领取单笔返利奖励 */
    public CGGet4911(type) {
        let bytes = this.getBytes();
        bytes.writeInt(type);
        this.sendSocket(4911, bytes);
    }
    /**发送领取登陆有礼奖励 */
    public CGGET4891(type) {
        let bytes = this.getBytes();
        bytes.writeInt(type);
        this.sendSocket(4891, bytes);
    }
    /**发送领取累充返利的奖励 */
    public CGGET4931(type) {
        let bytes = this.getBytes();
        bytes.writeInt(type);
        this.sendSocket(4931, bytes);
    }

    /**4130 领取目标奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励id  */
    public GCDrawReward4130(self: ModelSGQD, bytes: BaseBytes) {
        let result = bytes.readByte();
        let cfgID = bytes.readInt();
        if (result == 1) {
            ViewCommonWarn.text("领取成功");
            for (let i = 0; i < ModelSGQD.zpRewardArr.length; i++) {
                if (ModelSGQD.zpRewardArr[i].cfg.id == cfgID) {
                    ModelSGQD.zpRewardArr[i].state = 2;
                    break;
                }
            }
            GGlobal.control.notify(UIConst.SG_ZHUANPAN_TARGET_REWARD);
        }
    }

    /**4128 打开目标奖励界面 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表 I:我的抽奖次数 */
    public GCOpenUI4128(self: ModelSGQD, bytes: BaseBytes) {
        let len = bytes.readShort();
        ModelSGQD.zpRewardArr = [];
        for (let i = 0; i < len; i++) {
            let cfgId = bytes.readInt();
            let state = bytes.readByte();
            let vo = Vo_ZhuanPanTarget.create(cfgId);
            vo.state = state;
            ModelSGQD.zpRewardArr.push(vo);
        }
        ModelSGQD.zpCtMy = bytes.readInt();
        GGlobal.control.notify(UIConst.SG_ZHUANPAN_TARGET_REWARD);
    }

    public sortReward(a: Vo_ZhuanPanTarget, b: Vo_ZhuanPanTarget) {
        if (a.state == b.state) {
            return a.cfg.id - b.cfg.id;
        } else {
            if (a.state == 1) {
                return -1;
            } else if (b.state == 1) {
                return 1;
            } else {
                return a.state - b.state;
            }
        }
    }

    /**打开UI [U:玩家IDI:道具IDI:道具数量]历史记录所有数据*/
    private GCOpenUI4122(self: ModelSGQD, bytes: BaseBytes) {
        let len = bytes.readShort();
        ModelSGQD.zpLogArr = []
        for (let i = 0; i < len; i++) {
            let n = bytes.readUTF();
            let i = bytes.readInt();
            let c = bytes.readInt();
            let v = { na: n, id: i, ct: c }
            ModelSGQD.zpLogArr.push(v);
        }
        self.notify(ModelSGQD.msg_datas_zhuanpan);
    }

    /**抽奖 B:结果 1成功 2系统未开启 3活动未开启 4传入类型不对 5本期奖励没配 6元宝不足[B:道具类型I:道具IDI:道具数量B:是否大奖 读表]抽奖结果*/
    private GCBuy4124(self: ModelSGQD, bytes: BaseBytes) {
        let res = bytes.readByte();
        if (res == 1) {
            let len = bytes.readShort();
            var dropArr = [];
            for (let i = 0; i < len; i++) {
                let v = ConfigHelp.parseItemBa(bytes)
                let big = bytes.readByte()
                dropArr.push({ item: v, isBig: big });
            }
            ModelSGQD.zpBuyArr = dropArr
            let t = ModelSGQD.skipTween ? 0 : 1200;
            setTimeout(function () {
                GGlobal.layerMgr.open(UIConst.SG_ZHUANPAN_SHOW, dropArr);
                let arrGet = [];
                for (let i = 0; i < dropArr.length; i++) {
                    let it = dropArr[i].item
                    if (it.gType == Enum_Attr.ITEM && it.quality > 5) {
                        arrGet.push(it)
                    }
                }
                if (arrGet) {
                    ViewCommonPrompt.textItemList(arrGet);
                }
            }, t);
            self.notify(ModelSGQD.msg_buy_zhuanpan);
        } else {
            ViewCommonWarn.text(["", "", "系统未开启", "活动未开启", "传入类型不对", "本期奖励没配", "元宝不足", "活动已结束"][res]);
            self.notify(ModelSGQD.msg_buy_zhuanpan_fail);
        }
    }

    /**打开排行榜 B:结果 1成功[S:排名U:玩家名I:抽奖次数]排行榜数据S:我的排名 0未进排行榜 I:我的抽奖次数*/
    private GCOpenRank4126(self: ModelSGQD, bytes: BaseBytes) {
        let res = bytes.readByte();
        if (res == 1) {
            let len = bytes.readShort();
            ModelSGQD.zpRankArr = [];
            for (let i = 0; i < len; i++) {
                let rk = bytes.readShort();
                let n = bytes.readUTF();
                let c = bytes.readInt();
                ModelSGQD.zpRankArr.push({ rk: rk, na: n, ct: c });
            }
            ModelSGQD.zpRankMy = bytes.readShort();
            ModelSGQD.zpCtMy = bytes.readInt();
            self.notify(ModelSGQD.msg_rank_zhuanpan);
        }
    }

    private static _rankCfg: any
    public static getRankCfg(qs, rank) {
        if (ModelSGQD._rankCfg == null) {
            ModelSGQD._rankCfg = {};
            for (let keys in Config.sghlzprank_261) {
                let v = Config.sghlzprank_261[keys];
                if (ModelSGQD._rankCfg[v.qs] == null) {
                    ModelSGQD._rankCfg[v.qs] = {};
                }
                let rankArr = ConfigHelp.SplitStr(v.rank);
                for (let i = Number(rankArr[0][0]); i <= Number(rankArr[0][1]); i++) {
                    ModelSGQD._rankCfg[v.qs][i] = v;
                }
            }
        }
        return ModelSGQD._rankCfg[qs][rank];
    }
}
/**排行榜 */
interface IXiaoFeiPH {
    name: string;
    cost: number;
    modId: number;
    godWeapon: number;
    horseId: number;
}
/**基金 */
interface IJiJin {
    state: number;//购买状态0 未 1已
    loginDay: number;//已登录天数
    states: { [sysId: number]: number };//0不可领 1可领取 2已领取
}