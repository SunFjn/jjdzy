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
var CountryBossCtrl = (function (_super) {
    __extends(CountryBossCtrl, _super);
    function CountryBossCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = -1;
        _this.serverResult = 0;
        _this.initState = 0;
        //是否已经进入失败状态
        _this.hasExiteState = false;
        return _this;
    }
    CountryBossCtrl.getInst = function () {
        return this._inst || (this._inst = new CountryBossCtrl());
    };
    CountryBossCtrl.prototype.onEnter = function (scene) {
        _super.prototype.onEnter.call(this, scene);
        var c = GGlobal.control;
        var s = this;
        this.hasExiteState = false;
        //首次取UI的气血数据，停留太久不保证正确
        var id = ModelCtryBoss.curBossID;
        var cfg = Config.gjboss_738[id];
        if (cfg) {
            var npcId = JSON.parse(cfg.boss)[0][1];
            var hp = Config.NPC_200[npcId].hp;
            GGlobal.modelCtryBoss.battleInfo.bossMaxHp = GGlobal.modelCtryBoss.battleInfo.bossHp = hp; //初始化boss初始值
        }
        s.setSt(0);
        CountryBossInfo.show();
        GGlobal.modelCtryBoss.listen(ModelCtryBoss.msg_batInfo, s.updateData, s);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        c.listen(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
        GGlobal.modelCtryBoss.listen(ModelCtryBoss.msg_beenKiller, s.generalKilled, s);
        GGlobal.modelCtryBoss.listen(ModelCtryBoss.msg_bossBeenKill, s.delayShowAward, s);
    };
    CountryBossCtrl.prototype.onExit = function (scene) {
        var s = this;
        var c = GGlobal.control;
        s.serverResult = 0;
        c.remove(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, s.updateData, s);
        GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        c.remove(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
        GGlobal.modelCtryBoss.remove(ModelCtryBoss.msg_beenKiller, s.generalKilled, s);
        GGlobal.modelCtryBoss.remove(ModelCtryBoss.msg_bossBeenKill, s.delayShowAward, s);
        CountryBossInfo.hide();
        s.deadInvide = 0;
        _super.prototype.onExit.call(this, scene);
        s.setSt(-1);
        this.others = [];
    };
    CountryBossCtrl.prototype.delayShowAward = function () {
        this.serverResult = 1; //标记已经获取到后端数据 并且把退出按钮屏蔽
        MainUIController.showBottomExite(false);
    };
    CountryBossCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出副本将视为挑战失败,挑战次数不返还!\n是否退出?", Handler.create(this, this.directExite));
    };
    CountryBossCtrl.prototype.directExite = function () {
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.modelCtryBoss.CG3207();
    };
    CountryBossCtrl.prototype.updateData = function () {
        var s = this;
        var m = GGlobal.modelCtryBoss;
        if (!(s.initState & 1)) {
            s.initState |= 1;
            var cfg = Config.gjboss_738[m.data.curBossId];
            var bossInfo = JSON.parse(cfg.boss);
            var boss = Config.NPC_200[bossInfo[0][1]];
            View_BossSceneHead.show(boss.ID, false, m.battleInfo.bossMaxHp, 0, 280, cfg.cengshu + "\u5C42 " + boss.name);
        }
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.battleInfo.bossHp);
        if (m.battleInfo.bossHp <= 0) {
            s.setSt(2);
        }
        else if (!Model_player.voMine.sceneChar || Model_player.voMine.sceneChar.curhp <= 100) {
            s.dieTime = egret.getTimer();
            s.setSt(1);
        }
        s.dmgByClient(s.enemyBoss, s.bossDmgPer);
    };
    CountryBossCtrl.prototype.update = function (ctx) {
        if (this.state == 0) {
            this.aiUpdate(ctx);
            this.scene.watchMainRole();
        }
        else if (this.state == 2) {
            var now = egret.getTimer();
            if (now - this.dieTime >= 2000 && !GGlobal.layerMgr.isOpenView(UIConst.BATTLEWIN)) {
                if (!this.hasExiteState) {
                    this.hasExiteState = true;
                    GGlobal.modelCtryBoss.CG3207();
                }
            }
            else if (now - this.dieTime >= 10000) {
                if (!this.hasExiteState) {
                    this.hasExiteState = true;
                    GGlobal.modelCtryBoss.CG3207();
                }
            }
        }
        else if (this.state == 1) {
            var now = egret.getTimer();
            if (now - this.dieTime >= 1000 && !this.hasExiteState) {
                this.hasExiteState = true;
                GGlobal.modelCtryBoss.CG3207();
            }
        }
    };
    CountryBossCtrl.prototype.setSt = function (st) {
        var s = this;
        if (st == 0) {
            s.createEnemys();
            var id = GGlobal.modelCtryBoss.data.curBossId;
            var mapId = Config.gjboss_738[id].ditu;
            s.setMapHead(mapId);
        }
        else if (st == 1) {
            s.dieTime = egret.getTimer();
            var voplayer = Model_player.voMine;
            voplayer.sceneChar.deadThrow(5, 5);
        }
        else if (st == 2) {
            s.dieTime = egret.getTimer();
            s.enemyBoss.curhp = 0;
            s.enemyBoss.deadThrow(5, 5);
        }
        s.state = st;
    };
    CountryBossCtrl.prototype.createEnemys = function () {
        var s = this;
        var cfg = Config.gjboss_738[GGlobal.modelCtryBoss.data.curBossId];
        var bossInfo = JSON.parse(cfg.boss);
        var boss = Config.NPC_200[bossInfo[0][1]];
        s.bossDmgPer = cfg.shanghai;
        s.enemyBoss = s.createEmeny(boss.ID);
        var ai = new CommonAICtrl();
        ai.role = s.enemyBoss;
        s.enemyBoss.addPlug(ai);
        var bati = BaTiState.create(); //获得霸体
        bati.maxTime = 9999999999; //长期霸体
        bati.role = s.enemyBoss;
        s.enemyBoss.addPlug(bati);
        s.enemyBoss.att = Model_player.voMine.hp * cfg.shanghai / 100 + Model_player.voMine.def;
        s.enemyBoss.force = 2;
        s.setBossPos(s.enemyBoss);
        s.scene.addUnit(s.enemyBoss);
        View_BossSceneHead.show(boss.ID, true, GGlobal.modelCtryBoss.data.bossMaxHp, 0, 280, cfg.cengshu + "\u5C42 " + boss.name);
    };
    CountryBossCtrl.prototype.createMyChars = function () {
        _super.prototype.createMyChars.call(this);
        var vomine = Model_player.voMine;
        var role = vomine.sceneChar;
        role.immuneDmg = 1;
        role.setName("<font color='#FFFF00'>" + vomine.name + "</font>", true);
    };
    CountryBossCtrl.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, this.searchEnemy, this, SkillUtil.userInputSkill);
        for (var i = 0; i < this.others.length; i++) {
            if (this.others[i] && this.others[i].sceneChar) {
                GuanQiaAI.thinkAttack(this.others[i].sceneChar, ctx, this.searchEnemy);
            }
        }
    };
    CountryBossCtrl.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    return CountryBossCtrl;
}(BossCtrl));
__reflect(CountryBossCtrl.prototype, "CountryBossCtrl");
