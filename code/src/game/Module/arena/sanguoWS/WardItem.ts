/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class WardItem extends fairygui.GComponent {

	public lbTitle: fairygui.GRichTextField;
	public box: fairygui.GLoader;
	public lbRemain: fairygui.GRichTextField;
	public lbMyYuanBao: fairygui.GRichTextField;
	public g0: fairygui.GGroup;
	public yqw: fairygui.GImage;
	public btn: fairygui.GButton;
	public g1: fairygui.GGroup;
	public lbLuckMoney: fairygui.GRichTextField;
	public lbLucker: fairygui.GRichTextField;
	public g2: fairygui.GGroup;
	public lbTip: fairygui.GRichTextField;

	public static URL: string = "ui://me1skowl608ax";

	public static createInstance(): WardItem {
		return <WardItem><any>(fairygui.UIPackage.createObject("Arena", "WardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.lbTitle = <fairygui.GRichTextField><any>(s.getChild("lbTitle"));
		s.box = <fairygui.GLoader><any>(s.getChild("box"));
		s.lbRemain = <fairygui.GRichTextField><any>(s.getChild("lbRemain"));
		s.lbMyYuanBao = <fairygui.GRichTextField><any>(s.getChild("lbMyYuanBao"));
		s.g0 = <fairygui.GGroup><any>(s.getChild("g0"));
		s.yqw = <fairygui.GImage><any>(s.getChild("yqw"));
		s.btn = <fairygui.GButton><any>(s.getChild("btn"));
		s.g1 = <fairygui.GGroup><any>(s.getChild("g1"));
		s.lbLuckMoney = <fairygui.GRichTextField><any>(s.getChild("lbLuckMoney"));
		s.lbLucker = <fairygui.GRichTextField><any>(s.getChild("lbLucker"));
		s.g2 = <fairygui.GGroup><any>(s.getChild("g2"));
		s.lbTip = <fairygui.GRichTextField><any>(s.getChild("lbTip"));
		s.btn.addClickListener(s.onClick, s);

		s.g2.visible = s.g0.visible = s.g1.visible = false;
		s.lbTip.visible = true;
	}
	private arr = ["", "16强", "8强", "4强", "决赛"];
	public setIndex(v) {
		let s = this;
		s.libIndex = v;
		s.box.url = fairygui.UIPackage.getItemURL("Arena", "bx" + v);
		s.lbTitle.text = s.arr[s.libIndex] + "奖池";
		s.lbTip.text = s.arr[v] + "结束后可抢<font color='#ffc334'>元宝</font>大奖\n<font color='#fe0000'>数量有限，先到先得</font>";
		}

	private onClick() {
		GGlobal.modelsgws.CG_TAKE_1837(this.libIndex);
	}

	libIndex: number = 0;
	public update() {
		let s = this;
		let m = GGlobal.modelsgws;
		let st = m.state;
		let lun = m.lun;
		if (m.wardPool[s.libIndex]) {
			let dta: Vo_SGPool = m.wardPool[s.libIndex];
			let lib = Config.doublereward_230[s.libIndex]
			let remain = lib.num - dta.count;
			if (remain > 0) {
				s.lbRemain.text = "剩余次数：<font color='#15f234'>" + remain + "/" + lib.num + "</font>";
			} else {
				s.lbRemain.text = "剩余次数：<font color='#fe0000'>" + remain + "/" + lib.num + "</font>";
			}

			let isOpen = s.libIndex < lun;
			if (isOpen) {
				s.g2.visible = s.g0.visible = s.g1.visible = true;
				if (dta.myCount > 0) {//已经领取过
					s.g1.visible = false;
					s.lbMyYuanBao.visible = true;
					s.lbMyYuanBao.text = dta.myCount + "元宝";
				} else if (remain > 0) {//还有次数，显示领取按钮
					s.g0.visible = false;
					s.btn.visible = true;
					s.yqw.visible = false;
					s.lbMyYuanBao.visible = false;
				} else {//已经抢完
					s.yqw.visible = true;
					s.g1.visible = true;
					s.btn.visible = false;
					s.g0.visible = false;
				}
				s.lbTip.visible = false;

				if (dta.luckerName) {//有最佳
					s.lbLucker.text = dta.luckerName;
					s.lbLuckMoney.text = ""+dta.luckNum;
					this.g2.visible = true;
				}
			} else {
				s.lbTip.visible = true;
				s.g0.visible = s.g1.visible = s.g2.visible = false;
			}
		}
	}
}