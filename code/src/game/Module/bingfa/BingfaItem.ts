/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class BingfaItem extends fairygui.GComponent {

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
	public static createInstance(): BingfaItem {
		return <BingfaItem><any>(fairygui.UIPackage.createObject("role", "ViewBWGrid"));
	}
	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public setNotice(val) {
		this.noticeImg.visible = val;
	}

	public clean() {
		let self = this;
		self.selectImg.visible = false;
		IconUtil.setImg(self.bg, null);
		IconUtil.setImg(self.imgIcon, null);
	}

	setChoose(val) {
		this.selectImg.visible = val;
	}

	public vo: VoBingFa;
	setVo(val: VoBingFa, isCheck?: boolean, selId: number = -1) {
		var s = this;
		s.vo = val;
		s.setChoose(s.vo.id == selId);
		s.sourceLb.text = val.way;
		var b = val.star == 0;
		s.sourceGroup.visible = false;
		s.maskBg.visible = b;
		s.starGroup.visible = !b;
		s.starLb.text = val.star + "";
		s.nameLb.text = HtmlUtil.fontNoSize(val.name, Color.getColorStr(val.pin));
		IconUtil.setImg(s.bg, Enum_Path.ICON70_URL + "BmG_" + val.pin + ".png");
		IconUtil.setImg(s.imgIcon, Enum_Path.ICON70_URL + val.icon + ".png");
		if (isCheck && val.star < val.starMax) {
			var i = val.item[0][1];
			var count = Model_Bag.getItemCount(i);
			s.setNotice(count > 0);
		} else {
			s.setNotice(false);
		}
	}

	sindex: number;

	public setSuitVo(v: VoBingFa) {
		var s = this;
		s.setVo(v);
		s.setChoose(false);
		s.setNotice(false);
	}
}