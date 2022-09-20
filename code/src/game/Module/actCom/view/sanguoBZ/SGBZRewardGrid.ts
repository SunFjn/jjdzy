class SGBZRewardGrid extends fairygui.GComponent {

	public grid: ViewGrid;
	public lbName: fairygui.GRichTextField;
	public drawImg: fairygui.GImage;

	public static URL: string = "ui://y9683xrpws8yf";

	public static createInstance(): SGBZRewardGrid {
		return <SGBZRewardGrid><any>(fairygui.UIPackage.createObject("ActComSGBZ", "SGBZRewardGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public setVo(v: IGridImpl) {
		let self = this;
		self.grid.vo = v;
		if (v != null) {
			if (v.gType == Enum_Attr.ITEM) {
				var voi: VoItem = v as VoItem;
				self.lbName.text = voi.name;
				self.lbName.color = voi.qColor;
			} else if (v.gType == Enum_Attr.EQUIP) {
				var voe: VoEquip = v as VoEquip;
				self.lbName.text = voe.gridName;
				self.lbName.color = voe.qColor;
			} else {
				var voc: Vo_Currency = v as Vo_Currency;
				self.lbName.text = voc.name;
				self.lbName.color = voc.qColor;
			}
			self.grid.tipEnabled = true;
			//显示特效
			self.grid.showEff(v.showEffect);


			self.grid.lbNum.visible = false;
			if (v.count > 1) {
				self.grid.lbNum.visible = true;
				self.grid.lbNum.text = ConfigHelp.numToStr(v.count);
			}
		} else {
			this.lbName.text = "";
			self.grid.lbNum.visible = false;
			this.grid.tipEnabled = false;
			this.grid.showEff(false);
		}
	}

	public isShowImg(value: boolean) {
		this.drawImg.visible = value;
	}
}