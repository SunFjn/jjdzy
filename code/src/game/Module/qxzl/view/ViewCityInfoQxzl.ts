/**
 * 城池查看界面
 * @author: lujiahao 
 * @date: 2019-09-29 10:35:47 
 */
class ViewCityInfoQxzl extends UIModalPanel {

    //>>>>start
    public frame: fairygui.GLabel;
    public list: fairygui.GList;
    public btnReward: Button2;
    public tfDes: fairygui.GRichTextField;
    public btnNext: Button2;
    public btnLast: Button2;
    public tfPage: fairygui.GRichTextField;
    public imageSpec: fairygui.GImage;
    //>>>>end

    public static URL: string = "ui://6d8dzzdgfmjxv";

    public static createInstance(): ViewCityInfoQxzl {
        return <ViewCityInfoQxzl><any>(fairygui.UIPackage.createObject("qxzl", "ViewCityInfoQxzl"));
    }

    private _curData: VoCityQxzl;
    /** 每页显示个数 */
    private _perPageCount = 9;
    private _curPageDataList: VoPlayerQxzl[];
    private _curPage = 1;

    public constructor() {
        super();
        this.loadRes("qxzl", "qxzl_atlas0");
    }

    protected childrenCreated() {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewCityInfoQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);

        this.initView();

        super.childrenCreated();
    }

    protected initView(): void {
        this.list.itemRenderer = this.onItemRender;
        this.list.callbackThisObj = this;
    }
    //=========================================== API ==========================================
    protected onShown() {
        let t = this;

        let t_arg: { cityId: number } = t._args;
        if (t_arg) {
            this._curData = GGlobal.modelQxzl.getCityVoById(t_arg.cityId);
        }

        if (this._curData) {
            GGlobal.modelQxzl.CG_QunXiongZhuLu_showCityInfo_8969(this._curData.id, 1);
        }


        t.refreshData(1);
        t.registerEvent(true);
    }

    protected onHide() {
        let t = this;
        t.registerEvent(false);
        this._curPageDataList.length = 0;
        t.list.numItems = 0;
    }

    public dispose() {
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: RoleInfoItem) {
        if (this._curPageDataList) {
            let t_startIndex = (this._curPage - 1) * EnumQxzl.PER_PAGE_COUNT;
            let t_index = t_startIndex + pIndex;
            pItem.setData(t_index, this._curPageDataList[pIndex], this._curData.id);
        }
    }

    private refreshData(pPage: number) {
        let t = this;
        t._curPage = pPage;
        let t_model = GGlobal.modelQxzl;
        if (t._curData) {
            let t_sourceList = t._curData.playerList;
            t._curPageDataList = ArrayUitl.getDataListByPageNum(pPage, t._perPageCount, t_sourceList);
            t.list.numItems = t._curPageDataList.length;

            if (t._curData.isDouble)
                t.imageSpec.visible = true;
            else
                t.imageSpec.visible = false;

            t.tfPage.text = t._curPage + "/" + t._curData.maxPage;

            if (t._curData.isDouble) {
                t.tfDes.text = ConfigHelp.reTxt("每10分钟可积累获得<font color='#15f234'>{0}鹿角</font>、<font color='#15f234'>{1}积分</font>，并消耗<font color='#ed1414'>{2}体力</font>", t_model.doubleGuardReward[0].count, t_model.doubleGuardPoint, t._curData.cfg.conmuse);
            }
            else {
                t.tfDes.text = ConfigHelp.reTxt("每10分钟可积累获得<font color='#15f234'>{0}鹿角</font>、<font color='#15f234'>{1}积分</font>，并消耗<font color='#ed1414'>{2}体力</font>", t._curData.rewardLujiao, t._curData.cfg.point, t._curData.cfg.conmuse);
            }

            if (t._curData.countryId > 0)
                t.frame.title = ConfigHelp.reTxt("{0} - {1}", t._curData.cfg.name, FastAPI.getCountryName(t._curData.countryId, true));
            else
                t.frame.title = t._curData.cfg.name;
        }
        else {
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_CITY_INFO_UPDATE, t.onCityInfoUpdate, t);

        EventUtil.register(pFlag, t.btnLast, egret.TouchEvent.TOUCH_TAP, t.onBtnPageClick, t);
        EventUtil.register(pFlag, t.btnNext, egret.TouchEvent.TOUCH_TAP, t.onBtnPageClick, t);
        EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onCityInfoUpdate(pData: { cityId: number, curPage: number }) {
        if (this._curData && pData.cityId == this._curData.id) {
            this.refreshData(pData.curPage);
        }
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnReward:
                if (t._curData) {
                    if (t._curData.isDouble) {
                        //庆典显示不同的奖励
                        View_BoxReward_Show.show(GGlobal.modelQxzl.doubleRewardList, "<font color='#FFC344'>（庆典城池）</font>领地奖励22点结算后通过邮件发放", "领地奖励");
                    }
                    else {
                        View_BoxReward_Show.show(t._curData.rewardList, "领地奖励22点结算后通过邮件发放", "领地奖励");
                    }
                }
                break;
        }
    }

    private onBtnPageClick(e: egret.TouchEvent) {
        let t = this;
        let t_page = 0;
        switch (e.currentTarget) {
            case t.btnLast:
                if (this._curPage <= 1)
                    return;
                t_page = this._curPage - 1;
                break;

            case t.btnNext:
                if (this._curPage >= this._curData.maxPage)
                    return;
                t_page = this._curPage + 1;
                break;
        }
        GGlobal.modelQxzl.CG_QunXiongZhuLu_showCityInfo_8969(t._curData.id, t_page);
    }
}