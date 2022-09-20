/**
 * @author: lujiahao 
 * @date: 2020-04-07 16:14:13 
 */
class ChildXyfq extends fairygui.GComponent implements IPanel {

    //>>>>start
    public loaderBg: fairygui.GLoader;
    public tfDate: fairygui.GRichTextField;
    public btnHelp: fairygui.GButton;
    public btnTen: Button1;
    public btnOne: Button0;
    public btnHC: Button2;
    public btnTarget: Button2;
    public btnRank: Button2;
    public btnReward: Button2;
    public item0: QianItem;
    public item1: QianItem;
    public item2: QianItem;
    public item3: QianItem;
    public item4: QianItem;
    public resComOne: ViewResource2;
    public resComTen: ViewResource2;
    public btnCheck: fairygui.GButton;
    public tempQian: fairygui.GLoader;
    public mc: fairygui.Transition;
    //>>>>end

    public static URL: string = "ui://7hwmix0gbnyp0";

    /** 设置包名（静态属性） */
    public static pkg = "xyfq";
    /** 绑定ui的方法（静态方法） */
    public static setExtends() {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        let f = fairygui.UIObjectFactory.setPackageItemExtension;
        // f(ChildXyfq.URL, ChildXyfq);
        f(QianItem.URL, QianItem);
        // f(ViewQianUse.URL, ViewQianUse);
        // f(ViewRankXyfq.URL, ViewRankXyfq);
        f(XyfqItemRank.URL, XyfqItemRank);
        // f(ViewTaskXyfq.URL, ViewTaskXyfq);
        f(XyfqItemTask.URL, XyfqItemTask);
        // f(ViewRewardXyfq.URL, ViewRewardXyfq);
        f(XyfqRewardItem.URL, XyfqRewardItem);
        // f(ViewCompoundXyfq.URL, ViewCompoundXyfq);
        f(QianItemGrid.URL, QianItemGrid);
        f(XyfqCompItem.URL, XyfqCompItem);
    }

    public static createInstance(): ChildXyfq {
        return <ChildXyfq><any>(fairygui.UIPackage.createObject("xyfq", "ChildXyfq"));
    }

    public constructor() {
        super();
    }

    private _curActVo: Vo_Activity;
    private _qianItemList: QianItem[] = [];
    private _loaderQianPool: fairygui.GLoader[] = [];

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.mc = t.getTransition("mc");

        let t_model = GGlobal.modelXyfq;
        t_model.setup();

        for (let i = 0; i < 5; i++) {
            let t_item = t.getChild("item" + i);
            if (t_item)
                t._qianItemList.push(<QianItem>t_item);
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

        GGlobal.modelActivity.CG_OPENACT(UIConst.XYFQ);

        t.tfDate.text = "";

        t._curActVo = pData;
        t.refreshData();

        IconUtil.setImg(t.loaderBg, Enum_Path.BACK_URL + "xyfq_bg.jpg");
    }

