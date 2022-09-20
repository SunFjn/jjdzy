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
var ViewCrossKingProSuc = (function (_super) {
    __extends(ViewCrossKingProSuc, _super);
    function ViewCrossKingProSuc() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewCrossKingProSuc.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewCrossKingProSuc"));
    };
    ViewCrossKingProSuc.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewCrossKingProSuc").asCom;
        this.contentPane = this.view;
        this.lbTitle = (this.view.getChild("lbTitle"));
        this.lbGrade = (this.view.getChild("lbGrade"));
        this.img = (this.view.getChild("img"));
        this.imgGrade = (this.view.getChild("imgGrade"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewCrossKingProSuc.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    ViewCrossKingProSuc.prototype.onShown = function () {
        // this.addListen();
        this.update();
        Timer.instance.callLater(this.addListen, 500, this);
    };
    ViewCrossKingProSuc.prototype.onHide = function () {
        this.removeListen();
    };
    ViewCrossKingProSuc.prototype.addListen = function () {
        GGlobal.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.closeEventHandler, this);
    };
    ViewCrossKingProSuc.prototype.removeListen = function () {
        Timer.instance.remove(this.addListen, this);
        GGlobal.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.closeEventHandler, this);
        GGlobal.layerMgr.close(UIConst.CROSS_KING_ProSuc);
    };
    ViewCrossKingProSuc.prototype.update = function () {
        var gradeCfg = Config.lsxx_232[Model_CrossKing.battleGrade + 1];
        if (gradeCfg.dan == 13) {
            this.img.visible = true;
            this.lbGrade.text = "";
        }
        else {
            this.img.visible = false;
            this.lbGrade.text = gradeCfg.name;
            this.lbGrade.color = Color.getColorInt(gradeCfg.color);
        }
        this.imgGrade.url = fairygui.UIPackage.getItemURL("Arena", "g" + Math.ceil(gradeCfg.dan / 3));
    };
    ViewCrossKingProSuc.URL = "ui://yqpfulefj9wf4";
    return ViewCrossKingProSuc;
}(UIModalPanel));
__reflect(ViewCrossKingProSuc.prototype, "ViewCrossKingProSuc");
