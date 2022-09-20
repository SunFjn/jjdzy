class ActTestPanel extends fairygui.GComponent implements IPanel {

    //>>>>start
	public fuck0: fairygui.GImage;
	public fuck1: fairygui.GImage;
	public fuck2: fairygui.GImage;
	public fuck3: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://g1ngk9h3mvdu0";

    /** 设置包名（静态属性） */
    public static pkg = "actTest";
    /** 绑定ui的方法（静态方法） */
    public static setExtends() {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
    }

    public static createInstance(): ActTestPanel {
        return <ActTestPanel><any>(fairygui.UIPackage.createObject("actTest", "ActTestPanel"));
    }


    public constructor() {
        super();
    }

    protected _viewParent: fairygui.GObject;
    initView(pParent: fairygui.GObject) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    }

    openPanel(pData?: any) {
    }

    closePanel(pData?: any) {
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);

        this.fuck0 = <fairygui.GImage><any>(this.getChild("fuck0"));
        this.fuck1 = <fairygui.GImage><any>(this.getChild("fuck1"));
        this.fuck2 = <fairygui.GImage><any>(this.getChild("fuck2"));
        this.fuck3 = <fairygui.GImage><any>(this.getChild("fuck3"));
    }
}