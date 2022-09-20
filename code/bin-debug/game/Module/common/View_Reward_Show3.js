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
var View_Reward_Show3 = (function (_super) {
    __extends(View_Reward_Show3, _super);
    function View_Reward_Show3() {
        var _this = _super.call(this) || this;
        _this._base = 0;
        _this.state = 0;
        _this.childrenCreated();
        return _this;
    }
    View_Reward_Show3.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "View_Reward_Show3").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    View_Reward_Show3.prototype.onShown = function () {
        var self = this;
        self._listData = self._args.award || [];
        self._base = self._args.base;
        self.state = self._args.state;
        self.onDraw = self._args.onDraw;
        self.btnGet.addClickListener(self.onGet, this);
        self.update();
    };
    View_Reward_Show3.prototype.onHide = function () {
        var self = this;
        self.btnGet.removeClickListener(self.onGet, self);
        self.list.numItems = 0;
    };
    View_Reward_Show3.prototype.update = function () {
        var self = this;
        self.list.numItems = self._listData.length;
        self.upStatus();
    };
    View_Reward_Show3.prototype.upStatus = function () {
        var self = this;
        if (self._base > 0) {
            self.imgHas.visible = false;
            self.btnGet.visible = true;
            self.btnGet.checkNotice = true;
        }
        else if (self._base <= 0 && self.state == 0) {
            self.imgHas.visible = false;
            self.btnGet.visible = true;
            self.btnGet.checkNotice = false;
        }
        else if (self._base <= 0 && self.state == -1) {
            self.imgHas.visible = true;
            self.btnGet.visible = false;
        }
        else {
            self.imgHas.visible = false;
            self.btnGet.visible = true;
            self.btnGet.checkNotice = false;
        }
    };
    View_Reward_Show3.prototype.renderHandle = function (index, grid) {
        var self = this;
        grid.tipEnabled = true;
        grid.isShowEff = true;
        grid.vo = self._listData[index];
    };
    View_Reward_Show3.prototype.onGet = function () {
        var self = this;
        if (self.btnGet.checkNotice == false) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        if (self.onDraw) {
            self.onDraw.run();
        }
        else {
            self.doHideAnimation();
        }
    };
    View_Reward_Show3.show = function (rewardArr, drawNum, state, onDraw) {
        if (GGlobal.layerMgr.isOpenView(UIConst.REWARD_SHOW3)) {
            var view = GGlobal.layerMgr.getView(UIConst.REWARD_SHOW3);
            view._args = { award: rewardArr, base: drawNum, state: state, onDraw: onDraw };
            view.onShown();
        }
        else {
            GGlobal.layerMgr.open(UIConst.REWARD_SHOW3, { award: rewardArr, base: drawNum, state: state, onDraw: onDraw });
        }
    };
    return View_Reward_Show3;
}(UIModalPanel));
__reflect(View_Reward_Show3.prototype, "View_Reward_Show3");
