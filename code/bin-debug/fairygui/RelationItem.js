var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var RelationItem = (function () {
        function RelationItem(owner) {
            this._owner = owner;
            this._defs = new Array();
        }
        Object.defineProperty(RelationItem.prototype, "owner", {
            get: function () {
                return this._owner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RelationItem.prototype, "target", {
            get: function () {
                return this._target;
            },
            set: function (value) {
                if (this._target != value) {
                    if (this._target)
                        this.releaseRefTarget(this._target);
                    this._target = value;
                    if (this._target)
                        this.addRefTarget(this._target);
                }
            },
            enumerable: true,
            configurable: true
        });
        RelationItem.prototype.add = function (relationType, usePercent) {
            if (relationType == fairygui.RelationType.Size) {
                this.add(fairygui.RelationType.Width, usePercent);
                this.add(fairygui.RelationType.Height, usePercent);
                return;
            }
            var length = this._defs.length;
            for (var i = 0; i < length; i++) {
                var def = this._defs[i];
                if (def.type == relationType)
                    return;
            }
            this.internalAdd(relationType, usePercent);
        };
        RelationItem.prototype.internalAdd = function (relationType, usePercent) {
            if (relationType == fairygui.RelationType.Size) {
                this.internalAdd(fairygui.RelationType.Width, usePercent);
                this.internalAdd(fairygui.RelationType.Height, usePercent);
                return;
            }
            var info = new RelationDef();
            info.percent = usePercent;
            info.type = relationType;
            info.axis = (relationType <= fairygui.RelationType.Right_Right || relationType == fairygui.RelationType.Width || relationType >= fairygui.RelationType.LeftExt_Left && relationType <= fairygui.RelationType.RightExt_Right) ? 0 : 1;
            this._defs.push(info);
            //当使用中线关联时，因为需要除以2，很容易因为奇数宽度/高度造成小数点坐标；当使用百分比时，也会造成小数坐标；
            //所以设置了这类关联的对象，自动启用pixelSnapping
            if (usePercent || relationType == fairygui.RelationType.Left_Center || relationType == fairygui.RelationType.Center_Center || relationType == fairygui.RelationType.Right_Center
                || relationType == fairygui.RelationType.Top_Middle || relationType == fairygui.RelationType.Middle_Middle || relationType == fairygui.RelationType.Bottom_Middle)
                this._owner.pixelSnapping = true;
        };
        RelationItem.prototype.remove = function (relationType) {
            if (relationType === void 0) { relationType = 0; }
            if (relationType == fairygui.RelationType.Size) {
                this.remove(fairygui.RelationType.Width);
                this.remove(fairygui.RelationType.Height);
                return;
            }
            var dc = this._defs.length;
            for (var k = 0; k < dc; k++) {
                if (this._defs[k].type == relationType) {
                    this._defs.splice(k, 1);
                    break;
                }
            }
        };
        RelationItem.prototype.copyFrom = function (source) {
            this.target = source.target;
            this._defs.length = 0;
            var length = source._defs.length;
            for (var i = 0; i < length; i++) {
                var info = source._defs[i];
                var info2 = new RelationDef();
                info2.copyFrom(info);
                this._defs.push(info2);
            }
        };
        RelationItem.prototype.dispose = function () {
            if (this._target != null) {
                this.releaseRefTarget(this._target);
                this._target = null;
            }
        };
        Object.defineProperty(RelationItem.prototype, "isEmpty", {
            get: function () {
                return this._defs.length == 0;
            },
            enumerable: true,
            configurable: true
        });
        RelationItem.prototype.applyOnSelfResized = function (dWidth, dHeight, applyPivot) {
            var ox = this._owner.x;
            var oy = this._owner.y;
            var length = this._defs.length;
            for (var i = 0; i < length; i++) {
                var info = this._defs[i];
                switch (info.type) {
                    case fairygui.RelationType.Center_Center:
                        this._owner.x -= (0.5 - (applyPivot ? this._owner.pivotX : 0)) * dWidth;
                        break;
                    case fairygui.RelationType.Right_Center:
                    case fairygui.RelationType.Right_Left:
                    case fairygui.RelationType.Right_Right:
                        this._owner.x -= (1 - (applyPivot ? this._owner.pivotX : 0)) * dWidth;
                        break;
                    case fairygui.RelationType.Middle_Middle:
                        this._owner.y -= (0.5 - (applyPivot ? this._owner.pivotY : 0)) * dHeight;
                        break;
                    case fairygui.RelationType.Bottom_Middle:
                    case fairygui.RelationType.Bottom_Top:
                    case fairygui.RelationType.Bottom_Bottom:
                        this._owner.y -= (1 - (applyPivot ? this._owner.pivotY : 0)) * dHeight;
                        break;
                }
            }
            if (ox != this._owner.x || oy != this._owner.y) {
                ox = this._owner.x - ox;
                oy = this._owner.y - oy;
                this._owner.updateGearFromRelations(1, ox, oy);
                if (this._owner.parent != null) {
                    var len = this._owner.parent._transitions.length;
                    if (len > 0) {
                        for (var i = 0; i < len; ++i) {
                            this._owner.parent._transitions[i].updateFromRelations(this._owner.id, ox, oy);
                        }
                    }
                }
            }
        };
        RelationItem.prototype.applyOnXYChanged = function (info, dx, dy) {
            var tmp;
            switch (info.type) {
                case fairygui.RelationType.Left_Left:
                case fairygui.RelationType.Left_Center:
                case fairygui.RelationType.Left_Right:
                case fairygui.RelationType.Center_Center:
                case fairygui.RelationType.Right_Left:
                case fairygui.RelationType.Right_Center:
                case fairygui.RelationType.Right_Right:
                    this._owner.x += dx;
                    break;
                case fairygui.RelationType.Top_Top:
                case fairygui.RelationType.Top_Middle:
                case fairygui.RelationType.Top_Bottom:
                case fairygui.RelationType.Middle_Middle:
                case fairygui.RelationType.Bottom_Top:
                case fairygui.RelationType.Bottom_Middle:
                case fairygui.RelationType.Bottom_Bottom:
                    this._owner.y += dy;
                    break;
                case fairygui.RelationType.Width:
                case fairygui.RelationType.Height:
                    break;
                case fairygui.RelationType.LeftExt_Left:
                case fairygui.RelationType.LeftExt_Right:
                    tmp = this._owner.xMin;
                    this._owner.width = this._owner._rawWidth - dx;
                    this._owner.xMin = tmp + dx;
                    break;
                case fairygui.RelationType.RightExt_Left:
                case fairygui.RelationType.RightExt_Right:
                    tmp = this._owner.xMin;
                    this._owner.width = this._owner._rawWidth + dx;
                    this._owner.xMin = tmp;
                    break;
                case fairygui.RelationType.TopExt_Top:
                case fairygui.RelationType.TopExt_Bottom:
                    tmp = this._owner.yMin;
                    this._owner.height = this._owner._rawHeight - dy;
                    this._owner.yMin = tmp + dy;
                    break;
                case fairygui.RelationType.BottomExt_Top:
                case fairygui.RelationType.BottomExt_Bottom:
                    tmp = this._owner.yMin;
                    this._owner.height = this._owner._rawHeight + dy;
                    this._owner.yMin = tmp;
                    break;
            }
        };
        RelationItem.prototype.applyOnSizeChanged = function (info) {
            var pos = 0, pivot = 0, delta = 0;
            var v, tmp;
            if (info.axis == 0) {
                if (this._target != this._owner.parent) {
                    pos = this._target.x;
                    if (this._target.pivotAsAnchor)
                        pivot = this._target.pivotX;
                }
                if (info.percent) {
                    if (this._targetWidth != 0)
                        delta = this._target._width / this._targetWidth;
                }
                else
                    delta = this._target._width - this._targetWidth;
            }
            else {
                if (this._target != this._owner.parent) {
                    pos = this._target.y;
                    if (this._target.pivotAsAnchor)
                        pivot = this._target.pivotY;
                }
                if (info.percent) {
                    if (this._targetHeight != 0)
                        delta = this._target._height / this._targetHeight;
                }
                else
                    delta = this._target._height - this._targetHeight;
            }
            switch (info.type) {
                case fairygui.RelationType.Left_Left:
                    if (info.percent)
                        this._owner.xMin = pos + (this._owner.xMin - pos) * delta;
                    else if (pivot != 0)
                        this._owner.x += delta * (-pivot);
                    break;
                case fairygui.RelationType.Left_Center:
                    if (info.percent)
                        this._owner.xMin = pos + (this._owner.xMin - pos) * delta;
                    else
                        this._owner.x += delta * (0.5 - pivot);
                    break;
                case fairygui.RelationType.Left_Right:
                    if (info.percent)
                        this._owner.xMin = pos + (this._owner.xMin - pos) * delta;
                    else
                        this._owner.x += delta * (1 - pivot);
                    break;
                case fairygui.RelationType.Center_Center:
                    if (info.percent)
                        this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth * 0.5 - pos) * delta - this._owner._rawWidth * 0.5;
                    else
                        this._owner.x += delta * (0.5 - pivot);
                    break;
                case fairygui.RelationType.Right_Left:
                    if (info.percent)
                        this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth - pos) * delta - this._owner._rawWidth;
                    else if (pivot != 0)
                        this._owner.x += delta * (-pivot);
                    break;
                case fairygui.RelationType.Right_Center:
                    if (info.percent)
                        this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth - pos) * delta - this._owner._rawWidth;
                    else
                        this._owner.x += delta * (0.5 - pivot);
                    break;
                case fairygui.RelationType.Right_Right:
                    if (info.percent)
                        this._owner.xMin = pos + (this._owner.xMin + this._owner._rawWidth - pos) * delta - this._owner._rawWidth;
                    else
                        this._owner.x += delta * (1 - pivot);
                    break;
                case fairygui.RelationType.Top_Top:
                    if (info.percent)
                        this._owner.yMin = pos + (this._owner.yMin - pos) * delta;
                    else if (pivot != 0)
                        this._owner.y += delta * (-pivot);
                    break;
                case fairygui.RelationType.Top_Middle:
                    if (info.percent)
                        this._owner.yMin = pos + (this._owner.yMin - pos) * delta;
                    else
                        this._owner.y += delta * (0.5 - pivot);
                    break;
                case fairygui.RelationType.Top_Bottom:
                    if (info.percent)
                        this._owner.yMin = pos + (this._owner.yMin - pos) * delta;
                    else
                        this._owner.y += delta * (1 - pivot);
                    break;
                case fairygui.RelationType.Middle_Middle:
                    if (info.percent)
                        this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight * 0.5 - pos) * delta - this._owner._rawHeight * 0.5;
                    else
                        this._owner.y += delta * (0.5 - pivot);
                    break;
                case fairygui.RelationType.Bottom_Top:
                    if (info.percent)
                        this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight - pos) * delta - this._owner._rawHeight;
                    else if (pivot != 0)
                        this._owner.y += delta * (-pivot);
                    break;
                case fairygui.RelationType.Bottom_Middle:
                    if (info.percent)
                        this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight - pos) * delta - this._owner._rawHeight;
                    else
                        this._owner.y += delta * (0.5 - pivot);
                    break;
                case fairygui.RelationType.Bottom_Bottom:
                    if (info.percent)
                        this._owner.yMin = pos + (this._owner.yMin + this._owner._rawHeight - pos) * delta - this._owner._rawHeight;
                    else
                        this._owner.y += delta * (1 - pivot);
                    break;
                case fairygui.RelationType.Width:
                    if (this._owner._underConstruct && this._owner == this._target.parent)
                        v = this._owner.sourceWidth - this._target.initWidth;
                    else
                        v = this._owner._rawWidth - this._targetWidth;
                    if (info.percent)
                        v = v * delta;
                    if (this._target == this._owner.parent) {
                        if (this._owner.pivotAsAnchor) {
                            tmp = this._owner.xMin;
                            this._owner.setSize(this._target._width + v, this._owner._rawHeight, true);
                            this._owner.xMin = tmp;
                        }
                        else
                            this._owner.setSize(this._target._width + v, this._owner._rawHeight, true);
                    }
                    else
                        this._owner.width = this._target._width + v;
                    break;
                case fairygui.RelationType.Height:
                    if (this._owner._underConstruct && this._owner == this._target.parent)
                        v = this._owner.sourceHeight - this._target.initHeight;
                    else
                        v = this._owner._rawHeight - this._targetHeight;
                    if (info.percent)
                        v = v * delta;
                    if (this._target == this._owner.parent) {
                        if (this._owner.pivotAsAnchor) {
                            tmp = this._owner.yMin;
                            this._owner.setSize(this._owner._rawWidth, this._target._height + v, true);
                            this._owner.yMin = tmp;
                        }
                        else
                            this._owner.setSize(this._owner._rawWidth, this._target._height + v, true);
                    }
                    else
                        this._owner.height = this._target._height + v;
                    break;
                case fairygui.RelationType.LeftExt_Left:
                    tmp = this._owner.xMin;
                    if (info.percent)
                        v = pos + (tmp - pos) * delta - tmp;
                    else
                        v = delta * (-pivot);
                    this._owner.width = this._owner._rawWidth - v;
                    this._owner.xMin = tmp + v;
                    break;
                case fairygui.RelationType.LeftExt_Right:
                    tmp = this._owner.xMin;
                    if (info.percent)
                        v = pos + (tmp - pos) * delta - tmp;
                    else
                        v = delta * (1 - pivot);
                    this._owner.width = this._owner._rawWidth - v;
                    this._owner.xMin = tmp + v;
                    break;
                case fairygui.RelationType.RightExt_Left:
                    tmp = this._owner.xMin;
                    if (info.percent)
                        v = pos + (tmp + this._owner._rawWidth - pos) * delta - (tmp + this._owner._rawWidth);
                    else
                        v = delta * (-pivot);
                    this._owner.width = this._owner._rawWidth + v;
                    this._owner.xMin = tmp;
                    break;
                case fairygui.RelationType.RightExt_Right:
                    tmp = this._owner.xMin;
                    if (info.percent) {
                        if (this._owner == this._target.parent) {
                            if (this._owner._underConstruct)
                                this._owner.width = pos + this._target._width - this._target._width * pivot +
                                    (this._owner.sourceWidth - pos - this._target.initWidth + this._target.initWidth * pivot) * delta;
                            else
                                this._owner.width = pos + (this._owner._rawWidth - pos) * delta;
                        }
                        else {
                            v = pos + (tmp + this._owner._rawWidth - pos) * delta - (tmp + this._owner._rawWidth);
                            this._owner.width = this._owner._rawWidth + v;
                            this._owner.xMin = tmp;
                        }
                    }
                    else {
                        if (this._owner == this._target.parent) {
                            if (this._owner._underConstruct)
                                this._owner.width = this._owner.sourceWidth + (this._target._width - this._target.initWidth) * (1 - pivot);
                            else
                                this._owner.width = this._owner._rawWidth + delta * (1 - pivot);
                        }
                        else {
                            v = delta * (1 - pivot);
                            this._owner.width = this._owner._rawWidth + v;
                            this._owner.xMin = tmp;
                        }
                    }
                    break;
                case fairygui.RelationType.TopExt_Top:
                    tmp = this._owner.yMin;
                    if (info.percent)
                        v = pos + (tmp - pos) * delta - tmp;
                    else
                        v = delta * (-pivot);
                    this._owner.height = this._owner._rawHeight - v;
                    this._owner.yMin = tmp + v;
                    break;
                case fairygui.RelationType.TopExt_Bottom:
                    tmp = this._owner.yMin;
                    if (info.percent)
                        v = pos + (tmp - pos) * delta - tmp;
                    else
                        v = delta * (1 - pivot);
                    this._owner.height = this._owner._rawHeight - v;
                    this._owner.yMin = tmp + v;
                    break;
                case fairygui.RelationType.BottomExt_Top:
                    tmp = this._owner.yMin;
                    if (info.percent)
                        v = pos + (tmp + this._owner._rawHeight - pos) * delta - (tmp + this._owner._rawHeight);
                    else
                        v = delta * (-pivot);
                    this._owner.height = this._owner._rawHeight + v;
                    this._owner.yMin = tmp;
                    break;
                case fairygui.RelationType.BottomExt_Bottom:
                    tmp = this._owner.yMin;
                    if (info.percent) {
                        if (this._owner == this._target.parent) {
                            if (this._owner._underConstruct)
                                this._owner.height = pos + this._target._height - this._target._height * pivot +
                                    (this._owner.sourceHeight - pos - this._target.initHeight + this._target.initHeight * pivot) * delta;
                            else
                                this._owner.height = pos + (this._owner._rawHeight - pos) * delta;
                        }
                        else {
                            v = pos + (tmp + this._owner._rawHeight - pos) * delta - (tmp + this._owner._rawHeight);
                            this._owner.height = this._owner._rawHeight + v;
                            this._owner.yMin = tmp;
                        }
                    }
                    else {
                        if (this._owner == this._target.parent) {
                            if (this._owner._underConstruct)
                                this._owner.height = this._owner.sourceHeight + (this._target._height - this._target.initHeight) * (1 - pivot);
                            else
                                this._owner.height = this._owner._rawHeight + delta * (1 - pivot);
                        }
                        else {
                            v = delta * (1 - pivot);
                            this._owner.height = this._owner._rawHeight + v;
                            this._owner.yMin = tmp;
                        }
                    }
                    break;
            }
        };
        RelationItem.prototype.addRefTarget = function (target) {
            if (target != this._owner.parent)
                target.addEventListener(fairygui.GObject.XY_CHANGED, this.__targetXYChanged, this);
            target.addEventListener(fairygui.GObject.SIZE_CHANGED, this.__targetSizeChanged, this);
            target.addEventListener(fairygui.GObject.SIZE_DELAY_CHANGE, this.__targetSizeWillChange, this);
            this._targetX = this._target.x;
            this._targetY = this._target.y;
            this._targetWidth = this._target._width;
            this._targetHeight = this._target._height;
        };
        RelationItem.prototype.releaseRefTarget = function (target) {
            target.removeEventListener(fairygui.GObject.XY_CHANGED, this.__targetXYChanged, this);
            target.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.__targetSizeChanged, this);
            target.removeEventListener(fairygui.GObject.SIZE_DELAY_CHANGE, this.__targetSizeWillChange, this);
        };
        RelationItem.prototype.__targetXYChanged = function (evt) {
            if (this._owner.relations.handling != null || this._owner.group != null && this._owner.group._updating) {
                this._targetX = this._target.x;
                this._targetY = this._target.y;
                return;
            }
            this._owner.relations.handling = this._target;
            var ox = this._owner.x;
            var oy = this._owner.y;
            var dx = this._target.x - this._targetX;
            var dy = this._target.y - this._targetY;
            var length = this._defs.length;
            for (var i = 0; i < length; i++) {
                var info = this._defs[i];
                this.applyOnXYChanged(info, dx, dy);
            }
            this._targetX = this._target.x;
            this._targetY = this._target.y;
            if (ox != this._owner.x || oy != this._owner.y) {
                ox = this._owner.x - ox;
                oy = this._owner.y - oy;
                this._owner.updateGearFromRelations(1, ox, oy);
                if (this._owner.parent != null) {
                    var len = this._owner.parent._transitions.length;
                    if (len > 0) {
                        for (var i = 0; i < len; ++i) {
                            this._owner.parent._transitions[i].updateFromRelations(this._owner.id, ox, oy);
                        }
                    }
                }
            }
            this._owner.relations.handling = null;
        };
        RelationItem.prototype.__targetSizeChanged = function (evt) {
            if (this._owner.relations.handling != null)
                return;
            this._owner.relations.handling = this._target;
            var ox = this._owner.x;
            var oy = this._owner.y;
            var ow = this._owner._rawWidth;
            var oh = this._owner._rawHeight;
            var length = this._defs.length;
            for (var i = 0; i < length; i++) {
                var info = this._defs[i];
                this.applyOnSizeChanged(info);
            }
            this._targetWidth = this._target._width;
            this._targetHeight = this._target._height;
            if (ox != this._owner.x || oy != this._owner.y) {
                ox = this._owner.x - ox;
                oy = this._owner.y - oy;
                this._owner.updateGearFromRelations(1, ox, oy);
                if (this._owner.parent != null) {
                    var len = this._owner.parent._transitions.length;
                    if (len > 0) {
                        for (var i = 0; i < len; ++i) {
                            this._owner.parent._transitions[i].updateFromRelations(this._owner.id, ox, oy);
                        }
                    }
                }
            }
            if (ow != this._owner._rawWidth || oh != this._owner._rawHeight) {
                ow = this._owner._rawWidth - ow;
                oh = this._owner._rawHeight - oh;
                this._owner.updateGearFromRelations(2, ow, oh);
            }
            this._owner.relations.handling = null;
        };
        RelationItem.prototype.__targetSizeWillChange = function (evt) {
            this._owner.relations.sizeDirty = true;
        };
        return RelationItem;
    }());
    fairygui.RelationItem = RelationItem;
    __reflect(RelationItem.prototype, "fairygui.RelationItem");
    var RelationDef = (function () {
        function RelationDef() {
        }
        RelationDef.prototype.copyFrom = function (source) {
            this.percent = source.percent;
            this.type = source.type;
            this.axis = source.axis;
        };
        return RelationDef;
    }());
    fairygui.RelationDef = RelationDef;
    __reflect(RelationDef.prototype, "fairygui.RelationDef");
})(fairygui || (fairygui = {}));
