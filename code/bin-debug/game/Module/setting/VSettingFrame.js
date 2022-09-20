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
var VSettingFrame = (function (_super) {
    __extends(VSettingFrame, _super);
    function VSettingFrame() {
        return _super.call(this) || this;
    }
    VSettingFrame.createInstance = function () {
        return (fairygui.UIPackage.createObject("setting", "VSettingFrame"));
    };
    VSettingFrame.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.headIcon = (this.getChild("headIcon"));
        this.frameIcon = (this.getChild("frameIcon"));
        this.labLocked = (this.getChild("labLocked"));
        this.selectImg = (this.getChild("selectImg"));
        this.labLocked.visible = false;
    };
    Object.defineProperty(VSettingFrame.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
            if (v.type == 1) {
                if (Model_Setting.headIdArr.indexOf(Number(v.id)) == -1) {
                    // this.labLocked.visible = true;
                    this.headIcon.grayed = true;
                    this._isLocked = true;
                }
                else {
                    // this.labLocked.visible = false;
                    this.headIcon.grayed = false;
                    this._isLocked = false;
                }
                ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.picture + ".png", this.headIcon);
                this.headIcon.visible = true;
                this.frameIcon.visible = false;
            }
            else if (v.type == 2) {
                if (Model_Setting.frameIdArr.indexOf(Number(v.id)) == -1) {
                    // this.labLocked.visible = true;
                    this.frameIcon.grayed = true;
                    this._isLocked = true;
                }
                else {
                    // this.labLocked.visible = false;
                    this.frameIcon.grayed = false;
                    this._isLocked = false;
                }
                ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.picture + ".png", this.frameIcon);
                this.frameIcon.visible = true;
                this.headIcon.visible = false;
            }
            else {
                this._isLocked = false;
                this._isLocked = false;
                ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.head + ".png", this.headIcon);
                ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.frame + ".png", this.frameIcon);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VSettingFrame.prototype, "isLocked", {
        get: function () {
            return this._isLocked;
        },
        enumerable: true,
        configurable: true
    });
    VSettingFrame.URL = "ui://dt6yws4jlncka";
    return VSettingFrame;
}(fairygui.GButton));
__reflect(VSettingFrame.prototype, "VSettingFrame");
