/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemLog extends fairygui.GComponent {

	public lbInfo: fairygui.GRichTextField;

	public static URL: string = "ui://y0plc878g2m4i";

	public static createInstance(): ItemLog {
		return <ItemLog><any>(fairygui.UIPackage.createObject("home", "ItemLog"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbInfo = <fairygui.GRichTextField><any>(this.getChild("lbInfo"));
	}

	setdata(idx) {
		let self = this;
		let str = '';
		let data = GGlobal.homemodel.logdata[idx];
		str = data[1];
		if (data[0] == 1) {
			str += "前来金库，";
			if (data[3] > 0) {
				str += BroadCastManager.reTxt("被家丁打跑，损失<font color='#FFC344'>{0}</font><font color='#15f234'>(-{1})</font><font color='#FFC344'>府邸币</font>", data[2], data[3])
			} else {
				str += BroadCastManager.reTxt("顺走了<font color='#FFC344'>{0}府邸币</font>", data[2])
			}
		} else {
			str += "借用了天工炉，";
			if (data[2] > 0) {
				str += "<font color='#15f234'>繁荣度+" + data[2] + "</font>";
			} else {
				str += "今日繁荣度加成已达上限";
			}
		}
		self.lbInfo.text = str;
	}
}