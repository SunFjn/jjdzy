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
    var GSlider = (function (_super) {
        __extends(GSlider, _super);
        function GSlider() {
            var _this = _super.call(this) || this;
            _this._max = 0;
            _this._value = 0;
            _this._reverse = false;
            _this._barMaxWidth = 0;
            _this._barMaxHeight = 0;
            _this._barMaxWidthDelta = 0;
            _this._barMaxHeightDelta = 0;
            _this._clickPercent = 0;
            _this._barStartX = 0;
            _this._barStartY = 0;
            _this.changeOnClick = true;
            _this.canDrag = true;
            _this._titleType = fairygui.ProgressTitleType.Percent;
            _this._value = 50;
            _this._max = 100;
            _this._clickPos = new egret.Point();
            return _this;
        }
        Object.defineProperty(GSlider.prototype, "titleType", {
            get: function () {
                return this._titleType;
            },
            set: function (value) {
                this._titleType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GSlider.prototype, "max", {
            get: function () {
                return this._max;
            },
            set: function (value) {
                if (this._max != value) {
                    this._max = value;
                    this.update();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GSlider.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (this._value != value) {
                    this._value = value;
                    this.update();
                }
            },
            enumerable: true,
            configurable: true
        });
        GSlider.prototype.update = function () {
            var percent = Math.min(this._value / this._max, 1);
            this.updateWidthPercent(percent);
        };
        GSlider.prototype.updateWidthPercent = function (percent) {
            if (this._titleObject) {
                switch (this._titleType) {
                    case fairygui.ProgressTitleType.Percent:
                        this._titleObject.text = Math.round(percent * 100) + "%";
                        break;
                    case fairygui.ProgressTitleType.ValueAndMax:
                        this._titleObject.text = this._value + "/" + this._max;
                        break;
                    case fairygui.ProgressTitleType.Value:
                        this._titleObject.text = "" + this._value;
                        break;
                    case fairygui.ProgressTitleType.Max:
                        this._titleObject.text = "" + this._max;
                        break;
                }
            }
            var fullWidth = this.width - this._barMaxWidthDelta;
            var fullHeight = this.height - this._barMaxHeightDelta;
            if (!this._reverse) {
                if (this._barObjectH)
                    this._barObjectH.width = Math.round(fullWidth * percent);
                if (this._barObjectV)
                    this._barObjectV.height = Math.round(fullHeight * percent);
            }
            else {
                if (this._barObjectH) {
                    this._barObjectH.width = Math.round(fullWidth * percent);
                    this._barObjectH.x = this._barStartX + (fullWidth - this._barObjectH.width);
                }
                if (this._barObjectV) {
                    this._barObjectV.height = Math.round(fullHeight * percent);
                    this._barObjectV.y = this._barStartY + (fullHeight - this._barObjectV.height);
                }
            }
        };
        GSlider.prototype.constructExtension = function (buffer) {
            buffer.seek(0, 6);
            this._titleType = buffer.readByte();
            this._reverse = buffer.readBool();
            this._titleObject = (this.getChild("title"));
            this._barObjectH = this.getChild("bar");
            this._barObjectV = this.getChild("bar_v");
            this._gripObject = this.getChild("grip");
            if (this._barObjectH) {
                this._barMaxWidth = this._barObjectH.width;
                this._barMaxWidthDelta = this.width - this._barMaxWidth;
                this._barStartX = this._barObjectH.x;
            }
            if (this._barObjectV) {
                this._barMaxHeight = this._barObjectV.height;
                this._barMaxHeightDelta = this.height - this._barMaxHeight;
                this._barStartY = this._barObjectV.y;
            }
            if (this._gripObject) {
                this._gripObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__gripMouseDown, this);
            }
            this.displayObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.__barMouseDown, this);
        };
        GSlider.prototype.handleSizeChanged = function () {
            _super.prototype.handleSizeChanged.call(this);
            if (this._barObjectH)
                this._barMaxWidth = this.width - this._barMaxWidthDelta;
            if (this._barObjectV)
                this._barMaxHeight = this.height - this._barMaxHeightDelta;
            if (!this._underConstruct)
                this.update();
        };
        GSlider.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            if (!buffer.seek(beginPos, 6)) {
                this.update();
                return;
            }
            if (buffer.readByte() != this.packageItem.objectType) {
                this.update();
                return;
            }
            this._value = buffer.readInt();
            this._max = buffer.readInt();
            this.update();
        };
        GSlider.prototype.__gripMouseDown = function (evt) {
            this.canDrag = true;
            evt.stopPropagation();
            this._clickPos = this.globalToLocal(evt.stageX, evt.stageY);
            this._clickPercent = this._value / this._max;
            this._gripObject.displayObject.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.__gripMouseMove, this);
            this._gripObject.displayObject.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.__gripMouseUp, this);
        };
        GSlider.prototype.__gripMouseMove = function (evt) {
            if (!this.canDrag) {
                return;
            }
            var pt = this.globalToLocal(evt.stageX, evt.stageY, GSlider.sSilderHelperPoint);
            var deltaX = pt.x - this._clickPos.x;
            var deltaY = pt.y - this._clickPos.y;
            if (this._reverse) {
                deltaX = -deltaX;
                deltaY = -deltaY;
            }
            var percent;
            if (this._barObjectH)
                percent = this._clickPercent + deltaX / this._barMaxWidth;
            else
                percent = this._clickPercent + deltaY / this._barMaxHeight;
            if (percent > 1)
                percent = 1;
            else if (percent < 0)
                percent = 0;
            var newValue = Math.round(this._max * percent);
            if (newValue != this._value) {
                this._value = newValue;
                this.dispatchEvent(new fairygui.StateChangeEvent(fairygui.StateChangeEvent.CHANGED));
            }
            this.updateWidthPercent(percent);
        };
        GSlider.prototype.__gripMouseUp = function (evt) {
            evt.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.__gripMouseMove, this);
            evt.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_END, this.__gripMouseUp, this);
        };
        GSlider.prototype.__barMouseDown = function (evt) {
            if (!this.changeOnClick)
                return;
            var pt = this._gripObject.globalToLocal(evt.stageX, evt.stageY, GSlider.sSilderHelperPoint);
            var percent = this._value / this._max;
            var delta;
            if (this._barObjectH)
                delta = (pt.x - this._gripObject.width / 2) / this._barMaxWidth;
            if (this._barObjectV)
                delta = (pt.y - this._gripObject.height / 2) / this._barMaxHeight;
            if (this._reverse)
                percent -= delta;
            else
                percent += delta;
            if (percent > 1)
                percent = 1;
            else if (percent < 0)
                percent = 0;
            var newValue = Math.round(this._max * percent);
            if (newValue != this._value) {
                this._value = newValue;
                this.dispatchEvent(new fairygui.StateChangeEvent(fairygui.StateChangeEvent.CHANGED));
            }
            this.updateWidthPercent(percent);
        };
        GSlider.sSilderHelperPoint = new egret.Point();
        return GSlider;
    }(fairygui.GComponent));
    fairygui.GSlider = GSlider;
    __reflect(GSlider.prototype, "fairygui.GSlider");
})(fairygui || (fairygui = {}));
