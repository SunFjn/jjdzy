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
var View_YanHui_Tournament = (function (_super) {
    __extends(View_YanHui_Tournament, _super);
    function View_YanHui_Tournament() {
        var _this = _super.call(this) || this;
        _this.cfgArr = [];
        _this.childrenCreated();
        return _this;
    }
    View_YanHui_Tournament.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "View_YanHui_Tournament"));
    };
    View_YanHui_Tournament.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_Tournament").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.itemArr = [self.item0, self.item1, self.item2];
        _super.prototype.childrenCreated.call(this);
    };
    View_YanHui_Tournament.prototype.updateShow = function () {
        var self = this;
        if (!self.cfgArr.length) {
            for (var key in Config.partyboss_298) {
                self.cfgArr.push(Config.partyboss_298[key]);
            }
            self.cfgArr.sort(function (a, b) {
                return a.fw - b.fw;
            });
        }
        for (var i = 0; i < self.itemArr.length; i++) {
            self.itemArr[i].setVo(self.cfgArr[i]);
        }
    };
    View_YanHui_Tournament.prototype.onShown = function () {
        var self = this;
        self.updateShow();
        GGlobal.control.listen(UIConst.YANHUI_BATTLE, self.updateShow, self);
    };
    View_YanHui_Tournament.prototype.onHide = function () {
        var self = this;
        GGlobal.control.remove(UIConst.YANHUI_BATTLE, self.updateShow, self);
    };
    View_YanHui_Tournament.URL = "ui://4x7dk3lhgz25l";
    return View_YanHui_Tournament;
}(UIModalPanel));
__reflect(View_YanHui_Tournament.prototype, "View_YanHui_Tournament");
