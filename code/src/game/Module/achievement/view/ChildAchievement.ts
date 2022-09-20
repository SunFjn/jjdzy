/**
 * 成就面板
 * @author: lujiahao 
 * @date: 2019-11-07 17:01:14 
 */
class ChildAchievement extends fairygui.GComponent implements IPanel {

    //>>>>start
	public tabCtrl: fairygui.Controller;
	public tabList: fairygui.GList;
	public btnUp: Button2;
	public btnDown: Button2;
	public list: fairygui.GList;
	public btnGetAll: Button1;
	public pb: fairygui.GProgressBar;
	public btnReward: Button2;
	public btnMaster: Button2;
	public tfLevel: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://dllc71i9pke61u";

    public static createInstance(): ChildAchievement {
        return <ChildAchievement><any>(fairygui.UIPackage.createObject("rebirth", "ChildAchievement"));
    }

    private _typeList: number[] = [];
    /** 单个icon的宽度+列距，用于计算滚动步进 */
    private ICON_H = 129 + 5;

    private _showList: VoTaskAchievement[] = [];

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.list.itemRenderer = t.onListRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();

        t.tabList.itemRenderer = t.onTabRender;
        t.tabList.callbackThisObj = t;
        t.tabList.scrollPane.scrollStep = t.ICON_H;

