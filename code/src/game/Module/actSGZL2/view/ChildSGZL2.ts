/**
 * @author: lujiahao 
 * @date: 2019-11-14 20:59:00 
 */
class ChildSGZL2 extends fairygui.GComponent implements IPanel {

    //>>>>start
    public tabCtrl: fairygui.Controller;
    public stateCtrl: fairygui.Controller;
    public updateFlagCtrl: fairygui.Controller;
    public tab0: SGZL2Btn;
    public tab1: SGZL2Btn;
    public tab2: SGZL2Btn;
    public pb: fairygui.GProgressBar;
    public btnUpgrade: Button2;
    public tfLevel: fairygui.GTextField;
    public tfDate: fairygui.GRichTextField;
    public btnGetAll: Button1;
    public list0: fairygui.GList;
    public list1: fairygui.GList;
    public list2: fairygui.GList;
    public tfMax: fairygui.GRichTextField;
    public resCom0: ViewResource;
    public resCom1: ViewResource;
    //>>>>end

    public static URL: string = "ui://ggwi8wepqhoc0";

    /** 设置包名（静态属性） */
    public static pkg = "actComSgzl2";
    /** 绑定ui的方法（静态方法） */
    public static setExtends() {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        let f = fairygui.UIObjectFactory.setPackageItemExtension;
        // f(ChildSGZL2.URL, ChildSGZL2);
        f(SGZL2Btn.URL, SGZL2Btn);
        f(SGZL2TaskItem.URL, SGZL2TaskItem);
        f(SGZL2ShopItem.URL, SGZL2ShopItem);
        f(SGZL2RewardItem.URL, SGZL2RewardItem);
    }

    public static createInstance(): ChildSGZL2 {
        return <ChildSGZL2><any>(fairygui.UIPackage.createObject("actComSgzl2", "ChildSGZL2"));
    }

    private _listMap: fairygui.GList[];
    private _voListMap: any[][] = [];

    private _curActVo: Vo_Activity;

    private _consumeIdMap = [412020, 412021];

    private _initCmd = false;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t._listMap = [t.list0, t.list1, t.list2];

        t.list0.itemRenderer = t.onRewardItemRender;
        t.list0.callbackThisObj = t;
        t.list0.setVirtual();

        t.list1.itemRenderer = t.onTaskItemRender;
        t.list1.callbackThisObj = t;
        t.list1.setVirtual();

        t.list2.itemRenderer = t.onShopItemRender;
        t.list2.callbackThisObj = t;
        t.list2.setVirtual();

        t.resCom0.setType(1);
        t.resCom1.setType(1);

