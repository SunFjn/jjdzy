/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class SanGuoItem extends fairygui.GComponent {

	public imgYaZhu: fairygui.GImage;
	public nameLb: fairygui.GRichTextField;

	public static URL: string = "ui://me1skowlk8h12g";

	public static createInstance(): SanGuoItem {
		return <SanGuoItem><any>(fairygui.UIPackage.createObject("Arena", "SanGuoItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.nameLb = <fairygui.GRichTextField><any>(this.getChild("nameLb"));
		this.imgYaZhu = <fairygui.GImage><any>(this.getChild("imgYaZhu"));
	}

	private vo: Node_SGWS;
	public setVo(v: Node_SGWS) {
		this.vo = v;
		this.nameLb.text = v.name;
		this.imgYaZhu.visible = v.lun== GGlobal.modelsgws.lun&& v.xiazhu == 1;
	}

	public resetView() {
		this.nameLb.text = "";
		this.imgYaZhu.visible = false;
	}
}