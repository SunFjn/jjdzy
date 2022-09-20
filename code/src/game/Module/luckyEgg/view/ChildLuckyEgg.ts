/**
 * 幸运扭蛋面板
 * @author: lujiahao 
 * @date: 2020-01-07 18:06:26 
 */
class ChildLuckyEgg extends fairygui.GComponent implements IPanel {

    //>>>>start
    public poolItem0: LuckyEggPoolItem;
    public poolItem1: LuckyEggPoolItem;
    public poolItem2: LuckyEggPoolItem;
    public btnPutIn: Button0;
    public btnLottery: Button1;
    public resComPut: ViewResource;
    public resCom1: ViewResource;
    public tfDes: fairygui.GRichTextField;
    public btnCheck: fairygui.GButton;
    public tfFree: fairygui.GRichTextField;
    public btnHelp: fairygui.GButton;
    public tempItem01: LuckyEggItem;
    public tempItem02: LuckyEggItem;
    public tempItem00: LuckyEggItem;
    public tempItem11: LuckyEggItem;
    public tempItem12: LuckyEggItem;
    public tempItem10: LuckyEggItem;
    public tempItem20: LuckyEggItem;
    public eggItem7: LuckyEggItem;
    public eggItem4: LuckyEggItem;
    public eggItem8: LuckyEggItem;
    public eggItem5: LuckyEggItem;
    public eggItem2: LuckyEggItem;
    public eggItem6: LuckyEggItem;
    public eggItem1: LuckyEggItem;
    public eggItem0: LuckyEggItem;
    public eggItem3: LuckyEggItem;
    public btnPool: fairygui.GButton;
    public tfDate: fairygui.GRichTextField;
    public linkLb: fairygui.GRichTextField;
    //>>>>end

    public static URL: string = "ui://wx4kos8uosj30";

    /** 设置包名（静态属性） */
    public static pkg = "luckyEgg";
    /** 绑定ui的方法（静态方法） */
    public static setExtends() {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        let f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(LuckyPoolRewardItem.URL, LuckyPoolRewardItem);
        // f(ViewPoolPreviewLucky.URL, ViewPoolPreviewLucky);
        f(LuckyPoolPreviewItem.URL, LuckyPoolPreviewItem);
        // f(ChildLuckyEgg.URL, ChildLuckyEgg);
        f(LuckyEggPoolItem.URL, LuckyEggPoolItem);
        f(LuckyEggItem.URL, LuckyEggItem);
        // f(ViewPoolRewardLucky.URL, ViewPoolRewardLucky);
    }

    public static createInstance(): ChildLuckyEgg {
        return <ChildLuckyEgg><any>(fairygui.UIPackage.createObject("luckyEgg", "ChildLuckyEgg"));
    }

    public constructor() {
        super();
    }

    private _curActVo: Vo_Activity;

    private _poolItemList: LuckyEggPoolItem[];
    private _eggItemList: LuckyEggItem[];
    private _tempItemPool: LuckyEggItem[] = [];
    private _mcItemList: LuckyEggItem[] = [];

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t._poolItemList = [t.poolItem0, t.poolItem1, t.poolItem2];
        for (let i = 0; i < t._poolItemList.length; i++) {
            t._poolItemList[i].setData(i + 1);
        }

        t._eggItemList = [];
        for (let i = 0; i < 9; i++) {
            let t_item = <any>t.getChild("eggItem" + i);
            t._eggItemList.push(t_item);
        }

