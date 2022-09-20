/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

class JXGrid extends fairygui.GComponent {

	public bg: fairygui.GLoader;
	public iconImg: fairygui.GLoader;
	public nameLv: fairygui.GRichTextField;
	public imgAct: fairygui.GImage;

	public static URL: string = "ui://dllc71i9g7t31n";

	public static createInstance(): JXGrid {
		return <JXGrid><any>(fairygui.UIPackage.createObject("rebirth", "JXGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.bg = <fairygui.GLoader><any>(this.getChild("bg"));
		this.iconImg = <fairygui.GLoader><any>(this.getChild("iconImg"));
		this.nameLv = <fairygui.GRichTextField><any>(this.getChild("nameLv"));
		this.imgAct = <fairygui.GImage><any>(this.getChild("imgAct"));
	}

	public setCFG(item: Ijyjh_701) {
		if (item) {
			this.nameLv.text = item.name;
			IconUtil.setImg(this.iconImg, Enum_Path.ICON70_URL + item.tupian + ".png");
			IconUtil.setImg(this.bg, Enum_Path.ICON70_URL + "BmG_" + item.pinzhi + ".png");
		}else{
			this.nameLv.text = '';
		}
	}
}