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
 * 武庙十哲 - 积分目标
 */
var WMSZIntegralView = (function (_super) {
    __extends(WMSZIntegralView, _super);
    function WMSZIntegralView() {
        var _this = _super.call(this) || this;
        _this._qs = 0;
        _this._maxRank = 0;
        _this.childrenCreated();
        return _this;
    }
    WMSZIntegralView.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActCom_WMSZ", "WMSZIntegralView").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    WMSZIntegralView.prototype.onShown = function () {
        var self = this;
        self._qs = self._args.qs;
        self._maxRank = self._args.maxRank;
        GGlobal.control.listen(UIConst.WMSZ_INTEGRAL, self.updateLlist, self);
        self.update();
    };
    WMSZIntegralView.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        GGlobal.layerMgr.close(this.panelId);
        GGlobal.control.remove(UIConst.WMSZ_INTEGRAL, self.updateLlist, self);
    };
    WMSZIntegralView.prototype.update = function () {
        var self = this;
        var model = GGlobal.model_ActWMSZ;
        self.updateLlist();
        self.lbMyInte.text = "我的积分：" + model.myIntegral;
        if (model.myRank <= 0) {
            self.lbMyRank.text = "我的排名：" + self._maxRank + "+";
        }
        else {
            self.lbMyRank.text = "我的排名：" + model.myRank;
        }
    };
    WMSZIntegralView.prototype.updateLlist = function () {
        var self = this;
        var model = GGlobal.model_ActWMSZ;
        self.dataArr = model.targetArr;
        self.dataArr.sort(self.funcSort);
        self.list.numItems = self.dataArr.length;
    };
    WMSZIntegralView.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.setData(this.dataArr[index]);
    };
    WMSZIntegralView.prototype.funcSort = function (a, b) {
        if (a.status == b.status) {
            return a.id - b.id;
        }
        else {
            if (a.status == 1) {
                return -1;
            }
            if (b.status == 1) {
                return 1;
            }
            if (a.status == 0) {
                return -1;
            }
            if (b.status == 0) {
                return 1;
            }
        }
        return 1;
    };
    WMSZIntegralView.URL = "ui://5na9ulpxgv3t2";
    return WMSZIntegralView;
}(UIModalPanel));
__reflect(WMSZIntegralView.prototype, "WMSZIntegralView");
