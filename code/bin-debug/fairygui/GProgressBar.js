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
    var GProgressBar = (function (_super) {
        __extends(GProgressBar, _super);
        function GProgressBar() {
            var _this = _super.call(this) || this;
            _this._max = 0;
            _this._value = 0;
            _this._barMaxWidth = 0;
            _this._barMaxHeight = 0;
            _this._barMaxWidthDelta = 0;
            _this._barMaxHeightDelta = 0;
            _this._barStartX = 0;
            _this._barStartY = 0;
            _this._titleType = fairygui.ProgressTitleType.Percent;
            _this._value = 50;
            _this._max = 100;
            return _this;
        }
        Object.defineProperty(GProgressBar.prototype, "titleType", {
            get: function () {
                return this._titleType;
            },
            set: function (value) {
                if (this._titleType != value) {
                    this._titleType = value;
                    this.update(this._value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GProgressBar.prototype, "max", {
            get: function () {
                return this._max;
            },
            set: function (value) {
                if (this._max != value) {
                    this._max = value;
                    this.update(this._value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GProgressBar.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                if (this._value != value) {
                    fairygui.GTween.kill(this, false, this.update);
                    this._value = value;
                    this.update(this._value);
                }
            },
            enumerable: true,
            configurable: true
        });
        GProgressBar.prototype.tweenValue = function (value, duration) {
            var oldValule;
            var tweener = fairygui.GTween.getTween(this, this.update);
            if (tweener != null) {
                oldValule = tweener.value.x;
                tweener.kill();
            }
            else
                oldValule = this._value;
            this._value = value;
            return fairygui.GTween.to(oldValule, this._value, duration).setTarget(this, this.update).setEase(fairygui.EaseType.Linear);
        };
        GProgressBar.prototype.update = function (newValue) {
            var percent = this._max != 0 ? Math.min(newValue / this._max, 1) : 0;
            if (this._titleObject) {
                switch (this._titleType) {
                    case fairygui.ProgressTitleType.Percent:
                        this._titleObject.text = Math.round(percent * 100) + "%";
                        break;
                    case fairygui.ProgressTitleType.ValueAndMax:
                        this._titleObject.text = Math.round(newValue) + "/" + Math.round(this._max);
                        break;
                    case fairygui.ProgressTitleType.Value:
                        this._titleObject.text = "" + Math.round(newValue);
                        break;
                    case fairygui.ProgressTitleType.Max:
                        this._titleObject.text = "" + Math.round(this._max);
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
            if (this._aniObject instanceof fairygui.GMovieClip)
                (this._aniObject).frame = Math.round(percent * 100);
        };
        GProgressBar.prototype.constructExtension = function (buffer) {
            buffer.seek(0, 6);
            this._titleType = buffer.readByte();
            this._reverse = buffer.readBool();
            this._titleObject = (this.getChild("title"));
            this._barObjectH = this.getChild("bar");
            this._barObjectV = this.getChild("bar_v");
            this._aniObject = this.getChild("ani");
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
        };
        GProgressBar.prototype.handleSizeChanged = function () {
            _super.prototype.handleSizeChanged.call(this);
            if (this._barObjectH)
                this._barMaxWidth = this.width - this._barMaxWidthDelta;
            if (this._barObjectV)
                this._barMaxHeight = this.height - this._barMaxHeightDelta;
            if (!this._underConstruct)
                this.update(this._value);
        };
        GProgressBar.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            if (!buffer.seek(beginPos, 6)) {
                this.update(this._value);
                return;
            }
            if (buffer.readByte() != this.packageItem.objectType) {
                this.update(this._value);
                return;
            }
            this._value = buffer.readInt();
            this._max = buffer.readInt();
            this.update(this._value);
        };
        return GProgressBar;
    }(fairygui.GComponent));
    fairygui.GProgressBar = GProgressBar;
    __reflect(GProgressBar.prototype, "fairygui.GProgressBar");
})(fairygui || (fairygui = {}));
