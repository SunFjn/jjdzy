class VGodWeaponPoint extends fairygui.GComponent {

	public lbPoint: fairygui.GRichTextField;
	public btnPoint: ViewGrid;

	public static URL: string = "ui://zyx92gzwm4uj47";

	public static createInstance(): VGodWeaponPoint {
		return <VGodWeaponPoint><any>(fairygui.UIPackage.createObject("wuJiang", "VGodWeaponPoint"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	public setVo(rewardVo: IGridImpl, num) {
		let self = this;
		self.lbPoint.text = num + "次";
		self.btnPoint.isShowEff = true;
		self.btnPoint.tipEnabled = true;
		self.btnPoint.vo = rewardVo;
	}

	public clean() {
		this.btnPoint.clean();
	}
}