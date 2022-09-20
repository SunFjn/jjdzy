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
var GCBZ_BattleReportItem = (function (_super) {
    __extends(GCBZ_BattleReportItem, _super);
    function GCBZ_BattleReportItem() {
        return _super.call(this) || this;
    }
    GCBZ_BattleReportItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("GCBZ", "GCBZ_BattleReportItem"));
    };
    GCBZ_BattleReportItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    GCBZ_BattleReportItem.prototype.setVo = function (vo) {
        var self = this;
        self.vo = vo;
        var cfg = Config.gcbz_777[vo.cityID];
        self.iconImg.url = CommonManager.getUrl("GCBZ", vo.state == 1 ? "win" : "fail");
        if (vo.state == 1) {
            self.lb.text = ConfigHelp.reTxt("{0}不自量力入侵你所占领的城池{1}，被你狠狠教训！", HtmlUtil.fontNoSize(vo.name, Color.getColorStr(3)), HtmlUtil.fontNoSize(cfg.mz, Color.getColorStr(5)));
        }
        else {
            self.lb.text = ConfigHelp.reTxt("{0}入侵你所占领的城池{1}，不敌对方兵强马壮，你被迫紧急撤离！", HtmlUtil.fontNoSize(vo.name, Color.getColorStr(3)), HtmlUtil.fontNoSize(cfg.mz, Color.getColorStr(5)));
        }
    };
    GCBZ_BattleReportItem.prototype.clean = function () {
    };
    GCBZ_BattleReportItem.URL = "ui://vgiijkm8r5geq";
    return GCBZ_BattleReportItem;
}(fairygui.GComponent));
__reflect(GCBZ_BattleReportItem.prototype, "GCBZ_BattleReportItem");
