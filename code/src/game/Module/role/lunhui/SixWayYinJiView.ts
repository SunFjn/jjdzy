/**
 * 六道印记界面
 */
class SixWayYinJiView extends UIPanelBase{
	public lbName: fairygui.GTextField;
	public lbLv: fairygui.GTextField;
	public btnUp: Button1;
	public btnStar: Button1;
	public lbAttr: fairygui.GTextField;
	public c1: fairygui.Controller;
	public c2: fairygui.Controller;
	private _type:number = 0;
	public nameLb: fairygui.GRichTextField;
	public proLb: fairygui.GRichTextField;
	public btnChange: Button2;
	public linkCheck: fairygui.GRichTextField;
	public lbCostStar: fairygui.GRichTextField;
	public lbCostUp: ViewResource;
	public grid0: SixWayYinJiItem;
	public grid1: SixWayYinJiItem;
	public grid2: SixWayYinJiItem;
	public grid3: SixWayYinJiItem;
	public grid4: SixWayYinJiItem;
	public grid5: SixWayYinJiItem;
	public powerLb: fairygui.GLabel;
	public btnBag: Button2;
	public lbMaxLv: fairygui.GTextField;
	public lbMaxStar: fairygui.GTextField;
	public lbCostStarBg: fairygui.GImage;
	public vChip: fairygui.GLabel;
	public bgImg: fairygui.GLoader;
	public lbPower: fairygui.GTextField;
	public lbSuitPow: fairygui.GTextField;

	private gridArr: SixWayYinJiItem[];

	public static URL: string = "ui://ehelf5bh11m1w14";

	public static createInstance(): SixWayYinJiView {
		return <SixWayYinJiView><any>(fairygui.UIPackage.createObject("lunhui", "SixWayYinJiView"));
	}
	
	public constructor() {
		super();
		this.setSkin("lunhui", "lunhui_atlas0", "SixWayYinJiView");
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		// self.gridArr = [];
		// for (let i = 0; i < 6; i++) {
		// 	self.gridArr[i] = <SixWayYinJiItem><any>(self.getChild("grid" + i));
		// 	self.gridArr[i].index = i + 1;
		// }
		// self.gridArr = [self.grid0, self.grid1, self.grid2, self.grid3, self.grid4, self.grid5];
	}

	protected initView(): void {
		super.initView();

		let self = this;
		self.linkCheck.text = HtmlUtil.createLink("查看套装");
		self.linkCheck.addEventListener(egret.TextEvent.LINK, self.openGaiLV, self);
	}

	protected onShown(): void {
		let s = this;
		s._type = s._args;
		s.gridArr = [s.grid0, s.grid1, s.grid2, s.grid3, s.grid4, s.grid5];
		IconUtil.setImg(s.bgImg, Enum_Path.SIXWAY_URL + "bg.jpg");
		// GGlobal.modellh.CG_OPEN_ONEWAY(s._type);
		s.addListen();
		s.updateView();
	}

	protected onHide(): void {
		let s = this;
		s.removeListen();
		// GGlobal.layerMgr.close(UIConst.SIXWAY_YINJI);
		GGlobal.layerMgr.open(UIConst.SIXWAY, 2);
	}

	private addListen(): void {
		let s = this;
		// GGlobal.control.listen(UIConst.SIXWAY_YINJI, s.updateView, s);
		GGlobal.control.listen(Model_LunHui.UP_STAR, s.upStar, s);
		GGlobal.control.listen(Model_LunHui.UP_LEVEL, s.upStar, s);
		s.btnUp.addClickListener(s.onUpLevel, s);
		s.btnStar.addClickListener(s.onUpStar, s);
		s.btnChange.addClickListener(s.onChange, s);
		for (let i = 0; i < s.gridArr.length; i++) {
			s.gridArr[i].addClickListener(s.OnAdd, s);
		}
		s.btnBag.addClickListener(s.onOpenBag, s);
		GGlobal.reddot.listen(UIConst.SIXWAY, s.upBagBtnRed, s);
		GGlobal.modelPlayer.listen(Model_player.YINJI_UPDATE, s.upYinji, s);
	}

	private removeListen(): void {
		let s = this;
		const modellh = GGlobal.modellh;
		// GGlobal.control.remove(UIConst.SIXWAY_YINJI, s.updateView, s);
		modellh.remove(Model_LunHui.UP_STAR, s.upStar, s);
		modellh.remove(Model_LunHui.UP_LEVEL, s.upStar, s);
		s.btnUp.removeClickListener(s.onUpLevel, s);
		s.btnStar.removeClickListener(s.onUpLevel, s);
		s.btnChange.removeClickListener(s.onChange, s);
		for (let i = 0; i < s.gridArr.length; i++) {
			s.gridArr[i].removeClickListener(s.OnAdd, s);
		}
		s.btnBag.removeClickListener(s.onOpenBag, s);
		GGlobal.reddot.remove(UIConst.SIXWAY, s.upBagBtnRed, s);
		IconUtil.setImg(s.bgImg, null);
		GGlobal.modelPlayer.remove(Model_player.YINJI_UPDATE, s.upYinji, s);
	}

