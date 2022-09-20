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
    var GComponent = (function (_super) {
        __extends(GComponent, _super);
        function GComponent() {
            var _this = _super.call(this) || this;
            _this._sortingChildCount = 0;
            _this._childrenRenderOrder = fairygui.ChildrenRenderOrder.Ascent;
            _this._apexIndex = 0;
            _this._children = new Array();
            _this._controllers = new Array();
            _this._transitions = new Array();
            _this._margin = new fairygui.Margin();
            _this._alignOffset = new egret.Point();
            return _this;
        }
        GComponent.prototype.createDisplayObject = function () {
            this._rootContainer = new fairygui.UIContainer();
            this._rootContainer["$owner"] = this;
            this.setDisplayObject(this._rootContainer);
            this._container = this._rootContainer;
        };
        GComponent.prototype.dispose = function () {
            var i;
            var cnt;
            cnt = this._transitions.length;
            for (i = 0; i < cnt; ++i) {
                var trans = this._transitions[i];
                trans.dispose();
            }
            cnt = this._controllers.length;
            for (i = 0; i < cnt; ++i) {
                var cc = this._controllers[i];
                cc.dispose();
            }
            if (this._scrollPane)
                this._scrollPane.dispose();
            cnt = this._children.length;
            for (i = cnt - 1; i >= 0; --i) {
                var obj = this._children[i];
                obj.parent = null; //avoid removeFromParent call
                obj.dispose();
            }
            this._boundsChanged = false;
            _super.prototype.dispose.call(this);
        };
        Object.defineProperty(GComponent.prototype, "displayListContainer", {
            get: function () {
                return this._container;
            },
            enumerable: true,
            configurable: true
        });
        GComponent.prototype.addChild = function (child) {
            this.addChildAt(child, this._children.length);
            return child;
        };
        GComponent.prototype.addChildAt = function (child, index) {
            if (index === void 0) { index = 0; }
            if (!child)
                throw "child is null";
            var numChildren = this._children.length;
            if (index >= 0 && index <= numChildren) {
                if (child.parent == this) {
                    this.setChildIndex(child, index);
                }
                else {
                    child.removeFromParent();
                    child.parent = this;
                    var cnt = this._children.length;
                    if (child.sortingOrder != 0) {
                        this._sortingChildCount++;
                        index = this.getInsertPosForSortingChild(child);
                    }
                    else if (this._sortingChildCount > 0) {
                        if (index > (cnt - this._sortingChildCount))
                            index = cnt - this._sortingChildCount;
                    }
                    if (index == cnt)
                        this._children.push(child);
                    else
                        this._children.splice(index, 0, child);
                    this.childStateChanged(child);
                    this.setBoundsChangedFlag();
                }
                return child;
            }
            else {
                throw "Invalid child index";
            }
        };
        GComponent.prototype.getInsertPosForSortingChild = function (target) {
            var cnt = this._children.length;
            var i = 0;
            for (i = 0; i < cnt; i++) {
                var child = this._children[i];
                if (child == target)
                    continue;
                if (target.sortingOrder < child.sortingOrder)
                    break;
            }
            return i;
        };
        GComponent.prototype.removeChild = function (child, dispose) {
            if (dispose === void 0) { dispose = false; }
            var childIndex = this._children.indexOf(child);
            if (childIndex != -1) {
                this.removeChildAt(childIndex, dispose);
            }
            return child;
        };
        GComponent.prototype.removeChildAt = function (index, dispose) {
            if (dispose === void 0) { dispose = false; }
            if (index >= 0 && index < this.numChildren) {
                var child = this._children[index];
                child.parent = null;
                if (child.sortingOrder != 0)
                    this._sortingChildCount--;
                this._children.splice(index, 1);
                child.group = null;
                if (child.inContainer) {
                    this._container.removeChild(child.displayObject);
                    if (this._childrenRenderOrder == fairygui.ChildrenRenderOrder.Arch)
                        fairygui.GTimers.inst.callLater(this.buildNativeDisplayList, this);
                }
                if (dispose)
                    child.dispose();
                this.setBoundsChangedFlag();
                return child;
            }
            else {
                throw "Invalid child index";
            }
        };
        GComponent.prototype.removeChildren = function (beginIndex, endIndex, dispose) {
            if (beginIndex === void 0) { beginIndex = 0; }
            if (endIndex === void 0) { endIndex = -1; }
            if (dispose === void 0) { dispose = false; }
            if (endIndex < 0 || endIndex >= this.numChildren)
                endIndex = this.numChildren - 1;
            for (var i = beginIndex; i <= endIndex; ++i)
                this.removeChildAt(beginIndex, dispose);
        };
        GComponent.prototype.getChildAt = function (index) {
            if (index === void 0) { index = 0; }
            if (index >= 0 && index < this.numChildren)
                return this._children[index];
            else
                throw "Invalid child index";
        };
        GComponent.prototype.getChild = function (name) {
            var cnt = this._children.length;
            for (var i = 0; i < cnt; ++i) {
                if (this._children[i].name == name)
                    return this._children[i];
            }
            return null;
        };
        GComponent.prototype.getVisibleChild = function (name) {
            var cnt = this._children.length;
            for (var i = 0; i < cnt; ++i) {
                var child = this._children[i];
                if (child.internalVisible && child.internalVisible && child.name == name)
                    return child;
            }
            return null;
        };
        GComponent.prototype.getChildInGroup = function (name, group) {
            var cnt = this._children.length;
            for (var i = 0; i < cnt; ++i) {
                var child = this._children[i];
                if (child.group == group && child.name == name)
                    return child;
            }
            return null;
        };
        GComponent.prototype.getChildById = function (id) {
            var cnt = this._children.length;
            for (var i = 0; i < cnt; ++i) {
                if (this._children[i]._id == id)
                    return this._children[i];
            }
            return null;
        };
        GComponent.prototype.getChildIndex = function (child) {
            return this._children.indexOf(child);
        };
        GComponent.prototype.setChildIndex = function (child, index) {
            if (index === void 0) { index = 0; }
            var oldIndex = this._children.indexOf(child);
            if (oldIndex == -1)
                throw "Not a child of this container";
            if (child.sortingOrder != 0)
                return;
            var cnt = this._children.length;
            if (this._sortingChildCount > 0) {
                if (index > (cnt - this._sortingChildCount - 1))
                    index = cnt - this._sortingChildCount - 1;
            }
            this._setChildIndex(child, oldIndex, index);
        };
        GComponent.prototype.setChildIndexBefore = function (child, index) {
            var oldIndex = this._children.indexOf(child);
            if (oldIndex == -1)
                throw "Not a child of this container";
            if (child.sortingOrder != 0)
                return oldIndex;
            var cnt = this._children.length;
            if (this._sortingChildCount > 0) {
                if (index > (cnt - this._sortingChildCount - 1))
                    index = cnt - this._sortingChildCount - 1;
            }
            if (oldIndex < index)
                return this._setChildIndex(child, oldIndex, index - 1);
            else
                return this._setChildIndex(child, oldIndex, index);
        };
        GComponent.prototype._setChildIndex = function (child, oldIndex, index) {
            if (index === void 0) { index = 0; }
            var cnt = this._children.length;
            if (index > cnt)
                index = cnt;
            if (oldIndex == index)
                return oldIndex;
            this._children.splice(oldIndex, 1);
            this._children.splice(index, 0, child);
            if (child.inContainer) {
                var displayIndex = 0;
                var g;
                var i;
                if (this._childrenRenderOrder == fairygui.ChildrenRenderOrder.Ascent) {
                    for (i = 0; i < index; i++) {
                        g = this._children[i];
                        if (g.inContainer)
                            displayIndex++;
                    }
                    if (displayIndex == this._container.numChildren)
                        displayIndex--;
                    this._container.setChildIndex(child.displayObject, displayIndex);
                }
                else if (this._childrenRenderOrder == fairygui.ChildrenRenderOrder.Descent) {
                    for (i = cnt - 1; i > index; i--) {
                        g = this._children[i];
                        if (g.inContainer)
                            displayIndex++;
                    }
                    if (displayIndex == this._container.numChildren)
                        displayIndex--;
                    this._container.setChildIndex(child.displayObject, displayIndex);
                }
                else {
                    fairygui.GTimers.inst.callLater(this.buildNativeDisplayList, this);
                }
                this.setBoundsChangedFlag();
            }
            return index;
        };
        GComponent.prototype.swapChildren = function (child1, child2) {
            var index1 = this._children.indexOf(child1);
            var index2 = this._children.indexOf(child2);
            if (index1 == -1 || index2 == -1)
                throw "Not a child of this container";
            this.swapChildrenAt(index1, index2);
        };
        GComponent.prototype.swapChildrenAt = function (index1, index2) {
            if (index2 === void 0) { index2 = 0; }
            var child1 = this._children[index1];
            var child2 = this._children[index2];
            this.setChildIndex(child1, index2);
            this.setChildIndex(child2, index1);
        };
        Object.defineProperty(GComponent.prototype, "numChildren", {
            get: function () {
                return this._children.length;
            },
            enumerable: true,
            configurable: true
        });
        GComponent.prototype.isAncestorOf = function (child) {
            if (child == null)
                return false;
            var p = child.parent;
            while (p) {
                if (p == this)
                    return true;
                p = p.parent;
            }
            return false;
        };
        GComponent.prototype.addController = function (controller) {
            this._controllers.push(controller);
            controller.parent = this;
            this.applyController(controller);
        };
        GComponent.prototype.getControllerAt = function (index) {
            return this._controllers[index];
        };
        GComponent.prototype.getController = function (name) {
            var cnt = this._controllers.length;
            for (var i = 0; i < cnt; ++i) {
                var c = this._controllers[i];
                if (c.name == name)
                    return c;
            }
            return null;
        };
        GComponent.prototype.removeController = function (c) {
            var index = this._controllers.indexOf(c);
            if (index == -1)
                throw "controller not exists";
            c.parent = null;
            this._controllers.splice(index, 1);
            var length = this._children.length;
            for (var i = 0; i < length; i++) {
                var child = this._children[i];
                child.handleControllerChanged(c);
            }
        };
        Object.defineProperty(GComponent.prototype, "controllers", {
            get: function () {
                return this._controllers;
            },
            enumerable: true,
            configurable: true
        });
        GComponent.prototype.childStateChanged = function (child) {
            if (this._buildingDisplayList)
                return;
            var cnt = this._children.length;
            var g;
            var i;
            if (child instanceof fairygui.GGroup) {
                for (i = 0; i < cnt; i++) {
                    g = this._children[i];
                    if (g.group == child)
                        this.childStateChanged(g);
                }
                return;
            }
            if (!child.displayObject)
                return;
            if (child.internalVisible) {
                if (!child.displayObject.parent) {
                    var index = 0;
                    if (this._childrenRenderOrder == fairygui.ChildrenRenderOrder.Ascent) {
                        for (i = 0; i < cnt; i++) {
                            g = this._children[i];
                            if (g == child)
                                break;
                            if (g.displayObject != null && g.displayObject.parent != null)
                                index++;
                        }
                        this._container.addChildAt(child.displayObject, index);
                    }
                    else if (this._childrenRenderOrder == fairygui.ChildrenRenderOrder.Descent) {
                        for (i = cnt - 1; i >= 0; i--) {
                            g = this._children[i];
                            if (g == child)
                                break;
                            if (g.displayObject != null && g.displayObject.parent != null)
                                index++;
                        }
                        this._container.addChildAt(child.displayObject, index);
                    }
                    else {
                        this._container.addChild(child.displayObject);
                        fairygui.GTimers.inst.callLater(this.buildNativeDisplayList, this);
                    }
                }
            }
            else {
                if (child.displayObject.parent)
                    this._container.removeChild(child.displayObject);
            }
        };
        GComponent.prototype.buildNativeDisplayList = function () {
            var cnt = this._children.length;
            if (cnt == 0)
                return;
            var i;
            var child;
            switch (this._childrenRenderOrder) {
                case fairygui.ChildrenRenderOrder.Ascent:
                    {
                        for (i = 0; i < cnt; i++) {
                            child = this._children[i];
                            if (child.displayObject != null && child.internalVisible)
                                this._container.addChild(child.displayObject);
                        }
                    }
                    break;
                case fairygui.ChildrenRenderOrder.Descent:
                    {
                        for (i = cnt - 1; i >= 0; i--) {
                            child = this._children[i];
                            if (child.displayObject != null && child.internalVisible)
                                this._container.addChild(child.displayObject);
                        }
                    }
                    break;
                case fairygui.ChildrenRenderOrder.Arch:
                    {
                        for (i = 0; i < this._apexIndex; i++) {
                            child = this._children[i];
                            if (child.displayObject != null && child.internalVisible)
                                this._container.addChild(child.displayObject);
                        }
                        for (i = cnt - 1; i >= this._apexIndex; i--) {
                            child = this._children[i];
                            if (child.displayObject != null && child.internalVisible)
                                this._container.addChild(child.displayObject);
                        }
                    }
                    break;
            }
        };
        GComponent.prototype.applyController = function (c) {
            this._applyingController = c;
            var child;
            var length = this._children.length;
            for (var i = 0; i < length; i++) {
                child = this._children[i];
                child.handleControllerChanged(c);
            }
            this._applyingController = null;
            c.runActions();
        };
        GComponent.prototype.applyAllControllers = function () {
            var cnt = this._controllers.length;
            for (var i = 0; i < cnt; ++i) {
                this.applyController(this._controllers[i]);
            }
        };
        GComponent.prototype.adjustRadioGroupDepth = function (obj, c) {
            var cnt = this._children.length;
            var i;
            var child;
            var myIndex = -1, maxIndex = -1;
            for (i = 0; i < cnt; i++) {
                child = this._children[i];
                if (child == obj) {
                    myIndex = i;
                }
                else if ((child instanceof fairygui.GButton)
                    && child.relatedController == c) {
                    if (i > maxIndex)
                        maxIndex = i;
                }
            }
            if (myIndex < maxIndex) {
                if (this._applyingController != null)
                    this._children[maxIndex].handleControllerChanged(this._applyingController);
                this.swapChildrenAt(myIndex, maxIndex);
            }
        };
        GComponent.prototype.getTransitionAt = function (index) {
            return this._transitions[index];
        };
        GComponent.prototype.getTransition = function (transName) {
            var cnt = this._transitions.length;
            for (var i = 0; i < cnt; ++i) {
                var trans = this._transitions[i];
                if (trans.name == transName)
                    return trans;
            }
            return null;
        };
        GComponent.prototype.isChildInView = function (child) {
            if (this._rootContainer.scrollRect != null) {
                return child.x + child.width >= 0 && child.x <= this.width
                    && child.y + child.height >= 0 && child.y <= this.height;
            }
            else if (this._scrollPane != null) {
                return this._scrollPane.isChildInView(child);
            }
            else
                return true;
        };
        GComponent.prototype.getFirstChildInView = function () {
            var cnt = this._children.length;
            for (var i = 0; i < cnt; ++i) {
                var child = this._children[i];
                if (this.isChildInView(child))
                    return i;
            }
            return -1;
        };
        Object.defineProperty(GComponent.prototype, "scrollPane", {
            get: function () {
                return this._scrollPane;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComponent.prototype, "opaque", {
            get: function () {
                return this._opaque;
            },
            set: function (value) {
                if (this._opaque != value) {
                    this._opaque = value;
                    if (this._opaque)
                        this.updateOpaque();
                    else
                        this._rootContainer.hitArea = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComponent.prototype, "margin", {
            get: function () {
                return this._margin;
            },
            set: function (value) {
                this._margin.copy(value);
                if (this._rootContainer.scrollRect != null) {
                    this._container.x = this._margin.left + this._alignOffset.x;
                    this._container.y = this._margin.top + this._alignOffset.y;
                }
                this.handleSizeChanged();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComponent.prototype, "childrenRenderOrder", {
            get: function () {
                return this._childrenRenderOrder;
            },
            set: function (value) {
                if (this._childrenRenderOrder != value) {
                    this._childrenRenderOrder = value;
                    this.buildNativeDisplayList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComponent.prototype, "apexIndex", {
            get: function () {
                return this._apexIndex;
            },
            set: function (value) {
                if (this._apexIndex != value) {
                    this._apexIndex = value;
                    if (this._childrenRenderOrder == fairygui.ChildrenRenderOrder.Arch)
                        this.buildNativeDisplayList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComponent.prototype, "mask", {
            get: function () {
                return this._rootContainer.mask;
            },
            set: function (value) {
                this._rootContainer.mask = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComponent.prototype, "baseUserData", {
            get: function () {
                var buffer = this.packageItem.rawData;
                buffer.seek(0, 4);
                return buffer.readS();
            },
            enumerable: true,
            configurable: true
        });
        GComponent.prototype.updateOpaque = function () {
            if (!this._rootContainer.hitArea)
                this._rootContainer.hitArea = new egret.Rectangle();
            this._rootContainer.hitArea.setTo(0, 0, this.width, this.height);
        };
        GComponent.prototype.updateScrollRect = function () {
            var rect = this._rootContainer.scrollRect;
            if (rect == null)
                rect = new egret.Rectangle();
            var w = this.width - this._margin.right;
            var h = this.height - this._margin.bottom;
            rect.setTo(0, 0, w, h);
            this._rootContainer.scrollRect = rect;
        };
        GComponent.prototype.setupScroll = function (buffer) {
            if (this._rootContainer == this._container) {
                this._container = new egret.DisplayObjectContainer();
                this._rootContainer.addChild(this._container);
            }
            this._scrollPane = new fairygui.ScrollPane(this);
            this._scrollPane.setup(buffer);
            this.setBoundsChangedFlag();
        };
        GComponent.prototype.setupOverflow = function (overflow) {
            if (overflow == fairygui.OverflowType.Hidden) {
                if (this._rootContainer == this._container) {
                    this._container = new egret.DisplayObjectContainer();
                    this._rootContainer.addChild(this._container);
                }
                this.updateScrollRect();
                this._container.x = this._margin.left;
                this._container.y = this._margin.top;
            }
            else if (this._margin.left != 0 || this._margin.top != 0) {
                if (this._rootContainer == this._container) {
                    this._container = new egret.DisplayObjectContainer();
                    this._rootContainer.addChild(this._container);
                }
                this._container.x = this._margin.left;
                this._container.y = this._margin.top;
            }
            this.setBoundsChangedFlag();
        };
        GComponent.prototype.handleSizeChanged = function () {
            if (this._scrollPane)
                this._scrollPane.onOwnerSizeChanged();
            else if (this._rootContainer.scrollRect != null)
                this.updateScrollRect();
            if (this._opaque)
                this.updateOpaque();
        };
        GComponent.prototype.handleGrayedChanged = function () {
            var c = this.getController("grayed");
            if (c != null) {
                c.selectedIndex = this.grayed ? 1 : 0;
                return;
            }
            var v = this.grayed;
            var cnt = this._children.length;
            for (var i = 0; i < cnt; ++i) {
                this._children[i].grayed = v;
            }
        };
        GComponent.prototype.handleControllerChanged = function (c) {
            _super.prototype.handleControllerChanged.call(this, c);
            if (this._scrollPane != null)
                this._scrollPane.handleControllerChanged(c);
        };
        GComponent.prototype.setBoundsChangedFlag = function () {
            if (!this._scrollPane && !this._trackBounds)
                return;
            if (!this._boundsChanged) {
                this._boundsChanged = true;
                egret.callLater(this.__render, this);
            }
        };
        GComponent.prototype.__render = function () {
            if (this._boundsChanged) {
                var len = this._children.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        var child = this._children[i];
                        child.ensureSizeCorrect();
                    }
                }
                this.updateBounds();
            }
        };
        GComponent.prototype.ensureBoundsCorrect = function () {
            var len = this._children.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var child = this._children[i];
                    child.ensureSizeCorrect();
                }
            }
            if (this._boundsChanged)
                this.updateBounds();
        };
        GComponent.prototype.updateBounds = function () {
            var ax = 0, ay = 0, aw = 0, ah = 0;
            var len = this._children.length;
            if (len > 0) {
                ax = Number.POSITIVE_INFINITY, ay = Number.POSITIVE_INFINITY;
                var ar = Number.NEGATIVE_INFINITY, ab = Number.NEGATIVE_INFINITY;
                var tmp = 0;
                var i = 0;
                for (var i = 0; i < len; i++) {
                    var child = this._children[i];
                    tmp = child.x;
                    if (tmp < ax)
                        ax = tmp;
                    tmp = child.y;
                    if (tmp < ay)
                        ay = tmp;
                    tmp = child.x + child.actualWidth;
                    if (tmp > ar)
                        ar = tmp;
                    tmp = child.y + child.actualHeight;
                    if (tmp > ab)
                        ab = tmp;
                }
                aw = ar - ax;
                ah = ab - ay;
            }
            this.setBounds(ax, ay, aw, ah);
        };
        GComponent.prototype.setBounds = function (ax, ay, aw, ah) {
            if (ah === void 0) { ah = 0; }
            this._boundsChanged = false;
            if (this._scrollPane)
                this._scrollPane.setContentSize(Math.round(ax + aw), Math.round(ay + ah));
        };
        Object.defineProperty(GComponent.prototype, "viewWidth", {
            get: function () {
                if (this._scrollPane != null)
                    return this._scrollPane.viewWidth;
                else
                    return this.width - this._margin.left - this._margin.right;
            },
            set: function (value) {
                if (this._scrollPane != null)
                    this._scrollPane.viewWidth = value;
                else
                    this.width = value + this._margin.left + this._margin.right;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GComponent.prototype, "viewHeight", {
            get: function () {
                if (this._scrollPane != null)
                    return this._scrollPane.viewHeight;
                else
                    return this.height - this._margin.top - this._margin.bottom;
            },
            set: function (value) {
                if (this._scrollPane != null)
                    this._scrollPane.viewHeight = value;
                else
                    this.height = value + this._margin.top + this._margin.bottom;
            },
            enumerable: true,
            configurable: true
        });
        GComponent.prototype.getSnappingPosition = function (xValue, yValue, resultPoint) {
            if (!resultPoint)
                resultPoint = new egret.Point();
            var cnt = this._children.length;
            if (cnt == 0) {
                resultPoint.x = 0;
                resultPoint.y = 0;
                return resultPoint;
            }
            this.ensureBoundsCorrect();
            var obj = null;
            var prev = null;
            var i = 0;
            if (yValue != 0) {
                for (; i < cnt; i++) {
                    obj = this._children[i];
                    if (yValue < obj.y) {
                        if (i == 0) {
                            yValue = 0;
                            break;
                        }
                        else {
                            prev = this._children[i - 1];
                            if (yValue < prev.y + prev.actualHeight / 2)
                                yValue = prev.y;
                            else
                                yValue = obj.y;
                            break;
                        }
                    }
                }
                if (i == cnt)
                    yValue = obj.y;
            }
            if (xValue != 0) {
                if (i > 0)
                    i--;
                for (; i < cnt; i++) {
                    obj = this._children[i];
                    if (xValue < obj.x) {
                        if (i == 0) {
                            xValue = 0;
                            break;
                        }
                        else {
                            prev = this._children[i - 1];
                            if (xValue < prev.x + prev.actualWidth / 2)
                                xValue = prev.x;
                            else
                                xValue = obj.x;
                            break;
                        }
                    }
                }
                if (i == cnt)
                    xValue = obj.x;
            }
            resultPoint.x = xValue;
            resultPoint.y = yValue;
            return resultPoint;
        };
        GComponent.prototype.childSortingOrderChanged = function (child, oldValue, newValue) {
            if (newValue === void 0) { newValue = 0; }
            if (newValue == 0) {
                this._sortingChildCount--;
                this.setChildIndex(child, this._children.length);
            }
            else {
                if (oldValue == 0)
                    this._sortingChildCount++;
                var oldIndex = this._children.indexOf(child);
                var index = this.getInsertPosForSortingChild(child);
                if (oldIndex < index)
                    this._setChildIndex(child, oldIndex, index - 1);
                else
                    this._setChildIndex(child, oldIndex, index);
            }
        };
        GComponent.prototype.constructFromResource = function () {
            this.constructFromResource2(null, 0);
        };
        GComponent.prototype.constructFromResource2 = function (objectPool, poolIndex) {
            if (!this.packageItem.decoded) {
                this.packageItem.decoded = true;
                fairygui.TranslationHelper.translateComponent(this.packageItem);
            }
            var i;
            var dataLen;
            var curPos;
            var nextPos;
            var f1;
            var f2;
            var i1;
            var i2;
            var buffer = this.packageItem.rawData;
            buffer.seek(0, 0);
            this._underConstruct = true;
            this.sourceWidth = buffer.readInt();
            this.sourceHeight = buffer.readInt();
            this.initWidth = this.sourceWidth;
            this.initHeight = this.sourceHeight;
            this.setSize(this.sourceWidth, this.sourceHeight);
            if (buffer.readBool()) {
                this.minWidth = buffer.readInt();
                this.maxWidth = buffer.readInt();
                this.minHeight = buffer.readInt();
                this.maxHeight = buffer.readInt();
            }
            if (buffer.readBool()) {
                f1 = buffer.readFloat();
                f2 = buffer.readFloat();
                this.internalSetPivot(f1, f2, buffer.readBool());
            }
            if (buffer.readBool()) {
                this._margin.top = buffer.readInt();
                this._margin.bottom = buffer.readInt();
                this._margin.left = buffer.readInt();
                this._margin.right = buffer.readInt();
            }
            var overflow = buffer.readByte();
            if (overflow == fairygui.OverflowType.Scroll) {
                var savedPos = buffer.position;
                buffer.seek(0, 7);
                this.setupScroll(buffer);
                buffer.position = savedPos;
            }
            else
                this.setupOverflow(overflow);
            if (buffer.readBool())
                buffer.skip(8);
            this._buildingDisplayList = true;
            buffer.seek(0, 1);
            var controllerCount = buffer.readShort();
            for (i = 0; i < controllerCount; i++) {
                nextPos = buffer.readShort();
                nextPos += buffer.position;
                var controller = new fairygui.Controller();
                this._controllers.push(controller);
                controller.parent = this;
                controller.setup(buffer);
                buffer.position = nextPos;
            }
            buffer.seek(0, 2);
            var child;
            var childCount = buffer.readShort();
            for (i = 0; i < childCount; i++) {
                dataLen = buffer.readShort();
                curPos = buffer.position;
                if (objectPool != null)
                    child = objectPool[poolIndex + i];
                else {
                    buffer.seek(curPos, 0);
                    var type = buffer.readByte();
                    var src = buffer.readS();
                    var pkgId = buffer.readS();
                    var pi = null;
                    if (src != null) {
                        var pkg;
                        if (pkgId != null)
                            pkg = fairygui.UIPackage.getById(pkgId);
                        else
                            pkg = this.packageItem.owner;
                        pi = pkg != null ? pkg.getItemById(src) : null;
                    }
                    if (pi != null) {
                        child = fairygui.UIObjectFactory.newObject(pi);
                        child.packageItem = pi;
                        child.constructFromResource();
                    }
                    else
                        child = fairygui.UIObjectFactory.newObject2(type);
                }
                child._underConstruct = true;
                child.setup_beforeAdd(buffer, curPos);
                child.parent = this;
                this._children.push(child);
                buffer.position = curPos + dataLen;
            }
            buffer.seek(0, 3);
            this.relations.setup(buffer, true);
            buffer.seek(0, 2);
            buffer.skip(2);
            for (i = 0; i < childCount; i++) {
                nextPos = buffer.readShort();
                nextPos += buffer.position;
                buffer.seek(buffer.position, 3);
                this._children[i].relations.setup(buffer, false);
                buffer.position = nextPos;
            }
            buffer.seek(0, 2);
            buffer.skip(2);
            for (i = 0; i < childCount; i++) {
                nextPos = buffer.readShort();
                nextPos += buffer.position;
                child = this._children[i];
                child.setup_afterAdd(buffer, buffer.position);
                child._underConstruct = false;
                buffer.position = nextPos;
            }
            buffer.seek(0, 4);
            buffer.skip(2); //customData
            this.opaque = buffer.readBool();
            var maskId = buffer.readShort();
            if (maskId != -1) {
                this.mask = this.getChildAt(maskId).displayObject;
                buffer.readBool(); //reversedMask
            }
            var hitTestId = buffer.readS();
            if (hitTestId != null) {
                /*pi = this.packageItem.owner.getItemById(hitTestId);
                if (pi != null && pi.pixelHitTestData != null)
                {
                    i1 = buffer.readInt();
                    i2 = buffer.readInt();
                    this._displayObject.hitArea = new PixelHitTest(pi.pixelHitTestData, i1, i2);
                }*/
            }
            buffer.seek(0, 5);
            var transitionCount = buffer.readShort();
            for (i = 0; i < transitionCount; i++) {
                nextPos = buffer.readShort();
                nextPos += buffer.position;
                var trans = new fairygui.Transition(this);
                trans.setup(buffer);
                this._transitions.push(trans);
                buffer.position = nextPos;
            }
            if (this._transitions.length > 0) {
                this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.___added, this);
                this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.___removed, this);
            }
            this.applyAllControllers();
            this._buildingDisplayList = false;
            this._underConstruct = false;
            this.buildNativeDisplayList();
            this.setBoundsChangedFlag();
            if (this.packageItem.objectType != fairygui.ObjectType.Component)
                this.constructExtension(buffer);
            this.constructFromXML(null);
        };
        GComponent.prototype.constructExtension = function (buffer) {
        };
        GComponent.prototype.constructFromXML = function (xml) {
        };
        GComponent.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            buffer.seek(beginPos, 4);
            var pageController = buffer.readShort();
            if (pageController != null && this._scrollPane != null)
                this._scrollPane.pageController = this._parent.getControllerAt(pageController);
            var cnt = buffer.readShort();
            for (var i = 0; i < cnt; i++) {
                var cc = this.getController(buffer.readS());
                var pageId = buffer.readS();
                if (cc != null)
                    cc.selectedPageId = pageId;
            }
        };
        GComponent.prototype.___added = function (evt) {
            var cnt = this._transitions.length;
            for (var i = 0; i < cnt; ++i) {
                this._transitions[i].onOwnerAddedToStage();
            }
        };
        GComponent.prototype.___removed = function (evt) {
            var cnt = this._transitions.length;
            for (var i = 0; i < cnt; ++i) {
                this._transitions[i].onOwnerRemovedFromStage();
            }
        };
        return GComponent;
    }(fairygui.GObject));
    fairygui.GComponent = GComponent;
    __reflect(GComponent.prototype, "fairygui.GComponent");
})(fairygui || (fairygui = {}));
