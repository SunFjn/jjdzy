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
    var GGraph = (function (_super) {
        __extends(GGraph, _super);
        function GGraph() {
            var _this = _super.call(this) || this;
            _this._type = 0;
            _this._lineSize = 0;
            _this._lineColor = 0;
            _this._fillColor = 0;
            _this._lineSize = 1;
            _this._lineAlpha = 1;
            _this._fillAlpha = 1;
            _this._fillColor = 0xFFFFFF;
            _this._cornerRadius = null;
            return _this;
        }
        Object.defineProperty(GGraph.prototype, "graphics", {
            get: function () {
                if (this._graphics)
                    return this._graphics;
                this.delayCreateDisplayObject();
                this._graphics = (this.displayObject).graphics;
                return this._graphics;
            },
            enumerable: true,
            configurable: true
        });
        GGraph.prototype.drawRect = function (lineSize, lineColor, lineAlpha, fillColor, fillAlpha, corner) {
            if (corner === void 0) { corner = null; }
            this._type = 1;
            this._lineSize = lineSize;
            this._lineColor = lineColor;
            this._lineAlpha = lineAlpha;
            this._fillColor = fillColor;
            this._fillAlpha = fillAlpha;
            this._cornerRadius = corner;
            this.drawCommon();
        };
        GGraph.prototype.drawEllipse = function (lineSize, lineColor, lineAlpha, fillColor, fillAlpha) {
            this._type = 2;
            this._lineSize = lineSize;
            this._lineColor = lineColor;
            this._lineAlpha = lineAlpha;
            this._fillColor = fillColor;
            this._fillAlpha = fillAlpha;
            this._cornerRadius = null;
            this.drawCommon();
        };
        GGraph.prototype.clearGraphics = function () {
            if (this._graphics) {
                this._type = 0;
                this._graphics.clear();
            }
        };
        Object.defineProperty(GGraph.prototype, "color", {
            get: function () {
                return this._fillColor;
            },
            set: function (value) {
                this._fillColor = value;
                if (this._type != 0)
                    this.drawCommon();
            },
            enumerable: true,
            configurable: true
        });
        GGraph.prototype.drawCommon = function () {
            this.graphics;
            this._graphics.clear();
            var w = this.width;
            var h = this.height;
            if (w == 0 || h == 0)
                return;
            if (this._lineSize == 0)
                this._graphics.lineStyle(0, 0, 0);
            else
                this._graphics.lineStyle(this._lineSize, this._lineColor, this._lineAlpha);
            this._graphics.beginFill(this._fillColor, this._fillAlpha);
            if (this._type == 1) {
                if (this._cornerRadius) {
                    if (this._cornerRadius.length == 1)
                        this._graphics.drawRoundRect(0, 0, w, h, this._cornerRadius[0] * 2, this._cornerRadius[0] * 2);
                    else
                        this._graphics.drawRoundRect(0, 0, w, h, this._cornerRadius[0] * 2, this._cornerRadius[1] * 2);
                }
                else
                    this._graphics.drawRect(0, 0, w, h);
            }
            else
                this._graphics.drawEllipse(0, 0, w, h);
            this._graphics.endFill();
        };
        GGraph.prototype.replaceMe = function (target) {
            if (!this._parent)
                throw "parent not set";
            target.name = this.name;
            target.alpha = this.alpha;
            target.rotation = this.rotation;
            target.visible = this.visible;
            target.touchable = this.touchable;
            target.grayed = this.grayed;
            target.setXY(this.x, this.y);
            target.setSize(this.width, this.height);
            var index = this._parent.getChildIndex(this);
            this._parent.addChildAt(target, index);
            target.relations.copyFrom(this.relations);
            this._parent.removeChild(this, true);
        };
        GGraph.prototype.addBeforeMe = function (target) {
            if (this._parent == null)
                throw "parent not set";
            var index = this._parent.getChildIndex(this);
            this._parent.addChildAt(target, index);
        };
        GGraph.prototype.addAfterMe = function (target) {
            if (this._parent == null)
                throw "parent not set";
            var index = this._parent.getChildIndex(this);
            index++;
            this._parent.addChildAt(target, index);
        };
        GGraph.prototype.setNativeObject = function (obj) {
            this.delayCreateDisplayObject();
            (this.displayObject).addChild(obj);
        };
        GGraph.prototype.delayCreateDisplayObject = function () {
            if (!this.displayObject) {
                var sprite = new fairygui.UISprite();
                sprite["$owner"] = this;
                this.setDisplayObject(sprite);
                if (this._parent)
                    this._parent.childStateChanged(this);
                this.handleXYChanged();
                sprite.alpha = this.alpha;
                sprite.rotation = this.rotation;
                sprite.visible = this.visible;
                sprite.touchEnabled = this.touchable;
                sprite.touchChildren = this.touchable;
                sprite.hitArea = new egret.Rectangle(0, 0, this.width, this.height);
            }
            else {
                (this.displayObject).graphics.clear();
                (this.displayObject).removeChildren();
                this._graphics = null;
            }
        };
        GGraph.prototype.handleSizeChanged = function () {
            if (this._graphics) {
                if (this._type != 0)
                    this.drawCommon();
            }
            if (this.displayObject instanceof fairygui.UISprite) {
                if ((this.displayObject).hitArea == null)
                    (this.displayObject).hitArea = new egret.Rectangle(0, 0, this.width, this.height);
                else {
                    (this.displayObject).hitArea.width = this.width;
                    (this.displayObject).hitArea.height = this.height;
                }
            }
        };
        GGraph.prototype.setup_beforeAdd = function (buffer, beginPos) {
            buffer.seek(beginPos, 5);
            var type = buffer.readByte();
            if (type != 0) {
                this._lineSize = buffer.readInt();
                var c = buffer.readColor(true);
                this._lineColor = c & 0xFFFFFF;
                this._lineAlpha = ((c >> 24) & 0xFF) / 0xFF;
                c = buffer.readColor(true);
                this._fillColor = c & 0xFFFFFF;
                this._fillAlpha = ((c >> 24) & 0xFF) / 0xFF;
                if (buffer.readBool()) {
                    this._cornerRadius = new Array(4);
                    for (var i = 0; i < 4; i++)
                        this._cornerRadius[i] = buffer.readFloat();
                }
                var sprite = new fairygui.UISprite();
                sprite["$owner"] = this;
                this.setDisplayObject(sprite);
            }
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            if (this.displayObject != null) {
                this._graphics = (this.displayObject).graphics;
                this._type = type;
                this.drawCommon();
            }
        };
        return GGraph;
    }(fairygui.GObject));
    fairygui.GGraph = GGraph;
    __reflect(GGraph.prototype, "fairygui.GGraph");
})(fairygui || (fairygui = {}));
