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
var TaoYuanBossCtrl = (function (_super) {
    __extends(TaoYuanBossCtrl, _super);
    function TaoYuanBossCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = -1;
        _this.serverResult = 0;
        _this.initState = 0;
        //是否已经进入失败状态
        _this.hasExiteState = false;
        return _this;
    }
    TaoYuanBossCtrl.getInst = function () {
        return this._inst || (this._inst = new TaoYuanBossCtrl());
    };
    TaoYuanBossCtrl.prototype.onEnter = function (scene) {
        _super.prototype.onEnter.call(this, scene);
        var c = GGlobal.control;
        var s = this;
        this.hasExiteState = false;
        //首次取UI的气血数据，停留太久不保证正确
        var npcId = Model_TYJY.curBossID;
        var hp = Config.NPC_200[npcId].hp;
        GGlobal.model_TYJY.battleInfo.bossMaxHp = GGlobal.model_TYJY.battleInfo.bossHp = hp; //初始化boss初始值
        s.setSt(0);
        TaoYuanBossInfo.show();
        GGlobal.model_TYJY.listen(Model_TYJY.msg_batInfo, s.updateData, s);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        c.listen(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
        GGlobal.model_TYJY.listen(Model_TYJY.msg_beenKiller, s.generalKilled, s);
        GGlobal.model_TYJY.listen(Model_TYJY.msg_bossBeenKill, s.delayShowAward, s);
        GGlobal.model_TYJY.listen(Model_TYJY.ROLE_LIFE, s.roleState, s);
        GGlobal.model_TYJY.listen(Model_TYJY.MSG_PLAYER_RELIFE, s.generalRelife, s);
        GGlobal.model_TYJY.listen(Model_TYJY.SCENE_PLAYER_STATE, s.generalStateChange, s);
    };
    TaoYuanBossCtrl.prototype.onExit = function (scene) {
        var s = this;
        var c = GGlobal.control;
        s.serverResult = 0;
        GGlobal.model_TYJY.remove(Model_TYJY.msg_batInfo, s.updateData, s);
        GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        c.remove(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
        GGlobal.model_TYJY.remove(Model_TYJY.msg_beenKiller, s.generalKilled, s);
        GGlobal.model_TYJY.remove(Model_TYJY.msg_bossBeenKill, s.delayShowAward, s);
        GGlobal.model_TYJY.remove(Model_TYJY.ROLE_LIFE, s.roleState, s);
        GGlobal.model_TYJY.remove(Model_TYJY.MSG_PLAYER_RELIFE, s.generalRelife, s);
        GGlobal.model_TYJY.remove(Model_TYJY.SCENE_PLAYER_STATE, s.generalStateChange, s);
        TaoYuanBossInfo.hide();
        s.deadInvide = 0;
        s.roleState(0);
        _super.prototype.onExit.call(this, scene);
        s.setSt(-1);
        this.others = [];
    };
    TaoYuanBossCtrl.prototype.delayShowAward = function () {
        this.serverResult = 1; //标记已经获取到后端数据 并且把退出按钮屏蔽
        MainUIController.showBottomExite(false);
    };
    TaoYuanBossCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出副本将视为挑战失败,挑战次数不返还!\n是否退出?", Handler.create(this, this.directExite));
    };
    TaoYuanBossCtrl.prototype.directExite = function () {
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.model_TYJY.CG_QUIT_TAOYUANBOSS(0);
    };
    TaoYuanBossCtrl.prototype.tellDead = function () {
        GGlobal.model_TYJY.CG_QUIT_TAOYUANBOSS(2);
    };
    TaoYuanBossCtrl.prototype.updateData = function () {
        var s = this;
        var m = GGlobal.model_TYJY;
        if (!(s.initState & 1)) {
            s.initState |= 1;
            var boss = Config.NPC_200[Model_TYJY.curBossID];
            View_BossSceneHead.show(boss.ID, false, m.battleInfo.bossMaxHp, 0, 280, boss.name);
        }
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.battleInfo.bossHp);
        if (m.battleInfo.bossHp <= 0) {
            s.setSt(2);
        }
    };
    TaoYuanBossCtrl.prototype.update = function (ctx) {
        if (this.state == 0) {
            this.aiUpdate(ctx);
            this.scene.watchMainRole();
        }
        else if (this.state == 2) {
            GGlobal.layerMgr.close2(UIConst.REVIVE_PANEL);
            var now = egret.getTimer();
            if (now - this.dieTime >= 2000 && !GGlobal.layerMgr.isOpenView(UIConst.BATTLEWIN)) {
                if (!this.hasExiteState) {
                    this.hasExiteState = true;
                    GGlobal.model_TYJY.CG_QUIT_TAOYUANBOSS(0);
                }
            }
            else if (now - this.dieTime >= 10000) {
                if (!this.hasExiteState) {
                    this.hasExiteState = true;
                    GGlobal.model_TYJY.CG_QUIT_TAOYUANBOSS(0);
                }
            }
        }
        this.dmgByClient(this.enemyBoss, this.bossDmgPer);
    };
    TaoYuanBossCtrl.prototype.roleState = function (ret) {
        var role = Model_player.voMine.sceneChar;
        if (ret == 1) {
            GGlobal.layerMgr.open(UIConst.REVIVE_PANEL, UIConst.TYJY_YMFB);
            if (role) {
                GGlobal.mapscene.removeUnit(role);
            }
        }
        else {
            GGlobal.layerMgr.close2(UIConst.REVIVE_PANEL);
            if (!role) {
                this.createMyChars();
            }
            role = Model_player.voMine.sceneChar;
            role.curhp = role.maxhp;
        }
    };
    TaoYuanBossCtrl.prototype.setSt = function (st) {
        var s = this;
        if (st == 0) {
            s.createEnemys();
            var id = Model_TYJY.curBossID;
            var mapId = Config.map_200[390001].s;
            s.setMapHead(mapId);
        }
        else if (st == 1) {
            //自己死亡，等待复活
        }
        else if (st == 2) {
            s.dieTime = egret.getTimer();
            if (s.enemyBoss)
                s.enemyBoss.deadRemove();
            s.enemyBoss = null;
        }
        s.state = st;
    };
    TaoYuanBossCtrl.prototype.createEnemys = function () {
        var shanghai = Config.tyjyboss_251[Model_TYJY.curBossID].shanghai;
        var s = this;
        var id = Model_TYJY.curBossID;
        s.enemyBoss = s.createEmeny(id);
        var ai = new BossAI();
        ai.role = s.enemyBoss;
        s.enemyBoss.addPlug(ai);
        var bati = BaTiState.create(); //获得霸体
        bati.role = s.enemyBoss;
        s.enemyBoss.addPlug(bati);
        bati.maxTime = 9999999999; //长期霸体
        s.enemyBoss.att = Model_player.voMine.hp * shanghai / 100 + Model_player.voMine.def;
        s.enemyBoss.force = 2;
        s.setBossPos(s.enemyBoss);
        s.scene.addUnit(s.enemyBoss);
        s.bossDmgPer = shanghai;
        View_BossSceneHead.show(id, false, GGlobal.model_TYJY.battleInfo.bossMaxHp);
    };
    TaoYuanBossCtrl.prototype.generalRelife = function (lst) {
        for (var i = 0; i < lst.length; i++) {
            var id = lst[i];
            var role = GGlobal.mapscene.getUnit(id);
            if (role) {
                role.curhp = role.maxhp;
            }
            else if (GGlobal.modelPlayer.playerDetailDic[id]) {
                GGlobal.control.notify(Enum_MsgType.MSG_ADDROLEDETAIL, GGlobal.modelPlayer.playerDetailDic[id]);
            }
        }
        ArrayUitl.cleannull(this.others);
    };
    TaoYuanBossCtrl.prototype.createMyChars = function () {
        _super.prototype.createMyChars.call(this);
        var vomine = Model_player.voMine;
        var role = vomine.sceneChar;
        this.setRolePos(role);
        role.curhp = role.maxhp;
    };
    TaoYuanBossCtrl.prototype.aiUpdate = function (ctx) {
        var s = this;
        var vomine = Model_player.voMine;
        if (vomine.sceneChar && vomine.sceneChar.curhp > 0) {
            GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, s.searchEnemy, s, SkillUtil.userInputSkill);
        }
        for (var i = 0; i < s.others.length; i++) {
            if (s.others[i] && s.others[i].sceneChar && s.others[i].sceneChar.curhp > 0) {
                GuanQiaAI.thinkAttack(s.others[i].sceneChar, ctx, s.searchEnemy);
            }
        }
    };
    TaoYuanBossCtrl.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    return TaoYuanBossCtrl;
}(BossCtrl));
__reflect(TaoYuanBossCtrl.prototype, "TaoYuanBossCtrl");
