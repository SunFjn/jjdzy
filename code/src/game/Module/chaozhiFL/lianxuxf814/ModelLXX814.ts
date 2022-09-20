class ModelLXX814 extends BaseModel {

    public static readonly msg_datas = "msg_datas";

    /**领取奖励 */
    public applayAwards(day: number) {
        const bytes = this.getBytes();
        bytes.writeByte(day);
        this.sendSocket(4831, bytes);
    }

    /**领取大奖 */
    public applyBigAwards() {
        this.sendSocket(4833, this.getBytes());
    }

    public listenServ(wsm: WebSocketMgr) {
        super.listenServ(wsm);
        wsm.regHand(4830, this.GC4830, this);
        wsm.regHand(4832, this.servAwards4832, this);
        wsm.regHand(4834, this.servBigAwards4834, this);
    }
    public datas: { [day: number]: { day: number, costYB: number, state: number } } = {};
    public bigGiftGotSt: number = 0;//0默认值 1已领取
    public smlGiftGotSt: number = 0;//第3天大礼物领取 0默认值 1已领取
    public day: number = 0;//活动天数
    public static DAY_SEVEN = 7;
    public static DAY_THREE = 3;
    /**UI数据 返回界面信息 [B:天数I:消耗元宝数B:奖励 0默认值 1已领取 2补领]所有数据B:第七天大礼物领取 0默认值 1已领取B:第3天大礼物领取 0默认值 1已领取I:当前活动天数*/
    private GC4830(self: ModelLXX814, bytes: BaseBytes) {
        let len = bytes.readShort()
        self.datas = {};
        for (let i = 0; i < len; i++) {
            var day = bytes.readByte();
            self.datas[i] = { day: day, costYB: bytes.readInt(), state: bytes.readByte() };//B:奖励 0默认值 1已领取
        }
        self.bigGiftGotSt = bytes.readByte();
        self.smlGiftGotSt = bytes.readByte();//B:第3天大礼物领取 0默认值 1已领取
        self.day = bytes.readInt();
        GGlobal.reddot.setCondition(UIConst.LXXF3, 0, self.checkNotice());
        self.notify(ModelLXX814.msg_datas);
        GGlobal.reddot.notify(UIConst.CHAOZHIFL);
    }

    /**数据返回 */
    private servAwards4832(self: ModelLXX814, bytes: BaseBytes) {
        //B:结果 1成功 2异常 3开服天数不足 4配置表不存在 5该奖励已领取 6元宝不足 7背包已满 8元宝消耗不足
        //1成功 3系统未开启 4配置表不存在 5该奖励已领取 6元宝不足 7背包已满 8元宝消耗不足 9传入ID非本期ID 10活动未开启
        const state = bytes.readByte();
        if (state == 1) {
            const day = bytes.readByte();
            for (let key in self.datas) {
                if (day == self.datas[key].day) {
                    self.datas[key].state = 1;
                    break;
                }
            }
            GGlobal.reddot.setCondition(UIConst.LXXF3, 0, self.checkNotice());
            self.notify(ModelLXX814.msg_datas);
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

    /**大奖返回 */
    private servBigAwards4834(self: ModelLXX814, bytes: BaseBytes) {
        //B:结果 1成功 2异常 3在7天后不能领取 4未满足7天连续充值条件 5背包已满
        const state = bytes.readByte();
        switch (state) {
            case 1:
                if (self.smlGiftGotSt == 0) {
                    self.smlGiftGotSt = 1;
                } else {
                    self.bigGiftGotSt = 1;
                }
                GGlobal.reddot.setCondition(UIConst.LXXF3, 0, self.checkNotice());
                self.notify(ModelLXX814.msg_datas);
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
        var counter = 0;
        for (let key in datas) {
            const data = datas[key];
            const needYB = Config.lxxf3_737[data.day].xiaohao;
            if (data.costYB >= needYB || data.state == 1) {
                counter++;
            }
        }
        return counter;
    }
    public checkNotice() {
        const self = this;
        const dayFini = self.dayFinished();
        var ret = dayFini >= ModelLXX814.DAY_THREE && self.smlGiftGotSt == 0;
        if (!ret) {
            ret = dayFini >= ModelLXX814.DAY_SEVEN && self.bigGiftGotSt == 0;
        }
        if (!ret) {
            for (let key in self.datas) {
                const day = Number(key) + 1;
                const data = self.datas[key];
                const cfg = Config.lxxf3_737[data.day];
                const needYB = cfg.xiaohao;
                const kaifuDay = self.day;
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
}