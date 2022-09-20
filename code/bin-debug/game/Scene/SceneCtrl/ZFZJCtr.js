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
var ZFZJCtr = (function (_super) {
    __extends(ZFZJCtr, _super);
    function ZFZJCtr() {
        var _this = _super.call(this) || this;
        _this.bossDmgPer = 0; //BOSS秒伤
        _this.state = -1;
        /**其他玩家信息 */
        _this.others = [];
        _this.initState = 0;
        return _this;
    }
    Object.defineProperty(ZFZJCtr, "instance", {
        get: function () {
            if (!ZFZJCtr._instance) {
                ZFZJCtr._instance = new ZFZJCtr();
            }
            return ZFZJCtr._instance;
        },
        enumerable: true,
        configurable: true
    });
    ZFZJCtr.prototype.onEnter = function (scene) {
        var s = this;
        scene.ctx.clearHurt = true;
        scene.ctx.isClearShow = true;
        scene.ignoreBreak = false;
        s.scene = scene;
        s.registerEvent(true);
        GGlobal.layerMgr.close2(GGlobal.modelzfzj.activityVo.groupId);
        MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
        s.createMyChars();
        s.setSt(0);
        ZFZJSceneInfo.instance.onopen();
        ChildComAutoRevive.createInstance().show1();
    };
    ZFZJCtr.prototype.generalStateChange = function (data) {
        var st = data.st;
        var list = data.list;
        if (st == 0) {
            this.generalRelife(list);
        }
        else {
            this.generalKilled(list);
        }
    };
    ZFZJCtr.prototype.generalRelife = function (lst) {
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
    ZFZJCtr.prototype.createChars = function (voplayer, pos) {
        voplayer.updateChars();
        var s = this;
        var i = 0;
        var role = voplayer.sceneChar;
        if (s.scene.getUnit(role.id) == undefined) {
            s.setRolePos(role);
            role.invalid |= 255;
            role.force = pos;
            role.setName(voplayer.name);
            s.scene.addUnit(role);
        }
        else {
            s.setRolePos(role);
        }
    };
    ZFZJCtr.prototype.createOtherPlayer = function (vo) {
        var s = this;
        ArrayUitl.cleannull(s.others);
        if (s.others.length >= 5) {
            s.removeOther(s.others[0].id);
        }
        if (s.others.indexOf(vo) == -1) {
            s.others.push(vo);
        }
        if (Model_player.isMineID(vo.id)) {
            return;
        }
        s.createChars(vo, 1);
    };
    /**删除某个玩家 */
    ZFZJCtr.prototype.removeOther = function (id) {
        var s = this;
        var len = s.others.length;
        for (var i = 0; i < len; i++) {
            if (s.others[i] && s.others[i].id == id) {
                var vo = s.others[i];
                if (vo.sceneChar && vo.sceneChar.view && vo.sceneChar.view.parent) {
                    s.scene.removeUnit(vo.sceneChar);
                }
                if (Model_player.voMine.id == vo.id) {
                    Model_player.voMine.sceneChar = null;
                }
                s.others[i] = null;
                break;
            }
        }
        ArrayUitl.cleannull(s.others);
    };
    ZFZJCtr.prototype.updateHp = function (arg) {
        var vomine = Model_player.voMine;
        if (vomine.sceneChar) {
            if (arg.hp > 0)
                this.deadInvide = 0;
            vomine.sceneChar.curhp = arg.hp;
        }
    };
    ZFZJCtr.prototype.onExit = function (scene) {
        var self = this;
        View_BossSceneHead.hide();
        var vomine = Model_player.voMine;
        var role = vomine.sceneChar;
        if (role) {
            role.curhp = role.maxhp;
            role.immuneDmg = 0;
        }
        self.scene.ctx = {};
        self.scene.removeAll();
        self.others = [];
        MainUIController.showBottomExite(false);
        self.deadInvide = 0;
        self.registerEvent(false);
        GGlobal.modelPlayer.playerDetailDic = {};
        self.enemyBoss = null;
        self.roleState(0);
        self.setSt(-1);
        ZFZJSceneInfo.instance.onclose();
        self.others = [];
        ChildComAutoRevive.createInstance().hide1();
        GGlobal.layerMgr.open(GGlobal.modelzfzj.activityVo.groupId, GGlobal.modelzfzj.activityVo.id);
    };
    ZFZJCtr.prototype.registerEvent = function (pFlag) {
        var s = this;
        var c = GGlobal.control;
        c.register(pFlag, Enum_MsgType.MSG_MINEHPCHANGE, s.updateHp, s);
        c.register(pFlag, Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
        c.register(pFlag, Enum_MsgType.MSG_PLAYER_RELIFE, s.generalRelife, s);
        c.register(pFlag, Enum_MsgType.CC_SCENE_PLAYER_STATE, s.generalStateChange, s);
        c.register(pFlag, Enum_MsgType.ZFZJ_ROLE_LIFE, s.roleState, s);
        c.register(pFlag, Enum_MsgType.ZFZJ_BOSS_DEAD, s.stateChange, s);
        c.register(pFlag, Enum_MsgType.ZFZJ_UPDATEHURT, s.updateData, s);
        GGlobal.modelGlobalMsg.register(pFlag, Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
    };
    ZFZJCtr.prototype.stateChange = function () {
        var s = this;
        if (GGlobal.modelzfzj.curHp <= 0) {
            s.showWin();
        }
        else {
            ViewBattleFault.show(3000, s, "离开", s.directExite, s.directExite);
        }
    };
    ZFZJCtr.prototype.showWin = function () {
        var layerMgr = GGlobal.layerMgr;
        var uiconst = UIConst;
        if (layerMgr.isOpenView(uiconst.BATTLEWIN)) {
            return;
        }
        var m = GGlobal.modelzfzj;
        layerMgr.close2(UIConst.REVIVE_PANEL);
        var awards = Config.hfkhzfzj_286[m.bossLv].reward1;
        awards = ConfigHelp.makeItemListArr(JSON.parse(awards));
        ViewFightWin.showTip = true;
        layerMgr.open(uiconst.BATTLEWIN, awards);
    };
    ZFZJCtr.prototype.update = function (ctx) {
        var s = this;
        if (s.state == 0) {
            s.aiUpdate(ctx);
            s.scene.watchMainRole();
        }
        s.dmgByClient(s.enemyBoss, s.bossDmgPer);
    };
    ZFZJCtr.prototype.roleState = function (ret) {
        var role = Model_player.voMine.sceneChar;
        if (ret == 1) {
            GGlobal.layerMgr.open(UIConst.REVIVE_PANEL, UIConst.HFKH_ZFZJ);
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
    ZFZJCtr.prototype.onClickEixt = function () {
        var s = this;
        ViewAlert.show("是否退出?\n(退出后<font color='#ffc334'>30秒</font>不可再次进入)", Handler.create(s, s.directExite));
    };
    ZFZJCtr.prototype.directExite = function () {
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_quit_9647();
        GGlobal.modelScene.returnMainScene();
    };
    ZFZJCtr.prototype.tellDead = function () {
        GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_cgherodie_9653();
    };
    ZFZJCtr.prototype.setSt = function (st) {
        var s = this;
        if (st == 0) {
            s.createEnemys();
            var mapid = 389001;
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
    ZFZJCtr.prototype.createEnemys = function () {
        var s = this;
        var m = GGlobal.modelzfzj;
        var cfg = Config.hfkhzfzj_286[m.bossLv];
        var id = cfg.boss;
        s.enemyBoss = s.createEmeny(id);
        var ai = new BossAI();
        ai.role = s.enemyBoss;
        s.enemyBoss.addPlug(ai);
        var bati = BaTiState.create(); //获得霸体
        bati.role = s.enemyBoss;
        s.enemyBoss.addPlug(bati);
        bati.maxTime = 9999999999; //长期霸体
        s.enemyBoss.att = Model_player.voMine.hp * cfg.ap / 100 + Model_player.voMine.def;
        s.enemyBoss.force = 2;
        s.setBossPos(s.enemyBoss);
        s.scene.addUnit(s.enemyBoss);
        s.bossDmgPer = cfg.ap;
        View_BossSceneHead.show(id, false, GGlobal.modelzfzj.maxHp);
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, GGlobal.modelzfzj.curHp);
    };
    ZFZJCtr.prototype.updateData = function () {
        var s = this;
        var m = GGlobal.modelzfzj;
        if (!(s.initState & 1)) {
            s.initState |= 1;
            var cfg = Config.hfkhzfzj_286[m.bossLv];
            View_BossSceneHead.show(cfg.boss, false, m.maxHp);
        }
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.curHp);
        if (m.curHp <= 0) {
            s.setSt(2);
        }
    };
    ZFZJCtr.prototype.createMyChars = function () {
        var vomine = Model_player.voMine;
        vomine.updateChars();
        var role = vomine.sceneChar;
        this.setRolePos(role);
        role.invalid |= 1023;
        role.force = 1;
        role.immuneDmg = 1;
        if (this.scene.getUnit(role.id) == undefined) {
            this.scene.addUnit(role);
            this.addHpAndName(role, true);
        }
        this.setRolePos(role);
        role.curhp = role.maxhp;
    };
    ZFZJCtr.prototype.generalKilled = function (lst) {
        for (var i = 0; i < lst.length; i++) {
            var id = lst[i];
            var role = GGlobal.mapscene.getUnit(id);
            if (role) {
                role.takeMaxHurt();
            }
        }
    };
    ZFZJCtr.prototype.aiUpdate = function (ctx) {
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
    ZFZJCtr.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    return ZFZJCtr;
}(SceneCtrl));
__reflect(ZFZJCtr.prototype, "ZFZJCtr");
