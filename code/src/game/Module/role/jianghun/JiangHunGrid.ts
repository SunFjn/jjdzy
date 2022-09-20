class JiangHunGrid extends fairygui.GComponent {

	public bg: fairygui.GLoader;
	public iconImg: fairygui.GLoader;
	public maskImg: fairygui.GImage;
	public nameLv: fairygui.GRichTextField;
	public lockImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://3tzqotadk8ozf";

	public static createInstance(): JiangHunGrid {
		return <JiangHunGrid><any>(fairygui.UIPackage.createObject("role", "JiangHunGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	private _vo: Vo_JiangHun;
	public set vo(vo: Vo_JiangHun) {
		let self = this;
		self._vo = vo;
		if (vo) {
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", self.bg);
			self.iconImg.visible = true;
			self.nameLv.visible = true;
			if (vo.isJiHuo) {
				IconUtil.setImg(self.iconImg, Enum_Path.GENERAL_URL + vo.pic + ".jpg");
				self.maskImg.visible = false;
				self.nameLv.text = vo.name + "\nLv." + vo.level;
				self.nameLv.color = Color.getColorInt(vo.quality);
				self.lockImg.visible = false;
				if (vo.level > 0) {
					if (vo.next > 0 && vo.exp + Model_player.voMine.hunhuo >= vo.consumeArr[0][2]) {
						self.checkNotice = true;
					} else {
						self.checkNotice = false;
					}
				}
			} else {
				self.checkNotice = false;
				self.maskImg.visible = true;
				if (Model_JiangHun.openIndex == 0) {
					IconUtil.setImg(self.iconImg, Enum_Path.GENERAL_URL + vo.pic + ".jpg");
					self.nameLv.text = vo.name;
					self.nameLv.color = 0x666666;
					self.lockImg.visible = false;
				} else {
					self.iconImg.visible = false;
					self.nameLv.visible = false;
					self.lockImg.visible = true;
				}
			}
		} else {
			self.checkNotice = false;
			self.iconImg.visible = false;
			self.lockImg.visible = true;
			IconUtil.setImg(self.iconImg, null);
		}
	}

	public get vo(): Vo_JiangHun {
		return this._vo;
	}

	public set vo1(vo: Vo_JiangHun) {
		let self = this;
		self._vo = vo;
		if (vo) {
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", self.bg);
			self.iconImg.visible = true;
			IconUtil.setImg(self.iconImg, Enum_Path.GENERAL_URL + vo.pic + ".jpg");
			self.nameLv.visible = false;
			self.lockImg.visible = false;
			self.checkNotice = false;
			self.maskImg.visible = false;
		}else{
			IconUtil.setImg(self.iconImg, null);
		}
	}

	public set checkNotice(value: boolean) {
		this.noticeImg.visible = value;
	}
}