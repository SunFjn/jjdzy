/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemYSSL extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public n8: fairygui.GImage;
	public imgYlq: fairygui.GImage;
	public n2: fairygui.GList;
	public btnGet: Button1;
	public btnGo: fairygui.GButton;
	public lbBuff: fairygui.GRichTextField;
	public lbpro: fairygui.GRichTextField;
	private _actId:number = 0;

	public static URL: string = "ui://sbm40ly4ln003";

	public static createInstance(): ItemYSSL {
		return <ItemYSSL><any>(fairygui.UIPackage.createObject("yssl", "ItemYSSL"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
		this.n2.callbackThisObj = this;
		this.n2.itemRenderer = this.itemRender;
	}

	private itemRender(idx,obj){
		let item:ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this._listdata[idx];
	}

	private openPnl() {
		GGlobal.layerMgr.open(this.sysid);
	}

	private getAwardHD() {
		if(this._actId == UIConst.YSSL)
		{
			GGlobal.modelYSSL.CG_SpecialAnimalSendGift_getAward_9223(this.idx);
		}else if(this._actId == UIConst.YUNCHOUWEIWO_QCYL)
		{
			GGlobal.modelYSSL.CG_YCWW_QCYL_getAward(this.idx);
		}
	}

	public clean() {
		let s = this;
		s.n2.numItems = 0;
		s.btnGo.removeClickListener(s.openPnl, s);
		s.btnGet.removeClickListener(s.getAwardHD, s);
	}

	private sysid;
	private idx;
	private _listdata;
	public setdata(cfg, actId:number) {
		let s = this;
		// let data = GGlobal.modelYSSL.task_data[cfg.id];
		s._actId = actId;
		let data;
		if(actId == UIConst.YSSL)
		{
			data = GGlobal.modelYSSL.task_data[cfg.id];
		}else if(actId == UIConst.YUNCHOUWEIWO_QCYL)
		{
			data = GGlobal.modelYSSL.qcyl_task_data[cfg.id];
		}
		s.idx = cfg.id;
		let st = data.st;
		let pro = data.count;
		let desc = cfg.shuoming;
		let color = (st == 1 ||st == 2) ? Color.GREENSTR : Color.REDSTR;
		desc += BroadCastManager.reTxt("<font color='{0}'>({1}/{2})", color, pro, cfg.canshu);
		s.lbpro.text = desc;
		s.sysid = cfg.tiaozhuan;

		s.btnGo.visible = st == 0;
		s.btnGet.visible = st == 1;
		s.imgYlq.visible = st == 2;
		s.lbBuff.visible = st == 4;

		s._listdata = ConfigHelp.makeItemListArr(cfg.putong);
		s.n2.numItems = s._listdata.length;

		s.btnGo.addClickListener(s.openPnl, s);
		s.btnGet.addClickListener(s.getAwardHD, s);
		s.btnGet.checkNotice = true;
	}
}