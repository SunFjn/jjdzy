class YJDQ_RankItem extends fairygui.GComponent {

	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbLv: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;

	public static URL: string = "ui://pkuzcu87ejh46";

	public static createInstance(): YJDQ_RankItem {
		return <YJDQ_RankItem><any>(fairygui.UIPackage.createObject("FuBen", "YJDQ_RankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbRank = <fairygui.GRichTextField><any>(this.getChild("lbRank"));
		this.lbName = <fairygui.GRichTextField><any>(this.getChild("lbName"));
		this.lbLv = <fairygui.GRichTextField><any>(this.getChild("lbLv"));
		this.powerLb = <fairygui.GRichTextField><any>(this.getChild("powerLb"));
	}

	public show(arr: Array<any>): void {
		let arr1 = ["", "普通", "困难", "噩梦", "传说"];
		this.lbRank.text = arr[0] + "";
		this.lbName.text = arr[1];
		if (arr[3] <= 0) {
			this.lbLv.text = arr1[1] + "0波";
		} else {
			let cfg = Config.yiqi_007[arr[3]];
			this.lbLv.text = arr1[arr[2]] + cfg.bo + "波";
		}
		this.powerLb.text = arr[4] + "";
	}
}