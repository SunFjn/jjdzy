/** 战力提升 */
class ViewStrUp extends fairygui.GComponent {

	// public lbPower: fairygui.GRichTextField;
	public lbAdd: fairygui.GTextField;

	public static URL: string = "ui://7gxkx46wre2a2w";

	public static createInstance(): ViewStrUp {
		return <ViewStrUp><any>(fairygui.UIPackage.createObject("MainUI", "ViewStrUp"));
	}

	public constructor() {
		super();
	}

	private comp: fairygui.GComponent;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		// this.lbPower = <fairygui.GRichTextField><any>(this.getChild("lbPower"));
		this.lbAdd = <fairygui.GTextField><any>(this.getChild("lbAdd"));
		this.comp = new fairygui.GComponent();
		this.addChildAt(this.comp, 0);
		this.touchable = false;
	}

	private numadd;
	private basePower;
	private lastTime = 0;
	private tweenArr: any[] = [];
	public showText(val) {
		egret.Tween.removeTweens(this);
		egret.Tween.removeTweens(this.lbAdd);
		this.oldValue = val;
		this.basePower = Model_player.voMine.str;
		this.lbAdd.text = "";
		// this.lbPower.text = this.basePower + "";
		let now = egret.getTimer();

		this.numadd = val - this.basePower;
		this.numperc = 0;
		this.alpha = 1;
		this.y = fairygui.GRoot.inst.height * 0.65;
		this.x = fairygui.GRoot.inst.width * 0.5;
		EffectMgr.addEff("uieff/" + 10009, this.comp.displayListContainer, 40, 25, 500, 500, false);
		egret.Tween.get(this).to({ numperc: 1 }, 500).wait(800).call(this.onComp, this);
	}

	private effPart: Part;
	public showEff(v: boolean): void {
		if (v) {
			if (this.effPart) {
				EffectMgr.instance.removeEff(this.effPart);
				this.effPart = null;
			}
			if (this.effPart == null) {
				this.effPart = EffectMgr.addEff("uieff/" + 10009, this.comp.displayListContainer, 40, 25, 500, 500, false);
			}
		} else {
			if (this.effPart) {
				EffectMgr.instance.removeEff(this.effPart);
				this.effPart = null;
			}
		}
	}



	// public onComp1() {
	// 	this.lbAdd.text = this.numadd + "";
	// 	this.lbAdd.y = 6;
	// 	egret.Tween.get(this.lbAdd).to({ y: this.lbAdd.y - 20 }, 400, egret.Ease.circOut).wait(200).call(this.onComp2, this);
	// }

	public alphaArg = { alpha: 0.2 };
	public onComp2() {
		egret.Tween.get(this).to(this.alphaArg, 600).call(this.onComp, this);
	}

	public onComp() {
		this.close();
		egret.Tween.removeTweens(this);
		egret.Tween.removeTweens(this.lbAdd);
	}

	public oldValue = 1000;
	public vo;
	public _numperc: number;
	public set numperc(v: number) {
		this._numperc = v;
		var showvalue = (this.numadd * v + this.basePower) >> 0;
		this.lbAdd.text = String((this.numadd * v) >> 0);
		// this.lbPower.text = String(showvalue);
	}

	public get numperc() {
		return this._numperc;
	}

	private close() {
		if (ViewStrUp.instance && ViewStrUp.instance.parent)
			ViewStrUp.instance.parent.removeChild(ViewStrUp.instance);
	}

	private static instance: ViewStrUp;
	public static show(val) {
		if (!GGlobal.isEnterGame) return;
		if (!this.instance) this.instance = this.createInstance();
		this.instance.showText(val);
		GGlobal.layerMgr.UI_Message.addChild(this.instance);
	}

	public static hide() {
		if (this.instance.parent) GGlobal.layerMgr.UI_Message.removeChild(this.instance);
	}
}