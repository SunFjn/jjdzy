class View_SGYT_LastRank extends fairygui.GComponent {

	public frame: fairygui.GLabel;
	public item: Child_SGYT_CountryRank;

	public static URL: string = "ui://z4ijxlqkiv4oi";

	public static createInstance(): View_SGYT_LastRank {
		return <View_SGYT_LastRank><any>(fairygui.UIPackage.createObject("sanGuoYiTong", "View_SGYT_LastRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.frame = <fairygui.GLabel><any>(this.getChild("frame"));
		this.item = <Child_SGYT_CountryRank><any>(this.getChild("item"));
	}
}