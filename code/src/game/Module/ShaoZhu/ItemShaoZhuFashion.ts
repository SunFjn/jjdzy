class ItemShaoZhuFashion extends fairygui.GComponent {

	public iconDefault: fairygui.GLoader;
	public iconDressed: fairygui.GImage;
	public selectImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public imgStar: fairygui.GImage;
	public txtNum: fairygui.GRichTextField;
	public wayLb: fairygui.GRichTextField;
	public txtName: fairygui.GRichTextField;
	public backImg: fairygui.GImage;
	public colorImg: fairygui.GLoader;
	public starGroup: fairygui.GGroup;
	public wayGroup: fairygui.GGroup;

	public static URL: string = "ui://p83wyb2bng03v";

	public static createInstance(): ItemShaoZhuFashion {
		return <ItemShaoZhuFashion><any>(fairygui.UIPackage.createObject("ShaoZhu", "ItemShaoZhuFashion"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public shaozhuVo: Vo_ShaoZhu;
	public vo: ShaoZhuFashionVo;
	public bodyID: number = 0;
	public setVo(vo: ShaoZhuFashionVo, shaozhuVo: Vo_ShaoZhu = null) {
		let self = this;
		self.vo = vo;
		self.shaozhuVo = shaozhuVo;
		self.iconDressed.visible = self.wayGroup.visible = self.starGroup.visible = self.backImg.visible = false;
		if (shaozhuVo && !vo) {
			IconUtil.setImg(self.iconDefault, `resource/image/pifu/${shaozhuVo.cfg.pf}.png`);
			IconUtil.setImg(self.colorImg, Enum_Path.ICON70_URL + "BmG_3.png");
			self.txtName.text = "默认";
			self.txtName.color = 0xffffff;
			if (shaozhuVo.bodyID == 0) self.iconDressed.visible = true;
			self.bodyID = 0;
		} else if (vo) {
			let itemVo = VoItem.create(vo.conmuse[0][1]);
			IconUtil.setImg(self.iconDefault, Enum_Path.ICON70_URL + itemVo.icon + ".png");
			IconUtil.setImg(self.colorImg, Enum_Path.ICON70_URL + "BmG_" + itemVo.quality + ".png");
			if (vo.starLv > 0) {
				self.txtNum.text = vo.starLv + "";
				self.starGroup.visible = true;
			} else {
				self.wayGroup.visible = true;
				self.wayLb.text = vo.cfg.tips;
			}
			self.txtName.text = vo.name;
			self.txtName.color = itemVo.qColor;
			if (shaozhuVo.bodyID == vo.id) self.iconDressed.visible = true;
			self.noticeImg.visible = Model_Bag.getItemCount(vo.conmuse[0][1]) >= vo.conmuse[0][2] && shaozhuVo.starLv > 0;
			self.bodyID = vo.id;
		} else {
			IconUtil.setImg(self.iconDefault, null);
			IconUtil.setImg(self.colorImg, Enum_Path.ICON70_URL + "BmG_3.png")
			self.backImg.visible = true;
			self.txtName.text = "";
		}
	}

	public choose(value) {
		this.selectImg.visible = value;
	}
}