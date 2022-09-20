/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewLZDRank extends UIModalPanel {

	public frame: WindowFrame1;
	public lst: fairygui.GList;
	public lbInfo: fairygui.GRichTextField;
	public lbMyRank: fairygui.GRichTextField;

	public static URL: string = "ui://1xydor24n7ie4";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("activityHall");
		let s = this;
		s.view = fairygui.UIPackage.createObject("activityHall", "ViewLZDRank").asCom;
		s.contentPane = s.view;

		// s.frame = <fairygui.GComponent><any>(s.view.getChild("frame"));
		s.lst = <fairygui.GList><any>(s.view.getChild("lst"));
		s.lbInfo = <fairygui.GRichTextField><any>(s.view.getChild("lbInfo"));
		s.lbMyRank = <fairygui.GRichTextField><any>(s.view.getChild("lbMyRank"));
		s.lst.callbackThisObj = s;
		s.lst.setVirtual();
		s.lst.itemRenderer = s.renderHd;
		super.childrenCreated();
		// s.frame.getChild("lbTitle").asTextField.text = "排行榜";
	}

	private renderHd(i, obj) {
		let m = GGlobal.modelActivityHall;
		let it: LZDRankIt = obj as LZDRankIt;
		it.setdata(i + 1, m.lzd_rankDta[i]);
	}

	private setdata() {
		let s = this;
		let m = GGlobal.modelActivityHall;
		let d = m.lzd_rankDta;
		if (d.length == 0) {
			s.lst.numItems = 0;
			s.lbInfo.text = "我的积分：0";
			s.lbMyRank.text = "我的排名：<font color='#ffc334'>未上榜</font>";
		} else {
			s.lbInfo.text = "我的积分：" + m.lzd_score;
			if(m.lzd_rank==0||m.lzd_rank>10){
				s.lbMyRank.text = "我的排名：<font color='#ffc334'>10+</font>";
			}else{
				s.lbMyRank.text = "我的排名：<font color='#ffc334'>" + m.lzd_rank + "</font>";
			}
			s.lst.numItems = d.length;
		}
	}

	protected onShown() {
		let s = this;
		let m = GGlobal.modelActivityHall;
		let c = GGlobal.control;
		m.CG_RANK_1985();
		c.listen(Enum_MsgType.LZD_OPENRANK, s.setdata, s);
	}

	protected onHide() {
		let s = this;
		let c = GGlobal.control;
		c.remove(Enum_MsgType.LZD_OPENRANK, s.setdata, s);
		GGlobal.layerMgr.close(UIConst.LZDRANK);
	}
}