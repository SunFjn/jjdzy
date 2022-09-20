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
var ActComLeiTaiSceneCtrl = (function (_super) {
    __extends(ActComLeiTaiSceneCtrl, _super);
    function ActComLeiTaiSceneCtrl() {
        var _this = _super.call(this) || this;
        _this.oldTime = 0;
        _this.st = -1;
        return _this;
    }
    Object.defineProperty(ActComLeiTaiSceneCtrl, "instance", {
        get: function () {
            if (!ActComLeiTaiSceneCtrl._instance)
                ActComLeiTaiSceneCtrl._instance = new ActComLeiTaiSceneCtrl();
            return ActComLeiTaiSceneCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    ActComLeiTaiSceneCtrl.prototype.onEnter = function (scene) {
        this.st = -1;
        this.scene = scene;
        scene.setLeftAndRight();
        scene.initWithID(404001);
        this.createMyChars();
        GGlobal.layerMgr.close2(UIConst.ACTCOM_LEITAI);
        GGlobal.layerMgr.close2(UIConst.ACTCOM_LEITAI_REPORT);
        GGlobal.layerMgr.close2(UIConst.ACTCOM_LEITAI_REWARD);
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
        GGlobal.model_ActLeiTai.listen(Model_ActLeiTai.FIGHTEND, this.onDrop, this);
    };
    ActComLeiTaiSceneCtrl.prototype.onExit = function (scene) {
        this.scene.setLeftAndRight();
        this.leftPlayer = null;
        this.rightPlayer = null;
        scene.removeAll();
        MainUIController.showBottomExite(false);
    };
    ActComLeiTaiSceneCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，是否确认？", Handler.create(this, this.okHandler));
    };
    ActComLeiTaiSceneCtrl.prototype.okHandler = function () {
        this.overHandler();
        //发送失败协议
        GGlobal.model_ActLeiTai.CG_FIGHTEND_11603(0);
    };
    ActComLeiTaiSceneCtrl.prototype.update = function (ctx) {
        var now = egret.getTimer();
        if (this.st == -1) {
            this.setState(0);
        }
        else if (this.st == 0) {
            var myhp = this.scene.getForceHp(1);
            var playerhp = this.scene.getForceHp(2);
            if (playerhp <= 0 || myhp <= 0) {
                this.setState(this.checkResult());
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
    ActComLeiTaiSceneCtrl.prototype.setState = function (st) {
        if (st == 0) {
            var m = GGlobal.model_ActLeiTai;
            var bat = m.batLeiTai;
            var npcId = bat.plyArr[0].npcId;
            if (npcId > 0) {
                this.enemy = this.createEnemys(npcId);
            }
            else {
                var vo = GGlobal.modelPlayer.playerDetailDic[m.batPlyId];
                this.createOther(vo);
                this.addOther(vo.sceneChar);
            }
        }
        else if (st == 1) {
            GGlobal.model_ActLeiTai.CG_FIGHTEND_11603(0);
        }
        else if (st == 2) {
            GGlobal.model_ActLeiTai.CG_FIGHTEND_11603(1);
        }
        this.oldTime = egret.getTimer();
        this.st = st;
    };
    ActComLeiTaiSceneCtrl.prototype.onDrop = function () {
        var m = GGlobal.model_ActLeiTai;
        var res = m.batRes;
        var self = this;
        if (res == 0 || res == 2) {
            setTimeout(function () {
                ViewCommonFail.show(5000, self, "离开", self.overHandler, null, m.batDrop);
            }, 1000);
            if (res == 2) {
                this.st = 3;
                ViewCommonWarn.text("擂台活动已结束");
            }
        }
        else {
            var self_1 = this;
            setTimeout(function () {
                ViewCommonWin.show(m.batDrop, 5000, self_1, "退出", self_1.overHandler);
            }, 1000);
        }
    };
    ActComLeiTaiSceneCtrl.prototype.createEnemys = function (id) {
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
    ActComLeiTaiSceneCtrl.prototype.overHandler = function () {
        GGlobal.modelScene.returnMainScene();
        if (GGlobal.layerMgr.lastPanelId <= 0)
            GGlobal.layerMgr.open(UIConst.ACTCOM, UIConst.ACTCOM_LEITAI);
    };
    /**  1失败 2胜利*/
    ActComLeiTaiSceneCtrl.prototype.checkResult = function () {
        var hasLeft = this.scene.getForceHp(1);
        var hasRight = this.scene.getForceHp(2);
        if (hasLeft > hasRight) {
            return 2;
        }
        else {
            return 1;
        }
    };
    ActComLeiTaiSceneCtrl.prototype.createMyChars = function () {
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
    };
    ActComLeiTaiSceneCtrl.prototype.addOther = function (vo) {
        this.rightPlayer = vo;
    };
    ActComLeiTaiSceneCtrl.prototype.createOther = function (vo) {
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
        this.scaleAttribute(role, Model_CrossKing.battleRes, false);
    };
    ActComLeiTaiSceneCtrl.prototype.aiUpdate = function (ctx) {
        var self = this;
        GuanQiaAI.thinkAttack(this.leftPlayer, ctx);
        if (this.rightPlayer) {
            GuanQiaAI.thinkAttack(this.rightPlayer, ctx);
        }
    };
    ActComLeiTaiSceneCtrl.prototype.addHpAndName = function (role, isSelf) {
        var namebar = RoleHpAndNamePlug.create(isSelf);
        namebar.role = role;
        role.addPlug(namebar);
    };
    return ActComLeiTaiSceneCtrl;
}(SceneCtrl));
__reflect(ActComLeiTaiSceneCtrl.prototype, "ActComLeiTaiSceneCtrl");
