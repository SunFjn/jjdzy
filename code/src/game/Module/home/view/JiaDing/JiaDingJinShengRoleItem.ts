class JiaDingJinShengRoleItem extends fairygui.GLabel {

	public modelImg0: fairygui.GLoader;
	public backImg: fairygui.GLoader;
	public list: fairygui.GList;

	public static URL: string = "ui://ypo8uejwgz25c";

	public static createInstance(): JiaDingJinShengRoleItem {
		return <JiaDingJinShengRoleItem><any>(fairygui.UIPackage.createObject("JiaDing", "JiaDingJinShengRoleItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.listRender;
	}

	private listRender(index: number, item: JiaDingSkill) {
		let self = this;
		let cfg = Config.jdskill_021[self.skillListArr[index][0]];
		item.setVo(cfg);
	}


	private skillListArr: number[];
	private uirole: UIRole;
	public setVo(cfg: Ijdjins_021) {
		let self = this;
		if (!self.uirole) {
			self.uirole = UIRole.create();
			self.uirole.uiparent = self.modelImg0.displayObject as fairygui.UIContainer;
			self.uirole.setPos(self.modelImg0.width / 2, self.modelImg0.height);
		}
		let mx = 0;
		if (Config.sz_739[cfg.moxing]) {
			mx = Config.sz_739[cfg.moxing].moxing;
		} else {
			mx = Number(cfg.moxing);
		}
		self.uirole.setBody(mx);
		self.uirole.onAdd();
		self.skillListArr = JSON.parse(cfg.skill);
		self.list.numItems = self.skillListArr.length;
		self.text = cfg.mingzi;
		IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "jiading.png");
	}

	public clean() {
		let self = this;
		if (self.uirole) {
			self.uirole.onRemove();
			self.uirole = null;
		}
		IconUtil.setImg(self.backImg, null);
		self.list.numItems = 0;
	}
}