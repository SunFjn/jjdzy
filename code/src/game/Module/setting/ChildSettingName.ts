class ChildSettingName extends fairygui.GComponent {

	public c1: fairygui.Controller;
	public inputName: fairygui.GTextInput;
	public labTitle: fairygui.GRichTextField;
	public labNoVoice: fairygui.GRichTextField;
	public labCost: fairygui.GRichTextField;
	public checkVoice: fairygui.GButton;
	public checkVoiceBGM: fairygui.GButton;
	public btnSure: fairygui.GButton;
	public labCostCount: fairygui.GRichTextField;
	public labVoice: fairygui.GRichTextField;
	public imgYB: fairygui.GImage;
	public imgCost: fairygui.GLoader;
	public viewHead: ViewHead;
	public lab1: fairygui.GRichTextField;
	public lab2: fairygui.GRichTextField;
	public lab3: fairygui.GRichTextField;
	public labName: fairygui.GRichTextField;
	public labID: fairygui.GRichTextField;
	public labLevel: fairygui.GRichTextField;
	public labZs: fairygui.GRichTextField;
	public btnCopy: fairygui.GRichTextField;
	public btnCopy1: fairygui.GRichTextField;
	public btnCopyID: fairygui.GRichTextField;
	public changeBt: fairygui.GButton;

	public static URL: string = "ui://dt6yws4jg30n1";

	public static createInstance(): ChildSettingName {
		return <ChildSettingName><any>(fairygui.UIPackage.createObject("setting", "ChildSettingName"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		if ((PlatformManager.isTanWan && GGlobal.loginArg.os && GGlobal.loginArg.os != "ios") ||
			PlatformManager.is350 || PlatformManager.isWanZi) {
			self.changeBt.visible = true;
		} else {
			self.changeBt.visible = false;
		}

		if (PlatformManager.isTanWan && GGlobal.loginArg.os && GGlobal.loginArg.os == "ios") {
			self.btnCopy.visible = false;
			self.btnCopy1.visible = false;
		} else {
			self.btnCopy.visible = true;
			self.btnCopy1.visible = true;
		}
		// this.inputName.restrict = "0-9a-zA-Z\u4E00-\u9FCB";
	}

	private onChange() {
		HLSDK.logout();
	}

	private onFocusOut() {
		(window as any).scrollTo(0, 0);
	}

	public addListen(): void {
		let self = this;
		self.registerEvent(true);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		EventUtil.register(pFlag, self.btnSure, egret.TouchEvent.TOUCH_TAP, self.onSure, self);
		EventUtil.register(pFlag, self.btnCopy, egret.TouchEvent.TOUCH_TAP, self.onCopy, self);
		EventUtil.register(pFlag, self.btnCopyID, egret.TouchEvent.TOUCH_TAP, self.onCopyID, self);
		EventUtil.register(pFlag, self.changeBt, egret.TouchEvent.TOUCH_TAP, self.onChange, self);
		EventUtil.register(pFlag, self.checkVoice, fairygui.StateChangeEvent.CHANGED, self.onChanged, self);
		EventUtil.register(pFlag, self.checkVoiceBGM, fairygui.StateChangeEvent.CHANGED, self.onChangedBGM, self);
		EventUtil.register(pFlag, self.inputName, egret.TextEvent.CHANGE, self.onInput, self);
		GGlobal.control.register(pFlag, Enum_MsgType.SETTING_CHANGE_NAME, self.upCost, self)
		if (PlatformManager.isTanWan && GGlobal.loginArg && GGlobal.loginArg.os == "ios") {
			EventUtil.register(pFlag, self.inputName, egret.FocusEvent.FOCUS_OUT, self.onFocusOut, self);
		}
	}

	public removeListen(): void {
		let self = this;
		self.registerEvent(false);
	}

	private _cost: number;
	public update(): void {
		let self = this;
		self.inputName.text = "";
		let sound = SoundManager.getInstance();
		self.checkVoiceBGM.selected = !sound.BGM;
		self.checkVoice.selected = !sound.EFF;
		self.labID.text = Model_player.voMine.id+"";
		self.upCost();
	}

	private upCost(): void {
		let self = this;
		let cardCout = Model_Bag.getItemCount(Model_Setting.CHANGE_NAME)
		if (cardCout > 0) {
			var item = VoItem.create(Model_Setting.CHANGE_NAME)
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + item.icon + ".png", self.imgCost);
			self._cost = 0
			self.labCostCount.text = cardCout + "/1";
			self.labCostCount.color = Color.GREENINT
			self.imgYB.visible = false;
			self.imgCost.visible = true;
		} else {
			self.imgYB.visible = true;
			self.imgCost.visible = false;
			self._cost = ConfigHelp.getSystemNum(1051)
			self.labCostCount.text = "" + self._cost;
			self.labCostCount.color = Model_player.voMine.yuanbao >= self._cost ? Color.GREENINT : Color.REDINT
		}

		let voMine = Model_player.voMine
		self.labName.text = voMine.name;
		self.labLevel.text = voMine.level + "";
		if (voMine.zsID > 0) {
			self.labZs.text = Config.zhuansheng_705[voMine.zsID].lv;
		} else {
			self.labZs.text = ""
		}
		let c = Model_Setting.showCamp ? 0 : voMine.country
		self.viewHead.setdata(Model_Setting.headId, -1, null, -1, false, Model_Setting.frameId, c)
	}

	private onSure(): void {
		if (!Model_GlobalMsg.rename) {
			ViewCommonWarn.text("改名系统维护中");
			return;
		}
		var name = this.inputName.text;
		name = name.replace(/\s+/g, '');//过滤空格
		if (Model_player.voMine.yuanbao < this._cost) {
			ModelChongZhi.guideToRecharge();
			return;
		}
		if (name == "") {
			ViewCommonWarn.text("请输入名称");
			return;
		}
		var len = this.getStrByteLen(name);
		if (len > 12) {
			ViewCommonWarn.text("名字长度不能超过6个汉字或12个英文数字");
			return;
		}
		if (name == Model_player.voMine.name) {
			ViewCommonWarn.text("名称相同");
			return;
		}
		GGlobal.modelSetting.CGChangeName(name);
	}

	protected getStrByteLen(str: string): number {
		var len = str.replace(/[^x00-xFF]/g, '**').length;
		return len
	}

	private onChangedBGM(e): void {
		SoundManager.getInstance().setBGM(!this.checkVoiceBGM.selected);
		GGlobal.modelSetting.CGOperateSound(this.checkVoiceBGM.selected ? 1 : 0, this.checkVoice.selected ? 1 : 0);
		GGlobal.control.notify(Enum_MsgType.SETTING_CHANGE_HEAD)
	}

	private onChanged(e): void {
		SoundManager.getInstance().setEFF(!this.checkVoice.selected)
		GGlobal.modelSetting.CGOperateSound(this.checkVoiceBGM.selected ? 1 : 0, this.checkVoice.selected ? 1 : 0);
		GGlobal.control.notify(Enum_MsgType.SETTING_CHANGE_HEAD)
	}

	private onCopy(e): void {
		let str = this.labName.text
		Model_Setting.onCopy(str, "复制成功");
	}

	private onCopyID(e): void {
		let str = this.labID.text
		Model_Setting.onCopy(str, "复制成功");
	}

	protected onInput(): void {
		var e = this, t = e.inputName.text, n = t.length;
		if (t.length > 0) {
			var o = t.charAt(n - 1)
				, i = o.match(e.nameReg);
			if (null == i)
				return;
			t = t.substr(0, n - 1)
		}
		var n = this.getStrByteLen(t);
		if (t != e.inputName.text) {
			e.inputName.text = t
		}
	}
	private nameReg = /[^0-9a-zA-Z\u4E00-\u9fa50]/g;
}