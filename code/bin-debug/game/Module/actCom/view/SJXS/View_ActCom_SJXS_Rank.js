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
var View_ActCom_SJXS_Rank = (function (_super) {
    __extends(View_ActCom_SJXS_Rank, _super);
    function View_ActCom_SJXS_Rank() {
        var _this = _super.call(this) || this;
        _this.showData = [];
        _this.childrenCreated();
        return _this;
    }
    View_ActCom_SJXS_Rank.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActCom_SJXS", "View_ActCom_SJXS_Rank").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    View_ActCom_SJXS_Rank.prototype.renderHandler = function (index, item) {
        var self = this;
        for (var i = 0; i < self.showData.length; i++) {
            var cfg = self.showData[i];
            var rankArr = JSON.parse(cfg.rank);
            if (rankArr[0][0] <= index + 1 && index + 1 <= rankArr[0][1]) {
                item.setVo(index + 1, cfg);
                break;
            }
        }
    };
    View_ActCom_SJXS_Rank.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelsjxs;
        var cfg = self.showData[self.showData.length - 1];
        var len = JSON.parse(cfg.rank)[0][1];
        self.list.numItems = len;
        self.lb1.setVar("count", ConfigHelp.getSystemNum(7403) + "").flushVars();
        self.lbMy.text = "我的排名：" + model.myRank + "         抽奖：" + model.drawNum;
    };
    View_ActCom_SJXS_Rank.prototype.onShown = function () {
        var self = this;
        self.showData = self._args;
        self.registerEvent(true);
        GGlobal.modelsjxs.CG_GodGenThisLife_openRankUI_9553();
    };
    View_ActCom_SJXS_Rank.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        self.registerEvent(false);
    };
    View_ActCom_SJXS_Rank.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.control.register(pFlag, UIConst.SHENJIANG_XIANSHI_RANK, self.updateShow, self);
    };
    View_ActCom_SJXS_Rank.URL = "ui://iwvd88mqr3jec";
    return View_ActCom_SJXS_Rank;
}(UIModalPanel));
__reflect(View_ActCom_SJXS_Rank.prototype, "View_ActCom_SJXS_Rank");
