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
var ViewTrueNameAlert = (function (_super) {
    __extends(ViewTrueNameAlert, _super);
    function ViewTrueNameAlert() {
        var _this = _super.call(this) || this;
        _this._t = 60;
        _this.loadRes("trueName", "trueName_atlas0");
        return _this;
    }
    ViewTrueNameAlert.createInstance = function () {
        return (fairygui.UIPackage.createObject("trueName", "ViewTrueNameAlert"));
    };
    ViewTrueNameAlert.prototype.childrenCreated = function () {
        GGlobal.createPack("trueName");
        this.view = fairygui.UIPackage.createObject("trueName", "ViewTrueNameAlert").asCom;
        this.contentPane = this.view;
        this.lb = (this.view.getChild("lb"));
        this.lb1 = (this.view.getChild("lb1"));
        this.btnCancel = (this.view.getChild("btnCancel"));
        this.btnOk = (this.view.getChild("btnOk"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewTrueNameAlert.prototype.onShown = function () {
        var s = this;
        var t = Number(s._args);
        if (t < 3) {
            s.lb.text = "您已累计在线" + t + "小时，请合理安排游戏时间";
        }
        else if (t < 5) {
            s.lb.text = "您已累计在线" + t + "小时，您已进入疲劳游戏时间，游戏收益变为正常的50%，请您下线休息。";
        }
        else {
            s.lb.text = "您已累计在线" + t + "小时，您已进入不健康游戏时间，游戏经验收益变为0，请下线休息。";
        }
        s.btnOk.addClickListener(s.onSure, s);
        s.btnCancel.addClickListener(s.onCancel, s);
        s._t = 60;
        Timer.instance.listen(s.onTimer, s, 1000);
        s.onTimer();
        if (Model_TrueName.isIdentity) {
            s.lb1.text = "您是否需要进行身份证信息认证";
        }
        else {
            s.lb1.text = "您是否需要重新进行身份证信息认证";
        }
    };
    ViewTrueNameAlert.prototype.onHide = function () {
        var s = this;
        GGlobal.layerMgr.close(UIConst.TRUE_NAME_ALERT);
        s.btnOk.removeClickListener(s.onSure, s);
        s.btnCancel.removeClickListener(s.onCancel, s);
        Timer.instance.remove(s.onTimer, s);
    };
    ViewTrueNameAlert.prototype.onSure = function () {
        GGlobal.layerMgr.open(UIConst.TRUE_NAME);
        this.closeEventHandler(null);
    };
    ViewTrueNameAlert.prototype.onCancel = function () {
        this.closeEventHandler(null);
    };
    ViewTrueNameAlert.prototype.onTimer = function () {
        var s = this;
        s._t--;
        s.btnCancel.text = "稍后认证(" + s._t + ")";
        if (s._t < 0) {
            this.closeEventHandler(null);
        }
    };
    ViewTrueNameAlert.URL = "ui://girq9ndul5k53";
    return ViewTrueNameAlert;
}(UIModalPanel));
__reflect(ViewTrueNameAlert.prototype, "ViewTrueNameAlert");
