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
var ModelFengHuoLY = (function (_super) {
    __extends(ModelFengHuoLY, _super);
    function ModelFengHuoLY() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MVP = "";
        _this.blueScore = 0;
        _this.redScore = 0;
        _this.greenScore = 0;
        _this.blueServer = 0;
        _this.redServer = 0;
        _this.greenServer = 0;
        _this.myScore = 0;
        _this.myRank = 0;
        _this.myCamp = 1;
        _this.rank_player = [];
        _this.rank_server = [];
        _this.rank_score = [];
        _this.currentMVP = "";
        _this.currentMVPScore = 0;
        //城主变更 刷新场景单元
        _this.sceneUpdateMark = 0;
        /**主角当前状态 1 征收中  0空闲*/ _this._state = 0;
        _this.zhengshouID = 0;
        /**镜头模式*/
        _this.camera = 0;
        _this.inActivity = false;
        _this.cfg_rank_server = [];
        _this.cfg_rank_player = [];
        _this.cfg_rank_score = []; //[id, state]
        _this.cityOwners = {}; //无法保证城市数据和玩家数据的先后，所以单独存贮城主数据
        _this.scenePlayer = {};
        _this.cityDta = {};
        /**获取活动结束时间戳**/
        _this.endtime = 0;
        /**
         * 3559 I
         *  查看城信息 I:都城id
        */
        _this.checkID = 0;
        /**
         * 3565  I
         *  请求占领都城 I:都城id
        */
        _this.battleCityid = 0;
        /**
         * 3574 B-B
         *请求征收返回 B:请求征收结果：0：失败，1：成功B:失败：1：敌方卫城不可征收，2：未占领此城，3：人数已满
        */
        _this.startCollectTime = 0;
        /**
         * U-I-I-[I-L]
         * 更新MVP U:mvp玩家I:头像I:头像框[I:区号L:积分]区服积分数据
        */
        _this.endDta = [];
        _this.enterBattle = function () {
            clearTimeout(_this._times);
        };
        return _this;
    }
    Object.defineProperty(ModelFengHuoLY.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (val) {
            this._state = val;
            if (val == 0) {
                this.startCollectTime = 0;
            }
            GGlobal.control.notify(Enum_MsgType.FHLY_STATE_CHANGE);
        },
        enumerable: true,
        configurable: true
    });
    ModelFengHuoLY.prototype.startCollect = function () {
        this.state = 1;
        this.startCollectTime = egret.getTimer();
        var id = Model_player.voMine.id;
        var vo = this.getPlayer(id);
        vo.soakCity = this.zhengshouID;
    };
    ModelFengHuoLY.prototype.stoptCollect = function () {
        this.state = 0;
        this.startCollectTime = egret.getTimer();
        var id = Model_player.voMine.id;
        var vo = this.getPlayer(id);
        vo.soakCity = 0;
    };
    ModelFengHuoLY.prototype.initDta = function () {
        var sf = this;
        if (sf.cfg_rank_server.length == 0) {
            var cfg = Config.fhlyreward_254;
            for (var i in cfg) {
                if (parseInt(i) == 11) {
                    sf.cfg_rank_server[0] = cfg[i];
                }
                else if (parseInt(i) == 12) {
                    sf.cfg_rank_server[1] = cfg[i];
                }
                else if (parseInt(i) == 13) {
                    sf.cfg_rank_server[2] = cfg[i];
                }
                else {
                    sf.cfg_rank_player.push(cfg[i]);
                }
            }
            var cfg1 = Config.fhlypotion_254;
            for (var k in cfg1) {
                sf.cfg_rank_score.push(cfg1[k]);
            }
            sf.cfg_rank_score = sf.cfg_rank_score.sort(function (a, b) {
                return a.id < b.id ? -1 : 1;
            });
            sf.cfg_rank_player = sf.cfg_rank_player.sort(function (a, b) {
                return a.id < b.id ? -1 : 1;
            });
        }
        var len = sf.cfg_rank_score.length;
        for (var i_1 = 0; i_1 < len; i_1++) {
            sf.rank_score[i_1] = [i_1 + 1, 0];
        }
        sf.scenePlayer = {};
        sf.cityDta = {};
        sf.blueServer = 0;
        sf.redServer = 0;
    };
    /**前端更新积分排行榜的状态*/
    ModelFengHuoLY.prototype.updateScoreRank = function () {
        var sf = this;
        var len = sf.cfg_rank_score.length;
        for (var i = 0; i < len; i++) {
            var now = sf.myScore;
            var data = sf.rank_score[i];
            var idx = data[0];
            var condition = sf.cfg_rank_score[idx - 1].potion;
            if (now >= condition) {
                if (data[1] == 0) {
                    sf.rank_score[i][1] = 1;
                }
            }
            else {
                sf.rank_score[i][1] = 0;
            }
        }
    };
    ModelFengHuoLY.prototype.updateScoreRankByServer = function (obj) {
        var sf = this;
        var len = sf.cfg_rank_score.length;
        var hasNotice = false;
        for (var i = 0; i < len; i++) {
            var now = sf.myScore;
            var data = sf.rank_score[i];
            var idx = data[0];
            if (obj[idx]) {
                sf.rank_score[i][1] = 2;
            }
            if (!hasNotice && sf.rank_score[i] && sf.rank_score[i][1])
                hasNotice = sf.rank_score[i][1] == 1;
        }
        sf.rank_score = sf.rank_score.sort(function (a, b) {
            var a_weight = 0;
            var b_weight = 0;
            if (a[1] == 2) {
                a_weight = a[0] + 10000;
            }
            else if (a[1] == 1) {
                a_weight = a[0] - 10000;
            }
            else {
                a_weight = a[0];
            }
            if (b[1] == 2) {
                b_weight = b[0] + 10000;
            }
            else if (b[1] == 1) {
                b_weight = b[0] - 10000;
            }
            else {
                b_weight = b[0];
            }
            return a_weight < b_weight ? -1 : 1;
        });
        GGlobal.reddot.setCondition(UIConst.FHLY, 0, hasNotice);
        GGlobal.reddot.notify(UIConst.FHLY);
    };
    ModelFengHuoLY.prototype.updateScore = function (camp, server, score) {
        var s = this;
        if (camp == ModelFengHuoLY.RED) {
            s.redServer = server;
            s.redScore = score;
        }
        else if (camp == ModelFengHuoLY.BLUE) {
            s.blueServer = server;
            s.blueScore = score;
        }
        else if (camp == ModelFengHuoLY.GREEN) {
            s.greenServer = server;
            s.greenScore = score;
        }
    };
    ModelFengHuoLY.prototype.getCity = function (id) {
        if (!this.cityDta[id]) {
            this.cityDta[id] = Vo_City.create(id);
        }
        return this.cityDta[id];
    };
    ModelFengHuoLY.prototype.setPlayerXY = function (id, x, y) {
        var vo = this.getPlayer(id);
        if (vo) {
            vo.xx = x;
            vo.yy = y;
        }
    };
    ModelFengHuoLY.prototype.getPlayer = function (pid) {
        var serverDta = this.scenePlayer;
        var vo = serverDta[pid];
        return vo;
    };
    //玩家是否拥有城池
    ModelFengHuoLY.prototype.hasCity = function (pid) {
        return this.cityOwners[pid] && this.cityOwners[pid] > 0;
    };
    //玩家是否处于征收状态
    ModelFengHuoLY.prototype.inCity = function (pid) {
        var vo = this.getPlayer(pid);
        return vo && vo.soakCity > 0;
    };
    ModelFengHuoLY.prototype.getMyCity = function () {
        var sf = this;
        var dic = sf.cityDta;
        for (var i in dic) {
            if (dic[i].owerID == Model_player.voMine.id) {
                return dic[i].id;
            }
        }
        return -1;
    };
    ModelFengHuoLY.prototype.getEndTime = function () {
        var t = Model_GlobalMsg.getServerTime();
        this.endtime = TimeUitl.getTime(t, 20, 20);
        return this.endtime;
    };
    //获取当前可以拿到的征收奖励
    ModelFengHuoLY.prototype.getNowAward = function () {
        var ret;
        var id = this.getMyCity();
        if (id > 0) {
            var cfg = Config.fhly_254[id];
            ret = [cfg.reward1, cfg.potion1];
        }
        if (id == -1) {
            id = this.zhengshouID;
            if (id > 0) {
                var cfg = Config.fhly_254[id];
                ret = [cfg.reward, cfg.potion];
            }
        }
        return ret;
    };
    ModelFengHuoLY.prototype.destory = function () {
        var sf = this;
        sf.cityOwners = {};
        sf.state = 0;
        sf.camera = 0;
        sf.zhengshouID = 0;
    };
    ModelFengHuoLY.prototype.enter = function () {
        this.CG_ENTER_3557();
    };
    ModelFengHuoLY.prototype.exite = function () {
        GGlobal.layerMgr.closeAllPanel();
        GGlobal.layerMgr.close2(UIConst.FHLY);
    };
    ModelFengHuoLY.prototype.listenServ = function (wsm) {
        var sf = this;
        sf.socket = wsm;
        wsm.regHand(3552, sf.GC_OPENUI_3552, sf);
        wsm.regHand(3554, sf.GC_PLAYERRANK_3554, sf);
        wsm.regHand(3556, sf.GC_SERVERRANK_3556, sf);
        wsm.regHand(3558, sf.GC_ENTER_3558, sf);
        wsm.regHand(3560, sf.GC_CITY_3560, sf);
        wsm.regHand(3562, sf.GC_MOVE_3562, sf);
        wsm.regHand(3564, sf.GC_SYSCHRO_3564, sf);
        wsm.regHand(3566, sf.GC_OCCUPY_3566, sf);
        wsm.regHand(3568, sf.GC_BATTLEEND_3568, sf);
        wsm.regHand(3570, sf.GC_SCOREAWARD_3570, sf);
        wsm.regHand(3572, sf.GC_SCORERANK_3572, sf);
        wsm.regHand(3574, sf.GC_LEVY_3574, sf);
        wsm.regHand(3576, sf.GC_QUIT_3576, sf);
        wsm.regHand(3578, sf.GC_REFRESH_3578, sf);
        wsm.regHand(3580, sf.GC_ADDPLAYER_3580, sf);
        wsm.regHand(3582, sf.GC_SCENE_BUILD_3582, sf);
        wsm.regHand(3584, sf.GC_HERO_SCORE_3584, sf);
        wsm.regHand(3586, sf.GC_CITY_STATE_3586, sf);
        wsm.regHand(3588, sf.GC_PLAYER_STATE_3588, sf);
        wsm.regHand(3590, sf.GC_CHECK_3590, sf);
        wsm.regHand(3592, sf.GC_REVIVE_3592, sf);
        wsm.regHand(3594, sf.GC_MVP_3594, sf);
        wsm.regHand(3596, sf.GC_SCORE_3596, sf);
        wsm.regHand(3598, sf.GC_BATTLE_3598, sf);
    };
    /**
     * 3551
     * 打开UI
    */
    ModelFengHuoLY.prototype.CG_OPENUI_3551 = function () {
        var bates = this.getBytes();
        this.sendSocket(3551, bates);
    };
    /**
     * 3552 U
     * 打开界面信息返回 U:上届MVP玩家名
    */
    ModelFengHuoLY.prototype.GC_OPENUI_3552 = function (model, ba) {
        model.MVP = ba.readUTF();
    };
    /**
     * 3553
     * 获取个人排行榜
    */
    ModelFengHuoLY.prototype.CG_PLAYERRANK_3553 = function () {
        var bates = this.getBytes();
        this.sendSocket(3553, bates, true);
    };
    /**
     * 3552 [I-U-L]-I-L
     * 个人排行数据 [I:排名U:玩家名字L:积分]个人排行数据I:自己的排名L:自己的积分
    */
    ModelFengHuoLY.prototype.GC_PLAYERRANK_3554 = function (model, ba) {
        model.rank_player = [];
        var temp = [];
        for (var i = 0, j = ba.readShort(); i < j; i++) {
            model.rank_player.push([ba.readInt(), ba.readUTF(), ba.readLong()]);
        }
        model.myRank = ba.readInt();
        model.myScore = ba.readLong();
        model.updateScoreRank();
        GGlobal.control.notify(Enum_MsgType.FHLY_PLAYER_UPDATE);
    };
    /**
     * 3555
     *  获取区排行
    */
    ModelFengHuoLY.prototype.CG_SERVERRANK_3555 = function () {
        var bates = this.getBytes();
        this.sendSocket(3555, bates, true);
    };
    /**
     * 3556 [I-U-L]-U-L-I-I
     * 区排行数据返回 [I:排名U:区号L:总积分]区排行数据U:MVP玩家名L:当前MVP玩家积分I:MVP头像I:MVP头像框
    */
    ModelFengHuoLY.prototype.GC_SERVERRANK_3556 = function (model, ba) {
        model.rank_server = [];
        for (var i = 0, j = ba.readShort(); i < j; i++) {
            var temp = [ba.readInt(), ba.readInt(), ba.readLong()];
            ModelFengHuoLY.maxScore = Math.max(temp[2], ModelFengHuoLY.maxScore);
            model.rank_server.push(temp);
        }
        model.currentMVP = ba.readUTF();
        model.currentMVPScore = ba.readLong();
        model.mvpHead = ba.readInt();
        model.mvpHeadGrid = ba.readInt();
        GGlobal.control.notify(Enum_MsgType.FHLY_SERVER_UPDATE);
    };
    /**
     * 3557
     *  请求进入活动
    */
    ModelFengHuoLY.prototype.CG_ENTER_3557 = function () {
        var bates = this.getBytes();
        this.sendSocket(3557, bates);
    };
    /**
     * 3558 B-B
     * 请求进入结果返回 B:结果：0：失败，1：成功B:失败类型：（1：已满人，2：冷却中，3：活动未开启）
    */
    ModelFengHuoLY.prototype.GC_ENTER_3558 = function (model, ba) {
        var ret = ba.readByte();
        var retType = ba.readByte();
        if (ret == 0) {
            if (retType == 1) {
                ViewCommonWarn.text("当前活动已满人");
            }
            else if (retType == 2) {
                var coolTime = ba.readByte();
                ViewCommonWarn.text("进入太频繁，请" + coolTime + "s后进入");
            }
            else if (retType == 3) {
                ViewCommonWarn.text("活动尚未开启");
            }
        }
        else {
            GGlobal.layerMgr.closeAllPanel();
            model.initDta();
            GGlobal.layerMgr.open(UIConst.FHLY);
        }
    };
    ModelFengHuoLY.prototype.CG_CHECK_3559 = function (val) {
        var bates = this.getBytes();
        bates.writeInt(val);
        this.checkID = val;
        this.sendSocket(3559, bates, true);
    };
    /**
     * 3560 L-U-L-I-I-I-I
     * 返回都城信息 L:玩家idU:玩家名L:战力I:头像I:头像框I:当前血量百分比I:征收人数
    */
    ModelFengHuoLY.prototype.GC_CITY_3560 = function (model, ba) {
        var vo = model.getCity(model.checkID);
        vo.owerID = ba.readLong();
        vo.ower = ba.readUTF();
        vo.power = ba.readLong();
        vo.head = ba.readInt();
        vo.headGrid = ba.readInt();
        vo.hp = ba.readInt();
        vo.hasTakeCount = ba.readInt();
        GGlobal.control.notify(Enum_MsgType.FHLY_CHECKCITY, vo);
    };
    ModelFengHuoLY.prototype.CG_MOVE_3561 = function (val, val1) {
        var bates = this.getBytes();
        bates.writeInt(val);
        bates.writeInt(val1);
        this.sendSocket(3561, bates, true);
    };
    /**
     * 3562 B-B
     * 移动结果 B:移动结果：0：失败，1：成功B:失败：1:战斗中不可移动
    */
    ModelFengHuoLY.prototype.GC_MOVE_3562 = function (model, ba) {
        var ret = ba.readByte();
        var retType = ba.readByte();
        if (ret == 1) {
            GGlobal.control.notify(Enum_MsgType.FHLY_HERO_MOVE);
        }
        else {
            if (retType == 1) {
                ViewCommonWarn.text("战斗中不可移动");
            }
        }
    };
    /**
     * 3564 L-B-I-I
     * 同步玩家移动 L:玩家idI:目的地坐标XI:目的地坐标
    */
    ModelFengHuoLY.prototype.GC_SYSCHRO_3564 = function (model, ba) {
        var ret = { id: ba.readLong(), type: ba.readByte(), x: ba.readInt(), y: ba.readInt() };
        var vo = model.getPlayer(ret.id);
        if (!vo)
            return;
        vo.soakCity = 0;
        if (Model_player.isMineID(ret.id)) {
            model.stoptCollect();
        }
        GGlobal.control.notify(Enum_MsgType.FHLY_SYSCHRO, ret);
    };
    ModelFengHuoLY.prototype.CG_OCCUPY_3565 = function (val) {
        var bates = this.getBytes();
        this.battleCityid = val;
        bates.writeInt(val);
        this.sendSocket(3565, bates, true);
    };
    /**
     * 3566 B-B-L-L-L-L-I
     * 请求占领返回 B:结果：0：失败，1：成功B:成功：战斗结果0失败，1胜利；失败：;L:挑战者IdL:挑战者剩余血量L:守卫者IdL:守卫者剩余血量I:战斗唯一i
    */
    ModelFengHuoLY.prototype.GC_OCCUPY_3566 = function (model, ba) {
        var ret = ba.readByte();
        if (ret == 1) {
            var battleRet = ba.readByte();
            var leftid = ba.readLong();
            var lefthp = ba.readLong();
            var leftEndHp = ba.readLong();
            var msDmg_left = ba.readLong();
            var rightid = ba.readLong();
            var righthp = ba.readLong();
            var rightEndHp = ba.readLong();
            var msDmg_right = ba.readLong();
            var battleID = ba.readInt();
            console.log("秒伤：" + msDmg_left + "___" + msDmg_right);
            if (battleID == 0) {
                ViewCommonWarn.text("占领成功");
                return;
            }
            var m = GGlobal.modelPlayer;
            var left = void 0;
            var right = void 0;
            var inLeft = false;
            if (Model_player.isMineID(leftid)) {
                left = Model_player.voMine;
                right = m.playerDetailDic[rightid];
                inLeft = true;
            }
            else {
                right = Model_player.voMine;
                left = m.playerDetailDic[leftid];
            }
            if (!left || !right) {
                return;
            }
            var scenectrl;
            scenectrl = SceneCtrl.getCtrl(SceneCtrl.FHLY);
            scenectrl.fightType = 2;
            scenectrl.leftPlayer = left;
            scenectrl.rightPlayer = right;
            scenectrl.battleRet = battleRet;
            scenectrl.battleID = battleID;
            scenectrl.lefthp = lefthp;
            scenectrl.righthp = righthp;
            scenectrl.rightEndHp = rightEndHp;
            scenectrl.leftEndHp = leftEndHp;
            scenectrl.msDmg_left = msDmg_left;
            scenectrl.msDmg_right = msDmg_right;
            scenectrl.inLeft = inLeft;
            scenectrl.cityid = model.battleCityid;
            scenectrl.randomseed = 152;
            GGlobal.mapscene.scenetype = SceneCtrl.FHLY;
            if (GGlobal.sceneType == SceneCtrl.FHLY) {
                scenectrl.enterNextBattle();
            }
            GGlobal.mapscene.enterSceneCtrl(scenectrl);
            FengHuoLYCtr.enterBattle();
        }
        else {
            ViewCommonWarn.text("占领失败");
        }
    };
    /**
     * 3567  I
     *  战斗结算 I:战斗唯一Id
    */
    ModelFengHuoLY.prototype.CG_BATTLEEND_3567 = function (val) {
        var bates = this.getBytes();
        bates.writeInt(val);
        this.sendSocket(3567, bates, true);
    };
    /**
     * 3568 I-B-L-U-I-I-B-I
     *战斗结束刷新都城信息 I:都城idB:归属L:守城玩家idU:玩家名I:头像I:头像框B:征收玩家数量I剩余气血
    */
    ModelFengHuoLY.prototype.GC_BATTLEEND_3568 = function (model, ba) {
        var vo = model.getCity(ba.readInt());
        vo.camp = ba.readByte();
        vo.owerID = ba.readLong();
        vo.ower = ba.readUTF();
        vo.head = ba.readInt();
        vo.headGrid = ba.readInt();
        vo.hasTakeCount = ba.readByte();
        vo.hp = ba.readInt();
        GGlobal.control.notify(Enum_MsgType.FHLY_CITY_UPDATE);
    };
    /**
     * 3569  B
     *  领取积分奖励 B:积分奖励id
    */
    ModelFengHuoLY.prototype.CG_SCOREAWARD_3569 = function (val) {
        var bates = this.getBytes();
        bates.writeByte(val);
        this.sendSocket(3569, bates);
    };
    /**
     * 3570 B-B
     *领取积分奖励结果 B:结果：0：失败，1：成功B:成功：积分奖励id，失败：（1：已领取，2：不存在，3：积分不足）
    */
    ModelFengHuoLY.prototype.GC_SCOREAWARD_3570 = function (model, ba) {
        var ret = ba.readByte();
        var id = ba.readByte();
        if (ret == 0) {
            if (id == 1) {
                ViewCommonWarn.text("已经领取");
            }
            else if (id == 2) {
                ViewCommonWarn.text("奖励不存在");
            }
            else if (id == 3) {
                ViewCommonWarn.text("积分不足");
            }
        }
        else {
            var temp = [];
            temp[id] = 2;
            model.updateScoreRankByServer(temp);
        }
        GGlobal.control.notify(Enum_MsgType.FHLY_SCORERANK_UPDATE);
    };
    /**
     * 3571
     *  获取积分奖励状态列表
    */
    ModelFengHuoLY.prototype.CG_SCORELIST_3571 = function () {
        var bates = this.getBytes();
        this.sendSocket(3571, bates);
    };
    /**
     * 3572 [B]
     *返回已领取奖励id [B:奖励id]已领取奖励id
    */
    ModelFengHuoLY.prototype.GC_SCORERANK_3572 = function (model, ba) {
        var obj = [];
        for (var i = 0, j = ba.readShort(); i < j; i++) {
            obj[ba.readByte()] = 2;
        }
        model.updateScoreRankByServer(obj);
        GGlobal.control.notify(Enum_MsgType.FHLY_SCORERANK_UPDATE);
    };
    /**
     *3573 i
     * 征收 I:都城id
    */
    ModelFengHuoLY.prototype.CG_LEVY_3573 = function (val) {
        var bates = this.getBytes();
        bates.writeInt(val);
        this.sendSocket(3573, bates, true);
    };
    ModelFengHuoLY.prototype.GC_LEVY_3574 = function (model, ba) {
        var ret = ba.readByte();
        var retType = ba.readByte();
        if (ret == 0) {
            if (retType == 1) {
                ViewCommonWarn.text("敌方卫城不可征收");
            }
            else if (retType == 2) {
                ViewCommonWarn.text("还没有占领");
            }
            else if (retType == 3) {
                ViewCommonWarn.text("人数已满");
            }
            else if (retType == 4) {
                ViewCommonWarn.text("本城池已被敌方抢夺");
            }
        }
        else {
            ViewCommonWarn.text("征收成功");
            model.startCollect();
        }
    };
    /**
     *3575  退出
    */
    ModelFengHuoLY.prototype.CG_QUIT_3575 = function () {
        var bates = this.getBytes();
        this.sendSocket(3575, bates, true);
    };
    /**
     * 3576 B
     *  退出结果返回 B:结果：0：失败，1：成功
    */
    ModelFengHuoLY.prototype.GC_QUIT_3576 = function (model, ba) {
        var ret = ba.readByte();
        if (ret == 0) {
            ViewCommonWarn.text("退出失败");
        }
        else {
            ViewCommonWarn.text("退出成功");
        }
    };
    /**
     *3578 [I-B-L-U-I-I-B]
     *刷新所有都城信息 [I:都城idB:归属 1蓝，2红L:守卫者idU:名字I:头像I:头像框B:征收玩家数量I:剩余血量百分比B:0：正常，1：战斗状态]都城信息
    */
    ModelFengHuoLY.prototype.GC_REFRESH_3578 = function (model, ba) {
        var len = ba.readShort();
        for (var i = 0, j = len; i < j; i++) {
            var id = ba.readInt();
            var vo = model.getCity(id);
            vo.camp = ba.readByte();
            vo.owerID = ba.readLong();
            vo.ower = ba.readUTF();
            vo.head = ba.readInt();
            vo.headGrid = ba.readInt();
            vo.hasTakeCount = ba.readByte();
            vo.hp = ba.readInt();
            vo.state = ba.readByte();
        }
        GGlobal.control.notify(Enum_MsgType.FHLY_CITY_UPDATE);
    };
    /**
     *3580 [L-U-I-B-I-I-I-I]
     *发送显示的玩家数据 [L:玩家idU:玩家名I:职业I:神兵B:归属I:头像I:头像框I:坐标XI:坐标Y B征收状态]显示的玩家数据
    */
    ModelFengHuoLY.prototype.GC_ADDPLAYER_3580 = function (model, ba) {
        model.scenePlayer = {};
        console.log("3580 刷新玩家列表");
        for (var i = 0, j = ba.readShort(); i < j; i++) {
            var id = ba.readLong();
            var vo = new Vo_FHPlayer();
            vo.id = id;
            vo.name = ba.readUTF();
            vo.job = ba.readInt();
            vo.godweapon = ba.readInt();
            vo.camp = ba.readByte();
            vo.head = ba.readInt();
            vo.headGrid = ba.readInt();
            vo.xx = ba.readInt();
            vo.yy = ba.readInt();
            var st = ba.readByte();
            vo.soakCity = st == 0 ? 0 : 9999;
            vo.horseId = ba.readInt();
            vo.speed = ba.readInt();
            model.scenePlayer[id] = vo;
            if (Model_player.isMineID(id)) {
                console.log("3580 发送了显示自己");
                model.hero = vo;
            }
        }
        var mid = Model_player.voMine.id;
        if (!model.scenePlayer[mid]) {
            console.log("3580 后端移除了自己");
            if (model.hero) {
                console.log("3580 劳资再给你加上");
                model.scenePlayer[mid] = model.hero;
            }
        }
        GGlobal.control.notify(Enum_MsgType.FHLY_SCENE_PLAYER);
    };
    /**
     *3582 I-I-B-L-I-B-L-I-B-L-L-B-I
     *进入活动场景返回信息 I:房间idI:A区号B:A归属L:A积分I:B区号B:B归属L:B积分I:C区号B:C归属L:C积分L:当前积分B:自己的归属I:剩余时间
    */
    ModelFengHuoLY.prototype.GC_SCENE_BUILD_3582 = function (model, ba) {
        model.roomid = ba.readInt();
        for (var i = 0; i < 3; i++) {
            var server = ba.readInt();
            var camp = ba.readByte();
            var score = ba.readLong();
            model.updateScore(camp, server, score);
        }
        model.myScore = ba.readLong();
        model.myCamp = ba.readByte();
        ModelFengHuoLY.maxScore = Math.max(model.redScore, model.greenScore, model.blueScore);
        GGlobal.control.notify(Enum_MsgType.FHLY_SCORE_INIT);
    };
    /**
     *3584 B-L-L
     *更新积分 B:更新类型1：个人，2：区L:个人积分；区：蓝方积分L:区：红方积分 L:区：绿方积分
    */
    ModelFengHuoLY.prototype.GC_HERO_SCORE_3584 = function (model, ba) {
        var type = ba.readByte();
        if (type == 1) {
            model.myScore = ba.readLong();
            model.updateScoreRank();
        }
        else {
            model.blueScore = ba.readLong();
            model.redScore = ba.readLong();
            model.greenScore = ba.readLong();
        }
        ModelFengHuoLY.maxScore = Math.max(model.redScore, model.greenScore, model.blueScore);
        GGlobal.control.notify(Enum_MsgType.FHLY_SCORE_UPDATE);
    };
    /**
     * 3586 I-B
     * 更新战斗状态 I:都城idB:状态：（0：正常，1：战斗中）
    */
    ModelFengHuoLY.prototype.GC_CITY_STATE_3586 = function (model, ba) {
        var id = ba.readInt();
        var state = ba.readByte();
        var vo = model.getCity(id);
        vo.state = state;
        GGlobal.control.notify(Enum_MsgType.FHLY_CITYSTATE_CHANGE, vo);
    };
    /**
     * 3577 i
     *  获取征收成员信息 I:都城id
    */
    ModelFengHuoLY.prototype.CG_CHECK_3577 = function (cityid) {
        var bates = this.getBytes();
        bates.writeInt(cityid);
        this.sendSocket(3577, bates, true);
    };
    /**
     * 3588 [l-B]
     * 	更新玩家状态 L:玩家idB:1：征收,2:离开 用于广播隐藏玩家模型
    */
    ModelFengHuoLY.prototype.GC_PLAYER_STATE_3588 = function (model, ba) {
        var id = ba.readLong();
        var st = ba.readByte();
        var vo = model.getPlayer(id);
        if (!vo)
            return;
        vo.soakCity = st == 2 ? 0 : 9999;
        if (Model_player.isMineID(id)) {
            if (st == 1) {
                console.log("开始收集：隐藏自己3588");
                model.startCollect();
            }
            else {
                console.log("停止收集：显示自己3588");
                model.stoptCollect();
            }
        }
        GGlobal.control.notify(Enum_MsgType.FHLY_PLAYER_STATE);
    };
    /**
     * 3590 [l-u]
     * 征收玩家数据 [L:玩家idU:玩家名字]玩家数据
    */
    ModelFengHuoLY.prototype.GC_CHECK_3590 = function (model, ba) {
        var arr = [];
        for (var i = 0, j = ba.readShort(); i < j; i++) {
            arr.push([ba.readLong(), ba.readUTF()]);
        }
        GGlobal.control.notify(Enum_MsgType.FHLY_CITY_PEOPLE, arr);
    };
    /**
     * 3579
     * 征收玩家数据 [L:玩家idU:玩家名字]玩家数据
    */
    ModelFengHuoLY.prototype.CG_SCORE_3579 = function () {
        this.sendSocket(3579, this.getBytes(), true);
    };
    ModelFengHuoLY.prototype.CG_REVIVE_3591 = function () {
        this.sendSocket(3591, this.getBytes(), true);
    };
    /**
     * B-B
    */
    ModelFengHuoLY.prototype.GC_REVIVE_3592 = function (model, ba) {
        var ret = ba.readByte();
        var rettype = ba.readByte();
        if (ret == 0) {
            if (rettype == 1) {
                ViewCommonWarn.text("已经复活");
                GGlobal.layerMgr.close2(UIConst.REVIVE_PANEL);
            }
            else if (rettype == 2) {
                ModelChongZhi.guideToRecharge();
            }
        }
        else {
            GGlobal.layerMgr.close2(UIConst.REVIVE_PANEL);
        }
    };
    ModelFengHuoLY.prototype.GC_MVP_3594 = function (model, ba) {
        model.MVP = ba.readUTF();
        model.mvpHead = ba.readInt();
        model.mvpHeadGrid = ba.readInt();
        var arr = [ModelFengHuoLY.RED, ModelFengHuoLY.BLUE, ModelFengHuoLY.GREEN];
        for (var i = 0, j = ba.readShort(); i < j; i++) {
            var sid = ba.readInt();
            var score = ba.readLong();
            var camp = 0;
            if (sid == model.redServer) {
                camp = ModelFengHuoLY.RED;
                model.redScore = score;
            }
            else if (sid == model.blueServer) {
                camp = ModelFengHuoLY.BLUE;
                model.blueScore = score;
            }
            else if (sid == model.greenServer) {
                camp = ModelFengHuoLY.GREEN;
                model.greenServer = score;
            }
            var idx = arr.indexOf(camp);
            if (idx > -1) {
                arr.splice(idx, 1);
            }
            model.endDta.push([camp, score, sid, 0]);
        }
        for (var i = 0; i < arr.length; i++) {
            model.endDta.push([arr[i], 0, 0, 0]);
        }
        GGlobal.control.notify(UIConst.FHLY + "end");
    };
    ModelFengHuoLY.prototype.GC_SCORE_3596 = function (model, ba) {
        GGlobal.layerMgr.open(UIConst.FHLY_SCORE);
    };
    ModelFengHuoLY.prototype.GC_BATTLE_3598 = function (model, ba) {
        var result = ba.readByte();
        var battleType = ba.readByte();
        var cityid = ba.readInt();
        clearTimeout(model._times);
        model._times = setTimeout(function () {
            GGlobal.control.remove(Enum_MsgType.ENTER_SERVERBATTLE, model.enterBattle);
            if (result == 0) {
                var obj = {};
                obj.id = cityid;
                obj.type = battleType;
                GGlobal.layerMgr.open(UIConst.FHLY_BATTLE, obj);
            }
            else {
                ViewCommonWarn.text("积分+" + ConfigHelp.getSystemNum(3902));
                ViewBattleFault.show(5000, model, "退出", model.onFaultUIExitT, model.onFaultUIExitT, model.onFaultUIExitT);
            }
            GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        }, 1000);
        GGlobal.control.listen(Enum_MsgType.ENTER_SERVERBATTLE, model.enterBattle, model);
    };
    ModelFengHuoLY.prototype.onFaultUIExitT = function (self, ui) {
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        FengHuoLYCtr.exiteBattle();
        // GGlobal.layerMgr.open(UIConst.REVIVE_PANEL, UIConst.FHLY);
    };
    ModelFengHuoLY.RED = 2;
    ModelFengHuoLY.BLUE = 1;
    ModelFengHuoLY.GREEN = 3;
    ModelFengHuoLY.CITYNAME = ["", "皇城", "都城", "卫城"];
    ModelFengHuoLY.CITYNAMECOLOR = [0, 0xFFC344, 0x3ba5ff, 0x15f234];
    ModelFengHuoLY.PLAYERNAMECOLOR = [0, 0x3ba5ff, 0xfe0000, 0x15f234];
    ModelFengHuoLY.maxScore = 0;
    return ModelFengHuoLY;
}(BaseModel));
__reflect(ModelFengHuoLY.prototype, "ModelFengHuoLY");
