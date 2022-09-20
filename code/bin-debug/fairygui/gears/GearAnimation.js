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
    var GearAnimation = (function (_super) {
        __extends(GearAnimation, _super);
        function GearAnimation(owner) {
            return _super.call(this, owner) || this;
        }
        GearAnimation.prototype.init = function () {
            this._default = new fairygui.GearAnimationValue(this._owner.playing, this._owner.frame);
            this._storage = {};
        };
        GearAnimation.prototype.addStatus = function (pageId, buffer) {
            var gv;
            if (pageId == null)
                gv = this._default;
            else {
                gv = new fairygui.GearAnimationValue();
                this._storage[pageId] = gv;
            }
            gv.playing = buffer.readBool();
            gv.frame = buffer.readInt();
        };
        GearAnimation.prototype.apply = function () {
            this._owner._gearLocked = true;
            var gv = this._storage[this._controller.selectedPageId];
            if (!gv)
                gv = this._default;
            this._owner.frame = gv.frame;
            this._owner.playing = gv.playing;
            this._owner._gearLocked = false;
        };
        GearAnimation.prototype.updateState = function () {
            var gv = this._storage[this._controller.selectedPageId];
            if (!gv) {
                gv = new fairygui.GearAnimationValue();
                this._storage[this._controller.selectedPageId] = gv;
            }
            gv.frame = this._owner.frame;
            gv.playing = this._owner.playing;
        };
        return GearAnimation;
    }(fairygui.GearBase));
    fairygui.GearAnimation = GearAnimation;
    __reflect(GearAnimation.prototype, "fairygui.GearAnimation");
})(fairygui || (fairygui = {}));
