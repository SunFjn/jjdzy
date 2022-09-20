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
var frame3 = (function (_super) {
    __extends(frame3, _super);
    function frame3() {
        return _super.call(this) || this;
    }
    frame3.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "frame3"));
    };
    frame3.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "bg.jpg");
        IconUtil.setImg(self.bgImg, Enum_Path.BACK_URL + "frameBg3.jpg");
        self.displayObject.cacheAsBitmap = true;
    };
    frame3.prototype.setTitle = function (value) {
        this._iconObject.asLoader.url = value;
    };
    frame3.prototype.setTitleVis = function (value) {
        this.titleGroup.visible = value;
    };
    //>>>>end
    frame3.URL = "ui://jvxpx9emz1jw6v";
    return frame3;
}(fairygui.GLabel));
__reflect(frame3.prototype, "frame3");
