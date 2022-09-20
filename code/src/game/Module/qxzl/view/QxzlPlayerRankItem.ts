/**
 * @author: lujiahao 
 * @date: 2019-10-08 15:27:17 
 */
class QxzlPlayerRankItem extends fairygui.GComponent {

    //>>>>start
	public rankCtrl: fairygui.Controller;
	public stateCtrl: fairygui.Controller;
	public tfScore: fairygui.GRichTextField;
	public groupScore: fairygui.GGroup;
	public itemList: fairygui.GList;
	public loaderFlag: fairygui.GLoader;
	public tfName: fairygui.GRichTextField;
	public tfRank: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://6d8dzzdgg6cv1d";

    public static createInstance(): QxzlPlayerRankItem {
        return <QxzlPlayerRankItem><any>(fairygui.UIPackage.createObject("qxzl", "QxzlPlayerRankItem"));
    }

    private _curData: VoRankQxzl;
    private _curCountryId = 0;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    }

    //=========================================== API ==========================================
    public setData(pCountry: number, pRank: number) {
        let t = this;
        if (pRank > 0) {
            let t_dataList = GGlobal.modelQxzl.getRankVoListByType(2);
            t._curData = t_dataList[pRank - 1];
        }
        else
            t._curData = null;

        t._curCountryId = pCountry;
        if (t._curData) {
            t.itemList.numItems = t._curData.rewardList.length;

            if (pRank <= 3) {
                t.rankCtrl.selectedIndex = pRank;
            }
            else {
                t.rankCtrl.selectedIndex = 0;
                t.tfRank.text = pRank + "";
            }

            let t_playerList = GGlobal.modelQxzl.getRankPlayerListByCountry(pCountry);
            let t_playerVo = t_playerList[pRank - 1];
            if (t_playerVo) {
                t.tfName.text = t_playerVo.name;
                t.tfScore.text = ConfigHelp.reTxt("积分：{0}", t_playerVo.score);
                t.stateCtrl.selectedIndex = 1;
            }
            else {
                t.tfName.text = HtmlUtil.font("虚位以待", 0xcccccc);
                t.stateCtrl.selectedIndex = 0;
            }

            t.registerEvent(true);
        }
        else {
            t.itemList.numItems = 0;
            t.registerEvent(false);
        }
    }

    public clean() {
        this.setData(0, 0);
        super.clean();
    }

    public dispose() {
        this.clean();
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: ViewGrid) {
        let t = this;
        if (!t._curData)
            return;
        let t_dataList = t._curData.rewardList;
        if (t_dataList) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_dataList[pIndex];
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
    }
    //======================================== handler =========================================
}