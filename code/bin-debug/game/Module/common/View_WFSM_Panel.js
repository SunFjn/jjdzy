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
var View_WFSM_Panel = (function (_super) {
    __extends(View_WFSM_Panel, _super);
    function View_WFSM_Panel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_WFSM_Panel.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "View_WFSM_Panel"));
    };
    View_WFSM_Panel.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "View_WFSM_Panel").asCom;
        this.contentPane = this.view;
        var t = this;
        CommonManager.parseChildren(t.view, t);
        this.list.itemRenderer = this.renderHander;
        this.list.callbackThisObj = this;
        _super.prototype.childrenCreated.call(this);
    };
    View_WFSM_Panel.prototype.onShown = function () {
        var t = this;
        var t_arg = t._args;
        t._vo = null;
        if (typeof t_arg === "number") {
            t.frame.title = "玩法说明";
            this.show(t_arg);
        }
        else {
            if ("title" in t_arg) {
                t.frame.title = t_arg.title;
            }
            if ("content" in t_arg) {
                t._vo = { id: 0, tips: t_arg.content };
                t.list.numItems = 1;
                t.list.scrollToView(0);
            }
        }
    };
    View_WFSM_Panel.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.WFSM_PANEL);
    };
    View_WFSM_Panel.prototype.show = function (obj) {
        this._vo = Config.wfsm_200[obj];
        this.list.numItems = 1;
        this.list.scrollToView(0);
    };
    View_WFSM_Panel.prototype.renderHander = function (index, obj) {
        var t = this;
        if (t._vo)
            obj.vo = this._vo.tips;
    };
    View_WFSM_Panel.URL = "ui://jvxpx9emah3c3ap";
    return View_WFSM_Panel;
}(UIModalPanel));
__reflect(View_WFSM_Panel.prototype, "View_WFSM_Panel");
