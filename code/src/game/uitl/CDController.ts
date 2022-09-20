/**
 * 冷却控制器（目前只支持Button）
 * @author: lujiahao 
 * @date: 2018-09-20 11:23:26 
 */
class CDController {

    private _defaultStr: string;
    private _cdStr: string;
    private _btn: ICDButton;
    private _defaultCD: number = 0;
    private _curCD: number = 0;
    private _auto: boolean = false;
    private _endFun: Function;
    private _endThisObj: any;
    private _endArgs: any[];

    constructor() {
    }

    //=========================================== API ==========================================
    public get curCD(): number {
        return this._curCD;
    }

    /**
     * 注册
     * @param pDis 显示对象
     * @param pCd 冷却时间（s）
     * @param pCdStr 冷却时候显示的文本，不填的话则使用默认样式，若文本中含有ss，则会替换成剩余秒数，例：重新获取(ss)，则冷却状态下会显示“重新获取(60)”
     * @param pAuto 是否自动设置冷却，默认为true，则点击后会自动进入冷却状态，false的话需要自行调用startCD()方法
     * @param pEndFun 冷却倒计时结束的回调
     * @param pEndThisObj 回调this
     * @param pEndArgs 回调参数
     */
    public register(pDis: ICDButton, pCd: number = 2, pCdStr: string = '', pAuto: boolean = true, pEndFun: Function = null, pEndThisObj: any = null, pEndArgs: any[] = null): void {
        this._btn = pDis;
        this._defaultStr = this._btn.title;
        this._cdStr = pCdStr;
        this._auto = pAuto;
        this._defaultCD = pCd;
        this._endFun = pEndFun;
        this._endThisObj = pEndThisObj;
        this._endArgs = pEndArgs;

        if (pAuto) {
            this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        }
    }

    /**
     * 反注册
     * @param pDis 
     */
    public ungister(pDis: ICDButton) {
        if (this._btn == pDis) {
            this.stopCD(false);
            this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickHandler, this);
        }
    }

    /**
     * 开始进入冷却
     * @param pCd 
     */
    public startCD(pCd: number = 2) {
        if (pCd <= 0)
            return;
        this._defaultCD = pCd;
        this._curCD = pCd;

        this._btn.enabled = false;

        // SimpleTimer.ins().addTimer(this.onTimerCaller, this, 1000, this._defaultCD+1, null, true);
        Timer.instance.listen(this.onTimerCaller, this, 1000, 0, true);
    }

    /**
     * 停止冷却
     * @param pExecuteEndFunc 是否执行结束回调
     */
    public stopCD(pExecuteEndFunc: boolean) {
        if (!this.isRunning)
            return;
        this._curCD = 0;
        this._btn.title = this._defaultStr;
        this._btn.enabled = true

        if (pExecuteEndFunc && this._endFun) {
            this._endFun.apply(this._endThisObj, this._endArgs);
        }

        // SimpleTimer.ins().removeTimer(this.onTimerCaller, this);
        Timer.instance.remove(this.onTimerCaller, this);
    }

    /**
     * 检查冷却是否在进行中
     */
    public get isRunning(): Boolean {
        // return SimpleTimer.ins().isRunning(this.onTimerCaller, this);
        return Timer.instance.has(this.onTimerCaller, this);
    }

    public destry() {
        if (this._btn) {
            this.ungister(this._btn);
        }

        this._defaultStr = null;
        this._btn = null;
        this._defaultCD = null;
        this._curCD = null;
        this._auto = null;
        this._endFun = null;
        this._endThisObj = null;
        this._endArgs = null;
    }

    //===================================== private method =====================================
    //======================================== handler =========================================
    private onTimerCaller() {
        if (this._curCD <= 0) {
            this.stopCD(true);
            return;
        }

        let t_showStr = "";
        if (this._cdStr)
            t_showStr = this._cdStr.replace("ss", this._curCD + "");
        else
            t_showStr = this._defaultStr + "(" + this._curCD + ")";
        this._btn.title = t_showStr;
        // this._btn.title = "" + this._curCD+"秒";
        // this._btn.title = LangUtil.getCommonLanStr("common_second", this._curCD);
        this._curCD--;
    }

    private onBtnClickHandler(e: MouseEvent): void {
        this.startCD(this._defaultCD);
    }
}