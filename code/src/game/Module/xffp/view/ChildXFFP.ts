/**
 * 消费翻牌面板
 * @author: lujiahao 
 * @date: 2019-09-07 11:34:44 
 */
class ChildXFFP extends fairygui.GComponent implements IPanel {

    //>>>>start
	public pbCtrl: fairygui.Controller;
	public tfMax: fairygui.GRichTextField;
	public itemList: fairygui.GList;
	public tfCount: fairygui.GRichTextField;
	public tfDes: fairygui.GRichTextField;
	public pb: fairygui.GProgressBar;
	public card0: XFFPCardItem;
	public card1: XFFPCardItem;
	public card2: XFFPCardItem;
	public card3: XFFPCardItem;
	public card4: XFFPCardItem;
	public card5: XFFPCardItem;
	public tfDate: fairygui.GRichTextField;
	public imageBig0: fairygui.GImage;
	public imageBig1: fairygui.GImage;
	public imageBig2: fairygui.GImage;
	public imageBig3: fairygui.GImage;
	public imageBig4: fairygui.GImage;
	public imageBig5: fairygui.GImage;
	public imageGet0: fairygui.GImage;
	public imageGet1: fairygui.GImage;
	public imageGet2: fairygui.GImage;
	public imageGet3: fairygui.GImage;
	public imageGet4: fairygui.GImage;
	public imageGet5: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://791nthw5p8zd0";

    /** 设置包名（静态属性） */
    public static pkg = "xffp";
    /** 绑定ui的方法（静态方法） */
    public static setExtends() {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        fairygui.UIObjectFactory.setPackageItemExtension(XFFPCardItem.URL, XFFPCardItem);
    }

    private _cardList: XFFPCardItem[] = [];
    private _curActVo: Vo_Activity;
    private _rewardVoList: VoXffpReward[];
    private _iamgeGetList: fairygui.GImage[] = [];
    private _imageBigList: fairygui.GImage[] = [];

    public static createInstance(): ChildXFFP {
        return <ChildXFFP><any>(fairygui.UIPackage.createObject("xffp", "ChildXFFP"));
    }