	private OnAdd() {
		let self = this;
		let index = self.c1.selectedIndex;
		self.upSelect(self.gridArr[index]);
		if (self.c2.selectedIndex == 0) {
			GGlobal.layerMgr.open(UIConst.SIXWAY_BAG, self._selectVo.pos);
		}
	}

	private _selectVo: SixWayYinJiItem;
	private upSelect(v: SixWayYinJiItem) {
		let self = this;
		self._selectVo = v;
		if (v.vo == null || v.vo.id == 0) {//未镶嵌
			self.c2.selectedIndex = 0;
		}else{
			self.c2.selectedIndex = 1;
			self.lbName.text = v.vo.colorName;
			self.lbPower.text = "战力：" + v.vo.power;
			self.lbLv.text = "Lv." + v.vo.lv + "/" + v.vo.maxLv;
			self.lbAttr.text = ConfigHelp.attrStringQian(v.vo.attr, "+", null, "#15f234");
			
			//升级
			let isMaxLv = v.vo.lv >= v.vo.maxLv;
			self.lbMaxLv.visible = isMaxLv
			self.btnUp.visible = !isMaxLv
			self.lbCostUp.visible = !isMaxLv
			if (!isMaxLv) {
				let cfg:Isixdaolv_505 = Config.sixdaolv_505[v.vo.lv];
				let cost:number = 0;
				if(v.vo.pz == 2)
				{
					cost = cfg.exp2;
				}else if(v.vo.pz == 3)
				{
					cost = cfg.exp3;
				}else if(v.vo.pz == 4)
				{
					cost = cfg.exp4;
				}else if(v.vo.pz == 5)
				{
					cost = cfg.exp5;
				}else if(v.vo.pz == 6)
				{
					cost = cfg.exp6;
				}else{
					cost = cfg.exp8;
				}
				self.lbCostUp.setCount(HtmlUtil.fontNoSize(cost + "", Model_player.voMine.yinji >= cost ? Color.GREENSTR : Color.REDSTR));
				self.lbCostUp.setImgUrl(29);
				self.btnUp.checkNotice = Model_LunHui.canUpLevel(v.vo);
			}
			self.btnChange.checkNotice = Model_LunHui.canUpPower(v.vo.pos);
			
			//升星
			let isMaxStar = v.vo.star >= v.vo.maxStar;
			self.lbMaxStar.visible = isMaxStar;
			self.btnStar.visible = !isMaxStar
			self.lbCostStar.visible = !isMaxStar
			self.lbCostStarBg.visible = !isMaxStar;
			if (!isMaxStar) {
				let itemCt = Model_LunHui.getItemCt(v.vo.id);
				var colorStr;
				if (itemCt > 0) {
					colorStr = '#00FF00';
				} else {
					colorStr = '#FF0000';
				}
				self.lbCostStar.text = v.vo.colorName + HtmlUtil.fontNoSize("(" + itemCt + "/1)", colorStr);
				self.btnStar.checkNotice = Model_LunHui.canUpStar(v.vo);
			}
			if (v.vo.maxStar <= 1) {
				self.lbMaxStar.text = "不可升星"
			} else {
				self.lbMaxStar.text = "已满星"
			}
		}
	}

	private upStar() {
		let self = this;
		let model = GGlobal.modellh;
		for (let i = 0; i < self.gridArr.length; i++) {
			let id:number = self._type * 10 + self.gridArr[i].index;
			self.gridArr[i].setVo(model.equipArr[id], id);
		}
		self.upPower();
		if (self._selectVo) {
			self.c1.selectedIndex = self._selectVo.index - 1;
			self.upSelect(self._selectVo);
		}else {
			self.c1.selectedIndex = 0;
			self.upSelect(self.gridArr[0]);
		}
		self.updateAttr();
		self.upYinji();
	}

	/**
     * 更新页面数据
     */
	private updateView() {
		let self = this;
		let model = GGlobal.modellh;
		for (let i = 0; i < self.gridArr.length; i++) {
			let id:number = self._type * 10 + (i + 1);
			self.gridArr[i].index = i + 1;
			self.gridArr[i].setVo(model.equipArr[id], id);
		}
		// self.c1.selectedIndex = 0;
		// self.upSelect(self.gridArr[0]);
		if (self._selectVo) {
			self.c1.selectedIndex = self._selectVo.index - 1;
			self.upSelect(self._selectVo);
		}else {
			self.c1.selectedIndex = 0;
			self.upSelect(self.gridArr[0]);
		}
		self.upPower();
		self.updateAttr();
		self.upBagBtnRed();
		self.upYinji();
	}

