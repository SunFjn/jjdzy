/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class RoleStatePlug extends fairygui.GComponent {

	public n0: fairygui.GLoader;

	public static URL: string = "ui://jvxpx9emsjy23fj";

	public autoRemove = true;
	private static POOL = [];
	public static create(role): RoleStatePlug {
		let ret = RoleStatePlug.POOL.length ? RoleStatePlug.POOL.pop() : RoleStatePlug.createInstance();
		ret.role = role;
		return ret;
	}


	public static createInstance(): RoleStatePlug {
		return <RoleStatePlug><any>(fairygui.UIPackage.createObject("common", "RoleStatePlug"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GLoader><any>(this.getChild("n0"));
	}

	public role;
	//B:玩家状态 0默认 1死亡 2战斗
	public setState(val) {
		if (val == 1) {
			IconUtil.setImg(this.n0, Enum_Path.PIC_URL + "rolefight.png");
		} else {
			IconUtil.setImg(this.n0, null);
		}
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
		RoleStatePlug.POOL.push(this);
	}

}