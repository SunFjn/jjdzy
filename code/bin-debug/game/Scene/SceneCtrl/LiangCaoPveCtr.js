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
/**粮草争夺 攻击怪物*/ var LiangCaoPveCtr = (function (_super) {
    __extends(LiangCaoPveCtr, _super);
    function LiangCaoPveCtr() {
        var _this = _super.call(this) || this;
        _this.bossid = 0;
        _this.serverid = 0;
        _this.result = 0;
        _this.directExite = function () {
            //killself
            ViewAlert.show("退出副本将视为挑战失败\n是否退出?", Handler.create(_this, function () {
                var self = LiangCaoPveCtr.instance;
                if (self._hero) {
                    self._hero.takeMaxHurt();
                }
            }), ViewAlert.OKANDCANCEL);
        };
        return _this;
    }
    LiangCaoPveCtr.prototype.onEnter = function (scene) {
        var s = this;
        s.scene = scene;
        this._endTime = Model_GlobalMsg.getServerTime() + 60000;
        s.scene.initWithID(400001, true);
        s.createMyChars();
        var bossid = s.bossid;
        s.createEmenyByInfo(bossid);
        s.scene.setLeftAndRight();
        BossZCManager.enterBattle();
        GGlobal.control.listen(UIConst.LIANGCAO_BATTLEEND, s.showReslt, s);
        MainUIController.showBottomExite(true, Handler.create(this, this.directExite));
    };
    LiangCaoPveCtr.prototype.onExit = function () {
        var s = this;
        s.scene.removeAll();
        View_BossSceneHead.hide();
        s._hero = null;
        s._monster = null;
        s.result = 0;
        GGlobal.control.remove(UIConst.LIANGCAO, s.directExite, s);
        MainUIController.showBottomExite(false);
    };
    LiangCaoPveCtr.prototype.showReslt = function (arg) {
        this.arg = arg;
        egret.callLater(this.delayShowResult, this);
    };
    LiangCaoPveCtr.prototype.delayShowResult = function () {
        var self = LiangCaoPveCtr.instance;
        var battleResult = self.arg.battleResult;
        var awards = self.arg.awards;
        if (battleResult == 1) {
            ViewCommonWin.show(awards, 5000, self, "确定", null, null, true);
        }
        else {
            ViewBattleFault.show(5000, self, "退出", function () { }, function () { }, function () { });
        }
        GGlobal.control.remove(UIConst.LIANGCAO_BATTLEEND, self.showReslt, self);
    };
    LiangCaoPveCtr.prototype.update = function (ctx) {
        var self = this;
        var leftNum = GGlobal.mapscene.getForceCount(1);
        var rightNum = GGlobal.mapscene.getForceCount(2);
        if (leftNum == 0 || rightNum == 0) {
            if (self.result == 0) {
                self.result = 1;
                if (leftNum == 1) {
                    GGlobal.modelLiangCao.CG_BattleGoods_getBatMonReward_10107(self.serverid, 1);
                }
                else {
                    GGlobal.modelLiangCao.CG_BattleGoods_getBatMonReward_10107(self.serverid, 0);
                }
            }
            return;
        }
        var now = Model_GlobalMsg.getServerTime(); //计时失败
        if (now > self._endTime) {
            GGlobal.modelLiangCao.CG_BattleGoods_getBatMonReward_10107(self.serverid, 0);
            return;
        }
        self.scene.watchMainRole();
        var guanQiaAI = GuanQiaAI;
        var leftrole = self._hero;
        guanQiaAI.thinkAttack(leftrole, ctx);
        var rightrole = self._monster;
        guanQiaAI.thinkAttack(rightrole, ctx);
        if (rightNum) {
            GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, self._monster.curhp);
        }
        else {
            GGlobal.control.notify(Enum_MsgType.MSG_BOSS_HP_UPDATE, 0);
        }
    };
    LiangCaoPveCtr.prototype.createMyChars = function () {
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
    LiangCaoPveCtr.prototype.createEmenyByInfo = function (id) {
        var s = this;
        var mapscene = s.scene;
        var enemy = _super.prototype.createEmeny.call(this, id);
        s.setMonsterPos(enemy);
        var hpplug = RoleHpAndNamePlug.create();
        hpplug.role = enemy;
        enemy.addPlug(hpplug);
        mapscene.addUnit(enemy);
        s._monster = enemy;
        var isBoss = Config.ricenpc_290[id].boss;
        if (isBoss)
            View_BossSceneHead.show(id, false, 0);
    };
    Object.defineProperty(LiangCaoPveCtr, "instance", {
        get: function () {
            return this._inst || (this._inst = new LiangCaoPveCtr());
        },
        enumerable: true,
        configurable: true
    });
    return LiangCaoPveCtr;
}(SceneCtrl));
__reflect(LiangCaoPveCtr.prototype, "LiangCaoPveCtr");
