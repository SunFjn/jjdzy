/**
 * 双12商城面板
 * @author: lujiahao 
 * @date: 2019-11-28 17:59:27 
 */
class ChildShop12 extends fairygui.GComponent implements IPanel {

    //>>>>start
	public banner: fairygui.GLoader;
	public resCom0: ViewResource;
	public tfDate: fairygui.GRichTextField;
	public btnMore: fairygui.GButton;
	public list: fairygui.GList;
	public btnBuy: Button1;
	public resComTotal: ViewResource;
	public btnClear: fairygui.GButton;
	//>>>>end

    public static URL: string = "ui://plzexlaflplo0";

    /** 设置包名（静态属性） */
    public static pkg = "actShop12";
    /** 绑定ui的方法（静态方法） */
    public static setExtends() {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        let f = fairygui.UIObjectFactory.setPackageItemExtension;
        // f(ChildShop12.URL, ChildShop12);
        f(Shop12Item.URL, Shop12Item);
    }

    public static createInstance(): ChildShop12 {
        return <ChildShop12><any>(fairygui.UIPackage.createObject("actShop12", "ChildShop12"));
    }

    private _curActVo: Vo_Activity;
    private _dataList: VoShop12[] = [];

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
        t.list.scrollItemToViewOnClick = false;

        t.resCom0.setType(1);
        t.resComTotal.showBg(false);
        t.resComTotal.setType(1);

    }

    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    }

    openPanel(pData?: any) {
        let t = this;
        t.registerEvent(true);

        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SHOP12);

        t.tfDate.text = "";
        t._curActVo = pData;

        if (t._curActVo) {
            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }

        t.refreshData();
        t.list.scrollToView(0);

        t.refreshTotalPrice();
        t.refreshCoupon();

        IconUtil.setImg1(Enum_Path.BACK_URL + "shop12_bg.jpg", t.banner);
    }

    closePanel(pData?: any) {
        let t = this;
        let t_model = GGlobal.modelShop12;
        t.registerEvent(false);
        t.list.numItems = 0;
        t_model.clearShopCart(); //清空购物车
        Timer.instance.remove(t.onDateUpdate, t);
        IconUtil.setImg1(null, t.banner);
    }

    public dispose() {
        let t = this;
        super.dispose();
    }
    //=========================================== API ==========================================
    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: Shop12Item) {
        let t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelShop12;
        let t_list = t_model.getShopVoList().concat();
        t._dataList = t_list;
        t.list.numItems = t_list.length;
    }

    private refreshTotalPrice() {
        let t = this;
        let t_model = GGlobal.modelShop12;
        let t_cartMap = t_model.shopCartMap;
        let t_total = 0;
        for (let k in t_cartMap) {
            let t_id = ~~k;
            let t_count = t_cartMap[k];
            let t_vo = t_model.getShopVoById(t_id);
            t_total += t_vo.priceNow.count * t_count;
        }
        t.resComTotal.setItemId(Enum_Attr.yuanBao);
        let t_hasCount = FastAPI.getItemCount(Enum_Attr.yuanBao);
        let t_color = Color.GREENSTR;
        if (t_hasCount < t_total)
            t_color = Color.REDSTR;
        t_color = Color.WHITESTR;
        t.resComTotal.setCount(HtmlUtil.font(t_total + "", t_color));
    }

    private refreshCoupon() {
        let t = this;
        let t_id = EnumShop12.COUPON_ID
        t.resCom0.setItemId(t_id);
        let t_hasCount = FastAPI.getItemCount(t_id);
        t.resCom0.setCount(t_hasCount);
    }

    /** 刷新时间 */
    private onDateUpdate() {
        let t_dateStr = "";
        if (this._curActVo) {
            let t_end = this._curActVo.end; //s
            const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s

            let t_remainS = t_end - servTime;
            if (t_remainS > 0) {
                if (t_remainS < 24 * 60 * 60) {
                    //小于24小时
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：hh小时uu分ss秒");
                }
                else {
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：dd天hh小时");
                }
            }
            else {
                t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
            }
        }
        this.tfDate.text = t_dateStr;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.SHOP12_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.SHOP12_CART_CHANGE, t.onCartChange, t);
        GGlobal.control.register(pFlag, Enum_MsgType.SHOP12_CART_CLEAR, t.onCartClear, t);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);

        EventUtil.register(pFlag, t.btnBuy, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnClear, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnMore, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onUpdate() {
        let t = this;
        t.refreshData();
    }

    private onCartChange() {
        let t = this;
        t.refreshTotalPrice();
    }

    private onCartClear() {
        let t = this;
        t.refreshTotalPrice();
    }

    private onBagUpdate() {
        let t = this;
        t.refreshCoupon();
        t.refreshTotalPrice();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelShop12;
        switch (e.currentTarget) {
            case t.btnBuy:
                let t_cartList = t_model.getShopCartList();
                if (t_cartList.length > 0) {
                    GGlobal.layerMgr.open(UIConst.ACTCOM_SHOP12_BUY);
                }
                else {
                    ViewCommonWarn.text("请先选择商品");
                }
                break;

            case t.btnClear: //清空购物车
                t_model.clearShopCart();
                break;

            case t.btnMore:
                let t_qs = t_model.getCurQs();
                let t_ruleCfg = Config.s12gz_771[t_qs];
                if (t_ruleCfg) {
                    GGlobal.layerMgr.open(UIConst.WFSM_PANEL, { title: "优惠规则", content: t_ruleCfg.sm });
                }
                break;
        }
    }
}