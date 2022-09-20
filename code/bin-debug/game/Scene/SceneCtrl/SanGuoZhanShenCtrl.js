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
var SanGuoZhanShenCtrl = (function (_super) {
    __extends(SanGuoZhanShenCtrl, _super);
    function SanGuoZhanShenCtrl() {
        var _this = _super.call(this) || this;
        _this.oldTime = 0;
        _this.st = -1;
        return _this;
    }
    Object.defineProperty(SanGuoZhanShenCtrl, "instance", {
        get: function () {
            if (!SanGuoZhanShenCtrl._instance)
                SanGuoZhanShenCtrl._instance = new SanGuoZhanShenCtrl();
            return SanGuoZhanShenCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    SanGuoZhanShenCtrl.prototype.onEnter = function (scene) {
        this.leftPlayer = null;
        this.rightPlayer = null;
        this.st = -1;
        this.scene = scene;
        this.scene.setLeftAndRight();
        scene.initWithID(340001);
        this.createMyChars();
        GGlobal.layerMgr.close2(UIConst.ARENA);
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
    };
    SanGuoZhanShenCtrl.prototype.onExit = function (scene) {
        this.scene.setLeftAndRight();
        GGlobal.modelPlayer.removePlayer(Model_SGZS.battleId);
        Model_SGZS.battleId = 0;
        scene.removeAll();
        MainUIController.showBottomExite(false);
        if (GGlobal.layerMgr.lastPanelId <= 0)
            GGlobal.layerMgr.open(UIConst.ARENA);
        this.leftPlayer = null;
        this.rightPlayer = null;
    };
    SanGuoZhanShenCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
    };
    SanGuoZhanShenCtrl.prototype.okHandler = function () {
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        //发送失败协议
        GGlobal.modelsgzs.CG_BATTLE_RESULT_SANGUO_ZHANSHEN(2);
    };
    SanGuoZhanShenCtrl.prototype.update = function (ctx) {
        var self = this;
        var now = egret.getTimer();
        if (self.st == -1) {
            self.setState(0);
        }
        else if (self.st == 0) {
            var myhp = self.scene.getForceHp(1);
            var playerhp = self.scene.getForceHp(2);
            if (playerhp <= 0) {
                self.setState(1);
            }
            else if (myhp <= 0) {
                self.setState(2);
            }
            else {
                if (now - self.oldTime >= self.pvpTime) {
                    if (self.rightPlayer) {
                        self.killRole(self.leftPlayer.sceneChar, self.rightPlayer.sceneChar);
                    }
                    else {
                        self.killRole(self.leftPlayer.sceneChar, self.enemy);
                    }
                }
            }
            this.aiUpdate(ctx);
        }
        else {
        }
        this.scene.watchMainRole();
    };
    SanGuoZhanShenCtrl.prototype.setState = function (st) {
        if (st == 0) {
            if (Model_SGZS.robotId > 0) {
                this.createEnemys();
            }
            else {
                var vo = GGlobal.modelPlayer.playerDetailDic[Model_SGZS.battleId];
                if (!vo) {
                    return;
                }
                this.addOther(vo);
                this.createOther(this.rightPlayer);
            }
        }
        else if (st == 1) {
            GGlobal.modelsgzs.CG_BATTLE_RESULT_SANGUO_ZHANSHEN(1);
        }
        else if (st == 2) {
            GGlobal.modelsgzs.CG_BATTLE_RESULT_SANGUO_ZHANSHEN(0);
        }
        this.oldTime = egret.getTimer();
        this.st = st;
    };
    SanGuoZhanShenCtrl.prototype.createMyChars = function () {
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
        this.scaleAttribute(role, Model_SGZS.battleRet, true);
    };
    SanGuoZhanShenCtrl.prototype.addOther = function (vo) {
        this.rightPlayer = vo;
    };
    SanGuoZhanShenCtrl.prototype.createOther = function (vo) {
        vo.updateChars();
        var role = vo.sceneChar;
        if (!this.scene.getUnit(role.id)) {
            this.setBossPos(role);
            role.invalid |= 1023;
            role.force = 2;
            role.setDir(-1);
            role.autoSkill = true;
            this.scene.addUnit(role);
            this.addHpAndName(role, false);
        }
        this.scaleAttribute(role, Model_SGZS.battleRet, false);
    };
    SanGuoZhanShenCtrl.prototype.createEnemys = function () {
        var cfg = Config.warbot_222[Model_SGZS.robotId];
        var monster = JSON.parse(cfg.monster);
        this.enemy = this.createEmeny(monster[0][0]);
        var ai = new CommonAICtrl();
        ai.role = this.enemy;
        this.enemy.addPlug(ai);
        this.enemy.force = 2;
        this.setBossPos(this.enemy);
        this.addHpAndName(this.enemy, false);
        this.scene.addUnit(this.enemy);
        this.scaleAttribute(this.enemy, Model_SGZS.battleRet, false);
    };
    SanGuoZhanShenCtrl.prototype.aiUpdate = function (ctx) {
        var self = this;
        if (self.leftPlayer && self.leftPlayer.sceneChar) {
            GuanQiaAI.thinkAttack(this.leftPlayer.sceneChar, ctx);
        }
        if (self.rightPlayer && self.rightPlayer.sceneChar) {
            GuanQiaAI.thinkAttack(this.rightPlayer.sceneChar, ctx);
        }
    };
    SanGuoZhanShenCtrl.prototype.addHpAndName = function (role, isSelf) {
        var namebar = RoleHpAndNamePlug.create(isSelf);
        namebar.role = role;
        role.addPlug(namebar);
    };
    SanGuoZhanShenCtrl.prototype.setRolePos = function (role) {
        var x = this.scene.map.focusx;
        if (!x) {
            x = 418;
        }
        role.x = 100;
        role.y = 720;
    };
    SanGuoZhanShenCtrl.prototype.setBossPos = function (role) {
        var cx = this.scene.map.focusx;
        role.x = cx + 350;
        role.y = 720;
    };
    return SanGuoZhanShenCtrl;
}(SceneCtrl));
__reflect(SanGuoZhanShenCtrl.prototype, "SanGuoZhanShenCtrl");
