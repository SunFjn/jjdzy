/**
 * 群雄逐鹿排名界面
 * @author: lujiahao 
 * @date: 2019-10-08 15:08:27 
 */
class ViewRankQxzl extends UIModalPanel {

    //>>>>start
	public tabCtrl: fairygui.Controller;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public tab3: TabButton;
    public tab4: TabButton;
	public frame: fairygui.GLabel;
	public listCountry: fairygui.GList;
	public headItem: QxzlHead;
	public loaderTitle: fairygui.GLoader;
	public tfScore: fairygui.GRichTextField;
	public mpvItemList: fairygui.GList;
	public tfDes: fairygui.GRichTextField;
	public listPlayer: fairygui.GList;
	public tfMyRank: fairygui.GRichTextField;
	public tfMyScore: fairygui.GRichTextField;
    public personList: fairygui.GList;
    public lbMyRank: fairygui.GRichTextField;
    public lbScore: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://6d8dzzdgcpw919";

    public static createInstance(): ViewRankQxzl {
        return <ViewRankQxzl><any>(fairygui.UIPackage.createObject("qxzl", "ViewRankQxzl"));
    }

    private _countryVoList: VoCountryQxzl[];
    private _playerListLen = 0;
    private _curCountryId = 0;

    private _personVoList: VoRankPlayer[];

    public constructor() {
        super();
        this.loadRes("qxzl", "qxzl_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewRankQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        let t = this;
        t.listCountry.itemRenderer = t.onCountryItemRender;
        t.listCountry.callbackThisObj = t;
        t.listCountry.setVirtual();

        t.listPlayer.itemRenderer = t.onPlayerItemRender;
        t.listPlayer.callbackThisObj = t;
        t.listPlayer.setVirtual();

        t.mpvItemList.itemRenderer = t.onMvpItemRender;
        t.mpvItemList.callbackThisObj = t;
        t.mpvItemList.setVirtual();

        t.personList.itemRenderer = t.onPersonItemRender;
        t.personList.callbackThisObj = t;
        t.personList.setVirtual();

        t._playerListLen = GGlobal.modelQxzl.getRankVoListByType(2).length;

        ImageLoader.instance.loader(Enum_Path.TITLE_URL + "chenghao_085.png", t.loaderTitle);

        t.mpvItemList.numItems = GGlobal.modelQxzl.mvpRewardList.length;

    }

    //=========================================== API ==========================================
    protected onShown() {
        let t = this;
        t.registerEvent(true);

        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 4;
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onCountryItemRender(pIndex: number, pItem: QxzlCountryRankItem) {
        let t = this;
        if (t._countryVoList) {
            pItem.setData(t._countryVoList[pIndex]);
        }
    }

    private onPlayerItemRender(pIndex: number, pItem: QxzlPlayerRankItem) {
        let t = this;
        let t_rank = pIndex + 1;
        if (t._curCountryId > 0)
            pItem.setData(t._curCountryId, t_rank);
    }

    private onMvpItemRender(pIndex: number, pItem: ViewGrid) {
        let t_list = GGlobal.modelQxzl.mvpRewardList
        if (t_list) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    }

    private onPersonItemRender(pIndex: number, pItem: QxzlPlayerPersonRankItem) {
        let t = this;
        let t_rank = pIndex + 1;
        pItem.setData(t._personVoList[pIndex], t_rank);
    }

    private refreshData(pTabIndex: number) {
        let t = this;
        let t_model = GGlobal.modelQxzl;
        switch (pTabIndex) {
            case 0:
                t._countryVoList = t_model.getCountryVoList().concat();
                t._countryVoList.sort((pA, pB) => {
                    return pA.rank - pB.rank;
                });
                t.listCountry.numItems = t._countryVoList.length;

                t.headItem.setData(t_model.mvpInfo);
                t.tfScore.text = ConfigHelp.reTxt("积分：{0}", t_model.mvpInfo.score);
                break;

            case 4:
                t._personVoList = t_model.personRankList;
                t._personVoList.sort((pA, pB) => {
                    return pA.rank - pB.rank;
                });
                t.personList.numItems = 11;

                if(t_model.myPersonRank <= 0)
                {
                    t.lbMyRank.text = "我的排名：无";
                }else if(t_model.myPersonRank > 0 && t_model.myPersonRank <= 10){
                    t.lbMyRank.text = ConfigHelp.reTxt("我的排名：{0}", t_model.myPersonRank);
                }else
                {
                    t.lbMyRank.text = "我的排名：10+";
                }
                t.lbScore.text = ConfigHelp.reTxt("我的积分：{0}", t_model.myPersonScore);
                break;

            default:
                t.listPlayer.numItems = t._playerListLen;
                t._curCountryId = pTabIndex;

                if (t_model.myCountry == pTabIndex) {
                    if (t_model.myRank > 0) {
                        t.tfMyRank.text = ConfigHelp.reTxt("我的排名：{0}", t_model.myRank);
                    }
                    else {
                        t.tfMyRank.text = ConfigHelp.reTxt("我的排名：{0}", "未上榜");
                    }
                    t.tfMyScore.text = ConfigHelp.reTxt("我的积分：{0}", t_model.myScore);
                }
                else {
                    t.tfMyRank.text = "";
                    t.tfMyScore.text = "";
                }
                break;
        }
    }

    private getGListByTabIndex(pTabIndex: number): fairygui.GList {
        let t = this;
        switch (pTabIndex) {
            case 0:
                return t.listCountry;
            default:
                return t.listPlayer;
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_RANK_COUNTRY_UPDATE, t.onRankCountryUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_RANK_PLAYER_UPDATE, t.onRankPlayerUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_RANK_PERSON_UPDATE, t.onRankPersonUpdate, t);

        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabChange, t);
    }

    //======================================== handler =========================================
    private onTabChange(e: fairygui.StateChangeEvent) {
        let t = this;
        let t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        t.refreshData(t_tabIndex);

        let t_gList = t.getGListByTabIndex(t_tabIndex);
        t_gList.scrollToView(0);

        switch (t_tabIndex) {
            case 0:
                GGlobal.modelQxzl.CG_QunXiongZhuLu_openRankUI_8953();
                break;
            case 4:
                GGlobal.modelQxzl.CG_openPersonRankUI_8983();
                break;
            default:
                GGlobal.modelQxzl.CG_QunXiongZhuLu_openCountryRankUI_8965(t_tabIndex);
                t.refreshData(t_tabIndex);
                break;
        }
    }

    private onRankCountryUpdate() {
        let t = this;
        let t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex == 0)
            t.refreshData(t_tabIndex);
    }

    private onRankPlayerUpdate() {
        let t = this;
        let t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex == 0)
            return;
        t.refreshData(t_tabIndex);
    }

    private onRankPersonUpdate() {
        let t = this;
        let t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex == 4)
            t.refreshData(t_tabIndex);
    }
}