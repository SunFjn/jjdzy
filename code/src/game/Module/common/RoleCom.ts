/**
 * 角色模型容器
 * @author: lujiahao 
 * @date: 2019-09-29 15:39:40 
 */
class RoleCom extends fairygui.GComponent {

    //>>>>start
	public test: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://jvxpx9emgxpd3gh";

    private awatar: UIRole = null;

    public static createInstance(): RoleCom {
        return <RoleCom><any>(fairygui.UIPackage.createObject("common", "RoleCom"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
        
        this.test.visible = false;
    }

    //=========================================== API ==========================================
    //===================================== private method =====================================
    //======================================== handler =========================================
}