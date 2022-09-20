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
var View_ActCom_CZPHRank = (function (_super) {
    __extends(View_ActCom_CZPHRank, _super);
    function View_ActCom_CZPHRank() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_ActCom_CZPHRank.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActComCZPH", "View_ActCom_CZPHRank").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    View_ActCom_CZPHRank.prototype.renderHandler = function (index, item) {
        item.setData(GGlobal.modelczph.rankArr[index]);
    };
    View_ActCom_CZPHRank.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelczph;
        self.list.numItems = model.rankArr.length;
        if (model.myRank > model.rankArr.length || model.myRank == 0) {
            self.rankLb.setVar("rank", "未上榜").flushVars();
        }
        else {
            self.rankLb.setVar("rank", model.myRank + "").flushVars();
        }
        self.moneyLb.setVar("money", model.myMoney + "元宝").flushVars();
    };
    View_ActCom_CZPHRank.prototype.onShown = function () {
        this.updateShow();
    };
    View_ActCom_CZPHRank.prototype.onHide = function () {
        this.list.numItems = 0;
    };
    View_ActCom_CZPHRank.URL = "ui://q5asybs1k1rz7";
    return View_ActCom_CZPHRank;
}(UIModalPanel));
__reflect(View_ActCom_CZPHRank.prototype, "View_ActCom_CZPHRank");
