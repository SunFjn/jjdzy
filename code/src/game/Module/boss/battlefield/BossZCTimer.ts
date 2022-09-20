/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class BossZCTimer extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public n1: fairygui.GRichTextField;

	public static URL: string = "ui://47jfyc6esx3835";

	private static _inst: BossZCTimer;
	public static createInstance(): BossZCTimer {
		if (!this._inst) {
			this._inst = <BossZCTimer><any>(fairygui.UIPackage.createObject("Boss", "BossZCTimer"));
		}
		return this._inst;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChild("n0"));
		this.n1 = <fairygui.GRichTextField><any>(this.getChild("n1"));
		this.touchable = false;
	}


	private updateX() {
		let now = Model_GlobalMsg.getServerTime();
		if ( now >= GGlobal.modelBossZc.entranceCloseTime) {
			this.hide1();
			return;
		}
		let limt =GGlobal.modelBossZc.entranceCloseTime -  now ;
		this.n1.text = this.fix + DateUtil.getHMSBySecond2((limt / 1000) >> 0);;
	}

	private fix = "入口关闭倒计时：";
	private setPrefix(){
		this.fix = GGlobal.modelBossZc.sceneState == 1?"入口关闭倒计时：":"BOSS刷新倒计时：";
	}

	public show1() {
		if (!this.parent) {
			GGlobal.layerMgr.UI_MainBottom.addChild(this);
		}
		this.setXY((fairygui.GRoot.inst.width - this.width) >>1, (fairygui.GRoot.inst.height - this.height) >> 2);
		let st = GGlobal.modelBossZc.sceneState;
		let now = Model_GlobalMsg.getServerTime();
		if (st == 4 || now >= GGlobal.modelBossZc.entranceCloseTime) {
			this.hide1();
		} else {
			Timer.instance.listen(this.updateX, this, 1000);
		}
		GGlobal.control.listen(Enum_MsgType.BOSSZC_READYTIME, this.setPrefix, this);
	}

	public hide1() {
		Timer.instance.remove(this.updateX, this);
		this.removeFromParent();
		GGlobal.control.remove(Enum_MsgType.BOSSZC_READYTIME, this.setPrefix, this);
	}
}