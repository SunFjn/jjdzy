/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewQunYingB extends UIPanelBase {

	public frame: fairygui.GComponent;
	public viewbg: fairygui.GComponent;
	public imgPic: fairygui.GLoader;
	public btnDesc: fairygui.GButton;
	public lst: fairygui.GList;
	public lbDesc: fairygui.GRichTextField;
	public lbLastRank: fairygui.GRichTextField;
	public lbMyRank: fairygui.GRichTextField;
	public lblastName: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lblastScore: fairygui.GRichTextField;
	public lbScore: fairygui.GRichTextField;
	public btnShuaX: fairygui.GButton;
	public lbNext: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;
	public btnLQ: Button1;
	public btnGo: Button0;
	public ylq: fairygui.GImage;
	public lbTitle: fairygui.GRichTextField;
	public lbPro: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	public n39: fairygui.GList;
	public tab0: fairygui.GButton;
	public tab1: fairygui.GButton;
	public c1: fairygui.Controller;

	public static URL: string = "ui://pxel4rmbwzou0";

	public constructor() {
		super();
		this.setSkin("qunyingbang", "qunyingbang_atlas0", "ViewQunYingB");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(QunYingBIt.URL, QunYingBIt);
	}

	protected initView(): void {
		super.initView();
		let s = this;
		s.lst.itemRenderer = s.itemRender;
		s.lst.callbackThisObj = s;
		s.lst.setVirtual();
	}

	private awards = [];
	private awardsRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.vo = this.awards[idx];
		item.tipEnabled = true;
		item.showEff(true);
	}

	private dta;
	private itemRender(idx, obj) {
		let it: QunYingBIt = obj as QunYingBIt;
		it.setdata(this.dta[idx]);
	}

	private refreshHD() {
		GGlobal.model_QunYingBang.CG_SHUAXIN();
	}

	private openDesc() {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.QUNYINGBANG)
	}

	private lingqHD() {
		GGlobal.model_QunYingBang.CG_LINGQU(this.nextIdx);
	}

	private systemID = 0;
	private nextIdx;
	public update() {
		let s = this;
		let m = GGlobal.model_QunYingBang;
		let day = m.day;
		let lib = Config.qy_235[day];
		if (!lib) return;

		let itname;
		let it = JSON.parse(lib.item);
		if (it[0][0] < 3)
			itname = ConfigHelp.getItemColorName(it[0][1])
		else itname = ConfigHelp.AttrName(it[0][0]);
		s.lbDesc.text = "活动期间每消耗1个" + itname + "获得" + lib.point + "积分";

		s.lbTitle.text = itname;
		s.lbNext.text = "下期群英榜：" + lib.next;

		s.lbName.text = Model_player.voMine.name;
		s.lbMyRank.text = "我的排名：" + m.myRank;
		s.lbScore.text = "积分：" + m.score;

		let lstDta;
		if (m.rankDta.length != 0) {
			s.dta = m.rankDta;
			if (m.myRank == 0) {
				lstDta = m.rankDta[s.dta.length - 1];
			} else {
				let r = m.myRank == 1 ? 0 : m.myRank - 2;
				lstDta = m.rankDta[r];
			}
			s.lst.numItems = s.dta.length;
		}

		if (lstDta) {
			s.lbLastRank.text = "上一排名：" + lstDta[0];
			s.lblastName.text = lstDta[2];
			s.lblastScore.text = "积分：" + lstDta[3];
		} else {
			s.lbLastRank.text = "上一排名：";
			s.lblastName.text = "";
			s.lblastScore.text = "";
		}

		let plib = Config.qypoint_235;
		if (m.awardID == 0) {
			s.nextIdx = m.day * 100 + 1;
		} else {
			if (plib[m.awardID + 1])
				s.nextIdx = m.awardID + 1;
			else
				s.nextIdx = -1;
		}
		let award;
		let count;
		s.ylq.visible = s.btnLQ.visible = s.btnGo.visible = false;
		if (s.nextIdx != -1) {
			award = plib[s.nextIdx].reward;
			count = plib[s.nextIdx].point;
			s.btnGo.visible = m.score < count;
			s.btnLQ.visible = m.score >= count;
			s.btnLQ.checkNotice = true;
			this.systemID = plib[s.nextIdx].systemid;
		} else {
			s.ylq.visible = true;
			award = plib[m.awardID].reward;
			count = plib[m.awardID].point;
			this.systemID = plib[m.awardID].systemid;
		}
		ConfigHelp.createViewGridList(s.n39, award, s);
		s.lbPro.text = s.getWanText1(m.score) + "/" + s.getWanText1(count);
		s.lbPro.color = m.score >= count ? Color.GREENINT : Color.REDINT;
		let t = Model_GlobalMsg.getServerTime();
		let zero = TimeUitl.getZeroTime(t);
		let t1 = zero + 86400000;
		if (t >= zero && t <= zero + 300 * 1000) {
			s.ylq.visible = s.btnLQ.visible = s.btnGo.visible = false;
		}
	}

	/**将超过1000000的数值转换成x.x万显示 */
	public getWanText1(v: number): string {
		if (v >= 100000) {
			return (v / 10000).toFixed(1) + "万";
		} else {
			return String(v);
		}
	}

	private goHandler() {
		GGlobal.layerMgr.open(this.systemID);
	}

	private isZeroUpdate: boolean = false;
	public updateX() {
		let s = this;
		let t = Model_GlobalMsg.getServerTime();
		let zero = TimeUitl.getZeroTime(t);
		let t1 = zero + 86400000;
		if (t >= zero && t <= zero + 300 * 1000) {
			s.promptLb.visible = true;
			s.promptLb.text = "活动已结束\n" + HtmlUtil.fontNoSize("0点5分开启下期群英榜", Color.getColorStr(2));
			s.btnGo.visible = false;
			s.btnLQ.visible = false;
			s.lbTime.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
			s.isZeroUpdate = true;
		} else {
			let str = TimeUitl.getRemainingTime(t1, t, { hour: "小时", minute: "分", second: "秒" });
			s.lbTime.text = str;
			s.promptLb.visible = false;
			if (s.isZeroUpdate) {
				s.isZeroUpdate = false;
				GGlobal.model_QunYingBang.CG_OPEN();
			}
		}
	}

	protected onShown() {
		let s = this;
		GGlobal.control.listen(Enum_MsgType.QUNYINGBANG, s.update, s);
		GGlobal.control.listen(Enum_MsgType.QUNYINGBANG_LAST, s.update, s);
		s.isZeroUpdate = false;
		Timer.instance.listen(s.updateX, s, 1000);
		this.c1.selectedIndex = 0;
		this.selectPage()

		let day = Config.xitong_001[UIConst.QUNYINGBANG].day
		let ms = Model_GlobalMsg.getServerTime();
		let data = new Date(ms);
		let hou = data.getHours();
		let min = data.getMinutes()
		if (Model_GlobalMsg.kaifuDay == day + 1 && (hou > 0 || min > 5)) {//1天过5分钟  服务器处理数据
			this.tab0.visible = true;
			this.tab1.visible = true;
		}
		else if (Model_GlobalMsg.kaifuDay > day + 1) {
			this.tab0.visible = true;
			this.tab1.visible = true;
		}
		else {
			this.tab0.visible = false;
			this.tab1.visible = false;
		}
		IconUtil.setImg(s.imgPic, Enum_Path.BACK_URL + "qunyingbang.jpg");
	}

	protected onHide() {
		let s = this;
		s.isZeroUpdate = false;
		s.n39.numItems = 0;
		s.lst.numItems = 0;
		Timer.instance.remove(s.updateX, s);
		GGlobal.control.remove(Enum_MsgType.QUNYINGBANG, s.update, s);
		GGlobal.control.remove(Enum_MsgType.QUNYINGBANG_LAST, s.update, s);
		
		GGlobal.layerMgr.close(UIConst.QUNYINGBANG);
		IconUtil.setImg(s.imgPic, null);
	}

	eventFunction (t){
		let self = this;
		let event = EventUtil.register;
		event(t,self.btnGo,EventUtil.TOUCH,self.goHandler,self);
		event(t,self.btnLQ,EventUtil.TOUCH,self.lingqHD,self);
		event(t,self.btnDesc,EventUtil.TOUCH,self.openDesc,self);
		event(t,self.btnShuaX,EventUtil.TOUCH,self.refreshHD,self);
		event(t,self.c1,fairygui.StateChangeEvent.CHANGED,self.selectPage,self);
	}

	private selectPage(): void {
		let i = this.c1.selectedIndex;
		if (i == 0) {
			GGlobal.model_QunYingBang.CG_OPEN();
		} else if (i == 1) {
			GGlobal.model_QunYingBang.CG_LAST_2197();
		}
		this.update();
	}
}