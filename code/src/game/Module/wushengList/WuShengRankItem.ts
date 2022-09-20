class WuShengRankItem extends fairygui.GComponent {

	public rankLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public rankImg: fairygui.GLoader;

	public static URL: string = "ui://a8l39nm9rkjpc";

	public static createInstance(): WuShengRankItem {
		return <WuShengRankItem><any>(fairygui.UIPackage.createObject("wushengList", "WuShengRankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.rankLb = <fairygui.GRichTextField><any>(this.getChild("rankLb"));
		this.nameLb = <fairygui.GRichTextField><any>(this.getChild("nameLb"));
		this.powerLb = <fairygui.GRichTextField><any>(this.getChild("powerLb"));
		this.rankImg = <fairygui.GLoader><any>(this.getChild("rankImg"));
	}

	//玩家idU:玩家姓名L:玩家战力B:排名
	public show(arr, rank) {
		this.rankImg.visible = false;
		this.rankLb.visible = false;
		if (rank <= 3) {
			this.rankImg.visible = true;
			this.rankImg.url = CommonManager.getCommonUrl("rank_" + rank);
		} else {
			this.rankLb.visible = true;
			this.rankLb.text = rank + "";
		}
		if (arr) {
			this.nameLb.text = HtmlUtil.fontNoSize(arr[1], Color.getColorStr(1));
			this.powerLb.text = arr[2] + "";
		} else {
			this.nameLb.text = HtmlUtil.fontNoSize("虚位以待", Color.getColorStr(1));
			this.powerLb.text = "";
		}
	}
}