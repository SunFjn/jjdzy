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
var Model_HuoDong = (function (_super) {
    __extends(Model_HuoDong, _super);
    function Model_HuoDong() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rechargeVal = 0; //当前充值金额
        _this.CJDJ_index = 0;
        _this.CJDJ_count = 0;
        _this.CJDJ_data = [];
        _this.CJDJ_qishu = 0; //当前期数
        _this.CJDJ_hasGet = 0; //已经抽到了多少次
        return _this;
    }
    Object.defineProperty(Model_HuoDong, "iconArr", {
        get: function () {
            if (Model_HuoDong._iconArr == null) {
                Model_HuoDong._iconArr = [];
                for (var key in Config.jchd_723) {
                    Model_HuoDong._iconArr.push(Config.jchd_723[key]);
                }
                Model_HuoDong._iconArr.sort(Model_HuoDong.sortIcon);
            }
            return Model_HuoDong._iconArr;
        },
        enumerable: true,
        configurable: true
    });
    Model_HuoDong.sortIcon = function (a, b) {
        return a.px - b.px;
    };
    /**登录豪礼 领取奖励 B:类型*/
    Model_HuoDong.prototype.CG_DAILYGIFT_GET = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(2381, ba);
    };
    /**登录豪礼-活动 领取奖励 B:类型*/
    Model_HuoDong.prototype.CG_DAIGIFTACT_GET = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(2871, ba);
    };
    /**登录豪礼-开服 openui*/
    Model_HuoDong.prototype.CG_DAIGIFTKF_UI = function () {
        var ba = new BaseBytes();
        this.sendSocket(2891, ba);
    };
    /**登录豪礼-开服 领取奖励*/
    Model_HuoDong.prototype.CG_DAIGIFTKF_GET = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(2893, ba);
    };
    /**单笔充值 领取奖励 B:奖励id*/
    Model_HuoDong.prototype.CG_DAILYONE_GET = function (type) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        this.sendSocket(2361, ba);
    };
    /**单笔充值 ui*/
    Model_HuoDong.prototype.CG_DAIONEACT_UI = function () {
        var ba = new BaseBytes();
        this.sendSocket(3001, ba);
    };
    /**单笔充值 领取奖励 B:奖励id*/
    Model_HuoDong.prototype.CG_DAIONEACT_GET = function (type) {
        var ba = new BaseBytes();
        ba.writeInt(type);
        this.sendSocket(3003, ba);
    };
    /**单笔充值 ui*/
    Model_HuoDong.prototype.CG_DAIONEKF_UI = function () {
        var ba = new BaseBytes();
        this.sendSocket(2971, ba);
    };
    /**单笔充值 领取奖励 B:奖励id*/
    Model_HuoDong.prototype.CG_DAIONEKF_GET = function (type) {
        var ba = new BaseBytes();
        ba.writeInt(type);
        this.sendSocket(2973, ba);
    };
    /**累计充值 openui*/
    Model_HuoDong.prototype.CG_ADDRECHARGE_OPENUI = function () {
        var ba = new BaseBytes();
        this.sendSocket(2471, ba);
    };
    Model_HuoDong.prototype.CG_ADDRECHARGE_OPENUI2 = function () {
        if (Model_GlobalMsg.kaifuDay > 7) {
            this.CG_ADDRECHARGE_OPENUI();
        }
        else {
            var ba = new BaseBytes();
            this.sendSocket(4351, ba);
        }
    };
    /**累计充值 获取奖励 B:奖励序号*/
    Model_HuoDong.prototype.CG_ADDRECHARGE_GET = function (index) {
        var ba = new BaseBytes();
        ba.writeInt(index);
        this.sendSocket(2473, ba);
    };
    Model_HuoDong.prototype.CG_ADDRECHARGE_GET2 = function (index) {
        if (Model_GlobalMsg.kaifuDay > 7) {
            this.CG_ADDRECHARGE_GET(index);
        }
        else {
            var ba = new BaseBytes();
            ba.writeInt(index);
            this.sendSocket(4353, ba);
        }
    };
    /**单日累充 openui*/
    Model_HuoDong.prototype.CG_DAILYADDUP_OPENUI = function () {
        var ba = new BaseBytes();
        this.sendSocket(2521, ba);
    };
    /**单日累充 获取奖励 B:奖励序号*/
    Model_HuoDong.prototype.CG_DAILYADDUP_GET = function (index) {
        var ba = new BaseBytes();
        ba.writeInt(index);
        this.sendSocket(2523, ba);
    };
    /**单日累充 openui*/
    Model_HuoDong.prototype.CG_DAIADDACT_OPENUI = function () {
        var ba = new BaseBytes();
        this.sendSocket(2931, ba);
    };
    /**单日累充 获取奖励 B:奖励序号*/
    Model_HuoDong.prototype.CG_DAIADDACT_GET = function (index) {
        var ba = new BaseBytes();
        ba.writeInt(index);
        this.sendSocket(2933, ba);
    };
    /**单日累充 openui*/
    Model_HuoDong.prototype.CG_DAIADDKF_OPENUI = function () {
        var ba = new BaseBytes();
        this.sendSocket(2911, ba);
    };
    /**单日累充 获取奖励 B:奖励序号*/
    Model_HuoDong.prototype.CG_DAIADDKF_GET = function (index) {
        var ba = new BaseBytes();
        ba.writeInt(index);
        this.sendSocket(2913, ba);
    };
    /**开服连续累充*/
    Model_HuoDong.prototype.CG_SEVEN_KAIFU_UI = function () {
        var ba = new BaseBytes();
        this.sendSocket(2771, ba);
    };
    /**开服连续累充 获取奖励 B:奖励序号*/
    Model_HuoDong.prototype.CG_SEVEN_KAIFU_GET = function (index) {
        var ba = new BaseBytes();
        ba.writeByte(index);
        this.sendSocket(2773, ba);
    };
    /**获取今日奖励*/
    Model_HuoDong.prototype.CG_SEVEN_KAIFU_TODAY = function () {
        var ba = new BaseBytes();
        this.sendSocket(2777, ba);
    };
    /**活动连续累充*/
    Model_HuoDong.prototype.CG_SEVEN_ACT_UI = function () {
        var ba = new BaseBytes();
        this.sendSocket(2781, ba);
    };
    /**活动连续累充 获取奖励 B:奖励序号*/
    Model_HuoDong.prototype.CG_SEVEN_ACT_GET = function (index) {
        var ba = new BaseBytes();
        ba.writeByte(index);
        this.sendSocket(2783, ba);
    };
    /**获取今日奖励*/
    Model_HuoDong.prototype.CG_SEVEN_ACT_TODAY = function () {
        var ba = new BaseBytes();
        this.sendSocket(2787, ba);
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_HuoDong.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        //登录豪礼
        wsm.regHand(2380, a.GC_DAILYGIFT_OPENUI, a);
        wsm.regHand(2382, a.GC_DAILYGIFT_GET, a);
        wsm.regHand(2870, a.GC_DAIGIFTACT_OPENUI, a);
        wsm.regHand(2872, a.GC_DAIGIFTACT_GET, a);
        wsm.regHand(2892, a.GC_DAIGIFTKF_OPENUI, a);
        wsm.regHand(2894, a.GC_DAIGIFTKF_GET, a);
        //单笔充值
        wsm.regHand(2360, a.GC_DAILYONE_OPENUI, a);
        wsm.regHand(2362, a.GC_DAILYONE_GET, a);
        wsm.regHand(3002, a.GC_DAIONEACT_OPENUI, a);
        wsm.regHand(3004, a.GC_DAIONEACT_GET, a);
        wsm.regHand(2972, a.GC_DAIONEKF_OPENUI, a);
        wsm.regHand(2974, a.GC_DAIONEKF_GET, a);
        //累计充值
        wsm.regHand(2472, a.GC_ADDRECHARGE_OPENUI, a);
        wsm.regHand(2474, a.GC_ADDRECHARGE_GET, a);
        wsm.regHand(2476, a.GC_ADDRECHARGE_CHARGE, a);
        wsm.regHand(4352, a.GC_ADDRECHARGE_OPENUI, a);
        wsm.regHand(4354, a.GC_ADDRECHARGE_GET, a);
        wsm.regHand(4356, a.GC_ADDRECHARGE_CHARGE, a);
        //单日累充
        wsm.regHand(2522, a.GC_DAILYADDUP_OPENUI, a);
        wsm.regHand(2524, a.GC_DAILYADDUP_GET, a);
        wsm.regHand(2526, a.GC_DAILYADDUPE_CHARGE, a);
        wsm.regHand(2932, a.GC_DAIADDACT_OPENUI, a);
        wsm.regHand(2934, a.GC_DAIADDACT_GET, a);
        wsm.regHand(2912, a.GC_DAIADDKF_OPENUI, a);
        wsm.regHand(2914, a.GC_DAIADDKF_GET, a);
        //
        wsm.regHand(2610, a.GC_OPENUI_2610, a);
        wsm.regHand(4372, a.GC_OPENUI_4372, a);
        wsm.regHand(2612, a.GC_LQ_2612, a);
        wsm.regHand(4374, a.GC_LQ_2612, a);
        //连续累充 开服
        wsm.regHand(2772, a.GC_SEVEN_KAIFU_UI, a);
        wsm.regHand(2774, a.GC_SEVEN_KAIFU_GET, a);
        wsm.regHand(2776, a.GC_SEVEN_KAIFU_UP, a);
        wsm.regHand(2778, a.GC_SEVEN_KAIFU_TODAY, a);
        //连续累充 活动
        wsm.regHand(2782, a.GC_SEVEN_ACT_UI, a);
        wsm.regHand(2784, a.GC_SEVEN_KAIFU_GET, a);
        wsm.regHand(2786, a.GC_SEVEN_KAIFU_UP, a);
        wsm.regHand(2788, a.GC_SEVEN_KAIFU_TODAY, a);
        // wsm.regHand(2784, a.GC_SEVEN_ACT_GET, a);
        // wsm.regHand(2786, a.GC_SEVEN_ACT_UP, a);
    };
    //活动7天连续充值
    // public static sevenAct: number = 0;
    // public static sevenActCount: number = 0;
    // public static sevenActQs: number = 0;//期数
    // public static sevenActArr: Array<Vo_HuoDong> = [];
    /**登录豪礼 界面信息返回 [B:类型B:领取状态（0：不可领取，1：可领取，2：已领取）]奖励数据I:活动idI:期数*/
    Model_HuoDong.prototype.GC_DAILYGIFT_OPENUI = function (self, data) {
        var len = data.readShort();
        Model_HuoDong.dailyGiftArr = [];
        for (var i = 0; i < len; i++) {
            Model_HuoDong.dailyGiftArr[data.readByte()] = data.readByte();
        }
        var actId = data.readInt();
        Model_HuoDong.dailyGiftQs = data.readInt();
        GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYGIFT_OPENUI);
    };
    /**登录豪礼 领取奖励结果 B:0：失败，1：成功B:失败：错误码（1:未满足条件,2:已领取），成功：领取类型*/
    Model_HuoDong.prototype.GC_DAILYGIFT_GET = function (self, data) {
        var result = data.readByte();
        var type = data.readByte();
        if (result == 1) {
            Model_HuoDong.dailyGiftArr[type] = 2;
            GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYGIFT_OPENUI);
            ViewCommonWarn.text("领取奖励成功");
        }
        else {
            if (type == 1) {
                ViewCommonWarn.text("未满足条件");
            }
            else if (type == 2) {
                ViewCommonWarn.text("已领取");
            }
            else {
                ViewCommonWarn.text("领取失败");
            }
        }
    };
    /**界面信息返回 [B:类型B:领取状态（0：不可领取，1：可领取，2：已领取）]奖励数据I:活动idB:星期几*/
    Model_HuoDong.prototype.GC_DAIGIFTACT_OPENUI = function (self, data) {
        var len = data.readShort();
        Model_HuoDong.daiGiftActArr = [];
        for (var i = 0; i < len; i++) {
            Model_HuoDong.daiGiftActArr[data.readByte()] = data.readByte();
        }
        var actId = data.readInt();
        Model_HuoDong.daiGiftActQs = data.readByte();
        GGlobal.control.notify(Enum_MsgType.HUODONG_DAIGIFTACT_UI);
    };
    /**登录豪礼 领取奖励结果 B:0：失败，1：成功B:失败：错误码（1:未满足条件,2:已领取），成功：领取类型*/
    Model_HuoDong.prototype.GC_DAIGIFTACT_GET = function (self, data) {
        var result = data.readByte();
        var type = data.readByte();
        if (result == 1) {
            Model_HuoDong.daiGiftActArr[type] = 2;
            GGlobal.control.notify(Enum_MsgType.HUODONG_DAIGIFTACT_UI);
            ViewCommonWarn.text("领取奖励成功");
        }
        else {
            if (type == 1) {
                ViewCommonWarn.text("未满足条件");
            }
            else if (type == 2) {
                ViewCommonWarn.text("已领取");
            }
            else {
                ViewCommonWarn.text("领取失败");
            }
        }
    };
    /**打开界面数据返回 [B:类型B:领取状态（0：不可领取，1：可领取，2：已领取）]奖励数据B:开服第几天*/
    Model_HuoDong.prototype.GC_DAIGIFTKF_OPENUI = function (self, data) {
        var len = data.readShort();
        Model_HuoDong.daiGiftKfArr = [];
        for (var i = 0; i < len; i++) {
            Model_HuoDong.daiGiftKfArr[data.readByte()] = data.readByte();
        }
        Model_HuoDong.daiGiftKfQs = data.readByte();
        GGlobal.control.notify(Enum_MsgType.HUODONG_DAIGIFTKF_UI);
    };
    /**登录豪礼 领取奖励结果 B:0：失败，1：成功B:失败：错误码（1:未满足条件,2:已领取），成功：领取类型*/
    Model_HuoDong.prototype.GC_DAIGIFTKF_GET = function (self, data) {
        var result = data.readByte();
        var type = data.readByte();
        if (result == 1) {
            Model_HuoDong.daiGiftKfArr[type] = 2;
            GGlobal.control.notify(Enum_MsgType.HUODONG_DAIGIFTKF_UI);
            ViewCommonWarn.text("领取奖励成功");
        }
        else {
            if (type == 1) {
                ViewCommonWarn.text("未满足条件");
            }
            else if (type == 2) {
                ViewCommonWarn.text("已领取");
            }
            else {
                ViewCommonWarn.text("领取失败");
            }
        }
    };
    /**单笔充值打开界面返回 [B:奖励状态，0：未达到，1：可领取，2：已领取]奖励状态列表I:活动期数*/
    Model_HuoDong.prototype.GC_DAILYONE_OPENUI = function (self, data) {
        var len = data.readShort();
        Model_HuoDong.dailyOneArr = [];
        for (var i = 0; i < len; i++) {
            Model_HuoDong.dailyOneArr[i] = data.readByte();
        }
        Model_HuoDong.dailyOneQs = data.readInt();
        GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYONE_OPENUI);
    };
    /**单笔充值 领取奖励 B:状态：1：成功，2：未达到，3：重复领取B:领取奖励id*/
    Model_HuoDong.prototype.GC_DAILYONE_GET = function (self, data) {
        var result = data.readByte();
        var index = data.readByte() - 1;
        if (result == 1) {
            Model_HuoDong.dailyOneArr[index] = 2;
            GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYONE_OPENUI);
            ViewCommonWarn.text("领取奖励成功");
        }
        else if (result == 2) {
            ViewCommonWarn.text("未满足条件");
        }
        else if (result == 3) {
            ViewCommonWarn.text("重复领取");
        }
    };
    /**单笔充值 打开界面返回 [B:奖励状态，0：未达到，1：可领取，2：已领取]奖励状态列表*/
    Model_HuoDong.prototype.GC_DAIONEACT_OPENUI = function (self, data) {
        var z = data.readByte();
        var len = data.readShort();
        Model_HuoDong.daiOneActArr = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.readMsgCt(data);
            Model_HuoDong.daiOneActArr.push(v);
        }
        Model_HuoDong.daiOneActArr.sort(Model_HuoDong.sortFuc);
        GGlobal.control.notify(Enum_MsgType.HUODONG_DAIONEACT_UI);
    };
    /**单笔充值 领取奖励 B:状态：1：成功，2：未达到，3：重复领取B:领取奖励id*/
    Model_HuoDong.prototype.GC_DAIONEACT_GET = function (self, data) {
        var v = new Vo_HuoDong();
        v.readMsgCt(data);
        if (v.id != 0) {
            if (Model_HuoDong.daiOneActArr.length == 0) {
                Model_HuoDong.daiOneActArr.push(v);
            }
            else {
                for (var i = 0; i < Model_HuoDong.daiOneActArr.length; i++) {
                    if (Model_HuoDong.daiOneActArr[i].id == v.id) {
                        Model_HuoDong.daiOneActArr[i].hasCt = v.hasCt;
                        Model_HuoDong.daiOneActArr[i].canCt = v.canCt;
                        break;
                    }
                }
            }
            GGlobal.control.notify(Enum_MsgType.HUODONG_DAIONEACT_UI);
        }
    };
    /**单笔充值 打开界面返回 [B:奖励状态，0：未达到，1：可领取，2：已领取]奖励状态列表*/
    Model_HuoDong.prototype.GC_DAIONEKF_OPENUI = function (self, data) {
        var len = data.readShort();
        Model_HuoDong.daiOneKfArr = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.readMsgCt(data);
            Model_HuoDong.daiOneKfArr.push(v);
        }
        Model_HuoDong.daiOneKfArr.sort(Model_HuoDong.sortFuc);
        GGlobal.control.notify(Enum_MsgType.HUODONG_DAIONEKF_UI);
    };
    /**单笔充值 领取奖励 B:状态：1：成功，2：未达到，3：重复领取B:领取奖励id*/
    Model_HuoDong.prototype.GC_DAIONEKF_GET = function (self, data) {
        var v = new Vo_HuoDong();
        v.readMsgCt(data);
        if (v.id != 0) {
            if (Model_HuoDong.daiOneKfArr.length == 0) {
                Model_HuoDong.daiOneKfArr.push(v);
            }
            else {
                for (var i = 0; i < Model_HuoDong.daiOneKfArr.length; i++) {
                    if (Model_HuoDong.daiOneKfArr[i].id == v.id) {
                        Model_HuoDong.daiOneKfArr[i].canCt = v.canCt;
                        Model_HuoDong.daiOneKfArr[i].hasCt = v.hasCt;
                        break;
                    }
                }
            }
            GGlobal.control.notify(Enum_MsgType.HUODONG_DAIONEKF_UI);
        }
    };
    /**累计充值 I:充值金额[B:索引idB:奖励状态]*/
    Model_HuoDong.prototype.GC_ADDRECHARGE_OPENUI = function (self, data) {
        Model_HuoDong.addRecharge = data.readInt();
        var len = data.readShort();
        Model_HuoDong.addRechargeArr = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.readMsgInt(data);
            Model_HuoDong.addRechargeArr.push(v);
        }
        Model_HuoDong.addRechargeArr.sort(Model_HuoDong.sortFuc);
        GGlobal.control.notify(Enum_MsgType.HUODONG_ADDRECHARGE_OPENUI);
    };
    /**累计充值 奖励变化 B:序号B:奖励状态*/
    Model_HuoDong.prototype.GC_ADDRECHARGE_GET = function (self, data) {
        var v = new Vo_HuoDong();
        v.readMsgInt(data);
        if (v.id != 0) {
            if (Model_HuoDong.addRechargeArr.length == 0) {
                Model_HuoDong.addRechargeArr.push(v);
            }
            else {
                for (var i = 0; i < Model_HuoDong.addRechargeArr.length; i++) {
                    if (Model_HuoDong.addRechargeArr[i].id == v.id) {
                        Model_HuoDong.addRechargeArr[i].status = v.status;
                        break;
                    }
                }
            }
            GGlobal.control.notify(Enum_MsgType.HUODONG_ADDRECHARGE_OPENUI);
        }
    };
    /**累计充值 充值金额变化 I:金额数量*/
    Model_HuoDong.prototype.GC_ADDRECHARGE_CHARGE = function (self, data) {
        Model_HuoDong.addRecharge = data.readInt();
        GGlobal.control.notify(Enum_MsgType.HUODONG_ADDRECHARGE_OPENUI);
    };
    /**单日累充 打开ui信息 I:充值数量[B:充值索引B:充值状态]*/
    Model_HuoDong.prototype.GC_DAILYADDUP_OPENUI = function (self, data) {
        Model_HuoDong.dailyAddUp = data.readInt();
        var len = data.readShort();
        Model_HuoDong.dailyAddUpArr = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.readMsgInt(data);
            Model_HuoDong.dailyAddUpArr.push(v);
        }
        Model_HuoDong.dailyAddUpArr.sort(Model_HuoDong.sortFuc);
        GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYADDUP_OPENUI);
    };
    /**单日累充 获取奖励 B:序号B:奖励状态*/
    Model_HuoDong.prototype.GC_DAILYADDUP_GET = function (self, data) {
        var v = new Vo_HuoDong();
        v.readMsgInt(data);
        if (v.id != 0) {
            if (Model_HuoDong.dailyAddUpArr.length == 0) {
                Model_HuoDong.dailyAddUpArr.push(v);
            }
            else {
                for (var i = 0; i < Model_HuoDong.dailyAddUpArr.length; i++) {
                    if (Model_HuoDong.dailyAddUpArr[i].id == v.id) {
                        Model_HuoDong.dailyAddUpArr[i].status = v.status;
                        break;
                    }
                }
            }
            GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYADDUP_OPENUI);
        }
    };
    /**单日累充 充值金额变化 I:金额变化*/
    Model_HuoDong.prototype.GC_DAILYADDUPE_CHARGE = function (self, data) {
        Model_HuoDong.dailyAddUp = data.readInt();
        GGlobal.control.notify(Enum_MsgType.HUODONG_DAILYADDUP_OPENUI);
    };
    /**单日累充 打开ui信息 B:周几I:今日充值数[I:奖励序号B:状态]*/
    Model_HuoDong.prototype.GC_DAIADDACT_OPENUI = function (self, data) {
        var z = data.readByte();
        Model_HuoDong.daiAddAct = data.readInt();
        var len = data.readShort();
        Model_HuoDong.daiAddActArr = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.readMsgInt(data);
            Model_HuoDong.daiAddActArr.push(v);
        }
        Model_HuoDong.daiAddActArr.sort(Model_HuoDong.sortFuc);
        GGlobal.control.notify(Enum_MsgType.HUODONG_DAIADDACT_UI);
    };
    /**单日累充 获取奖励 B:序号B:奖励状态*/
    Model_HuoDong.prototype.GC_DAIADDACT_GET = function (self, data) {
        Model_HuoDong.daiAddAct = data.readInt();
        var v = new Vo_HuoDong();
        v.readMsgInt(data);
        if (v.id != 0) {
            if (Model_HuoDong.daiAddActArr.length == 0) {
                Model_HuoDong.daiAddActArr.push(v);
            }
            else {
                for (var i = 0; i < Model_HuoDong.daiAddActArr.length; i++) {
                    if (Model_HuoDong.daiAddActArr[i].id == v.id) {
                        Model_HuoDong.daiAddActArr[i].status = v.status;
                        break;
                    }
                }
            }
        }
        GGlobal.control.notify(Enum_MsgType.HUODONG_DAIADDACT_UI);
    };
    /**单日累充 打开ui信息 I:充值数量[B:充值索引B:充值状态]*/
    Model_HuoDong.prototype.GC_DAIADDKF_OPENUI = function (self, data) {
        Model_HuoDong.daiAddKf = data.readInt();
        var len = data.readShort();
        Model_HuoDong.daiAddKfArr = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.readMsgInt(data);
            Model_HuoDong.daiAddKfArr.push(v);
        }
        Model_HuoDong.daiAddKfArr.sort(Model_HuoDong.sortFuc);
        GGlobal.control.notify(Enum_MsgType.HUODONG_DAIADDKF_UI);
    };
    /**单日累充 获取奖励 B:序号B:奖励状态*/
    Model_HuoDong.prototype.GC_DAIADDKF_GET = function (self, data) {
        Model_HuoDong.daiAddKf = data.readInt();
        var v = new Vo_HuoDong();
        v.readMsgInt(data);
        if (v.id != 0) {
            if (Model_HuoDong.daiAddKfArr.length == 0) {
                Model_HuoDong.daiAddKfArr.push(v);
            }
            else {
                for (var i = 0; i < Model_HuoDong.daiAddKfArr.length; i++) {
                    if (Model_HuoDong.daiAddKfArr[i].id == v.id) {
                        Model_HuoDong.daiAddKfArr[i].status = v.status;
                        break;
                    }
                }
            }
        }
        GGlobal.control.notify(Enum_MsgType.HUODONG_DAIADDKF_UI);
    };
    Model_HuoDong.getDailyGiftCfg = function (qs, type) {
        // if (Model_HuoDong._dailyGiftCfg == null) {
        // 	Model_HuoDong._dailyGiftCfg = {};
        // 	for (let keys in Config.dlhl_723) {
        // 		let cfg = Config.dlhl_723[keys]
        // 		if (Model_HuoDong._dailyGiftCfg[cfg.qs] == null) {
        // 			Model_HuoDong._dailyGiftCfg[cfg.qs] = {};
        // 		}
        // 		Model_HuoDong._dailyGiftCfg[cfg.qs][cfg.type] = cfg
        // 	}
        // }
        // if (Model_HuoDong._dailyGiftCfg[qs])
        // 	return Model_HuoDong._dailyGiftCfg[qs][type];
        return null;
    };
    Model_HuoDong.getDaiGiftKfCfg = function (ts, type) {
        if (Model_HuoDong._daiGiftKfCfg == null) {
            Model_HuoDong._daiGiftKfCfg = {};
            for (var keys in Config.dlhl1_732) {
                var cfg = Config.dlhl1_732[keys];
                if (Model_HuoDong._daiGiftKfCfg[cfg.ts] == null) {
                    Model_HuoDong._daiGiftKfCfg[cfg.ts] = {};
                }
                Model_HuoDong._daiGiftKfCfg[cfg.ts][cfg.type] = cfg;
            }
        }
        if (Model_HuoDong._daiGiftKfCfg[ts])
            return Model_HuoDong._daiGiftKfCfg[ts][type];
        return null;
    };
    Model_HuoDong.getDaiGiftActCfg = function (xq, type) {
        if (Model_HuoDong._daiGiftActCfg == null) {
            Model_HuoDong._daiGiftActCfg = {};
            for (var keys in Config.dlhl2_732) {
                var cfg = Config.dlhl2_732[keys];
                if (Model_HuoDong._daiGiftActCfg[cfg.xq] == null) {
                    Model_HuoDong._daiGiftActCfg[cfg.xq] = {};
                }
                Model_HuoDong._daiGiftActCfg[cfg.xq][cfg.type] = cfg;
            }
        }
        if (Model_HuoDong._daiGiftActCfg[xq])
            return Model_HuoDong._daiGiftActCfg[xq][type];
        return null;
    };
    Model_HuoDong.getDailyOneArr = function (qs) {
        // if (Model_HuoDong._dailyOneCfg == null) {
        // 	Model_HuoDong._dailyOneCfg = {};
        // 	for (let keys in Config.dbcz_724) {
        // 		let cfg = Config.dbcz_724[keys]
        // 		if (Model_HuoDong._dailyOneCfg[cfg.qs] == null) {
        // 			Model_HuoDong._dailyOneCfg[cfg.qs] = [];
        // 		}
        // 		Model_HuoDong._dailyOneCfg[cfg.qs].push(cfg);
        // 	}
        // }
        // return Model_HuoDong._dailyOneCfg[qs];
        return [];
    };
    /**4371	打开界面 */
    Model_HuoDong.prototype.CG_OPENUI_4371 = function () {
        var ba = this.getBytes();
        this.sendSocket(4371, ba);
    };
    /**4373	领取奖励 B:奖励id，为配置表位置 */
    Model_HuoDong.prototype.CG_DRAWREWARD_4373 = function (i) {
        var ba = this.getBytes();
        ba.writeByte(i);
        this.sendSocket(4373, ba);
    };
    /** I-B-B-[B-B-I-I]
     打开界面返回 I:已经充值的元宝数B:下次抽奖次数,对应配置表抽奖次数B:剩余点将次数[B:状态，0：未领取，2：已领取B:奖品类型I:奖品idI:奖品数量]奖品列表*/
    Model_HuoDong.prototype.GC_OPENUI_2610 = function (s, data) {
        s.rechargeVal = data.readInt();
        s.CJDJ_index = data.readByte();
        s.CJDJ_count = data.readByte();
        if (Model_GlobalMsg.kaifuDay > 7) {
            GGlobal.reddot.setCondition(UIConst.HUODONG_DIANJIANG, 0, s.CJDJ_count > 0);
        }
        else {
            GGlobal.reddot.setCondition(UIConst.HUODONG_DIANJIANG_SYS, 0, s.CJDJ_count > 0);
        }
        GGlobal.reddot.notify(ReddotEvent.CHECK_HUODONG);
        var i = data.readShort();
        s.CJDJ_data = [];
        s.CJDJ_hasGet = 0;
        for (var j = 0; j < i; j++) {
            var st = data.readByte();
            var type = data.readByte();
            var id = data.readInt();
            var count = data.readInt();
            if (type > 0)
                s.CJDJ_hasGet++;
            s.CJDJ_data.push([st, type, id, count]);
        }
        // s.CJDJ_data = data.readFmt(["B",[["B", "I", "I"]]]);
        s.CJDJ_qishu = data.readInt();
        GGlobal.control.notify(Enum_MsgType.HD_CJDJ);
    };
    Model_HuoDong.prototype.GC_OPENUI_4372 = function (s, data) {
        s.rechargeVal = data.readInt();
        s.CJDJ_index = data.readByte();
        s.CJDJ_count = data.readByte();
        if (Model_GlobalMsg.kaifuDay > 7) {
            GGlobal.reddot.setCondition(UIConst.HUODONG_DIANJIANG, 0, s.CJDJ_count > 0);
        }
        else {
            GGlobal.reddot.setCondition(UIConst.HUODONG_DIANJIANG_SYS, 0, s.CJDJ_count > 0);
        }
        GGlobal.reddot.notify(ReddotEvent.CHECK_HUODONG);
        var i = data.readShort();
        s.CJDJ_data = [];
        s.CJDJ_hasGet = 0;
        for (var j = 0; j < i; j++) {
            var st = data.readByte();
            var type = data.readByte();
            var id = data.readInt();
            var count = data.readInt();
            if (type > 0)
                s.CJDJ_hasGet++;
            s.CJDJ_data.push([st, type, id, count]);
        }
        // s.CJDJ_data = data.readFmt(["B",[["B", "I", "I"]]]);
        GGlobal.control.notify(Enum_MsgType.HD_CJDJ);
    };
    Model_HuoDong.prototype.CG_LQ_2611 = function (i) {
        var ba = this.getBytes();
        ba.writeByte(i);
        this.sendSocket(2611, ba);
    };
    /**B-B-B-I-I 领取奖励返回 B:状态，0：奖励不存在，1：成功，2：无抽奖次数，3：不可重复领取B:返回的奖励idB:奖励类型I:奖励idI:奖励数量*/
    Model_HuoDong.prototype.GC_LQ_2612 = function (self, data) {
        var r = data.readByte();
        var id = data.readByte();
        if (r == 1) {
            self.CJDJ_hasGet++;
            self.CJDJ_count--;
            if (Model_GlobalMsg.kaifuDay > 7) {
                GGlobal.reddot.setCondition(UIConst.HUODONG_DIANJIANG, 0, self.CJDJ_count > 0);
            }
            else {
                GGlobal.reddot.setCondition(UIConst.HUODONG_DIANJIANG_SYS, 0, self.CJDJ_count > 0);
            }
            GGlobal.reddot.notify(ReddotEvent.CHECK_HUODONG);
            var arr = [2, data.readByte(), data.readInt(), data.readInt()];
            self.CJDJ_data[id - 1] = arr;
            var awards = ConfigHelp.makeItemListArr([[arr[1], arr[2], arr[3]]]);
            GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, awards);
            GGlobal.control.notify(Enum_MsgType.HD_CJDJLQ);
        }
        else if (r == 2)
            ViewCommonWarn.text("无抽奖次数");
        else if (r == 3)
            ViewCommonWarn.text("不可重复领取");
    };
    /**打开ui I:今日充值元B:累计充值达标次数B:今日奖励的领取状态[B:大奖序号B:奖励状态]*/
    Model_HuoDong.prototype.GC_SEVEN_KAIFU_UI = function (self, data) {
        Model_HuoDong.sevenKf = data.readInt();
        Model_HuoDong.sevenKfCount = data.readByte();
        Model_HuoDong.sevenKfStatus = data.readByte();
        var len = data.readShort();
        Model_HuoDong.sevenKfArr = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.readMsg(data);
            Model_HuoDong.sevenKfArr.push(v);
        }
        GGlobal.control.notify(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI);
    };
    /**连续累充 奖励发生变化（红点更新） B:奖励序号B:奖励状态*/
    Model_HuoDong.prototype.GC_SEVEN_KAIFU_GET = function (self, data) {
        var $v = new Vo_HuoDong();
        $v.readMsg(data);
        if ($v.id != 0) {
            if (Model_HuoDong.sevenKfArr.length == 0) {
                Model_HuoDong.sevenKfArr.push($v);
            }
            else {
                for (var i = 0; i < Model_HuoDong.sevenKfArr.length; i++) {
                    var v = Model_HuoDong.sevenKfArr[i];
                    if (v.id == $v.id) {
                        v.status = $v.status;
                        break;
                    }
                }
            }
        }
        GGlobal.control.notify(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI);
    };
    /**发生变化 B:累计次数变化B:奖励序号B:奖励状态*/
    Model_HuoDong.prototype.GC_SEVEN_KAIFU_CHANGE = function (self, data) {
        Model_HuoDong.sevenKfCount = data.readByte();
        self.GC_SEVEN_KAIFU_GET(self, data);
    };
    /**今日奖励状态变化 B:奖励状态*/
    Model_HuoDong.prototype.GC_SEVEN_KAIFU_TODAY = function (self, data) {
        Model_HuoDong.sevenKfStatus = data.readByte();
        Model_HuoDong.sevenKf = data.readInt();
        GGlobal.control.notify(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI);
    };
    /**发生变化 B:累计次数变化B:奖励序号B:奖励状态*/
    Model_HuoDong.prototype.GC_SEVEN_KAIFU_UP = function (self, data) {
        Model_HuoDong.sevenKfCount = data.readByte();
        var v = new Vo_HuoDong();
        v.readMsg(data);
        if (v.id != 0) {
            if (Model_HuoDong.sevenKfArr.length == 0) {
                Model_HuoDong.sevenKfArr.push(v);
            }
            else {
                for (var i = 0; i < Model_HuoDong.sevenKfArr.length; i++) {
                    if (Model_HuoDong.sevenKfArr[i].id == v.id) {
                        Model_HuoDong.sevenKfArr[i].status = v.status;
                        break;
                    }
                }
            }
        }
        GGlobal.control.notify(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI);
    };
    /**打开ui I:今日充值x元B:期数B:达标次数B:今日奖励领取情况[B:大奖奖励序号B:大奖励状态]*/
    Model_HuoDong.prototype.GC_SEVEN_ACT_UI = function (self, data) {
        Model_HuoDong.sevenKf = data.readInt();
        Model_HuoDong.sevenQs = data.readByte();
        Model_HuoDong.sevenKfCount = data.readByte();
        Model_HuoDong.sevenKfStatus = data.readByte();
        var len = data.readShort();
        Model_HuoDong.sevenKfArr = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.readMsg(data);
            Model_HuoDong.sevenKfArr.push(v);
        }
        GGlobal.control.notify(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI);
    };
    /**连续累充 奖励发生变化（红点更新） B:奖励序号B:奖励状态*/
    // private GC_SEVEN_ACT_GET(self: Model_HuoDong, data: BaseBytes): void {
    // 	let $v: Vo_HuoDong = new Vo_HuoDong();
    // 	$v.readMsg(data);
    // 	if ($v.id != 0) {
    // 		if (Model_HuoDong.sevenActArr.length == 0) {
    // 			Model_HuoDong.sevenActArr.push($v);
    // 		} else {
    // 			for (let i = 0; i < Model_HuoDong.sevenActArr.length; i++) {
    // 				let v = Model_HuoDong.sevenActArr[i]
    // 				if (v.id == $v.id) {
    // 					v.status = $v.status;
    // 					break;
    // 				}
    // 			}
    // 		}
    // 		GGlobal.control.notify(Enum_MsgType.HUODONG_SEVEN_ACT_OPENUI);
    // 	}
    // }
    /**发生变化 B:累计次数变化B:奖励序号B:奖励状态*/
    // private GC_SEVEN_ACT_UP(self: Model_HuoDong, data: BaseBytes): void {
    // 	Model_HuoDong.sevenActCount = data.readByte();
    // 	let v: Vo_HuoDong = new Vo_HuoDong();
    // 	v.readMsg(data);
    // 	if (v.id != 0) {
    // 		if (Model_HuoDong.sevenActArr.length == 0) {
    // 			Model_HuoDong.sevenActArr.push(v);
    // 		} else {
    // 			for (let i = 0; i < Model_HuoDong.sevenActArr.length; i++) {
    // 				if (Model_HuoDong.sevenActArr[i].id == v.id) {
    // 					Model_HuoDong.sevenActArr[i].status = v.status
    // 					break;
    // 				}
    // 			}
    // 		}
    // 	}
    // 	GGlobal.control.notify(Enum_MsgType.HUODONG_SEVEN_ACT_OPENUI);
    // }
    Model_HuoDong.isNotice = function (arr) {
        if (!arr) {
            return false;
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == 1) {
                return true;
            }
        }
        return false;
    };
    Model_HuoDong.isVoNotice = function (arr) {
        if (!arr) {
            return false;
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].status == 1) {
                return true;
            }
        }
        return false;
    };
    Model_HuoDong.isCtNotice = function (arr) {
        if (!arr) {
            return false;
        }
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].canCt > arr[i].hasCt) {
                return true;
            }
        }
        return false;
    };
    Model_HuoDong.sortFuc = function (a, b) {
        return a.id - b.id;
    };
    Model_HuoDong.getListData = function (arr) {
        var len = arr ? arr.length : 0;
        if (arr)
            arr.sort(Model_HuoDong.sortFuc);
        var arr1 = []; //可领取
        var arr2 = []; //不能领取
        var arr3 = []; //已领取
        for (var i = 0; i < len; i++) {
            var $status = arr ? arr[i].status : 0;
            if ($status == 1) {
                arr1.push(arr[i]);
            }
            else if ($status == 2) {
                arr3.push(arr[i]);
            }
            else {
                arr2.push(arr[i]);
            }
        }
        return arr1.concat(arr2).concat(arr3);
    };
    Model_HuoDong.TYPE = 4501;
    //登录豪礼
    Model_HuoDong.dailyGiftArr = [];
    //登录豪礼-新-活动
    Model_HuoDong.daiGiftActArr = [];
    //登录豪礼-新-开服
    Model_HuoDong.daiGiftKfArr = [];
    //单笔充值
    Model_HuoDong.dailyOneArr = [];
    //单笔充值-新-活动
    Model_HuoDong.daiOneActArr = [];
    // public static daiOneActQs: number;//期数
    //单笔充值-新-开服
    Model_HuoDong.daiOneKfArr = [];
    // public static daiOneKfQs: number;//期数
    //单日累冲
    Model_HuoDong.dailyAddUp = 0;
    Model_HuoDong.dailyAddUpArr = [];
    //单日累冲-新-活动
    Model_HuoDong.daiAddAct = 0;
    Model_HuoDong.daiAddActArr = [];
    // public static daiAddActQs: number;//期数
    //单日累冲-新-开服
    Model_HuoDong.daiAddKf = 0;
    Model_HuoDong.daiAddKfArr = [];
    // public static daiAddKfQs: number;//期数
    //累计充值
    Model_HuoDong.addRecharge = 0;
    Model_HuoDong.addRechargeArr = [];
    //开服7天连续充值
    Model_HuoDong.sevenKf = 0; //今天充值
    Model_HuoDong.sevenKfCount = 0; //已经充值天数
    Model_HuoDong.sevenKfStatus = 0; //今天领取状态
    Model_HuoDong.sevenQs = 0; //期数
    Model_HuoDong.sevenKfArr = [];
    return Model_HuoDong;
}(BaseModel));
__reflect(Model_HuoDong.prototype, "Model_HuoDong");
