class JiFenRewardItem extends fairygui.GComponent {

	public jifenLb: fairygui.GRichTextField;
	public drawBt: Button0;
	public drawImg: fairygui.GImage;
	public gridArr: Array<ViewGrid> = [];

	public static URL: string = "ui://xzyn0qe3i6imj";

	public static createInstance(): JiFenRewardItem {
		return <JiFenRewardItem><any>(fairygui.UIPackage.createObject("nzbz", "JiFenRewardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.jifenLb = <fairygui.GRichTextField><any>(this.getChild("jifenLb"));
		this.drawBt = <Button0><any>(this.getChild("drawBt"));
		this.drawImg = <fairygui.GImage><any>(this.getChild("drawImg"));
		for (let i = 0; i < 3; i++) {
			let grid: ViewGrid = <ViewGrid><any>(this.getChild("grid" + i));
			grid.isShowEff = true;
			this.gridArr.push(grid);
		}
		this.drawBt.addClickListener(this.drawHandler, this);
	}

	private drawHandler(): void {
		if (this.drawBt.checkNotice) {
			GGlobal.modelnzbz.CG_NZBZ_DRAW_JIFENREWARD(this.vo.point);
		} else {
			ViewCommonWarn.text("尚未达到领取条件");
		}
	}

	private _vo: any;
	public set vo(vo: any) {
		this._vo = vo;
		if (vo) {
			if (Model_NZBZ.myJiFen >= vo.point) {
				this.jifenLb.text = "积分达到" + HtmlUtil.fontNoSize("(" + Model_NZBZ.myJiFen + "/" + vo.point + ")", Color.getColorStr(2));
			} else {
				this.jifenLb.text = "积分达到" + HtmlUtil.fontNoSize("(" + Model_NZBZ.myJiFen + "/" + vo.point + ")", Color.getColorStr(6));
			}
			let rewardArr = JSON.parse(vo.reward);
			for (let i = 0; i < 3; i++) {
				if (i < rewardArr.length) {
					let vo: IGridImpl;
					if (rewardArr[i][0] == Enum_Attr.ITEM) {
						vo = VoItem.create(rewardArr[i][1]);
					} else {
						vo = Vo_Currency.create(rewardArr[i][0]);
					}
					vo.count = rewardArr[i][2];
					this.gridArr[i].vo = vo;
					this.gridArr[i].tipEnabled = true;
					this.gridArr[i].visible = true;
				} else {
					this.gridArr[i].visible = false;
				}
			}
			if (Model_NZBZ.drawArr.indexOf(vo.point) != -1) {
				this.drawImg.visible = true;
				this.drawBt.visible = false;
				this.drawBt.checkNotice = false;
			} else {
				this.drawImg.visible = false;
				this.drawBt.visible = true;
				this.drawBt.enabled = this.drawBt.checkNotice = Model_NZBZ.myJiFen >= vo.point;
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