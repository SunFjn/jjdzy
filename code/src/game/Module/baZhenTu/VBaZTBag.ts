class VBaZTBag extends fairygui.GLabel {

	public lbName: fairygui.GTextField;
	public lbPower: fairygui.GTextField;
	public lbLevel: fairygui.GTextField;
	public lbAttr: fairygui.GTextField;
	public grid: VBaZTGrid;
	public btnDown: fairygui.GButton;
	public btnWear: Button1;
	public imgEquip: fairygui.GImage;
	public lbTips: fairygui.GTextField;
	public tipBg: fairygui.GImage;

	public static URL: string = "ui://xrzn9ppaj1af17";

	public static createInstance(): VBaZTBag {
		return <VBaZTBag><any>(fairygui.UIPackage.createObject("baZhenTu", "VBaZTBag"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s)

		this.btnWear.addClickListener(this.onWear, this);
		this.btnDown.addClickListener(this.onDown, this);
		this.tipBg.visible = false
	}
	//默认1星0级
	public setTemp(v: Ibztzf_261) {
		// this.lbName.text = HtmlUtil.fontNoSize(v.name, Color.QUALITYCOLORH[v.pz]) + "Lv." + 0 + "/" + v.lv1;
		this.lbName.text = ConfigHelp.createColorName(v.name, v.pz) + "Lv." + 0 + "/" + v.lv1;
		this.lbPower.text = "战力：" + v.power;
		this.lbAttr.text = ConfigHelp.attrStringQian(ConfigHelp.SplitStr(v.arrt), "+", null, "#15f234");
		this.grid.setTemp(v);

		this.btnDown.visible = this.btnDown.touchable = false
		this.btnWear.visible = this.btnWear.touchable = false
		this.imgEquip.visible = false
	}
	private _index: number;
	private _vo: VoBaZhenTu
	public set vo(v: VoBaZhenTu) {
		this._vo = v;
		this.grid.vo = v;
		if (v && v.id > 0) {
			this.lbName.text = v ? ConfigHelp.createColorName(v.name, v.pz) : "";
			// this.lbName.text = HtmlUtil.fontNoSize(v.name, Color.QUALITYCOLORH[v.pz]);
			if (v.type == 0) {
				this.lbLevel.text = "";
				this.lbPower.text = ""
				this.lbAttr.text = v.tipDes;
			} else {
				this.lbLevel.text = "Lv." + v.level + "/" + v.maxLv;
				this.lbPower.text = "战力：" + v.power;
				this.lbAttr.text = ConfigHelp.attrStringQian(v.attr, "+", null, "#15f234");
			}
		} else {
			this.lbName.text = "";
			this.lbPower.text = "";
			this.lbAttr.text = "";
			this.lbLevel.text = "";

		}
	}

	public setBag(v: VoBaZhenTu, index) {
		this.vo = v;
		this._index = index;
		if (v && v.type == 0) {//经验符文
			this.btnWear.visible = this.btnWear.touchable = false;
			this.lbTips.visible = false;
			this.tipBg.visible = false
		} else {
			this.btnWear.visible = this.btnWear.touchable = true;
			let same = Model_BaZhenTu.checkTypeSame(v.type);
			let eq = Model_BaZhenTu.equipArr[index - 1]
			if (eq && eq.id > 0 && eq.type == v.type) {
				this.btnWear.text = "替换";
				same = false;
			} else {
				this.btnWear.text = "镶嵌"

			}
			this.lbTips.visible = same;
			this.tipBg.visible = same;
			if (eq && eq.id > 0 && v.pz > eq.pz) {
				this.btnWear.checkNotice = true
			}
			else if (!eq || eq.id == 0) {
				this.btnWear.checkNotice = true
			}
			else {
				this.btnWear.checkNotice = false
			}
			if (same) {
				this.btnWear.checkNotice = false
			}
		}
		this.btnDown.visible = this.btnDown.touchable = false;
		this.imgEquip.visible = false
	}

	public setEqu(v: VoBaZhenTu, index) {
		this.vo = v;
		this._index = index;
		if (v && v.id > 0) {
			this.imgEquip.visible = true
			this.btnDown.visible = this.btnDown.touchable = true;
		} else {
			this.imgEquip.visible = false
			this.btnDown.visible = this.btnDown.touchable = false;
		}
		this.btnWear.visible = this.btnWear.touchable = false;
		this.lbTips.visible = false;
		this.tipBg.visible = false
	}

	private onWear() {
		let eq = Model_BaZhenTu.equipArr[this._index - 1]
		if (eq && eq.id > 0 && eq.type == this._vo.type) {

		} else {
			//相同的类型不穿
			for (let i = 0; i < Model_BaZhenTu.equipArr.length; i++) {
				let v = Model_BaZhenTu.equipArr[i];
				if (v && v.type == this._vo.type) {
					ViewCommonWarn.text("同类型符文只可镶嵌1个")
					return;
				}
			}
		}
		GGlobal.modelBaZhenTu.CGUseDestiny4403(1, this._vo.id, this._vo.pos, this._index)
	}
	private onDown() {
		let posB = -1;
		for (let i = 0; i < 200; i++) {
			if (Model_BaZhenTu.bagMap[i] == null) {
				posB = i;
				break;
			}
		}
		if (posB == -1) {
			ViewCommonWarn.text("符文背包已满")
			return;
		}
		GGlobal.modelBaZhenTu.CGUseDestiny4403(2, this._vo.id, posB, this._index)
	}
}