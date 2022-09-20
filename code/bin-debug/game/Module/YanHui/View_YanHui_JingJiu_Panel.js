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
var View_YanHui_JingJiu_Panel = (function (_super) {
    __extends(View_YanHui_JingJiu_Panel, _super);
    function View_YanHui_JingJiu_Panel() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        _this.childrenCreated();
        return _this;
    }
    View_YanHui_JingJiu_Panel.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "View_YanHui_JingJiu_Panel"));
    };
    View_YanHui_JingJiu_Panel.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_JingJiu_Panel").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        self.itemArr = [self.item0, self.item1, self.item2];
        _super.prototype.childrenCreated.call(this);
    };
    View_YanHui_JingJiu_Panel.prototype.renderHandler = function (index, item) {
        item.setVo(GGlobal.modelYanHui.jingJiuRewardData[index]);
    };
    View_YanHui_JingJiu_Panel.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelYanHui;
        self.tab1.checkNotice = GGlobal.reddot.checkCondition(UIConst.YANHUI);
        if (self.c1.selectedIndex == 0) {
            for (var i = 0; i < self.itemArr.length; i++) {
                self.itemArr[i].setVo(Config.party9_298[i + 1]);
            }
        }
        else {
            model.jingJiuRewardData.sort(function (a, b) {
                if (a.state == b.state) {
                    return a.id - b.id;
                }
                else {
                    return a.state - b.state;
                }
            });
            self.list.numItems = model.jingJiuRewardData.length;
        }
    };
    View_YanHui_JingJiu_Panel.prototype.onShown = function () {
        var self = this;
        self.c1.selectedIndex = 0;
        self.updateShow();
        IconUtil.setImg(self.backImg, Enum_Path.YANHUI_URL + "jingjiu.jpg");
        self.register(true);
    };
    View_YanHui_JingJiu_Panel.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        self.register(false);
        IconUtil.setImg(self.backImg, null);
    };
    View_YanHui_JingJiu_Panel.prototype.register = function (pFlag) {
        var self = this;
        GGlobal.reddot.register(pFlag, UIConst.YANHUI, self.updateShow, self);
        EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.updateShow, self);
    };
    View_YanHui_JingJiu_Panel.URL = "ui://4x7dk3lhgz25r";
    return View_YanHui_JingJiu_Panel;
}(UIModalPanel));
__reflect(View_YanHui_JingJiu_Panel.prototype, "View_YanHui_JingJiu_Panel");
