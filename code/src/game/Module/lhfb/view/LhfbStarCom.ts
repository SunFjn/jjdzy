/**
 * @author: lujiahao 
 * @date: 2020-02-28 22:51:43 
 */
class LhfbStarCom extends fairygui.GComponent {

    //>>>>start
	public ctrl: fairygui.Controller;
	public tfStar: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://3o8q23uuymt71w";

    public static createInstance(): LhfbStarCom {
        return <LhfbStarCom><any>(fairygui.UIPackage.createObject("syzlb", "LhfbStarCom"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);

        let t = this;
        CommonManager.parseChildren(t, t);
    }
    //=========================================== API ==========================================
    //===================================== private method =====================================
    //======================================== handler =========================================
}