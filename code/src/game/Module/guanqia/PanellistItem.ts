class PanellistItem extends fairygui.GComponent {

	public lbRank: fairygui.GTextField;
	public lbName: fairygui.GTextField;
	public lbGuanqia: fairygui.GTextField;

	public static URL: string = "ui://r92dp953hfx71";

	public static createInstance(): PanellistItem {
		return <PanellistItem><any>(fairygui.UIPackage.createObject("guanqia", "PanellistItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbRank = <fairygui.GTextField><any>(this.getChild("lbRank"));
		this.lbName = <fairygui.GTextField><any>(this.getChild("lbName"));
		this.lbGuanqia = <fairygui.GTextField><any>(this.getChild("lbGuanqia"));
	}

	public index:number = 0;
	public update(data) {
		this.lbRank.text = this.index + 1 + "";
		if (data) {
			this.lbName.text = data[1];
			this.lbGuanqia.text = data[2] + "关";
		} else {
			this.lbName.text = this.lbGuanqia.text = "";
		}
	}
}