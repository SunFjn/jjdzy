/**
 * 轮回副本面板
 * @author: lujiahao 
 * @date: 2020-02-28 22:46:49 
 */
class ChildLhfb extends fairygui.GComponent implements IPanel {

    //>>>>start
	public teamCtrl: fairygui.Controller;
	public copyCtrl: fairygui.Controller;
	public bgLoader: fairygui.GLoader;
	public titleCopy: fairygui.GLabel;
	public createBt: Button1;
	public listTeam: fairygui.GList;
	public btnChat: Button2;
	public btnInvite: Button0;
	public btnExit: Button0;
	public btnCreate: Button1;
	public btnStart: Button1;
	public tfChallengeCount: fairygui.GRichTextField;
	public tfHelpCount: fairygui.GRichTextField;
	public itemList: fairygui.GList;
	public starCom: LhfbStarCom;
	public btnRefresh: Button1;
	public resCom: ViewResource;
	public listCopy1: fairygui.GList;
	public resHelp: ViewResource2;
	public btnRight: Button2;
	public btnLeft: Button2;
	//>>>>end

    public static URL: string = "ui://3o8q23uuymt71n";

    public static createInstance(): ChildLhfb {
        return <ChildLhfb><any>(fairygui.UIPackage.createObject("syzlb", "ChildLhfb"));
    }

    public static checkOpen(): boolean {
        let t_myLunhuiId = Model_player.voMine.reincarnationLevel;
        if (t_myLunhuiId < 1) {
            ViewCommonWarn.text("需要达到一世轮回");
            return false;
        }
        return true;
    }

    public constructor() {
        super();
    }

    /** 当前轮回id */
    private _curLunhuiId = 0;
    /** 当前关卡数据 */
    private _curLevelVo: VoLevelLhfb;

    private _cdc: CDController;

    /** 单个icon的宽度+列距，用于计算滚动步进 */
    private ICON_W = 193 + 0;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        let t_model = GGlobal.modelLhfb;
        t_model.setup();

        t.listCopy1.itemRenderer = t.onCopyItemRender;
        t.listCopy1.callbackThisObj = t;
        t.listCopy1.setVirtual();
        t.listCopy1.scrollPane.scrollStep = t.ICON_W;

        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();

        t.listTeam.itemRenderer = t.onTeamItemRender;
        t.listTeam.callbackThisObj = t;

