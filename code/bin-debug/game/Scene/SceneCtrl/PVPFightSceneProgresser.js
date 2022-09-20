var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PVPFightSceneProgresser = (function () {
    function PVPFightSceneProgresser() {
        this.damageFix = 0;
        this.totalFrames = 0;
        this.randomseed = 0;
        this.mapId = 0;
        this.winID = 0;
        this.fightType = 0; /**1三国无双*/
        this.pausetime = 0;
    }
    PVPFightSceneProgresser.getInst = function () {
        return this._inst || (this._inst = new PVPFightSceneProgresser());
    };
    PVPFightSceneProgresser.prototype.onEnter = function (scene) {
        scene.fc = 0;
        console.warn("-----------pvpstart-----------");
        // SceneObject.COUNTER = -1000000;
        GGlobal.layerMgr.open(UIConst.CROSS_WARS_LOOK);
        MainUIController.showBottomExite(true, Handler.create(this, this.onClickEixt));
        var self = this;
        self.scene = scene;
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
        leftrole.scaleAttribute(leftrole.str > rightrole.str);
        rightrole.scaleAttribute(leftrole.str < rightrole.str);
        scene.random.seed = self.randomseed;
        //show exite button
    };
    PVPFightSceneProgresser.prototype.onClickEixt = function () {
        GGlobal.modelScene.returnMainScene();
        GGlobal.layerMgr.open(UIConst.SANGUO_WUSHUANG);
    };
    PVPFightSceneProgresser.prototype.onExit = function () {
        this.mapId = 0;
        // SceneObject.COUNTER = 0;
        GGlobal.layerMgr.close(UIConst.CROSS_WARS_LOOK);
        MainUIController.showBottomExite(false);
        this.scene.removeAll();
        this.rightPlayer = null;
        this.leftPlayer = null;
    };
    PVPFightSceneProgresser.prototype.addHpAndName = function (role, isSelf) {
        var namebar = RoleHpAndNamePlug.create(isSelf);
        namebar.role = role;
        role.addPlug(namebar);
    };
    PVPFightSceneProgresser.prototype.update = function (ctx) {
        var self = this;
        self.scene.fc++;
        var leftNum = GGlobal.mapscene.getForceCount(1);
        var rightNum = GGlobal.mapscene.getForceCount(2);
        self.totalFrames++;
        if (leftNum == 0 || rightNum == 0) {
            if (leftNum > 0) {
                self.winID = self.leftPlayer.sceneChar.id;
                self.result = { winner: "left" };
            }
            if (rightNum > 0) {
                self.winID = self.rightPlayer.sceneChar.id;
                self.result = { winner: "right" };
            }
        }
        if (self.result) {
            self.result.fs = self.totalFrames;
            self.result.randomseed = self.randomseed;
            //self.scene.removeAll();
            self.exitT();
            self.result = null;
            return;
        }
        this.scene.watchMainRole();
        var guanQiaAI = GuanQiaAI;
        var leftrole = self.leftPlayer.sceneChar;
        guanQiaAI.thinkAttack(leftrole, ctx);
        var rightrole = self.rightPlayer.sceneChar;
        guanQiaAI.thinkAttack(rightrole, ctx);
    };
    PVPFightSceneProgresser.prototype.exitT = function () {
        if (this.fightType == 1) {
            GGlobal.layerMgr.open(UIConst.SGWS_WIN, this.winID);
        }
        this.scene.scenetype = 0;
        GGlobal.modelScene.returnMainScene();
    };
    return PVPFightSceneProgresser;
}());
__reflect(PVPFightSceneProgresser.prototype, "PVPFightSceneProgresser", ["ISceneCtrl"]);
