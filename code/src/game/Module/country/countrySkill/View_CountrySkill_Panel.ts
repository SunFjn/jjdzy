class View_CountrySkill_Panel extends UIPanelBase {

	public labName: fairygui.GTextField;
	public viewHead: ViewHead;
	public lbShuoMing: fairygui.GRichTextField;
	public lbCost: fairygui.GTextField;
	public btnGet: Button1;
	public vres: ViewResource;
	public lbCondition: fairygui.GTextField;
	public list: fairygui.GList;
	public boxMax: fairygui.GGroup;
	public imgTitle: fairygui.GLoader;
	public lbKing: fairygui.GTextField;
	public lbPower: fairygui.GLabel;
	public btnLeft: Button2;
	public btnRight: Button2;
	public c1: fairygui.Controller;

	public static URL: string = "ui://uwzc58njdr4r6c";

	public static createInstance(): View_CountrySkill_Panel {
		return <View_CountrySkill_Panel><any>(fairygui.UIPackage.createObject("country", "View_CountrySkill_Panel"));
	}

	public constructor() {
		super();
		this.setSkin("country", "country_atlas0", "View_CountrySkill_Panel");
	}

	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(ViewCouSkillItem.URL, ViewCouSkillItem);
	}

	protected initView(): void {
		super.initView();
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHander;
		this.list.setVirtual();
		this.lbShuoMing.text = HtmlUtil.createLink("玩法说明");
		this.vres.setImgUrl(Enum_Attr.PRESTIGE)
	}

	private _first: boolean = true;
	protected onShown(): void {
		this.addListen();
		this.updateView();
		GGlobal.modelCouSkill.CG_OPENUI();
	}

	protected onHide(): void {
		this.removeListen();
		this.list.numItems = 0;
		this._curpage = 0
		GGlobal.layerMgr.close(UIConst.COUNTRY_SKILL);
	}

	private addListen(): void {
		this.btnGet.addClickListener(this.onClickGet, this);
		this.lbShuoMing.addEventListener(egret.TextEvent.LINK, this.openShuoM, this);
		this.list.addEventListener(fairygui.ItemEvent.CLICK, this.listHander, this);
		this.btnLeft.addClickListener(this.pageHandler, this);
		this.btnRight.addClickListener(this.pageHandler, this);
		GGlobal.control.listen(Enum_MsgType.COUNTRY_SKILL_OPEN_UI, this.updateView, this)
		GGlobal.control.listen(Enum_MsgType.COUNTRY_SKILL_UP, this.upLevel, this)
		this.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
	}

	private removeListen(): void {
		this.btnGet.removeClickListener(this.onClickGet, this);
		this.lbShuoMing.removeEventListener(egret.TextEvent.LINK, this.openShuoM, this);
		this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.listHander, this);
		this.btnLeft.removeClickListener(this.pageHandler, this);
		this.btnRight.removeClickListener(this.pageHandler, this);
		GGlobal.control.remove(Enum_MsgType.COUNTRY_SKILL_OPEN_UI, this.updateView, this)
		GGlobal.control.remove(Enum_MsgType.COUNTRY_SKILL_UP, this.upLevel, this)
		this.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL, this.scrollComp, this);
	}

	private updateView(): void {
		if (Model_player.voMine.country == 0) return;
		if (GGlobal.modelCouSkill.status == 1) {
			this.labName.text = "虚位以待";
			this.viewHead.setdata(null);
		} else {
			this.labName.text = Model_Country.kingName ? Model_Country.kingName : "虚位以待";
			if (Model_Country.kingName) {
				this.viewHead.setdata(Model_Country.kingHead, Model_Country.kingLv, "", -1, false, Model_Country.kingFrame);
			} else {
				this.viewHead.setdata(null);
			}
		}
		let titleArr = JSON.parse(Config.xtcs_004[1067].other);
		var cfgCH = Config.chenghao_702[titleArr[Model_player.voMine.country - 1][0]]
		ImageLoader.instance.loader(Enum_Path.TITLE_URL + cfgCH.picture + ".png", this.imgTitle);

		let model = GGlobal.modelCouSkill
		this._skillArr = model.skillArr
		this.list.numItems = this._skillArr.length;
		if (this._skillArr.length > 0) {
			this._selVo = this._skillArr[0];
			this.list.scrollToView(0);
			this.list.selectedIndex = 0;
		} else {
			this._selVo = null
		}
		this.upSelVo();
		this.upPower();
		this.setNotice();
	}

	private upLevel() {
		let model = GGlobal.modelCouSkill
		this._skillArr = model.skillArr
		this.list.numItems = this._skillArr.length;
		if (this._selVo) {
			let wz = this._selVo.cfg.wz;
			this._selVo = this._skillArr[wz - 1];
		}
		this.upSelVo();
		this.upPower();
	}

	private upPower() {
		let total = 0;
		for (let i = 0; i < this._skillArr.length; i++) {
			let v = this._skillArr[i];
			total += v.cfg.power
		}
		this.lbPower.text = total + "";
	}

	private onClickGet() {
		if (this._selVo == null) return;
		if (!this._red1) {
			ViewCommonWarn.text("未达到条件")
			return;
		}
		if (!this._red2) {
			ViewCommonWarn.text("国家声望不足")
			return;
		}
		GGlobal.modelCouSkill.CG_JIHUO_OR_UPLV(this._selVo.skillId);
	}

	private _skillArr: { skillId: number, isAct: number, cfg: Igjjn_748 }[];
	private renderHander(index: number, obj: fairygui.GObject): void {
		var gird: ViewCouSkillItem = obj as ViewCouSkillItem;
		gird.vo = this._skillArr[index];
	}

	private openShuoM(evt: egret.TextEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.COUNTRY_SKILL)
	}

	private _selVo: { skillId: number, isAct: number, cfg: Igjjn_748 };
	private listHander(e: fairygui.ItemEvent): void {
		var gird: ViewCouSkillItem = e.itemObject as ViewCouSkillItem
		this._selVo = gird.vo
		this.upSelVo()
	}

	private upSelVo() {
		let model = GGlobal.modelCouSkill
		if (!model.canUpSkill()) {
			this.c1.selectedIndex = 0;
			this.vres.setCount(GGlobal.modelCouSkill.shengwang)
			this.vres.color = Color.WHITEINT;
			return;
		}

		if (!this._selVo) {
			this.c1.selectedIndex = 1;
			this.lbCondition.text = ""
			this.btnGet.text = "升级"
			this.btnGet.checkNotice = false
			this.vres.setCount(0)
			return
		}
		if (this._selVo.cfg.next == 0) {
			this.c1.selectedIndex = 2;
		} else {
			this.c1.selectedIndex = 1;
			let red1 = false;
			if (this._selVo.cfg.tj > 0) {
				let total = 0;
				for (let i = 0; i < this._skillArr.length; i++) {
					let v = this._skillArr[i];
					total += (v.skillId % 1000)
				}
				this.lbCondition.text = "升级条件：技能总等级到达" + total + "/" + this._selVo.cfg.tj + "级";
				this.lbCondition.color = total >= this._selVo.cfg.tj ? Color.GREENINT : Color.REDINT;
				red1 = total >= this._selVo.cfg.tj
			} else {
				this.lbCondition.text = "";
				red1 = true;
			}
			let consume = JSON.parse(this._selVo.cfg.consume)
			this.vres.setLb(GGlobal.modelCouSkill.shengwang, Number(consume[0][2]))
			let red2 = GGlobal.modelCouSkill.shengwang >= Number(consume[0][2])
			if ((this._selVo.skillId % 1000) == 0) {
				this.btnGet.text = "激活"
			} else {
				this.btnGet.text = "升级"
			}
			this._red1 = red1
			this._red2 = red2
			this.btnGet.checkNotice = (red1 && red2);
		}
	}
	private _red1
	private _red2

	private _curpage: number = 0;
	private pageHandler(event: egret.TouchEvent): void {
		let btn: fairygui.GButton = event.target as fairygui.GButton;
		let curpage: number = this.list.getFirstChildInView();
		switch (btn.id) {
			case this.btnLeft.id:
				if (curpage > 0) {
					curpage = curpage - 3;
					if (curpage < 0) curpage = 0;
				}
				break;
			case this.btnRight.id:
				if (curpage < this.list.numItems - 1) {
					curpage = curpage + 3;
					if (curpage >= this.list.numItems - 1) curpage = this.list.numItems - 1;
				}
				break;
		}
		this._curpage = curpage;
		if (this.list.numItems > 0)
			this.list.scrollToView(curpage, true, true);
		this.setNotice();
	}

	private setNotice(): void {
		this.btnRight.checkNotice = false;
		this.btnLeft.checkNotice = false;
		for (let i = 0; i < this._skillArr.length; i++) {
			let id = this._skillArr[i].skillId
			let red = GGlobal.modelCouSkill.checkRedVo(id);
			if (red && i > this._curpage + 2) {
				this.btnRight.checkNotice = true;
			}
			if (red && i < this._curpage) {
				this.btnLeft.checkNotice = true;
			}
		}
	}

	private scrollComp(): void {
		let curpage: number = this.list.getFirstChildInView();
		this._curpage = curpage;
		this.setNotice();
	}
}