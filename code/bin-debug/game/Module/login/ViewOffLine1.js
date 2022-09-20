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
var ViewOffLine1 = (function (_super) {
    __extends(ViewOffLine1, _super);
    function ViewOffLine1() {
        var _this = _super.call(this) || this;
        _this.type = 0;
        _this.hasHand = false;
        _this.childrenCreated();
        return _this;
    }
    ViewOffLine1.prototype.childrenCreated = function () {
        var s = this;
        s.isClosePanel = false;
        s.view = fairygui.UIPackage.createObject("common", "ViewOffLine1").asCom;
        s.contentPane = s.view;
        s.contentLb = (s.view.getChild("n3"));
        s.sureBt = (s.view.getChild("sureBt"));
        s.sureBt.addClickListener(s.onHand, s);
        _super.prototype.childrenCreated.call(this);
        if (s.closeButton) {
            s.closeButton.visible = false;
        }
    };
    ViewOffLine1.prototype.onHand = function () {
        this.doHideAnimation();
    };
    ViewOffLine1.prototype.onHide = function () {
        if (this.type == 0) {
            GGlobal.modelLogin.reLogin();
        }
        else {
            GGlobal.modelLogin.exiteGame();
        }
        HLSDK.logout();
        GGlobal.layerMgr.close(UIConst.OFFLINE1);
    };
    ViewOffLine1.prototype.onShown = function () {
        this.contentLb.text = this._args.content;
        this.type = this._args.type;
    };
    ViewOffLine1.show = function (content, type) {
        if (type === void 0) { type = 0; }
        if (!GGlobal.layerMgr.isOpenView(UIConst.OFFLINE1)) {
            GGlobal.layerMgr.open(UIConst.OFFLINE1, { content: content, type: type });
        }
    };
    ViewOffLine1.URL = "ui://jvxpx9emhbxz3df";
    return ViewOffLine1;
}(UIModalPanel));
__reflect(ViewOffLine1.prototype, "ViewOffLine1");
