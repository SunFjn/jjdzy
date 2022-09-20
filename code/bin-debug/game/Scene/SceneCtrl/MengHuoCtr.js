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
var MengHuoCtr = (function (_super) {
    __extends(MengHuoCtr, _super);
    function MengHuoCtr() {
        var _this = _super.call(this) || this;
        _this.state = -1;
        _this.initState = 0;
        return _this;
    }
    MengHuoCtr.prototype.onEnter = function (scene) {
        _super.prototype.onEnter.call(this, scene);
        var s = this;
        var c = GGlobal.control;
        scene.ctx.clearHurt = true;
        scene.ctx.isClearShow = true;
        GGlobal.modelBoss.initMH();
        s.setSt(0);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        c.listen(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
        c.listen(Enum_MsgType.MH_SCENE_PLAYER_STATE, s.generalStateChange, s);
        c.listen(Enum_MsgType.MH_ROLELIFE, s.roleState, s);
        c.listen(Enum_MsgType.MSG_PLAYER_RELIFE, s.generalRelife, s);
        c.listen(Enum_MsgType.MH_SCENE, s.updateData, s);
        c.listen(Enum_MsgType.MH_STATECHANGE, s.stateChange, s);
        GGlobal.modelWorldNet.listen(Model_WorldNet.WORLD_SOCKET_CLOSE, this.worldNetCross, this);
        MengHuoSceneInfo.instance.onopen();
        ChildComAutoRevive.createInstance().show1();
    };
    MengHuoCtr.prototype.onExit = function (scene) {
        var s = this;
        var c = GGlobal.control;
        GGlobal.modelWorldNet.remove(Model_WorldNet.WORLD_SOCKET_CLOSE, this.worldNetCross, this);
        GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        c.remove(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
        c.remove(Enum_MsgType.MH_SCENE_PLAYER_STATE, s.generalStateChange, s);
        c.remove(Enum_MsgType.MH_ROLELIFE, s.roleState, s);
        c.remove(Enum_MsgType.MH_SCENE, s.updateData, s);
        c.remove(Enum_MsgType.MH_STATECHANGE, s.stateChange, s);
        c.remove(Enum_MsgType.MSG_PLAYER_RELIFE, s.generalRelife, s);
        s.deadInvide = 0;
        s.roleState(0);
        _super.prototype.onExit.call(this, scene);
        s.setSt(-1);
        MengHuoSceneInfo.instance.onclose();
        s.others = [];
        GGlobal.modelBoss.mh_extra_awards = [];
        ChildComAutoRevive.createInstance().hide1();
        Model_WorldNet.exiteCross();
    };
    MengHuoCtr.prototype.worldNetCross = function () {
        ViewCommonWarn.text("检测网络异常，已从跨服玩法中退出");
        this.directExite();
    };
    MengHuoCtr.prototype.stateChange = function () {
        var s = this;
        var deadlist = GGlobal.modelBoss.mhBossDeadList;
        if (deadlist.indexOf(GGlobal.modelBoss.curEnterId) >= 0) {
            this.showWin();
        }
        else {
            ViewBattleFault.show(3000, s, "离开", s.directExite, s.directExite);
        }
    };
    MengHuoCtr.prototype.showWin = function () {
        var layerMgr = GGlobal.layerMgr;
        var uiconst = UIConst;
        if (layerMgr.isOpenView(uiconst.BATTLEWIN)) {
            return;
        }
        var m = GGlobal.modelBoss;
        layerMgr.close2(UIConst.RELIFEPANEL);
        var awards = Config.seven_223[m.curEnterId].joinreward;
        awards = ConfigHelp.makeItemListArr(JSON.parse(awards));
        m.bossAward = m.mh_extra_awards.concat(awards);
        ViewFightWin.showTip = true;
        layerMgr.open(uiconst.BATTLEWIN);
    };
    MengHuoCtr.prototype.update = function (ctx) {
        var s = this;
        if (s.state == 0) {
            s.aiUpdate(ctx);
            s.scene.watchMainRole();
        }
        s.dmgByClient(s.enemyBoss, s.bossDmgPer);
    };
    MengHuoCtr.prototype.roleState = function (ret) {
        var role = Model_player.voMine.sceneChar;
        if (ret == 1) {
            GGlobal.layerMgr.open(UIConst.RELIFEPANEL);
            if (role) {
                GGlobal.mapscene.removeUnit(role);
            }
        }
        else {
            GGlobal.layerMgr.close2(UIConst.RELIFEPANEL);
            if (!role) {
                this.createMyChars();
            }
            role = Model_player.voMine.sceneChar;
            role.curhp = role.maxhp;
        }
    };
    MengHuoCtr.prototype.onClickEixt = function () {
        var s = this;
        ViewAlert.show("是否退出?\n(退出后<font color='#ffc334'>30秒</font>不可再次进入)", Handler.create(s, s.directExite));
    };
    MengHuoCtr.prototype.directExite = function () {
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.modelBoss.CG_MHEXITE_1711();
        Model_Boss.exitBoss(4);
    };
    MengHuoCtr.prototype.tellDead = function () {
        GGlobal.modelBoss.CG_MH_TELL_DEAD();
    };
    MengHuoCtr.prototype.updateData = function () {
        var s = this;
        var m = GGlobal.modelBoss;
        if (!(s.initState & 1)) {
            s.initState |= 1;
            var bid = m.curEnterId;
            View_BossSceneHead.show(bid, false, m.bossMaxHp);
        }
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.bossHp);
        if (m.bossHp <= 0) {
            s.setSt(2);
        }
    };
    MengHuoCtr.prototype.setSt = function (st) {
        var s = this;
        if (st == 0) {
            // ViewCommonWarn.text("过场动画逻辑再此处添加");
            s.createEnemys();
            var id = GGlobal.modelBoss.mhid;
            var mapid = Config.seven_223[id].map;
            s.setMapHead(mapid);
        }
        else if (st == 1) {
            //自己死亡，等待复活
        }
        else if (st == 2) {
            s.dieTime = egret.getTimer();
            if (s.enemyBoss)
                s.enemyBoss.deadRemove();
            s.enemyBoss = null;
            this.showWin();
        }
        s.state = st;
    };
    MengHuoCtr.prototype.createEnemys = function () {
        var s = this;
        var m = GGlobal.modelBoss;
        var id = m.mhid;
        s.enemyBoss = s.createEmeny(id);
        var ai = new BossAI();
        ai.role = s.enemyBoss;
        s.enemyBoss.addPlug(ai);
        var bati = BaTiState.create(); //获得霸体
        bati.role = s.enemyBoss;
        s.enemyBoss.addPlug(bati);
        bati.maxTime = 9999999999; //长期霸体
        var cfg = Config.seven_223[id];
        s.enemyBoss.att = Model_player.voMine.hp * cfg.ap / 100 + Model_player.voMine.def;
        s.enemyBoss.force = 2;
        s.setBossPos(s.enemyBoss);
        s.scene.addUnit(s.enemyBoss);
        s.bossDmgPer = cfg.ap;
        View_BossSceneHead.show(id, false, m.bossMaxHp);
    };
    MengHuoCtr.prototype.createMyChars = function () {
        _super.prototype.createMyChars.call(this);
        var vomine = Model_player.voMine;
        var role = vomine.sceneChar;
        this.setRolePos(role);
        role.curhp = role.maxhp;
    };
    MengHuoCtr.prototype.generalKilled = function (lst) {
        for (var i = 0; i < lst.length; i++) {
            var id = lst[i];
            var role = GGlobal.mapscene.getUnit(id);
            if (role) {
                role.takeMaxHurt();
            }
        }
    };
    MengHuoCtr.prototype.aiUpdate = function (ctx) {
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
    MengHuoCtr.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    return MengHuoCtr;
}(BossCtrl));
__reflect(MengHuoCtr.prototype, "MengHuoCtr");