        let t_model = GGlobal.modelAchievement;
        let t_typeList = t_model.getTaskTypeList();
        t.tabCtrl.clearPages();
        for (let i = 0; i < t_typeList.length; i++) {
            t.tabCtrl.addPage();
            t._typeList.push(t_typeList[i]);
        }
    }

    //=========================================== API ==========================================
    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    }

    openPanel(pData?: any) {
        let t = this;
        let t_model = GGlobal.modelAchievement;

        t.registerEvent(true);

        t_model.CG_Achievement_openUI_10321();
        t_model.CG_Achievement_openGoalUI_10325();

        t.refreshTypeBtns();
        t.refreshLevelInfo();

        let t_selectedIndex = 0;
        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = t_selectedIndex;
    }

    closePanel(pData?: any) {
        let t = this;
        t.list.numItems = 0;
        t.registerEvent(false);
    }

    //===================================== private method =====================================
    private onTabRender(pIndex: number, pItem: AchieveIconBtn) {
        let t = this;
        let t_type = t.getTypeByTabIndex(pIndex);
        pItem.setData(t_type);
    }

    private onListRender(pIndex: number, pItem: AchieveTaskItem) {
        let t = this;
        if (t._showList) {
            pItem.setData(t._showList[pIndex]);
        }
    }

    private refreshTypeBtns() {
        let t = this;
        t.tabList.numItems = t._typeList.length;
        t.tabList.ensureBoundsCorrect();
        t.tabList.ensureSizeCorrect();
        t.showArrowBtns();
    }

    private refreshLevelInfo() {
        let t = this;
        let t_model = GGlobal.modelAchievement;
        t.tfLevel.text = "";
        let t_curVo = t_model.curMasterVo;
        let t_nextVo = t_model.nextMasterVo;
        let t_max = 0;
        let t_value = 0;
        let t_isMax = false;
        if (!t_curVo) {
            //未激活
            t.tfLevel.text = "成就大师0阶";

            t_max = t_nextVo.cfg.cjd;
            t_value = t_model.score;
        }
        else {
            //已激活
            t.tfLevel.text = `成就大师${t_curVo.id}阶`;
            if (t_nextVo) {
                //未满级
                t_max = t_nextVo.cfg.cjd;
                t_value = t_model.score;
            }
            else {
                //已满级
                t_max = 1;
                t_value = 1;
                t_isMax = true;
            }
        }

        t.pb.max = t_max;
        t.pb.value = t_value;
        if (!t_isMax) {
            // if (t_value >= t_max) {
            //     t.pb._titleObject.text = "可升阶";
            // }
        }
        else {
            t.pb._titleObject.text = "已满阶";
        }
    }

    private refreshDataByTabIndex(pTabIndex: number) {
        if (pTabIndex < 0)
            return;
        let t = this;
        let t_model = GGlobal.modelAchievement;
        let t_type = t.getTypeByTabIndex(pTabIndex);
        let t_chainList = t_model.getTaskChainListByType(t_type);
        t._showList.length = 0;
        for (let vList of t_chainList) {
            let t_showVo = vList[vList.length - 1];
            for (let v1 of vList) {
                if (v1.state != EnumAchievement.SATTE_DONE) {
                    t_showVo = v1;
                    break;
                }
            }
            if (t_showVo.isOpened)
                t._showList.push(t_showVo);
        }
        t._showList.sort((pA, pB) => {
            if (pA.sortValue > pB.sortValue)
                return -1;
            else if (pA.sortValue < pB.sortValue)
                return 1;
            else
                return pA.id - pB.id;
        });

        t.list.numItems = t._showList.length;
    }

    private getTypeByTabIndex(pTabIndex: number): number {
        return this._typeList[pTabIndex];
    }

    private showArrowBtns() {
        let t = this;
        let t_posy = t.tabList.scrollPane.posY;
        let t_contentH = t.tabList.scrollPane.contentHeight;
        let t_viewH = t.tabList.scrollPane.viewHeight;
        if (t_contentH > t_viewH) {
            if (t_posy == 0)
                t.btnUp.visible = false;
            else
                t.btnUp.visible = true;

            if (t_posy + t_viewH == t_contentH)
                t.btnDown.visible = false;
            else
                t.btnDown.visible = true;
        }
        else {
            t.btnUp.visible = false;
            t.btnDown.visible = false;
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.ACHIEVEMENT_UPDATE, t.onUpdate, t);

        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabCtrlChangeHandler, t);
        EventUtil.register(pFlag, t.tabList.scrollPane, fairygui.ScrollPane.SCROLL, t.onScrollUpdate, t);
        EventUtil.register(pFlag, t.tabList.scrollPane, fairygui.ScrollPane.SCROLL_END, t.onScrollUpdate, t);

        EventUtil.register(pFlag, t.btnMaster, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGetAll, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);

        EventUtil.register(pFlag, t.btnUp, egret.TouchEvent.TOUCH_TAP, t.onArrowClick, t);
        EventUtil.register(pFlag, t.btnDown, egret.TouchEvent.TOUCH_TAP, t.onArrowClick, t);

        if (pFlag) {
            ReddotMgr.ins().register(ReddotEnum.VALUE_ACHIEVEMENT_TASK, t.btnGetAll.noticeImg);
            ReddotMgr.ins().register(ReddotEnum.VALUE_ACHIEVEMENT_LEVEL, t.btnMaster.noticeImg);
            ReddotMgr.ins().register(ReddotEnum.VALUE_ACHIEVEMENT_REWARD, t.btnReward.noticeImg);
        }
        else {
            ReddotMgr.ins().unregister(t.btnGetAll.noticeImg);
            ReddotMgr.ins().unregister(t.btnMaster.noticeImg);
            ReddotMgr.ins().unregister(t.btnReward.noticeImg);
        }
    }

    //======================================== handler =========================================
    private onUpdate() {
        let t = this;
        t.refreshTypeBtns();
        t.refreshLevelInfo();
        t.refreshDataByTabIndex(t.tabCtrl.selectedIndex);
    }

    private onTabCtrlChangeHandler(e: fairygui.StateChangeEvent) {
        let t = this;
        if (!(e.currentTarget instanceof fairygui.Controller))
            return;
        let t_selectedIndex = e.currentTarget.selectedIndex;
        if (t_selectedIndex < 0)
            return;

        t.refreshDataByTabIndex(t_selectedIndex);
        t.list.scrollToView(0);
    }

    private onScrollUpdate(e: egret.Event) {
        let t = this;
        t.showArrowBtns();
    }

    private onArrowClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnUp:
                t.tabList.scrollPane.scrollUp(~~(t.tabList.width / t.ICON_H), true);
                break;
            case t.btnDown:
                t.tabList.scrollPane.scrollDown(~~(t.tabList.width / t.ICON_H), true);
                break;
        }
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnMaster:
                GGlobal.layerMgr.open(UIConst.ACHIEVEMENT_MASTER);
                break;
            case t.btnReward:
                GGlobal.layerMgr.open(UIConst.ACHIEVEMENT_REWARD);
                break;
            case t.btnGetAll:
                GGlobal.modelAchievement.CG_Achievement_getReward_10323(1, 0);
                break;
        }
    }
}