class TestPanel extends fairygui.GComponent implements IPanel{

    //>>>>start
	public fuck0: fairygui.GImage;
	public fuck1: fairygui.GImage;
	//>>>>end

    public static URL:string = "ui://g8w9swygmvdu9";

    public static pkg = "actCom";

    public static createInstance():TestPanel {
        return <TestPanel><any>(fairygui.UIPackage.createObject("actCom","TestPanel"));
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
    }
}