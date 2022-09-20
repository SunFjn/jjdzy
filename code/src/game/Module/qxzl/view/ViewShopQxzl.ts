/**
 * 群雄逐鹿商店界面
 * @author: lujiahao 
 * @date: 2019-09-30 16:20:30 
 */
class ViewShopQxzl extends UIModalPanel {

    //>>>>start
    public frame: fairygui.GLabel;
    public list: fairygui.GList;
    public banner: fairygui.GLoader;
    public tfDate: fairygui.GRichTextField;
    public resCom: ViewResource;
    //>>>>end

    public static URL: string = "ui://6d8dzzdgrak317";

    public static createInstance(): ViewShopQxzl {
        return <ViewShopQxzl><any>(fairygui.UIPackage.createObject("qxzl", "ViewShopQxzl"));
    }

    private _dataList: VoShopQxzl[];
    private _consumeIdMap = [416002];

    public constructor() {
        super();
        this.loadRes("qxzl", "qxzl_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewShopQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        this.list.itemRenderer = this.onItemRender;
        this.list.callbackThisObj = this;
        this.list.setVirtual();

        this.resCom.setType(1);

        let t_con0 = VoItem.create(this._consumeIdMap[0]);
        this.resCom.setImgUrl(t_con0.icon);
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;

        GGlobal.modelQxzl.CG_QunXiongZhuLu_openBaoKuUI_8957();

        IconUtil.setImg(t.banner, Enum_Path.PIC_URL + "qxzlShopBanner.jpg");

        t.refreshData();
        t.registerEvent(true);

        t.list.scrollToView(0);
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        Timer.instance.remove(t.onDateUpdate, t);
        IconUtil.setImg(t.banner, null);
        t.list.numItems = 0;
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: QxzlShopItem) {
        if (this._dataList) {
            pItem.setData(this._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_dataList = GGlobal.modelQxzl.getShopVoList();
        let t_showList = t_dataList.concat();

        t._dataList = t_showList;

        t.list.numItems = t_showList.length;

        if (!Timer.instance.has(t.onDateUpdate, t))
            Timer.instance.listen(t.onDateUpdate, t);

        t.refreshShopConCount();
    }

    /** 刷新时间 */
    private onDateUpdate() {
        // let t_dateStr = "";
        // if (this._curActVo) {
        //     let t_end = this._curActVo.end; //s
        //     const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s

        //     let t_remainS = t_end - servTime;
        //     if (t_remainS > 0) {
        //         if (t_remainS < 24 * 60 * 60) {
        //             //小于24小时
        //             t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：hh小时uu分ss秒");
        //         }
        //         else {
        //             t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：dd天hh小时");
        //         }
        //     }
        //     else {
        //         t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
        //     }
        // }
        // this.tfDate.text = t_dateStr;
    }

    private refreshShopConCount() {
        let t_count0 = Model_Bag.getItemCount(this._consumeIdMap[0]);
        this.resCom.setCount(t_count0);
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_SHOP_UPDATE, t.onShopUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
    }

    //======================================== handler =========================================
    private onShopUpdate() {
        let t = this;
        t.refreshData();
    }

    private onBagUpdate() {
        let t = this;
        t.refreshData();
    }
}