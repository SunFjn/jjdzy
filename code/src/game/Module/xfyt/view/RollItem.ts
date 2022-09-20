/**
 * @author: lujiahao 
 * @date: 2019-10-30 17:36:19 
 */
class RollItem extends fairygui.GComponent {

    //>>>>start
	public indexCtrl: fairygui.Controller;
	//>>>>end

    public static URL: string = "ui://n5noipr2vpqqf";

    public static createInstance(): RollItem {
        return <RollItem><any>(fairygui.UIPackage.createObject("xfyt", "RollItem"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }

    //=========================================== API ==========================================
    //===================================== private method =====================================
    //======================================== handler =========================================
}