    public constructor() {
        super();
    }

    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);

        this.itemList.itemRenderer = this.onItemRender;
        this.itemList.callbackThisObj = this;
        // this.itemList.setVirtual();
    }

    openPanel(pData?: any) {
        this.registerEvent(true);

        GGlobal.modelActivity.CG_OPENACT(UIConst.XFFP);

        let t = this;
        for (let v of t._cardList) {
            //重置卡牌数据
            v.setData(null);
        }

        this.tfDate.text = "";

        this._curActVo = pData;
        this.refreshData();
    }

    closePanel(pData?: any) {
        let t = this;
        t.registerEvent(false);
        t.itemList.numItems = 0;
        Timer.instance.remove(t.onDateUpdate, t);
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);

        let t = this;
        for (let i = 0; i < 6; i++) {
            let t_card: XFFPCardItem = t['card' + i];
            if (t_card) {
                t._cardList.push(t_card);
                t_card.index = i;
            }
        }

        for (let i = 0; i < 6; i++) {
            let t_image: fairygui.GImage = t['imageGet' + i];
            if (t_image) {
                t._iamgeGetList.push(t_image);
                t_image.visible = false;
            }
        }

        for (let i = 0; i < 6; i++) {
            let t_image: fairygui.GImage = t["imageBig" + i];
            if (t_image) {
                t._imageBigList.push(t_image);
                t_image.visible = false;
            }
        }
    }

    //=========================================== API ==========================================
    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: ViewGrid) {
        let t_list = this._rewardVoList;
        if (t_list && t_list[pIndex] && t_list[pIndex].rewardList[0]) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex].rewardList[0];
        }
    }

    private refreshData() {
        if (this._curActVo) {
            this._rewardVoList = GGlobal.modelXFFP.getRewardVoListByQs(this._curActVo.qs);
            this.itemList.numItems = this._rewardVoList.length;

            for (let i = 0; i < this._rewardVoList.length; i++) {
                let t_vo = this._rewardVoList[i];
                let t_iamgeGet = this._iamgeGetList[i];
                t_iamgeGet.visible = t_vo.state ? true : false;

                let t_imageBig = this._imageBigList[i];
                t_imageBig.visible = t_vo.cfg.big > 0;

                //设置卡牌数据
                if (t_vo.index > -1) {
                    let t_card = this.getCardItemByIndex(t_vo.index);
                    if (t_card) {
                        t_card.setData(t_vo);
                    }
                }
            }

            let t_curPbId = GGlobal.modelXFFP.curPbId;
            if (t_curPbId == 0) //进度已满
                this.pbCtrl.selectedIndex = 1;
            else //进度未满
            {
                this.pbCtrl.selectedIndex = 0;

                let t_curPbVo = GGlobal.modelXFFP.getRewardVoById(t_curPbId);
                let t_curChargeValue = GGlobal.modelXFFP.curChargeValue;
                this.pb.value = t_curChargeValue;
                this.pb.max = t_curPbVo.ybValue;
            }

            this.refreshRemainCount();

            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }
        else {
            this._rewardVoList = null;
            this.itemList.numItems = 0;
            for (let v of this._iamgeGetList) {
                v.visible = false;
            }
            for (let v of this._imageBigList) {
                v.visible = false;
            }
        }
    }

    /** 刷新剩余次数 */
    private refreshRemainCount() {
        let t_remain = GGlobal.modelXFFP.remainFpCount;
        let t_reddot = false;
        if (t_remain < 1) {
            var t_color = Color.REDSTR;
        }
        else {
            t_color = Color.GREENSTR;
            t_reddot = true;
        }
        this.tfCount.text = "可翻牌次数：" + HtmlUtil.font(ConfigHelp.reTxt("{0}次", t_remain), t_color);

        //设置卡牌的红点
        for (let v of this._cardList) {
            if (t_reddot && !v.curVo) {
                v.noticeImg.visible = true;
            }
            else {
                v.noticeImg.visible = false;
            }
        }
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

    private showGetFlagById(pId: number) {
        if (this._rewardVoList) {
            for (let i = 0; i < this._rewardVoList.length; i++) {
                let t_vo = this._rewardVoList[i];
                if (t_vo.id == pId) {
                    this._iamgeGetList[i].visible = true;
                }
            }
        }
    }

    /**
     * 通过索引获取CardItem
     * @param pIndex 
     */
    private getCardItemByIndex(pIndex: number): XFFPCardItem {
        return this._cardList[pIndex];
    }

    private registerEvent(pFlag: boolean): void {
        GGlobal.control.register(pFlag, Enum_MsgType.XFFP_FLOP_SUCCESS, this.onFlopSuccess, this);
        GGlobal.control.register(pFlag, Enum_MsgType.XFFP_UPDATE, this.onUpdate, this);

        for (let v of this._cardList) {
            EventUtil.register(pFlag, v, egret.TouchEvent.TOUCH_TAP, this.onItemClick, this);
        }
    }
    //======================================== handler =========================================
    private onItemClick(e: egret.TouchEvent) {
        let t_card: XFFPCardItem = e.currentTarget as XFFPCardItem;
        if (t_card) {
            t_card.handleClick(e);
        }
    }

    private onUpdate() {
        this.refreshData();
    }

    /** 翻牌成功处理 */
    private onFlopSuccess(pData: { id: number }) {
        if (!pData)
            return;
        let t_vo = GGlobal.modelXFFP.getRewardVoById(pData.id);
        if (t_vo) {
            let t_cardItem = this.getCardItemByIndex(t_vo.index);
            if (t_cardItem) {
                t_cardItem.setData(t_vo, true); //设置卡牌数据并播放动画
            }
            this.showGetFlagById(t_vo.id);
            this.refreshRemainCount();
        }
    }
}