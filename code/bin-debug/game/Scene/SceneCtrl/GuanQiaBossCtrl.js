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
var GuanQiaBossCtrl = (function (_super) {
    __extends(GuanQiaBossCtrl, _super);
    function GuanQiaBossCtrl() {
        var _this = _super.call(this) || this;
        _this.bossstate = -1;
        _this.state = 0;
        _this.result = 0;
        _this.isLeft = false; //是否中途退出
        return _this;
    }
    GuanQiaBossCtrl.getIns = function () {
        if (!GuanQiaBossCtrl._ins) {
            GuanQiaBossCtrl._ins = new GuanQiaBossCtrl();
        }
        return GuanQiaBossCtrl._ins;
    };
    GuanQiaBossCtrl.prototype.returnGuanqia = function () {
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
    };
    GuanQiaBossCtrl.prototype.onEnter = function (scene) {
        var s = this;
        s.isLeft = false;
        s.scene = scene;
        scene.ignoreBreak = false;
        var modelguanqia = GGlobal.modelGuanQia;
        var lib = Config.xiaoguai_205;
        var mapid = Config.BOSS_205[modelguanqia.curGuanQiaLv].m;
        s.scene.initWithID(mapid);
        s.createMyChars();
        s.scene.setLeftAndRight();
        s.setBossSt(GuanQiaBossCtrl.CREATE);
        if (Model_LunHui.realLv >= Config.xtcs_004[4426].num) {
            MainUIController.showBottomExite(true, Handler.create(s, s.exitT));
        }
        GGlobal.control.listen(Enum_MsgType.MSG_BOSS_RET, s.bossRet, s);
        GGlobal.control.listen(Enum_MsgType.MSG_JUQING_STATUS, s.juQingStatus, s);
        GGlobal.modelGuanQia.setBossTime(this.pveTime); //十分钟战斗时间
        var layerMgr = GGlobal.layerMgr;
        var uiconst = UIConst;
        layerMgr.close2(uiconst.GUANQIABOSSUI);
        var vomine = Model_player.voMine;
        if (GGlobal.modelGuanQia.curGuanQiaLv <= Config.xtcs_004[4421].num && vomine.sceneChar) {
            if (vomine.sceneChar.rage < Config.xtcs_004[2808].num) {
                vomine.sceneChar.rage = Config.xtcs_004[2808].num;
                GGlobal.control.notify(Enum_MsgType.ROLE_RAGE_UPDATE);
            }
        }
        var cfg = Config.BOSS_205[GGlobal.modelGuanQia.curGuanQiaLv];
        if (cfg)
            s.scene.initWithID(cfg.m);
        ViewJuQingPanel.status = 0;
    };
    GuanQiaBossCtrl.prototype.onExit = function (scene) {
        var s = this;
        MainUIController.showBottomExite(false, Handler.create(s, s.exitT));
        GGlobal.control.remove(Enum_MsgType.MSG_BOSS_RET, s.bossRet, s);
        GGlobal.control.remove(Enum_MsgType.MSG_JUQING_STATUS, s.juQingStatus, s);
        var layerMgr = GGlobal.layerMgr;
        var uiconst = UIConst;
        layerMgr.close2(uiconst.BATTLEWIN);
        View_BossSceneHead.hide();
        s.setBossSt(GuanQiaBossCtrl.BATTLE_END);
        s.scene.removeAll();
        s.boss = null;
        s.jingjiaMonster = null;
        s.bossstate = 0;
        var sceneDropCrrl = SceneDropCtrl.instance;
        sceneDropCrrl.onEixt();
    };
    GuanQiaBossCtrl.prototype.createMyChars = function () {
        var s = this;
        var vomine = Model_player.voMine;
        vomine.updateChars();
        var role = vomine.sceneChar;
        role.scene = s.scene;
        if (s.scene.getUnit(role.id)) {
            s.scene.watchMainRole(35);
            return;
        }
        var m = GGlobal.modelGuanQia;
        role.curhp = role.maxhp;
        s.setRolePos(role);
        role.invalid |= 1023;
        role.force = 1;
        s.scene.addUnit(role);
        s.scene.watchMainRole(35);
        s.addHpAndName(role, true);
    };
    GuanQiaBossCtrl.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
    };
    GuanQiaBossCtrl.prototype.bossAiUpdate = function (ctx) {
        var enemys = this.scene.filterRole(MapScene.ISLIFEENEMY, 1);
        for (var len = enemys.length, i = 0; i < len; i++) {
            var enemy = enemys[i];
            GuanQiaAI.thinkAttack(enemy, ctx);
        }
    };
    GuanQiaBossCtrl.prototype.exitT = function () {
        if (ViewJuQingPanel.status > 1) {
            ViewCommonWarn.text("剧情中，请稍后操作");
            return;
        }
        var s = this;
        s.isLeft = true;
        GGlobal.modelGuanQia.setAuto(false);
        s.returnGuanqia();
    };
    GuanQiaBossCtrl.prototype.bossRet = function (ret) {
        if (ret === void 0) { ret = 2; }
        var s = this;
        if (ret == 2) {
            if (!GGlobal.modelGuanQia.bossAwardSrc || GGlobal.modelGuanQia.bossAwardSrc.length == 0) {
                GGlobal.layerMgr.open(UIConst.BATTLEWIN);
            }
            else {
                s.setBossSt(3);
            }
        }
        else {
            ViewBattleFault.show(5000, s, "退出", s.onFaultUIExitT);
        }
    };
    GuanQiaBossCtrl.prototype.storyUpdate = function () {
        var s = this;
        View_BossSceneHead.createInstance().visible = false;
        var complete = GuanQiaAI.keepPos(Model_player.voMine);
        if (complete && ViewJuQingPanel.status == 0) {
            if (GGlobal.modelGuanQia.curGuanQiaLv > ViewJuQingPanel.maxGua) {
                ViewJuQingPanel.status = 1;
            }
            else {
                // GGlobal.mapscene.map.watchFocus(0, 0);
                var juQArr = ViewJuQingPanel.getJuQCfg(1, GGlobal.modelGuanQia.curGuanQiaLv);
                if (juQArr[0].npc == 0) {
                    ViewJuQingPanel.status = 3;
                }
                else {
                    ViewJuQingPanel.status = 4;
                }
                setTimeout(function () {
                    GGlobal.layerMgr.open(UIConst.XIN_SHOU_JU_QING, [1, GGlobal.modelGuanQia.curGuanQiaLv]);
                }, 600);
            }
        }
        if (s.juQingStatus(false)) {
            return true;
        }
        if (complete && ViewJuQingPanel.status == 1) {
            s.setBossSt(GuanQiaBossCtrl.SYSNCHRON);
            View_BossSceneHead.createInstance().visible = true;
            GGlobal.layerMgr.open(UIConst.BOSSANI);
        }
        return false;
    };
    GuanQiaBossCtrl.prototype.update = function (ctx) {
        var s = this;
        if (s.bossstate == GuanQiaBossCtrl.CREATE) {
            if (s.storyUpdate())
                return;
        }
        else if (s.bossstate == GuanQiaBossCtrl.SYSNCHRON) {
            var m = GGlobal.modelGuanQia;
            s.aiUpdate(ctx);
            s.bossAiUpdate(ctx);
            var myhp = s.scene.getForceCount(1);
            var bosshp = s.scene.getForceCount(2);
            if (bosshp <= 0) {
                s.result = 1;
                s.setBossSt(GuanQiaBossCtrl.KILL);
            }
            else if (myhp <= 0) {
                s.result = -1;
                s.setBossSt(GuanQiaBossCtrl.LOSE);
            }
            else {
                var remain = m.bossTime - ctx.dt;
                m.setBossTime(remain);
                if (remain <= 0) {
                    remain = 0;
                    s.setBossSt(GuanQiaBossCtrl.LOSE);
                }
            }
        }
        else if (s.bossstate == GuanQiaBossCtrl.KILL) {
            s.intevalSynWin();
        }
        var boss = s.scene.getUnit(s.bossid);
        if (boss) {
            GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, boss.curhp);
        }
        else {
            GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, 0);
        }
        s.scene.watchMainRole(35);
    };
    GuanQiaBossCtrl.prototype.juQingStatus = function (kill) {
        if (kill === void 0) { kill = true; }
        var s = this;
        if (ViewJuQingPanel.status == 3) {
            var mainRole = s.scene.getLifeHero();
            if (mainRole)
                s.scene.map.watchFocusTween(mainRole.x + 35, mainRole.y, kill);
            return true;
        }
        else if (ViewJuQingPanel.status == 4) {
            var watchB = s.scene.getUnit(s.bossid);
            if (watchB)
                s.scene.map.watchFocusTween(watchB.x + 35, watchB.y, kill);
            return true;
        }
        return false;
    };
    GuanQiaBossCtrl.prototype.setBossSt = function (st) {
        var s = this;
        var m = GGlobal.modelGuanQia;
        switch (s.bossstate) {
            case GuanQiaBossCtrl.CREATE:
                break;
            case GuanQiaBossCtrl.SYSNCHRON:
                var rwds = GGlobal.modelBoss.bossAward;
                break;
            case GuanQiaBossCtrl.BATTLE_END:
                break;
            case GuanQiaBossCtrl.DROPGOODS:
                SceneDropCtrl.instance.remove(SceneDropCtrl.MSG_DROP_END, s.onDroped, s);
                break;
            case GuanQiaBossCtrl.KILL:
                break;
            case GuanQiaBossCtrl.LOSE:
                m.CS_BOSSREST_1105(2); //强制失败，同步服务端
                m.setAuto(false);
                break;
        }
        switch (st) {
            case GuanQiaBossCtrl.CREATE:
                if (GGlobal.modelGuanQia.curGuanQiaLv <= ViewJuQingPanel.maxGua) {
                    GGlobal.mapscene.map.watchFocus(0, 0);
                    var mainRole = s.scene.getLifeHero();
                    mainRole.x = GGlobal.mapscene.map.focusLimitLeft;
                }
                s.createMyChars();
                s.createEnemys();
                break;
            case GuanQiaBossCtrl.SYSNCHRON:
                var rwds = GGlobal.modelBoss.bossAward;
                break;
            case GuanQiaBossCtrl.BATTLE_END:
                // s.returnGuanqia();
                if (s.result == 1 && !s.isLeft) {
                    ViewGuanQiaTips.show();
                }
                return;
            case GuanQiaBossCtrl.DROPGOODS:
                var sceneDropCrrl = SceneDropCtrl.instance;
                sceneDropCrrl.addRole(s.boss);
                sceneDropCrrl.onEnter(s.scene);
                sceneDropCrrl.dropGoods({ id: s.boss.enemyid, drop: GGlobal.modelGuanQia.bossAwardSrc });
                sceneDropCrrl.listen(SceneDropCtrl.MSG_DROP_END, s.onDroped, s);
                break;
            case GuanQiaBossCtrl.KILL:
                s.dt = 0;
                s.synWin();
                break;
            case GuanQiaBossCtrl.LOSE:
                GGlobal.mapscene.removeAll();
                ViewBattleFault.show(5000, s, "退出", s.onFaultUIExitT);
                break;
        }
        s.bossstate = st;
    };
    GuanQiaBossCtrl.prototype.onDroped = function () {
        GGlobal.layerMgr.open(UIConst.BATTLEWIN);
    };
    GuanQiaBossCtrl.prototype.onFaultUIExitT = function (self, ui) {
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
    };
    GuanQiaBossCtrl.prototype.intevalSynWin = function () {
        var s = this;
        s.dt += GGlobal.mapscene.dt;
        if (s.dt >= 8000) {
            s.dt = 0;
            s.synWin();
        }
    };
    GuanQiaBossCtrl.prototype.synWin = function () {
        GGlobal.modelGuanQia.CS_BOSSREST_1105(1);
    };
    GuanQiaBossCtrl.prototype.createEnemys = function () {
        var s = this;
        var m = GGlobal.modelGuanQia;
        var bossList = ConfigHelp.splitIntArr(Config.BOSS_205[m.curGuanQiaLv].BL);
        var list = bossList[0];
        var cx = s.scene.map.focusx;
        var enemy;
        var id = list[1];
        var count = list[2];
        for (var ii = 0; ii < count; ii++) {
            enemy = s.createEmeny(id);
            s.setBossPos(enemy, 500);
            enemy.force = 2;
            s.scene.addUnit(enemy);
        }
        s.bossid = enemy.id;
        s.boss = enemy;
        enemy.enemyid = enemy.id;
        View_BossSceneHead.show(id, false, 0);
        //创建金甲
        var bool = m.hasSurprise;
        if (bool) {
            var jjid = Config.xtcs_004[3921].num;
            enemy = s.createEmeny(jjid);
            s.setBossPos(enemy, 540);
            enemy.y = 650;
            enemy.curhp = enemy.maxhp = ModelGuanQia.MAX_HP;
            enemy.force = 2;
            s.scene.addUnit(enemy);
            s.jingjiaMonster = enemy;
            var hpplug = GuanQiaMonHpPlug.create();
            hpplug.role = enemy;
            enemy.addPlug(hpplug);
            enemy.dropDta = [[1, 401033, 1]]; //GGlobal.modelGuanQia.goldBossAward;
        }
    };
    /**创建BOSS 0*/
    GuanQiaBossCtrl.CREATE = 0;
    /**同步数据至服务器 1*/
    GuanQiaBossCtrl.SYSNCHRON = 1;
    /**BOSS已经被击杀 2*/
    GuanQiaBossCtrl.KILL = 2;
    /**战斗结束 -1*/
    GuanQiaBossCtrl.BATTLE_END = -1;
    /**拾取奖励 3*/
    GuanQiaBossCtrl.DROPGOODS = 3;
    /**战斗失败 100*/
    GuanQiaBossCtrl.LOSE = 100;
    return GuanQiaBossCtrl;
}(SceneCtrl));
__reflect(GuanQiaBossCtrl.prototype, "GuanQiaBossCtrl");