    closePanel(pData?: any) {
        let t = this;
        t.registerEvent(false);
        t.cleanQainList();
        SimpleTimer.ins().removeTimer(t.startFly, t);
        t.playQianFly(false);
        t._waiteList.length = 0; //清空动画抽签数据列表
        IconUtil.setImg(t.loaderBg, null);
        Timer.instance.remove(t.onDateUpdate, t);
    }
    //=========================================== API ==========================================
    //===================================== private method =====================================
    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        if (t._curActVo) {
            if (!Timer.instance.has(t.onDateUpdate, t))
                Timer.instance.listen(t.onDateUpdate, t);

            t.btnCheck.selected = !t_model.isPlayMc;

            t.refreshQianList();
            t.refreshConsume();
        }
        else {
        }
    }

    /** 刷新签数据 */
    private refreshQianList() {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        let t_dataList = t_model.getQianVoList();

        for (let i = 0; i < t._qianItemList.length; i++) {
            let t_item = t._qianItemList[i];
            t_item.setData(t_dataList[i]);
        }
    }

    private cleanQainList() {
        let t = this;
        for (let v of t._qianItemList) {
            v.clean();
        }
    }

    private refreshConsume() {
        let t = this;
        if (!t._curActVo)
            return;
        let t_model = GGlobal.modelXyfq;
        {
            t.resComOne.setItemId(t_model.consumeOne.id);
            let t_bagCount = FastAPI.getItemCount(t_model.consumeOne.id);
            let t_need = t_model.consumeOne.count;
            let t_color = Color.GREENSTR;
            if (t_need > t_bagCount)
                t_color = Color.REDSTR;
            t.resComOne.setCount(HtmlUtil.font(t_need + "", t_color));
        }
        {
            t.resComTen.setItemId(t_model.consumeTen.id);
            let t_bagCount = FastAPI.getItemCount(t_model.consumeTen.id);
            let t_need = t_model.consumeTen.count;
            let t_color = Color.GREENSTR;
            if (t_need > t_bagCount)
                t_color = Color.REDSTR;
            t.resComTen.setCount(HtmlUtil.font(t_need + "", t_color));
        }
    }

    private playMc(pFlag: boolean) {
        let t = this;
        if (pFlag) {
            t.mc.play(t.onMcComplete, t, null, 2);
        }
        else {
            t.mc.stop();
        }
    }

    private onMcComplete() {
        let t = this;
        //播放逐个签loader飞到下面的动画
        t.playQianFly(true);
    }

    private playQianFly(pFlag: boolean) {
        let t = this;
        if (pFlag) {
            if (!SimpleTimer.ins().isRunning(t.startFly, t))
                SimpleTimer.ins().addTimer(t.startFly, t, 100, 0, null, true);
        }
        else {
            SimpleTimer.ins().removeTimer(t.startFly, t);
            t._waiteList.length = 0;
            for (let k in t._flyMap) {
                let t_loader: fairygui.GLoader = t._flyMap[k];
                egret.Tween.removeTweens(t_loader);
                t.recycleLoader(t_loader);
            }
        }
    }

    private startFly() {
        let t = this;
        if (t._waiteList.length < 1)
            SimpleTimer.ins().removeTimer(t.startFly, t);

        let t_id = t._waiteList.shift();
        if (t_id) {
            let t_loader = t.getLoaderFromPool();
            // t_loader.setXY(0, t.tempQian.y);
            // t_loader.setPivot(0.45, 0.5, true);
            t_loader.setXY(t.tempQian.x - 30, t.tempQian.y + 40);

            let t_posId = t_id % 10;
            t_loader.url = CommonManager.getUrl("xyfq", `qian_${t_posId}`);

            let t_targetItem = t.getTargetItemById(t_id);
            t_targetItem.parent.addChild(t_loader)

            t._flyMap[t_loader.hashCode] = t_loader;
            egret.Tween.removeTweens(t_loader);
            let tw = egret.Tween.get(t_loader);
            tw.to({ y: t_loader.y - 100 }, 100)
                .to({ x: t_targetItem.x - 60, y: t_targetItem.y - 30 }, 500).call(() => {
                    t_targetItem.addCount(1);
                    t.recycleLoader(t_loader);
                }, t);
        }
    }

    private getTargetItemById(pId: number): QianItem {
        let t = this;
        let t_posId = pId % 10;
        return t._qianItemList[t._qianItemList.length - t_posId];
    }

    private getLoaderFromPool(): fairygui.GLoader {
        let t = this;
        let t_loader = t._loaderQianPool.pop();
        if (!t_loader) {
            t_loader = new fairygui.GLoader();
            t_loader.rotation = t.tempQian.rotation;
            t_loader.touchable = false;
        }
        return t_loader;
    }

    private recycleLoader(pLoader: fairygui.GLoader) {
        let t = this;
        delete t._flyMap[pLoader.hashCode];
        pLoader.removeFromParent();
        pLoader.url = null;
        t._loaderQianPool.push(pLoader);
    }

    /** 刷新时间 */
    private onDateUpdate() {
        let t = this;
        let t_dateStr = "";
        if (t._curActVo) {
            let t_end = t._curActVo.end; //s
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
        t.tfDate.text = t_dateStr;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.XYFQ_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.XYFQ_DRAW_SUCCESS, t.onDrawSuccess, t);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);

        EventUtil.register(pFlag, t.btnHC, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnHelp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnTarget, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnRank, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnOne, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnTen, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCheck, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);

        for (let v of t._qianItemList) {
            EventUtil.register(pFlag, v, egret.TouchEvent.TOUCH_TAP, t.onQianItemClick, t);
        }

        if (pFlag) {
            ReddotMgr.ins().register(ReddotEnum.VALUE_XYFQ_CAN_COMP, t.btnHC.noticeImg);
            ReddotMgr.ins().register(ReddotEnum.GROUP_XYFQ_TASK, t.btnTarget.noticeImg);
        }
        else {
            ReddotMgr.ins().unregister(t.btnHC.noticeImg);
            ReddotMgr.ins().unregister(t.btnTarget.noticeImg);
        }
    }
    //======================================== handler =========================================
    private onBagUpdate() {
        let t = this;
        t.refreshConsume();
    }

    private onUpdate() {
        let t = this;
        t.refreshData();
    }

    private _flyMap: { [ukey: number]: fairygui.GLoader } = {};
    private _waiteList: number[] = [];
    /** 抽签成功处理 */
    private onDrawSuccess(pDataList: number[][]) {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        t.refreshConsume(); //先刷新消耗显示

        if (pDataList) {
            for (let v of pDataList) {
                let t_id = v[0];
                let t_count = v[1];
                for (let i = 0; i < t_count; i++) {
                    t._waiteList.push(t_id);
                }
            }
        }
        if (t_model.isPlayMc) {
            //播放抽签成功动画
            t.playMc(true);
        }
        else {
            t.playQianFly(true);
        }
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        switch (e.currentTarget) {
            case t.btnHelp:
                GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.XYFQ);
                break;
            case t.btnHC:
                t.playQianFly(false);
                t.refreshQianList(); //开启标签停止动画，强制刷新签数量
                GGlobal.layerMgr.open(UIConst.XYFQ_COMPOUND);
                break;
            case t.btnTarget:
                GGlobal.layerMgr.open(UIConst.XYFQ_TASK);
                break;
            case t.btnReward:
                GGlobal.layerMgr.open(UIConst.XYFQ_REWARD);
                break;
            case t.btnRank:
                GGlobal.layerMgr.open(UIConst.XYFQ_RANK);
                break;
            case t.btnOne:
                t_model.CG_LuckSign_draw_12151(1);
                // t.playMc(true);
                // t.onDrawSuccess(
                //     [
                //         [448001, 2],
                //         [448002, 4],
                //         [448003, 1],
                //         [448004, 3],
                //         [448005, 5],
                //     ]);
                break;
            case t.btnTen:
                t_model.CG_LuckSign_draw_12151(2);
                // t.playMc(false);
                // t.playQianFly(false);
                break;
            case t.btnCheck:
                t_model.isPlayMc = !t.btnCheck.selected;
                break;
        }
    }

    private onQianItemClick(e: egret.TouchEvent) {
        let t = this;
        let t_item: QianItem = e.currentTarget;
        if (t_item && t_item.curData) {
            t.playQianFly(false);
            t.refreshQianList(); //开启标签停止动画，强制刷新签数量
            GGlobal.layerMgr.open(UIConst.XYFQ_QIAN_USE, t_item.curData);
        }
    }
}