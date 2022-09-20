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
var ClientBattleSceneCtrl = (function (_super) {
    __extends(ClientBattleSceneCtrl, _super);
    function ClientBattleSceneCtrl() {
        var _this = _super.call(this) || this;
        /**挑战步骤*/
        _this.steps = [
            { "t": "start" },
            { "t": "createEnemys" },
            { "t": "monsterLessThan" },
            { "t": "sendMsg" },
            { "t": "pickItems" },
        ];
        _this.pointer = 0;
        return _this;
    }
    Object.defineProperty(ClientBattleSceneCtrl, "instance", {
        get: function () {
            if (!ClientBattleSceneCtrl._instance)
                ClientBattleSceneCtrl._instance = new ClientBattleSceneCtrl();
            return ClientBattleSceneCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClientBattleSceneCtrl.prototype.enterStep = function (step) {
        var self = this;
        switch (step.t) {
            case "start":
                self.leftPlayerArr = [];
                self.rightPlayerArr = [];
                self.createMyChars();
                self.setMapHead(self.battleVo.mapID);
                break;
            case "createEnemys":
                self.createEnemys();
                self.waitTime = egret.getTimer();
                break;
            case "sendMsg":
                var ret = self.checkResult();
                Model_battle.battleVo = null;
                if (ret == 2) {
                    self.applayAwards();
                }
                else {
                    self.showFail();
                }
                break;
            case "pickItems":
                break;
        }
    };
    /**胜利申请奖励 */
    ClientBattleSceneCtrl.prototype.applayAwards = function () {
        var self = this;
        switch (self.battleVo.sysID) {
            case UIConst.CROSS_SHILIAN:
                GGlobal.modelkfsl.CG_CrossTrial_fightEnd_10475(1);
                break;
            case UIConst.ZSSF:
                GGlobal.modelzssf.CG_ZSSF_BATTLE_RESULT(1);
                break;
            case UIConst.YANHUI:
                GGlobal.modelYanHui.CG_Yanhui_battlerest_11471(1, self.battleVo.bossId);
                break;
            case UIConst.GCBZ:
                if (self.battleVo.bossId > 0) {
                    if (GGlobal.modelgcbz.battleResult == 0) {
                        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.failHandler, self);
                        ViewCommonFail.show();
                    }
                    else {
                        GGlobal.modelgcbz.CG_AttackCity_battleNPCResult_12063();
                    }
                }
                else {
                    GGlobal.modelgcbz.CG_AttackCity_battleResult_12059(1);
                }
                break;
        }
    };
    ClientBattleSceneCtrl.prototype.showFail = function () {
        var self = this;
        switch (self.battleVo.sysID) {
            case UIConst.CROSS_SHILIAN:
                GGlobal.modelkfsl.CG_CrossTrial_fightEnd_10475(0);
                break;
            case UIConst.ZSSF:
                GGlobal.modelzssf.CG_ZSSF_BATTLE_RESULT(0);
                break;
            case UIConst.YANHUI:
                GGlobal.modelYanHui.CG_Yanhui_battlerest_11471(0, self.battleVo.bossId);
                break;
            case UIConst.GCBZ:
                if (self.battleVo.bossId > 0) {
                    GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.failHandler, self);
                    ViewCommonFail.show();
                }
                else {
                    GGlobal.modelgcbz.CG_AttackCity_battleResult_12059(0);
                }
                break;
        }
    };
    ClientBattleSceneCtrl.prototype.failHandler = function () {
        var self = this;
        GGlobal.modelScene.returnMainScene();
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.failHandler, self);
        ;
    };
    ClientBattleSceneCtrl.prototype.checkStepFinish = function (step) {
        var self = this;
        var ret = true;
        switch (step.t) {
            case "createEnemys":
                break;
            case "monsterLessThan":
                if (self.boss) {
                    GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, self.boss.curhp);
                }
                ret = self.checkResult() > 0;
                break;
            case "pickItems":
                break;
            case "sendMsg":
                ret = false;
                break;
        }
        return ret;
    };
    ClientBattleSceneCtrl.prototype.exitStep = function (step) {
        if (step.t == "monsterLessThan") {
        }
    };
    ClientBattleSceneCtrl.prototype.update = function (ctx) {
        var self = this;
        var curStep = self.steps[self.pointer];
        if (self.checkStepFinish(curStep)) {
            self.exitStep(curStep);
            self.nextPoint();
        }
        self.aiUpdate(ctx);
        self.scene.watchMainRole();
    };
    ClientBattleSceneCtrl.prototype.nextPoint = function () {
        var self = this;
        self.pointer++;
        var curStep = self.steps[self.pointer];
        self.enterStep(curStep);
    };
    ClientBattleSceneCtrl.prototype.onEnter = function (scene) {
        var self = this;
        self.battleVo = Model_battle.battleVo;
        if (!self.battleVo)
            return;
        if (self.battleVo.backID > 0)
            GGlobal.layerMgr.setPanelVisible(self.battleVo.backID, false);
        GGlobal.layerMgr.closeAllPanel(true);
        self.scene = scene;
        MainUIController.showBottomExite(true, Handler.create(self, self.onClickEixt), self);
        self.pointer = -1;
        self.nextPoint();
    };
    ClientBattleSceneCtrl.prototype.createMyChars = function () {
        var self = this;
        var arr = self.battleVo.leftArr;
        for (var i = 0; i < arr.length; i++) {
            var vomine = arr[i];
            vomine.updateChars();
            var role = vomine.sceneChar;
            if (!self.scene.getUnit(role.id)) {
                self.setRolePos(role);
                role.invalid |= 1023;
                role.force = 1;
                role.setDir(1);
                self.scene.addUnit(role);
                self.addHpAndName(role, true);
                if (vomine.id != Model_player.voMine.id) {
                    role.autoSkill = true;
                }
                self.leftPlayerArr.push(role);
            }
            if (vomine.id == Model_player.voMine.id) {
                for (var key in self.battleVo.buffData) {
                    if (Enum_Attr.roleAttPer[key]) {
                        role[Enum_Attr.roleAttPer[key]] += role[Enum_Attr.roleAttPer[key]] * self.battleVo.buffData[key];
                    }
                    else {
                        role[Enum_Attr.roleAttributes[key]] += self.battleVo.buffData[key];
                    }
                }
            }
        }
    };
    ClientBattleSceneCtrl.prototype.onExit = function (scene) {
        var self = this;
        self.scene.ctx = {};
        self.scene.removeAll();
        MainUIController.showBottomExite(false);
        View_BossSceneHead.hide();
        self.trytoOpenPnl();
        self.leftPlayerArr = [];
        self.rightPlayerArr = [];
        self.battleVo = null;
        self.boss = null;
    };
    ClientBattleSceneCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，\n是否确认？", Handler.create(this, this.okHandler));
    };
    ClientBattleSceneCtrl.prototype.okHandler = function () {
        var self = this;
        switch (self.battleVo.sysID) {
            case UIConst.CROSS_SHILIAN:
                GGlobal.modelkfsl.CG_CrossTrial_fightEnd_10475(0);
                break;
            case UIConst.ZSSF:
                GGlobal.modelzssf.CG_ZSSF_BATTLE_RESULT(2);
                break;
            case UIConst.YANHUI:
                YanHuiManager.getInstance().exiteBattle();
                break;
            case UIConst.GCBZ:
                if (self.battleVo.bossId > 0) {
                    self.failHandler();
                }
                else {
                    GGlobal.modelgcbz.CG_AttackCity_battleResult_12059(2);
                }
                break;
        }
    };
    ClientBattleSceneCtrl.prototype.aiUpdate = function (ctx) {
        var s = this;
        for (var i = 0; i < s.leftPlayerArr.length; i++) {
            if (s.leftPlayerArr[i])
                GuanQiaAI.thinkAttack(s.leftPlayerArr[i], ctx);
        }
        for (var i = 0; i < s.rightPlayerArr.length; i++) {
            if (s.rightPlayerArr[i])
                GuanQiaAI.thinkAttack(s.rightPlayerArr[i], ctx);
        }
        if (s.boss) {
            GuanQiaAI.thinkAttack(s.boss, ctx);
        }
    };
    ClientBattleSceneCtrl.prototype.createEnemys = function () {
        var self = this;
        if (self.battleVo.bossId > 0) {
            var enemy = _super.prototype.createEmeny.call(this, self.battleVo.bossId);
            self.setBossPos(enemy);
            self.scene.addUnit(enemy);
            self.boss = enemy;
            View_BossSceneHead.show(self.battleVo.bossId, false, enemy.maxhp);
        }
        else {
            var arr = self.battleVo.rightArr;
            if (arr && arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    var vomine = arr[i];
                    vomine.updateChars();
                    var role = vomine.sceneChar;
                    if (!self.scene.getUnit(role.id)) {
                        self.setBossPos(role);
                        role.invalid |= 1023;
                        role.force = 2;
                        role.setDir(-1);
                        role.autoSkill = true;
                        self.scene.addUnit(role);
                        self.addHpAndName(role, false);
                        self.rightPlayerArr.push(role);
                    }
                }
            }
        }
    };
    /**0未出结果 1失败 2胜利 */
    ClientBattleSceneCtrl.prototype.checkResult = function () {
        var self = this;
        var myhp = self.scene.getForceHp(1);
        var playerhp = self.scene.getForceHp(2);
        var now = egret.getTimer();
        if (now - self.waitTime >= self.pveTime - self.surTime) {
            ViewBattlePrompt.show(Math.floor((self.pveTime + self.waitTime - now) / 1000));
        }
        if (playerhp <= 0 || myhp <= 0 || now - self.waitTime >= self.pveTime) {
            if (playerhp <= 0) {
                return 2;
            }
            else {
                return 1;
            }
        }
        return 0;
    };
    ClientBattleSceneCtrl.prototype.getBattleRes = function () {
        return this.battleVo.battleRes;
    };
    ClientBattleSceneCtrl.prototype.trytoOpenPnl = function () {
        var self = this;
        if (self.battleVo.backID > 0)
            GGlobal.layerMgr.setPanelVisible(self.battleVo.backID, true);
    };
    return ClientBattleSceneCtrl;
}(SceneCtrl));
__reflect(ClientBattleSceneCtrl.prototype, "ClientBattleSceneCtrl");
