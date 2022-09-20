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
var YuanXiaoBattleReportItem = (function (_super) {
    __extends(YuanXiaoBattleReportItem, _super);
    function YuanXiaoBattleReportItem() {
        return _super.call(this) || this;
    }
    YuanXiaoBattleReportItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActCom_YuanXiao", "YuanXiaoBattleReportItem"));
    };
    YuanXiaoBattleReportItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    /**U:玩家名字B:状态:1-战胜,2-战败I:货币id */
    YuanXiaoBattleReportItem.prototype.onShown = function (reportData) {
        var self = this;
        var vo = Vo_Currency.create(reportData.itemID);
        if (reportData.state == 2) {
            self.lb.text = HtmlUtil.fontNoSize(reportData.name, Color.getColorStr(2)) + "不自量力来掠夺你的" + vo.name + ",被你一顿教育";
            self.rewardLb.visible = false;
        }
        else {
            self.lb.text = HtmlUtil.fontNoSize(reportData.name, Color.getColorStr(2)) + "掠夺了你的材料,损失了";
            self.rewardLb.visible = true;
            self.rewardLb.setImgUrl(vo.icon);
            self.rewardLb.setCount(reportData.count);
        }
    };
    YuanXiaoBattleReportItem.prototype.clean = function () {
    };
    YuanXiaoBattleReportItem.URL = "ui://ajaichn8qc9hs";
    return YuanXiaoBattleReportItem;
}(fairygui.GComponent));
__reflect(YuanXiaoBattleReportItem.prototype, "YuanXiaoBattleReportItem");
