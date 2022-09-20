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
var DanDaoFuHuiCtrl = (function (_super) {
    __extends(DanDaoFuHuiCtrl, _super);
    function DanDaoFuHuiCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.oldTime = 0;
        _this.st = -1;
        return _this;
    }
    Object.defineProperty(DanDaoFuHuiCtrl, "instance", {
        get: function () {
            if (!DanDaoFuHuiCtrl._instance)
                DanDaoFuHuiCtrl._instance = new DanDaoFuHuiCtrl();
            return DanDaoFuHuiCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    DanDaoFuHuiCtrl.prototype.onEnter = function (scene) {
        this.leftPlayer = null;
        this.rightPlayer = null;
        this.st = -1;
        this.scene = scene;
        scene.setLeftAndRight();
        scene.initWithID(340002);
        this.createMyChars();
        GGlobal.layerMgr.close2(UIConst.ARENA);
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt), this);
        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.failHandler, this);
    };
    DanDaoFuHuiCtrl.prototype.failHandler = function () {
        GGlobal.modelScene.returnMainScene();
    };
    DanDaoFuHuiCtrl.prototype.onExit = function (scene) {
        this.scene.setLeftAndRight();
        GGlobal.modelPlayer.removePlayer(Model_DDFH.battleId);
        Model_DDFH.battleId = 0;
        scene.removeAll();
        MainUIController.showBottomExite(false);
        if (GGlobal.layerMgr.lastPanelId <= 0) {
            if (Model_DDFH.autoMath)
                Model_DDFH.autoTime = 4;
            GGlobal.layerMgr.open(UIConst.ARENA, 1);
        }
        else {
            Model_DDFH.autoMath = false;
        }
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.failHandler, this);
        this.leftPlayer = null;
        this.rightPlayer = null;
    };
    DanDaoFuHuiCtrl.prototype.onClickEixt = function () {
        ViewAlert.show("退出将视为挑战失败，是否确认？\n(挑战次数不返还)", Handler.create(this, this.okHandler));
    };
    DanDaoFuHuiCtrl.prototype.okHandler = function () {
        GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        //发送失败协议
        GGlobal.modelddfh.CG_DANDAOFH_BATTLERESULT(2);
    };
    DanDaoFuHuiCtrl.prototype.update = function (ctx) {
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
                    this.killRole(this.leftPlayer.sceneChar, this.rightPlayer.sceneChar);
                }
            }
            this.aiUpdate(ctx);
        }
        else {
        }
        this.scene.watchMainRole();
    };
    DanDaoFuHuiCtrl.prototype.setState = function (st) {
        if (st == 0) {
            var vo = GGlobal.modelPlayer.playerDetailDic[Model_DDFH.battleId];
            if (!vo) {
                return;
            }
            this.addOther(vo);
            this.createOther(this.rightPlayer);
        }
        else if (st == 1) {
            GGlobal.modelddfh.CG_DANDAOFH_BATTLERESULT(1);
        }
        else if (st == 2) {
            GGlobal.modelddfh.CG_DANDAOFH_BATTLERESULT(0);
        }
        this.oldTime = egret.getTimer();
        this.st = st;
    };
    DanDaoFuHuiCtrl.prototype.createMyChars = function () {
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
        this.scaleAttribute(role, Model_DDFH.battleRet, true);
    };
    DanDaoFuHuiCtrl.prototype.addOther = function (vo) {
        this.rightPlayer = vo;
    };
    DanDaoFuHuiCtrl.prototype.createOther = function (vo) {
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
        this.scaleAttribute(role, Model_DDFH.battleRet, false);
    };
    DanDaoFuHuiCtrl.prototype.aiUpdate = function (ctx) {
        if (this.leftPlayer && this.leftPlayer.sceneChar)
            GuanQiaAI.thinkAttack(this.leftPlayer.sceneChar, ctx);
        if (this.rightPlayer && this.rightPlayer.sceneChar) {
            GuanQiaAI.thinkAttack(this.rightPlayer.sceneChar, ctx);
        }
    };
    DanDaoFuHuiCtrl.prototype.setRolePos = function (role) {
        var x = this.scene.map.focusx;
        if (!x) {
            x = 418;
        }
        role.x = 100;
        role.y = 720;
    };
    DanDaoFuHuiCtrl.prototype.setBossPos = function (role) {
        var cx = this.scene.map.focusx;
        role.x = cx + 350;
        role.y = 720;
    };
    return DanDaoFuHuiCtrl;
}(SceneCtrl));
__reflect(DanDaoFuHuiCtrl.prototype, "DanDaoFuHuiCtrl");
