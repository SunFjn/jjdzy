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
var ServerDataBattleCtrl = (function (_super) {
    __extends(ServerDataBattleCtrl, _super);
    function ServerDataBattleCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.oldTime = 0;
        _this.st = -1;
        return _this;
    }
    Object.defineProperty(ServerDataBattleCtrl, "instance", {
        get: function () {
            if (!ServerDataBattleCtrl._instance)
                ServerDataBattleCtrl._instance = new ServerDataBattleCtrl();
            return ServerDataBattleCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    ServerDataBattleCtrl.prototype.onEnter = function (scene) {
        var self = this;
        self.leftPlayerArr = [];
        self.rightPlayerArr = [];
        self.st = -1;
        self.scene = scene;
        GGlobal.control.notify(Enum_MsgType.ENTER_SERVERBATTLE);
        scene.setLeftAndRight();
        self.createMyChars();
        MainUIController.showBottomExite(true, Handler.create(self, self.onClickEixt), self);
        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.failHandler, self);
    };
    ServerDataBattleCtrl.prototype.failHandler = function () {
        if (Model_battle.systemID == UIConst.LIANGCAO) {
            return;
        }
        GGlobal.modelScene.returnMainScene();
    };
    ServerDataBattleCtrl.prototype.onExit = function (scene) {
        var self = this;
        self.scene.setLeftAndRight();
        Model_battle.battleId = 0;
        scene.removeAll();
        Model_battle.buffDic = {};
        self.leftPlayerArr = [];
        self.rightPlayerArr = [];
        GGlobal.control.notify(Enum_MsgType.EXIT_SERVERBATTLE);
        MainUIController.showBottomExite(false);
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.failHandler, self);
    };
    ServerDataBattleCtrl.prototype.onClickEixt = function () {
        var self = this;
        var tips = "退出将视为挑战失败，是否确认？\n(挑战次数不返还)";
        if (GGlobal.modelFengHuoLY.inActivity || GGlobal.modelWenDingTX.ACtiving) {
            tips = "退出将视为挑战失败，是否确认？";
        }
        ViewAlert.show(tips, Handler.create(self, self.okHandler));
    };
    ServerDataBattleCtrl.prototype.okHandler = function () {
        if (Model_battle.systemID != UIConst.LIANGCAO) {
            GGlobal.mapscene.enterScene(SceneCtrl.GUANQIA);
        }
        //发送失败协议
        GGlobal.modelbattle.CG_EXIT_BATTLE();
    };
    ServerDataBattleCtrl.prototype.update = function (ctx) {
        var self = this;
        var now = egret.getTimer();
        if (self.st == -1) {
            self.setState(0);
        }
        else if (self.st == 0) {
            var myhp = self.scene.getForceCount(1);
            var playerhp = self.scene.getForceCount(2);
            if (playerhp <= 0) {
                self.setState(1);
            }
            else if (myhp <= 0) {
                self.setState(2);
            }
            else {
            }
            self.aiUpdate(ctx);
        }
        else {
        }
        self.scene.watchMainRole();
    };
    ServerDataBattleCtrl.prototype.setState = function (st) {
        var self = this;
        if (st == 0) {
            self.createOther();
            self.updateBuff(Model_battle.buffDic);
        }
        else if (st == 1) {
        }
        else if (st == 2) {
        }
        self.oldTime = egret.getTimer();
        self.st = st;
    };
    ServerDataBattleCtrl.prototype.updateBuff = function (roleData) {
        var self = this;
        for (var key in roleData) {
            var role = GGlobal.mapscene.getUnit(key);
            if (role) {
                for (var i = 0; i < roleData[key].length; i++) {
                    if (roleData[key][i].state == 1) {
                        role.addServerBuff(roleData[key][i].buffID);
                    }
                    else {
                        role.clearServerBuff(roleData[key][i].buffID);
                    }
                }
            }
        }
    };
    ServerDataBattleCtrl.prototype.createMyChars = function () {
        var self = this;
        var arr = Model_battle.leftPlayerArr;
        for (var i = 0; i < arr.length; i++) {
            var vomine = arr[i];
            vomine.updateChars();
            var role = vomine.sceneChar;
            if (!self.scene.getUnit(role.id)) {
                role.curhp = vomine.currentHp;
                self.setRolePos(role);
                role.invalid |= 1023;
                role.force = 1;
                role.setDir(1);
                role.clearHurt = 1;
                self.scene.addUnit(role);
                self.addHpAndName(role, true);
            }
        }
        self.leftPlayerArr = arr;
    };
    ServerDataBattleCtrl.prototype.createOther = function () {
        var self = this;
        var arr = Model_battle.rightPlayerArr;
        for (var i = 0; i < arr.length; i++) {
            var vomine = arr[i];
            vomine.updateChars();
            var role = vomine.sceneChar;
            if (!self.scene.getUnit(role.id)) {
                role.curhp = vomine.currentHp;
                self.setBossPos(role);
                role.invalid |= 1023;
                role.force = 2;
                role.setDir(-1);
                role.clearHurt = 1;
                self.scene.addUnit(role);
                self.addHpAndName(role, false);
            }
        }
        self.rightPlayerArr = arr;
    };
    ServerDataBattleCtrl.prototype.aiUpdate = function (ctx) {
        var s = this;
        for (var i = 0; i < s.leftPlayerArr.length; i++) {
            if (s.leftPlayerArr[i])
                GuanQiaAI.thinkAttack(s.leftPlayerArr[i].sceneChar, ctx);
        }
        for (var i = 0; i < s.rightPlayerArr.length; i++) {
            if (s.rightPlayerArr[i])
                GuanQiaAI.thinkAttack(s.rightPlayerArr[i].sceneChar, ctx);
        }
    };
    ServerDataBattleCtrl.prototype.setRolePos = function (role) {
        var self = this;
        var x = self.scene.map.focusx;
        if (!x) {
            x = 418;
        }
        role.x = 100;
        role.y = 720;
    };
    ServerDataBattleCtrl.prototype.setBossPos = function (role) {
        var self = this;
        var cx = self.scene.map.focusx;
        role.x = cx + 350;
        role.y = 720;
    };
    return ServerDataBattleCtrl;
}(SceneCtrl));
__reflect(ServerDataBattleCtrl.prototype, "ServerDataBattleCtrl");
