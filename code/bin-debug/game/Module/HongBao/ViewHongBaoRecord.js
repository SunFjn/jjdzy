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
var ViewHongBaoRecord = (function (_super) {
    __extends(ViewHongBaoRecord, _super);
    function ViewHongBaoRecord() {
        var _this = _super.call(this) || this;
        _this._listData = [];
        _this._max = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewHongBaoRecord.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("HongBao", "ViewHongBaoRecord").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewHongBaoRecord.prototype.onShown = function () {
        var self = this;
        var vo = self._args;
        self.addListen();
        GGlobal.modelHB.CG_RedBoxAct_lookinfos_11761(vo.id);
        self.totalLab.text = vo.moneyNum + "";
    };
    ViewHongBaoRecord.prototype.onHide = function () {
        var self = this;
        self.removeListen();
    };
    ViewHongBaoRecord.prototype.addListen = function () {
        var self = this;
        IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "tianjianghongbao1.png");
        self.closeBtn.addClickListener(self.onCloseView, self);
        GGlobal.control.listen(UIConst.HONGBAO_RECORD, self.updateView, self);
    };
    ViewHongBaoRecord.prototype.removeListen = function () {
        var self = this;
        IconUtil.setImg(self.bgImg, null);
        GGlobal.control.remove(UIConst.HONGBAO_RECORD, self.updateView, self);
        self.closeBtn.removeClickListener(self.onCloseView, self);
    };
    /**
     * 更新页面数据
     */
    ViewHongBaoRecord.prototype.updateView = function () {
        var self = this;
        var model = GGlobal.modelHB;
        var len = model.recordArr.length;
        self._max = 0;
        for (var i = 0; i < len; i++) {
            var v = model.recordArr[i];
            if (v.money > self._max) {
                self._max = v.money;
            }
        }
        self.list.numItems = model.recordArr.length;
    };
    /**
     * 关闭界面
     */
    ViewHongBaoRecord.prototype.onCloseView = function () {
        this.doHideAnimation();
    };
    ViewHongBaoRecord.prototype.renderHandle = function (index, obj) {
        var vo = GGlobal.modelHB.recordArr[index];
        obj.setData(vo, vo.money >= this._max && vo.drawNum >= Model_HongBao.max);
    };
    ViewHongBaoRecord.URL = "ui://s01exr8xqz027";
    return ViewHongBaoRecord;
}(UIModalPanel));
__reflect(ViewHongBaoRecord.prototype, "ViewHongBaoRecord");
