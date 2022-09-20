/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class QMBossRnk extends fairygui.GComponent {

	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbLv: fairygui.GRichTextField;

	public static URL: string = "ui://47jfyc6egs0du";

	public static createInstance(): QMBossRnk {
		return <QMBossRnk><any>(fairygui.UIPackage.createObject("Boss", "QMBossRnk"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbRank = <fairygui.GRichTextField><any>(this.getChild("lbRank"));
		this.lbName = <fairygui.GRichTextField><any>(this.getChild("lbName"));
		this.lbLv = <fairygui.GRichTextField><any>(this.getChild("lbLv"));
	}

	public setdata(data:any[]){
		this.lbRank.text = "" + data[0];
		this.lbName.text = "" + data[1];
		this.lbLv.text = "" + ConfigHelp.getYiWanText(data[2]);
	}
}