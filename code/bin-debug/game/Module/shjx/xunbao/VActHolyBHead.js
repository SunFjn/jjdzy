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
var VActHolyBHead = (function (_super) {
    __extends(VActHolyBHead, _super);
    function VActHolyBHead() {
        return _super.call(this) || this;
    }
    VActHolyBHead.createInstance = function () {
        return (fairygui.UIPackage.createObject("shouhunJX", "VActHolyBHead"));
    };
    VActHolyBHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.chooseImg = (this.getChild("chooseImg"));
        this.headIcon = (this.getChild("headIcon"));
        this.frameIcon = (this.getChild("frameIcon"));
    };
    VActHolyBHead.prototype.upHead = function () {
        var s = this;
        var head = Model_Setting.headId;
        var frame = Model_Setting.frameId;
        var headPic = Config.shezhi_707[head];
        ImageLoader.instance.loader(RoleUtil.getHeadRole(headPic.picture + ""), s.headIcon);
        var framePic = Config.shezhi_707[frame];
        ImageLoader.instance.loader(RoleUtil.getHeadRole(framePic.picture + ""), s.frameIcon);
    };
    VActHolyBHead.URL = "ui://4aepcdbwwg9y4q";
    return VActHolyBHead;
}(fairygui.GComponent));
__reflect(VActHolyBHead.prototype, "VActHolyBHead");
