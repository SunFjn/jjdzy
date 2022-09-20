var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var Transition = (function () {
        function Transition(owner) {
            this._ownerBaseX = 0;
            this._ownerBaseY = 0;
            this._totalTimes = 0;
            this._totalTasks = 0;
            this._playing = false;
            this._paused = false;
            this._options = 0;
            this._reversed = false;
            this._totalDuration = 0;
            this._autoPlay = false;
            this._autoPlayTimes = 1;
            this._autoPlayDelay = 0;
            this._timeScale = 1;
            this._startTime = 0;
            this._endTime = 0;
            this._owner = owner;
            this._items = new Array();
        }
        Transition.prototype.play = function (onComplete, onCompleteObj, onCompleteParam, times, delay, startTime, endTime) {
            if (onComplete === void 0) { onComplete = null; }
            if (onCompleteObj === void 0) { onCompleteObj = null; }
            if (onCompleteParam === void 0) { onCompleteParam = null; }
            if (times === void 0) { times = 1; }
            if (delay === void 0) { delay = 0; }
            if (startTime === void 0) { startTime = 0; }
            if (endTime === void 0) { endTime = -1; }
            this._play(onComplete, onCompleteObj, onCompleteParam, times, delay, startTime, endTime, false);
        };
        Transition.prototype.playReverse = function (onComplete, onCompleteObj, onCompleteParam, times, delay) {
            if (onComplete === void 0) { onComplete = null; }
            if (onCompleteObj === void 0) { onCompleteObj = null; }
            if (onCompleteParam === void 0) { onCompleteParam = null; }
            if (times === void 0) { times = 1; }
            if (delay === void 0) { delay = 0; }
            this._play(onComplete, onCompleteObj, onCompleteParam, times, delay, 0, -1, true);
        };
        Transition.prototype.changePlayTimes = function (value) {
            this._totalTimes = value;
        };
        Transition.prototype.setAutoPlay = function (value, times, delay) {
            if (times === void 0) { times = -1; }
            if (delay === void 0) { delay = 0; }
            if (this._autoPlay != value) {
                this._autoPlay = value;
                this._autoPlayTimes = times;
                this._autoPlayDelay = delay;
                if (this._autoPlay) {
                    if (this._owner.onStage)
                        this.play(null, null, this._autoPlayTimes, this._autoPlayDelay);
                }
                else {
                    if (!this._owner.onStage)
                        this.stop(false, true);
                }
            }
        };
        Transition.prototype._play = function (onComplete, onCompleteCaller, onCompleteParam, times, delay, startTime, endTime, reversed) {
            if (onComplete === void 0) { onComplete = null; }
            if (onCompleteCaller === void 0) { onCompleteCaller = null; }
            if (onCompleteParam === void 0) { onCompleteParam = null; }
            if (times === void 0) { times = 1; }
            if (delay === void 0) { delay = 0; }
            if (startTime === void 0) { startTime = 0; }
            if (endTime === void 0) { endTime = -1; }
            if (reversed === void 0) { reversed = false; }
            this.stop(true, true);
            this._totalTimes = times;
            this._reversed = reversed;
            this._startTime = startTime;
            this._endTime = endTime;
            this._playing = true;
            this._paused = false;
            this._onComplete = onComplete;
            this._onCompleteParam = onCompleteParam;
            this._onCompleteCaller = onCompleteCaller;
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
                var item = this._items[i];
                if (item.target == null) {
                    if (item.targetId)
                        item.target = this._owner.getChildById(item.targetId);
                    else
                        item.target = this._owner;
                }
                else if (item.target != this._owner && item.target.parent != this._owner)
                    item.target = null;
                if (item.target != null && item.type == fairygui.TransitionActionType.Transition) {
                    var trans = item.target.getTransition(item.value.transName);
                    if (trans == this)
                        trans = null;
                    if (trans != null) {
                        if (item.value.playTimes == 0) {
                            var j;
                            for (j = i - 1; j >= 0; j--) {
                                var item2 = this._items[j];
                                if (item2.type == fairygui.TransitionActionType.Transition) {
                                    if (item2.value.trans == trans) {
                                        item2.value.stopTime = item.time - item2.time;
                                        break;
                                    }
                                }
                            }
                            if (j < 0)
                                item.value.stopTime = 0;
                            else
                                trans = null; //no need to handle stop anymore
                        }
                        else
                            item.value.stopTime = -1;
                    }
                    item.value.trans = trans;
                }
            }
            if (delay == 0)
                this.onDelayedPlay();
            else
                fairygui.GTween.delayedCall(delay).onComplete(this.onDelayedPlay, this);
        };
        Transition.prototype.stop = function (setToComplete, processCallback) {
            if (setToComplete === void 0) { setToComplete = true; }
            if (processCallback === void 0) { processCallback = false; }
            if (!this._playing)
                return;
            this._playing = false;
            this._totalTasks = 0;
            this._totalTimes = 0;
            var func = this._onComplete;
            var param = this._onCompleteParam;
            var thisObj = this._onCompleteCaller;
            this._onComplete = null;
            this._onCompleteParam = null;
            this._onCompleteCaller = null;
            fairygui.GTween.kill(this); //delay start
            var cnt = this._items.length;
            if (this._reversed) {
                for (var i = cnt - 1; i >= 0; i--) {
                    var item = this._items[i];
                    if (item.target == null)
                        continue;
                    this.stopItem(item, setToComplete);
                }
            }
            else {
                for (i = 0; i < cnt; i++) {
                    item = this._items[i];
                    if (item.target == null)
                        continue;
                    this.stopItem(item, setToComplete);
                }
            }
            if (processCallback && func != null) {
                func.call(thisObj, param);
            }
        };
        Transition.prototype.stopItem = function (item, setToComplete) {
            if (item.displayLockToken != 0) {
                item.target.releaseDisplayLock(item.displayLockToken);
                item.displayLockToken = 0;
            }
            if (item.tweener != null) {
                item.tweener.kill(setToComplete);
                item.tweener = null;
                if (item.type == fairygui.TransitionActionType.Shake && !setToComplete) {
                    item.target._gearLocked = true;
                    item.target.setXY(item.target.x - item.value.lastOffsetX, item.target.y - item.value.lastOffsetY);
                    item.target._gearLocked = false;
                }
            }
            if (item.type == fairygui.TransitionActionType.Transition) {
                var trans = item.value.trans;
                if (trans != null)
                    trans.stop(setToComplete, false);
            }
        };
        Transition.prototype.setPaused = function (paused) {
            if (!this._playing || this._paused == paused)
                return;
            this._paused = paused;
            var tweener = fairygui.GTween.getTween(this);
            if (tweener != null)
                tweener.setPaused(paused);
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
                var item = this._items[i];
                if (item.target == null)
                    continue;
                if (item.type == fairygui.TransitionActionType.Transition) {
                    if (item.value.trans != null)
                        item.value.trans.setPaused(paused);
                }
                else if (item.type == fairygui.TransitionActionType.Animation) {
                    if (paused) {
                        item.value.flag = (item.target).playing;
                        (item.target).playing = false;
                    }
                    else
                        (item.target).playing = item.value.flag;
                }
                if (item.tweener != null)
                    item.tweener.setPaused(paused);
            }
        };
        Transition.prototype.dispose = function () {
            if (this._playing)
                fairygui.GTween.kill(this); //delay start
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
                var item = this._items[i];
                if (item.tweener != null) {
                    item.tweener.kill();
                    item.tweener = null;
                }
                item.target = null;
                item.hook = null;
                if (item.tweenConfig != null)
                    item.tweenConfig.endHook = null;
            }
            this._items.length = 0;
            this._playing = false;
            this._onComplete = null;
            this._onCompleteCaller = null;
            this._onCompleteParam = null;
        };
        Object.defineProperty(Transition.prototype, "playing", {
            get: function () {
                return this._playing;
            },
            enumerable: true,
            configurable: true
        });
        Transition.prototype.setValue = function (label) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var cnt = this._items.length;
            var value;
            for (var i = 0; i < cnt; i++) {
                var item = this._items[i];
                if (item.label == label) {
                    if (item.tweenConfig != null)
                        value = item.tweenConfig.startValue;
                    else
                        value = item.value;
                }
                else if (item.tweenConfig != null && item.tweenConfig.endLabel == label) {
                    value = item.tweenConfig.endValue;
                }
                else
                    continue;
                switch (item.type) {
                    case fairygui.TransitionActionType.XY:
                    case fairygui.TransitionActionType.Size:
                    case fairygui.TransitionActionType.Pivot:
                    case fairygui.TransitionActionType.Scale:
                    case fairygui.TransitionActionType.Skew:
                        value.b1 = true;
                        value.b2 = true;
                        value.f1 = parseFloat(args[0]);
                        value.f2 = parseFloat(args[1]);
                        break;
                    case fairygui.TransitionActionType.Alpha:
                        value.f1 = parseFloat(args[0]);
                        break;
                    case fairygui.TransitionActionType.Rotation:
                        value.f1 = parseFloat(args[0]);
                        break;
                    case fairygui.TransitionActionType.Color:
                        value.f1 = parseFloat(args[0]);
                        break;
                    case fairygui.TransitionActionType.Animation:
                        value.frame = parseInt(args[0]);
                        if (args.length > 1)
                            value.playing = args[1];
                        break;
                    case fairygui.TransitionActionType.Visible:
                        value.visible = args[0];
                        break;
                    case fairygui.TransitionActionType.Sound:
                        value.sound = args[0];
                        if (args.length > 1)
                            value.volume = parseFloat(args[1]);
                        break;
                    case fairygui.TransitionActionType.Transition:
                        value.transName = args[0];
                        if (args.length > 1)
                            value.playTimes = parseInt(args[1]);
                        break;
                    case fairygui.TransitionActionType.Shake:
                        value.amplitude = parseFloat(args[0]);
                        if (args.length > 1)
                            value.duration = parseFloat(args[1]);
                        break;
                    case fairygui.TransitionActionType.ColorFilter:
                        value.f1 = parseFloat(args[0]);
                        value.f2 = parseFloat(args[1]);
                        value.f3 = parseFloat(args[2]);
                        value.f4 = parseFloat(args[3]);
                        break;
                    case fairygui.TransitionActionType.Text:
                    case fairygui.TransitionActionType.Icon:
                        value.text = args[0];
                        break;
                }
            }
        };
        Transition.prototype.setHook = function (label, callback, caller) {
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
                var item = this._items[i];
                if (item.label == label) {
                    item.hook = callback;
                    item.hookCaller = caller;
                    break;
                }
                else if (item.tweenConfig != null && item.tweenConfig.endLabel == label) {
                    item.tweenConfig.endHook = callback;
                    item.tweenConfig.endHookCaller = caller;
                    break;
                }
            }
        };
        Transition.prototype.clearHooks = function () {
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
                var item = this._items[i];
                item.hook = null;
                item.hookCaller = null;
                if (item.tweenConfig != null) {
                    item.tweenConfig.endHook = null;
                    item.tweenConfig.endHookCaller = null;
                }
            }
        };
        Transition.prototype.setTarget = function (label, newTarget) {
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
                var item = this._items[i];
                if (item.label == label) {
                    item.targetId = (newTarget == this._owner || newTarget == null) ? "" : newTarget.id;
                    if (this._playing) {
                        if (item.targetId.length > 0)
                            item.target = this._owner.getChildById(item.targetId);
                        else
                            item.target = this._owner;
                    }
                    else
                        item.target = null;
                }
            }
        };
        Transition.prototype.setDuration = function (label, value) {
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
                var item = this._items[i];
                if (item.tweenConfig != null && item.label == label)
                    item.tweenConfig.duration = value;
            }
        };
        Transition.prototype.getLabelTime = function (label) {
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
                var item = this._items[i];
                if (item.label == label)
                    return item.time;
                else if (item.tweenConfig != null && item.tweenConfig.endLabel == label)
                    return item.time + item.tweenConfig.duration;
            }
            return Number.NaN;
        };
        Object.defineProperty(Transition.prototype, "timeScale", {
            get: function () {
                return this._timeScale;
            },
            set: function (value) {
                if (this._timeScale != value) {
                    this._timeScale = value;
                    if (this._playing) {
                        var cnt = this._items.length;
                        for (var i = 0; i < cnt; i++) {
                            var item = this._items[i];
                            if (item.tweener != null)
                                item.tweener.setTimeScale(value);
                            else if (item.type == fairygui.TransitionActionType.Transition) {
                                if (item.value.trans != null)
                                    item.value.trans.timeScale = value;
                            }
                            else if (item.type == fairygui.TransitionActionType.Animation) {
                                if (item.target != null)
                                    (item.target).timeScale = value;
                            }
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Transition.prototype.updateFromRelations = function (targetId, dx, dy) {
            var cnt = this._items.length;
            if (cnt == 0)
                return;
            for (var i = 0; i < cnt; i++) {
                var item = this._items[i];
                if (item.type == fairygui.TransitionActionType.XY && item.targetId == targetId) {
                    if (item.tweenConfig != null) {
                        item.tweenConfig.startValue.f1 += dx;
                        item.tweenConfig.startValue.f2 += dy;
                        item.tweenConfig.endValue.f1 += dx;
                        item.tweenConfig.endValue.f2 += dy;
                    }
                    else {
                        item.value.f1 += dx;
                        item.value.f2 += dy;
                    }
                }
            }
        };
        Transition.prototype.onOwnerAddedToStage = function () {
            if (this._autoPlay && !this._playing)
                this.play(null, null, null, this._autoPlayTimes, this._autoPlayDelay);
        };
        Transition.prototype.onOwnerRemovedFromStage = function () {
            if ((this._options & Transition.OPTION_AUTO_STOP_DISABLED) == 0)
                this.stop((this._options & Transition.OPTION_AUTO_STOP_AT_END) != 0 ? true : false, false);
        };
        Transition.prototype.onDelayedPlay = function () {
            this.internalPlay();
            this._playing = this._totalTasks > 0;
            if (this._playing) {
                if ((this._options & Transition.OPTION_IGNORE_DISPLAY_CONTROLLER) != 0) {
                    var cnt = this._items.length;
                    for (var i = 0; i < cnt; i++) {
                        var item = this._items[i];
                        if (item.target != null && item.target != this._owner)
                            item.displayLockToken = item.target.addDisplayLock();
                    }
                }
            }
            else if (this._onComplete != null) {
                var func = this._onComplete;
                var param = this._onCompleteParam;
                var thisObj = this._onCompleteCaller;
                this._onComplete = null;
                this._onCompleteParam = null;
                this._onCompleteCaller = null;
                func.call(thisObj, param);
            }
        };
        Transition.prototype.internalPlay = function () {
            this._ownerBaseX = this._owner.x;
            this._ownerBaseY = this._owner.y;
            this._totalTasks = 0;
            var cnt = this._items.length;
            var item;
            var needSkipAnimations = false;
            var i;
            if (!this._reversed) {
                for (i = 0; i < cnt; i++) {
                    item = this._items[i];
                    if (item.target == null)
                        continue;
                    if (item.type == fairygui.TransitionActionType.Animation && this._startTime != 0 && item.time <= this._startTime) {
                        needSkipAnimations = true;
                        item.value.flag = false;
                    }
                    else
                        this.playItem(item);
                }
            }
            else {
                for (i = cnt - 1; i >= 0; i--) {
                    item = this._items[i];
                    if (item.target == null)
                        continue;
                    this.playItem(item);
                }
            }
            if (needSkipAnimations)
                this.skipAnimations();
        };
        Transition.prototype.playItem = function (item) {
            var time;
            if (item.tweenConfig != null) {
                if (this._reversed)
                    time = (this._totalDuration - item.time - item.tweenConfig.duration);
                else
                    time = item.time;
                if (this._endTime == -1 || time <= this._endTime) {
                    var startValue;
                    var endValue;
                    if (this._reversed) {
                        startValue = item.tweenConfig.endValue;
                        endValue = item.tweenConfig.startValue;
                    }
                    else {
                        startValue = item.tweenConfig.startValue;
                        endValue = item.tweenConfig.endValue;
                    }
                    item.value.b1 = startValue.b1 || endValue.b1;
                    item.value.b2 = startValue.b2 || endValue.b2;
                    switch (item.type) {
                        case fairygui.TransitionActionType.XY:
                        case fairygui.TransitionActionType.Size:
                        case fairygui.TransitionActionType.Scale:
                        case fairygui.TransitionActionType.Skew:
                            item.tweener = fairygui.GTween.to2(startValue.f1, startValue.f2, endValue.f1, endValue.f2, item.tweenConfig.duration);
                            break;
                        case fairygui.TransitionActionType.Alpha:
                        case fairygui.TransitionActionType.Rotation:
                            item.tweener = fairygui.GTween.to(startValue.f1, endValue.f1, item.tweenConfig.duration);
                            break;
                        case fairygui.TransitionActionType.Color:
                            item.tweener = fairygui.GTween.toColor(startValue.f1, endValue.f1, item.tweenConfig.duration);
                            break;
                        case fairygui.TransitionActionType.ColorFilter:
                            item.tweener = fairygui.GTween.to4(startValue.f1, startValue.f2, startValue.f3, startValue.f4, endValue.f1, endValue.f2, endValue.f3, endValue.f4, item.tweenConfig.duration);
                            break;
                    }
                    item.tweener.setDelay(time)
                        .setEase(item.tweenConfig.easeType)
                        .setRepeat(item.tweenConfig.repeat, item.tweenConfig.yoyo)
                        .setTimeScale(this._timeScale)
                        .setTarget(item)
                        .onStart(this.onTweenStart, this)
                        .onUpdate(this.onTweenUpdate, this)
                        .onComplete(this.onTweenComplete, this);
                    if (this._endTime >= 0)
                        item.tweener.setBreakpoint(this._endTime - time);
                    this._totalTasks++;
                }
            }
            else if (item.type == fairygui.TransitionActionType.Shake) {
                if (this._reversed)
                    time = (this._totalDuration - item.time - item.value.duration);
                else
                    time = item.time;
                item.value.offsetX = item.value.offsetY = 0;
                item.value.lastOffsetX = item.value.lastOffsetY = 0;
                item.tweener = fairygui.GTween.shake(0, 0, item.value.amplitude, item.value.duration)
                    .setDelay(time)
                    .setTimeScale(this._timeScale)
                    .setTarget(item)
                    .onUpdate(this.onTweenUpdate, this)
                    .onComplete(this.onTweenComplete, this);
                if (this._endTime >= 0)
                    item.tweener.setBreakpoint(this._endTime - item.time);
                this._totalTasks++;
            }
            else {
                if (this._reversed)
                    time = (this._totalDuration - item.time);
                else
                    time = item.time;
                if (time <= this._startTime) {
                    this.applyValue(item);
                    this.callHook(item, false);
                }
                else if (this._endTime == -1 || time <= this._endTime) {
                    this._totalTasks++;
                    item.tweener = fairygui.GTween.delayedCall(time)
                        .setTimeScale(this._timeScale)
                        .setTarget(item)
                        .onComplete(this.onDelayedPlayItem, this);
                }
            }
            if (item.tweener != null)
                item.tweener.seek(this._startTime);
        };
        Transition.prototype.skipAnimations = function () {
            var frame;
            var playStartTime;
            var playTotalTime;
            var value;
            var target;
            var item;
            var cnt = this._items.length;
            for (var i = 0; i < cnt; i++) {
                item = this._items[i];
                if (item.type != fairygui.TransitionActionType.Animation || item.time > this._startTime)
                    continue;
                value = item.value;
                if (value.flag)
                    continue;
                target = item.target;
                frame = target.frame;
                playStartTime = target.playing ? 0 : -1;
                playTotalTime = 0;
                for (var j = i; j < cnt; j++) {
                    item = this._items[j];
                    if (item.type != fairygui.TransitionActionType.Animation || item.target != target || item.time > this._startTime)
                        continue;
                    value = item.value;
                    value.flag = true;
                    if (value.frame != -1) {
                        frame = value.frame;
                        if (value.playing)
                            playStartTime = item.time;
                        else
                            playStartTime = -1;
                        playTotalTime = 0;
                    }
                    else {
                        if (value.playing) {
                            if (playStartTime < 0)
                                playStartTime = item.time;
                        }
                        else {
                            if (playStartTime >= 0)
                                playTotalTime += (item.time - playStartTime);
                            playStartTime = -1;
                        }
                    }
                    this.callHook(item, false);
                }
                if (playStartTime >= 0)
                    playTotalTime += (this._startTime - playStartTime);
                target.playing = playStartTime >= 0;
                target.frame = frame;
                if (playTotalTime > 0)
                    target.advance(playTotalTime * 1000);
            }
        };
        Transition.prototype.onDelayedPlayItem = function (tweener) {
            var item = tweener.target;
            item.tweener = null;
            this._totalTasks--;
            this.applyValue(item);
            this.callHook(item, false);
            this.checkAllComplete();
        };
        Transition.prototype.onTweenStart = function (tweener) {
            var item = tweener.target;
            if (item.type == fairygui.TransitionActionType.XY || item.type == fairygui.TransitionActionType.Size) {
                var startValue;
                var endValue;
                if (this._reversed) {
                    startValue = item.tweenConfig.endValue;
                    endValue = item.tweenConfig.startValue;
                }
                else {
                    startValue = item.tweenConfig.startValue;
                    endValue = item.tweenConfig.endValue;
                }
                if (item.type == fairygui.TransitionActionType.XY) {
                    if (item.target != this._owner) {
                        if (!startValue.b1)
                            startValue.f1 = item.target.x;
                        if (!startValue.b2)
                            startValue.f2 = item.target.y;
                    }
                    else {
                        if (!startValue.b1)
                            startValue.f1 = item.target.x - this._ownerBaseX;
                        if (!startValue.b2)
                            startValue.f2 = item.target.y - this._ownerBaseY;
                    }
                }
                else {
                    if (!startValue.b1)
                        startValue.f1 = item.target.width;
                    if (!startValue.b2)
                        startValue.f2 = item.target.height;
                }
                if (!endValue.b1)
                    endValue.f1 = startValue.f1;
                if (!endValue.b2)
                    endValue.f2 = startValue.f2;
                tweener.startValue.x = startValue.f1;
                tweener.startValue.y = startValue.f2;
                tweener.endValue.x = endValue.f1;
                tweener.endValue.y = endValue.f2;
            }
            this.callHook(item, false);
        };
        Transition.prototype.onTweenUpdate = function (tweener) {
            var item = tweener.target;
            switch (item.type) {
                case fairygui.TransitionActionType.XY:
                case fairygui.TransitionActionType.Size:
                case fairygui.TransitionActionType.Scale:
                case fairygui.TransitionActionType.Skew:
                    item.value.f1 = tweener.value.x;
                    item.value.f2 = tweener.value.y;
                    break;
                case fairygui.TransitionActionType.Alpha:
                case fairygui.TransitionActionType.Rotation:
                    item.value.f1 = tweener.value.x;
                    break;
                case fairygui.TransitionActionType.Color:
                    item.value.f1 = tweener.value.color;
                    break;
                case fairygui.TransitionActionType.ColorFilter:
                    item.value.f1 = tweener.value.x;
                    item.value.f2 = tweener.value.y;
                    item.value.f3 = tweener.value.z;
                    item.value.f4 = tweener.value.w;
                    break;
                case fairygui.TransitionActionType.Shake:
                    item.value.offsetX = tweener.deltaValue.x;
                    item.value.offsetY = tweener.deltaValue.y;
                    break;
            }
            this.applyValue(item);
        };
        Transition.prototype.onTweenComplete = function (tweener) {
            var item = tweener.target;
            item.tweener = null;
            this._totalTasks--;
            if (tweener.allCompleted)
                this.callHook(item, true);
            this.checkAllComplete();
        };
        Transition.prototype.onPlayTransCompleted = function (item) {
            this._totalTasks--;
            this.checkAllComplete();
        };
        Transition.prototype.callHook = function (item, tweenEnd) {
            if (tweenEnd) {
                if (item.tweenConfig != null && item.tweenConfig.endHook != null)
                    item.tweenConfig.endHook.call(item.tweenConfig.endHookCaller);
            }
            else {
                if (item.time >= this._startTime && item.hook != null)
                    item.hook.call(item.hookCaller);
            }
        };
        Transition.prototype.checkAllComplete = function () {
            if (this._playing && this._totalTasks == 0) {
                if (this._totalTimes < 0) {
                    this.internalPlay();
                }
                else {
                    this._totalTimes--;
                    if (this._totalTimes > 0)
                        this.internalPlay();
                    else {
                        this._playing = false;
                        var cnt = this._items.length;
                        for (var i = 0; i < cnt; i++) {
                            var item = this._items[i];
                            if (item.target != null && item.displayLockToken != 0) {
                                item.target.releaseDisplayLock(item.displayLockToken);
                                item.displayLockToken = 0;
                            }
                        }
                        if (this._onComplete != null) {
                            var func = this._onComplete;
                            var param = this._onCompleteParam;
                            var thisObj = this._onCompleteCaller;
                            this._onComplete = null;
                            this._onCompleteParam = null;
                            this._onCompleteCaller = null;
                            func.call(thisObj, param);
                        }
                    }
                }
            }
        };
        Transition.prototype.applyValue = function (item) {
            item.target._gearLocked = true;
            switch (item.type) {
                case fairygui.TransitionActionType.XY:
                    if (item.target == this._owner) {
                        var f1, f2;
                        if (!item.value.b1)
                            f1 = item.target.x;
                        else
                            f1 = item.value.f1 + this._ownerBaseX;
                        if (!item.value.b2)
                            f2 = item.target.y;
                        else
                            f2 = item.value.f2 + this._ownerBaseY;
                        item.target.setXY(f1, f2);
                    }
                    else {
                        if (!item.value.b1)
                            item.value.f1 = item.target.x;
                        if (!item.value.b2)
                            item.value.f2 = item.target.y;
                        item.target.setXY(item.value.f1, item.value.f2);
                    }
                    break;
                case fairygui.TransitionActionType.Size:
                    if (!item.value.b1)
                        item.value.f1 = item.target.width;
                    if (!item.value.b2)
                        item.value.f2 = item.target.height;
                    item.target.setSize(item.value.f1, item.value.f2);
                    break;
                case fairygui.TransitionActionType.Pivot:
                    item.target.setPivot(item.value.f1, item.value.f2, item.target.pivotAsAnchor);
                    break;
                case fairygui.TransitionActionType.Alpha:
                    item.target.alpha = item.value.f1;
                    break;
                case fairygui.TransitionActionType.Rotation:
                    item.target.rotation = item.value.f1;
                    break;
                case fairygui.TransitionActionType.Scale:
                    item.target.setScale(item.value.f1, item.value.f2);
                    break;
                case fairygui.TransitionActionType.Skew:
                    item.target.setSkew(item.value.f1, item.value.f2);
                    break;
                case fairygui.TransitionActionType.Color:
                    (item.target).color = item.value.f1;
                    break;
                case fairygui.TransitionActionType.Animation:
                    if (item.value.frame >= 0)
                        (item.target).frame = item.value.frame;
                    (item.target).playing = item.value.playing;
                    (item.target).timeScale = this._timeScale;
                    break;
                case fairygui.TransitionActionType.Visible:
                    item.target.visible = item.value.visible;
                    break;
                case fairygui.TransitionActionType.Transition:
                    if (this._playing) {
                        var trans = item.value.trans;
                        if (trans != null) {
                            this._totalTasks++;
                            var startTime = this._startTime > item.time ? (this._startTime - item.time) : 0;
                            var endTime = this._endTime >= 0 ? (this._endTime - item.time) : -1;
                            if (item.value.stopTime >= 0 && (endTime < 0 || endTime > item.value.stopTime))
                                endTime = item.value.stopTime;
                            trans.timeScale = this._timeScale;
                            trans._play(this.onPlayTransCompleted, this, item, item.value.playTimes, 0, startTime, endTime, this._reversed);
                        }
                    }
                    break;
                case fairygui.TransitionActionType.Sound:
                    if (this._playing && item.time >= this._startTime) {
                        if (item.value.audioClip == null) {
                            var pi = fairygui.UIPackage.getItemByURL(item.value.sound);
                            if (pi)
                                item.value.audioClip = pi.owner.getItemAsset(pi);
                        }
                        if (item.value.audioClip)
                            fairygui.GRoot.inst.playOneShotSound(item.value.audioClip, item.value.volume);
                    }
                    break;
                case fairygui.TransitionActionType.Shake:
                    item.target.setXY(item.target.x - item.value.lastOffsetX + item.value.offsetX, item.target.y - item.value.lastOffsetY + item.value.offsetY);
                    item.value.lastOffsetX = item.value.offsetX;
                    item.value.lastOffsetY = item.value.offsetY;
                    break;
                case fairygui.TransitionActionType.ColorFilter:
                    {
                        var arr = item.target.filters;
                        var cf;
                        if (!arr || !(arr[0] instanceof egret.ColorMatrixFilter)) {
                            cf = new egret.ColorMatrixFilter();
                            arr = [cf];
                        }
                        else
                            cf = arr[0];
                        var cm = new fairygui.ColorMatrix();
                        cm.adjustBrightness(item.value.f1);
                        cm.adjustContrast(item.value.f2);
                        cm.adjustSaturation(item.value.f3);
                        cm.adjustHue(item.value.f4);
                        cf.matrix = cm.matrix;
                        item.target.filters = arr;
                        break;
                    }
                case fairygui.TransitionActionType.Text:
                    item.target.text = item.value.text;
                    break;
                case fairygui.TransitionActionType.Icon:
                    item.target.icon = item.value.text;
                    break;
            }
            item.target._gearLocked = false;
        };
        Transition.prototype.setup = function (buffer) {
            this.name = buffer.readS();
            this._options = buffer.readInt();
            this._autoPlay = buffer.readBool();
            this._autoPlayTimes = buffer.readInt();
            this._autoPlayDelay = buffer.readFloat();
            var cnt = buffer.readShort();
            for (var i = 0; i < cnt; i++) {
                var dataLen = buffer.readShort();
                var curPos = buffer.position;
                buffer.seek(curPos, 0);
                var item = new fairygui.TransitionItem(buffer.readByte());
                this._items[i] = item;
                item.time = buffer.readFloat();
                var targetId = buffer.readShort();
                if (targetId < 0)
                    item.targetId = "";
                else
                    item.targetId = this._owner.getChildAt(targetId).id;
                item.label = buffer.readS();
                if (buffer.readBool()) {
                    buffer.seek(curPos, 1);
                    item.tweenConfig = new fairygui.TweenConfig();
                    item.tweenConfig.duration = buffer.readFloat();
                    if (item.time + item.tweenConfig.duration > this._totalDuration)
                        this._totalDuration = item.time + item.tweenConfig.duration;
                    item.tweenConfig.easeType = buffer.readByte();
                    item.tweenConfig.repeat = buffer.readInt();
                    item.tweenConfig.yoyo = buffer.readBool();
                    item.tweenConfig.endLabel = buffer.readS();
                    buffer.seek(curPos, 2);
                    this.decodeValue(item, buffer, item.tweenConfig.startValue);
                    buffer.seek(curPos, 3);
                    this.decodeValue(item, buffer, item.tweenConfig.endValue);
                }
                else {
                    if (item.time > this._totalDuration)
                        this._totalDuration = item.time;
                    buffer.seek(curPos, 2);
                    this.decodeValue(item, buffer, item.value);
                }
                buffer.position = curPos + dataLen;
            }
        };
        Transition.prototype.decodeValue = function (item, buffer, value) {
            var arr;
            switch (item.type) {
                case fairygui.TransitionActionType.XY:
                case fairygui.TransitionActionType.Size:
                case fairygui.TransitionActionType.Pivot:
                case fairygui.TransitionActionType.Skew:
                    value.b1 = buffer.readBool();
                    value.b2 = buffer.readBool();
                    value.f1 = buffer.readFloat();
                    value.f2 = buffer.readFloat();
                    break;
                case fairygui.TransitionActionType.Alpha:
                case fairygui.TransitionActionType.Rotation:
                    value.f1 = buffer.readFloat();
                    break;
                case fairygui.TransitionActionType.Scale:
                    value.f1 = buffer.readFloat();
                    value.f2 = buffer.readFloat();
                    break;
                case fairygui.TransitionActionType.Color:
                    value.f1 = buffer.readColor();
                    break;
                case fairygui.TransitionActionType.Animation:
                    value.playing = buffer.readBool();
                    value.frame = buffer.readInt();
                    break;
                case fairygui.TransitionActionType.Visible:
                    value.visible = buffer.readBool();
                    break;
                case fairygui.TransitionActionType.Sound:
                    value.sound = buffer.readS();
                    value.volume = buffer.readFloat();
                    break;
                case fairygui.TransitionActionType.Transition:
                    value.transName = buffer.readS();
                    value.playTimes = buffer.readInt();
                    break;
                case fairygui.TransitionActionType.Shake:
                    value.amplitude = buffer.readFloat();
                    value.duration = buffer.readFloat();
                    break;
                case fairygui.TransitionActionType.ColorFilter:
                    value.f1 = buffer.readFloat();
                    value.f2 = buffer.readFloat();
                    value.f3 = buffer.readFloat();
                    value.f4 = buffer.readFloat();
                    break;
                case fairygui.TransitionActionType.Text:
                case fairygui.TransitionActionType.Icon:
                    value.text = buffer.readS();
                    break;
            }
        };
        Transition.OPTION_IGNORE_DISPLAY_CONTROLLER = 1;
        Transition.OPTION_AUTO_STOP_DISABLED = 2;
        Transition.OPTION_AUTO_STOP_AT_END = 4;
        return Transition;
    }());
    fairygui.Transition = Transition;
    __reflect(Transition.prototype, "fairygui.Transition");
})(fairygui || (fairygui = {}));
