/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewFengHuoScoreGet extends UIModalPanel {

	public frame: fairygui.GLabel;
	public n4: fairygui.GImage;
	public n2: fairygui.GButton;
	public n5: fairygui.GTextField;
	public n6: fairygui.GList;

	public static URL: string = "ui://edvdots4lkikw1z";

	public static createInstance(): ViewFengHuoScoreGet {
		return <ViewFengHuoScoreGet><any>(fairygui.UIPackage.createObject("FengHuoLY", "ViewFengHuoScoreGet"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("FengHuoLY", "ViewFengHuoScoreGet").asCom;
		s.contentPane = s.view;

		s.frame = <fairygui.GLabel><any>(s.view.getChild("frame"));
		s.n4 = <fairygui.GImage><any>(s.view.getChild("n4"));
		s.n2 = <fairygui.GButton><any>(s.view.getChild("n2"));
		s.n5 = <fairygui.GTextField><any>(s.view.getChild("n5"));
		s.n6 = <fairygui.GList><any>(s.view.getChild("n6"));

		s.n6.callbackThisObj = s;
		s.n6.itemRenderer = s.listRender;
		super.childrenCreated();
	}

	private listRender(idx, item) {
		let grid: ViewGrid = item as ViewGrid;
		grid.isShowEff=true;
		grid.tipEnabled = true;
		grid.vo = this._dta[idx];
	}

	private timerHD() {
		let s = this;
		s._time--;
		s.n2.text = "确定（" + s._time + "s）";
		if (s._time < 1) {
			GGlobal.layerMgr.close2(UIConst.FHLY_SCORE);
		}
	}

	private onClickHD(){
		GGlobal.layerMgr.close2(UIConst.FHLY_SCORE);
	}

	private _time = 4;
	private _dta;
	protected onShown() {
		let s = this;
		s._time = 4;
		let cfg = GGlobal.modelFengHuoLY.getNowAward();
		if(cfg){
			s._dta = ConfigHelp.makeItemListArr(JSON.parse(cfg[0]));
			s.n5.text = "积分+"+cfg[1];
			s.n6.numItems = s._dta.length;
		}
		s.n2.addClickListener(s.onClickHD, s);
		Timer.instance.listen(s.timerHD, s, 1000);
	}

	protected onHide() {
		let s = this;
		s.n6.numItems = 0;
		s.n2.removeClickListener(s.onClickHD, s);
		Timer.instance.remove(s.timerHD, s);
		GGlobal.layerMgr.close(UIConst.FHLY_SCORE);
	}
}