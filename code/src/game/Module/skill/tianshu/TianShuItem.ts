/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class TianShuItem extends fairygui.GComponent {

	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public selectImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public wearImg: fairygui.GImage;
	public maskBg: fairygui.GImage;
	public starLb: fairygui.GRichTextField;
	public starGroup: fairygui.GGroup;
	public sourceGroup: fairygui.GGroup;
	public sourceLb: fairygui.GRichTextField;
	public nameLb: fairygui.GRichTextField;

	public static URL: string = "ui://3tzqotadn4tus";

	public static createInstance(): TianShuItem {
		return <TianShuItem><any>(fairygui.UIPackage.createObject("role", "ViewBWGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		var s = this;
		CommonManager.parseChildren(s, s);
	}

	setSel(val) {
		this.selectImg.visible = val;
	}

	_vo: VoTianShu;
	set vo(val) {
		var s = this;
		s._vo = val;
		var m = GGlobal.modeltianshu;
		s.starGroup.visible = val.star != 0;
		IconUtil.setImg(s.imgIcon, Enum_Path.ICON70_URL + s._vo.icon + ".png");
		IconUtil.setImg(s.bg, Enum_Path.ICON70_URL + "BmG_" + s._vo.pin + ".png");
		s.wearImg.visible = val.id == m.currentID;
		s.nameLb.text = HtmlUtil.fontNoSize(val.name, Color.getColorStr(s._vo.pin));
		s.sourceGroup.visible = false;
		s.maskBg.visible = val.star == 0;
		s.starLb.text = val.star + "";
		s.sourceLb.text = val.way;
		s.noticeImg.visible = Model_Bag.getItemCount(JSON.parse(val.item)[0][1]) > 0 && !val.isMaxStar();
	}

	public setSuitVo(v) {
		this.vo = v;
		this.noticeImg.visible = false;
		this.setSel(false)
	}

	get vo() {
		return this._vo;
	}
	public sindex: number = 0;

	public clean() {
		let s = this;
		IconUtil.setImg(s.imgIcon, null);
		IconUtil.setImg(s.bg, null);
		s.noticeImg.visible = false;
		s.setSel(false)
	}
}