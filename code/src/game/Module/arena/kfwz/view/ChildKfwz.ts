/**
 * 跨服王者主界面
 * @author: lujiahao 
 * @date: 2019-12-04 18:05:15 
 */
class ChildKfwz extends fairygui.GComponent implements IPanel {

    //>>>>start
	public gradeCtrl: fairygui.Controller;
	public teamListBg: fairygui.GImage;
	public btnLog: Button2;
	public btnReward: Button2;
	public btnRank: Button2;
	public btnHelp: Button2;
	public gradeGrid0: fairygui.GImage;
	public gradeGrid1: fairygui.GImage;
	public gradeGrid2: fairygui.GImage;
	public gradeGrid3: fairygui.GImage;
	public gradeGrid4: fairygui.GImage;
	public gradeGrid5: fairygui.GImage;
	public gradeGrid6: fairygui.GImage;
	public gradeGrid7: fairygui.GImage;
	public gradeGrid8: fairygui.GImage;
	public gradeGrid9: fairygui.GImage;
	public iconGrade: fairygui.GLoader;
	public iconGName: fairygui.GLoader;
	public tfSScore: fairygui.GRichTextField;
	public tfSRank: fairygui.GRichTextField;
	public tfGrade: fairygui.GRichTextField;
	public pb: fairygui.GProgressBar;
	public tempBoxItem: KfwzBoxItem;
	public tfScore: fairygui.GRichTextField;
	public tfSate: fairygui.GRichTextField;
	public tfDate: fairygui.GRichTextField;
	public tfTips: fairygui.GRichTextField;
	public btnFast: Button1;
	public btnCreate: Button1;
	public btnInvite: Button0;
	public btnExit: Button0;
	public btnStart: Button1;
	public tfRemain: fairygui.GRichTextField;
	public btnAdd: Button2;
	public btnChat: Button2;
	public teamListList: fairygui.GList;
	public teamItemBg0: KfwzTeamItemBg;
	public teamItemBg1: KfwzTeamItemBg;
	public teamItemBg2: KfwzTeamItemBg;
	public teamItem0: KfwzTeamItem;
	public teamItem1: KfwzTeamItem;
	public teamItem2: KfwzTeamItem;
	public tfCombo: fairygui.GRichTextField;
	public groupCombo: fairygui.GGroup;
	public btnAuto: fairygui.GButton;
	public tfAuto: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://me1skowln9yf6d";

    public static createInstance(): ChildKfwz {
        return <ChildKfwz><any>(fairygui.UIPackage.createObject("Arena", "ChildKfwz"));
    }

    private _gradeGridList: fairygui.GImage[] = [];
    private _teamItemList: KfwzTeamItem[] = [];
    private _teamItemBgList: KfwzTeamItemBg[] = [];

    private _boxItemPool: KfwzBoxItem[] = [];
    private _boxItemList: KfwzBoxItem[] = [];

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        let t_model = GGlobal.modelKfwz;

        for (let i = 0; i < 10; i++) {
            let t_grid: any = t.getChild("gradeGrid" + i);
            t._gradeGridList.push(t_grid);
        }

        let t_dragRect = t.teamListBg.localToGlobalRect(0, 0, t.teamListBg.width, t.teamListBg.height);

        for (let i = 0; i < 3; i++) {
            let t_teamItem: KfwzTeamItem = <any>t.getChild("teamItem" + i);
            t._teamItemList.push(t_teamItem);
            t_teamItem.setPos(i);
            t_teamItem.dragBounds = t_dragRect;

            let t_itemBg: KfwzTeamItemBg = <any>t.getChild("teamItemBg" + i);
            t._teamItemBgList.push(t_itemBg);
            t_itemBg.setPos(i);
        }

        t.teamListList.itemRenderer = t.onItemRender;
        t.teamListList.callbackThisObj = t;

