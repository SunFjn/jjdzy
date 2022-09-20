class VNianShouBtn extends fairygui.GButton {

	public img: fairygui.GLoader;
	public lb: fairygui.GRichTextField;
	public lbTit: fairygui.GRichTextField;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://ht2966i4qdrxh";

	public static createInstance(): VNianShouBtn {
		return <VNianShouBtn><any>(fairygui.UIPackage.createObject("actComNianShou", "VNianShouBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	private _checkNotice: boolean = false;
	public set checkNotice(value: boolean) {
		this._checkNotice = value;
		this.noticeImg.visible = value;
	}

	public get checkNotice(): boolean {
		return this._checkNotice;
	}
	iconEff
	public setSt(st) {
		let s = this;
		s.checkNotice = false;
		if (s.iconEff) {
			EffectMgr.instance.removeEff(s.iconEff);
			s.iconEff = null;
		}
		Timer.instance.remove(s.upTime, s);
		if (st == 0) {//0：未召唤，1：召唤，2：已击退
			Timer.instance.listen(s.upTime, s, 1000);
			s.upTime();
		} else if (st == 1) {
			s.lb.text = "已召唤"
		} else {
			s.lb.text = "已击退"
		}
	}

	private upTime() {
		let s = this;
		let cfg = Config.nian_299[5]
		if (Model_ActNianShou.getState(cfg.open, cfg.end)) {
			s.lb.text = "可召唤"
			if (!s.iconEff) {
				s.iconEff = EffectMgr.addEff("uieff/10021", s.displayListContainer, s.img.x + s.img.width / 2 - 7, s.img.y + s.img.height / 2 + 4, 1000, -1, true);
			}
		} else {
			const open = cfg.open.split(":");
			const end = cfg.end.split(":");
			s.lb.text = open[0] + ":" + open[1] + "-" + end[0] + ":" + end[1]
			if (s.iconEff) {
				EffectMgr.instance.removeEff(s.iconEff);
				s.iconEff = null;
			}
		}
	}

	public clean() {
		super.clean()
		let s = this;
		if (s.iconEff) {
			EffectMgr.instance.removeEff(s.iconEff);
			s.iconEff = null;
		}
		Timer.instance.remove(s.upTime, s);
	}
}