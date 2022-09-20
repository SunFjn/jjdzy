class ShaoZhuGrid extends fairygui.GComponent {

	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public wearImg: fairygui.GImage;
	public maskBg: fairygui.GImage;
	public sourceLb: fairygui.GRichTextField;
	public sourceGroup: fairygui.GGroup;
	public starLb: fairygui.GRichTextField;
	public starGroup: fairygui.GGroup;
	public nameLb: fairygui.GRichTextField;
	public selectImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://p83wyb2bh7p81";

	public static createInstance(): ShaoZhuGrid {
		return <ShaoZhuGrid><any>(fairygui.UIPackage.createObject("ShaoZhu", "ShaoZhuGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		self.bg = <fairygui.GLoader><any>(self.getChild("bg"));
		self.imgIcon = <fairygui.GLoader><any>(self.getChild("imgIcon"));
		self.wearImg = <fairygui.GImage><any>(self.getChild("wearImg"));
		self.maskBg = <fairygui.GImage><any>(self.getChild("maskBg"));
		self.sourceLb = <fairygui.GRichTextField><any>(self.getChild("sourceLb"));
		self.sourceGroup = <fairygui.GGroup><any>(self.getChild("sourceGroup"));
		self.starLb = <fairygui.GRichTextField><any>(self.getChild("starLb"));
		self.starGroup = <fairygui.GGroup><any>(self.getChild("starGroup"));
		self.nameLb = <fairygui.GRichTextField><any>(self.getChild("nameLb"));
		self.selectImg = <fairygui.GImage><any>(self.getChild("selectImg"));
		self.noticeImg = <fairygui.GImage><any>(self.getChild("noticeImg"));
	}

	public vo: Vo_ShaoZhu;
	public setVo(vo: Vo_ShaoZhu) {
		let self = this;
		self.vo = vo;
		IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_" + vo.cfg.pz + ".png");
		IconUtil.setImg(self.imgIcon, Enum_Path.HEAD_URL + vo.cfg.head + ".png");
		self.wearImg.visible = vo.shaozhuID == Model_player.voMine.shaozhuID;
		self.sourceGroup.visible = self.maskBg.visible = vo.starLv == 0;
		self.sourceLb.text = vo.cfg.way;
		self.starLb.text = vo.starLv + "";
		self.starGroup.visible = vo.starLv > 0;
		self.nameLb.text = vo.cfg.name;
		self.nameLb.color = Color.getColorInt(vo.cfg.pz);
	}

	public choose(value: boolean) {
		this.selectImg.visible = value;
	}
}