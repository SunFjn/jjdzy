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
var LvBuSceneCtrl = (function (_super) {
    __extends(LvBuSceneCtrl, _super);
    function LvBuSceneCtrl() {
        var _this = _super.call(this) || this;
        _this.state = -1;
        _this.hasCheck = false;
        _this.initState = 0;
        _this.dailog = 0;
        return _this;
    }
    LvBuSceneCtrl.prototype.onEnter = function (scene) {
        _super.prototype.onEnter.call(this, scene);
        scene.ctx.clearHurt = true;
        scene.ctx.isClearShow = true;
        var s = this;
        var c = GGlobal.control;
        s.setSt(0);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        c.listen(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
        c.listen(Enum_MsgType.LB_SCENE_PLAYER_STATE, s.generalStateChange, s);
        c.listen(Enum_MsgType.LB_ROLE_LIFE, s.roleState, s);
        c.listen(Enum_MsgType.RANK_UPDATE, s.updateData, s);
        c.listen(Enum_MsgType.LB_BOSS_STATE, s.bossStateChange, s);
        LvBuSceneInfo.instance.onopen();
        ChildComAutoRevive.createInstance().show1();
    };
    LvBuSceneCtrl.prototype.onExit = function (scene) {
        var s = this;
        this.hasCheck = false;
        var c = GGlobal.control;
        GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        c.remove(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
        c.remove(Enum_MsgType.LB_SCENE_PLAYER_STATE, s.generalStateChange, s);
        c.remove(Enum_MsgType.LB_ROLE_LIFE, s.roleState, s);
        c.remove(Enum_MsgType.RANK_UPDATE, s.updateData, s);
        c.remove(Enum_MsgType.LB_BOSS_STATE, s.bossStateChange, s);
        s.deadInvide = 0;
        s.setSt(-1);
        s.roleState(0);
        _super.prototype.onExit.call(this, scene);
        GGlobal.modelBoss.curEnterId = 0;
        GGlobal.modelBoss.myHurt = 0;
        LvBuSceneInfo.instance.onclose();
        ChildComAutoRevive.createInstance().hide1();
        this.others = [];
    };
    LvBuSceneCtrl.prototype.update = function (ctx) {
        var s = this;
        if (s.state == 0) {
            s.aiUpdate(ctx);
            s.scene.watchMainRole();
        }
        s.dmgByClient(s.enemyBoss, s.bossDmgPer);
        var st = GGlobal.modelBoss.lvbuSt;
        if (st == 0 && !s.hasCheck) {
            s.hasCheck = true;
            s.bossStateChange();
        }
    };
    LvBuSceneCtrl.prototype.roleState = function (ret) {
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
            role.immuneDmg = 0;
            role.curhp = role.maxhp;
            role.hurt_state = 0;
        }
    };
    LvBuSceneCtrl.prototype.onClickEixt = function () {
        var s = this;
        ViewAlert.show("是否退出?\n(退出后<font color='#ffc334'>30秒</font>不可再次进入)", Handler.create(s, s.directExite));
    };
    LvBuSceneCtrl.prototype.directExite = function () {
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.modelBoss.CG_LBEXITE_1507();
    };
    LvBuSceneCtrl.prototype.bossStateChange = function () {
        var s = this;
        var m = GGlobal.modelBoss;
        var bst = m.lvbuSt;
        if (bst == 4) {
            var layerMgr = GGlobal.layerMgr;
            var uiconst = UIConst;
            var awards = Config.lvbuboss_224[m.curEnterId].joinreward;
            awards = ConfigHelp.makeItemListArr(JSON.parse(awards));
            GGlobal.modelBoss.bossAward = m.lb_extra_award.concat(awards);
            layerMgr.open(uiconst.BATTLEWIN);
            m.lb_extra_award = [];
        }
        else if (bst == 0) {
            ViewBattleFault.show(3000, s, "离开", s.directExite, s.directExite);
        }
        else if (bst == 1 || bst == 2 || bst == 3) {
            s.setSt(0);
        }
    };
    LvBuSceneCtrl.prototype.updateData = function () {
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
    LvBuSceneCtrl.prototype.setSt = function (st) {
        var s = this;
        var id = GGlobal.modelBoss.curEnterId;
        if (st == 0) {
            s.scene.watchMainRole();
            s.createEnemys();
            var id_1 = GGlobal.modelBoss.curEnterId;
            var mapid = 361001;
            s.setMapHead(mapid);
        }
        else if (st == 1) {
            //自己死亡，等待复活
        }
        else if (st == 2) {
            s.dieTime = egret.getTimer();
            if (s.enemyBoss)
                s.enemyBoss.deadRemove();
            if (Config.lvbuboss_224[id] && (egret.getTimer() - s.dailog) > 6000) {
                s.dailog = egret.getTimer();
                var str = Config.lvbuboss_224[id].taici;
                if (str != 0 && !GGlobal.layerMgr.isOpenView(UIConst.LVBUDAILOG)) {
                    GGlobal.layerMgr.open(UIConst.LVBUDAILOG);
                }
            }
            s.enemyBoss = null;
        }
        s.state = st;
    };
    LvBuSceneCtrl.prototype.createEnemys = function () {
        if (GGlobal.mapscene.getForceCount(2) > 0) {
            return;
        }
        var s = this;
        var m = GGlobal.modelBoss;
        var id = m.curEnterId;
        s.enemyBoss = s.createEmeny(id);
        var ai = new BossAI();
        ai.role = s.enemyBoss;
        s.enemyBoss.addPlug(ai);
        var bati = BaTiState.create(); //获得霸体
        bati.role = s.enemyBoss;
        s.enemyBoss.addPlug(bati);
        bati.maxTime = 9999999999; //长期霸体
        var cfg = Config.lvbuboss_224[id];
        s.enemyBoss.att = Model_player.voMine.hp * cfg.ap / 100 + Model_player.voMine.def;
        s.enemyBoss.force = 2;
        s.setBossPos(s.enemyBoss);
        s.scene.addUnit(s.enemyBoss);
        s.bossDmgPer = cfg.ap;
        View_BossSceneHead.show(id, false, m.bossMaxHp);
    };
    LvBuSceneCtrl.prototype.createMyChars = function () {
        _super.prototype.createMyChars.call(this);
        var vomine = Model_player.voMine;
        var role = vomine.sceneChar;
        role.curhp = role.maxhp;
        this.setRolePos(role);
        GGlobal.mapscene.watchMainRole();
    };
    LvBuSceneCtrl.prototype.aiUpdate = function (ctx) {
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
    LvBuSceneCtrl.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    LvBuSceneCtrl.prototype.tellDead = function () {
        GGlobal.modelBoss.CG_TELL_DEAD_1519();
    };
    return LvBuSceneCtrl;
}(BossCtrl));
__reflect(LvBuSceneCtrl.prototype, "LvBuSceneCtrl");