        t.btnAuto.title = `<font color='#00ff00'>${t_model.autoStartTime}秒</font>后自动匹配`;
    }

    private onItemRender(pIndex: number, pItem: KfwzTeamListItem) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        let t_dataList = t_model.teamList;
        if (t_dataList) {
            pItem.setData(t_dataList[pIndex]);
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
        let t_model = GGlobal.modelKfwz;

        if (t_model.actState) {
            t_model.cmdSendEnter();
        }
        else {
            t_model.cmdSendExit();
        }
        t_model.CG_CrossTeamKing_openUi_10821();
        SimpleTimer.ins().addTimer(t.onTimerCallback, t, 30000, 0, null, true);

        t.refreshData();

        t.btnAuto.selected = t_model.autoStartFlag;
    }

    closePanel(pData?: any) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t.registerEvent(false);
        t.clearAllBoxItemList();
        if (!t_model.isInBattle) {
            t_model.cmdSendExit();
        }
        SimpleTimer.ins().removeTimer(t.onDateUpdate, t);
        SimpleTimer.ins().removeTimer(t.onTimerCallback, t);
        SimpleTimer.ins().removeTimer(t.onAutoStartTimer, t);
    }

    public dispose() {
        let t = this;
        super.dispose();
    }
    //=========================================== API ==========================================
    //===================================== private method =====================================
    private onTimerCallback() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        if (t_model.actState) {
            t_model.CG_CrossTeamKing_openUi_10821();
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t.refreshBoxItemList();
        t.pb.max = t_model.maxTargetCount;
        t.pb.value = t_model.winCount;

        let t_voGrade = t_model.getGradeVoByGrade(t_model.myGrade);
        let t_lastGrade = t_model.myGrade - 1;
        let t_lastVo: VoGradeKfwz;
        if (t_lastGrade > 0) {
            t_lastVo = t_model.getGradeVoByGrade(t_lastGrade);
        }
        let t_curScore = t_model.myScore;
        let t_maxScore = t_voGrade.cfg.jf;
        if (t_maxScore == 0) {
            //最高段位
            for (let v of t._gradeGridList) {
                v.grayed = false;
            }
            t.tfScore.text = `最高段位`;
        }
        else {
            let t_maxValue = t_maxScore;
            let t_curValue = t_curScore;
            if (t_lastVo) {
                t_maxValue = t_maxScore - t_lastVo.cfg.jf;
                t_curValue = t_curScore - t_lastVo.cfg.jf;
            }
            let t_gridCount = ~~(t_curValue * 10 / t_maxValue);
            for (let i = 0; i < t._gradeGridList.length; i++) {
                let t_grid = t._gradeGridList[i];
                if (i < t_gridCount) {
                    t_grid.grayed = false;
                }
                else {
                    t_grid.grayed = true;
                }
            }
            t.tfScore.text = `${t_curScore}/${t_maxScore}`;
        }
        t.gradeCtrl.selectedIndex = t_model.myGrade - 1;

        t.tfSScore.text = `本赛季积分：${t_model.myScore}`;
        let t_strRank = "10+";
        if (t_model.myRank > 0) {
            t_strRank = t_model.myRank + "";
        }
        t.tfSRank.text = `本赛季排名：${t_strRank}`;

        // let t_strGrade = t_voGrade.cfg.name;
        let t_strGrade = "跨服王者";
        let t_rangeId = t_model.getRangeId();
        let t_rangeCfg = Config.kfwzqj_770[t_rangeId];
        if (t_rangeCfg)
            t_strGrade += `（${t_rangeCfg.ms}）`;
        t.tfGrade.text = t_strGrade;

        if (t_model.combo > 1) {
            t.tfCombo.text = t_model.combo + "";
            t.groupCombo.visible = true;
        }
        else {
            t.tfCombo.text = "";
            t.groupCombo.visible = false;
        }

        t.refreshRemainCount();
        t.refreshTeamData();
        t.refreshTeamList();
        t.refreshDate();
    }

    private refreshTeamList() {
        let t = this;
        let t_model = GGlobal.modelKfwz;

        if (t_model.actState && !t_model.isInTeam) {
            t.teamListList.visible = true;
            t.teamListList.numItems = t_model.teamList.length;
            if (t_model.teamList.length > 0)
                t.tfSate.text = "";
            else
                t.tfSate.text = "暂无队伍";
        }
        else {
            t.teamListList.visible = false;
            t.teamListList.numItems = 0;
        }
    }

    private refreshRemainCount() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t.tfRemain.text = `剩余挑战次数：${t_model.remain}`;
    }

    /** 刷新宝箱列表 */
    private refreshBoxItemList() {
        let t = this;
        t.clearAllBoxItemList();
        let t_model = GGlobal.modelKfwz;
        let t_voList = t_model.getTargetVoList();
        let t_lastRight = 0;
        let t_half = t.tempBoxItem.width / 2;
        let t_maxValue = t_model.maxTargetCount;
        for (let v of t_voList) {
            let t_boxItem = t.getBoxItemFromPool();
            t_boxItem.setData(v);
            t.addChild(t_boxItem);
            t_boxItem.y = t.tempBoxItem.y;
            t_boxItem.x = t.pb.x + (v.cfg.cs / t_maxValue) * t.pb.width - t_half;
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

    private getBoxItemFromPool(): KfwzBoxItem {
        let t_vo = this._boxItemPool.pop();
        if (!t_vo) {
            t_vo = KfwzBoxItem.createInstance() as KfwzBoxItem;
        }
        return t_vo;
    }

    private recycleBoxItem(pItem: KfwzBoxItem) {
        if (!pItem)
            return;
        pItem.recycle();
        pItem.removeFromParent();
        this._boxItemPool.push(pItem);
    }

    private refreshDate() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        if (t_model.actState == 0) {
            SimpleTimer.ins().addTimer(t.onDateUpdate, t, 500, 0, null, true);
        }
        else {
            SimpleTimer.ins().removeTimer(t.onDateUpdate, t);
            t.tfDate.text = "";
        }
    }

    private onDateUpdate() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        let t_isInAct = false;
        let t_nextOpenTs = 0;
        let t_firstHours = -1;
        let t_firstMin = -1;
        let t_firstTs = 0;
        let t_serverTs = Model_GlobalMsg.getServerTime();
        let t_serverDate = new Date();
        t_serverDate.setTime(t_serverTs);
        for (let v of t_model.openTsList) {
            let t_openDate = new Date(t_serverDate.getFullYear(), t_serverDate.getMonth(), t_serverDate.getDate());
            t_openDate.setHours(v[0]);
            t_openDate.setMinutes(v[1]);

            if (t_firstHours == -1)
                t_firstHours = v[0];
            if (t_firstMin == -1)
                t_firstMin = v[1];

            let t_openTs = t_openDate.getTime();
            let t_endTs = t_openTs + EnumKfwz.ACT_LAST_TIME * 1000;

            if (t_firstTs == 0)
                t_firstTs = t_openTs;

            if (t_serverTs < t_openTs) {
                t_nextOpenTs = t_openTs;
                break;
            }
            else if (t_serverTs >= t_openTs && t_serverTs < t_endTs) {
                t_isInAct = true;
                break;
            }
        }
        if (t_isInAct) {
            //活动开启中
            t.tfDate.text = "";
        }
        else {
            //活动未开启
            if (t_nextOpenTs) {
            }
            else {
                //没有下次开启时间，则当天的开启时间加一天
                t_nextOpenTs = t_firstTs + 60 * 60 * 24 * 1000;
            }
            let t_remainS = (t_nextOpenTs - t_serverTs) / 1000 >> 0;
            let t_dateStr = "";
            if (t_remainS > 0) {
                if (t_remainS < 24 * 60 * 60) {
                    //小于24小时
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "跨服王者将在hh小时uu分ss秒后开启");
                }
                else {
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "跨服王者将在dd天hh小时后开启");
                }
            }
            t.tfDate.text = t_dateStr;
        }
    }

    private refreshTeamData() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        let t_voList = t_model.teamVo.memberList;
        for (let i = 0; i < t._teamItemList.length; i++) {
            let t_item = t._teamItemList[i];
            t_item.setData(t_voList[i]);

            let t_bg = t._teamItemBgList[i];
            t_bg.setData(t_voList[i]);
        }

        t.btnCreate.visible = false;
        t.btnFast.visible = false;
        t.btnInvite.visible = false;
        t.btnExit.visible = false;
        t.btnStart.visible = false;
        t.tfTips.visible = false;
        t.btnAuto.visible = true;
        t.tfAuto.visible = false;

        if (t_model.actState == 1) {
            //活动已开启
            if (t_model.isInTeam) { //组队中
                t.tfSate.text = "";

                if (t_model.areYouLeader) { //队长
                    t.btnInvite.visible = true;
                    t.btnStart.visible = true;
                    t.tfTips.visible = true;
                    // t.btnAuto.visible = true;
                }
                else { //非队长
                    t.btnExit.visible = true;
                    t.btnAuto.visible = false;
                }
            }
            else { //没有队伍
                t.tfSate.text = "暂无队伍";
                t.btnCreate.visible = true;
                // t.btnFast.visible = true;
            }
        }
        else {
            //活动尚未开启
            t.tfSate.text = `活动尚未开启`;
        }

        SimpleTimer.ins().addTimer(this.onAutoStartTimer, this, 500, 0, null, true);
    }

    protected onAutoStartTimer() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        let t_remain = t_model.teamVo.remainAutoEnterSeconds;
        if (t_model.isInTeam
            && t_model.areYouLeader
            && (t_model.autoStartFlag)
            && t_model.teamVo.canEnter
            && t_remain > 0) {
            t.tfAuto.visible = true;
            t.tfAuto.text = `${t_remain}s后自动匹配`
            if (t_remain <= 0) {
                SimpleTimer.ins().removeTimer(t.onAutoStartTimer, t);
            }
        }
        else {
            t.tfAuto.visible = false;
            SimpleTimer.ins().removeTimer(t.onAutoStartTimer, t);
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;

        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_ACT_STATE_CHANGE, t.onActChange, t);
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_TEAM_DATA_UPDATE, t.onTeamDataUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_TEAM_LIST_UPDATE, t.onTeamListUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.KFWZ_AUTO_START_TIMER_CHANGE, t.onAutoStartTimerChange, t);

        EventUtil.register(pFlag, t.btnLog, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnRank, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnHelp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);

        EventUtil.register(pFlag, t.btnInvite, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnFast, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnStart, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCreate, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnExit, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnAdd, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);

        EventUtil.register(pFlag, t.btnAuto, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);

        EventUtil.register(pFlag, t.btnChat, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onAutoStartTimerChange() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t.btnAuto.selected = t_model.autoStartFlag;
        SimpleTimer.ins().addTimer(t.onAutoStartTimer, t, 500, 0, null, true);
    }

    private onActChange() {
        let t = this;
        t.refreshData();
    }

    public onTeamListUpdate() {
        let t = this;
        t.refreshTeamList();
    }

    private onUpdate() {
        let t = this;
        t.refreshData();
    }

    private onTeamDataUpdate() {
        let t = this;
        t.refreshTeamData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        switch (e.currentTarget) {
            case t.btnLog:
                GGlobal.layerMgr.open(UIConst.KFWZ_LOG);
                break;
            case t.btnReward:
                GGlobal.layerMgr.open(UIConst.KFWZ_GRADE_REWARD);
                break;
            case t.btnRank:
                GGlobal.layerMgr.open(UIConst.KFWZ_RANK);
                break;
            case t.btnHelp:
                GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.KFWZ);
                break;
            case t.btnInvite:
                t_model.CG_CrossTeamKing_invitation_10825();
                break;
            case t.btnFast:
                break;
            case t.btnStart:
                t_model.CG_CrossTeamKing_marryBattle_10839();
                break;
            case t.btnCreate:
                t_model.CG_CrossTeamKing_createteam_10823();
                break;
            case t.btnExit:
                t_model.CG_CrossTeamKing_exitteam_10835();
                break;
            case t.btnAdd:
                let t_canBuy = t_model.vipBuyLimit - t_model.buyCount;
                if (t_canBuy > 0) {
                    // let t_need = 0;
                    // if (t_model.vipBuyNeedConsume)
                    //     t_need = t_model.vipBuyNeedConsume.count;
                    // if (t_need > 0)
                    //     ViewAlertBuy.show(t_need, t_canBuy, t_canBuy, "", Handler.create(t, t.onBuyCountOk));

                    ViewAlertBuy2.show(1, t_canBuy, Enum_Attr.yuanBao,
                        (pData) => {
                            pData.desStr = `今日剩余购买次数：<font color='${Color.GREENSTR}'>${t_canBuy}</font>`;
                            let t_total = t_model.getBuyCountNeedByCount(pData.value);
                            pData.totalPrice = t_total;
                        },
                        async (pData) => {
                            t.onBuyCountOk(pData.value);
                            return true;
                        }, t);
                }
                else {
                    ViewCommonWarn.text("已达购买上限，提升VIP可增加更多购买次数");
                }
                break;
            case t.btnChat:
                if (Model_GlobalMsg.kaifuDay > 7)
                    GGlobal.layerMgr.open(UIConst.CHAT);
                else
                    GGlobal.layerMgr.open(UIConst.CHAT, 1);
                break;
            case t.btnAuto:
                t_model.setAutoStartFlag(t.btnAuto.selected);
                break;
        }
    }

    private onBuyCountOk(pCount: number) {
        if (pCount <= 0)
            return;
        let t = this;
        let t_model = GGlobal.modelKfwz;
        let t_need = t_model.getBuyCountNeedByCount(pCount);
        if (!FastAPI.checkItemEnough(Enum_Attr.yuanBao, t_need, true))
            return;
        t_model.CG_CrossTeamKing_buyCount_10861(pCount);
    }
}