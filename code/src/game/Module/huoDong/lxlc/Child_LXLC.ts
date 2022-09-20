class Child_LXLC extends fairygui.GComponent {

	public imgHeadbg: fairygui.GLoader;
	public imgCharge: fairygui.GImage;
	public labTime: fairygui.GRichTextField;
	public labCharge: fairygui.GRichTextField;
	public labDay: fairygui.GRichTextField;
	public expBar: fairygui.GProgressBar;
	public list: fairygui.GList;
	public btnGet: Button1;
	public btnRec: Button1;
	public btnBigGet: Button1;
	public imgBigGet: fairygui.GImage;
	public imgGet: fairygui.GImage;
	public imgBig: fairygui.GLoader;
	public imgLabBig: fairygui.GImage;
	public labBig: fairygui.GRichTextField;
	public item0: VLXLCItem;
	public item1: VLXLCItem;
	public item2: VLXLCItem;

	public static URL: string = "ui://vrw7je9re7xr12";

	private _itemArr: VLXLCItem[]

	private static _instance: Child_LXLC
	public static get instance(): Child_LXLC {
		if (Child_LXLC._instance == null) {
			let fac = fairygui.UIObjectFactory;
			fac.setPackageItemExtension(Child_LXLC.URL, Child_LXLC);
			fac.setPackageItemExtension(VLXLCItem.URL, VLXLCItem);
			Child_LXLC._instance = <Child_LXLC><any>(fairygui.UIPackage.createObject("huoDong", "Child_LXLC"));
		}
		return Child_LXLC._instance
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const sf = this;
		CommonManager.parseChildren(sf, sf);
		sf._itemArr = [sf.item0, sf.item1, sf.item2];

		sf.list.callbackThisObj = sf;
		sf.list.itemRenderer = sf.itenRender;

		var titleObject = <fairygui.GTextField><any>(sf.expBar.getChild("title"));
		titleObject.visible = false;
	}

	disposePanel() {
		let s = this;
		if (s.parent) {
			s.parent.removeChild(s);
		}
		GGlobal.control.remove(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI, s.update, s);
		GGlobal.control.remove(Enum_MsgType.ZERO_RESET, s.zeroRest, s);
		Timer.instance.remove(s.updateX, s);
		s.btnGet.removeClickListener(s.onGet, s)
		s.btnRec.removeClickListener(s.onRec, s)
		s.btnBigGet.removeClickListener(s.onBigGet, s)
		s.list.numItems = 0;
		if (this.awatar) {
			this.awatar.onRemove();
			this.awatar = null;
		}
		for (let i = 0; i < 3; i++) {
			this._itemArr[i].clean()
		}
		IconUtil.setImg(this.imgHeadbg, null);
		IconUtil.setImg(this.imgBig, null);
	}

	private _act: Vo_Activity;
	private _hid;
	public show(p: fairygui.GComponent, id): void {
		let s = this;
		s._hid = id;
		p.addChild(s);
		s.setXY(0, 290);
		if (Model_GlobalMsg.kaifuDay > 7) {
			s._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, UIConst.HUODONG_SEVEN_ACT);
			GGlobal.modelHuoDong.CG_SEVEN_ACT_UI();
		} else {
			GGlobal.modelHuoDong.CG_SEVEN_KAIFU_UI();
		}
		GGlobal.control.listen(Enum_MsgType.HUODONG_SEVEN_KF_OPENUI, s.update, s);
		GGlobal.control.listen(Enum_MsgType.ZERO_RESET, s.zeroRest, s);
		Timer.instance.listen(s.updateX, s, 1000);

		IconUtil.setImg(this.imgHeadbg, Enum_Path.PIC_URL + "bar" + Config.jchd_723[id].icon + ".jpg");
		s.btnGet.addClickListener(s.onGet, s)
		s.btnRec.addClickListener(s.onRec, s)
		s.btnBigGet.addClickListener(s.onBigGet, s)
		s.updateX();
		s.update();
	}

	private updateX() {
		if (Model_GlobalMsg.kaifuDay > 7) {
			if (this._act) {
				var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
				d = Math.max(d, 0)
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d);
			} else {
				this.labTime.text = "剩余时间："
			}
		} else {
			let ax = Model_GlobalMsg.getkaiFuTime();
			if (ax < 0) {
				this.labTime.text = "剩余时间：已结束";
			} else {
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
			}
		}
	}

	private _showArr;
	private _bigArr: Ilxlc2_745[];
	private awatar: UIRole = null;

	private update() {
		let s = this;
		let lib;
		let qs = 0;
		if (Model_GlobalMsg.kaifuDay <= 7) {
			lib = Config.lxlc1_745;
		} else {
			lib = Config.lxlc2_745;
			qs = Model_HuoDong.sevenQs;
		}
		let showStr;
		if (Model_GlobalMsg.kaifuDay <= 7) {
			showStr = ConfigHelp.getSystemDesc(5201);
		} else {
			if (qs == 4) {
				showStr = ConfigHelp.getSystemDesc(5208);//单独写死
			} else if (qs == 5) {
				showStr = ConfigHelp.getSystemDesc(5209);//单独写死
			} else {
				showStr = ConfigHelp.getSystemDesc(5201 + qs);
			}
		}
		s._showArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(showStr))
		s.list.numItems = s._showArr.length;
		//今日领取
		s.imgGet.visible = Model_HuoDong.sevenKfStatus == 2;
		s.btnGet.visible = Model_HuoDong.sevenKfStatus == 1;
		s.btnGet.checkNotice = true;
		s.btnRec.visible = Model_HuoDong.sevenKfStatus == 0;
		//大奖领取
		s._bigArr = [];
		for (let key in lib) {
			let v = lib[key];
			if (v.qishu && qs > 0) {
				if (v.qishu == qs) {
					s._bigArr.push(v)
				}
			} else {
				s._bigArr.push(v)
			}
		}
		//大奖最大天数
		let tianMax = s._bigArr[s._bigArr.length - 1].tianshu
		let hStatus: number = 0;
		//大奖当前天数
		let tianCur;
		let bigArr: Ilxlc2_745;
		s._hHuoD = null;
		for (let i = 0; i < 3; i++) {
			tianCur = s._bigArr[i].tianshu
			bigArr = s._bigArr[i]
			let h = Model_HuoDong.sevenKfArr[i];
			if (!h) {
				break;
			}
			s._hHuoD = h;
			hStatus = h.status
			if (Model_HuoDong.sevenKfCount < tianCur) {
				break;
			}
			if (h.status < 2) {
				break;
			}
		}
		for (let i = 0; i < 3; i++) {
			s._itemArr[i].vo = s._bigArr[i]
		}
		this.expBar.value = Model_HuoDong.sevenKfCount;
		this.expBar.max = tianMax;

		let zhanshiArr = ConfigHelp.SplitStr(bigArr.zhanshi)
		let zhanshiType = Number(zhanshiArr[0][0])
		let zhanshiValue = Number(zhanshiArr[0][1])

		if (this.awatar) {
			this.awatar.onRemove();
			this.awatar = null;
		}
		if (zhanshiType == 1) {
			IconUtil.setImg(s.imgBig, Enum_Path.PIC_URL + zhanshiValue + ".png");
			s.imgBig.visible = true;
		} else {
			s.imgBig.visible = false;

			if (!this.awatar) {
				this.awatar = UIRole.create();
				this.awatar.setPos(this.imgLabBig.x + this.imgLabBig.width / 2, this.imgLabBig.y - 30);
				this.awatar.setScaleXY(1.5, 1.5);
				this.awatar.uiparent = this.displayListContainer;

				this.awatar.setBody(zhanshiValue);
				this.awatar.setWeapon(zhanshiValue);
				this.awatar.onAdd();
			}
		}

		this.labBig.text = "大奖进度" + Model_HuoDong.sevenKfCount + "/" + tianCur
		this.labCharge.text = "今日已充" + HtmlUtil.fontNoSize(Model_HuoDong.sevenKf + "", Color.TEXT_YELLOW) + "元"
		this.labDay.text = Model_HuoDong.sevenKfCount + "天"
		if (Model_HuoDong.sevenKfCount < tianCur) {
			s.imgBigGet.visible = false;
			s.btnBigGet.visible = false;

			s.labBig.visible = true;
			s.imgLabBig.visible = true;
		} else {
			s.imgBigGet.visible = hStatus == 2;
			s.btnBigGet.visible = hStatus < 2;
			s.btnBigGet.checkNotice = hStatus == 1;

			s.labBig.visible = false;
			s.imgLabBig.visible = false;
		}
	}

	private itenRender(idx, obj) {
		let it: ViewGrid = obj as ViewGrid;
		it.tipEnabled = true;
		it.isShowEff = true;
		it.vo = this._showArr[idx];
	}

	private onGet() {
		if (Model_GlobalMsg.kaifuDay <= 7) {
			GGlobal.modelHuoDong.CG_SEVEN_KAIFU_TODAY();
		} else {
			GGlobal.modelHuoDong.CG_SEVEN_ACT_TODAY();
		}
	}

	private onRec() {
		ViewChongZhi.tryToOpenCZ();
	}

	private _hHuoD: Vo_HuoDong
	private onBigGet() {
		let s = this;
		if (s._hHuoD == null) {
			return;
		}
		if (Model_GlobalMsg.kaifuDay <= 7) {
			GGlobal.modelHuoDong.CG_SEVEN_KAIFU_GET(s._hHuoD.id);
		} else {
			GGlobal.modelHuoDong.CG_SEVEN_ACT_GET(s._hHuoD.id);

		}
	}

	private zeroRest() {
		let s = this;
		if (Model_GlobalMsg.kaifuDay > 7) {
			s._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, UIConst.HUODONG_SEVEN_ACT);
			GGlobal.modelHuoDong.CG_SEVEN_ACT_UI();
		} else {
			GGlobal.modelHuoDong.CG_SEVEN_KAIFU_UI();
		}
	}
}