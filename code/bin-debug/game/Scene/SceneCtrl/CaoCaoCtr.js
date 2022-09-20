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
var CaoCaoCtr = (function (_super) {
    __extends(CaoCaoCtr, _super);
    function CaoCaoCtr() {
        var _this = _super.call(this) || this;
        _this.bossDmgPer = 0; //BOSS秒伤
        _this.state = -1;
        /**其他玩家信息 */
        _this.others = [];
        _this.initState = 0;
        return _this;
    }
    Object.defineProperty(CaoCaoCtr, "instance", {
        get: function () {
            if (!CaoCaoCtr._instance) {
                CaoCaoCtr._instance = new CaoCaoCtr();
            }
            return CaoCaoCtr._instance;
        },
        enumerable: true,
        configurable: true
    });
    CaoCaoCtr.prototype.onEnter = function (scene) {
        var s = this;
        var c = GGlobal.control;
        scene.ctx.clearHurt = true;
        scene.ctx.isClearShow = true;
        scene.ignoreBreak = false;
        s.scene = scene;
        GGlobal.layerMgr.close2(UIConst.ACTCOM);
        MainUIController.showBottomExite(true, Handler.create(s, s.onClickEixt));
        s.createMyChars();
        s.setSt(0);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, s.onClickEixt, s);
        c.listen(Enum_MsgType.MSG_MINEHPCHANGE, s.updateHp, s);
        c.listen(Enum_MsgType.MSG_ADDROLEDETAIL, s.createOtherPlayer, s);
        c.listen(Enum_MsgType.MSG_PLAYER_RELIFE, s.generalRelife, s);
        c.listen(Enum_MsgType.CC_SCENE_PLAYER_STATE, s.generalStateChange, s);
        c.listen(Enum_MsgType.CC_ROLE_LIFE, s.roleState, s);
        c.listen(Enum_MsgType.CC_CAOCAO_BOSS_DEAD, s.stateChange, s);
        c.listen(UIConst.CAOCAO_LAIXI_RANK, s.updateData, s);
        CaoCaoSceneInfo.instance.onopen();
        ChildComAutoRevive.createInstance().show1();
    };
    CaoCaoCtr.prototype.generalStateChange = function (data) {
        var st = data.st;
        var list = data.list;
        if (st == 0) {
            this.generalRelife(list);
        }
        else {
            this.generalKilled(list);
        }
    };
    CaoCaoCtr.prototype.generalRelife = function (lst) {
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
    CaoCaoCtr.prototype.createChars = function (voplayer, pos) {
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
    CaoCaoCtr.prototype.createOtherPlayer = function (vo) {
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
    CaoCaoCtr.prototype.removeOther = function (id) {
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
    CaoCaoCtr.prototype.updateHp = function (arg) {
        var vomine = Model_player.voMine;
        if (vomine.sceneChar) {
            if (arg.hp > 0)
                this.deadInvide = 0;
            vomine.sceneChar.curhp = arg.hp;
        }
    };
    CaoCaoCtr.prototype.onExit = function (scene) {
        var self = this;
        var c = GGlobal.control;
        GGlobal.control.remove(Enum_MsgType.MSG_MINEHPCHANGE, self.updateHp, self);
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
        GGlobal.modelPlayer.playerDetailDic = {};
        self.enemyBoss = null;
        GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, self.onClickEixt, self);
        c.remove(Enum_MsgType.MSG_ADDROLEDETAIL, self.createOtherPlayer, self);
        c.remove(Enum_MsgType.CC_SCENE_PLAYER_STATE, self.generalStateChange, self);
        c.remove(Enum_MsgType.CC_ROLE_LIFE, self.roleState, self);
        c.remove(UIConst.CAOCAO_LAIXI_RANK, self.updateData, self);
        c.remove(Enum_MsgType.CC_CAOCAO_BOSS_DEAD, self.stateChange, self);
        c.remove(Enum_MsgType.MSG_PLAYER_RELIFE, self.generalRelife, self);
        self.roleState(0);
        self.setSt(-1);
        CaoCaoSceneInfo.instance.onclose();
        self.others = [];
        GGlobal.modelCaoCao.cc_extra_awards = [];
        ChildComAutoRevive.createInstance().hide1();
    };
    CaoCaoCtr.prototype.stateChange = function () {
        var s = this;
        if (GGlobal.modelCaoCao.bossHp <= 0) {
            s.showWin();
        }
        else {
            ViewBattleFault.show(3000, s, "离开", s.directExite, s.directExite);
        }
    };
    CaoCaoCtr.prototype.showWin = function () {
        var layerMgr = GGlobal.layerMgr;
        var uiconst = UIConst;
        if (layerMgr.isOpenView(uiconst.BATTLEWIN)) {
            return;
        }
        var m = GGlobal.modelCaoCao;
        layerMgr.close2(UIConst.CAOCAO_LAIXI_RELIFEPANEL);
        var awards = Config.cclx_754[1].jlyl;
        awards = ConfigHelp.makeItemListArr(JSON.parse(awards));
        m.bossAward = m.cc_extra_awards.concat(awards);
        ViewFightWin.showTip = true;
        layerMgr.open(uiconst.BATTLEWIN, m.bossAward);
    };
    CaoCaoCtr.prototype.update = function (ctx) {
        var s = this;
        if (s.state == 0) {
            s.aiUpdate(ctx);
            s.scene.watchMainRole();
        }
        s.dmgByClient(s.enemyBoss, s.bossDmgPer);
    };
    CaoCaoCtr.prototype.roleState = function (ret) {
        var role = Model_player.voMine.sceneChar;
        if (ret == 1) {
            GGlobal.layerMgr.open(UIConst.CAOCAO_LAIXI_RELIFEPANEL);
            if (role) {
                GGlobal.mapscene.removeUnit(role);
            }
        }
        else {
            GGlobal.layerMgr.close2(UIConst.CAOCAO_LAIXI_RELIFEPANEL);
            if (!role) {
                this.createMyChars();
            }
            role = Model_player.voMine.sceneChar;
            role.curhp = role.maxhp;
        }
    };
    CaoCaoCtr.prototype.onClickEixt = function () {
        var s = this;
        ViewAlert.show("是否退出?\n(退出后<font color='#ffc334'>30秒</font>不可再次进入)", Handler.create(s, s.directExite));
    };
    CaoCaoCtr.prototype.directExite = function () {
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.modelCaoCao.CG_CaoCaoCome_quit_8515();
        GGlobal.modelScene.returnMainScene();
        var vo = GGlobal.modelActivity.getActivityByID(UIConst.CAOCAO_LAIXI);
        GGlobal.layerMgr.open(vo.groupId, UIConst.CAOCAO_LAIXI);
    };
    CaoCaoCtr.prototype.tellDead = function () {
        GGlobal.modelCaoCao.CG_CaoCaoCome_cgherodie_8521();
    };
    CaoCaoCtr.prototype.setSt = function (st) {
        var s = this;
        if (st == 0) {
            s.createEnemys();
            var mapid = Config.cclx_754[1].dt;
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
    CaoCaoCtr.prototype.createEnemys = function () {
        var s = this;
        var cfg = Config.cclx_754[1];
        var id = JSON.parse(cfg.boss)[0][1];
        s.enemyBoss = s.createEmeny(id);
        var ai = new BossAI();
        ai.role = s.enemyBoss;
        s.enemyBoss.addPlug(ai);
        var bati = BaTiState.create(); //获得霸体
        bati.role = s.enemyBoss;
        s.enemyBoss.addPlug(bati);
        bati.maxTime = 9999999999; //长期霸体
        s.enemyBoss.att = Model_player.voMine.hp * cfg.msbfb / 100 + Model_player.voMine.def;
        s.enemyBoss.force = 2;
        s.setBossPos(s.enemyBoss);
        s.scene.addUnit(s.enemyBoss);
        s.bossDmgPer = cfg.msbfb;
        View_BossSceneHead.show(id, false, GGlobal.modelCaoCao.bossMaxHp);
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, GGlobal.modelCaoCao.bossHp);
    };
    CaoCaoCtr.prototype.updateData = function () {
        var s = this;
        var m = GGlobal.modelCaoCao;
        if (!(s.initState & 1)) {
            s.initState |= 1;
            var cfg = Config.cclx_754[1];
            var bid = JSON.parse(cfg.boss)[0][1];
            View_BossSceneHead.show(bid, false, m.bossMaxHp);
        }
        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, m.bossHp);
        if (m.bossHp <= 0) {
            s.setSt(2);
        }
    };
    CaoCaoCtr.prototype.createMyChars = function () {
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
        var m = GGlobal.modelBoss;
        this.scaleAttribute(role, m.bossResult, true);
        this.setRolePos(role);
        role.curhp = role.maxhp;
    };
    CaoCaoCtr.prototype.generalKilled = function (lst) {
        for (var i = 0; i < lst.length; i++) {
            var id = lst[i];
            var role = GGlobal.mapscene.getUnit(id);
            if (role) {
                role.takeMaxHurt();
            }
        }
    };
    CaoCaoCtr.prototype.aiUpdate = function (ctx) {
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
    CaoCaoCtr.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    return CaoCaoCtr;
}(SceneCtrl));
__reflect(CaoCaoCtr.prototype, "CaoCaoCtr");
