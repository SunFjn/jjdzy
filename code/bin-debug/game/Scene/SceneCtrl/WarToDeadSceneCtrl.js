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
var WarToDeadSceneCtrl = (function (_super) {
    __extends(WarToDeadSceneCtrl, _super);
    function WarToDeadSceneCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pointer = 0;
        _this.steps = [
            { "t": "start" },
            { "t": "createMonsters" },
            { "t": "monsterLessThan" },
            { "t": "sendMsg" },
            { "t": "pickItems" },
            { "t": "exit" } //退出副本
        ];
        _this.curWave = 1;
        /**拾捡的时间 40s归零自动退出副本 */
        _this.dropTime = 1200;
        return _this;
    }
    WarToDeadSceneCtrl.getInst = function () {
        return this._inst || (this._inst = new WarToDeadSceneCtrl());
    };
    WarToDeadSceneCtrl.prototype.onEnter = function (scene) {
        var self = this;
        self.scene = scene;
        scene.ignoreBreak = false;
        MainUIController.showBottomExite(true, Handler.create(self, this.onClickEixt), self);
        self.createMyChars();
        self.curWave = 1;
        SceneDropCtrl.instance.onEnter(scene);
        SceneDropCtrl.instance.listen(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
        this.addDrop();
        this.pointer = -1;
        this.nextPoint();
    };
    WarToDeadSceneCtrl.prototype.enterStep = function (step) {
        var self = this;
        var role = this.scene.getLifeHero();
        switch (step.t) {
            case "start":
                break;
            case "createMonsters":
                self.createEnemys();
                this.waitTime = egret.getTimer();
                break;
            case "sendMsg":
                var ret = this.checkResult();
                if (ret == 2) {
                    self.applayAwards();
                }
                else {
                    setTimeout(function () {
                        ViewCommonFail.show(10000, self, "离开", self.okHandler, null);
                    }, 1000);
                }
                break;
            case "pickItems":
                break;
            case "exit":
                self.okHandler();
                break;
        }
    };
    WarToDeadSceneCtrl.prototype.startDrop = function () {
        var self = this;
        var sceneDropCrrl = SceneDropCtrl.instance;
        sceneDropCrrl.addRole(self.boss);
        sceneDropCrrl.onEnter(self.scene);
        sceneDropCrrl.dropGoods({ id: self.boss.enemyid, drop: self.getDropArr() });
    };
    WarToDeadSceneCtrl.prototype.checkStepFinish = function (step) {
        var self = this;
        var ret = true;
        switch (step.t) {
            case "createMonsters":
                break;
            case "monsterLessThan":
                var hp = self.scene.getForceHp(2);
                if (self.boss) {
                    if (self.curHp != hp) {
                        GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, hp);
                        self.curHp = hp;
                    }
                    ret = self.checkResult() > 0;
                }
                else {
                    if (hp <= 0) {
                        self.curWave++;
                        self.createEnemys();
                    }
                    ret = false;
                }
                break;
            case "pickItems":
                if (self.dropTime) {
                    ret = false;
                }
                self.dropTime -= 1;
                break;
        }
        return ret;
    };
    WarToDeadSceneCtrl.prototype.exitStep = function (step) {
        if (step.t == "monsterLessThan") {
        }
    };
    WarToDeadSceneCtrl.prototype.update = function (ctx) {
        var curStep = this.steps[this.pointer];
        if (this.checkStepFinish(curStep)) {
            this.exitStep(curStep);
            this.nextPoint();
        }
        this.aiUpdate(ctx);
        this.scene.watchMainRole();
    };
    WarToDeadSceneCtrl.prototype.nextPoint = function () {
        this.pointer++;
        var curStep = this.steps[this.pointer];
        this.enterStep(curStep);
    };
    WarToDeadSceneCtrl.prototype.createMyChars = function () {
        var vomine = Model_player.voMine;
        vomine.updateChars();
        var role = vomine.sceneChar;
        if (!this.scene.getUnit(role.id)) {
            this.setRolePos(role);
            role.invalid |= 1023;
            role.force = 1;
            this.scene.addUnit(role);
            this.addHpAndName(role, true);
        }
        this.scaleAttribute(role, this.getBattleRes(), true);
    };
    WarToDeadSceneCtrl.prototype.onExit = function (scene) {
        var self = this;
        View_BossSceneHead.hide();
        self.scene.ctx = {};
        self.scene.removeAll();
        MainUIController.showBottomExite(false);
        self.dropTime = 1200;
        SceneDropCtrl.instance.onEixt();
        SceneDropCtrl.instance.remove(SceneDropCtrl.MSG_DROP_END, self.onDropEnd, self);
        self.removeDrop();
        self.boss = null;
    };
    WarToDeadSceneCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，\n是否确认？", Handler.create(this, this.okHandler));
    };
    WarToDeadSceneCtrl.prototype.okHandler = function () {
        GGlobal.modelScene.returnMainScene();
        this.trytoOpenPnl();
    };
    WarToDeadSceneCtrl.prototype.onDrop = function (arg) {
        this.onDropEnd(arg.drop);
    };
    WarToDeadSceneCtrl.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        if (vomine.sceneChar) {
            GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
        }
    };
    WarToDeadSceneCtrl.prototype.createEnemys = function () {
        var self = this;
        var index = 0;
        var cfg = self.getCurBoss();
        self.setMapHead(cfg.ditu);
        var monestArr = JSON.parse(cfg.xiaoguai);
        for (var i = 0; i < monestArr.length; i++) {
            if (monestArr[i][0] == self.curWave) {
                for (var j = 0; j < monestArr[i][2]; j++) {
                    var monset = self.createEmeny(monestArr[i][1]);
                    var ai = new CommonAICtrl();
                    ai.role = monset;
                    monset.addPlug(ai);
                    monset.force = 2;
                    self.setMonsterPos(monset);
                    self.addHpAndName(monset, false);
                    self.scene.addUnit(monset);
                }
                index++;
            }
        }
        if (index <= 0) {
            var bossId = cfg.boss;
            View_BossSceneHead.show(bossId, false, 0, 0, 280, "");
            var enemy = self.createEmeny(bossId);
            var ai = new CommonAICtrl();
            ai.role = enemy;
            enemy.addPlug(ai);
            enemy.force = 2;
            self.setBossPos(enemy);
            self.addHpAndName(enemy, false);
            self.scene.addUnit(enemy);
            //监听掉落
            SceneDropCtrl.instance.addRole(enemy);
            self.curHp = enemy.maxhp;
            self.boss = enemy;
        }
    };
    /**0未出结果 1失败 2胜利 */
    WarToDeadSceneCtrl.prototype.checkResult = function () {
        var self = this;
        var myhp = self.scene.getForceHp(1);
        var playerhp = self.scene.getForceHp(2);
        var now = egret.getTimer();
        if (now - self.waitTime >= self.pveTime - self.surTime) {
            ViewBattlePrompt.show(Math.floor((self.pveTime + self.waitTime - now) / 1000));
        }
        if (playerhp <= 0 || myhp <= 0 || now - self.waitTime >= self.pveTime) {
            if (self.getBattleRes() == 1) {
                return 1; //服务端失败
            }
            else {
                if (playerhp <= 0) {
                    return 2;
                }
                else {
                    return 1;
                }
            }
        }
        return 0;
    };
    WarToDeadSceneCtrl.prototype.continueHandler = function () {
        if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            GGlobal.modelWarToDead.CG4751();
        }
        else {
            GGlobal.modelWarToDead.challenge();
        }
    };
    WarToDeadSceneCtrl.prototype.getBattleRes = function () {
        return GGlobal.modelWarToDead.batState;
    };
    WarToDeadSceneCtrl.prototype.getDropArr = function () {
        return GGlobal.modelWarToDead.awards;
    };
    WarToDeadSceneCtrl.prototype.getCurBoss = function () {
        var id = GGlobal.modelWarToDead.batLayer;
        if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            var cfgId = (GGlobal.modelWarToDead.qiShu - 1) * 1000 + id;
            return Config.xzdd3_252[cfgId];
        }
        else {
            var bool = TimeUitl.isIn7Days();
            if (bool) {
                return Config.xzdd1_252[id];
            }
            else {
                return Config.xzdd2_252[id];
            }
        }
    };
    WarToDeadSceneCtrl.prototype.applayAwards = function () {
        if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
            GGlobal.modelWarToDead.CG4753();
        }
        else {
            GGlobal.modelWarToDead.applyAwards();
        }
    };
    WarToDeadSceneCtrl.prototype.trytoOpenPnl = function () {
        if (GGlobal.layerMgr.lastPanelId <= 0) {
            if (ModelEightLock.originalDatas[UIConst.WARTODEAD1]) {
                GGlobal.layerMgr.open(UIConst.CHAOZHIFL, UIConst.WARTODEAD1);
            }
            else {
                var bool = TimeUitl.isIn7Days();
                if (bool) {
                    GGlobal.layerMgr.open(UIConst.CHAOZHIFL, UIConst.WARTODEAD_7IN);
                }
                else {
                    GGlobal.layerMgr.open(UIConst.CHAOZHIFL, UIConst.WARTODEAD_7OUT);
                }
            }
        }
    };
    WarToDeadSceneCtrl.prototype.addDrop = function () {
        GGlobal.modelWarToDead.listen(ModelWarToDead.msg_jlDrop, this.startDrop, this);
    };
    WarToDeadSceneCtrl.prototype.removeDrop = function () {
        GGlobal.modelWarToDead.remove(ModelWarToDead.msg_jlDrop, this.startDrop, this);
    };
    WarToDeadSceneCtrl.prototype.onDropEnd = function (info) {
        ViewCommonWin.show(ConfigHelp.makeItemListArr(this.getDropArr()), 5000, this, "退出", this.okHandler);
    };
    return WarToDeadSceneCtrl;
}(SceneCtrl));
__reflect(WarToDeadSceneCtrl.prototype, "WarToDeadSceneCtrl");
