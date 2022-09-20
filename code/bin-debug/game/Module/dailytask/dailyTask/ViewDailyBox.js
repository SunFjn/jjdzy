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
var ViewDailyBox = (function (_super) {
    __extends(ViewDailyBox, _super);
    function ViewDailyBox() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewDailyBox.createInstance = function () {
        return (fairygui.UIPackage.createObject("dailytask", "ViewDailyBox"));
    };
    ViewDailyBox.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("dailytask", "ViewDailyBox").asCom;
        this.contentPane = this.view;
        this.n6 = (this.view.getChild("n6"));
        this.n7 = (this.view.getChild("n7"));
        this.n8 = (this.view.getChild("n8"));
        this.frame = (this.view.getChild("frame"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewDailyBox.prototype.getAwards = function () {
        GGlobal.modeltask.CG_BX_1055(this._idx);
        this.doHideAnimation();
    };
    ViewDailyBox.prototype.updateView = function () {
        this._st = GGlobal.modeltask.boxData[this._idx];
        this.n6.visible = this._st == 1;
        this.n7.visible = this._st == 2;
        this.n8.visible = this._st == 0;
    };
    ViewDailyBox.prototype.onShown = function () {
        var awards = this._args.awards;
        this._idx = this._args.idx;
        awards = JSON.parse(awards);
        if (this.arr)
            ConfigHelp.cleanGridview(this.arr);
        awards = ConfigHelp.makeItemListArr(awards);
        this.arr = ConfigHelp.addGridview(awards, this, 100, 100);
        ConfigHelp.centerGrid(this.arr, 70, 110, 3, 130);
        this.n6.addClickListener(this.getAwards, this);
        GGlobal.control.listen(Enum_MsgType.MSG_TASK_UP, this.updateView, this);
        this.updateView();
    };
    ViewDailyBox.prototype.onHide = function () {
        if (this.arr)
            ConfigHelp.cleanGridview(this.arr);
        GGlobal.layerMgr.close(UIConst.DAILYTASKBOX);
        this.n6.removeClickListener(this.getAwards, this);
        GGlobal.control.remove(Enum_MsgType.MSG_TASK_UP, this.updateView, this);
    };
    ViewDailyBox.URL = "ui://b3p8szvvftjg1e";
    return ViewDailyBox;
}(UIModalPanel));
__reflect(ViewDailyBox.prototype, "ViewDailyBox");
