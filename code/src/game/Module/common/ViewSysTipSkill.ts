class ViewSysTipSkill extends UIModalPanel {

	public c1: fairygui.Controller;
	public g22: fairygui.GImage;
	public labCur: fairygui.GTextField;
	public labAttrCur: fairygui.GTextField;
	public labNext: fairygui.GTextField;
	public labAttrNext: fairygui.GTextField;
	public labCondition: fairygui.GTextField;
	public labNeedName: fairygui.GTextField;
	public btnUp: Button0;
	public boxNeed: ViewResource;
	public boxUp: fairygui.GGroup;
	public boxMax: fairygui.GGroup;
	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public labName: fairygui.GTextField;
	public labLevel: fairygui.GTextField;
	public labPower: fairygui.GTextField;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("common", "ViewSysTipSkill").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	protected onShown(): void {
		this.addListen();
	}

	protected onHide(): void {
		this.removeListen();
		GGlobal.layerMgr.close(UIConst.BY_SYS_TIP_SKILL);
	}

	private addListen(): void {
		let self = this;
		self.btnUp.addClickListener(self.onClickUp, self);
		GGlobal.control.listen(Enum_MsgType.BY_SYS_UP_SKILL, self.update, self);
		GGlobal.control.listen(Enum_MsgType.ZHANJIA_UP_SKILL, self.update, self);
		GGlobal.control.listen(Enum_MsgType.WUJIANG_UP_SKILL, self.update, self);
	}

	private removeListen(): void {
		let self = this;
		self.btnUp.removeClickListener(self.onClickUp, self);
		GGlobal.control.remove(Enum_MsgType.BY_SYS_UP_SKILL, self.update, self);
		GGlobal.control.remove(Enum_MsgType.ZHANJIA_UP_SKILL, self.update, self);
		GGlobal.control.remove(Enum_MsgType.WUJIANG_UP_SKILL, self.update, self);
	}

	public onOpen(arg): void {
		let self = this;
		super.onOpen(arg)
		self._sys = arg[0]
		self._skiId = arg[1]
		self.show();
	}

	private update(v): void {
		let self = this;
		let s = v[0];
		let id = v[1];
		if (s == self._sys) {
			self._skiId = id
			self.show();
		}
	}

	private _sys: any;
	private _skiId: any;
	private show(): void {
		let self = this;
		var vo = null
		var jieShu = Model_BySys.sysJie(self._sys);
		if (self._sys == Model_BySys.BAO_WU) {
			jieShu = Model_BaoWu.level;
		} else if (self._sys == Model_BySys.TIAN_SHU) {
			jieShu = GGlobal.modeltianshu.level;
		} else if (self._sys == Model_BySys.ZHAN_JIA) {
			jieShu = Model_ZhanJia.jieShu;
		} else if (self._sys == Model_BySys.WU_JIANG) {
			jieShu = Model_WuJiang.jieShu;
		}
		if (jieShu <= 0) {
			jieShu = 1;
		}

		var cfg = null
		if (self._sys == Model_BySys.BING_FA) {
			cfg = Config.booklvskill_213;
		} else if (self._sys == Model_BySys.YI_BAO) {
			cfg = Config.yblvskill_217;
		} else if (self._sys == Model_BySys.SHEN_JIAN) {
			cfg = Config.swordlvskill_216;
		} else if (self._sys == Model_BySys.BAO_WU) {
			cfg = Config.baolvskill_214;
		} else if (self._sys == Model_BySys.TIAN_SHU) {
			cfg = Config.booklvskill_215;
		} else if (self._sys == Model_BySys.ZHAN_JIA) {
			cfg = Config.clotheslvskill_212;
		} else if (self._sys == Model_BySys.WU_JIANG) {
			cfg = Config.herolvskill_211;
		}

		var cfgLv = null
		if (self._sys == Model_BySys.BING_FA) {
			cfgLv = Config.booklv_213;
		} else if (self._sys == Model_BySys.YI_BAO) {
			cfgLv = Config.yblv_217;
		} else if (self._sys == Model_BySys.SHEN_JIAN) {
			cfgLv = Config.swordlv_216;
		} else if (self._sys == Model_BySys.BAO_WU) {
			cfgLv = Config.baolv_214;
		} else if (self._sys == Model_BySys.TIAN_SHU) {
			cfgLv = Config.booklv_215;
		} else if (self._sys == Model_BySys.ZHAN_JIA) {
			cfgLv = Config.clotheslv_212;
		} else if (self._sys == Model_BySys.WU_JIANG) {
			cfgLv = Config.herolv_211;
		}
		vo = cfg[self._skiId];

		ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_5.png", self.bg);
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + vo.icon + ".png", self.imgIcon);
		self.labName.text = vo.name;
		self.labPower.text = "战斗力：" + vo.power
		self.labAttrCur.text = ConfigHelp.attrString(ConfigHelp.SplitStr(vo.attr), "+")
		var level = Number(vo.id) % 1000;
		if (level == 0) {
			self.labLevel.text = "";
			self.btnUp.text = "激活";
		} else {
			self.labLevel.text = "Lv." + level;
			self.btnUp.text = "升级";
		}
		if (vo.next == 0) {
			self.labNext.text = "";
			self.labAttrNext.text = "";
			self.labNeedName.text = ""
			self.boxNeed.visible = false;
			self.boxMax.visible = true;
			self.btnUp.touchable = self.btnUp.visible = false;
			self.labCondition.text = ""
			self.btnUp.checkNotice = false
			self.c1.selectedIndex = 1;
		} else {
			self.labNext.text = "下级效果";
			var nextVo = null;
			nextVo = cfg[vo.next];
			self.labAttrNext.text = ConfigHelp.attrString(ConfigHelp.SplitStr(nextVo.attr), "+");
			var consume = ConfigHelp.SplitStr(vo.consume);
			self._needItem = VoItem.create(Number(consume[0][1]));
			var count = Model_Bag.getItemCount(Number(consume[0][1]));
			self.labNeedName.text = self._needItem.name
			self.boxNeed.visible = true;
			self.boxMax.visible = false;
			self.boxNeed.setLb(count, Number(consume[0][2]));
			self.boxNeed.setImgUrl(self._needItem.icon);
			self._need = count >= Number(consume[0][2]);
			var clotheslv = cfgLv[vo.lv];
			self.labCondition.text = "升级条件：达到" + clotheslv.jie;
			self.labCondition.color = jieShu >= vo.lv ? 0x00ff00 : 0xff0000;
			self._condition = jieShu >= vo.lv;
			self.btnUp.touchable = self.btnUp.visible = true;
			self.btnUp.checkNotice = (self._condition && self._need)
			self.c1.selectedIndex = 0;
		}
		self.btnUp.enabled = self._condition
	}

	private _condition: boolean = false;
	private _need: boolean = false;
	private _needItem: VoItem;
	private onClickUp(): void {
		let self = this;
		if (!self._condition) {
			ViewCommonWarn.text("未满足升级条件");
			return;
		}
		if (!self._need) {
			View_CaiLiao_GetPanel.show(self._needItem);
			return;
		}
		let skillArr;
		if (self._sys == Model_BySys.WU_JIANG) {
			skillArr = Model_WuJiang.skillArr;
		} else if (self._sys == Model_BySys.ZHAN_JIA) {
			skillArr = Model_ZhanJia.skillArr;
		} else {
			skillArr = Model_BySys.sysSkillArr(self._sys);
		}
		var index = skillArr.indexOf(self._skiId);
		if (index != -1) {
			if (self._sys == Model_BySys.WU_JIANG) {
				GGlobal.modelWuJiang.CGJihuoSkill(index + 1);
			} else if (self._sys == Model_BySys.ZHAN_JIA) {
				GGlobal.modelZhanJia.CGJihuoSkill(index + 1);
			} else {
				GGlobal.modelBySys.CGUpskills(self._sys, index + 1)
			}

		}
	}
}