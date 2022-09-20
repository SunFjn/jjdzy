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
var ChildHomeTarget = (function (_super) {
    __extends(ChildHomeTarget, _super);
    function ChildHomeTarget() {
        var _this = _super.call(this) || this;
        _this._selTab = 0;
        return _this;
    }
    ChildHomeTarget.createInstance = function () {
        return (fairygui.UIPackage.createObject("homeTask", "ChildHomeTarget"));
    };
    ChildHomeTarget.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderLis;
        s.list.setVirtual();
        s.tabList.callbackThisObj = s;
        s.tabList.itemRenderer = s.renderTab;
        s.tabList.setVirtual();
    };
    ChildHomeTarget.prototype.show = function () {
        var s = this;
        var m = GGlobal.model_HomeTask;
        s.registerEvent(true);
        m.CG_OPEN_GOAL_11413();
        // s.upView();
    };
    ChildHomeTarget.prototype.hide = function () {
        var s = this;
        s.registerEvent(false);
        s.list.numItems = 0;
        s.tabList.numItems = 0;
    };
    /**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag
     */
    ChildHomeTarget.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.model_HomeTask.register(pFlag, Model_HomeTask.OPEN_GOAL, self.upView, self);
        GGlobal.model_HomeTask.register(pFlag, Model_HomeTask.UP_GOAL, self.upGold, self);
        EventUtil.register(pFlag, self.tabList, fairygui.ItemEvent.CLICK, self.tabHandle, self);
    };
    ChildHomeTarget.prototype.upView = function () {
        var s = this;
        var m = GGlobal.model_HomeTask;
        s._tabArr = m.datGoal;
        s.tabList.numItems = s._tabArr.length;
        //选中可升级
        s._selTab = -1;
        for (var i = 0; i < s._tabArr.length; i++) {
            var arr = s._tabArr[i];
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].state == 1) {
                    s._selTab = i;
                    break;
                }
            }
            if (s._selTab != -1) {
                break;
            }
        }
        if (s._selTab == -1) {
            s._selTab = 0;
        }
        s._selArr = s._tabArr[s._selTab];
        s.tabList.scrollToView(s._selTab);
        s.tabList.selectedIndex = s._selTab;
        s.upSelView();
    };
    ChildHomeTarget.prototype.upGold = function () {
        var s = this;
        var m = GGlobal.model_HomeTask;
        s._tabArr = m.datGoal;
        s.tabList.numItems = s._tabArr.length;
        s.upSelView();
    };
    ChildHomeTarget.prototype.renderLis = function (idx, obj) {
        obj.vo = this._selArr[idx];
    };
    ChildHomeTarget.prototype.renderTab = function (idx, tab) {
        var self = this;
        var arr = self._tabArr[idx];
        tab.data = arr;
        var fenlei = arr[0].lib.fenlei;
        tab.icon = CommonManager.getUrl("homeTask", fenlei);
        var red = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].state == 1) {
                red = true;
                break;
            }
        }
        tab.checkNotice = red;
    };
    ChildHomeTarget.prototype.tabHandle = function (event) {
        var item = event.itemObject;
        var s = this;
        s._selArr = item.data;
        s.upSelView();
    };
    ChildHomeTarget.prototype.upSelView = function () {
        var m = GGlobal.model_HomeTask;
        var s = this;
        s.list.numItems = s._selArr ? s._selArr.length : 0;
        s.list.scrollToView(0);
        s.list.selectedIndex = 0;
    };
    ChildHomeTarget.URL = "ui://oy62ymetd8t64";
    return ChildHomeTarget;
}(fairygui.GComponent));
__reflect(ChildHomeTarget.prototype, "ChildHomeTarget");
