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
 * 护送奖励Item
 */
var EscortRewardItem = (function (_super) {
    __extends(EscortRewardItem, _super);
    function EscortRewardItem() {
        return _super.call(this) || this;
    }
    EscortRewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ShaoZhuEscort", "EscortRewardItem"));
    };
    EscortRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    EscortRewardItem.prototype.setdata = function (data, index, num) {
        if (num === void 0) { num = 0; }
        var self = this;
        if (!data)
            return;
        self.item.isShowEff = true;
        self.item.tipEnabled = true;
        self.item.vo = data;
        self.item.showText = "";
        self.itemName.text = HtmlUtil.fontNoSize(data.name, Color.getColorStr(data.quality));
        self.itemNum.text = data.count + "";
        if (num && num > 0) {
            self.interNum.text = "(-" + num + ")";
        }
        else {
            self.interNum.text = "";
        }
    };
    EscortRewardItem.URL = "ui://lnw94ki2lnitk";
    return EscortRewardItem;
}(fairygui.GComponent));
__reflect(EscortRewardItem.prototype, "EscortRewardItem");
