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
var Model_ActivityHall = (function (_super) {
    __extends(Model_ActivityHall, _super);
    function Model_ActivityHall() {
        var _this = _super.call(this) || this;
        _this.mvpDic = {};
        //=================隆中对
        _this.lzd_st = 0; //0：活动未开始，1：开始答题，2：答题中，3：答题超时，4：答题结束
        _this.lzd_remain = 0;
        _this.lzd_pro = 0;
        _this.lzd_id = 0;
        _this.lzd_lastId = 0;
        _this.lzd_X = 0;
        _this.lzd_rank = 0;
        _this.lzd_score = 0;
        _this.lzd_data = [1, 2, 3, 4];
        /**1983
         * 答题 B:答案id，0：答题超时
        */
        _this.curAnswerID = -1;
        _this.cbg_log = [];
        _this.cbg_qs = 0; //藏宝阁期数
        _this.cbgEndT = 0; //藏宝阁倒计时
        _this.cbgRankArr = [];
        _this.cbgMbArr = [];
        _this.cbgRankQs = 0; //藏宝阁 排行榜期数
        _this.cbgRankLastArr = [];
        _this.cbgMyLastRank = 0;
        _this.cbgMyLastCt = 0;
        _this.cbgRankLastQs = 0; //藏宝阁 排行榜期数
        return _this;
    }
    Model_ActivityHall.prototype.getMVp = function (id) {
        var ret = '';
        if (this.mvpDic[id]) {
            ret = this.mvpDic[id];
        }
        return ret;
    };
    Model_ActivityHall.prototype.checkNotice = function (val) {
        var sf = this;
        var red = GGlobal.reddot;
        var ret;
        switch (val) {
            case UIConst.FHLY:
                ret = red.checkCondition(val, 1);
                break;
            case UIConst.SHAOZHU_ESCORT:
                var bol0 = red.checkCondition(val, 0);
                var bol1 = red.checkCondition(val, 1);
                var bol2 = red.checkCondition(val, 2);
                if (bol0 || bol1 || bol2) {
                    ret = true;
                }
                else {
                    ret = false;
                }
                break;
            case UIConst.GCBZ:
                if (red.checkCondition(val, 0) || red.checkCondition(val, 1)) {
                    ret = true;
                }
                else {
                    ret = false;
                }
                break;
            default:
                ret = red.checkCondition(val);
                break;
        }
        return ret;
    };
    Model_ActivityHall.prototype.listenServ = function (mgr) {
        var s = this;
        s.socket = mgr;
        mgr.regHand(1980, s.GC_LZD_END_1980, s);
        mgr.regHand(1982, s.GC_OPEN_1982, s);
        mgr.regHand(1984, s.GC_ANSWER_1984, s);
        mgr.regHand(1986, s.GC_RANK_1986, s);
        //藏宝阁
        mgr.regHand(2732, s.GC_CBG_INFO_2732, s);
        mgr.regHand(2734, s.GC_CBG_CJ_2734, s);
        //藏宝阁 排行榜 系统
        mgr.regHand(4852, s.GC_CBG_RANK_4852, s);
        mgr.regHand(4854, s.GC_CBG_TARGET_4854, s);
        mgr.regHand(4856, s.GC_CBG_GET_4856, s);
        mgr.regHand(4858, s.GC_CBG_LAST_4858, s);
        //藏宝阁 排行榜 活动
        mgr.regHand(4872, s.GC_CBG_RANK_4852, s);
        mgr.regHand(4874, s.GC_CBG_TARGET_4854, s);
        mgr.regHand(4876, s.GC_CBG_GET_4856, s);
        mgr.regHand(4878, s.GC_CBG_LAST_4858, s);
        mgr.regHand(3752, s.GC_OPEN_ACTIVITYHALL, s);
    };
    Model_ActivityHall.prototype.CG_OPEN_ACTIVITYHALL = function () {
        this.sendSocket(3751, this.getBytes());
    };
    /**
     * 3752[I-U]
     * 返回活动大厅数据 [I:系统idU:上届MVP]活动大厅数据
    */
    Model_ActivityHall.prototype.GC_OPEN_ACTIVITYHALL = function (m, ba) {
        m.mvpDic = {};
        for (var i = 0, j = ba.readShort(); i < j; i++) {
            m.mvpDic[ba.readInt()] = ba.readUTF();
        }
        GGlobal.control.notify(UIConst.ACTIVITYHALL);
    };
    Model_ActivityHall.prototype.CG_OPEN_1981 = function () {
        this.sendSocket(1981, this.getBytes());
    };
    /**1982 B-I-I-I-I-I-I-I-I-I
     * 打开答题界面返回 B:状态，0：活动未开始，1：开始答题，2：答题中，3：答题超时，4：答题结束
     * I:答题倒计时I:答题进度I:题目idI:答案1I:答案2I:答案3I:答案4I:我的得分I:我的排名，0：未上榜
    */
    Model_ActivityHall.prototype.GC_OPEN_1982 = function (s, d) {
        s.lzd_st = d.readByte();
        var t = d.readInt();
        s.lzd_pro = d.readInt();
        s.lzd_id = d.readInt();
        s.lzd_data = [d.readInt(), d.readInt(), d.readInt(), d.readInt()];
        s.lzd_score = d.readInt();
        s.lzd_rank = d.readInt();
        s.lzd_remain = t * 1000 + Model_GlobalMsg.getServerTime();
        GGlobal.control.notify(Enum_MsgType.LZD_OPEN);
    };
    Model_ActivityHall.prototype.CG_ANSWER_1983 = function (i) {
        if (this.lzd_id == this.lzd_lastId)
            return;
        this.lzd_lastId = this.lzd_id;
        this.curAnswerID = i;
        var ba = this.getBytes();
        ba.writeByte(i);
        this.sendSocket(1983, ba);
    };
    /**1984 B-I
     * 答题返回 B:题目判断，0：错误，1：正确I:增加积分
    */
    Model_ActivityHall.prototype.GC_ANSWER_1984 = function (s, d) {
        GGlobal.control.notify(Enum_MsgType.LZD_RET);
        var r = d.readByte();
        var sc = d.readInt();
        s.lzd_score += sc;
        // s.CG_OPEN_1981();
        ViewLZDRet.showView([r, sc]);
    };
    Model_ActivityHall.prototype.CG_RANK_1985 = function () {
        this.sendSocket(1985, this.getBytes());
    };
    /**1986 	[U-I]
     * 答题排行返回 [U:玩家名字I:积分]排行
    */
    Model_ActivityHall.prototype.GC_RANK_1986 = function (s, d) {
        s.lzd_rankDta = [];
        var len = d.readShort();
        for (var i = 0; i < 10; i++) {
            if (i >= len) {
                s.lzd_rankDta.push(["虚位以待", 0]);
            }
            else {
                var name_1 = d.readUTF();
                if (Model_player.isMine(name_1))
                    s.lzd_rank = i + 1;
                s.lzd_rankDta.push([name_1, d.readInt()]);
            }
        }
        GGlobal.control.notify(Enum_MsgType.LZD_OPENRANK);
    };
    //活动结束打开排行榜界面
    Model_ActivityHall.prototype.GC_LZD_END_1980 = function (s, d) {
        if (GGlobal.layerMgr.isOpenView(UIConst.LONGZHONGDUI)) {
            GGlobal.layerMgr.open(UIConst.LZDRANK);
        }
    };
    Model_ActivityHall.prototype.CG_Answer_1987 = function () {
        this.sendSocket(1987, this.getBytes());
    };
    Model_ActivityHall.getCbg2Arr = function (qs) {
        if (Model_ActivityHall._cbg2Arr == null) {
            Model_ActivityHall._cbg2Arr = [];
            for (var keys in Config.cbg2_729) {
                var v = Config.cbg2_729[keys];
                if (Model_ActivityHall._cbg2Arr[v.qs - 1] == null) {
                    Model_ActivityHall._cbg2Arr[v.qs - 1] = [];
                }
                Model_ActivityHall._cbg2Arr[v.qs - 1].push(v);
            }
        }
        return Model_ActivityHall._cbg2Arr[qs - 1];
    };
    Model_ActivityHall.prototype.CG_CBG_INFO_2731 = function () {
        this.sendSocket(2731, this.getBytes());
    };
    /**
     * 2732 	I-B-B-[U-B-I-I]
     * 返回界面信息 I:幸运值B:免费抽奖次数B:首次十连抽（0：是，1：否）[U:玩家名B:类型I:道具idI:数量]抽奖公告列表
    */
    Model_ActivityHall.prototype.GC_CBG_INFO_2732 = function (s, d) {
        s.cbg_luckVal = d.readInt();
        s.freeCount = d.readByte();
        s.isfirst = d.readByte() == 0;
        s.cbg_qs = d.readByte();
        s.cbg_log = [];
        var len = d.readShort();
        var startIndex = len > 7 ? len - 8 : 0;
        for (var i = 0, j = len; i < j; i++) {
            var arr = [d.readUTF(), ConfigHelp.parseItemBa(d)];
            if (i >= startIndex) {
                s.cbg_log.push(arr);
            }
        }
        s.cbgEndT = d.readInt();
        var count = Model_Bag.getItemCount(410029);
        var r = s.freeCount > 0 || count > 0;
        GGlobal.reddot.setCondition(UIConst.CANGBAOGE, 0, r);
        GGlobal.reddot.notify(UIConst.CANGBAOGE);
        GGlobal.control.notify(UIConst.CANGBAOGE, { type: 1 });
    };
    /**
     * 2733 B
     * 抽奖 B:0：抽一次，1：抽10次
    */
    Model_ActivityHall.prototype.CG_CBG_CJ_2733 = function (tp) {
        var ba = this.getBytes();
        ba.writeByte(tp);
        this.sendSocket(2733, ba);
        Model_ActivityHall.type = tp;
    };
    /**2734
     * 	I-B-B-[B-I-I-B]
     *抽奖结果返回 I:幸运值B:免费次数B:首次十连抽（0：是，1：否）B:当前期数[B:类型I:道具idI:数量B:是否大奖（1：是，0：否）]获得物品
    */
    Model_ActivityHall.prototype.GC_CBG_CJ_2734 = function (s, d) {
        s.cbg_luckVal = d.readInt();
        s.freeCount = d.readByte();
        s.isfirst = d.readByte() == 0;
        s.cbg_qs = d.readByte();
        GGlobal.reddot.setCondition(UIConst.CANGBAOGE, 0, s.freeCount > 0);
        GGlobal.reddot.notify(UIConst.CANGBAOGE);
        var awards = [];
        for (var i = 0, j = d.readShort(); i < j; i++) {
            awards.push([d.readByte(), d.readInt(), d.readInt(), d.readByte()]);
        }
        GGlobal.control.notify(UIConst.CANGBAOGE, { type: 2, awards: awards });
        var vo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SJZK);
        if (vo) {
            if (Model_ActivityHall.type == 0) {
                GGlobal.model_actCom.treasure++;
            }
            else {
                GGlobal.model_actCom.treasure += 10;
            }
            GGlobal.control.notify(UIConst.ACTCOM_SJZK);
        }
    };
    //打开排名奖励界面
    Model_ActivityHall.prototype.CG_CBG_RANK_4851 = function () {
        var ba = this.getBytes();
        this.sendSocket(4851, ba);
    };
    //打开排名奖励界面
    Model_ActivityHall.prototype.CG_CBG_RANK_4871 = function () {
        var ba = this.getBytes();
        this.sendSocket(4871, ba);
    };
    //打开排名奖励返回 [I:排名U:玩家名称I:抽奖次数]排名奖励列表I:我的排名I:抽奖次数
    Model_ActivityHall.prototype.GC_CBG_RANK_4852 = function (s, d) {
        var len = d.readShort();
        s.cbgRankArr = [];
        for (var i = 0; i < len; i++) {
            var rank = d.readInt();
            var pName = d.readUTF();
            var ct = d.readInt();
            var v = { rank: rank, pName: pName, ct: ct };
            s.cbgRankArr.push(v);
        }
        s.cbgMyRank = d.readInt();
        s.cbgMyCt = d.readInt();
        s.cbgRankQs = d.readInt();
        GGlobal.control.notify(Enum_MsgType.CANGBAOGE_RANK);
    };
    Model_ActivityHall.prototype.CG_CBG_TARGET_4853 = function () {
        var ba = this.getBytes();
        this.sendSocket(4853, ba);
    };
    Model_ActivityHall.prototype.CG_CBG_TARGET_4873 = function () {
        var ba = this.getBytes();
        this.sendSocket(4873, ba);
    };
    //打开目标奖励界面返回 I:奖励配置表idB:奖励状态，1：可领取，2：已领取
    Model_ActivityHall.prototype.GC_CBG_TARGET_4854 = function (s, d) {
        var len = d.readShort();
        s.cbgMbArr = [];
        for (var i = 0; i < len; i++) {
            var v = { cfgId: d.readInt(), status: d.readByte() };
            s.cbgMbArr.push(v);
        }
        GGlobal.control.notify(Enum_MsgType.CANGBAOGE_RANK);
        var red = Model_ActivityHall.checkCbgRank();
        GGlobal.reddot.setCondition(UIConst.CANGBAOGE_RANK, 0, red);
        GGlobal.reddot.setCondition(UIConst.CANGBAOGE_RANK2, 0, red);
        GGlobal.reddot.notify(UIConst.CANGBAOGE_RANK);
    };
    //领取奖励 I:要领取的配置表奖励id
    Model_ActivityHall.prototype.CG_CBG_GET_4855 = function (id) {
        var ba = this.getBytes();
        ba.writeInt(id);
        this.sendSocket(4855, ba);
    };
    //领取奖励 I:要领取的配置表奖励id
    Model_ActivityHall.prototype.CG_CBG_GET_4875 = function (id) {
        var ba = this.getBytes();
        ba.writeInt(id);
        this.sendSocket(4875, ba);
    };
    //领取奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励id
    Model_ActivityHall.prototype.GC_CBG_GET_4856 = function (s, d) {
        var res = d.readByte();
        var id = d.readInt();
        if (res == 1) {
            for (var i = 0; i < s.cbgMbArr.length; i++) {
                if (s.cbgMbArr[i].cfgId == id) {
                    s.cbgMbArr[i].status = 2;
                    GGlobal.control.notify(Enum_MsgType.CANGBAOGE_RANK);
                    break;
                }
            }
            var red = Model_ActivityHall.checkCbgRank();
            GGlobal.reddot.setCondition(UIConst.CANGBAOGE_RANK, 0, red);
            GGlobal.reddot.setCondition(UIConst.CANGBAOGE_RANK2, 0, red);
            GGlobal.reddot.notify(UIConst.CANGBAOGE_RANK);
        }
        else {
            if (res == 0) {
                ViewCommonWarn.text("没有该奖励");
            }
            else if (res == 2) {
                ViewCommonWarn.text("未达到条件");
            }
            else if (res == 3) {
                ViewCommonWarn.text("已领取");
            }
            else {
                ViewCommonWarn.text("领取失败");
            }
        }
    };
    //打开上期排名界面
    Model_ActivityHall.prototype.CG_CBG_LAST_4857 = function () {
        var ba = this.getBytes();
        this.sendSocket(4857, ba);
    };
    //打开上期排名界面
    Model_ActivityHall.prototype.CG_CBG_LAST_4877 = function () {
        var ba = this.getBytes();
        this.sendSocket(4877, ba);
    };
    //打开上期排名界面返回 [I:排名U:玩家名称I:抽奖次数]上期排名奖励列表I:我的上期排名,没上排名则为0I:我的上期抽奖次数
    Model_ActivityHall.prototype.GC_CBG_LAST_4858 = function (s, d) {
        var len = d.readShort();
        s.cbgRankLastArr = [];
        for (var i = 0; i < len; i++) {
            var rank = d.readInt();
            var pName = d.readUTF();
            var ct = d.readInt();
            var v = { rank: rank, pName: pName, ct: ct };
            s.cbgRankLastArr.push(v);
        }
        s.cbgMyLastRank = d.readInt();
        s.cbgMyLastCt = d.readInt();
        s.cbgRankLastQs = d.readInt();
        GGlobal.control.notify(Enum_MsgType.CANGBAOGE_RANK);
    };
    Model_ActivityHall.getCbgCfg1 = function (qs, rank) {
        if (Model_ActivityHall._cbgCfg1 == null) {
            Model_ActivityHall._cbgCfg1 = {};
            for (var keys in Config.cbgrank1_729) {
                var cbgCfg = Config.cbgrank1_729[keys];
                if (Model_ActivityHall._cbgCfg1[cbgCfg.qs] == null) {
                    Model_ActivityHall._cbgCfg1[cbgCfg.qs] = {};
                }
                var arr = ConfigHelp.SplitStr(cbgCfg.rank);
                for (var j = Number(arr[0][0]); j <= Number(arr[0][1]); j++) {
                    Model_ActivityHall._cbgCfg1[cbgCfg.qs][j] = cbgCfg;
                }
            }
        }
        return Model_ActivityHall._cbgCfg1[qs] ? Model_ActivityHall._cbgCfg1[qs][rank] : null;
    };
    Model_ActivityHall.getCbgCfg2 = function (qs, rank) {
        if (Model_ActivityHall._cbgCfg2 == null) {
            Model_ActivityHall._cbgCfg2 = {};
            for (var keys in Config.cbgrank2_729) {
                var cbgCfg = Config.cbgrank2_729[keys];
                if (Model_ActivityHall._cbgCfg2[cbgCfg.qs] == null) {
                    Model_ActivityHall._cbgCfg2[cbgCfg.qs] = {};
                }
                var arr = ConfigHelp.SplitStr(cbgCfg.rank);
                for (var j = Number(arr[0][0]); j <= Number(arr[0][1]); j++) {
                    Model_ActivityHall._cbgCfg2[cbgCfg.qs][j] = cbgCfg;
                }
            }
        }
        return Model_ActivityHall._cbgCfg2[qs] ? Model_ActivityHall._cbgCfg2[qs][rank] : null;
    };
    // private static _cbgmbCfg1: any;
    // public static getCbgMbCfg1(qs: number): Icbgmb1_729[] {
    // 	if (Model_ActivityHall._cbgmbCfg1 == null) {
    // 		Model_ActivityHall._cbgmbCfg1 = {};
    // 		for (let keys in Config.cbgmb1_729) {
    // 			let llCfg = Config.cbgmb1_729[keys];
    // 			if (Model_ActivityHall._cbgmbCfg1[llCfg.qs] == null) {
    // 				Model_ActivityHall._cbgmbCfg1[llCfg.qs] = [];
    // 			}
    // 			Model_ActivityHall._cbgmbCfg1[llCfg.qs].push(llCfg);
    // 		}
    // 	}
    // 	return Model_ActivityHall._cbgmbCfg1[qs];
    // }
    // private static _cbgmbCfg2: any;
    // public static getCbgMbCfg2(qs: number): Icbgmb1_729[] {
    // 	if (Model_ActivityHall._cbgmbCfg2 == null) {
    // 		Model_ActivityHall._cbgmbCfg2 = {};
    // 		for (let keys in Config.cbgmb2_729) {
    // 			let llCfg = Config.cbgmb2_729[keys];
    // 			if (Model_ActivityHall._cbgmbCfg2[llCfg.qs] == null) {
    // 				Model_ActivityHall._cbgmbCfg2[llCfg.qs] = [];
    // 			}
    // 			Model_ActivityHall._cbgmbCfg2[llCfg.qs].push(llCfg);
    // 		}
    // 	}
    // 	return Model_ActivityHall._cbgmbCfg2[qs];
    // }
    Model_ActivityHall.cbgIsKuaF = function () {
        if (Model_ActivityHall.isOlderServ()) {
            return Model_ActivityHall.odercbgIsKuaF();
        }
        else {
            return Model_ActivityHall.newcbgIsKuaF();
        }
    };
    Model_ActivityHall.odercbgIsKuaF = function () {
        return Model_GlobalMsg.kaifuDay > 30;
    };
    Model_ActivityHall.newcbgIsKuaF = function () {
        var day = Config.xitong_001[UIConst.CANGBAOGE_RANK2];
        return Model_GlobalMsg.kaifuDay >= day.day;
    };
    Model_ActivityHall.newCbgnoKuaF = function () {
        var day = Config.xitong_001[UIConst.CANGBAOGE_RANK];
        return Model_GlobalMsg.kaifuDay <= day.day && Model_GlobalMsg.kaifuDay >= 8;
    };
    //老服 兼容   新服 8-28天开
    Model_ActivityHall.isOlderServ = function () {
        // return Model_GlobalMsg.kaiFuTime < 1561392000//2019-06-25 00:00:00
        return Model_GlobalMsg.kaiFuTime < 1561132800; //2019-06-22 00:00:00
    };
    Model_ActivityHall.checkCbgRank = function () {
        var a = GGlobal.modelActivityHall.cbgMbArr;
        for (var i = 0; i < a.length; i++) {
            if (a[i].status == 1) {
                return true;
            }
        }
        return false;
    };
    Model_ActivityHall.prototype.isOpenCbgRank2 = function () {
        var actArr = GGlobal.modelActivity.getGroup(UIConst.CANGBAOGE);
        actArr = actArr ? actArr : [];
        var servTime = (Model_GlobalMsg.getServerTime() / 1000) >> 0;
        for (var i = 0; i < actArr.length; i++) {
            var ac = actArr[i];
            if (ac.id == UIConst.CANGBAOGE_RANK2) {
                if ((ac.end - servTime > 0) && (servTime - ac.start > 0)) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * 根据次数获取神将折扣表数据
     */
    Model_ActivityHall.getIherooff_287 = function (count) {
        var cfg1;
        var cfg;
        for (var key in Config.herooff_287) {
            cfg = Config.herooff_287[key];
            var arr = JSON.parse(cfg.time);
            if (count >= arr[0][0]) {
                cfg1 = cfg;
            }
        }
        return cfg1;
    };
    Model_ActivityHall.skipTween = false; //跳过动画
    Model_ActivityHall.type = 0;
    return Model_ActivityHall;
}(BaseModel));
__reflect(Model_ActivityHall.prototype, "Model_ActivityHall");
