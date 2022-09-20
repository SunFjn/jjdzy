class Child_ActComCzZp extends fairygui.GComponent implements IPanel {

	public imgArrow: fairygui.GImage;
	public btnZP: Button2;
	public noticeImg: fairygui.GImage;
	public labTime: fairygui.GRichTextField;
	public checkBox: fairygui.GButton;
	public labTip: fairygui.GRichTextField;
	public labTip1: fairygui.GRichTextField;
	public linkLb: fairygui.GRichTextField;
	public expBar: fairygui.GProgressBar;

	public static pkg = "actComCzZp";

	public static URL: string = "ui://5omp3d64ve5s0";

	public static createInstance(): Child_ActComCzZp {
		return <Child_ActComCzZp><any>(fairygui.UIPackage.createObject("actComCzZp", "Child_ActComCzZp"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	private _act: Vo_Activity
	private _gridArr: ViewGrid[];
	private _imgArr: fairygui.GImage[];
	private _zpArr: fairygui.GImage[];

	initView(pParent: fairygui.GObject) {
		let s = this;
		s._gridArr = [];
		s._imgArr = [];
		s._zpArr = [];
		for (let i = 0; i < 8; i++) {
			s._gridArr.push(<ViewGrid><any>(s.getChild("grid" + i)))
			s._imgArr.push(<fairygui.GImage><any>(s.getChild("img" + i)))
			s._zpArr.push(<fairygui.GImage><any>(s.getChild("zp" + i)))
			s._imgArr[i].x = s._gridArr[i].x + 3
			s._imgArr[i].y = s._gridArr[i].y + 3
		}
		s.checkBox.visible = false;
	}
	openPanel(pData?: Vo_Activity) {
		let self = this;
		self._act = pData;
		self.show()
		self.setXY(0, 257);
	}
	closePanel(pData?: any) {
		this.disposePanel();
	}
	dispose() {
		this.disposePanel();
		super.dispose()
	}

	public show(): void {
		let s = this;
		Timer.instance.listen(this.upTimer, this, 1000);
		GGlobal.control.listen(Enum_MsgType.ACTCOM_CZZP, this.upUi, this);
		GGlobal.control.listen(Enum_MsgType.ACTCOM_CZZP_TURN, this.onTurn, this);
		GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_CZZP)
		s.btnZP.addClickListener(s.onZhuanP, s);
		s.linkLb.addClickListener(s.openGaiLV, s);
		s.upUi();
		s._rota = s.imgArrow.rotation = 0
	}

	private openGaiLV(evt: egret.TouchEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.GAILV, 6);
	}

	public disposePanel(): void {
		let s = this;
		Timer.instance.remove(this.upTimer, this);
		GGlobal.control.remove(Enum_MsgType.ACTCOM_CZZP, this.upUi, this);
		GGlobal.control.remove(Enum_MsgType.ACTCOM_CZZP_TURN, this.onTurn, this);
		s.btnZP.removeClickListener(s.onZhuanP, s)
		s.linkLb.removeClickListener(s.openGaiLV, s)
		for (let i = 0; i < 8; i++) {
			this._gridArr[i].clean();
		}
	}

	private upUi(): void {
		let s = this;
		let model = GGlobal.model_actCom
		if (model.zpArr.length == 0) {
			return;
		}
		s.upTimer();
		let max = 0;
		let cur = model.zpCharge
		let isTop = false
		//找下个充值数
		let len = model.zpArr.length
		for (let i = 0; i < len; i++) {
			let v = model.zpArr[i]
			let cfg = Config.czzpreward_281[v.id];
			if (cur < cfg.cz) {
				max = cfg.cz
				break;
			}
			if (i == len - 1) {
				max = cfg.cz
				isTop = true;
				break;
			}
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

		for (let i = 0; i < len; i++) {
			let v = model.zpArr[i]
			let cfg = Config.czzpreward_281[v.id];
			let arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.show))
			this._gridArr[i].tipEnabled = true;
			this._gridArr[i].isShowEff = true;
			this._gridArr[i].vo = arr[0];
			this._imgArr[i].visible = cfg.big > 0
			//已经转到过了
			let boo = (v.status == 1)
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
		GGlobal.model_actCom.CG_CHONG_ZHI_ZP_TURN();
	}

	private _rota = 0;
	private _tween: egret.Tween
	private onTurn() {
		let s = this;
		let model = GGlobal.model_actCom;
		var scrTo = model.zpPos % 1000;
		s.imgArrow.visible = true;
		var endRot = Math.floor(this._rota / 360) * 360 + (scrTo - 1) * 45 + 360 * 2;
		this._tween = egret.Tween.get(this.imgArrow).to({ rotation: endRot }, 1000).call(this.closeHand, this, [endRot]);
	}

	private closeHand(endRot) {
		this._rota = endRot
		this.upUi();
	}
}
