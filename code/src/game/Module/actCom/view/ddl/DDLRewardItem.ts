class DDLRewardItem extends fairygui.GComponent{
	public lbCount:fairygui.GRichTextField;
	public btnAward: Button2;
	private _vo:DDLVO;
	public c1: fairygui.Controller;
	private _cfg:Iddlreward_297;

	public static URL:string = "ui://ke8qv0cktcq69";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public setVo(vo:DDLVO) {
		let self = this;
		self._vo = vo;
		self._cfg = Config.ddlreward_297[vo.id];
		self.lbCount.text = "对" + self._cfg.num + "联";
		self.btnAward.addClickListener(self.onGetAward, self);
		self.c1.selectedIndex = vo.status >= 2? 1:0;
		self.btnAward.checkNotice = vo.status == 1? true:false;
	}

	private onGetAward(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.DDL_REWARD, { cfg: this._cfg });
	}
}