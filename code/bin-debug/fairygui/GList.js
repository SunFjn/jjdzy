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
    var GList = (function (_super) {
        __extends(GList, _super);
        function GList() {
            var _this = _super.call(this) || this;
            _this.scrollItemToViewOnClick = true;
            _this.foldInvisibleItems = false;
            _this._lineCount = 0;
            _this._columnCount = 0;
            _this._lineGap = 0;
            _this._columnGap = 0;
            _this._lastSelectedIndex = 0;
            _this._numItems = 0;
            _this._realNumItems = 0;
            _this._firstIndex = 0; //the top left index
            _this._curLineItemCount = 0; //item count in one line
            _this._curLineItemCount2 = 0; //只用在页面模式，表示垂直方向的项目数
            _this._virtualListChanged = 0; //1-content changed, 2-size changed
            _this.itemInfoVer = 0; //用来标志item是否在本次处理中已经被重用了
            _this._trackBounds = true;
            _this._pool = new fairygui.GObjectPool();
            _this._layout = fairygui.ListLayoutType.SingleColumn;
            _this._autoResizeItem = true;
            _this._lastSelectedIndex = -1;
            _this._selectionMode = fairygui.ListSelectionMode.Single;
            _this.opaque = true;
            _this._align = fairygui.AlignType.Left;
            _this._verticalAlign = fairygui.VertAlignType.Top;
            _this._container = new egret.DisplayObjectContainer();
            _this._rootContainer.addChild(_this._container);
            return _this;
        }
        GList.prototype.dispose = function () {
            this._pool.clear();
            _super.prototype.dispose.call(this);
        };
        Object.defineProperty(GList.prototype, "layout", {
            get: function () {
                return this._layout;
            },
            set: function (value) {
                if (this._layout != value) {
                    this._layout = value;
                    this.setBoundsChangedFlag();
                    if (this._virtual)
                        this.setVirtualListChangedFlag(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GList.prototype, "lineCount", {
            get: function () {
                return this._lineCount;
            },
            set: function (value) {
                if (this._lineCount != value) {
                    this._lineCount = value;
                    this.setBoundsChangedFlag();
                    if (this._virtual)
                        this.setVirtualListChangedFlag(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GList.prototype, "columnCount", {
            get: function () {
                return this._columnCount;
            },
            set: function (value) {
                if (this._columnCount != value) {
                    this._columnCount = value;
                    this.setBoundsChangedFlag();
                    if (this._virtual)
                        this.setVirtualListChangedFlag(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GList.prototype, "lineGap", {
            get: function () {
                return this._lineGap;
            },
            set: function (value) {
                if (this._lineGap != value) {
                    this._lineGap = value;
                    this.setBoundsChangedFlag();
                    if (this._virtual)
                        this.setVirtualListChangedFlag(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GList.prototype, "columnGap", {
            get: function () {
                return this._columnGap;
            },
            set: function (value) {
                if (this._columnGap != value) {
                    this._columnGap = value;
                    this.setBoundsChangedFlag();
                    if (this._virtual)
                        this.setVirtualListChangedFlag(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GList.prototype, "align", {
            get: function () {
                return this._align;
            },
            set: function (value) {
                if (this._align != value) {
                    this._align = value;
                    this.setBoundsChangedFlag();
                    if (this._virtual)
                        this.setVirtualListChangedFlag(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GList.prototype, "verticalAlign", {
            get: function () {
                return this._verticalAlign;
            },
            set: function (value) {
                if (this._verticalAlign != value) {
                    this._verticalAlign = value;
                    this.setBoundsChangedFlag();
                    if (this._virtual)
                        this.setVirtualListChangedFlag(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GList.prototype, "virtualItemSize", {
            get: function () {
                return this._itemSize;
            },
            set: function (value) {
                if (this._virtual) {
                    if (this._itemSize == null)
                        this._itemSize = new egret.Point();
                    this._itemSize.copyFrom(value);
                    this.setVirtualListChangedFlag(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GList.prototype, "defaultItem", {
            get: function () {
                return this._defaultItem;
            },
            set: function (val) {
                this._defaultItem = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GList.prototype, "autoResizeItem", {
            get: function () {
                return this._autoResizeItem;
            },
            set: function (value) {
                if (this._autoResizeItem != value) {
                    this._autoResizeItem = value;
                    this.setBoundsChangedFlag();
                    if (this._virtual)
                        this.setVirtualListChangedFlag(true);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GList.prototype, "selectionMode", {
            get: function () {
                return this._selectionMode;
            },
            set: function (value) {
                this._selectionMode = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GList.prototype, "selectionController", {
            get: function () {
                return this._selectionController;
            },
            set: function (value) {
                this._selectionController = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GList.prototype, "itemPool", {
            get: function () {
                return this._pool;
            },
            enumerable: true,
            configurable: true
        });
        GList.prototype.getFromPool = function (url) {
            if (url === void 0) { url = null; }
            if (!url)
                url = this._defaultItem;
            var obj = this._pool.getObject(url);
            if (obj != null)
                obj.visible = true;
            return obj;
        };
        GList.prototype.returnToPool = function (obj) {
            obj.clean();
            obj.displayObject.cacheAsBitmap = false;
            this._pool.returnObject(obj);
        };
        GList.prototype.addChildAt = function (child, index) {
            if (index === void 0) { index = 0; }
            _super.prototype.addChildAt.call(this, child, index);
            if (child instanceof fairygui.GButton) {
                var button = child;
                button.selected = false;
                button.changeStateOnClick = false;
            }
            child.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__clickItem, this);
            return child;
        };
        GList.prototype.addItem = function (url) {
            if (url === void 0) { url = null; }
            if (!url)
                url = this._defaultItem;
            return this.addChild(fairygui.UIPackage.createObjectFromURL(url));
        };
        GList.prototype.addItemFromPool = function (url) {
            if (url === void 0) { url = null; }
            return this.addChild(this.getFromPool(url));
        };
        GList.prototype.removeChildAt = function (index, dispose) {
            if (dispose === void 0) { dispose = false; }
            var child = _super.prototype.removeChildAt.call(this, index, dispose);
            child.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__clickItem, this);
            return child;
        };
        GList.prototype.removeChildToPoolAt = function (index) {
            if (index === void 0) { index = 0; }
            var child = _super.prototype.removeChildAt.call(this, index);
            this.returnToPool(child);
        };
        GList.prototype.removeChildToPool = function (child) {
            _super.prototype.removeChild.call(this, child);
            this.returnToPool(child);
        };
        GList.prototype.removeChildrenToPool = function (beginIndex, endIndex) {
            if (beginIndex === void 0) { beginIndex = 0; }
            if (endIndex === void 0) { endIndex = -1; }
            if (endIndex < 0 || endIndex >= this._children.length)
                endIndex = this._children.length - 1;
            for (var i = beginIndex; i <= endIndex; ++i)
                this.removeChildToPoolAt(beginIndex);
        };
        Object.defineProperty(GList.prototype, "selectedIndex", {
            get: function () {
                var i;
                if (this._virtual) {
                    for (i = 0; i < this._realNumItems; i++) {
                        var ii = this._virtualItems[i];
                        if ((ii.obj instanceof fairygui.GButton) && ii.obj.selected
                            || ii.obj == null && ii.selected) {
                            if (this._loop)
                                return i % this._numItems;
                            else
                                return i;
                        }
                    }
                }
                else {
                    var cnt = this._children.length;
                    for (i = 0; i < cnt; i++) {
                        var obj = this._children[i].asButton;
                        if (obj != null && obj.selected)
                            return i;
                    }
                }
                return -1;
            },
            set: function (value) {
                if (value >= 0 && value < this.numItems) {
                    if (this._selectionMode != fairygui.ListSelectionMode.Single)
                        this.clearSelection();
                    this.addSelection(value);
                }
                else
                    this.clearSelection();
            },
            enumerable: true,
            configurable: true
        });
        GList.prototype.getSelection = function () {
            var ret = new Array();
            var i;
            if (this._virtual) {
                for (i = 0; i < this._realNumItems; i++) {
                    var ii = this._virtualItems[i];
                    if ((ii.obj instanceof fairygui.GButton) && ii.obj.selected
                        || ii.obj == null && ii.selected) {
                        var j = i;
                        if (this._loop) {
                            j = i % this._numItems;
                            if (ret.indexOf(j) != -1)
                                continue;
                        }
                        ret.push(j);
                    }
                }
            }
            else {
                var cnt = this._children.length;
                for (i = 0; i < cnt; i++) {
                    var obj = this._children[i].asButton;
                    if (obj != null && obj.selected)
                        ret.push(i);
                }
            }
            return ret;
        };
        GList.prototype.addSelection = function (index, scrollItToView) {
            if (scrollItToView === void 0) { scrollItToView = false; }
            if (this._selectionMode == fairygui.ListSelectionMode.None)
                return;
            this.checkVirtualList();
            if (this._selectionMode == fairygui.ListSelectionMode.Single)
                this.clearSelection();
            if (scrollItToView)
                this.scrollToView(index);
            this._lastSelectedIndex = index;
            var obj = null;
            if (this._virtual) {
                var ii = this._virtualItems[index];
                if (ii.obj != null)
                    obj = ii.obj.asButton;
                ii.selected = true;
            }
            else
                obj = this.getChildAt(index).asButton;
            if (obj != null && !obj.selected) {
                obj.selected = true;
                this.updateSelectionController(index);
            }
        };
        GList.prototype.removeSelection = function (index) {
            if (this._selectionMode == fairygui.ListSelectionMode.None)
                return;
            var obj = null;
            if (this._virtual) {
                var ii = this._virtualItems[index];
                if (ii.obj != null)
                    obj = ii.obj.asButton;
                ii.selected = false;
            }
            else
                obj = this.getChildAt(index).asButton;
            if (obj != null)
                obj.selected = false;
        };
        GList.prototype.clearSelection = function () {
            var i;
            if (this._virtual) {
                for (i = 0; i < this._realNumItems; i++) {
                    var ii = this._virtualItems[i];
                    if (ii.obj instanceof fairygui.GButton)
                        ii.obj.selected = false;
                    ii.selected = false;
                }
            }
            else {
                var cnt = this._children.length;
                for (i = 0; i < cnt; i++) {
                    var obj = this._children[i].asButton;
                    if (obj != null)
                        obj.selected = false;
                }
            }
        };
        GList.prototype.clearSelectionExcept = function (g) {
            var i;
            if (this._virtual) {
                for (i = 0; i < this._realNumItems; i++) {
                    var ii = this._virtualItems[i];
                    if (ii.obj != g) {
                        if ((ii.obj instanceof fairygui.GButton))
                            ii.obj.selected = false;
                        ii.selected = false;
                    }
                }
            }
            else {
                var cnt = this._children.length;
                for (i = 0; i < cnt; i++) {
                    var obj = this._children[i].asButton;
                    if (obj != null && obj != g)
                        obj.selected = false;
                }
            }
        };
        GList.prototype.selectAll = function () {
            this.checkVirtualList();
            var last = -1;
            var i;
            if (this._virtual) {
                for (i = 0; i < this._realNumItems; i++) {
                    var ii = this._virtualItems[i];
                    if ((ii.obj instanceof fairygui.GButton) && !ii.obj.selected) {
                        ii.obj.selected = true;
                        last = i;
                    }
                    ii.selected = true;
                }
            }
            else {
                var cnt = this._children.length;
                for (i = 0; i < cnt; i++) {
                    var obj = this._children[i].asButton;
                    if (obj != null && !obj.selected) {
                        obj.selected = true;
                        last = i;
                    }
                }
            }
            if (last != -1)
                this.updateSelectionController(last);
        };
        GList.prototype.selectNone = function () {
            this.clearSelection();
        };
        GList.prototype.selectReverse = function () {
            this.checkVirtualList();
            var last = -1;
            var i;
            if (this._virtual) {
                for (i = 0; i < this._realNumItems; i++) {
                    var ii = this._virtualItems[i];
                    if (ii.obj instanceof fairygui.GButton) {
                        ii.obj.selected = !ii.obj.selected;
                        if (ii.obj.selected)
                            last = i;
                    }
                    ii.selected = !ii.selected;
                }
            }
            else {
                var cnt = this._children.length;
                for (i = 0; i < cnt; i++) {
                    var obj = this._children[i].asButton;
                    if (obj != null) {
                        obj.selected = !obj.selected;
                        if (obj.selected)
                            last = i;
                    }
                }
            }
            if (last != -1)
                this.updateSelectionController(last);
        };
        GList.prototype.handleArrowKey = function (dir) {
            if (dir === void 0) { dir = 0; }
            var index = this.selectedIndex;
            if (index == -1)
                return;
            switch (dir) {
                case 1://up
                    if (this._layout == fairygui.ListLayoutType.SingleColumn || this._layout == fairygui.ListLayoutType.FlowVertical) {
                        index--;
                        if (index >= 0) {
                            this.clearSelection();
                            this.addSelection(index, true);
                        }
                    }
                    else if (this._layout == fairygui.ListLayoutType.FlowHorizontal || this._layout == fairygui.ListLayoutType.Pagination) {
                        var current = this._children[index];
                        var k = 0;
                        for (var i = index - 1; i >= 0; i--) {
                            var obj = this._children[i];
                            if (obj.y != current.y) {
                                current = obj;
                                break;
                            }
                            k++;
                        }
                        for (; i >= 0; i--) {
                            obj = this._children[i];
                            if (obj.y != current.y) {
                                this.clearSelection();
                                this.addSelection(i + k + 1, true);
                                break;
                            }
                        }
                    }
                    break;
                case 3://right
                    if (this._layout == fairygui.ListLayoutType.SingleRow || this._layout == fairygui.ListLayoutType.FlowHorizontal || this._layout == fairygui.ListLayoutType.Pagination) {
                        index++;
                        if (index < this._children.length) {
                            this.clearSelection();
                            this.addSelection(index, true);
                        }
                    }
                    else if (this._layout == fairygui.ListLayoutType.FlowVertical) {
                        current = this._children[index];
                        k = 0;
                        var cnt = this._children.length;
                        for (i = index + 1; i < cnt; i++) {
                            obj = this._children[i];
                            if (obj.x != current.x) {
                                current = obj;
                                break;
                            }
                            k++;
                        }
                        for (; i < cnt; i++) {
                            obj = this._children[i];
                            if (obj.x != current.x) {
                                this.clearSelection();
                                this.addSelection(i - k - 1, true);
                                break;
                            }
                        }
                    }
                    break;
                case 5://down
                    if (this._layout == fairygui.ListLayoutType.SingleColumn || this._layout == fairygui.ListLayoutType.FlowVertical) {
                        index++;
                        if (index < this._children.length) {
                            this.clearSelection();
                            this.addSelection(index, true);
                        }
                    }
                    else if (this._layout == fairygui.ListLayoutType.FlowHorizontal || this._layout == fairygui.ListLayoutType.Pagination) {
                        current = this._children[index];
                        k = 0;
                        cnt = this._children.length;
                        for (i = index + 1; i < cnt; i++) {
                            obj = this._children[i];
                            if (obj.y != current.y) {
                                current = obj;
                                break;
                            }
                            k++;
                        }
                        for (; i < cnt; i++) {
                            obj = this._children[i];
                            if (obj.y != current.y) {
                                this.clearSelection();
                                this.addSelection(i - k - 1, true);
                                break;
                            }
                        }
                    }
                    break;
                case 7://left
                    if (this._layout == fairygui.ListLayoutType.SingleRow || this._layout == fairygui.ListLayoutType.FlowHorizontal || this._layout == fairygui.ListLayoutType.Pagination) {
                        index--;
                        if (index >= 0) {
                            this.clearSelection();
                            this.addSelection(index, true);
                        }
                    }
                    else if (this._layout == fairygui.ListLayoutType.FlowVertical) {
                        current = this._children[index];
                        k = 0;
                        for (i = index - 1; i >= 0; i--) {
                            obj = this._children[i];
                            if (obj.x != current.x) {
                                current = obj;
                                break;
                            }
                            k++;
                        }
                        for (; i >= 0; i--) {
                            obj = this._children[i];
                            if (obj.x != current.x) {
                                this.clearSelection();
                                this.addSelection(i + k + 1, true);
                                break;
                            }
                        }
                    }
                    break;
            }
        };
        GList.prototype.__clickItem = function (evt) {
            if (this._scrollPane != null && this._scrollPane.isDragged)
                return;
            var item = (evt.currentTarget);
            if (!item || !item._parent)
                return;
            this.setSelectionOnEvent(item);
            if (this._scrollPane && this.scrollItemToViewOnClick)
                this._scrollPane.scrollToView(item, true);
            var ie = new fairygui.ItemEvent(fairygui.ItemEvent.CLICK, item);
            ie.stageX = evt.stageX;
            ie.stageY = evt.stageY;
            this.dispatchEvent(ie);
        };
        GList.prototype.setSelectionOnEvent = function (item) {
            if (!(item instanceof fairygui.GButton) || this._selectionMode == fairygui.ListSelectionMode.None)
                return;
            var dontChangeLastIndex = false;
            var button = item;
            var index = this.childIndexToItemIndex(this.getChildIndex(item));
            if (this._selectionMode == fairygui.ListSelectionMode.Single) {
                if (!button.selected) {
                    this.clearSelectionExcept(button);
                    button.selected = true;
                }
            }
            else {
                if (fairygui.GRoot.shiftKeyDown) {
                    if (!button.selected) {
                        if (this._lastSelectedIndex != -1) {
                            var min = Math.min(this._lastSelectedIndex, index);
                            var max = Math.max(this._lastSelectedIndex, index);
                            max = Math.min(max, this.numItems - 1);
                            var i;
                            if (this._virtual) {
                                for (i = min; i <= max; i++) {
                                    var ii = this._virtualItems[i];
                                    if (ii.obj instanceof fairygui.GButton)
                                        ii.obj.selected = true;
                                    ii.selected = true;
                                }
                            }
                            else {
                                for (i = min; i <= max; i++) {
                                    var obj = this.getChildAt(i).asButton;
                                    if (obj != null)
                                        obj.selected = true;
                                }
                            }
                            dontChangeLastIndex = true;
                        }
                        else {
                            button.selected = true;
                        }
                    }
                }
                else if (fairygui.GRoot.ctrlKeyDown || this._selectionMode == fairygui.ListSelectionMode.Multiple_SingleClick) {
                    button.selected = !button.selected;
                }
                else {
                    if (!button.selected) {
                        this.clearSelectionExcept(button);
                        button.selected = true;
                    }
                    else
                        this.clearSelectionExcept(button);
                }
            }
            if (!dontChangeLastIndex)
                this._lastSelectedIndex = index;
            if (button.selected)
                this.updateSelectionController(index);
        };
        GList.prototype.resizeToFit = function (itemCount, minSize) {
            if (itemCount === void 0) { itemCount = Number.POSITIVE_INFINITY; }
            if (minSize === void 0) { minSize = 0; }
            this.ensureBoundsCorrect();
            var curCount = this.numItems;
            if (itemCount > curCount)
                itemCount = curCount;
            if (this._virtual) {
                var lineCount = Math.ceil(itemCount / this._curLineItemCount);
                if (this._layout == fairygui.ListLayoutType.SingleColumn || this._layout == fairygui.ListLayoutType.FlowHorizontal)
                    this.viewHeight = lineCount * this._itemSize.y + Math.max(0, lineCount - 1) * this._lineGap;
                else
                    this.viewWidth = lineCount * this._itemSize.x + Math.max(0, lineCount - 1) * this._columnGap;
            }
            else if (itemCount == 0) {
                if (this._layout == fairygui.ListLayoutType.SingleColumn || this._layout == fairygui.ListLayoutType.FlowHorizontal)
                    this.viewHeight = minSize;
                else
                    this.viewWidth = minSize;
            }
            else {
                var i = itemCount - 1;
                var obj = null;
                while (i >= 0) {
                    obj = this.getChildAt(i);
                    if (!this.foldInvisibleItems || obj.visible)
                        break;
                    i--;
                }
                if (i < 0) {
                    if (this._layout == fairygui.ListLayoutType.SingleColumn || this._layout == fairygui.ListLayoutType.FlowHorizontal)
                        this.viewHeight = minSize;
                    else
                        this.viewWidth = minSize;
                }
                else {
                    var size = 0;
                    if (this._layout == fairygui.ListLayoutType.SingleColumn || this._layout == fairygui.ListLayoutType.FlowHorizontal) {
                        size = obj.y + obj.height;
                        if (size < minSize)
                            size = minSize;
                        this.viewHeight = size;
                    }
                    else {
                        size = obj.x + obj.width;
                        if (size < minSize)
                            size = minSize;
                        this.viewWidth = size;
                    }
                }
            }
        };
        GList.prototype.getMaxItemWidth = function () {
            var cnt = this._children.length;
            var max = 0;
            for (var i = 0; i < cnt; i++) {
                var child = this.getChildAt(i);
                if (child.width > max)
                    max = child.width;
            }
            return max;
        };
        GList.prototype.handleSizeChanged = function () {
            _super.prototype.handleSizeChanged.call(this);
            this.setBoundsChangedFlag();
            if (this._virtual)
                this.setVirtualListChangedFlag(true);
        };
        GList.prototype.handleControllerChanged = function (c) {
            _super.prototype.handleControllerChanged.call(this, c);
            if (this._selectionController == c)
                this.selectedIndex = c.selectedIndex;
        };
        GList.prototype.updateSelectionController = function (index) {
            if (this._selectionController != null && !this._selectionController.changing
                && index < this._selectionController.pageCount) {
                var c = this._selectionController;
                this._selectionController = null;
                c.selectedIndex = index;
                this._selectionController = c;
            }
        };
        GList.prototype.getSnappingPosition = function (xValue, yValue, resultPoint) {
            if (this._virtual) {
                if (!resultPoint)
                    resultPoint = new egret.Point();
                var saved;
                var index;
                if (this._layout == fairygui.ListLayoutType.SingleColumn || this._layout == fairygui.ListLayoutType.FlowHorizontal) {
                    saved = yValue;
                    GList.pos_param = yValue;
                    index = this.getIndexOnPos1(false);
                    yValue = GList.pos_param;
                    if (index < this._virtualItems.length && saved - yValue > this._virtualItems[index].height / 2 && index < this._realNumItems)
                        yValue += this._virtualItems[index].height + this._lineGap;
                }
                else if (this._layout == fairygui.ListLayoutType.SingleRow || this._layout == fairygui.ListLayoutType.FlowVertical) {
                    saved = xValue;
                    GList.pos_param = xValue;
                    index = this.getIndexOnPos2(false);
                    xValue = GList.pos_param;
                    if (index < this._virtualItems.length && saved - xValue > this._virtualItems[index].width / 2 && index < this._realNumItems)
                        xValue += this._virtualItems[index].width + this._columnGap;
                }
                else {
                    saved = xValue;
                    GList.pos_param = xValue;
                    index = this.getIndexOnPos3(false);
                    xValue = GList.pos_param;
                    if (index < this._virtualItems.length && saved - xValue > this._virtualItems[index].width / 2 && index < this._realNumItems)
                        xValue += this._virtualItems[index].width + this._columnGap;
                }
                resultPoint.x = xValue;
                resultPoint.y = yValue;
                return resultPoint;
            }
            else {
                return _super.prototype.getSnappingPosition.call(this, xValue, yValue, resultPoint);
            }
        };
        GList.prototype.scrollToView = function (index, ani, setFirst) {
            if (ani === void 0) { ani = false; }
            if (setFirst === void 0) { setFirst = false; }
            if (this._virtual) {
                if (this._numItems == 0)
                    return;
                this.checkVirtualList();
                if (index >= this._virtualItems.length)
                    throw "Invalid child index: " + index + ">" + this._virtualItems.length;
                if (this._loop)
                    index = Math.floor(this._firstIndex / this._numItems) * this._numItems + index;
                var rect;
                var ii = this._virtualItems[index];
                var pos = 0;
                var i;
                if (this._layout == fairygui.ListLayoutType.SingleColumn || this._layout == fairygui.ListLayoutType.FlowHorizontal) {
                    for (i = this._curLineItemCount - 1; i < index; i += this._curLineItemCount)
                        pos += this._virtualItems[i].height + this._lineGap;
                    rect = new egret.Rectangle(0, pos, this._itemSize.x, ii.height);
                }
                else if (this._layout == fairygui.ListLayoutType.SingleRow || this._layout == fairygui.ListLayoutType.FlowVertical) {
                    for (i = this._curLineItemCount - 1; i < index; i += this._curLineItemCount)
                        pos += this._virtualItems[i].width + this._columnGap;
                    rect = new egret.Rectangle(pos, 0, ii.width, this._itemSize.y);
                }
                else {
                    var page = index / (this._curLineItemCount * this._curLineItemCount2);
                    rect = new egret.Rectangle(page * this.viewWidth + (index % this._curLineItemCount) * (ii.width + this._columnGap), (index / this._curLineItemCount) % this._curLineItemCount2 * (ii.height + this._lineGap), ii.width, ii.height);
                }
                setFirst = true; //因为在可变item大小的情况下，只有设置在最顶端，位置才不会因为高度变化而改变，所以只能支持setFirst=true
                if (this._scrollPane != null)
                    this._scrollPane.scrollToView(rect, ani, setFirst);
            }
            else {
                var obj = this.getChildAt(index);
                if (obj != null) {
                    if (this._scrollPane != null)
                        this._scrollPane.scrollToView(obj, ani, setFirst);
                    else if (this.parent != null && this.parent.scrollPane != null)
                        this.parent.scrollPane.scrollToView(obj, ani, setFirst);
                }
            }
        };
        GList.prototype.getFirstChildInView = function () {
            return this.childIndexToItemIndex(_super.prototype.getFirstChildInView.call(this));
        };
        GList.prototype.childIndexToItemIndex = function (index) {
            if (!this._virtual)
                return index;
            if (this._layout == fairygui.ListLayoutType.Pagination) {
                for (var i = this._firstIndex; i < this._realNumItems; i++) {
                    if (this._virtualItems[i].obj != null) {
                        index--;
                        if (index < 0)
                            return i;
                    }
                }
                return index;
            }
            else {
                index += this._firstIndex;
                if (this._loop && this._numItems > 0)
                    index = index % this._numItems;
                return index;
            }
        };
        GList.prototype.itemIndexToChildIndex = function (index) {
            if (!this._virtual)
                return index;
            if (this._layout == fairygui.ListLayoutType.Pagination) {
                return this.getChildIndex(this._virtualItems[index].obj);
            }
            else {
                if (this._loop && this._numItems > 0) {
                    var j = this._firstIndex % this._numItems;
                    if (index >= j)
                        index = index - j;
                    else
                        index = this._numItems - j + index;
                }
                else
                    index -= this._firstIndex;
                return index;
            }
        };
        GList.prototype.setVirtual = function () {
            this._setVirtual(false);
        };
        /// <summary>
        /// Set the list to be virtual list, and has loop behavior.
        /// </summary>
        GList.prototype.setVirtualAndLoop = function () {
            this._setVirtual(true);
        };
        /// <summary>
        /// Set the list to be virtual list.
        /// </summary>
        GList.prototype._setVirtual = function (loop) {
            if (!this._virtual) {
                if (this._scrollPane == null)
                    throw "Virtual list must be scrollable!";
                if (loop) {
                    if (this._layout == fairygui.ListLayoutType.FlowHorizontal || this._layout == fairygui.ListLayoutType.FlowVertical)
                        throw "Loop list is not supported for FlowHorizontal or FlowVertical layout!";
                    this._scrollPane.bouncebackEffect = false;
                }
                this._virtual = true;
                this._loop = loop;
                this._virtualItems = new Array();
                this.removeChildrenToPool();
                if (this._itemSize == null) {
                    this._itemSize = new egret.Point();
                    var obj = this.getFromPool(null);
                    if (obj == null) {
                        throw "Virtual List must have a default list item resource.";
                    }
                    else {
                        this._itemSize.x = obj.width;
                        this._itemSize.y = obj.height;
                    }
                    this.returnToPool(obj);
                }
                if (this._layout == fairygui.ListLayoutType.SingleColumn || this._layout == fairygui.ListLayoutType.FlowHorizontal) {
                    this._scrollPane.scrollStep = this._itemSize.y;
                    if (this._loop)
                        this._scrollPane._loop = 2;
                }
                else {
                    this._scrollPane.scrollStep = this._itemSize.x;
                    if (this._loop)
                        this._scrollPane._loop = 1;
                }
                this._scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.__scrolled, this);
                this.setVirtualListChangedFlag(true);
            }
        };
        Object.defineProperty(GList.prototype, "numItems", {
            /// <summary>
            /// Set the list item count. 
            /// If the list is not virtual, specified number of items will be created. 
            /// If the list is virtual, only items in view will be created.
            /// </summary>
            get: function () {
                if (this._virtual)
                    return this._numItems;
                else
                    return this._children.length;
            },
            set: function (value) {
                if (this._virtual) {
                    if (this.itemRenderer == null)
                        throw "Set itemRenderer first!";
                    this._numItems = value;
                    if (this._loop)
                        this._realNumItems = this._numItems * 6; //设置6倍数量，用于循环滚动
                    else
                        this._realNumItems = this._numItems;
                    //_virtualItems的设计是只增不减的
                    var oldCount = this._virtualItems.length;
                    if (this._realNumItems > oldCount) {
                        for (i = oldCount; i < this._realNumItems; i++) {
                            var ii = new fairygui.ItemInfo();
                            ii.width = this._itemSize.x;
                            ii.height = this._itemSize.y;
                            this._virtualItems.push(ii);
                        }
                    }
                    else {
                        for (i = this._realNumItems; i < oldCount; i++)
                            this._virtualItems[i].selected = false;
                    }
                    if (this._virtualListChanged != 0)
                        fairygui.GTimers.inst.remove(this._refreshVirtualList, this);
                    //立即刷新
                    this._refreshVirtualList();
                }
                else {
                    var cnt = this._children.length;
                    if (value > cnt) {
                        for (var i = cnt; i < value; i++) {
                            if (this.itemProvider == null)
                                this.addItemFromPool();
                            else
                                this.addItemFromPool(this.itemProvider.call(this.callbackThisObj, i));
                        }
                    }
                    else {
                        this.removeChildrenToPool(value, cnt);
                    }
                    if (this.itemRenderer != null) {
                        for (i = 0; i < value; i++)
                            this.itemRenderer.call(this.callbackThisObj, i, this.getChildAt(i));
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        GList.prototype.refreshVirtualList = function () {
            this.setVirtualListChangedFlag(false);
        };
        GList.prototype.checkVirtualList = function () {
            if (this._virtualListChanged != 0) {
                this._refreshVirtualList();
                fairygui.GTimers.inst.remove(this._refreshVirtualList, this);
            }
        };
        GList.prototype.setVirtualListChangedFlag = function (layoutChanged) {
            if (layoutChanged === void 0) { layoutChanged = false; }
            if (layoutChanged)
                this._virtualListChanged = 2;
            else if (this._virtualListChanged == 0)
                this._virtualListChanged = 1;
            fairygui.GTimers.inst.callLater(this._refreshVirtualList, this);
        };
        GList.prototype._refreshVirtualList = function () {
            var layoutChanged = this._virtualListChanged == 2;
            this._virtualListChanged = 0;
            this._eventLocked = true;
            if (layoutChanged) {
                if (this._layout == fairygui.ListLayoutType.SingleColumn || this._layout == fairygui.ListLayoutType.SingleRow)
                    this._curLineItemCount = 1;
                else if (this._layout == fairygui.ListLayoutType.FlowHorizontal) {
                    if (this._columnCount > 0)
                        this._curLineItemCount = this._columnCount;
                    else {
                        this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.x + this._columnGap));
                        if (this._curLineItemCount <= 0)
                            this._curLineItemCount = 1;
                    }
                }
                else if (this._layout == fairygui.ListLayoutType.FlowVertical) {
                    if (this._lineCount > 0)
                        this._curLineItemCount = this._lineCount;
                    else {
                        this._curLineItemCount = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.y + this._lineGap));
                        if (this._curLineItemCount <= 0)
                            this._curLineItemCount = 1;
                    }
                }
                else {
                    if (this._columnCount > 0)
                        this._curLineItemCount = this._columnCount;
                    else {
                        this._curLineItemCount = Math.floor((this._scrollPane.viewWidth + this._columnGap) / (this._itemSize.x + this._columnGap));
                        if (this._curLineItemCount <= 0)
                            this._curLineItemCount = 1;
                    }
                    if (this._lineCount > 0)
                        this._curLineItemCount2 = this._lineCount;
                    else {
                        this._curLineItemCount2 = Math.floor((this._scrollPane.viewHeight + this._lineGap) / (this._itemSize.y + this._lineGap));
                        if (this._curLineItemCount2 <= 0)
                            this._curLineItemCount2 = 1;
                    }
                }
            }
            var ch = 0, cw = 0;
            if (this._realNumItems > 0) {
                var i;
                var len = Math.ceil(this._realNumItems / this._curLineItemCount) * this._curLineItemCount;
                var len2 = Math.min(this._curLineItemCount, this._realNumItems);
                if (this._layout == fairygui.ListLayoutType.SingleColumn || this._layout == fairygui.ListLayoutType.FlowHorizontal) {
                    for (i = 0; i < len; i += this._curLineItemCount)
                        ch += this._virtualItems[i].height + this._lineGap;
                    if (ch > 0)
                        ch -= this._lineGap;
                    if (this._autoResizeItem)
                        cw = this._scrollPane.viewWidth;
                    else {
                        for (i = 0; i < len2; i++)
                            cw += this._virtualItems[i].width + this._columnGap;
                        if (cw > 0)
                            cw -= this._columnGap;
                    }
                }
                else if (this._layout == fairygui.ListLayoutType.SingleRow || this._layout == fairygui.ListLayoutType.FlowVertical) {
                    for (i = 0; i < len; i += this._curLineItemCount)
                        cw += this._virtualItems[i].width + this._columnGap;
                    if (cw > 0)
                        cw -= this._columnGap;
                    if (this._autoResizeItem)
                        ch = this._scrollPane.viewHeight;
                    else {
                        for (i = 0; i < len2; i++)
                            ch += this._virtualItems[i].height + this._lineGap;
                        if (ch > 0)
                            ch -= this._lineGap;
                    }
                }
                else {
                    var pageCount = Math.ceil(len / (this._curLineItemCount * this._curLineItemCount2));
                    cw = pageCount * this.viewWidth;
                    ch = this.viewHeight;
                }
            }
            this.handleAlign(cw, ch);
            this._scrollPane.setContentSize(cw, ch);
            this._eventLocked = false;
            this.handleScroll(true);
        };
        GList.prototype.__scrolled = function (evt) {
            this.handleScroll(false);
        };
        GList.prototype.getIndexOnPos1 = function (forceUpdate) {
            if (this._realNumItems < this._curLineItemCount) {
                GList.pos_param = 0;
                return 0;
            }
            var i;
            var pos2;
            var pos3;
            if (this.numChildren > 0 && !forceUpdate) {
                pos2 = this.getChildAt(0).y;
                if (pos2 > GList.pos_param) {
                    for (i = this._firstIndex - this._curLineItemCount; i >= 0; i -= this._curLineItemCount) {
                        pos2 -= (this._virtualItems[i].height + this._lineGap);
                        if (pos2 <= GList.pos_param) {
                            GList.pos_param = pos2;
                            return i;
                        }
                    }
                    GList.pos_param = 0;
                    return 0;
                }
                else {
                    for (i = this._firstIndex; i < this._realNumItems; i += this._curLineItemCount) {
                        pos3 = pos2 + this._virtualItems[i].height + this._lineGap;
                        if (pos3 > GList.pos_param) {
                            GList.pos_param = pos2;
                            return i;
                        }
                        pos2 = pos3;
                    }
                    GList.pos_param = pos2;
                    return this._realNumItems - this._curLineItemCount;
                }
            }
            else {
                pos2 = 0;
                for (i = 0; i < this._realNumItems; i += this._curLineItemCount) {
                    pos3 = pos2 + this._virtualItems[i].height + this._lineGap;
                    if (pos3 > GList.pos_param) {
                        GList.pos_param = pos2;
                        return i;
                    }
                    pos2 = pos3;
                }
                GList.pos_param = pos2;
                return this._realNumItems - this._curLineItemCount;
            }
        };
        GList.prototype.getIndexOnPos2 = function (forceUpdate) {
            if (this._realNumItems < this._curLineItemCount) {
                GList.pos_param = 0;
                return 0;
            }
            var i;
            var pos2;
            var pos3;
            if (this.numChildren > 0 && !forceUpdate) {
                pos2 = this.getChildAt(0).x;
                if (pos2 > GList.pos_param) {
                    for (i = this._firstIndex - this._curLineItemCount; i >= 0; i -= this._curLineItemCount) {
                        pos2 -= (this._virtualItems[i].width + this._columnGap);
                        if (pos2 <= GList.pos_param) {
                            GList.pos_param = pos2;
                            return i;
                        }
                    }
                    GList.pos_param = 0;
                    return 0;
                }
                else {
                    for (i = this._firstIndex; i < this._realNumItems; i += this._curLineItemCount) {
                        pos3 = pos2 + this._virtualItems[i].width + this._columnGap;
                        if (pos3 > GList.pos_param) {
                            GList.pos_param = pos2;
                            return i;
                        }
                        pos2 = pos3;
                    }
                    GList.pos_param = pos2;
                    return this._realNumItems - this._curLineItemCount;
                }
            }
            else {
                pos2 = 0;
                for (i = 0; i < this._realNumItems; i += this._curLineItemCount) {
                    pos3 = pos2 + this._virtualItems[i].width + this._columnGap;
                    if (pos3 > GList.pos_param) {
                        GList.pos_param = pos2;
                        return i;
                    }
                    pos2 = pos3;
                }
                GList.pos_param = pos2;
                return this._realNumItems - this._curLineItemCount;
            }
        };
        GList.prototype.getIndexOnPos3 = function (forceUpdate) {
            if (this._realNumItems < this._curLineItemCount) {
                GList.pos_param = 0;
                return 0;
            }
            var viewWidth = this.viewWidth;
            var page = Math.floor(GList.pos_param / viewWidth);
            var startIndex = page * (this._curLineItemCount * this._curLineItemCount2);
            var pos2 = page * viewWidth;
            var i;
            var pos3;
            for (i = 0; i < this._curLineItemCount; i++) {
                pos3 = pos2 + this._virtualItems[startIndex + i].width + this._columnGap;
                if (pos3 > GList.pos_param) {
                    GList.pos_param = pos2;
                    return startIndex + i;
                }
                pos2 = pos3;
            }
            GList.pos_param = pos2;
            return startIndex + this._curLineItemCount - 1;
        };
        GList.prototype.handleScroll = function (forceUpdate) {
            if (this._eventLocked)
                return;
            if (this._layout == fairygui.ListLayoutType.SingleColumn || this._layout == fairygui.ListLayoutType.FlowHorizontal) {
                var enterCounter = 0;
                while (this.handleScroll1(forceUpdate)) {
                    enterCounter++;
                    forceUpdate = false;
                    if (enterCounter > 20) {
                        console.log("FairyGUI: list will never be filled as the item renderer function always returns a different size.");
                        break;
                    }
                }
                this.handleArchOrder1();
            }
            else if (this._layout == fairygui.ListLayoutType.SingleRow || this._layout == fairygui.ListLayoutType.FlowVertical) {
                enterCounter = 0;
                while (this.handleScroll2(forceUpdate)) {
                    enterCounter++;
                    forceUpdate = false;
                    if (enterCounter > 20) {
                        console.log("FairyGUI: list will never be filled as the item renderer function always returns a different size.");
                        break;
                    }
                }
                this.handleArchOrder2();
            }
            else {
                this.handleScroll3(forceUpdate);
            }
            this._boundsChanged = false;
        };
        GList.prototype.handleScroll1 = function (forceUpdate) {
            var pos = this._scrollPane.scrollingPosY;
            var max = pos + this._scrollPane.viewHeight;
            var end = max == this._scrollPane.contentHeight; //这个标志表示当前需要滚动到最末，无论内容变化大小
            //寻找当前位置的第一条项目
            GList.pos_param = pos;
            var newFirstIndex = this.getIndexOnPos1(forceUpdate);
            pos = GList.pos_param;
            if (newFirstIndex == this._firstIndex && !forceUpdate) {
                return false;
            }
            var oldFirstIndex = this._firstIndex;
            this._firstIndex = newFirstIndex;
            var curIndex = newFirstIndex;
            var forward = oldFirstIndex > newFirstIndex;
            var childCount = this.numChildren;
            var lastIndex = oldFirstIndex + childCount - 1;
            var reuseIndex = forward ? lastIndex : oldFirstIndex;
            var curX = 0, curY = pos;
            var needRender;
            var deltaSize = 0;
            var firstItemDeltaSize = 0;
            var url = this.defaultItem;
            var ii, ii2;
            var i, j;
            var partSize = (this._scrollPane.viewWidth - this._columnGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
            this.itemInfoVer++;
            while (curIndex < this._realNumItems && (end || curY < max)) {
                ii = this._virtualItems[curIndex];
                if (ii.obj == null || forceUpdate) {
                    if (this.itemProvider != null) {
                        url = this.itemProvider.call(this.callbackThisObj, curIndex % this._numItems);
                        if (url == null)
                            url = this._defaultItem;
                        url = fairygui.UIPackage.normalizeURL(url);
                    }
                    if (ii.obj != null && ii.obj.resourceURL != url) {
                        if (ii.obj instanceof fairygui.GButton)
                            ii.selected = ii.obj.selected;
                        this.removeChildToPool(ii.obj);
                        ii.obj = null;
                    }
                }
                if (ii.obj == null) {
                    //搜索最适合的重用item，保证每次刷新需要新建或者重新render的item最少
                    if (forward) {
                        for (j = reuseIndex; j >= oldFirstIndex; j--) {
                            ii2 = this._virtualItems[j];
                            if (ii2.obj != null && ii2.updateFlag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                                if (ii2.obj instanceof fairygui.GButton)
                                    ii2.selected = ii2.obj.selected;
                                ii.obj = ii2.obj;
                                ii2.obj = null;
                                if (j == reuseIndex)
                                    reuseIndex--;
                                break;
                            }
                        }
                    }
                    else {
                        for (j = reuseIndex; j <= lastIndex; j++) {
                            ii2 = this._virtualItems[j];
                            if (ii2.obj != null && ii2.updateFlag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                                if (ii2.obj instanceof fairygui.GButton)
                                    ii2.selected = ii2.obj.selected;
                                ii.obj = ii2.obj;
                                ii2.obj = null;
                                if (j == reuseIndex)
                                    reuseIndex++;
                                break;
                            }
                        }
                    }
                    if (ii.obj != null) {
                        this.setChildIndex(ii.obj, forward ? curIndex - newFirstIndex : this.numChildren);
                    }
                    else {
                        ii.obj = this._pool.getObject(url);
                        if (forward)
                            this.addChildAt(ii.obj, curIndex - newFirstIndex);
                        else
                            this.addChild(ii.obj);
                    }
                    if (ii.obj instanceof fairygui.GButton)
                        ii.obj.selected = ii.selected;
                    needRender = true;
                }
                else
                    needRender = forceUpdate;
                if (needRender) {
                    if (this._autoResizeItem && (this._layout == fairygui.ListLayoutType.SingleColumn || this._columnCount > 0))
                        ii.obj.setSize(partSize, ii.obj.height, true);
                    this.itemRenderer.call(this.callbackThisObj, curIndex % this._numItems, ii.obj);
                    if (curIndex % this._curLineItemCount == 0) {
                        deltaSize += Math.ceil(ii.obj.height) - ii.height;
                        if (curIndex == newFirstIndex && oldFirstIndex > newFirstIndex) {
                            //当内容向下滚动时，如果新出现的项目大小发生变化，需要做一个位置补偿，才不会导致滚动跳动
                            firstItemDeltaSize = Math.ceil(ii.obj.height) - ii.height;
                        }
                    }
                    ii.width = Math.ceil(ii.obj.width);
                    ii.height = Math.ceil(ii.obj.height);
                }
                ii.updateFlag = this.itemInfoVer;
                ii.obj.setXY(curX, curY);
                if (curIndex == newFirstIndex)
                    max += ii.height;
                curX += ii.width + this._columnGap;
                if (curIndex % this._curLineItemCount == this._curLineItemCount - 1) {
                    curX = 0;
                    curY += ii.height + this._lineGap;
                }
                curIndex++;
            }
            for (i = 0; i < childCount; i++) {
                ii = this._virtualItems[oldFirstIndex + i];
                if (ii.updateFlag != this.itemInfoVer && ii.obj != null) {
                    if (ii.obj instanceof fairygui.GButton)
                        ii.selected = ii.obj.selected;
                    this.removeChildToPool(ii.obj);
                    ii.obj = null;
                }
            }
            childCount = this._children.length;
            for (i = 0; i < childCount; i++) {
                var obj = this._virtualItems[newFirstIndex + i].obj;
                if (this._children[i] != obj)
                    this.setChildIndex(obj, i);
            }
            if (deltaSize != 0 || firstItemDeltaSize != 0)
                this._scrollPane.changeContentSizeOnScrolling(0, deltaSize, 0, firstItemDeltaSize);
            if (curIndex > 0 && this.numChildren > 0 && this._container.y <= 0 && this.getChildAt(0).y > -this._container.y)
                return true;
            else
                return false;
        };
        GList.prototype.handleScroll2 = function (forceUpdate) {
            var pos = this._scrollPane.scrollingPosX;
            var max = pos + this._scrollPane.viewWidth;
            var end = pos == this._scrollPane.contentWidth; //这个标志表示当前需要滚动到最末，无论内容变化大小
            //寻找当前位置的第一条项目
            GList.pos_param = pos;
            var newFirstIndex = this.getIndexOnPos2(forceUpdate);
            pos = GList.pos_param;
            if (newFirstIndex == this._firstIndex && !forceUpdate) {
                return false;
            }
            var oldFirstIndex = this._firstIndex;
            this._firstIndex = newFirstIndex;
            var curIndex = newFirstIndex;
            var forward = oldFirstIndex > newFirstIndex;
            var childCount = this.numChildren;
            var lastIndex = oldFirstIndex + childCount - 1;
            var reuseIndex = forward ? lastIndex : oldFirstIndex;
            var curX = pos, curY = 0;
            var needRender;
            var deltaSize = 0;
            var firstItemDeltaSize = 0;
            var url = this.defaultItem;
            var ii, ii2;
            var i, j;
            var partSize = (this._scrollPane.viewHeight - this._lineGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
            this.itemInfoVer++;
            while (curIndex < this._realNumItems && (end || curX < max)) {
                ii = this._virtualItems[curIndex];
                if (ii.obj == null || forceUpdate) {
                    if (this.itemProvider != null) {
                        url = this.itemProvider.call(this.callbackThisObj, curIndex % this._numItems);
                        if (url == null)
                            url = this._defaultItem;
                        url = fairygui.UIPackage.normalizeURL(url);
                    }
                    if (ii.obj != null && ii.obj.resourceURL != url) {
                        if (ii.obj instanceof fairygui.GButton)
                            ii.selected = ii.obj.selected;
                        this.removeChildToPool(ii.obj);
                        ii.obj = null;
                    }
                }
                if (ii.obj == null) {
                    if (forward) {
                        for (j = reuseIndex; j >= oldFirstIndex; j--) {
                            ii2 = this._virtualItems[j];
                            if (ii2.obj != null && ii2.updateFlag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                                if (ii2.obj instanceof fairygui.GButton)
                                    ii2.selected = ii2.obj.selected;
                                ii.obj = ii2.obj;
                                ii2.obj = null;
                                if (j == reuseIndex)
                                    reuseIndex--;
                                break;
                            }
                        }
                    }
                    else {
                        for (j = reuseIndex; j <= lastIndex; j++) {
                            ii2 = this._virtualItems[j];
                            if (ii2.obj != null && ii2.updateFlag != this.itemInfoVer && ii2.obj.resourceURL == url) {
                                if (ii2.obj instanceof fairygui.GButton)
                                    ii2.selected = ii2.obj.selected;
                                ii.obj = ii2.obj;
                                ii2.obj = null;
                                if (j == reuseIndex)
                                    reuseIndex++;
                                break;
                            }
                        }
                    }
                    if (ii.obj != null) {
                        this.setChildIndex(ii.obj, forward ? curIndex - newFirstIndex : this.numChildren);
                    }
                    else {
                        ii.obj = this._pool.getObject(url);
                        if (forward)
                            this.addChildAt(ii.obj, curIndex - newFirstIndex);
                        else
                            this.addChild(ii.obj);
                    }
                    if (ii.obj instanceof fairygui.GButton)
                        ii.obj.selected = ii.selected;
                    needRender = true;
                }
                else
                    needRender = forceUpdate;
                if (needRender) {
                    if (this._autoResizeItem && (this._layout == fairygui.ListLayoutType.SingleRow || this._lineCount > 0))
                        ii.obj.setSize(ii.obj.width, partSize, true);
                    this.itemRenderer.call(this.callbackThisObj, curIndex % this._numItems, ii.obj);
                    if (curIndex % this._curLineItemCount == 0) {
                        deltaSize += Math.ceil(ii.obj.width) - ii.width;
                        if (curIndex == newFirstIndex && oldFirstIndex > newFirstIndex) {
                            //当内容向下滚动时，如果新出现的一个项目大小发生变化，需要做一个位置补偿，才不会导致滚动跳动
                            firstItemDeltaSize = Math.ceil(ii.obj.width) - ii.width;
                        }
                    }
                    ii.width = Math.ceil(ii.obj.width);
                    ii.height = Math.ceil(ii.obj.height);
                }
                ii.updateFlag = this.itemInfoVer;
                ii.obj.setXY(curX, curY);
                if (curIndex == newFirstIndex)
                    max += ii.width;
                curY += ii.height + this._lineGap;
                if (curIndex % this._curLineItemCount == this._curLineItemCount - 1) {
                    curY = 0;
                    curX += ii.width + this._columnGap;
                }
                curIndex++;
            }
            for (i = 0; i < childCount; i++) {
                ii = this._virtualItems[oldFirstIndex + i];
                if (ii.updateFlag != this.itemInfoVer && ii.obj != null) {
                    if (ii.obj instanceof fairygui.GButton)
                        ii.selected = ii.obj.selected;
                    this.removeChildToPool(ii.obj);
                    ii.obj = null;
                }
            }
            childCount = this._children.length;
            for (i = 0; i < childCount; i++) {
                var obj = this._virtualItems[newFirstIndex + i].obj;
                if (this._children[i] != obj)
                    this.setChildIndex(obj, i);
            }
            if (deltaSize != 0 || firstItemDeltaSize != 0)
                this._scrollPane.changeContentSizeOnScrolling(deltaSize, 0, firstItemDeltaSize, 0);
            if (curIndex > 0 && this.numChildren > 0 && this._container.x <= 0 && this.getChildAt(0).x > -this._container.x)
                return true;
            else
                return false;
        };
        GList.prototype.handleScroll3 = function (forceUpdate) {
            var pos = this._scrollPane.scrollingPosX;
            //寻找当前位置的第一条项目
            GList.pos_param = pos;
            var newFirstIndex = this.getIndexOnPos3(forceUpdate);
            pos = GList.pos_param;
            if (newFirstIndex == this._firstIndex && !forceUpdate)
                return;
            var oldFirstIndex = this._firstIndex;
            this._firstIndex = newFirstIndex;
            //分页模式不支持不等高，所以渲染满一页就好了
            var reuseIndex = oldFirstIndex;
            var virtualItemCount = this._virtualItems.length;
            var pageSize = this._curLineItemCount * this._curLineItemCount2;
            var startCol = newFirstIndex % this._curLineItemCount;
            var viewWidth = this.viewWidth;
            var page = Math.floor(newFirstIndex / pageSize);
            var startIndex = page * pageSize;
            var lastIndex = startIndex + pageSize * 2; //测试两页
            var needRender;
            var i;
            var ii, ii2;
            var col;
            var url = this._defaultItem;
            var partWidth = (this._scrollPane.viewWidth - this._columnGap * (this._curLineItemCount - 1)) / this._curLineItemCount;
            var partHeight = (this._scrollPane.viewHeight - this._lineGap * (this._curLineItemCount2 - 1)) / this._curLineItemCount2;
            this.itemInfoVer++;
            //先标记这次要用到的项目
            for (i = startIndex; i < lastIndex; i++) {
                if (i >= this._realNumItems)
                    continue;
                col = i % this._curLineItemCount;
                if (i - startIndex < pageSize) {
                    if (col < startCol)
                        continue;
                }
                else {
                    if (col > startCol)
                        continue;
                }
                ii = this._virtualItems[i];
                ii.updateFlag = this.itemInfoVer;
            }
            var lastObj = null;
            var insertIndex = 0;
            for (i = startIndex; i < lastIndex; i++) {
                if (i >= this._realNumItems)
                    continue;
                ii = this._virtualItems[i];
                if (ii.updateFlag != this.itemInfoVer)
                    continue;
                if (ii.obj == null) {
                    //寻找看有没有可重用的
                    while (reuseIndex < virtualItemCount) {
                        ii2 = this._virtualItems[reuseIndex];
                        if (ii2.obj != null && ii2.updateFlag != this.itemInfoVer) {
                            if (ii2.obj instanceof fairygui.GButton)
                                ii2.selected = ii2.obj.selected;
                            ii.obj = ii2.obj;
                            ii2.obj = null;
                            break;
                        }
                        reuseIndex++;
                    }
                    if (insertIndex == -1)
                        insertIndex = this.getChildIndex(lastObj) + 1;
                    if (ii.obj == null) {
                        if (this.itemProvider != null) {
                            url = this.itemProvider.call(this.callbackThisObj, i % this._numItems);
                            if (url == null)
                                url = this._defaultItem;
                            url = fairygui.UIPackage.normalizeURL(url);
                        }
                        ii.obj = this._pool.getObject(url);
                        this.addChildAt(ii.obj, insertIndex);
                    }
                    else {
                        insertIndex = this.setChildIndexBefore(ii.obj, insertIndex);
                    }
                    insertIndex++;
                    if (ii.obj instanceof fairygui.GButton)
                        ii.obj.selected = ii.selected;
                    needRender = true;
                }
                else {
                    needRender = forceUpdate;
                    insertIndex = -1;
                    lastObj = ii.obj;
                }
                if (needRender) {
                    if (this._autoResizeItem) {
                        if (this._curLineItemCount == this._columnCount && this._curLineItemCount2 == this._lineCount)
                            ii.obj.setSize(partWidth, partHeight, true);
                        else if (this._curLineItemCount == this._columnCount)
                            ii.obj.setSize(partWidth, ii.obj.height, true);
                        else if (this._curLineItemCount2 == this._lineCount)
                            ii.obj.setSize(ii.obj.width, partHeight, true);
                    }
                    this.itemRenderer.call(this.callbackThisObj, i % this._numItems, ii.obj);
                    ii.width = Math.ceil(ii.obj.width);
                    ii.height = Math.ceil(ii.obj.height);
                }
            }
            //排列item
            var borderX = (startIndex / pageSize) * viewWidth;
            var xx = borderX;
            var yy = 0;
            var lineHeight = 0;
            for (i = startIndex; i < lastIndex; i++) {
                if (i >= this._realNumItems)
                    continue;
                ii = this._virtualItems[i];
                if (ii.updateFlag == this.itemInfoVer)
                    ii.obj.setXY(xx, yy);
                if (ii.height > lineHeight)
                    lineHeight = ii.height;
                if (i % this._curLineItemCount == this._curLineItemCount - 1) {
                    xx = borderX;
                    yy += lineHeight + this._lineGap;
                    lineHeight = 0;
                    if (i == startIndex + pageSize - 1) {
                        borderX += viewWidth;
                        xx = borderX;
                        yy = 0;
                    }
                }
                else
                    xx += ii.width + this._columnGap;
            }
            //释放未使用的
            for (i = reuseIndex; i < virtualItemCount; i++) {
                ii = this._virtualItems[i];
                if (ii.updateFlag != this.itemInfoVer && ii.obj != null) {
                    if (ii.obj instanceof fairygui.GButton)
                        ii.selected = ii.obj.selected;
                    this.removeChildToPool(ii.obj);
                    ii.obj = null;
                }
            }
        };
        GList.prototype.handleArchOrder1 = function () {
            if (this._childrenRenderOrder == fairygui.ChildrenRenderOrder.Arch) {
                var mid = this._scrollPane.posY + this.viewHeight / 2;
                var minDist = Number.POSITIVE_INFINITY;
                var dist = 0;
                var apexIndex = 0;
                var cnt = this.numChildren;
                for (var i = 0; i < cnt; i++) {
                    var obj = this.getChildAt(i);
                    if (!this.foldInvisibleItems || obj.visible) {
                        dist = Math.abs(mid - obj.y - obj.height / 2);
                        if (dist < minDist) {
                            minDist = dist;
                            apexIndex = i;
                        }
                    }
                }
                this.apexIndex = apexIndex;
            }
        };
        GList.prototype.handleArchOrder2 = function () {
            if (this._childrenRenderOrder == fairygui.ChildrenRenderOrder.Arch) {
                var mid = this._scrollPane.posX + this.viewWidth / 2;
                var minDist = Number.POSITIVE_INFINITY;
                var dist = 0;
                var apexIndex = 0;
                var cnt = this.numChildren;
                for (var i = 0; i < cnt; i++) {
                    var obj = this.getChildAt(i);
                    if (!this.foldInvisibleItems || obj.visible) {
                        dist = Math.abs(mid - obj.x - obj.width / 2);
                        if (dist < minDist) {
                            minDist = dist;
                            apexIndex = i;
                        }
                    }
                }
                this.apexIndex = apexIndex;
            }
        };
        GList.prototype.handleAlign = function (contentWidth, contentHeight) {
            var newOffsetX = 0;
            var newOffsetY = 0;
            if (contentHeight < this.viewHeight) {
                if (this._verticalAlign == fairygui.VertAlignType.Middle)
                    newOffsetY = Math.floor((this.viewHeight - contentHeight) / 2);
                else if (this._verticalAlign == fairygui.VertAlignType.Bottom)
                    newOffsetY = this.viewHeight - contentHeight;
            }
            if (contentWidth < this.viewWidth) {
                if (this._align == fairygui.AlignType.Center)
                    newOffsetX = Math.floor((this.viewWidth - contentWidth) / 2);
                else if (this._align == fairygui.AlignType.Right)
                    newOffsetX = this.viewWidth - contentWidth;
            }
            if (newOffsetX != this._alignOffset.x || newOffsetY != this._alignOffset.y) {
                this._alignOffset.setTo(newOffsetX, newOffsetY);
                if (this._scrollPane != null)
                    this._scrollPane.adjustMaskContainer();
                else {
                    this._container.x = this._margin.left + this._alignOffset.x;
                    this._container.y = this._margin.top + this._alignOffset.y;
                }
            }
        };
        GList.prototype.updateBounds = function () {
            if (this._virtual)
                return;
            var i;
            var child;
            var curX = 0;
            var curY = 0;
            var maxWidth = 0;
            var maxHeight = 0;
            var cw = 0, ch = 0;
            var j = 0;
            var page = 0;
            var k = 0;
            var cnt = this._children.length;
            var viewWidth = this.viewWidth;
            var viewHeight = this.viewHeight;
            var lineSize = 0;
            var lineStart = 0;
            var ratio = 0;
            if (this._layout == fairygui.ListLayoutType.SingleColumn) {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    if (curY != 0)
                        curY += this._lineGap;
                    child.y = curY;
                    if (this._autoResizeItem)
                        child.setSize(viewWidth, child.height, true);
                    curY += Math.ceil(child.height);
                    if (child.width > maxWidth)
                        maxWidth = child.width;
                }
                cw = Math.ceil(maxWidth);
                ch = curY;
            }
            else if (this._layout == fairygui.ListLayoutType.SingleRow) {
                for (i = 0; i < cnt; i++) {
                    child = this.getChildAt(i);
                    if (this.foldInvisibleItems && !child.visible)
                        continue;
                    if (curX != 0)
                        curX += this._columnGap;
                    child.x = curX;
                    if (this._autoResizeItem)
                        child.setSize(child.width, viewHeight, true);
                    curX += Math.ceil(child.width);
                    if (child.height > maxHeight)
                        maxHeight = child.height;
                }
                cw = curX;
                ch = Math.ceil(maxHeight);
            }
            else if (this._layout == fairygui.ListLayoutType.FlowHorizontal) {
                if (this._autoResizeItem && this._columnCount > 0) {
                    for (i = 0; i < cnt; i++) {
                        child = this.getChildAt(i);
                        if (this.foldInvisibleItems && !child.visible)
                            continue;
                        lineSize += child.sourceWidth;
                        j++;
                        if (j == this._columnCount || i == cnt - 1) {
                            ratio = (viewWidth - lineSize - (j - 1) * this._columnGap) / lineSize;
                            curX = 0;
                            for (j = lineStart; j <= i; j++) {
                                child = this.getChildAt(j);
                                if (this.foldInvisibleItems && !child.visible)
                                    continue;
                                child.setXY(curX, curY);
                                if (j < i) {
                                    child.setSize(child.sourceWidth + Math.round(child.sourceWidth * ratio), child.height, true);
                                    curX += Math.ceil(child.width) + this._columnGap;
                                }
                                else {
                                    child.setSize(viewWidth - curX, child.height, true);
                                }
                                if (child.height > maxHeight)
                                    maxHeight = child.height;
                            }
                            //new line
                            curY += Math.ceil(maxHeight) + this._lineGap;
                            maxHeight = 0;
                            j = 0;
                            lineStart = i + 1;
                            lineSize = 0;
                        }
                    }
                    ch = curY + Math.ceil(maxHeight);
                    cw = viewWidth;
                }
                else {
                    for (i = 0; i < cnt; i++) {
                        child = this.getChildAt(i);
                        if (this.foldInvisibleItems && !child.visible)
                            continue;
                        if (curX != 0)
                            curX += this._columnGap;
                        if (this._columnCount != 0 && j >= this._columnCount
                            || this._columnCount == 0 && curX + child.width > viewWidth && maxHeight != 0) {
                            //new line
                            curX = 0;
                            curY += Math.ceil(maxHeight) + this._lineGap;
                            maxHeight = 0;
                            j = 0;
                        }
                        child.setXY(curX, curY);
                        curX += Math.ceil(child.width);
                        if (curX > maxWidth)
                            maxWidth = curX;
                        if (child.height > maxHeight)
                            maxHeight = child.height;
                        j++;
                    }
                    ch = curY + Math.ceil(maxHeight);
                    cw = Math.ceil(maxWidth);
                }
            }
            else if (this._layout == fairygui.ListLayoutType.FlowVertical) {
                if (this._autoResizeItem && this._lineCount > 0) {
                    for (i = 0; i < cnt; i++) {
                        child = this.getChildAt(i);
                        if (this.foldInvisibleItems && !child.visible)
                            continue;
                        lineSize += child.sourceHeight;
                        j++;
                        if (j == this._lineCount || i == cnt - 1) {
                            ratio = (viewHeight - lineSize - (j - 1) * this._lineGap) / lineSize;
                            curY = 0;
                            for (j = lineStart; j <= i; j++) {
                                child = this.getChildAt(j);
                                if (this.foldInvisibleItems && !child.visible)
                                    continue;
                                child.setXY(curX, curY);
                                if (j < i) {
                                    child.setSize(child.width, child.sourceHeight + Math.round(child.sourceHeight * ratio), true);
                                    curY += Math.ceil(child.height) + this._lineGap;
                                }
                                else {
                                    child.setSize(child.width, viewHeight - curY, true);
                                }
                                if (child.width > maxWidth)
                                    maxWidth = child.width;
                            }
                            //new line
                            curX += Math.ceil(maxWidth) + this._columnGap;
                            maxWidth = 0;
                            j = 0;
                            lineStart = i + 1;
                            lineSize = 0;
                        }
                    }
                    cw = curX + Math.ceil(maxWidth);
                    ch = viewHeight;
                }
                else {
                    for (i = 0; i < cnt; i++) {
                        child = this.getChildAt(i);
                        if (this.foldInvisibleItems && !child.visible)
                            continue;
                        if (curY != 0)
                            curY += this._lineGap;
                        if (this._lineCount != 0 && j >= this._lineCount
                            || this._lineCount == 0 && curY + child.height > viewHeight && maxWidth != 0) {
                            curY = 0;
                            curX += Math.ceil(maxWidth) + this._columnGap;
                            maxWidth = 0;
                            j = 0;
                        }
                        child.setXY(curX, curY);
                        curY += Math.ceil(child.height);
                        if (curY > maxHeight)
                            maxHeight = curY;
                        if (child.width > maxWidth)
                            maxWidth = child.width;
                        j++;
                    }
                    cw = curX + Math.ceil(maxWidth);
                    ch = Math.ceil(maxHeight);
                }
            }
            else {
                var eachHeight;
                if (this._autoResizeItem && this._lineCount > 0)
                    eachHeight = Math.floor((viewHeight - (this._lineCount - 1) * this._lineGap) / this._lineCount);
                if (this._autoResizeItem && this._columnCount > 0) {
                    for (i = 0; i < cnt; i++) {
                        child = this.getChildAt(i);
                        if (this.foldInvisibleItems && !child.visible)
                            continue;
                        if (j == 0 && (this._lineCount != 0 && k >= this._lineCount
                            || this._lineCount == 0 && curY + (this._lineCount > 0 ? eachHeight : child.height) > viewHeight)) {
                            //new page
                            page++;
                            curY = 0;
                            k = 0;
                        }
                        lineSize += child.sourceWidth;
                        j++;
                        if (j == this._columnCount || i == cnt - 1) {
                            ratio = (viewWidth - lineSize - (j - 1) * this._columnGap) / lineSize;
                            curX = 0;
                            for (j = lineStart; j <= i; j++) {
                                child = this.getChildAt(j);
                                if (this.foldInvisibleItems && !child.visible)
                                    continue;
                                child.setXY(page * viewWidth + curX, curY);
                                if (j < i) {
                                    child.setSize(child.sourceWidth + Math.round(child.sourceWidth * ratio), this._lineCount > 0 ? eachHeight : child.height, true);
                                    curX += Math.ceil(child.width) + this._columnGap;
                                }
                                else {
                                    child.setSize(viewWidth - curX, this._lineCount > 0 ? eachHeight : child.height, true);
                                }
                                if (child.height > maxHeight)
                                    maxHeight = child.height;
                            }
                            //new line
                            curY += Math.ceil(maxHeight) + this._lineGap;
                            maxHeight = 0;
                            j = 0;
                            lineStart = i + 1;
                            lineSize = 0;
                            k++;
                        }
                    }
                }
                else {
                    for (i = 0; i < cnt; i++) {
                        child = this.getChildAt(i);
                        if (this.foldInvisibleItems && !child.visible)
                            continue;
                        if (curX != 0)
                            curX += this._columnGap;
                        if (this._autoResizeItem && this._lineCount > 0)
                            child.setSize(child.width, eachHeight, true);
                        if (this._columnCount != 0 && j >= this._columnCount
                            || this._columnCount == 0 && curX + child.width > viewWidth && maxHeight != 0) {
                            //new line
                            curX = 0;
                            curY += Math.ceil(maxHeight) + this._lineGap;
                            maxHeight = 0;
                            j = 0;
                            k++;
                            if (this._lineCount != 0 && k >= this._lineCount
                                || this._lineCount == 0 && curY + child.height > viewHeight && maxWidth != 0) {
                                page++;
                                curY = 0;
                                k = 0;
                            }
                        }
                        child.setXY(page * viewWidth + curX, curY);
                        curX += Math.ceil(child.width);
                        if (curX > maxWidth)
                            maxWidth = curX;
                        if (child.height > maxHeight)
                            maxHeight = child.height;
                        j++;
                    }
                }
                ch = page > 0 ? viewHeight : curY + Math.ceil(maxHeight);
                cw = (page + 1) * viewWidth;
            }
            this.handleAlign(cw, ch);
            this.setBounds(0, 0, cw, ch);
        };
        GList.prototype.setup_beforeAdd = function (buffer, beginPos) {
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            buffer.seek(beginPos, 5);
            var i;
            var j;
            var cnt;
            var i1;
            var i2;
            var nextPos;
            var str;
            this._layout = buffer.readByte();
            this._selectionMode = buffer.readByte();
            this._align = buffer.readByte();
            this._verticalAlign = buffer.readByte();
            this._lineGap = buffer.readShort();
            this._columnGap = buffer.readShort();
            this._lineCount = buffer.readShort();
            this._columnCount = buffer.readShort();
            this._autoResizeItem = buffer.readBool();
            this._childrenRenderOrder = buffer.readByte();
            this._apexIndex = buffer.readShort();
            if (buffer.readBool()) {
                this._margin.top = buffer.readInt();
                this._margin.bottom = buffer.readInt();
                this._margin.left = buffer.readInt();
                this._margin.right = buffer.readInt();
            }
            var overflow = buffer.readByte();
            if (overflow == fairygui.OverflowType.Scroll) {
                var savedPos = buffer.position;
                buffer.seek(beginPos, 7);
                this.setupScroll(buffer);
                buffer.position = savedPos;
            }
            else
                this.setupOverflow(overflow);
            if (buffer.readBool())
                buffer.skip(8);
            buffer.seek(beginPos, 8);
            this._defaultItem = buffer.readS();
            var itemCount = buffer.readShort();
            for (i = 0; i < itemCount; i++) {
                nextPos = buffer.readShort();
                nextPos += buffer.position;
                str = buffer.readS();
                if (str == null) {
                    str = this.defaultItem;
                    if (!str) {
                        buffer.position = nextPos;
                        continue;
                    }
                }
                var obj = this.getFromPool(str);
                if (obj != null) {
                    this.addChild(obj);
                    str = buffer.readS();
                    if (str != null)
                        obj.text = str;
                    str = buffer.readS();
                    if (str != null && (obj instanceof fairygui.GButton))
                        obj.selectedTitle = str;
                    str = buffer.readS();
                    if (str != null)
                        obj.icon = str;
                    str = buffer.readS();
                    if (str != null && (obj instanceof fairygui.GButton))
                        obj.selectedIcon = str;
                    str = buffer.readS();
                    if (str != null)
                        obj.name = str;
                    if (obj instanceof fairygui.GComponent) {
                        cnt = buffer.readShort();
                        for (j = 0; j < cnt; j++) {
                            var cc = obj.getController(buffer.readS());
                            str = buffer.readS();
                            if (cc != null)
                                cc.selectedPageId = str;
                        }
                    }
                }
                buffer.position = nextPos;
            }
        };
        GList.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            buffer.seek(beginPos, 6);
            var i = buffer.readShort();
            if (i != -1)
                this._selectionController = this.parent.getControllerAt(i);
        };
        return GList;
    }(fairygui.GComponent));
    fairygui.GList = GList;
    __reflect(GList.prototype, "fairygui.GList");
})(fairygui || (fairygui = {}));
