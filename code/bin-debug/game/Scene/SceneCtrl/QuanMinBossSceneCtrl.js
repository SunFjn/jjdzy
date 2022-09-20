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
var QuanMinBossSceneCtrl = (function (_super) {
    __extends(QuanMinBossSceneCtrl, _super);
    function QuanMinBossSceneCtrl() {
        var _this = _super.call(this) || this;
        _this.state = -1;
        _this.serverResult = 0;
        _this.initState = 0;
        //是否已经进入失败状态
        _this.hasExiteState = false;
        return _this;
    }
    QuanMinBossSceneCtrl.prototype.onEnter = function (scene) {
        _super.prototype.onEnter.call(this, scene);
        var c = GGlobal.control;
        var s = this;
        scene.ctx.clearHurt = true;
        scene.ctx.isClearShow = true;
        this.hasExiteState = false;
        //首次取UI的气血数据，停留太久不保证正确
        var id = GGlobal.modelBoss.curEnterId;
        var mapid = Config.all_221[id].map;
        s.setMapHead(mapid);
        if (GGlobal.modelBoss.qmMap[id]) {
            var vo = GGlobal.modelBoss.qmMap[id];
            GGlobal.modelBoss.bossHp = vo.curHp;
            GGlobal.modelBoss.bossMaxHp = (Number(vo.maxHp) * vo.curHp / 100) >> 0;
        }
        s.setSt(0);
        QMBossInfo.show();
        c.listen(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, s.updateData, s);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        c.listen(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
        c.listen(Enum_MsgType.MSG_PLAYER_BEKILLED, s.generalKilled, s);
        c.listen(Enum_MsgType.MSG_QMBOSS_DEAD, s.delayShowAward, s);
    };
    QuanMinBossSceneCtrl.prototype.onExit = function (scene) {
        var s = this;
        var c = GGlobal.control;
        s.serverResult = 0;
        c.remove(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, s.updateData, s);
        GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        c.remove(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
        c.remove(Enum_MsgType.MSG_PLAYER_BEKILLED, s.generalKilled, s);
        c.remove(Enum_MsgType.MSG_QMBOSS_DEAD, s.delayShowAward, s);
        QMBossInfo.hide();
        _super.prototype.onExit.call(this, scene);
        s.setSt(-1);
        GGlobal.modelBoss.curEnterId = 0;
        this.others = [];
        s.enemyBoss = null;
    };
    QuanMinBossSceneCtrl.prototype.delayShowAward = function () {
        this.serverResult = 1; //标记已经获取到后端数据 并且把退出按钮屏蔽
        MainUIController.showBottomExite(false);
    };
    QuanMinBossSceneCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出副本将视为挑战失败，\n是否退出?", Handler.create(this, this.directExite));
    };
    QuanMinBossSceneCtrl.prototype.directExite = function () {
        GGlobal.layerMgr.close2(UIConst.QMBOSSRANK);
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.modelBoss.CG_EXITE_1359();
        Model_Boss.exitBoss(1);
    };
    QuanMinBossSceneCtrl.prototype.updateData = function () {
        var s = this;
        var m = GGlobal.modelBoss;
        if (!(s.initState & 1)) {
            s.initState |= 1;
            var id = GGlobal.modelBoss.curEnterId;
            var list = JSON.parse(Config.all_221[id].boss);
            View_BossSceneHead.show(list[0][1], false, m.bossMaxHp);
        }
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.bossHp);
        if (m.bossHp <= 0) {
            s.setSt(2);
        }
        else if (m.myHp <= 0) {
            s.dieTime = egret.getTimer();
            s.setSt(1);
        }
    };
    QuanMinBossSceneCtrl.prototype.update = function (ctx) {
        if (this.state == 0) {
            this.aiUpdate(ctx);
            this.scene.watchMainRole();
        }
        else if (this.state == 2) {
            var now = egret.getTimer();
            if (now - this.dieTime >= 2000 && !GGlobal.layerMgr.isOpenView(UIConst.BATTLEWIN)) {
                GGlobal.layerMgr.open(UIConst.BATTLEWIN);
                GGlobal.layerMgr.close2(UIConst.QMBOSSRANK);
            }
            else if (now - this.dieTime >= 10000) {
                Model_Boss.exitBoss();
            }
        }
        else if (this.state == 1) {
            var now = egret.getTimer();
            if (now - this.dieTime >= 1000 && !this.hasExiteState) {
                this.hasExiteState = true;
                ViewBattleFault.show(3000, this, "离开", this.directExite, this.directExite);
            }
        }
    };
    QuanMinBossSceneCtrl.prototype.setSt = function (st) {
        var s = this;
        if (st == 0) {
            s.createEnemys();
        }
        else if (st == 1) {
            s.dieTime = egret.getTimer();
            var voplayer = Model_player.voMine;
            voplayer.sceneChar.deadThrow(5, 5);
            // ViewBattleFault.show(3000, s, "离开", s.directExite, s.directExite);
        }
        else if (st == 2) {
            s.dieTime = egret.getTimer();
            s.enemyBoss.curhp = 0;
            s.enemyBoss.deadThrow(5, 5);
        }
        s.state = st;
    };
    QuanMinBossSceneCtrl.prototype.createEnemys = function () {
        var s = this;
        var id = GGlobal.modelBoss.curEnterId;
        var list = JSON.parse(Config.all_221[id].boss);
        s.enemyBoss = s.createEmeny(list[0][1]);
        var ai = new CommonAICtrl();
        ai.role = s.enemyBoss;
        s.enemyBoss.addPlug(ai);
        var bati = BaTiState.create(); //获得霸体
        bati.maxTime = 9999999999; //长期霸体
        bati.role = s.enemyBoss;
        s.enemyBoss.addPlug(bati);
        s.enemyBoss.force = 2;
        s.setBossPos(s.enemyBoss);
        s.scene.addUnit(s.enemyBoss);
        View_BossSceneHead.show(list[0][1], true);
    };
    QuanMinBossSceneCtrl.prototype.createMyChars = function () {
        _super.prototype.createMyChars.call(this);
        var vomine = Model_player.voMine;
        var role = vomine.sceneChar;
        role.setName("<font color='#FFFF00'>" + vomine.name + "</font>", true);
    };
    QuanMinBossSceneCtrl.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, this.searchEnemy, this, SkillUtil.userInputSkill);
        for (var i = 0; i < this.others.length; i++) {
            if (this.others[i]) {
                GuanQiaAI.thinkAttack(this.others[i].sceneChar, ctx, this.searchEnemy);
            }
        }
    };
    QuanMinBossSceneCtrl.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    return QuanMinBossSceneCtrl;
}(BossCtrl));
__reflect(QuanMinBossSceneCtrl.prototype, "QuanMinBossSceneCtrl");
