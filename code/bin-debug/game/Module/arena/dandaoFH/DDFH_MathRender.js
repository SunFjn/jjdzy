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
var DDFH_MathRender = (function (_super) {
    __extends(DDFH_MathRender, _super);
    function DDFH_MathRender() {
        return _super.call(this) || this;
    }
    DDFH_MathRender.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "DDFH_MathRender"));
    };
    DDFH_MathRender.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.headIcon = (this.getChild("headIcon"));
        this.nameLb = (this.getChild("nameLb"));
        this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    DDFH_MathRender.prototype.onRemove = function () {
        IconUtil.setImg(this.headIcon, null);
    };
    DDFH_MathRender.prototype.show = function (headId, frameId, namestr) {
        var a = this;
        var headPic = Config.shezhi_707[headId];
        var framePic = Config.shezhi_707[frameId];
        // ImageLoader.instance.loader(Enum_Path.HEAD_URL + headPic.picture + ".png", a.headIcon);
        IconUtil.setImg(a.headIcon, Enum_Path.HEAD_URL + headPic.picture + ".png");
        if (namestr) {
            this.nameLb.visible = true;
            this.nameLb.text = namestr;
        }
        else {
            this.nameLb.visible = false;
        }
    };
    DDFH_MathRender.URL = "ui://me1skowlr4ogh";
    return DDFH_MathRender;
}(fairygui.GComponent));
__reflect(DDFH_MathRender.prototype, "DDFH_MathRender");
