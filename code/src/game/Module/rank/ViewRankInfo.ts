class ViewRankInfo extends UIModalPanel {

	public imgBg: fairygui.GLoader;
	public imgDi: fairygui.GImage;
	public lbName: fairygui.GRichTextField;
	public lbVip: fairygui.GTextField;
	public imgTitle: fairygui.GLoader;
	public lbLevel: fairygui.GRichTextField;
	public lbGuan: fairygui.GRichTextField;
	public labPower: fairygui.GLabel;
	public imgCountry: fairygui.GLoader;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("rank", "ViewRankInfo").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	public onOpen(arg) {
		super.onOpen(arg);
		let self = this;
		self.lbName.addEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
		self.lbVip.addEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
		let v: VoRank = arg as VoRank
		self._vo = v;
		self.lbName.text = v.name;
		self.lbGuan.text = Model_GuanXian.getJiangXianStr1(v.guanxian);
		self.lbLevel.text = "等级：" + v.level;
		var country = v.showCoun == 0 ? v.country : 0;
		if (country > 0) {
			self.imgCountry.url = CommonManager.getCommonUrl("country" + country);
			self.imgCountry.visible = true;
		} else {
			self.imgCountry.visible = false;
		}
		self.labPower.text = v.totPower + "";
		IconUtil.setImg(self.imgBg, Enum_Path.BACK_URL + "rankBg.jpg");

		if (v.vip > 0) {
			self.lbVip.text = ConfigHelp.getVipShow(v.vip);;
			self.lbVip.visible = true;
		} else {
			self.lbVip.text = "";
			self.lbVip.visible = false;
		}

		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.setPos(self.imgDi.x, self.imgDi.y - 30);
			// self.awatar.setScaleXY(1.5, 1.5);
		}
		let fscfg = Config.sz_739[v.job];
		let moxing = 0;
		if (fscfg) {
			moxing = fscfg.moxing;
			self.awatar.setBody(moxing);
			self.awatar.setWeapon(v.job);
		} else {
			moxing = v.job;
			self.awatar.setBody(moxing);
			self.awatar.setWeapon(moxing);
		}
		self.awatar.setGodWeapon(v.godWeapon);
		self.awatar.setHorseId(v.horseId);
		if (v.horseId) {
			self.awatar.setScaleXY(1, 1);
		} else {
			self.awatar.setScaleXY(1.5, 1.5);
		}
		self.awatar.uiparent = self.displayListContainer;
		self.awatar.onAdd();
		self.addChild(self.imgTitle);

		if (v.titleId > 0) {
			self.imgTitle.visible = true;
			IconUtil.setImg(self.imgTitle, Enum_Path.TITLE_URL + Config.chenghao_702[v.titleId].picture + ".png");
		} else {
			self.imgTitle.visible = false;
		}

		self.resize();
	}

	protected onHide(): void {
		let self = this;
		GGlobal.layerMgr.close(UIConst.RANK_INFO);
		self.lbName.removeEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
		self.lbVip.removeEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
		IconUtil.setImg(self.imgTitle, null);
		IconUtil.setImg(self.imgBg, null);
	}

	private _vo;
	private awatar: UIRole = null;
	private resize(): void {
		let self = this;
		if (self._vo.vip > 0) {
			self.lbName.x = (self.width - self.lbName.width - self.lbVip.width - 4) / 2
			self.lbVip.x = self.lbName.x + self.lbName.width + 4;
		} else {
			self.lbName.x = (self.width - self.lbName.width) / 2
		}
	}
}