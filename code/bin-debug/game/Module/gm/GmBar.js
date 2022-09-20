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
var GmBar = (function (_super) {
    __extends(GmBar, _super);
    function GmBar() {
        return _super.call(this) || this;
    }
    GmBar.createInstance = function () {
        return (fairygui.UIPackage.createObject("GM", "GmBar"));
    };
    GmBar.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbTitle = (this.getChild("lbTitle"));
        this.lbInput = (this.getChild("lbInput"));
    };
    GmBar.prototype.show = function (title, content) {
        this.lbInput.autoSize = fairygui.AutoSizeType.Both;
        this.lbTitle.text = title;
        if (content == "time") {
            content = DateUtil.getYMDHMS(Math.ceil(Model_GlobalMsg.getServerTime() / 1000));
        }
        this.lbInput.text = content;
        if (this.lbInput.textWidth < 120) {
            this.lbInput.autoSize = fairygui.AutoSizeType.None;
            this.lbInput.width = 120;
        }
    };
    GmBar.URL = "ui://vm9a8xq8q8rva";
    return GmBar;
}(fairygui.GComponent));
__reflect(GmBar.prototype, "GmBar");
