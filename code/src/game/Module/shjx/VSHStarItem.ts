class VSHStarItem extends fairygui.GComponent {

	public imgBg: fairygui.GLoader;
	public imgStar: fairygui.GLoader;
	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://4aepcdbwl5k54d";

	public static createInstance(): VSHStarItem {
		return <VSHStarItem><any>(fairygui.UIPackage.createObject("shouhunJX", "VSHStarItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgBg = <fairygui.GLoader><any>(this.getChild("imgBg"));
		this.imgStar = <fairygui.GLoader><any>(this.getChild("imgStar"));
		this.lb = <fairygui.GRichTextField><any>(this.getChild("lb"));
	}

	public setVo(id:number, time:number, cur:number) {
		this.lb.text = time + "次"
		if (cur >= time) {
			this.imgBg.url = "ui://4aepcdbwl5k54l"//亮
		} else {
			this.imgBg.url = "ui://4aepcdbwl5k54m"//暗
		}
		// 
		this.imgStar.url = CommonManager.getUrl("shouhunJX", id + "star");


	}
}
