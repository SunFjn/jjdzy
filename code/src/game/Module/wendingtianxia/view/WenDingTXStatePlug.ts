/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class WenDingTXStatePlug extends fairygui.GComponent {

	public n2: fairygui.GLoader;

	public static URL: string = "ui://gxs8kn67fl2h2";
	public autoRemove = true;
	private static POOL = [];
	public static create(role): WenDingTXStatePlug {
		let ret = WenDingTXStatePlug.POOL.length ? WenDingTXStatePlug.POOL.pop() : WenDingTXStatePlug.createInstance();
		ret.role = role;
		return ret;
	}

	public static createInstance(): WenDingTXStatePlug {
		return <WenDingTXStatePlug><any>(fairygui.UIPackage.createObject("wendingTX", "WenDingTXStatePlug"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n2 = <fairygui.GLoader><any>(this.getChild("n2"));
	}

	public role;
	//B:玩家状态 0默认 1死亡 2战斗
	public setState(val) {
		if (val == 1)
			this.n2.url = "ui://gxs8kn67cg2ij";
		else if (val == 2)
			this.n2.url = "ui://gxs8kn67cg2ik";
	}

	public update() {
	}

	public onAdd() {
		this.setXY(-70, 40);
		this.role.headGroup.addChild(this.displayObject);
	}
	public onRemove() {
		let a = this;
		a.role.headGroup.removeChild(a.displayObject);
		WenDingTXStatePlug.POOL.push(this);
	}

}