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
/**问鼎天下*/ var ModelWenDingTX = (function (_super) {
    __extends(ModelWenDingTX, _super);
    function ModelWenDingTX() {
        var _this = _super.call(this) || this;
        /**活动结束时间*/ _this.activiyEndTime = 0;
        /**收益时间*/ _this.fixedTimeAwards = 0;
        /**当前层数*/ _this.layer = 1;
        /**最高层数*/ _this.maxLayer = 0;
        /**当前积分*/ _this.score = 0;
        /**当前排名*/ _this.rank = 0;
        /**当前玉玺持有者*/ _this.mvp_name = "";
        /**当前玉玺持有者id*/ _this.mvp_id = 0;
        /**当前玉玺持有者头像id*/ _this.mvpHead_id = 0;
        /**当前玉玺持有者头像框id*/ _this.mvpHeadGrid_id = 0;
        /**连斩次数*/ _this.kill_count = 0;
        /**杀人书*/ _this.kill = 0;
        /**BUFF层数*/ _this.buff = 0;
        /**总排行数据*/ _this.rank_Total = [];
        /**连斩排行数据*/ _this.rank_LianZhan = [];
        /**楼层排行数据*/ _this.rank_Layer = [];
        /**积分排行数据*/ _this.rank_Score = [];
        /**活动状态*/ _this.ACtiving = false;
        _this.tanklen = 0;
        /**4230 U-B
         *
         * 死亡提示 U:击败你的玩家名B:掉落到xx层 0是不掉 其他是掉落后的层数
        */
        _this.deadTime = 0;
        return _this;
    }
    /**获取当前层的奖励*/
    ModelWenDingTX.prototype.getNowLayerAwardsStr = function (layer) {
        var cfg = Config.wdtx_260[layer];
        var str = ConfigHelp.makeItemRewardText(cfg.reward);
        return str;
    };
    //活动是否跨服
    ModelWenDingTX.prototype.getActivityIsCross = function () {
        var cfgday = ConfigHelp.getSystemNum(4705);
        var sday = Model_GlobalMsg.kaifuDay;
        return cfgday > sday;
    };
    ModelWenDingTX.prototype.getTotalCFG_len = function () {
        if (this.tanklen == 0) {
            this.decodeRankCfg();
        }
        return this.tanklen;
    };
    ModelWenDingTX.prototype.getRankCfg = function () {
        if (!this.rankCfg) {
            this.decodeRankCfg();
        }
        return this.rankCfg;
    };
    ModelWenDingTX.prototype.decodeRankCfg = function () {
        var cfg = Config.wdtxrank_260;
        var isCross = this.getActivityIsCross();
        this.rankCfg = {};
        for (var i in cfg) {
            if (isCross) {
                if (cfg[i].qf == 1) {
                    this.tanklen++;
                    this.rankCfg[this.tanklen] = cfg[i];
                }
            }
            else {
                if (cfg[i].qf == 2) {
                    this.tanklen++;
                    this.rankCfg[this.tanklen] = cfg[i];
                }
            }
        }
    };
    ModelWenDingTX.prototype.getRankItemCFG = function (rank) {
        var ret;
        var cfgs = this.getRankCfg();
        for (var i in cfgs) {
            var rankinfo = JSON.parse(cfgs[i].rank);
            var startRank = rankinfo[0][0];
            var endRank = rankinfo[0][1];
            if (rank >= startRank && rank <= endRank) {
                ret = cfgs[i];
                break;
            }
        }
        return ret;
    };
    //问鼎天下有特殊的外显需求。
    ModelWenDingTX.prototype.updatePlayer = function (id) {
        var role = GameUnitManager.findUnitByID(id);
        if (role) {
            role.removePlugBytype(ArpgPlayerNamePlug);
            role.removePlugBytype(WenDingTXNamePlug);
            var name_1 = WenDingTXNamePlug.create();
            name_1.role = role;
            role.addPlug(name_1);
        }
    };
    ModelWenDingTX.prototype.checkWDTX = function () {
        var ret = false;
        var arr = this.rank_Layer;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][1] == 1) {
                ret = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.WENDINGTX, 1, ret);
        GGlobal.reddot.notify(UIConst.WENDINGTX);
    };
    ModelWenDingTX.prototype.checkWDTXZhandi = function () {
        var ret = false;
        var arr = this.rank_LianZhan;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][1] == 1) {
                ret = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.WENDINGTX, 2, ret);
        GGlobal.reddot.notify(UIConst.WENDINGTX);
    };
    ModelWenDingTX.prototype.sortAndsetNoticeScoreRank = function () {
        var m = this;
        m.rank_Score = m.rank_Score.sort(function (a, b) {
            return a[2] < b[2] ? -1 : 1;
        });
        var ret = false;
        var len = m.rank_Score.length;
        for (var i = 0; i < len; i++) {
            var st = m.rank_Score[i][1];
            if (st == 1) {
                ret = true;
                break;
            }
        }
        GGlobal.reddot.setCondition(UIConst.WENDINGTX, 3, ret);
        GGlobal.reddot.notify(UIConst.WENDINGTX);
        GGlobal.control.notify(Enum_MsgType.WDTX_RANK);
    };
    //前端检查是否有----积分奖励可领取
    ModelWenDingTX.prototype.updateScoreRank = function () {
        if (this._checkOver_score)
            return; //领完全不
        var ret = GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 3);
        if (ret)
            return; //已经有红点
        var dta = this.rank_Score;
        if (!dta || !dta.length)
            return; //尚无数据
        var now = this.score;
        var len = dta.length;
        var completeCount = 0;
        for (var i = 0; i < len; i++) {
            var item = dta[i];
            var id = item[0];
            var st = item[1];
            if (st == 0) {
                var cfg = Config.wdtxpoint_260[id];
                var nextScore = cfg.point;
                if (now >= nextScore) {
                    GGlobal.reddot.setCondition(UIConst.WENDINGTX, 3, true);
                    GGlobal.reddot.notify(UIConst.WENDINGTX);
                    return;
                }
            }
            else if (st == 2) {
                completeCount++;
            }
        }
        this._checkOver_score = completeCount == len;
    };
    //前端检查是否有----楼层奖励奖励可领取
    ModelWenDingTX.prototype.updateLayerRank = function () {
        if (this._checkOver_Layer)
            return; //领完全不
        var ret = GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 3);
        if (ret)
            return; //已经有红点
        var dta = this.rank_Layer;
        if (!dta || !dta.length)
            return; //尚无数据
        var now = this.layer;
        var len = dta.length;
        var completeCount = 0;
        for (var i = 0; i < len; i++) {
            var item = dta[i];
            var id = item[0];
            var st = item[1];
            if (st == 0) {
                if (now >= id) {
                    GGlobal.reddot.setCondition(UIConst.WENDINGTX, 1, true);
                    GGlobal.reddot.notify(UIConst.WENDINGTX);
                    return;
                }
            }
            else if (st == 2) {
                completeCount++;
            }
        }
        this._checkOver_Layer = completeCount == len;
    };
    ModelWenDingTX.prototype.addNPCName = function (id) {
        var npc = GameUnitManager.findUnit(id, UnitType.NPC);
        if (npc) {
            var s = this;
            var cfg = npc.vo.cfg;
            var score = Config.wdtx_260[GGlobal.modelWenDingTX.layer].point;
            npc.setName("<font color='#ffffff'>积分：" + score + "</font>\n" + cfg.name);
        }
    };
    ModelWenDingTX.prototype.enter = function () {
        var s = this;
        GGlobal.control.listen(Enum_MsgType.ARPG_SCENE_ADD_NPC, s.addNPCName, s);
        ModelArpgMap.getInstance().listen(Enum_MsgType.ARPG_SCENE_ADD_PLAYER, s.updatePlayer, s);
    };
    ModelWenDingTX.prototype.exite = function () {
        var s = this;
        s.layer = 0;
        s.buff = 0;
        s.score = 0;
        s.mvp_id = 0;
        s.mvp_name = '';
        s.mvpHead_id = 0;
        s.kill_count = 0;
        s.mvpHeadGrid_id = 0;
        s._checkOver_Layer = 0;
        s._checkOver_score = 0;
        s.rank_Layer = [];
        s.rank_Total = [];
        s.rank_LianZhan = [];
        s.rank_Score = [];
        GGlobal.control.remove(Enum_MsgType.ARPG_SCENE_ADD_NPC, s.addNPCName, s);
        ModelArpgMap.getInstance().remove(Enum_MsgType.ARPG_SCENE_ADD_PLAYER, s.updatePlayer, s);
    };
    ModelWenDingTX.prototype.listenServ = function (wsm) {
        var s = this;
        this.socket = wsm;
        wsm.regHand(4202, s.mineUpdate4202, s);
        wsm.regHand(4204, s.sceneMvpUpdate4204, s);
        wsm.regHand(4206, s.layerUpdate4206, s);
        wsm.regHand(4208, s.fight4208, s);
        wsm.regHand(4210, s.score4210, s);
        wsm.regHand(4212, s.activityEnd4212, s);
        wsm.regHand(4214, s.totalRank4214, s);
        wsm.regHand(4216, s.killCountRank4216, s);
        wsm.regHand(4218, s.layerRank4218, s);
        wsm.regHand(4220, s.lianzhanAwards4220, s);
        wsm.regHand(4222, s.layerAwards4222, s);
        wsm.regHand(4224, s.enterAct4224, s);
        wsm.regHand(4226, s.sceneUpdate4226, s);
        wsm.regHand(4228, s.fight4228, s);
        wsm.regHand(4230, s.heroSt4230, s);
        wsm.regHand(4232, s.heroRelife4232, s);
        wsm.regHand(4234, s.fightEnd4234, s);
        wsm.regHand(4236, s.rankScore4236, s);
        wsm.regHand(4238, s.rankScore4238, s);
    };
    /**
     * 4202 I-B-S-S-S-B
     * 刷新时间与玩家积分 I:活动剩余时间B:收益倒计时S:我的排名S:我的积分S:我的连斩数B:死亡buff层数
    */
    ModelWenDingTX.prototype.mineUpdate4202 = function (m, ba) {
        m.activiyEndTime = Model_GlobalMsg.getServerTime() + ba.readInt() * 1000;
        m.fixedTimeAwards = Model_GlobalMsg.getServerTime() + ba.readByte() * 1000;
        m.rank = ba.readShort();
        var score = ba.readShort();
        if (score != m.score) {
            m.score = score;
            m.updateScoreRank();
        }
        m.kill_count = ba.readShort();
        m.buff = ba.readByte();
        m.kill = ba.readShort();
        GGlobal.control.notify(Enum_MsgType.WDTX_MINE_UPDATE);
        if (!m._checkOver_Layer) {
            GGlobal.modelWenDingTX.layerRank4217();
            GGlobal.modelWenDingTX.killCountRank4215();
            GGlobal.modelWenDingTX.rankScore4235();
        }
    };
    /**
     * 4204 L-U-S-S
     * 刷新房间数据 B:层数L:玉玺持有者IDU:玉玺持有者名字
    */
    ModelWenDingTX.prototype.sceneMvpUpdate4204 = function (m, ba) {
        m.mvp_id = ba.readLong();
        m.mvp_name = ba.readUTF();
        m.mvpHead_id = ba.readShort();
        m.mvpHeadGrid_id = ba.readShort();
        GGlobal.control.notify(Enum_MsgType.WDTX_MVP);
    };
    /**
     * 4205 进入下一层
    */
    ModelWenDingTX.prototype.enterScene4205 = function () {
        var ba = this.getBytes();
        this.sendSocket(4205, ba, true);
    };
    /**
     * 4206 B-B
     * 刷新玩家层数，玩家跳层或掉层 刷新 B:结果 1成功 B:当前层数
    */
    ModelWenDingTX.prototype.layerUpdate4206 = function (m, ba) {
        var ret = ba.readByte();
        var layer = ba.readByte();
        if (m.layer != layer) {
            m.updateLayerRank();
            if (GameUnitManager.hero)
                GameUnitManager.hero.showEffect();
        }
        m.layer = layer;
        if (ret == 1) {
            ModelArpgMap.getInstance().isServerControlMap = false;
            GGlobal.control.notify(Enum_MsgType.WDTX_LAYER_UPDATE);
        }
        else if (ret == 2) {
            ViewCommonWarn.text("您已经到达最高层");
        }
        else if (ret == 3) {
            ViewCommonWarn.text("积分不足");
        }
    };
    /**
     * 4207
     * （跨服）挑战玩家或怪物 L:其他玩家ID 打怪物时发0I:怪物ID 打人物发
    */
    ModelWenDingTX.prototype.fight4207 = function (id) {
        if (id === void 0) { id = 0; }
        var ba = this.getBytes();
        ba.writeLong(id);
        this.sendSocket(4207, ba, true);
    };
    /**
     * 4208 B
     * 挑战玩家 B:结果 1成功 2该玩家不存在 3本玩家问鼎天下数据不存在 4该玩家问鼎天下数据不存在 5该玩家不在房间 6你不在房间中 7该玩家已经不在本层 8请退出当前场景 9对方正在战斗中 10你未复活 11该玩家未复活
    */
    ModelWenDingTX.prototype.fight4208 = function (m, ba) {
        var ret = ba.readByte();
        var a = '';
        switch (ret) {
            case 1: break;
            case 2:
                a = "该玩家不存在 ";
                break;
            case 3:
                a = "本玩家问鼎天下数据不存在";
                break;
            case 4:
                a = "该玩家问鼎天下数据不存在";
                break;
            case 5:
                a = "该玩家不在房间";
                break;
            case 6:
                a = "你不在房间中";
                break;
            case 7:
                a = "该玩家已经不在本层";
                break;
            case 8:
                a = "请退出当前场景";
                break;
            case 9:
                a = "对方正在战斗中";
                break;
            case 10:
                a = "你未复活";
                break;
            case 11:
                a = "该玩家未复活";
                break;
            case 12:
                a = "活动未开启";
                break;
            case 13:
                a = "活动已结束";
                break;
        }
        ViewCommonWarn.text(a);
    };
    /**
     * 4210 s
     * 积分变动，飘起来的效果 S:增减或减少积分
    */
    ModelWenDingTX.prototype.score4210 = function (m, ba) {
        var score = ba.readShort();
        if (score > 0)
            ViewCommonWarn.text("获得积分 " + score);
        else
            ViewCommonWarn.text("失去积分 " + score);
    };
    /**
     * 4212  U-S-S
     * 活动结算界面 U:玩家名字S:头像IDS:头像框
    */
    ModelWenDingTX.prototype.activityEnd4212 = function (m, ba) {
        m.mvp_name = ba.readUTF();
        m.mvpHead_id = ba.readShort();
        m.mvpHeadGrid_id = ba.readShort();
        GGlobal.layerMgr.open(UIConst.WENDINGTX_RET);
        WenDingTXManager.getInstance().exite();
    };
    /**
     * 4213
     * （跨服）打开排名排行榜
    */
    ModelWenDingTX.prototype.totalRank4213 = function (id, mid) {
        if (id === void 0) { id = 0; }
        if (mid === void 0) { mid = 0; }
        var ba = this.getBytes();
        this.sendSocket(4213, ba, true);
    };
    /**
     * [B-U-S]-S-S
     * 打开排名排行榜 [B:排名U:玩家名B:最高层S:积分S:总斩数]排行榜数据S:最高层S:斩敌
    */
    ModelWenDingTX.prototype.totalRank4214 = function (m, ba) {
        var len = ba.readShort();
        m.rank_Total = [];
        for (var i = 0; i < 10; i++) {
            if (i < len) {
                m.rank_Total.push([ba.readByte(), ba.readUTF(), ba.readShort()]);
            }
            else {
                m.rank_Total.push([i + 1, "虚位以待", 0]);
            }
        }
        m.rank_Total.push([11, "虚位以待", 0]);
        m.maxLayer = ba.readShort();
        m.kill_count = ba.readShort();
        GGlobal.control.notify(Enum_MsgType.WDTX_RANK);
    };
    /**
     * 4215
     * （跨服）打开连斩奖励
    */
    ModelWenDingTX.prototype.killCountRank4215 = function () {
        var ba = this.getBytes();
        this.sendSocket(4215, ba, true);
    };
    /**
     * 4216 [B-B]-S
     *打开连斩奖励 [B:配置表IDB:领取状态 0未领取 1已领取]所有数据S:我的连斩数
    */
    ModelWenDingTX.prototype.killCountRank4216 = function (m, ba) {
        var len = ba.readShort();
        m.rank_LianZhan = [];
        for (var i = 0; i < len; i++) {
            var id = ba.readByte();
            var st = ba.readByte();
            var weight = void 0;
            if (st == 0)
                weight = id - 100;
            if (st == 1)
                weight = id - 10000;
            if (st == 2)
                weight = id;
            m.rank_LianZhan.push([id, st, weight]);
        }
        m.rank_LianZhan = m.rank_LianZhan.sort(function (a, b) {
            return a[2] < b[2] ? -1 : 1;
        });
        m.checkWDTXZhandi();
        m.kill_count = ba.readShort();
        GGlobal.control.notify(Enum_MsgType.WDTX_RANK);
    };
    /**
     * 4217
     * （跨服）打开楼层奖励
    */
    ModelWenDingTX.prototype.layerRank4217 = function () {
        var ba = this.getBytes();
        this.sendSocket(4217, ba, true);
    };
    /**
     * 4218  [B-B]-B
     * 打开楼层数据 [B:层数B:领取状态]所有数据B:最高楼层
    */
    ModelWenDingTX.prototype.layerRank4218 = function (m, ba) {
        var len = ba.readShort();
        m.rank_Layer = [];
        for (var i = 0; i < len; i++) {
            var id = ba.readByte();
            var st = ba.readByte();
            var weight = void 0;
            if (st == 0)
                weight = id - 100;
            if (st == 1)
                weight = id - 10000;
            if (st == 2)
                weight = id;
            m.rank_Layer.push([id, st, weight]);
        }
        m.rank_Layer = m.rank_Layer.sort(function (a, b) {
            return a[2] < b[2] ? -1 : 1;
        });
        m.maxLayer = ba.readByte();
        m.checkWDTX();
        GGlobal.control.notify(Enum_MsgType.WDTX_RANK);
    };
    ModelWenDingTX.prototype.lianzhanAwards4219 = function (idx) {
        var ba = this.getBytes();
        ba.writeByte(idx);
        this.lid = idx;
        this.sendSocket(4219, ba, true);
    };
    /**
     * 4520 B
     * 领取连斩奖励 B:结果 1成功
    */
    ModelWenDingTX.prototype.lianzhanAwards4220 = function (m, ba) {
        var ret = ba.readByte();
        if (ret == 1) {
            var len = m.rank_LianZhan.length;
            for (var i = 0; i < len; i++) {
                var data = m.rank_LianZhan[i];
                if (data[0] == m.lid) {
                    m.rank_LianZhan[i][1] = 2;
                    m.rank_LianZhan[i][2] = data[0];
                    break;
                }
            }
            m.rank_LianZhan = m.rank_LianZhan.sort(function (a, b) {
                return a[2] < b[2] ? -1 : 1;
            });
            m.checkWDTXZhandi();
            ViewCommonWarn.text("领取成功");
            GGlobal.control.notify(Enum_MsgType.WDTX_RANK);
        }
    };
    ModelWenDingTX.prototype.layerAwards4221 = function (idx) {
        var ba = this.getBytes();
        ba.writeByte(idx);
        this.layerid = idx;
        this.sendSocket(4221, ba, true);
    };
    /**
     * 4520 B
     *  领取楼层奖励 B:结果 1成功
    */
    ModelWenDingTX.prototype.layerAwards4222 = function (m, ba) {
        var ret = ba.readByte();
        if (ret == 1) {
            var len = m.rank_Layer.length;
            for (var i = 0; i < len; i++) {
                var data = m.rank_Layer[i];
                if (data[0] == m.layerid) {
                    m.rank_Layer[i][1] = 2;
                    m.rank_Layer[i][2] = data[0];
                    break;
                }
            }
            m.rank_Layer = m.rank_Layer.sort(function (a, b) {
                return a[2] < b[2] ? -1 : 1;
            });
            m.checkWDTX();
            ViewCommonWarn.text("领取成功");
            GGlobal.control.notify(Enum_MsgType.WDTX_RANK);
        }
    };
    /**4223
     *子服）请求进入跨服
    */
    ModelWenDingTX.prototype.enterAct4223 = function () {
        var ba = this.getBytes();
        this.sendSocket(4223, ba);
    };
    /**
     * 4224 B
     *  请求进入跨服 B:结果 2系统未开启 3活动未开启 4退出副本冷却中
    */
    ModelWenDingTX.prototype.enterAct4224 = function (m, ba) {
        var ret = ba.readByte();
        var cd = ba.readByte();
        if (ret == 1) {
            ModelArpgMap.getInstance().isServerControlMap = false;
            WenDingTXManager.getInstance().enter();
        }
        else if (ret == 2)
            ViewCommonWarn.text("系统未开启");
        else if (ret == 3)
            ViewCommonWarn.text("活动未开启");
        else if (ret == 4)
            ViewCommonWarn.text("请等待" + cd + "秒再进入");
        else if (ret == 5)
            ViewCommonWarn.text("活动已结束");
    };
    //退出战斗后重新进入场景
    ModelWenDingTX.prototype.reApplyEnter4225 = function () {
        var ba = this.getBytes();
        this.sendSocket(4225, ba);
    };
    /**
     * L-S-B-B-B-L
     * 刷新场景上的玩家状态 L:玩家IDS:头顶积分B:超神 0不显示 1显示 B:玉玺 0不显示 1显示 B:玩家状态 0默认 1死亡 2战斗中L:玩家气血
     * */
    ModelWenDingTX.prototype.sceneUpdate4226 = function (m, ba) {
        var id = ba.readLong();
        var info = ba.readUTF();
        var obj = JSON.parse(info);
        var role = GameUnitManager.findUnitByID(id);
        if (!role) {
            return;
        }
        var val;
        var plug = role.getPlugBytype(WenDingTXNamePlug);
        for (var i in obj) {
            val = obj[i];
            switch (i) {
                case "jf":
                    plug.setJiFen(val);
                    break;
                case "num":
                    plug.setChaoShen(val);
                    break;
                case "yx":
                    plug.setYuxi(val == 1);
                    break;
                case "wjzt":
                    var STplug = role.getPlugBytype(WenDingTXStatePlug);
                    if (val == 0) {
                        if (STplug) {
                            role.removePlugBytype(WenDingTXStatePlug);
                        }
                    }
                    else {
                        if (STplug == null) {
                            STplug = WenDingTXStatePlug.create(role);
                            role.addPlug(STplug);
                        }
                        STplug.setState(val);
                    }
                    break;
                case "wjqx":
                    plug.setHp(val);
                    break;
            }
        }
    };
    /**
     * 挑战怪物。
    */
    ModelWenDingTX.prototype.fight4227 = function (id) {
        var ba = this.getBytes();
        ba.writeLong(id);
        this.sendSocket(4227, ba);
    };
    ModelWenDingTX.prototype.revive4231 = function () {
        this.sendSocket(4231, this.getBytes());
    };
    ModelWenDingTX.prototype.fight4228 = function (m, ba) {
        var ret = ba.readByte();
        if (ret == 1) {
            var scenectrl = SceneCtrl.getCtrl(SceneCtrl.WDTX_PVE);
            GGlobal.mapscene.scenetype = SceneCtrl.WDTX_PVE;
            WenDingTXManager.enterBattle();
            GGlobal.mapscene.enterSceneCtrl(scenectrl);
        }
        else {
            var strFun = ViewCommonWarn.text;
            switch (ret) {
                case 2:
                    strFun("你不在活动房间内");
                    break;
                case 3:
                    strFun("玩家数据异常");
                    break;
                case 4:
                    strFun("该层怪物未初始化");
                    break;
                case 5:
                    strFun("怪物已被击败");
                    break;
                case 6:
                    strFun("怪物战斗中");
                    break;
                case 7:
                    strFun("你已死亡");
                    break;
                case 8:
                    strFun("请退出当前场景");
                    break;
            }
        }
    };
    ModelWenDingTX.prototype.heroSt4230 = function (m, ba) {
        var heroname = ba.readUTF();
        var floor = ba.readByte();
        if (floor == 0) {
            ViewCommonWarn.text(BroadCastManager.reTxt("您被{0}击败", heroname));
        }
        else {
            ViewCommonWarn.text(BroadCastManager.reTxt("您被{0}击败,掉落至{1}层", heroname, floor));
        }
        var cfgT = ConfigHelp.getSystemNum(1012);
        m.deadTime = Model_GlobalMsg.getServerTime() + cfgT * 1000;
        // GGlobal.layerMgr.open(UIConst.REVIVE_PANEL, UIConst.WENDINGTX);
    };
    /**4332 B
     *
     * 复活 B:结果 1成功 2数据异常 3你已经复活，无需再复活 4元宝不足
    */
    ModelWenDingTX.prototype.heroRelife4232 = function (m, ba) {
        var ret = ba.readByte();
        var a = '';
        switch (ret) {
            case 1:
                a = "复活成功";
                GGlobal.layerMgr.close2(UIConst.REVIVE_PANEL);
                m.deadTime = Model_GlobalMsg.getServerTime() - 2000;
                break;
            case 2:
                a = "数据异常";
                break;
            case 3:
                a = "你已经复活，无需再复活";
                break;
            case 4:
                a = "元宝不足";
                break;
        }
        ViewCommonWarn.text(a);
    };
    /**
     * 4233 B
     * 跨服）挑战怪物结束 B:战斗结果
    */
    ModelWenDingTX.prototype.fightEnd4233 = function (r) {
        var ba = this.getBytes();
        ba.writeByte(r);
        this.sendSocket(4233, ba);
    };
    /**4334 B
     * 挑战怪物结束 B:结果 1成功
    */
    ModelWenDingTX.prototype.fightEnd4234 = function (m, ba) {
        var ret = ba.readByte();
        var str = "";
        switch (ret) {
            case 2:
                str = "不在活动房间内";
                break;
            case 3:
                str = "玩家数据异常";
                break;
            case 4:
                str = "该层怪物未初始化";
                break;
            case 5:
                str = "你没有与怪物战斗";
                break;
            case 6:
                str = "怪物不存在";
                break;
        }
        ViewCommonWarn.text(str);
        var battleret = ba.readByte();
        var awards = ConfigHelp.parseItemListBa(ba);
        GGlobal.control.notify(Enum_MsgType.WDTX_PVE_END, { "ret": battleret, "awards": awards });
    };
    /** 发送数据 是否是跨服协议 */
    ModelWenDingTX.prototype.sendSocket = function (cmd, ba, isCross) {
        if (!this.socket.webSocket.connect) {
            return;
        }
        this.socket.sendCMDBytes(cmd, ba, true);
    };
    ModelWenDingTX.prototype.rankScore4235 = function () {
        var ba = this.getBytes();
        this.sendSocket(4235, ba, true);
    };
    /**
     * 4236  [B-B]
     * 积分奖励 [B:表idB:状态0，1，2]奖励排行数据
    */
    ModelWenDingTX.prototype.rankScore4236 = function (m, ba) {
        var len = ba.readShort();
        m.rank_Score = [];
        for (var i = 0; i < len; i++) {
            var id = ba.readByte();
            var st = ba.readByte();
            var weight = void 0;
            if (st == 0) {
                weight = id - 100;
            }
            else if (st == 1) {
                weight = id - 10000;
            }
            else {
                weight = id;
            }
            m.rank_Score.push([id, st, weight]);
        }
        m.sortAndsetNoticeScoreRank();
    };
    ModelWenDingTX.prototype.rankScore4237 = function (idx) {
        var ba = this.getBytes();
        ba.writeByte(idx);
        this.sendSocket(4237, ba, true);
    };
    /**4238
     * B
     * 领取积分奖励返回 B:1成功、2积分不足、3已领取
    */
    ModelWenDingTX.prototype.rankScore4238 = function (m, ba) {
        var ret = ba.readByte();
        var id = ba.readByte();
        if (ret == 1) {
            var len = m.rank_Score.length;
            for (var i = 0; i < len; i++) {
                var ids = m.rank_Score[i][0];
                if (id == ids) {
                    m.rank_Score[i][1] = 2;
                    m.rank_Score[i][2] = id;
                    break;
                }
            }
            m.sortAndsetNoticeScoreRank();
        }
        else if (ret == 2) {
            ViewCommonWarn.text("积分不足");
        }
        else if (ret == 3) {
            ViewCommonWarn.text("已经领取");
        }
    };
    return ModelWenDingTX;
}(BaseModel));
__reflect(ModelWenDingTX.prototype, "ModelWenDingTX");
