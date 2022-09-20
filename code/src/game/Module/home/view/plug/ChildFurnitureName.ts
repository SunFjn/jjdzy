/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildFurnitureName extends fairygui.GComponent {

	public image: fairygui.GLoader;

	public static URL: string = "ui://y0plc878tmlf1x";

	public static createInstance(): ChildFurnitureName {
		return <ChildFurnitureName><any>(fairygui.UIPackage.createObject("home", "ChildFurnitureName"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.image = <fairygui.GLoader><any>(this.getChild("image"));
	}

	update(opt) {

	}

	public setImage = (v) => {
		IconUtil.setImg(this.image, Enum_Path.IMAGE_URL + "fudi/" + v + "_name.png");
	}
	public setPos = (v) => {
		let pos = JSON.parse(v)[0];
		this.setXY(pos[0], pos[1]);
	}

	public role: ArpgRole;
	public onAdd() {
		this.role.headGroup.addChild(this.displayObject);
	}
	public onRemove() {
		let a = this;
		a.role.headGroup.removeChild(a.displayObject);
		IconUtil.setImg(this.image, null);
		Pool.recover("ChildFurnitureName", a);
	}

	public static create(role): ChildFurnitureName {
		let temp: ChildFurnitureName = Pool.getItemByCreateFun("ChildFurnitureName", ChildFurnitureName.createInstance) as ChildFurnitureName;
		temp.role = role;
		return temp;
	}
	public autoRemove = true;
}