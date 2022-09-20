class ZSSFGeneralGoItem extends fairygui.GButton {

	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public starLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public perLb: fairygui.GRichTextField;
	public starGroup: fairygui.GGroup;

	public static URL: string = "ui://3o8q23uucenr19";

	public static createInstance(): ZSSFGeneralGoItem {
		return <ZSSFGeneralGoItem><any>(fairygui.UIPackage.createObject("syzlb", "ZSSFGeneralGoItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public cfg: Ihero_211;
	public onShow(cfg: Ihero_211) {
		let self = this;
		self.cfg = cfg;
		ImageLoader.instance.loader(Enum_Path.HEAD_URL + cfg.head + ".png", self.imgIcon);
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + Model_WuJiang.getHeroQuality(cfg) + ".png", self.bg);
		self.starLb.text = Model_WuJiang.wuJiangStar[cfg.type] + "";
		self.nameLb.text = cfg.name;
		self.nameLb.color = Color.getColorInt(cfg.pinzhi);
		let perValue = 0;
		switch (cfg.pinzhi) {
			case 3:
				perValue = 8003;
				break;
			case 4:
				perValue = 8008;
				break;
			case 5:
				perValue = 8009;
				break;
			case 6:
			case 7:
				perValue = 8010;
				break;
			default:
				perValue = 8011;
				break;
		}
		self.perLb.text = "品质加成：" + cfg.pinzhi * (Config.xtcs_004[8002].num / 1000) + "%\n" + "星级加成：" +
			Model_WuJiang.getWuJiangStarByJob(cfg.type) * (Config.xtcs_004[perValue].num / 1000) + "%";
	}

	public clean() {

	}
}