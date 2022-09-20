/**
 * 跨服王者开始动画界面
 * @author: lujiahao 
 * @date: 2019-12-12 18:07:37 
 */
class ViewStartKfwz extends UIModalPanel {

    //>>>>start
	public bg1: fairygui.GLoader;
	public list1: fairygui.GList;
	public bg2: fairygui.GLoader;
	public list2: fairygui.GList;
	public mc: fairygui.Transition;
	//>>>>end

    public static URL: string = "ui://me1skowlpzsw80";

    public static createInstance(): ViewStartKfwz {
        return <ViewStartKfwz><any>(fairygui.UIPackage.createObject("Arena", "ViewStartKfwz"));
    }

    public constructor() {
        super();
        // this.isClosePanel = false;
        this.loadRes("Arena", "Arena_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("Arena");
        this.view = fairygui.UIPackage.createObject("Arena", "ViewStartKfwz").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        let t = this;
        t.mc = t.view.getTransition("mc");

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;

        t.list1.itemRenderer = t.onItemRender1;
        t.list1.callbackThisObj = t;

        t.list2.itemRenderer = t.onItemRender2;
        t.list2.callbackThisObj = t;
    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);
        t.refreshData();

        IconUtil.setImg(t.bg1, Enum_Path.IMAGE_URL + "kfwz/start_bg1.png");
        IconUtil.setImg(t.bg2, Enum_Path.IMAGE_URL + "kfwz/start_bg2.png");

        t.mc.play(t.onMcComplete, t);
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        IconUtil.setImg(t.bg1, null);
        IconUtil.setImg(t.bg2, null);
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender1(pIndex: number, pItem: KfwzHead) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        if (t_model.myBattleList) {
            pItem.setData(t_model.myBattleList[pIndex]);
        }
    }

    private onItemRender2(pIndex: number, pItem: KfwzHead) {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        if (t_model.enemyBattleList) {
            pItem.setData(t_model.enemyBattleList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelKfwz;
        t.list1.numItems = t_model.myBattleList.length;
        t.list2.numItems = t_model.enemyBattleList.length;
    }

    private onMcComplete() {
        let t = this;
        t.closeView();
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
    }
    //======================================== handler =========================================
}