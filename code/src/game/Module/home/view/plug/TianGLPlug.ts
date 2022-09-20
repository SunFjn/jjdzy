/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class TianGLPlug extends fairygui.GComponent {

	public n0: fairygui.GRichTextField;

	public static URL: string = "ui://y0plc878c60e25";

	public static createInstance(): TianGLPlug {
		return <TianGLPlug><any>(fairygui.UIPackage.createObject("home", "TianGLPlug"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.n0 = <fairygui.GRichTextField><any>(this.getChild("n0"));
	}

	update(opt) {

	}

	public role: ArpgRole;
	public onAdd() {
		this.role.headGroup.addChild(this.displayObject);
	}
	public onRemove() {
		let a = this;
		this.setXY(-50,1);
		a.role.headGroup.removeChild(a.displayObject);
		Pool.recover("TianGLPlug", a);
	}

	public static create(role): TianGLPlug {
		let temp: TianGLPlug = Pool.getItemByCreateFun("TianGLPlug", TianGLPlug.createInstance) as TianGLPlug;
		temp.role = role;
		return temp;
	}
	public autoRemove = true;
}