        t.resComPut.setItemId(Enum_Attr.yuanBao);
        t.resCom1.setItemId(Enum_Attr.yuanBao);
    }

    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    }

    openPanel(pData?: any) {
        let t = this;
        t.registerEvent(true);

        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_LUCKY_EGG);

        this.tfDate.text = "";
        this._curActVo = pData;

        t.refreshData();
    }

    closePanel(pData?: any) {
        let t = this;
        t.registerEvent(false);
        t.playPutInMc(false);
        Timer.instance.remove(t.onDateUpdate, t);
    }
    //=========================================== API ==========================================
    //===================================== private method =====================================
    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelLuckyEgg;

        t.btnCheck.selected = !t_model.isPlayMc;

        for (let i = 0; i < t._eggItemList.length; i++) {
            let t_item = t._eggItemList[i];
            let t_eggVo = t_model.eggItemList[i];
            t_item.setData(t_eggVo);
        }

        if (t_model.remainLottery <= 0)
            t.btnLottery.grayed = true;
        else
            t.btnLottery.grayed = false;

        t.refreshConsume();

        if (!Timer.instance.has(this.onDateUpdate, this))
            Timer.instance.listen(this.onDateUpdate, this);
    }

    private refreshConsume() {
        let t = this;
        let t_model = GGlobal.modelLuckyEgg;

        if (t_model.freePool > 0) {
            t.tfDes.text = "";
            t.tfFree.visible = true;
            t.resComPut.visible = false;
        }
        else {
            t.tfDes.text = `再抽取<font color='#00ff00'>${t_model.remain2Free}次</font>扭蛋，可免费注入奖励`;
            t.tfFree.visible = false;
            t.resComPut.visible = true;
        }

        {
            let t_curCount = FastAPI.getItemCount(t_model.consumePutIn.id);
            let t_need = t_model.consumePutIn.count;
            let t_color = Color.GREENSTR;
            if (t_curCount < t_need)
                t_color = Color.REDSTR;
            t.resComPut.setCount(HtmlUtil.font(t_need + "", t_color));
        }

        {
            let t_need = t_model.getConsumeCount();
            let t_curCount = FastAPI.getItemCount(Enum_Attr.yuanBao);
            let t_color = Color.GREENSTR;
            if (t_curCount < t_need)
                t_color = Color.REDSTR;
            t.resCom1.setCount(HtmlUtil.font(t_need + "", t_color));
        }
    }

    private playPutInMc(pFlag: boolean) {
        let t = this;
        let t_model = GGlobal.modelLuckyEgg;
        if (pFlag) {
            if (t_model.isPlayingMc)
                return;
            t_model.isPlayingMc = true;

            for (let v of t._eggItemList) {
                v.visible = false;
            }

            for (let v of t._poolItemList) {
                v.effectShake.play();
            }

            let t_index = t.getChildIndex(t.poolItem0);
            let t_list = t_model.eggItemList;
            t._totalCount = t_list.length;
            t._mcCompleteCount = 0;

            for (let i = 0; i < t_list.length; i++) {
                let t_vo = t_list[i];
                let t_tempItem = t.getTempItem();
                t.addChildAt(t_tempItem, t_index);
                t_tempItem.typeCtrl.selectedIndex = t_vo.poolType - 1;

                t._mcItemList.push(t_tempItem);

                egret.Tween.removeTweens(t_tempItem);
                let tw = egret.Tween.get(t_tempItem);
                switch (t_vo.poolType) {
                    case 1:
                        t_tempItem.setXY(t.tempItem00.x, t.tempItem00.y);
                        tw.wait(100 * i)
                            .to({ x: t.tempItem10.x, y: t.tempItem10.y }, 200)
                            .to({ x: t.tempItem11.x, y: t.tempItem11.y }, 300)
                            .to({ x: t.tempItem20.x, y: t.tempItem20.y }, 200)
                            .call(() => {
                                t.recyleTempItem(t_tempItem);
                                t.onItemMcEnd(i);
                            });
                        break;
                    case 2:
                        t_tempItem.setXY(t.tempItem01.x, t.tempItem01.y);
                        tw.wait(100 * i)
                            .to({ x: t.tempItem11.x, y: t.tempItem11.y }, 200)
                            .to({ x: t.tempItem20.x, y: t.tempItem20.y }, 200)
                            .call(() => {
                                t.recyleTempItem(t_tempItem);
                                t.onItemMcEnd(i);
                            });
                        break;
                    case 3:
                        t_tempItem.setXY(t.tempItem02.x, t.tempItem02.y);
                        tw.wait(100 * i)
                            .to({ x: t.tempItem12.x, y: t.tempItem12.y }, 200)
                            .to({ x: t.tempItem11.x, y: t.tempItem11.y }, 300)
                            .to({ x: t.tempItem20.x, y: t.tempItem20.y }, 200)
                            .call(() => {
                                t.recyleTempItem(t_tempItem);
                                t.onItemMcEnd(i);
                            });
                        break;
                }
            }
        }
        else {
            t_model.isPlayingMc = false;
            for (let i = t._mcItemList.length - 1; i >= 0; i--) {
                let t_item = t._mcItemList[i];
                t.recyleTempItem(t_item);
                t._mcItemList.splice(i, 1);
            }
            t._totalCount = 0;
            t._mcCompleteCount = 0;
        }
    }

    private _totalCount = 0;
    private _mcCompleteCount = 0;
    private onItemMcEnd(pIndex: number) {
        let t = this;
        let t_model = GGlobal.modelLuckyEgg;
        t._mcCompleteCount++;

        t._eggItemList[pIndex].setData(t_model.eggItemList[pIndex]);

        if (t._mcCompleteCount >= t._totalCount) {
            t._totalCount = 0;
            t._mcCompleteCount = 0;
            t.playPutInMc(false);

            t.refreshData();
        }
    }

    private getTempItem(): LuckyEggItem {
        let t = this;
        let t_item = t._tempItemPool.pop();
        if (!t_item) {
            t_item = LuckyEggItem.createInstance();
            t_item.setSize(t.tempItem00.width, t.tempItem00.height);
        }
        return t_item;
    }

    private recyleTempItem(pItem: LuckyEggItem) {
        let t = this;
        egret.Tween.removeTweens(pItem);
        pItem.setXY(0, 0);
        pItem.removeFromParent();
        t._tempItemPool.push(pItem);
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
        GGlobal.control.register(pFlag, Enum_MsgType.LUCKY_EGG_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.LUCKY_EGG_POOL_UPDATE, t.onPoolUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.LUCKY_EGG_LOTTERY, t.onLottery, t);

        EventUtil.register(pFlag, t.btnPool, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCheck, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnHelp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnPutIn, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnLottery, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.linkLb, egret.TouchEvent.TOUCH_TAP, t.openGaiLV, t);
    }

    private openGaiLV(evt: egret.TouchEvent) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.GAILV, 7);
    }

    //======================================== handler =========================================
    private onUpdate() {
        let t = this;
        t.refreshData();
    }

    private onPoolUpdate() {
        let t = this;
        let t_model = GGlobal.modelLuckyEgg;
        //注入奖励成功 播放注入动画
        if (t_model.isPlayMc) {
            t.refreshConsume(); //先刷新消耗显示
            t.playPutInMc(true);
        }
        else {
            t.refreshData();
        }
    }

    private onLottery() {
        let t = this;
        let t_model = GGlobal.modelLuckyEgg;
        let t_resultList = t_model.lotteryResultList;
        if (t_model.remainLottery <= 0) {
            let t_need = 0;
            if (t_model.freePool <= 0) {
                t_need = t_model.consumePutIn.count;
            }
            View_Reward_Show5.show(UIConst.ACTCOM_LUCKY_EGG, "注入奖励", Handler.create(t, () => {
                GGlobal.modelLuckyEgg.CG_LuckyTwist_chooseItem_11003();
            }), t_resultList, Enum_Attr.yuanBao, t_need, () => {
                return `抽奖机会已全部用完，请重新注入奖励`;
            }, t);
        }
        else {
            View_Reward_Show5.show(UIConst.ACTCOM_LUCKY_EGG, "继续抽奖", Handler.create(t, () => {
                GGlobal.modelLuckyEgg.CG_LuckyTwist_draw_11001();
            }), t_resultList, Enum_Attr.yuanBao, t_model.getConsumeCount(), () => {
                let t_color = Color.GREENSTR;
                if (t_model.remainLottery < 1)
                    t_color = Color.REDSTR;
                let t_countStr = HtmlUtil.font(t_model.remainLottery + "", t_color);
                return `本次注入奖励还可抽奖${t_countStr}次`;
            }, t);
        }
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelLuckyEgg;
        switch (e.currentTarget) {
            case t.btnPool:
                GGlobal.layerMgr.open(UIConst.ACTCOM_LUCKY_EGG_REWARD);
                break;
            case t.btnCheck:
                t_model.isPlayMc = !t.btnCheck.selected;
                break;
            case t.btnHelp:
                GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_LUCKY_EGG);
                break;
            case t.btnPutIn:
                t_model.CG_LuckyTwist_chooseItem_11003();
                // t.playPutInMc(true);
                break;
            case t.btnLottery:
                t_model.CG_LuckyTwist_draw_11001();
                break;
        }
    }
}