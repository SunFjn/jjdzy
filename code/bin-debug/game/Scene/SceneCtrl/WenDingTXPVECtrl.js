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
/**问鼎天下 攻击怪物*/ var WenDingTXPVECtrl = (function (_super) {
    __extends(WenDingTXPVECtrl, _super);
    function WenDingTXPVECtrl() {
        var _this = _super.call(this) || this;
        _this.winScore = 0;
        _this.result = 0;
        _this.awards = [];
        return _this;
    }
    WenDingTXPVECtrl.prototype.onEnter = function (scene) {
        var s = this;
        s.scene = scene;
        var layer = GGlobal.modelWenDingTX.layer;
        var cfg = Config.wdtx_260[layer];
        var vo = VoItem.create(13);
        vo.count = cfg.point;
        s.awards = [vo];
        s.winScore = cfg.point;
        s.scene.initWithID(380000);
        var npcCFG = JSON.parse(cfg.npc)[0];
        s.createMyChars();
        s.createEmenyByInfo(npcCFG[0]);
        s.scene.setLeftAndRight();
        // GGlobal.control.listen(Enum_MsgType.WDTX_PVE_END, s.showReslt, s);
    };
    WenDingTXPVECtrl.prototype.onExit = function () {
        var s = this;
        s.scene.removeAll();
        s._hero = null;
        s._monster = null;
        s.result = 0;
        // GGlobal.control.remove(Enum_MsgType.WDTX_PVE_END, s.showReslt, s);
        GGlobal.layerMgr.close(UIConst.COMMON_WIN);
        GGlobal.layerMgr.close(UIConst.COMMON_FAIL);
    };
    // private showReslt(arg) {
    // 	if (arg == 1) {
    // 		ViewCommonWin.show(this.awards, 5000, this, "确定", WenDingTXManager.exiteBattle);
    // 	} else {
    // 		ViewCommonFail.show(5000, this, "退出", WenDingTXManager.exiteBattle);
    // 	}
    // }
    WenDingTXPVECtrl.prototype.update = function (ctx) {
        var self = this;
        var leftNum = GGlobal.mapscene.getForceCount(1);
        var rightNum = GGlobal.mapscene.getForceCount(2);
        if (leftNum == 0 || rightNum == 0) {
            if (self.result == 0) {
                GGlobal.modelWenDingTX.fightEnd4233(leftNum == 1 ? 1 : 2);
                WenDingTXManager.leavelBattleScene();
            }
            self.result = 1;
            return;
        }
        this.scene.watchMainRole();
        var guanQiaAI = GuanQiaAI;
        var leftrole = self._hero;
        guanQiaAI.thinkAttack(leftrole, ctx);
        var rightrole = self._monster;
        guanQiaAI.thinkAttack(rightrole, ctx);
    };
    WenDingTXPVECtrl.prototype.createMyChars = function () {
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
    WenDingTXPVECtrl.prototype.createEmenyByInfo = function (id) {
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
    WenDingTXPVECtrl.getInstance = function () {
        return this._inst || (this._inst = new WenDingTXPVECtrl());
    };
    return WenDingTXPVECtrl;
}(SceneCtrl));
__reflect(WenDingTXPVECtrl.prototype, "WenDingTXPVECtrl");
