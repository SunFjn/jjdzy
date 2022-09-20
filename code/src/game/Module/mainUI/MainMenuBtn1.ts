class MainMenuBtn1 extends MainMenuBtn {

	public timeLb: fairygui.GRichTextField;

	public static createInstance(): MainMenuBtn1 {
		return <MainMenuBtn1><any>(fairygui.UIPackage.createObject("MainUI", "MainMenuBtn1"));
	}

	public static URL: string = "ui://7gxkx46wved3b7v";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.timeLb = <fairygui.GRichTextField><any>(this.getChild("timeLb"));
	}


	public showTime() {
		let s = this;
		if (s.panelId == UIConst.LIMIT_GIFT) {
			GGlobal.model_limitGift.listen(Model_LimitGift.OPENUI, s.upLimitGift, s);
			s.upLimitGift();
		}
	}

	private upLimitGift() {
		let s = this;
		s._endTime = 0
		let m = GGlobal.model_limitGift;
		let arr = m.giftArr
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		for (let i = 0; i < arr.length; i++) {
			let v: VoLimitGift = arr[i];
			if (v.endTime - servTime <= 0) {
				continue;
			}
			if (s._endTime < v.endTime) {
				s._endTime = v.endTime;
			}
		}
		if (s._endTime > 0 && !Timer.instance.has(s.update, s)) {
			Timer.instance.listen(s.update, s, 1000);
			s.showEff(true);
		}

	}

	private endTime() {
		let s = this;
		if (s.panelId == UIConst.LIMIT_GIFT) {
			s.upLimitGift()
		}
		//移除按钮
		if (s._endTime <= 0) {
			GGlobal.mainUICtr.removeIcon(this.panelId)
		}
	}

	private _endTime
	private update(): void {
		let s = this;
		const end = s._endTime ? s._endTime : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			s.timeLb.text = "<font color='#15f234'>" + DateUtil.getHMSBySecond2(end - servTime) + "</font>" + "后结束";
		} else {
			s.timeLb.text = "00:00:00";
			Timer.instance.remove(s.update, s);
			s.endTime();
		}
	}

	public uidispose() {
		let s = this;
		super.uidispose()
		Timer.instance.remove(s.update, s);
		GGlobal.model_limitGift.remove(Model_LimitGift.OPENUI, s.upLimitGift, s);
	}
}