var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var GearBase = (function () {
        function GearBase(owner) {
            this._owner = owner;
        }
        GearBase.prototype.dispose = function () {
            if (this._tweenConfig != null && this._tweenConfig._tweener != null) {
                this._tweenConfig._tweener.kill();
                this._tweenConfig._tweener = null;
            }
        };
        Object.defineProperty(GearBase.prototype, "controller", {
            get: function () {
                return this._controller;
            },
            set: function (val) {
                if (val != this._controller) {
                    this._controller = val;
                    if (this._controller)
                        this.init();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GearBase.prototype, "tweenConfig", {
            get: function () {
                if (this._tweenConfig == null)
                    this._tweenConfig = new GearTweenConfig();
                return this._tweenConfig;
            },
            enumerable: true,
            configurable: true
        });
        GearBase.prototype.setup = function (buffer) {
            this._controller = this._owner.parent.getControllerAt(buffer.readShort());
            this.init();
            var cnt;
            var i;
            var page;
            if (this instanceof fairygui.GearDisplay) {
                cnt = buffer.readShort();
                var pages = [];
                for (i = 0; i < cnt; i++)
                    pages[i] = buffer.readS();
                this.pages = pages;
            }
            else {
                cnt = buffer.readShort();
                for (i = 0; i < cnt; i++) {
                    page = buffer.readS();
                    if (page == null)
                        continue;
                    this.addStatus(page, buffer);
                }
                if (buffer.readBool())
                    this.addStatus(null, buffer);
            }
            if (buffer.readBool()) {
                this._tweenConfig = new GearTweenConfig();
                this._tweenConfig.easeType = buffer.readByte();
                this._tweenConfig.duration = buffer.readFloat();
                this._tweenConfig.delay = buffer.readFloat();
            }
        };
        GearBase.prototype.updateFromRelations = function (dx, dy) {
        };
        GearBase.prototype.addStatus = function (pageId, buffer) {
        };
        GearBase.prototype.init = function () {
        };
        GearBase.prototype.apply = function () {
        };
        GearBase.prototype.updateState = function () {
        };
        GearBase.disableAllTweenEffect = false;
        return GearBase;
    }());
    fairygui.GearBase = GearBase;
    __reflect(GearBase.prototype, "fairygui.GearBase");
    var GearTweenConfig = (function () {
        function GearTweenConfig() {
            this.tween = true;
            this.easeType = fairygui.EaseType.QuadOut;
            this.duration = 0.3;
            this.delay = 0;
        }
        return GearTweenConfig;
    }());
    fairygui.GearTweenConfig = GearTweenConfig;
    __reflect(GearTweenConfig.prototype, "fairygui.GearTweenConfig");
})(fairygui || (fairygui = {}));
