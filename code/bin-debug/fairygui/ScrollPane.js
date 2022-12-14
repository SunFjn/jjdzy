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
    var ScrollPane = (function (_super) {
        __extends(ScrollPane, _super);
        function ScrollPane(owner) {
            var _this = _super.call(this) || this;
            _this._owner = owner;
            _this._maskContainer = new egret.DisplayObjectContainer();
            _this._owner._rootContainer.addChild(_this._maskContainer);
            _this._container = _this._owner._container;
            _this._container.x = 0;
            _this._container.y = 0;
            _this._maskContainer.addChild(_this._container);
            _this._scrollBarMargin = new fairygui.Margin();
            _this._scrollBarVisible = true;
            _this._mouseWheelEnabled = true;
            _this._xPos = 0;
            _this._yPos = 0;
            _this._aniFlag = 0;
            _this._footerLockedSize = 0;
            _this._headerLockedSize = 0;
            _this._viewSize = new egret.Point();
            _this._contentSize = new egret.Point();
            _this._pageSize = new egret.Point(1, 1);
            _this._overlapSize = new egret.Point();
            _this._tweenTime = new egret.Point();
            _this._tweenStart = new egret.Point();
            _this._tweenDuration = new egret.Point();
            _this._tweenChange = new egret.Point();
            _this._velocity = new egret.Point();
            _this._containerPos = new egret.Point();
            _this._beginTouchPos = new egret.Point();
            _this._lastTouchPos = new egret.Point();
            _this._lastTouchGlobalPos = new egret.Point();
            _this._scrollStep = fairygui.UIConfig.defaultScrollStep;
            _this._mouseWheelStep = _this._scrollStep * 2;
            _this._decelerationRate = fairygui.UIConfig.defaultScrollDecelerationRate;
            _this._owner.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.__touchBegin, _this);
            return _this;
        }
        ScrollPane.prototype.setup = function (buffer) {
            this._scrollType = buffer.readByte();
            var scrollBarDisplay = buffer.readByte();
            var flags = buffer.readInt();
            if (buffer.readBool()) {
                this._scrollBarMargin.top = buffer.readInt();
                this._scrollBarMargin.bottom = buffer.readInt();
                this._scrollBarMargin.left = buffer.readInt();
                this._scrollBarMargin.right = buffer.readInt();
            }
            var vtScrollBarRes = buffer.readS();
            var hzScrollBarRes = buffer.readS();
            var headerRes = buffer.readS();
            var footerRes = buffer.readS();
            this._displayOnLeft = (flags & 1) != 0;
            this._snapToItem = (flags & 2) != 0;
            this._displayInDemand = (flags & 4) != 0;
            this._pageMode = (flags & 8) != 0;
            if (flags & 16)
                this._touchEffect = true;
            else if (flags & 32)
                this._touchEffect = false;
            else
                this._touchEffect = fairygui.UIConfig.defaultScrollTouchEffect;
            if (flags & 64)
                this._bouncebackEffect = true;
            else if (flags & 128)
                this._bouncebackEffect = false;
            else
                this._bouncebackEffect = fairygui.UIConfig.defaultScrollBounceEffect;
            this._inertiaDisabled = (flags & 256) != 0;
            if ((flags & 512) == 0)
                this._maskContainer.scrollRect = new egret.Rectangle();
            if (scrollBarDisplay == fairygui.ScrollBarDisplayType.Default)
                scrollBarDisplay = fairygui.UIConfig.defaultScrollBarDisplay;
            if (scrollBarDisplay != fairygui.ScrollBarDisplayType.Hidden) {
                if (this._scrollType == fairygui.ScrollType.Both || this._scrollType == fairygui.ScrollType.Vertical) {
                    var res = vtScrollBarRes ? vtScrollBarRes : fairygui.UIConfig.verticalScrollBar;
                    if (res) {
                        this._vtScrollBar = (fairygui.UIPackage.createObjectFromURL(res));
                        if (!this._vtScrollBar)
                            throw "cannot create scrollbar from " + res;
                        this._vtScrollBar.setScrollPane(this, true);
                        this._owner._rootContainer.addChild(this._vtScrollBar.displayObject);
                    }
                }
                if (this._scrollType == fairygui.ScrollType.Both || this._scrollType == fairygui.ScrollType.Horizontal) {
                    var res = hzScrollBarRes ? hzScrollBarRes : fairygui.UIConfig.horizontalScrollBar;
                    if (res) {
                        this._hzScrollBar = (fairygui.UIPackage.createObjectFromURL(res));
                        if (!this._hzScrollBar)
                            throw "cannot create scrollbar from " + res;
                        this._hzScrollBar.setScrollPane(this, false);
                        this._owner._rootContainer.addChild(this._hzScrollBar.displayObject);
                    }
                }
                this._scrollBarDisplayAuto = scrollBarDisplay == fairygui.ScrollBarDisplayType.Auto;
                if (this._scrollBarDisplayAuto) {
                    this._scrollBarVisible = false;
                    if (this._vtScrollBar)
                        this._vtScrollBar.displayObject.visible = false;
                    if (this._hzScrollBar)
                        this._hzScrollBar.displayObject.visible = false;
                }
            }
            if (headerRes) {
                this._header = (fairygui.UIPackage.createObjectFromURL(headerRes));
                if (this._header == null)
                    throw "cannot create scrollPane header from " + headerRes;
            }
            if (footerRes) {
                this._footer = (fairygui.UIPackage.createObjectFromURL(footerRes));
                if (this._footer == null)
                    throw "cannot create scrollPane footer from " + footerRes;
            }
            if (this._header != null || this._footer != null)
                this._refreshBarAxis = (this._scrollType == fairygui.ScrollType.Both || this._scrollType == fairygui.ScrollType.Vertical) ? "y" : "x";
            this.setSize(this._owner.width, this._owner.height);
        };
        ScrollPane.prototype.dispose = function () {
            if (this._tweening != 0)
                egret.stopTick(this.tweenUpdate, this);
            this._pageController = null;
            if (this._hzScrollBar != null)
                this._hzScrollBar.dispose();
            if (this._vtScrollBar != null)
                this._vtScrollBar.dispose();
            if (this._header != null)
                this._header.dispose();
            if (this._footer != null)
                this._footer.dispose();
        };
        Object.defineProperty(ScrollPane.prototype, "owner", {
            get: function () {
                return this._owner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "hzScrollBar", {
            get: function () {
                return this._hzScrollBar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "vtScrollBar", {
            get: function () {
                return this._vtScrollBar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "header", {
            get: function () {
                return this._header;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "footer", {
            get: function () {
                return this._footer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "bouncebackEffect", {
            get: function () {
                return this._bouncebackEffect;
            },
            set: function (sc) {
                this._bouncebackEffect = sc;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "touchEffect", {
            get: function () {
                return this._touchEffect;
            },
            set: function (sc) {
                this._touchEffect = sc;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "scrollStep", {
            get: function () {
                return this._scrollStep;
            },
            set: function (val) {
                this._scrollStep = val;
                if (this._scrollStep == 0)
                    this._scrollStep = fairygui.UIConfig.defaultScrollStep;
                this._mouseWheelStep = this._scrollStep * 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "decelerationRate", {
            get: function () {
                return this._decelerationRate;
            },
            set: function (val) {
                this._decelerationRate = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "snapToItem", {
            get: function () {
                return this._snapToItem;
            },
            set: function (value) {
                this._snapToItem = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "percX", {
            get: function () {
                return this._overlapSize.x == 0 ? 0 : this._xPos / this._overlapSize.x;
            },
            set: function (value) {
                this.setPercX(value, false);
            },
            enumerable: true,
            configurable: true
        });
        ScrollPane.prototype.setPercX = function (value, ani) {
            if (ani === void 0) { ani = false; }
            this._owner.ensureBoundsCorrect();
            this.setPosX(this._overlapSize.x * fairygui.ToolSet.clamp01(value), ani);
        };
        Object.defineProperty(ScrollPane.prototype, "percY", {
            get: function () {
                return this._overlapSize.y == 0 ? 0 : this._yPos / this._overlapSize.y;
            },
            set: function (value) {
                this.setPercY(value, false);
            },
            enumerable: true,
            configurable: true
        });
        ScrollPane.prototype.setPercY = function (value, ani) {
            if (ani === void 0) { ani = false; }
            this._owner.ensureBoundsCorrect();
            this.setPosY(this._overlapSize.y * fairygui.ToolSet.clamp01(value), ani);
        };
        Object.defineProperty(ScrollPane.prototype, "posX", {
            get: function () {
                return this._xPos;
            },
            set: function (value) {
                this.setPosX(value, false);
            },
            enumerable: true,
            configurable: true
        });
        ScrollPane.prototype.setPosX = function (value, ani) {
            if (ani === void 0) { ani = false; }
            this._owner.ensureBoundsCorrect();
            if (this._loop == 1)
                value = this.loopCheckingNewPos(value, "x");
            value = fairygui.ToolSet.clamp(value, 0, this._overlapSize.x);
            if (value != this._xPos) {
                this._xPos = value;
                this.posChanged(ani);
            }
        };
        Object.defineProperty(ScrollPane.prototype, "posY", {
            get: function () {
                return this._yPos;
            },
            set: function (value) {
                this.setPosY(value, false);
            },
            enumerable: true,
            configurable: true
        });
        ScrollPane.prototype.setPosY = function (value, ani) {
            if (ani === void 0) { ani = false; }
            this._owner.ensureBoundsCorrect();
            if (this._loop == 1)
                value = this.loopCheckingNewPos(value, "y");
            value = fairygui.ToolSet.clamp(value, 0, this._overlapSize.y);
            if (value != this._yPos) {
                this._yPos = value;
                this.posChanged(ani);
            }
        };
        Object.defineProperty(ScrollPane.prototype, "contentWidth", {
            get: function () {
                return this._contentSize.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "contentHeight", {
            get: function () {
                return this._contentSize.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "viewWidth", {
            get: function () {
                return this._viewSize.x;
            },
            set: function (value) {
                value = value + this._owner.margin.left + this._owner.margin.right;
                if (this._vtScrollBar != null)
                    value += this._vtScrollBar.width;
                this._owner.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "viewHeight", {
            get: function () {
                return this._viewSize.y;
            },
            set: function (value) {
                value = value + this._owner.margin.top + this._owner.margin.bottom;
                if (this._hzScrollBar != null)
                    value += this._hzScrollBar.height;
                this._owner.height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "currentPageX", {
            get: function () {
                if (!this._pageMode)
                    return 0;
                var page = Math.floor(this._xPos / this._pageSize.x);
                if (this._xPos - page * this._pageSize.x > this._pageSize.x * 0.5)
                    page++;
                return page;
            },
            set: function (value) {
                this.setCurrentPageX(value, false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "currentPageY", {
            get: function () {
                if (!this._pageMode)
                    return 0;
                var page = Math.floor(this._yPos / this._pageSize.y);
                if (this._yPos - page * this._pageSize.y > this._pageSize.y * 0.5)
                    page++;
                return page;
            },
            set: function (value) {
                this.setCurrentPageY(value, false);
            },
            enumerable: true,
            configurable: true
        });
        ScrollPane.prototype.setCurrentPageX = function (value, ani) {
            if (this._pageMode && this._overlapSize.x > 0)
                this.setPosX(value * this._pageSize.x, ani);
        };
        ScrollPane.prototype.setCurrentPageY = function (value, ani) {
            if (this._pageMode && this._overlapSize.y > 0)
                this.setPosY(value * this._pageSize.y, ani);
        };
        Object.defineProperty(ScrollPane.prototype, "isBottomMost", {
            get: function () {
                return this._yPos == this._overlapSize.y || this._overlapSize.y == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "isRightMost", {
            get: function () {
                return this._xPos == this._overlapSize.x || this._overlapSize.x == 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "pageController", {
            get: function () {
                return this._pageController;
            },
            set: function (value) {
                this._pageController = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "scrollingPosX", {
            get: function () {
                return fairygui.ToolSet.clamp(-this._container.x, 0, this._overlapSize.x);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScrollPane.prototype, "scrollingPosY", {
            get: function () {
                return fairygui.ToolSet.clamp(-this._container.y, 0, this._overlapSize.y);
            },
            enumerable: true,
            configurable: true
        });
        ScrollPane.prototype.scrollTop = function (ani) {
            if (ani === void 0) { ani = false; }
            this.setPercY(0, ani);
        };
        ScrollPane.prototype.scrollBottom = function (ani) {
            if (ani === void 0) { ani = false; }
            this.setPercY(1, ani);
        };
        ScrollPane.prototype.scrollUp = function (ratio, ani) {
            if (ratio === void 0) { ratio = 1; }
            if (ani === void 0) { ani = false; }
            if (this._pageMode)
                this.setPosY(this._yPos - this._pageSize.y * ratio, ani);
            else
                this.setPosY(this._yPos - this._scrollStep * ratio, ani);
            ;
        };
        ScrollPane.prototype.scrollDown = function (ratio, ani) {
            if (ratio === void 0) { ratio = 1; }
            if (ani === void 0) { ani = false; }
            if (this._pageMode)
                this.setPosY(this._yPos + this._pageSize.y * ratio, ani);
            else
                this.setPosY(this._yPos + this._scrollStep * ratio, ani);
        };
        ScrollPane.prototype.scrollLeft = function (ratio, ani) {
            if (ratio === void 0) { ratio = 1; }
            if (ani === void 0) { ani = false; }
            if (this._pageMode)
                this.setPosX(this._xPos - this._pageSize.x * ratio, ani);
            else
                this.setPosX(this._xPos - this._scrollStep * ratio, ani);
        };
        ScrollPane.prototype.scrollRight = function (ratio, ani) {
            if (ratio === void 0) { ratio = 1; }
            if (ani === void 0) { ani = false; }
            if (this._pageMode)
                this.setPosX(this._xPos + this._pageSize.x * ratio, ani);
            else
                this.setPosX(this._xPos + this._scrollStep * ratio, ani);
        };
        ScrollPane.prototype.scrollToView = function (target, ani, setFirst) {
            if (ani === void 0) { ani = false; }
            if (setFirst === void 0) { setFirst = false; }
            this._owner.ensureBoundsCorrect();
            if (this._needRefresh)
                this.refresh();
            var rect;
            if (target instanceof fairygui.GObject) {
                if (target.parent != this._owner) {
                    target.parent.localToGlobalRect(target.x, target.y, target.width, target.height, ScrollPane.sHelperRect);
                    rect = this._owner.globalToLocalRect(ScrollPane.sHelperRect.x, ScrollPane.sHelperRect.y, ScrollPane.sHelperRect.width, ScrollPane.sHelperRect.height, ScrollPane.sHelperRect);
                }
                else {
                    rect = ScrollPane.sHelperRect;
                    rect.setTo(target.x, target.y, target.width, target.height);
                }
            }
            else
                rect = target;
            if (this._overlapSize.y > 0) {
                var bottom = this._yPos + this._viewSize.y;
                if (setFirst || rect.y <= this._yPos || rect.height >= this._viewSize.y) {
                    if (this._pageMode)
                        this.setPosY(Math.floor(rect.y / this._pageSize.y) * this._pageSize.y, ani);
                    else
                        this.setPosY(rect.y, ani);
                }
                else if (rect.y + rect.height > bottom) {
                    if (this._pageMode)
                        this.setPosY(Math.floor(rect.y / this._pageSize.y) * this._pageSize.y, ani);
                    else if (rect.height <= this._viewSize.y / 2)
                        this.setPosY(rect.y + rect.height * 2 - this._viewSize.y, ani);
                    else
                        this.setPosY(rect.y + rect.height - this._viewSize.y, ani);
                }
            }
            if (this._overlapSize.x > 0) {
                var right = this._xPos + this._viewSize.x;
                if (setFirst || rect.x <= this._xPos || rect.width >= this._viewSize.x) {
                    if (this._pageMode)
                        this.setPosX(Math.floor(rect.x / this._pageSize.x) * this._pageSize.x, ani);
                    else
                        this.setPosX(rect.x, ani);
                }
                else if (rect.x + rect.width > right) {
                    if (this._pageMode)
                        this.setPosX(Math.floor(rect.x / this._pageSize.x) * this._pageSize.x, ani);
                    else if (rect.width <= this._viewSize.x / 2)
                        this.setPosX(rect.x + rect.width * 2 - this._viewSize.x, ani);
                    else
                        this.setPosX(rect.x + rect.width - this._viewSize.x, ani);
                }
            }
            if (!ani && this._needRefresh)
                this.refresh();
        };
        ScrollPane.prototype.isChildInView = function (obj) {
            if (this._overlapSize.y > 0) {
                var dist = obj.y + this._container.y;
                if (dist < -obj.height || dist > this._viewSize.y)
                    return false;
            }
            if (this._overlapSize.x > 0) {
                dist = obj.x + this._container.x;
                if (dist < -obj.width || dist > this._viewSize.x)
                    return false;
            }
            return true;
        };
        ScrollPane.prototype.cancelDragging = function () {
            this._owner.displayObject.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.__touchMove, this);
            this._owner.displayObject.removeEventListener(egret.TouchEvent.TOUCH_END, this.__touchEnd, this);
            this._owner.displayObject.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__touchTap, this);
            if (ScrollPane.draggingPane == this)
                ScrollPane.draggingPane = null;
            ScrollPane._gestureFlag = 0;
            this.isDragged = false;
            this._maskContainer.touchChildren = true;
        };
        ScrollPane.prototype.lockHeader = function (size) {
            if (this._headerLockedSize == size)
                return;
            this._headerLockedSize = size;
            if (!this._refreshEventDispatching && this._container[this._refreshBarAxis] >= 0) {
                this._tweenStart.setTo(this._container.x, this._container.y);
                this._tweenChange.setTo(0, 0);
                this._tweenChange[this._refreshBarAxis] = this._headerLockedSize - this._tweenStart[this._refreshBarAxis];
                this._tweenDuration.setTo(ScrollPane.TWEEN_TIME_DEFAULT, ScrollPane.TWEEN_TIME_DEFAULT);
                this._tweenTime.setTo(0, 0);
                this._tweening = 2;
                egret.startTick(this.tweenUpdate, this);
            }
        };
        ScrollPane.prototype.lockFooter = function (size) {
            if (this._footerLockedSize == size)
                return;
            this._footerLockedSize = size;
            if (!this._refreshEventDispatching && this._container[this._refreshBarAxis] <= -this._overlapSize[this._refreshBarAxis]) {
                this._tweenStart.setTo(this._container.x, this._container.y);
                this._tweenChange.setTo(0, 0);
                var max = this._overlapSize[this._refreshBarAxis];
                if (max == 0)
                    max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);
                else
                    max += this._footerLockedSize;
                this._tweenChange[this._refreshBarAxis] = -max - this._tweenStart[this._refreshBarAxis];
                this._tweenDuration.setTo(ScrollPane.TWEEN_TIME_DEFAULT, ScrollPane.TWEEN_TIME_DEFAULT);
                this._tweenTime.setTo(0, 0);
                this._tweening = 2;
                egret.startTick(this.tweenUpdate, this);
            }
        };
        ScrollPane.prototype.onOwnerSizeChanged = function () {
            this.setSize(this._owner.width, this._owner.height);
            this.posChanged(false);
        };
        ScrollPane.prototype.handleControllerChanged = function (c) {
            if (this._pageController == c) {
                if (this._scrollType == fairygui.ScrollType.Horizontal)
                    this.setCurrentPageX(c.selectedIndex, true);
                else
                    this.setCurrentPageY(c.selectedIndex, true);
            }
        };
        ScrollPane.prototype.updatePageController = function () {
            if (this._pageController != null && !this._pageController.changing) {
                var index;
                if (this._scrollType == fairygui.ScrollType.Horizontal)
                    index = this.currentPageX;
                else
                    index = this.currentPageY;
                if (index < this._pageController.pageCount) {
                    var c = this._pageController;
                    this._pageController = null; //??????HandleControllerChanged?????????
                    c.selectedIndex = index;
                    this._pageController = c;
                }
            }
        };
        ScrollPane.prototype.adjustMaskContainer = function () {
            var mx, my;
            if (this._displayOnLeft && this._vtScrollBar != null)
                mx = Math.floor(this._owner.margin.left + this._vtScrollBar.width);
            else
                mx = Math.floor(this._owner.margin.left);
            my = Math.floor(this._owner.margin.top);
            this._maskContainer.x = mx;
            this._maskContainer.y = my;
            if (this._owner._alignOffset.x != 0 || this._owner._alignOffset.y != 0) {
                if (this._alignContainer == null) {
                    this._alignContainer = new egret.DisplayObjectContainer();
                    this._maskContainer.addChild(this._alignContainer);
                    this._alignContainer.addChild(this._container);
                }
                this._alignContainer.x = this._owner._alignOffset.x;
                this._alignContainer.y = this._owner._alignOffset.y;
            }
            else if (this._alignContainer) {
                this._alignContainer.x = this._alignContainer.y = 0;
            }
        };
        ScrollPane.prototype.setSize = function (aWidth, aHeight) {
            this.adjustMaskContainer();
            if (this._hzScrollBar) {
                this._hzScrollBar.y = aHeight - this._hzScrollBar.height;
                if (this._vtScrollBar && !this._vScrollNone) {
                    this._hzScrollBar.width = aWidth - this._vtScrollBar.width - this._scrollBarMargin.left - this._scrollBarMargin.right;
                    if (this._displayOnLeft)
                        this._hzScrollBar.x = this._scrollBarMargin.left + this._vtScrollBar.width;
                    else
                        this._hzScrollBar.x = this._scrollBarMargin.left;
                }
                else {
                    this._hzScrollBar.width = aWidth - this._scrollBarMargin.left - this._scrollBarMargin.right;
                    this._hzScrollBar.x = this._scrollBarMargin.left;
                }
            }
            if (this._vtScrollBar) {
                if (!this._displayOnLeft)
                    this._vtScrollBar.x = aWidth - this._vtScrollBar.width;
                if (this._hzScrollBar)
                    this._vtScrollBar.height = aHeight - this._hzScrollBar.height - this._scrollBarMargin.top - this._scrollBarMargin.bottom;
                else
                    this._vtScrollBar.height = aHeight - this._scrollBarMargin.top - this._scrollBarMargin.bottom;
                this._vtScrollBar.y = this._scrollBarMargin.top;
            }
            this._viewSize.x = aWidth;
            this._viewSize.y = aHeight;
            if (this._hzScrollBar && !this._hScrollNone)
                this._viewSize.y -= this._hzScrollBar.height;
            if (this._vtScrollBar && !this._vScrollNone)
                this._viewSize.x -= this._vtScrollBar.width;
            this._viewSize.x -= (this._owner.margin.left + this._owner.margin.right);
            this._viewSize.y -= (this._owner.margin.top + this._owner.margin.bottom);
            this._viewSize.x = Math.max(1, this._viewSize.x);
            this._viewSize.y = Math.max(1, this._viewSize.y);
            this._pageSize.x = this._viewSize.x;
            this._pageSize.y = this._viewSize.y;
            this.handleSizeChanged();
        };
        ScrollPane.prototype.setContentSize = function (aWidth, aHeight) {
            if (this._contentSize.x == aWidth && this._contentSize.y == aHeight)
                return;
            this._contentSize.x = aWidth;
            this._contentSize.y = aHeight;
            this.handleSizeChanged();
        };
        ScrollPane.prototype.changeContentSizeOnScrolling = function (deltaWidth, deltaHeight, deltaPosX, deltaPosY) {
            var isRightmost = this._xPos == this._overlapSize.x;
            var isBottom = this._yPos == this._overlapSize.y;
            this._contentSize.x += deltaWidth;
            this._contentSize.y += deltaHeight;
            this.handleSizeChanged();
            if (this._tweening == 1) {
                //???????????????????????????????????????????????????????????????
                if (deltaWidth != 0 && isRightmost && this._tweenChange.x < 0) {
                    this._xPos = this._overlapSize.x;
                    this._tweenChange.x = -this._xPos - this._tweenStart.x;
                }
                if (deltaHeight != 0 && isBottom && this._tweenChange.y < 0) {
                    this._yPos = this._overlapSize.y;
                    this._tweenChange.y = -this._yPos - this._tweenStart.y;
                }
            }
            else if (this._tweening == 2) {
                //??????????????????????????????????????????????????????
                if (deltaPosX != 0) {
                    this._container.x -= deltaPosX;
                    this._tweenStart.x -= deltaPosX;
                    this._xPos = -this._container.x;
                }
                if (deltaPosY != 0) {
                    this._container.y -= deltaPosY;
                    this._tweenStart.y -= deltaPosY;
                    this._yPos = -this._container.y;
                }
            }
            else if (this.isDragged) {
                if (deltaPosX != 0) {
                    this._container.x -= deltaPosX;
                    this._containerPos.x -= deltaPosX;
                    this._xPos = -this._container.x;
                }
                if (deltaPosY != 0) {
                    this._container.y -= deltaPosY;
                    this._containerPos.y -= deltaPosY;
                    this._yPos = -this._container.y;
                }
            }
            else {
                //???????????????????????????????????????????????????????????????
                if (deltaWidth != 0 && isRightmost) {
                    this._xPos = this._overlapSize.x;
                    this._container.x = -this._xPos;
                }
                if (deltaHeight != 0 && isBottom) {
                    this._yPos = this._overlapSize.y;
                    this._container.y = -this._yPos;
                }
            }
            if (this._pageMode)
                this.updatePageController();
        };
        ScrollPane.prototype.handleSizeChanged = function (onScrolling) {
            if (onScrolling === void 0) { onScrolling = false; }
            if (this._displayInDemand) {
                if (this._vtScrollBar) {
                    if (this._contentSize.y <= this._viewSize.y) {
                        if (!this._vScrollNone) {
                            this._vScrollNone = true;
                            this._viewSize.x += this._vtScrollBar.width;
                        }
                    }
                    else {
                        if (this._vScrollNone) {
                            this._vScrollNone = false;
                            this._viewSize.x -= this._vtScrollBar.width;
                        }
                    }
                }
                if (this._hzScrollBar) {
                    if (this._contentSize.x <= this._viewSize.x) {
                        if (!this._hScrollNone) {
                            this._hScrollNone = true;
                            this._viewSize.y += this._hzScrollBar.height;
                        }
                    }
                    else {
                        if (this._hScrollNone) {
                            this._hScrollNone = false;
                            this._viewSize.y -= this._hzScrollBar.height;
                        }
                    }
                }
            }
            if (this._vtScrollBar) {
                if (this._viewSize.y < this._vtScrollBar.minSize)
                    //????????????this._vtScrollBar.visible?????????ScrollBar????????????trick???????????????owner???DisplayList????????????this._vtScrollBar.visible????????????
                    this._vtScrollBar.displayObject.visible = false;
                else {
                    this._vtScrollBar.displayObject.visible = this._scrollBarVisible && !this._vScrollNone;
                    if (this._contentSize.y == 0)
                        this._vtScrollBar.displayPerc = 0;
                    else
                        this._vtScrollBar.displayPerc = Math.min(1, this._viewSize.y / this._contentSize.y);
                }
            }
            if (this._hzScrollBar) {
                if (this._viewSize.x < this._hzScrollBar.minSize)
                    this._hzScrollBar.displayObject.visible = false;
                else {
                    this._hzScrollBar.displayObject.visible = this._scrollBarVisible && !this._hScrollNone;
                    if (this._contentSize.x == 0)
                        this._hzScrollBar.displayPerc = 0;
                    else
                        this._hzScrollBar.displayPerc = Math.min(1, this._viewSize.x / this._contentSize.x);
                }
            }
            var rect = this._maskContainer.scrollRect;
            if (rect) {
                rect.width = this._viewSize.x;
                rect.height = this._viewSize.y;
                this._maskContainer.scrollRect = rect;
            }
            if (this._scrollType == fairygui.ScrollType.Horizontal || this._scrollType == fairygui.ScrollType.Both)
                this._overlapSize.x = Math.ceil(Math.max(0, this._contentSize.x - this._viewSize.x));
            else
                this._overlapSize.x = 0;
            if (this._scrollType == fairygui.ScrollType.Vertical || this._scrollType == fairygui.ScrollType.Both)
                this._overlapSize.y = Math.ceil(Math.max(0, this._contentSize.y - this._viewSize.y));
            else
                this._overlapSize.y = 0;
            //????????????
            this._xPos = fairygui.ToolSet.clamp(this._xPos, 0, this._overlapSize.x);
            this._yPos = fairygui.ToolSet.clamp(this._yPos, 0, this._overlapSize.y);
            if (this._refreshBarAxis != null) {
                var max = this._overlapSize[this._refreshBarAxis];
                if (max == 0)
                    max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);
                else
                    max += this._footerLockedSize;
                if (this._refreshBarAxis == "x") {
                    this._container.x = fairygui.ToolSet.clamp(this._container.x, -max, this._headerLockedSize);
                    this._container.y = fairygui.ToolSet.clamp(this._container.y, -this._overlapSize.y, 0);
                }
                else {
                    this._container.x = fairygui.ToolSet.clamp(this._container.x, -this._overlapSize.x, 0);
                    this._container.y = fairygui.ToolSet.clamp(this._container.y, -max, this._headerLockedSize);
                }
                if (this._header != null) {
                    if (this._refreshBarAxis == "x")
                        this._header.height = this._viewSize.y;
                    else
                        this._header.width = this._viewSize.x;
                }
                if (this._footer != null) {
                    if (this._refreshBarAxis == "y")
                        this._footer.height = this._viewSize.y;
                    else
                        this._footer.width = this._viewSize.x;
                }
            }
            else {
                this._container.x = fairygui.ToolSet.clamp(this._container.x, -this._overlapSize.x, 0);
                this._container.y = fairygui.ToolSet.clamp(this._container.y, -this._overlapSize.y, 0);
            }
            this.syncScrollBar(true);
            this.checkRefreshBar();
            if (this._pageMode)
                this.updatePageController();
        };
        ScrollPane.prototype.posChanged = function (ani) {
            if (this._aniFlag == 0)
                this._aniFlag = ani ? 1 : -1;
            else if (this._aniFlag == 1 && !ani)
                this._aniFlag = -1;
            this._needRefresh = true;
            fairygui.GTimers.inst.callLater(this.refresh, this);
        };
        ScrollPane.prototype.refresh = function () {
            this._needRefresh = false;
            fairygui.GTimers.inst.remove(this.refresh, this);
            if (this._pageMode || this._snapToItem) {
                ScrollPane.sEndPos.setTo(-this._xPos, -this._yPos);
                this.alignPosition(ScrollPane.sEndPos, false);
                this._xPos = -ScrollPane.sEndPos.x;
                this._yPos = -ScrollPane.sEndPos.y;
            }
            this.refresh2();
            this.dispatchEventWith(ScrollPane.SCROLL, false);
            if (this._needRefresh) {
                this._needRefresh = false;
                fairygui.GTimers.inst.remove(this.refresh, this);
                this.refresh2();
            }
            this.syncScrollBar();
            this._aniFlag = 0;
        };
        ScrollPane.prototype.refresh2 = function () {
            if (this._aniFlag == 1 && !this.isDragged) {
                var posX;
                var posY;
                if (this._overlapSize.x > 0)
                    posX = -Math.floor(this._xPos);
                else {
                    if (this._container.x != 0)
                        this._container.x = 0;
                    posX = 0;
                }
                if (this._overlapSize.y > 0)
                    posY = -Math.floor(this._yPos);
                else {
                    if (this._container.y != 0)
                        this._container.y = 0;
                    posY = 0;
                }
                if (posX != this._container.x || posY != this._container.y) {
                    this._tweening = 1;
                    this._tweenTime.setTo(0, 0);
                    this._tweenDuration.setTo(ScrollPane.TWEEN_TIME_GO, ScrollPane.TWEEN_TIME_GO);
                    this._tweenStart.setTo(this._container.x, this._container.y);
                    this._tweenChange.setTo(posX - this._tweenStart.x, posY - this._tweenStart.y);
                    egret.startTick(this.tweenUpdate, this);
                }
                else if (this._tweening != 0)
                    this.killTween();
            }
            else {
                if (this._tweening != 0)
                    this.killTween();
                this._container.x = Math.floor(-this._xPos);
                this._container.y = Math.floor(-this._yPos);
                this.loopCheckingCurrent();
            }
            if (this._pageMode)
                this.updatePageController();
        };
        ScrollPane.prototype.syncScrollBar = function (end) {
            if (end === void 0) { end = false; }
            if (this._vtScrollBar != null) {
                this._vtScrollBar.scrollPerc = this._overlapSize.y == 0 ? 0 : fairygui.ToolSet.clamp(-this._container.y, 0, this._overlapSize.y) / this._overlapSize.y;
                if (this._scrollBarDisplayAuto)
                    this.showScrollBar(!end);
            }
            if (this._hzScrollBar != null) {
                this._hzScrollBar.scrollPerc = this._overlapSize.x == 0 ? 0 : fairygui.ToolSet.clamp(-this._container.x, 0, this._overlapSize.x) / this._overlapSize.x;
                if (this._scrollBarDisplayAuto)
                    this.showScrollBar(!end);
            }
            if (end)
                this._maskContainer.touchChildren = true;
        };
        ScrollPane.prototype.__touchBegin = function (evt) {
            if (!this._touchEffect)
                return;
            if (this._tweening != 0) {
                this.killTween();
                this.isDragged = true;
            }
            else
                this.isDragged = false;
            var pt = this._owner.globalToLocal(evt.stageX, evt.stageY, ScrollPane.sHelperPoint);
            this._containerPos.setTo(this._container.x, this._container.y);
            this._beginTouchPos.setTo(pt.x, pt.y);
            this._lastTouchPos.setTo(pt.x, pt.y);
            this._lastTouchGlobalPos.setTo(evt.stageX, evt.stageY);
            this._isHoldAreaDone = false;
            this._velocity.setTo(0, 0);
            this._velocityScale = 1;
            this._lastMoveTime = egret.getTimer() / 1000;
            this._owner.displayObject.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.__touchMove, this);
            this._owner.displayObject.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.__touchEnd, this);
            this._owner.displayObject.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__touchTap, this);
        };
        ScrollPane.prototype.__touchMove = function (evt) {
            if (this._owner.displayObject.stage == null)
                return;
            if (!this._touchEffect)
                return;
            if (ScrollPane.draggingPane != null && ScrollPane.draggingPane != this || fairygui.GObject.draggingObject != null)
                return;
            var pt = this._owner.globalToLocal(evt.stageX, evt.stageY, ScrollPane.sHelperPoint);
            var sensitivity = fairygui.UIConfig.touchScrollSensitivity;
            var diff, diff2;
            var sv, sh, st;
            if (this._scrollType == fairygui.ScrollType.Vertical) {
                if (!this._isHoldAreaDone) {
                    //???????????????????????????????????????
                    ScrollPane._gestureFlag |= 1;
                    diff = Math.abs(this._beginTouchPos.y - pt.y);
                    if (diff < sensitivity)
                        return;
                    if ((ScrollPane._gestureFlag & 2) != 0) {
                        diff2 = Math.abs(this._beginTouchPos.x - pt.x);
                        if (diff < diff2)
                            return;
                    }
                }
                sv = true;
            }
            else if (this._scrollType == fairygui.ScrollType.Horizontal) {
                if (!this._isHoldAreaDone) {
                    ScrollPane._gestureFlag |= 2;
                    diff = Math.abs(this._beginTouchPos.x - pt.x);
                    if (diff < sensitivity)
                        return;
                    if ((ScrollPane._gestureFlag & 1) != 0) {
                        diff2 = Math.abs(this._beginTouchPos.y - pt.y);
                        if (diff < diff2)
                            return;
                    }
                }
                sh = true;
            }
            else {
                ScrollPane._gestureFlag = 3;
                if (!this._isHoldAreaDone) {
                    diff = Math.abs(this._beginTouchPos.y - pt.y);
                    if (diff < sensitivity) {
                        diff = Math.abs(this._beginTouchPos.x - pt.x);
                        if (diff < sensitivity)
                            return;
                    }
                }
                sv = sh = true;
            }
            var newPosX = Math.floor(this._containerPos.x + pt.x - this._beginTouchPos.x);
            var newPosY = Math.floor(this._containerPos.y + pt.y - this._beginTouchPos.y);
            if (sv) {
                if (newPosY > 0) {
                    if (!this._bouncebackEffect)
                        this._container.y = 0;
                    else if (this._header != null && this._header.maxHeight != 0)
                        this._container.y = Math.floor(Math.min(newPosY * 0.5, this._header.maxHeight));
                    else
                        this._container.y = Math.floor(Math.min(newPosY * 0.5, this._viewSize.y * ScrollPane.PULL_RATIO));
                }
                else if (newPosY < -this._overlapSize.y) {
                    if (!this._bouncebackEffect)
                        this._container.y = -this._overlapSize.y;
                    else if (this._footer != null && this._footer.maxHeight > 0)
                        this._container.y = Math.floor(Math.max((newPosY + this._overlapSize.y) * 0.5, -this._footer.maxHeight) - this._overlapSize.y);
                    else
                        this._container.y = Math.floor(Math.max((newPosY + this._overlapSize.y) * 0.5, -this._viewSize.y * ScrollPane.PULL_RATIO) - this._overlapSize.y);
                }
                else
                    this._container.y = newPosY;
            }
            if (sh) {
                if (newPosX > 0) {
                    if (!this._bouncebackEffect)
                        this._container.x = 0;
                    else if (this._header != null && this._header.maxWidth != 0)
                        this._container.x = Math.floor(Math.min(newPosX * 0.5, this._header.maxWidth));
                    else
                        this._container.x = Math.floor(Math.min(newPosX * 0.5, this._viewSize.x * ScrollPane.PULL_RATIO));
                }
                else if (newPosX < 0 - this._overlapSize.x) {
                    if (!this._bouncebackEffect)
                        this._container.x = -this._overlapSize.x;
                    else if (this._footer != null && this._footer.maxWidth > 0)
                        this._container.x = Math.floor(Math.max((newPosX + this._overlapSize.x) * 0.5, -this._footer.maxWidth) - this._overlapSize.x);
                    else
                        this._container.x = Math.floor(Math.max((newPosX + this._overlapSize.x) * 0.5, -this._viewSize.x * ScrollPane.PULL_RATIO) - this._overlapSize.x);
                }
                else
                    this._container.x = newPosX;
            }
            //????????????
            var now = egret.getTimer() / 1000;
            var deltaTime = Math.max(now - this._lastMoveTime, 1 / 60);
            var deltaPositionX = pt.x - this._lastTouchPos.x;
            var deltaPositionY = pt.y - this._lastTouchPos.y;
            if (!sh)
                deltaPositionX = 0;
            if (!sv)
                deltaPositionY = 0;
            if (deltaTime != 0) {
                var frameRate = this._owner.displayObject.stage.frameRate;
                var elapsed = deltaTime * frameRate - 1;
                if (elapsed > 1) {
                    var factor = Math.pow(0.833, elapsed);
                    this._velocity.x = this._velocity.x * factor;
                    this._velocity.y = this._velocity.y * factor;
                }
                this._velocity.x = fairygui.ToolSet.lerp(this._velocity.x, deltaPositionX * 60 / frameRate / deltaTime, deltaTime * 10);
                this._velocity.y = fairygui.ToolSet.lerp(this._velocity.y, deltaPositionY * 60 / frameRate / deltaTime, deltaTime * 10);
            }
            /*???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            */
            var deltaGlobalPositionX = this._lastTouchGlobalPos.x - evt.stageX;
            var deltaGlobalPositionY = this._lastTouchGlobalPos.y - evt.stageY;
            if (deltaPositionX != 0)
                this._velocityScale = Math.abs(deltaGlobalPositionX / deltaPositionX);
            else if (deltaPositionY != 0)
                this._velocityScale = Math.abs(deltaGlobalPositionY / deltaPositionY);
            this._lastTouchPos.setTo(pt.x, pt.y);
            this._lastTouchGlobalPos.setTo(evt.stageX, evt.stageY);
            this._lastMoveTime = now;
            //????????????pos???
            if (this._overlapSize.x > 0)
                this._xPos = fairygui.ToolSet.clamp(-this._container.x, 0, this._overlapSize.x);
            if (this._overlapSize.y > 0)
                this._yPos = fairygui.ToolSet.clamp(-this._container.y, 0, this._overlapSize.y);
            //????????????????????????
            if (this._loop != 0) {
                newPosX = this._container.x;
                newPosY = this._container.y;
                if (this.loopCheckingCurrent()) {
                    this._containerPos.x += this._container.x - newPosX;
                    this._containerPos.y += this._container.y - newPosY;
                }
            }
            ScrollPane.draggingPane = this;
            this._isHoldAreaDone = true;
            this.isDragged = true;
            this._maskContainer.touchChildren = false;
            this.syncScrollBar();
            this.checkRefreshBar();
            if (this._pageMode)
                this.updatePageController();
            this.dispatchEventWith(ScrollPane.SCROLL, false);
        };
        ScrollPane.prototype.__touchEnd = function (evt) {
            evt.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.__touchMove, this);
            evt.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_END, this.__touchEnd, this);
            evt.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__touchTap, this);
            if (ScrollPane.draggingPane == this)
                ScrollPane.draggingPane = null;
            ScrollPane._gestureFlag = 0;
            if (!this.isDragged || !this._touchEffect || this._owner.displayObject.stage == null) {
                this.isDragged = false;
                this._maskContainer.touchChildren = true;
                return;
            }
            // touch????????????????????????tap??????,????????????????????????touchEnd,????????????????????????isDragged?????????.?????????????????????????????????????????????????????????????????????????????????
            this.isDragged = false;
            this._maskContainer.touchChildren = true;
            this._tweenStart.setTo(this._container.x, this._container.y);
            ScrollPane.sEndPos.setTo(this._tweenStart.x, this._tweenStart.y);
            var flag = false;
            if (this._container.x > 0) {
                ScrollPane.sEndPos.x = 0;
                flag = true;
            }
            else if (this._container.x < -this._overlapSize.x) {
                ScrollPane.sEndPos.x = -this._overlapSize.x;
                flag = true;
            }
            if (this._container.y > 0) {
                ScrollPane.sEndPos.y = 0;
                flag = true;
            }
            else if (this._container.y < -this._overlapSize.y) {
                ScrollPane.sEndPos.y = -this._overlapSize.y;
                flag = true;
            }
            if (flag) {
                this._tweenChange.setTo(ScrollPane.sEndPos.x - this._tweenStart.x, ScrollPane.sEndPos.y - this._tweenStart.y);
                if (this._tweenChange.x < -fairygui.UIConfig.touchDragSensitivity || this._tweenChange.y < -fairygui.UIConfig.touchDragSensitivity) {
                    this._refreshEventDispatching = true;
                    this.dispatchEventWith(ScrollPane.PULL_DOWN_RELEASE);
                    this._refreshEventDispatching = false;
                }
                else if (this._tweenChange.x > fairygui.UIConfig.touchDragSensitivity || this._tweenChange.y > fairygui.UIConfig.touchDragSensitivity) {
                    this._refreshEventDispatching = true;
                    this.dispatchEventWith(ScrollPane.PULL_UP_RELEASE);
                    this._refreshEventDispatching = false;
                }
                if (this._headerLockedSize > 0 && ScrollPane.sEndPos[this._refreshBarAxis] == 0) {
                    ScrollPane.sEndPos[this._refreshBarAxis] = this._headerLockedSize;
                    this._tweenChange.x = ScrollPane.sEndPos.x - this._tweenStart.x;
                    this._tweenChange.y = ScrollPane.sEndPos.y - this._tweenStart.y;
                }
                else if (this._footerLockedSize > 0 && ScrollPane.sEndPos[this._refreshBarAxis] == -this._overlapSize[this._refreshBarAxis]) {
                    var max = this._overlapSize[this._refreshBarAxis];
                    if (max == 0)
                        max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);
                    else
                        max += this._footerLockedSize;
                    ScrollPane.sEndPos[this._refreshBarAxis] = -max;
                    this._tweenChange.x = ScrollPane.sEndPos.x - this._tweenStart.x;
                    this._tweenChange.y = ScrollPane.sEndPos.y - this._tweenStart.y;
                }
                this._tweenDuration.setTo(ScrollPane.TWEEN_TIME_DEFAULT, ScrollPane.TWEEN_TIME_DEFAULT);
            }
            else {
                //????????????
                if (!this._inertiaDisabled) {
                    var frameRate = this._owner.displayObject.stage.frameRate;
                    var elapsed = (egret.getTimer() / 1000 - this._lastMoveTime) * frameRate - 1;
                    if (elapsed > 1) {
                        var factor = Math.pow(0.833, elapsed);
                        this._velocity.x = this._velocity.x * factor;
                        this._velocity.y = this._velocity.y * factor;
                    }
                    //?????????????????????????????????????????????
                    this.updateTargetAndDuration(this._tweenStart, ScrollPane.sEndPos);
                }
                else
                    this._tweenDuration.setTo(ScrollPane.TWEEN_TIME_DEFAULT, ScrollPane.TWEEN_TIME_DEFAULT);
                ScrollPane.sOldChange.setTo(ScrollPane.sEndPos.x - this._tweenStart.x, ScrollPane.sEndPos.y - this._tweenStart.y);
                //??????????????????
                this.loopCheckingTarget(ScrollPane.sEndPos);
                if (this._pageMode || this._snapToItem)
                    this.alignPosition(ScrollPane.sEndPos, true);
                this._tweenChange.x = ScrollPane.sEndPos.x - this._tweenStart.x;
                this._tweenChange.y = ScrollPane.sEndPos.y - this._tweenStart.y;
                if (this._tweenChange.x == 0 && this._tweenChange.y == 0) {
                    if (this._scrollBarDisplayAuto)
                        this.showScrollBar(false);
                    return;
                }
                //??????????????????????????????????????????????????????
                if (this._pageMode || this._snapToItem) {
                    this.fixDuration("x", ScrollPane.sOldChange.x);
                    this.fixDuration("y", ScrollPane.sOldChange.y);
                }
            }
            this._tweening = 2;
            this._tweenTime.setTo(0, 0);
            egret.startTick(this.tweenUpdate, this);
        };
        ScrollPane.prototype.__touchTap = function (evt) {
            this.isDragged = false;
        };
        ScrollPane.prototype.__rollOver = function (evt) {
            this.showScrollBar(true);
        };
        ScrollPane.prototype.__rollOut = function (evt) {
            this.showScrollBar(false);
        };
        ScrollPane.prototype.showScrollBar = function (val) {
            if (val) {
                this.__showScrollBar(true);
                fairygui.GTimers.inst.remove(this.__showScrollBar, this);
            }
            else
                fairygui.GTimers.inst.add(500, 1, this.__showScrollBar, this, val);
        };
        ScrollPane.prototype.__showScrollBar = function (val) {
            this._scrollBarVisible = val && this._viewSize.x > 0 && this._viewSize.y > 0;
            if (this._vtScrollBar)
                this._vtScrollBar.displayObject.visible = this._scrollBarVisible && !this._vScrollNone;
            if (this._hzScrollBar)
                this._hzScrollBar.displayObject.visible = this._scrollBarVisible && !this._hScrollNone;
        };
        ScrollPane.prototype.getLoopPartSize = function (division, axis) {
            return (this._contentSize[axis] + (axis == "x" ? this._owner.columnGap : this._owner.lineGap)) / division;
        };
        ScrollPane.prototype.loopCheckingCurrent = function () {
            var changed = false;
            if (this._loop == 1 && this._overlapSize.x > 0) {
                if (this._xPos < 0.001) {
                    this._xPos += this.getLoopPartSize(2, "x");
                    changed = true;
                }
                else if (this._xPos >= this._overlapSize.x) {
                    this._xPos -= this.getLoopPartSize(2, "x");
                    changed = true;
                }
            }
            else if (this._loop == 2 && this._overlapSize.y > 0) {
                if (this._yPos < 0.001) {
                    this._yPos += this.getLoopPartSize(2, "y");
                    changed = true;
                }
                else if (this._yPos >= this._overlapSize.y) {
                    this._yPos -= this.getLoopPartSize(2, "y");
                    changed = true;
                }
            }
            if (changed) {
                this._container.x = Math.floor(-this._xPos);
                this._container.y = Math.floor(-this._yPos);
            }
            return changed;
        };
        ScrollPane.prototype.loopCheckingTarget = function (endPos) {
            if (this._loop == 1)
                this.loopCheckingTarget2(endPos, "x");
            if (this._loop == 2)
                this.loopCheckingTarget2(endPos, "y");
        };
        ScrollPane.prototype.loopCheckingTarget2 = function (endPos, axis) {
            var halfSize;
            var tmp;
            if (endPos[axis] > 0) {
                halfSize = this.getLoopPartSize(2, axis);
                tmp = this._tweenStart[axis] - halfSize;
                if (tmp <= 0 && tmp >= -this._overlapSize[axis]) {
                    endPos[axis] -= halfSize;
                    this._tweenStart[axis] = tmp;
                }
            }
            else if (endPos[axis] < -this._overlapSize[axis]) {
                halfSize = this.getLoopPartSize(2, axis);
                tmp = this._tweenStart[axis] + halfSize;
                if (tmp <= 0 && tmp >= -this._overlapSize[axis]) {
                    endPos[axis] += halfSize;
                    this._tweenStart[axis] = tmp;
                }
            }
        };
        ScrollPane.prototype.loopCheckingNewPos = function (value, axis) {
            if (this._overlapSize[axis] == 0)
                return value;
            var pos = axis == "x" ? this._xPos : this._yPos;
            var changed = false;
            var v;
            if (value < 0.001) {
                value += this.getLoopPartSize(2, axis);
                if (value > pos) {
                    v = this.getLoopPartSize(6, axis);
                    v = Math.ceil((value - pos) / v) * v;
                    pos = fairygui.ToolSet.clamp(pos + v, 0, this._overlapSize[axis]);
                    changed = true;
                }
            }
            else if (value >= this._overlapSize[axis]) {
                value -= this.getLoopPartSize(2, axis);
                if (value < pos) {
                    v = this.getLoopPartSize(6, axis);
                    v = Math.ceil((pos - value) / v) * v;
                    pos = fairygui.ToolSet.clamp(pos - v, 0, this._overlapSize[axis]);
                    changed = true;
                }
            }
            if (changed) {
                if (axis == "x")
                    this._container.x = -Math.floor(pos);
                else
                    this._container.y = -Math.floor(pos);
            }
            return value;
        };
        ScrollPane.prototype.alignPosition = function (pos, inertialScrolling) {
            if (this._pageMode) {
                pos.x = this.alignByPage(pos.x, "x", inertialScrolling);
                pos.y = this.alignByPage(pos.y, "y", inertialScrolling);
            }
            else if (this._snapToItem) {
                var pt = this._owner.getSnappingPosition(-pos.x, -pos.y, ScrollPane.sHelperPoint);
                if (pos.x < 0 && pos.x > -this._overlapSize.x)
                    pos.x = -pt.x;
                if (pos.y < 0 && pos.y > -this._overlapSize.y)
                    pos.y = -pt.y;
            }
        };
        ScrollPane.prototype.alignByPage = function (pos, axis, inertialScrolling) {
            var page;
            if (pos > 0)
                page = 0;
            else if (pos < -this._overlapSize[axis])
                page = Math.ceil(this._contentSize[axis] / this._pageSize[axis]) - 1;
            else {
                page = Math.floor(-pos / this._pageSize[axis]);
                var change = inertialScrolling ? (pos - this._containerPos[axis]) : (pos - this._container[axis]);
                var testPageSize = Math.min(this._pageSize[axis], this._contentSize[axis] - (page + 1) * this._pageSize[axis]);
                var delta = -pos - page * this._pageSize[axis];
                //??????????????????
                if (Math.abs(change) > this._pageSize[axis]) {
                    if (delta > testPageSize * 0.5)
                        page++;
                }
                else {
                    if (delta > testPageSize * (change < 0 ? 0.3 : 0.7))
                        page++;
                }
                //??????????????????
                pos = -page * this._pageSize[axis];
                if (pos < -this._overlapSize[axis])
                    pos = -this._overlapSize[axis];
            }
            //?????????????????????????????????????????????????????????????????????
            if (inertialScrolling) {
                var oldPos = this._tweenStart[axis];
                var oldPage;
                if (oldPos > 0)
                    oldPage = 0;
                else if (oldPos < -this._overlapSize[axis])
                    oldPage = Math.ceil(this._contentSize[axis] / this._pageSize[axis]) - 1;
                else
                    oldPage = Math.floor(-oldPos / this._pageSize[axis]);
                var startPage = Math.floor(-this._containerPos[axis] / this._pageSize[axis]);
                if (Math.abs(page - startPage) > 1 && Math.abs(oldPage - startPage) <= 1) {
                    if (page > startPage)
                        page = startPage + 1;
                    else
                        page = startPage - 1;
                    pos = -page * this._pageSize[axis];
                }
            }
            return pos;
        };
        ScrollPane.prototype.updateTargetAndDuration = function (orignPos, resultPos) {
            resultPos.x = this.updateTargetAndDuration2(orignPos.x, "x");
            resultPos.y = this.updateTargetAndDuration2(orignPos.y, "y");
        };
        ScrollPane.prototype.updateTargetAndDuration2 = function (pos, axis) {
            var v = this._velocity[axis];
            var duration = 0;
            if (pos > 0)
                pos = 0;
            else if (pos < -this._overlapSize[axis])
                pos = -this._overlapSize[axis];
            else {
                //????????????????????????
                var isMobile = egret.Capabilities.isMobile;
                var v2 = Math.abs(v) * this._velocityScale;
                //???????????????????????????????????????????????????????????????????????????????????????1136??????????????????
                if (isMobile)
                    v2 *= 1136 / Math.max(this._owner.displayObject.stage.stageWidth, this._owner.displayObject.stage.stageHeight);
                //?????????????????????????????????????????????????????????????????????????????????????????????????????????
                var ratio = 0;
                if (this._pageMode || !isMobile) {
                    if (v2 > 500)
                        ratio = Math.pow((v2 - 500) / 500, 2);
                }
                else {
                    if (v2 > 1000)
                        ratio = Math.pow((v2 - 1000) / 1000, 2);
                }
                if (ratio != 0) {
                    if (ratio > 1)
                        ratio = 1;
                    v2 *= ratio;
                    v *= ratio;
                    this._velocity[axis] = v;
                    //?????????v*???this._decelerationRate???n?????????= 60?????????n??????????????????60???????????????60?????????
                    duration = Math.log(60 / v2) / Math.log(this._decelerationRate) / 60;
                    //?????????????????????????????????
                    //????????????????????????????????????????????????????????????
                    //var change:number = (v/ 60 - 1) / (1 - this._decelerationRate);
                    var change = Math.floor(v * duration * 0.4);
                    pos += change;
                }
            }
            if (duration < ScrollPane.TWEEN_TIME_DEFAULT)
                duration = ScrollPane.TWEEN_TIME_DEFAULT;
            this._tweenDuration[axis] = duration;
            return pos;
        };
        ScrollPane.prototype.fixDuration = function (axis, oldChange) {
            if (this._tweenChange[axis] == 0 || Math.abs(this._tweenChange[axis]) >= Math.abs(oldChange))
                return;
            var newDuration = Math.abs(this._tweenChange[axis] / oldChange) * this._tweenDuration[axis];
            if (newDuration < ScrollPane.TWEEN_TIME_DEFAULT)
                newDuration = ScrollPane.TWEEN_TIME_DEFAULT;
            this._tweenDuration[axis] = newDuration;
        };
        ScrollPane.prototype.killTween = function () {
            if (this._tweening == 1) {
                this._container.x = this._tweenStart.x + this._tweenChange.x;
                this._container.y = this._tweenStart.y + this._tweenChange.y;
                this.dispatchEventWith(ScrollPane.SCROLL);
            }
            this._tweening = 0;
            egret.stopTick(this.tweenUpdate, this);
            this.dispatchEventWith(ScrollPane.SCROLL_END);
        };
        ScrollPane.prototype.checkRefreshBar = function () {
            if (this._header == null && this._footer == null)
                return;
            var pos = this._container[this._refreshBarAxis];
            if (this._header != null) {
                if (pos > 0) {
                    if (this._header.displayObject.parent == null)
                        this._maskContainer.addChildAt(this._header.displayObject, 0);
                    var pt = ScrollPane.sHelperPoint;
                    pt.setTo(this._header.width, this._header.height);
                    pt[this._refreshBarAxis] = pos;
                    this._header.setSize(pt.x, pt.y);
                }
                else {
                    if (this._header.displayObject.parent != null)
                        this._maskContainer.removeChild(this._header.displayObject);
                }
            }
            if (this._footer != null) {
                var max = this._overlapSize[this._refreshBarAxis];
                if (pos < -max || max == 0 && this._footerLockedSize > 0) {
                    if (this._footer.displayObject.parent == null)
                        this._maskContainer.addChildAt(this._footer.displayObject, 0);
                    pt = ScrollPane.sHelperPoint;
                    pt.setTo(this._footer.x, this._footer.y);
                    if (max > 0)
                        pt[this._refreshBarAxis] = pos + this._contentSize[this._refreshBarAxis];
                    else
                        pt[this._refreshBarAxis] = Math.max(Math.min(pos + this._viewSize[this._refreshBarAxis], this._viewSize[this._refreshBarAxis] - this._footerLockedSize), this._viewSize[this._refreshBarAxis] - this._contentSize[this._refreshBarAxis]);
                    this._footer.setXY(pt.x, pt.y);
                    pt.setTo(this._footer.width, this._footer.height);
                    if (max > 0)
                        pt[this._refreshBarAxis] = -max - pos;
                    else
                        pt[this._refreshBarAxis] = this._viewSize[this._refreshBarAxis] - this._footer[this._refreshBarAxis];
                    this._footer.setSize(pt.x, pt.y);
                }
                else {
                    if (this._footer.displayObject.parent != null)
                        this._maskContainer.removeChild(this._footer.displayObject);
                }
            }
        };
        ScrollPane.prototype.tweenUpdate = function (timestamp) {
            var nx = this.runTween("x");
            var ny = this.runTween("y");
            this._container.x = nx;
            this._container.y = ny;
            if (this._tweening == 2) {
                if (this._overlapSize.x > 0)
                    this._xPos = fairygui.ToolSet.clamp(-nx, 0, this._overlapSize.x);
                if (this._overlapSize.y > 0)
                    this._yPos = fairygui.ToolSet.clamp(-ny, 0, this._overlapSize.y);
                if (this._pageMode)
                    this.updatePageController();
            }
            if (this._tweenChange.x == 0 && this._tweenChange.y == 0) {
                this._tweening = 0;
                egret.stopTick(this.tweenUpdate, this);
                this.loopCheckingCurrent();
                this.syncScrollBar(true);
                this.checkRefreshBar();
                this.dispatchEventWith(ScrollPane.SCROLL);
                this.dispatchEventWith(ScrollPane.SCROLL_END);
            }
            else {
                this.syncScrollBar(false);
                this.checkRefreshBar();
                this.dispatchEventWith(ScrollPane.SCROLL);
            }
            return true;
        };
        ScrollPane.prototype.runTween = function (axis) {
            var newValue;
            if (this._tweenChange[axis] != 0) {
                this._tweenTime[axis] += fairygui.GTimers.deltaTime / 1000;
                if (this._tweenTime[axis] >= this._tweenDuration[axis]) {
                    newValue = this._tweenStart[axis] + this._tweenChange[axis];
                    this._tweenChange[axis] = 0;
                }
                else {
                    var ratio = ScrollPane.easeFunc(this._tweenTime[axis], this._tweenDuration[axis]);
                    newValue = this._tweenStart[axis] + Math.floor(this._tweenChange[axis] * ratio);
                }
                var threshold1 = 0;
                var threshold2 = -this._overlapSize[axis];
                if (this._headerLockedSize > 0 && this._refreshBarAxis == axis)
                    threshold1 = this._headerLockedSize;
                if (this._footerLockedSize > 0 && this._refreshBarAxis == axis) {
                    var max = this._overlapSize[this._refreshBarAxis];
                    if (max == 0)
                        max = Math.max(this._contentSize[this._refreshBarAxis] + this._footerLockedSize - this._viewSize[this._refreshBarAxis], 0);
                    else
                        max += this._footerLockedSize;
                    threshold2 = -max;
                }
                if (this._tweening == 2 && this._bouncebackEffect) {
                    if (newValue > 20 + threshold1 && this._tweenChange[axis] > 0
                        || newValue > threshold1 && this._tweenChange[axis] == 0) {
                        this._tweenTime[axis] = 0;
                        this._tweenDuration[axis] = ScrollPane.TWEEN_TIME_DEFAULT;
                        this._tweenChange[axis] = -newValue + threshold1;
                        this._tweenStart[axis] = newValue;
                    }
                    else if (newValue < threshold2 - 20 && this._tweenChange[axis] < 0
                        || newValue < threshold2 && this._tweenChange[axis] == 0) {
                        this._tweenTime[axis] = 0;
                        this._tweenDuration[axis] = ScrollPane.TWEEN_TIME_DEFAULT;
                        this._tweenChange[axis] = threshold2 - newValue;
                        this._tweenStart[axis] = newValue;
                    }
                }
                else {
                    if (newValue > threshold1) {
                        newValue = threshold1;
                        this._tweenChange[axis] = 0;
                    }
                    else if (newValue < threshold2) {
                        newValue = threshold2;
                        this._tweenChange[axis] = 0;
                    }
                }
            }
            else
                newValue = this._container[axis];
            return newValue;
        };
        ScrollPane.easeFunc = function (t, d) {
            return (t = t / d - 1) * t * t + 1; //cubicOut
        };
        ScrollPane._gestureFlag = 0;
        ScrollPane.SCROLL = "__scroll";
        ScrollPane.SCROLL_END = "__scrollEnd";
        ScrollPane.PULL_DOWN_RELEASE = "pullDownRelease";
        ScrollPane.PULL_UP_RELEASE = "pullUpRelease";
        ScrollPane.TWEEN_TIME_GO = 0.5; //??????SetPos(ani)????????????????????????
        ScrollPane.TWEEN_TIME_DEFAULT = 0.3; //?????????????????????????????????
        ScrollPane.PULL_RATIO = 0.5; //??????????????????????????????????????????????????????????????????????????????
        ScrollPane.sHelperPoint = new egret.Point();
        ScrollPane.sHelperRect = new egret.Rectangle();
        ScrollPane.sEndPos = new egret.Point();
        ScrollPane.sOldChange = new egret.Point();
        return ScrollPane;
    }(egret.EventDispatcher));
    fairygui.ScrollPane = ScrollPane;
    __reflect(ScrollPane.prototype, "fairygui.ScrollPane");
})(fairygui || (fairygui = {}));
