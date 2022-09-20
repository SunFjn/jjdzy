/**
 * @author: lujiahao 
 * @date: 2019-12-07 14:41:40 
 */
class KfwzGradeItem extends fairygui.GComponent {

    //>>>>start
	public gradeCtrl: fairygui.Controller;
	public itemList: fairygui.GList;
	public iconGrade: fairygui.GLoader;
	public iconGName: fairygui.GLoader;
	//>>>>end

    public static URL: string = "ui://me1skowlpmqq76";

    public static createInstance(): KfwzGradeItem {
        return <KfwzGradeItem><any>(fairygui.UIPackage.createObject("Arena", "KfwzGradeItem"));
    }

    private _curData: VoGradeKfwz;

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
    public setData(pData: VoGradeKfwz) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.itemList.numItems = pData.rewardList.length;
            t.gradeCtrl.selectedIndex = pData.cfg.dw - 1;
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
    //======================================== handler =========================================
}