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
var Model_ActCom = (function (_super) {
    __extends(Model_ActCom, _super);
    function Model_ActCom() {
        var _this = _super.call(this) || this;
        _this.zpArr = [];
        _this.zpPos = 0;
        //单笔 =======================
        _this.single_data = [];
        _this.single_logData = [];
        _this.single_key = 0;
        _this.single_zpPos = 2;
        _this._hasRun = 0;
        _this.xfzpArr = [];
        _this.xfzpPos = 0;
        //==============限时抢购================
        _this.limBuyObj = {};
        _this.limBuyQS = 0;
        _this.forgeNum = 0; //打造次数
        _this.treasure = 0; //寻宝次数
        _this.actId = 0;
        _this.rechargeNum = 0;
        _this.taskObj = {};
        _this.dsslRecharge = 0;
        _this.giftReach = 0;
        _this.dashenReach = 0;
        _this.giftObj = {};
        _this.dashenObj = {};
        _this.numArr = [];
        //==============================天降豪礼
        _this.tianJiangHl_data = [];
        _this.tianJiangHl_rechargeValue = 0;
        //==============================天降豪礼
        //==============================至尊秘宝
        _this.zzmb_data = [];
        _this.zzmbcount = 0;
        return _this;
    }
    /** 注册 WEBSOCKET HANLDER 函数*/
    Model_ActCom.prototype.listenServ = function (wsm) {
        var a = this;
        a.socket = wsm;
        //充值转盘
        wsm.regHand(8492, a.GC_CHONG_ZHI_ZP_UI, a);
        wsm.regHand(8494, a.GC_CHONG_ZHI_ZP_TURN, a);
        //单笔转盘
        wsm.regHand(8472, a.GC_OPEN_SINGLE, a);
        wsm.regHand(8474, a.GC_GET_SINGLE, a);
        wsm.regHand(8476, a.GC_TURN_SINGLE, a);
        wsm.regHand(8478, a.GC_LOG_SINGLE, a);
        //消费转盘
        wsm.regHand(8570, a.GC_XFZP_UI, a);
        wsm.regHand(8572, a.GC_XFZP_TURN, a);
        //限时抢购
        wsm.regHand(8672, a.GC_BUY_LIMIT_UI, a);
        wsm.regHand(8674, a.GC_BUY_LIMIT_BUY, a);
        //神兵折扣
        wsm.regHand(8742, a.GC_SBZK_OPENUI, a);
        //神将折扣
        wsm.regHand(9460, a.GC_SJZK_OPENUI, a);
        //合服活动-充值返利
        wsm.regHand(9520, a.GC_CZFL_OPENUI, a);
        wsm.regHand(9522, a.GC_CZFL_GETREWARD, a);
        wsm.regHand(9524, a.GC_CZFL_NUMCHARGE, a);
        wsm.regHand(9600, a.GC_DSSL_OPENUI, a);
        wsm.regHand(9602, a.GC_DSSL_GETREWARD, a);
        //天降好礼
        wsm.regHand(11670, a.GC_TJHL_DATA, a);
        wsm.regHand(11672, a.GC_TJHL_DATA_GETAWARDS, a);
        //至尊秘宝
        wsm.regHand(11700, a.GC_ZZMB_DATA, a);
        wsm.regHand(11702, a.GC_ZZMB_GETAWARDS, a);
        wsm.regHand(11704, a.GC_ZZMB_RESET, a);
    };
    Model_ActCom.prototype.checkNoticeChongZhi = function () {
        var isNotice = this.zpHaveCt > 0;
        var r = GGlobal.reddot;
        r.setCondition(UIConst.ACTCOM_CZZP, 0, isNotice);
        r.notify(UIConst.ACTCOM);
    };
    /**返回界面信息 I:当前充值数I:已转次数I:可抽次数[B:转盘位置idB:领取状态（0：未抽中，1：已抽中）]转盘数据*/
    Model_ActCom.prototype.GC_CHONG_ZHI_ZP_UI = function (s, data) {
        s.zpCharge = data.readInt();
        s.zpNoCt = data.readInt();
        s.zpHaveCt = data.readInt();
        s.zpArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.readMsgInt(data);
            s.zpArr.push(v);
        }
        GGlobal.control.notify(Enum_MsgType.ACTCOM_CZZP);
        s.checkNoticeChongZhi();
    };
    /**充值转盘 目标奖励*/
    Model_ActCom.prototype.CG_CHONG_ZHI_ZP_TURN = function () {
        if (this.zpHaveCt <= 0) {
            ViewCommonWarn.text("没有抽奖次数");
            return;
        }
        var ba = new BaseBytes();
        this.sendSocket(8493, ba);
    };
    /**抽奖结果 B:结果：0：失败，1：成功I:失败：（1:没次数，2：全部抽完），成功：抽中位置id*/
    Model_ActCom.prototype.GC_CHONG_ZHI_ZP_TURN = function (s, data) {
        var res = data.readByte();
        var pos = data.readInt();
        if (res == 1) {
            s.zpHaveCt--;
            s.zpPos = pos;
            for (var i = 0; i < s.zpArr.length; i++) {
                var v = s.zpArr[i];
                if (v.id == pos) {
                    v.status = 1;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.ACTCOM_CZZP_TURN);
            s.checkNoticeChongZhi();
            setTimeout(function () {
                GGlobal.layerMgr.open(UIConst.ACTCOM_CZZP_SHOW, pos);
            }, 1200);
        }
        else {
            ViewCommonWarn.text("抽奖失败");
        }
    };
    Model_ActCom.prototype.checkNoticeSingle = function () {
        var m = this;
        var data = m.single_data;
        var len = data.length;
        var isNotice = false;
        for (var i = 0; i < len; i++) {
            if (data[i].st == 1) {
                isNotice = true;
                break;
            }
        }
        if (!isNotice)
            isNotice = this.single_key > 0;
        GGlobal.reddot.setCondition(UIConst.ACTCOM_DBZP, 0, isNotice);
        GGlobal.reddot.notify(UIConst.ACTCOM);
    };
    /**单笔充值======================================*/
    Model_ActCom.prototype.CG_GET_SINGLE = function (id) {
        var ba = this.getBytes();
        ba.writeInt(id);
        this.sendSocket(8473, ba);
    };
    Model_ActCom.prototype.CG_TURN_SINGLE = function () {
        var ba = this.getBytes();
        this.sendSocket(8475, ba);
        this._hasRun = 1;
    };
    Model_ActCom.prototype.CG_LOG_SINGLE = function () {
        var ba = this.getBytes();
        this.sendSocket(8477, ba);
    };
    /**5642   [I-B-I-I]-I
     *打开界面返回 [I:索引idB:奖励状态，0:未达到，1:可领取，2:已领完I:背包中该钥匙数量I:玩家累计获得该钥匙数量]钥匙列表I:背包中钥匙总数
    */
    Model_ActCom.prototype.GC_OPEN_SINGLE = function (m, ba) {
        m.single_data = [];
        var len = ba.readShort();
        for (var i = 0; i < len; i++) {
            var opt = {};
            opt.id = ba.readInt();
            opt.st = ba.readByte();
            opt.count = ba.readInt();
            opt.maxCount = ba.readInt();
            m.single_data.push(opt);
        }
        m.single_key = ba.readInt();
        m.single_data.sort(m.sortBySt);
        m.checkNoticeSingle();
        GGlobal.control.notify(Enum_MsgType.ACTCOM_SINGLE);
    };
    /**5644   B-I-I-B
     *领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领完I:领取的奖励idI:背包中该钥匙数量B:对应的奖励是否可领取，0:不可领，2:可领
    */
    Model_ActCom.prototype.GC_GET_SINGLE = function (m, ba) {
        var data = m.single_data;
        var len = data.length;
        var ret = ba.readByte();
        var id = ba.readInt();
        var count = ba.readInt();
        var st = ba.readByte();
        if (ret == 1) {
            m.single_key++;
            for (var i = 0; i < len; i++) {
                var opt = data[i];
                if (opt.id == id) {
                    opt.st = st;
                    opt.count = count;
                    opt.maxCount++;
                    break;
                }
            }
            m.single_data.sort(m.sortBySt);
            m.checkNoticeSingle();
            GGlobal.control.notify(Enum_MsgType.ACTCOM_SINGLE);
        }
        ViewCommonWarn.text(["没有该奖励", "领取成功", "未达到条件", "已领取"][ret]);
    };
    /**5646  B-I-I-I-I
     *转盘返回 B:状态，1：成功，2：钥匙不足I:抽奖抽到的倍数I:剩余钥匙总数量I:消耗的对应索引idI:背包中该钥匙数量
    */
    Model_ActCom.prototype.GC_TURN_SINGLE = function (m, ba) {
        var ret = ba.readByte();
        if (ret == 2)
            ViewCommonWarn.text("钥匙不足");
        var cfgid = ba.readInt();
        m.single_key = ba.readInt();
        var id = ba.readInt();
        var count = ba.readInt();
        m.single_zpPos = cfgid;
        var obj = {};
        obj.cfgid = cfgid;
        obj.ret = ret;
        obj.id = id;
        var data = m.single_data;
        var len = data.length;
        for (var i = 0; i < len; i++) {
            var opt = data[i];
            if (opt.id == id) {
                opt.count = count;
                break;
            }
        }
        GGlobal.control.notify(Enum_MsgType.ACTCOM_SINGLE_TURN, obj);
    };
    /**5648  [I-I]
     *打开记录界面返回 [I:消耗奖励索引idI:倍数]记录列表
    */
    Model_ActCom.prototype.GC_LOG_SINGLE = function (m, ba) {
        var data = [];
        var len = ba.readShort();
        for (var i = 0; i < len; i++) {
            data.push([ba.readInt(), ba.readInt()]);
        }
        m.single_logData = data;
        GGlobal.control.notify(Enum_MsgType.ACTCOM_SINGLE_LOG);
    };
    Model_ActCom.prototype.sortBySt = function (a, b) {
        var st1 = a.st == 1 ? -1 : a.st;
        var st2 = b.st == 1 ? -1 : b.st;
        if (st1 == st2) {
            return a.id < b.id ? -1 : 1;
        }
        return st1 > st2 ? 1 : -1;
    };
    Model_ActCom.prototype.checkNoticeXFZP = function () {
        var isNotice = this.xfzpHaveCt > 0;
        var r = GGlobal.reddot;
        r.setCondition(UIConst.ACTCOM_XFZP, 0, isNotice);
        r.notify(UIConst.ACTCOM);
    };
    /**返回界面信息 I:消费元宝数量I:当前档次，为消费转盘消费表id，没有则为0I:已转盘次数[I:消费转盘消费表idI:位置，从0开始B:状态（0未抽中 1已抽中）]转盘列表*/
    Model_ActCom.prototype.GC_XFZP_UI = function (s, data) {
        s.xfzpCharge = data.readInt();
        var id = data.readInt();
        var ct = Config.xhdxfzpxf_316[id] ? Config.xhdxfzpxf_316[id].times : 0;
        s.xfzpNoCt = data.readInt();
        s.xfzpHaveCt = ct - s.xfzpNoCt;
        if (s.xfzpHaveCt < 0) {
            s.xfzpHaveCt = 0;
        }
        s.xfzpArr = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var v = new Vo_HuoDong();
            v.readMsgInt(data);
            s.xfzpArr.push(v);
        }
        GGlobal.control.notify(Enum_MsgType.ACTCOM_XFZP);
        s.checkNoticeXFZP();
    };
    /**充值转盘 目标奖励*/
    Model_ActCom.prototype.CG_XFZP_TURN = function () {
        if (this.xfzpHaveCt <= 0) {
            ViewCommonWarn.text("没有抽奖次数");
            return;
        }
        var ba = new BaseBytes();
        this.sendSocket(8571, ba);
    };
    /**抽奖结果 B:结果：0：失败，1：成功I:失败：（1:没次数，2：全部抽完），成功：抽中位置id*/
    Model_ActCom.prototype.GC_XFZP_TURN = function (s, data) {
        var res = data.readByte();
        var pos = data.readInt();
        if (res == 1) {
            s.xfzpHaveCt--;
            s.xfzpPos = pos;
            for (var i = 0; i < s.xfzpArr.length; i++) {
                var v = s.xfzpArr[i];
                if (v.id == pos) {
                    v.status = 1;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.ACTCOM_XFZP_TURN);
            s.checkNoticeXFZP();
            setTimeout(function () {
                GGlobal.layerMgr.open(UIConst.ACTCOM_XFZP_SHOW, pos);
            }, 1200);
        }
        else {
            ViewCommonWarn.text("抽奖失败");
        }
    };
    //红点
    Model_ActCom.prototype.checkLimitBuy = function () {
        var r = GGlobal.reddot;
        var s = this;
        var boo = false;
        if (s.limBuyQS == 0)
            return;
        var arr = s.getBuyLimitCfg(s.limBuyQS);
        var openArr = null;
        var tabHor = arr[0][0].opentime;
        var h = new Date(Model_GlobalMsg.getServerTime()).getHours();
        for (var i = 0; i < arr.length; i++) {
            var opT = arr[i][0].opentime;
            if (opT < h) {
                continue;
            }
            if (opT == h) {
                tabHor = opT;
                openArr = arr[i];
                break;
            }
        }
        if (openArr && openArr.length > 0) {
            for (var i = 0; i < openArr.length; i++) {
                var cfg = openArr[i];
                // let moneyArr = JSON.parse(cfg.money)
                // if (Model_player.voMine.yuanbao < Number(moneyArr[0][2])) {
                // 	continue;
                // }
                var v = s.limBuyObj[cfg.ID];
                if ((v.buyCt < cfg.time || cfg.time == 0) && (v.lasCt > 0 || cfg.max == 0)) {
                    boo = true;
                    break;
                }
            }
        }
        r.setCondition(UIConst.ACTCOM_BUYLIMIT, 0, boo);
        r.notify(UIConst.ACTCOM);
    };
    //打开限时抢购界面返回抢购中和已结束数据 [I:抢购ID B:已购买次数 I:剩余次数 ]抢购信息I:期数
    Model_ActCom.prototype.GC_BUY_LIMIT_UI = function (s, data) {
        var len = data.readShort();
        s.limBuyObj = {};
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var buyCt = data.readByte();
            var lasCt = data.readInt();
            s.limBuyObj[id] = { id: id, buyCt: buyCt, lasCt: lasCt };
        }
        s.limBuyQS = data.readInt();
        GGlobal.control.notify(Enum_MsgType.ACTCOM_LIMIT_BUY);
        s.checkLimitBuy();
    };
    /**立即抢购 I:抢购ID*/
    Model_ActCom.prototype.CG_BUY_LIMIT_BUY = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(8673, ba);
    };
    //返回立即抢购信息 B:状态：0.即将开启或已结束 1.成功 2.限购次数已满 3.没有剩余次数 4元宝不足 5参数错误 6背包已满I:抢购ID B:已购买次数 I:剩余次数
    Model_ActCom.prototype.GC_BUY_LIMIT_BUY = function (s, data) {
        var res = data.readByte();
        var id = data.readInt();
        var buyCt = data.readByte();
        var lasCt = data.readInt();
        if (res == 1) {
            var v = s.limBuyObj[id];
            if (v) {
                v.buyCt = buyCt;
                v.lasCt = lasCt;
            }
            else {
                s.limBuyObj[id] = { id: id, buyCt: buyCt, lasCt: lasCt };
            }
            GGlobal.control.notify(Enum_MsgType.ACTCOM_LIMIT_BUY);
            s.checkLimitBuy();
        }
        else {
            var arr = ["即将开启或已结束", "", "限购次数已满", "没有剩余次数", "元宝不足", "参数错误", "背包已满"];
            ViewCommonWarn.text(arr[res]);
            if (res == 3) {
                var v = s.limBuyObj[id];
                if (v) {
                    v.lasCt = 0;
                    GGlobal.control.notify(Enum_MsgType.ACTCOM_LIMIT_BUY);
                }
            }
        }
    };
    Model_ActCom.prototype.getBuyLimitCfg = function (qs) {
        if (this._buyLimitCfg == null) {
            this._buyLimitCfg = {};
            var startT = 0;
            for (var keys in Config.xhdxsqg_403) {
                var v = Config.xhdxsqg_403[keys];
                if (this._buyLimitCfg[v.qx] == null) {
                    this._buyLimitCfg[v.qx] = [];
                    startT = v.opentime;
                }
                var index = v.opentime - startT;
                if (this._buyLimitCfg[v.qx][index] == null) {
                    this._buyLimitCfg[v.qx][index] = [];
                }
                this._buyLimitCfg[v.qx][index].push(v);
            }
        }
        return this._buyLimitCfg[qs];
    };
    /**打开神兵折扣界面返回 I:活动期间打造次数*/
    Model_ActCom.prototype.GC_SBZK_OPENUI = function (s, data) {
        s.forgeNum = data.readInt();
        GGlobal.control.notify(UIConst.ACTCOM_SBZK);
    };
    /**打开界面返回 I:寻宝次数*/
    Model_ActCom.prototype.GC_SJZK_OPENUI = function (s, data) {
        s.treasure = data.readInt();
        GGlobal.control.notify(UIConst.ACTCOM_SJZK);
    };
    /**
     * 根据期数和系统id获取通用排名表
     */
    Model_ActCom.prototype.getRankCfgs = function (qs, xtid) {
        var arr = [];
        for (var keys in Config.wszwxsxspm_325) {
            var cfg = Config.wszwxsxspm_325[keys];
            if (cfg.qs == qs && cfg.xtid == xtid) {
                arr.push(cfg);
            }
        }
        return arr;
    };
    //==============合服活动================
    Model_ActCom.prototype.checkNoticeCZFL = function () {
        var isNotice = false;
        for (var key in GGlobal.model_actCom.taskObj) {
            var obj = GGlobal.model_actCom.taskObj[key];
            if (obj.status == 1) {
                isNotice = true;
            }
        }
        var r = GGlobal.reddot;
        r.setCondition(UIConst.HFKH_CZFL, 0, isNotice);
        r.notify(UIConst.ACTCOM);
    };
    Model_ActCom.prototype.checkNoticeDDSL = function () {
        var isNotice = false;
        for (var key in GGlobal.model_actCom.giftObj) {
            var obj = GGlobal.model_actCom.giftObj[key];
            if (obj.status == 1) {
                isNotice = true;
                break;
            }
        }
        if (!isNotice) {
            for (var key in GGlobal.model_actCom.dashenObj) {
                var obj = GGlobal.model_actCom.dashenObj[key];
                if (obj.num > 0) {
                    isNotice = true;
                    break;
                }
            }
        }
        var r = GGlobal.reddot;
        r.setCondition(UIConst.HFKH_DSSL, 0, isNotice);
        r.notify(UIConst.ACTCOM);
    };
    /**9521 获取奖励 I:奖励序号*/
    Model_ActCom.prototype.CG_CZFL_GETREWARD = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(9521, ba);
    };
    /**9601 获取奖励 I:奖励编号*/
    Model_ActCom.prototype.CG_DSSL_GETREWARD = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(9601, ba);
    };
    /**9520 打开ui返回 I:活动idI:充值总金额[I:任务idI:任务完成数量B:任务奖励领取情况 0不可领取 1可以领取 2已经领取]*/
    Model_ActCom.prototype.GC_CZFL_OPENUI = function (s, data) {
        s.actId = data.readInt();
        s.rechargeNum = data.readInt();
        s.taskObj = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var num = data.readInt();
            var status_1 = data.readByte();
            s.taskObj[id] = { id: id, num: num, status: status_1 };
        }
        GGlobal.control.notify(UIConst.HFKH_CZFL);
    };
    /**9522 奖励状态发生变化 I:任务idB:任务状态*/
    Model_ActCom.prototype.GC_CZFL_GETREWARD = function (s, data) {
        var id = data.readInt();
        var status = data.readByte();
        var v = s.taskObj[id];
        if (v) {
            v.status = status;
        }
        GGlobal.control.notify(UIConst.HFKH_CZFL);
    };
    /**9524 任务完成数量变化 I:任务idI:任务数量B:对应奖励变化0不可领取 1可以领取 2已经领取 */
    Model_ActCom.prototype.GC_CZFL_NUMCHARGE = function (s, data) {
        var id = data.readInt();
        var num = data.readInt();
        var status = data.readByte();
        var v = s.taskObj[id];
        if (v) {
            v.num = num;
            v.status = status;
        }
        GGlobal.control.notify(UIConst.HFKH_CZFL);
        s.checkNoticeCZFL();
    };
    /**9600 打开ui返回 I:充值金额I:vip礼包达标人数I:大神礼包达标人数[I:vip礼包序号B:奖励状态 0不能领取1可以领取 2已经领取][I:大神礼包序号I:可领取数量][I:档次id 序号十位以上I:达标人数] */
    Model_ActCom.prototype.GC_DSSL_OPENUI = function (s, data) {
        s.numArr = [];
        s.dsslRecharge = data.readInt();
        s.giftReach = data.readInt();
        s.dashenReach = data.readInt();
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var status_2 = data.readByte();
            s.giftObj[id] = { id: id, status: status_2 };
        }
        len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var num = data.readInt();
            s.dashenObj[id] = { id: id, num: num };
        }
        len = data.readShort();
        for (var i = 0; i < len; i++) {
            var id = data.readInt();
            var num = data.readInt();
            var obj = { id: id, num: num };
            s.numArr.push(obj);
        }
        GGlobal.control.notify(UIConst.HFKH_DSSL);
    };
    /**9602 CG 获取奖励 B:成功失败 0成功1 失败I:奖励编号I:奖励状态或者剩余数量*/
    Model_ActCom.prototype.GC_DSSL_GETREWARD = function (s, data) {
        var res = data.readByte();
        if (res == 0) {
            var id = data.readInt();
            var status_3 = data.readInt();
            var gift = s.giftObj[id];
            if (gift) {
                gift.status = status_3;
            }
            var dashen = s.dashenObj[id];
            if (dashen) {
                dashen.num = status_3;
            }
        }
        GGlobal.control.notify(UIConst.HFKH_DSSL);
        s.checkNoticeDDSL();
    };
    Model_ActCom.sortFuc = function (a, b) {
        return a.id - b.id;
    };
    Model_ActCom.getListData = function (arr) {
        var len = arr ? arr.length : 0;
        if (arr)
            arr.sort(Model_ActCom.sortFuc);
        var arr1 = []; //可领取
        var arr2 = []; //不能领取
        var arr3 = []; //已领取
        for (var i = 0; i < len; i++) {
            var status_4 = arr ? arr[i].status : 0;
            if (status_4 == 1) {
                arr1.push(arr[i]);
            }
            else if (status_4 == 2) {
                arr3.push(arr[i]);
            }
            else {
                arr2.push(arr[i]);
            }
        }
        return arr1.concat(arr2).concat(arr3);
    };
    /**返回界面信息 I:已充值额度[I:奖励项id]已领取奖励*/
    Model_ActCom.prototype.GC_TJHL_DATA = function (s, data) {
        s.tianJiangHl_rechargeValue = data.readInt();
        var len = data.readShort();
        s.tianJiangHl_data = [];
        for (var i = 0; i < len; i++) {
            s.tianJiangHl_data.push(data.readInt());
        }
        s.notifyGlobal(UIConst.ACTCOM_TIANJIANGHL);
    };
    Model_ActCom.prototype.CG_TJHL_DATA_GETAWARDS = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(11671, ba);
    };
    /**领取奖励结果 B:结果：0：失败，1：成功I:失败：（1：充值未达标，2：已领取），成功：奖励项id*/
    Model_ActCom.prototype.GC_TJHL_DATA_GETAWARDS = function (s, data) {
        var ret = data.readByte();
        if (ret == 1) {
            s.tianJiangHl_data.push(data.readInt());
            s.notifyGlobal(UIConst.ACTCOM_TIANJIANGHL);
        }
        else {
            s.warn("领取失败");
        }
    };
    /**返回界面信息 [B:序号I:道具类型I:道具idI:道具数量I:奖励剩余份数]抽奖物品数据I:已抽次数*/
    Model_ActCom.prototype.GC_ZZMB_DATA = function (s, data) {
        var len = data.readShort();
        s.zzmb_data = [];
        for (var i = 0; i < len; i++) {
            s.zzmb_data.push([data.readByte(), data.readInt(), data.readInt(), data.readInt(), data.readInt(), data.readByte()]);
        }
        s.zzmbcount = data.readInt();
        s.notifyGlobal(UIConst.ACTCOMzzmb);
    };
    /**抽奖结果 B:结果：0：失败，1：成功B:失败：（1：道具不足，2：已无秘宝请重置），成功：序号I:道具类型I:道具idI:道具数量*/
    Model_ActCom.prototype.GC_ZZMB_GETAWARDS = function (s, data) {
        var ret = data.readByte();
        var retType = data.readByte();
        if (ret == 1) {
            s.zzmbcount++;
            var len = s.zzmb_data.length;
            var items = [data.readInt(), data.readInt(), data.readInt()];
            for (var i = 0; i < len; i++) {
                if (s.zzmb_data[i][0] == retType) {
                    var count_1 = s.zzmb_data[i][4] - 1;
                    var big = s.zzmb_data[i][5];
                    s.zzmb_data[i] = [retType, items[0], items[1], items[2], count_1, big];
                    break;
                }
            }
            s.notifyGlobal(UIConst.ACTCOMzzmb);
            var count = s.zzmbcount + 1;
            var config = Config.zzmbxh_503[count];
            if (!config) {
                config = Config.zzmbxh_503[1];
            }
            var itemCost = JSON.parse(config.consume);
            View_Reward_Show2.show(UIConst.ACTCOM, 9999, Handler.create(s, s.CG_ZZMB_GETAWARDS), [ConfigHelp.makeItem(items)], itemCost[0][2], 0, itemCost[0][1]);
        }
        else {
            if (retType == 1) {
                s.warn("道具不足");
            }
            else if (retType == 2) {
                s.warn("已无秘宝请重置");
            }
        }
        s.notifyGlobal(UIConst.ACTCOMzzmb);
    };
    /**重置结果 B:结果：0：失败，1：成功B:失败（1：道具不足）*/
    Model_ActCom.prototype.GC_ZZMB_RESET = function (s, data) {
        var ret = data.readByte();
        var retType = data.readByte();
        if (ret == 1) {
            s.warn("重置成功");
            s.notifyGlobal(UIConst.ACTCOMzzmb, 1);
        }
        else {
            if (retType == 1) {
                s.warn("道具不足");
            }
        }
    };
    Model_ActCom.prototype.CG_ZZMB_GETAWARDS = function () {
        var ba = new BaseBytes();
        this.sendSocket(11701, ba);
    };
    Model_ActCom.prototype.CG_ZZMB_RESET = function () {
        var ba = new BaseBytes();
        this.sendSocket(11703, ba);
    };
    return Model_ActCom;
}(BaseModel));
__reflect(Model_ActCom.prototype, "Model_ActCom");
