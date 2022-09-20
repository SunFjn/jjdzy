class GuanQiaBar extends fairygui.GComponent {

	public fis1: fairygui.GImage;
	public fis2: fairygui.GImage;
	public fis3: fairygui.GImage;
	public g3: fairygui.GGroup;
	public fis11: fairygui.GImage;
	public g1: fairygui.GGroup;
	public fis21: fairygui.GImage;
	public fis23: fairygui.GImage;
	public g2: fairygui.GGroup;

	public static URL: string = "ui://7gxkx46wbq0h59";

	public static createInstance(): GuanQiaBar {
		return <GuanQiaBar><any>(fairygui.UIPackage.createObject("MainUI", "GuanQiaBar"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.fis1 = <fairygui.GImage><any>(this.getChild("fis1"));
		this.fis2 = <fairygui.GImage><any>(this.getChild("fis2"));
		this.fis3 = <fairygui.GImage><any>(this.getChild("fis3"));
		this.g3 = <fairygui.GGroup><any>(this.getChild("g3"));
		this.fis11 = <fairygui.GImage><any>(this.getChild("fis11"));
		this.g1 = <fairygui.GGroup><any>(this.getChild("g1"));
		this.fis21 = <fairygui.GImage><any>(this.getChild("fis21"));
		this.fis23 = <fairygui.GImage><any>(this.getChild("fis23"));
		this.g2 = <fairygui.GGroup><any>(this.getChild("g2"));
		this._eff_list = [];
	}

	public setVo(val, max) {
		while (this._eff_list.length) {
			let eff: Part = this._eff_list.shift();
			if(eff)EffectMgr.instance.removeEff(eff);
		}

		if (max == 1) {
			this.fis11.visible = val > 0;
			if (val > 0) {
				this.putEffect(this.fis11, true);
			}
		} else if (max == 2) {
			this.fis21.visible = val > 0;
			if (val > 0) {
				this.putEffect(this.fis21);
			}
			this.fis23.visible = val > 1;
			if (val > 1) {
				this.putEffect(this.fis23);
			}
		} else if (max == 3) {
			this.fis1.visible = val > 0;
			if (val > 0) {
				this.putEffect(this.fis1);
			}
			this.fis2.visible = val > 1;
			if (val > 1) {
				this.putEffect(this.fis2, true);
			}
			this.fis3.visible = val > 2;
			if (val > 2) {
				this.putEffect(this.fis3);
			}
		}
		this.g1.visible = max == 1;
		this.g2.visible = max == 2;
		this.g3.visible = max == 3;
	}

	private putEffect(_parent, isBig = false, _x = 18, _y = 14) {
		if (isBig) _x =27,_y=23;
		let eff: Part = EffectMgr.addEff("uieff/10016", _parent.parent.displayListContainer, _parent.x + _x, _parent.y + _y, 800, -1, true);
		if (isBig) eff.mc.scaleX = eff.mc.scaleY = 1.35;
		this._eff_list.push(eff);
	}

	private _eff_list;
}