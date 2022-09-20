/**
 * 出谋划策面板
 * @author: lujiahao 
 * @date: 2019-10-24 18:28:45 
 */
class ChildLotteryQice extends fairygui.GComponent implements IPanel {
    //>>>>start
    public loaderBg: fairygui.GLoader;
    public btnTen: Button1;
    public btnOne: Button0;
    public resCom0: ViewResource;
    public resCom1: ViewResource;
    public btnCheck: fairygui.GButton;
    public tfPreView: fairygui.GRichTextField;
    public tfTips: fairygui.GRichTextField;
    public pb: fairygui.GProgressBar;
    public tempItem: QiceRewardItem;
    public tfTimes: fairygui.GRichTextField;
    public itemList: fairygui.GList;
    public imagePen: fairygui.GImage;
    //>>>>end

    public static URL: string = "ui://cokk050neckr13";

    private _boxItemPool: QiceRewardItem[] = [];
    private _boxItemList: QiceRewardItem[] = [];
    private _rewardVoList: IGridImpl[];

    public static createInstance(): ChildLotteryQice {
        return <ChildLotteryQice><any>(fairygui.UIPackage.createObject("qice", "ChildLotteryQice"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.itemList.setVirtualAndLoop();
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;

        t.pb._titleObject.visible = false;
    }

    //=========================================== API ==========================================
    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    }

    openPanel(pData?: any) {
        let t = this;
        t.registerEvent(true);

        GGlobal.modelQice.CG_QiCeDraw_openUI_9751();

        t.refreshData();
        IconUtil.setImg(t.loaderBg, Enum_Path.BACK_URL + "qice_lottery_bg.jpg");
    }

    closePanel(pData?: any) {
        let t = this;
        t.itemList.numItems = 0;
        t.registerEvent(false);
        t.showMovie(false);
        Timer.instance.remove(t.onScroll, t);
        IconUtil.setImg(t.loaderBg, null);
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: ViewGrid) {
        let t_list = this._rewardVoList;
        if (t_list) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelQice;

        t._rewardVoList = t_model.cfgLottery.rewardList;
        t.itemList.numItems = t._rewardVoList.length;
        if (!Timer.instance.has(t.onScroll, t))
            Timer.instance.listen(t.onScroll, t, 100);

        t.btnCheck.selected = !t_model.isPlayMc;

        t.pb.max = t_model.maxLotteryCount;
        t.pb.value = t_model.lotteryCount;

        t.tfTimes.text = `谋划次数\n${t_model.lotteryCount}/${t_model.maxLotteryCount}`;

        let t_interval = 10;
        let t_curTimes = t_model.lotteryCount % t_interval;
        let t_remainTimes = t_interval - t_curTimes;
        let t_str = "";
        if (t_remainTimes == 1) {
            t_str = "<font color='#00ff00'>下次</font>谋划必出高级奖励";
        }
        else {
            t_str = `再谋划<font color='#00ff00'>${t_remainTimes}次</font>必出高级奖励`;
        }
        t.tfPreView.text = t_str;

        t.refreshBoxItemList();
        t.showConsume();
    }

    private showConsume() {
        let t = this;
        let t_model = GGlobal.modelQice;
        let t_c1Id = 0;
        let t_need1 = 0;
        if (t_model.cfgLottery.checkItemEnough(1)) {
            t_c1Id = t_model.cfgLottery.consumeItem1.id;
            t_need1 = t_model.cfgLottery.consumeItem1.count;
            t.btnOne.noticeImg.visible = true;
        }
        else {
            t_c1Id = t_model.cfgLottery.consume1.id;
            t_need1 = t_model.cfgLottery.consume1.count;
            t.btnOne.noticeImg.visible = false;
        }
        {
            t.resCom0.setItemId(t_c1Id);
            let t_curCount = FastAPI.getItemCount(t_c1Id);
            let t_color = Color.GREENSTR;
            if (t_curCount < t_need1) {
                t_color = Color.REDSTR;
            }
            if (FastAPI.isMoney(t_c1Id)) {
                t.resCom0.setCount(HtmlUtil.font(t_need1 + "", t_color));
            }
            else {
                t.resCom0.setCount(HtmlUtil.font(t_curCount + "/" + t_need1, t_color));
            }
        }

        let t_c2Id = 0;
        let t_need2 = 0;
        if (t_model.cfgLottery.checkItemEnough(2)) {
            t_c2Id = t_model.cfgLottery.consumeItem10.id;
            t_need2 = t_model.cfgLottery.consumeItem10.count;
            t.btnTen.noticeImg.visible = true;
        }
        else {
            t_c2Id = t_model.cfgLottery.consume10.id;
            t_need2 = t_model.cfgLottery.consume10.count;
            t.btnTen.noticeImg.visible = false;
        }
        {
            t.resCom1.setItemId(t_c2Id);
            let t_curCount = FastAPI.getItemCount(t_c2Id);
            let t_color = Color.GREENSTR;
            if (t_curCount < t_need2) {
                t_color = Color.REDSTR;
            }
            if (FastAPI.isMoney(t_c2Id)) {
                t.resCom1.setCount(HtmlUtil.font(t_need2 + "", t_color));
            }
            else {
                t.resCom1.setCount(HtmlUtil.font(t_curCount + "/" + t_need2, t_color));
            }
        }
    }

    private _mc: Part;
    private showMovie(pFlag: boolean) {
        let t = this;
        let t_model = GGlobal.modelQice;
        if (pFlag) {
            if (t_model.isPlayingMc)
                return;
            if (!t._mc) {
                t._mc = EffectMgr.addEff("uieff/10057", t.displayListContainer, t.width / 2 + 15, t.height / 2 - 123, 1000, 1000, false);
                t._mc.refThis = t;
                t._mc.refKey = "_mc";
            }
            Timer.instance.callLater(t.runAfterMc, 1000, t);
            t_model.isPlayingMc = true;
            t.imagePen.visible = false;
        }
        else {
            if (Timer.instance.has(t.runAfterMc, t))
                Timer.instance.remove(t.runAfterMc, t);
            if (t._mc) {
                EffectMgr.instance.removeEff(t._mc);
            }
            t_model.isPlayingMc = false;
            t.imagePen.visible = true;
        }
    }

    private runAfterMc() {
        let t = this;
        t.showRewardPanel();
        t.showMovie(false);
    }

    /** 刷新宝箱列表 */
    private refreshBoxItemList() {
        let t = this;
        let t_model = GGlobal.modelQice;
        t.clearAllBoxItemList();
        let t_boxVoList = t_model.getTargetVoList();
        let t_lastRight = 0;
        let t_half = t.tempItem.width / 2;
        for (let v of t_boxVoList) {
            let t_boxItem = t.getBoxItemFromPool();
            t_boxItem.setData(v);
            t.addChild(t_boxItem);
            let t_maxValue = GGlobal.modelQice.maxLotteryCount;
            t_boxItem.y = t.tempItem.y;
            t_boxItem.x = t.pb.x + (v.cfg.pt / t_maxValue) * t.pb.width;
            if (t_boxItem.x - t_half < t_lastRight) {
                t_boxItem.x = t_lastRight + t_half + 3;
            }
            t_lastRight = t_boxItem.x + t_half;
            t._boxItemList.push(t_boxItem);
        }
    }

    private clearAllBoxItemList() {
        let t = this;
        for (let i = t._boxItemList.length - 1; i >= 0; i--) {
            t.recycleBoxItem(t._boxItemList[i]);
            t._boxItemList.splice(i, 1);
        }
    }

    private getBoxItemFromPool(): QiceRewardItem {
        let t = this;
        let t_vo = t._boxItemPool.pop();
        if (!t_vo) {
            t_vo = QiceRewardItem.createInstance() as QiceRewardItem;
        }
        return t_vo;
    }

    private recycleBoxItem(pItem: QiceRewardItem) {
        let t = this;
        if (!pItem)
            return;
        pItem.recycle();
        pItem.removeFromParent();
        t._boxItemPool.push(pItem);
    }

    private showRewardPanel() {
        let t = this;
        let t_model = GGlobal.modelQice;
        let t_resultList = t_model.lotteryResultList;
        let t_type = 0;
        let t_need1 = 0;
        let t_need2 = 0;
        let t_showId = 0;
        if (t_resultList.length == 1) {
            //再来一次
            t_type = 1;
        }
        else {
            //再来10次
            t_type = 2;
        }
        if (t_model.cfgLottery.checkItemEnough(t_type)) {
            //道具足够
            if (t_type == 1) {
                t_showId = t_model.cfgLottery.consumeItem1.id;
            }
            else {
                t_showId = t_model.cfgLottery.consumeItem10.id;
            }
            t_need1 = t_model.cfgLottery.consumeItem1.count;
            t_need2 = t_model.cfgLottery.consume10.count;
        }
        else {
            //道具不够，使用元宝
            if (t_type == 1) {
                t_showId = t_model.cfgLottery.consume1.id;
            }
            else {
                t_showId = t_model.cfgLottery.consume10.id;
            }
            t_need1 = t_model.cfgLottery.consume1.count;
            t_need2 = t_model.cfgLottery.consume10.count;
        }

        View_Reward_Show2.show(0, t_resultList.length, Handler.create(t, () => {
            if (t_resultList.length > 1)
                GGlobal.modelQice.CG_QiCeDraw_draw_9753(2);
            else
                GGlobal.modelQice.CG_QiCeDraw_draw_9753(1);
        }), t_resultList, t_need1, t_need2, t_showId);

        //显示大奖
        let t_bigItemList = [];
        for (let v of t_resultList) {
            if (v && v.quality > 5) {
                t_bigItemList.push(v);
            }
        }
        if (t_bigItemList.length > 0) {
            ViewCommonPrompt.textItemList(t_bigItemList);
        }

        t.refreshData();
    }

    private registerEvent(pFlag: boolean) {
        let t = this;

        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_LOTTERY_UPDATE, t.onLotteryUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_LOTTERY_SUCCESS, t.onLotterySuccess, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_TARGET_UPDATE, t.onTargetUpdate, t);

        EventUtil.register(pFlag, t.itemList, egret.TouchEvent.TOUCH_BEGIN, t.onScrollClickBegin, t);
        EventUtil.register(pFlag, t.itemList, egret.TouchEvent.TOUCH_END, t.onScrollClickEnd, t);

        EventUtil.register(pFlag, t.btnOne, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnTen, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCheck, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onScrollClickBegin() {
        let t = this;
        t._clickFlag = true;
    }

    private onScrollClickEnd() {
        let t = this;
        t._clickFlag = false;
    }

    private _clickFlag = false;
    private onScroll() {
        let t = this;
        if (t._clickFlag)
            return;
        let t_pos = t.itemList.scrollPane.posX + 5;
        t.itemList.scrollPane.setPosX(t_pos, true);
    }

    private onBagUpdate() {
        let t = this;
        t.showConsume();
    }

    private onTargetUpdate() {
        let t = this;
        t.refreshData();
    }

    private onLotterySuccess() {
        let t = this;
        let t_model = GGlobal.modelQice;
        if (t_model.isPlayMc) {
            //TODO 播放动画
            t.showMovie(true);
        }
        else {
            //不用播放动画
            t.showRewardPanel();
        }
    }

    private onLotteryUpdate() {
        let t = this;
        t.refreshData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnOne: //单抽
                GGlobal.modelQice.CG_QiCeDraw_draw_9753(1);
                break;
            case t.btnTen: //抽10次
                GGlobal.modelQice.CG_QiCeDraw_draw_9753(2);
                break;
            case t.btnCheck:
                GGlobal.modelQice.isPlayMc = !t.btnCheck.selected;
                break;
        }
    }
}