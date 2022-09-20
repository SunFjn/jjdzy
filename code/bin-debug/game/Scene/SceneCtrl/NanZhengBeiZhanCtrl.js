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
var NanZhengBeiZhanCtrl = (function (_super) {
    __extends(NanZhengBeiZhanCtrl, _super);
    function NanZhengBeiZhanCtrl() {
        var _this = _super.call(this) || this;
        _this.oldTime = 0;
        _this.st = -1;
        return _this;
    }
    Object.defineProperty(NanZhengBeiZhanCtrl, "instance", {
        get: function () {
            if (!NanZhengBeiZhanCtrl._instance)
                NanZhengBeiZhanCtrl._instance = new NanZhengBeiZhanCtrl();
            return NanZhengBeiZhanCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    NanZhengBeiZhanCtrl.prototype.onEnter = function (scene) {
        this.scene = scene;
        this.st = -1;
        this.scene.setLeftAndRight();
        scene.initWithID(340003);
        this.createMyChars();
        GGlobal.layerMgr.close2(UIConst.NANZHENG_BEIZHAN);
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
    };
    NanZhengBeiZhanCtrl.prototype.onExit = function (scene) {
        this.scene.setLeftAndRight();
        if (Model_NZBZ.isRobot != 1) {
            GGlobal.modelPlayer.removePlayer(Model_NZBZ.battleID);
        }
        this.leftPlayer = null;
        this.rightPlayer = null;
        Model_NZBZ.battleID = 0;
        scene.removeAll();
        MainUIController.showBottomExite(false);
        GGlobal.layerMgr.open(UIConst.NANZHENG_BEIZHAN);
    };
    NanZhengBeiZhanCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
    };
    NanZhengBeiZhanCtrl.prototype.okHandler = function () {
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        //发送失败协议
        GGlobal.modelnzbz.CG_NZBZ_BATTLE_RESULT(2);
    };
    NanZhengBeiZhanCtrl.prototype.update = function (ctx) {
        var now = egret.getTimer();
        if (this.st == -1) {
            this.setState(0);
            // this.watchMainRole();
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
                    if (this.rightPlayer) {
                        this.killRole(this.leftPlayer.sceneChar, this.rightPlayer.sceneChar);
                    }
                    else {
                        this.killRole(this.leftPlayer.sceneChar, this.enemy);
                    }
                }
            }
            this.aiUpdate(ctx);
        }
        else {
        }
        this.scene.watchMainRole();
    };
    NanZhengBeiZhanCtrl.prototype.setState = function (st) {
        if (st == 0) {
            if (Model_NZBZ.isRobot == 1) {
                this.createEnemys();
            }
            else {
                var vo = GGlobal.modelPlayer.playerDetailDic[Model_NZBZ.battleID];
                if (!vo) {
                    return;
                }
                this.addOther(vo);
                this.createOther(this.rightPlayer);
            }
        }
        else if (st == 1) {
            console.log("南征北战挑战胜利");
            GGlobal.modelnzbz.CG_NZBZ_BATTLE_RESULT(1);
        }
        else if (st == 2) {
            console.log("南征北战挑战失败");
            GGlobal.modelnzbz.CG_NZBZ_BATTLE_RESULT(0);
        }
        this.oldTime = egret.getTimer();
        this.st = st;
    };
    NanZhengBeiZhanCtrl.prototype.createMyChars = function () {
        var vomine = Model_player.voMine;
        this.leftPlayer = vomine;
        vomine.updateChars();
        var i = 0;
        var lifeHero = this.scene.getLifeHero();
        var role = vomine.sceneChar;
        if (!lifeHero) {
            this.setRolePos(role);
            role.invalid |= 1023;
            role.force = 1;
            role.setDir(1);
            this.scene.addUnit(role);
            this.addHpAndName(role, true);
        }
        this.scaleAttribute(role, Model_NZBZ.battleRet, true);
    };
    NanZhengBeiZhanCtrl.prototype.setRolePos = function (role) {
        var x = this.scene.map.focusx;
        if (!x) {
            x = 418;
        }
        role.x = 100;
        role.y = 720;
    };
    NanZhengBeiZhanCtrl.prototype.setBossPos = function (role) {
        var cx = this.scene.map.focusx;
        role.x = cx + 350;
        role.y = 720;
    };
    NanZhengBeiZhanCtrl.prototype.addOther = function (vo) {
        this.rightPlayer = vo;
    };
    NanZhengBeiZhanCtrl.prototype.createOther = function (vo) {
        vo.updateChars();
        var role = vo.sceneChar;
        if (!this.scene.getUnit(role.id)) {
            this.setBossPos(role);
            role.invalid |= 1023;
            role.force = 2;
            role.setDir(-1);
            this.scene.addUnit(role);
            this.addHpAndName(role, false);
        }
        this.scaleAttribute(role, Model_NZBZ.battleRet, false);
    };
    NanZhengBeiZhanCtrl.prototype.createEnemys = function () {
        this.enemy = this.createEmeny(Model_NZBZ.battleID);
        var ai = new CommonAICtrl();
        ai.role = this.enemy;
        this.enemy.addPlug(ai);
        this.enemy.force = 2;
        this.setBossPos(this.enemy);
        var enemyArr = Model_NZBZ.enemyArr;
        for (var i = 0; i < enemyArr.length; i++) {
            if (enemyArr[i].id == Model_NZBZ.battleID) {
                this.enemy.setPlayerName(enemyArr[i].name);
                break;
            }
        }
        this.addHpAndName(this.enemy, false);
        this.scene.addUnit(this.enemy);
        this.scaleAttribute(this.enemy, Model_NZBZ.battleRet, false);
    };
    NanZhengBeiZhanCtrl.prototype.aiUpdate = function (ctx) {
        var self = this;
        if (self.leftPlayer && self.leftPlayer.sceneChar) {
            GuanQiaAI.thinkAttack(self.leftPlayer.sceneChar, ctx);
        }
        if (self.rightPlayer && self.rightPlayer.sceneChar) {
            GuanQiaAI.thinkAttack(this.rightPlayer.sceneChar, ctx);
        }
    };
    return NanZhengBeiZhanCtrl;
}(SceneCtrl));
__reflect(NanZhengBeiZhanCtrl.prototype, "NanZhengBeiZhanCtrl");
