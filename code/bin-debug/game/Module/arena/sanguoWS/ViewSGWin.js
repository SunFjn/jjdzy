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
var ViewSGWin = (function (_super) {
    __extends(ViewSGWin, _super);
    function ViewSGWin() {
        var _this = _super.call(this) || this;
        _this.timer = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewSGWin.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewSGWin"));
    };
    ViewSGWin.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        var a = this;
        a.view = fairygui.UIPackage.createObject("Arena", "ViewSGWin").asCom;
        var b = a.contentPane = a.view;
        a.btnClose = (b.getChild("btnClose"));
        a.lbInfo = (b.getChild("lbInfo"));
        a.bg1 = (b.getChild("bg1"));
        a.head = (b.getChild("head"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewSGWin.prototype.onShown = function () {
        var s = this;
        s.timeremain = 5000;
        var idx = s._args;
        var v = GGlobal.modelsgws.raceMapping[idx];
        if (!v)
            return;
        s.head.setdata(v.head, null, null, null, false, v.headicn);
        s.lbInfo.text = Model_GuanXian.getJiangXianStr(v.jiangxian) + "\n" + v.name + "\n战力：" + v.power;
        s.updateBtnRemain();
        s.addEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
        s.btnClose.addClickListener(s.finish, s);
    };
    ViewSGWin.prototype.onHide = function () {
        var s = this;
        s.btnClose.removeClickListener(s.finish, s);
        s.removeEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
        GGlobal.layerMgr.close(UIConst.SGWS_WIN);
        GGlobal.layerMgr.open(UIConst.SANGUO_WUSHUANG);
    };
    ViewSGWin.prototype.onFrame = function (e) {
        var s = this;
        s.timer += GGlobal.mapscene.dt;
        s.timeremain -= GGlobal.mapscene.dt;
        if (s.timer >= 500) {
            s.updateBtnRemain();
            s.timer = 0;
        }
        if (s.timeremain <= 0) {
            s.timeremain = 0;
            s.removeEventListener(egret.Event.ENTER_FRAME, s.onFrame, s);
            s.finish();
        }
    };
    ViewSGWin.prototype.updateBtnRemain = function () {
        var s = this;
        s.btnClose.text = "退出" + "(" + Math.ceil(s.timeremain / 1000) + ")";
    };
    ViewSGWin.prototype.finish = function () {
        GGlobal.layerMgr.close2(UIConst.SGWS_WIN);
    };
    ViewSGWin.URL = "ui://me1skowl608a12";
    return ViewSGWin;
}(UIModalPanel));
__reflect(ViewSGWin.prototype, "ViewSGWin");
