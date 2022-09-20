class ViewCreateRolePanel extends UIPanelBase {

	public c1: fairygui.Controller;
	public imgBg: fairygui.GLoader;
	public labName: fairygui.GTextInput;
	public btnEnter: fairygui.GButton;
	public btnRandom: fairygui.GButton;
	public btn1: ChildRoleBtn;
	public btn2: ChildRoleBtn;
	public btn3: ChildRoleBtn;
	public labTime: fairygui.GTextField;
	public imgSelect: fairygui.GLoader;

	public static URL: string = "ui://hpazy1tefurkg";
	protected enterTime: number;
	protected selName: string;
	protected currentState: number = -1;

	public static createInstance(): ViewCreateRolePanel {
		return <ViewCreateRolePanel><any>(fairygui.UIPackage.createObject("createRole", "ViewCreateRolePanel"));
	}

	public constructor() {
		super();
		this.isShowOpenAnimation = false;
		this.setSkin("createRole", "createRole_atlas0", "ViewCreateRolePanel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(ChildRoleBtn.URL, ChildRoleBtn);
	}
	private bgurl;
	protected initView(): void {
		super.initView();
		let self = this;
		// this.labName.restrict = "0-9a-zA-Z\u4E00-\u9FCB";
		self.c1.selectedIndex = -1;
		if (GGlobal.sdk) GGlobal.sdk.RegisterReport();
		GGlobal.modelLogin.CG_CreateEnter_Complete();
		self.btn1.vo = 1;
		self.btn2.vo = 2;
		self.btn3.vo = 3;
		if (!Model_GlobalMsg.rename) {
			self.labName.touchable = false;
		}
		GGlobal.layerMgr.addChildMainBg();

		self.onrelize();
		GGlobal.control.listen(Enum_MsgType.ONRESIZE, self.onrelize, self);
	}

	private onrelize() {
		let sc = LayerManager.getFullScreenSc();
		this.setScale(sc, sc);
		let xx = (App.stage.stageWidth - this.width * sc) >> 1;
		let yy = (App.stage.stageHeight - this.height * sc) >> 1;
		this.setXY(xx, yy);//不考虑横屏
	}

	protected onShown(): void {
		GGlobal.main.hideLoadBg();
		this.addListen();
		this.updateView();
	}

	protected onHide(): void {
		this.removeListen();
		if (this.roleEff) {
			EffectMgr.instance.removeEff(this.roleEff);
			this.roleEff = null;
		}
		if (this.eff) {
			EffectMgr.instance.removeEff(this.eff);
			this.eff = null;
		}
		GGlobal.control.remove(Enum_MsgType.ONRESIZE, this.onrelize, this);
		IconUtil.setImg(this.imgSelect, null);
	}

	private onFocusOut() {
		(window as any).scrollTo(0, 0);
	}

	private addListen(): void {
		let self = this;
		self.registerEvent(true);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.onSelectJob, self);
		EventUtil.register(pFlag, self.labName, egret.TextEvent.CHANGE, self.onInput, self);
		EventUtil.register(pFlag, self, egret.Event.ENTER_FRAME, self.onframe, self);
		EventUtil.register(pFlag, self.btnRandom, egret.TouchEvent.TOUCH_TAP, self.onRandomName, self);
		EventUtil.register(pFlag, self.btnEnter, egret.TouchEvent.TOUCH_TAP, self.onEnter, self);
		GGlobal.modelLogin.register(pFlag, "createRoleResult", self.enterResult, self)
		if (PlatformManager.isTanWan && GGlobal.loginArg && GGlobal.loginArg.os == "ios") {
			EventUtil.register(pFlag, self.labName, egret.FocusEvent.FOCUS_OUT, self.onFocusOut, self);
		}
	}

	private removeListen(): void {
		let self = this;
		self.registerEvent(false);
	}

	private updateView(): void {
		var job = RandomName.getRndStr([1, 3]);
		this.c1.selectedIndex = job - 1;
		this.onRandomName();
		if (!this.eff) {
			let effImg: fairygui.GImage = this["n29"];
			this.eff = EffectMgr.addEff("uieff/10015", this.displayListContainer, effImg.x + effImg.width / 2, effImg.y + effImg.height / 2 - 250, 600);
		}
	}

	private eff: Part;
	private roleEff: Part;
	public onSelectJob(): void {
		if (this.currentState == this.c1.selectedIndex) {
			return;
		}
		this.currentState = this.c1.selectedIndex;
		this.enterTime = egret.getTimer() + 60000;
		IconUtil.setImg(this.imgSelect, Enum_Path.BACK_URL + "crero" + (this.currentState + 1) + ".png");
		let urlArr = [10013, 10014, 10012];
		let posY = [0, 87, 0];
		let posX = [0, -28, 0];
		if (this.roleEff) {
			EffectMgr.instance.removeEff(this.roleEff);
			this.roleEff = null;
		}
		this.roleEff = EffectMgr.addEff("uieff/" + urlArr[this.currentState], this.displayListContainer, this.imgSelect.x + this.imgSelect.width / 2 + posX[this.currentState], this.imgSelect.y + this.imgSelect.height / 2 + posY[this.currentState], 1000);
	}

	protected onRandomName(): void {
		this.selName = RandomName.getName();
		this.labName.text = this.selName;
		this.enterTime = egret.getTimer() + 60000;
	}

	protected onEnter(): void {
		this.enterTime = 0;
		var name = this.labName.text;
		// var name = this.selName;
		name = name.replace(/\s+/g, '');//过滤空格
		if (name == "") {
			this.enterResult(-1);
			return;
		}
		var len = this.getStrByteLen(name);
		if (len > 12) {
			this.enterResult(-4);
			return;
		}
		var state = this.c1.selectedIndex + 1;
		ModelLogin.roleName = name;
		GGlobal.modelLogin.requestCreateRole(state, name);
	}

	protected onInput(): void {
		// var name = this.labName.text;
		// name = name.replace(/\s+/g, "");//去掉所有空格
		// var len = this.getStrByteLen(name);
		// if (len > 12) {
		// 	// name = this.selName;
		// }
		// this.enterTime = egret.getTimer() + 60000;
		// if (name != this.labName.text) {
		// 	this.labName.text = name;
		// }


		var e = this, t = e.labName.text, n = t.length;
		if (t.length > 0) {
			var o = t.charAt(n - 1)
				, i = o.match(e.nameReg);
			if (null == i)
				return;
			t = t.substr(0, n - 1)
		}
		var n = this.getStrByteLen(t);
		e.enterTime = egret.getTimer() + 60000;
		if (t != e.labName.text) {
			e.labName.text = t
		}
	}
	// private nameReg = /[^0-9a-zA-Z\u4E00-\u9FCB\u706c\u4e36\u4e3f\u4e44\u4e28\uff06\u222f\u27b7\u27b9\u221d\u2534\u306e\u30c7\u039f\u042d\u30b7\u224c\uffe1\u3049\u3005\u03b2\u0025\u3084]/g;
	private nameReg = /[^0-9a-zA-Z\u4E00-\u9fa50]/g;

	protected getStrByteLen(str: string): number {
		var len = str.replace(/[^x00-xFF]/g, '**').length;
		return len
	}

	/**-1空字符 -2名字重复 -3名字中含有非法字符 -4输入过长*/
	protected enterResult(type: number): void {
		this.enterTime = type;
		this.labTime.color = 0xFF0000;
		if (type == -1) {
			this.labTime.text = "请输入名字";
		} else if (type == -2) {
			this.labTime.text = "名字已存在";
		} else if (type == -3) {
			this.labTime.text = "名字中含有非法字符";
		} else if (type == -4) {
			this.labTime.text = "名字长度不能超过6个汉字或12个英文数字";
		}
	}

	protected onframe(): void {
		if (this.enterTime > 0) {
			var now = egret.getTimer();
			var time = this.enterTime - now;
			this.labTime.color = 0x00FF00;
			if (time > 0) {
				time = Math.ceil(time / 1000);
				this.labTime.text = time + "秒后自动进入游戏";
			} else {
				this.labTime.text = "";
				this.onEnter();
			}
		}
	}
}