class VSHHuanXing extends UIModalPanel {

	public c1: fairygui.Controller;
	public c2: fairygui.Controller;
	public lbName: fairygui.GLabel;
	public lbPower: fairygui.GLabel;
	public img: fairygui.GLabel;
	public imgHas: fairygui.GImage;
	public btnRight: Button2;
	public btnLeft: Button2;
	public btnHX: Button2;
	public btnJiH: Button2;
	public lbNo: fairygui.GRichTextField;
	public lbCost: fairygui.GRichTextField;
	public imgCost: fairygui.GImage;
	public lbAttr: fairygui.GRichTextField;
	public lbTip: fairygui.GRichTextField;

	public static URL: string = "ui://4aepcdbwbvfw5g";

	public container: EmptyComp;
	private _data: Ishjx_266;
	private _index: number = 0;
	private _hxArr: Ishhx_266[];

	public static createInstance(): VSHHuanXing {
		return <VSHHuanXing><any>(fairygui.UIPackage.createObject("shouhunJX", "VSHHuanXing"));
	}

	public constructor() {
		super();
		this.loadRes("shouhunJX", "shouhunJX_atlas0");
	}

	protected childrenCreated() {
		let s = this;
		let view = fairygui.UIPackage.createObject("shouhunJX", "VSHHuanXing").asCom;
		s.contentPane = view;
		CommonManager.parseChildren(view, s);
		super.childrenCreated();
	}

	public onShown() {
		let s = this;
		s._data = s._args;
		s._index = 0

		s.btnHX.addClickListener(s.onHandHX, s);
		s.btnJiH.addClickListener(s.onHandJiH, s);
		s.btnRight.addClickListener(s.onRight, s);
		s.btnLeft.addClickListener(s.onLeft, s);
		GGlobal.modelSHJX.listen(ModelSH.msg_huanx_ui, s.openUI, s);
		GGlobal.modelSHJX.listen(ModelSH.msg_huanx_buy, s.upBuy, s);

		s._hxArr = [];
		for (let k in Config.shhx_266) {
			let v = Config.shhx_266[k]
			if (v.type == s._data.yj) {
				s._hxArr.push(v);
			}
		}
		s.onUpdate();
		GGlobal.modelSHJX.CGHXUI_5695(s._data.yj)
	}
	public onHide() {
		let s = this;
		s.btnHX.removeClickListener(s.onHandHX, s);
		s.btnJiH.removeClickListener(s.onHandJiH, s);
		s.btnRight.removeClickListener(s.onRight, s);
		s.btnLeft.removeClickListener(s.onLeft, s);
		GGlobal.modelSHJX.remove(ModelSH.msg_huanx_ui, s.openUI, s);
		GGlobal.modelSHJX.remove(ModelSH.msg_huanx_buy, s.upBuy, s);
		GGlobal.layerMgr.close(s.panelId);
		s.container.setEff(null);
	}

	private onHandHX() {
		let s = this;
		let v = s._hxArr[s._index]
		GGlobal.modelSHJX.CGWEAR_5699(v.type, v.id);
	}

	private onHandJiH() {
		let s = this;
		let v = s._hxArr[s._index]
		GGlobal.modelSHJX.CGBUY_5697(v.type, v.id);
	}

	private onRight() {
		let s = this;
		s._index++;
		if (s._index > s._hxArr.length - 1) {
			s._index = s._hxArr.length - 1
		}
		s.onSel(s._hxArr[s._index])
	}

	private onLeft() {
		let s = this;
		s._index--;
		if (s._index < 0) {
			s._index = 0
		}
		s.onSel(s._hxArr[s._index])
	}
	//定位已经幻化的
	private openUI() {
		let s = this;
		s._index = 0

		let m = GGlobal.modelSHJX
		let arr = m.huanXObj[s._data.yj]
		arr.sort(function (a, b) { return a.id - b.id })
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].st == 1) {
				s._index = i;
				break;
			}
		}
		s.onUpdate();
	}

	private upBuy() {
		let s = this;
		s.onUpdate();
	}

	private onUpdate() {
		let s = this;
		s.onSel(s._hxArr[s._index])
	}
	private _st;
	private onSel(val: Ishhx_266) {
		let s = this;
		s.container.setEff(`uieff/${val.mod2}`);
		s.lbName.text = val.name
		s.lbName.color = Color.getColorInt(val.pz);
		s.lbPower.text = val.power + ""
		s.lbAttr.text = ConfigHelp.attrString(JSON.parse(val.attr));

		if (s._index <= 0) {
			s.btnLeft.visible = false;
			s.btnRight.visible = true;
		} else if (s._index >= s._hxArr.length - 1) {
			s.btnLeft.visible = true;
			s.btnRight.visible = false;
		} else {
			s.btnLeft.visible = true;
			s.btnRight.visible = true;
		}

		let m = GGlobal.modelSHJX
		let arr = m.huanXObj[s._data.yj]
		let len = arr ? arr.length : 0;
		let st = 0;
		for (let i = 0; i < len; i++) {
			if (arr[i].id == val.id) {
				st = arr[i].st;
				break;
			}
		}
		s._st = st
		if (val.conmuse == "0") {
			s.c2.selectedIndex = 0;
		} else {
			s.c2.selectedIndex = 1;
			let conmuse = JSON.parse(val.conmuse)
			this.lbCost.text = conmuse[0][2] + ""
			if (Model_player.voMine.yuanbao < Number(conmuse[0][2])) {
				this.lbCost.color = Color.REDINT;
			} else {
				this.lbCost.color = Color.GREENINT;
			}
			let red = (Model_player.voMine.yuanbao >= Number(conmuse[0][2]))
			this.btnHX.checkNotice = red
		}
		if (st == 0) {//I:兽魂模型idI:0未化形未购买  1已化形-已购买 2激活-未化形已购买
			s.c1.selectedIndex = 0;
			this.btnHX.text = "激活"
		} else if (st == 1) {
			s.c1.selectedIndex = 2;//已幻形
		} else if (st == 2) {
			s.c1.selectedIndex = 1;
			this.btnHX.text = "幻形"
			this.btnHX.checkNotice = false;
		}
		this.btnRight.checkNotice = GGlobal.reddot.checkCondition(UIConst.SH_HUANX, val.type - 1);
	}
}
