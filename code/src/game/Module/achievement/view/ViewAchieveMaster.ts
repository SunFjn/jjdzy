/**
 * @author: lujiahao 
 * @date: 2019-11-08 16:03:21 
 */
class ViewAchieveMaster extends UIModalPanel {

    //>>>>start
    public frame: frame1;
    public btnUp: Button1;
    public g22: fairygui.GImage;
    public tfName: fairygui.GRichTextField;
    public powerCom: fairygui.GLabel;
    public list: fairygui.GList;
    //>>>>end

    public static URL: string = "ui://dllc71i9g7h328";

    public static createInstance(): ViewAchieveMaster {
        return <ViewAchieveMaster><any>(fairygui.UIPackage.createObject("rebirth", "ViewAchieveMaster"));
    }

    private _dataList: VoMasterAchievement[] = [];
    private _curData: VoMasterAchievement;

    public constructor() {
        super();
        this.loadRes("rebirth", "rebirth_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("rebirth");
        this.view = fairygui.UIPackage.createObject("rebirth", "ViewAchieveMaster").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.foldInvisibleItems = true;
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t._isShowed = true;
        t.registerEvent(true);
        t.refreshData();
    }

    private _isShowed = false;
    protected onHide() {
        let t = this;
        t.registerEvent(false);
        t._isShowed = false;
        t.list.numItems = 0;
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: AchievementMasterItem) {
        let t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelAchievement;

        t._curData = t_model.curMasterVo;
        if (t._curData) {
            //已激活
            if (t_model.nextMasterVo) {
                t.btnUp.title = "升阶";
            }
            else {
                t.btnUp.title = "已满阶";
            }
            t.powerCom.title = t._curData.cfg.zl + "";
            t.tfName.text = `成就大师${t._curData.id}阶`;
        }
        else {
            //尚未激活
            t.powerCom.title = 0 + "";
            t.btnUp.title = "激活";
            t.tfName.text = `成就大师0阶`;
        }

        if (t_model.checkMasterCanUp(false)) {
            t.btnUp.grayed = false;
            t.btnUp.noticeImg.visible = true;
        }
        else {
            t.btnUp.grayed = true;
            t.btnUp.noticeImg.visible = false;
        }

        t._dataList.length = 0;
        {
            let t_vo = t_model.curMasterVo;
            if (t_vo)
                t._dataList.push(t_vo);
        }
        {
            let t_vo = t_model.nextMasterVo;
            if (t_vo)
                t._dataList.push(t_vo);
        }
        t.list.numItems = t._dataList.length;
        // t.list.ensureBoundsCorrect();
        // t.list.ensureSizeCorrect();
        // t.list.resizeToFit();
        egret.setTimeout(() => {
            if (t._isShowed) {
                t.list.ensureBoundsCorrect();
                t.list.ensureSizeCorrect();
                t.list.resizeToFit();
            }
        }, t, 100)
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.ACHIEVEMENT_UPDATE, t.onUpdate, t);
        EventUtil.register(pFlag, t.btnUp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onUpdate() {
        let t = this;
        t.refreshData();
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnUp:
                GGlobal.modelAchievement.CG_Achievement_upAchievement_10329();
                break;
        }
    }
}