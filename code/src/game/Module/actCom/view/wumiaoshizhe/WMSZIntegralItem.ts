class WMSZIntegralItem extends fairygui.GComponent{
	public list: fairygui.GList;
	public labTarget: fairygui.GRichTextField;
	public c1: fairygui.Controller;
	public btnRec: Button1;

	private _listData: Array<any>;
	private _vo:WMSZVO;

	public static URL:string = "ui://5na9ulpxgv3t3";

	public static createInstance():WMSZIntegralItem {
		return <WMSZIntegralItem><any>(fairygui.UIPackage.createObject("ActCom_WMSZ","WMSZIntegralItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		s.list.itemRenderer = s.renderHandle;
		s.list.callbackThisObj = s;
		s.list.setVirtual();
	}

	public setData(v: WMSZVO) {
		let s = this;
		if(!v)   return;
		
		s._vo = v;
		let cfg:Iwmjf_779 = Config.wmjf_779[v.id];
		s.labTarget.text = cfg.point + "";
		s._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
		s.list.numItems = s._listData.length;
		s.c1.selectedIndex = v.status;
		s.btnRec.checkNotice = v.status == 1? true: false;

		s.btnRec.addClickListener(s.onRec, s);
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true;
		v.isShowEff = true;
		v.vo = this._listData[index];
	}

	public clean(): void {
		super.clean();
		let s = this;
		s.list.numItems = 0;
		s.btnRec.removeClickListener(s.onRec, s);
	}

	private onRec() {
		let s = this;
		if (s._vo.status == 0) {
			ViewCommonWarn.text("积分不足")
			return;
		}
		GGlobal.model_ActWMSZ.CG_GET_TARGETAWARD(s._vo.id);
	}
}