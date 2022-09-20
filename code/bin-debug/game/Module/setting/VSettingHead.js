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
var VSettingHead = (function (_super) {
    __extends(VSettingHead, _super);
    function VSettingHead() {
        return _super.call(this) || this;
    }
    VSettingHead.createInstance = function () {
        return (fairygui.UIPackage.createObject("setting", "VSettingHead"));
    };
    VSettingHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.headIcon = (this.getChild("headIcon"));
        this.frameIcon = (this.getChild("frameIcon"));
        this.selectImg = (this.getChild("selectImg"));
        this.labLocked = (this.getChild("labLocked"));
        this.labLocked.visible = false;
    };
    Object.defineProperty(VSettingHead.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
            if (v.type == 1) {
                if (Model_Setting.headIdArr.indexOf(Number(v.id)) == -1) {
                    this.labLocked.visible = true;
                    // this.headIcon.grayed = true;
                    this._isLocked = true;
                }
                else {
                    this.labLocked.visible = false;
                    this._isLocked = false;
                    // this.headIcon.grayed = false;
                }
                ImageLoader.instance.loader(Enum_Path.HEAD_URL + v.picture + ".png", this.headIcon);
                this.headIcon.visible = true;
                this.frameIcon.visible = false;
            }
            else if (v.type == 2) {
                if (Model_Setting.frameIdArr.indexOf(Number(v.id)) == -1) {
                    this.labLocked.visible = true;
                    this._isLocked = true;
                    // this.frameIcon.grayed = true;
                }
                else {
                    this.labLocked.visible = false;
                    this._isLocked = false;
                    // this.frameIcon.grayed = false;
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
    Object.defineProperty(VSettingHead.prototype, "isLocked", {
        get: function () {
            return this._isLocked;
        },
        enumerable: true,
        configurable: true
    });
    VSettingHead.URL = "ui://dt6yws4jg30n3";
    return VSettingHead;
}(fairygui.GButton));
__reflect(VSettingHead.prototype, "VSettingHead");
