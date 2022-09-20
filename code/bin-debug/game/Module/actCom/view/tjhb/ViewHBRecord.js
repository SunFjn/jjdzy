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
 * 发红包记录界面
 */
var ViewHBRecord = (function (_super) {
    __extends(ViewHBRecord, _super);
    function ViewHBRecord() {
        var _this = _super.call(this) || this;
        _this._listData = [];
        _this._max = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewHBRecord.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActCom_TJHB", "ViewHBRecord").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewHBRecord.prototype.onShown = function () {
        var self = this;
        var vo = this._args.vo;
        self.addListen();
        GGlobal.model_TJHB.CG_OPENRECORD_UI(vo.hbId);
        var cfg;
        if (vo.isSystemHB == 0) {
            cfg = Config.tjhb_296[vo.hbType];
        }
        else {
            cfg = Config.tjhbsys_296[vo.hbType];
        }
        var id = Number(ConfigHelp.SplitStr(cfg.hb)[0][0]);
        var v = VoItem.create(id);
        var num = Number(ConfigHelp.SplitStr(cfg.hb)[0][2]);
        IconUtil.setImg(self.iconYuanBao, Enum_Path.ICON70_URL + v.icon + ".png");
        self.totalLab.text = num + "";
    };
    ViewHBRecord.prototype.onHide = function () {
        var self = this;
        self.removeListen();
        GGlobal.layerMgr.close(UIConst.TJHB_RECORD);
        IconUtil.setImg(self.iconYuanBao, null);
    };
    ViewHBRecord.prototype.addListen = function () {
        var self = this;
        IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "tianjianghongbao1.png");
        self.closeBtn.addClickListener(self.onCloseView, self);
        GGlobal.control.listen(UIConst.TJHB_RECORD, self.updateView, self);
    };
    ViewHBRecord.prototype.removeListen = function () {
        var self = this;
        IconUtil.setImg(self.bgImg, null);
        GGlobal.control.remove(UIConst.TJHB_RECORD, self.updateView, self);
        self.closeBtn.removeClickListener(self.onCloseView, self);
    };
    /**
     * 更新页面数据
     */
    ViewHBRecord.prototype.updateView = function () {
        var self = this;
        var model = GGlobal.model_TJHB;
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
    ViewHBRecord.prototype.onCloseView = function () {
        this.onHide();
        // GGlobal.layerMgr.close(UIConst.TJHB_RECORD);
    };
    ViewHBRecord.prototype.renderHandle = function (index, obj) {
        var v = obj;
        var vo = GGlobal.model_TJHB.recordArr[index];
        v.setData(vo, vo.money >= this._max);
    };
    ViewHBRecord.URL = "ui://fm0lrzctv465i";
    return ViewHBRecord;
}(UIModalPanel));
__reflect(ViewHBRecord.prototype, "ViewHBRecord");
