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
var ViewHomeLog = (function (_super) {
    __extends(ViewHomeLog, _super);
    function ViewHomeLog() {
        var _this = _super.call(this) || this;
        _this.itemRender = function (idx, obj) {
            obj.setdata(idx);
        };
        _this.update = function () {
            var self = _this;
            self.list.numItems = GGlobal.homemodel.logdata.length;
        };
        _this.childrenCreated();
        return _this;
    }
    ViewHomeLog.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ViewHomeLog"));
    };
    ViewHomeLog.prototype.childrenCreated = function () {
        var self = this;
        self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewHomeLog").asCom;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
    };
    ViewHomeLog.prototype.onShown = function () {
        var self = this;
        var type = Number(self._args);
        self.frame.text = ["", "金库记录", "天工炉记录"][type];
        GGlobal.homemodel.CG_House_log_11133(type);
        self.update();
        GGlobal.control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
    };
    ViewHomeLog.prototype.onHide = function () {
        var self = this;
        GGlobal.control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        GGlobal.layerMgr.close(UIConst.HOME_LOG_UI);
    };
    ViewHomeLog.URL = "ui://y0plc878g2m4h";
    return ViewHomeLog;
}(UIModalPanel));
__reflect(ViewHomeLog.prototype, "ViewHomeLog");
