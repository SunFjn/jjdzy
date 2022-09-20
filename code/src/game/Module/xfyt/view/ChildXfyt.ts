/**
 * 消费摇骰面板
 * @author: lujiahao 
 * @date: 2019-10-30 17:33:18 
 */
class ChildXfyt extends fairygui.GComponent implements IPanel {

    //>>>>start
    public loaderBg: fairygui.GLoader;
    public tfDate: fairygui.GRichTextField;
    public btnCheck: fairygui.GButton;
    public item0: XfytStepItem;
    public item1: XfytStepItem;
    public item2: XfytStepItem;
    public item3: XfytStepItem;
    public item4: XfytStepItem;
    public item14: XfytStepItem;
    public item13: XfytStepItem;
    public item12: XfytStepItem;
    public item11: XfytStepItem;
    public item10: XfytStepItem;
    public item9: XfytStepItem;
    public item8: XfytStepItem;
    public item5: XfytStepItem;
    public item6: XfytStepItem;
    public item7: XfytStepItem;
    public arrow: fairygui.GImage;
    public tfCount: fairygui.GRichTextField;
    public tfDes: fairygui.GRichTextField;
    public pb: fairygui.GProgressBar;
    public btnRoll: Button1;
    public rollItem: RollItem;
    public tfRound: fairygui.GRichTextField;
    //>>>>end

    public static URL: string = "ui://n5noipr2vpqq0";

    /** 设置包名（静态属性） */
    public static pkg = "xfyt";
    /** 绑定ui的方法（静态方法） */
    public static setExtends() {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        let f = fairygui.UIObjectFactory.setPackageItemExtension;
        // f(ChildXfyt.URL, ChildXfyt);
        f(XfytStepItem.URL, XfytStepItem);
        f(RollItem.URL, RollItem);
    }

    public static createInstance(): ChildXfyt {
        return <ChildXfyt><any>(fairygui.UIPackage.createObject("xfyt", "ChildXfyt"));
    }

    private _curActVo: Vo_Activity;
    private _stepItemList: XfytStepItem[] = [];
    /** 当前所处的pos */
    private _curPos = 1;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        for (let i = 0; i < EnumXfyt.POS_COUNT; i++) {
            t._stepItemList.push(t["item" + i]);
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

        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_XFYT);

