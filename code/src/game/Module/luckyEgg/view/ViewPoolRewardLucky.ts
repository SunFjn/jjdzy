/**
 * @author: lujiahao 
 * @date: 2020-01-07 18:04:55 
 */
class ViewPoolRewardLucky extends UIModalPanel {

    //>>>>start
	public frame: fairygui.GLabel;
	public tfDes: fairygui.GRichTextField;
	public list: fairygui.GList;
	//>>>>end

    public static URL: string = "ui://wx4kos8uxwoqj";

    public static createInstance(): ViewPoolRewardLucky {
        return <ViewPoolRewardLucky><any>(fairygui.UIPackage.createObject("luckyEgg", "ViewPoolRewardLucky"));
    }

    public static checkOpen(): boolean {
        if (GGlobal.modelLuckyEgg.eggItemList.length == 0) {
            ViewCommonWarn.text("奖池暂时没有奖励，请先注入奖励");
            return false;
        }
        return true;
    }

    private _poolTypeList = [3, 2, 1];

    public constructor() {
        super();
        this.loadRes("luckyEgg", "luckyEgg_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("luckyEgg");
        this.view = fairygui.UIPackage.createObject("luckyEgg", "ViewPoolRewardLucky").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
        t.list.itemRenderer = t.onItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    }
    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);
        t.refreshData();
        t.list.scrollToView(0);
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        t.list.numItems = 0;
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: LuckyPoolRewardItem) {
        let t = this;
        if (t._poolTypeList) {
            pItem.setData(t._poolTypeList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelLuckyEgg;
        t.list.numItems = t._poolTypeList.length;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
    }
    //======================================== handler =========================================
}