class TipWuJiangSkillShow extends UIModalPanel {

	public imgIcon: fairygui.GLoader;
	public bg: fairygui.GLoader;
	public labName: fairygui.GRichTextField;
	public labDesc: fairygui.GRichTextField;
	public wjBg: fairygui.GLoader;
	public gSkill: fairygui.GGroup;

	private awatar: UIRole = null;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("common", "TipWuJiangSkillShow").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.closeButton = new fairygui.GObject();
		super.childrenCreated();
	}

	protected onShown() {
		let self = this;
		IconUtil.setImg(self.wjBg, Enum_Path.BACK_URL + "wjGet.png");
		self.addClickListener(self.closeEventHandler, self);
	}

	protected onHide(): void {
		let self = this;
		IconUtil.setImg(self.wjBg, null);
		GGlobal.layerMgr.close(UIConst.TIP_WUJIANG_SKILLSHOW);
		self.removeClickListener(self.closeEventHandler, self);
		self.gSkill.y = self.wjBg.y + 53
		self.labName.text = ""
		self.labDesc.text = ""
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
	}

	public onOpen(arg) {
		super.onOpen(arg)
		this.show(arg.value, arg.index, arg.lv, arg.job, arg.starLv, arg.type, arg.damage)
	}

	private vo: Vo_Skill;
	public show(id: number, index: number, lv, job, starLv: number = 0, showType: number = 0, damage: number = 0): void {
		let self = this;
		if (starLv == 0) starLv = 1;
		self.vo = Vo_Skill.create(id, lv, starLv, 0, 0, damage);
		ImageLoader.instance.loader(Enum_Path.SKILL_URL + self.vo.icon + ".png", self.imgIcon);

		if (self.vo.level > 0 && self.vo.type != Model_Skill.TYPE3) {
			self.labName.text = self.vo.name + "Lv." + self.vo.level;
		} else {
			self.labName.text = self.vo.name;
		}
		(self.labDesc.displayObject as egret.TextField).wordWrap = true;
		self.labDesc.text = SkillUtil.getSkillDes(self.vo, showType);

		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.setPos(self.wjBg.x, self.wjBg.y);
			// self.awatar.setScaleXY(1.5, 1.5);
		}
		self.awatar.uiparent = self.displayListContainer;
		self.awatar.playSkillID(id);
		self.awatar.setBody(job);
		self.awatar.setWeapon(job);
		self.awatar.onAdd();

		if (Number(id) == 100208 || Number(id) == 112038) {
			self.gSkill.y = self.wjBg.y + 250
		} else {
			self.gSkill.y = self.wjBg.y + 53
		}
	}
}