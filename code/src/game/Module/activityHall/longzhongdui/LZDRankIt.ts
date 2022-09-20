/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class LZDRankIt extends fairygui.GComponent {

	public imgRank: fairygui.GLoader;
	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbScore: fairygui.GRichTextField;
	public box: Button2;

	public static URL: string = "ui://1xydor24n7ie5";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.imgRank = <fairygui.GLoader><any>(s.getChild("imgRank"));
		s.lbRank = <fairygui.GRichTextField><any>(s.getChild("lbRank"));
		s.lbName = <fairygui.GRichTextField><any>(s.getChild("lbName"));
		s.lbScore = <fairygui.GRichTextField><any>(s.getChild("lbScore"));
		s.box = <Button2><any>(s.getChild("box"));
		s.box.addClickListener(s.clickHD, s);
	}

	private clickHD() {
		GGlobal.layerMgr.open(UIConst.LZDBOX, this.idx);
	}

	public idx;
	public setdata(i, arr) {
		let s = this;
		s.idx = i;
		s.imgRank.visible = i < 4;
		s.lbRank.visible = i > 3;
		if (i < 4) {
			s.imgRank.url = CommonManager.getCommonUrl("rank_" + i);
		} else {
			s.lbRank.text = "第" + i + "名";
		}
		s.lbName.text = arr[0];
		s.lbScore.text = arr[1] + "";
	}
}