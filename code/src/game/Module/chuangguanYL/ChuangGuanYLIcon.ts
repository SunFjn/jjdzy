/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChuangGuanYLIcon extends fairygui.GComponent {

	public body: fairygui.GLoader;
	public n3: fairygui.GImage;
	public n6: fairygui.GImage;
	public n2: fairygui.GRichTextField;

	public static URL: string = "ui://7gxkx46wlkx80";


	private static _inst: ChuangGuanYLIcon;
	public static createInstance(): ChuangGuanYLIcon {
		if (!this._inst) {
			this._inst = <ChuangGuanYLIcon><any>(fairygui.UIPackage.createObject("MainUI", "ChuangGuanYLIcon"));;
		}
		return this._inst;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.body = <fairygui.GLoader><any>(this.getChild("body"));
		this.n3 = <fairygui.GImage><any>(this.getChild("n3"));
		this.n6 = <fairygui.GImage><any>(this.getChild("n6"));
		this.n2 = <fairygui.GRichTextField><any>(this.getChild("n2"));
	}

	private openView() {
		GGlobal.layerMgr.open(UIConst.CHUANGGUANYOULI);
	}

	private drawPic(pic) {
		let sf = this;
		sf.body.setXY(0, 60);
		sf.body.setScale(0.5, 0.5);
		IconUtil.setImg(sf.body, Enum_Path.PIC_URL + pic + ".png");
	}

	private drawBody(pic) {
		let sf = this;
		sf.body.setXY(-10, 45);
		sf.body.setScale(0.2, 0.2);
		IconUtil.setImg(sf.body, Enum_Path.JUESE_URL + pic + ".png");
	}

	private setMod() {
		let s = this;
		let m = GGlobal.modelChuangGuanYL;
		let cfg = Config.cgyl_262[m.currentId];
		if (!cfg) return;
		cfg.pic && s.drawPic(cfg.pic);
		cfg.mod && s.drawBody(cfg.mod);
	}

	private setNotice() {
		this.n6.visible = GGlobal.reddot.checkCondition(UIConst.CHUANGGUANYOULI);
	}

	iconEff: Part;
	public show1(n, n1) {
		let s = this;
		// if (n == n1) {
		// 	s.n2.text = "可领取";
		// 	s.n6.visible = true;
		// } else {
		// 	s.n2.text = "完成进度 <font color='#fe0000'>" + n + "/" + n1 + "</font>";
		// 	s.n6.visible = false;
		// }
		let m = GGlobal.modelChuangGuanYL;
		let cfg = Config.cgyl_262[m.currentId];
		let vo = ConfigHelp.makeItem(JSON.parse(cfg.reward)[0]);
		s.n2.text = vo.name;
		s.n2.color = Color.getColorInt(vo.quality);
		s.height = 200;
		s.setMod();
		s.setNotice();
		s.addClickListener(s.openView, s);
		ViewMainUIRightTipContainer.getInstance().addCompnent(s, true);
		GGlobal.control.listen(Enum_MsgType.CGYL_LQ1, s.setMod, s);
		GGlobal.reddot.listen(UIConst.CHUANGGUANYOULI, s.setNotice, s);
		if (!s.iconEff) s.iconEff = EffectMgr.addEff("uieff/10028", s.displayListContainer, 47, 142, 1000, -1, true);
	}

	public hide1() {
		let s = this;
		ViewMainUIRightTipContainer.getInstance().removeCompnent(s);
		GGlobal.reddot.remove(UIConst.CHUANGGUANYOULI, s.setNotice, s);
		GGlobal.control.remove(Enum_MsgType.CGYL_LQ1, s.setMod, s);
		s.removeClickListener(s.openView, s);
		if (s.iconEff) {
			EffectMgr.instance.removeEff(s.iconEff);
			s.iconEff = null;
		}
		IconUtil.setImg(s.body, null);
	}

}