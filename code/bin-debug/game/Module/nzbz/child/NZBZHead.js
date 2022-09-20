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
var NZBZHead = (function (_super) {
    __extends(NZBZHead, _super);
    function NZBZHead() {
        return _super.call(this) || this;
    }
    NZBZHead.createInstance = function () {
        return (fairygui.UIPackage.createObject("nzbz", "NZBZHead"));
    };
    NZBZHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.headIcon = (this.getChild("headIcon"));
        this.frameIcon = (this.getChild("frameIcon"));
        this.countryImg = (this.getChild("countryImg"));
        this.levelLb = (this.getChild("levelLb"));
    };
    NZBZHead.prototype.show = function (headId, frameId, country, level) {
        var headPic = Config.shezhi_707[headId];
        var framePic = Config.shezhi_707[frameId];
        ImageLoader.instance.loader(Enum_Path.HEAD_URL + headPic.picture + ".png", this.headIcon);
        ImageLoader.instance.loader(Enum_Path.HEAD_URL + framePic.picture + ".png", this.frameIcon);
        this.countryImg.url = CommonManager.getCommonUrl("country" + country);
        this.levelLb.text = level + "";
    };
    NZBZHead.URL = "ui://xzyn0qe3aro8m";
    return NZBZHead;
}(fairygui.GComponent));
__reflect(NZBZHead.prototype, "NZBZHead");
