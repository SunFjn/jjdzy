class SGZS_RankItem extends fairygui.GComponent {

	public lbRank: fairygui.GRichTextField;
	public gridArr: Array<ViewGrid> = [];

	public static URL: string = "ui://me1skowlp24e8";

	public static createInstance(): SGZS_RankItem {
		return <SGZS_RankItem><any>(fairygui.UIPackage.createObject("Arena", "SGZS_RankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbRank = <fairygui.GRichTextField><any>(this.getChild("lbRank"));
		for (let i = 0; i < 4; i++) {
			let grid: ViewGrid = <ViewGrid><any>(this.getChild("grid" + i));
			grid.isShowEff = true;
			this.gridArr.push(grid);
		}
	}

	private _vo: any;
	public set vo(vo: any) {
		let arr = JSON.parse(vo.rank);
		if (arr[0][0] == arr[0][1]) {
			this.lbRank.text = "第" + arr[0][0] + "名";
		} else if (vo.id == 1) {
			this.lbRank.text = arr[0][0] + "名以后";
		} else {
			this.lbRank.text = "第" + arr[0][0] + "-" + arr[0][1] + "名";
		}
		let rewardArr = JSON.parse(vo.reward1);
		for (let i = 0; i < this.gridArr.length; i++) {
			if (i < rewardArr.length) {
				let vo: IGridImpl;
				if (rewardArr[i][0] == Enum_Attr.ITEM) {
					vo = VoItem.create(rewardArr[i][1]);
				} else if (rewardArr[i][0] == Enum_Attr.EQUIP) {
					vo = VoEquip.create(rewardArr[i][1]);
				} else {
					vo = Vo_Currency.create(rewardArr[i][0]);
				}
				vo.count = rewardArr[i][2];
				this.gridArr[i].vo = vo;
				this.gridArr[i].tipEnabled = true;
				this.gridArr[i].visible = true;
			} else {
				this.gridArr[i].visible = false;
				this.gridArr[i].tipEnabled = false;
			}
		}
	}

	public get vo(): any {
		return this._vo;
	}

	public clean() {
		ConfigHelp.cleanGridEff(this.gridArr);
	}
}