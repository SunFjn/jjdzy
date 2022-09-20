class Child_ActHolyBZhuanP extends fairygui.GComponent implements IActHolyBeast {

	//>>>>start
	public bgLoader0: fairygui.GLoader;
	public zp7: fairygui.GImage;
	public zp1: fairygui.GImage;
	public zp3: fairygui.GImage;
	public zp5: fairygui.GImage;
	public zp0: fairygui.GImage;
	public zp6: fairygui.GImage;
	public zp4: fairygui.GImage;
	public zp2: fairygui.GImage;
	public imgArrow: fairygui.GImage;
	public bgLoader1: fairygui.GLoader;
	public btnZP: Button2;
	public bgLoader: fairygui.GLoader;
	public noticeImg: fairygui.GImage;
	public labTime: fairygui.GRichTextField;
	public checkBox: fairygui.GButton;
	public grid6: ViewGrid;
	public grid7: ViewGrid;
	public grid0: ViewGrid;
	public grid1: ViewGrid;
	public grid2: ViewGrid;
	public grid3: ViewGrid;
	public grid4: ViewGrid;
	public grid5: ViewGrid;
	public labTip: fairygui.GRichTextField;
	public labTip1: fairygui.GRichTextField;
	public expBar: fairygui.GProgressBar;
	public img0: fairygui.GImage;
	public img1: fairygui.GImage;
	public img2: fairygui.GImage;
	public img3: fairygui.GImage;
	public img4: fairygui.GImage;
	public img5: fairygui.GImage;
	public img6: fairygui.GImage;
	public img7: fairygui.GImage;
	//>>>>end

	public static URL: string = "ui://d5y9ngt6n2pm6";

	public static createInstance(): Child_ActHolyBZhuanP {
		return <Child_ActHolyBZhuanP><any>(fairygui.UIPackage.createObject("actHolyBeast", "Child_ActHolyBZhuanP"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
		this._gridArr = [];
		this._imgArr = [];
		this._zpArr = [];
		for (let i = 0; i < 8; i++) {
			this._gridArr.push(<ViewGrid><any>(this.getChild("grid" + i)))
			this._imgArr.push(<fairygui.GImage><any>(this.getChild("img" + i)))
			this._zpArr.push(<fairygui.GImage><any>(this.getChild("zp" + i)))
			this._imgArr[i].x = this._gridArr[i].x + 3
			this._imgArr[i].y = this._gridArr[i].y + 3
		}
		this.checkBox.visible = false;
	}

	private static _instance: Child_ActHolyBZhuanP
	public static get instance(): Child_ActHolyBZhuanP {
		if (Child_ActHolyBZhuanP._instance == null) {
			Child_ActHolyBZhuanP._instance = Child_ActHolyBZhuanP.createInstance();
		}
		return Child_ActHolyBZhuanP._instance
	}

	public show(p: fairygui.GComponent, id): void {
		let s = this;
		s._hid = id;
		p.addChild(s);
		s.setXY(0, 257);

		Timer.instance.listen(this.upTimer, this, 1000);
		GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_ZHUANPAN, this.upUi, this);
		GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_ZHUANPAN_TURN, this.onTurn, this);
		GGlobal.modelEightLock.CG4571(id);
		s.btnZP.addClickListener(s.onZhuanP, s)
		s.upUi();
		s._rota = s.imgArrow.rotation = 0;
		IconUtil.setImg1(Enum_Path.PIC_URL + "actHolyBeast_zhuanBg.png", this.bgLoader);
		IconUtil.setImg1(Enum_Path.PIC_URL + "actHolyBeast_zhuanBg0.png", this.bgLoader0);
		IconUtil.setImg1(Enum_Path.PIC_URL + "actHolyBeast_zhuanBg1.png", this.bgLoader1);
	}

	public disposePanel(): void {
		let s = this;
		if (s.parent) {
			s.parent.removeChild(s);
		}
		Timer.instance.remove(this.upTimer, this);
		GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_ZHUANPAN, this.upUi, this);
		GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_ZHUANPAN_TURN, this.onTurn, this);
		s.btnZP.removeClickListener(s.onZhuanP, s)
		for (let i = 0; i < 8; i++) {
			this._gridArr[i].clean();
		}
		IconUtil.setImg1(null, this.bgLoader);
		IconUtil.setImg1(null, this.bgLoader0);
		IconUtil.setImg1(null, this.bgLoader1);
	}

	public dispose() {
		Child_ActHolyBZhuanP._instance = null;
		super.dispose();
	}

	private _hid: number
	private _act: Vo_Activity
	private _gridArr: ViewGrid[];
	private _imgArr: fairygui.GImage[];
	private _zpArr: fairygui.GImage[];
	private upUi(): void {
		let s = this;
		this._act = null;
		let model = GGlobal.modelActHolyB
		this._act = ModelEightLock.getActVo(this._hid);
		this.upTimer();
		let max = 0;
		let cur = model.zpCharge
		let keys = 1
		let isTop = false
		while (true) {
			let v = Config.ssshzpcz_268[keys]
			if (v == null) {
				isTop = true;
				max = Config.ssshzpcz_268[keys - 1].cz
				break;
			}
			if (cur < v.cz) {
				max = v.cz
				break;
			}
			keys++
		}
		if (isTop && cur >= max) {
			s.labTip.text = "已达到最高转盘次数";
			s.expBar.visible = false;
		} else {
			s.labTip.text = "再充值" + HtmlUtil.fontNoSize((max - cur) + "元", Color.YELLOWSTR) + "可增加转盘次数";
			s.expBar.value = cur;
			s.expBar.max = max;
			s.expBar.getChild("title").asTextField.text = cur + "/" + max;
			s.expBar.visible = true;
		}
		let color = model.zpHaveCt > 0 ? Color.GREENSTR : Color.REDSTR
		s.labTip1.text = "还可转" + HtmlUtil.fontNoSize(model.zpHaveCt + "", color) + "次"
		s.noticeImg.visible = model.zpHaveCt > 0;

		for (let i = 0; i < 8; i++) {
			let v = Config.ssshzpcz_268[i + 1];
			let arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.show))
			this._gridArr[i].tipEnabled = true;
			this._gridArr[i].isShowEff = true;
			this._gridArr[i].vo = arr[0];
			this._imgArr[i].visible = v.big > 0
		}

		for (let i = 0; i < 8; i++) {
			let v = model.zpArr[i]
			let boo = (v && v.status == 1)
			this._gridArr[i].grayed = boo;
			this._zpArr[i].grayed = boo;
			this._imgArr[i].grayed = boo;
		}
		s.imgArrow.visible = false;
	}

	private upTimer(): void {
		if (this._act) {
			var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
			if (d < 0) {
				this.labTime.text = "剩余时间：已结束"
			} else {
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d)
			}
		}
		else {
			this.labTime.text = "剩余时间：";
		}
	}

	private onZhuanP() {
		GGlobal.modelActHolyB.CG_ZHUANPAN_TURN();
	}

	private _rota = 0;
	private _tween: egret.Tween
	private onTurn() {
		let s = this;
		let model = GGlobal.modelActHolyB;
		var scrTo = model.zpPos;
		s.imgArrow.visible = true;
		var endRot = Math.floor(this._rota / 360) * 360 + (scrTo - 1) * 45 + 360 * 2;
		this._tween = egret.Tween.get(this.imgArrow).to({ rotation: endRot }, 1000).call(this.closeHand, this, [endRot]);
	}


	private closeHand(endRot) {
		this._rota = endRot
		this.upUi();
	}
}