        let t_con0 = VoItem.create(t._consumeIdMap[0]);
        let t_con1 = VoItem.create(t._consumeIdMap[1]);
        t.resCom0.setImgUrl(t_con0.icon);
        t.resCom1.setImgUrl(t_con1.icon);
    }

    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    }

    openPanel(pData?: any) {
        let t = this;
        t.registerEvent(true);

        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SGZL2);
        GGlobal.modelSGZL2.cmdSendRequestTaskList();
        GGlobal.modelSGZL2.cmdSendRequestShop();

        t.refreshDataList(0);
        t.refreshDataList(1);
        t.refreshDataList(2);
        t.refreshLevelInfo();

        t.tfDate.text = "";
        t._curActVo = pData;

        if (t._curActVo) {
            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }

        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 0;

        t.refreshData();
    }

    closePanel(pData?: any) {
        let t = this;
        t.registerEvent(false);
        Timer.instance.remove(t.onDateUpdate, t);
        for (let i = 0; i < t._listMap.length; i++) {
            t._listMap[i].numItems = 0
        }
    }

    public dispose() {
        let t = this;
        super.dispose();
    }

    //=========================================== API ==========================================
    private refreshData() {
        let t = this;
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
    private onRewardItemRender(pIndex: number, pItem: SGZL2RewardItem) {
        let t_list = this._voListMap[0];
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    }

    private onTaskItemRender(pIndex: number, pItem: SGZL2TaskItem) {
        let t_list = this._voListMap[1];
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    }

    private onShopItemRender(pIndex: number, pItem: SGZL2ShopItem) {
        let t_list = this._voListMap[2];
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    }

    private refreshLevelInfo() {
        this.stateCtrl.selectedIndex = GGlobal.modelSGZL2.upgradeFlag;
        let t_levelId = GGlobal.modelSGZL2.levelId;
        let t_curExp = GGlobal.modelSGZL2.curExp;
        let t_vo = GGlobal.modelSGZL2.getRewardVoById(t_levelId);
        if (t_vo) {
            if (t_vo.cfg.shengji == 0) //已满级
            {
                this.pb.visible = false;
                this.tfMax.visible = true;
            }
            else {
                this.pb.visible = true;
                this.tfMax.visible = false;
                this.pb.max = t_vo.cfg.shengji;
                this.pb.value = t_curExp;
            }
        }
        else {
        }
        this.tfLevel.text = t_levelId + "";
        let t_upgradeFlag = GGlobal.modelSGZL2.upgradeFlag;
        this.updateFlagCtrl.selectedIndex = t_upgradeFlag;
    }

    private refreshDataList(pTabIndex: number) {
        switch (pTabIndex) {
            case 0:
                {
                    let t_sourceList = GGlobal.modelSGZL2.getRewardVoList();
                    let t_showList = t_sourceList.concat();
                    // t_showList.sort((pA, pB) => {
                    //     if (pA.sortValue > pB.sortValue)
                    //         return -1;
                    //     else if (pA.sortValue < pB.sortValue)
                    //         return 1;
                    //     else
                    //         return pA.id - pB.id;
                    // });
                    this._voListMap[pTabIndex] = t_showList;
                }
                break;
            case 1:
                {
                    let t_map = GGlobal.modelSGZL2.getTypeVoListMap();
                    let t_showList: VoSGZL2Task[] = [];
                    for (let k in t_map) {
                        let t_voList = t_map[k];
                        let t_showVo = t_voList[t_voList.length - 1];
                        for (let i = t_voList.length - 1; i >= 0; i--) {
                            let t_vo = t_voList[i];
                            if (t_vo.state == Enum_SGZL.SATTE_DONE)
                                continue;
                            t_showVo = t_vo;
                        }
                        t_showList.push(t_showVo);
                    }
                    t_showList.sort((pA: VoSGZL2Task, pB: VoSGZL2Task) => {
                        if (pA.sortValue > pB.sortValue)
                            return -1;
                        else if (pA.sortValue < pB.sortValue)
                            return 1;
                        else
                            return pA.taskId - pB.taskId;
                    });
                    this._voListMap[pTabIndex] = t_showList;
                }
                break;
            case 2:
                {
                    let t_sourceList = GGlobal.modelSGZL2.getShopVoList();
                    let t_showList = t_sourceList.concat();

                    this._voListMap[pTabIndex] = t_showList;
                }
                break;
        }

        this._listMap[pTabIndex].numItems = this._voListMap[pTabIndex].length;
    }

    private refreshShopConCount() {
        let t_count0 = Model_Bag.getItemCount(this._consumeIdMap[0]);
        let t_count1 = Model_Bag.getItemCount(this._consumeIdMap[1]);
        this.resCom0.setCount(t_count0);
        this.resCom1.setCount(t_count1);
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL2_REWARD_UPDATE, t.onRewardUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL2_SHOP_UPDATE, t.onShopUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL2_TASK_UPDATE, t.onTaskUpdate, t);
        GGlobal.control.register(pFlag, UIConst.ACTCOM_SGZL2, t.onReddotUp, t);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);

        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabCtrlChangeHandler, t);
        EventUtil.register(pFlag, t.btnUpgrade, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGetAll, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onBagUpdate() {
        this.refreshShopConCount();
    }

    private onReddotUp() {
        let t_value1 = GGlobal.reddot.checkCondition(UIConst.ACTCOM_SGZL2, 1);
        this.btnGetAll.noticeImg.visible = t_value1;
        this.tab0.noticeImg.visible = t_value1;

        let t_value2 = GGlobal.reddot.checkCondition(UIConst.ACTCOM_SGZL2, 2);
        this.tab1.noticeImg.visible = t_value2;
    }

    private onRewardUpdate() {
        this.refreshDataList(0);
        this.refreshLevelInfo();
        if (!this._initCmd) {
            this.onTabCtrlChangeHandler(null);
            this._initCmd = true;
        }
    }

    private onTaskUpdate() {
        this.refreshDataList(1);
    }

    private onShopUpdate() {
        this.refreshDataList(2);
    }

    private onTabCtrlChangeHandler(e: fairygui.StateChangeEvent) {
        let t_tabIndex = this.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        let t_listCom = this._listMap[t_tabIndex];
        if (t_tabIndex == 0) {
            //奖励页的聚焦有特殊逻辑
            let t_voList = GGlobal.modelSGZL2.getRewardVoList();
            let t_targetIndex = 0;
            let t_hasCanGet = false;
            for (let i = 0; i < t_voList.length; i++) {
                let t_vo = t_voList[i];
                if (t_vo.state0 == Enum_SGZL.STATE_CAN_GET || t_vo.state1 == Enum_SGZL.STATE_CAN_GET) {
                    t_targetIndex = i;
                    t_hasCanGet = true;
                    break;
                }
            }
            if (t_hasCanGet) {
                t_listCom.scrollToView(t_targetIndex);
            }
            else {
                let t_levelIndex = GGlobal.modelSGZL2.levelId - 2;
                t_levelIndex = t_levelIndex < 0 ? 0 : t_levelIndex;
                t_listCom.scrollToView(t_levelIndex);
            }
        }
        else {
            t_listCom.scrollToView(0);
        }

        switch (t_tabIndex) {
            case 0:
                break;

            case 1:
                break;

            case 2:
                this.refreshShopConCount();
                break;
        }
    }

    private onBtnClick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btnUpgrade:
                GGlobal.layerMgr.open(UIConst.ACTCOM_SGZL2_UPGRADE, 1000 + this._curActVo.qs);
                break;

            case this.btnGetAll:
                GGlobal.modelSGZL2.cmdSendGetReward(1);
                break;
        }
    }
}