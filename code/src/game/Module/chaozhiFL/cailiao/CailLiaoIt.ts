/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class CailLiaoIt extends fairygui.GComponent {

	public lbPro: fairygui.GRichTextField;
	public btn: Button1;
	public btn1: Button0;
	public ylq: fairygui.GImage;

	public static URL: string = "ui://qzsojhcrlwai3";

	public static createInstance(): CailLiaoIt {
		return <CailLiaoIt><any>(fairygui.UIPackage.createObject("chaozhifanli", "CailLiaoIt"));
	}

	public constructor() {
		super();
	}

	private com: fairygui.GComponent;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbPro = <fairygui.GRichTextField><any>(this.getChild("lbPro"));
		this.btn = <Button1><any>(this.getChild("btn"));
		this.btn1 = <Button0><any>(this.getChild("btn1"));
		this.ylq = <fairygui.GImage><any>(this.getChild("ylq"));
		this.btn.addClickListener(this.onClickHD, this);
		this.btn1.addClickListener(this.openView, this);

		this.com = new fairygui.GComponent();
		this.addChild(this.com);
		this.com.setScale(0.8, 0.8);
	}

	private onClickHD() {
		if (this.type == 2) {
			GGlobal.modelCZFL.CG_LQ_4791(this.ids);
		} else if (this.type == 0) {
			GGlobal.modelCZFL.CG_LQ_2431(this.ids);
		} else {
			GGlobal.modelCZFL.CG_LQ_2451(this.ids);
		}
	}

	private openView() {
		GGlobal.layerMgr.open(this.viewID);
	}

	private grids = [];
	public clean() {
		ConfigHelp.cleanGridview(this.grids);
	}

	//0材料副本 1元宝返利 2 8-28元宝返利
	private ids;
	private type;
	private viewID;
	public setdata(dta, type) {
		let s = this;
		let award;
		s.type = type;
		let itname;
		let st = dta[1];
		let it;
		let count;
		let lib;
		s.ids = dta[0];
		if (type == 0) {
			let cfg = GGlobal.modelCZFL.getCailiaoCFG()
			let lib = cfg[s.ids];
			this.viewID = lib.systemid;
			award = JSON.parse(lib.reward);
			it = JSON.parse(lib.consume);
			count = it[0][2];
			if (it[0][0] < 3)
				itname = ConfigHelp.getItemColorName(it[0][1])
			else itname = ConfigHelp.AttrName(it[0][0]);
			if (GGlobal.modelCZFL.cl >= count) {
				s.lbPro.text = "消耗" + count + "个" + itname + "<font color='" + Color.GREENSTR + "'>(" + GGlobal.modelCZFL.cl + "/" + count + ")</font>";
			} else {
				s.lbPro.text = "消耗" + count + "个" + itname + "<font color='" + Color.REDSTR + "'>(" + GGlobal.modelCZFL.cl + "/" + count + ")</font>";
			}
		} else {
			let cfg = GGlobal.modelCZFL.getYuanBaoCFG()
			let lib = cfg[s.ids];
			this.viewID = lib.systemid;
			award = JSON.parse(lib.reward);
			it = JSON.parse(lib.consume);
			count = it[0][2];
			if (GGlobal.modelCZFL.yb >= count) {
				s.lbPro.text = "消耗" + count + "元宝" + "<font color='" + Color.GREENSTR + "'>(" + GGlobal.modelCZFL.yb + "/" + count + ")</font>";
			} else {
				s.lbPro.text = "消耗" + count + "元宝" + "<font color='" + Color.REDSTR + "'>(" + GGlobal.modelCZFL.yb + "/" + count + ")</font>";
			}
		}
		s.ylq.visible = st == 2;
		s.btn.visible = st == 1;
		s.btn1.visible = st == 0;
		s.btn.checkNotice = st == 1;
		ConfigHelp.cleanGridview(s.grids);

		s.grids = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(award), this.com, 36, 63, true, false, 4, 110);
	}
}