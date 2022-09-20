/**
 * @author: lujiahao 
 * @date: 2019-10-08 15:22:52 
 */
class QxzlCountryRankItem extends fairygui.GComponent {

    //>>>>start
    public tfScore: fairygui.GRichTextField;
    public itemList: fairygui.GList;
    public loaderFlag: fairygui.GLoader;
    public tfCountry: fairygui.GRichTextField;
    //>>>>end

    public static URL: string = "ui://6d8dzzdgcpw91b";

    public static createInstance(): QxzlCountryRankItem {
        return <QxzlCountryRankItem><any>(fairygui.UIPackage.createObject("qxzl", "QxzlCountryRankItem"));
    }

    private _curData: VoCountryQxzl;

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
    public setData(pData: VoCountryQxzl) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.tfCountry.text = FastAPI.getCountryName(pData.countryId, true);
            t.tfScore.text = ConfigHelp.reTxt("总积分：{0}", pData.score);

            if (pData.countryId > 0) {
                IconUtil.setImg(t.loaderFlag, Enum_Path.IMAGE_MODULES_URL + "country/countrya" + pData.countryId + ".png");
            }

            t.itemList.numItems = pData.rewardList.length;

            t.registerEvent(true);
        }
        else {
            t.itemList.numItems = 0;
            t.registerEvent(false);
        }
    }

    public clean() {
        this.setData(null);
        IconUtil.setImg(this.loaderFlag, null);
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