/**
 * timer的封装，更易用
 * @author: lujiahao 
 * @date: 2018-04-14 17:04:16 
 */
class SimpleTimer
{
    private static _instance:SimpleTimer;
    public static ins():SimpleTimer
    {
        if(!this._instance)
            this._instance = new SimpleTimer();
        return this._instance;
    }

    private _timerVoMap:{[key:string]:TimerVo} = {};
    // private _timerVoList:TimerVo[] = [];
    /** TimerVo计数 */
    private _mapCount:number = 0;
    
    /** 同一帧下限制最多回调次数 */
    private MAX_CALL_COUNT:number = 500;

    public constructor() {
    }

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
    public addTimer(pFunc:Function, pThisObj:any, pInterval:number, pRepeat:number = 0, pArgs:any[] = null, pImmediately:boolean = false):string
    {
        if(this._mapCount < 1)
        {
            // egret.startTick(this.onTickCallback, this);
            // Stager.addRender(this, this.onTickCallback, false);
            EventUtil.register(true, App.stage, egret.Event.ENTER_FRAME, this.onTickCallback, this)
        }
        let t_vo = this.getTimerVo(pFunc, pThisObj);
        if(!t_vo)
        {
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


        if(t_vo.immediately)
        {
            this.excuteImmediately(t_vo);
        }

        return t_vo.key;
    }

    /**
     * 移除计时器（建议用这个来做移除处理，因为这个接口不需要记录key）
     * @param  {Function} pFunc 回调函数
     * @param  {any} pThisObj 回调函数调用者
     */
    public removeTimer(pFunc:Function, pThisObj:any):string
    {
        let t_vo = this.getTimerVo(pFunc, pThisObj);
        if(!t_vo)
            return null;
        return this.removeTimerByKey(t_vo.key);
    }

    /**
     * 通过key移除计时器（不太建议用这个来做移除计时器，因为外部需要缓存计时器的key）
     * @param  {string} pKey
     */
    public removeTimerByKey(pKey:string):string
    {
        let t_vo = this.getTimerVoByKey(pKey);
        if(t_vo)
        {
            delete this._timerVoMap[pKey];
            t_vo.destroy();

            this._mapCount--;
            if(this._mapCount < 0)
                this._mapCount = 0;

            if(this._mapCount < 1)
            {
                EventUtil.register(false, App.stage, egret.Event.ENTER_FRAME, this.onTickCallback, this);
                // Stager.removeRender(this, this.onTickCallback);
                // egret.stopTick(this.onTickCallback, this);
            }
        }
        return pKey;
    }

    /**
     * 检查计时器是否运行中
     * @param  {Function} pFunc
     * @param  {any} pThisObj
     * @returns boolean
     */
    public isRunning(pFunc:Function, pThisObj:any):boolean
    {
        let t_vo = this.getTimerVo(pFunc, pThisObj);
        if(!t_vo)
            return false;
        else
            return true;
    }

    /**
     * 通过key检查计时器是否运行中
     * @param  {string} pKey
     * @returns boolean
     */
    public isRunningByKey(pKey:string):boolean
    {
        let t_vo = this.getTimerVoByKey(pKey);
        if(t_vo)
            return true;
        else
            return false;
    }

    /**
     * 获取计时器计数
     * @param  {Function} pFunc
     * @param  {any} pThisObj
     * @returns number
     */
    public getCurCount(pFunc:Function, pThisObj:any):number
    {
        let t_vo = this.getTimerVo(pFunc, pThisObj);
        if(t_vo)
            return t_vo.curCount;
        else
            return 0;
    }

    public clearAll()
    {
        let t_keyList = Object.keys(this._timerVoMap);
        for(let key of t_keyList)
        {
            this.removeTimerByKey(key);
        }
    }

    //===================================== private method =====================================
    private getTimerVo(pFunc:Function, pThisObj:any):TimerVo
    {
        let t_key = ObjectUtils.getObjectUniqueId(pFunc) + "_" + ObjectUtils.getObjectUniqueId(pThisObj);
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
    }

    private getTimerVoByKey(pKey:string):TimerVo
    {
        return this._timerVoMap[pKey];
    }

    private _lastTs:number = 0;
    private onTickCallback():boolean
    {
        let pTs = egret.getTimer();
        if(pTs-this._lastTs > 50)
        {
            let t_keyList = Object.keys(this._timerVoMap);
            for(let key of t_keyList)
            {
                if(this._timerVoMap[key])
                    this.excuteFunc(pTs, this._timerVoMap[key]);
            }
            this._lastTs = pTs;
        }
        return false;
    }

    /**
     * 立即进行回调
     */
    private excuteImmediately(pVo:TimerVo):void
    {
        pVo.curCount++;
        pVo.lastTime = egret.getTimer();
        
        pVo.func.apply(pVo.thisObj, pVo.args);
        
        //由于在回调的时候可能会主动调用removeCaller接口删除数据，所以下面的自动移除需要检查是否存在
        var t_tempVo:TimerVo = this.getTimerVoByKey(pVo.key);
        if(!t_tempVo)
            return;
        //检查是否达到指定次数，达到指定次数则自动移除
        if(pVo.repeat >0 && pVo.curCount >= pVo.repeat)
            this.removeTimerByKey(pVo.key);
    }

    private excuteFunc(pTs:number, pVo:TimerVo)
    {
        let t_key = pVo.key;
        let t_now = pTs;
        if(pVo.interval <= 0) //每帧做处理
        {
            pVo.curCount++;
            pVo.func.apply(pVo.thisObj, pVo.args);
        }
        else
        {
            let t_intervalCount:number = Math.floor((t_now-pVo.lastTime)/pVo.interval); //过去了的次数，向下取整
            if(t_intervalCount <= 0)
                return;
            if(pVo.repeat > 0) //非无限循环的特殊处理
                t_intervalCount = (pVo.curCount+t_intervalCount > pVo.repeat) ? (pVo.repeat-pVo.curCount) : t_intervalCount;

            t_intervalCount = Math.min(t_intervalCount, this.MAX_CALL_COUNT); //同一时间不能补帧超过N次回调（防止恢复后因为补帧过多导致卡死）

            let t_newLastTime:number = pVo.lastTime + pVo.interval*t_intervalCount;

            pVo.lastTime = t_newLastTime;
            for(let i = 0; i<t_intervalCount; i++)
            {
                pVo.curCount++;
                pVo.func.apply(pVo.thisObj, pVo.args);
                //由于在回调的时候可能会主动调用removeCaller接口删除数据，所以下面的自动移除需要检查是否存在
                let t_tempVo = this._timerVoMap[t_key];
                if(!t_tempVo)
                    return;
            }
        }

        //检查是否达到指定次数，达到指定次数则自动移除
        if(pVo.repeat > 0 && pVo.curCount >= pVo.repeat)
        {
            this.removeTimerByKey(pVo.key);
        }
    }
    //======================================== handler =========================================
}

class TimerVo
{
    /** 主键 */
    public key:string;
    /** 回调函数 */
    public func:Function;
    public thisObj:any;
    /** 回调参数列表 */
    public args:any[];
    /** 时间间隔 */
    public interval:number;
    /** 指定回调次数 */
    public repeat:number = 0;
    /** 是否立马执行标识 */
    public immediately:boolean = false;


    /** 记录已经回调的次数 */
    public curCount:number = 0;
    /** 记录上一次回调的时间 */
    public lastTime:number = 0;

    public constructor() {
    }

    public destroy()
    {
        if(this.args)
        {
            this.args.length = 0;
            this.args = null;
        }
        this.func = null;
        this.thisObj = null;
    }
}
