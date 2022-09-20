class TuJianListItem extends fairygui.GComponent {

	public item: TuJianItem;
	public wayLb: fairygui.GRichTextField;
	public chooseImg: fairygui.GImage;
	public wayGroup: fairygui.GGroup;

	public static URL: string = "ui://m0rbmsgsrcvu25";

	public static createInstance(): TuJianListItem {
		return <TuJianListItem><any>(fairygui.UIPackage.createObject("TuJian", "TuJianListItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this,this);

		this.chooseImg.visible = false;
	}

	public vo: Vo_TuJian;
	public setVo(vo: Vo_TuJian) {
		this.vo = vo;
		this.item.vo = vo;
		this.wayGroup.visible = true;
		if (vo.isJiHuo) {
			this.wayGroup.visible = false;
		} else {
			this.wayLb.text = "获取途径\n" + HtmlUtil.fontNoSize(vo.source, Color.getColorStr(1));
		}
	}

	public setChoose(value) {
		this.chooseImg.visible = value;
	}

	public clean(){
		this.item.clean();
	}
}