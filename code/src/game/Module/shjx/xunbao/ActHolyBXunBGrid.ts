class ActHolyBXunBGrid extends fairygui.GLabel {

	public grid: ViewGrid;
	public imgGet: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public lbCt: fairygui.GRichTextField;
	public static URL: string = "ui://4aepcdbwflxz5d";

	public static createInstance(): ActHolyBXunBGrid {
		return <ActHolyBXunBGrid><any>(fairygui.UIPackage.createObject("shouhunJX", "ActHolyBXunBGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.addClickListener(self.gridHandler, self);
	}

	private gridHandler() {
		let self = this;
		if (self.drawNum > 0) {
			GGlobal.modelSHXunbao.CG_XUNBAO_GOAL(self.vo.id);
		}
	}

	private vo: Ishxbmb_268;
	private drawNum = 0;
	public setVo(cfg: Ishxbmb_268, state: number = 0) {
		let self = this;
		self.vo = cfg;
		self.drawNum = state;
		self.title = cfg.q + "圈";
		let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		if (state > 0) {//可领取
			self.noticeImg.visible = self.lbCt.visible = true;
			self.imgGet.visible = false;
			if (state > 1) {
				self.lbCt.text = state + "";
			} else {
				self.lbCt.text = "";
			}
			self.grid.tipEnabled = false;
		} else {
			self.noticeImg.visible = self.lbCt.visible = false;
			self.imgGet.visible = state == -1 && GGlobal.modelSHXunbao.xbQuan % 50 >= cfg.q;
			self.grid.tipEnabled = true;
		}
		self.grid.isShowEff = true;
		self.grid.vo = arr[0];
	}

	public clean() {
		this.grid.clean();
	}
}