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
var MainTownSceneCtrl = (function (_super) {
    __extends(MainTownSceneCtrl, _super);
    function MainTownSceneCtrl() {
        var _this = _super.call(this) || this;
        _this.npcCFG = {};
        _this.heroPlugs = [];
        _this.exptime = 0;
        _this.checkRemain = 0;
        return _this;
    }
    MainTownSceneCtrl.prototype.onEnter = function () {
        var mapid = 310001;
        // GGlobal.modelScene.lastMainSceneID = GGlobal.mapscene.scenetype;
        // GGlobal.modelScene.csPlayerList();
        // this.cfginfo = CFG_MapDetail.LIB[mapid].info;
        this.scene = GGlobal.mapscene;
        var voMine = Model_player.voMine;
        if (!voMine.sceneChar) {
            voMine.updateChars();
        }
        else {
            voMine.fixRoles();
        }
        var hero = this.hero = voMine.sceneChar;
        hero.x = MathUtil.rndNum(100, 1440 - 100);
        hero.y = MathUtil.rndNum(450, 600);
        hero.setBody(voMine.getBody());
        this.scene.addUnit(hero);
        var sceneRoleCtrl = new HomeSceneHeroAI();
        sceneRoleCtrl.role = hero;
        hero.addPlug(sceneRoleCtrl);
        var map = this.scene.map;
        map.va = { numRow: 1, numCol: 1 };
        map.blockSizeW = 1600;
        map.blockSizeH = 1136;
        this.setMapHead(mapid);
        map.initCustom(GGlobal.stage.stageWidth, 1136, 1600, 1136);
        map.updateViewLimit();
        var layerMgr = GGlobal.layerMgr;
        this.exptime = egret.getTimer();
        this.updateHeroName();
        this.scene.watchMainRole(35);
    };
    MainTownSceneCtrl.prototype.updateHeroName = function () {
    };
    MainTownSceneCtrl.prototype.onExit = function () {
        this.scene.removeAll();
        this.scene.initMapCustom();
        var layerMgr = GGlobal.layerMgr;
        this.hero = null;
        if (true) {
            // GGlobal.layerMgr.register(-112, ArenaEntry);
            // GGlobal.layerMgr.open(-112);
        }
    };
    MainTownSceneCtrl.prototype.update = function (ctx) {
        this.scene.watchMainRole();
        this.checkRemain -= ctx.dt;
        if (this.checkRemain < 0) {
            this.checkRemain = 200;
            // this.checkCreateNPC(this.cfginfo.npcs);
        }
        var now = egret.getTimer();
        if (now - this.exptime >= 7000) {
        }
    };
    MainTownSceneCtrl.prototype.onPList = function (list) {
    };
    return MainTownSceneCtrl;
}(SceneCtrl));
__reflect(MainTownSceneCtrl.prototype, "MainTownSceneCtrl");
