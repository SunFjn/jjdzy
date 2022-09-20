class FengHuoNamePlug extends fairygui.GComponent {

	public static POOL = [];
	public static isSelf: boolean;
	public static create(isSelf: boolean = true): FengHuoNamePlug {
		FengHuoNamePlug.isSelf = isSelf;
		return FengHuoNamePlug.POOL.length ? FengHuoNamePlug.POOL.pop() : FengHuoNamePlug.createInstance();
	}

	public titleImg: fairygui.GLoader;
	public nameLb: fairygui.GRichTextField;
	public n3: fairygui.GImage;
	public t0: fairygui.Transition;

	public static URL: string = "ui://edvdots4m2dlw1s";

	public static createInstance(): FengHuoNamePlug {
		return <FengHuoNamePlug><any>(fairygui.UIPackage.createObject("FengHuoLY", "FengHuoNamePlug"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.titleImg = <fairygui.GLoader><any>(this.getChild("titleImg"));
		this.nameLb = <fairygui.GRichTextField><any>(this.getChild("nameLb"));
		this.n3 = <fairygui.GImage><any>(this.getChild("n3"));
		this.t0 = this.getTransition("t0");
		this.setArrow(false);
	}

	public role: SceneCharRole;
	public autoRemove = 1;

	public update() {
		let a = this;
		if (a.role.nameBarVild) a.updateShow();
	}

	public onAdd() {
		let a = this;
		a.role.headGroup.addChild(a.displayObject);
		a.role.nameBarVild = true;
	}

	private updateShow() {
		let a = this;
		a.role.nameBarVild = false;
		a.nameLb.text = a.role.name;
	}

	public setArrow(value) {
		let a = this;
		a.n3.visible = value;
	}

	//1 blue 2red
	public setCamp(val) {
		this.nameLb.color = ModelFengHuoLY.PLAYERNAMECOLOR[val];
	}

	private resetTitlePos() {
		let a = this;
		let xx = (172 - a.titleImg.width) >> 1
		if (a.role.guanzhi <= 0 && a.role.country <= 0) {
			a.titleImg.setXY(xx, 25 - a.titleImg.height);
		} else {
			a.titleImg.setXY(xx, 21 - a.titleImg.height);
		}
	}

	public onRemove() {
		let a = this;
		a.role.nameBarVild = true;
		a.setArrow(false);
		a.role.headGroup.removeChild(a.displayObject);
	}
}