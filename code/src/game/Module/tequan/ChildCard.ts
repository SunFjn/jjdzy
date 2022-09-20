/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildCard extends fairygui.GComponent {
	public bg: fairygui.GLoader;
	public btn: Button1;
	public ylq: fairygui.GImage;
	public lbTime: fairygui.GTextField;
	public n25: fairygui.GButton;
	public static URL: string = "ui://k82cjspug8eo4";

	private static _ins;
	public static createInstance(): ChildCard {
		if (!this._ins) this._ins = <ChildCard><any>(fairygui.UIPackage.createObject("tequan", "ChildCard"));
		return this._ins;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		this.bg = <fairygui.GLoader><any>(this.getChild("bg"));
		this.btn = <Button1><any>(this.getChild("btn"));
		this.ylq = <fairygui.GImage><any>(this.getChild("ylq"));
		this.lbTime = <fairygui.GTextField><any>(this.getChild("lbTime"));
		this.n25 = <fairygui.GButton><any>(this.getChild("n25"));
		this.btn.checkNotice = false;
	}

	private onClick() {
		if (this.st == -1) {
			let cfg = Config.tqk_719[this.idx];
			GGlobal.modelchongzhi.CG_CHONGZHI_135(cfg.shop);
		} else {
			GGlobal.modelvip.CG_LTQ_2173(this.idx);
		}
	}

	private renewHD() {
		let cfg = Config.tqk_719[this.idx];
		let cfg1 = Config.shop_011[cfg.shop];
		let t = cfg.QIXIAN / 86400;
		let tips = "续费成功可立即获得<font color='#15f234'>" + cfg1.num + "元宝</font>\n" + cfg1.name + "有效期延长" + t + "天";
		GGlobal.modelchongzhi.CG_CHONGZHI_135(cfg.shop, tips);
	}

	open() {
		let s = this;
		s.btn.addClickListener(s.onClick, s);
		s.n25.addClickListener(s.renewHD, s);

		GGlobal.control.listen(Enum_MsgType.TQ_LQ, s.update, s);
		GGlobal.control.listen(Enum_MsgType.TQ_INFO, s.update, s);
		s.initCFG();
		s.update();
		Timer.instance.listen(this.updateX, this, 1000);
	}

	close() {
		let s = this;
		s.btn.removeClickListener(s.onClick, s);
		s.n25.removeClickListener(s.renewHD, s);
		GGlobal.control.remove(Enum_MsgType.TQ_LQ, s.update, s);
		GGlobal.control.remove(Enum_MsgType.TQ_INFO, s.update, s);
		Timer.instance.remove(this.updateX, this);
		IconUtil.setImg(s.bg, null);
	}

	idx: number = 0;
	cfg;
	initCFG() {
		let a = this;
		let cfg = Config.tqk_719[a.idx];
		a.cfg = cfg;
		IconUtil.setImg(a.bg, Enum_Path.PIC_URL + "card" + a.idx + ".png");
		a.btn.text = "领取";
	}

	time = 0;
	st: number = -1;
	update() {
		let idx = this.idx;
		let index = [500401, 500402, 500403].indexOf(idx);
		let d = GGlobal.modelvip.tq_dta;
		for (var i = 0; i < 3; i++) {
			var arr = [index + 1, -1, 0];
			if (d) {
				let j = 0;
				for (j; j < d.length; j++) {
					if (d[j][0] == idx) {
						arr = d[j];
						break;
					}
				}
			}
		}
		let s = this;
		s.st = arr[1];
		s.btn.checkNotice = s.st == 0;
		s.btn.visible = s.st != 1;
		s.ylq.visible = s.st == 1;
		let time = s.cfg.QIXIAN;
		s.time = arr[2];
		if (time == 0) {
			s.n25.visible = false;
			s.lbTime.text = "有效期：永久有效";
		} else {
			s.n25.visible = s.time > egret.getTimer();
			s.lbTime.text = "有效期：" + (time / 3600 / 24) + "天";
		}
		s.updateX();
		s.btn.text = s.st == -1 ? s.cfg.COIN + "元" : "领取";
	}

	updateX() {
		if (this.time > egret.getTimer()) {
			this.lbTime.text = TimeUitl.getRemainingTime(this.time, egret.getTimer());
		}
	}
}