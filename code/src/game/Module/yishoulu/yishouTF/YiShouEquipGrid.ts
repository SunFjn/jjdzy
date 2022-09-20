class YiShouEquipGrid extends fairygui.GComponent {

	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public selectImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public lbNum: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;
	public colorLb: fairygui.GRichTextField;
	public levelBg: fairygui.GImage;
	public colorBg: fairygui.GImage;
	public showImg: fairygui.GImage;
	public dataGroup: fairygui.GGroup;

	public static URL: string = "ui://7y83phvnpz9kr";

	public static createInstance(): YiShouEquipGrid {
		return <YiShouEquipGrid><any>(fairygui.UIPackage.createObject("YiShouLu", "YiShouEquipGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}


	public vo: Vo_YiShouEquip;
	public setVo(vo: Vo_YiShouEquip, index = 0) {
		let self = this;
		self.vo = vo;
		if (vo) {
			self.setShowImg(true)
			let itemVo = VoItem.create(vo.cfg.daoju);
			IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_" + Math.floor(vo.color / 1000) + ".png");
			IconUtil.setImg(self.imgIcon, Enum_Path.ICON70_URL + itemVo.icon + ".png");
			if (index == 0) {
				let jie = Math.floor((vo.level % 1000) / 10);
				let lv = vo.level % 10;
				self.lbNum.text = jie + "阶" + lv + "级";
				self.colorBg.visible = self.colorLb.visible = false;
				self.lbNum.visible = self.levelBg.visible = true;
			} else {
				self.colorLb.text = "+" + vo.color % 100;
				self.colorBg.visible = self.colorLb.visible = true;
				self.lbNum.visible = self.levelBg.visible = false;
			}
			self.nameLb.text = vo.cfg.mingzi;
			self.nameLb.color = Color.getColorInt(Math.floor(vo.color / 1000));
		} else {
			self.setShowImg(false);
			IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_1.png");
		}
	}

	public checkNotice(value) {
		this.noticeImg.visible = value;
	}

	public setChoose(value: boolean) {
		this.selectImg.visible = value;
	}

	public setShowImg(value: boolean) {
		let self = this;
		self.showImg.visible = !value;
		self.dataGroup.visible = value;
	}

	public clean() {
		let self = this;
		self.selectImg.visible = false;
		self.vo = null;
		IconUtil.setImg(self.imgIcon, null);
		IconUtil.setImg(self.bg, null);
	}
}