/**
 * @author: lujiahao 
 * @date: 2020-01-07 17:48:23 
 */
class LuckyPoolPreviewItem extends fairygui.GLabel {

    //>>>>start
	public hCtrl: fairygui.Controller;
	public iconLoader: fairygui.GLoader;
	public itemList: fairygui.GList;
	//>>>>end

    public static URL: string = "ui://wx4kos8ulxqwn";

    public static createInstance(): LuckyPoolPreviewItem {
        return <LuckyPoolPreviewItem><any>(fairygui.UIPackage.createObject("luckyEgg", "LuckyPoolPreviewItem"));
    }

    public constructor() {
        super();
    }

    private _curData: VoPoolLuckyEgg;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        // t.itemList.setVirtual();
    }

    //=========================================== API ==========================================
    public setData(pData: VoPoolLuckyEgg) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.iconLoader.url = CommonManager.getUrl("luckyEgg", "levelImg_" + pData.poolType);
            t.itemList.numItems = pData.rewardList.length;

            if (pData.rewardList.length > 10)
                t.hCtrl.selectedIndex = 2;
            else if (pData.rewardList.length > 5)
                t.hCtrl.selectedIndex = 1;
            else
                t.hCtrl.selectedIndex = 0;
        }
        else {
            t.itemList.numItems = 0;
        }
    }

    public clean() {
        let t = this;
        t.setData(null);
        super.clean();
    }

    public dispose() {
        let t = this;
        t.clean();
        super.dispose();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: ViewGridRender) {
        let t = this;
        if (t._curData) {
            pItem.vo = t._curData.rewardList[pIndex];
        }
    }
    //======================================== handler =========================================
}