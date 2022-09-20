class GmBar extends fairygui.GComponent {

	public lbTitle: fairygui.GTextField;
	public lbInput: fairygui.GTextInput;

	public static URL: string = "ui://vm9a8xq8q8rva";

	public static createInstance(): GmBar {
		return <GmBar><any>(fairygui.UIPackage.createObject("GM", "GmBar"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbTitle = <fairygui.GTextField><any>(this.getChild("lbTitle"));
		this.lbInput = <fairygui.GTextInput><any>(this.getChild("lbInput"));
	}

	public show(title: string, content: string) {
		this.lbInput.autoSize = fairygui.AutoSizeType.Both;
		this.lbTitle.text = title;
		if (content == "time") {
			content = DateUtil.getYMDHMS(Math.ceil(Model_GlobalMsg.getServerTime() / 1000));
		}
		this.lbInput.text = content;
		if (this.lbInput.textWidth < 120) {
			this.lbInput.autoSize = fairygui.AutoSizeType.None;
			this.lbInput.width = 120;
		}
	}
}