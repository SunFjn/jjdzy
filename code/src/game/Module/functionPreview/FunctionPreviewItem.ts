class FunctionPreviewItem extends fairygui.GComponent {

	public selImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public promptImg: fairygui.GImage;
	public gqLb: fairygui.GRichTextField;
	public drawLb: fairygui.GRichTextField;
	private maskImg: fairygui.GImage;
	private iconImg: fairygui.GLoader;

	public static URL: string = "ui://j1v1kh34ejra4";

	public static createInstance(): FunctionPreviewItem {
		return <FunctionPreviewItem><any>(fairygui.UIPackage.createObject("functionPreview", "FunctionPreviewItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

	const sf = this;
		CommonManager.parseChildren(sf, sf);
		this.setChoose(false);
		this.checkNotice(false);
	}

	public vo;
	public show(vo) {
		this.vo = vo;
		this.gqLb.text = vo.tips;
		this.maskImg.visible = false;
		this.drawLb.visible = false;
		if (Model_FunctionPreview.drawArr.indexOf(vo.id) != -1) {
			this.promptImg.visible = true;
			this.checkNotice(false);
		} else {
			this.promptImg.visible = false;
			if (GGlobal.modelGuanQia.curGuanQiaLv >= vo.id) {
				this.drawLb.visible = true;
				this.checkNotice(true);
			} else {
				this.maskImg.visible = true;
				this.checkNotice(false);
			}
		}
		IconUtil.setImg1(Enum_Path.SYSSHOW_URL + vo.icon + ".png", this.iconImg);
		if (vo.choose) {
			this.setChoose(true);
		} else {
			this.setChoose(false);
		}
	}

	public choose = false;
	public setChoose(value) {
		this.choose = value;
		this.selImg.visible = value;
	}

	public check = false;
	public checkNotice(value) {
		this.noticeImg.visible = value;
		this.check = value;
	}
}