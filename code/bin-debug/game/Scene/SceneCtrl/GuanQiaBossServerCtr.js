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
/**关卡BOSS 协助类型的战斗*/ var GuanQiaBossServerCtr = (function (_super) {
    __extends(GuanQiaBossServerCtr, _super);
    function GuanQiaBossServerCtr() {
        var _this = _super.call(this) || this;
        _this.bosshp = 10;
        _this.bossMaxhp = 10;
        _this.startTime = 0;
        _this.oldGuanQiaLv = 0;
        _this.others = [];
        return _this;
    }
    GuanQiaBossServerCtr.getInstance = function () {
        return this._inst || (this._inst = new GuanQiaBossServerCtr());
    };
    GuanQiaBossServerCtr.prototype.onEnter = function (scene) {
        var s = this;
        s.scene = scene;
        GGlobal.layerMgr.closeAllPanel();
        GGlobal.mainUICtr.setState(MainUIController.GUANQIABOSS);
        scene.ctx.clearHurt = true;
        scene.ctx.isClearShow = true;
        scene.ignoreBreak = false;
        s.startTime = 0;
        s.oldGuanQiaLv = GGlobal.modelGuanQia.curGuanQiaLv;
        var modelguanqia = GGlobal.modelGuanQiaHelp;
        var lib = Config.xiaoguai_205;
        var mapid = Config.BOSS_205[modelguanqia.curGuanQiaLv].m;
        s.scene.initWithID(mapid);
        s.createMyChars();
        s.createOtherChar();
        s.createEnemys();
        MainUIController.showBottomExite(true, Handler.create(s, s.exitT));
        GGlobal.control.listen(Enum_MsgType.GUANQIA_HELP_PLAYER_HP, s.playerHpUpdate, s);
        GGlobal.control.listen(Enum_MsgType.GUANQIA_HELP_LEAVE, s.playerLeave, s);
        GGlobal.control.listen(Enum_MsgType.GUANQIA_HELP_BOSS_HP, s.bossHpUpdate, s);
        GGlobal.control.listen(Enum_MsgType.GUANQIA_HELP_DEAD, s.playerDeadHd, s);
    };
    GuanQiaBossServerCtr.prototype.onExit = function (scene) {
        var s = this;
        this.scene.ctx = {};
        MainUIController.showBottomExite(false, Handler.create(s, s.exitT));
        GGlobal.control.remove(Enum_MsgType.GUANQIA_HELP_PLAYER_HP, s.playerHpUpdate, s);
        GGlobal.control.remove(Enum_MsgType.GUANQIA_HELP_LEAVE, s.playerLeave, s);
        GGlobal.control.remove(Enum_MsgType.GUANQIA_HELP_BOSS_HP, s.bossHpUpdate, s);
        GGlobal.control.remove(Enum_MsgType.GUANQIA_HELP_DEAD, s.playerDeadHd, s);
        View_BossSceneHead.hide();
        s.boss = null;
        s.jinjiaBoss = null;
        this.scene.removeAll();
        this.others = [];
        if (s.oldGuanQiaLv != GGlobal.modelGuanQia.curGuanQiaLv) {
            ViewGuanQiaTips.show();
        }
    };
    GuanQiaBossServerCtr.prototype.returnGuanqia = function () {
        GGlobal.modelGuanQiaHelp.CG_5915_EXITE();
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
    };
    GuanQiaBossServerCtr.prototype.exitT = function () {
        var s = this;
        s.returnGuanqia();
    };
    GuanQiaBossServerCtr.prototype.update = function (ctx) {
        if (this.boss) {
            this.boss.curhp = this.bosshp;
            this.boss.maxhp = this.bossMaxhp;
            GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, this.bosshp);
            if (this.bosshp == 0) {
                this.boss.deadThrow(5, 5);
                this.boss = null;
            }
            this.aiUpdate(ctx);
        }
        if (this.jinjiaBoss) {
            if (egret.getTimer() - this.startTime > 2000) {
                this.jinjiaBoss.takeMaxHurt();
                this.jinjiaBoss = null;
            }
        }
        if (Model_player.voMine.sceneChar)
            this.scene.watchMainRole(35);
    };
    GuanQiaBossServerCtr.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
        if (this.jinjiaBoss)
            GuanQiaAI.thinkAttack(this.jinjiaBoss, ctx);
        if (this.boss)
            GuanQiaAI.thinkAttack(this.boss, ctx);
        for (var i = 0; i < this.others.length; i++) {
            if (this.others[i]) {
                GuanQiaAI.thinkAttack(this.others[i], ctx, this.searchEnemy);
            }
        }
    };
    GuanQiaBossServerCtr.prototype.searchEnemy = function (term, role, arg2) {
        if ((term.force == 1 || term.force == -1) && (role.force == 1 || role.force == -1)) {
            return -1;
        }
        if (term.curhp <= 0 || role.curhp <= 0) {
            return -1;
        }
        return MapScene.NEARESTLIFEENEMYFUNC(term, role, arg2);
    };
    GuanQiaBossServerCtr.prototype.createEnemys = function () {
        var s = this;
        var m = GGlobal.modelGuanQiaHelp;
        var bossList = ConfigHelp.splitIntArr(Config.BOSS_205[m.curGuanQiaLv].BL);
        var list = bossList[0];
        var cx = s.scene.map.focusx;
        var enemy;
        var id = list[1];
        var count = list[2];
        for (var ii = 0; ii < count; ii++) {
            enemy = s.createEmeny(id);
            s.setBossPos(enemy, -300);
            enemy.force = 2;
            s.scene.addUnit(enemy);
            this.bosshp = enemy.curhp;
            this.bossMaxhp = enemy.maxhp;
        }
        s.boss = enemy;
        enemy.enemyid = enemy.id;
        View_BossSceneHead.show(id, false, 0);
        //创建金甲
        var bool = GGlobal.modelGuanQiaHelp.hasSuprise;
        if (bool) {
            var jjid = Config.xtcs_004[3921].num;
            enemy = s.createEmeny(jjid);
            s.setBossPos(enemy, 540);
            enemy.y = 650;
            enemy.curhp = enemy.maxhp = ModelGuanQia.MAX_HP;
            enemy.force = 2;
            s.scene.addUnit(enemy);
            var hpplug = GuanQiaMonHpPlug.create();
            hpplug.role = enemy;
            enemy.addPlug(hpplug);
            s.jinjiaBoss = enemy;
        }
    };
    GuanQiaBossServerCtr.prototype.createMyChars = function () {
        var s = this;
        var vomine = Model_player.voMine;
        vomine.updateChars();
        var role = vomine.sceneChar;
        role.scene = s.scene;
        if (s.scene.getUnit(role.id)) {
            s.scene.watchMainRole(35);
            return;
        }
        role.curhp = role.maxhp;
        s.setRolePos(role);
        role.invalid |= 1023;
        role.force = 1;
        s.scene.addUnit(role);
        s.scene.watchMainRole(35);
        s.addHpAndName(role, true);
    };
    GuanQiaBossServerCtr.prototype.createOtherChar = function () {
        var s = this;
        var team = GGlobal.modelGuanQiaHelp.teamerid;
        if (team) {
            var vo = GGlobal.modelPlayer.playerDetailDic[team];
            if (vo) {
                vo.updateChars();
                var role = vo.sceneChar;
                role.scene = s.scene;
                role.curhp = role.maxhp;
                s.setRolePos(role);
                role.invalid |= 1023;
                role.force = 1;
                s.scene.addUnit(role);
                s.scene.watchMainRole(35);
                s.addHpAndName(role, true);
                s.others.push(role);
            }
        }
    };
    GuanQiaBossServerCtr.prototype.bossHpUpdate = function (opt) {
        this.bosshp = opt.hp;
        this.bossMaxhp = opt.maxHp;
    };
    GuanQiaBossServerCtr.prototype.playerLeave = function (id) {
        var role = GGlobal.mapscene.getUnit(id);
        if (role) {
            role.takeMaxHurt();
            var idx = this.others.indexOf(role);
            if (idx != -1) {
                this.others.splice(idx, 1);
            }
        }
    };
    GuanQiaBossServerCtr.prototype.playerDeadHd = function (id) {
        var role = GGlobal.mapscene.getUnit(id);
        if (role) {
            role.takeMaxHurt();
            var idx = this.others.indexOf(role);
            if (idx != -1) {
                this.others.splice(idx, 1);
            }
        }
    };
    GuanQiaBossServerCtr.prototype.playerHpUpdate = function (arr) {
        if (!arr)
            return;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var id = arr[i][0];
            var hp = arr[i][1];
            var role = GGlobal.mapscene.getUnit(id);
            if (role) {
                role.curhp = hp;
            }
        }
    };
    return GuanQiaBossServerCtr;
}(SceneCtrl));
__reflect(GuanQiaBossServerCtr.prototype, "GuanQiaBossServerCtr");
