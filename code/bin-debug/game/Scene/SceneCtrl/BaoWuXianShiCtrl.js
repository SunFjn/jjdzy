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
var BaoWuXianShiCtrl = (function (_super) {
    __extends(BaoWuXianShiCtrl, _super);
    function BaoWuXianShiCtrl() {
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
        _this._endTime = 5000;
        return _this;
    }
    BaoWuXianShiCtrl.prototype.enterStep = function (step) {
        var role = this.scene.getLifeHero();
        switch (step.t) {
            case "start":
                break;
            case "createMonsters":
                var cfg = this.getCurBoss();
                var monster = cfg.boss;
                this.boss = this.createEmenyByInfo(monster);
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
    BaoWuXianShiCtrl.prototype.startDrop = function () {
        this.onDropEnd(this.getDropArr());
    };
    BaoWuXianShiCtrl.prototype.checkStepFinish = function (step) {
        var ret = true;
        switch (step.t) {
            case "createMonsters":
                break;
            case "monsterLessThan":
                var hp = this.getEmenyHp();
                if (this.curHp != hp) {
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
    BaoWuXianShiCtrl.prototype.exitStep = function (step) {
        if (step.t == "monsterLessThan") {
        }
    };
    BaoWuXianShiCtrl.prototype.update = function (ctx) {
        var curStep = this.steps[this.pointer];
        if (this.checkStepFinish(curStep)) {
            this.exitStep(curStep);
            this.nextPoint();
        }
        this.aiUpdate(ctx);
        this.scene.watchMainRole();
    };
    BaoWuXianShiCtrl.prototype.nextPoint = function () {
        this.pointer++;
        var curStep = this.steps[this.pointer];
        this.enterStep(curStep);
    };
    BaoWuXianShiCtrl.prototype.onEnter = function (scene) {
        this.scene = scene;
        scene.ignoreBreak = false;
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
        this.createMyChars();
        this.addDrop();
        this.pointer = -1;
        this.nextPoint();
    };
    BaoWuXianShiCtrl.prototype.createMyChars = function () {
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
    BaoWuXianShiCtrl.prototype.onExit = function (scene) {
        this.scene.ctx = {};
        this.dropTime = 1200;
        this.scene.removeAll();
        MainUIController.showBottomExite(false);
        this.removeDrop();
        this.boss = null;
    };
    BaoWuXianShiCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，\n是否确认？", Handler.create(this, this.sureClickEixt));
    };
    BaoWuXianShiCtrl.prototype.sureClickEixt = function () {
        this.okHandler();
        GGlobal.modelbwXianShi.bwXianShi();
    };
    BaoWuXianShiCtrl.prototype.okHandler = function () {
        GGlobal.modelScene.returnMainScene();
    };
    BaoWuXianShiCtrl.prototype.onDrop = function (arg) {
        this.onDropEnd(arg.drop);
    };
    BaoWuXianShiCtrl.prototype.onDropEnd = function (info) {
        this.okHandler();
    };
    BaoWuXianShiCtrl.prototype.aiUpdate = function (ctx) {
        var vomine = Model_player.voMine;
        if (vomine.sceneChar)
            GuanQiaAI.thinkAttack(vomine.sceneChar, ctx, null, null, SkillUtil.userInputSkill);
    };
    BaoWuXianShiCtrl.prototype.createEmenyByInfo = function (info) {
        var infoToStr = info + "";
        if (infoToStr.indexOf(",") >= 0) {
            var infoArr = ConfigHelp.SplitStr(info);
            var id = Number(infoArr[0][1]);
        }
        else {
            id = info;
        }
        var enemy = _super.prototype.createEmeny.call(this, id);
        this.setBossPos(enemy);
        this.curHp = enemy.curhp = enemy.maxhp = 9999999999;
        this.scene.addUnit(enemy);
        return enemy;
    };
    BaoWuXianShiCtrl.prototype.getForceCount = function (force) {
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
    BaoWuXianShiCtrl.prototype.getTotalHp = function (p) {
        var ret = 0;
        var role = p.sceneChar;
        ret += role.curhp;
        return ret;
    };
    /**怪物的总气血 */
    BaoWuXianShiCtrl.prototype.getEmenyHp = function () {
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
    BaoWuXianShiCtrl.prototype.checkResult = function () {
        var playerhp = this.scene.getForceHp(2);
        var now = egret.getTimer();
        if (playerhp <= 0) {
            return 2;
        }
        if (this.boss.curhp > 1 && now - this.waitTime >= this._endTime) {
            this.boss.curhp = 0;
        }
        return 0;
    };
    BaoWuXianShiCtrl.prototype.getBattleRes = function () {
        return 0;
    };
    BaoWuXianShiCtrl.prototype.getDropArr = function () {
        return Model_bwXianShi.dropArr;
    };
    BaoWuXianShiCtrl.prototype.getCurBoss = function () {
        var id = 1; //离水说只有一个
        return Config.bwxs_740[id];
    };
    BaoWuXianShiCtrl.prototype.applayAwards = function () {
        GGlobal.modelbwXianShi.CG_GETAWARDS_4001();
    };
    BaoWuXianShiCtrl.prototype.removeDrop = function () {
        GGlobal.control.remove(Enum_MsgType.BAOWU_XIANSHI_DROP, this.startDrop, this);
    };
    BaoWuXianShiCtrl.prototype.addDrop = function () {
        GGlobal.control.listen(Enum_MsgType.BAOWU_XIANSHI_DROP, this.startDrop, this);
    };
    return BaoWuXianShiCtrl;
}(SceneCtrl));
__reflect(BaoWuXianShiCtrl.prototype, "BaoWuXianShiCtrl");
