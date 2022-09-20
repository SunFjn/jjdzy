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
var ViewRongLianSuccess = (function (_super) {
    __extends(ViewRongLianSuccess, _super);
    function ViewRongLianSuccess() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewRongLianSuccess.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("rongLian", "ViewRongLianSuccess").asCom;
        this.contentPane = this.view;
        this.imgBack = (this.view.getChild("imgBack"));
        this.lbTitle = (this.view.getChild("lbTitle"));
        this.lb1 = (this.view.getChild("lb1"));
        this.lb2 = (this.view.getChild("lb2"));
        this.btnSure = (this.view.getChild("btnSure"));
        this.lb3 = (this.view.getChild("lb3"));
        this.lb4 = (this.view.getChild("lb4"));
        this.lb5 = (this.view.getChild("lb5"));
        this.lbTip = (this.view.getChild("lbTip"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewRongLianSuccess.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.btnSure.addClickListener(this.closeEventHandler, this);
        this.update(arg.exp, arg.coin, arg.item, arg.lianhun, arg.dan);
    };
    ViewRongLianSuccess.prototype.onHide = function () {
        this.btnSure.removeClickListener(this.closeEventHandler, this);
        GGlobal.layerMgr.close(UIConst.RONGLIAN_SUCCESS);
    };
    ViewRongLianSuccess.prototype.update = function (exp, coin, item, lianhun, dan) {
        this.lb1.text = "经验" + "[color=#18e748]+" + exp + "[color]";
        this.lb2.text = "铜钱" + "[color=#18e748]+" + coin + "[color]";
        this.lb3.text = "强化石" + "[color=#18e748]+" + item + "[color]";
        this.lb4.text = "炼魂石" + "[color=#18e748]+" + lianhun + "[color]";
        this.lb5.text = "星宿培养丹" + "[color=#18e748]+" + dan + "[color]";
        this.lbTip.visible = Model_RongLian.FULL_EXP;
    };
    return ViewRongLianSuccess;
}(UIModalPanel));
__reflect(ViewRongLianSuccess.prototype, "ViewRongLianSuccess");
