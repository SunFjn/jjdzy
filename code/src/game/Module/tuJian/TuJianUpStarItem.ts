class TuJianUpStarItem extends fairygui.GComponent {

	public attLb: fairygui.GRichTextField;
	public stateLb: fairygui.GRichTextField;

	public static URL: string = "ui://m0rbmsgscjfy3d";

	public static createInstance(): TuJianUpStarItem {
		return <TuJianUpStarItem><any>(fairygui.UIPackage.createObject("TuJian", "TuJianUpStarItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.attLb = <fairygui.GRichTextField><any>(this.getChild("attLb"));
		this.stateLb = <fairygui.GRichTextField><any>(this.getChild("stateLb"));
	}

	public updateShow(vo: Vo_TuJian, cfg: Ipicstar_005) {
		let self = this;
		if (vo.starLv >= cfg.lv) {
			self.attLb.text = HtmlUtil.fontNoSize(cfg.describe, Color.getColorStr(1));
			self.stateLb.text = HtmlUtil.fontNoSize("已激活", Color.getColorStr(2));
		} else {
			self.attLb.text = HtmlUtil.fontNoSize(cfg.describe, "#666666");
			self.stateLb.text = HtmlUtil.fontNoSize(cfg.lv + "星激活", Color.getColorStr(6));
		}
	}
}