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
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite() {
        var _this = _super.call(this) || this;
        _this.CLICK = egret.TouchEvent.TOUCH_TAP;
        _this.LINK = egret.TextEvent.LINK;
        _this.openLastTime = 0;
        return _this;
    }
    Sprite.prototype.createObject = function (packageName, viewname) {
        return fairygui.UIPackage.createObject(packageName, viewname);
    };
    Sprite.prototype.setPackageItemExtension = function (url, clz) {
        fairygui.UIObjectFactory.setPackageItemExtension(url, clz);
    };
    Sprite.prototype.eventFunction = function (opt) {
        var self = this;
        var excutor = self.registe;
        // excutor(opt,self.CLICK,self.hd,self);
    };
    Sprite.prototype.registe = function (addOrRemove, target, type, listener, thisObj) {
        if (addOrRemove) {
            target.addEventListener(type, listener, thisObj);
        }
        else {
            target.removeEventListener(type, listener, thisObj);
        }
    };
    Sprite.prototype.openUI = function (uiid, delay) {
        if (delay) {
            if (!TimeUitl.cool(this.hashCode, delay)) {
                return;
            }
        }
        GGlobal.layerMgr.open(uiid);
    };
    return Sprite;
}(fairygui.GComponent));
__reflect(Sprite.prototype, "Sprite");
