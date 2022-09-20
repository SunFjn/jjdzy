/**
 * 宝藏拼图面板
 * @author: lujiahao 
 * @date: 2019-11-26 19:53:55 
 */
class ChildBzpt extends fairygui.GComponent implements IPanel {

    //>>>>start
    public bgLoader: fairygui.GLoader;
    public tfDate: fairygui.GRichTextField;
    public boxItem0: BzptBoxItem;
    public boxItem1: BzptBoxItem;
    public boxItem2: BzptBoxItem;
    public boxItem3: BzptBoxItem;
    public boxItem4: BzptBoxItem;
    public boxItem5: BzptBoxItem;
    public boxItem6: BzptBoxItem;
    public cardItem0: BzptCardItem;
    public cardItem1: BzptCardItem;
    public cardItem2: BzptCardItem;
    public cardItem3: BzptCardItem;
    public cardItem4: BzptCardItem;
    public cardItem5: BzptCardItem;
    public cardItem6: BzptCardItem;
    public cardItem7: BzptCardItem;
    public cardItem8: BzptCardItem;
    public tfTips: fairygui.GRichTextField;
    //>>>>end

    public static URL: string = "ui://twm3bfygot2y0";

    /** 设置包名（静态属性） */
    public static pkg = "actBzpt";
    /** 绑定ui的方法（静态方法） */
    public static setExtends() {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        let f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(BzptCardItem.URL, BzptCardItem);
        // f(ViewBzptReward.URL, ViewBzptReward);
        // f(ChildBzpt.URL, ChildBzpt);
        f(BzptBoxItem.URL, BzptBoxItem);
    }

    public static createInstance(): ChildBzpt {
        return <ChildBzpt><any>(fairygui.UIPackage.createObject("actBzpt", "ChildBzpt"));
    }

    private _curActVo: Vo_Activity;
    private _cardItemList: BzptCardItem[] = [];
    private _boxItemList: BzptBoxItem[] = [];

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        for (let i = 0; i < 9; i++) {
            let t_cardItem: BzptCardItem = <any>t.getChild("cardItem" + i);
            t._cardItemList.push(t_cardItem);
        }

        for (let i = 0; i < 7; i++) {
            let t_boxItem: BzptBoxItem = <any>t.getChild("boxItem" + i);
            t._boxItemList.push(t_boxItem);
        }
    }

    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    }

    openPanel(pData?: any) {
        let t = this;
        t.registerEvent(true);

        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_BZPT);

        t.tfDate.text = "";
        t._curActVo = pData;

        if (t._curActVo) {
            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }

        t.refreshData();

        IconUtil.setImg1(Enum_Path.BACK_URL + "bzpt_bg.jpg", t.bgLoader);
    }

    closePanel(pData?: any) {
        let t = this;
        t.registerEvent(false);
        for (let v of t._cardItemList) {
            v.clean();
        }
        for (let v of t._boxItemList) {
            v.clean();
        }
        Timer.instance.remove(t.onDateUpdate, t);
        IconUtil.setImg1(null, t.bgLoader);
    }

    public dispose() {
        let t = this;
        super.dispose();
    }
    //=========================================== API ==========================================
    private refreshData() {
        let t = this;
        t.refreshCardList();
        t.refreshBoxList();
    }

    private refreshCardList() {
        let t = this;
        let t_model = GGlobal.modelBzpt;
        let t_taskVoList = t_model.getTaskVoList();
        for (let i = 0; i < t._cardItemList.length; i++) {
            let t_cardItem = t._cardItemList[i];
            t_cardItem.setData(t_taskVoList[i]);
        }
    }

    private refreshBoxList() {
        let t = this;
        let t_model = GGlobal.modelBzpt;
        let t_boxVoList = t_model.getBoxVoList();
        for (let i = 0; i < t._boxItemList.length; i++) {
            let t_boxItem = t._boxItemList[i];
            t_boxItem.setData(t_boxVoList[i]);
        }
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

    //===================================== private method =====================================
    private getCardItemByPos(pPos: number): BzptCardItem {
        return this._cardItemList[pPos - 1];
    }

    private getBoxItemByPos(pPos: number): BzptBoxItem {
        return this._boxItemList[pPos - 1];
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.BZPT_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.BZPT_CARD_OPEN, t.onCardOpen, t);
        GGlobal.control.register(pFlag, Enum_MsgType.BZPT_BOX_OPEN, t.onBoxOpen, t);
    }

    //======================================== handler =========================================
    private onUpdate() {
        let t = this;
        t.refreshData();
    }

    private onCardOpen(pData: { id: number }) {
        let t = this;
        let t_model = GGlobal.modelBzpt;
        let t_taskVo = t_model.getTaskVoById(pData.id);
        if (t_taskVo) {
            let t_cardItem = t.getCardItemByPos(t_taskVo.pos);
            if (t_cardItem) {
                //翻牌动作
                t_cardItem.playMc(() => {
                    t.refreshBoxList();
                }, t);
            }
        }
    }

    private onBoxOpen(pData: { id: number }) {
        let t = this;
        let t_model = GGlobal.modelBzpt;
        let t_boxVo = t_model.getBoxVoById(pData.id);
        if (t_boxVo) {
            let t_boxItem = t.getBoxItemByPos(t_boxVo.pos);
            if (t_boxItem) {
                t_boxItem.setData(t_boxVo);
            }
        }
    }
}