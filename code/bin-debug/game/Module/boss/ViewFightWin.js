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
var ViewFightWin = (function (_super) {
    __extends(ViewFightWin, _super);
    function ViewFightWin() {
        var _this = _super.call(this) || this;
        _this.timer = 0;
        _this.isClosePanel = false;
        _this.loadRes();
        return _this;
    }
    ViewFightWin.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewFightWin"));
    };
    ViewFightWin.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "ViewFightWin").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.list.setVirtual();
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.listRender;
        this.txtXieZhu.visible = false;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.finish, this);
        _super.prototype.childrenCreated.call(this);
        this.resetPosition();
    };
    ViewFightWin.prototype.onShown = function () {
        this.showWin(this._args);
        this.timeremain = 5000;
        this.lbTip.visible = ViewFightWin.showTip;
        this.updateBtnRemain();
        GGlobal.control.listen(Enum_MsgType.BATTLEWIN_AWARDSCHANGE, this.showWin, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    };
    ViewFightWin.prototype.onHide = function () {
        this.list.numItems = 0;
        ViewFightWin.showTip = false;
        GGlobal.layerMgr.close(UIConst.BATTLEWIN);
        GGlobal.control.remove(Enum_MsgType.BATTLEWIN_AWARDSCHANGE, this.showWin, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
    };
    ViewFightWin.prototype.onFrame = function (e) {
        this.timer += GGlobal.mapscene.dt;
        this.timeremain -= GGlobal.mapscene.dt;
        if (this.timer >= 500) {
            this.updateBtnRemain();
            this.timer = 0;
        }
        if (this.timeremain <= 0) {
            this.timeremain = 0;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
            this.finish();
        }
    };
    ViewFightWin.prototype.listRender = function (idx, obj) {
        var item = obj;
        item.vo = this.dta[idx];
    };
    ViewFightWin.prototype.showWin = function (arg) {
        if (arg === void 0) { arg = null; }
        var self = this;
        var awards;
        if (arg) {
            awards = arg;
        }
        else {
            awards = GGlobal.modelBoss.bossAward;
        }
        this.dta = awards;
        this.list.numItems = this.dta.length;
    };
    ViewFightWin.prototype.updateBtnRemain = function () {
        this.btnClose.text = "领取" + "(" + Math.ceil(this.timeremain / 1000) + ")";
    };
    ViewFightWin.prototype.finish = function () {
        if (GGlobal.mapscene.scenetype == SceneCtrl.GUANQIA) {
            GGlobal.mapscene.sceneCtrl.setCurSt(0);
        }
        else if (GGlobal.mapscene.scenetype == SceneCtrl.PBOSS) {
            Model_Boss.exitBoss(0);
        }
        else if (GGlobal.mapscene.scenetype == SceneCtrl.QMBOSS || GGlobal.mapscene.scenetype == SceneCtrl.QMBOSS_DJ) {
            Model_Boss.exitBoss(1);
        }
        else if (GGlobal.mapscene.scenetype == SceneCtrl.LVBU) {
            Model_Boss.exitBoss(3);
        }
        else if (GGlobal.mapscene.scenetype == SceneCtrl.MENGHUO) {
            Model_Boss.exitBoss(4);
        }
        else {
            GGlobal.layerMgr.close2(UIConst.BATTLEWIN);
            GGlobal.modelScene.returnMainScene();
        }
        GGlobal.layerMgr.open(UIConst.SCENELOADING);
        GGlobal.layerMgr.close(UIConst.ALERT);
    };
    ViewFightWin.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    //>>>>end
    ViewFightWin.URL = "ui://jvxpx9emnn9876";
    ViewFightWin.showTip = false;
    return ViewFightWin;
}(UIModalPanel));
__reflect(ViewFightWin.prototype, "ViewFightWin");
