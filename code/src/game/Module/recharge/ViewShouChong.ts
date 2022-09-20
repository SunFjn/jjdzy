/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewShouChong extends UIModalPanel {

	public iconBg: fairygui.GLoader;
	public btnClose: fairygui.GImage;
	public iconDes: fairygui.GLoader;
	public item1: fairygui.GComponent;
	public item2: fairygui.GComponent;
	public txtGift: fairygui.GRichTextField;
	public btnGet: fairygui.GComponent;
	public iconUp: fairygui.GLoader;
	public icon1: fairygui.GLoader;
	public icon2: fairygui.GLoader;
	public iconGot: fairygui.GImage;
	public iconEff: fairygui.GLoader;
	public icon4kYB: fairygui.GImage;
	public IcTittle: fairygui.GLoader;
	public n64: fairygui.GList;
	public constructor() {
		super();
		this.loadRes("shouchong", "shouchong_atlas0");
	}
	private grids: any[] = [];
	private awatar: UIRole;
	protected childrenCreated() {
		GGlobal.createPack("shouchong");
		const self = this;
		self.contentPane = self.view = fairygui.UIPackage.createObject("shouchong", "ViewShouChong").asCom;
		CommonManager.parseChildren(self.view, self);
		self.btnClose.displayObject.touchEnabled = true;
		self.btnClose.addClickListener(self.closeEventHandler, self);
		self.item1.addClickListener(self.onHand, self);
		// self.item1.getChild("txtDes").asTextField.text = "充值6元\n橙色神剑";
		self.item2.addClickListener(self.onHand, self);
		self.item1.getChild("iconTJ").visible = false;
		// self.item2.getChild("txtDes").asTextField.text = "充值98元\n红色宝物";
		self.btnGet.addClickListener(self.onGet, self);

		self.n64.callbackThisObj = self;
		self.n64.itemRenderer = self.listRender;
		super.childrenCreated();
		self.dealWithJob();
	}

	private awards = [];
	private listRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.vo = this.awards[idx];
		item.tipEnabled = true;
		item.showEff(true);
	}

	private onGet() {
		const model = GGlobal.modelRecharge;
		if (model.scInfos[this._index] == 1) {
			GGlobal.modelRecharge.CG2753(this._index);
		} else {
			if (model.scInfos[this._index] == 2) {
				ViewCommonWarn.text("您已领取了该奖励");
			} else {
				var cfgid = Config.xsc_731[this._index].id;
				const cfg = Config.shop_011[cfgid];//用统一的商品表去兼容不一样的系统和平台
				ModelChongZhi.recharge(cfg.rmb, cfg.Index, cfg.name);
				GGlobal.modelchongzhi.CG_CHONGZHI_135(cfgid, null,false);
				this.closeEventHandler(null);
			}
		}
	}
	private onHand(evt) {
		this.setSel(evt.currentTarget == this.item1 ? this.targetCfg.index : this.commonCfg.index);
	}
	private _index: number = 0;
	private setSel(index: number) {
		this._index = index;
		if (index > 0) {
			this.onUpdate();
		}
	}
	private eff1: Part;
	private eff2: Part;
	private showEff(value: boolean, type: number) {
		const self = this;
		switch (type) {
			case 1:
				if (self.eff1) {
					EffectMgr.instance.removeEff(self.eff1);
					self.eff1 = null;
				}
				if (value) {
					self.eff1 = EffectMgr.addEff(`uieff/${self._index == self.targetCfg.index ? 10020 : 10019}`, self.icon1["_container"], 63, 63);
				}
				break;
			case 2:
				if (self.eff2) {
					EffectMgr.instance.removeEff(self.eff2);
					self.eff2 = null;
				}
				if (value) {
					self.eff2 = EffectMgr.addEff(`uieff/10018`, self.icon2["_container"], 60, 60);
				}
				break;
		}
	}
	private onUpdate() {
		const self = this;
		const curIndex = self._index = self._index == 0 ? self.targetCfg.index : self._index;
		switch (curIndex) {
			case self.targetCfg.index:
				self.item1.getController("c1").setSelectedIndex(1);
				self.item2.getController("c1").setSelectedIndex(0);
				self.iconDes.url = "ui://zzz8io3rweoo29";
				self.iconUp.url = "ui://zzz8io3rweoo28";
				// self.btnPlay.visible = true;
				self.icon4kYB.visible = false;
				// IconUtil.setImg(self.IcTittle, Enum_Path.PIC_URL + "5603.png");
				self.selCfg = self.targetCfg;
				break;
			case self.commonCfg.index:
				self.item1.getController("c1").setSelectedIndex(0);
				self.item2.getController("c1").setSelectedIndex(1);
				self.iconDes.url = "ui://zzz8io3rqblv22";
				self.iconUp.url = "ui://zzz8io3rnxbw27";
				// self.btnPlay.visible = false;
				self.icon4kYB.visible = true;
				IconUtil.setImg(self.IcTittle, null);
				self.selCfg = self.commonCfg;
				break;
		}
		const txt = self.btnGet.getChild("txtGet").asTextField;
		const info = GGlobal.modelRecharge.scInfos;

		if (GGlobal.modelRecharge.scInfos[self._index] == 2) {
			self.btnGet.visible = false;
			self.iconGot.visible = true;
		} else if (GGlobal.modelRecharge.scInfos[self._index] == 1) {
			txt.text = "领取";
			self.iconGot.visible = false;
			self.btnGet.visible = true;
		} else {
			txt.text = curIndex == self.targetCfg.index ? "充值6元" : "充值98元";
			self.iconGot.visible = false;
			self.btnGet.visible = true;
		}
		self.setBtnLabel();
		self.showAwards();
		self.showDef();
		self.showPics();
	}
	private targetCfg: Ixsc_731;
	private commonCfg: Ixsc_731;
	private selCfg: Ixsc_731;
	private dealWithJob() {
		let job = Model_Recharge.heroJob;
		const lib = Config.xsc_731;
		for (let key in lib) {
			const tempCfg = lib[key];
			if (tempCfg.zhiye > 0) {
				if (tempCfg.zhiye == job) {
					this.targetCfg = tempCfg;
				}
			} else {
				this.commonCfg = tempCfg;
			}
		}
		this.setDefaultSelector();
	}

	private setDefaultSelector() {
		let m = GGlobal.modelRecharge;
		let data = m.scInfos;
		if (data && this.commonCfg && this.targetCfg && data[this.targetCfg.index] == 2) {
			this.setSel(this.commonCfg.index);
		}
	}
	private setBtnLabel() {
		const self = this;
		const name = Config.hero_211[Model_Recharge.heroJob].name;
		// self.item1.getChild("txtDes").asTextField.text = `${self.targetCfg.shuoming}\n${name}时装`;
		self.item1.getChild("txtDes").asTextField.text = `${self.targetCfg.shuoming}\n${self.targetCfg.wenzi}`;
		self.item2.getChild("txtDes").asTextField.text = `${self.commonCfg.shuoming}\n${self.commonCfg.wenzi}`;
	}
	private showAwards() {
		const self = this;
		const cfg = self.selCfg;
		this.awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.jiangli));
		this.n64.numItems = this.awards.length;
		self.item1.getChild("iconNot").visible = GGlobal.modelRecharge.scInfos[self.targetCfg.index] == 1;
		self.item2.getChild("iconNot").visible = GGlobal.modelRecharge.scInfos[self.commonCfg.index] == 1;
		self.btnGet.getChild("noticeImg").visible = GGlobal.modelRecharge.scInfos[self._index] == 1;
	}
	private showDef() {
		const self = this;
		self.txtGift.text = self.selCfg.miaoshu;
	}
	private showPics() {
		const self = this;
		const {selCfg} = self;
		self.disPoAwat()
		self.showPicsByType(selCfg.zuo, "left");
		self.showPicsByType(selCfg.you, "right", selCfg.id == 21);
		IconUtil.setImg(self.iconEff, Enum_Path.PIC_URL + selCfg.tupian + ".png");
	}
	private showPicsByType(arg: any, left_right: "left" | "right", forceShowEffect = false) {
		let showInfo = JSON.parse(arg)[0];
		let type = showInfo[0];
		let value = showInfo[1];
		const self = this;
		switch (type) {
			case 1://展示图片
				if (left_right == "left") {
					IconUtil.setImg(self.icon1, Enum_Path.PIC_URL + value + ".png");
					self.showEff(true, 1);
					self.icon1.visible = true;
				} else {
					IconUtil.setImg(self.icon2, Enum_Path.PIC_URL + value + ".png");
					self.showEff(false || forceShowEffect, 2);
					self.icon2.visible = true;
				}
				break;
			case 2://展示模型
				var position = null;
				self.icon1.visible = self.icon2.visible = false;
				if (left_right == "left") {
					position = { x: 210, y: 562 };
					self.showEff(false, 1);
				} else {
					position = { x: 430, y: 547 };
					self.showEff(false, 2);
				}
				if (!self.awatar) {
					self.awatar = UIRole.create();
					self.awatar.uiparent = self._container;
					self.awatar.setScaleXY(1.2, 1.2);
				}
				self.awatar.setPos(position.x, position.y);
				self.awatar.setBody(value);
				self.awatar.setWeapon(value);
				self.awatar.onAdd();

				let cfgh = Config.hero_211[value]
				var skillsArr = ConfigHelp.SplitStr(cfgh.skills);
				var secSkill = skillsArr[1][0];
				if (self.secSkill != secSkill) {
					self.secSkill = secSkill;
					Timer.instance.remove(self.playSkill, self);
					self.playSkill();
				}
				break;
		}
	}
	private secSkill
	private playSkill() {
		let self = this;
		self.awatar.playSkillID(self.secSkill, false);
		Timer.instance.callLater(self.playSkill, 5000, self);
	}

	private openMovie() {
		GGlobal.layerMgr.open(UIConst.SHENJIAN_GETTER);
	}

	protected onShown() {
		super.onShown();
		const self = this;
		let m = GGlobal.modelRecharge;
		IconUtil.setImg(self.iconBg, Enum_Path.BACK_URL + "SCBg.png");
		m.listen(Model_Recharge.msg_info, self.onUpdate, self);
		m.CG2751();
		m.showOrHideSC(false);
		this.setDefaultSelector();
		// this.btnPlay.addClickListener(this.openMovie, this);
	}
	private isFirstExc = true;
	protected onHide() {
		super.onHide();
		let self = this;
		self.setSel(0);
		self.n64.numItems = 0;
		GGlobal.modelRecharge.remove(Model_Recharge.msg_info, self.onUpdate, self);
		GGlobal.layerMgr.close(UIConst.SHOUCHONG);
		self.disPoAwat();
		IconUtil.setImg(self.iconBg, null);
		IconUtil.setImg(self.iconEff, null);
		self.showEff(false, 1);
		self.showEff(false, 2);
		IconUtil.setImg(self.IcTittle, null);
		if (self.isFirstExc) {
			self.isFirstExc = false;
			GGlobal.modelRecharge.CG2757();
		}
	}
	private disPoAwat() {
		if (this.awatar) {
			this.awatar.onRemove();
			this.awatar = null;
		}
		Timer.instance.remove(this.playSkill, this);
		this.secSkill = 0;
	}
}