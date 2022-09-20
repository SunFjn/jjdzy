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
var HomeBattleCtrl = (function (_super) {
    __extends(HomeBattleCtrl, _super);
    function HomeBattleCtrl() {
        var _this = _super.call(this) || this;
        _this.bossid = 0;
        _this.npcid = 0;
        _this.serverid = 0;
        _this.result = 0;
        _this.directExite = function () {
            //killself
            ViewAlert.show("退出副本将视为挑战失败\n是否退出?", Handler.create(_this, function () {
                var self = HomeBattleCtrl.instance;
                if (self._hero) {
                    self._hero.takeMaxHurt();
                }
            }), ViewAlert.OKANDCANCEL);
        };
        _this.t = 0;
        return _this;
    }
    HomeBattleCtrl.prototype.onEnter = function (scene) {
        var s = this;
        ModelArpgMap.getInstance().isAutoExite = false;
        s.scene = scene;
        this._endTime = Model_GlobalMsg.getServerTime() + 60000;
        s.scene.initWithID(500009, true);
        s.createMyChars();
        var bossid = s.bossid;
        s.createEmenyByInfo(s.npcid);
        s.scene.setLeftAndRight();
        GGlobal.control.listen(UIConst.HOME, s.showReslt, s);
        MainUIController.showBottomExite(true, Handler.create(this, this.directExite));
    };
    HomeBattleCtrl.prototype.onExit = function () {
        var s = this;
        ModelArpgMap.getInstance().isAutoExite = true;
        s.scene.removeAll();
        View_BossSceneHead.hide();
        s._hero = null;
        s._monster = null;
        s.result = 0;
        GGlobal.control.remove(UIConst.HOME, s.directExite, s);
        MainUIController.showBottomExite(false);
    };
    HomeBattleCtrl.prototype.showReslt = function (arg) {
        this.arg = arg;
        egret.callLater(this.delayShowResult, this);
    };
    HomeBattleCtrl.prototype.delayShowResult = function () {
        var self = HomeBattleCtrl.instance;
        var battleResult = self.arg.battleResult;
        var awards = self.arg.awards;
        if (battleResult == 1) {
            ViewCommonWin.show(awards, 5000, self, "确定", null, null, true);
        }
        else {
            ViewBattleFault.show(5000, self, "退出", function () { }, function () { }, function () { });
        }
        GGlobal.control.remove(UIConst.HOME, self.showReslt, self);
    };
    HomeBattleCtrl.prototype.update = function (ctx) {
        var self = this;
        var leftNum = GGlobal.mapscene.getForceCount(1);
        var rightNum = GGlobal.mapscene.getForceCount(2);
        if ((leftNum == 0 || rightNum == 0) && self.result == 0) {
            self.result = 1;
            self.t = egret.getTimer() + 1000;
        }
        if (self.result == 1) {
            if (egret.getTimer() > self.t) {
                if (leftNum == 1) {
                    GGlobal.homemodel.CG_House_fightResult_11129(this.bossid, 1);
                }
                else {
                    GGlobal.homemodel.CG_House_fightResult_11129(this.bossid);
                }
            }
            return;
        }
        var now = Model_GlobalMsg.getServerTime(); //计时失败
        if (now > self._endTime) {
            GGlobal.homemodel.CG_House_fightResult_11129(this.bossid);
            return;
        }
        self.scene.watchMainRole();
        var guanQiaAI = GuanQiaAI;
        var leftrole = self._hero;
        if (leftrole.curhp > 0)
            guanQiaAI.thinkAttack(leftrole, ctx);
        var rightrole = self._monster;
        if (rightrole.curhp > 0)
            guanQiaAI.thinkAttack(rightrole, ctx);
        if (rightNum) {
            GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, self._monster.curhp);
        }
        else {
            GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, 0);
        }
    };
    HomeBattleCtrl.prototype.createMyChars = function () {
        var s = this;
        var vomine = Model_player.voMine;
        vomine.updateChars();
        var role = vomine.sceneChar;
        role.scene = s.scene;
        if (s.scene.getUnit(role.id)) {
            s.scene.watchMainRole(35);
            return;
        }
        s.setRolePos(role);
        role.invalid |= 1023;
        role.force = 1;
        s.scene.addUnit(role);
        s.scene.watchMainRole(35);
        s.addHpAndName(role, true);
        s._hero = role;
    };
    HomeBattleCtrl.prototype.createEmenyByInfo = function (id) {
        var s = this;
        var mapscene = s.scene;
        var enemy = _super.prototype.createEmeny.call(this, id);
        s.setMonsterPos(enemy);
        var hpplug = RoleHpAndNamePlug.create();
        hpplug.role = enemy;
        enemy.addPlug(hpplug);
        mapscene.addUnit(enemy);
        s._monster = enemy;
    };
    Object.defineProperty(HomeBattleCtrl, "instance", {
        get: function () {
            return this._inst || (this._inst = new HomeBattleCtrl());
        },
        enumerable: true,
        configurable: true
    });
    return HomeBattleCtrl;
}(SceneCtrl));
__reflect(HomeBattleCtrl.prototype, "HomeBattleCtrl");
