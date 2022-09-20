class ChildBaZhenTu extends fairygui.GComponent {

	public c1: fairygui.Controller;
	public c2: fairygui.Controller;
	public dizuoIcon: fairygui.GLoader;
	public btnUp: Button1;
	public btnStar: Button1;
	public lbName: fairygui.GTextField;
	public lbLv: fairygui.GTextField;
	public lbAttr: fairygui.GTextField;
	public btnChange: Button1;
	public btnShow: Button0;
	public grid: VBaZTGrid;
	public lbCostStar: fairygui.GRichTextField;
	public lbCostUp: ViewResource;
	public lbProgress: fairygui.GRichTextField;
	public lbPower: fairygui.GLabel;
	public btnWear: Button1;
	public btnFast: Button1;
	public lbLock1: fairygui.GTextField;
	public lbLock2: fairygui.GTextField;
	public imgName: fairygui.GLoader;
	public lbMaxLv: fairygui.GTextField;
	public lbMaxStar: fairygui.GTextField;
	public iyuan: fairygui.GImage;
	public vChip: fairygui.GLabel;
	public btnDaShi: Button2;
	public lbDaShi: fairygui.GRichTextField;
	public lbCostStarBg: fairygui.GImage;

	public static URL: string = "ui://xrzn9ppaf8nk1";

	private gridArr: VBaZTItem[];

	public static createInstance(): ChildBaZhenTu {
		return <ChildBaZhenTu><any>(fairygui.UIPackage.createObject("baZhenTu", "ChildBaZhenTu"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
		this.gridArr = []
		for (let i = 0; i < 10; i++) {
			this.gridArr[i] = <VBaZTItem><any>(this.getChild("grid" + i));
			this.gridArr[i].index = i + 1;
		}
	}

	public open() {
		const self = this;
		const modelBaZhenTu = GGlobal.modelBaZhenTu;
		self.eventFunction(1);
		self.grid.tipEnable = true;
		modelBaZhenTu.listen(Model_BaZhenTu.OPENUI, self.openUI, self);
		modelBaZhenTu.listen(Model_BaZhenTu.UP_STAR, self.upStar, self);
		modelBaZhenTu.listen(Model_BaZhenTu.UP_LEVEL, self.upStar, self);
		modelBaZhenTu.listen(Model_BaZhenTu.DA_SHI, self.upDashi, self);
		GGlobal.modelPlayer.listen(Model_player.FUWEN_UPDATE, self.upFuwen, self);
		modelBaZhenTu.listen(Model_BaZhenTu.JIESUO, self.openUI, self);
		IconUtil.setImg(self.dizuoIcon, Enum_Path.BAZHENTU_URL + "dizuo.png");
		self.update();
	}

	public close() {
		const self = this;
		const modelBaZhenTu = GGlobal.modelBaZhenTu;
		self.eventFunction(0);
		self.grid.tipEnable = false;
		self.grid.showEff(false);
		modelBaZhenTu.remove(Model_BaZhenTu.OPENUI, self.openUI, self);
		modelBaZhenTu.remove(Model_BaZhenTu.UP_STAR, self.upStar, self);
		modelBaZhenTu.remove(Model_BaZhenTu.UP_LEVEL, self.upStar, self);
		modelBaZhenTu.remove(Model_BaZhenTu.DA_SHI, self.upDashi, self);
		GGlobal.modelPlayer.remove(Model_player.FUWEN_UPDATE, self.upFuwen, self);
		modelBaZhenTu.remove(Model_BaZhenTu.JIESUO, self.openUI, self);
		IconUtil.setImg(self.dizuoIcon, null);
		IconUtil.setImg1(null, self.imgName);
	}

	eventFunction = (t) => {
		let self = this;
		let event = EventUtil.register;
		event(t, self.btnWear, EventUtil.TOUCH, self.onWear, self);
		event(t, self.btnChange, EventUtil.TOUCH, self.onWear, self);
		event(t, self.btnUp, EventUtil.TOUCH, self.onUpLevel, self);
		event(t, self.btnStar, EventUtil.TOUCH, self.onUpStar, self);
		event(t, self.btnShow, EventUtil.TOUCH, self.onShow, self);
		event(t, self.btnFast, EventUtil.TOUCH, self.onFast, self);
		event(t, self.btnDaShi, EventUtil.TOUCH, self.openDashi, self);
		for (let i = 0; i < self.gridArr.length; i++) {
			event(t, self.gridArr[i], EventUtil.TOUCH, self.OnChange, self);
		}
	}

	private onWear() {
		GGlobal.layerMgr.open(UIConst.BAZHENTU_BAG, this._selectVo.index)
	}

	private onUpLevel() {
		let v = this._selectVo.vo
		if (!v) {
			return;
		}
		if (!Model_BaZhenTu.canUpLevel(v, true)) {
			return;
		}
		GGlobal.modelBaZhenTu.CGUplevel4405(this._selectVo.index)
	}

	private onUpStar() {
		let v = this._selectVo.vo
		if (!v) {
			return;
		}
		if (!Model_BaZhenTu.canUpStar(v, true)) {
			return;
		}
		GGlobal.modelBaZhenTu.CGUpstar4407(this._selectVo.index)
	}

	private OnChange() {
		let index = this.c2.selectedIndex;
		this.upSelect(this.gridArr[index])
		if (this.c1.selectedIndex == 0) {
			GGlobal.layerMgr.open(UIConst.BAZHENTU_BAG, this._selectVo.index)
		}
	}

	private openUI() {
		this.update();
	}

	private upStar() {
		for (let i = 0; i < this.gridArr.length; i++) {
			this.gridArr[i].setVo(Model_BaZhenTu.equipArr[i]);
		}
		this.upPower();
		if (this._selectVo) {
			this.c2.selectedIndex = this._selectVo.index - 1;
			this.upSelect(this._selectVo);
		}
		else {
			this.c2.selectedIndex = 0;
			this.upSelect(this.gridArr[0]);
		}
		this.upFuwen()
	}

	private update() {
		for (let i = 0; i < this.gridArr.length; i++) {
			this.gridArr[i].setVo(Model_BaZhenTu.equipArr[i]);
		}
		this.c2.selectedIndex = 0;
		this.upSelect(this.gridArr[0])
		this.upPower();
		this.upFuwen();
		this.upDashi();
	}

	private upDashi() {
		let m = GGlobal.modelBaZhenTu
		this.lbDaShi.text = m.dsId + "阶";
		this.btnDaShi.checkNotice = m.dsSt == 1 || m.dsSt == 3;
	}

	private _selectVo: VBaZTItem
	private upSelect(v: VBaZTItem) {
		let self = this;
		self._selectVo = v
		self.iyuan.visible = false;
		if (Model_BaZhenTu.getIsLock(v.index)) {//未解锁
			self.c1.selectedIndex = 2
			let cfg = Config.bzt_261[v.index]
			IconUtil.setImg1(Enum_Path.BAZHENTU_URL + cfg.id + ".png", self.imgName);
			if (v.index > 8) {
				let totol = Model_BaZhenTu.getTotalLv()
				let color = totol < cfg.fw ? Color.REDSTR : Color.GREENSTR
				self.lbLock1.text = "解锁条件：符文总等级" + HtmlUtil.fontNoSize(cfg.fw + "级", color);
				self.iyuan.visible = true;
				let cost = Number(JSON.parse(cfg.xh)[0][2]);
				color = Model_player.voMine.yuanbao < cost ? Color.REDSTR : Color.GREENSTR;
				self.lbLock2.text = "解锁消耗：        " + HtmlUtil.fontNoSize(cost + "", color);
				self.btnFast.text = "解锁"
				self.btnFast.checkNotice = ((totol >= cfg.fw) && (Model_player.voMine.yuanbao >= cost))
				self.lbProgress.text = totol + "/" + cfg.fw
				self.lbProgress.color = totol < cfg.fw ? Color.REDINT : Color.GREENINT
			} else {
				self.lbLock1.text = "解锁：玩家达到" + HtmlUtil.fontNoSize(cfg.lv + "级", Color.REDSTR);
				self.lbLock2.text = "快速解锁：VIP" + HtmlUtil.fontNoSize(cfg.vip + "级", Color.REDSTR);
				self.btnFast.text = "快速解锁"
				self.btnFast.checkNotice = false;
				self.lbProgress.text = ""
			}
		}
		else if (v.vo == null || v.vo.id == 0) {//镶嵌
			self.c1.selectedIndex = 0
			self.btnWear.checkNotice = v.checkNotice;
		}
		else {
			self.c1.selectedIndex = 1
			self.grid.isShowEff = true;
			self.grid.vo = v.vo;
			self.lbName.text = v.vo.colorName;
			// self.lbName.color = Color.QUALITYCOLOR[v.vo.pz];
			self.lbLv.text = "Lv." + v.vo.level + "/" + v.vo.maxLv;
			self.lbAttr.text = ConfigHelp.attrStringQian(v.vo.attr, "+", null, "#15f234");
			//升星
			let isMaxStar = v.vo.starLv >= v.vo.maxStar
			self.lbMaxStar.visible = isMaxStar
			self.btnStar.visible = !isMaxStar
			self.lbCostStar.visible = !isMaxStar
			self.lbCostStarBg.visible = !isMaxStar;
			if (!isMaxStar) {
				let itemCt = Model_BaZhenTu.getItemCt(v.vo.id)
				var colorStr;
				if (itemCt > 0) {
					colorStr = '#00FF00';
				} else {
					colorStr = '#FF0000';
				}
				self.lbCostStar.text = v.vo.colorName + HtmlUtil.fontNoSize("(" + itemCt + "/1)", colorStr);
				self.btnStar.checkNotice = itemCt > 0
			}
			if (v.vo.maxStar <= 1) {
				self.lbMaxStar.text = "不可升星"
			} else {
				self.lbMaxStar.text = "已满星"
			}
			//升级消耗
			let isMaxLv = v.vo.level >= v.vo.maxmaxLv
			self.lbMaxLv.visible = isMaxLv
			self.btnUp.visible = !isMaxLv
			self.lbCostUp.visible = !isMaxLv
			if (!isMaxLv) {
				let costUp = Config.bztlv_261[v.vo.level]
				let cost = Number(costUp["exp" + v.vo.pz])
				self.lbCostUp.setCount(HtmlUtil.fontNoSize(cost + "", Model_player.voMine.fuwen >= cost ? Color.GREENSTR : Color.REDSTR))
				self.btnUp.checkNotice = Model_BaZhenTu.canUpLevel(v.vo)
				self.lbCostUp.setImgUrl(Enum_Attr.FUWEN)
			}
			self.btnChange.checkNotice = Model_BaZhenTu.canUpPower(v.index - 1);
		}
	}

	private onShow() {
		GGlobal.modelchat.CG_CHAT_SHOW_DATA(9, this._selectVo.index);
	}

	private onFast() {
		if (this._selectVo.index > 8) {
			let cfg = Config.bzt_261[this._selectVo.index]
			let totol = Model_BaZhenTu.getTotalLv()
			if (totol < cfg.fw) {
				ViewCommonWarn.text("符文总等级不足")
				return;
			}
			let cost = Number(JSON.parse(cfg.xh)[0][2]);
			if (Model_player.voMine.yuanbao < cost) {
				ModelChongZhi.guideToRecharge()
				return;
			}
			GGlobal.modelBaZhenTu.CGJieSuo4415(this._selectVo.index)
		} else {
			GGlobal.layerMgr.open(UIConst.VIP)
		}
	}

	private upPower() {
		let total = 0
		for (let i = 0; i < Model_BaZhenTu.equipArr.length; i++) {
			let eq = Model_BaZhenTu.equipArr[i];
			if (!eq || eq.id == 0) continue;
			total += eq.power
		}
		this.lbPower.text = total + ''
	}

	private upFuwen() {
		this.vChip.text = ConfigHelp.numToStr(Model_player.voMine.fuwen);
	}

	private openDashi() {
		GGlobal.layerMgr.open(UIConst.BAZHENTU_DASHI);
	}

}