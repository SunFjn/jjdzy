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
var ModelLiangCao = (function (_super) {
    __extends(ModelLiangCao, _super);
    function ModelLiangCao() {
        var _this = _super.call(this) || this;
        //1开启中state
        _this.act_sate = 0;
        _this.isInScene = 0;
        _this.mvp_score = 0;
        _this.winZone = "0";
        _this.myScore = 0;
        _this.myRank = 0;
        //活动结束时间
        _this.remaindTime = 0;
        //小怪刷新时间 这个是计算出来的后端第一次刷新时间，后面的时间前端 %60
        _this.monsterFreshTime = 0;
        //BOSS状态 st:0刷新 1击杀
        _this.bossData = [];
        //区服数据，按照积分排序
        _this.server_data = [];
        //排行榜数据集 个人
        _this.rankdata_person = [];
        //排行榜数据集 积分
        _this.rankdata_score = [];
        _this._maxScoreCFGLength = 0;
        _this.checkRedot = function () {
            var self = _this;
            var ret = false;
            var score = self.myScore;
            var data = self.rankdata_score;
            for (var i in data) {
                var item = data[i];
                var id = item.id;
                if (item.st == 1) {
                    ret = true;
                    break;
                }
                var cfg = Config.ricemb_290[id];
                if (item.st == 0) {
                    if (score >= cfg.point) {
                        ret = true;
                        break;
                    }
                }
            }
            GGlobal.reddot.setCondition(UIConst.LIANGCAO_RANK, 0, ret);
            GGlobal.reddot.notify(UIConst.LIANGCAO_RANK);
        };
        _this.hasSend = 0;
        return _this;
    }
    ModelLiangCao.prototype.getMaxScore = function () {
        var maxScore = 0;
        var data = this.server_data;
        for (var i = 0; i < data.length; i++) {
            maxScore = Math.max(maxScore, data[i].score);
        }
        return maxScore;
    };
    Object.defineProperty(ModelLiangCao.prototype, "maxScoreCFGLength", {
        get: function () {
            if (this._maxScoreCFGLength == 0) {
                var lib = Config.ricemb_290;
                for (var i in lib) {
                    this._maxScoreCFGLength++;
                }
            }
            return this._maxScoreCFGLength;
        },
        enumerable: true,
        configurable: true
    });
    ModelLiangCao.getPersonalCFG = function (idx) {
        if (!ModelLiangCao._personCFG) {
            ModelLiangCao._personCFG = [];
            var cfg = Config.ricerank2_290;
            for (var i in cfg) {
                var ranks = JSON.parse(cfg[i].rank)[0];
                for (var j = ranks[0]; j <= ranks[1]; j++) {
                    ModelLiangCao._personCFG.push(cfg[i]);
                }
            }
        }
        return ModelLiangCao._personCFG[idx];
    };
    //协议处理
    ModelLiangCao.prototype.listenServ = function (mgr) {
        var self = this;
        self.socket = mgr;
        //注册GC方法
        mgr.regHand(10100, self.GC_BattleGoods_sysState_10100, self);
        mgr.regHand(10102, self.GC_BattleGoods_inscene_10102, self);
        mgr.regHand(10104, self.GC_BattleGoods_initinfo_10104, self);
        mgr.regHand(10106, self.GC_BattleGoods_battleMonster_10106, self);
        mgr.regHand(10108, self.GC_BattleGoods_getBatMonReward_10108, self);
        mgr.regHand(10110, self.GC_BattleGoods_getBox_10110, self);
        mgr.regHand(10112, self.GC_BattleGoods_stopgetbox_10112, self);
        mgr.regHand(10114, self.GC_BattleGoods_getBoxReward_10114, self);
        mgr.regHand(10116, self.GC_BattleGoods_battlePvp_10116, self);
        mgr.regHand(10118, self.GC_BattleGoods_pvprest_10118, self);
        mgr.regHand(10120, self.GC_BattleGoods_stateInfo_10120, self);
        mgr.regHand(10122, self.GC_BattleGoods_sourceChange_10122, self);
        mgr.regHand(10124, self.GC_BattleGoods_rewardUi_10124, self);
        mgr.regHand(10126, self.GC_BattleGoods_rewardcharge_10126, self);
        mgr.regHand(10128, self.GC_BattleGoods_outscene_10128, self);
        mgr.regHand(10130, self.GC_BattleGoods_personalRank_10130, self);
        mgr.regHand(10132, self.GC_BattleGoods_zoneRank_10132, self);
        mgr.regHand(10134, self.relife_10134, self);
        mgr.regHand(10136, self.scoreUpdate_10136, self);
        mgr.regHand(10138, self.acitivity_end, self);
        mgr.regHand(10140, self.monster_update, self);
    };
    /**10100 B GC 粮草抢夺活动状态 B:2开启中state*/
    ModelLiangCao.prototype.GC_BattleGoods_sysState_10100 = function (self, data) {
        self.act_sate = data.readByte();
        GGlobal.reddot.setCondition(UIConst.LIANGCAO, 0, self.act_sate == 2);
        GGlobal.reddot.notify(UIConst.LIANGCAO);
        self.notifyGlobal(UIConst.LIANGCAO);
    };
    /**10101  CG参加活动请求进入场景（跨服） */
    ModelLiangCao.prototype.CG_BattleGoods_inscene_10101 = function () {
        if (this.hasSend) {
            return;
        }
        if (this.act_sate != 2) {
            this.warn("活动尚未开启");
            return;
        }
        this.hasSend = 1;
        var bates = this.getBytes();
        this.sendSocket(10101, bates, true);
    };
    /**10102 B-I GC进入返回 B:0成功1失败 2活动结束 3进入cd中restI:cd时间cdtime*/
    ModelLiangCao.prototype.GC_BattleGoods_inscene_10102 = function (self, data) {
        self.hasSend = 0;
        var ret = data.readByte();
        var cd = data.readInt();
        if (ret == 3) {
            ViewCommonWarn.text("请等待" + cd + "秒");
        }
        else if (ret == 2) {
            ViewCommonWarn.text("活动已结束");
        }
        else if (ret == 0) {
            self.isInScene = 1;
        }
        else {
            ViewCommonWarn.text("活动未开启");
        }
    };
    /**10104 [B-I-I]-I-[I-B-I-B]-I-I  [B:阵营1 2 3I:区号I:区积分]sourceinfosI:我的积分mysource[I:boss系统idB:boss状态0死亡1活着I:复活时间B:是否被击杀过0没有1有]bossinfosI:下一波强盗刷新时间freshTimeI:活动结束时间overTime*/
    ModelLiangCao.prototype.GC_BattleGoods_initinfo_10104 = function (self, data) {
        self.hasSend = 0;
        var len = data.readShort();
        self.server_data = [];
        for (var i = 0; i < len; i++) {
            var camp = data.readByte();
            var zoneid = data.readInt();
            var score = data.readInt();
            var temp = {};
            temp.camp = camp;
            temp.zoneid = "s." + zoneid;
            temp.score = score;
            self.server_data.push(temp);
        }
        self.server_data.sort(function (a, b) {
            return a.score > b.score ? -1 : 1;
        });
        self.myScore = data.readInt();
        self.bossData = [];
        var now = Model_GlobalMsg.getServerTime();
        var len1 = data.readShort();
        for (var i = 0; i < len1; i++) {
            var bossid = data.readInt();
            var st = data.readByte();
            var time = data.readInt();
            var haskill = data.readByte();
            var temp = {};
            temp.id = bossid;
            temp.st = st;
            temp.time = time * 1000 + now;
            temp.taskst = haskill;
            self.bossData.push(temp);
        }
        self.monsterFreshTime = now - (ConfigHelp.getSystemNum(7605) - data.readInt()) * 1000;
        self.remaindTime = data.readInt() * 1000 + now;
        ModelArpgMap.myCamp = data.readByte();
        self.notifyGlobal(UIConst.LIANGCAO);
    };
    /**10105 L CG请求挑战怪物 L:请求挑战怪物mid*/
    ModelLiangCao.prototype.CG_BattleGoods_battleMonster_10105 = function (arg1) {
        var bates = this.getBytes();
        bates.writeLong(arg1);
        this.sendSocket(10105, bates);
    };
    /**10106 B-L-B GC 请求挑战怪物返回 B:0成功1你的状态不对 2怪物正在战斗3怪不存在restL:怪物唯一的idmonsterid*/
    ModelLiangCao.prototype.GC_BattleGoods_battleMonster_10106 = function (self, data) {
        var result = data.readByte();
        var bossid = data.readLong();
        var npcid = bossid;
        var npc = GameUnitManager.findUnitByID(bossid);
        if (npc) {
            bossid = npc.cfgID;
        }
        else {
            ViewCommonWarn.text("场景上无法寻找到这个怪物");
            return;
        }
        LiangCaoPveCtr.instance.serverid = npcid;
        LiangCaoPveCtr.instance.bossid = bossid;
        if (result == 0) {
            GGlobal.mapscene.enterScene(SceneCtrl.LIANGCAO);
        }
        else if (result == 1) {
            self.warn("状态异常");
        }
        else if (result == 2) {
            self.warn("怪物正在战斗");
        }
        else if (result == 3) {
            self.warn("怪物已经被击杀");
        }
    };
    /**10107 L-B CG 通知后端pve战斗结果获取奖励与否 L:怪物idmonsteridB:0输了 1赢了 rest*/
    ModelLiangCao.prototype.CG_BattleGoods_getBatMonReward_10107 = function (arg1, arg2) {
        var bates = this.getBytes();
        bates.writeLong(arg1);
        bates.writeByte(arg2);
        this.sendSocket(10107, bates);
    };
    /**10108 L-B-I-[I-I-I] GC pve返回战斗结束界面 L:怪物唯一idmonsteridB:0输了 1赢了restI:我的积分source[I:奖励类型I:系统idI:数量]reward*/
    ModelLiangCao.prototype.GC_BattleGoods_getBatMonReward_10108 = function (self, data) {
        var booid = data.readLong();
        var battleResult = data.readByte();
        self.myScore = data.readInt();
        var awards = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var type = data.readInt();
            var id = data.readInt();
            var count = data.readInt();
            var vo;
            if (type == Enum_Attr.EQUIP) {
                vo = VoEquip.create(id);
            }
            else if (type == Enum_Attr.ITEM) {
                vo = VoItem.create(id);
            }
            else {
                vo = Vo_Currency.create(type);
            }
            vo.count = count;
            awards.push(vo);
        }
        self.notifyGlobal(UIConst.LIANGCAO_BATTLEEND, { "battleResult": battleResult, "awards": awards });
    };
    /**10109 L CG采集宝箱 L:宝箱唯一idboxid*/
    ModelLiangCao.prototype.CG_BattleGoods_getBox_10109 = function (arg1) {
        var bates = this.getBytes();
        bates.writeLong(arg1);
        this.sendSocket(10109, bates);
    };
    /**10110 B-L GC 采集宝箱返回 B:0可以采集 1有1人采集战斗 2有两个人正在抢夺中3复活cd中stateL:采集NPCIDnpcID*/
    ModelLiangCao.prototype.GC_BattleGoods_getBox_10110 = function (self, data) {
        var result = data.readByte();
        var npcid = data.readLong();
        if (result == 0) {
            var npc = GameUnitManager.findUnit(npcid, UnitType.NPC);
            CollectManager.begin(npc, 10000, Handler.create(self, self.collectHandler, [[npcid]], true));
        }
        else {
            self.warn(['', "他人正在采集", "正在被抢夺", "复活CD"][result]);
        }
    };
    ModelLiangCao.prototype.collectHandler = function (data) {
        this.CG_BattleGoods_getBoxReward_10113(data[0]);
    };
    /**10111 L CG 终止采集 L:宝箱唯一idboxid*/
    ModelLiangCao.prototype.CG_BattleGoods_stopgetbox_10111 = function (arg1) {
        var bates = this.getBytes();
        bates.writeLong(arg1);
        this.sendSocket(10111, bates);
    };
    /**10112 B-L GC 终止采集返回 B:0终止成功 1终止失败restL:宝箱唯一idboxid*/
    ModelLiangCao.prototype.GC_BattleGoods_stopgetbox_10112 = function (self, data) {
        var result = data.readByte();
        var npcid = data.readLong();
        CollectManager.serverEnd();
    };
    /**10113 L CG 采集成功获取奖励 L:宝箱唯一idboxid*/
    ModelLiangCao.prototype.CG_BattleGoods_getBoxReward_10113 = function (arg1) {
        var bates = this.getBytes();
        bates.writeLong(arg1);
        this.sendSocket(10113, bates);
    };
    /**10114 B-L GC 获取宝箱奖励 B:0成功1失败 2采集时间未到restL:箱子唯一idboxid*/
    ModelLiangCao.prototype.GC_BattleGoods_getBoxReward_10114 = function (self, data) {
        var result = data.readByte();
        var boxid = data.readLong();
        if (result == 0) {
            self.warn("采集成功");
        }
        else {
            self.warn(["", "采集失败", "采集时间未到", ""][result]);
        }
    };
    /**10115 L CG 怼某个玩家 L:玩家idbattlehid*/
    ModelLiangCao.prototype.CG_BattleGoods_battlePvp_10115 = function (arg1) {
        var bates = this.getBytes();
        bates.writeLong(arg1);
        this.sendSocket(10115, bates);
    };
    /**10116 B GC 怼某个玩家返回 B:0开打 1对方正在战斗 2复活cd中state*/
    ModelLiangCao.prototype.GC_BattleGoods_battlePvp_10116 = function (self, data) {
        var result = data.readByte();
        if (result > 0) {
            self.warn(["", "对方正在战斗", "复活cd", ""][result]);
        }
    };
    /**10118 B-I GC pvp通知玩家战斗结果 B:0胜利 1失败restI:我的积分source*/
    ModelLiangCao.prototype.GC_BattleGoods_pvprest_10118 = function (self, data) {
        var result = data.readByte();
        self.myScore = data.readInt();
        self.notifyGlobal(UIConst.LIANGCAO);
    };
    /**10120 [B-L-B-I] GC 地图上参与者/宝箱/怪物状态变化 [B:0参与者 1宝箱 2怪物L:唯一idB:状态 0自由 1采集中/被采集中 2pvp/中被两人抢夺中 3pve中 4pvp抢到宝箱中  5复活cd中I:复活cd时间]stateinfos*/
    ModelLiangCao.prototype.GC_BattleGoods_stateInfo_10120 = function (self, data) {
        var len = data.readShort();
        LiangCaoManager.playerStateDic = {};
        for (var i = 0; i < len; i++) {
            var type = data.readByte();
            var id = data.readLong();
            var state = data.readByte();
            var cd = data.readInt();
            LiangCaoManager.playerStateDic[id] = { "state": state, "cd": cd };
        }
        self.notifyGlobal(LiangCaoManager.UPDATE_SCENE_DATA);
    };
    /**10122 I GC 我的积分变化 I:我的积分mysource*/
    ModelLiangCao.prototype.GC_BattleGoods_sourceChange_10122 = function (self, data) {
        var temp = data.readInt();
        ViewCommonWarn.text("积分 +" + (temp - self.myScore));
        self.myScore = temp;
        self.checkRedot();
        self.notifyGlobal(UIConst.LIANGCAO);
    };
    /**10123  CG 奖励目标ui */
    ModelLiangCao.prototype.CG_BattleGoods_ui_10123 = function () {
        var bates = this.getBytes();
        this.sendSocket(10123, bates);
    };
    /**10124 [B-B] GC 打奖励目标ui [B:奖励序号B:奖励状态0不可领取 1可以领取 2领取]rewardinfos*/
    ModelLiangCao.prototype.GC_BattleGoods_rewardUi_10124 = function (self, data) {
        self.rankdata_score = [];
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var idx = data.readByte();
            var state = data.readByte();
            self.rankdata_score.push({ id: idx, st: state });
        }
        self.rankdata_score.sort(function (a, b) {
            return self.getRankWright(a) < self.getRankWright(b) ? -1 : 1;
        });
        self.checkRedot();
        self.notifyGlobal(UIConst.LIANGCAO_RANK);
    };
    ModelLiangCao.prototype.getRankWright = function (a) {
        var g = 0;
        if (a.st == 1) {
            g = a.id - 10000;
        }
        else if (a.st == 2) {
            g = 10000 + a.id;
        }
        else {
            g = a.id;
        }
        return g;
    };
    /**10125 B CG 获取奖励 B:奖励序号index*/
    ModelLiangCao.prototype.CG_BattleGoods_getreward_10125 = function (arg1) {
        var bates = this.getBytes();
        bates.writeByte(arg1);
        this.sendSocket(10125, bates);
    };
    /**10126 B-B GC 奖励发生变化 B:奖励序号indexB:奖励状态state*/
    ModelLiangCao.prototype.GC_BattleGoods_rewardcharge_10126 = function (self, data) {
        var idx = data.readByte();
        var state = data.readByte();
        var len = self.rankdata_score.length;
        for (var i = 0; i < len; i++) {
            if (self.rankdata_score[i].id == idx) {
                self.rankdata_score[i].st = state;
                break;
            }
        }
        self.rankdata_score.sort(function (a, b) {
            return self.getRankWright(a) < self.getRankWright(b) ? -1 : 1;
        });
        self.checkRedot();
        self.notifyGlobal(UIConst.LIANGCAO_RANK);
    };
    /**10127 B CG 退出场景*/
    ModelLiangCao.prototype.CG_BattleGoods_getreward_10127 = function () {
        var bates = this.getBytes();
        this.sendSocket(10127, bates);
    };
    /**10128 GC 退出场景返回 B:0成功 1失败*/
    ModelLiangCao.prototype.GC_BattleGoods_outscene_10128 = function (self, data) {
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        self.isInScene = 0;
    };
    /**10129
B
CG 获取排行榜 B:0个人排行 1区服排名*/
    ModelLiangCao.prototype.CG_BattleGoods_personalRank_10129 = function (TYPE) {
        var bates = this.getBytes();
        bates.writeByte(TYPE);
        this.sendSocket(10129, bates);
    };
    /**10130
[B-L-U-I]-I-B
GC 个人积分排行榜 [B:名次L:玩家idU:我的名字I:积分]I:我的积分B:我的排名*/
    ModelLiangCao.prototype.GC_BattleGoods_personalRank_10130 = function (self, data) {
        self.rankdata_person = [];
        var len = data.readShort();
        for (var i = len - 1; i >= 0; i--) {
            var temp = {};
            temp.rank = data.readByte();
            temp.name = data.readUTF();
            temp.score = data.readInt();
            self.rankdata_person.push(temp);
        }
        self.myScore = data.readInt();
        self.myRank = data.readByte();
        self.checkRedot();
        self.notifyGlobal(UIConst.LIANGCAO_RANK);
    };
    /**10132 [B-B-I-I]
GC 区服积分排名 [B:排名B:阵营（1 2 3）I:区服idI:积分]*/
    ModelLiangCao.prototype.GC_BattleGoods_zoneRank_10132 = function (self, data) {
        self.server_data = [];
        var len = data.readShort();
        for (var i = len - 1; i >= 0; i--) {
            var temp = {};
            temp.rank = data.readByte();
            temp.camp = data.readByte();
            temp.zoneid = "s." + data.readInt();
            temp.score = data.readInt();
            self.server_data.push(temp);
        }
        self.mvp_name = data.readUTF();
        self.mvp_head = data.readInt();
        self.mvp_frame = data.readInt();
        self.mvp_score = data.readInt();
        self.notifyGlobal(UIConst.LIANGCAO_RANK);
    };
    ModelLiangCao.prototype.CG_relife_10133 = function () {
        var bates = this.getBytes();
        this.sendSocket(10133, bates);
    };
    /**复活 GC 买活返回 B:0成功 1失败 2钱不够*/
    ModelLiangCao.prototype.relife_10134 = function (self, data) {
        var ret = data.readByte();
        if (ret == 0) {
            self.notifyGlobal(LiangCaoManager.UPDATE_SCENE_DATA, Model_player.voMine.id);
            RevivePanel.hideView();
            GameUnitManager.hero.removePlugBytype(ArpgRoleStatePlug);
        }
        else if (ret == 1) {
            self.warn("复活失败");
        }
        else if (ret == 1) {
            self.warn("元宝不足");
        }
    };
    /**GC 某个区服阵营积分变化 I:阵营1-3I:区服I:积分*/
    ModelLiangCao.prototype.scoreUpdate_10136 = function (self, data) {
        var camp = data.readInt();
        var zone = data.readInt();
        var score = data.readInt();
        var arr = self.server_data;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].camp == camp) {
                arr[i].zoneid = "s." + zone;
                arr[i].score = score;
                break;
            }
        }
        self.server_data.sort(function (a, b) {
            return a.score > b.score ? -1 : 1;
        });
        self.notifyGlobal(UIConst.LIANGCAO);
    };
    /**acitivity_end*/
    ModelLiangCao.prototype.acitivity_end = function (self, data) {
        var arr = self.server_data;
        var long = data.readShort();
        for (var i = 0; i < long; i++) {
            var zone = "s." + data.readInt();
            var score = data.readInt();
            for (var i_1 = 0; i_1 < arr.length; i_1++) {
                if (arr[i_1].zoneid == zone) {
                    arr[i_1].score = score;
                    break;
                }
            }
        }
        self.mvp_name = data.readUTF();
        self.mvp_head = data.readInt();
        self.mvp_frame = data.readInt();
        GGlobal.layerMgr.open(UIConst.LIANGCAO_RESULT);
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        self.isInScene = 0;
    };
    ModelLiangCao.prototype.monster_update = function (self, data) {
        var now = Model_GlobalMsg.getServerTime();
        var bossdata = self.bossData;
        var len1 = bossdata.length;
        var bossid = data.readInt();
        var camp = data.readByte();
        var time = data.readInt();
        var haskill = camp == ModelArpgMap.myCamp ? 1 : 0;
        for (var i = 0; i < len1; i++) {
            var temp = self.bossData[i];
            if (temp.id == bossid) {
                temp.st = 0;
                temp.time = time * 1000 + now;
                temp.taskst = haskill;
            }
        }
        self.notifyGlobal(UIConst.LIANGCAO);
    };
    ModelLiangCao.prototype.sendSocket = function (cmd, ba, isCross) {
        if (!this.socket.webSocket.connect) {
            return;
        }
        this.socket.sendCMDBytes(cmd, ba, true);
    };
    ModelLiangCao.checkNpcQuility = function (npcid) {
        if (!this._dic) {
            this._dic = {};
            var cfg = Config.rice_290;
            for (var i in cfg) {
                var id = cfg[i].npc;
                this._dic[id] = cfg[i];
            }
        }
        if (this._dic[npcid]) {
            return this._dic[npcid].pz;
        }
        else {
            return -1;
        }
    };
    //阵营
    ModelLiangCao.CAMP_1 = 1;
    ModelLiangCao.CAMP_2 = 2;
    ModelLiangCao.CAMP_3 = 3;
    return ModelLiangCao;
}(BaseModel));
__reflect(ModelLiangCao.prototype, "ModelLiangCao");
