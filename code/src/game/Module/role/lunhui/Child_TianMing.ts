class Child_TianMing extends fairygui.GComponent implements IPanel{

	public c1: fairygui.Controller;
	public imgBg: fairygui.GLoader;
	public powerLb: fairygui.GLabel;
	public grid0: GridTianMing;
	public imgBg1: fairygui.GLoader;
	public lbName: fairygui.GRichTextField;
	public lbPower: fairygui.GRichTextField;
	public lbAttr: fairygui.GRichTextField;
	public grid1: GridTianMing;
	public grid2: GridTianMing;
	public grid3: GridTianMing;
	public grid4: GridTianMing;
	public grid5: GridTianMing;
	public grid: GridTianMing;
	public imgMax: fairygui.GImage;
	public lbJiHuo: fairygui.GRichTextField;
	public btnPin: Button1;
	public vres: ViewResource;
	public lbres: fairygui.GRichTextField;
	public boxUp: fairygui.GGroup;
	public lb: fairygui.GRichTextField;
	public btnLv: Button1;

	public static URL: string = "ui://ehelf5bhh2o6l";

	// private _lisDat: IGridImpl[]
	gridArr: GridTianMing[];

	public static createInstance(): Child_TianMing {
		return <Child_TianMing><any>(fairygui.UIPackage.createObject("lunhui", "Child_TianMing"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.onShown();
	}

	closePanel(pData?: any) {
		this.onHide();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.gridArr = [s.grid0, s.grid1, s.grid2, s.grid3, s.grid4, s.grid5]
	}

	public onShown() {
		let s = this;
		let m = GGlobal.modellh
		let r = GGlobal.reddot
		m.CG_OPENTM_10591();
		r.listen(UIConst.TIANMING, s.upView, s);
		// m.listen(Model_LunHui.OPENUI_TM, s.upView, s)
		// m.listen(Model_LunHui.UP_TM, s.upView, s)
		s.c1.selectedIndex = 0;
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.upControl, s);
		s.btnLv.addClickListener(s.onUp, s);
		s.btnPin.addClickListener(s.onUp, s);
		IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "tianming.jpg");
	}

	public onHide() {
		let s = this;
		let m = GGlobal.modellh
		let r = GGlobal.reddot
		r.remove(UIConst.TIANMING, s.upView, s);
		// m.remove(Model_LunHui.OPENUI_TM, s.upView, s)
		// m.remove(Model_LunHui.UP_TM, s.upView, s)
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.upControl, s);
		s.btnLv.removeClickListener(s.onUp, s);
		s.btnPin.removeClickListener(s.onUp, s);
		IconUtil.setImg(s.imgBg, null);
		for (let i = 0; i < s.gridArr.length; i++) {
			s.gridArr[i].clean();
		}
		s.grid.clean();
	}

	private upView() {
		let s = this;
		let m = GGlobal.modellh
		let power = 0;
		for (let i = 0; i < 6; i++) {
			let v = m.tmArr[i]
			s.gridArr[i].vo = v
			power += ((v.cfgPin ? v.cfgPin.power : 0) + (v.cfgLv ? v.cfgLv.power : 0))
		}
		s.upSel(m.tmArr[s.c1.selectedIndex])

		s.powerLb.text = power + "";
	}

	private upControl() {
		let s = this;
		let m = GGlobal.modellh
		s.upSel(m.tmArr[s.c1.selectedIndex])
	}

	private _selVo: VoTianMing
	private upSel(v: VoTianMing) {
		let s = this;
		s._selVo = v;
		s.upDate();
	}
	private upDate() {
		let s = this;
		let v = s._selVo
		if (!v) return;
		s.lbName.text = HtmlUtil.fontNoSize(v.cfg.name, Color.getColorStr(v.pinId % 10))
		if (v.lvId == 0) {
			s.lbPower.text = ""
			s.lbAttr.text = ""
		} else {
			s.lbPower.text = "战力+" + (v.cfgPin.power + v.cfgLv.power)
			//合并属性
			let attrPin: number[][] = JSON.parse(v.cfgPin.attr)
			let attrLv: number[][] = JSON.parse(v.cfgLv.attr)
			for (let i = 0; i < attrPin.length; i++) {
				let type = attrPin[i][0];
				for (let j = 0; j < attrLv.length; j++) {
					let type1 = attrLv[j][0];
					let val1 = attrLv[j][1];
					if (type == type1) {
						attrPin[i][1] += val1;
						break;
					}
				}
			}
			s.lbAttr.text = ConfigHelp.attrString(attrPin)
		}
		//详情
		s.grid.vo1 = v;
		if (v.lvId == 0) {//未激活
			s.lbJiHuo.visible = true;
			s.boxUp.visible = false
			s.imgMax.visible = false;
			s.lbJiHuo.text = v.cfg.lh + "世轮回开启"
		} else if (v.cfgLv.next == 0) {//满级
			s.lbJiHuo.visible = false;
			s.boxUp.visible = false
			s.imgMax.visible = true;
		} else {
			s.lbJiHuo.visible = false;
			s.imgMax.visible = false;
			s.boxUp.visible = true
			let pin = Config.tmlv_292[v.cfgLv.next].pin
			let consume
			if ((v.pinId % 10) >= pin) {//升级
				s.lb.text = "天命升级"
				s.btnPin.visible = false
				s.btnLv.visible = true
				s._itres = ConfigHelp.makeItemListArr(JSON.parse(v.cfgLv.consume))[0];
				consume = v.cfgLv.consume
			} else {//升品
				s.lb.text = "天命升品"
				s.btnLv.visible = false
				s.btnPin.visible = true
				s._itres = ConfigHelp.makeItemListArr(JSON.parse(v.cfgPin.consume))[0];
				consume = v.cfgPin.consume
			}
			s.lbres.text = HtmlUtil.fontNoSize(s._itres.name, Color.getColorStr(s._itres.quality))
			s.vres.setItemId(s._itres.id)
			let bagCt = Model_Bag.getItemCount(s._itres.id);
			s.vres.setLb(bagCt, s._itres.count);
			s.btnPin.checkNotice = s.btnLv.checkNotice = ConfigHelp.checkEnough(consume, false);
		}
	}

	// private renderHandler(index: number, obj: ViewGrid) {
	// 	obj.tipEnabled = obj.isShowEff = true;
	// 	obj.vo = this._lisDat[index];
	// }
	private _itres: IGridImpl
	private onUp(e: egret.TouchEvent) {
		let s = this;
		let m = GGlobal.modellh
		if (!s._selVo) {
			return;
		}
		let lh = Model_player.voMine.reincarnationLevel
		if (lh < s._selVo.cfg.lh) {
			ViewCommonWarn.text("轮回等级不足")
			return
		}
		let btn: Button1 = e.currentTarget
		if (!btn.checkNotice) {
			View_CaiLiao_GetPanel.show(s._itres as VoItem)
			return;
		}
		m.CG_UPTM_10593(s._selVo.id)
	}
}