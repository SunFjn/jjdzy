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
var ModelLXX814 = (function (_super) {
    __extends(ModelLXX814, _super);
    function ModelLXX814() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.datas = {};
        _this.bigGiftGotSt = 0; //0默认值 1已领取
        _this.smlGiftGotSt = 0; //第3天大礼物领取 0默认值 1已领取
        _this.day = 0; //活动天数
        /**补领是否显示红点 */
        _this.invalidNotMap = {};
        return _this;
    }
    /**领取奖励 */
    ModelLXX814.prototype.applayAwards = function (day) {
        var bytes = this.getBytes();
        bytes.writeByte(day);
        this.sendSocket(4831, bytes);
    };
    /**领取大奖 */
    ModelLXX814.prototype.applyBigAwards = function () {
        this.sendSocket(4833, this.getBytes());
    };
    ModelLXX814.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        wsm.regHand(4830, this.GC4830, this);
        wsm.regHand(4832, this.servAwards4832, this);
        wsm.regHand(4834, this.servBigAwards4834, this);
    };
    /**UI数据 返回界面信息 [B:天数I:消耗元宝数B:奖励 0默认值 1已领取 2补领]所有数据B:第七天大礼物领取 0默认值 1已领取B:第3天大礼物领取 0默认值 1已领取I:当前活动天数*/
    ModelLXX814.prototype.GC4830 = function (self, bytes) {
        var len = bytes.readShort();
        self.datas = {};
        for (var i = 0; i < len; i++) {
            var day = bytes.readByte();
            self.datas[i] = { day: day, costYB: bytes.readInt(), state: bytes.readByte() }; //B:奖励 0默认值 1已领取
        }
        self.bigGiftGotSt = bytes.readByte();
        self.smlGiftGotSt = bytes.readByte(); //B:第3天大礼物领取 0默认值 1已领取
        self.day = bytes.readInt();
        GGlobal.reddot.setCondition(UIConst.LXXF3, 0, self.checkNotice());
        self.notify(ModelLXX814.msg_datas);
        GGlobal.reddot.notify(UIConst.CHAOZHIFL);
    };
    /**数据返回 */
    ModelLXX814.prototype.servAwards4832 = function (self, bytes) {
        //B:结果 1成功 2异常 3开服天数不足 4配置表不存在 5该奖励已领取 6元宝不足 7背包已满 8元宝消耗不足
        //1成功 3系统未开启 4配置表不存在 5该奖励已领取 6元宝不足 7背包已满 8元宝消耗不足 9传入ID非本期ID 10活动未开启
        var state = bytes.readByte();
        if (state == 1) {
            var day = bytes.readByte();
            for (var key in self.datas) {
                if (day == self.datas[key].day) {
                    self.datas[key].state = 1;
                    break;
                }
            }
            GGlobal.reddot.setCondition(UIConst.LXXF3, 0, self.checkNotice());
            self.notify(ModelLXX814.msg_datas);
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
    /**大奖返回 */
    ModelLXX814.prototype.servBigAwards4834 = function (self, bytes) {
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
    };
    ModelLXX814.prototype.dayFinished = function () {
        var datas = this.datas;
        var counter = 0;
        for (var key in datas) {
            var data = datas[key];
            var needYB = Config.lxxf3_737[data.day].xiaohao;
            if (data.costYB >= needYB || data.state == 1) {
                counter++;
            }
        }
        return counter;
    };
    ModelLXX814.prototype.checkNotice = function () {
        var self = this;
        var dayFini = self.dayFinished();
        var ret = dayFini >= ModelLXX814.DAY_THREE && self.smlGiftGotSt == 0;
        if (!ret) {
            ret = dayFini >= ModelLXX814.DAY_SEVEN && self.bigGiftGotSt == 0;
        }
        if (!ret) {
            for (var key in self.datas) {
                var day = Number(key) + 1;
                var data = self.datas[key];
                var cfg = Config.lxxf3_737[data.day];
                var needYB = cfg.xiaohao;
                var kaifuDay = self.day;
                var award = ConfigHelp.makeItemListArr(JSON.parse(cfg.buling))[0];
                ret = (data.costYB >= needYB && data.state == 0) || (!self.invalidNotMap[day] && kaifuDay > day && data.state == 0 && award.count <= Model_player.voMine.yuanbao);
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    };
    ModelLXX814.prototype.setBLNot = function (day, value) {
        this.invalidNotMap[day] = value;
    };
    ModelLXX814.msg_datas = "msg_datas";
    ModelLXX814.DAY_SEVEN = 7;
    ModelLXX814.DAY_THREE = 3;
    return ModelLXX814;
}(BaseModel));
__reflect(ModelLXX814.prototype, "ModelLXX814");
