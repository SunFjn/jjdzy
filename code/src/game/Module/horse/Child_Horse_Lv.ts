class Child_Horse_Lv extends fairygui.GComponent {

	public labAttrCur: fairygui.GRichTextField;
	public labAttrNext: fairygui.GRichTextField;
	public labAttrMax: fairygui.GRichTextField;
	public imgArrow: fairygui.GImage;
	public lbTit: fairygui.GLabel;
	public labCost: fairygui.GRichTextField;
	public lbRes: fairygui.GRichTextField;
	public btnUp: Button1;
	public imgPower: fairygui.GLoader;
	public starPowerLb: fairygui.GTextField;
	public starGroup: fairygui.GGroup;
	public imgMax: fairygui.GLoader;
	public vres: ViewResource;
	public tfJie: fairygui.GRichTextField;
	public tfJi: fairygui.GRichTextField;

	public static URL: string = "ui://7shc3kzdnct0h";

	public static createInstance(): Child_Horse_Lv {
		return <Child_Horse_Lv><any>(fairygui.UIPackage.createObject("horse", "Child_Horse_Lv"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
	}

	/**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag 
     */
	private registerEvent(pFlag: boolean): void {
		let self = this;
		EventUtil.register(pFlag, self.btnUp, egret.TouchEvent.TOUCH_TAP, self.onUp, self);
	}
	_selVo
	_hasNeed
	_needItem

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

		self.tfJie.text = Math.floor(v.lv / 10) + ""
		self.tfJi.text = Math.floor(v.lv % 10) + ""

		let attrArr
		let nextAttArr
		let cfgStarNext: Izqsx_773
		let cfgLvNext: Izqsj_773
		self.imgMax.visible = false;
		self.btnUp.touchable = self.btnUp.visible = true;
		self.starGroup.visible = true
		self.lbTit.text = "升级属性"
		self.imgPower.url = "ui://jvxpx9emra8g3hk"
		if (v.lv % 10 == 9) {
			self.btnUp.text = "突破"
		} else {
			self.btnUp.text = "升级"
		}
		cfgLvNext = Config.zqsj_773[v.cfgLv.next]
		self.starPowerLb.text = cfgLvNext ? "" + (cfgLvNext.power - v.cfgLv.power) : "";
		if (v.lv == 0 || v.cfgLv.next == 0) {
			self.labAttrCur.text = "";
			self.labAttrNext.text = "";
			self.imgArrow.visible = false;
			if (v.lv == 0) {//0级
				attrArr = JSON.parse(cfgLvNext.attr)
			} else {//满级
				self.starGroup.visible = false
				attrArr = JSON.parse(v.cfgLv.attr)
				self.btnUp.touchable = self.btnUp.visible = false;
				self.imgMax.visible = true;
				self.imgMax.url = "ui://jvxpx9emshpk3h3";
			}
			self.labAttrMax.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
		} else {
			attrArr = JSON.parse(v.cfgLv.attr)
			self.imgArrow.visible = true;
			nextAttArr = JSON.parse(Config.zqsj_773[v.cfgLv.next].attr)
			self.labAttrCur.text = ConfigHelp.attrString(attrArr, "+");
			self.labAttrNext.text = ConfigHelp.attrString(nextAttArr, "+", null, "#15f234");
			self.labAttrMax.text = "";
		}

		if (!v.isAct) {//未激活
			self.btnUp.visible = false
			self.labCost.text = HtmlUtil.fontNoSize("请先激活坐骑•" + v.name, Color.REDSTR);
			// self.labCost.y = 856
			self.vres.visible = false
			self.lbRes.text = ""
		}
		else if (v.cfgLv.next == 0) {//满级
			self.labCost.text = "";
			self.vres.visible = false
			self.lbRes.text = ""
		} else {
			//升星道具
			var consume = JSON.parse(v.cfgLv.exp)
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
			self.vres.visible = true
			self.vres.setImgUrl(self._needItem.icon);
			self.vres.setLb(hasCount, count);
			self.lbRes.text = HtmlUtil.fontNoSize(self._needItem.name, Color.getColorStr(self._needItem.quality));
			self.labCost.text = ""
			// self.labCost.text = "消耗：[color=" + Color.getColorStr(self._needItem.quality) + "]" + self._needItem.name + "[/color]x" + count +
			// 	"[color=" + colorStr + "](" + hasCount + "/" + count + ")[/color]";
			self.btnUp.checkNotice = self._hasNeed
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
		if (!self._selVo.isAct) {
			ViewCommonWarn.text("未激活")
			return;
		}
		GGlobal.model_Horse.CG_UPLV_11027(self._selVo.id);
	}
}