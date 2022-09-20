/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewGodWuJiangInnate extends UIModalPanel {
	public frame: fairygui.GLabel;
	public n16: fairygui.GImage;
	public skill0: VWuJiangSkillS;
	public lbSkillName: fairygui.GRichTextField;
	public lbDesc: fairygui.GRichTextField;
	public n4: fairygui.GRichTextField;
	public n10: Button1;
	public lbCost: fairygui.GRichTextField;
	public lbNowAttribute: fairygui.GRichTextField;
	public lbNextAttribute: fairygui.GRichTextField;
	public n17: fairygui.GImage;
	public groupAttribute: fairygui.GGroup;
	public boxMax: fairygui.GGroup;
	public lbFullAttribute: fairygui.GRichTextField;
	public n14: fairygui.GLabel;
	public n18: fairygui.GRichTextField;
	public lbPower: fairygui.GRichTextField;


	public static URL: string = "ui://zyx92gzwnlyo4k";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("wuJiang", "ViewGodWuJiangInnate").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(this.view, this);
		super.childrenCreated();
	}

	update = () => {
		let self = this;
		if (!self._wujiangVO) return;
		let job = self._wujiangVO.type;
		let tfskill = self._wujiangVO.skill;
		let skillCFG: Iskill_210 = Config.skill_210[tfskill];
		let data = ModelGodWuJiang.getGodDataByID(job);
		let level = data.tfLv;
		self.skill0.setVo(tfskill, 4, level,{id: self._wujiangVO.buffid});
		self.lbSkillName.text = skillCFG.n + "  Lv." + level;

		self.lbDesc.text = SkillUtil.getBuffDescription(self._wujiangVO.buffid,level);
		self._isLimit = self._isFull = false;
		self._isAcvition = Boolean(ModelGodWuJiang.getWuJiangIsActivation(job));
		self.n18.text = "激活神将后才可升级神将天赋";
		self.n18.visible = !self._isAcvition;
		let cfg = Config.godherotf_289[level]
		self.lbPower.text = "战力："+cfg.power;
		if (cfg.next == 0) {//满级
			self._isFull = true;
			self.boxMax.visible = true;
			self.groupAttribute.visible = false;
			self.lbCost.visible = false;
			self.n10.visible = false;
			let attrArr = JSON.parse(cfg.attr)
			self.lbFullAttribute.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
		} else {
			let xiulianCFG = Config.godheroxl_289[data.xiulianLv];
			self.lbCost.visible = true;
			self.n10.visible = true;
			self.boxMax.visible = false;
			let limitLevel = xiulianCFG.max;
			self._isLimit = limitLevel <= level;
			if (self._isAcvition) {
				if (self._isLimit) {
					self.n18.visible = true;
					let limitLevel = Config.godherotf_289[level+1].xl;
					self.n18.text = BroadCastManager.reTxt("神将修炼达到{0}可继续升级天赋技能", ModelGodWuJiang.getXiuLianStr(limitLevel));
				}
			}
			self.groupAttribute.visible = true;
			self.lbFullAttribute.text = "";
			let attrArr = JSON.parse(cfg.attr)
			self.lbNowAttribute.text = ConfigHelp.attrString(attrArr, "+", null, "#ffffff");
			let nextCFG = Config.godherotf_289[cfg.next]
			attrArr = JSON.parse(nextCFG.attr)
			self.lbNextAttribute.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
		}
	}

	_isFull = false;
	_isLimit = false;
	_enough = false;
	_isAcvition = false;
	bagUpdate = () => {
		let self = this;
		let job = self._wujiangVO.type;
		let data = ModelGodWuJiang.getGodDataByID(job);
		let level = data.tfLv;

		let cfg = Config.godherotf_289[level];
		let item = JSON.parse(cfg.conmuse);
		if(item=='0'){
			return
		}
		let id = item[0][1];
		let needCount = item[0][2];
		let itemName = ConfigHelp.getItemColorName(id);
		let hasCount = Model_Bag.getItemCount(id);
		let color = hasCount >= needCount ? Color.GREENSTR : Color.REDSTR;
		self._enough = hasCount >= needCount;
		self.n10.checkNotice = Boolean(self._enough && self._isAcvition && !this._isLimit);
		self.lbCost.text = BroadCastManager.reTxt("消耗材料：{0}x{1}(<font color='{2}'>{3}/{4}</font>)", itemName, needCount, color, hasCount, item[0][2]);
	}

	leveluphd = () => {
		if (!this._isAcvition) {
			ViewCommonWarn.text("激活神将后才可升级神将天赋");
		} else if (this._isFull) {
			ViewCommonWarn.text("已满级");
		} else if (this._isLimit) {
			ViewCommonWarn.text("请先提升修炼等级");
		} else if (this._enough) {
			GGlobal.modelGodWuJiang.CG_WuJiang_upShenJiangTf_683(this._wujiangVO.type);
		} else {
			ViewCommonWarn.text("材料不足");
		}
	}

	private _wujiangVO: Ihero_211;
	public onShown() {
		let self = this;
		self._wujiangVO = self._args;
		self.update();
		self.bagUpdate();
		self.n10.addClickListener(self.leveluphd, self);
		GGlobal.control.listen(UIConst.WU_JIANG, self.update, self);
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, self.bagUpdate, self);
	}

	public onHide() {
		let self = this;
		self.n10.addClickListener(self.leveluphd, self);
		GGlobal.control.remove(UIConst.WU_JIANG, self.update, self);
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, self.bagUpdate, self);
		GGlobal.layerMgr.close(UIConst.GOD_WUJIANG_TF);
	}
}