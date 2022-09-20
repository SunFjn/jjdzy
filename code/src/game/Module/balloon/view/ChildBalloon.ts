/**
 * @author: lujiahao 
 * @date: 2019-10-31 21:12:05 
 */
class ChildBalloon extends fairygui.GComponent implements IPanel {

    //>>>>start
    public loaderBg: fairygui.GLoader;
    public tfDate: fairygui.GRichTextField;
    public tfCount: fairygui.GRichTextField;
    public tfDes: fairygui.GRichTextField;
    public pb: fairygui.GProgressBar;
    public itemList: fairygui.GList;
    public ball0: BallloonItem;
    public ball1: BallloonItem;
    public ball2: BallloonItem;
    public ball3: BallloonItem;
    public ball4: BallloonItem;
    public ball5: BallloonItem;
    public ball6: BallloonItem;
    public ball7: BallloonItem;
    public ball8: BallloonItem;
    public ball9: BallloonItem;
    public ball10: BallloonItem;
    public ball11: BallloonItem;
    //>>>>end

    public static URL: string = "ui://i1mp7ufxwuwj0";

    /** 设置包名（静态属性） */
    public static pkg = "balloon";
    /** 绑定ui的方法（静态方法） */
    public static setExtends() {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        let f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(BallViewGrid.URL, BallViewGrid);
        // f(ChildBalloon.URL, ChildBalloon);
        f(BallloonItem.URL, BallloonItem);
    }

    public static createInstance(): ChildBalloon {
        return <ChildBalloon><any>(fairygui.UIPackage.createObject("balloon", "ChildBalloon"));
    }

    private _curActVo: Vo_Activity;
    private _ballList: BallloonItem[] = [];

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        for (let i = 0; i < 12; i++) {
            let t_ball: BallloonItem = t["ball" + i];
            if (t_ball) {
                t._ballList.push(t_ball);
                t_ball.indexId = i + 1;
            }
        }

        // t.itemList.setVirtualAndLoop();
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();

    }


    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    }

    openPanel(pData?: any) {
        let t = this;
        t.registerEvent(true);

        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_BALLOON);

        for (let v of t._ballList) {
            //重置数据
            v.setData(null);
        }

        this.tfDate.text = "";
        this._curActVo = pData;
        t.refreshData();
        IconUtil.setImg1(Enum_Path.BACK_URL + "xfyt_bg.jpg", t.loaderBg);
    }

    closePanel(pData?: any) {
        let t = this;
        Timer.instance.remove(t.onDateUpdate, t);
        // Timer.instance.remove(t.onScroll, t);
        t.itemList.numItems = 0;
        t.registerEvent(false);
        IconUtil.setImg1(null, t.loaderBg);
    }

    public dispose() {
        let t = this;
        super.dispose();
    }
    //=========================================== API ==========================================
    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: BallViewGrid) {
        let t = this;
        let t_model = GGlobal.modelBalloon;
        let t_list = t_model.getRewardListByQs(t_model.curQs);
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelBalloon;
        if (t._curActVo) {
            for (let v of t._ballList) {
                let t_vo = t_model.getVoById(v.indexId);
                v.setData(t_vo);
            }

            let t_max = t_model.getMaxValue();
            let t_value = t_model.curChangeValue;
            t.pb.max = t_max;
            t.pb.value = t_value;

            if (t_max > t_value) {
                let t_diff = t_max - t_value;
                t.tfDes.text = `再消费<font color='#ffff00'>${t_diff}元宝</font>可获得1颗子弹`;
            }
            else {
                t.tfDes.text = "子弹数量已达上限";
            }

            t.refreshRemainCount();
            t.refreshRewardList();

            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }
        else {
        }
    }

    /** 刷新剩余次数 */
    private refreshRemainCount() {
        let t = this;
        let t_remain = GGlobal.modelBalloon.remain;
        let t_reddot = false;
        if (t_remain < 1) {
            var t_color = Color.REDSTR;
        }
        else {
            t_color = Color.GREENSTR;
            t_reddot = true;
        }
        t.tfCount.text = "剩余子弹：" + HtmlUtil.font(ConfigHelp.reTxt("{0}", t_remain), t_color);

        //设置卡牌的红点
        for (let v of t._ballList) {
            if (t_reddot && !v.curVo.rewardItem) {
                v.noticeImg.visible = true;
            }
            else {
                v.noticeImg.visible = false;
            }
        }
    }

    private refreshRewardList() {
        let t = this;
        let t_model = GGlobal.modelBalloon;
        let t_rewardList = t_model.getRewardListByQs(t_model.curQs);
        t.itemList.numItems = t_rewardList.length;
        // if (!Timer.instance.has(t.onScroll, t))
        //     Timer.instance.listen(t.onScroll, t, 100);
    }

    private getBallItemByPos(pPos: number): BallloonItem {
        return this._ballList[pPos - 1];
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

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.BALLOON_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.BALLOON_SUCCESS, t.onSuccess, t);

        EventUtil.register(pFlag, t.itemList, egret.TouchEvent.TOUCH_BEGIN, t.onScrollClickBegin, t);
        EventUtil.register(pFlag, t.itemList, egret.TouchEvent.TOUCH_END, t.onScrollClickEnd, t);

        for (let v of t._ballList) {
            EventUtil.register(pFlag, v, egret.TouchEvent.TOUCH_TAP, t.onItemClick, t);
        }
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

    private onItemClick(e: egret.TouchEvent) {
        let t_ballItem: BallloonItem = e.currentTarget as BallloonItem;
        if (t_ballItem) {
            t_ballItem.handleClick(e);
        }
    }

    private onUpdate() {
        let t = this;
        t.refreshData();
    }

    private onSuccess(pData: { id: number }) {
        let t = this;
        if (!pData)
            return;
        let t_vo = GGlobal.modelBalloon.getVoById(pData.id);
        if (t_vo) {
            let t_ballItem = t.getBallItemByPos(t_vo.id)
            if (t_ballItem) {
                t_ballItem.setData(t_vo, true); //播放动画
            }
            t.refreshRemainCount();
            t.refreshRewardList();
        }
    }
}
