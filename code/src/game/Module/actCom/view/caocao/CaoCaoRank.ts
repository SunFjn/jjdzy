class CaoCaoRank extends UIModalPanel {

	public list: fairygui.GList;
	public lbMine: fairygui.GRichTextField;

	public static URL: string = "ui://n6fub9ddeq413";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		GGlobal.createPack("CaoCaoLaiXi");
		s.view = fairygui.UIPackage.createObject("CaoCaoLaiXi", "CaoCaoRank").asCom;
		s.contentPane = this.view;
		CommonManager.parseChildren(s.view, s);
		s.list.itemRenderer = s.onRender;
		s.list.callbackThisObj = s;

		super.childrenCreated();
	}

	private onRender(index, obj) {
		var data = this.sourced[index];
		var item: CaoCaotem = obj as CaoCaotem;
		item.setdata(data);
	}

	public setdata() {
		var m = GGlobal.modelCaoCao;
		this.sourced = m.rankData;
		this.list.numItems = this.sourced.length;
		var rk = "未上榜";
		var d = this.sourced;
		var nm = Model_player.voMine.name;
		for (var i = 0; i < d.length; i++) {
			if (Model_player.isMine(d[i][1])) {
				rk = d[i][0];
				break;
			}
		}
		this.lbMine.text = "<font color='" + Color.WHITESTR + "'>我的排名：</font>" + rk;
	}

	private sourced: any[];
	protected onShown() {
		let self = this;
		var tp = self._args;
		if (tp == 0) {
			GGlobal.modelCaoCao.CG_CaoCaoCome_openRank_8511();
			GGlobal.control.listen(UIConst.CAOCAO_LAIXI_RANK, self.setdata, self);
		} else {
			self.setdata();
		}
	}

	protected onHide() {
		let self = this;
		self.list.numItems = 0;
		var tp = self._args;
		if (tp == 0) {
			GGlobal.control.remove(UIConst.CAOCAO_LAIXI_RANK, self.setdata, self);
		}
		GGlobal.layerMgr.close(UIConst.CAOCAO_LAIXI_RANK);
	}
}