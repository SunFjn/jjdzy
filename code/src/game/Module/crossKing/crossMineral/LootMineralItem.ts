class LootMineralItem extends fairygui.GComponent {
	public singImg0: fairygui.GImage;
	public singImg1: fairygui.GImage;
	public nameIcon: fairygui.GLoader;
	public selectImg: fairygui.GImage;
	public mineIcon: fairygui.GLoader;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://yqpfulefnyv75f";

	public static createInstance(): LootMineralItem {
		return <LootMineralItem><any>(fairygui.UIPackage.createObject("crossKing", "LootMineralItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.OnSelect(false);
	}

	public vo: Vo_MineData;
	public setVo(vo: Vo_MineData) {
		let self = this;
		self.vo = vo;
		self.singImg0.visible = Config.xtcs_004[6603].num - vo.myLoot > 0;
		IconUtil.setImg(self.mineIcon, Enum_Path.PIC_URL + "k" + vo.cfg.pz + ".png");
		self.nameIcon.url = CommonManager.getUrl("crossKing", "k" + vo.cfg.pz);
		if (Config.xtcs_004[6603].num - vo.myLoot <= 0) {
			self.singImg1.visible = Config.xtcs_004[6604].num - vo.mySteal > 0;
		} else {
			self.singImg1.visible = false;
		}
		self.checkNotice((Config.xtcs_004[6603].num - vo.myLoot > 0 && Model_CrossMineral.myLoot > 0)
			|| (Config.xtcs_004[6604].num - vo.mySteal > 0 && Model_CrossMineral.mySteal > 0));
	}

	public OnSelect(value) {
		this.selectImg.visible = value;
	}

	public checkNotice(value) {
		this.noticeImg.visible = value;
	}

	public clean() {
		IconUtil.setImg(this.mineIcon, null);
	}
}