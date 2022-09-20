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
var TuJianUpStarItem = (function (_super) {
    __extends(TuJianUpStarItem, _super);
    function TuJianUpStarItem() {
        return _super.call(this) || this;
    }
    TuJianUpStarItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("TuJian", "TuJianUpStarItem"));
    };
    TuJianUpStarItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.attLb = (this.getChild("attLb"));
        this.stateLb = (this.getChild("stateLb"));
    };
    TuJianUpStarItem.prototype.updateShow = function (vo, cfg) {
        var self = this;
        if (vo.starLv >= cfg.lv) {
            self.attLb.text = HtmlUtil.fontNoSize(cfg.describe, Color.getColorStr(1));
            self.stateLb.text = HtmlUtil.fontNoSize("已激活", Color.getColorStr(2));
        }
        else {
            self.attLb.text = HtmlUtil.fontNoSize(cfg.describe, "#666666");
            self.stateLb.text = HtmlUtil.fontNoSize(cfg.lv + "星激活", Color.getColorStr(6));
        }
    };
    TuJianUpStarItem.URL = "ui://m0rbmsgscjfy3d";
    return TuJianUpStarItem;
}(fairygui.GComponent));
__reflect(TuJianUpStarItem.prototype, "TuJianUpStarItem");
