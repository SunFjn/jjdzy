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
var PanellistItem = (function (_super) {
    __extends(PanellistItem, _super);
    function PanellistItem() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        return _this;
    }
    PanellistItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("guanqia", "PanellistItem"));
    };
    PanellistItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbRank = (this.getChild("lbRank"));
        this.lbName = (this.getChild("lbName"));
        this.lbGuanqia = (this.getChild("lbGuanqia"));
    };
    PanellistItem.prototype.update = function (data) {
        this.lbRank.text = this.index + 1 + "";
        if (data) {
            this.lbName.text = data[1];
            this.lbGuanqia.text = data[2] + "关";
        }
        else {
            this.lbName.text = this.lbGuanqia.text = "";
        }
    };
    PanellistItem.URL = "ui://r92dp953hfx71";
    return PanellistItem;
}(fairygui.GComponent));
__reflect(PanellistItem.prototype, "PanellistItem");
