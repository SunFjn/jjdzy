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
var CrossKingCtrl = (function (_super) {
    __extends(CrossKingCtrl, _super);
    function CrossKingCtrl() {
        var _this = _super.call(this) || this;
        _this.oldTime = 0;
        _this.st = -1;
        return _this;
    }
    Object.defineProperty(CrossKingCtrl, "instance", {
        get: function () {
            if (!CrossKingCtrl._instance)
                CrossKingCtrl._instance = new CrossKingCtrl();
            return CrossKingCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    CrossKingCtrl.prototype.onEnter = function (scene) {
        this.st = -1;
        this.scene = scene;
        scene.setLeftAndRight();
        scene.initWithID(340006);
        this.createMyChars();
        GGlobal.layerMgr.close2(UIConst.CROSS_KING);
        GGlobal.layerMgr.close2(UIConst.CROSS_KING_PROMOTE);
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
    };
    CrossKingCtrl.prototype.onExit = function (scene) {
        this.scene.setLeftAndRight();
        Model_CrossKing.battleOpp = null;
        this.leftPlayer = null;
        this.rightPlayer = null;
        scene.removeAll();
        MainUIController.showBottomExite(false);
    };
    CrossKingCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
    };
    CrossKingCtrl.prototype.okHandler = function () {
        this.overHandler();
        //发送失败协议
        GGlobal.modelCrossKing.CG_GET_BATTLE_REWARD(0);
    };
    CrossKingCtrl.prototype.update = function (ctx) {
        var now = egret.getTimer();
        if (this.st == -1) {
            this.setState(0);
        }
        else if (this.st == 0) {
            var myhp = this.scene.getForceHp(1);
            var playerhp = this.scene.getForceHp(2);
            if (playerhp <= 0 || myhp <= 0) {
                if (Model_CrossKing.battleRes == 1) {
                    this.setState(Model_CrossKing.battleRes);
                }
                else {
                    this.setState(this.checkResult());
                }
            }
            if (now - this.oldTime >= this.pvpTime) {
                if (this.rightPlayer) {
                    this.killRole(this.leftPlayer, this.rightPlayer);
                }
                else {
                    this.killRole(this.leftPlayer, this.enemy);
                }
            }
            this.aiUpdate(ctx);
        }
        else {
        }
        this.scene.watchMainRole();
    };
    CrossKingCtrl.prototype.setState = function (st) {
        if (st == 0) {
            if (Model_CrossKing.battleIsNpc) {
                this.enemy = this.createEnemys(Model_CrossKing.battleOpp.id);
            }
            else {
                var vo = GGlobal.modelPlayer.playerDetailDic[Model_CrossKing.battleOpp.id];
                this.createOther(vo);
                this.addOther(vo.sceneChar);
                // this.createOther(vo);
                // this.addOther(Model_CrossKing.battleOpp.sceneChar);
            }
        }
        else if (st == 1) {
            var failDrop = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2202)));
            GGlobal.modelCrossKing.CG_GET_BATTLE_REWARD(0);
            var self_1 = this;
            setTimeout(function () {
                ViewCommonFail.show(5000, self_1, "离开", self_1.overHandler, null, failDrop);
            }, 1000);
        }
        else if (st == 2) {
            var winDrop = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2201)));
            GGlobal.modelCrossKing.CG_GET_BATTLE_REWARD(1);
            var self_2 = this;
            setTimeout(function () {
                ViewCommonWin.show(winDrop, 5000, self_2, "退出", self_2.winExit);
            }, 1000);
        }
        this.oldTime = egret.getTimer();
        this.st = st;
    };
    CrossKingCtrl.prototype.winExit = function () {
        if (Model_CrossKing.battleType == 2) {
            GGlobal.layerMgr.open(UIConst.CROSS_KING_ProSuc);
        }
        this.overHandler();
    };
    CrossKingCtrl.prototype.createEnemys = function (id) {
        var enemy = this.createEmeny(id);
        var ai = new CommonAICtrl();
        ai.role = enemy;
        enemy.addPlug(ai);
        enemy.force = 2;
        this.setBossPos(enemy);
        this.addHpAndName(enemy, false);
        this.scene.addUnit(enemy);
        this.scaleAttribute(enemy, Model_CrossKing.battleRes, false);
        return enemy;
    };
    CrossKingCtrl.prototype.overHandler = function () {
        GGlobal.modelScene.returnMainScene();
        if (GGlobal.layerMgr.lastPanelId <= 0)
            GGlobal.layerMgr.open(UIConst.CROSS_KING);
    };
    /**  1失败 2胜利*/
    CrossKingCtrl.prototype.checkResult = function () {
        var hasLeft = this.scene.getForceHp(1);
        var hasRight = this.scene.getForceHp(2);
        if (hasLeft > hasRight) {
            return 2;
        }
        else {
            return 1;
        }
    };
    CrossKingCtrl.prototype.createMyChars = function () {
        var vomine = Model_player.voMine;
        vomine.updateChars();
        this.leftPlayer = vomine.sceneChar;
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
        this.scaleAttribute(role, Model_CrossKing.battleRes, true);
    };
    CrossKingCtrl.prototype.addOther = function (vo) {
        this.rightPlayer = vo;
    };
    CrossKingCtrl.prototype.createOther = function (vo) {
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
        this.scaleAttribute(role, Model_CrossKing.battleRes, false);
    };
    CrossKingCtrl.prototype.aiUpdate = function (ctx) {
        var self = this;
        GuanQiaAI.thinkAttack(this.leftPlayer, ctx);
        if (this.rightPlayer) {
            GuanQiaAI.thinkAttack(this.rightPlayer, ctx);
        }
    };
    CrossKingCtrl.prototype.addHpAndName = function (role, isSelf) {
        var namebar = RoleHpAndNamePlug.create(isSelf);
        namebar.role = role;
        role.addPlug(namebar);
    };
    return CrossKingCtrl;
}(SceneCtrl));
__reflect(CrossKingCtrl.prototype, "CrossKingCtrl");
