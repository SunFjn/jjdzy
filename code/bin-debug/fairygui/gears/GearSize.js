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
    var GearSize = (function (_super) {
        __extends(GearSize, _super);
        function GearSize(owner) {
            return _super.call(this, owner) || this;
        }
        GearSize.prototype.init = function () {
            this._default = new fairygui.GearSizeValue(this._owner.width, this._owner.height, this._owner.scaleX, this._owner.scaleY);
            this._storage = {};
        };
        GearSize.prototype.addStatus = function (pageId, buffer) {
            var gv;
            if (pageId == null)
                gv = this._default;
            else {
                gv = new fairygui.GearSizeValue();
                this._storage[pageId] = gv;
            }
            gv.width = buffer.readInt();
            gv.height = buffer.readInt();
            gv.scaleX = buffer.readFloat();
            gv.scaleY = buffer.readFloat();
        };
        GearSize.prototype.apply = function () {
            var gv = this._storage[this._controller.selectedPageId];
            if (!gv)
                gv = this._default;
            if (this._tweenConfig && this._tweenConfig.tween && !fairygui.UIPackage._constructing && !fairygui.GearBase.disableAllTweenEffect) {
                if (this._tweenConfig._tweener != null) {
                    if (this._tweenConfig._tweener.endValue.x != gv.width || this._tweenConfig._tweener.endValue.y != gv.height
                        || this._tweenConfig._tweener.endValue.z != gv.scaleX || this._tweenConfig._tweener.endValue.w != gv.scaleY) {
                        this._tweenConfig._tweener.kill(true);
                        this._tweenConfig._tweener = null;
                    }
                    else
                        return;
                }
                var a = gv.width != this._owner.width || gv.height != this._owner.height;
                var b = gv.scaleX != this._owner.scaleX || gv.scaleY != this._owner.scaleY;
                if (a || b) {
                    if (this._owner.checkGearController(0, this._controller))
                        this._tweenConfig._displayLockToken = this._owner.addDisplayLock();
                    this._tweenConfig._tweener = fairygui.GTween.to4(this._owner.width, this._owner.height, this._owner.scaleX, this._owner.scaleY, gv.width, gv.height, gv.scaleX, gv.scaleY, this._tweenConfig.duration)
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
                this._owner.setSize(gv.width, gv.height, this._owner.gearXY.controller == this._controller);
                this._owner.setScale(gv.scaleX, gv.scaleY);
                this._owner._gearLocked = false;
            }
        };
        GearSize.prototype.__tweenUpdate = function (tweener) {
            var flag = tweener.userData;
            this._owner._gearLocked = true;
            if ((flag & 1) != 0)
                this._owner.setSize(tweener.value.x, tweener.value.y, this._owner.checkGearController(1, this._controller));
            if ((flag & 2) != 0)
                this._owner.setScale(tweener.value.z, tweener.value.w);
            this._owner._gearLocked = false;
        };
        GearSize.prototype.__tweenComplete = function () {
            if (this._tweenConfig._displayLockToken != 0) {
                this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
                this._tweenConfig._displayLockToken = 0;
            }
            this._tweenConfig._tweener = null;
        };
        GearSize.prototype.updateState = function () {
            var gv = this._storage[this._controller.selectedPageId];
            if (!gv) {
                gv = new fairygui.GearSizeValue();
                this._storage[this._controller.selectedPageId] = gv;
            }
            gv.width = this._owner.width;
            gv.height = this._owner.height;
            gv.scaleX = this._owner.scaleX;
            gv.scaleY = this._owner.scaleY;
        };
        GearSize.prototype.updateFromRelations = function (dx, dy) {
            if (this._controller == null || this._storage == null)
                return;
            for (var key in this._storage) {
                var gv = this._storage[key];
                gv.width += dx;
                gv.height += dy;
            }
            this._default.width += dx;
            this._default.height += dy;
            this.updateState();
        };
        return GearSize;
    }(fairygui.GearBase));
    fairygui.GearSize = GearSize;
    __reflect(GearSize.prototype, "fairygui.GearSize");
})(fairygui || (fairygui = {}));
