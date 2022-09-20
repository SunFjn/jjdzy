/**
 * 数量选择组件
 * @author: lujiahao 
 * @date: 2019-11-29 11:05:11 
 */
class NumberCom extends fairygui.GComponent {

    //>>>>start
	public btnMin: fairygui.GButton;
	public btnReduce: fairygui.GButton;
	public btnAdd: fairygui.GButton;
	public tfCount: fairygui.GRichTextField;
	public btnMax: fairygui.GButton;
	//>>>>end

    public static URL: string = "ui://jvxpx9emko8c3gq";

    public static createInstance(): NumberCom {
        return <NumberCom><any>(fairygui.UIPackage.createObject("common", "NumberCom"));
    }

    private _value = 0;
    private _maxValue = Number.MAX_VALUE;
    private _minValue = 0;

    private _speed = 1;
    private _color = 0;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t._color = Color.WHITEINT;
        t.tfCount.color = t._color;
        t.tfCount.text = t._value + "";

        t.registerEvent(true);
    }

    //=========================================== API ==========================================
    public get value(): number {
        return this._value;
    }
    public set value(pValue: number) {
        let t = this;
        if (pValue < t._minValue)
            pValue = t._minValue;
        if (pValue > t._maxValue)
            pValue = t._maxValue;

        if (t._value == pValue)
            return;

        t._value = pValue;
        t.tfCount.text = pValue + "";

        //发送改变事件
        if (t._disEvent)
            t.dispatchEvent(new egret.Event(egret.Event.CHANGE));
    }

    private _disEvent = true;
    /** 强制设置值，不抛出事件 */
    public setValue(value: number) {
        let t = this;
        t._disEvent = false;
        t.value = value;
        t._disEvent = true;
    }

    public get color(): number {
        return this._color;
    }
    public set color(value: number) {
        let t = this;
        t._color = value;
        t.tfCount.color = t._value;
    }

    public get speed() {
        return this._speed;
    }
    public set speed(value) {
        this._speed = value;
    }

    public get maxValue(): number {
        return this._maxValue;
    }
    public set maxValue(value: number) {
        let t = this;
        if (value < t._minValue)
            return;
        t._maxValue = value;
        if (t.value > value)
            t.value = value;
    }

    public get minValue(): number {
        return this._minValue;
    }
    public set minValue(value: number) {
        let t = this;
        if (value > t._maxValue)
            return;
        t._minValue = value;
        if (t.value < value)
            t.value = value;
    }

    public dispose() {
        let t = this;
        SimpleTimer.ins().removeTimer(t.timeToStartFast, t);
        SimpleTimer.ins().removeTimer(t.onTimeCallback, t);
        t.registerEvent(false);

        super.dispose();
    }

    //===================================== private method =====================================
    private timeToStartFast(pType: 0 | 1) {
        SimpleTimer.ins().addTimer(this.onTimeCallback, this, 50, 0, [pType], true);
    }

    private onTimeCallback(pType: 0 | 1) {
        let t = this;
        if (pType == 0) {
            t.value -= t._speed * 4;
            if (t.value <= t.minValue)
                SimpleTimer.ins().removeTimer(t.onTimeCallback, t);
        }
        else {
            t.value += t._speed * 4;
            if (t.value >= t.maxValue)
                SimpleTimer.ins().removeTimer(t.onTimeCallback, t);
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnAdd, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnReduce, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);

        EventUtil.register(pFlag, t.btnAdd, egret.TouchEvent.TOUCH_BEGIN, t.onTouchBegin, t);
        EventUtil.register(pFlag, t.btnAdd, egret.TouchEvent.TOUCH_END, t.onTouchEnd, t);

        EventUtil.register(pFlag, t.btnReduce, egret.TouchEvent.TOUCH_BEGIN, t.onTouchBegin, t);
        EventUtil.register(pFlag, t.btnReduce, egret.TouchEvent.TOUCH_END, t.onTouchEnd, t);

        EventUtil.register(pFlag, t.tfCount, egret.Event.CHANGE, t.onTextChange, t);
        EventUtil.register(pFlag, t.tfCount, egret.FocusEvent.FOCUS_OUT, t.onFocusOut, t);

        EventUtil.register(pFlag, t.btnMin, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnMax, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onFocusOut(e: egret.FocusEvent) {
        this.tfCount.text = this._value + "";
    }

    private onTextChange(e: egret.Event) {
        this.value = ~~this.tfCount.text;
    }

    private onTouchBegin(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case this.btnAdd:
                SimpleTimer.ins().addTimer(this.timeToStartFast, this, 300, 1, [1]);
                break;
            case this.btnReduce:
                SimpleTimer.ins().addTimer(this.timeToStartFast, this, 300, 1, [0]);
                break;
        }
    }

    private onTouchEnd(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btnAdd:
                SimpleTimer.ins().removeTimer(this.timeToStartFast, this);
                SimpleTimer.ins().removeTimer(this.onTimeCallback, this);
                break;
            case this.btnReduce:
                SimpleTimer.ins().removeTimer(this.onTimeCallback, this);
                SimpleTimer.ins().removeTimer(this.timeToStartFast, this);
                break;
        }
    }

    private onBtnClick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btnAdd:
                this.value += this._speed;
                break;
            case this.btnReduce:
                this.value -= this._speed;
                break;

            case this.btnMin:
                this.value -= 10;
                break;
            case this.btnMax:
                this.value += 10;
                break;
        }
    }
}