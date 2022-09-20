class Child_ZSGodWeapon_CuiLian extends fairygui.GComponent {

	public backImg: fairygui.GLoader;
	public clBt: Button0;
	public keyCLBt: Button1;
	public list: fairygui.GList;
	public powerLb: fairygui.GLabel;
	public nameLb: fairygui.GLabel;
	public costLb: ViewResource;
	public curAtt: fairygui.GRichTextField;
	public nextAtt: fairygui.GRichTextField;
	public attGroup: fairygui.GGroup;
	public showAtt: fairygui.GRichTextField;
	public costNameLb: fairygui.GRichTextField;
	public levelLb: fairygui.GRichTextField;
	public expLb: fairygui.GRichTextField;
	public shape: fairygui.GGraph;
	public expBar: fairygui.GLoader;
	public godWeaponIcon: fairygui.GLoader;
	public clGroup: fairygui.GGroup;
	public maxGroup: fairygui.GGroup;
	public promptLb: fairygui.GRichTextField;

	public static URL: string = "ui://zyx92gzwu7vv3p";

	public static createInstance(): Child_ZSGodWeapon_CuiLian {
		return <Child_ZSGodWeapon_CuiLian><any>(fairygui.UIPackage.createObject("wuJiang", "Child_ZSGodWeapon_CuiLian"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
		self.shape.clearGraphics();
		self.expBar.displayObject.mask = self.shape.displayObject;
	}

	public unitDrawAngle: number = 0.36;
	public radius: number = 175;
	public startAngle: number = Math.PI;
	public updateExp() {
		let self = this;
		let circle: number = Math.PI * 2;
		let value = 0;
		if (self.curVo.cuiLianCfg.exp == 0) {
			value = 360;
			self.expLb.text = "";
		} else {
			value = self.curVo.clExp * (360 / self.curVo.cuiLianCfg.exp);
			self.expLb.text = self.curVo.clExp + "/" + self.curVo.cuiLianCfg.exp;
		}
		let endAngle: number = self.startAngle + value / 360 * circle;
		self.drawFan(endAngle);

	}

	public drawFan(endAngle: number) {
		let self = this;
		self.shape.clearGraphics();
		var g: egret.Graphics = self.shape.graphics;
		var tx: number;
		var ty: number;
		g.beginFill(0xffffff);
		var times: number = Math.ceil((endAngle - self.startAngle) / this.unitDrawAngle);
		var tempAngle: number = self.startAngle;
		g.moveTo(this.radius, self.radius);
		tx = self.radius * (1 + Math.sin(self.startAngle));
		ty = self.radius * (1 - Math.cos(self.startAngle));
		g.lineTo(tx, ty);

		while (times > 0) {
			if (times != 1) {
				tx = self.radius * (1 + Math.sin(tempAngle + self.unitDrawAngle));
				ty = self.radius * (1 - Math.cos(tempAngle + self.unitDrawAngle));
			} else {
				tx = self.radius * (1 + Math.sin(endAngle));
				ty = self.radius * (1 - Math.cos(endAngle));
			}
			g.lineTo(tx, ty);

			tempAngle += self.unitDrawAngle;
			times--;
		}
		g.lineTo(self.radius, self.radius);
		g.endFill();
	}

	private itemHandler(event: fairygui.ItemEvent): void {
		let self = this;
		let grid: VZSGodWeaponGrid = event.itemObject as VZSGodWeaponGrid;
		if (self.curVo && self.curVo.job == grid.vo.job) return;
		self.curVo = grid.vo;
		self.curItem = grid;
		self.updateShow();
	}

	private renderHandler(index: number, item: VZSGodWeaponGrid) {
		let self = this;
		let arr = Model_ZSGodWeapon.godWeoponArr;
		item.vo = arr[index];
		if (!self.curVo && Model_ZSGodWeapon.selectJob <= 0) {
			item.selected = true;
			self.curVo = arr[index];
			self.curItem = item;
		} else if (self.curVo && self.curVo.job == item.vo.job) {
			if (self.curItem) self.curItem.selected = false;
			item.selected = true;
			self.curVo = arr[index];
			self.curItem = item;
		} else if (item.vo.job == Model_ZSGodWeapon.selectJob) {
			if (self.curItem) self.curItem.selected = false;
			item.selected = true;
			self.curVo = arr[index];
			self.curItem = item;
		} else {
			item.selected = false;
		}
		item.setNot(Model_ZSGodWeapon.checkOneCuiLian(arr[index]));
	}

	private curVo: Vo_ZSGodWeapon;
	private curItem: VZSGodWeaponGrid;
	public show() {
		let self = this;
		if (Model_ZSGodWeapon.godWeoponArr.length <= 0) Model_ZSGodWeapon.initcfg();
		self.list.numItems = Model_ZSGodWeapon.godWeoponArr.length;
		if (Model_ZSGodWeapon.selectJob > 0) {
			for (let i = 0; i < Model_ZSGodWeapon.godWeoponArr.length; i++) {
				let vo = Model_ZSGodWeapon.godWeoponArr[i]
				if (vo.job == Model_ZSGodWeapon.selectJob) {
					self.list.scrollToView(i, false);
					break;
				}
			}
		}
		self.updateShow()
	}

	private godEff: Part;
	private updateShow() {
		let self = this;
		if (!self.curVo) return;
		let vo = self.curVo;
		Model_ZSGodWeapon.selectJob = 0;
		self.powerLb.text = vo.cuiLianCfg.power + "";
		self.levelLb.setVar("jie", "" + Math.floor(vo.cuiLianCfg.lv % 1000 / 10)).setVar("level", "" + (vo.cuiLianCfg.lv % 10)).flushVars();
		self.updateExp();

		self.attGroup.visible = self.showAtt.visible = false;
		if (vo.cuiLianCfg.exp != 0) {
			self.attGroup.visible = true;
			self.curAtt.text = ConfigHelp.attrString(JSON.parse(vo.cuiLianCfg.attr), "+");
			let nextcfg = Config.sbcl_750[vo.quality * 10000 + vo.clLv + 1];
			self.nextAtt.text = ConfigHelp.attrString(JSON.parse(nextcfg.attr), "+");
		} else {
			self.showAtt.visible = true;
			self.showAtt.text = ConfigHelp.attrString(JSON.parse(vo.cuiLianCfg.attr), "+", Color.getColorStr(1), Color.getColorStr(2));
		}
		if (self.godEff) {
			EffectMgr.instance.removeEff(self.godEff);
			self.godEff = null;
		}
		self.clGroup.visible = self.promptLb.visible = self.maxGroup.visible = self.clBt.visible = self.keyCLBt.visible = true;
		if (vo.starLv <= 0) {
			self.godEff = EffectMgr.addEff("uieff/" + vo.cfg.picture, self.godWeaponIcon.displayObject as fairygui.UIContainer, self.godWeaponIcon.width / 2, self.godWeaponIcon.height / 2, 1000);
			self.maxGroup.visible = self.clGroup.visible = false;
			self.promptLb.text = "请先激活神兵" + vo.cfg.name;
			self.nameLb.text = vo.cfg.name;
			self.nameLb.color = Color.getColorInt(vo.quality);
		} else {
			let itemVo = VoItem.create(Model_ZSGodWeapon.cuiLianDan);
			self.costNameLb.text = itemVo.name;
			self.costNameLb.color = itemVo.qColor;
			self.costLb.setImgUrl(itemVo.icon);
			let count = Model_Bag.getItemCount(itemVo.id)
			self.costLb.setCount(count);
			self.promptLb.visible = false;
			if (vo.cuiLianCfg.exp == 0) {
				self.clGroup.visible = false;
				self.clBt.visible = self.keyCLBt.visible = false;
			} else {
				self.keyCLBt.checkNotice = count * Model_ZSGodWeapon.cuiLianExp >= vo.cuiLianCfg.exp - vo.clExp && vo.starLv >= vo.cuiLianCfg.tiaojian;
				self.maxGroup.visible = false;
			}
			if (vo.equipID > 0) {
				let pic = 0;
				let nameStr = "";
				let quality = 0;
				if (vo.equipID == vo.cfg.bianhao) {
					pic = vo.cfg.picture;
					nameStr = vo.cfg.name;
					quality = vo.quality;
				} else {
					let cfg = Config.sbpf_750[vo.equipID];
					pic = cfg.zs;
					nameStr = cfg.mz;
					quality = cfg.pz;
				}
				self.godEff = EffectMgr.addEff("uieff/" + pic, self.godWeaponIcon.displayObject as fairygui.UIContainer, self.godWeaponIcon.width / 2, self.godWeaponIcon.height / 2, 1000);
				self.nameLb.text = nameStr;
				self.nameLb.color = Color.getColorInt(quality);
			} else {
				self.godEff = EffectMgr.addEff("uieff/" + vo.cfg.picture, self.godWeaponIcon.displayObject as fairygui.UIContainer, self.godWeaponIcon.width / 2, self.godWeaponIcon.height / 2, 1000);
				self.nameLb.text = vo.cfg.name;
				self.nameLb.color = Color.getColorInt(vo.quality);
			}
		}
	}

	private OnCuiLian() {
		let self = this;
		if (self.curVo.starLv >= self.curVo.cuiLianCfg.tiaojian) {
			let count = Model_Bag.getItemCount(Model_ZSGodWeapon.cuiLianDan);
			if (count > 0) {
				GGlobal.modelGodWeapon.CG_GodWeapon_upcuilianlv_7859(self.curVo.job, 0);
			} else {
				View_CaiLiao_GetPanel.show(VoItem.create(Model_ZSGodWeapon.cuiLianDan))
			}
		} else {
			ViewCommonWarn.text("需要当前神兵达到" + self.curVo.cuiLianCfg.tiaojian + "星");
		}
	}

	private OnKeyCuiLian() {
		let self = this;
		if (self.curVo.starLv >= self.curVo.cuiLianCfg.tiaojian) {
			let count = Model_Bag.getItemCount(Model_ZSGodWeapon.cuiLianDan);
			if (count > 0) {
				GGlobal.modelGodWeapon.CG_GodWeapon_upcuilianlv_7859(self.curVo.job, 1);
			} else {
				View_CaiLiao_GetPanel.show(VoItem.create(Model_ZSGodWeapon.cuiLianDan))
			}
		} else {
			ViewCommonWarn.text("需要当前神兵达到" + self.curVo.cuiLianCfg.tiaojian + "星");
		}
	}

	public onOpen() {
		let self = this;
		IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "godWeapon.jpg");
		IconUtil.setImg(self.expBar, Enum_Path.BACK_URL + "expBack.png");
		self.show()
		self.list.addEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, self);
		GGlobal.reddot.listen(UIConst.ZS_GODWEAPON, self.show, self);
		self.clBt.addClickListener(self.OnCuiLian, self);
		self.keyCLBt.addClickListener(self.OnKeyCuiLian, self);
	}

	public onClose() {
		let self = this;
		if (self.curItem) self.curItem.selected = false;
		self.curItem = null;
		self.curVo = null;
		self.list.numItems = 0;
		self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.itemHandler, self);
		IconUtil.setImg(self.backImg, null);
		IconUtil.setImg(self.expBar, null);
		GGlobal.reddot.remove(UIConst.ZS_GODWEAPON, self.show, self);
		self.clBt.removeClickListener(self.OnCuiLian, self);
		self.keyCLBt.removeClickListener(self.OnKeyCuiLian, self);
		if (self.godEff) {
			EffectMgr.instance.removeEff(self.godEff);
			self.godEff = null;
		}
	}

	public getSelectJob() {
		let self = this;
		if (self.curVo) {
			return self.curVo.job;
		}
		return 0;
	}
}