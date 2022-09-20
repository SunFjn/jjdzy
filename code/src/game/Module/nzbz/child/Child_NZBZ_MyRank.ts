class Child_NZBZ_MyRank extends fairygui.GComponent {

	public list: fairygui.GList;
	public rankLb: fairygui.GRichTextField;
	public jifenLb: fairygui.GRichTextField;

	public static URL: string = "ui://xzyn0qe3l3h3b";

	public static createInstance(): Child_NZBZ_MyRank {
		return <Child_NZBZ_MyRank><any>(fairygui.UIPackage.createObject("nzbz", "Child_NZBZ_MyRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandler;
		this.list.setVirtual();
		this.rankLb = <fairygui.GRichTextField><any>(this.getChild("rankLb"));
		this.jifenLb = <fairygui.GRichTextField><any>(this.getChild("jifenLb"));
	}

	private renderHandler(index: number, obj: fairygui.GObject): void {
		let item: NZBZ_RankItem = obj as NZBZ_RankItem;
		//I:排名U:玩家名称B:国家I:积分
		if (index < Model_NZBZ.rankArr.length) {
			item.show(Model_NZBZ.rankArr[index]);
		} else {
			item.show([index + 1, "虚位以待", 0, 0]);
		}
	}

	public updateShow(): void {
		if (Model_NZBZ.myRank == 0) {
			this.rankLb.text = "我的排名：10+";
		} else {
			this.rankLb.text = "我的排名：" + Model_NZBZ.myRank;
		}
		this.jifenLb.text = "我的积分：" + Model_NZBZ.myJiFen;
		this.list.numItems = Config.xtcs_004[1049].num;
	}

	public show(): void {
		this.updateShow();
	}

	public hide() {
		this.list.numItems = 0;
	}
}