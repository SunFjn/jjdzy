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
var YanHui_FWRewardItem = (function (_super) {
    __extends(YanHui_FWRewardItem, _super);
    function YanHui_FWRewardItem() {
        return _super.call(this) || this;
    }
    YanHui_FWRewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("YanHui", "YanHui_FWRewardItem"));
    };
    YanHui_FWRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    YanHui_FWRewardItem.prototype.setVo = function (vo, isSel) {
        var self = this;
        var model = GGlobal.modelYanHui;
        self.vo = vo;
        self.numLb.text = "氛围值达到" + HtmlUtil.fontNoSize(vo.fw + "", Color.getColorStr(model.fwNum >= vo.fw ? 2 : 6)) + "可升级奖励";
        var rewardVo = ConfigHelp.makeItemListArr(JSON.parse(vo.reward))[0];
        self.grid.isShowEff = self.grid.tipEnabled = true;
        self.grid.vo = rewardVo;
        self.rewardLb.text = vo.tips;
        self.curGroup.visible = isSel;
    };
    YanHui_FWRewardItem.prototype.clean = function () {
        var self = this;
        self.grid.clean();
    };
    YanHui_FWRewardItem.URL = "ui://4x7dk3lhgz25p";
    return YanHui_FWRewardItem;
}(fairygui.GComponent));
__reflect(YanHui_FWRewardItem.prototype, "YanHui_FWRewardItem");
