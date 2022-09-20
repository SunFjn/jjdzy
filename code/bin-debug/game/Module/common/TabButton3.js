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
var TabButton3 = (function (_super) {
    __extends(TabButton3, _super);
    function TabButton3() {
        return _super.call(this) || this;
    }
    TabButton3.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TabButton3"));
    };
    TabButton3.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        self.noticeImg = (self.getChild("noticeImg"));
        self.noticeImg.visible = false;
    };
    TabButton3.prototype.setIcon = function (iconUrl) {
        var self = this;
        IconUtil.setImg(self._iconObject.asLoader, iconUrl);
    };
    TabButton3.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self._iconObject.asLoader, null);
    };
    TabButton3.URL = "ui://jvxpx9emvxva3gg";
    return TabButton3;
}(TabButton));
__reflect(TabButton3.prototype, "TabButton3");
