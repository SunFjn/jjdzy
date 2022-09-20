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
 * 桃园结义申请界面
 */
var TYJY_ApplyView = (function (_super) {
    __extends(TYJY_ApplyView, _super);
    function TYJY_ApplyView() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    TYJY_ApplyView.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_ApplyView").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.itemRender;
        _super.prototype.childrenCreated.call(this);
    };
    TYJY_ApplyView.prototype.onShown = function () {
        var self = this;
        GGlobal.model_TYJY.CG_GET_APPLYMEMBER();
        GGlobal.control.listen(UIConst.TYJY_APPLY, self.updateList, self);
        self.cancelBtn.addClickListener(self.onCancel, self);
    };
    TYJY_ApplyView.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        GGlobal.control.remove(UIConst.TYJY_APPLY, self.updateList, self);
        self.cancelBtn.removeClickListener(self.onCancel, self);
    };
    TYJY_ApplyView.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setdata(this._listData[idx]);
    };
    /**
     * 更新列表数据
     */
    TYJY_ApplyView.prototype.updateList = function () {
        var self = this;
        self._listData = GGlobal.model_TYJY.applyList;
        self.list.numItems = self._listData ? self._listData.length : 0;
    };
    /**
     * 全部拒绝
     */
    TYJY_ApplyView.prototype.onCancel = function (e) {
        GGlobal.model_TYJY.CG_APPROVAL_APPLY(3, 0);
        GGlobal.layerMgr.close(UIConst.TYJY_APPLY);
    };
    TYJY_ApplyView.URL = "ui://m2fm2aiyvfmx18";
    return TYJY_ApplyView;
}(UIModalPanel));
__reflect(TYJY_ApplyView.prototype, "TYJY_ApplyView");
