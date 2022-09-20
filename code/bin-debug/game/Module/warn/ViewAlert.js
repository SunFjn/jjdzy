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
var ViewAlert = (function (_super) {
    __extends(ViewAlert, _super);
    function ViewAlert() {
        var _this = _super.call(this) || this;
        _this._isClose = true; //true 未点确定取消进入关闭
        _this.childrenCreated();
        return _this;
    }
    ViewAlert.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewAlert"));
    };
    ViewAlert.prototype.childrenCreated = function () {
        this.view = GGlobal.commonpkg.createObject("ViewAlert").asCom;
        this.contentPane = this.view;
        this.back = (this.view.getChild("back"));
        this.lb = (this.view.getChild("lb"));
        this.lb.leading = 10;
        this.btnCancel = (this.view.getChild("btnCancel"));
        this.btnOk = (this.view.getChild("btnOk"));
        this.btnGroup = (this.view.getChild("btnGroup"));
        _super.prototype.childrenCreated.call(this);
        this.btnOk.addClickListener(this.onOKT, this);
        this.btnCancel.addClickListener(this.onCancelT, this);
    };
    ViewAlert.prototype.onShown = function () {
        var arg = this._args;
        if (!arg)
            return;
        this._isClose = true;
        this.isClosePanel = true;
        this.onOK = arg.onOK;
        this.onCancel = arg.onCancel;
        this.onCloseFun = arg.onClose;
        this.back.text = arg.title;
        this.btnOk.text = arg.oktext;
        this.btnCancel.text = arg.canceltext;
        if (arg.text)
            this.lb.text = arg.text;
        if (arg.option & 1) {
            // this.btnOk.setXY(199, 278);
            this.btnOk.x = this.width - this.btnOk.width >> 1;
            this.btnOk.visible = true;
        }
        else if (this.btnOk.parent) {
            this.btnOk.visible = false;
        }
        if (arg.option & 2) {
            // this.btnCancel.setXY(199, 278);
            this.btnCancel.x = this.width - this.btnCancel.width >> 1;
            this.btnCancel.visible = true;
        }
        else if (this.btnCancel.parent) {
            this.btnCancel.visible = false;
        }
        if (arg.option == 3) {
            // this.btnCancel.setXY(117, 278);
            // this.btnOk.setXY(283, 278);
            this.btnCancel.x = 117;
            this.btnOk.x = 283;
        }
    };
    ViewAlert.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.ALERT);
    };
    ViewAlert.prototype.closeHandler = function () {
        this.doHideAnimation();
        this.onOK = null;
        this.onCancel = null;
    };
    ViewAlert.prototype.onClose = function () {
        if (this._isClose && this.onCloseFun)
            this.onCloseFun.run();
        this.closeHandler();
    };
    ViewAlert.prototype.onOKT = function () {
        this._isClose = false;
        if (this.onOK)
            this.onOK.run();
        this.closeHandler();
    };
    ViewAlert.prototype.onCancelT = function () {
        this._isClose = false;
        if (this.onCancel)
            this.onCancel.run();
        this.closeHandler();
    };
    ViewAlert.prototype.closeEventHandler = function (evt) {
        this.closeHandler();
    };
    ViewAlert.show = function (text, onOK, option, oktext, canceltext, cancel, bgEnabled, onClose) {
        if (onOK === void 0) { onOK = null; }
        if (option === void 0) { option = 1 | 2; }
        if (oktext === void 0) { oktext = "确定"; }
        if (canceltext === void 0) { canceltext = "取消"; }
        if (cancel === void 0) { cancel = null; }
        if (bgEnabled === void 0) { bgEnabled = true; }
        if (onClose === void 0) { onClose = null; }
        var arg = { text: text, onOK: onOK, option: option, onCancel: cancel, oktext: oktext, canceltext: canceltext, bgEnabled: bgEnabled, onClose: onClose };
        if (!GGlobal.layerMgr.isOpenView(UIConst.ALERT)) {
            GGlobal.layerMgr.open(UIConst.ALERT, arg);
        }
    };
    ViewAlert.URL = "ui://jvxpx9emrt7o4l";
    ViewAlert.OK = 1;
    ViewAlert.CANCEL = 2;
    ViewAlert.OKANDCANCEL = 3;
    return ViewAlert;
}(UIModalPanel));
__reflect(ViewAlert.prototype, "ViewAlert");
