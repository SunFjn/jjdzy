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
var ViewRunManMopping = (function (_super) {
    __extends(ViewRunManMopping, _super);
    function ViewRunManMopping() {
        var _this = _super.call(this) || this;
        _this.remainTime = 10000;
        _this.childrenCreated();
        return _this;
    }
    ViewRunManMopping.createInstance = function () {
        return (fairygui.UIPackage.createObject("FuBen", "ViewRunManMopping"));
    };
    ViewRunManMopping.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("FuBen", "ViewRunManMopping").asCom;
        this.contentPane = this.view;
        this.lbTitle = (this.view.getChild("lbTitle"));
        this.list = (this.view.getChild("list"));
        // this.lbType = <fairygui.GRichTextField><any>(this.view.getChild("lbType"));
        this.lbLayer = (this.view.getChild("lbLayer"));
        this.lbAward = (this.view.getChild("lbAward"));
        this.btnSure = (this.view.getChild("btnSure"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewRunManMopping.prototype.onShown = function () {
        this.addListen();
    };
    ViewRunManMopping.prototype.onHide = function () {
        this.removeListen();
        GGlobal.layerMgr.close(UIConst.FUBEN_RUNMAN_MOP);
        this.list.numItems = 0;
    };
    ViewRunManMopping.prototype.addListen = function () {
        this.btnSure.addClickListener(this.closeEventHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
    };
    ViewRunManMopping.prototype.removeListen = function () {
        this.btnSure.removeClickListener(this.closeEventHandler, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
    };
    ViewRunManMopping.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.update(arg.arr, arg.info);
    };
    ViewRunManMopping.prototype.update = function (arr, info) {
        this.resetPosition();
        this.remainTime = 10000;
        this._dropReward = arr;
        this.list.numItems = this._dropReward.length;
        // this.lbType.text = Model_RunMan.getTypeName(info.type);
        var curLayer = 1;
        if (info.layerId > 0) {
            curLayer = Config.ggzj_008[info.layerId].guan;
        }
        var maxLayer = 1;
        if (info.layerMaxId > 0) {
            maxLayer = Config.ggzj_008[info.layerMaxId].guan;
        }
        this.lbLayer.text = "扫荡关数：" + curLayer + "-" + maxLayer + "关";
    };
    ViewRunManMopping.prototype.renderHandle = function (index, obj) {
        var item = obj;
        var v = this._dropReward[index];
        item.vo = v;
    };
    ViewRunManMopping.prototype.onframe = function (e) {
        var newt = this.remainTime - GGlobal.mapscene.dt;
        if (newt < 0) {
            newt = 0;
            this.closeEventHandler(null);
        }
        this.remainTime = newt;
        this.udTimeView();
    };
    ViewRunManMopping.prototype.udTimeView = function () {
        var last = Math.floor(this.remainTime / 1000);
        this.btnSure.text = "确定（" + last + "）";
    };
    ViewRunManMopping.URL = "ui://pkuzcu87em4dn";
    return ViewRunManMopping;
}(UIModalPanel));
__reflect(ViewRunManMopping.prototype, "ViewRunManMopping");
