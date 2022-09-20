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
    var GGroup = (function (_super) {
        __extends(GGroup, _super);
        function GGroup() {
            var _this = _super.call(this) || this;
            _this._layout = 0;
            _this._lineGap = 0;
            _this._columnGap = 0;
            _this._percentReady = false;
            _this._boundsChanged = false;
            _this._updating = 0;
            return _this;
        }
        Object.defineProperty(GGroup.prototype, "layout", {
            get: function () {
                return this._layout;
            },
            set: function (value) {
                if (this._layout != value) {
                    this._layout = value;
                    this.setBoundsChangedFlag(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GGroup.prototype, "lineGap", {
            get: function () {
                return this._lineGap;
            },
            set: function (value) {
                if (this._lineGap != value) {
                    this._lineGap = value;
                    this.setBoundsChangedFlag();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GGroup.prototype, "columnGap", {
            get: function () {
                return this._columnGap;
            },
            set: function (value) {
                if (this._columnGap != value) {
                    this._columnGap = value;
                    this.setBoundsChangedFlag();
                }
            },
            enumerable: true,
            configurable: true
        });
        GGroup.prototype.setBoundsChangedFlag = function (childSizeChanged) {
            if (childSizeChanged === void 0) { childSizeChanged = false; }
            if (this._updating == 0 && this._parent != null) {
                if (childSizeChanged)
                    this._percentReady = false;
                if (!this._boundsChanged) {
                    this._boundsChanged = true;
                    if (this._layout != fairygui.GroupLayoutType.None)
                        fairygui.GTimers.inst.callLater(this.ensureBoundsCorrect, this);
                }
            }
        };
        GGroup.prototype.ensureBoundsCorrect = function () {
            if (this._boundsChanged)
                this.updateBounds();
        };
        GGroup.prototype.updateBounds = function () {
            fairygui.GTimers.inst.remove(this.ensureBoundsCorrect, this);
            this._boundsChanged = false;
            if (this._parent == null)
                return;
            this.handleLayout();
            var cnt = this._parent.numChildren;
            var i;
            var child;
            var ax = Number.POSITIVE_INFINITY, ay = Number.POSITIVE_INFINITY;
            var ar = Number.NEGATIVE_INFINITY, ab = Number.NEGATIVE_INFINITY;
            var tmp;
            var empty = true;
            for (i = 0; i < cnt; i++) {
                child = this._parent.getChildAt(i);
                if (child.group == this) {
                    tmp = child.x;
                    if (tmp < ax)
                        ax = tmp;
                    tmp = child.y;
                    if (tmp < ay)
                        ay = tmp;
                    tmp = child.x + child.width;
                    if (tmp > ar)
                        ar = tmp;
                    tmp = child.y + child.height;
                    if (tmp > ab)
                        ab = tmp;
                    empty = false;
                }
            }
            if (!empty) {
                this._updating = 1;
                this.setXY(ax, ay);
                this._updating = 2;
                this.setSize(ar - ax, ab - ay);
            }
            else {
                this._updating = 2;
                this.setSize(0, 0);
            }
            this._updating = 0;
        };
        GGroup.prototype.handleLayout = function () {
            this._updating |= 1;
            var child;
            var i;
            var cnt;
            if (this._layout == fairygui.GroupLayoutType.Horizontal) {
                var curX = NaN;
                cnt = this._parent.numChildren;
                for (i = 0; i < cnt; i++) {
                    child = this._parent.getChildAt(i);
                    if (child.group != this)
                        continue;
                    if (isNaN(curX))
                        curX = Math.floor(child.x);
                    else
                        child.x = curX;
                    if (child.width != 0)
                        curX += Math.floor(child.width + this._columnGap);
                }
                if (!this._percentReady)
                    this.updatePercent();
            }
            else if (this._layout == fairygui.GroupLayoutType.Vertical) {
                var curY = NaN;
                cnt = this._parent.numChildren;
                for (i = 0; i < cnt; i++) {
                    child = this._parent.getChildAt(i);
                    if (child.group != this)
                        continue;
                    if (isNaN(curY))
                        curY = Math.floor(child.y);
                    else
                        child.y = curY;
                    if (child.height != 0)
                        curY += Math.floor(child.height + this._lineGap);
                }
                if (!this._percentReady)
                    this.updatePercent();
            }
            this._updating &= 2;
        };
        GGroup.prototype.updatePercent = function () {
            this._percentReady = true;
            var cnt = this._parent.numChildren;
            var i;
            var child;
            var size = 0;
            if (this._layout == fairygui.GroupLayoutType.Horizontal) {
                for (i = 0; i < cnt; i++) {
                    child = this._parent.getChildAt(i);
                    if (child.group != this)
                        continue;
                    size += child.width;
                }
                for (i = 0; i < cnt; i++) {
                    child = this._parent.getChildAt(i);
                    if (child.group != this)
                        continue;
                    if (size > 0)
                        child._sizePercentInGroup = child.width / size;
                    else
                        child._sizePercentInGroup = 0;
                }
            }
            else {
                for (i = 0; i < cnt; i++) {
                    child = this._parent.getChildAt(i);
                    if (child.group != this)
                        continue;
                    size += child.height;
                }
                for (i = 0; i < cnt; i++) {
                    child = this._parent.getChildAt(i);
                    if (child.group != this)
                        continue;
                    if (size > 0)
                        child._sizePercentInGroup = child.height / size;
                    else
                        child._sizePercentInGroup = 0;
                }
            }
        };
        GGroup.prototype.moveChildren = function (dx, dy) {
            if ((this._updating & 1) != 0 || this._parent == null)
                return;
            this._updating |= 1;
            var cnt = this._parent.numChildren;
            var i;
            var child;
            for (i = 0; i < cnt; i++) {
                child = this._parent.getChildAt(i);
                if (child.group == this) {
                    child.setXY(child.x + dx, child.y + dy);
                }
            }
            this._updating &= 2;
        };
        GGroup.prototype.resizeChildren = function (dw, dh) {
            if (this._layout == fairygui.GroupLayoutType.None || (this._updating & 2) != 0 || this._parent == null)
                return;
            this._updating |= 2;
            if (!this._percentReady)
                this.updatePercent();
            var cnt = this._parent.numChildren;
            var i;
            var j;
            var child;
            var last = -1;
            var numChildren = 0;
            var lineSize = 0;
            var remainSize = 0;
            var found = false;
            for (i = 0; i < cnt; i++) {
                child = this._parent.getChildAt(i);
                if (child.group != this)
                    continue;
                last = i;
                numChildren++;
            }
            if (this._layout == fairygui.GroupLayoutType.Horizontal) {
                remainSize = lineSize = this.width - (numChildren - 1) * this._columnGap;
                var curX = NaN;
                var nw;
                for (i = 0; i < cnt; i++) {
                    child = this._parent.getChildAt(i);
                    if (child.group != this)
                        continue;
                    if (isNaN(curX))
                        curX = Math.floor(child.x);
                    else
                        child.x = curX;
                    if (last == i)
                        nw = remainSize;
                    else
                        nw = Math.round(child._sizePercentInGroup * lineSize);
                    child.setSize(nw, child._rawHeight + dh, true);
                    remainSize -= child.width;
                    if (last == i) {
                        if (remainSize >= 1) {
                            for (j = 0; j <= i; j++) {
                                child = this._parent.getChildAt(j);
                                if (child.group != this)
                                    continue;
                                if (!found) {
                                    nw = child.width + remainSize;
                                    if ((child.maxWidth == 0 || nw < child.maxWidth)
                                        && (child.minWidth == 0 || nw > child.minWidth)) {
                                        child.setSize(nw, child.height, true);
                                        found = true;
                                    }
                                }
                                else
                                    child.x += remainSize;
                            }
                        }
                    }
                    else
                        curX += (child.width + this._columnGap);
                }
            }
            else if (this._layout == fairygui.GroupLayoutType.Vertical) {
                remainSize = lineSize = this.height - (numChildren - 1) * this._lineGap;
                var curY = NaN;
                var nh;
                for (i = 0; i < cnt; i++) {
                    child = this._parent.getChildAt(i);
                    if (child.group != this)
                        continue;
                    if (isNaN(curY))
                        curY = Math.floor(child.y);
                    else
                        child.y = curY;
                    if (last == i)
                        nh = remainSize;
                    else
                        nh = Math.round(child._sizePercentInGroup * lineSize);
                    child.setSize(child._rawWidth + dw, nh, true);
                    remainSize -= child.height;
                    if (last == i) {
                        if (remainSize >= 1) {
                            for (j = 0; j <= i; j++) {
                                child = this._parent.getChildAt(j);
                                if (child.group != this)
                                    continue;
                                if (!found) {
                                    nh = child.height + remainSize;
                                    if ((child.maxHeight == 0 || nh < child.maxHeight)
                                        && (child.minHeight == 0 || nh > child.minHeight)) {
                                        child.setSize(child.width, nh, true);
                                        found = true;
                                    }
                                }
                                else
                                    child.y += remainSize;
                            }
                        }
                    }
                    else
                        curY += (child.height + this._lineGap);
                }
            }
            this._updating &= 1;
        };
        GGroup.prototype.handleAlphaChanged = function () {
            if (this._underConstruct)
                return;
            var cnt = this._parent.numChildren;
            for (var i = 0; i < cnt; i++) {
                var child = this._parent.getChildAt(i);
                if (child.group == this)
                    child.alpha = this.alpha;
            }
        };
        GGroup.prototype.handleVisibleChanged = function () {
            if (!this._parent)
                return;
            var cnt = this._parent.numChildren;
            for (var i = 0; i < cnt; i++) {
                var child = this._parent.getChildAt(i);
                if (child.group == this)
                    child.handleVisibleChanged();
            }
        };
        GGroup.prototype.setup_beforeAdd = function (buffer, beginPos) {
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            buffer.seek(beginPos, 5);
            this._layout = buffer.readByte();
            this._lineGap = buffer.readInt();
            this._columnGap = buffer.readInt();
        };
        GGroup.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            if (!this.visible)
                this.handleVisibleChanged();
        };
        return GGroup;
    }(fairygui.GObject));
    fairygui.GGroup = GGroup;
    __reflect(GGroup.prototype, "fairygui.GGroup");
})(fairygui || (fairygui = {}));
