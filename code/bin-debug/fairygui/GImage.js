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
    var GImage = (function (_super) {
        __extends(GImage, _super);
        function GImage() {
            var _this = _super.call(this) || this;
            _this._fillMethod = fairygui.FillMethod.None;
            _this._fillOrigin = fairygui.FillOrigin.Left;
            _this._fillAmount = 100;
            _this._fillClockwise = false;
            _this.fillStart = 0;
            _this._color = 0xFFFFFF;
            _this._flip = fairygui.FlipType.None;
            return _this;
        }
        GImage.prototype.getColorMatrix = function () {
            if (this._matrix)
                return this._matrix;
            var filters = this.filters;
            if (filters) {
                for (var i = 0; i < filters.length; i++) {
                    if (egret.is(filters[i], "egret.ColorMatrixFilter")) {
                        this._matrix = filters[i];
                        return this._matrix;
                    }
                }
            }
            var cmf = new egret.ColorMatrixFilter();
            this._matrix = cmf;
            filters = filters || [];
            filters.push(cmf);
            this.filters = filters;
            return cmf;
        };
        Object.defineProperty(GImage.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                if (this._color != value) {
                    this._color = value;
                    this.updateGear(4);
                    this.applyColor();
                }
            },
            enumerable: true,
            configurable: true
        });
        GImage.prototype.applyColor = function () {
            var cfm = this.getColorMatrix();
            var matrix = cfm.matrix;
            matrix[0] = ((this._color >> 16) & 0xFF) / 255;
            matrix[6] = ((this._color >> 8) & 0xFF) / 255;
            matrix[12] = (this._color & 0xFF) / 255;
            cfm.matrix = matrix;
        };
        Object.defineProperty(GImage.prototype, "flip", {
            get: function () {
                return this._flip;
            },
            set: function (value) {
                if (this._flip != value) {
                    this._flip = value;
                    this._content.scaleX = this._content.scaleY = 1;
                    if (this._flip == fairygui.FlipType.Horizontal || this._flip == fairygui.FlipType.Both)
                        this._content.scaleX = -1;
                    if (this._flip == fairygui.FlipType.Vertical || this._flip == fairygui.FlipType.Both)
                        this._content.scaleY = -1;
                    this.handleXYChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GImage.prototype, "fillMethod", {
            get: function () {
                return this._fillMethod;
            },
            set: function (value) {
                if (this._fillMethod != value) {
                    this._fillMethod = value;
                    if (this._fillMethod != 0) {
                        this.setupFill();
                    }
                    else {
                        var mask = this._content.mask;
                        this._content.mask = null;
                        if (mask instanceof egret.Shape) {
                            if (mask.parent) {
                                mask.parent.removeChild(mask);
                            }
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GImage.prototype, "fillOrigin", {
            get: function () {
                return this._fillOrigin;
            },
            set: function (value) {
                if (this._fillOrigin != value) {
                    this._fillOrigin = value;
                    if (this._fillMethod != 0) {
                        this.setupFill();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GImage.prototype, "fillClockwise", {
            get: function () {
                return this._fillClockwise;
            },
            set: function (value) {
                if (this._fillClockwise != value) {
                    this._fillClockwise = value;
                    if (this._fillMethod != 0) {
                        this.setupFill();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GImage.prototype, "fillAmount", {
            get: function () {
                return this._fillAmount;
            },
            set: function (value) {
                if (this._fillAmount != value) {
                    this._fillAmount = fairygui.ToolSet.clamp(value, 0, 100);
                    if (this._fillMethod != 0) {
                        this.setupFill();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GImage.prototype, "texture", {
            get: function () {
                return this._content.texture;
            },
            set: function (value) {
                if (value != null) {
                    this.sourceWidth = value.textureWidth;
                    this.sourceHeight = value.textureHeight;
                }
                else {
                    this.sourceWidth = 0;
                    this.sourceHeight = 0;
                }
                this.initWidth = this.sourceWidth;
                this.initHeight = this.sourceHeight;
                this._content.scale9Grid = null;
                this._content.fillMode = egret.BitmapFillMode.SCALE;
                this._content.texture = value;
            },
            enumerable: true,
            configurable: true
        });
        GImage.prototype.createDisplayObject = function () {
            this._content = new egret.Bitmap();
            this._content["$owner"] = this;
            this._content.touchEnabled = false;
            this.setDisplayObject(this._content);
        };
        GImage.prototype.setupFill = function () {
            var mask = this._content.mask;
            var width = this._content.width;
            var height = this._content.height;
            if (this._fillMethod == fairygui.FillMethod.Horizontal || this._fillMethod == fairygui.FillMethod.Vertical) {
                if (!mask || mask instanceof egret.DisplayObject) {
                    mask = new egret.Rectangle(0, 0, width, height);
                }
                if (this._fillMethod == fairygui.FillMethod.Horizontal) {
                    mask.y = 0;
                    if (this._fillOrigin == fairygui.FillOrigin.Top) {
                        mask.x = width * (this._fillAmount / 100 - 1);
                    }
                    else {
                        mask.x = width * (1 - this._fillAmount / 100);
                    }
                }
                else {
                    mask.x = 0;
                    if (this._fillOrigin == fairygui.FillOrigin.Top) {
                        mask.y = height * (this._fillAmount / 100 - 1);
                    }
                    else {
                        mask.y = height * (1 - this._fillAmount / 100);
                    }
                }
            }
            else if (this._fillMethod != fairygui.FillMethod.None && this._content.parent) {
                if (!mask || mask instanceof egret.Rectangle) {
                    mask = new egret.Shape();
                    this._content.parent.addChild(mask);
                    mask.x = this.x;
                    mask.y = this.y;
                }
                width = this.scaleX * width;
                height = this.scaleY * height;
                fairygui.GraphicsHelper.fillImage(this._fillMethod, this._fillAmount, this._fillOrigin, this._fillClockwise, mask.graphics, width, height);
            }
            this._content.mask = mask;
        };
        GImage.prototype.removeFromParent = function () {
            if (this._fillMethod != fairygui.FillMethod.None) {
                var mask = this._content.mask;
                if (mask instanceof egret.Shape) {
                    if (mask.parent) {
                        mask.parent.removeChild(mask);
                    }
                }
            }
            _super.prototype.removeFromParent.call(this);
        };
        GImage.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        GImage.prototype.constructFromResource = function () {
            this.sourceWidth = this.packageItem.width;
            this.sourceHeight = this.packageItem.height;
            this.initWidth = this.sourceWidth;
            this.initHeight = this.sourceHeight;
            this._content.scale9Grid = this.packageItem.scale9Grid;
            this._content.smoothing = this.packageItem.smoothing;
            if (this.packageItem.scaleByTile)
                this._content.fillMode = egret.BitmapFillMode.REPEAT;
            this.setSize(this.sourceWidth, this.sourceHeight);
            this.packageItem.load();
            this._content.texture = this.packageItem.texture;
        };
        GImage.prototype.handleXYChanged = function () {
            _super.prototype.handleXYChanged.call(this);
            if (this._fillMethod != fairygui.FillMethod.None) {
                var mask = this._content.mask;
                if (mask instanceof egret.Shape) {
                    mask.x = this._content.x;
                    mask.y = this._content.y;
                }
            }
            if (this._flip != fairygui.FlipType.None) {
                if (this._content.scaleX == -1)
                    this._content.x += this.width;
                if (this._content.scaleY == -1)
                    this._content.y += this.height;
            }
        };
        GImage.prototype.setup_beforeAdd = function (buffer, beginPos) {
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            buffer.seek(beginPos, 5);
            if (buffer.readBool())
                this.color = buffer.readColor();
            this.flip = buffer.readByte();
            this._fillMethod = buffer.readByte();
            if (this._fillMethod != 0) {
                this._fillOrigin = buffer.readByte();
                this._fillClockwise = buffer.readBool();
                this.fillAmount = buffer.readFloat();
            }
        };
        return GImage;
    }(fairygui.GObject));
    fairygui.GImage = GImage;
    __reflect(GImage.prototype, "fairygui.GImage");
})(fairygui || (fairygui = {}));
