/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewLZD extends UIPanelBase {
	public c1: fairygui.Controller;
	public frame: fairygui.GComponent;
	public n25: fairygui.GImage;
	public n15: fairygui.GImage;
	public lbRemain: fairygui.GRichTextField;
	public lbScore: fairygui.GRichTextField;
	public lbRank: fairygui.GRichTextField;
	public n17: fairygui.GImage;
	public n24: fairygui.GImage;
	public i0: LongZDIt;
	public i1: LongZDIt;
	public i2: LongZDIt;
	public i3: LongZDIt;
	public lbTime: fairygui.GRichTextField;
	public lbTopic: fairygui.GRichTextField;
	public g0: fairygui.GGroup;
	public btnDH: fairygui.GButton;
	public n28: fairygui.GButton;
	public btnRank: fairygui.GButton;
	public n27: fairygui.GList;
	public n29: fairygui.GRichTextField;
	public static URL: string = "ui://1xydor24n7ie1";

	public constructor() {
		super();
		this.setSkin("activityHall", "activityHall_atlas0", "ViewLZD");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(LongZDIt.URL, LongZDIt);
		fairygui.UIObjectFactory.setPackageItemExtension(LZDRankIt.URL, LZDRankIt);
		fairygui.UIObjectFactory.setPackageItemExtension(ViewLZDRet.URL, ViewLZDRet);
		fairygui.UIObjectFactory.setPackageItemExtension(LZDItem.URL, LZDItem);
	}

	private itemArr;
	protected initView(): void {
		super.initView();
		let s = this;
		s.i0.idx = 1;
		s.i1.idx = 2;
		s.i2.idx = 3;
		s.i3.idx = 4;
		s.itemArr = [s.i0, s.i1, s.i2, s.i3];

		s.n27.callbackThisObj = s;
		s.n27.itemRenderer = s.listRender;

		s.frame.getChild("icon").asLoader.url = "ui://1xydor24oc0jx";
	}

	private listRender(idx, obj) {
		let item: LZDItem = obj as LZDItem;
		item.setdata(idx);
	}

	private rankHD() {
		GGlobal.layerMgr.open(UIConst.LZDRANK);
	}

	private dhHd() {
		GGlobal.layerMgr.open(UIConst.BAOKU_LZ);
	}

	private last = 0;
	private updateX() {
		let s = this;
		let now = Model_GlobalMsg.getServerTime()
		let m = GGlobal.modelActivityHall;
		let t = ((m.lzd_remain - now) / 1000) >> 0;
		if (s.st == 1) {
			if (t > 0) {
				s.lbRemain.text = t + "s后开始答题";
			} else {
				if (now - s.last > 1000) {
					m.CG_OPEN_1981();
					s.last = now;
				}
			}
		} else if (s.st == 2) {
			if (t > 0) {
				s.lbTime.text = "剩余答题时间：" + t + "秒";
			} else {
				m.CG_ANSWER_1983(0);
				m.CG_OPEN_1981();
			}
		} else if (s.st == 3) {
			if (t > 0) {
				s.lbTime.text = "等待时间" + t + "秒";
			} else {
				m.CG_OPEN_1981();
			}
		}
		if (this.c1.selectedIndex != 2) {
			GGlobal.modelActivityHall.CG_RANK_1985();
		}
	}

	private setQuestion() {
		let s = this;
		let m = GGlobal.modelActivityHall;
		let lib = Config.lzd_234[m.lzd_id];
		s.lbTopic.text = "题目：" + m.lzd_pro + "/20\n" + lib.q;
		s.lbScore.text = "我的积分：" + m.lzd_score + "";
		if (m.lzd_rank == 0 || m.lzd_rank > 10) {
			s.lbRank.text = "我的排名:10+";
		} else {
			s.lbRank.text = "我的排名:" + m.lzd_rank;
		}
		let it = m.lzd_data;
		let txt = ["", lib.a, lib.error1, lib.error2, lib.error3];
		for (let i = 0; i < s.itemArr.length; i++) {
			let idx = it[i];
			s.itemArr[i].setdata(txt[idx], idx == 1);
		}
	}

	private st;
	private setdata() {
		let s = this;
		let m = GGlobal.modelActivityHall;
		s.st = m.lzd_st;
		this.c1.selectedIndex = 0;
		switch (s.st) {
			case 0:
				s.g0.visible = false;
				s.lbRemain.visible = true;
				s.lbRemain.text = "活动未开始";
				s.lbTopic.text = "每天12：00\n等你来答";
				this.c1.selectedIndex = 1;
				break;
			case 1:
				s.g0.visible = false;
				this.c1.selectedIndex = 1;
				s.lbRemain.visible = true;
				break;
			case 2:
				s.g0.visible = true;
				s.lbRemain.visible = false;
				s.setQuestion();
				break;
			case 3://中场休息5秒
				s.g0.visible = true;
				s.lbRemain.visible = false;
				break;
			case 4:
				s.g0.visible = false;
				s.lbRemain.visible = true;
				s.lbRemain.text = "活动结束";
				s.lbTopic.text = "每天14：00\n等你来答";
				this.c1.selectedIndex = 1;
				break;
			case 5:
				this.c1.selectedIndex = 2;
				break;
			case 6:
				this.c1.selectedIndex = 3;
				break;
		}
	}

	private answerHd() {
		let s = this;
		for (let i = 0; i < s.itemArr.length; i++) {
			s.itemArr[i].check();
		}
	}

	private setRealRank() {
		this.n27.numItems = 5;
		let s = this;
		let m = GGlobal.modelActivityHall;
		s.lbScore.text = "我的积分：" + m.lzd_score + "";
		if (m.lzd_rank == 0 || m.lzd_rank > 10) {
			s.lbRank.text = "我的排名:10+";
		} else {
			s.lbRank.text = "我的排名:" + m.lzd_rank;
		}
	}

	private startAnswerHD() {
		if (TimeUitl.cool("lzd", 1000)) {
			GGlobal.modelActivityHall.CG_Answer_1987();
		}
	}

	protected onShown() {
		let s = this;
		let m = GGlobal.modelActivityHall;
		m.CG_OPEN_1981();
		s.setRealRank();

		let c = GGlobal.control;
		c.listen(Enum_MsgType.LZD_OPEN, s.setdata, s);
		c.listen(Enum_MsgType.LZD_RET, s.answerHd, s);
		c.listen(Enum_MsgType.LZD_OPENRANK, s.setRealRank, s);

		Timer.instance.listen(s.updateX, s, 1000);
		s.btnDH.addClickListener(s.dhHd, s);
		s.btnRank.addClickListener(s.rankHD, s);
		s.n28.addClickListener(s.startAnswerHD, s);
	}

	protected onHide() {
		let s = this;
		let c = GGlobal.control;
		c.remove(Enum_MsgType.LZD_OPEN, s.setdata, s);
		c.remove(Enum_MsgType.LZD_RET, s.answerHd, s);
		c.remove(Enum_MsgType.LZD_OPENRANK, s.setRealRank, s);

		Timer.instance.remove(s.updateX, s);
		s.btnDH.removeClickListener(s.dhHd, s);
		s.btnRank.removeClickListener(s.rankHD, s);
		s.n28.removeClickListener(s.startAnswerHD, s);
		GGlobal.layerMgr.close(UIConst.LONGZHONGDUI);
		s.n27.numItems = 0;
	}
}