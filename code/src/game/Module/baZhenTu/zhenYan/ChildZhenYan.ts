class ChildZhenYan extends fairygui.GComponent {

	public c1: fairygui.Controller;
	public c2: fairygui.Controller;
	public lbPower: fairygui.GLabel;
	public btnAct: Button2;
	public lbNeed: fairygui.GTextField;
	public boxNeed: ViewResource;
	public boxMax: fairygui.GGroup;
	public lbName: fairygui.GRichTextField;
	public btn4: VZhenYanBtn;
	public btn5: VZhenYanBtnBig;
	public btn3: VZhenYanBtn;
	public btn1: VZhenYanBtn;
	public btn2: VZhenYanBtn;
	public labAttrCur: fairygui.GRichTextField;
	public labAttrNext: fairygui.GRichTextField;
	public labAttrMax: fairygui.GRichTextField;
	public imgArrow: fairygui.GImage;
	public lbAttr: fairygui.GRichTextField;
	public expBar: fairygui.GProgressBar;
	public imgBg: fairygui.GLoader;
	public lbNo: fairygui.GRichTextField;
	public vLv: VZhenYanLv;

	public static URL: string = "ui://xrzn9ppacaql1h";

	private _btnArr: fairygui.GButton[];

	public static createInstance(): ChildZhenYan {
		return <ChildZhenYan><any>(fairygui.UIPackage.createObject("baZhenTu", "ChildZhenYan"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s._btnArr = [s.btn1, s.btn2, s.btn3, s.btn4, s.btn5];
		// s._ligreyArr = [s.line1, s.line2, s.line3, s.line4];
		// s._lightArr = [s.line11, s.line22, s.line33, s.line44];
	}



	public open() {
		let s = this;
		let m = GGlobal.modelZhenYan
		// m.listen(Model_ZhenYan.OPENUI, s.update, s);
		GGlobal.control.listen(Model_ZhenYan.OPENUI, s.update, s);
		s.btnAct.addClickListener(s.onAct, s);
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectIndex, this);

		s.c1.selectedIndex = 0;
		s.c2.selectedIndex = 0;
		m.CGOPENUI10251();

		// IconUtil.setImg(s.imgBg, Enum_Path.ZHENYAN_URL + "zhyBg.jpg");
		 IconUtil.setImg1(Enum_Path.ZHENYAN_URL + "zhyBg.jpg", s.imgBg);
	}

	public close() {
		let s = this;
		let m = GGlobal.modelZhenYan
		s.btnAct.removeClickListener(s.onAct, s);
		this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectIndex, this);
		// m.remove(Model_ZhenYan.OPENUI, s.update, s);
		GGlobal.control.remove(Model_ZhenYan.OPENUI, s.update, s);

		// IconUtil.setImg(s.imgBg, null);
		for (let i = 0; i < s._btnArr.length; i++) {
			s._btnArr[i].clean();
		}
		 IconUtil.setImg1(null, s.imgBg);
	}

	private update() {
		console.log("================================= update");
		let s = this;
		let m = GGlobal.modelZhenYan
		for (let i = 0; i < m.zYanArr.length; i++) {
			let v = m.zYanArr[i]
			s._btnArr[i].data = v
			// s._lightArr[i].visible = v.lv > 0
			// s._ligreyArr[i].visible = v.lv == 0
		}
		s._btnArr[4].data = m.lvId

		this.selectIndex()

		this.lbPower.text = "" + s.getPower();
	}

	private getPower() {
		let s = this;
		let m = GGlobal.modelZhenYan
		let power = 0;
		//阵眼
		for (let i = 0; i < m.zYanArr.length; i++) {
			let v = m.zYanArr[i]
			let cfgLv = Config.zysj_766[v.lvId];
			power += cfgLv.power
		}
		//阵心
		let cfgLv = Config.zx_766[m.lvId];
		power += cfgLv.zl
		return power
	}

	private _costItem: IGridImpl
	private onAct() {
		let m = GGlobal.modelZhenYan
		let s = this;
		let idx = s.c1.selectedIndex
		if (!s.btnAct.checkNotice) {
			if (!s._costItem) {
				return;
			}
			View_CaiLiao_GetPanel.show(s._costItem as VoItem);
			return;
		}
		if (idx == 4) {
			m.CGUpXin10255();
		} else {
			let v: VoZhenYan = s._btnArr[idx].data
			m.CGUpYan10253(v.id);
		}
	}

	private selectIndex() {
		let s = this;
		let m = GGlobal.modelZhenYan
		let idx = s.c1.selectedIndex

		if (idx == 4) {
			s.c2.selectedIndex = 1

			s.lbName.text = "太极阵心(" + m.star + "星)"
			let curXin = Config.zx_766[m.lvId];
			let nextXin = Config.zx_766[curXin.xj];

			let fh = JSON.parse(curXin.fh)
			let nextfh
			let str = "战斗中" + Math.floor(fh[0][0] / 1000) + "%"
			if (nextXin) {
				nextfh = JSON.parse(nextXin.fh)
				str += HtmlUtil.fontNoSize("(+" + Math.floor((nextfh[0][0] - fh[0][0]) / 1000) + "%)", "#1CE1EE")
			}
			str += "几率复活并回复" + Math.floor(fh[0][1] / 1000) + "%"
			if (nextXin) {
				str += HtmlUtil.fontNoSize("(+" + Math.floor((nextfh[0][1] - fh[0][1]) / 1000) + "%)", "#1CE1EE")
			}
			str += "血量";
			str += "\n符文升星属性+" + Math.floor(curXin.fwsx / 1000) + "%"
			if (nextXin) {
				str += HtmlUtil.fontNoSize("(+" + Math.floor((nextXin.fwsx - curXin.fwsx) / 1000) + "%)", "#1CE1EE")
			}
			str += "\n符文升级属性+" + Math.floor(curXin.fwsj / 1000) + "%";
			if (nextXin) {
				str += HtmlUtil.fontNoSize("(+" + Math.floor((nextXin.fwsj - curXin.fwsj) / 1000) + "%)", "#1CE1EE")
			}
			s.lbAttr.text = str;

			if (curXin.xj == 0) {//满级
				s.labAttrMax.text = ConfigHelp.attrString(JSON.parse(curXin.sx), "+", null, "#15f234");
				s.labAttrCur.text = "";
				s.labAttrNext.text = "";

				s.btnAct.visible = false;
				s.boxMax.visible = true;
				s.imgArrow.visible = false;
				s.lbNeed.visible = false;
				s.boxNeed.visible = false;
				s.lbNo.text = ""
			} else {
				s.boxMax.visible = false;
				s.imgArrow.visible = true;
				s.lbNeed.visible = true;
				s.boxNeed.visible = true;

				let xhItem = ConfigHelp.makeItem(JSON.parse(curXin.sxxh)[0])
				let ct = Model_Bag.getItemCount(xhItem.id);
				s.boxNeed.setLb(ct, xhItem.count);
				s.boxNeed.setImgUrl(xhItem.icon);
				s.lbNeed.text = xhItem.name
				s._costItem = xhItem
				if (m.lvId % 1000 == 0) {
					s.imgArrow.visible = false;
					s.btnAct.text = "激活"
					s.labAttrMax.text = ConfigHelp.attrString(JSON.parse(nextXin.sx), "+", null, "#15f234");
					s.labAttrCur.text = "";
					s.labAttrNext.text = "";
				}
				else {
					s.imgArrow.visible = true;
					s.btnAct.text = "升星"

					s.labAttrMax.text = "";
					s.labAttrCur.text = ConfigHelp.attrString(JSON.parse(curXin.sx), "+");
					s.labAttrNext.text = ConfigHelp.attrString(JSON.parse(nextXin.sx), "+", null, "#15f234");
				}
				let minLv = -1;//最小等级
				for (let i = 0; i < m.zYanArr.length; i++) {
					let v = m.zYanArr[i]
					if (v.lvId < minLv || minLv == -1) {
						minLv = v.lvId;
					}
				}
				if (minLv < curXin.tj) {
					let needstar = Math.floor(curXin.tj % 10000 / 10)
					s.lbNo.text = "需要4个阵眼都" + (needstar == 0 ? "激活" : "达到" + needstar + "星");
					s.btnAct.visible = false
				} else {
					s.lbNo.text = ""
					s.btnAct.visible = true
				}
				s.btnAct.checkNotice = ct >= xhItem.count;
			}
		} else {//阵眼
			s.c2.selectedIndex = 0
			let v: VoZhenYan = s._btnArr[idx].data
			s.c2.selectedIndex = 0
			s.lbName.text = v.cfg.mz + "(" + v.star + "星)"

			let curLv = Config.zysj_766[v.lvId];

			if (curLv.xj == 0) {//满级
				s.labAttrMax.text = ConfigHelp.attrString(JSON.parse(curLv.attr), "+", null, "#15f234");

				s.labAttrCur.text = "";
				s.labAttrNext.text = "";
				s.boxMax.visible = true;
				s.btnAct.visible = false;
				s.expBar.visible = false;
				s.vLv.visible = false;
				s.lbNeed.visible = false;
				s.boxNeed.visible = false;
				s.imgArrow.visible = false;
			} else {

				let nextLv = Config.zysj_766[curLv.xj];
				s.boxMax.visible = false;
				s.btnAct.visible = true;
				s.expBar.visible = true;
				s.vLv.visible = true;
				s.lbNeed.visible = true;
				s.boxNeed.visible = true;



				//升级进度
				s.expBar.max = 9;
				s.expBar.value = v.lvId % 10;
				s.vLv.vo = v.lvId % 10;
				s.vLv.x = s.expBar.x + 3 + (s.expBar.width - 6) / 9 * s.expBar.value

				let costItem: IGridImpl
				let xhItem = ConfigHelp.makeItem(JSON.parse(curLv.xiaohao)[0])
				if (curLv.shengxing > 0) {//升星 改变下道具
					costItem = VoItem.create(v.cfg.djid);
				} else {//升级消耗
					costItem = xhItem
				}
				s._costItem = costItem
				let ct = Model_Bag.getItemCount(costItem.id);
				s.boxNeed.setLb(ct, xhItem.count);
				s.boxNeed.setImgUrl(costItem.icon);
				s.lbNeed.text = costItem.name

				if (v.lvId % 10000 == 0) {
					s.btnAct.text = "激活"
				}
				else if (curLv.shengxing > 0) {
					s.btnAct.text = "升星"
				}
				else {
					s.btnAct.text = "升级"
				}
				if (v.lvId % 10000 == 0) {
					s.imgArrow.visible = false;
					s.labAttrMax.text = ConfigHelp.attrString(JSON.parse(nextLv.attr), "+", null, "#15f234");
					s.labAttrCur.text = "";
					s.labAttrNext.text = "";
				} else {
					s.imgArrow.visible = true;
					s.labAttrMax.text = "";
					s.labAttrCur.text = ConfigHelp.attrString(JSON.parse(curLv.attr), "+");
					s.labAttrNext.text = ConfigHelp.attrString(JSON.parse(nextLv.attr), "+", null, "#15f234");
				}

				s.btnAct.checkNotice = ct >= xhItem.count;
			}
		}
	}
}