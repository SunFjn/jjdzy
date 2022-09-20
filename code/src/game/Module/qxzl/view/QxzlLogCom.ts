/**
 * @author: lujiahao 
 * @date: 2019-10-09 19:29:10 
 */
class QxzlLogCom extends fairygui.GComponent {

    //>>>>start
	public tfContent: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://6d8dzzdgi2j21g";

    public static createInstance(): QxzlLogCom {
        return <QxzlLogCom><any>(fairygui.UIPackage.createObject("qxzl", "QxzlLogCom"));
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