class Child_Horse_Star extends fairygui.GComponent {

	public labAttrCur: fairygui.GRichTextField;
	public labAttrNext: fairygui.GRichTextField;
	public labAttrMax: fairygui.GRichTextField;
	public imgArrow: fairygui.GImage;
	public lbTit: fairygui.GLabel;
	public labCost: fairygui.GRichTextField;
	public btnUp: Button1;
	public imgPower: fairygui.GLoader;
	public starPowerLb: fairygui.GTextField;
	public starGroup: fairygui.GGroup;
	public imgMax: fairygui.GLoader;
	public lbTitSu: fairygui.GLabel;
	public labSu: fairygui.GTextField;
	public btnRide: fairygui.GButton;
	public btnCancel: fairygui.GButton;
	public bgLv: fairygui.GImage;
	public lbLv: fairygui.GRichTextField;
	public boxLv: fairygui.GGroup;

	public static URL: string = "ui://7shc3kzdnct0i";

	public static createInstance(): Child_Horse_Star {
		return <Child_Horse_Star><any>(fairygui.UIPackage.createObject("horse", "Child_Horse_Star"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		EventUtil.register(pFlag, self.btnUp, egret.TouchEvent.TOUCH_TAP, self.onUp, self);
		EventUtil.register(pFlag, self.btnRide, egret.TouchEvent.TOUCH_TAP, self.onRide, self);
		EventUtil.register(pFlag, self.btnCancel, egret.TouchEvent.TOUCH_TAP, self.onCancel, self);
	}
	_selVo
	_needItem
	_hasNeed

	public show(v) {
		let self = this;
		self.registerEvent(true);
		self._selVo = v;
		self.upSelView()
	}

	public hide() {
		let self = this;
		self.registerEvent(false);
	}

	private upSelView() {
		let self = this;
		let m = GGlobal.model_Horse
		let v = self._selVo
		self.lbLv.text = HtmlUtil.fontNoSize(v.cfg.tiaojian + "星可骑乘", Color.REDSTR);
		if (!v.isAct) {
			self.btnRide.visible = self.btnCancel.visible = false;
			self.boxLv.visible = true;
		}
		else if (v.star >= v.cfg.tiaojian) {
			self.boxLv.visible = false;
			self.btnRide.visible = m.rideId != v.id;
			self.btnCancel.visible = m.rideId == v.id;
		} else {
			self.btnRide.visible = self.btnCancel.visible = false;
			self.boxLv.visible = true;
		}


		let attrArr
		let nextAttArr
		let cfgStarNext: Izqsx_773
		let cfgLvNext: Izqsj_773
		self.imgMax.visible = false;
		self.btnUp.touchable = self.btnUp.visible = true;
		self.starGroup.visible = true
		self.lbTit.text = "升星属性"
		self.imgPower.url = "ui://jvxpx9emul8t3fl"
		cfgStarNext = Config.zqsx_773[v.cfgStar.next]
		self.starPowerLb.text = cfgStarNext ? "" + (cfgStarNext.zl - v.cfgStar.zl) : "";
		if (v.star > 0 && v.cfgStar.next != 0) {
			self.imgArrow.visible = true;
			self.btnUp.text = "升星"
			attrArr = JSON.parse(v.cfgStar.sx)
			nextAttArr = JSON.parse(cfgStarNext.sx)
			self.labAttrCur.text = ConfigHelp.attrString(attrArr, "+");
			self.labAttrNext.text = ConfigHelp.attrString(nextAttArr, "+", null, "#15f234");
			self.labAttrMax.text = "";
		} else {
			self.labAttrCur.text = "";
			self.labAttrNext.text = "";
			self.imgArrow.visible = false;
			if (v.star == 0) {//0级
				self.btnUp.text = "激活"
				attrArr = JSON.parse(cfgStarNext.sx)
			} else {//满级
				self.starGroup.visible = false
				attrArr = JSON.parse(v.cfgStar.sx)
				self.btnUp.touchable = self.btnUp.visible = false;
				self.imgMax.visible = true;
				self.imgMax.url = "ui://jvxpx9emirr13h1";
			}
			self.labAttrMax.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
		}
		if (v.cfgStar.next == 0) {
			self.labCost.text = "";
		} else {
			//升星道具
			var consume = JSON.parse(v.cfg.activation)
			self._needItem = VoItem.create(Number(consume[0][1]))
			var hasCount = Model_Bag.getItemCount(Number(consume[0][1]))
			var count = Number(consume[0][2])
			var colorStr;
			if (hasCount >= count) {
				colorStr = '#00FF00';
				self._hasNeed = true;
			} else {
				colorStr = '#FF0000';
				self._hasNeed = false;
			}
			self.labCost.text = "消耗：[color=" + Color.getColorStr(self._needItem.quality) + "]" + self._needItem.name + "[/color]x" + count +
				"[color=" + colorStr + "](" + hasCount + "/" + count + ")[/color]";
			self.btnUp.checkNotice = self._hasNeed
		}

		if (v.isAct) {
			self.labSu.text = "移动速度+" + v.cfgStar.ydsd;
		} else {
			cfgStarNext = Config.zqsx_773[v.cfgStar.next]
			self.labSu.text = "移动速度+" + cfgStarNext.ydsd;
		}
	}

	private onUp() {
		let self = this;
		if (!self._selVo) {
			return;
		}
		if (!self._hasNeed) {
			View_CaiLiao_GetPanel.show(self._needItem);
			return;
		}
		GGlobal.model_Horse.CG_UPSTAR_11025(self._selVo.id);
	}

	private onRide() {
		let self = this;
		let v = self._selVo
		if (!v) {
			return;
		}
		if (!v.isAct) {
			ViewCommonWarn.text("未激活")
			return;
		}
		if (v.star < v.cfg.tiaojian) {
			ViewCommonWarn.text(v.cfg.tiaojian + "星可乘骑")
			return;
		}
		GGlobal.model_Horse.CG_RIDE_11023(v.id);
	}

	private onCancel() {
		let self = this;
		if (!self._selVo) {
			return;
		}
		GGlobal.model_Horse.CG_RIDE_11023(0);
	}
}