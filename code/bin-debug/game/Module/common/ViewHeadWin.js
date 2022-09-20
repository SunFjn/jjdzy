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
var ViewHeadWin = (function (_super) {
    __extends(ViewHeadWin, _super);
    function ViewHeadWin() {
        var _this = _super.call(this) || this;
        _this.timer = 0;
        _this.systemID = 0;
        _this.loadRes();
        return _this;
    }
    ViewHeadWin.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewHeadWin"));
    };
    ViewHeadWin.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "ViewHeadWin").asCom;
        this.contentPane = this.view;
        this.bg1 = (this.view.getChild("bg1"));
        this.n16 = (this.view.getChild("n16"));
        this.btnClose = (this.view.getChild("btnClose"));
        this.n2 = (this.view.getChild("n2"));
        this.lbInfo = (this.view.getChild("lbInfo"));
        this.head = (this.view.getChild("head"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewHeadWin.prototype.updateBtnRemain = function () {
        this.btnClose.text = "确定" + "(" + Math.ceil(this.timeremain / 1000) + ")";
    };
    ViewHeadWin.prototype.finish = function () {
        switch (this.systemID) {
            case UIConst.CROSS_MINERAL:
            case UIConst.SHAOZHU_ESCORT:
                GGlobal.layerMgr.close2(UIConst.COMMON_HEAD_WIN);
                GGlobal.modelScene.returnMainScene();
                break;
        }
    };
    ViewHeadWin.prototype.onFrame = function (e) {
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
    ViewHeadWin.prototype.onShown = function () {
        var s = this;
        var data = s._args;
        s.timeremain = 5000;
        s.systemID = data.systemID;
        s.head.setdata(data.head, null, null, null, false);
        s.lbInfo.text = Model_GuanXian.getJiangXianStr(data.jiangxian) + "\n" + data.name + "\n战力：" + data.power;
        s.addEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
        s.btnClose.addClickListener(s.finish, s);
    };
    ViewHeadWin.prototype.onHide = function () {
        var s = this;
        s.btnClose.removeClickListener(s.finish, s);
        GGlobal.layerMgr.close(UIConst.COMMON_HEAD_WIN);
        s.removeEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
    };
    ViewHeadWin.URL = "ui://jvxpx9emvpg63fy";
    return ViewHeadWin;
}(UIModalPanel));
__reflect(ViewHeadWin.prototype, "ViewHeadWin");