        this.tfDate.text = "";
        this._curActVo = pData;
        t.refreshData();
        IconUtil.setImg(t.loaderBg, Enum_Path.BACK_URL + "xfyt_bg.jpg");
    }

    closePanel(pData?: any) {
        let t = this;
        t.playRollMc(false);
        t.showArrowNormalMv(false);
        t._isMoving = false;
        t.registerEvent(false);
        Timer.instance.remove(t.onDateUpdate, t);
        IconUtil.setImg(t.loaderBg, null);
    }

    public dispose() {
        let t = this;
        super.dispose();
    }

    //=========================================== API ==========================================
    //===================================== private method =====================================
    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelXfyt;
        let t_info = t_model.info;
        t.refreshItemData(true);

        let t_item = t.getStepItemByPos(t_info.pos);
        t._curPos = t_info.pos;
        if (t_item) {
            t.arrow.x = t_item.x + t_item.width / 2;
            t.arrow.y = t_item.y;
        }
        t.showArrowNormalMv(true);

        t.btnCheck.selected = !t_model.isPlayMc;

        let t_limit = t_model.rollTimesLimit;
        let t_hasTimes = t_model.hadRollCount;
        if (t_hasTimes >= t_limit) {
            t.tfCount.text = `已达到摇骰次数上限，上限为${t_limit}次`;
            t.btnRoll.grayed = true;
        }
        else {
            t.btnRoll.grayed = false;
            let t_color = Color.GREENSTR;
            if (t_model.remain <= 0)
                t_color = Color.REDSTR;
            let t_countStr = HtmlUtil.font(t_model.remain + "", t_color);
            t.tfCount.text = `剩余摇骰次数：${t_countStr}`;
        }

        let t_maxValue = t_model.maxChargeValue;
        t.pb.max = t_maxValue
        t.pb.value = t_model.curChangeValue;

        t.tfDes.text = `每消费<font color='#ffff00'>${t_maxValue}元宝</font>可摇骰一次`;

        t.playRollMc(false);

        t.btnRoll.noticeImg.visible = GGlobal.reddot.checkCondition(UIConst.ACTCOM_XFYT);

        if (!Timer.instance.has(this.onDateUpdate, this))
            Timer.instance.listen(this.onDateUpdate, this);
    }

    /** 刷新时间 */
    private onDateUpdate() {
        let t_dateStr = "";
        if (this._curActVo) {
            let t_end = this._curActVo.end; //s
            const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s

            // let t_hh = new Date(t_end*1000);
            // let t_now = new Date(servTime * 1000);
            // console.log("=================================", t_hh);
            // console.log("=================================", t_now);
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

    private refreshItemData(pInit: boolean) {
        let t = this;
        let t_model = GGlobal.modelXfyt;
        let t_info = t_model.info;
        let t_dataList = t_model.getCurCfgRollList();
        for (let i = 0; i < t_dataList.length; i++) {
            let t_item = t._stepItemList[i];
            if (t_item) {
                t_item.setData(t_dataList[i], pInit);
            }
        }
        if (t_model.totolStep == 0)
            var t_rounds = 1;
        else
            t_rounds = Math.ceil(t_model.totolStep / EnumXfyt.POS_COUNT);
        t.tfRound.text = `第${t_rounds}圈`;
    }

    private getStepItemByPos(pPos: number): XfytStepItem {
        return this._stepItemList[pPos - 1];
    }

    private _mc: Part;
    private playRollMc(pFlag: boolean) {
        let t = this;
        let t_model = GGlobal.modelXfyt;
        if (pFlag) {
            if (t._isMoving)
                return;
            t._isMoving = true;
            if (!t._mc) {
                t._mc = EffectMgr.addEff("uieff/10034", t.displayListContainer, t.rollItem.x + t.rollItem.width / 2, t.rollItem.y + t.rollItem.height / 2, 200, 600, true);
                t._mc.refKey = "_mc";
                t._mc.refThis = t;
            }
            Timer.instance.callLater(t.runAfterMc, 650, t);
            t.rollItem.visible = false;
        }
        else {
            if (Timer.instance.has(t.runAfterMc, t))
                Timer.instance.remove(t.runAfterMc, t);
            if (t._mc)
                EffectMgr.instance.removeEff(t._mc);

            t.rollItem.visible = true;
            if (t_model.step > 0)
                t.rollItem.indexCtrl.selectedIndex = t_model.step;
            else
                t.rollItem.indexCtrl.selectedIndex = 6;
        }
    }

    private runAfterMc() {
        let t = this;
        let t_model = GGlobal.modelXfyt;
        t.playRollMc(false);
        t.moveArrow(t_model.step);
    }

    private showArrowNormalMv(pFlag: boolean) {
        let t = this;
        let t_model = GGlobal.modelXfyt;
        if (pFlag) {
            egret.Tween.removeTweens(t.arrow);

            let t_item = t.getStepItemByPos(t._curPos);
            if (t_item) {
                t.arrow.x = t_item.x + t_item.width / 2;
                t.arrow.y = t_item.y;
            }

            let tw = egret.Tween.get(t.arrow, { loop: true });

            tw.to({ y: t.arrow.y - 20 }, 200).wait(50).to({ y: t.arrow.y }, 200);
        }
        else {
            egret.Tween.removeTweens(t.arrow);
        }
    }

    private _totolStep = 0;
    private _passStep = 0;
    private _isMoving = false;
    private moveArrow(pStep: number) {
        let t = this;
        if (pStep < 1)
            return;
        t._totolStep = pStep;
        t._passStep = 0;
        t.showArrowNormalMv(false); //停止站立的动画
        t.playStep();
    }

    private playStep() {
        let t = this;
        if (!t._isMoving)
            return;
        if (t._passStep < t._totolStep) {
            let tw = egret.Tween.get(t.arrow);

            let t_curItem = t.getStepItemByPos(t._curPos);
            let t_nextPos = t.calPos(t._curPos + 1);
            let t_nextItem = t.getStepItemByPos(t_nextPos);


            tw.to({ x: t_curItem.x + t_curItem.width / 2 + ((t_nextItem.x + t_nextItem.width / 2) - (t_curItem.x + t_curItem.width / 2)) / 2, y: Math.min(t_curItem.y, t_nextItem.y) - 50 }, 200)
                .to({ x: t_nextItem.x + t_nextItem.width / 2, y: t_nextItem.y }, 200).call(() => {
                    t._curPos = t_nextPos;
                    t._passStep++;

                    if (t._curPos != 1) {
                        let t_tempItem = t.getStepItemByPos(t._curPos);
                        t_tempItem.hideItemIcon();
                        AnimationUtil.gridToBag([t_tempItem.imgIcon], [t_tempItem.getData().rewardItem], 500, false);
                    }
                    else {
                        //走到起点需要重置奖品的显示
                        t.refreshItemData(false);
                    }

                    egret.callLater(() => {
                        t.playStep();
                    }, t);
                }, t);
        }
        else {
            //全部步数走完
            t.showArrowNormalMv(true);
            t._isMoving = false;
            t.refreshData();
        }
    }

    private calPos(pTarget: number): number {
        let t_result = pTarget % EnumXfyt.POS_COUNT;
        if (t_result == 0)
            return EnumXfyt.POS_COUNT;
        else
            return t_result;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.XFYT_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.XFYT_ROLL_SUCCESS, t.onRollSuccess, t);

        EventUtil.register(pFlag, t.btnRoll, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCheck, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnRoll:
                if (t._isMoving)
                    return;
                GGlobal.modelXfyt.CG_RollDice_rolldice_10021();
                break;
            case t.btnCheck:
                GGlobal.modelXfyt.isPlayMc = !t.btnCheck.selected;
                break;
        }
    }

    private onUpdate() {
        let t = this;
        t.refreshData();
    }

    private onRollSuccess() {
        let t = this;
        let t_model = GGlobal.modelXfyt;
        if (t_model.isPlayMc) {
            t.playRollMc(true); //播放动画
        }
        else {
            let t_resultList = t_model.resultList;
            View_Reward_Show4.show(UIConst.ACTCOM_XFYT, "再來一次", Handler.create(t, () => {
                GGlobal.modelXfyt.CG_RollDice_rolldice_10021();
            }), t_resultList, () => {
                let t_color = Color.GREENSTR;
                if (t_model.remain <= 0)
                    t_color = Color.REDSTR;
                let t_countStr = HtmlUtil.font(t_model.remain + "", t_color);
                return `剩余摇骰次数：${t_countStr}`;
            }, t);
            t.refreshData(); //跳过动画
        }
    }
}