/**
 * @author: lujiahao 
 * @date: 2020-02-20 13:54:36 
 */
class ChildGGL extends fairygui.GComponent implements IPanel {

    //>>>>start
    public btnHelp: fairygui.GButton;
    public tfDate: fairygui.GRichTextField;
    public itemList: fairygui.GList;
    public grid: GGLGridView;
    public tfDes: fairygui.GRichTextField;
    public graph: fairygui.GGraph;
    public layerTouch: fairygui.GGraph;
    public panelBuy: GGLBuyPanel;
    public btnRate: fairygui.GButton;
    //>>>>end

    public static URL: string = "ui://wnqj5rwkloxz6";

    /** 设置包名（静态属性） */
    public static pkg = "ggl";
    /** 绑定ui的方法（静态方法） */
    public static setExtends() {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        let f = fairygui.UIObjectFactory.setPackageItemExtension;
        // f(ChildGGL.URL, ChildGGL);
        f(GGLItem.URL, GGLItem);
        f(GGLGridView.URL, GGLGridView);
        f(GGLBuyPanel.URL, GGLBuyPanel);
    }

    public static createInstance(): ChildGGL {
        return <ChildGGL><any>(fairygui.UIPackage.createObject("ggl", "ChildGGL"));
    }

    public constructor() {
        super();
    }

    private _curActVo: Vo_Activity;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();

        t.graph.graphics.beginFill(0xffffff);
        t.graph.graphics.drawRect(0, 0, 100, 100);
        t.graph.graphics.endFill();
        t.graph.graphics.clear();

