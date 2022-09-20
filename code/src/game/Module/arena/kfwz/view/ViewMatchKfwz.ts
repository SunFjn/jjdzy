/**
 * 跨服王者匹配界面
 * @author: lujiahao 
 * @date: 2019-12-11 10:41:48 
 */
class ViewMatchKfwz extends UIModalPanel {

    //>>>>start
	public bgLoader: fairygui.GLoader;
	public btnClose: Button2;
	public tfDes: fairygui.GRichTextField;
	public tfTime: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://me1skowlju9q7q";

    public static createInstance(): ViewMatchKfwz {
        return <ViewMatchKfwz><any>(fairygui.UIPackage.createObject("Arena", "ViewMatchKfwz"));
    }

    public constructor() {
        super();
        this.isClosePanel = false;
        this.loadRes("Arena", "Arena_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewMatchKfwz").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);
        t.refreshData();
        IconUtil.setImg(t.bgLoader, Enum_Path.IMAGE_MODULES_URL + "area/ppqz.png");
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        SimpleTimer.ins().removeTimer(t.onTimerCallback, t);
        IconUtil.setImg(t.bgLoader, null);
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t._seconds = 0;
        SimpleTimer.ins().addTimer(t.onTimerCallback, t, 1000, 0, null, true);

        if (t_model.areYouLeader) {
            t.btnClose.visible = true;
        }
        else {
            t.btnClose.visible = false;
        }
    }

    private _count = 0;
    private _seconds = 0;
    private onTimerCallback() {
        let t = this;
        t._count++;
        t._count = t._count % 4;
        let t_str = "";
        for (let i = 0; i < t._count; i++) {
            t_str += ".";
        }
        t.tfDes.text = "正在匹配" + t_str;

        t.tfTime.text = DateUtil2.formatUsedTime(t._seconds);
        t._seconds++;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnClose, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }
    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        switch (e.currentTarget) {
            case t.btnClose:
                t_model.CG_CrossTeamKing_cancelMarry_10855();
                break;
        }
    }

}