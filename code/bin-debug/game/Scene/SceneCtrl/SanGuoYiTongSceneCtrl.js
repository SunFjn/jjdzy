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
var SanGuoYiTongSceneCtrl = (function (_super) {
    __extends(SanGuoYiTongSceneCtrl, _super);
    function SanGuoYiTongSceneCtrl() {
        var _this = _super.call(this) || this;
        _this.oldTime = 0;
        _this.st = -1;
        return _this;
    }
    Object.defineProperty(SanGuoYiTongSceneCtrl, "instance", {
        get: function () {
            if (!SanGuoYiTongSceneCtrl._instance)
                SanGuoYiTongSceneCtrl._instance = new SanGuoYiTongSceneCtrl();
            return SanGuoYiTongSceneCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    SanGuoYiTongSceneCtrl.prototype.onEnter = function (scene) {
        this.leftPlayer = null;
        this.st = -1;
        this.scene = scene;
        this.scene.setLeftAndRight();
        scene.initWithID(382001);
        this.createMyChars();
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
    };
    SanGuoYiTongSceneCtrl.prototype.onExit = function (scene) {
        if (scene === void 0) { scene = null; }
        this.scene.setLeftAndRight();
        GGlobal.modelPlayer.removePlayer(Model_SGZS.battleId);
        Model_SGZS.battleId = 0;
        scene.removeAll();
        MainUIController.showBottomExite(false);
        this.leftPlayer = null;
    };
    SanGuoYiTongSceneCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
    };
    SanGuoYiTongSceneCtrl.prototype.okHandler = function () {
        //发送失败协议
        GGlobal.modelSanGuoYT.CG_YITONG_BATTLE_RESULT_5813(GGlobal.modelSanGuoYT.serverMonsterID, 2);
    };
    SanGuoYiTongSceneCtrl.prototype.update = function (ctx) {
        var now = egret.getTimer();
        if (this.st == -1) {
            this.setState(0);
        }
        else if (this.st == 0) {
            var myhp = this.scene.getForceCount(1);
            var playerhp = this.scene.getForceCount(2);
            if (playerhp <= 0) {
                this.setState(1);
            }
            else if (myhp <= 0) {
                this.setState(2);
            }
            else {
                if (now - this.oldTime >= this.pvpTime) {
                    this.killRole(this.leftPlayer.sceneChar, this.enemy);
                }
            }
            this.aiUpdate(ctx);
        }
        else {
        }
        this.scene.watchMainRole();
    };
    SanGuoYiTongSceneCtrl.prototype.setState = function (st) {
        var model = GGlobal.modelSanGuoYT;
        if (st == 0) {
            this.createEnemys();
        }
        else if (st == 1) {
            model.CG_YITONG_BATTLE_RESULT_5813(model.serverMonsterID, 1);
        }
        else if (st == 2) {
            model.CG_YITONG_BATTLE_RESULT_5813(model.serverMonsterID, 0);
        }
        this.oldTime = egret.getTimer();
        this.st = st;
    };
    SanGuoYiTongSceneCtrl.prototype.createMyChars = function () {
        var vomine = Model_player.voMine;
        this.leftPlayer = vomine;
        vomine.updateChars();
        var i = 0;
        var lifeHero = this.scene.getLifeHero();
        var role = vomine.sceneChar;
        if (!lifeHero) {
            role.x = 200;
            role.y = 700;
            role.invalid |= 1023;
            role.force = 1;
            role.setDir(1);
            this.scene.addUnit(role);
            this.addHpAndName(role, true);
        }
    };
    SanGuoYiTongSceneCtrl.prototype.createEnemys = function () {
        var self = this;
        self.enemy = this.createEmeny(GGlobal.modelSanGuoYT.monsterID);
        var ai = new CommonAICtrl();
        ai.role = this.enemy;
        self.enemy.addPlug(ai);
        self.enemy.force = 2;
        self.setBossPos(this.enemy);
        self.addHpAndName(this.enemy, false);
        self.scene.addUnit(this.enemy);
    };
    SanGuoYiTongSceneCtrl.prototype.aiUpdate = function (ctx) {
        var self = this;
        if (self.leftPlayer && self.leftPlayer.sceneChar) {
            GuanQiaAI.thinkAttack(this.leftPlayer.sceneChar, ctx);
        }
    };
    SanGuoYiTongSceneCtrl.prototype.addHpAndName = function (role, isSelf) {
        var namebar = RoleHpAndNamePlug.create(isSelf);
        namebar.role = role;
        role.addPlug(namebar);
    };
    SanGuoYiTongSceneCtrl.prototype.setRolePos = function (role) {
        var x = this.scene.map.focusx;
        if (!x) {
            x = 418;
        }
        role.x = 100;
        role.y = 720;
    };
    SanGuoYiTongSceneCtrl.prototype.setBossPos = function (role) {
        var cx = this.scene.map.focusx;
        role.x = cx + 350;
        role.y = 720;
    };
    return SanGuoYiTongSceneCtrl;
}(SceneCtrl));
__reflect(SanGuoYiTongSceneCtrl.prototype, "SanGuoYiTongSceneCtrl");