        t.grid.mask = t.graph.displayObject;
    }

    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    }

    openPanel(pData?: any) {
        let t = this;
        t.registerEvent(true);

        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_GGL);

        this.tfDate.text = "";
        this._curActVo = pData;

        t.refreshData();
        t.itemList.scrollToView(0);
    }

    closePanel(pData?: any) {
        let t = this;
        t.registerEvent(false);
        t.registerTouchEvent(false);
        t.newTempPoint(false);
        Timer.instance.remove(t.onDateUpdate, t);
        t.graph.graphics.clear();
        t.itemList.numItems = 0;
        SimpleTimer.ins().removeTimer(t.onTime2CheckOk, t);
    }
    //=========================================== API ==========================================
    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: ViewGridRender) {
        let t = this;
        // pItem.isShowEff = true;
        // pItem.tipEnabled = true;
        let t_model = GGlobal.modelGGL;
        let t_list = t_model.getVoList();
        if (t_list) {
            let t_vo = t_list[pIndex];
            if (t_vo) {
                pItem.vo = t_list[pIndex].itemVo;
                pItem.lbName.visible = false;
                if (t_vo.cfg.dj) {
                    pItem.isShowExtra(5);
                }
                else {
                    pItem.isShowExtra(0);
                }
            }
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelGGL;

        let t_list = t_model.getVoList();
        t.itemList.numItems = t_list.length;

        if (t_model.rewardList.length > 0) {
            t.setState(1);
        }
        else {
            t.setState(0);
        }

        if (!Timer.instance.has(this.onDateUpdate, this))
            Timer.instance.listen(this.onDateUpdate, this);

        // //test
        // t.setState(1);
    }

    private _state = 0;
    private setState(pSate: number) {
        let t = this;
        switch (pSate) {
            case 0: //未抽奖状态
                t.panelBuy.openPanel();
                t.grid.clear();
                t.showOrHideCards(false);
                t.clearPMap();
                break;
            case 1: //抽奖未刮奖状态
                t.grid.showData();
                t.panelBuy.closePanel();
                t.showOrHideCards(false);
                t.clearPMap();
                break;
            case 2: //刮奖后展示奖励状态
                t.showOrHideCards(true);
                t.grid.showEffect(true);
                SimpleTimer.ins().addTimer(t.onShowRewardComplete, t, 2000, 1);
                break;
        }
        t._state = pSate;
    }

    private onShowRewardComplete() {
        let t = this;
        let t_model = GGlobal.modelGGL;
        if (t_model.freeCount <= 0) {
            View_Reward_Show5.show(UIConst.ACTCOM_GGL, "再买一次", Handler.create(t, () => {
                t.refreshData();
                t_model.CG_ScratchTicket_draw_11791();
            }), [t_model.rewardVo.itemVo], EnumGGL.CONSUME_ID, 1, null, null, Handler.create(t, () => {
                t.refreshData();
            }));
        }
        else {
            View_Reward_Show5.show(UIConst.ACTCOM_GGL, "再买一次", Handler.create(t, () => {
                t.refreshData();
                t_model.CG_ScratchTicket_draw_11791();
            }), [t_model.rewardVo.itemVo], EnumGGL.CONSUME_ID, 0, null, null, Handler.create(t, () => {
                t.refreshData();
            }));
        }
    }

    /** 显示或隐藏刮刮卡 */
    private showOrHideCards(pFlag: boolean) {
        let t = this;
        if (pFlag) {
            // t.graph.alpha = 0.3;
            t.grid.mask = null;
            t.graph.visible = false;
        }
        else {
            // t.graph.alpha = 1;
            t.grid.mask = t.graph.displayObject;
            t.graph.visible = true;
            t.graph.graphics.clear();
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

    private newTempPoint(pFlag: boolean) {
        let t = this;
        if (pFlag) {
            if (!t._tempPoint) {
                t._tempPoint = egret.Point.create(0, 0);
            }
        }
        else {
            if (t._tempPoint) {
                egret.Point.release(t._tempPoint);
                t._tempPoint = null;
            }
        }
    }

    private _pMap = {};
    /** 检测是否刮出所有奖励 */
    private checkPainOk(): boolean {
        let t = this;
        let t_itemList = t.grid.itemList;
        let t_total = 0;
        let t_ok = 0;
        let t_tempP = egret.Point.create(0, 0);
        for (let i = 0; i < t_itemList.length; i++) {
            let t_item = t_itemList[i];
            for (let j = 0; j < t_item.pointList.length; j++) {
                let t_key = StringUtil.combinKey([i, j]);
                t_total++;
                if (t._pMap[t_key]) {
                    t_ok++;
                    continue;
                }
                let t_point = t_item.pointList[j];
                t_item.localToGlobal(t_point.x, t_point.y, t_tempP);
                if (t.graph.displayObject.hitTestPoint(t_tempP.x, t_tempP.y, true)) {
                    t._pMap[t_key] = true;
                    t_ok++;
                }
                else {
                }
            }
        }
        if (t_ok >= t_total - 2) {
            return true;
        }
        else
            return false;
    }

    private clearPMap() {
        let t = this;
        t._pMap = {};
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.GGL_UPDATE, t.onUpdate, t);

        EventUtil.register(pFlag, t.btnHelp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnRate, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.layerTouch, egret.TouchEvent.TOUCH_BEGIN, t.onTouchBegin, t)
    }

    private registerTouchEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.layerTouch, egret.TouchEvent.TOUCH_MOVE, t.onTouchMove, t);
        EventUtil.register(pFlag, t.layerTouch, egret.TouchEvent.TOUCH_END, t.onTouchEnd, t);
    }
    //======================================== handler =========================================
    private onUpdate() {
        let t = this;
        let t_model = GGlobal.modelGGL;
        if (t_model.rewardList.length < 1 && t._state == 1) {
            //在刮奖状态下，奖励置空，则播放奖励领取的动画
            t.setState(2);
        }
        else {
            t.refreshData();
        }
    }

    private _tempPoint: egret.Point;
    private onTouchBegin(e: egret.TouchEvent) {
        let t = this;
        if (t._state != 1)
            return;
        t.registerTouchEvent(true);
        t.newTempPoint(true);
        t.layerTouch.globalToLocal(e.stageX, e.stageY, t._tempPoint);
        t.graph.graphics.lineStyle(95, 0xffffff);
        t.graph.graphics.moveTo(t._tempPoint.x, t._tempPoint.y);

        SimpleTimer.ins().addTimer(t.onTime2CheckOk, t, 600, 0);
    }

    private onTime2CheckOk() {
        let t = this;
        let t_model = GGlobal.modelGGL;
        if (t.checkPainOk()) {
            t_model.CG_ScratchTicket_getReward_11793();
            t.registerTouchEvent(false);
            t.newTempPoint(false);
            SimpleTimer.ins().removeTimer(t.onTime2CheckOk, t);
        }
    }

    private onTouchMove(e: egret.TouchEvent) {
        let t = this;
        t.newTempPoint(true);
        t.layerTouch.globalToLocal(e.stageX, e.stageY, t._tempPoint);
        t.graph.graphics.lineTo(t._tempPoint.x, t._tempPoint.y);
    }

    private onTouchEnd(e: egret.TouchEvent) {
        let t = this;

        t.registerTouchEvent(false);
        t.newTempPoint(false);

        let t_model = GGlobal.modelGGL;
        if (t.checkPainOk()) {
            t_model.CG_ScratchTicket_getReward_11793();
        }
        else {
        }
        SimpleTimer.ins().removeTimer(t.onTime2CheckOk, t);
    }

    private _flag = false;
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnHelp:
                GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_GGL);
                // //test
                // t._flag = !t._flag;
                // t.grid.showEffect(t._flag);
                break;
            case t.btnRate:
                GGlobal.layerMgr.open(UIConst.GAILV, 13);
                break;
        }
    }
}