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
var View_ActCom_ZFZJRank = (function (_super) {
    __extends(View_ActCom_ZFZJRank, _super);
    function View_ActCom_ZFZJRank() {
        var _this = _super.call(this) || this;
        _this.showData = [];
        _this.childrenCreated();
        return _this;
    }
    View_ActCom_ZFZJRank.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("ActCom_ZFZJ", "View_ActCom_ZFZJRank").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    View_ActCom_ZFZJRank.prototype.renderHandler = function (index, item) {
        var self = this;
        var model = GGlobal.modelzfzj;
        for (var i = 0; i < self.showData.length; i++) {
            var cfg = self.showData[i];
            var rankArr = JSON.parse(cfg.rank);
            if (rankArr[0][0] <= index + 1 && index + 1 <= rankArr[0][1]) {
                if (model.wineRankData[index + 1]) {
                    item.setVo(index + 1, model.wineRankData[index + 1], cfg);
                }
                else {
                    item.setVo(index + 1, null, cfg);
                }
                break;
            }
        }
    };
    View_ActCom_ZFZJRank.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelzfzj;
        var len = JSON.parse(self.showData[self.showData.length - 1].rank)[0][1];
        self.list.numItems = len;
        self.myRank.text = "我的排名：" + model.myRank;
        self.myNum.text = "我的敬酒：" + model.myWine;
    };
    View_ActCom_ZFZJRank.prototype.onShown = function () {
        var self = this;
        if (self.showData.length <= 0) {
            for (var key in Config.hfkhzfzjrank_286) {
                self.showData.push(Config.hfkhzfzjrank_286[key]);
            }
            self.showData.sort(function (a, b) {
                return a.id - b.id;
            });
        }
        self.registerEvent(true);
        GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_openRank_9663();
    };
    View_ActCom_ZFZJRank.prototype.onHide = function () {
        var self = this;
        self.list.numItems = 0;
        self.registerEvent(false);
    };
    View_ActCom_ZFZJRank.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.control.register(pFlag, UIConst.HFKH_ZFZJ_RANK, self.updateShow, self);
    };
    View_ActCom_ZFZJRank.URL = "ui://4h4iwgjrr3jel";
    return View_ActCom_ZFZJRank;
}(UIModalPanel));
__reflect(View_ActCom_ZFZJRank.prototype, "View_ActCom_ZFZJRank");
