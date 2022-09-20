/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class MHTargetItem extends fairygui.GComponent {

	public btn: Button1;
	public lbProgress: fairygui.GRichTextField;
	public lbCondition: fairygui.GRichTextField;
	public ylq:fairygui.GImage;

	public static URL: string = "ui://47jfyc6eg50q1a";

	public static createInstance(): MHTargetItem {
		return <MHTargetItem><any>(fairygui.UIPackage.createObject("Boss", "MHTargetItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.btn = <Button1><any>(s.getChild("btn"));
		s.lbProgress = <fairygui.GRichTextField><any>(s.getChild("lbProgress"));
		s.lbCondition = <fairygui.GRichTextField><any>(s.getChild("lbCondition"));
		s.ylq = <fairygui.GImage><any>(s.getChild("ylq"));
		s.btn.addClickListener(s.onClick, s);
	}

	private st: number = -1;
	private onClick(): void {
		if (this.st) {
			GGlobal.modelBoss.CG_MHGETTARGET_1717(this.vo.id - 1);
		}else{
			ViewCommonWarn.text("目标未达成");
		}
	}

	public clean() {
		ConfigHelp.cleanGridview(this.grids);
	}
	private vo;
	private grids: any[] = [];
	public setdata(vo: Vo_MHTag) {
		var f = this;
		f.vo = vo;
		f.st = vo.state;
		var s = ConfigHelp.numToStr(vo.condition);
		f.lbCondition.text = "造成" + s + "伤害可以领取";
		f.lbProgress.text = ConfigHelp.numToStr(GGlobal.modelBoss.myHurt) + "/" + s;
		var r = f.st == 1;
		f.ylq.visible = f.st == 2;
		f.btn.visible = f.st != 2;
		f.btn.checkNotice = r;
		f.btn.enabled = r;
		f.lbProgress.color = GGlobal.modelBoss.myHurt>=vo.condition ? Color.GREENINT : Color.REDINT;
		f.clean();
		f.grids = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(vo.awards), f, 12, 35, true, false, 5, 106);
	}
}