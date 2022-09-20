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
    var GObject = (function (_super) {
        __extends(GObject, _super);
        function GObject() {
            var _this = _super.call(this) || this;
            _this._x = 0;
            _this._y = 0;
            _this._alpha = 1;
            _this._rotation = 0;
            _this._visible = true;
            _this._touchable = true;
            _this._grayed = false;
            _this._draggable = false;
            _this._scaleX = 1;
            _this._scaleY = 1;
            _this._skewX = 0;
            _this._skewY = 0;
            _this._pivotX = 0;
            _this._pivotY = 0;
            _this._pivotAsAnchor = false;
            _this._pivotOffsetX = 0;
            _this._pivotOffsetY = 0;
            _this._sortingOrder = 0;
            _this._internalVisible = true;
            _this._handlingController = false;
            _this._focusable = false;
            _this._pixelSnapping = false;
            _this._disposed = false;
            _this.sourceWidth = 0;
            _this.sourceHeight = 0;
            _this.initWidth = 0;
            _this.initHeight = 0;
            _this.minWidth = 0;
            _this.minHeight = 0;
            _this.maxWidth = 0;
            _this.maxHeight = 0;
            _this._width = 0;
            _this._height = 0;
            _this._rawWidth = 0;
            _this._rawHeight = 0;
            _this._sizePercentInGroup = 0;
            _this._id = "" + GObject._gInstanceCounter++;
            _this._name = "";
            _this.createDisplayObject();
            _this._relations = new fairygui.Relations(_this);
            _this._gears = [];
            return _this;
        }
        Object.defineProperty(GObject.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this.setXY(value, this._y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this.setXY(this._x, value);
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.setXY = function (xv, yv) {
            if (this._x != xv || this._y != yv) {
                var dx = xv - this._x;
                var dy = yv - this._y;
                this._x = xv;
                this._y = yv;
                this.handleXYChanged();
                if (this instanceof fairygui.GGroup)
                    this.moveChildren(dx, dy);
                this.updateGear(1);
                if (this._parent && !(this._parent instanceof fairygui.GList)) {
                    this._parent.setBoundsChangedFlag();
                    if (this._group != null)
                        this._group.setBoundsChangedFlag();
                    this.dispatchEventWith(GObject.XY_CHANGED);
                }
                if (GObject.draggingObject == this && !GObject.sUpdateInDragging)
                    this.localToGlobalRect(0, 0, this.width, this.height, GObject.sGlobalRect);
            }
        };
        Object.defineProperty(GObject.prototype, "xMin", {
            get: function () {
                return this._pivotAsAnchor ? (this._x - this._width * this._pivotX) : this._x;
            },
            set: function (value) {
                if (this._pivotAsAnchor)
                    this.setXY(value + this._width * this._pivotX, this._y);
                else
                    this.setXY(value, this._y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "yMin", {
            get: function () {
                return this._pivotAsAnchor ? (this._y - this._height * this._pivotY) : this._y;
            },
            set: function (value) {
                if (this._pivotAsAnchor)
                    this.setXY(this._x, value + this._height * this._pivotY);
                else
                    this.setXY(this._x, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "pixelSnapping", {
            get: function () {
                return this._pixelSnapping;
            },
            set: function (value) {
                if (this._pixelSnapping != value) {
                    this._pixelSnapping = value;
                    this.handleXYChanged();
                }
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.center = function (restraint) {
            if (restraint === void 0) { restraint = false; }
            var r;
            if (this._parent != null)
                r = this.parent;
            else
                r = this.root;
            this.setXY((r.width - this.width) / 2, (r.height - this.height) / 2);
            if (restraint) {
                this.addRelation(r, fairygui.RelationType.Center_Center);
                this.addRelation(r, fairygui.RelationType.Middle_Middle);
            }
        };
        Object.defineProperty(GObject.prototype, "width", {
            get: function () {
                this.ensureSizeCorrect();
                if (this._relations.sizeDirty)
                    this._relations.ensureRelationsSizeCorrect();
                return this._width;
            },
            set: function (value) {
                this.setSize(value, this._rawHeight);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "height", {
            get: function () {
                this.ensureSizeCorrect();
                if (this._relations.sizeDirty)
                    this._relations.ensureRelationsSizeCorrect();
                return this._height;
            },
            set: function (value) {
                this.setSize(this._rawWidth, value);
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.setSize = function (wv, hv, ignorePivot) {
            if (ignorePivot === void 0) { ignorePivot = false; }
            if (this._rawWidth != wv || this._rawHeight != hv) {
                this._rawWidth = wv;
                this._rawHeight = hv;
                if (wv < this.minWidth)
                    wv = this.minWidth;
                if (hv < this.minHeight)
                    hv = this.minHeight;
                if (this.maxWidth > 0 && wv > this.maxWidth)
                    wv = this.maxWidth;
                if (this.maxHeight > 0 && hv > this.maxHeight)
                    hv = this.maxHeight;
                var dWidth = wv - this._width;
                var dHeight = hv - this._height;
                this._width = wv;
                this._height = hv;
                this.handleSizeChanged();
                if (this._pivotX != 0 || this._pivotY != 0) {
                    if (!this._pivotAsAnchor) {
                        if (!ignorePivot)
                            this.setXY(this.x - this._pivotX * dWidth, this.y - this._pivotY * dHeight);
                        this.updatePivotOffset();
                    }
                    else {
                        this.applyPivot();
                    }
                }
                if (this instanceof fairygui.GGroup)
                    this.resizeChildren(dWidth, dHeight);
                this.updateGear(2);
                if (this._parent) {
                    this._relations.onOwnerSizeChanged(dWidth, dHeight, this._pivotAsAnchor || !ignorePivot);
                    this._parent.setBoundsChangedFlag();
                    if (this._group != null)
                        this._group.setBoundsChangedFlag(true);
                }
                this.dispatchEventWith(GObject.SIZE_CHANGED);
            }
        };
        GObject.prototype.ensureSizeCorrect = function () {
        };
        Object.defineProperty(GObject.prototype, "actualWidth", {
            get: function () {
                return this.width * Math.abs(this._scaleX);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "actualHeight", {
            get: function () {
                return this.height * Math.abs(this._scaleY);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "scaleX", {
            get: function () {
                return this._scaleX;
            },
            set: function (value) {
                this.setScale(value, this._scaleY);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "scaleY", {
            get: function () {
                return this._scaleY;
            },
            set: function (value) {
                this.setScale(this._scaleX, value);
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.setScale = function (sx, sy) {
            if (this._scaleX != sx || this._scaleY != sy) {
                this._scaleX = sx;
                this._scaleY = sy;
                this.handleScaleChanged();
                this.applyPivot();
                this.updateGear(2);
            }
        };
        Object.defineProperty(GObject.prototype, "skewX", {
            get: function () {
                return this._skewX;
            },
            set: function (value) {
                this.setSkew(value, this._skewY);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "skewY", {
            get: function () {
                return this._skewY;
            },
            set: function (value) {
                this.setSkew(this._skewX, value);
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.setSkew = function (xv, yv) {
            if (this._skewX != xv || this._skewY != yv) {
                this._skewX = xv;
                this._skewY = yv;
                if (this._displayObject != null) {
                    this._displayObject.skewX = xv;
                    this._displayObject.skewY = yv;
                }
                this.applyPivot();
            }
        };
        Object.defineProperty(GObject.prototype, "pivotX", {
            get: function () {
                return this._pivotX;
            },
            set: function (value) {
                this.setPivot(value, this._pivotY);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "pivotY", {
            get: function () {
                return this._pivotY;
            },
            set: function (value) {
                this.setPivot(this._pivotX, value);
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.setPivot = function (xv, yv, asAnchor) {
            if (yv === void 0) { yv = 0; }
            if (asAnchor === void 0) { asAnchor = false; }
            if (this._pivotX != xv || this._pivotY != yv || this._pivotAsAnchor != asAnchor) {
                this._pivotX = xv;
                this._pivotY = yv;
                this._pivotAsAnchor = asAnchor;
                this.updatePivotOffset();
                this.handleXYChanged();
            }
        };
        Object.defineProperty(GObject.prototype, "pivotAsAnchor", {
            get: function () {
                return this._pivotAsAnchor;
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.internalSetPivot = function (xv, yv, asAnchor) {
            if (yv === void 0) { yv = 0; }
            this._pivotX = xv;
            this._pivotY = yv;
            this._pivotAsAnchor = asAnchor;
            if (asAnchor)
                this.handleXYChanged();
        };
        GObject.prototype.updatePivotOffset = function () {
            if (this._displayObject != null) {
                if (this._pivotX != 0 || this._pivotY != 0) {
                    var px = this._pivotX * this._width;
                    var py = this._pivotY * this._height;
                    var pt = this._displayObject.matrix.transformPoint(px, py, GObject.sHelperPoint);
                    this._pivotOffsetX = this._pivotX * this._width - (pt.x - this._displayObject.x);
                    this._pivotOffsetY = this._pivotY * this._height - (pt.y - this._displayObject.y);
                }
                else {
                    this._pivotOffsetX = 0;
                    this._pivotOffsetY = 0;
                }
            }
        };
        GObject.prototype.applyPivot = function () {
            if (this._pivotX != 0 || this._pivotY != 0) {
                this.updatePivotOffset();
                this.handleXYChanged();
            }
        };
        Object.defineProperty(GObject.prototype, "touchable", {
            get: function () {
                return this._touchable;
            },
            set: function (value) {
                if (this._touchable != value) {
                    this._touchable = value;
                    this.updateGear(3);
                    if ((this instanceof fairygui.GImage) || (this instanceof fairygui.GMovieClip)
                        || (this instanceof fairygui.GTextField) && !(this instanceof fairygui.GTextInput) && !(this instanceof fairygui.GRichTextField))
                        //Touch is not supported by GImage/GMovieClip/GTextField
                        return;
                    if (this._displayObject != null) {
                        this._displayObject.touchEnabled = this._touchable;
                        if (this._displayObject instanceof egret.DisplayObjectContainer)
                            this._displayObject.touchChildren = this._touchable;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "grayed", {
            get: function () {
                return this._grayed;
            },
            set: function (value) {
                if (this._grayed != value) {
                    this._grayed = value;
                    this.handleGrayedChanged();
                    this.updateGear(3);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "enabled", {
            get: function () {
                return !this._grayed && this._touchable;
            },
            set: function (value) {
                this.grayed = !value;
                this.touchable = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "rotation", {
            get: function () {
                return this._rotation;
            },
            set: function (value) {
                if (this._rotation != value) {
                    this._rotation = value;
                    if (this._displayObject)
                        this._displayObject.rotation = this.normalizeRotation;
                    this.applyPivot();
                    this.updateGear(3);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "normalizeRotation", {
            get: function () {
                var rot = this._rotation % 360;
                if (rot > 180)
                    rot -= 360;
                else if (rot < -180)
                    rot += 360;
                return rot;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                if (this._alpha != value) {
                    this._alpha = value;
                    this.handleAlphaChanged();
                    this.updateGear(3);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                if (this._visible != value) {
                    this._visible = value;
                    this.handleVisibleChanged();
                    if (this._parent)
                        this._parent.setBoundsChangedFlag();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "internalVisible", {
            get: function () {
                return this._internalVisible && (!this._group || this._group.internalVisible);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "internalVisible2", {
            get: function () {
                return this._visible && (!this._group || this._group.internalVisible2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "sortingOrder", {
            get: function () {
                return this._sortingOrder;
            },
            set: function (value) {
                if (value < 0)
                    value = 0;
                if (this._sortingOrder != value) {
                    var old = this._sortingOrder;
                    this._sortingOrder = value;
                    if (this._parent != null)
                        this._parent.childSortingOrderChanged(this, old, this._sortingOrder);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "focusable", {
            get: function () {
                return this._focusable;
            },
            set: function (value) {
                this._focusable = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "focused", {
            get: function () {
                return this.root.focus == this;
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.requestFocus = function () {
            var p = this;
            while (p && !p._focusable)
                p = p.parent;
            if (p != null)
                this.root.focus = p;
        };
        Object.defineProperty(GObject.prototype, "tooltips", {
            get: function () {
                return this._tooltips;
            },
            set: function (value) {
                this._tooltips = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "blendMode", {
            get: function () {
                return this._displayObject.blendMode;
            },
            set: function (value) {
                this._displayObject.blendMode = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "filters", {
            get: function () {
                return this._displayObject.filters;
            },
            set: function (value) {
                this._displayObject.filters = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "inContainer", {
            get: function () {
                return this._displayObject != null && this._displayObject.parent != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "onStage", {
            get: function () {
                return this._displayObject != null && this._displayObject.stage != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "resourceURL", {
            get: function () {
                if (this.packageItem != null)
                    return "ui://" + this.packageItem.owner.id + this.packageItem.id;
                else
                    return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "group", {
            get: function () {
                return this._group;
            },
            set: function (value) {
                if (this._group != value) {
                    if (this._group != null)
                        this._group.setBoundsChangedFlag(true);
                    this._group = value;
                    if (this._group != null)
                        this._group.setBoundsChangedFlag(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.getGear = function (index) {
            var gear = this._gears[index];
            if (gear == null) {
                switch (index) {
                    case 0:
                        gear = new fairygui.GearDisplay(this);
                        break;
                    case 1:
                        gear = new fairygui.GearXY(this);
                        break;
                    case 2:
                        gear = new fairygui.GearSize(this);
                        break;
                    case 3:
                        gear = new fairygui.GearLook(this);
                        break;
                    case 4:
                        gear = new fairygui.GearColor(this);
                        break;
                    case 5:
                        gear = new fairygui.GearAnimation(this);
                        break;
                    case 6:
                        gear = new fairygui.GearText(this);
                        break;
                    case 7:
                        gear = new fairygui.GearIcon(this);
                        break;
                    default:
                        throw "FairyGUI: invalid gear index!";
                }
                this._gears[index] = gear;
            }
            return gear;
        };
        GObject.prototype.updateGear = function (index) {
            if (this._underConstruct || this._gearLocked)
                return;
            var gear = this._gears[index];
            if (gear != null && gear.controller != null)
                gear.updateState();
        };
        GObject.prototype.checkGearController = function (index, c) {
            return this._gears[index] != null && this._gears[index].controller == c;
        };
        GObject.prototype.updateGearFromRelations = function (index, dx, dy) {
            if (this._gears[index] != null)
                this._gears[index].updateFromRelations(dx, dy);
        };
        GObject.prototype.addDisplayLock = function () {
            var gearDisplay = this._gears[0];
            if (gearDisplay && gearDisplay.controller) {
                var ret = gearDisplay.addLock();
                this.checkGearDisplay();
                return ret;
            }
            else
                return 0;
        };
        GObject.prototype.releaseDisplayLock = function (token) {
            var gearDisplay = this._gears[0];
            if (gearDisplay && gearDisplay.controller) {
                gearDisplay.releaseLock(token);
                this.checkGearDisplay();
            }
        };
        GObject.prototype.checkGearDisplay = function () {
            if (this._handlingController)
                return;
            var connected = this._gears[0] == null || this._gears[0].connected;
            if (connected != this._internalVisible) {
                this._internalVisible = connected;
                if (this._parent)
                    this._parent.childStateChanged(this);
            }
        };
        Object.defineProperty(GObject.prototype, "gearXY", {
            get: function () {
                return this.getGear(1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "gearSize", {
            get: function () {
                return this.getGear(2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "gearLook", {
            get: function () {
                return this.getGear(3);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "relations", {
            get: function () {
                return this._relations;
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.addRelation = function (target, relationType, usePercent) {
            if (usePercent === void 0) { usePercent = false; }
            this._relations.add(target, relationType, usePercent);
        };
        GObject.prototype.removeRelation = function (target, relationType) {
            if (relationType === void 0) { relationType = 0; }
            this._relations.remove(target, relationType);
        };
        Object.defineProperty(GObject.prototype, "displayObject", {
            get: function () {
                return this._displayObject;
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.setDisplayObject = function (value) {
            this._displayObject = value;
        };
        Object.defineProperty(GObject.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (val) {
                this._parent = val;
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.removeFromParent = function () {
            if (this._parent)
                this._parent.removeChild(this);
        };
        Object.defineProperty(GObject.prototype, "root", {
            get: function () {
                if (this instanceof fairygui.GRoot)
                    return this;
                var p = this._parent;
                while (p) {
                    if (p instanceof fairygui.GRoot)
                        return p;
                    p = p.parent;
                }
                return fairygui.GRoot.inst;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asCom", {
            get: function () {
                return (this instanceof fairygui.GComponent) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asButton", {
            get: function () {
                return (this instanceof fairygui.GButton) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asLabel", {
            get: function () {
                return (this instanceof fairygui.GLabel) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asProgress", {
            get: function () {
                return (this instanceof fairygui.GProgressBar) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asTextField", {
            get: function () {
                return (this instanceof fairygui.GTextField) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asRichTextField", {
            get: function () {
                return (this instanceof fairygui.GRichTextField) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asTextInput", {
            get: function () {
                return (this instanceof fairygui.GTextInput) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asLoader", {
            get: function () {
                return (this instanceof fairygui.GLoader) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asList", {
            get: function () {
                return (this instanceof fairygui.GList) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asGraph", {
            get: function () {
                return (this instanceof fairygui.GGraph) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asGroup", {
            get: function () {
                return (this instanceof fairygui.GGroup) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asSlider", {
            get: function () {
                return (this instanceof fairygui.GSlider) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asComboBox", {
            get: function () {
                return (this instanceof fairygui.GComboBox) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asImage", {
            get: function () {
                return (this instanceof fairygui.GImage) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "asMovieClip", {
            get: function () {
                return (this instanceof fairygui.GMovieClip) ? this : null;
            },
            enumerable: true,
            configurable: true
        });
        GObject.cast = function (obj) {
            return obj["$owner"];
        };
        Object.defineProperty(GObject.prototype, "text", {
            get: function () {
                return null;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "icon", {
            get: function () {
                return null;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "isDisposed", {
            get: function () {
                return this._disposed;
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.dispose = function () {
            if (this._disposed)
                return;
            this._disposed = true;
            this.removeFromParent();
            this._relations.dispose();
            this._displayObject = null;
            for (var i = 0; i < 8; i++) {
                var gear = this._gears[i];
                if (gear != null)
                    gear.dispose();
            }
        };
        GObject.prototype.addClickListener = function (listener, thisObj) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, listener, thisObj);
        };
        GObject.prototype.removeClickListener = function (listener, thisObj) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, listener, thisObj);
        };
        GObject.prototype.hasClickListener = function () {
            return this.hasEventListener(egret.TouchEvent.TOUCH_TAP);
        };
        GObject.prototype.addEventListener = function (type, listener, thisObject) {
            _super.prototype.addEventListener.call(this, type, listener, thisObject);
            if (this._displayObject != null) {
                this._displayObject.addEventListener(type, this._reDispatch, this);
            }
        };
        GObject.prototype.removeEventListener = function (type, listener, thisObject) {
            _super.prototype.removeEventListener.call(this, type, listener, thisObject);
            if (this._displayObject != null && !this.hasEventListener(type)) {
                this._displayObject.removeEventListener(type, this._reDispatch, this);
            }
        };
        GObject.prototype._reDispatch = function (evt) {
            this.dispatchEvent(evt);
        };
        Object.defineProperty(GObject.prototype, "draggable", {
            get: function () {
                return this._draggable;
            },
            set: function (value) {
                if (this._draggable != value) {
                    this._draggable = value;
                    this.initDrag();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GObject.prototype, "dragBounds", {
            get: function () {
                return this._dragBounds;
            },
            set: function (value) {
                this._dragBounds = value;
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.startDrag = function (touchPointID) {
            if (touchPointID === void 0) { touchPointID = -1; }
            if (this._displayObject.stage == null)
                return;
            this.dragBegin(null);
        };
        GObject.prototype.stopDrag = function () {
            this.dragEnd();
        };
        Object.defineProperty(GObject.prototype, "dragging", {
            get: function () {
                return GObject.draggingObject == this;
            },
            enumerable: true,
            configurable: true
        });
        GObject.prototype.localToGlobal = function (ax, ay, resultPoint) {
            if (ax === void 0) { ax = 0; }
            if (ay === void 0) { ay = 0; }
            if (this._pivotAsAnchor) {
                ax += this._pivotX * this._width;
                ay += this._pivotY * this._height;
            }
            return this._displayObject.localToGlobal(ax, ay, resultPoint);
        };
        GObject.prototype.globalToLocal = function (ax, ay, resultPoint) {
            if (ax === void 0) { ax = 0; }
            if (ay === void 0) { ay = 0; }
            var pt = this._displayObject.globalToLocal(ax, ay, resultPoint);
            if (this._pivotAsAnchor) {
                pt.x -= this._pivotX * this._width;
                pt.y -= this._pivotY * this._height;
            }
            return pt;
        };
        GObject.prototype.localToRoot = function (ax, ay, resultPoint) {
            if (ax === void 0) { ax = 0; }
            if (ay === void 0) { ay = 0; }
            var pt = this._displayObject.localToGlobal(ax, ay, resultPoint);
            pt.x /= fairygui.GRoot.contentScaleFactor;
            pt.y /= fairygui.GRoot.contentScaleFactor;
            return pt;
        };
        GObject.prototype.rootToLocal = function (ax, ay, resultPoint) {
            if (ax === void 0) { ax = 0; }
            if (ay === void 0) { ay = 0; }
            ax *= fairygui.GRoot.contentScaleFactor;
            ay *= fairygui.GRoot.contentScaleFactor;
            return this._displayObject.globalToLocal(ax, ay, resultPoint);
        };
        GObject.prototype.localToGlobalRect = function (ax, ay, aWidth, aHeight, resultRect) {
            if (ax === void 0) { ax = 0; }
            if (ay === void 0) { ay = 0; }
            if (aWidth === void 0) { aWidth = 0; }
            if (aHeight === void 0) { aHeight = 0; }
            if (resultRect == null)
                resultRect = new egret.Rectangle();
            var pt = this.localToGlobal(ax, ay);
            resultRect.x = pt.x;
            resultRect.y = pt.y;
            pt = this.localToGlobal(ax + aWidth, ay + aHeight);
            resultRect.right = pt.x;
            resultRect.bottom = pt.y;
            return resultRect;
        };
        GObject.prototype.globalToLocalRect = function (ax, ay, aWidth, aHeight, resultRect) {
            if (ax === void 0) { ax = 0; }
            if (ay === void 0) { ay = 0; }
            if (aWidth === void 0) { aWidth = 0; }
            if (aHeight === void 0) { aHeight = 0; }
            if (resultRect == null)
                resultRect = new egret.Rectangle();
            var pt = this.globalToLocal(ax, ay);
            resultRect.x = pt.x;
            resultRect.y = pt.y;
            pt = this.globalToLocal(ax + aWidth, ay + aHeight);
            resultRect.right = pt.x;
            resultRect.bottom = pt.y;
            return resultRect;
        };
        GObject.prototype.handleControllerChanged = function (c) {
            this._handlingController = true;
            for (var i = 0; i < 8; i++) {
                var gear = this._gears[i];
                if (gear != null && gear.controller == c)
                    gear.apply();
            }
            this._handlingController = false;
            this.checkGearDisplay();
        };
        GObject.prototype.createDisplayObject = function () {
        };
        GObject.prototype.switchDisplayObject = function (newObj) {
            if (newObj == this._displayObject)
                return;
            if (!this._displayObject) {
                console.log("=============", this.id, this.name);
                console.log("FairyGUI:switchDisplayObject()调用显示对象不存在");
                console.log("parent name list:>>>>");
                if (this.parent) {
                    while (this.parent) {
                        console.log(this.parent.name);
                    }
                }
                console.log(">>>>");
                if (this.packageItem) {
                    console.log("packageItem info > " + "name:" + this.packageItem.name + "");
                    console.log("name:" + this.packageItem.name);
                    console.log("id:" + this.packageItem.id);
                    if (this.packageItem.owner) {
                        console.log("owner name:" + this.packageItem.owner.name);
                        console.log("owner id:" + this.packageItem.owner.id);
                    }
                }
                console.log("=============");
                return;
            }
            var old = this._displayObject;
            if (this._displayObject.parent != null) {
                var i = this._displayObject.parent.getChildIndex(this._displayObject);
                this._displayObject.parent.addChildAt(newObj, i);
                this._displayObject.parent.removeChild(this._displayObject);
            }
            this._displayObject = newObj;
            this._displayObject.x = old.x;
            this._displayObject.y = old.y;
            this._displayObject.rotation = old.rotation;
            this._displayObject.alpha = old.alpha;
            this._displayObject.visible = old.visible;
            this._displayObject.touchEnabled = old.touchEnabled;
            this._displayObject.scaleX = old.scaleX;
            this._displayObject.scaleY = old.scaleY;
            if (this._displayObject instanceof egret.DisplayObjectContainer)
                this._displayObject.touchChildren = this._touchable;
        };
        GObject.prototype.handleXYChanged = function () {
            if (this._displayObject) {
                var xv = this._x;
                var yv = this._y;
                if (this._pivotAsAnchor) {
                    xv -= this._pivotX * this._width;
                    yv -= this._pivotY * this._height;
                }
                if (this._pixelSnapping) {
                    xv = Math.round(xv);
                    yv = Math.round(yv);
                }
                this._displayObject.x = xv + this._pivotOffsetX;
                this._displayObject.y = yv + this._pivotOffsetY;
            }
        };
        GObject.prototype.handleSizeChanged = function () {
            if (this._displayObject != null) {
                this._displayObject.width = this.width;
                this._displayObject.height = this.height;
            }
        };
        GObject.prototype.handleScaleChanged = function () {
            if (this._displayObject != null) {
                this._displayObject.scaleX = this._scaleX;
                this._displayObject.scaleY = this._scaleY;
            }
        };
        GObject.prototype.handleGrayedChanged = function () {
            if (this._displayObject) {
                if (this._grayed) {
                    var colorFlilter = new egret.ColorMatrixFilter(GObject.colorMatrix);
                    this._displayObject.filters = [colorFlilter];
                }
                else
                    this._displayObject.filters = null;
            }
        };
        GObject.prototype.handleAlphaChanged = function () {
            if (this._displayObject)
                this._displayObject.alpha = this._alpha;
        };
        GObject.prototype.handleVisibleChanged = function () {
            if (this._displayObject)
                this._displayObject.visible = this.internalVisible2;
        };
        GObject.prototype.constructFromResource = function () {
        };
        GObject.prototype.setup_beforeAdd = function (buffer, beginPos) {
            buffer.seek(beginPos, 0);
            buffer.skip(5);
            var f1;
            var f2;
            this._id = buffer.readS();
            this._name = buffer.readS();
            f1 = buffer.readInt();
            f2 = buffer.readInt();
            this.setXY(f1, f2);
            if (buffer.readBool()) {
                this.initWidth = buffer.readInt();
                this.initHeight = buffer.readInt();
                this.setSize(this.initWidth, this.initHeight, true);
            }
            if (buffer.readBool()) {
                this.minWidth = buffer.readInt();
                this.maxWidth = buffer.readInt();
                this.minHeight = buffer.readInt();
                this.maxHeight = buffer.readInt();
            }
            if (buffer.readBool()) {
                f1 = buffer.readFloat();
                f2 = buffer.readFloat();
                this.setScale(f1, f2);
            }
            if (buffer.readBool()) {
                f1 = buffer.readFloat();
                f2 = buffer.readFloat();
                this.setSkew(f1, f2);
            }
            if (buffer.readBool()) {
                f1 = buffer.readFloat();
                f2 = buffer.readFloat();
                this.setPivot(f1, f2, buffer.readBool());
            }
            f1 = buffer.readFloat();
            if (f1 != 1)
                this.alpha = f1;
            f1 = buffer.readFloat();
            if (f1 != 0)
                this.rotation = f1;
            if (!buffer.readBool())
                this.visible = false;
            if (!buffer.readBool())
                this.touchable = false;
            if (buffer.readBool())
                this.grayed = true;
            var bm = buffer.readByte();
            if (bm == 2)
                this.blendMode = egret.BlendMode.ADD;
            else if (bm == 5)
                this.blendMode = egret.BlendMode.ERASE;
            var filter = buffer.readByte();
            if (filter == 1) {
                var cm = new fairygui.ColorMatrix();
                cm.adjustBrightness(buffer.readFloat());
                cm.adjustContrast(buffer.readFloat());
                cm.adjustSaturation(buffer.readFloat());
                cm.adjustHue(buffer.readFloat());
                var cf = new egret.ColorMatrixFilter(cm.matrix);
                this.filters = [cf];
            }
            var str = buffer.readS();
            if (str != null)
                this.data = str;
        };
        GObject.prototype.setup_afterAdd = function (buffer, beginPos) {
            buffer.seek(beginPos, 1);
            var str = buffer.readS();
            if (str != null)
                this.tooltips = str;
            var groupId = buffer.readShort();
            if (groupId >= 0)
                this.group = this.parent.getChildAt(groupId);
            buffer.seek(beginPos, 2);
            var cnt = buffer.readShort();
            for (var i = 0; i < cnt; i++) {
                var nextPos = buffer.readShort();
                nextPos += buffer.position;
                var gear = this.getGear(buffer.readByte());
                gear.setup(buffer);
                buffer.position = nextPos;
            }
        };
        GObject.prototype.initDrag = function () {
            if (this._draggable)
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__begin, this);
            else
                this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__begin, this);
        };
        GObject.prototype.dragBegin = function (evt) {
            if (GObject.draggingObject != null)
                GObject.draggingObject.stopDrag();
            if (evt != null) {
                GObject.sGlobalDragStart.x = evt.stageX;
                GObject.sGlobalDragStart.y = evt.stageY;
            }
            else {
                GObject.sGlobalDragStart.x = fairygui.GRoot.mouseX;
                GObject.sGlobalDragStart.y = fairygui.GRoot.mouseY;
            }
            this.localToGlobalRect(0, 0, this.width, this.height, GObject.sGlobalRect);
            GObject.draggingObject = this;
            fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.__moving2, this);
            fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_END, this.__end2, this);
        };
        GObject.prototype.dragEnd = function () {
            if (GObject.draggingObject == this) {
                fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.__moving2, this);
                fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.__end2, this);
                GObject.draggingObject = null;
            }
        };
        GObject.prototype.reset = function () {
            fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.__moving, this);
            fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.__end, this);
        };
        GObject.prototype.__begin = function (evt) {
            if (this._touchDownPoint == null)
                this._touchDownPoint = new egret.Point();
            this._touchDownPoint.x = evt.stageX;
            this._touchDownPoint.y = evt.stageY;
            fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.__moving, this);
            fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_END, this.__end, this);
        };
        GObject.prototype.__end = function (evt) {
            this.reset();
        };
        GObject.prototype.__moving = function (evt) {
            var sensitivity = fairygui.UIConfig.touchDragSensitivity;
            if (this._touchDownPoint != null
                && Math.abs(this._touchDownPoint.x - evt.stageX) < sensitivity
                && Math.abs(this._touchDownPoint.y - evt.stageY) < sensitivity)
                return;
            this.reset();
            var dragEvent = new fairygui.DragEvent(fairygui.DragEvent.DRAG_START);
            dragEvent.stageX = evt.stageX;
            dragEvent.stageY = evt.stageY;
            dragEvent.touchPointID = evt.touchPointID;
            this.dispatchEvent(dragEvent);
            if (!dragEvent.isDefaultPrevented())
                this.dragBegin(evt);
        };
        GObject.prototype.__moving2 = function (evt) {
            var xx = evt.stageX - GObject.sGlobalDragStart.x + GObject.sGlobalRect.x;
            var yy = evt.stageY - GObject.sGlobalDragStart.y + GObject.sGlobalRect.y;
            if (this._dragBounds != null) {
                var rect = fairygui.GRoot.inst.localToGlobalRect(this._dragBounds.x, this._dragBounds.y, this._dragBounds.width, this._dragBounds.height, GObject.sDragHelperRect);
                if (xx < rect.x)
                    xx = rect.x;
                else if (xx + GObject.sGlobalRect.width > rect.right) {
                    xx = rect.right - GObject.sGlobalRect.width;
                    if (xx < rect.x)
                        xx = rect.x;
                }
                if (yy < rect.y)
                    yy = rect.y;
                else if (yy + GObject.sGlobalRect.height > rect.bottom) {
                    yy = rect.bottom - GObject.sGlobalRect.height;
                    if (yy < rect.y)
                        yy = rect.y;
                }
            }
            GObject.sUpdateInDragging = true;
            var pt = this.parent.globalToLocal(xx, yy, GObject.sHelperPoint);
            this.setXY(Math.round(pt.x), Math.round(pt.y));
            GObject.sUpdateInDragging = false;
            var dragEvent = new fairygui.DragEvent(fairygui.DragEvent.DRAG_MOVING);
            dragEvent.stageX = evt.stageX;
            dragEvent.stageY = evt.stageY;
            dragEvent.touchPointID = evt.touchPointID;
            this.dispatchEvent(dragEvent);
        };
        GObject.prototype.__end2 = function (evt) {
            if (GObject.draggingObject == this) {
                this.stopDrag();
                var dragEvent = new fairygui.DragEvent(fairygui.DragEvent.DRAG_END);
                dragEvent.stageX = evt.stageX;
                dragEvent.stageY = evt.stageY;
                dragEvent.touchPointID = evt.touchPointID;
                this.dispatchEvent(dragEvent);
            }
        };
        //-------------------------------------------------------------------
        GObject.prototype.clean = function () {
        };
        GObject._gInstanceCounter = 0;
        GObject.XY_CHANGED = "__xyChanged";
        GObject.SIZE_CHANGED = "__sizeChanged";
        GObject.SIZE_DELAY_CHANGE = "__sizeDelayChange";
        GObject.GEAR_STOP = "gearStop";
        GObject.colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        //drag support
        //-------------------------------------------------------------------
        GObject.sGlobalDragStart = new egret.Point();
        GObject.sGlobalRect = new egret.Rectangle();
        GObject.sHelperPoint = new egret.Point();
        GObject.sDragHelperRect = new egret.Rectangle();
        return GObject;
    }(egret.EventDispatcher));
    fairygui.GObject = GObject;
    __reflect(GObject.prototype, "fairygui.GObject");
})(fairygui || (fairygui = {}));
