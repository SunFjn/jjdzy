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
 * 奇策套装界面
 * @author: lujiahao
 * @date: 2019-10-23 17:29:34
 */
var ViewSuitQice = (function (_super) {
    __extends(ViewSuitQice, _super);
    function ViewSuitQice() {
        var _this = _super.call(this) || this;
        _this._dataList = [];
        _this.loadRes("qice", "qice_atlas0");
        return _this;
    }
    ViewSuitQice.createInstance = function () {
        return (fairygui.UIPackage.createObject("qice", "ViewSuitQice"));
    };
    ViewSuitQice.prototype.childrenCreated = function () {
        GGlobal.createPack("qice");
        this.view = fairygui.UIPackage.createObject("qice", "ViewSuitQice").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewSuitQice.prototype.initView = function () {
        var t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.foldInvisibleItems = true;
    };
    //=========================================== API ==========================================
    ViewSuitQice.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.refreshData();
    };
    ViewSuitQice.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        t.list.numItems = 0;
    };
    ViewSuitQice.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewSuitQice.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    };
    ViewSuitQice.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelQice;
        t._curData = t_model.getCurCfgSuit();
        if (t._curData) {
            //已激活套装
            if (t_model.getNextCfgSuit()) {
                t.btnUp.title = "升级";
            }
            else {
                t.btnUp.title = "已满级";
            }
            t.powerCom.title = t._curData.cfg.zl + "";
            t.tfName.text = "\u5957\u88C5" + t._curData.level + "\u7EA7";
        }
        else {
            //尚未激活套装
            t.powerCom.title = 0 + "";
            t.btnUp.title = "激活";
            t.tfName.text = "\u5957\u88C50\u7EA7";
        }
        if (t_model.checkSuitCanUp(false))
            t.btnUp.grayed = false;
        else
            t.btnUp.grayed = true;
        t._dataList.length = 0;
        {
            var t_cfg = t_model.getCurCfgSuit();
            if (t_cfg) {
                t._dataList.push(t_cfg);
            }
        }
        {
            var t_cfg = t_model.getNextCfgSuit();
            if (t_cfg) {
                t._dataList.push(t_cfg);
            }
        }
        t.list.numItems = t._dataList.length;
        t.list.ensureBoundsCorrect();
        t.list.ensureSizeCorrect();
        t.list.resizeToFit();
    };
    ViewSuitQice.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_SUIT_UPDATE, t.onSuitUpdate, t);
        EventUtil.register(pFlag, t.btnUp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ViewSuitQice.prototype.onSuitUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ViewSuitQice.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnUp:
                GGlobal.modelQice.CG_QiCe_upQCtaozhuang_9705();
                break;
        }
    };
    //>>>>end
    ViewSuitQice.URL = "ui://cokk050nb5kha";
    return ViewSuitQice;
}(UIModalPanel));
__reflect(ViewSuitQice.prototype, "ViewSuitQice");
