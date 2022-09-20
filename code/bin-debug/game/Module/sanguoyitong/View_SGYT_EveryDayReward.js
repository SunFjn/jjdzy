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
var View_SGYT_EveryDayReward = (function (_super) {
    __extends(View_SGYT_EveryDayReward, _super);
    function View_SGYT_EveryDayReward() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_SGYT_EveryDayReward.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("sanGuoYiTong", "View_SGYT_EveryDayReward").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.gridArr = [self.grid0, self.grid1, self.grid2];
        self.gridArr1 = [self.grid00, self.grid01, self.grid02];
        _super.prototype.childrenCreated.call(this);
        self.drawBt.addClickListener(self.drawHandler, self);
        self.drawBt1.addClickListener(self.drawHandler, self);
    };
    View_SGYT_EveryDayReward.prototype.drawHandler = function () {
    };
    View_SGYT_EveryDayReward.prototype.onShown = function () {
        var self = this;
        var reward0 = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[6307].other));
        var reward1 = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[6308].other));
        for (var i = 0; i < self.gridArr.length; i++) {
            self.gridArr[i].isShowEff = true;
            self.gridArr[i].tipEnabled = true;
            self.gridArr[i].vo = reward0[i];
            self.gridArr1[i].isShowEff = true;
            self.gridArr1[i].tipEnabled = true;
            self.gridArr1[i].vo = reward1[i];
        }
    };
    View_SGYT_EveryDayReward.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(UIConst.SANGUO_YITONG_ZLP);
        ConfigHelp.cleanGridEff(self.gridArr);
        ConfigHelp.cleanGridEff(self.gridArr1);
    };
    View_SGYT_EveryDayReward.URL = "ui://z4ijxlqkiv4og";
    return View_SGYT_EveryDayReward;
}(UIModalPanel));
__reflect(View_SGYT_EveryDayReward.prototype, "View_SGYT_EveryDayReward");
