class ChildHomeEventTip extends fairygui.GComponent {
	public n0: fairygui.GImage;
	public t0: fairygui.Transition;

	public static URL: string = "ui://y0plc878wy1s1v";

	public static createInstance(): ChildHomeEventTip {
		return <ChildHomeEventTip><any>(fairygui.UIPackage.createObject("home", "ChildHomeEventTip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChild("n0"));
		this.t0 = this.getTransition("t0");
	}

	update(opt) {

	}

	public setPos = (v) => {
		let pos = JSON.parse(v)[0];
		this.setXY(pos[0], pos[1]);
	}

	public setJiaDingState(){
		this.setXY(-30, -60);
		this.setScale(0.5,0.5);
	}

	public role: ArpgRole;
	public onAdd() {
		this.role.headGroup.addChild(this.displayObject);
	}
	public onRemove() {
		let a = this;
		this.setScale(1,1);
		a.role.headGroup.removeChild(a.displayObject);
		Pool.recover("ChildHomeEventTip", a);
	}

	public static create(role): ChildHomeEventTip {
		let temp: ChildHomeEventTip = Pool.getItemByCreateFun("ChildHomeEventTip", ChildHomeEventTip.createInstance) as ChildHomeEventTip;
		temp.role = role;
		return temp;
	}
	public autoRemove = true;
}