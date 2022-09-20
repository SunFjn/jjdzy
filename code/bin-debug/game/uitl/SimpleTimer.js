var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * timer的封装，更易用
 * @author: lujiahao
 * @date: 2018-04-14 17:04:16
 */
var SimpleTimer = (function () {
    function SimpleTimer() {
        this._timerVoMap = {};
        // private _timerVoList:TimerVo[] = [];
        /** TimerVo计数 */
        this._mapCount = 0;
        /** 同一帧下限制最多回调次数 */
        this.MAX_CALL_COUNT = 500;
        this._lastTs = 0;
    }
    SimpleTimer.ins = function () {
        if (!this._instance)
            this._instance = new SimpleTimer();
        return this._instance;
    };
    //=========================================== API ==========================================
    /**
     * 添加计时器（注意：这是逻辑计时器，在浏览器降帧/暂停时候会停止，一旦恢复就会进行补帧逻辑处理，所以不建议用在界面的渲染上，尽量用在一些计时的逻辑上）
     * @param pFunc 回调函数
     * @param pThisObj 回调函数拥有者
     * @param pInterval 回调时间间隔（0表示每帧都回调）
     * @param pRepeat 重复次数（0表示无限次数回调，需要手动停止，如果设置了repeat次数，则在计时器运行指定次数结束后，相关计时器会自动销毁）
     * @param pArgs 回调参数列表，同时也决定回调函数的参数个数
     * @param pImmediately 默认为false false：下一帧帧渲染的时候才进行回调；true：立马进行回调，无需等到下一帧渲染
     */
    SimpleTimer.prototype.addTimer = function (pFunc, pThisObj, pInterval, pRepeat, pArgs, pImmediately) {
        if (pRepeat === void 0) { pRepeat = 0; }
        if (pArgs === void 0) { pArgs = null; }
        if (pImmediately === void 0) { pImmediately = false; }
        if (this._mapCount < 1) {
            // egret.startTick(this.onTickCallback, this);
            // Stager.addRender(this, this.onTickCallback, false);
            EventUtil.register(true, App.stage, egret.Event.ENTER_FRAME, this.onTickCallback, this);
        }
        var t_vo = this.getTimerVo(pFunc, pThisObj);
        if (!t_vo) {
            t_vo = new TimerVo();
            // t_vo.key = ObjectUtils.getUnicode()+"";
            t_vo.key = ObjectUtils.getObjectUniqueId(pFunc) + "_" + ObjectUtils.getObjectUniqueId(pThisObj);
            // this._timerVoList.push(t_vo);
            this._timerVoMap[t_vo.key] = t_vo;
            this._mapCount++;
        }
        //重置一般参数
        t_vo.func = pFunc;
        t_vo.thisObj = pThisObj;
        t_vo.interval = pInterval;
        t_vo.repeat = pRepeat;
        t_vo.args = pArgs;
        t_vo.immediately = pImmediately;
        //重置两个重要的计量
        t_vo.lastTime = egret.getTimer();
        t_vo.curCount = 0;
        if (t_vo.immediately) {
            this.excuteImmediately(t_vo);
        }
        return t_vo.key;
    };
    /**
     * 移除计时器（建议用这个来做移除处理，因为这个接口不需要记录key）
     * @param  {Function} pFunc 回调函数
     * @param  {any} pThisObj 回调函数调用者
     */
    SimpleTimer.prototype.removeTimer = function (pFunc, pThisObj) {
        var t_vo = this.getTimerVo(pFunc, pThisObj);
        if (!t_vo)
            return null;
        return this.removeTimerByKey(t_vo.key);
    };
    /**
     * 通过key移除计时器（不太建议用这个来做移除计时器，因为外部需要缓存计时器的key）
     * @param  {string} pKey
     */
    SimpleTimer.prototype.removeTimerByKey = function (pKey) {
        var t_vo = this.getTimerVoByKey(pKey);
        if (t_vo) {
            delete this._timerVoMap[pKey];
            t_vo.destroy();
            this._mapCount--;
            if (this._mapCount < 0)
                this._mapCount = 0;
            if (this._mapCount < 1) {
                EventUtil.register(false, App.stage, egret.Event.ENTER_FRAME, this.onTickCallback, this);
                // Stager.removeRender(this, this.onTickCallback);
                // egret.stopTick(this.onTickCallback, this);
            }
        }
        return pKey;
    };
    /**
     * 检查计时器是否运行中
     * @param  {Function} pFunc
     * @param  {any} pThisObj
     * @returns boolean
     */
    SimpleTimer.prototype.isRunning = function (pFunc, pThisObj) {
        var t_vo = this.getTimerVo(pFunc, pThisObj);
        if (!t_vo)
            return false;
        else
            return true;
    };
    /**
     * 通过key检查计时器是否运行中
     * @param  {string} pKey
     * @returns boolean
     */
    SimpleTimer.prototype.isRunningByKey = function (pKey) {
        var t_vo = this.getTimerVoByKey(pKey);
        if (t_vo)
            return true;
        else
            return false;
    };
    /**
     * 获取计时器计数
     * @param  {Function} pFunc
     * @param  {any} pThisObj
     * @returns number
     */
    SimpleTimer.prototype.getCurCount = function (pFunc, pThisObj) {
        var t_vo = this.getTimerVo(pFunc, pThisObj);
        if (t_vo)
            return t_vo.curCount;
        else
            return 0;
    };
    SimpleTimer.prototype.clearAll = function () {
        var t_keyList = Object.keys(this._timerVoMap);
        for (var _i = 0, t_keyList_1 = t_keyList; _i < t_keyList_1.length; _i++) {
            var key = t_keyList_1[_i];
            this.removeTimerByKey(key);
        }
    };
    //===================================== private method =====================================
    SimpleTimer.prototype.getTimerVo = function (pFunc, pThisObj) {
        var t_key = ObjectUtils.getObjectUniqueId(pFunc) + "_" + ObjectUtils.getObjectUniqueId(pThisObj);
        return this._timerVoMap[t_key];
        // for(let i = this._timerVoList.length-1; i>=0; i--)
        // {
        //     let t_vo = this._timerVoList[i];
        //     if(t_vo && t_vo.func == pFunc && t_vo.thisObj == pThisObj)
        //     {
        //         let t_uniqueIdFunc = ObjectUtils.getObjectUniqueId(pFunc);
        //         let t_uniqueIdThis = ObjectUtils.getObjectUniqueId(pThisObj);
        //         let t_ownId = t_uniqueIdFunc+"_"+t_uniqueIdThis;
        //         if(t_ownId == t_vo.ownId)
        //             LogMgr.log("fuck");
        //         else
        //             LogMgr.log("you");
        //         return t_vo;
        //     }
        // }
        // return null;
    };
    SimpleTimer.prototype.getTimerVoByKey = function (pKey) {
        return this._timerVoMap[pKey];
    };
    SimpleTimer.prototype.onTickCallback = function () {
        var pTs = egret.getTimer();
        if (pTs - this._lastTs > 50) {
            var t_keyList = Object.keys(this._timerVoMap);
            for (var _i = 0, t_keyList_2 = t_keyList; _i < t_keyList_2.length; _i++) {
                var key = t_keyList_2[_i];
                if (this._timerVoMap[key])
                    this.excuteFunc(pTs, this._timerVoMap[key]);
            }
            this._lastTs = pTs;
        }
        return false;
    };
    /**
     * 立即进行回调
     */
    SimpleTimer.prototype.excuteImmediately = function (pVo) {
        pVo.curCount++;
        pVo.lastTime = egret.getTimer();
        pVo.func.apply(pVo.thisObj, pVo.args);
        //由于在回调的时候可能会主动调用removeCaller接口删除数据，所以下面的自动移除需要检查是否存在
        var t_tempVo = this.getTimerVoByKey(pVo.key);
        if (!t_tempVo)
            return;
        //检查是否达到指定次数，达到指定次数则自动移除
        if (pVo.repeat > 0 && pVo.curCount >= pVo.repeat)
            this.removeTimerByKey(pVo.key);
    };
    SimpleTimer.prototype.excuteFunc = function (pTs, pVo) {
        var t_key = pVo.key;
        var t_now = pTs;
        if (pVo.interval <= 0) {
            pVo.curCount++;
            pVo.func.apply(pVo.thisObj, pVo.args);
        }
        else {
            var t_intervalCount = Math.floor((t_now - pVo.lastTime) / pVo.interval); //过去了的次数，向下取整
            if (t_intervalCount <= 0)
                return;
            if (pVo.repeat > 0)
                t_intervalCount = (pVo.curCount + t_intervalCount > pVo.repeat) ? (pVo.repeat - pVo.curCount) : t_intervalCount;
            t_intervalCount = Math.min(t_intervalCount, this.MAX_CALL_COUNT); //同一时间不能补帧超过N次回调（防止恢复后因为补帧过多导致卡死）
            var t_newLastTime = pVo.lastTime + pVo.interval * t_intervalCount;
            pVo.lastTime = t_newLastTime;
            for (var i = 0; i < t_intervalCount; i++) {
                pVo.curCount++;
                pVo.func.apply(pVo.thisObj, pVo.args);
                //由于在回调的时候可能会主动调用removeCaller接口删除数据，所以下面的自动移除需要检查是否存在
                var t_tempVo = this._timerVoMap[t_key];
                if (!t_tempVo)
                    return;
            }
        }
        //检查是否达到指定次数，达到指定次数则自动移除
        if (pVo.repeat > 0 && pVo.curCount >= pVo.repeat) {
            this.removeTimerByKey(pVo.key);
        }
    };
    return SimpleTimer;
}());
__reflect(SimpleTimer.prototype, "SimpleTimer");
var TimerVo = (function () {
    function TimerVo() {
        /** 指定回调次数 */
        this.repeat = 0;
        /** 是否立马执行标识 */
        this.immediately = false;
        /** 记录已经回调的次数 */
        this.curCount = 0;
        /** 记录上一次回调的时间 */
        this.lastTime = 0;
    }
    TimerVo.prototype.destroy = function () {
        if (this.args) {
            this.args.length = 0;
            this.args = null;
        }
        this.func = null;
        this.thisObj = null;
    };
    return TimerVo;
}());
__reflect(TimerVo.prototype, "TimerVo");
