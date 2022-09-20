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
var ViewSYZLBRelive = (function (_super) {
    __extends(ViewSYZLBRelive, _super);
    function ViewSYZLBRelive() {
        var _this = _super.call(this) || this;
        _this._clickOk = false;
        _this.remainTime = 0;
        _this.isClosePanel = false;
        _this.childrenCreated();
        return _this;
    }
    ViewSYZLBRelive.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ViewSYZLBRelive"));
    };
    ViewSYZLBRelive.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("syzlb", "ViewSYZLBRelive").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
    };
    ViewSYZLBRelive.prototype.onShown = function () {
        var s = this;
        var ct = s._args;
        var cost = JSON.parse(ConfigHelp.getSystemDesc(7503))[0][2];
        s.lb.text = "是否消耗" + HtmlUtil.fontNoSize(cost + "元宝", Color.GREENSTR) + "复活队伍\n剩余复活次数：" + ct;
        s.btnOk.addClickListener(s.onOKT, s);
        s.btnCancel.addClickListener(s.onCancelT, s);
        s.remainTime = 11;
        Timer.instance.listen(s.onTimer, s, 1000);
        s.onTimer();
        s._clickOk = false;
        GGlobal.model_Syzlb.listen(Model_Syzlb.msg_relive, s.relive, s);
    };
    ViewSYZLBRelive.prototype.relive = function () {
        var s = this;
        s._clickOk = true;
        this.closeEventHandler(null);
    };
    ViewSYZLBRelive.prototype.onHide = function () {
        var s = this;
        s.btnOk.removeClickListener(s.onOKT, s);
        s.btnCancel.removeClickListener(s.onCancelT, s);
        Timer.instance.remove(s.onTimer, s);
        GGlobal.model_Syzlb.remove(Model_Syzlb.msg_relive, s.relive, s);
        if (!s._clickOk) {
            var m = GGlobal.model_Syzlb;
            ViewBattleFault.show(5000, m, "退出", null, m.endBattle);
        }
    };
    ViewSYZLBRelive.prototype.resetPosition = function () {
        _super.prototype.resetPosition.call(this);
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
    };
    ViewSYZLBRelive.prototype.onOKT = function () {
        var s = this;
        var cost = JSON.parse(ConfigHelp.getSystemDesc(7503))[0][2];
        if (Model_player.voMine.yuanbao < cost) {
            ViewCommonWarn.text("元宝不足");
            return;
        }
        s._clickOk = true;
        GGlobal.model_Syzlb.CG_RELIVE();
        this.closeEventHandler(null);
    };
    ViewSYZLBRelive.prototype.onCancelT = function () {
        this.closeEventHandler(null);
    };
    ViewSYZLBRelive.prototype.onTimer = function () {
        var s = this;
        s.remainTime--;
        if (s.remainTime < 0) {
            s.remainTime = 0;
            Timer.instance.remove(s.onTimer, s);
            this.onCancelT();
        }
        this.btnCancel.text = "退出(" + s.remainTime + ")";
    };
    ViewSYZLBRelive.URL = "ui://3o8q23uuqqnwg";
    return ViewSYZLBRelive;
}(UIModalPanel));
__reflect(ViewSYZLBRelive.prototype, "ViewSYZLBRelive");
