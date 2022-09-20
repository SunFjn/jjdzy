/**
 * 双12商城购买确认界面
 * @author: lujiahao 
 * @date: 2019-11-29 20:41:24 
 */
class ViewShop12Buy extends UIModalPanel {

    //>>>>start
    public frame: fairygui.GLabel;
    public btnBuy: Button1;
    public resComCoupon: ViewResource;
    public resComDis: ViewResource;
    public resComTotal: ViewResource;
    public resComPrice: ViewResource;
    public lineImg: fairygui.GImage;
    public tfTips: fairygui.GRichTextField;
    public groupTips: fairygui.GGroup;
    //>>>>end

    public static URL: string = "ui://plzexlafoyk16";

    public static createInstance(): ViewShop12Buy {
        return <ViewShop12Buy><any>(fairygui.UIPackage.createObject("actShop12", "ViewShop12Buy"));
    }

    public constructor() {
        super();
        this.loadRes("actShop12", "");
    }

    protected childrenCreated() {
        GGlobal.createPack("actShop12");
        this.view = fairygui.UIPackage.createObject("actShop12", "ViewShop12Buy").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
        t.resComTotal.setType(1);
        t.resComTotal.showBg(false);
        t.resComDis.setType(1);
        t.resComDis.showBg(false);
        t.resComCoupon.setType(1);
        t.resComCoupon.showBg(false);
        t.resComPrice.setType(1);
        t.resComPrice.showBg(false);

        t.tfTips.wordWrap = true;
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);
        t.refreshData();
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
    }

    //===================================== private method =====================================
    private _resultValue = 0;
    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelShop12;
        let t_map = t_model.shopCartMap;
        let t_total = 0;
        for (let k in t_map) {
            let t_id = ~~k;
            let t_value = ~~t_map[k];
            let t_vo = t_model.getShopVoById(t_id);
            if (t_vo) {
                t_total += t_vo.priceNow.count * t_value;
            }
        }

        let t_targetDis: Is12yh_771;
        let t_nextDis: Is12yh_771; //下个优惠
        let t_disCfgList = t_model.getDiscountCfgList();
        for (let i = t_disCfgList.length - 1; i >= 0; i--) {
            let t_dis = t_disCfgList[i];
            if (t_total >= t_dis.ed) {
                t_targetDis = t_dis;
                break;
            }
            t_nextDis = t_dis;
        }

        if (t_nextDis) {
            t.groupTips.visible = true;
            let t_diff = t_nextDis.ed - t_total;
            t.tfTips.text = `还差<font color='#ffff00'>${ConfigHelp.getYiWanText(t_diff)}元宝</font>可优惠减免<font color='#ffff00'>${ConfigHelp.getYiWanText(t_nextDis.jm)}元宝</font>`;
        }
        else {
            t.groupTips.visible = false;
        }

        let t_disValue = t_targetDis ? ~~t_targetDis.jm : 0;
        let t_couponValue = FastAPI.getItemCount(EnumShop12.COUPON_ID);
        if (t_couponValue > t_total - t_disValue) {
            t_couponValue = t_total - t_disValue;
        }
        let t_result = t_total - t_disValue - t_couponValue;

        let t_hasYuanbao = FastAPI.getItemCount(Enum_Attr.yuanBao);

        let t_color = Color.GREENSTR;
        if (t_hasYuanbao < t_result)
            t_color = Color.REDSTR;

        if (t_disValue || t_couponValue)
            t.lineImg.visible = true;
        else
            t.lineImg.visible = false;

        t._resultValue = t_result;

        t.resComTotal.setItemId(Enum_Attr.yuanBao);
        t.resComDis.setItemId(Enum_Attr.yuanBao);
        t.resComCoupon.setItemId(EnumShop12.COUPON_ID);
        t.resComPrice.setItemId(Enum_Attr.yuanBao);

        t.resComTotal.setCount(HtmlUtil.font(t_total + "", Color.GREYINT));
        t.resComDis.setCount(t_disValue);
        t.resComCoupon.setCount(t_couponValue);
        t.resComPrice.setCount(HtmlUtil.font(t_result + "", t_color));
    }

    private registerEvent(pFlag: boolean): void {
        let t = this;
        EventUtil.register(pFlag, t.btnBuy, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }
    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelShop12;
        switch (e.currentTarget) {
            case t.btnBuy:
                if (FastAPI.checkItemEnough(Enum_Attr.yuanBao, t._resultValue, true))
                    t_model.CG_DoubleTwelveShop_buyItems_10701();
                t.closeView();
                break;
        }
    }
}