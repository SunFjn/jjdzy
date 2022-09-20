/**
 * @author: lujiahao 
 * @date: 2020-01-07 17:52:34 
 */
class LuckyPoolRewardItem extends fairygui.GLabel {

    //>>>>start
	public hCtrl: fairygui.Controller;
	public iconLoader: fairygui.GLoader;
	public itemList: fairygui.GList;
	public flagList: fairygui.GList;
	//>>>>end

    public static URL: string = "ui://wx4kos8uchyoo";

    public static createInstance(): LuckyPoolRewardItem {
        return <LuckyPoolRewardItem><any>(fairygui.UIPackage.createObject("luckyEgg", "LuckyPoolRewardItem"));
    }

    public constructor() {
        super();
    }

    private _poolType = 0;
    private _dataList: VoItemLuckyEgg[];

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;

        t.flagList.itemRenderer = t.onFlagRender;
        t.flagList.callbackThisObj = t;
    }

    //=========================================== API ==========================================
    public setData(pPoolType: number) {
        let t = this;
        let t_model = GGlobal.modelLuckyEgg;
        if (pPoolType > 0) {
            t.iconLoader.url = CommonManager.getUrl("luckyEgg", "levelImg_" + pPoolType);

            t._dataList = t_model.getEggItemListByType(pPoolType);
            if (t._dataList) {
                t.flagList.numItems = t.itemList.numItems = t._dataList.length;

                if (t._dataList.length > 5)
                    t.hCtrl.selectedIndex = 1;
                else
                    t.hCtrl.selectedIndex = 0;
            }
            else {
                t.flagList.numItems = t.itemList.numItems = 0;
                t.hCtrl.selectedIndex = 0;
            }
        }
        else {
            t._dataList = null;
            t.flagList.numItems = t.itemList.numItems = 0;
        }
    }

    public clean() {
        this.setData(0);
        super.clean();
    }

    public dispose() {
        super.dispose();
    }
    //===================================== private method =====================================
    private onFlagRender(pIndex: number, pItem: fairygui.GImage) {
        let t = this;
        if (t._dataList) {
            let t_vo = t._dataList[pIndex];
            if (t_vo && t_vo.hasGet)
                pItem.visible = true;
            else
                pItem.visible = false;
        }
    }

    private onItemRender(pIndex: number, pItem: ViewGridRender) {
        let t = this;
        if (t._dataList && t._dataList[pIndex]) {
            pItem.vo = t._dataList[pIndex].itemVo;
        }
    }
    //======================================== handler =========================================
}