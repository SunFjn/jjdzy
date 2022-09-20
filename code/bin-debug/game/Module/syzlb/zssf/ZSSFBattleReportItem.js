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
var ZSSFBattleReportItem = (function (_super) {
    __extends(ZSSFBattleReportItem, _super);
    function ZSSFBattleReportItem() {
        return _super.call(this) || this;
    }
    ZSSFBattleReportItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ZSSFBattleReportItem"));
    };
    ZSSFBattleReportItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    /**U:玩家名字B:状态:1-战胜,2-战败I:城池id */
    ZSSFBattleReportItem.prototype.onShown = function (reportData) {
        var self = this;
        var cfg = Config.zssf_294[reportData.cityID];
        if (reportData.state == 2) {
            self.lb.text = HtmlUtil.fontNoSize(reportData.name, Color.getColorStr(2)) + "不自量力来掠夺你镇守的" + cfg.name + ",被你打退了";
            self.rewardLb.visible = false;
        }
        else {
            var costArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
            self.lb.text = HtmlUtil.fontNoSize(reportData.name, Color.getColorStr(2)) + "掠夺了你镇守的" + cfg.name + "领土,损失了";
            self.rewardLb.visible = true;
            self.rewardLb.setImgUrl(costArr[0].icon);
            self.rewardLb.setCount(costArr[0].count);
        }
    };
    ZSSFBattleReportItem.prototype.clean = function () {
    };
    ZSSFBattleReportItem.URL = "ui://3o8q23uucenr1f";
    return ZSSFBattleReportItem;
}(fairygui.GComponent));
__reflect(ZSSFBattleReportItem.prototype, "ZSSFBattleReportItem");
