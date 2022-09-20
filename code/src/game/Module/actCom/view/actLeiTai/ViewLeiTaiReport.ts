class ViewLeiTaiReport extends UIModalPanel {

	public lb: ItemLeiTaiReport;

	public static URL: string = "ui://rhfap29iut4i8";

	public static createInstance(): ViewLeiTaiReport {
		return <ViewLeiTaiReport><any>(fairygui.UIPackage.createObject("actComLeiTai", "ViewLeiTaiReport"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}


	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("actComLeiTai", "ViewLeiTaiReport").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
	}

	protected onShown(): void {
		let s = this;
		let m = GGlobal.model_ActLeiTai
		m.CG_GETNOTICELIST_11609();
		m.listen(Model_ActLeiTai.REPORT, s.upView, s);
		s.upView();
	}

	private upView() {
		let s = this;
		let m = GGlobal.model_ActLeiTai
		let arr = m.reportArr;
		let str = ""
		for (let i = 0; i < arr.length; i++) {
			let v = arr[i];
			if (v.res == 0) {
				str += "很遗憾，" + HtmlUtil.fontNoSize(v.name, Color.TEXT_YELLOW) + "击败了你，成为新的擂主"
			} else {
				str += HtmlUtil.fontNoSize(v.name, Color.TEXT_YELLOW) + "不自量力前来挑战你，被你大败而归"
			}
			if (i != arr.length - 1) {
				str += "\n"
			}
		}
		s.lb.vo = str;
	}

	protected onHide(): void {
		let s = this;
		let m = GGlobal.model_ActLeiTai
		m.remove(Model_ActLeiTai.REPORT, s.upView, s);
	}
}