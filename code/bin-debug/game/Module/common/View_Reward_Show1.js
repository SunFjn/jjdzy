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
var View_Reward_Show1 = (function (_super) {
    __extends(View_Reward_Show1, _super);
    function View_Reward_Show1() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    View_Reward_Show1.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("bossTiShi");
        self.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show1").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        self.isShowOpenAnimation = false;
        _super.prototype.childrenCreated.call(this);
    };
    View_Reward_Show1.prototype.onShown = function () {
        var self = this;
        if (!self._args)
            return;
        self.rewardArr = self._args;
        self.list.numItems = self.rewardArr.length;
        self.times = 11;
        Timer.instance.listen(self.timeHandler, self, 1000);
        self.surebt.addClickListener(self.OnSure, self);
    };
    View_Reward_Show1.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        Timer.instance.remove(self.timeHandler, self);
        GGlobal.layerMgr.close(UIConst.REWARD_SHOW1);
    };
    View_Reward_Show1.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    View_Reward_Show1.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        grid.vo = this.rewardArr[index];
    };
    View_Reward_Show1.prototype.timeHandler = function () {
        var self = this;
        self.times--;
        self.surebt.text = "确定(" + self.times + ")";
        if (self.times <= 0) {
            self.doHideAnimation();
        }
    };
    View_Reward_Show1.URL = "ui://3me6ra11s37b6";
    return View_Reward_Show1;
}(UIModalPanel));
__reflect(View_Reward_Show1.prototype, "View_Reward_Show1");
