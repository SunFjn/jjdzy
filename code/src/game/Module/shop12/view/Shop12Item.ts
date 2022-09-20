/**
 * @author: lujiahao 
 * @date: 2019-11-28 17:54:04 
 */
class Shop12Item extends fairygui.GComponent {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public resComSource: ViewResource;
	public resComNow: ViewResource;
	public item: ViewGrid;
	public tfItemName: fairygui.GRichTextField;
	public lineImg: fairygui.GImage;
	public tfLimit: fairygui.GRichTextField;
	public numberCom: NumberCom;
	public disImg: fairygui.GImage;
	public tfDiscount: fairygui.GTextField;
	public groupDiscount: fairygui.GGroup;
	//>>>>end

    public static URL: string = "ui://plzexlaflplo5";

    public static createInstance(): Shop12Item {
        return <Shop12Item><any>(fairygui.UIPackage.createObject("actShop12", "Shop12Item"));
    }

    private _curData: VoShop12;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.resComNow.showBg(false);
        t.resComNow.setType(1);
        t.resComSource.showBg(false);
        t.resComSource.setType(1);
    }

    //=========================================== API ==========================================
    public setData(pData: VoShop12) {
        let t = this;
        t._curData = pData;
        t.registerEvent(false);
        if (pData) {
            let t_model = GGlobal.modelShop12;

            t.stateCtrl.selectedIndex = pData.state;
            t.numberCom.maxValue = pData.remainCount;
            t.numberCom.setValue(~~t_model.shopCartMap[pData.id]);

            let t_item = pData.itemList[0];
            t.item.isShowEff = true;
            t.item.tipEnabled = true;
            t.item.vo = t_item;
            t.tfItemName.text = HtmlUtil.font(t_item.name, t_item.qColor);

            t.tfDiscount.text = ~~(pData.cfg.off) / 10 + "折";

            let t_color = Color.GREENSTR;
            if (pData.remainCount <= 0)
                t_color = Color.REDSTR;
            t.tfLimit.text = HtmlUtil.font(`限购（${pData.remainCount}/${pData.cfg.cs}）`, t_color);

            {
                let t_hasCount = FastAPI.getItemCount(pData.priceSource.id);
                let t_needCount = pData.priceSource.count;
                t.resComSource.setItemId(pData.priceSource.id);
                let t_str = HtmlUtil.font(ConfigHelp.getYiWanText(t_needCount), Color.GREYINT);
                t.resComSource.setCount(t_str);
            }

            {
                let t_hasCount = FastAPI.getItemCount(pData.priceNow.id);
                let t_needCount = pData.priceNow.count;
                let t_str = ConfigHelp.getYiWanText(t_needCount);
                t.resComNow.setItemId(pData.priceNow.id);
                t.resComNow.setCount(t_str);
            }

            t.registerEvent(true);
        }
        else {
            t.item.vo = null;
            t.registerEvent(false);
            t.numberCom.setValue(0); //清空组件的值
        }
    }

    public clean() {
        let t = this;
        t.setData(null);
        super.clean();
    }

    public dispose() {
        let t = this;
        this.clean();
        super.dispose();
    }

    //===================================== private method =====================================
    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.SHOP12_CART_CLEAR, t.onCartClear, t);

        EventUtil.register(pFlag, t.numberCom, egret.Event.CHANGE, t.onValueChange, t);

        EventUtil.register(pFlag, t.numberCom.btnMax, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.numberCom.btnAdd, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onValueChange(e: egret.Event) {
        let t = this;
        let t_model = GGlobal.modelShop12;
        if (t._curData) {
            t_model.addToShopCart(t._curData.id, t.numberCom.value);
        }
    }

    private onCartClear() {
        let t = this;
        if (!t._curData)
            return;
        t.numberCom.setValue(0);
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.numberCom.btnAdd:
            case t.numberCom.btnMax:
                if (t.numberCom.value >= t.numberCom.maxValue) {
                    ViewCommonWarn.text("已达到可购买数量上限");
                }
                break;
        }
    }
}