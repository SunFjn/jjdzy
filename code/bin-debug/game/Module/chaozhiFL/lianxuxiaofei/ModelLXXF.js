var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ModelLXXF = (function (_super) {
    __extends(ModelLXXF, _super);
    function ModelLXXF() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.datas = {};
        _this.bigGiftGotSt = 0; //0默认值 1已领取
        _this.smlGiftGotSt = 0; //第3天大礼物领取 0默认值 1已领取
        _this.qishu = 0; //期数
        _this.DAY_SEVEN = 7;
        _this.DAY_THREE = 3;
        /**补领是否显示红点 */
        _this.invalidNotMap = {};
        return _this;
    }
    ModelLXXF.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        wsm.regHand(3052, this.GC3052, this);
        wsm.regHand(3072, this.GC3072, this);
        wsm.regHand(3054, this.servAwards, this);
        wsm.regHand(3074, this.servAwards, this);
        wsm.regHand(3056, this.servBigAwards, this);
        wsm.regHand(3076, this.servBigAwards, this);
    };
    /**获取UI数据 */
    ModelLXXF.prototype.openUI = function () {
        var bool = TimeUitl.isIn7Days();
        if (bool) {
            this.sendSocket(3051, this.getBytes());
        }
        else {
            this.sendSocket(3071, this.getBytes());
        }
    };
    /**UI数据 */
    ModelLXXF.prototype.GC3052 = function (self, bytes) {
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            var day = bytes.readByte();
            self.datas[day] = { day: day, costYB: bytes.readInt(), state: bytes.readByte() }; //B:奖励 0默认值 1已领取
        }
        self.bigGiftGotSt = bytes.readByte();
        self.smlGiftGotSt = bytes.readByte(); //B:第3天大礼物领取 0默认值 1已领取
        GGlobal.reddot.setCondition(TimeUitl.isIn7Days() ? UIConst.LXXF1 : UIConst.LXXF2, 0, self.checkNotice());
        self.notify(ModelLXXF.msg_datas);
        GGlobal.reddot.notify(UIConst.CHAOZHIFL);
    };
    /**UI数据 */
    ModelLXXF.prototype.GC3072 = function (self, bytes) {
        self.qishu = bytes.readInt();
        for (var i = 0, len = bytes.readShort(); i < len; i++) {
            var cfgId = bytes.readShort();
            var key = cfgId % self.DAY_SEVEN == 0 ? 7 : cfgId % self.DAY_SEVEN >> 0;
            self.datas[key] = { day: cfgId, costYB: bytes.readInt(), state: bytes.readByte() }; //B:奖励 0默认值 1已领取
        }
        self.bigGiftGotSt = bytes.readByte();
        self.smlGiftGotSt = bytes.readByte(); //B:第3天大礼物领取 0默认值 1已领取
        GGlobal.reddot.setCondition(TimeUitl.isIn7Days() ? UIConst.LXXF1 : UIConst.LXXF2, 0, self.checkNotice());
        self.notify(ModelLXXF.msg_datas);
        GGlobal.reddot.notify(UIConst.CHAOZHIFL);
    };
    /**领取奖励 */
    ModelLXXF.prototype.applayAwards = function (day) {
        var bytes = this.getBytes();
        var bool = TimeUitl.isIn7Days();
        if (bool) {
            bytes.writeByte(day);
            this.sendSocket(3053, bytes);
        }
        else {
            bytes.writeShort(day);
            this.sendSocket(3073, bytes);
        }
    };
    /**数据返回 */
    ModelLXXF.prototype.servAwards = function (self, bytes) {
        //B:结果 1成功 2异常 3开服天数不足 4配置表不存在 5该奖励已领取 6元宝不足 7背包已满 8元宝消耗不足
        //1成功 3系统未开启 4配置表不存在 5该奖励已领取 6元宝不足 7背包已满 8元宝消耗不足 9传入ID非本期ID 10活动未开启
        var state = bytes.readByte();
        if (state == 1) {
            var cfgId = bytes.bytesAvailable == 2 ? bytes.readShort() : bytes.readByte();
            var key = cfgId % self.DAY_SEVEN == 0 ? self.DAY_SEVEN : cfgId % self.DAY_SEVEN >> 0;
            var info = self.datas[key];
            info.state = 1;
            GGlobal.reddot.setCondition(TimeUitl.isIn7Days() ? UIConst.LXXF1 : UIConst.LXXF2, 0, self.checkNotice());
            self.notify(ModelLXXF.msg_datas);
            GGlobal.reddot.notify(UIConst.CHAOZHIFL);
        }
        else {
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
    };
    /**领取大奖 */
    ModelLXXF.prototype.applyBigAwards = function () {
        var bool = TimeUitl.isIn7Days();
        if (bool) {
            this.sendSocket(3055, this.getBytes());
        }
        else {
            this.sendSocket(3075, this.getBytes());
        }
    };
    /**大奖返回 */
    ModelLXXF.prototype.servBigAwards = function (self, bytes) {
        //B:结果 1成功 2异常 3在7天后不能领取 4未满足7天连续充值条件 5背包已满
        var state = bytes.readByte();
        switch (state) {
            case 1:
                if (self.smlGiftGotSt == 0) {
                    self.smlGiftGotSt = 1;
                }
                else {
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
    };
    ModelLXXF.prototype.dayFinished = function () {
        var datas = this.datas;
        var bool = TimeUitl.isIn7Days();
        var counter = 0;
        for (var key in datas) {
            var data = datas[key];
            var needYB = bool ? Config.lxxf1_737[key].xiaohao : Config.lxxf2_737[data.day].xiaohao;
            if (data.costYB >= needYB || data.state == 1) {
                counter++;
            }
        }
        return counter;
    };
    ModelLXXF.prototype.checkNotice = function () {
        var self = this;
        var dayFini = self.dayFinished();
        var bool = TimeUitl.isIn7Days();
        var ret = dayFini >= self.DAY_THREE && self.smlGiftGotSt == 0;
        if (!ret) {
            ret = dayFini >= self.DAY_SEVEN && self.bigGiftGotSt == 0;
        }
        if (!ret) {
            for (var key in self.datas) {
                var day = Number(key);
                var data = self.datas[key];
                var cfg = bool ? Config.lxxf1_737[key] : Config.lxxf2_737[data.day];
                var needYB = cfg.xiaohao;
                var kaifuDay = self.kaifuDay;
                var award = ConfigHelp.makeItemListArr(JSON.parse(cfg.buling))[0];
                ret = (data.costYB >= needYB && data.state == 0) || (!self.invalidNotMap[day] && kaifuDay > day && data.state == 0 && award.count <= Model_player.voMine.yuanbao);
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    };
    ModelLXXF.prototype.setBLNot = function (day, value) {
        this.invalidNotMap[day] = value;
    };
    Object.defineProperty(ModelLXXF.prototype, "kaifuDay", {
        get: function () {
            var bool = TimeUitl.isIn7Days();
            if (bool) {
                return Model_GlobalMsg.kaifuDay;
            }
            else {
                var act = GGlobal.modelActivity.get(UIConst.CHAOZHIFL, UIConst.LXXF2, GGlobal.modelLXXF.qishu);
                if (act) {
                    var diffMs = Model_GlobalMsg.getServerTime() - act.start * 1000;
                    var day = (diffMs / 86400000 >> 0) + 1;
                    return day;
                }
                else {
                    return 1;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ModelLXXF.msg_datas = "msg_datas";
    return ModelLXXF;
}(BaseModel));
__reflect(ModelLXXF.prototype, "ModelLXXF");
