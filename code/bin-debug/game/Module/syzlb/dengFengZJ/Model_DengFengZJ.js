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
var Model_DengFengZJ = (function (_super) {
    __extends(Model_DengFengZJ, _super);
    function Model_DengFengZJ() {
        var _this = _super.call(this) || this;
        _this.status = 0;
        //海选数据
        _this.seaData = null;
        _this.seaPower = 0; //我的战力
        _this.seaRank = 0; //我的排名
        _this.seaPoint = 0; //我的积分
        _this.seaBatCt = 0; //今日挑战次数
        _this.seaFreEff = false;
        _this.hasSeaBuy = 0; // 海选已购买次数
        // private _maxSeaBuy = -1;
        // public get maxSeaBuy() {
        // 	let s = this;
        // 	if (s._maxSeaBuy == -1) {
        // 		let cfg = null
        // 		for (let key in Config.dfzjhx3_261) {
        // 			cfg = Config.dfzjhx3_261[key]
        // 		}
        // 		this._maxSeaBuy = cfg ? cfg.id : 0
        // 	}
        // 	return this._maxSeaBuy
        // }
        //决赛数据
        _this.finalData = null;
        _this.finalPower = 0; //我的战力
        _this.finalRank = 0; //我的排名
        _this.finalPoint = 0; //我的积分
        _this.finalBatCt = 0; //今日挑战次数
        //决赛购买挑战次数
        _this.hasFinalBuy = 0;
        // private _maxFinalBuy = -1;
        // public get maxFinalBuy() {
        // 	let s = this;
        // 	if (s._maxFinalBuy == -1) {
        // 		let cfg = null
        // 		for (let key in Config.dfzjjs3_261) {
        // 			cfg = Config.dfzjjs3_261[key]
        // 		}
        // 		this._maxFinalBuy = cfg ? cfg.id : 0
        // 	}
        // 	return this._maxFinalBuy
        // }
        //决赛预测
        _this.finalBetArr = [];
        _this.finalBetId = 0;
        _this.finalChaiID = 0;
        //战斗数据
        _this.batPlyId = 0;
        _this.rankDat = [];
        _this.pointDat = {};
        return _this;
    }
    //获取登峰造极数据 B:0.海选 1.决赛
    Model_DengFengZJ.prototype.CG_OPENUI = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(11951, bates);
    };
    //购买挑战次数 B:0.海选 1.决赛I:次数
    Model_DengFengZJ.prototype.CG_BUY_TIME = function (type, ct) {
        var bates = this.getBytes();
        bates.writeByte(type);
        bates.writeInt(ct);
        this.sendSocket(11953, bates);
    };
    //获取排名奖励 B:0.海选 1.决赛
    Model_DengFengZJ.prototype.CG_RANK_REWARD = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(11955, bates);
    };
    //获取积分奖励数据
    Model_DengFengZJ.prototype.CG_POINT_DAT = function () {
        var bates = this.getBytes();
        this.sendSocket(11957, bates);
    };
    //换一批 B:0.海选 1.决赛
    Model_DengFengZJ.prototype.CG_REPLACE = function (type) {
        var bates = this.getBytes();
        bates.writeByte(type);
        this.sendSocket(11959, bates);
    };
    //获取冠军预测数据
    Model_DengFengZJ.prototype.CG_GET_PREDICT = function () {
        var bates = this.getBytes();
        this.sendSocket(11961, bates);
    };
    //下注
    Model_DengFengZJ.prototype.CG_BET = function (id) {
        var bates = this.getBytes();
        bates.writeLong(id);
        this.sendSocket(11963, bates);
    };
    //挑战 B:0.海选 1.决赛L:角色id
    Model_DengFengZJ.prototype.CG_BATTLE = function (type, plyId) {
        var bates = this.getBytes();
        bates.writeByte(type);
        bates.writeLong(plyId);
        this.sendSocket(11965, bates);
    };
    //战斗结果 B:1.胜利 2.失败 3.活动结束L:被挑战玩家id
    Model_DengFengZJ.prototype.CG_BATTLE_RES = function (res) {
        var bates = this.getBytes();
        bates.writeByte(res);
        this.sendSocket(11967, bates);
    };
    //领取积分奖励 I:积分id
    Model_DengFengZJ.prototype.CG_POINT_GET = function (id) {
        var bates = this.getBytes();
        bates.writeInt(id);
        this.sendSocket(11969, bates);
    };
    //协议处理
    Model_DengFengZJ.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(11952, this.GC_OPENUI11952, this);
        mgr.regHand(11954, this.GC_BUY_TIME11954, this);
        mgr.regHand(11956, this.GC_RANK_DAT11956, this);
        mgr.regHand(11958, this.GC_POINT_DAT11958, this);
        mgr.regHand(11960, this.GC_REPLACE11960, this);
        mgr.regHand(11962, this.GC_GET_PREDICT11962, this);
        mgr.regHand(11964, this.GC_BET11964, this);
        mgr.regHand(11966, this.GC_BATTLE11966, this);
        mgr.regHand(11968, this.GC_BATTLE_RES11968, this);
        mgr.regHand(11970, this.GC_POINT_GET11970, this);
        mgr.regHand(11972, this.GC_STATUS11972, this);
    };
    //登峰造极数据返回 B:0.海选 1.决赛[B:排名L: 玩家IDU:玩家名称L: 战力I:时装I: 专属神兵I:坐骑B: 0.未挑战 1.已挑战]排名数据L: 我的战力B:我的排名：0.未上榜I:我的积分I: 今日挑战次数
    Model_DengFengZJ.prototype.GC_OPENUI11952 = function (self, data) {
        var type = data.readByte();
        if (type == 0) {
            var len = data.readShort();
            self.seaData = [];
            for (var i = 0; i < len; i++) {
                var v = new Vo_DengFengZJ();
                v.readMsg(data);
                self.seaData.push(v);
            }
            self.seaData.sort(function (a, b) { return a.rank - b.rank; });
            self.seaPower = data.readLong();
            self.seaRank = data.readByte();
            self.seaPoint = data.readInt();
            self.seaBatCt = data.readInt();
            self.hasSeaBuy = data.readInt();
            self.checkRedSea();
            self.notify(Model_DengFengZJ.SEA_UI);
        }
        else {
            var len = data.readShort();
            self.finalData = [];
            for (var i = 0; i < len; i++) {
                var v = new Vo_DengFengZJ();
                v.readMsg(data);
                self.finalData.push(v);
            }
            self.finalData.sort(function (a, b) { return a.rank - b.rank; });
            self.finalPower = data.readLong();
            self.finalRank = data.readByte();
            self.finalPoint = data.readInt();
            self.finalBatCt = data.readInt();
            self.hasFinalBuy = data.readInt();
            self.checkRedFinal();
            self.notify(Model_DengFengZJ.FINAL_UI);
        }
    };
    //购买次数返回 B:1.成功 2.元宝不足 3.该阶段已结束 4.本周赛事已结束I:挑战次数
    Model_DengFengZJ.prototype.GC_BUY_TIME11954 = function (self, data) {
        var res = data.readByte();
        var ct = data.readInt();
        var type = data.readByte();
        var hasBuy = data.readInt();
        if (res == 1) {
            if (type == 0) {
                self.seaBatCt = ct;
                self.hasSeaBuy = hasBuy;
                self.checkRedSea();
                self.notify(Model_DengFengZJ.SEA_UI);
            }
            else {
                self.finalBatCt = ct;
                self.hasFinalBuy = hasBuy;
                self.checkRedFinal();
                self.notify(Model_DengFengZJ.FINAL_UI);
            }
        }
        else {
            ViewCommonWarn.text(["元宝不足", "该阶段已结束", "本周赛事已结束"][res - 2]);
        }
    };
    //排名奖励返回 [B:排名U:玩家名称I:积分]排名数据
    Model_DengFengZJ.prototype.GC_RANK_DAT11956 = function (self, data) {
        var len = data.readShort();
        self.rankDat = [];
        for (var i = 0; i < len; i++) {
            var rank = data.readByte();
            var name_1 = data.readUTF();
            var point = data.readInt();
            self.rankDat[rank - 1] = { rank: rank, name: name_1, point: point };
        }
        self.notify(Model_DengFengZJ.RANK_DAT);
    };
    //积分奖励数据返回 [I:已领积分id]
    Model_DengFengZJ.prototype.GC_POINT_DAT11958 = function (self, data) {
        var len = data.readShort();
        self.pointDat = {};
        for (var i = 0; i < len; i++) {
            self.pointDat[data.readInt()] = 1;
        }
        self.checkRedSea();
        self.notify(Model_DengFengZJ.POINT_DAT);
    };
    //换一批数据返回 B:1.成功 2.元宝不足 3.本周赛事已结束[B:排名L: 玩家idU:玩家名称L: 战力I:时装I: 专属神兵I:坐骑]
    Model_DengFengZJ.prototype.GC_REPLACE11960 = function (self, data) {
        var type = data.readByte();
        var res = data.readByte();
        if (res == 1) {
            var len = data.readShort();
            if (type == 0) {
                self.seaData = [];
                for (var i = 0; i < len; i++) {
                    var v = new Vo_DengFengZJ();
                    v.readMsgRp(data);
                    self.seaData.push(v);
                }
                self.seaData.sort(function (a, b) { return a.rank - b.rank; });
                self.notify(Model_DengFengZJ.SEA_UI);
            }
            else {
                self.finalData = [];
                for (var i = 0; i < len; i++) {
                    var v = new Vo_DengFengZJ();
                    v.readMsgRp(data);
                    self.finalData.push(v);
                }
                self.finalData.sort(function (a, b) { return a.rank - b.rank; });
                self.notify(Model_DengFengZJ.FINAL_UI);
            }
        }
        else {
            ViewCommonWarn.text(["元宝不足", "本周赛事已结束"][res - 2]);
        }
    };
    //冠军预测数据返回 [L:玩家idU:玩家名称L:战力]预测数据L: 0.未下注 - 1.已超时
    Model_DengFengZJ.prototype.GC_GET_PREDICT11962 = function (self, data) {
        var len = data.readShort();
        self.finalBetArr = [];
        for (var i = 0; i < len; i++) {
            var v = new Vo_DengFengZJ();
            v.readMsgPre(data);
            self.finalBetArr.push(v);
        }
        self.finalBetArr.sort(function (a, b) { return b.power - a.power; });
        self.finalBetId = data.readLong();
        self.notify(Model_DengFengZJ.BET_DAT);
    };
    //下注返回 B:1.成功 2.元宝不足 3.已超时
    Model_DengFengZJ.prototype.GC_BET11964 = function (self, data) {
        var res = data.readByte();
        if (res == 1) {
            self.finalBetId = data.readLong();
            self.checkRedFinal();
            self.notify(Model_DengFengZJ.BET_SUC);
        }
        ViewCommonWarn.text(["下注成功", "元宝不足", "已超时"][res - 1]);
    };
    //挑战返回  B:1.成功 2.没有挑战次数 3.不可越级挑战 4.已挑战 5.不在活动期间时不可挑战 6.第一名需要前5名才可挑战 7.不能挑战自己 8.参数错误 9.未进入决赛不能挑战 10.排名已变更
    Model_DengFengZJ.prototype.GC_BATTLE11966 = function (self, data) {
        var res = data.readByte();
        if (res == 1) {
            var scenetype = GGlobal.mapscene.scenetype;
            if (scenetype == SceneCtrl.DENG_FENG) {
                return; //按键精灵 会触发多次进入
            }
            self.batType = data.readByte();
            self.batPlyId = data.readLong();
            GGlobal.mapscene.enterScene(SceneCtrl.DENG_FENG);
        }
        else {
            ViewCommonWarn.text(["没有挑战次数", "不可越级挑战", "已挑战", "不在活动期间时不可挑战",
                "第一名需要前5名才可挑战", "不能挑战自己", "参数错误", "未进入决赛不能挑战", "排名已变更", "比赛尚未开始", "本周赛事已结束"][res - 2]);
        }
    };
    //战斗结果返回 B:1.胜利 0.失败 2.活动结束B:0.海选 1.决赛L:被挑战玩家id
    Model_DengFengZJ.prototype.GC_BATTLE_RES11968 = function (self, data) {
        var result = data.readByte();
        var type = data.readByte();
        var plyId = data.readLong();
        var isAll = data.readByte();
        var val;
        if (result == 1) {
            var rew = void 0;
            if (type == 0) {
                self.seaFreEff = isAll == 1;
                //积分奖励
                var idx = 0;
                for (var i = 0; i < self.seaData.length; i++) {
                    if (self.seaData[i].plyId == plyId) {
                        idx = i;
                        break;
                    }
                }
                val = self.getAddPointSea(idx);
                if (isAll == 1) {
                    val += ConfigHelp.getSystemNum(8309);
                }
                //奖励
                rew = JSON.parse(Config.xtcs_004[8310].other);
            }
            else {
                var rank = 0;
                for (var i = 0; i < self.finalData.length; i++) {
                    if (self.finalData[i].plyId == plyId) {
                        rank = self.finalData[i].rank;
                        break;
                    }
                }
                val = self.getAddPointFinal(rank);
                rew = JSON.parse(Config.xtcs_004[8311].other);
            }
            ViewBroadcastItemText.text("积分+" + val, Color.GREENINT);
            ViewCommonWin.show(ConfigHelp.makeItemListArr(rew), 5000);
        }
        else if (result == 0 || result == 2) {
            ViewCommonFail.show(5000, self, "离开", self.failHandler, null);
            if (type == 0) {
                val = JSON.parse(Config.xtcs_004[8303].num);
            }
            else {
                val = JSON.parse(Config.xtcs_004[8307].num);
            }
            ViewBroadcastItemText.text("积分+" + val, Color.GREENINT);
        }
        else {
            self.failHandler();
        }
    };
    //ABC档次挑战成功积分奖励
    Model_DengFengZJ.prototype.getAddPointSea = function (idx) {
        var s = this;
        if (!s._addPointSea) {
            s._addPointSea = JSON.parse(Config.xtcs_004[8302].other)[0];
        }
        if (idx < 2) {
            idx = idx;
        }
        else if (idx == 2) {
            idx = 1;
        }
        else if (idx > 2) {
            idx = 2;
        }
        return s._addPointSea[idx];
    };
    Model_DengFengZJ.prototype.getAddPointFinal = function (rank) {
        var s = this;
        var rankArr = s.getCfgRankFinal();
        var v = rankArr[rank - 1];
        return v ? v.point : 0;
    };
    //领取积分奖励返回 B:1.成功 2.已领 3.积分不足 4.参数错误 5.背包已满I:积分id
    Model_DengFengZJ.prototype.GC_POINT_GET11970 = function (self, data) {
        var res = data.readByte();
        if (res == 1) {
            self.pointDat[data.readInt()] = 1;
            self.checkRedSea();
            self.notify(Model_DengFengZJ.POINT_DAT);
        }
        else {
            ViewCommonWarn.text(["已领取", "积分不足", "参数错误", "背包已满"][res - 2]);
        }
    };
    //活动开启与结束 B:1.海选开启 2.决赛开启 0.结束
    Model_DengFengZJ.prototype.GC_STATUS11972 = function (self, data) {
        self.status = data.readByte();
        self.checkRedSea();
        self.checkRedFinal();
        self.notify(Model_DengFengZJ.STATUS);
    };
    Model_DengFengZJ.prototype.failHandler = function () {
        GGlobal.modelScene.returnMainScene();
    };
    Model_DengFengZJ.prototype.checkRedSea = function () {
        var s = this;
        var r = GGlobal.reddot;
        if (s.status == 1) {
            if (!s.seaData) {
                return;
            }
            var arr = s.getCfgPointSea();
            var red = false;
            for (var i = 0; i < arr.length; i++) {
                var v = arr[i];
                if (s.seaPoint < v.point) {
                    break;
                }
                var st = s.pointDat[v.id];
                if (!st && s.seaPoint >= v.point) {
                    red = true;
                    break;
                }
            }
            r.setCondition(UIConst.DENG_FENG_SEA, 1, red);
            r.setCondition(UIConst.DENG_FENG_SEA, 0, s.seaBatCt > 0 || red);
        }
        else {
            r.setCondition(UIConst.DENG_FENG_SEA, 1, false);
            r.setCondition(UIConst.DENG_FENG_SEA, 0, false);
        }
        r.notify(UIConst.DENG_FENG_SEA);
    };
    Model_DengFengZJ.prototype.checkRedFinal = function () {
        var s = this;
        if (s.status == 2) {
            if (!s.finalData) {
                return;
            }
            var betRed = (s.finalBetId == 0 && s.getBetStatus());
            var red = (s.finalBatCt > 0 && s.finalRank > 0) || betRed;
            GGlobal.reddot.setCondition(UIConst.DENG_FENG_FINAL, 1, betRed);
            GGlobal.reddot.setCondition(UIConst.DENG_FENG_FINAL, 0, red);
        }
        else {
            GGlobal.reddot.setCondition(UIConst.DENG_FENG_FINAL, 1, false);
            GGlobal.reddot.setCondition(UIConst.DENG_FENG_FINAL, 0, false);
        }
        GGlobal.reddot.notify(UIConst.DENG_FENG_FINAL);
    };
    Model_DengFengZJ.prototype.getCfgRankSea = function () {
        var s = this;
        if (!s._cfgRankSea) {
            s._cfgRankSea = [];
            for (var key in Config.dfzjhx1_261) {
                var v = Config.dfzjhx1_261[key];
                var rankArr = JSON.parse(v.rank);
                var r1 = Number(rankArr[0][0]);
                var r2 = Number(rankArr[0][1]);
                for (var i = r1; i <= r2; i++) {
                    s._cfgRankSea[i - 1] = v;
                }
            }
        }
        return s._cfgRankSea;
    };
    Model_DengFengZJ.prototype.getCfgRankFinal = function () {
        var s = this;
        if (!s._cfgRankFinal) {
            s._cfgRankFinal = [];
            for (var key in Config.dfzjjs1_261) {
                var v = Config.dfzjjs1_261[key];
                var rankArr = JSON.parse(v.rank);
                var r1 = Number(rankArr[0][0]);
                var r2 = Number(rankArr[0][1]);
                for (var i = r1; i <= r2; i++) {
                    s._cfgRankFinal[i - 1] = v;
                }
            }
        }
        return s._cfgRankFinal;
    };
    Model_DengFengZJ.prototype.getCfgPointSea = function () {
        var s = this;
        if (!s.cfgPointSea) {
            s.cfgPointSea = [];
            for (var key in Config.dfzjhx2_261) {
                var val = Config.dfzjhx2_261[key];
                s.cfgPointSea.push(val);
            }
        }
        return s.cfgPointSea;
    };
    // 周6 可预测
    Model_DengFengZJ.prototype.getBetStatus = function () {
        var servTime = Model_GlobalMsg.getServerTime();
        var date = new Date(servTime);
        var day = date.getDay();
        if (day == 6) {
            return true;
        }
        else {
            return false;
        }
    };
    Model_DengFengZJ.STATUS = "status";
    Model_DengFengZJ.SEA_UI = "sea_ui";
    Model_DengFengZJ.FINAL_UI = "final_ui";
    Model_DengFengZJ.RANK_DAT = "rank_dat"; //排行
    Model_DengFengZJ.POINT_DAT = "point_dat"; //积分
    Model_DengFengZJ.BET_DAT = "bet_dat"; //冠军预测
    Model_DengFengZJ.BET_SUC = "bet_suc"; //冠军预测
    Model_DengFengZJ.ITEM_BATCT = 416081; //登峰造极挑战令
    return Model_DengFengZJ;
}(BaseModel));
__reflect(Model_DengFengZJ.prototype, "Model_DengFengZJ");
