class CountryBossRnk extends fairygui.GComponent {

	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbLv: fairygui.GRichTextField;

	public static URL: string = "ui://uwzc58njofde2n";

	public static createInstance(): CountryBossRnk {
		return <CountryBossRnk><any>(fairygui.UIPackage.createObject("country", "CountryBossRnk"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbRank = <fairygui.GRichTextField><any>(this.getChild("lbRank"));
		this.lbName = <fairygui.GRichTextField><any>(this.getChild("lbName"));
		this.lbLv = <fairygui.GRichTextField><any>(this.getChild("lbLv"));
	}

	public setdata(data: any, rank: number) {
		this.lbRank.text = "" + (rank + 1);
		this.lbName.text = "" + data.name;
		this.lbLv.text = "" + ConfigHelp.getYiWanText(data.demage);
	}
}