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
    var GRoot = (function (_super) {
        __extends(GRoot, _super);
        function GRoot() {
            var _this = _super.call(this) || this;
            if (GRoot._inst == null)
                GRoot._inst = _this;
            _this.opaque = false;
            _this._volumeScale = 1;
            _this._popupStack = new Array();
            _this._justClosedPopups = new Array();
            _this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, _this.__addedToStage, _this);
            return _this;
        }
        Object.defineProperty(GRoot, "inst", {
            get: function () {
                if (GRoot._inst == null)
                    new GRoot();
                return GRoot._inst;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRoot.prototype, "nativeStage", {
            get: function () {
                return this._nativeStage;
            },
            enumerable: true,
            configurable: true
        });
        GRoot.prototype.showWindow = function (win) {
            this.addChild(win);
            win.requestFocus();
            if (win.x > this.width)
                win.x = this.width - win.width;
            else if (win.x + win.width < 0)
                win.x = 0;
            if (win.y > this.height)
                win.y = this.height - win.height;
            else if (win.y + win.height < 0)
                win.y = 0;
            this.adjustModalLayer();
        };
        GRoot.prototype.hideWindow = function (win) {
            win.hide();
        };
        GRoot.prototype.hideWindowImmediately = function (win) {
            if (win.parent == this)
                this.removeChild(win);
            this.adjustModalLayer();
        };
        GRoot.prototype.bringToFront = function (win) {
            var cnt = this.numChildren;
            var i;
            if (this._modalLayer.parent != null && !win.modal)
                i = this.getChildIndex(this._modalLayer) - 1;
            else
                i = cnt - 1;
            for (; i >= 0; i--) {
                var g = this.getChildAt(i);
                if (g == win)
                    return;
                if (g instanceof fairygui.Window)
                    break;
            }
            if (i >= 0)
                this.setChildIndex(win, i);
        };
        GRoot.prototype.showModalWait = function (msg) {
            if (msg === void 0) { msg = null; }
            if (fairygui.UIConfig.globalModalWaiting != null) {
                if (this._modalWaitPane == null)
                    this._modalWaitPane = fairygui.UIPackage.createObjectFromURL(fairygui.UIConfig.globalModalWaiting);
                this._modalWaitPane.setSize(this.width, this.height);
                this._modalWaitPane.addRelation(this, fairygui.RelationType.Size);
                this.addChild(this._modalWaitPane);
                this._modalWaitPane.text = msg;
            }
        };
        GRoot.prototype.closeModalWait = function () {
            if (this._modalWaitPane != null && this._modalWaitPane.parent != null)
                this.removeChild(this._modalWaitPane);
        };
        GRoot.prototype.closeAllExceptModals = function () {
            var arr = this._children.slice();
            var cnt = arr.length;
            for (var i = 0; i < cnt; i++) {
                var g = arr[i];
                if ((g instanceof fairygui.Window) && !g.modal)
                    g.hide();
            }
        };
        GRoot.prototype.closeAllWindows = function () {
            var arr = this._children.slice();
            var cnt = arr.length;
            for (var i = 0; i < cnt; i++) {
                var g = arr[i];
                if (g instanceof fairygui.Window)
                    g.hide();
            }
        };
        GRoot.prototype.getTopWindow = function () {
            var cnt = this.numChildren;
            for (var i = cnt - 1; i >= 0; i--) {
                var g = this.getChildAt(i);
                if (g instanceof fairygui.Window) {
                    return g;
                }
            }
            return null;
        };
        Object.defineProperty(GRoot.prototype, "modalLayer", {
            get: function () {
                return this._modalLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRoot.prototype, "hasModalWindow", {
            get: function () {
                return this._modalLayer.parent != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRoot.prototype, "modalWaiting", {
            get: function () {
                return this._modalWaitPane && this._modalWaitPane.inContainer;
            },
            enumerable: true,
            configurable: true
        });
        GRoot.prototype.showPopup = function (popup, target, downward) {
            if (target === void 0) { target = null; }
            if (downward === void 0) { downward = null; }
            if (this._popupStack.length > 0) {
                var k = this._popupStack.indexOf(popup);
                if (k != -1) {
                    for (var i = this._popupStack.length - 1; i >= k; i--)
                        this.removeChild(this._popupStack.pop());
                }
            }
            this._popupStack.push(popup);
            if (target != null) {
                var p = target;
                while (p != null) {
                    if (p.parent == this) {
                        if (popup.sortingOrder < p.sortingOrder) {
                            popup.sortingOrder = p.sortingOrder;
                        }
                        break;
                    }
                    p = p.parent;
                }
            }
            this.addChild(popup);
            this.adjustModalLayer();
            var pos;
            var sizeW = 0, sizeH = 0;
            if (target) {
                pos = target.localToRoot();
                sizeW = target.width;
                sizeH = target.height;
            }
            else {
                pos = this.globalToLocal(GRoot.mouseX, GRoot.mouseY);
            }
            var xx, yy;
            xx = pos.x;
            if (xx + popup.width > this.width)
                xx = xx + sizeW - popup.width;
            yy = pos.y + sizeH;
            if ((downward == null && yy + popup.height > this.height)
                || downward == false) {
                yy = pos.y - popup.height - 1;
                if (yy < 0) {
                    yy = 0;
                    xx += sizeW / 2;
                }
            }
            popup.x = xx;
            popup.y = yy;
        };
        GRoot.prototype.togglePopup = function (popup, target, downward) {
            if (target === void 0) { target = null; }
            if (downward === void 0) { downward = null; }
            if (this._justClosedPopups.indexOf(popup) != -1)
                return;
            this.showPopup(popup, target, downward);
        };
        GRoot.prototype.hidePopup = function (popup) {
            if (popup === void 0) { popup = null; }
            if (popup != null) {
                var k = this._popupStack.indexOf(popup);
                if (k != -1) {
                    for (var i = this._popupStack.length - 1; i >= k; i--)
                        this.closePopup(this._popupStack.pop());
                }
            }
            else {
                var cnt = this._popupStack.length;
                for (i = cnt - 1; i >= 0; i--)
                    this.closePopup(this._popupStack[i]);
                this._popupStack.length = 0;
            }
        };
        Object.defineProperty(GRoot.prototype, "hasAnyPopup", {
            get: function () {
                return this._popupStack.length != 0;
            },
            enumerable: true,
            configurable: true
        });
        GRoot.prototype.closePopup = function (target) {
            if (target.parent != null) {
                if (target instanceof fairygui.Window)
                    target.hide();
                else
                    this.removeChild(target);
            }
        };
        GRoot.prototype.showTooltips = function (msg) {
            if (this._defaultTooltipWin == null) {
                var resourceURL = fairygui.UIConfig.tooltipsWin;
                if (!resourceURL) {
                    console.error("UIConfig.tooltipsWin not defined");
                    return;
                }
                this._defaultTooltipWin = fairygui.UIPackage.createObjectFromURL(resourceURL);
            }
            this._defaultTooltipWin.text = msg;
            this.showTooltipsWin(this._defaultTooltipWin);
        };
        GRoot.prototype.showTooltipsWin = function (tooltipWin, position) {
            if (position === void 0) { position = null; }
            this.hideTooltips();
            this._tooltipWin = tooltipWin;
            var xx = 0;
            var yy = 0;
            if (position == null) {
                xx = GRoot.mouseX + 10;
                yy = GRoot.mouseY + 20;
            }
            else {
                xx = position.x;
                yy = position.y;
            }
            var pt = this.globalToLocal(xx, yy);
            xx = pt.x;
            yy = pt.y;
            if (xx + this._tooltipWin.width > this.width) {
                xx = xx - this._tooltipWin.width - 1;
                if (xx < 0)
                    xx = 10;
            }
            if (yy + this._tooltipWin.height > this.height) {
                yy = yy - this._tooltipWin.height - 1;
                if (xx - this._tooltipWin.width - 1 > 0)
                    xx = xx - this._tooltipWin.width - 1;
                if (yy < 0)
                    yy = 10;
            }
            this._tooltipWin.x = xx;
            this._tooltipWin.y = yy;
            this.addChild(this._tooltipWin);
        };
        GRoot.prototype.hideTooltips = function () {
            if (this._tooltipWin != null) {
                if (this._tooltipWin.parent)
                    this.removeChild(this._tooltipWin);
                this._tooltipWin = null;
            }
        };
        GRoot.prototype.getObjectUnderPoint = function (globalX, globalY) {
            var ret = this._nativeStage.$hitTest(globalX, globalY);
            if (ret)
                return fairygui.ToolSet.displayObjectToGObject(ret);
            else
                return null;
        };
        Object.defineProperty(GRoot.prototype, "focus", {
            get: function () {
                if (this._focusedObject && !this._focusedObject.onStage)
                    this._focusedObject = null;
                return this._focusedObject;
            },
            set: function (value) {
                if (value && (!value.focusable || !value.onStage))
                    throw "invalid focus target";
                this.setFocus(value);
            },
            enumerable: true,
            configurable: true
        });
        GRoot.prototype.setFocus = function (value) {
            if (this._focusedObject != value) {
                this._focusedObject = value;
                this.dispatchEventWith(GRoot.FOCUS_CHANGED);
            }
        };
        Object.defineProperty(GRoot.prototype, "volumeScale", {
            get: function () {
                return this._volumeScale;
            },
            set: function (value) {
                this._volumeScale = value;
            },
            enumerable: true,
            configurable: true
        });
        GRoot.prototype.playOneShotSound = function (sound, volumeScale) {
            if (volumeScale === void 0) { volumeScale = 1; }
            var vs = this._volumeScale * volumeScale;
            var channel = sound.play(0, 1);
            channel.volume = vs;
        };
        GRoot.prototype.adjustModalLayer = function () {
            var cnt = this.numChildren;
            if (this._modalWaitPane != null && this._modalWaitPane.parent != null)
                this.setChildIndex(this._modalWaitPane, cnt - 1);
            for (var i = cnt - 1; i >= 0; i--) {
                var g = this.getChildAt(i);
                if ((g instanceof fairygui.Window) && g.modal) {
                    if (this._modalLayer.parent == null)
                        this.addChildAt(this._modalLayer, i);
                    else
                        this.setChildIndexBefore(this._modalLayer, i);
                    return;
                }
            }
            if (this._modalLayer.parent != null)
                this.removeChild(this._modalLayer);
        };
        GRoot.prototype.__addedToStage = function (evt) {
            this.displayObject.removeEventListener(egret.Event.ADDED_TO_STAGE, this.__addedToStage, this);
            this._nativeStage = this.displayObject.stage;
            this._nativeStage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__stageMouseDownCapture, this, true);
            this._nativeStage.addEventListener(egret.TouchEvent.TOUCH_END, this.__stageMouseUpCapture, this, true);
            this._nativeStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.__stageMouseMoveCapture, this, true);
            this._modalLayer = new fairygui.GGraph();
            this._modalLayer.setSize(this.width, this.height);
            this._modalLayer.drawRect(0, 0, 0, fairygui.UIConfig.modalLayerColor, fairygui.UIConfig.modalLayerAlpha);
            this._modalLayer.addRelation(this, fairygui.RelationType.Size);
            this.displayObject.stage.addEventListener(egret.Event.RESIZE, this.__winResize, this);
            this.__winResize(null);
        };
        GRoot.prototype.__stageMouseDownCapture = function (evt) {
            //GRoot.ctrlKeyDown = evt.ctrlKey;
            //GRoot.shiftKeyDown = evt.shiftKey;
            GRoot.mouseX = evt.stageX;
            GRoot.mouseY = evt.stageY;
            GRoot.touchDown = true;
            var mc = (evt.target);
            while (mc != this.displayObject.stage && mc != null) {
                if (mc["$owner"]) {
                    var gg = mc["$owner"];
                    if (gg.touchable && gg.focusable) {
                        this.setFocus(gg);
                        break;
                    }
                }
                mc = mc.parent;
            }
            if (this._tooltipWin != null)
                this.hideTooltips();
            this._justClosedPopups.length = 0;
            if (this._popupStack.length > 0) {
                mc = (evt.target);
                while (mc != this.displayObject.stage && mc != null) {
                    if (mc["$owner"]) {
                        var pindex = this._popupStack.indexOf(mc["$owner"]);
                        if (pindex != -1) {
                            for (var i = this._popupStack.length - 1; i > pindex; i--) {
                                var popup = this._popupStack.pop();
                                this.closePopup(popup);
                                this._justClosedPopups.push(popup);
                            }
                            return;
                        }
                    }
                    mc = mc.parent;
                }
                var cnt = this._popupStack.length;
                for (i = cnt - 1; i >= 0; i--) {
                    popup = this._popupStack[i];
                    this.closePopup(popup);
                    this._justClosedPopups.push(popup);
                }
                this._popupStack.length = 0;
            }
        };
        GRoot.prototype.__stageMouseMoveCapture = function (evt) {
            //GRoot.ctrlKeyDown = evt.ctrlKey;
            //GRoot.shiftKeyDown = evt.shiftKey;
            GRoot.mouseX = evt.stageX;
            GRoot.mouseY = evt.stageY;
        };
        GRoot.prototype.__stageMouseUpCapture = function (evt) {
            GRoot.touchDown = false;
        };
        GRoot.prototype.__winResize = function (evt) {
            this.setSize(this._nativeStage.stageWidth, this._nativeStage.stageHeight);
            //console.info("screen size=" + w + "x" + h + "/" + this.width + "x" + this.height);
        };
        GRoot.prototype.setSize = function (wv, hv, ignorePivot) {
            if (ignorePivot === void 0) { ignorePivot = false; }
            _super.prototype.setSize.call(this, 640, LayerManager.AdjustH);
        };
        GRoot.contentScaleFactor = 1;
        GRoot.FOCUS_CHANGED = "FocusChanged";
        return GRoot;
    }(fairygui.GComponent));
    fairygui.GRoot = GRoot;
    __reflect(GRoot.prototype, "fairygui.GRoot");
})(fairygui || (fairygui = {}));
