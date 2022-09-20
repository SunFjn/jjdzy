/**
 * @author: lujiahao 
 * @date: 2020-01-07 17:36:07 
 */
class LuckyEggItem extends fairygui.GComponent {

    //>>>>start
	public typeCtrl: fairygui.Controller;
	public bg: fairygui.GLoader;
	//>>>>end

    public static URL: string = "ui://wx4kos8uosj3h";

    public static createInstance(): LuckyEggItem {
        return <LuckyEggItem><any>(fairygui.UIPackage.createObject("luckyEgg", "LuckyEggItem"));
    }

    public constructor() {
        super();
    }

    private _curData: VoItemLuckyEgg;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: VoItemLuckyEgg) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.typeCtrl.selectedIndex = pData.poolType - 1;
            if (pData.hasGet)
                t.visible = false;
            else
                t.visible = true;
        }
        else {
            t.visible = false;
        }
    }

    public dispose() {
        super.dispose();
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}