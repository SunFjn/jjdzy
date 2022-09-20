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
var PersonalBossCtr = (function (_super) {
    __extends(PersonalBossCtr, _super);
    function PersonalBossCtr() {
        var _this = _super.call(this) || this;
        _this.pointer = 0;
        _this.steps = [
            { "t": "start" },
            { "t": "createMonsters" },
            { "t": "monsterLessThan" },
            { "t": "wait" },
            { "t": "sendMsg" },
            { "t": "pickItems" },
            { "t": "exit" } //退出副本
        ];
        /**拾捡的时间 归零自动退出副本 */
        _this.totalTime = 0;
        _this.dropTime = 600;
        return _this;
    }
    PersonalBossCtr.prototype.enterStep = function (step) {
        var t = egret.getTimer();
        if (t > this.totalTime)
            step.t = "sendMsg"; //超时结算
        var role = this.scene.getLifeHero();
        switch (step.t) {
            case "start":
                break;
            case "createMonsters":
                var id = GGlobal.modelBoss.personalBoss;
                var cfg = Config.solo_220[id];
                var monster = cfg.boss;
                this.enemyBoss = this.createEnemys(monster);
                break;
            case "wait":
                this.waitTime = egret.getTimer();
                break;
            case "sendMsg":
                var ret = this.checkResult();
                var id = GGlobal.modelBoss.personalBoss;
                GGlobal.modelBoss.CG_FIGHT_1255(ret, id);
                if (ret == 2) {
                    ViewBattleFault.show(3000, this, "离开", this.directExite, this.directExite);
                }
                else {
                }
                break;
            case "pickItems":
                break;
            case "exit":
                Model_Boss.exitBoss(0);
                break;
        }
    };
    PersonalBossCtr.prototype.checkStepFinish = function (step) {
        var ret = true;
        switch (step.t) {
            case "createMonsters":
                break;
            case "monsterLessThan":
                var retType = this.checkResult();
                ret = retType > 0;
                if (retType == 1)
                    GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, 0);
                else if (this.enemyBoss)
                    GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, this.enemyBoss.curhp);
                break;
            case "wait":
                var now = egret.getTimer();
                if (now - this.waitTime < 1000) {
                    ret = false;
                }
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
    PersonalBossCtr.prototype.exitStep = function (step) {
        if (step.t == "monsterLessThan") {
            // ViewCommonWarn.text("wave finish");
        }
    };
    PersonalBossCtr.prototype.update = function (ctx) {
        var curStep = this.steps[this.pointer];
        if (this.checkStepFinish(curStep)) {
            this.exitStep(curStep);
            this.nextPoint();
        }
        this.aiUpdate(ctx);
        this.scene.watchMainRole();
    };
    PersonalBossCtr.prototype.nextPoint = function () {
        this.pointer++;
        if (this.pointer >= this.steps.length)
            this.pointer = this.steps.length - 1;
        var curStep = this.steps[this.pointer];
        this.enterStep(curStep);
    };
    PersonalBossCtr.prototype.onEnter = function (scene) {
        _super.prototype.onEnter.call(this, scene);
        this.scene = scene;
        this.totalTime = egret.getTimer() + this.pveTime;
        var id = GGlobal.modelBoss.personalBoss;
        var cfg = Config.solo_220[id];
        this.setMapHead(cfg.map);
        var boss = JSON.parse(cfg.boss);
        View_BossSceneHead.show(boss[0][1], false);
        GGlobal.layerMgr.close2(UIConst.BOSS);
        SceneDropCtrl.instance.onEnter(scene);
        SceneDropCtrl.instance.listen(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
        GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_EXIT_FUBEN, this.onClickEixt, this);
        this.pointer = -1;
        this.nextPoint();
    };
    PersonalBossCtr.prototype.onExit = function (scene) {
        _super.prototype.onExit.call(this, scene);
        this.dropTime = 600;
        SceneDropCtrl.instance.onEixt();
        SceneDropCtrl.instance.remove(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
        GGlobal.modelGlobalMsg.remove(Model_GlobalMsg.MSG_EXIT_FUBEN, this.onClickEixt, this);
        GGlobal.modelBoss.personalBoss = 0;
        if (GGlobal.layerMgr.lastPanelId <= 0)
            GGlobal.layerMgr.open(UIConst.BOSS);
        this.enemyBoss = null;
    };
    PersonalBossCtr.prototype.onClickEixt = function () {
        ViewAlert.show("退出副本将视为挑战失败，\n是否退出?", Handler.create(this, this.directExite));
    };
    PersonalBossCtr.prototype.directExite = function () {
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.modelBoss.CG_FIGHT_1255(0, GGlobal.modelBoss.personalBoss);
        Model_Boss.exitBoss(0);
    };
    PersonalBossCtr.prototype.onDrop = function (arg) {
        this.onDropEnd(arg.drop);
    };
    PersonalBossCtr.prototype.onDropEnd = function (info) {
        var arr = ConfigHelp.makeItemListArr(info);
        for (var i = 0; i < info.length; i++) {
            arr[i].extra = info[i][3];
        }
        GGlobal.modelBoss.bossAward = arr;
        GGlobal.layerMgr.open(UIConst.BATTLEWIN);
    };
    PersonalBossCtr.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
    };
    PersonalBossCtr.prototype.createEnemys = function (info) {
        var id = JSON.parse(info)[0][1];
        var cfgInfo = Config.NPC_200[id];
        this.curHp = cfgInfo.hp;
        var enemy = this.createEmeny(id);
        enemy.enemyid = id;
        var ai = new CommonAICtrl();
        ai.role = enemy;
        enemy.addPlug(ai);
        enemy.force = 2;
        this.setBossPos(enemy);
        this.addHpAndName(enemy, false);
        this.scene.addUnit(enemy);
        //监听掉落
        SceneDropCtrl.instance.addRole(enemy);
        return enemy;
    };
    PersonalBossCtr.prototype.getForceCount = function (force) {
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
    PersonalBossCtr.prototype.getTotalHp = function (p) {
        var role = p.sceneChar;
        return role.curhp;
    };
    /**0未出结果 1角色获胜 2怪物获胜 */
    PersonalBossCtr.prototype.checkResult = function () {
        var hasLeft = this.scene.getForceCount(1);
        var hasRight = this.scene.getForceCount(2);
        if (hasLeft && !hasRight) {
            return 1;
        }
        else if (hasRight && !hasLeft) {
            return 2;
        }
        return 0;
    };
    return PersonalBossCtr;
}(BossCtrl));
__reflect(PersonalBossCtr.prototype, "PersonalBossCtr");
