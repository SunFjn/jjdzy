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
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip() {
            var _this = _super.call(this) || this;
            _this.interval = 0;
            _this.repeatDelay = 0;
            _this.timeScale = 1;
            _this._playing = true;
            _this._frameCount = 0;
            _this._frame = 0;
            _this._start = 0;
            _this._end = 0;
            _this._times = 0;
            _this._endAt = 0;
            _this._status = 0; //0-none, 1-next loop, 2-ending, 3-ended
            _this._smoothing = true;
            _this._frameElapsed = 0; //当前帧延迟
            _this._reversed = false;
            _this._repeatedCount = 0;
            _this.touchEnabled = false;
            _this.setPlaySettings();
            return _this;
        }
        Object.defineProperty(MovieClip.prototype, "frames", {
            get: function () {
                return this._frames;
            },
            set: function (value) {
                this._frames = value;
                this.scale9Grid = null;
                this.fillMode = egret.BitmapFillMode.SCALE;
                if (this._frames != null)
                    this._frameCount = this._frames.length;
                else
                    this._frameCount = 0;
                if (this._end == -1 || this._end > this._frameCount - 1)
                    this._end = this._frameCount - 1;
                if (this._endAt == -1 || this._endAt > this._frameCount - 1)
                    this._endAt = this._frameCount - 1;
                if (this._frame < 0 || this._frame > this._frameCount - 1)
                    this._frame = this._frameCount - 1;
                this.drawFrame();
                this._frameElapsed = 0;
                this._repeatedCount = 0;
                this._reversed = false;
                this.checkTimer();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "frameCount", {
            get: function () {
                return this._frameCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "frame", {
            get: function () {
                return this._frame;
            },
            set: function (value) {
                if (this._frame != value) {
                    if (this._frames != null && value >= this._frameCount)
                        value = this._frameCount - 1;
                    this._frame = value;
                    this._frameElapsed = 0;
                    this.drawFrame();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "playing", {
            get: function () {
                return this._playing;
            },
            set: function (value) {
                if (this._playing != value) {
                    this._playing = value;
                    this.checkTimer();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "smoothing", {
            get: function () {
                return this._smoothing;
            },
            set: function (value) {
                this._smoothing = value;
            },
            enumerable: true,
            configurable: true
        });
        MovieClip.prototype.rewind = function () {
            this._frame = 0;
            this._frameElapsed = 0;
            this._reversed = false;
            this._repeatedCount = 0;
            this.drawFrame();
        };
        MovieClip.prototype.syncStatus = function (anotherMc) {
            this._frame = anotherMc._frame;
            this._frameElapsed = anotherMc._frameElapsed;
            this._reversed = anotherMc._reversed;
            this._repeatedCount = anotherMc._repeatedCount;
            this.drawFrame();
        };
        MovieClip.prototype.advance = function (timeInMiniseconds) {
            var beginFrame = this._frame;
            var beginReversed = this._reversed;
            var backupTime = timeInMiniseconds;
            while (true) {
                var tt = this.interval + this._frames[this._frame].addDelay;
                if (this._frame == 0 && this._repeatedCount > 0)
                    tt += this.repeatDelay;
                if (timeInMiniseconds < tt) {
                    this._frameElapsed = 0;
                    break;
                }
                timeInMiniseconds -= tt;
                if (this.swing) {
                    if (this._reversed) {
                        this._frame--;
                        if (this._frame <= 0) {
                            this._frame = 0;
                            this._repeatedCount++;
                            this._reversed = !this._reversed;
                        }
                    }
                    else {
                        this._frame++;
                        if (this._frame > this._frameCount - 1) {
                            this._frame = Math.max(0, this._frameCount - 2);
                            this._repeatedCount++;
                            this._reversed = !this._reversed;
                        }
                    }
                }
                else {
                    this._frame++;
                    if (this._frame > this._frameCount - 1) {
                        this._frame = 0;
                        this._repeatedCount++;
                    }
                }
                if (this._frame == beginFrame && this._reversed == beginReversed) {
                    var roundTime = backupTime - timeInMiniseconds; //这就是一轮需要的时间
                    timeInMiniseconds -= Math.floor(timeInMiniseconds / roundTime) * roundTime; //跳过
                }
            }
            this.drawFrame();
        };
        //从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
        MovieClip.prototype.setPlaySettings = function (start, end, times, endAt, endCallback, callbackObj) {
            if (start === void 0) { start = 0; }
            if (end === void 0) { end = -1; }
            if (times === void 0) { times = 0; }
            if (endAt === void 0) { endAt = -1; }
            if (endCallback === void 0) { endCallback = null; }
            if (callbackObj === void 0) { callbackObj = null; }
            this._start = start;
            this._end = end;
            if (this._end == -1 || this._end > this._frameCount - 1)
                this._end = this._frameCount - 1;
            this._times = times;
            this._endAt = endAt;
            if (this._endAt == -1)
                this._endAt = this._end;
            this._status = 0;
            this._callback = endCallback;
            this._callbackObj = callbackObj;
            this.frame = start;
        };
        MovieClip.prototype.update = function () {
            if (!this._playing || this._frameCount == 0 || this._status == 3)
                return;
            var dt = fairygui.GTimers.deltaTime;
            if (this.timeScale != 1)
                dt *= this.timeScale;
            this._frameElapsed += dt;
            var tt = this.interval + this._frames[this._frame].addDelay;
            if (this._frame == 0 && this._repeatedCount > 0)
                tt += this.repeatDelay;
            if (this._frameElapsed < tt)
                return;
            this._frameElapsed -= tt;
            if (this._frameElapsed > this.interval)
                this._frameElapsed = this.interval;
            if (this.swing) {
                if (this._reversed) {
                    this._frame--;
                    if (this._frame <= 0) {
                        this._frame = 0;
                        this._repeatedCount++;
                        this._reversed = !this._reversed;
                    }
                }
                else {
                    this._frame++;
                    if (this._frame > this._frameCount - 1) {
                        this._frame = Math.max(0, this._frameCount - 2);
                        this._repeatedCount++;
                        this._reversed = !this._reversed;
                    }
                }
            }
            else {
                this._frame++;
                if (this._frame > this._frameCount - 1) {
                    this._frame = 0;
                    this._repeatedCount++;
                }
            }
            if (this._status == 1) {
                this._frame = this._start;
                this._frameElapsed = 0;
                this._status = 0;
            }
            else if (this._status == 2) {
                this._frame = this._endAt;
                this._frameElapsed = 0;
                this._status = 3; //ended
                //play end
                if (this._callback != null) {
                    var callback = this._callback;
                    var caller = this._callbackObj;
                    this._callback = null;
                    this._callbackObj = null;
                    callback.call(caller);
                }
            }
            else {
                if (this._frame == this._end) {
                    if (this._times > 0) {
                        this._times--;
                        if (this._times == 0)
                            this._status = 2; //ending
                        else
                            this._status = 1; //new loop
                    }
                    else if (this._start != 0)
                        this._status = 1; //new loop
                }
            }
            this.drawFrame();
        };
        MovieClip.prototype.drawFrame = function () {
            if (this._frameCount > 0 && this._frame < this._frames.length) {
                var frame = this._frames[this._frame];
                this.texture = frame.texture;
            }
            else
                this.texture = null;
        };
        MovieClip.prototype.checkTimer = function () {
            if (this._playing && this._frameCount > 0 && this.stage != null)
                fairygui.GTimers.inst.add(1, 0, this.update, this);
            else
                fairygui.GTimers.inst.remove(this.update, this);
        };
        MovieClip.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            if (this._playing && this._frameCount > 0)
                fairygui.GTimers.inst.add(1, 0, this.update, this);
        };
        MovieClip.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            fairygui.GTimers.inst.remove(this.update, this);
        };
        return MovieClip;
    }(egret.Bitmap));
    fairygui.MovieClip = MovieClip;
    __reflect(MovieClip.prototype, "fairygui.MovieClip");
})(fairygui || (fairygui = {}));
