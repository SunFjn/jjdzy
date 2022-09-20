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
var TabButton4 = (function (_super) {
    __extends(TabButton4, _super);
    function TabButton4() {
        return _super.call(this) || this;
    }
    TabButton4.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TabButton4"));
    };
    TabButton4.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        self.noticeImg = (self.getChild("noticeImg"));
        self.noticeImg.visible = false;
    };
    TabButton4.prototype.setIcon = function (iconUrl) {
        var self = this;
        IconUtil.setImg(self._iconObject.asLoader, iconUrl);
    };
    TabButton4.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self._iconObject.asLoader, null);
    };
    TabButton4.URL = "ui://jvxpx9emiv1o3in";
    return TabButton4;
}(TabButton));
__reflect(TabButton4.prototype, "TabButton4");
