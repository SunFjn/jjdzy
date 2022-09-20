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
var YiShouBossCtrl = (function (_super) {
    __extends(YiShouBossCtrl, _super);
    function YiShouBossCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damageFix = 0;
        _this.randomseed = 0;
        _this.mapId = 0;
        /**1自己挂了 等复活 2胜利 3超时死亡 4结算中*/
        _this.state = 0;
        _this.revivewTime = 0;
        _this.timeOut = -1; //发出结算协议后等待时间
        _this.lastTime = 0;
        _this.bossDmgPer = 0;
        _this.fixedInjury = 0;
        _this.deadInvide = 0;
        _this.setState = function (v) {
            _this.state = v;
        };
        _this.exite = function () {
            _this.addTimeOut();
            GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_fightEnd_9435(0);
        };
        _this.addTimeOut = function () {
            _this.timeOut = Model_GlobalMsg.getServerTime() + 15000;
        };
        //超时结算
        _this.startResult = function () {
            _this.addTimeOut();
            GGlobal.layerMgr.close2(UIConst.YSBOSSREVIVE);
            GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_fightEnd_9435(0);
        };
        //开始准备复活，计算超时时间。超时将玩家移动到关卡
        _this.startRevive = function () {
            _this.addTimeOut();
            GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_relive_9437();
            GGlobal.layerMgr.close2(UIConst.YSBOSSREVIVE);
        };
        _this.relifeHD = function (ret) {
            var self = _this;
            self.timeOut = -1;
            self.deadInvide = 0;
            self.createMyChars();
            self.setState(0);
            self.revivewTime--;
            ChildYSBossTip.createInstance().update(self.revivewTime);
            YiShowBossScenePanel.createInstance().resetTime();
        };
        _this.showReshult = function (data) {
            var s = _this;
            s.timeOut = -1;
            s.setState(4);
            if (data.ret) {
                ViewCommonWin.show(data.awards, 5000, s, "退出", s.levelScene);
            }
            else {
                ViewBattleFault.show(3000, s, "离开", s.levelScene, s.levelScene);
            }
        };
        _this.levelScene = function () {
            GGlobal.modelScene.returnMainScene();
            ViewCommonWin.hide();
            ViewBattleFault.hide();
            GGlobal.layerMgr.close2(UIConst.YSBOSSREVIVE);
            GGlobal.layerMgr.open(UIConst.YSBOSS);
            _this.setState(0);
        };
        return _this;
    }
    YiShouBossCtrl.getInst = function () {
        return this._inst || (this._inst = new YiShouBossCtrl());
    };
    YiShouBossCtrl.prototype.onEnter = function (scene) {
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt));
        var self = this;
        self.setState(0);
        self.deadInvide = 0;
        self.timeOut = -1;
        self.revivewTime = ConfigHelp.getSystemNum(7305);
        self.scene = scene;
        self.createMyChars();
        self.createBoss();
        var id = GGlobal.modelYiShouBOSS.currentlayer;
        var cfg = Config.ysboss_759[id];
        scene.initWithID(cfg.dt);
        scene.random.seed = self.randomseed;
        GGlobal.control.listen(Enum_MsgType.YSBOSS_REVIVE, self.relifeHD, self);
        GGlobal.control.listen(Enum_MsgType.YSBOSS_RESULT, self.showReshult, self);
        ChildYSBossTip.createInstance().showOrHide(1);
        ChildYSBossTip.createInstance().update(self.revivewTime);
        YiShowBossScenePanel.createInstance().showOrHide(1);
    };
    YiShouBossCtrl.prototype.onExit = function () {
        var self = this;
        ChildYSBossTip.createInstance().showOrHide(0);
        YiShowBossScenePanel.createInstance().showOrHide(0);
        GGlobal.control.remove(Enum_MsgType.YSBOSS_RESULT, self.showReshult, self);
        GGlobal.control.remove(Enum_MsgType.YSBOSS_REVIVE, self.relifeHD, self);
        View_BossSceneHead.hide();
        MainUIController.showBottomExite(false);
        self.scene.removeAll();
        self.enemyBoss = null;
        self.mine = null;
        self.timeOut = -1;
        self.deadInvide = 0;
    };
    YiShouBossCtrl.prototype.tellDead = function () {
        var self = this;
        if (self.state > 0) {
            return;
        }
        if (self.revivewTime <= 0) {
            self.startResult();
        }
        else {
            self.setState(1);
            GGlobal.modelBoss.lifeTime = Model_GlobalMsg.getServerTime() + ConfigHelp.getSystemNum(1012) * 1000;
            GGlobal.layerMgr.open(UIConst.YSBOSSREVIVE);
        }
    };
    YiShouBossCtrl.prototype.createMyChars = function () {
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
        this.mine = role;
    };
    YiShouBossCtrl.prototype.createBoss = function () {
        var s = this;
        var id = GGlobal.modelYiShouBOSS.currentlayer;
        var cfg = Config.ysboss_759[id];
        var list = JSON.parse(cfg.boss);
        s.enemyBoss = s.createEmeny(list[0][1]);
        if (GGlobal.modelYiShouBOSS.FirstKiller) {
            var debuf = ConfigHelp.getSystemNum(7301);
            s.enemyBoss.att = Math.floor(s.enemyBoss.att * (100 - debuf) / 100);
            s.enemyBoss.def = Math.floor(s.enemyBoss.def * (100 - debuf) / 100);
            s.enemyBoss.curhp = s.enemyBoss.maxhp = Math.floor(s.enemyBoss.maxhp * (100 - debuf) / 100);
        }
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
        View_BossSceneHead.show(list[0][1], true, s.enemyBoss.maxhp);
    };
    YiShouBossCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出战斗BOSS血量将回满，确认退出？", Handler.create(this, this.exite));
    };
    YiShouBossCtrl.prototype.addHpAndName = function (role, isSelf) {
        var namebar = RoleHpAndNamePlug.create(isSelf);
        namebar.role = role;
        role.addPlug(namebar);
    };
    YiShouBossCtrl.prototype.update = function (ctx) {
        var self = this;
        if (self.timeOut != -1 && self.timeOut < Model_GlobalMsg.getServerTime()) {
            DEBUGWARING.log("超时自动离开场景");
            self.startResult();
            return;
        }
        if (self.state != 0) {
            return;
        }
        var leftNum = GGlobal.mapscene.getForceCount(1);
        var rightNum = GGlobal.mapscene.getForceCount(2);
        if (rightNum == 0) {
            self.setState(2);
            GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_fightEnd_9435(1);
        }
        else if (leftNum == 0) {
            self.tellDead();
        }
        else {
            self.scene.watchMainRole();
            var guanQiaAI = GuanQiaAI;
            guanQiaAI.thinkAttack(self.mine, ctx);
            guanQiaAI.thinkAttack(self.enemyBoss, ctx);
        }
        var boss = self.enemyBoss;
        if (boss) {
            GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, boss.curhp);
        }
        else {
            GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, 0);
        }
    };
    return YiShouBossCtrl;
}(SceneCtrl));
__reflect(YiShouBossCtrl.prototype, "YiShouBossCtrl");
