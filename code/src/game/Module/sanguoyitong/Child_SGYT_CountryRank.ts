class Child_SGYT_CountryRank extends fairygui.GComponent {

	public item0: SGYT_CountryRankRewardItem;
	public item1: SGYT_CountryRankRewardItem;
	public item2: SGYT_CountryRankRewardItem;
	public countryLb: fairygui.GRichTextField;

	public static URL: string = "ui://z4ijxlqkiv4oq";

	public static createInstance(): Child_SGYT_CountryRank {
		return <Child_SGYT_CountryRank><any>(fairygui.UIPackage.createObject("sanGuoYiTong", "Child_SGYT_CountryRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.item0 = <SGYT_CountryRankRewardItem><any>(this.getChild("item0"));
		this.item1 = <SGYT_CountryRankRewardItem><any>(this.getChild("item1"));
		this.item2 = <SGYT_CountryRankRewardItem><any>(this.getChild("item2"));
		this.countryLb = <fairygui.GRichTextField><any>(this.getChild("countryLb"));
	}
}