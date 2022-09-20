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
 * 发红包界面
 */
var ViewFHB = (function (_super) {
    __extends(ViewFHB, _super);
    function ViewFHB() {
        var _this = _super.call(this) || this;
        _this._listData = [];
        _this.childrenCreated();
        return _this;
    }
    ViewFHB.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActCom_TJHB", "ViewFHB").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewFHB.prototype.onShown = function () {
        var self = this;
        self.addListen();
        // GGlobal.model_TJHB.CG_SEND_UI();
        self.updateView();
    };
    ViewFHB.prototype.onHide = function () {
        var self = this;
        self.removeListen();
        GGlobal.layerMgr.close(UIConst.TJHB_FHB);
    };
    ViewFHB.prototype.addListen = function () {
        var self = this;
        GGlobal.control.listen(UIConst.TJHB_FHB, self.updateView, self);
    };
    ViewFHB.prototype.removeListen = function () {
        var self = this;
        GGlobal.control.remove(UIConst.TJHB_FHB, self.updateView, self);
        self.list.numItems = 0;
    };
    /**
     * 更新页面数据
     */
    ViewFHB.prototype.updateView = function () {
        var self = this;
        var model = GGlobal.model_TJHB;
        self._listData = Model_ActComTJHB.getListData(model.fhbArr);
        self.list.numItems = self._listData.length;
    };
    ViewFHB.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.setVo(this._listData[index]);
    };
    ViewFHB.URL = "ui://fm0lrzctv4652";
    return ViewFHB;
}(UIModalPanel));
__reflect(ViewFHB.prototype, "ViewFHB");
