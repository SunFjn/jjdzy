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
var ViewHomeTask = (function (_super) {
    __extends(ViewHomeTask, _super);
    function ViewHomeTask() {
        var _this = _super.call(this) || this;
        _this.setSkin("homeTask", "homeTask_atlas0", "ViewHomeTask");
        return _this;
    }
    ViewHomeTask.createInstance = function () {
        return (fairygui.UIPackage.createObject("homeTask", "ViewHomeTask"));
    };
    ViewHomeTask.prototype.setExtends = function () {
        var fac = fairygui.UIObjectFactory;
        fac.setPackageItemExtension(ChildHomeTarget.URL, ChildHomeTarget);
        fac.setPackageItemExtension(ChildHomeTask.URL, ChildHomeTask);
        fac.setPackageItemExtension(ItemHomeTarget.URL, ItemHomeTarget);
        fac.setPackageItemExtension(ItemHomeTask.URL, ItemHomeTask);
        fac.setPackageItemExtension(ItemHomeTaskBao.URL, ItemHomeTaskBao);
    };
    ViewHomeTask.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    ViewHomeTask.prototype.onShown = function () {
        var s = this;
        var m = GGlobal.model_HomeTask;
        s.registerEvent(true);
        s.c1.selectedIndex = 0;
        s.selChange();
    };
    ViewHomeTask.prototype.onHide = function () {
        var self = this;
        self.registerEvent(false);
        self.it0.hide();
        self.it1.hide();
    };
    /**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag
     */
    ViewHomeTask.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.reddot.register(pFlag, UIConst.HOME_TASK, self.setNotice, self);
        // GGlobal.model_HomeTask.register(pFlag, Model_HomeTask.OPEN_GOAL, self.upView, self);
        // GGlobal.model_HomeTask.register(pFlag, Model_HomeTask.OPEN_TASK, self.upView, self);
        EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.selChange, self);
    };
    ViewHomeTask.prototype.setNotice = function () {
        var s = this;
        var red = GGlobal.reddot;
        s.tab0.checkNotice = red.checkCondition(UIConst.HOME_TASK, 1);
        s.tab1.checkNotice = red.checkCondition(UIConst.HOME_TASK, 2);
    };
    ViewHomeTask.prototype.selChange = function () {
        var s = this;
        var m = GGlobal.model_HomeTask;
        if (s.c1.selectedIndex == 0) {
            s.it0.show();
            s.it1.hide();
        }
        else {
            s.it1.show();
            s.it0.hide();
        }
    };
    ViewHomeTask.URL = "ui://oy62ymetd8t60";
    return ViewHomeTask;
}(UIPanelBase));
__reflect(ViewHomeTask.prototype, "ViewHomeTask");
