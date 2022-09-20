class item_LeiChongFanLiBtn extends fairygui.GComponent {
	public bg:fairygui.GImage;
	public desc:fairygui.GTextField;
	public fg:fairygui.GImage;
	public noticeImg : fairygui.GImage;

	public static URL:string = "ui://kdt501v2mq0c1m";

	private voData : VO_LeiChongFanLi;

	public static createInstance():item_LeiChongFanLiBtn {
		return <item_LeiChongFanLiBtn><any>(fairygui.UIPackage.createObject("sanGuoQingDian","item_LeiChongFanLiBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml); 
 
		this.bg = <fairygui.GImage><any>(this.getChild("bg"));
		this.desc = <fairygui.GTextField><any>(this.getChild("desc"));
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
		this.fg = <fairygui.GImage><any>(this.getChild("fg"));
	}
	public setData(data){
		this.voData = data;
		this.fg.visible = false;
		this.desc.text = "累充" + this.voData.lj +"元\n" + this.voData.tips;
		this.noticeImg.visible = this.voData.state == 1;
	}
 
	public setSelectedState(isVisible : boolean){
		this.fg.visible = isVisible;
	}

	public getData(){
		return this.voData;
	}
}