/**
 * @author: lujiahao 
 * @date: 2020-04-08 17:31:31 
 */
class ViewRankXyfq extends UIModalPanel {

    //>>>>start
    public frame: fairygui.GLabel;
    public list: fairygui.GList;
    public tfMyRank: fairygui.GRichTextField;
    public tfMyCount: fairygui.GRichTextField;
    public tfDes: fairygui.GRichTextField;
    //>>>>end

    public static URL: string = "ui://7hwmix0gbnypo";

    public static createInstance(): ViewRankXyfq {
        return <ViewRankXyfq><any>(fairygui.UIPackage.createObject("xyfq", "ViewRankXyfq"));
    }

    public constructor() {
        super();
        this.loadRes("xyfq", "xyfq_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("xyfq");
        this.view = fairygui.UIPackage.createObject("xyfq", "ViewRankXyfq").asCom;
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

    private _dataList: VoRankXyfq[];

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        t_model.CG_LuckSign_openRankUI_12153();
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
    private onItemRender(pIndex: number, pItem: XyfqItemRank) {
        let t = this;
        if (t._dataList) {
            pItem.setData(t._dataList[pIndex]);
        }
    }

    private refreshData() {
        let t = this;
        let t_model = GGlobal.modelXyfq;
        t._dataList = t_model.getRankCfgList();

        if (t._dataList)
            t.list.numItems = t._dataList.length;
        else
            t.list.numItems = 0;

        if (t_model.myRankId > 0)
            t.tfMyRank.text = `我的排名：${t_model.myRankId}`;
        else
            t.tfMyRank.text = "我的排名：暂未上榜";

        t.tfMyCount.text = `抽签：${t_model.myRankCount}次`;

        t.tfDes.text = `前三名上榜需要抽签${t_model.rankRequire}次`;
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.XYFQ_RANK_UPDATE, t.onRankUpdate, t);
    }
    //======================================== handler =========================================
    private onRankUpdate() {
        let t = this;
        t.refreshData();
    }
}