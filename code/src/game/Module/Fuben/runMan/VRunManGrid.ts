class VRunManGrid extends fairygui.GComponent {

	public bg:fairygui.GLoader;
	public iconImg:fairygui.GLoader;
	public nameLv:fairygui.GRichTextField;
	public imgAct:fairygui.GImage;

	public static URL:string = "ui://pkuzcu87em4do";

	public static createInstance():VRunManGrid {
		return <VRunManGrid><any>(fairygui.UIPackage.createObject("FuBen","VRunManGrid"));
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
		this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}

	private _vo: Vo_JiangHun;
	public set vo(vo: Vo_JiangHun) {
		this._vo = vo;
		if (vo) {
			// ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", this.bg);
			// ImageLoader.instance.loader(Enum_Path.GENERAL_URL + vo.pic + ".jpg", this.iconImg);
			IconUtil.setImg(this.bg, Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png");
			IconUtil.setImg(this.iconImg, Enum_Path.GENERAL_URL + vo.pic + ".jpg");
			this.nameLv.text = vo.name;
			this.nameLv.color = Color.getColorInt(vo.quality);
		} else {
			this.iconImg.visible = false;
		}
	}

	public set actiVis(boo){
		this.imgAct.visible = boo;
	}
	public onRemove() {
		IconUtil.setImg(this.bg, null);
		IconUtil.setImg(this.iconImg, null);
	}
}