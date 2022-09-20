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
var fairygui;
(function (fairygui) {
    var GearLook = (function (_super) {
        __extends(GearLook, _super);
        function GearLook(owner) {
            return _super.call(this, owner) || this;
        }
        GearLook.prototype.init = function () {
            this._default = new fairygui.GearLookValue(this._owner.alpha, this._owner.rotation, this._owner.grayed, this._owner.touchable);
            this._storage = {};
        };
        GearLook.prototype.addStatus = function (pageId, buffer) {
            var gv;
            if (pageId == null)
                gv = this._default;
            else {
                gv = new fairygui.GearLookValue();
                this._storage[pageId] = gv;
            }
            gv.alpha = buffer.readFloat();
            gv.rotation = buffer.readFloat();
            gv.grayed = buffer.readBool();
            gv.touchable = buffer.readBool();
        };
        GearLook.prototype.apply = function () {
            var gv = this._storage[this._controller.selectedPageId];
            if (!gv)
                gv = this._default;
            if (this._tweenConfig && this._tweenConfig.tween && !fairygui.UIPackage._constructing && !fairygui.GearBase.disableAllTweenEffect) {
                this._owner._gearLocked = true;
                this._owner.grayed = gv.grayed;
                this._owner.touchable = gv.touchable;
                this._owner._gearLocked = false;
                if (this._tweenConfig._tweener != null) {
                    if (this._tweenConfig._tweener.endValue.x != gv.alpha || this._tweenConfig._tweener.endValue.y != gv.rotation) {
                        this._tweenConfig._tweener.kill(true);
                        this._tweenConfig._tweener = null;
                    }
                    else
                        return;
                }
                var a = gv.alpha != this._owner.alpha;
                var b = gv.rotation != this._owner.rotation;
                if (a || b) {
                    if (this._owner.checkGearController(0, this._controller))
                        this._tweenConfig._displayLockToken = this._owner.addDisplayLock();
                    this._tweenConfig._tweener = fairygui.GTween.to2(this._owner.alpha, this._owner.rotation, gv.alpha, gv.rotation, this._tweenConfig.duration)
                        .setDelay(this._tweenConfig.delay)
                        .setEase(this._tweenConfig.easeType)
                        .setUserData((a ? 1 : 0) + (b ? 2 : 0))
                        .setTarget(this)
                        .onUpdate(this.__tweenUpdate, this)
                        .onComplete(this.__tweenComplete, this);
                }
            }
            else {
                this._owner._gearLocked = true;
                this._owner.grayed = gv.grayed;
                this._owner.touchable = gv.touchable;
                this._owner.alpha = gv.alpha;
                this._owner.rotation = gv.rotation;
                this._owner._gearLocked = false;
            }
        };
        GearLook.prototype.__tweenUpdate = function (tweener) {
            var flag = tweener.userData;
            this._owner._gearLocked = true;
            if ((flag & 1) != 0)
                this._owner.alpha = tweener.value.x;
            if ((flag & 2) != 0)
                this._owner.rotation = tweener.value.y;
            this._owner._gearLocked = false;
        };
        GearLook.prototype.__tweenComplete = function () {
            if (this._tweenConfig._displayLockToken != 0) {
                this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
                this._tweenConfig._displayLockToken = 0;
            }
            this._tweenConfig._tweener = null;
        };
        GearLook.prototype.updateState = function () {
            var gv = this._storage[this._controller.selectedPageId];
            if (!gv) {
                gv = new fairygui.GearLookValue();
                this._storage[this._controller.selectedPageId] = gv;
            }
            gv.alpha = this._owner.alpha;
            gv.rotation = this._owner.rotation;
            gv.grayed = this._owner.grayed;
            gv.touchable = this._owner.touchable;
        };
        return GearLook;
    }(fairygui.GearBase));
    fairygui.GearLook = GearLook;
    __reflect(GearLook.prototype, "fairygui.GearLook");
})(fairygui || (fairygui = {}));
