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
var ViewCrossWarsReward = (function (_super) {
    __extends(ViewCrossWarsReward, _super);
    function ViewCrossWarsReward() {
        var _this = _super.call(this) || this;
        _this.loadRes();
        return _this;
    }
    ViewCrossWarsReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewCrossWarsReward"));
    };
    ViewCrossWarsReward.prototype.childrenCreated = function () {
        GGlobal.createPack("Arena");
        var self = this;
        self.view = fairygui.UIPackage.createObject("Arena", "ViewCrossWarsReward").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
        self.list.itemRenderer = self.renderListItem;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
    };
    ViewCrossWarsReward.prototype.resetPosition = function () {
        var self = this;
        self.setXY((fairygui.GRoot.inst.width - self.width) >> 1, (fairygui.GRoot.inst.height - self.height) >> 1);
    };
    ViewCrossWarsReward.prototype.onShown = function () {
        var self = this;
        self.addListen();
        self.update();
    };
    ViewCrossWarsReward.prototype.onHide = function () {
        this.removeListen();
        this.list.numItems = 0;
    };
    ViewCrossWarsReward.prototype.addListen = function () {
        var self = this;
        GGlobal.control.listen(Enum_MsgType.CROSSKING_RANK_ARR, self.update, self);
    };
    ViewCrossWarsReward.prototype.removeListen = function () {
        var self = this;
        GGlobal.control.remove(Enum_MsgType.CROSSKING_RANK_ARR, self.update, self);
        GGlobal.layerMgr.close(UIConst.CROSS_WARS_REWARD);
    };
    ViewCrossWarsReward.prototype.update = function () {
        var self = this;
        if (Model_CrossKing.zsLevel > 0) {
            self._listData = Model_CrossWars.getRewardArr(Model_CrossKing.zsLevel);
        }
        else {
            self._listData = Model_CrossWars.getRewardArr(1);
        }
        self.list.numItems = self._listData.length;
    };
    ViewCrossWarsReward.prototype.renderListItem = function (index, obj) {
        var self = this;
        var item = obj;
        item.vo = self._listData[index];
    };
    ViewCrossWarsReward.URL = "ui://yqpfulef6wztk";
    return ViewCrossWarsReward;
}(UIModalPanel));
__reflect(ViewCrossWarsReward.prototype, "ViewCrossWarsReward");
