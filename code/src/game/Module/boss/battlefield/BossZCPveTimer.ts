class BossZCPveTimer extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public n1: fairygui.GTextField;

	public static URL: string = "ui://47jfyc6emca439";

		private static _inst: BossZCPveTimer;
	public static createInstance(): BossZCPveTimer {
		if (!this._inst) {
			this._inst = <BossZCPveTimer><any>(fairygui.UIPackage.createObject("Boss", "BossZCPveTimer"));
		}
		return this._inst;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChild("n0"));
		this.n1 = <fairygui.GTextField><any>(this.getChild("n1"));
	}

	private updateX() {
		let now = Model_GlobalMsg.getServerTime();
		if ( now >= this._totalTime) {
			this.hide1();
			return;
		}
		let limt =this._totalTime -  now ;
		this.n1.text = "挑战剩余时间：" + DateUtil.getHMSBySecond2((limt / 1000) >> 0);;
	}

	private _totalTime = 60;
	public show1() {
		if (!this.parent) {
			GGlobal.layerMgr.UI_MainBottom.addChild(this);
		}
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 2);
		let st = GGlobal.modelBossZc.sceneState;
		this._totalTime = Model_GlobalMsg.getServerTime()+60000;
		Timer.instance.listen(this.updateX, this, 1000);
	}

	public hide1() {
		Timer.instance.remove(this.updateX, this);
		this.removeFromParent();
	}
}