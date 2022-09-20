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
    var GLoader = (function (_super) {
        __extends(GLoader, _super);
        function GLoader() {
            var _this = _super.call(this) || this;
            _this._color = 0;
            _this._contentSourceWidth = 0;
            _this._contentSourceHeight = 0;
            _this._contentWidth = 0;
            _this._contentHeight = 0;
            _this._url = "";
            _this._fill = fairygui.LoaderFillType.None;
            _this._align = fairygui.AlignType.Left;
            _this._verticalAlign = fairygui.VertAlignType.Top;
            _this._showErrorSign = true;
            _this._color = 0xFFFFFF;
            return _this;
        }
        GLoader.prototype.createDisplayObject = function () {
            this._container = new fairygui.UIContainer();
            this._container["$owner"] = this;
            this._container.hitArea = new egret.Rectangle();
            this.setDisplayObject(this._container);
            this._content = new fairygui.MovieClip();
            this._container.addChild(this._content);
        };
        GLoader.prototype.dispose = function () {
            if (this._contentItem == null) {
                var texture = this._content.texture;
                if (texture != null)
                    this.freeExternal(texture);
            }
            if (this._content2 != null)
                this._content2.dispose();
            _super.prototype.dispose.call(this);
        };
        Object.defineProperty(GLoader.prototype, "url", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                if (this._url == value)
                    return;
                //清除旧的url加载的资源
                this.clearContent();
                this._url = value;
                this.loadContent();
                this.updateGear(7);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLoader.prototype, "icon", {
            get: function () {
                return this._url;
            },
            set: function (value) {
                this.url = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLoader.prototype, "align", {
            get: function () {
                return this._align;
            },
            set: function (value) {
                if (this._align != value) {
                    this._align = value;
                    this.updateLayout();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLoader.prototype, "verticalAlign", {
            get: function () {
                return this._verticalAlign;
            },
            set: function (value) {
                if (this._verticalAlign != value) {
                    this._verticalAlign = value;
                    this.updateLayout();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLoader.prototype, "fill", {
            get: function () {
                return this._fill;
            },
            set: function (value) {
                if (this._fill != value) {
                    this._fill = value;
                    this.updateLayout();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLoader.prototype, "shrinkOnly", {
            get: function () {
                return this._shrinkOnly;
            },
            set: function (value) {
                if (this._shrinkOnly != value) {
                    this._shrinkOnly = value;
                    this.updateLayout();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLoader.prototype, "autoSize", {
            get: function () {
                return this._autoSize;
            },
            set: function (value) {
                if (this._autoSize != value) {
                    this._autoSize = value;
                    this.updateLayout();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLoader.prototype, "playing", {
            get: function () {
                return this._content.playing;
            },
            set: function (value) {
                if (this._content.playing != value) {
                    this._content.playing = value;
                    this.updateGear(5);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLoader.prototype, "frame", {
            get: function () {
                return this._content.frame;
            },
            set: function (value) {
                if (this._content.frame != value) {
                    this._content.frame = value;
                    this.updateGear(5);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLoader.prototype, "timeScale", {
            get: function () {
                return this._content.timeScale;
            },
            set: function (value) {
                this._content.timeScale = value;
            },
            enumerable: true,
            configurable: true
        });
        GLoader.prototype.advance = function (timeInMiniseconds) {
            this._content.advance(timeInMiniseconds);
        };
        Object.defineProperty(GLoader.prototype, "color", {
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
        GLoader.prototype.applyColor = function () {
            //todo:
        };
        Object.defineProperty(GLoader.prototype, "showErrorSign", {
            get: function () {
                return this._showErrorSign;
            },
            set: function (value) {
                this._showErrorSign = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLoader.prototype, "content", {
            get: function () {
                return this._content;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLoader.prototype, "component", {
            get: function () {
                return this._content2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLoader.prototype, "texture", {
            get: function () {
                return this._content.texture;
            },
            set: function (value) {
                this.url = null;
                this._content.frames = null;
                this._content.texture = value;
                if (value != null) {
                    this._contentSourceWidth = value.textureWidth;
                    this._contentSourceHeight = value.textureHeight;
                }
                else {
                    this._contentSourceWidth = this._contentHeight = 0;
                }
                this.updateLayout();
            },
            enumerable: true,
            configurable: true
        });
        GLoader.prototype.loadContent = function () {
            //this.clearContent();
            if (!this._url)
                return;
            if (fairygui.ToolSet.startsWith(this._url, "ui://"))
                this.loadFromPackage(this._url);
            else
                this.loadExternal();
        };
        GLoader.prototype.loadFromPackage = function (itemURL) {
            this._contentItem = fairygui.UIPackage.getItemByURL(itemURL);
            if (this._contentItem != null) {
                this._contentItem.load();
                if (this._autoSize)
                    this.setSize(this._contentItem.width, this._contentItem.height);
                if (this._contentItem.type == fairygui.PackageItemType.Image) {
                    if (this._contentItem.texture == null) {
                        this.setErrorState();
                    }
                    else {
                        this._content.texture = this._contentItem.texture;
                        this._content.scale9Grid = this._contentItem.scale9Grid;
                        if (this._contentItem.scaleByTile)
                            this._content.fillMode = egret.BitmapFillMode.REPEAT;
                        else
                            this._content.fillMode = egret.BitmapFillMode.SCALE;
                        this._contentSourceWidth = this._contentItem.width;
                        this._contentSourceHeight = this._contentItem.height;
                        this.updateLayout();
                    }
                }
                else if (this._contentItem.type == fairygui.PackageItemType.MovieClip) {
                    this._contentSourceWidth = this._contentItem.width;
                    this._contentSourceHeight = this._contentItem.height;
                    this._content.interval = this._contentItem.interval;
                    this._content.swing = this._contentItem.swing;
                    this._content.repeatDelay = this._contentItem.repeatDelay;
                    this._content.frames = this._contentItem.frames;
                    this.updateLayout();
                }
                else if (this._contentItem.type == fairygui.PackageItemType.Component) {
                    var obj = fairygui.UIPackage.createObjectFromURL(itemURL);
                    if (!obj)
                        this.setErrorState();
                    else if (!(obj instanceof fairygui.GComponent)) {
                        obj.dispose();
                        this.setErrorState();
                    }
                    else {
                        this._content2 = obj.asCom;
                        this._container.addChild(this._content2.displayObject);
                        this._contentSourceWidth = this._contentItem.width;
                        this._contentSourceHeight = this._contentItem.height;
                        this.updateLayout();
                    }
                }
                else
                    this.setErrorState();
            }
            else
                this.setErrorState();
        };
        GLoader.prototype.loadExternal = function () {
            RES.getResAsync(this._url, this.__getResCompleted, this);
        };
        GLoader.prototype.freeExternal = function (texture) {
        };
        GLoader.prototype.onExternalLoadSuccess = function (texture) {
            this._content.texture = texture;
            this._content.scale9Grid = null;
            this._content.fillMode = egret.BitmapFillMode.SCALE;
            this._contentSourceWidth = texture.textureWidth;
            this._contentSourceHeight = texture.textureHeight;
            this.updateLayout();
        };
        GLoader.prototype.onExternalLoadFailed = function () {
            this.setErrorState();
        };
        GLoader.prototype.__getResCompleted = function (res, key) {
            if (res instanceof egret.Texture)
                this.onExternalLoadSuccess(res);
            else
                this.onExternalLoadFailed();
        };
        GLoader.prototype.setErrorState = function () {
            if (!this._showErrorSign)
                return;
            if (this._errorSign == null) {
                if (fairygui.UIConfig.loaderErrorSign != null) {
                    this._errorSign = GLoader._errorSignPool.getObject(fairygui.UIConfig.loaderErrorSign);
                }
            }
            if (this._errorSign != null) {
                this._errorSign.setSize(this.width, this.height);
                this._container.addChild(this._errorSign.displayObject);
            }
        };
        GLoader.prototype.clearErrorState = function () {
            if (this._errorSign != null) {
                this._container.removeChild(this._errorSign.displayObject);
                GLoader._errorSignPool.returnObject(this._errorSign);
                this._errorSign = null;
            }
        };
        GLoader.prototype.updateLayout = function () {
            if (this._content2 == null && this._content == null) {
                if (this._autoSize) {
                    this._updatingLayout = true;
                    this.setSize(50, 30);
                    this._updatingLayout = false;
                }
                return;
            }
            this._contentWidth = this._contentSourceWidth;
            this._contentHeight = this._contentSourceHeight;
            if (this._autoSize) {
                this._updatingLayout = true;
                if (this._contentWidth == 0)
                    this._contentWidth = 50;
                if (this._contentHeight == 0)
                    this._contentHeight = 30;
                this.setSize(this._contentWidth, this._contentHeight);
                this._updatingLayout = false;
                if (this._contentWidth == this._width && this._contentHeight == this._height) {
                    if (this._content2 != null) {
                        this._content2.setXY(0, 0);
                        this._content2.setScale(1, 1);
                    }
                    else {
                        this._content.x = 0;
                        this._content.y = 0;
                        this._content.width = this._contentWidth;
                        this._content.height = this._contentHeight;
                    }
                    return;
                }
            }
            var sx = 1, sy = 1;
            if (this._fill != fairygui.LoaderFillType.None) {
                sx = this.width / this._contentSourceWidth;
                sy = this.height / this._contentSourceHeight;
                if (sx != 1 || sy != 1) {
                    if (this._fill == fairygui.LoaderFillType.ScaleMatchHeight)
                        sx = sy;
                    else if (this._fill == fairygui.LoaderFillType.ScaleMatchWidth)
                        sy = sx;
                    else if (this._fill == fairygui.LoaderFillType.Scale) {
                        if (sx > sy)
                            sx = sy;
                        else
                            sy = sx;
                    }
                    else if (this._fill == fairygui.LoaderFillType.ScaleNoBorder) {
                        if (sx > sy)
                            sy = sx;
                        else
                            sx = sy;
                    }
                    if (this._shrinkOnly) {
                        if (sx > 1)
                            sx = 1;
                        if (sy > 1)
                            sy = 1;
                    }
                    this._contentWidth = this._contentSourceWidth * sx;
                    this._contentHeight = this._contentSourceHeight * sy;
                }
            }
            if (this._content2 != null) {
                this._content2.setScale(sx, sy);
            }
            else {
                this._content.width = this._contentWidth;
                this._content.height = this._contentHeight;
            }
            var nx, ny;
            if (this._align == fairygui.AlignType.Center)
                nx = Math.floor((this.width - this._contentWidth) / 2);
            else if (this._align == fairygui.AlignType.Right)
                nx = this.width - this._contentWidth;
            else
                nx = 0;
            if (this._verticalAlign == fairygui.VertAlignType.Middle)
                ny = Math.floor((this.height - this._contentHeight) / 2);
            else if (this._verticalAlign == fairygui.VertAlignType.Bottom)
                ny = this.height - this._contentHeight;
            else
                ny = 0;
            if (this._content2 != null)
                this._content2.setXY(nx, ny);
            else {
                this._content.x = nx;
                this._content.y = ny;
            }
        };
        GLoader.prototype.clearContent = function () {
            this.clearErrorState();
            if (this._contentItem == null && this._content.texture != null) {
                this.freeExternal(this._content.texture);
            }
            this._content.texture = null;
            this._content.frames = null;
            if (this._content2 != null) {
                this._container.removeChild(this._content2.displayObject);
                this._content2.dispose();
                this._content2 = null;
            }
            this._contentItem = null;
        };
        GLoader.prototype.handleSizeChanged = function () {
            if (!this._updatingLayout)
                this.updateLayout();
            this._container.hitArea.setTo(0, 0, this.width, this.height);
        };
        GLoader.prototype.setup_beforeAdd = function (buffer, beginPos) {
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            buffer.seek(beginPos, 5);
            this._url = buffer.readS();
            this._align = buffer.readByte();
            this._verticalAlign = buffer.readByte();
            this._fill = buffer.readByte();
            this._shrinkOnly = buffer.readBool();
            this._autoSize = buffer.readBool();
            this._showErrorSign = buffer.readBool();
            this._content.playing = buffer.readBool();
            this._content.frame = buffer.readInt();
            if (buffer.readBool())
                this.color = buffer.readColor();
            var fillMethod = buffer.readByte();
            if (fillMethod != 0)
                buffer.skip(6);
            if (this._url)
                this.loadContent();
        };
        GLoader._errorSignPool = new fairygui.GObjectPool();
        return GLoader;
    }(fairygui.GObject));
    fairygui.GLoader = GLoader;
    __reflect(GLoader.prototype, "fairygui.GLoader");
})(fairygui || (fairygui = {}));
