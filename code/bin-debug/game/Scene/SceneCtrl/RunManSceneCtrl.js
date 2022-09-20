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
var RunManSceneCtrl = (function (_super) {
    __extends(RunManSceneCtrl, _super);
    function RunManSceneCtrl() {
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
        /**拾捡的时间 归零自动退出副本 */
        _this.dropTime = 1200;
        return _this;
    }
    RunManSceneCtrl.prototype.enterStep = function (step) {
        var role = this.scene.getLifeHero();
        switch (step.t) {
            case "start":
                break;
            case "createMonsters":
                var id = Model_RunMan.battleLayer;
                var cfg = Config.ggzj_008[id];
                var monster = cfg.boss;
                this.createEmenyByInfo(monster);
                break;
            case "monsterLessThan":
                this.waitTime = egret.getTimer();
                break;
            case "sendMsg":
                var ret = this.checkResult();
                if (ret == 2) {
                    GGlobal.modelRunMan.CG_GetReward(Model_RunMan.battleType);
                }
                else {
                    var self = this;
                    setTimeout(function () {
                        ViewCommonFail.show(10000, self, "离开", self.exitHandler, null);
                    }, 1000);
                }
                break;
            case "pickItems":
                break;
            case "exit":
                this.exitHandler();
                break;
        }
    };
    RunManSceneCtrl.prototype.startDrop = function () {
        var sceneDropCrrl = SceneDropCtrl.instance;
        sceneDropCrrl.addRole(this.boss);
        sceneDropCrrl.onEnter(this.scene);
        sceneDropCrrl.dropGoods({ id: this.boss.enemyid, drop: Model_RunMan.dropArr });
    };
    RunManSceneCtrl.prototype.checkStepFinish = function (step) {
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
    RunManSceneCtrl.prototype.update = function (ctx) {
        var curStep = this.steps[this.pointer];
        if (this.checkStepFinish(curStep)) {
            this.nextPoint();
        }
        this.aiUpdate(ctx);
        this.scene.watchMainRole();
    };
    RunManSceneCtrl.prototype.nextPoint = function () {
        this.pointer++;
        var curStep = this.steps[this.pointer];
        this.enterStep(curStep);
    };
    RunManSceneCtrl.prototype.onEnter = function (scene) {
        this.scene = scene;
        scene.ignoreBreak = false;
        this.createMyChars();
        var id = Model_RunMan.battleLayer;
        var cfg = Config.ggzj_008[id];
        var mapId;
        if (cfg.type == 1) {
            mapId = 362001; //过关斩将-普通
        }
        else if (cfg.type == 2) {
            mapId = 362002; //过关斩将-困难
        }
        else if (cfg.type == 3) {
            mapId = 362003; //过关斩将-噩梦
        }
        else if (cfg.type == 4) {
            mapId = 362004; //过关斩将-传说
        }
        this.setMapHead(mapId);
        // var bossName = "【" + Model_RunMan.getTypeName(cfg.type) + "第" + cfg.guan + "关】" + "  " + Config.NPC_200[cfg.boss].name
        var bossName = "【" + "第" + cfg.guan + "关】" + "  " + Config.NPC_200[cfg.boss].name;
        View_BossSceneHead.show(cfg.boss, false, 0, 0, 280, bossName);
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt));
        SceneDropCtrl.instance.onEnter(scene);
        SceneDropCtrl.instance.listen(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
        GGlobal.control.listen(Enum_MsgType.RUNMAN_BATTLE_DROP, this.startDrop, this);
        GGlobal.control.listen(Enum_MsgType.RUNMAN_CLOSE_BATTLE, this.exitHandler, this);
        this.pointer = -1;
        this.nextPoint();
    };
    RunManSceneCtrl.prototype.createMyChars = function () {
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
        this.scaleAttribute(role, Model_RunMan.battleRes, true);
    };
    RunManSceneCtrl.prototype.onExit = function (scene) {
        View_BossSceneHead.hide();
        this.scene.ctx = {};
        this.scene.removeAll();
        this.boss = null;
        this.dropTime = 1200;
        MainUIController.showBottomExite(false);
        SceneDropCtrl.instance.onEixt();
        SceneDropCtrl.instance.remove(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
        GGlobal.control.remove(Enum_MsgType.RUNMAN_BATTLE_DROP, this.startDrop, this);
        GGlobal.control.remove(Enum_MsgType.RUNMAN_CLOSE_BATTLE, this.exitHandler, this);
    };
    RunManSceneCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，\n是否确认？", Handler.create(this, this.exitHandler));
    };
    RunManSceneCtrl.prototype.exitHandler = function () {
        GGlobal.modelScene.returnMainScene();
        if (GGlobal.layerMgr.lastPanelId <= 0)
            GGlobal.layerMgr.open(UIConst.FUBEN, 3);
    };
    RunManSceneCtrl.prototype.onDrop = function (arg) {
        this.onDropEnd(arg.drop);
    };
    RunManSceneCtrl.prototype.onDropEnd = function (info) {
        GGlobal.layerMgr.open(UIConst.FUBEN_RUNMAN_RES);
    };
    RunManSceneCtrl.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
    };
    RunManSceneCtrl.prototype.createEmenyByInfo = function (id) {
        var mapscene = this.scene;
        var enemy = this.createEmeny(id);
        this.setBossPos(enemy);
        this.boss = enemy;
        //监听掉落
        SceneDropCtrl.instance.addRole(enemy);
        var ai = new CommonAICtrl();
        ai.role = enemy;
        enemy.addPlug(ai);
        this.scaleAttribute(enemy, Model_RunMan.battleRes, false);
        mapscene.addUnit(enemy);
    };
    RunManSceneCtrl.prototype.getTotalHp = function (p) {
        var ret = 0;
        var role = p.sceneChar;
        ret += role.curhp;
        return ret;
    };
    /**怪物的总气血 */
    RunManSceneCtrl.prototype.getEmenyHp = function () {
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
    /**0未出结果 1失败 2获胜 */
    RunManSceneCtrl.prototype.checkResult = function () {
        var myhp = this.scene.getForceHp(1);
        var playerhp = this.scene.getForceHp(2);
        var now = egret.getTimer();
        if (now - this.waitTime >= this.pveTime - this.surTime) {
            ViewBattlePrompt.show(Math.floor((this.pveTime + this.waitTime - now) / 1000));
        }
        if (playerhp <= 0 || myhp <= 0 || now - this.waitTime >= this.pveTime) {
            if (Model_RunMan.battleRes == 1) {
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
    return RunManSceneCtrl;
}(SceneCtrl));
__reflect(RunManSceneCtrl.prototype, "RunManSceneCtrl");
