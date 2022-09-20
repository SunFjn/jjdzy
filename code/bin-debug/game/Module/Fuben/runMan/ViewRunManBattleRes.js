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
var ViewRunManBattleRes = (function (_super) {
    __extends(ViewRunManBattleRes, _super);
    function ViewRunManBattleRes() {
        var _this = _super.call(this) || this;
        _this.isPass = false;
        _this.remainTime = 5000;
        _this.childrenCreated();
        return _this;
    }
    // protected grids: ViewGridRender[] = [];
    // protected gridsFrist: ViewGridRender[] = [];
    ViewRunManBattleRes.createInstance = function () {
        return (fairygui.UIPackage.createObject("FuBen", "ViewRunManBattleRes"));
    };
    ViewRunManBattleRes.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("FuBen", "ViewRunManBattleRes").asCom;
        this.contentPane = this.view;
        this.bg1 = (this.view.getChild("bg1"));
        this.btnClose = (this.view.getChild("btnClose"));
        this.btnContinue = (this.view.getChild("btnContinue"));
        this.hunGrid = (this.view.getChild("hunGrid"));
        this.gHun = (this.view.getChild("gHun"));
        this.gFirst = (this.view.getChild("gFirst"));
        this.list = (this.view.getChild("list"));
        this.listFirst = (this.view.getChild("listFirst"));
        this.list.itemRenderer = this.renderHander;
        this.list.callbackThisObj = this;
        this.listFirst.itemRenderer = this.renderHanderFirst;
        this.listFirst.callbackThisObj = this;
        _super.prototype.childrenCreated.call(this);
    };
    ViewRunManBattleRes.prototype.onShown = function () {
        this.addListen();
        this.update();
    };
    ViewRunManBattleRes.prototype.onHide = function () {
        this.removeListen();
        GGlobal.layerMgr.close(UIConst.FUBEN_RUNMAN_RES);
    };
    ViewRunManBattleRes.prototype.addListen = function () {
        this.btnClose.addClickListener(this.exitHandle, this);
        this.btnContinue.addClickListener(this.continueHandle, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
    };
    ViewRunManBattleRes.prototype.removeListen = function () {
        // ConfigHelp.cleanGridview(this.grids);
        this.btnClose.removeClickListener(this.exitHandle, this);
        this.btnContinue.removeClickListener(this.continueHandle, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
        this.list.numItems = 0;
        this.listFirst.numItems = 0;
    };
    ViewRunManBattleRes.prototype.exitHandle = function (event) {
        if (event === void 0) { event = null; }
        GGlobal.control.notify(Enum_MsgType.RUNMAN_CLOSE_BATTLE);
        this.closeEventHandler(event);
    };
    ViewRunManBattleRes.prototype.continueHandle = function (event) {
        if (event === void 0) { event = null; }
        GGlobal.modelRunMan.CG_BattleType(Model_RunMan.battleType);
        // GGlobal.modelRunMan.CG_BattleType();
        this.closeEventHandler(event);
    };
    ViewRunManBattleRes.prototype.update = function () {
        this.remainTime = 5000;
        this._dropReward = ConfigHelp.makeItemListArr(Model_RunMan.dropArr);
        var self = this;
        this.list.numItems = this._dropReward.length;
        this._dropFirst = Model_RunMan.dropFirst;
        this.gFirst.visible = this._dropFirst.length > 0;
        this.listFirst.numItems = this._dropFirst.length;
        if (Model_RunMan.dropHun) {
            this.hunGrid.vo = Model_RunMan.dropHun;
            this.hunGrid.visible = true;
            this.hunGrid.actiVis = false;
            this.gHun.visible = true;
        }
        else {
            this.hunGrid.visible = false;
            this.gHun.visible = false;
        }
        var ggzj = Config.ggzj_008[Model_RunMan.battleLayer];
        if (ggzj.next == 0) {
            this.btnClose.x = 256;
            this.isPass = true;
            this.btnClose.text = "退出(10)";
            this.btnContinue.visible = this.btnContinue.touchable = false;
        }
        else {
            this.btnClose.x = 162;
            this.isPass = false;
            this.btnClose.text = "退出";
            this.btnContinue.text = "继续(10)";
            this.btnContinue.visible = this.btnContinue.touchable = true;
        }
    };
    ViewRunManBattleRes.prototype.renderHander = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.vo = this._dropReward[index];
    };
    ViewRunManBattleRes.prototype.onframe = function (e) {
        var newt = this.remainTime - GGlobal.mapscene.dt;
        if (newt < 0) {
            newt = 0;
            if (this.isPass) {
                this.exitHandle();
            }
            else {
                this.continueHandle();
            }
        }
        this.remainTime = newt;
        this.udTimeView();
    };
    ViewRunManBattleRes.prototype.udTimeView = function () {
        var last = Math.floor(this.remainTime / 1000);
        if (this.isPass) {
            this.btnClose.text = "退出(" + last + ")";
        }
        else {
            this.btnContinue.text = "继续(" + last + ")";
        }
    };
    ViewRunManBattleRes.prototype.renderHanderFirst = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.vo = this._dropFirst[index];
    };
    ViewRunManBattleRes.URL = "ui://pkuzcu87em4dm";
    return ViewRunManBattleRes;
}(UIModalPanel));
__reflect(ViewRunManBattleRes.prototype, "ViewRunManBattleRes");
