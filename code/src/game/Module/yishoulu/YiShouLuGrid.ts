/**
 * 异兽录item
 */
class YiShouLuGrid extends fairygui.GLabel {
	public selectImg: fairygui.GImage;
	public imgIcon: fairygui.GLoader;
	public noticeImg: fairygui.GImage;
	public index: number = 0;
	public maskBg: fairygui.GImage;
	public qdImg: fairygui.GImage;
	public nameGroup: fairygui.GGroup;

	public static URL: string = "ui://7y83phvni1zv0";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public vo: Vo_YSLData;
	public setVo(vo: Vo_YSLData, index: number) {
		let self = this;
		self.vo = vo;
		self.index = index;
		IconUtil.setImg(self.imgIcon, Enum_Path.YISHOULU_URL + vo.cfg.tubiao + ".png");
		if (vo.lvUpId == (100000 * (index + 1)))//未激活
		{
			self.maskBg.visible = true;
		} else {
			self.maskBg.visible = false;
		}
		self.noticeImg.visible = Model_YiShouLu.checkYiShouNotice(index);
		self.nameGroup.visible = false;
		self.qdImg.visible = false;
	}

	public setTFVo(vo: Vo_YSLData) {
		let self = this;
		self.vo = vo;
		self.text = vo.cfg.mingzi;
		self.nameGroup.visible = true;
		IconUtil.setImg(self.imgIcon, Enum_Path.YISHOULU_URL + vo.cfg.tubiao + ".png");
		self.qdImg.visible = self.maskBg.visible = !vo.cfg.tianfu;
	}

	public checkNotice(value) {
		this.noticeImg.visible = value;
	}

	public choose(value: boolean) {
		this.selectImg.visible = value;
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self.imgIcon, null);
		self.choose(false);
	}
}