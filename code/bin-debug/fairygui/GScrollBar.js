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
    var GScrollBar = (function (_super) {
        __extends(GScrollBar, _super);
        function GScrollBar() {
            var _this = _super.call(this) || this;
            _this._dragOffset = new egret.Point();
            _this._scrollPerc = 0;
            return _this;
        }
        GScrollBar.prototype.setScrollPane = function (target, vertical) {
            this._target = target;
            this._vertical = vertical;
        };
        Object.defineProperty(GScrollBar.prototype, "displayPerc", {
            set: function (val) {
                if (this._vertical) {
                    if (!this._fixedGripSize)
                        this._grip.height = val * this._bar.height;
                    this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc;
                }
                else {
                    if (!this._fixedGripSize)
                        this._grip.width = val * this._bar.width;
                    this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GScrollBar.prototype, "scrollPerc", {
            set: function (val) {
                this._scrollPerc = val;
                if (this._vertical)
                    this._grip.y = this._bar.y + (this._bar.height - this._grip.height) * this._scrollPerc;
                else
                    this._grip.x = this._bar.x + (this._bar.width - this._grip.width) * this._scrollPerc;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GScrollBar.prototype, "minSize", {
            get: function () {
                if (this._vertical)
                    return (this._arrowButton1 != null ? this._arrowButton1.height : 0) + (this._arrowButton2 != null ? this._arrowButton2.height : 0);
                else
                    return (this._arrowButton1 != null ? this._arrowButton1.width : 0) + (this._arrowButton2 != null ? this._arrowButton2.width : 0);
            },
            enumerable: true,
            configurable: true
        });
        GScrollBar.prototype.constructExtension = function (buffer) {
            buffer.seek(0, 6);
            this._fixedGripSize = buffer.readBool();
            this._grip = this.getChild("grip");
            if (!this._grip) {
                console.error("需要定义grip");
                return;
            }
            this._bar = this.getChild("bar");
            if (!this._bar) {
                console.error("需要定义bar");
                return;
            }
            this._arrowButton1 = this.getChild("arrow1");
            this._arrowButton2 = this.getChild("arrow2");
            this._grip.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__gripMouseDown, this);
            if (this._arrowButton1)
                this._arrowButton1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__arrowButton1Click, this);
            if (this._arrowButton2)
                this._arrowButton2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__arrowButton2Click, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__barMouseDown, this);
        };
        GScrollBar.prototype.__gripMouseDown = function (evt) {
            if (!this._bar)
                return;
            evt.stopPropagation();
            this.globalToLocal(evt.stageX, evt.stageY, this._dragOffset);
            this._dragOffset.x -= this._grip.x;
            this._dragOffset.y -= this._grip.y;
            this._grip.displayObject.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.__gripMouseMove, this);
            this._grip.displayObject.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.__gripMouseUp, this);
        };
        GScrollBar.prototype.__gripMouseMove = function (evt) {
            if (!this.onStage)
                return;
            var pt = this.globalToLocal(evt.stageX, evt.stageY, GScrollBar.sScrollbarHelperPoint);
            if (this._vertical) {
                var curY = pt.y - this._dragOffset.y;
                this._target.setPercY((curY - this._bar.y) / (this._bar.height - this._grip.height), false);
            }
            else {
                var curX = pt.x - this._dragOffset.x;
                this._target.setPercX((curX - this._bar.x) / (this._bar.width - this._grip.width), false);
            }
        };
        GScrollBar.prototype.__gripMouseUp = function (evt) {
            var st = evt.currentTarget;
            st.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.__gripMouseMove, this);
            st.removeEventListener(egret.TouchEvent.TOUCH_END, this.__gripMouseUp, this);
        };
        GScrollBar.prototype.__arrowButton1Click = function (evt) {
            evt.stopPropagation();
            if (this._vertical)
                this._target.scrollUp();
            else
                this._target.scrollLeft();
        };
        GScrollBar.prototype.__arrowButton2Click = function (evt) {
            evt.stopPropagation();
            if (this._vertical)
                this._target.scrollDown();
            else
                this._target.scrollRight();
        };
        GScrollBar.prototype.__barMouseDown = function (evt) {
            var pt = this._grip.globalToLocal(evt.stageX, evt.stageY, GScrollBar.sScrollbarHelperPoint);
            if (this._vertical) {
                if (pt.y < 0)
                    this._target.scrollUp(4);
                else
                    this._target.scrollDown(4);
            }
            else {
                if (pt.x < 0)
                    this._target.scrollLeft(4);
                else
                    this._target.scrollRight(4);
            }
        };
        GScrollBar.sScrollbarHelperPoint = new egret.Point();
        return GScrollBar;
    }(fairygui.GComponent));
    fairygui.GScrollBar = GScrollBar;
    __reflect(GScrollBar.prototype, "fairygui.GScrollBar");
})(fairygui || (fairygui = {}));
