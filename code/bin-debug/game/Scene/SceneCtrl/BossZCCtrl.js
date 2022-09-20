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
/**问鼎天下 攻击怪物*/ var BossZCCtrl = (function (_super) {
    __extends(BossZCCtrl, _super);
    function BossZCCtrl() {
        var _this = _super.call(this) || this;
        _this.result = 0;
        return _this;
    }
    BossZCCtrl.prototype.onEnter = function (scene) {
        var s = this;
        s.scene = scene;
        this._endTime = Model_GlobalMsg.getServerTime() + 60000;
        var layer = GGlobal.modelBossZc.sceneId;
        var cfg = Config.bosszc_010[layer];
        s.scene.initWithID(380020, true);
        s.createMyChars();
        s.createEmenyByInfo(cfg.id);
        s.scene.setLeftAndRight();
        BossZCManager.enterBattle();
        // if (!this.timer) {
        // 	this.timer = BossZCPveTimer.createInstance();
        // }
        // this.timer.show1();
        GGlobal.control.listen(Enum_MsgType.BOSSZC_PVE_RET, s.showReslt, s);
    };
    BossZCCtrl.prototype.onExit = function () {
        var s = this;
        s.scene.removeAll();
        this._hero = null;
        this._monster = null;
        s.result = 0;
        // if (this.timer) this.timer.show1();
        GGlobal.control.remove(Enum_MsgType.BOSSZC_PVE_RET, s.showReslt, s);
    };
    BossZCCtrl.prototype.showReslt = function (arg) {
        BossZCManager.exite();
        var result = arg[0];
        if (result == 0) {
            var awards = arg[1] ? arg[1] : [];
            ViewCommonWin.show(awards, 5000, this, "确定", BossZCManager.exite, null, true);
        }
        else {
            ViewCommonFail.show(5000, this, "退出", BossZCManager.exite, null, null, true);
        }
    };
    BossZCCtrl.prototype.update = function (ctx) {
        var self = this;
        var leftNum = GGlobal.mapscene.getForceCount(1);
        var rightNum = GGlobal.mapscene.getForceCount(2);
        if (leftNum == 0 || rightNum == 0) {
            if (self.result == 0) {
                self.result = 1;
                if (leftNum == 1) {
                    GGlobal.modelBossZc.CGfightRet4461(1);
                }
                else {
                    GGlobal.modelBossZc.CGfightRet4461(0);
                    this.showReslt([1]);
                }
            }
            return;
        }
        var now = Model_GlobalMsg.getServerTime(); //计时失败
        if (now > this._endTime) {
            this.showReslt([1]);
            GGlobal.modelBossZc.CGfightRet4461(0);
            return;
        }
        this.scene.watchMainRole();
        var guanQiaAI = GuanQiaAI;
        var leftrole = self._hero;
        guanQiaAI.thinkAttack(leftrole, ctx);
        var rightrole = self._monster;
        guanQiaAI.thinkAttack(rightrole, ctx);
    };
    BossZCCtrl.prototype.createMyChars = function () {
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
    BossZCCtrl.prototype.createEmenyByInfo = function (id) {
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
    BossZCCtrl.getInstance = function () {
        return this._inst || (this._inst = new BossZCCtrl());
    };
    return BossZCCtrl;
}(SceneCtrl));
__reflect(BossZCCtrl.prototype, "BossZCCtrl");
