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
var QuanMinBossSceneCtrl_dj = (function (_super) {
    __extends(QuanMinBossSceneCtrl_dj, _super);
    function QuanMinBossSceneCtrl_dj() {
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
        _this._maxHp = 0;
        _this.other = [];
        return _this;
    }
    QuanMinBossSceneCtrl_dj.prototype.enterStep = function (step) {
        var role = this.scene.getLifeHero();
        switch (step.t) {
            case "start":
                break;
            case "createMonsters":
                var id = GGlobal.modelBoss.curEnterId;
                var cfg = Config.all_221[id];
                var monster = JSON.parse(cfg.boss)[0][1];
                this.createEmenyByInfo(monster);
                break;
            case "monsterLessThan":
                this.waitTime = egret.getTimer();
                break;
            case "sendMsg":
                var ret = this.checkResult();
                if (ret == 2) {
                    this._timeOut = setTimeout(function () {
                        GGlobal.modelBoss.CG_GET_DANJI_RES_1367(GGlobal.modelBoss.curEnterId);
                    }, 500);
                }
                else {
                    var self = this;
                    this._timeOut = setTimeout(function () {
                        ViewCommonFail.show(10000, self, "离开", self.exitHandler, null);
                    }, 500);
                }
                break;
            case "pickItems":
                break;
            case "exit":
                this.exitHandler();
                break;
        }
    };
    QuanMinBossSceneCtrl_dj.prototype.startDrop = function () {
        GGlobal.layerMgr.open(UIConst.BATTLEWIN);
    };
    QuanMinBossSceneCtrl_dj.prototype.checkStepFinish = function (step) {
        var ret = true;
        switch (step.t) {
            case "createMonsters":
                break;
            case "monsterLessThan":
                var hp = this.getEmenyHp();
                if (this._maxHp == 0) {
                    this._maxHp = hp;
                }
                if (this.curHp != hp) {
                    GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, hp);
                    GGlobal.modelBoss.myHurt = this._maxHp - hp;
                    GGlobal.control.notify(Enum_MsgType.MSG_QMBOSS_DANJI_BOSSXUE);
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
    QuanMinBossSceneCtrl_dj.prototype.update = function (ctx) {
        var curStep = this.steps[this.pointer];
        if (this.checkStepFinish(curStep)) {
            this.nextPoint();
        }
        this.aiUpdate(ctx);
        this.scene.watchMainRole();
    };
    QuanMinBossSceneCtrl_dj.prototype.nextPoint = function () {
        this.pointer++;
        var curStep = this.steps[this.pointer];
        this.enterStep(curStep);
    };
    QuanMinBossSceneCtrl_dj.prototype.onEnter = function (scene) {
        this.scene = scene;
        scene.ignoreBreak = false;
        this.createMyChars();
        var id = GGlobal.modelBoss.curEnterId;
        var cfg = Config.all_221[id];
        var boss = JSON.parse(cfg.boss)[0][1];
        this.setMapHead(cfg.map);
        var bossName = Config.NPC_200[boss].name;
        View_BossSceneHead.show(boss, true);
        this._maxHp = 0;
        QMBossInfo.show();
        GGlobal.layerMgr.close2(UIConst.QMBOSS);
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt));
        // SceneDropCtrl.instance.onEnter(scene);
        // SceneDropCtrl.instance.listen(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
        GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_DANJI_RES, this.startDrop, this);
        this.pointer = -1;
        this.nextPoint();
    };
    QuanMinBossSceneCtrl_dj.prototype.createMyChars = function () {
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
        this.other = [];
        var id = GGlobal.modelBoss.curEnterId;
        var cfg = Config.all_221[id];
        var robotArr = JSON.parse(cfg.robot)[0];
        for (var i = 0; i < robotArr.length; i++) {
            var robot = robotArr[i];
            var mapscene = this.scene;
            var npc = this.createEmeny(robot);
            npc.force = 1;
            npc.faceDir = 1;
            this.setRolePos(npc);
            npc.y = npc.y + 10 * (i + 1);
            npc.name = RandomName.getName();
            this.addHpAndName(npc, false);
            this.other.push(npc);
            //监听掉落
            var ai = new CommonAICtrl();
            ai.role = npc;
            npc.addPlug(ai);
            mapscene.addUnit(npc);
        }
    };
    QuanMinBossSceneCtrl_dj.prototype.onExit = function (scene) {
        View_BossSceneHead.hide();
        this.scene.ctx = {};
        this.scene.removeAll();
        this.boss = null;
        this.dropTime = 1200;
        MainUIController.showBottomExite(false);
        // SceneDropCtrl.instance.onEixt();
        // SceneDropCtrl.instance.remove(SceneDropCtrl.MSG_DROP_END, this.onDropEnd, this);
        GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_DANJI_RES, this.startDrop, this);
        QMBossInfo.hide();
    };
    QuanMinBossSceneCtrl_dj.prototype.onClickEixt = function () {
        ViewAlert.show("退出副本将视为挑战失败，\n是否退出?", Handler.create(this, this.directExite));
    };
    QuanMinBossSceneCtrl_dj.prototype.directExite = function () {
        GGlobal.layerMgr.close2(UIConst.QMBOSSRANK);
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.modelBoss.curEnterId = 0;
        this.exitHandler();
        clearTimeout(this._timeOut);
    };
    QuanMinBossSceneCtrl_dj.prototype.exitHandler = function () {
        Model_Boss.exitBoss(1);
    };
    // protected onDrop(arg): void {
    // 	this.onDropEnd(arg.drop);
    // }
    // protected onDropEnd(info): void {
    // 	GGlobal.layerMgr.open(UIConst.BATTLEWIN)
    // }
    QuanMinBossSceneCtrl_dj.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
    };
    QuanMinBossSceneCtrl_dj.prototype.createEmenyByInfo = function (id) {
        var mapscene = this.scene;
        var enemy = this.createEmeny(id);
        this.setBossPos(enemy);
        this.boss = enemy;
        //监听掉落
        // SceneDropCtrl.instance.addRole(enemy);
        var ai = new CommonAICtrl();
        ai.role = enemy;
        enemy.addPlug(ai);
        mapscene.addUnit(enemy);
    };
    QuanMinBossSceneCtrl_dj.prototype.getTotalHp = function (p) {
        var ret = 0;
        var role = p.sceneChar;
        ret += role.curhp;
        return ret;
    };
    /**怪物的总气血 */
    QuanMinBossSceneCtrl_dj.prototype.getEmenyHp = function () {
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
    QuanMinBossSceneCtrl_dj.prototype.checkResult = function () {
        var myhp = this.scene.getForceHp(1);
        var playerhp = this.scene.getForceHp(2);
        var now = egret.getTimer();
        if (now - this.waitTime >= this.pveTime - this.surTime) {
            ViewBattlePrompt.show(Math.floor((this.pveTime + this.waitTime - now) / 1000));
        }
        if (playerhp <= 0 || myhp <= 0 || now - this.waitTime >= this.pveTime) {
            if (playerhp <= 0) {
                return 2;
            }
            else {
                return 1;
            }
        }
        return 0;
    };
    return QuanMinBossSceneCtrl_dj;
}(SceneCtrl));
__reflect(QuanMinBossSceneCtrl_dj.prototype, "QuanMinBossSceneCtrl_dj");
