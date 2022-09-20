class NoticeItem extends fairygui.GComponent {

	public noticeLb: fairygui.GRichTextField;

	public static URL: string = "ui://ye1luhg3ffubh";

	public static createInstance(): NoticeItem {
		return <NoticeItem><any>(fairygui.UIPackage.createObject("Welfare", "NoticeItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.noticeLb = <fairygui.GRichTextField><any>(this.getChild("noticeLb"));
	}

	public show() {
		if (Model_Welfare.welfareNotice) {
			this.noticeLb.text = Model_Welfare.welfareNotice;
		} else {
			this.noticeLb.text = Config.wfsm_200[4204].tips;
		}
	}
}