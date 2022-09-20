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
var VSettingHeadTop = (function (_super) {
    __extends(VSettingHeadTop, _super);
    function VSettingHeadTop() {
        return _super.call(this) || this;
    }
    VSettingHeadTop.createInstance = function () {
        return (fairygui.UIPackage.createObject("setting", "VSettingHeadTop"));
    };
    VSettingHeadTop.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.viewHead = (this.getChild("viewHead"));
        this.imgCountry = (this.getChild("imgCountry"));
    };
    Object.defineProperty(VSettingHeadTop.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
            ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.head + ".png", this.viewHead.headIcon);
            ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.frame + ".png", this.viewHead.frameIcon);
        },
        enumerable: true,
        configurable: true
    });
    VSettingHeadTop.prototype.showCountry = function (boo) {
        if (Model_player.voMine.country > 0) {
            this.imgCountry.url = CommonManager.getCommonUrl("country" + Model_player.voMine.country);
            this.imgCountry.visible = boo;
        }
        else {
            this.imgCountry.visible = false;
        }
    };
    VSettingHeadTop.URL = "ui://dt6yws4jejx38";
    return VSettingHeadTop;
}(fairygui.GComponent));
__reflect(VSettingHeadTop.prototype, "VSettingHeadTop");
