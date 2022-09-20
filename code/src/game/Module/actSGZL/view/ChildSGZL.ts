/**
 * 三国战令界面
 * @author: lujiahao 
 * @date: 2019-09-20 14:41:47 
 */
class ChildSGZL extends fairygui.GComponent implements IActHolyBeast {

    //>>>>start
    public tabCtrl: fairygui.Controller;
    public stateCtrl: fairygui.Controller;
    public updateFlagCtrl: fairygui.Controller;
    public tab0: SGZLBtn;
    public tab1: SGZLBtn;
    public tab2: SGZLBtn;
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

    public static URL: string = "ui://d5y9ngt6jt4v1j";

    private _listMap: fairygui.GList[];
    private _voListMap: any[][] = [];

    private _curActVo: Vo_Activity;
    private _actId: number = 0;

    private _consumeIdMap = [412020, 412021];

    private _initCmd = false;

    public static createInstance(): ChildSGZL {
        return <ChildSGZL><any>(fairygui.UIPackage.createObject("actHolyBeast", "ChildSGZL"));
    }

    private static _instance: ChildSGZL
    public static get instance(): ChildSGZL {
        if (ChildSGZL._instance == null) {
            ChildSGZL._instance = ChildSGZL.createInstance();
        }
        return ChildSGZL._instance;
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);

        this._listMap = [this.list0, this.list1, this.list2];

        this.list0.itemRenderer = this.onRewardItemRender;
        this.list0.callbackThisObj = this;
        this.list0.setVirtual();

        this.list1.itemRenderer = this.onTaskItemRender;
        this.list1.callbackThisObj = this;
        this.list1.setVirtual();

        this.list2.itemRenderer = this.onShopItemRender;
        this.list2.callbackThisObj = this;
        this.list2.setVirtual();

        this.resCom0.setType(1);
        this.resCom1.setType(1);

        let t_con0 = VoItem.create(this._consumeIdMap[0]);
        let t_con1 = VoItem.create(this._consumeIdMap[1]);
        this.resCom0.setImgUrl(t_con0.icon);
        this.resCom1.setImgUrl(t_con1.icon);
    }

    //=========================================== API ==========================================
    public show(pParent: fairygui.GComponent, pId: number) {
        let t = this;

        pParent.addChild(t);
        t.registerEvent(true);

        t._actId = pId;

        GGlobal.modelEightLock.CG4571(pId);
        GGlobal.modelSGZL.cmdSendRequestTaskList();
        GGlobal.modelSGZL.cmdSendRequestShop();

        t.refreshDataList(0);
        t.refreshDataList(1);
        t.refreshDataList(2);
        t.refreshLevelInfo();

        t._curActVo = ModelEightLock.getActVo(pId);
        if (t._curActVo) {
            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }

        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 0;
    }

    public disposePanel() {
        Timer.instance.remove(this.onDateUpdate, this);
        this.registerEvent(false);
        this.removeFromParent();
        for (let i = 0; i < this._listMap.length; i++) {
            this._listMap[i].numItems = 0;
        }
    }

    public dispose() {
        ChildSGZL._instance = null;
        super.dispose();
    }

    //===================================== private method =====================================
    private onRewardItemRender(pIndex: number, pItem: SGZLRewardItem) {
        let t_list = this._voListMap[0];
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    }

    private onTaskItemRender(pIndex: number, pItem: SGZLTaskItem) {
        let t_list = this._voListMap[1];
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    }

    private onShopItemRender(pIndex: number, pItem: SGZLShopItem) {
        let t_list = this._voListMap[2];
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    }

    private refreshLevelInfo() {
        this.stateCtrl.selectedIndex = GGlobal.modelSGZL.upgradeFlag;
        let t_levelId = GGlobal.modelSGZL.levelId;
        let t_curExp = GGlobal.modelSGZL.curExp;
        let t_vo = GGlobal.modelSGZL.getRewardVoById(t_levelId);
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
        let t_upgradeFlag = GGlobal.modelSGZL.upgradeFlag;
        this.updateFlagCtrl.selectedIndex = t_upgradeFlag;
    }

    private refreshDataList(pTabIndex: number) {
        switch (pTabIndex) {
            case 0:
                {
                    let t_sourceList = GGlobal.modelSGZL.getRewardVoList();
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
                    let t_map = GGlobal.modelSGZL.getTypeVoListMap();
                    let t_showList: VoSGZLTask[] = [];
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
                    t_showList.sort((pA: VoSGZLTask, pB: VoSGZLTask) => {
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
                    let t_sourceList = GGlobal.modelSGZL.getShopVoList();
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
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL_REWARD_UPDATE, t.onRewardUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL_SHOP_UPDATE, t.onShopUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL_TASK_UPDATE, t.onTaskUpdate, t);
        GGlobal.control.register(pFlag, UIConst.ACTHB_SGZL, this.onReddotUp, this);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, this.onBagUpdate, this);

        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabCtrlChangeHandler, t);
        EventUtil.register(pFlag, t.btnUpgrade, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGetAll, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onBagUpdate() {
        this.refreshShopConCount();
    }

    private onReddotUp() {
        let t_value1 = GGlobal.reddot.checkCondition(UIConst.ACTHB_SGZL, 1);
        this.btnGetAll.noticeImg.visible = t_value1;
        this.tab0.noticeImg.visible = t_value1;

        let t_value2 = GGlobal.reddot.checkCondition(UIConst.ACTHB_SGZL, 2);
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
            let t_voList = GGlobal.modelSGZL.getRewardVoList();
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
                let t_levelIndex = GGlobal.modelSGZL.levelId - 2;
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
                GGlobal.layerMgr.open(UIConst.ACTHB_SGZL_UPGRADE);
                break;

            case this.btnGetAll:
                GGlobal.modelSGZL.cmdSendGetReward(1);
                break;
        }
    }
}