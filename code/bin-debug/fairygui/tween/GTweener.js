var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var GTweener = (function () {
        function GTweener() {
            this._startValue = new fairygui.TweenValue();
            this._endValue = new fairygui.TweenValue();
            this._value = new fairygui.TweenValue();
            this._deltaValue = new fairygui.TweenValue();
            this._reset();
        }
        GTweener.prototype.setDelay = function (value) {
            this._delay = value;
            return this;
        };
        Object.defineProperty(GTweener.prototype, "delay", {
            get: function () {
                return this._delay;
            },
            enumerable: true,
            configurable: true
        });
        GTweener.prototype.setDuration = function (value) {
            this._duration = value;
            return this;
        };
        Object.defineProperty(GTweener.prototype, "duration", {
            get: function () {
                return this._duration;
            },
            enumerable: true,
            configurable: true
        });
        GTweener.prototype.setBreakpoint = function (value) {
            this._breakpoint = value;
            return this;
        };
        GTweener.prototype.setEase = function (value) {
            this._easeType = value;
            return this;
        };
        GTweener.prototype.setEasePeriod = function (value) {
            this._easePeriod = value;
            return this;
        };
        GTweener.prototype.setEaseOvershootOrAmplitude = function (value) {
            this._easeOvershootOrAmplitude = value;
            return this;
        };
        GTweener.prototype.setRepeat = function (repeat, yoyo) {
            if (yoyo === void 0) { yoyo = false; }
            this._repeat = repeat;
            this._yoyo = yoyo;
            return this;
        };
        Object.defineProperty(GTweener.prototype, "repeat", {
            get: function () {
                return this._repeat;
            },
            enumerable: true,
            configurable: true
        });
        GTweener.prototype.setTimeScale = function (value) {
            this._timeScale = value;
            return this;
        };
        GTweener.prototype.setSnapping = function (value) {
            this._snapping = value;
            return this;
        };
        GTweener.prototype.setTarget = function (value, propType) {
            if (propType === void 0) { propType = null; }
            this._target = value;
            this._propType = propType;
            return this;
        };
        Object.defineProperty(GTweener.prototype, "target", {
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });
        GTweener.prototype.setUserData = function (value) {
            this._userData = value;
            return this;
        };
        Object.defineProperty(GTweener.prototype, "userData", {
            get: function () {
                return this._userData;
            },
            enumerable: true,
            configurable: true
        });
        GTweener.prototype.onUpdate = function (callback, caller) {
            this._onUpdate = callback;
            this._onUpdateCaller = caller;
            return this;
        };
        GTweener.prototype.onStart = function (callback, caller) {
            this._onStart = callback;
            this._onStartCaller = caller;
            return this;
        };
        GTweener.prototype.onComplete = function (callback, caller) {
            this._onComplete = callback;
            this._onCompleteCaller = caller;
            return this;
        };
        Object.defineProperty(GTweener.prototype, "startValue", {
            get: function () {
                return this._startValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTweener.prototype, "endValue", {
            get: function () {
                return this._endValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTweener.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTweener.prototype, "deltaValue", {
            get: function () {
                return this._deltaValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTweener.prototype, "normalizedTime", {
            get: function () {
                return this._normalizedTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTweener.prototype, "completed", {
            get: function () {
                return this._ended != 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTweener.prototype, "allCompleted", {
            get: function () {
                return this._ended == 1;
            },
            enumerable: true,
            configurable: true
        });
        GTweener.prototype.setPaused = function (paused) {
            this._paused = paused;
            return this;
        };
        /**
         * seek position of the tween, in seconds.
         */
        GTweener.prototype.seek = function (time) {
            if (this._killed)
                return;
            this._elapsedTime = time;
            if (this._elapsedTime < this._delay) {
                if (this._started)
                    this._elapsedTime = this._delay;
                else
                    return;
            }
            this.update();
        };
        GTweener.prototype.kill = function (complete) {
            if (complete === void 0) { complete = false; }
            if (this._killed)
                return;
            if (complete) {
                if (this._ended == 0) {
                    if (this._breakpoint >= 0)
                        this._elapsedTime = this._delay + this._breakpoint;
                    else if (this._repeat >= 0)
                        this._elapsedTime = this._delay + this._duration * (this._repeat + 1);
                    else
                        this._elapsedTime = this._delay + this._duration * 2;
                    this.update();
                }
                this.callCompleteCallback();
            }
            this._killed = true;
        };
        GTweener.prototype._to = function (start, end, duration) {
            this._valueSize = 1;
            this._startValue.x = start;
            this._endValue.x = end;
            this._value.x = start;
            this._duration = duration;
            return this;
        };
        GTweener.prototype._to2 = function (start, start2, end, end2, duration) {
            this._valueSize = 2;
            this._startValue.x = start;
            this._endValue.x = end;
            this._startValue.y = start2;
            this._endValue.y = end2;
            this._value.x = start;
            this._value.y = start2;
            this._duration = duration;
            return this;
        };
        GTweener.prototype._to3 = function (start, start2, start3, end, end2, end3, duration) {
            this._valueSize = 3;
            this._startValue.x = start;
            this._endValue.x = end;
            this._startValue.y = start2;
            this._endValue.y = end2;
            this._startValue.z = start3;
            this._endValue.z = end3;
            this._value.x = start;
            this._value.y = start2;
            this._value.z = start3;
            this._duration = duration;
            return this;
        };
        GTweener.prototype._to4 = function (start, start2, start3, start4, end, end2, end3, end4, duration) {
            this._valueSize = 4;
            this._startValue.x = start;
            this._endValue.x = end;
            this._startValue.y = start2;
            this._endValue.y = end2;
            this._startValue.z = start3;
            this._endValue.z = end3;
            this._startValue.w = start4;
            this._endValue.w = end4;
            this._value.x = start;
            this._value.y = start2;
            this._value.z = start3;
            this._value.w = start4;
            this._duration = duration;
            return this;
        };
        GTweener.prototype._toColor = function (start, end, duration) {
            this._valueSize = 4;
            this._startValue.color = start;
            this._endValue.color = end;
            this._value.color = start;
            this._duration = duration;
            return this;
        };
        GTweener.prototype._shake = function (startX, startY, amplitude, duration) {
            this._valueSize = 5;
            this._startValue.x = startX;
            this._startValue.y = startY;
            this._startValue.w = amplitude;
            this._duration = duration;
            return this;
        };
        GTweener.prototype._init = function () {
            this._delay = 0;
            this._duration = 0;
            this._breakpoint = -1;
            this._easeType = fairygui.EaseType.QuadOut;
            this._timeScale = 1;
            this._easePeriod = 0;
            this._easeOvershootOrAmplitude = 1.70158;
            this._snapping = false;
            this._repeat = 0;
            this._yoyo = false;
            this._valueSize = 0;
            this._started = false;
            this._paused = false;
            this._killed = false;
            this._elapsedTime = 0;
            this._normalizedTime = 0;
            this._ended = 0;
        };
        GTweener.prototype._reset = function () {
            this._target = null;
            this._userData = null;
            this._onStart = this._onUpdate = this._onComplete = null;
            this._onStartCaller = this._onUpdateCaller = this._onCompleteCaller = null;
        };
        GTweener.prototype._update = function (dt) {
            if (this._timeScale != 1)
                dt *= this._timeScale;
            if (dt == 0)
                return;
            if (this._ended != 0) {
                this.callCompleteCallback();
                this._killed = true;
                return;
            }
            this._elapsedTime += dt;
            this.update();
            if (this._ended != 0) {
                if (!this._killed) {
                    this.callCompleteCallback();
                    this._killed = true;
                }
            }
        };
        GTweener.prototype.update = function () {
            this._ended = 0;
            if (this._valueSize == 0) {
                if (this._elapsedTime >= this._delay + this._duration)
                    this._ended = 1;
                return;
            }
            if (!this._started) {
                if (this._elapsedTime < this._delay)
                    return;
                this._started = true;
                this.callStartCallback();
                if (this._killed)
                    return;
            }
            var reversed = false;
            var tt = this._elapsedTime - this._delay;
            if (this._breakpoint >= 0 && tt >= this._breakpoint) {
                tt = this._breakpoint;
                this._ended = 2;
            }
            if (this._repeat != 0) {
                var round = Math.floor(tt / this._duration);
                tt -= this._duration * round;
                if (this._yoyo)
                    reversed = round % 2 == 1;
                if (this._repeat > 0 && this._repeat - round < 0) {
                    if (this._yoyo)
                        reversed = this._repeat % 2 == 1;
                    tt = this._duration;
                    this._ended = 1;
                }
            }
            else if (tt >= this._duration) {
                tt = this._duration;
                this._ended = 1;
            }
            this._normalizedTime = fairygui.EaseManager.evaluate(this._easeType, reversed ? (this._duration - tt) : tt, this._duration, this._easeOvershootOrAmplitude, this._easePeriod);
            this._value.setZero();
            this._deltaValue.setZero();
            if (this._valueSize == 5) {
                if (this._ended == 0) {
                    var r = this._startValue.w * (1 - this._normalizedTime);
                    var rx = r * (Math.random() > 0.5 ? 1 : -1);
                    var ry = r * (Math.random() > 0.5 ? 1 : -1);
                    this._deltaValue.x = rx;
                    this._deltaValue.y = ry;
                    this._value.x = this._startValue.x + rx;
                    this._value.y = this._startValue.y + ry;
                }
                else {
                    this._value.x = this._startValue.x;
                    this._value.y = this._startValue.y;
                }
            }
            else {
                for (var i = 0; i < this._valueSize; i++) {
                    var n1 = this._startValue.getField(i);
                    var n2 = this._endValue.getField(i);
                    var f = n1 + (n2 - n1) * this._normalizedTime;
                    if (this._snapping)
                        f = Math.round(f);
                    this._deltaValue.setField(i, f - this._value.getField(i));
                    this._value.setField(i, f);
                }
            }
            if (this._target != null && this._propType != null) {
                if (this._propType instanceof Function) {
                    switch (this._valueSize) {
                        case 1:
                            this._propType.call(this._target, this._value.x);
                            break;
                        case 2:
                            this._propType.call(this._target, this._value.x, this._value.y);
                            break;
                        case 3:
                            this._propType.call(this._target, this._value.x, this._value.y, this._value.z);
                            break;
                        case 4:
                            this._propType.call(this._target, this._value.x, this._value.y, this._value.z, this._value.w);
                            break;
                        case 5:
                            this._propType.call(this._target, this._value.color);
                            break;
                        case 6:
                            this._propType.call(this._target, this._value.x, this._value.y);
                            break;
                    }
                }
                else {
                    if (this._valueSize == 5)
                        this._target[this._propType] = this._value.color;
                    else
                        this._target[this._propType] = this._value.x;
                }
            }
            this.callUpdateCallback();
        };
        GTweener.prototype.callStartCallback = function () {
            if (this._onStart != null) {
                try {
                    this._onStart.call(this._onStartCaller, this);
                }
                catch (err) {
                    console.log("FairyGUI: error in start callback > " + err);
                }
            }
        };
        GTweener.prototype.callUpdateCallback = function () {
            if (this._onUpdate != null) {
                try {
                    this._onUpdate.call(this._onUpdateCaller, this);
                }
                catch (err) {
                    console.log("FairyGUI: error in update callback > " + err);
                }
            }
        };
        GTweener.prototype.callCompleteCallback = function () {
            if (this._onComplete != null) {
                try {
                    this._onComplete.call(this._onCompleteCaller, this);
                }
                catch (err) {
                    console.log("FairyGUI: error in complete callback > " + err);
                }
            }
        };
        return GTweener;
    }());
    fairygui.GTweener = GTweener;
    __reflect(GTweener.prototype, "fairygui.GTweener");
})(fairygui || (fairygui = {}));
