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
var CrossWarsCtrl = (function (_super) {
    __extends(CrossWarsCtrl, _super);
    function CrossWarsCtrl() {
        var _this = _super.call(this) || this;
        _this.oldTime = 0;
        _this.st = -1;
        return _this;
    }
    Object.defineProperty(CrossWarsCtrl, "instance", {
        get: function () {
            if (!CrossWarsCtrl._instance)
                CrossWarsCtrl._instance = new CrossWarsCtrl();
            return CrossWarsCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    CrossWarsCtrl.prototype.onEnter = function (scene) {
        this.st = -1;
        this.scene = scene;
        this.scene.setLeftAndRight();
        scene.initWithID(340007);
        scene.random.seed = 0;
        var t = Model_CrossWars.battleTurn;
        GGlobal.layerMgr.close2(UIConst.CROSS_WARS);
        Model_CrossWars.battleTurn = t;
        GGlobal.layerMgr.open(UIConst.CROSS_WARS_LOOK);
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.overHandler, this);
    };
    CrossWarsCtrl.prototype.onExit = function (scene) {
        this.scene.setLeftAndRight();
        Model_CrossWars.battleOpp1 = null;
        Model_CrossWars.battleOpp2 = null;
        this.leftPlayer = null;
        this.rightPlayer = null;
        scene.removeAll();
        MainUIController.showBottomExite(false);
        GGlobal.layerMgr.close2(UIConst.CROSS_WARS_LOOK);
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.overHandler, this);
    };
    CrossWarsCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出观看，是否确认？", Handler.create(this, this.overHandler));
    };
    CrossWarsCtrl.prototype.update = function (ctx) {
        var now = egret.getTimer();
        if (this.st == -1) {
            this.setState(0);
        }
        else if (this.st == 0) {
            var myhp = this.scene.getForceHp(1);
            var playerhp = this.scene.getForceHp(2);
            if (playerhp <= 0 || myhp <= 0) {
                if (Model_CrossWars.battleRes > 0) {
                    this.setState(Model_CrossWars.battleRes);
                }
                else {
                    this.setState(this.checkResult());
                }
            }
            if (now - this.oldTime >= this.pvpTime) {
                this.killRole(this.leftPlayer, this.rightPlayer);
            }
            this.aiUpdate(ctx);
        }
        else {
        }
        this.scene.watchMainRole();
    };
    CrossWarsCtrl.prototype.setState = function (st) {
        if (st == 0) {
            // this.create1(Model_CrossWars.battleOpp1);
            // this.create2(Model_CrossWars.battleOpp2);
            var vo1 = GGlobal.modelPlayer.playerDetailDic[Model_CrossWars.battleOpp1.id];
            var vo2 = GGlobal.modelPlayer.playerDetailDic[Model_CrossWars.battleOpp2.id];
            this.create1(vo1);
            this.create2(vo2);
        }
        else if (st == 1) {
            setTimeout(function () {
                ViewCommonWin2.show(Model_CrossWars.battleRes2, 5000);
            }, 1000);
        }
        else if (st == 2) {
            setTimeout(function () {
                ViewCommonWin2.show(Model_CrossWars.battleRes1, 5000);
            }, 1000);
        }
        this.oldTime = egret.getTimer();
        this.st = st;
    };
    CrossWarsCtrl.prototype.overHandler = function () {
        GGlobal.modelScene.returnMainScene();
        if (GGlobal.layerMgr.lastPanelId <= 0)
            GGlobal.layerMgr.open(UIConst.CROSS_WARS);
    };
    /**  1失败 2胜利*/
    CrossWarsCtrl.prototype.checkResult = function () {
        var hasLeft = this.scene.getForceHp(1);
        var hasRight = this.scene.getForceHp(2);
        if (hasLeft > hasRight) {
            return 2;
        }
        else {
            return 1;
        }
    };
    CrossWarsCtrl.prototype.create1 = function (vo) {
        vo.updateChars();
        var role = vo.sceneChar;
        if (!this.scene.getUnit(role.id)) {
            this.setRolePos(role);
            role.invalid |= 1023;
            role.force = 1;
            role.setDir(1);
            this.scene.addUnit(role);
            this.addHpAndName(role, false);
        }
        this.leftPlayer = role;
        role.scaleAttribute(Model_CrossWars.battleRes == 2);
    };
    CrossWarsCtrl.prototype.create2 = function (vo) {
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
        this.rightPlayer = role;
        role.scaleAttribute(Model_CrossWars.battleRes == 1);
    };
    CrossWarsCtrl.prototype.aiUpdate = function (ctx) {
        GuanQiaAI.thinkAttack(this.leftPlayer, ctx);
        GuanQiaAI.thinkAttack(this.rightPlayer, ctx);
    };
    return CrossWarsCtrl;
}(SceneCtrl));
__reflect(CrossWarsCtrl.prototype, "CrossWarsCtrl");
