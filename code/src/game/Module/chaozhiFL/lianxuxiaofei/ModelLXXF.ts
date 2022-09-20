class ModelLXXF extends BaseModel {
    public static readonly msg_datas = "msg_datas";
    public listenServ(wsm: WebSocketMgr) {
        super.listenServ(wsm);
        wsm.regHand(3052, this.GC3052, this);
        wsm.regHand(3072, this.GC3072, this);
        wsm.regHand(3054, this.servAwards, this);
        wsm.regHand(3074, this.servAwards, this);
        wsm.regHand(3056, this.servBigAwards, this);
        wsm.regHand(3076, this.servBigAwards, this);
    }
    /**获取UI数据 */
    public openUI() {
        const bool = TimeUitl.isIn7Days();
        if (bool) {
            this.sendSocket(3051, this.getBytes());
        } else {
            this.sendSocket(3071, this.getBytes());
        }
    }
    public datas: { [day: number]: { day: number, costYB: number, state: number } } = {};
    public bigGiftGotSt: number = 0;//0默认值 1已领取
    public smlGiftGotSt: number = 0;//第3天大礼物领取 0默认值 1已领取
    public qishu: number = 0;//期数
    public readonly DAY_SEVEN = 7;
    public readonly DAY_THREE = 3;
    /**UI数据 */
    private GC3052(self: ModelLXXF, bytes: BaseBytes) {
        for (let i = 0, len = bytes.readShort(); i < len; i++) {
            var day = bytes.readByte();
            self.datas[day] = { day: day, costYB: bytes.readInt(), state: bytes.readByte() };//B:奖励 0默认值 1已领取
        }
        self.bigGiftGotSt = bytes.readByte();
        self.smlGiftGotSt = bytes.readByte();//B:第3天大礼物领取 0默认值 1已领取
        GGlobal.reddot.setCondition(TimeUitl.isIn7Days() ? UIConst.LXXF1 : UIConst.LXXF2, 0, self.checkNotice());
        self.notify(ModelLXXF.msg_datas);
        GGlobal.reddot.notify(UIConst.CHAOZHIFL);
    }
    /**UI数据 */
    private GC3072(self: ModelLXXF, bytes: BaseBytes) {
        self.qishu = bytes.readInt();
        for (let i = 0, len = bytes.readShort(); i < len; i++) {
            var cfgId = bytes.readShort();
            var key = cfgId % self.DAY_SEVEN == 0 ? 7 : cfgId % self.DAY_SEVEN >> 0;
            self.datas[key] = { day: cfgId, costYB: bytes.readInt(), state: bytes.readByte() };//B:奖励 0默认值 1已领取
        }
        self.bigGiftGotSt = bytes.readByte();
        self.smlGiftGotSt = bytes.readByte();//B:第3天大礼物领取 0默认值 1已领取
        GGlobal.reddot.setCondition(TimeUitl.isIn7Days() ? UIConst.LXXF1 : UIConst.LXXF2, 0, self.checkNotice());
        self.notify(ModelLXXF.msg_datas);
        GGlobal.reddot.notify(UIConst.CHAOZHIFL);
    }
    /**领取奖励 */
    public applayAwards(day: number) {
        const bytes = this.getBytes();
        const bool = TimeUitl.isIn7Days();
        if (bool) {
            bytes.writeByte(day);
            this.sendSocket(3053, bytes);
        } else {
            bytes.writeShort(day);
            this.sendSocket(3073, bytes);
        }
    }
    /**数据返回 */
    private servAwards(self: ModelLXXF, bytes: BaseBytes) {
        //B:结果 1成功 2异常 3开服天数不足 4配置表不存在 5该奖励已领取 6元宝不足 7背包已满 8元宝消耗不足
        //1成功 3系统未开启 4配置表不存在 5该奖励已领取 6元宝不足 7背包已满 8元宝消耗不足 9传入ID非本期ID 10活动未开启
        const state = bytes.readByte();
        if (state == 1) {
            const cfgId = bytes.bytesAvailable == 2 ? bytes.readShort() : bytes.readByte();
            const key = cfgId % self.DAY_SEVEN == 0 ? self.DAY_SEVEN : cfgId % self.DAY_SEVEN >> 0;
            const info = self.datas[key];
            info.state = 1;
            GGlobal.reddot.setCondition(TimeUitl.isIn7Days() ? UIConst.LXXF1 : UIConst.LXXF2, 0, self.checkNotice());
            self.notify(ModelLXXF.msg_datas);
            GGlobal.reddot.notify(UIConst.CHAOZHIFL);
        } else {
            switch (state) {
                case 2:
                    ViewCommonWarn.text("数据异常");
                    break;
                case 3:
                    ViewCommonWarn.text("开服天数不足");
                    break;
                case 4:
                    ViewCommonWarn.text("配置表查询不到该奖励ID");
                    break;
                case 5:
                    ViewCommonWarn.text("奖励已领取");
                    break;
                case 6:
                    ModelChongZhi.guideToRecharge();
                    break;
                case 7:
                    ViewCommonWarn.text("背包已满");
                    break;
                case 8:
                    ViewCommonWarn.text("元宝消耗不足");
                    break;
                case 9:
                    ViewCommonWarn.text("传入ID非本期ID");
                    break;
                case 10:
                    ViewCommonWarn.text("活动未开启");
                    break;
            }
        }
    }
    /**领取大奖 */
    public applyBigAwards() {
        const bool = TimeUitl.isIn7Days();
        if (bool) {
            this.sendSocket(3055, this.getBytes());
        } else {
            this.sendSocket(3075, this.getBytes());
        }
    }
    /**大奖返回 */
    private servBigAwards(self: ModelLXXF, bytes: BaseBytes) {
        //B:结果 1成功 2异常 3在7天后不能领取 4未满足7天连续充值条件 5背包已满
        const state = bytes.readByte();
        switch (state) {
            case 1:
                if(self.smlGiftGotSt == 0){
                    self.smlGiftGotSt = 1;
                }else{
                    self.bigGiftGotSt = 1;
                }
                GGlobal.reddot.setCondition(TimeUitl.isIn7Days() ? UIConst.LXXF1 : UIConst.LXXF2, 0, self.checkNotice());
                self.notify(ModelLXXF.msg_datas);
                GGlobal.reddot.notify(UIConst.CHAOZHIFL);
                break;
            case 2:
                ViewCommonWarn.text("数据异常");
                break;
            case 3:
                ViewCommonWarn.text("7天后不能领取该奖励了");
                break;
            case 4:
                ViewCommonWarn.text("未能满足连续消费条件");
                break;
            case 5:
                Model_RongLian.ALERT_ONEKEY();
                break;
            case 6:
                ViewCommonWarn.text("没配这期奖励");
                break;
            case 7:
                ViewCommonWarn.text("活动未开启");
                break;  
            case 8:
                ViewCommonWarn.text("未满足3天连续消费条件");
                break;    
            case 9:
                ViewCommonWarn.text("奖励已领完");
                break;      
        }
    }
    public dayFinished() {
        const {datas} = this;
        const bool = TimeUitl.isIn7Days();
        var counter = 0;
        for (let key in datas) {
            const data = datas[key];
            const needYB = bool ? Config.lxxf1_737[key].xiaohao : Config.lxxf2_737[data.day].xiaohao;
            if (data.costYB >= needYB || data.state == 1) {
                counter++;
            }
        }
        return counter;
    }
    public checkNotice() {
        const self = this;
        const dayFini = self.dayFinished();
        const bool = TimeUitl.isIn7Days();
        var ret = dayFini >= self.DAY_THREE && self.smlGiftGotSt == 0;
        if(!ret){
            ret = dayFini >= self.DAY_SEVEN && self.bigGiftGotSt == 0;
        }
        if (!ret) {
            for (let key in self.datas) {
                const day = Number(key);
                const data = self.datas[key];
                const cfg = bool ? Config.lxxf1_737[key] : Config.lxxf2_737[data.day];
                const needYB = cfg.xiaohao;
                const kaifuDay = self.kaifuDay;
                const award = ConfigHelp.makeItemListArr(JSON.parse(cfg.buling))[0];
                ret = (data.costYB >= needYB && data.state == 0) || (!self.invalidNotMap[day] && kaifuDay > day && data.state == 0 && award.count <= Model_player.voMine.yuanbao);
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    /**补领是否显示红点 */
    public invalidNotMap: any = {};
    public setBLNot(day: number, value: boolean) {
        this.invalidNotMap[day] = value;
    }
    public get kaifuDay() {
        const bool = TimeUitl.isIn7Days();
        if (bool) {
            return Model_GlobalMsg.kaifuDay;
        } else {
            const act = GGlobal.modelActivity.get(UIConst.CHAOZHIFL, UIConst.LXXF2, GGlobal.modelLXXF.qishu);
            if (act) {
                const diffMs = Model_GlobalMsg.getServerTime() - act.start * 1000;
                const day = (diffMs / 86400000 >> 0) + 1;
                return day;
            } else {
                return 1;
            }
        }
    }
}