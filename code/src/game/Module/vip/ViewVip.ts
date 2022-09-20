/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewVip extends UIPanelBase {

	public frame: fairygui.GComponent;
	public n34: fairygui.GImage;
	public n15: fairygui.GImage;
	public n23: fairygui.GImage;
	public lbYlq: fairygui.GImage;
	public vipBar: fairygui.GProgressBar;
	public lbCZ: fairygui.GButton;
	public btn: Button0;
	public btnright: fairygui.GButton;
	public btnleft: fairygui.GButton;
	public pic: fairygui.GLoader;
	public boxTitle: fairygui.GLoader;
	public lbVip: fairygui.GRichTextField;
	public btnCheck: fairygui.GRichTextField;
	public lbNowBox: fairygui.GRichTextField;
	public lbPro: fairygui.GRichTextField;
	public i0: fairygui.GImage;
	public i1: fairygui.GImage;
	public i2: fairygui.GImage;
	public t0: fairygui.GRichTextField;
	public t1: fairygui.GRichTextField;
	public t2: fairygui.GRichTextField;
	public disLb: fairygui.GRichTextField;
	public btnGift: Button2;
	public n37: fairygui.GList;
	public static URL: string = "ui://w4xdcvn7nvyw0";

	public static createInstance(): ViewVip {
		return <ViewVip><any>(fairygui.UIPackage.createObject("vip", "ViewVip"));
	}

	public constructor() {
		super();
		this.isShowOpenAnimation = false;
		this.setSkin("vip", "vip_atlas0", "ViewVip");
	}

	private tts;
	private effContianer;
	protected initView(): void {
		super.initView();
		super.resetPosition();
		let s = this;
		let b = s.view;
		s.lbCZ.visible = !GGlobal.isIOS;
		s.lbPro.visible = !GGlobal.isIOS;
		s.effContianer = new fairygui.GComponent();
		b.addChildAt(s.effContianer, 3);
		s.tts = [s.i0, s.i1, s.i2, s.t0, s.t1, s.t2];
		s.n37.callbackThisObj = s;
		s.n37.itemRenderer = s.itemRender;
		s.btnGift.setNoticeXY(77, 15);
	}

	private awards = [];
	private itemRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.vo = this.awards[idx];
		item.tipEnabled = true;
		item.showEff(true);
	}

	private onLeft() {
		let s = this;
		if (s.showVIP > 0) {
			s.showVIP--;
			s.setIndex();
		}
	}

	private onRight() {
		let s = this;
		if (s.showVIP < s.maxVip + 1) {
			s.showVIP++;
			s.setIndex();
		}
	}

	private openCZ() {
		// GGlobal.layerMgr.open(UIConst.CHONGZHI);
		ViewChongZhi.tryToOpenCZ();
	}

	private openDS() {
		GGlobal.layerMgr.open(UIConst.VIPDESC, this.showVIP);
	}

	private lqHd() {
		if (this.showVIP - 1 > GGlobal.modelvip.vip) {
			ViewCommonWarn.text("未达条件");
			return;
		}
		GGlobal.modelvip.CG_LINGQU_2063(this.showVIP - 1);
	}

	private showDes(str: string) {
		const self = this;
		let data = str.split(",");;
		let len = data.length;
		let w0 = -20;
		for (let i = 0; i < 3; i++) {
			if (i < len) {
				self.tts[i].visible = true;
				self.tts[i + 3].visible = true;
				self.tts[i + 3].text = data[i];
				self.tts[i].x = w0 + 20;
				self.tts[i + 3].x = self.tts[i].x + 30;
				w0 = self.tts[i + 3].x + self.tts[i + 3].width;
			} else {
				self.tts[i].visible = false;
				self.tts[i + 3].visible = false;
			}
		}
		w0 = (640 - w0) >> 1;
		for (let i = 0; i < len; i++) {
			if (i < len) {
				self.tts[i].x = w0;
				self.tts[i + 3].x = self.tts[i].x + 30;
				w0 = self.tts[i + 3].x + self.tts[i + 3].width + 20;
			}
		}
	}

	private reCheck() {
		let s = this;
		let m = GGlobal.modelvip;
		let d = m.dta;
		let v = m.vip;
		s.showVIP = v + 2;
		s.showVIP = s.showVIP > s.maxVip + 1 ? s.maxVip + 1 : s.showVIP;

		for (var i = 0; i < v + 1; i++) {
			if (d.indexOf(i) < 0) {
				s.showVIP = i + 1;//自动翻页
				break;
			}
		}
		s.setIndex();
	}

	private setIndex() {
		let s = this;
		let m = GGlobal.modelvip;
		let vip = s.showVIP;
		let lib = Config.VIP_710[vip];


		IconUtil.setImg(s.boxTitle, Enum_Path.vipURL + lib.word + ".png");
		IconUtil.setImg(s.pic, Enum_Path.vipURL + lib.picture + ".png");
		// ImageLoader.instance.loader(Enum_Path.vipURL + lib.word + ".png", s.boxTitle);
		// ImageLoader.instance.loader(Enum_Path.vipURL + lib.picture + ".png", s.pic);
		s.showDes(lib.DES);

		let dt = m.dta;
		var bl = dt.indexOf(s.showVIP - 1) != -1
		s.btn.visible = !bl && (s.showVIP - 1) <= m.vip;
		s.btn.checkNotice = (s.showVIP - 1) <= m.vip;
		s.lbYlq.visible = bl;
		s.awards = ConfigHelp.makeItemListArr(JSON.parse(lib.AWARD));
		s.n37.numItems = s.awards.length;
		s.disLb.text = lib.zk + "折";
		s.lbNowBox.text = "VIP" + (vip - 1) + "特权礼包";

		s.btnleft.visible = s.showVIP != 1;
		s.btnright.visible = s.showVIP != s.maxVip + 1;
	}

	private maxVip: number = 0;
	private showVIP: number = 0;
	private update() {
		let s = this;
		let m = GGlobal.modelvip;
		let vip = m.vip + 1;
		s.lbVip.text = "P" + m.vip;
		let lib = Config.VIP_710[vip];
		s.maxVip = lib.MAXVIP;
		s.vipBar.value = m.exp;
		if (Config.VIP_710[vip + 1]) {
			let nxt = Config.VIP_710[vip + 1];
			s.vipBar.max = nxt.MONEY;
			s.lbPro.text = "再充值<font color='#15f234'>" + (nxt.MONEY - m.exp) + "元</font>即成为<font color='#15f234'>VIP" + vip + "</font>";
		} else {
			s.lbPro.text = "";
			s.vipBar.max = lib.MONEY;
		}

		s.reCheck();
		//材料获得跳转对应vip界面
		if (s._args) {
			s.showVIP = s._args + 1;
			s._args = null;
		}
		s.setIndex();
	}

	private openGift() {
		GGlobal.layerMgr.open(UIConst.VIPGIFT);
	}

	private checkGfitNotice() {
		this.btnGift.checkNotice = GGlobal.reddot.checkCondition(UIConst.VIPGIFT);
	}

	private updateGuanQia() {
		let s = this;
		s.lbCZ.visible = !GGlobal.isIOS;
		s.lbPro.visible = !GGlobal.isIOS;
	}

	private effPart;
	protected onShown() {
		let s = this;

		if (!s.effPart) {
			s.effPart = EffectMgr.addEff("uieff/10011", s.effContianer.displayListContainer, 320, 460, 800, -1);
			s.effPart.mc.scaleX = s.effPart.mc.scaleY = 3;
		}

		s.checkGfitNotice();

		GGlobal.modelvip.CG_OPENUI_2061();
		GGlobal.reddot.listen(ReddotEvent.CHECK_VIP, s.checkGfitNotice, s);
		GGlobal.control.listen(Enum_MsgType.VIP_OPEN, s.update, s);
		GGlobal.control.listen(Enum_MsgType.VIP_LQ, s.reCheck, s);
		GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, s.updateGuanQia, s);
	}

	protected onHide() {
		let s = this;

		if (s.effPart) {
			s.effPart.mc.scaleX = s.effPart.mc.scaleY = 1;
			s.effPart = EffectMgr.instance.removeEff(s.effPart);
			s.effPart = null;
		}
		s.n37.numItems = 0;
		GGlobal.reddot.remove(ReddotEvent.CHECK_VIP, s.checkGfitNotice, s);
		GGlobal.control.remove(Enum_MsgType.VIP_OPEN, s.update, s);
		GGlobal.control.remove(Enum_MsgType.VIP_LQ, s.reCheck, s);
		GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, s.updateGuanQia, s);
		GGlobal.layerMgr.close2(UIConst.VIP);

		IconUtil.setImg(s.boxTitle, null);
		IconUtil.setImg(s.pic, null);
	}

	eventFunction(t) {
		let self = this;
		let event = EventUtil.register;
		event(t, self.btn, EventUtil.TOUCH,self.lqHd,self);
		event(t, self.lbCZ, EventUtil.TOUCH,self.openCZ,self);
		event(t, self.btnleft, EventUtil.TOUCH,self.onLeft,self);
		event(t, self.btnGift, EventUtil.TOUCH,self.openGift,self);
		event(t, self.btnCheck, EventUtil.TOUCH,self.openDS,self);
		event(t, self.btnright, EventUtil.TOUCH,self.onRight,self);
	}
}