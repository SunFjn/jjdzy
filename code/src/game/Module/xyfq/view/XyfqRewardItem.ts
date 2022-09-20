/**
 * @author: lujiahao 
 * @date: 2020-04-09 16:21:54 
 */
class XyfqRewardItem extends fairygui.GComponent {

    //>>>>start
    public hCtrl: fairygui.Controller;
    public comTitle: fairygui.GLabel;
    public itemList: fairygui.GList;
    //>>>>end

    public static URL: string = "ui://7hwmix0gbnypu";

    public static createInstance(): XyfqRewardItem {
        return <XyfqRewardItem><any>(fairygui.UIPackage.createObject("xyfq", "XyfqRewardItem"));
    }

    public constructor() {
        super();
    }

    private _curData: VoQianXyfq;
    private _dataList: IGridImpl[];

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
    }

    //=========================================== API ==========================================
    public setData(pData: VoQianXyfq) {
        let t = this;
        t._curData = pData;
        if (pData) {
            let t_cfg = pData.rewardCfg;
            t.comTitle.title = t_cfg.name;

            let t_dataList = pData.rewardList;
            t._dataList = t_dataList;
            t.itemList.numItems = t_dataList.length;

            if (t_dataList.length > 12)
                t.hCtrl.selectedIndex = 2;
            else if (t_dataList.length > 6)
                t.hCtrl.selectedIndex = 1;
            else
                t.hCtrl.selectedIndex = 0;
        }
        else {
            t._dataList = null;
            t.itemList.numItems = 0;
        }
    }

    public clean() {
        this.setData(null);
        super.clean();
    }

    public dispose() {
        this.clean();
        super.dispose();
    }
    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: ViewGrid) {
        let t = this;
        if (t._dataList && t._dataList[pIndex]) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t._dataList[pIndex];
        }
    }
    //======================================== handler =========================================
}