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
var View_YanHui_FWReward = (function (_super) {
    __extends(View_YanHui_FWReward, _super);
    function View_YanHui_FWReward() {
        var _this = _super.call(this) || this;
        _this.selectIndex = 0;
        _this.childrenCreated();
        return _this;
    }
    View_YanHui_FWReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "View_YanHui_FWReward"));
    };
    View_YanHui_FWReward.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_FWReward").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        _super.prototype.childrenCreated.call(this);
    };
    View_YanHui_FWReward.prototype.renderHandler = function (index, item) {
        var self = this;
        item.setVo(self.listArr[index], self.selectIndex == index);
    };
    View_YanHui_FWReward.prototype.onShown = function () {
        var self = this;
        self.listArr = self._args;
        self.selectIndex = -1;
        for (var i = self.listArr.length - 1; i >= 0; i--) {
            if (GGlobal.modelYanHui.fwNum >= self.listArr[i].fw) {
                self.selectIndex = i;
                break;
            }
        }
        self.list.numItems = self.listArr.length;
        self.list.scrollToView(self.selectIndex, false, true);
    };
    View_YanHui_FWReward.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
    };
    View_YanHui_FWReward.URL = "ui://4x7dk3lhgz25o";
    return View_YanHui_FWReward;
}(UIModalPanel));
__reflect(View_YanHui_FWReward.prototype, "View_YanHui_FWReward");
