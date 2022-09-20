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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ArenaEntry = (function (_super) {
    __extends(ArenaEntry, _super);
    function ArenaEntry() {
        var _this = _super.call(this) || this;
        _this.setSkin("", "", "ArenaEntry");
        return _this;
    }
    ArenaEntry.createInstance = function () {
        return (fairygui.UIPackage.createObject("GM", "ArenaEntry"));
    };
    ArenaEntry.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.addListener();
    };
    ArenaEntry.prototype.resetPosition = function () {
        this.setXY(fairygui.GRoot.inst.width - this.width, 0);
    };
    ArenaEntry.prototype.addListener = function () {
        this.bgBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBGT, this);
        this.arena.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAreanT, this);
        this.rideEnterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRideTouch, this);
        this.btnBreak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBreakSwitchT, this);
        this.hiboxOptionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHitBoxSwitchT, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.closeEventHandler();
        }, this);
    };
    ArenaEntry.prototype.onBGT = function (e) {
        // var guanqiactrl: GuanQiaSceneTestCtrl = GGlobal.mapscene.sceneCtrl as any;
        // guanqiactrl.nextBGIndex();
    };
    ArenaEntry.prototype.onAreanT = function (e) {
        this.enterpvp();
        //GGlobal.mapscene.enterScene(SceneCtrl.ARENA);//进入竞技场
    };
    ArenaEntry.prototype.onBreakSwitchT = function (e) {
        // var scene = GGlobal.mapscene;
        // scene.ignoreBreak = !scene.ignoreBreak;
        // if (scene.ignoreBreak) {
        // 	ViewCommonWarn.text("当前关闭打断");
        // } else {
        // 	ViewCommonWarn.text("当前开启打断");
        // }
        // this.updateBreakBtnLabel();
    };
    ArenaEntry.prototype.onShown = function () {
        this.updateBreakBtnLabel();
        this.updateHitBoxLabel();
        // var p = GGlobal.layerMgr.UI_floorUI;
        // p.addChild(this);
    };
    ArenaEntry.prototype.updateBreakBtnLabel = function () {
        if (!this.btnBreak)
            return;
        // var scene = GGlobal.mapscene;
        // if (scene.ignoreBreak) {
        // 	this.btnBreak.text = "受击状态(关)";
        // } else {
        // 	this.btnBreak.text = "受击状态(开)";
        // }
    };
    ArenaEntry.prototype.onHitBoxSwitchT = function (e) {
        // if (DEBUG) {
        // 	GGlobal.mapscene.showHitBox = !GGlobal.mapscene.showHitBox;
        // 	this.updateHitBoxLabel();
        // }
    };
    ArenaEntry.prototype.updateHitBoxLabel = function () {
        if (!this.hiboxOptionBtn)
            return;
        if (true) {
            var scene = GGlobal.mapscene;
            if (scene.showHitBox) {
                this.hiboxOptionBtn.text = "碰撞显示(开)";
            }
            else {
                this.hiboxOptionBtn.text = "碰撞显示(关)";
            }
        }
    };
    ArenaEntry.prototype.enterpvp = function () {
        if (true) {
            var url = 'http://127.0.0.1:3000?cmd=fight1v1&arg=';
            url += '{"randomseed":555,"left":{"id":1000,"name":"abc","level":82,"job":1,"str":12355,"zs":2,"hp":80030,"mp":5055,"att":10,"pDef":4501,"mDef":2403,"crit":1000,"resCrit":500,"critDmg":999,"dmgAdd":1001,"dmgReduce":510,"pvpDmgAdd":401,"pvpDmgReduce":20,"dizz":1000,"dizzTime":2000,"antiDizz":400,"ms":200,"skillList":[{"lv":1},{"lv":1},{"lv":1},{"lv":1},{"lv":1}]},"right":{"id":2000,"name":"abc","level":82,"str":12355,"zs":2,"job":1,"hp":100000,"att":1,"pDef":1500,"mDef":1400,"crit":1000,"resCrit":500,"critDmg":999,"dmgAdd":100,"dmgReduce":50,"pvpDmgAdd":40,"pvpDmgReduce":20,"dizz":1000,"dizzTime":2000,"antiDizz":401,"ms":200,"skillList":[{"lv":1},{"lv":1},{"lv":1},{"lv":1},{"lv":1}]}}';
            var reqest = HtmlUtil.getRequest(url);
            var player = JSON.parse(reqest.arg);
            var leftPlayer = new Vo_Player();
            var rightPlayer = new Vo_Player();
            leftPlayer.parseObject(player.left);
            rightPlayer.parseObject(player.right);
            var scenectrl = new PVPFightSceneProgresser();
            scenectrl.leftPlayer = leftPlayer;
            scenectrl.rightPlayer = rightPlayer;
            scenectrl.randomseed = player.randomseed;
            GGlobal.mapscene.enterSceneCtrl(scenectrl);
        }
    };
    ArenaEntry.prototype.onRideTouch = function () {
        // var rideScene = new RideSceneCtrl();
        // GGlobal.mapscene.enterSceneCtrl(rideScene);
    };
    ArenaEntry.URL = "ui://vm9a8xq8qb9y6";
    return ArenaEntry;
}(UIPanelBase));
__reflect(ArenaEntry.prototype, "ArenaEntry");
