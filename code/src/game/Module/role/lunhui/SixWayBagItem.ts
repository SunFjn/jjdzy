/**
 * 背包印记item
 */
class SixWayBagItem extends fairygui.GLabel{
	public lbName: fairygui.GTextField;
	public lbPower: fairygui.GTextField;
	public lbLevel: fairygui.GTextField;
	public lbAttr: fairygui.GTextField;
	public grid: VSixWayGrid;
	public btnWear: Button1;
	public btnDown: Button0;

	private _vo:VoSixWay;
	private _equipPos: number;

	public static URL: string = "ui://ehelf5bh11m1wy";

	public static createInstance(): SixWayBagItem {
		return <SixWayBagItem><any>(fairygui.UIPackage.createObject("lunhui", "SixWayBagItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s)

		s.btnWear.addClickListener(s.onWear, s);
		s.btnDown.addClickListener(s.onDown, s);
	}

	public set vo(v: VoSixWay) {
		let s = this;
		s._vo = v;
		s.grid.vo = v;
		if (v && v.id > 0) {
			s.lbName.text = v ? ConfigHelp.createColorName(v.name, v.pz) : "";
			if (v.type == 0) {
				s.lbLevel.text = "";
				s.lbPower.text = "";
			} else {
				s.lbLevel.text = "Lv." + v.lv + "/" + v.maxLv;
				s.lbPower.text = "战力：" + v.power;
				s.lbAttr.text = ConfigHelp.attrStringQian(v.attr, "+", null, "#15f234");
			}
		} else {
			s.lbName.text = "";
			s.lbPower.text = "";
			s.lbAttr.text = "";
			s.lbLevel.text = "";
		}
	}

	public setBag(v: VoSixWay, pos) {
		let s = this;
		let modellh = GGlobal.modellh;
		s._equipPos = pos;
		s.vo = v;
		s.btnWear.visible = s.btnWear.touchable = true;
		let same = Model_LunHui.checkTypeSame(v.type);
		let eq = modellh.equipArr[pos];
		if (eq && eq.id > 0 && eq.type == v.type) {
			s.btnWear.text = "替换";
			same = false;
		} else {
			s.btnWear.text = "镶嵌";

		}
		if (eq && eq.id > 0 && v.pz > eq.pz) {
			s.btnWear.checkNotice = true
		}
		else if (!eq || eq.id == 0) {
			s.btnWear.checkNotice = true
		}
		else {
			s.btnWear.checkNotice = false
		}
		if (same) {
			s.btnWear.checkNotice = false
		}
		s.btnDown.visible = s.btnDown.touchable = false;
	}

	public setEqu(v: VoSixWay, pos) {
		let s = this;
		s.vo = v;
		s._equipPos = pos;
		if (v && v.id > 0) {
			s.btnDown.visible = s.btnDown.touchable = true;
		}else{
			s.btnDown.visible = s.btnDown.touchable = false;
		}
		s.btnWear.visible = s.btnWear.touchable = false;
	}

	/**
	 * 镶嵌
	 */
	private onWear() {
		let modellh = GGlobal.modellh;
		let s = this;
		let eq = modellh.equipArr[s._equipPos];
		if (eq && eq.id > 0 && eq.type == s._vo.type) {

		} else {
			//相同的类型不穿
			for (let key in modellh.equipArr) {
				let v = modellh.equipArr[key];
				if (v && v.type == s._vo.type) {
					ViewCommonWarn.text("同类型印记只可镶嵌1个");
					return;
				}
			}
		}
		modellh.CG_USE_YINGJI(1, s._vo.id, s._vo.pos, s._equipPos);
	}

	/**
	 * 卸下
	 */
	private onDown() {
		let s = this;
		let posB = -1;
		for (let i = 1; i < 301; i++) {
			if (Model_LunHui.bagMap[i] == null) {
				posB = i;
				break;
			}
		}
		if (posB == -1) {
			ViewCommonWarn.text("符文背包已满");
			return;
		}
		GGlobal.modellh.CG_USE_YINGJI(2, s._vo.id, posB, s._equipPos);
	}
}