	/**
	 * 更新背包红点
	 */
	private upBagBtnRed()
	{
		let self = this;
		self.btnBag.checkNotice = Model_LunHui.length >= 250;
	}

	private onUpLevel() {
		let v = this._selectVo.vo;
		if (!v) {
			return;
		}
		if (!Model_LunHui.canUpLevel(v, true)) {
			return;
		}
		GGlobal.modellh.CG_UP_LEVEL(this._selectVo.vo.type);
	}

	private onUpStar() {
		let v = this._selectVo.vo;
		if (!v) {
			return;
		}
		if (!Model_LunHui.canUpStar(v, true)) {
			return;
		}
		GGlobal.modellh.CG_UP_STAR(this._selectVo.vo.type);
	}

	/**
	 * 更换
	 */
	private onChange() {
		// let posB = -1;
		// for (let i = 1; i < 301; i++) {
		// 	if (Model_LunHui.bagMap[i] == null) {
		// 		posB = i;
		// 		break;
		// 	}
		// }
		// if (posB == -1) {
		// 	ViewCommonWarn.text("符文背包已满");
		// 	return;
		// }
		// GGlobal.modellh.CG_USE_YINGJI(2, this._selectVo.vo.id, posB, this._selectVo.vo.type);
		GGlobal.layerMgr.open(UIConst.SIXWAY_BAG, this._selectVo.pos);
	}

	/**
	 * 更新战力
	 */
	private upPower() {
		let total = 0;
		let model = GGlobal.modellh;
		for (let key in model.equipArr) {
			let eq:VoSixWay = model.equipArr[key];
			if (!eq || eq.id == 0) continue;
			if(Math.floor(eq.type / 10) == this._type)
			{
				total += eq.power;
			}
		}
		let id:number = model.suitArr[this._type - 1];
		let cfg:Isixdaotz_505 = Config.sixdaotz_505[id];
		let suitPower:number = cfg? cfg.power:0;
		total += suitPower;
		this.powerLb.text = total + "";
	}

	private openGaiLV(evt: egret.TextEvent) {
		GGlobal.layerMgr.open(UIConst.SIXWAY_CHECK, this._type);
	}

	/**
	 * 打开分解背包
	 */
	private onOpenBag() {
		// GGlobal.layerMgr.close2(UIConst.SIXWAY_YINJI);
		// GGlobal.layerMgr.close2(UIConst.SIXWAY);
		// GGlobal.layerMgr.close2(UIConst.LUNHUI);
		// GGlobal.layerMgr.close2(UIConst.TIANMING);
		GGlobal.layerMgr.open(UIConst.SIXWAY_FENJIE, UIConst.SIXWAY_YINJI);
	}

	/**更新属性 */
	private updateAttr()
	{
		let s = this;
		let model = GGlobal.modellh;
		let len:number = model.suitArr.length;
		let curCfg:Isixdaotz_505;
		let id:number = model.suitArr[s._type - 1];
		if(id <= 0)//未激活
		{
			for(let key in Config.sixdaotz_505)
			{
				let cfg:Isixdaotz_505 = Config.sixdaotz_505[key];
				if(cfg.type == s._type)
				{
					curCfg = cfg;
					break;
				}
			}

			s.nameLb.text = HtmlUtil.fontNoSize(curCfg.name + "(2/4/6)", "#666666");
			// let attArr: Array<any> = JSON.parse(curCfg.attr);
			// let attstr:string = "";
			// for (let i = 0; i < attArr.length; i++) {
			// 	attstr += Vo_attr.getShowStr(attArr[i][0], 0);
			// }
			s.proLb.text = "红品及以上印记激活套装";
			s.lbSuitPow.text = "战力：" + curCfg.power;
		}else{
			let str:string = "";
			curCfg = Config.sixdaotz_505[id];
			if(curCfg.num == 2)
			{
				str = "(" + HtmlUtil.fontNoSize("2", Color.WHITESTR) + "/4/6)";
			}else if(curCfg.num == 4)
			{
				str = "(2/" + HtmlUtil.fontNoSize("4", Color.WHITESTR) + "/6)";
			}else{
				str = "(2/4/" + HtmlUtil.fontNoSize("6", Color.WHITESTR) + ")";
			}
			s.nameLb.text = ConfigHelp.createColorName(curCfg.name, curCfg.pz) + str;
			// let attArr: Array<any> = JSON.parse(curCfg.attr);
			// let attstr:string = "";
			// for (let i = 0; i < attArr.length; i++) {
			// 	attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
			// }
			s.proLb.text = curCfg.tips;
			s.proLb.color = Color.WHITEINT;

			s.lbSuitPow.text = "战力：" + curCfg.power;
			s.lbSuitPow.color = Color.WHITEINT;
		}
	}

	/**更新印记碎片数量 */
	private upYinji() {
		this.vChip.text = ConfigHelp.numToStr(Model_player.voMine.yinji);
	}
}