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
var HscbSceneCtrl = (function (_super) {
    __extends(HscbSceneCtrl, _super);
    function HscbSceneCtrl() {
        var _this = _super.call(this) || this;
        _this.pointer = 0;
        _this.steps = [
            { "t": "start" },
            { "t": "createMonsters" },
            { "t": "monsterLessThan" },
            { "t": "sendMsg" },
            { "t": "pickItems" },
            { "t": "exit" } //退出副本
        ];
        /**拾捡的时间 40s归零自动退出副本 */
        _this.dropTime = 1200;
        return _this;
    }
    HscbSceneCtrl.getInstance = function () {
        return this._inst || (this._inst = new HscbSceneCtrl());
    };
    HscbSceneCtrl.prototype.enterStep = function (step) {
        var role = this.scene.getLifeHero();
        switch (step.t) {
            case "start":
                break;
            case "createMonsters":
                var cfg = this.getCurBoss();
                var monster = Number(JSON.parse(cfg.boss)[0][0]);
                this.boss = this.createEnemys(monster);
                this.waitTime = egret.getTimer();
                break;
            case "sendMsg":
                var ret = this.checkResult();
                if (ret == 2) {
                    this.applayAwards();
                }
                else {
                    var self = this;
                    setTimeout(function () {
                        ViewCommonFail.show(10000, self, "离开", self.okHandler, null);
                    }, 1000);
                }
                break;
            case "pickItems":
                break;
            case "exit":
                this.okHandler();
                break;
        }
    };
    HscbSceneCtrl.prototype.startDrop = function () {
        var sceneDropCrrl = SceneDropCtrl.instance;
        sceneDropCrrl.addRole(this.boss);
        sceneDropCrrl.onEnter(this.scene);
        sceneDropCrrl.dropGoods({ id: this.boss.enemyid, drop: this.getDropArr() });
    };
    HscbSceneCtrl.prototype.checkStepFinish = function (step) {
        var ret = true;
        switch (step.t) {
            case "createMonsters":
                break;
            case "monsterLessThan":
                var hp = this.getEmenyHp();
                if (this.curHp != hp) {
                    GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, hp);
                    this.curHp = hp;
                }
                ret = this.checkResult() > 0;
                break;
            case "pickItems":
                if (this.dropTime) {
                    ret = false;
                }
                this.dropTime -= 1;
                break;
        }
        return ret;
    };
    HscbSceneCtrl.prototype.exitStep = function (step) {
        if (step.t == "monsterLessThan") {
        }
    };
    HscbSceneCtrl.prototype.update = function (ctx) {
        var curStep = this.steps[this.pointer];
        if (this.checkStepFinish(curStep)) {
            this.exitStep(curStep);
            this.nextPoint();
        }
        this.aiUpdate(ctx);
        this.scene.watchMainRole();
    };
    HscbSceneCtrl.prototype.nextPoint = function () {
        this.pointer++;
        var curStep = this.steps[this.pointer];
        this.enterStep(curStep);
    };
    HscbSceneCtrl.prototype.onEnter = function (scene) {
        this.scene = scene;
        scene.ignoreBreak = false;
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
        this.createMyChars();
        this.setMapHead(383001);
        var cfg = this.getCurBoss();
        var bossId = Number(JSON.parse(cfg.boss)[0][0]);
        var batLayer = GGlobal.model_HSCB.batLayer;
        var bigTower = GGlobal.model_HSCB.getBigRewCfg(batLayer);
        if (bigTower && batLayer <= bigTower.id) {
            var rewardVo = ConfigHelp.makeItemListArr(JSON.parse(bigTower.dj))[0];
            View_BossSceneHead.show(bossId, false, 0, 0, 280, "", rewardVo, bigTower.id + "关大奖");
        }
        else {
            View_BossSceneHead.show(bossId, false, 0, 0, 280, "");
        }
        SceneDropCtrl.instance.onEnter(scene);
        SceneDropCtrl.instance.listen(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
        this.addDrop();
        this.pointer = -1;
        this.nextPoint();
    };
    HscbSceneCtrl.prototype.createMyChars = function () {
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
    HscbSceneCtrl.prototype.onExit = function (scene) {
        View_BossSceneHead.hide();
        this.scene.ctx = {};
        this.scene.removeAll();
        MainUIController.showBottomExite(false);
        this.dropTime = 1200;
        SceneDropCtrl.instance.onEixt();
        SceneDropCtrl.instance.remove(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
        this.removeDrop();
        this.boss = null;
    };
    HscbSceneCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，\n是否确认？", Handler.create(this, this.okHandler));
    };
    HscbSceneCtrl.prototype.okHandler = function () {
        GGlobal.modelScene.returnMainScene();
        this.trytoOpenPnl();
    };
    HscbSceneCtrl.prototype.onDrop = function (arg) {
        this.onDropEnd(arg.drop);
    };
    HscbSceneCtrl.prototype.onDropEnd = function (info) {
        if (this.getNextBoss() == null) {
            ViewCommonWin.show(ConfigHelp.makeItemListArr(this.getDropArr()), 5000, this, "退出", this.okHandler);
        }
        else {
            ViewCommonWin1.show(ConfigHelp.makeItemListArr(this.getDropArr()), 5000, this.continueHandler, null, this, this.okHandler);
        }
    };
    HscbSceneCtrl.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        if (vomine.sceneChar) {
            GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
        }
    };
    HscbSceneCtrl.prototype.createEnemys = function (id) {
        var enemy = this.createEmeny(id);
        var ai = new CommonAICtrl();
        ai.role = enemy;
        enemy.addPlug(ai);
        enemy.force = 2;
        this.setBossPos(enemy);
        this.addHpAndName(enemy, false);
        this.scene.addUnit(enemy);
        //监听掉落
        SceneDropCtrl.instance.addRole(enemy);
        this.curHp = enemy.maxhp;
        return enemy;
    };
    HscbSceneCtrl.prototype.getForceCount = function (force) {
        var ret = 0;
        var role = this.scene.getLifeHero();
        if (!role) {
            return;
        }
        var list = role.scene.list;
        for (var i = list.length - 1; i >= 0; i--) {
            var u = list[i];
            if (u && u.force == force) {
                ret++;
            }
        }
        return ret;
    };
    HscbSceneCtrl.prototype.getTotalHp = function (p) {
        var ret = 0;
        var role = p.sceneChar;
        ret += role.curhp;
        return ret;
    };
    /**怪物的总气血 */
    HscbSceneCtrl.prototype.getEmenyHp = function () {
        var ret = 0;
        var role = this.scene.getLifeHero();
        if (!role) {
            return;
        }
        var list = role.scene.list;
        for (var i = list.length - 1; i >= 0; i--) {
            var u = list[i];
            if (u && u.force == 2) {
                ret += u.curhp;
            }
        }
        return ret;
    };
    /**0未出结果 1失败 2胜利 */
    HscbSceneCtrl.prototype.checkResult = function () {
        var myhp = this.scene.getForceHp(1);
        var playerhp = this.scene.getForceHp(2);
        var now = egret.getTimer();
        if (now - this.waitTime >= this.pveTime - this.surTime) {
            ViewBattlePrompt.show(Math.floor((this.pveTime + this.waitTime - now) / 1000));
        }
        if (playerhp <= 0 || myhp <= 0 || now - this.waitTime >= this.pveTime) {
            if (this.getBattleRes() == 1) {
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
    HscbSceneCtrl.prototype.continueHandler = function () {
        GGlobal.model_HSCB.CG_UPLAYER_7933();
    };
    HscbSceneCtrl.prototype.getBattleRes = function () {
        return GGlobal.model_HSCB.batRes;
    };
    HscbSceneCtrl.prototype.getNextBoss = function () {
        var id = GGlobal.model_HSCB.batLayer;
        return Config.hscb_751[id + 1];
    };
    HscbSceneCtrl.prototype.getDropArr = function () {
        return GGlobal.model_HSCB.batDrop;
    };
    HscbSceneCtrl.prototype.getCurBoss = function () {
        var id = GGlobal.model_HSCB.batLayer;
        return Config.hscb_751[id];
    };
    HscbSceneCtrl.prototype.applayAwards = function () {
        GGlobal.model_HSCB.CG_BAT_REW_7935();
    };
    HscbSceneCtrl.prototype.trytoOpenPnl = function () {
        if (GGlobal.layerMgr.lastPanelId <= 0)
            GGlobal.layerMgr.open(UIConst.CHILD_HSCB);
    };
    HscbSceneCtrl.prototype.removeDrop = function () {
        GGlobal.model_HSCB.remove(Model_HSCB.msg_bat_rew, this.startDrop, this);
    };
    HscbSceneCtrl.prototype.addDrop = function () {
        GGlobal.model_HSCB.listen(Model_HSCB.msg_bat_rew, this.startDrop, this);
    };
    return HscbSceneCtrl;
}(SceneCtrl));
__reflect(HscbSceneCtrl.prototype, "HscbSceneCtrl");
