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
/**
 * 对对联奖励展示面板
 */
var DDLRewardView = (function (_super) {
    __extends(DDLRewardView, _super);
    function DDLRewardView() {
        var _this = _super.call(this) || this;
        _this._status = 0;
        _this.childrenCreated();
        return _this;
    }
    DDLRewardView.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActCom_DDL", "DDLRewardView").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    DDLRewardView.prototype.onShown = function () {
        var self = this;
        self.addListen();
        self._cfg = self._args.cfg;
        self.updateView();
    };
    DDLRewardView.prototype.onHide = function () {
        this.removeListen();
        this.list.numItems = 0;
        GGlobal.layerMgr.close(UIConst.DDL_REWARD);
    };
    DDLRewardView.prototype.addListen = function () {
        var self = this;
        GGlobal.control.listen(UIConst.ACTCOM_DDL, self.updateView, self);
        self.btnGet.addClickListener(self.onGetAward, self);
    };
    DDLRewardView.prototype.removeListen = function () {
        var self = this;
        GGlobal.control.remove(UIConst.ACTCOM_DDL, self.updateView, self);
        self.btnGet.removeClickListener(self.onGetAward, self);
    };
    /**
     * 更新界面数据
     */
    DDLRewardView.prototype.updateView = function () {
        var self = this;
        self._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(self._cfg.reward));
        self.list.numItems = self._listData.length;
        var model = GGlobal.model_DDL;
        var len = model.rewardArr.length;
        for (var i = 0; i < len; i++) {
            var vo = model.rewardArr[i];
            if (vo.id == self._cfg.id) {
                self._status = vo.status;
            }
        }
        self.c1.selectedIndex = self._status == 2 ? 1 : 0;
    };
    DDLRewardView.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._listData[index];
    };
    DDLRewardView.prototype.onGetAward = function (e) {
        var self = this;
        var btn = e.currentTarget;
        if (self._status == 2)
            return;
        GGlobal.model_DDL.CG_GET_TARGETAWARD(self._cfg.id);
    };
    DDLRewardView.URL = "ui://ke8qv0ckqq0ga";
    return DDLRewardView;
}(UIModalPanel));
__reflect(DDLRewardView.prototype, "DDLRewardView");