        t._cdc = new CDController();
        t._cdc.register(t.btnInvite, 10, "等待(ss)", false);
    }

    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    }

    public dispose() {
        let t = this;
        t._cdc.destry();
        super.dispose();
    }

    openPanel(pData?: any) {
        let t = this;
        let t_model = GGlobal.modelLhfb;

        t.registerEvent(true);

        t_model.cmdSendEnter();

        t_model.CG_RebornFB_openUi_11861();

        t.refreshData();
        t.refreshTeamData();

        let t_selectedIndex = 0;
        let t_curId = t_model.getCurLunhuiId();
        if (t_curId > 0)
            t_selectedIndex = t_curId - 1;
        if (t_model.isInTeam) {
            t._flagDontSendCmd = true;
        }
        t.copyCtrl.selectedIndex = -1;
        t.copyCtrl.selectedIndex = t_selectedIndex;
        t.listCopy1.scrollToView(t_selectedIndex);

        t.listCopy1.ensureSizeCorrect();
        t.listCopy1.ensureSizeCorrect();
        t.showLeftRightBtn();

        IconUtil.setImg(t.bgLoader, Enum_Path.BACK_URL + "lhfb_bg.jpg");
    }

    closePanel(pData?: any) {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        t.registerEvent(false);
        t.listCopy1.numItems = 0;
        t.listTeam.numItems = 0;
        t._curLunhuiId = 0;
        t._curLevelVo = null;
        t.refreshSelectedCopyInfo();
        if (!t_model.isInBattle) {
            t_model.cmdSendExit();
        }

        IconUtil.setImg(t.bgLoader, null);
    }
    //=========================================== API ==========================================
    //===================================== private method =====================================
    private onCopyItemRender(pIndex: number, pItem: LhfbCopyItem) {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        let t_list = t_model.copyVoList;
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    }

    private onItemRender(pIndex: number, pItem: ViewGrid) {
        let t = this;
        if (t._curLevelVo) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t._curLevelVo.rewardList[pIndex];
        }
    }

    private onTeamItemRender(pIndex: number, pItem: LhfbTeamItem) {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        let t_list = t_model.teamVo.memberList;
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        t.listCopy1.numItems = t_model.copyVoList.length;

        t.copyCtrl.clearPages();
        for (let v of t_model.copyVoList) {
            t.copyCtrl.addPage();
        }
    }

    /** 刷新显示当前选中的副本信息 */
    private refreshSelectedCopyInfo() {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        if (t._curLunhuiId) {
            t.refreshStarReward();

            let t_copyVo = t_model.getCopyVoByLunhuiId(t._curLunhuiId);
            if (t_copyVo) {
                let t_remainChallenge = t_copyVo.remainCount;

                let t_color = Color.GREENSTR;
                if (t_remainChallenge <= 0) {
                    t_color = Color.REDSTR;
                }
                t.tfChallengeCount.text = `当前副本剩余挑战次数：${HtmlUtil.font(t_remainChallenge + "/" + t_model.maxChallenge, t_color)}`;

                t.refreshHelp();
            }
            t.refreshConsume();
            t.refreshCopyTitle();
        }
        else {
            t.itemList.numItems = 0;
        }
    }

    private refreshHelp() {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        let t_remainHelp = t_model.remainHelp;
        t.resHelp.visible = false;
        let t_color = Color.GREENSTR;
        if (t_remainHelp <= 0) {
            // t.resHelp.visible = true;
            // t.resHelp.setItemId(t_model.helpConsume.id);
            // t.resHelp.setType(1);
            // let t_bagCount = FastAPI.getItemCount(t_model.helpConsume.id);
            // let t_need = t_model.helpConsume.count;
            // if (t_bagCount >= t_need) {
            // }
            // else {
            //     t_color = Color.REDSTR;
            // }
            // t.tfHelpCount.text = FastAPI.getItemName(t_model.helpConsume.id, true) + "：";
            // t.resHelp.setLb(t_bagCount, t_need);
            t_color = Color.REDSTR;
        }
        else {
        }
        t.tfHelpCount.text = `剩余协助次数：${HtmlUtil.font(t_remainHelp + "/" + t_model.maxHelp, t_color)}`;
    }

    private refreshConsume() {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        if (t._curLunhuiId) {
            let t_needId = t_model.starUpNeedItem.id;
            let t_bagCount = FastAPI.getItemCount(t_needId);
            let t_needCount = t_model.starUpNeedItem.count;
            t.resCom.setItemId(t_needId);
            let t_color = Color.GREENSTR;
            if (t_needCount > t_bagCount)
                t_color = Color.REDSTR;
            t.resCom.setCount(HtmlUtil.font(t_needCount + "", t_color));
        }
    }

    private refreshTeamData() {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        let t_voList = t_model.teamVo.memberList;
        t.listTeam.numItems = t_voList.length;

        if (t_model.isInTeam) {
            if (t_model.areYouLeader) {
                t.teamCtrl.selectedIndex = 1;
            }
            else {
                t.teamCtrl.selectedIndex = 2;
            }
        }
        else {
            t.teamCtrl.selectedIndex = 0;
        }
        t.refreshCopyTitle();
        t.refreshStarReward();
    }

    private refreshCopyTitle() {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        let t_lunhuiId = t._curLunhuiId;
        if (t_model.isInTeam) {
            t_lunhuiId = t_model.teamVo.lunhuiId
        }
        let t_copy = t_model.getCopyVoByLunhuiId(t_lunhuiId);
        if (t_copy)
            t.titleCopy.title = t_copy.name;
        else
            t.titleCopy.title = "队伍信息";
    }

    /** 刷新副本奖励 */
    private refreshStarReward() {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        let t_copyVo = t_model.getCopyVoByLunhuiId(t._curLunhuiId);
        if (t_copyVo) {
            let t_star = 1;
            if (t_model.isInTeam) {
                t_star = t_model.teamVo.star
            }
            else {
                t_star = t_copyVo.star;
            }
            t.starCom.ctrl.selectedIndex = t_star;
            let t_color = Color.getColorStr(t_star);
            t.starCom.tfStar.text = HtmlUtil.font(`${ConfigHelp.NumberToChinese(t_star)}星奖励`, t_color);
            let t_levelVo = t_model.getLevelVoByLunhuiIdAndStar(t_copyVo.lunhuiId, t_star);
            if (t_levelVo) {
                t._curLevelVo = t_levelVo;
                t.itemList.numItems = t_levelVo.rewardList.length;
            }
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;

        GGlobal.control.register(pFlag, Enum_MsgType.LHFB_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.LHFB_TEAM_DATA_UPDATE, t.onTeamDataUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.LHFB_CUR_ID_CHANGE, t.onCurIdChange, t);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.LHFB_TEAM_ID_CHANGE, t.onTeamIdChange, t);

        EventUtil.register(pFlag, t.copyCtrl, fairygui.StateChangeEvent.CHANGED, t.onCopyCtrlChange, t);

        EventUtil.register(pFlag, t.btnLeft, egret.TouchEvent.TOUCH_TAP, t.onArrowClick, t);
        EventUtil.register(pFlag, t.btnRight, egret.TouchEvent.TOUCH_TAP, t.onArrowClick, t);
        EventUtil.register(pFlag, t.listCopy1.scrollPane, fairygui.ScrollPane.SCROLL, t.onScrollUpdate, t);
        EventUtil.register(pFlag, t.listCopy1.scrollPane, fairygui.ScrollPane.SCROLL_END, t.onScrollUpdate, t);

        EventUtil.register(pFlag, t.btnRefresh, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnInvite, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCreate, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnExit, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnStart, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnChat, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onBagUpdate() {
        let t = this;
        t.refreshConsume();
        t.refreshStarReward();
        // t.refreshHelp();
    }

    private onTeamIdChange() {
        let t = this;
        t._cdc.stopCD(false);
    }

    private onUpdate() {
        let t = this;
        t.refreshSelectedCopyInfo();
        t.listCopy1.refreshVirtualList();
    }

    private onTeamDataUpdate() {
        let t = this;
        t.refreshTeamData();
    }

    private onCurIdChange(pData: { isScroll: boolean }) {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        let t_curId = t_model.getCurLunhuiId();
        if (t_curId <= 0)
            return;
        let t_selectedIndex = t_curId - 1;
        if (t_selectedIndex != t.copyCtrl.selectedIndex)
            t._flagDontSendCmd = true;
        t.copyCtrl.selectedIndex = t_selectedIndex;
        if (pData.isScroll) {
            t.listCopy1.scrollToView(t_selectedIndex);
            t.listCopy1.ensureSizeCorrect();
            t.listCopy1.ensureSizeCorrect();
            t.showLeftRightBtn();
        }
    }

    private _flagDontSendCmd = false;
    private onCopyCtrlChange(e: fairygui.StateChangeEvent) {
        let t = this;
        let t_selectedIndex = t.copyCtrl.selectedIndex;
        if (t_selectedIndex < 0)
            return;
        let t_model = GGlobal.modelLhfb;

        let t_oldIndex = t._curLunhuiId - 1;
        t_oldIndex = t_oldIndex < 0 ? 0 : t_oldIndex;

        let t_list = t_model.copyVoList;
        if (t_list) {
            let t_copyVo = t_list[t_selectedIndex];
            if (t_copyVo.canEnter(true)) { //符合条件，可以挑战
                let t_targetId = t_list[t_selectedIndex].lunhuiId;
                t._curLunhuiId = t_targetId;
                t.refreshSelectedCopyInfo();

                if (t._flagDontSendCmd) {
                }
                else {
                    if (t_model.isInTeam) {
                        t_model.cmdSendExitTeam(false);
                        t_model.CG_RebornFB_createTeam_11863(t_targetId);
                    }
                    else {
                        t_model.CG_RebornFB_createTeam_11863(t_targetId);
                    }
                }
            }
            else {
                egret.callLater(() => {
                    t.copyCtrl.setSelectedIndex(t_oldIndex);
                }, t);

            }
        }
        t._flagDontSendCmd = false;
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelLhfb;
        switch (e.currentTarget) {
            case t.btnRefresh:
                t_model.CG_RebornFB_refreshStar_11877();
                break;
            case t.btnInvite:
                t._cdc.startCD(10);
                t_model.CG_RebornFB_invitation_11869();
                break;
            case t.btnCreate:
                t_model.CG_RebornFB_createTeam_11863(t._curLunhuiId);
                break;
            case t.btnExit:
                t_model.cmdSendExitTeam(false);
                break;
            case t.btnStart:
                t_model.CG_RebornFB_battle_11881();
                break;
            case t.btnChat:
                if (Model_GlobalMsg.kaifuDay > 7)
                    GGlobal.layerMgr.open(UIConst.CHAT);
                else
                    GGlobal.layerMgr.open(UIConst.CHAT, 1);
                break;
        }
    }

    private onArrowClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnLeft:
                t.listCopy1.scrollPane.scrollLeft(~~(t.listCopy1.width / t.ICON_W), true);
                break;
            case t.btnRight:
                t.listCopy1.scrollPane.scrollRight(~~(t.listCopy1.width / t.ICON_W), true);
                break;
        }
    }

    private onScrollUpdate(e: egret.Event) {
        let t = this;
        t.showLeftRightBtn();
    }

    /** 箭头按需显示 */
    private showLeftRightBtn() {
        let t = this;
        let t_posx = t.listCopy1.scrollPane.posX;
        let t_contentW = t.listCopy1.scrollPane.contentWidth;
        let t_viewW = t.listCopy1.scrollPane.viewWidth;
        if (t_contentW > t_viewW) {
            if (t_posx == 0)
                t.btnLeft.visible = false;
            else
                t.btnLeft.visible = true;

            if (t_posx + t_viewW == t_contentW)
                t.btnRight.visible = false;
            else
                t.btnRight.visible = true;
        }
        else {
            t.btnLeft.visible = false;
            t.btnRight.visible = false;
        }
    }
}