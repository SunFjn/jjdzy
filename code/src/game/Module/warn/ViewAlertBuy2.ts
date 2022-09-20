/**
 * @author: lujiahao 
 * @date: 2020-01-09 17:54:18 
 */
class ViewAlertBuy2 extends UIModalPanel {

    public back: fairygui.GImage;
    public lb: fairygui.GRichTextField;
    public btnMin: fairygui.GButton;
    public btnReduce: fairygui.GButton;
    public btnAdd: fairygui.GButton;
    public lbCount: fairygui.GTextField;
    public btnMax: fairygui.GButton;
    public groupUse: fairygui.GGroup;
    public lbTotal: fairygui.GRichTextField;
    public lbCost: fairygui.GRichTextField;
    public itemIcon: fairygui.GLoader;
    public btnCancel: Button0;
    public btnOk: Button1;

    public static URL: string = "ui://jvxpx9emchyo3i9";

    public static createInstance(): ViewAlertBuy2 {
        return <ViewAlertBuy2><any>(fairygui.UIPackage.createObject("common", "ViewAlertBuy2"));
    }

    /**
     * 显示购买提示
     * @param pDefaultValue 默认显示的数量
     * @param pMaxValue 最大数量限制
     * @param pMoneyType 货币类型/物品id
     * @param pOnCountChange 数量改变的回调函数
     * @param pOnOk 确认的回调函数
     * @param pThisObj 回调caller
     */
    static show(
        pDefaultValue: number,
        pMaxValue: number,
        pMoneyType: number,
        pOnCountChange: (pData: ValueVo) => void,
        pOnOk: (pData: ValueVo) => Promise<boolean>,
        pThisObj: any) {

        GGlobal.layerMgr.open(UIConst.ALERT_BUY2,
            {
                defaultValue: pDefaultValue,
                maxValue: pMaxValue,
                moneyType: pMoneyType,
                onCountChange: pOnCountChange,
                onOk: pOnOk,
                thisObj: pThisObj
            });
    }

    private _maxValue = 100;
    private _minValue = 1;

    public speed: number = 1;

    private _alertVo: ValueVo;
    private _onCountChange: (pData: ValueVo) => void;
    private _onOk: (pData: ValueVo) => Promise<boolean>;
    private _thisObj: any;
    private _moneyType: number;

    public constructor() {
        super();
        this.childrenCreated();
    }

    protected childrenCreated(): void {
        this.view = GGlobal.commonpkg.createObject("ViewAlertBuy2").asCom;
        this.contentPane = this.view;
        let t = this;
        CommonManager.parseChildren(t.view, t);

        t.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
        t._alertVo = new ValueVo();
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);
        t.refreshData();

        let t_args: {
            defaultValue: number,
            maxValue: number,
            moneyType: number,
            onCountChange: (pData: ValueVo) => void,
            onOk: (pData: ValueVo) => Promise<boolean>,
            thisObj: any
        } = t._args;

        if (t_args) {
            t._onCountChange = t_args.onCountChange;
            t._onOk = t_args.onOk;
            t._thisObj = t_args.thisObj;
            t._moneyType = t_args.moneyType;
            t.maxValue = t_args.maxValue;
            t.value = t_args.defaultValue;

            t.onValueChange();
        }
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        IconUtil.setImg(t.itemIcon, null);

        t._onCountChange = null;
        t._onOk = null;
        t._thisObj = null;

        t._alertVo.desStr = "";
        t._alertVo.totalPrice = 0;
    }

    public dispose() {
        super.dispose();
    }

    protected _value: number;
    public get value(): number {
        return this._value;
    }
    public set value(value: number) {
        if (value < this._minValue)
            value = this._minValue;
        else if (value > this._maxValue)
            value = this._maxValue;

        if (this._value == value)
            return;

        this._value = value;
        this._alertVo.value = value;

        this.onValueChange();
    }

    public get maxValue(): number {
        return this._maxValue;
    }
    public set maxValue(value: number) {
        if (value < this._minValue)
            return;
        this._maxValue = value;
        this._alertVo.maxValue = value;

        if (this.value > value)
            this.value = value;
    }

    public get minValue(): number {
        return this._minValue;
    }
    public set minValue(value: number) {
        if (value > this._maxValue)
            return;
        this._minValue = value;
        if (this.value < value)
            this.value = value;
    }
    //===================================== private method =====================================
    private refreshData() {
    }

    private onValueChange() {
        let t = this;
        if (t._onCountChange) {
            t._onCountChange.apply(t._thisObj, [t._alertVo]);
        }
        t.lb.text = t._alertVo.desStr;

        let t_cfg = Config.daoju_204[t._moneyType];
        if (t_cfg)
            IconUtil.setImg(t.itemIcon, Enum_Path.ICON70_URL + t_cfg.icon + ".png");
        else
            IconUtil.setImg(t.itemIcon, null);

        let t_color = Color.GREENSTR;
        if (!FastAPI.checkItemEnough(t._moneyType, t._alertVo.totalPrice))
            t_color = Color.REDSTR;
        t.lbCost.text = HtmlUtil.font(t._alertVo.totalPrice + "", t_color);

        t.lbCount.text = t._alertVo.value + "";
    }

    private registerEvent(pFlag: boolean) {
        let t = this;

        EventUtil.register(pFlag, t.btnMin, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnReduce, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnAdd, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnMax, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);

        EventUtil.register(pFlag, t.itemIcon, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);

        EventUtil.register(pFlag, t.btnOk, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCancel, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }
    //======================================== handler =========================================
    private async onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.itemIcon:
                FastAPI.showItemTips(t._moneyType);
                break;
            case t.btnMin:
                t.value -= 10;
                break;
            case t.btnReduce:
                t.value -= t.speed;
                break;
            case t.btnAdd:
                t.value += t.speed;
                break;
            case t.btnMax:
                t.value += 10;
                break;
            case t.btnCancel:
                t.closeView();
                break;
            case t.btnOk:
                if (t._onOk) {
                    let t_result = await t._onOk.apply(t._thisObj, [t._alertVo]);
                    if (t_result === true)
                        t.closeView();
                }
                else {
                    t.closeView();
                }
                break;
        }
    }
}

class ValueVo {
    /** 当前数量（外部无需设置，只读） */
    public value: number = 0;
    /** 最大数量（外部无需设置，只读） */
    public maxValue = 99;

    /** 文本描述，通常用于显示当前值和最大数量（外部设置，自行组装字符串） */
    public desStr: string = "";
    /** 总价（外需需要自行计算） */
    public totalPrice: number = 0;

    constructor() {
    }
}