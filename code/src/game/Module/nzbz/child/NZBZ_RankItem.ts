class NZBZ_RankItem extends fairygui.GComponent {

	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public jifenLb: fairygui.GRichTextField;
	public countryLb: fairygui.GLoader;
	public boxImg: fairygui.GLoader;

	public static URL: string = "ui://xzyn0qe3l3h39";

	public static createInstance(): NZBZ_RankItem {
		return <NZBZ_RankItem><any>(fairygui.UIPackage.createObject("nzbz", "NZBZ_RankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbRank = <fairygui.GRichTextField><any>(this.getChild("lbRank"));
		this.lbName = <fairygui.GRichTextField><any>(this.getChild("lbName"));
		this.jifenLb = <fairygui.GRichTextField><any>(this.getChild("jifenLb"));
		this.countryLb = <fairygui.GLoader><any>(this.getChild("countryLb"));
		this.boxImg = <fairygui.GLoader><any>(this.getChild("boxImg"));
		this.boxImg.touchable = true;
		this.boxImg.addClickListener(this.boxHandler, this);
	}

	private boxHandler(): void {
		for (let key in Config.nzbz_226) {
			let cfg = Config.nzbz_226[key];
			if (Math.floor(cfg.id / 10) == 2) {
				let rankArr = JSON.parse(cfg.rank);
				if (this.rank >= rankArr[0][0] && this.rank <= rankArr[0][1]) {
					let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
					View_BoxReward_Show.show(arr, "排名第" + this.rank + "可领取");
					break;
				}
			}
		}
	}

	private rank: number;
	//I:排名U:玩家名称B:国家I:积分
	public show(arr: Array<any>): void {
		this.rank = arr[0];
		this.lbRank.text = "" + arr[0];
		this.lbName.text = "" + arr[1];
		this.countryLb.url = CommonManager.getCommonUrl("country" + arr[2]);
		this.jifenLb.text = "" + arr[3];
	}
}