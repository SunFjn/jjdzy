/**
 * 限定武将界面
 * @author: lujiahao 
 * @date: 2019-09-12 11:11:00 
 */
class ChildXianding extends fairygui.GComponent implements IPanel {

    //>>>>start
    public tabCtrl: fairygui.Controller;
    public imageBanner: fairygui.GLoader;
    public tab0: TabButton1;
    public tab1: TabButton1;
    public tab2: TabButton1;
    public tab3: TabButton1;
    public list: fairygui.GList;
    public pb: fairygui.GProgressBar;
    public tfDate: fairygui.GRichTextField;
    public rewardItemTemp: XiandingRewardItem;
    //>>>>end

    public static URL: string = "ui://s98a5pruoz6c0";

    /** 设置包名（静态属性） */
    public static pkg = "actComXianding";
    /** 绑定ui的方法（静态方法） */
    public static setExtends() {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        let f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(XiandingRewardItem.URL, XiandingRewardItem);
        f(XiandingItem.URL, XiandingItem);
    }

    private _curActVo: Vo_Activity;
    private _boxItemPool: XiandingRewardItem[] = [];
    private _boxItemList: XiandingRewardItem[] = [];
    private _showTaskList: VoXiandingTask[] = [];

    public static createInstance(): ChildXianding {
        return <ChildXianding><any>(fairygui.UIPackage.createObject("actComXianding", "ChildXianding"));
    }

    public constructor() {
        super();
    }

    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    }

    openPanel(pData?: any) {
        this.registerEvent(true);

        this._curActVo = pData;

        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_XIANDING);

        let t_seletedIndex = 0;
        this.tabCtrl.selectedIndex = -1;
        this.tabCtrl.selectedIndex = t_seletedIndex;

        IconUtil.setImg1(Enum_Path.PIC_URL + "xiandingBanner.jpg", this.imageBanner);
    }

    closePanel(pData?: any) {
        this.registerEvent(false);
        Timer.instance.remove(this.onDateUpdate, this);
        IconUtil.setImg1(null, this.imageBanner);
        this.list.numItems = 0;
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.list.itemRenderer = t.onTaskItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    }

    //=========================================== API ==========================================
    //===================================== private method =====================================
    private onTaskItemRender(pIndex: number, pItem: XiandingItem) {
        pItem.setData(this._showTaskList[pIndex]);
    }

    private refreshData(pGroupType: number) {
        let t_taskVoList = GGlobal.modelXianding.getTaskVoListByGroupType(pGroupType).concat();
        let t_showList = [];
        this._showTaskList.length = 0;
        for (let v of t_taskVoList) {
            if (v.isOpen) {
                t_showList.push(v);
            }
        }
        t_showList.sort(this.onSort);
        this._showTaskList = t_showList;
        this.list.numItems = t_showList.length;
        this.pb.max = GGlobal.modelXianding.maxScore;
        this.pb.value = GGlobal.modelXianding.curScore;
        this.refreshBoxItemList();

        if (!Timer.instance.has(this.onDateUpdate, this))
            Timer.instance.listen(this.onDateUpdate, this);
    }

    private reddotCheck() {
        for (let i = 0; i < this.tabCtrl.pageCount; i++) {
            let t_groupType = this.getGroupTypeByTabIndex(i);
            let t_value = GGlobal.reddot.checkCondition(UIConst.ACTCOM_XIANDING, t_groupType);
            let t_btnTab: TabButton1 = this["tab" + i];
            if (t_btnTab) {
                t_btnTab.noticeImg.visible = t_value;
            }
        }
    }

    /** 刷新宝箱列表 */
    private refreshBoxItemList() {
        if (this._curActVo) {
            this.clearAllBoxItemList();
            let t_boxVoList = GGlobal.modelXianding.getRewardVoListByQs(this._curActVo.qs);
            let t_lastRight = 0;
            let t_half = this.rewardItemTemp.width / 2;
            for (let v of t_boxVoList) {
                let t_boxItem = this.getBoxItemFromPool();
                t_boxItem.setData(v);
                this.addChild(t_boxItem);
                let t_maxValue = GGlobal.modelXianding.maxScore;
                t_boxItem.y = this.rewardItemTemp.y;
                t_boxItem.x = this.pb.x + (v.cfg.hy / t_maxValue) * this.pb.width - t_half;
                if (t_boxItem.x - t_half < t_lastRight) {
                    t_boxItem.x = t_lastRight + t_half + 3;
                }
                t_lastRight = t_boxItem.x + t_half;
                this._boxItemList.push(t_boxItem);
            }
        }
        else {
            this.clearAllBoxItemList();
        }
    }

    private clearAllBoxItemList() {
        for (let i = this._boxItemList.length - 1; i >= 0; i--) {
            this.recycleBoxItem(this._boxItemList[i]);
            this._boxItemList.splice(i, 1);
        }
    }

    private onSort(pA: VoXiandingTask, pB: VoXiandingTask): number {
        if (pA.sortValue > pB.sortValue)
            return -1;
        else if (pA.sortValue < pB.sortValue)
            return 1;
        else {
            return pA.id - pB.id;
        }
    }

    private getBoxItemFromPool(): XiandingRewardItem {
        let t_vo = this._boxItemPool.pop();
        if (!t_vo) {
            t_vo = XiandingRewardItem.createInstance() as XiandingRewardItem;
        }
        return t_vo;
    }

    private recycleBoxItem(pItem: XiandingRewardItem) {
        if (!pItem)
            return;
        pItem.recycle();
        pItem.removeFromParent();
        this._boxItemPool.push(pItem);
    }

    private getGroupTypeByTabIndex(pTabIndex: number): number {
        return pTabIndex + 1;
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

    private registerEvent(pFlag: boolean): void {
        GGlobal.control.register(pFlag, Enum_MsgType.XIANDING_UPDATE, this.onUpdate, this);
        GGlobal.control.register(pFlag, Enum_MsgType.XIANDING_REWARD_UPDATE, this.onRewardUpdate, this);

        EventUtil.register(pFlag, this.tabCtrl, fairygui.StateChangeEvent.CHANGED, this.onTabChange, this);
    }
    //======================================== handler =========================================
    private onTabChange(e: fairygui.StateChangeEvent) {
        let t_groupType = this.getGroupTypeByTabIndex(e.currentTarget.selectedIndex);
        this.refreshData(t_groupType);
        this.list.scrollToView(0); //切换标签则重新定位第一项
        this.reddotCheck();
    }

    private onUpdate() {
        let t_groupType = this.getGroupTypeByTabIndex(this.tabCtrl.selectedIndex);
        this.refreshData(t_groupType);
        this.reddotCheck();
    }

    private onRewardUpdate() {
        this.refreshBoxItemList();
        this.reddotCheck();
    }
}