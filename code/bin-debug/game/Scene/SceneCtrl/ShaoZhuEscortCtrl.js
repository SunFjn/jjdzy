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
var ShaoZhuEscortCtrl = (function (_super) {
    __extends(ShaoZhuEscortCtrl, _super);
    function ShaoZhuEscortCtrl() {
        var _this = _super.call(this) || this;
        _this.damageFix = 0;
        _this.result = 0;
        _this.totalFrames = 0;
        _this.randomseed = 0;
        _this.mapId = 0;
        _this.winID = 0;
        _this.pausetime = 0;
        return _this;
    }
    Object.defineProperty(ShaoZhuEscortCtrl, "instance", {
        get: function () {
            if (!ShaoZhuEscortCtrl._instance)
                ShaoZhuEscortCtrl._instance = new ShaoZhuEscortCtrl();
            return ShaoZhuEscortCtrl._instance;
        },
        enumerable: true,
        configurable: true
    });
    ShaoZhuEscortCtrl.prototype.onEnter = function (scene) {
        var self = this;
        self.result = 0;
        GGlobal.layerMgr.setPanelVisible(UIConst.SHAOZHU_ESCORT, false);
        GGlobal.layerMgr.setPanelVisible(UIConst.SHAOZHU_ESCORT_REPORT, false);
        GGlobal.layerMgr.open(UIConst.SHAOZHU_ESCORT_LOOK);
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt));
        self.scene = scene;
        var dic = GGlobal.modelPlayer.playerDetailDic;
        self.leftPlayer = dic[self.leftid];
        self.rightPlayer = dic[self.rightid];
        if (!self.leftPlayer || !self.rightPlayer) {
            this.exitT();
            ViewCommonWarn.text("录像数据异常");
            return;
        }
        self.leftPlayer.updateChars();
        self.rightPlayer.updateChars();
        if (self.mapId > 0) {
            scene.initWithID(self.mapId);
        }
        self.leftPlayer.updateChars();
        var leftrole = self.leftPlayer.sceneChar;
        leftrole.y = 640;
        leftrole.x = 220;
        leftrole.force = 1;
        leftrole.setDir(1);
        leftrole.setPlayerName(self.leftPlayer.name);
        self.scene.addUnit(leftrole);
        this.addHpAndName(leftrole, false);
        self.rightPlayer.updateChars();
        var rightrole = self.rightPlayer.sceneChar;
        rightrole.y = 640;
        rightrole.x = 480;
        rightrole.force = 2;
        rightrole.setDir(-1);
        rightrole.setPlayerName(self.rightPlayer.name);
        self.scene.addUnit(rightrole);
        this.addHpAndName(rightrole, false);
        scene.setLeftAndRight();
        //此处保证战力高的一定赢
        leftrole.scaleAttribute(leftrole.str > rightrole.str);
        rightrole.scaleAttribute(leftrole.str < rightrole.str);
        scene.random.seed = self.randomseed;
    };
    ShaoZhuEscortCtrl.prototype.onClickEixt = function () {
        GGlobal.modelScene.returnMainScene();
    };
    ShaoZhuEscortCtrl.prototype.onExit = function () {
        this.mapId = 0;
        GGlobal.layerMgr.setPanelVisible(UIConst.SHAOZHU_ESCORT, true);
        GGlobal.layerMgr.setPanelVisible(UIConst.SHAOZHU_ESCORT_REPORT, true);
        GGlobal.layerMgr.close2(UIConst.SHAOZHU_ESCORT_LOOK);
        MainUIController.showBottomExite(false);
        this.scene.removeAll();
        this.rightPlayer = null;
        this.leftPlayer = null;
    };
    ShaoZhuEscortCtrl.prototype.addHpAndName = function (role, isSelf) {
        var namebar = RoleHpAndNamePlug.create(isSelf);
        namebar.role = role;
        role.addPlug(namebar);
    };
    ShaoZhuEscortCtrl.prototype.update = function (ctx) {
        var self = this;
        self.scene.fc++;
        var leftNum = GGlobal.mapscene.getForceCount(1);
        var rightNum = GGlobal.mapscene.getForceCount(2);
        self.totalFrames++;
        if (leftNum == 0 || rightNum == 0) {
            self.result = 1;
        }
        if (self.result) {
            self.exitT();
            return;
        }
        this.scene.watchMainRole();
        var guanQiaAI = GuanQiaAI;
        var leftrole = self.leftPlayer.sceneChar;
        guanQiaAI.thinkAttack(leftrole, ctx);
        var rightrole = self.rightPlayer.sceneChar;
        guanQiaAI.thinkAttack(rightrole, ctx);
    };
    ShaoZhuEscortCtrl.prototype.exitT = function () {
        this.scene.scenetype = 0;
        GGlobal.modelScene.returnMainScene();
        //在此处  添加打开结算界面
        var data = {};
        data.name = this.name;
        data.power = this.power;
        data.jiangxian = this.jiangxian;
        data.head = this.headid;
        data.systemID = UIConst.SHAOZHU_ESCORT;
        GGlobal.layerMgr.open(UIConst.COMMON_HEAD_WIN, data);
    };
    return ShaoZhuEscortCtrl;
}(SceneCtrl));
__reflect(ShaoZhuEscortCtrl.prototype, "ShaoZhuEscortCtrl");
