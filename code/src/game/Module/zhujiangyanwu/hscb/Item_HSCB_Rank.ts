class Item_HSCB_Rank extends fairygui.GComponent {

	public labName: fairygui.GRichTextField;
	public labPower: fairygui.GRichTextField;
	public labRank: fairygui.GRichTextField;
	public labLayer: fairygui.GRichTextField;
	public img: fairygui.GLoader;
	public imgNo:fairygui.GImage;

	public static URL: string = "ui://7a366usaql4nu";

	public static createInstance(): Item_HSCB_Rank {
		return <Item_HSCB_Rank><any>(fairygui.UIPackage.createObject("zjyw", "Item_HSCB_Rank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.labName = <fairygui.GRichTextField><any>(this.getChild("labName"));
		this.labPower = <fairygui.GRichTextField><any>(this.getChild("labPower"));
		this.labRank = <fairygui.GRichTextField><any>(this.getChild("labRank"));
		this.labLayer = <fairygui.GRichTextField><any>(this.getChild("labLayer"));
		this.imgNo = <fairygui.GImage><any>(this.getChild("imgNo"));
		this.img = <fairygui.GLoader><any>(this.getChild("img"));
	}

	public setVo(v: VoRank, index) {
		this.imgNo.visible = v ? false : true;
		this.labName.text = v ? v.name + "" : ""
		this.labLayer.text = v ? v.params + "" : ""
		this.labPower.text = v ? v.power + "" : ""
		
		if (index <= 3) {
			this.img.visible = true;
			this.img.url = CommonManager.getUrl("zjyw", "" + index);
			this.labRank.text = ""
		} else {
			this.img.visible = false;
			this.labRank.text = index + ""
		}
	}
}