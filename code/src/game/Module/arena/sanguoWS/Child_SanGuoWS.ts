/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class Child_SanGuoWS extends fairygui.GComponent {
	public b0: fairygui.GImage;
	public b1: fairygui.GImage;
	public b3: fairygui.GImage;
	public b4: fairygui.GImage;
	public b5: fairygui.GImage;
	public b6: fairygui.GImage;
	public b7: fairygui.GImage;
	public b8: fairygui.GImage;
	public b9: fairygui.GImage;
	public b10: fairygui.GImage;
	public b11: fairygui.GImage;
	public b12: fairygui.GImage;
	public b13: fairygui.GImage;
	public b14: fairygui.GImage;
	public b15: fairygui.GImage;
	public b16: fairygui.GImage;
	public b17: fairygui.GImage;
	public b18: fairygui.GImage;
	public b19: fairygui.GImage;
	public b20: fairygui.GImage;
	public b21: fairygui.GImage;
	public b22: fairygui.GImage;
	public b23: fairygui.GImage;
	public b24: fairygui.GImage;
	public b25: fairygui.GImage;
	public b26: fairygui.GImage;
	public b27: fairygui.GImage;
	public b28: fairygui.GImage;
	public b29: fairygui.GImage;
	public b2: fairygui.GImage;
	public nameLb0: SanGuoItem;
	public nameLb1: SanGuoItem;
	public nameLb2: SanGuoItem;
	public nameLb3: SanGuoItem;
	public nameLb4: SanGuoItem;
	public nameLb5: SanGuoItem;
	public nameLb6: SanGuoItem;
	public nameLb7: SanGuoItem;
	public nameLb10: SanGuoItem;
	public nameLb11: SanGuoItem;
	public nameLb12: SanGuoItem;
	public nameLb13: SanGuoItem;
	public nameLb14: SanGuoItem;
	public nameLb15: SanGuoItem;
	public nameLb8: SanGuoItem;
	public nameLb9: SanGuoItem;
	public l6: Button2;
	public l4: Button2;
	public l0: Button2;
	public l1: Button2;
	public l3: Button2;
	public l2: Button2;
	public l5: Button2;
	public l10: Button2;
	public l11: Button2;
	public l8: Button2;
	public l12: Button2;
	public l13: Button2;
	public l9: Button2;
	public l7: Button2;
	public l14: Button2;
	public btnRank: fairygui.GButton;
	public btnPool: Button2;
	public btnDesc: fairygui.GButton;
	public head: ViewHead;
	public lbPro: fairygui.GRichTextField;
	public lbTitle: fairygui.GRichTextField;
	public titleIcon: fairygui.GLoader;

	public static URL: string = "ui://me1skowlqt57s";

	public static createInstance(): Child_SanGuoWS {
		return <Child_SanGuoWS><any>(fairygui.UIPackage.createObject("Arena", "Child_SanGuoWS"));
	}

	public constructor() {
		super();
	}

	private nodes: Array<fairygui.GButton>;
	private nameArr: Array<SanGuoItem>;
	private lineArr: Array<fairygui.GImage>;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.b0 = <fairygui.GImage><any>(s.getChild("b0"));
		s.b1 = <fairygui.GImage><any>(s.getChild("b1"));
		s.b3 = <fairygui.GImage><any>(s.getChild("b3"));
		s.b4 = <fairygui.GImage><any>(s.getChild("b4"));
		s.b5 = <fairygui.GImage><any>(s.getChild("b5"));
		s.b6 = <fairygui.GImage><any>(s.getChild("b6"));
		s.b7 = <fairygui.GImage><any>(s.getChild("b7"));
		s.b8 = <fairygui.GImage><any>(s.getChild("b8"));
		s.b9 = <fairygui.GImage><any>(s.getChild("b9"));
		s.b10 = <fairygui.GImage><any>(s.getChild("b10"));
		s.b11 = <fairygui.GImage><any>(s.getChild("b11"));
		s.b12 = <fairygui.GImage><any>(s.getChild("b12"));
		s.b13 = <fairygui.GImage><any>(s.getChild("b13"));
		s.b14 = <fairygui.GImage><any>(s.getChild("b14"));
		s.b15 = <fairygui.GImage><any>(s.getChild("b15"));
		s.b16 = <fairygui.GImage><any>(s.getChild("b16"));
		s.b17 = <fairygui.GImage><any>(s.getChild("b17"));
		s.b18 = <fairygui.GImage><any>(s.getChild("b18"));
		s.b19 = <fairygui.GImage><any>(s.getChild("b19"));
		s.b20 = <fairygui.GImage><any>(s.getChild("b20"));
		s.b21 = <fairygui.GImage><any>(s.getChild("b21"));
		s.b22 = <fairygui.GImage><any>(s.getChild("b22"));
		s.b23 = <fairygui.GImage><any>(s.getChild("b23"));
		s.b24 = <fairygui.GImage><any>(s.getChild("b24"));
		s.b25 = <fairygui.GImage><any>(s.getChild("b25"));
		s.b26 = <fairygui.GImage><any>(s.getChild("b26"));
		s.b27 = <fairygui.GImage><any>(s.getChild("b27"));
		s.b28 = <fairygui.GImage><any>(s.getChild("b28"));
		s.b29 = <fairygui.GImage><any>(s.getChild("b29"));
		s.b2 = <fairygui.GImage><any>(s.getChild("b2"));
		s.nameLb0 = <SanGuoItem><any>(s.getChild("nameLb0"));
		s.nameLb1 = <SanGuoItem><any>(s.getChild("nameLb1"));
		s.nameLb2 = <SanGuoItem><any>(s.getChild("nameLb2"));
		s.nameLb3 = <SanGuoItem><any>(s.getChild("nameLb3"));
		s.nameLb4 = <SanGuoItem><any>(s.getChild("nameLb4"));
		s.nameLb5 = <SanGuoItem><any>(s.getChild("nameLb5"));
		s.nameLb6 = <SanGuoItem><any>(s.getChild("nameLb6"));
		s.nameLb7 = <SanGuoItem><any>(s.getChild("nameLb7"));
		s.nameLb10 = <SanGuoItem><any>(s.getChild("nameLb10"));
		s.nameLb11 = <SanGuoItem><any>(s.getChild("nameLb11"));
		s.nameLb12 = <SanGuoItem><any>(s.getChild("nameLb12"));
		s.nameLb13 = <SanGuoItem><any>(s.getChild("nameLb13"));
		s.nameLb14 = <SanGuoItem><any>(s.getChild("nameLb14"));
		s.nameLb15 = <SanGuoItem><any>(s.getChild("nameLb15"));
		s.nameLb8 = <SanGuoItem><any>(s.getChild("nameLb8"));
		s.nameLb9 = <SanGuoItem><any>(s.getChild("nameLb9"));
		s.l6 = <Button2><any>(s.getChild("l6"));
		s.l4 = <Button2><any>(s.getChild("l4"));
		s.l0 = <Button2><any>(s.getChild("l0"));
		s.l1 = <Button2><any>(s.getChild("l1"));
		s.l3 = <Button2><any>(s.getChild("l3"));
		s.l2 = <Button2><any>(s.getChild("l2"));
		s.l5 = <Button2><any>(s.getChild("l5"));
		s.l10 = <Button2><any>(s.getChild("l10"));
		s.l11 = <Button2><any>(s.getChild("l11"));
		s.l8 = <Button2><any>(s.getChild("l8"));
		s.l12 = <Button2><any>(s.getChild("l12"));
		s.l13 = <Button2><any>(s.getChild("l13"));
		s.l9 = <Button2><any>(s.getChild("l9"));
		s.l7 = <Button2><any>(s.getChild("l7"));
		s.l14 = <Button2><any>(s.getChild("l14"));
		s.btnRank = <fairygui.GButton><any>(s.getChild("btnRank"));
		s.btnPool = <Button2><any>(s.getChild("btnPool"));
		s.btnDesc = <fairygui.GButton><any>(s.getChild("btnDesc"));
		s.head = <ViewHead><any>(s.getChild("head"));
		s.lbPro = <fairygui.GRichTextField><any>(s.getChild("lbPro"));
		s.lbTitle = <fairygui.GRichTextField><any>(s.getChild("lbTitle"));
		s.titleIcon = <fairygui.GLoader><any>(s.getChild("titleIcon"));
		s.nodes = [];
		for (let i = 0; i < 15; i++) {
			s.nodes.push(s["l" + i]);
		}
		s.nameArr = [];
		for (let i = 0; i < 16; i++) {
			s.nameArr.push(s["nameLb" + i]);
			if (i > 7)
				s.nameArr[i].imgYaZhu.x = 154;
		}
		s.lineArr = [];
		for (let i = 0; i < 30; i++) {
			s.lineArr.push(s["b" + i]);
		}
		s.head.ng.visible = false;
		
		s.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, s.onAdd, s);
		s.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.onRemove, s);
	}
	private onAdd() {
		// ImageLoader.instance.loader(Enum_Path.TITLE_URL + Config.chenghao_702["44"].picture + ".png", s.titleIcon);
		IconUtil.setImg(this.titleIcon, Enum_Path.TITLE_URL + Config.chenghao_702["44"].picture + ".png");
	}
	private onRemove() {
		IconUtil.setImg(this.titleIcon, null);
	}

	private raceStr = ["", "16强", "8强", "4强", "决赛", ""];
	private stateStr = ["未开启", "准备中", "进行中"];
	private raceTime = ["",
		[[0, 0, 20, 30], [20, 30, 20, 35]],//开始时间 结束时间 16强
		[[20, 35, 20, 45], [20, 45, 20, 50]],//开始时间 结束时间 8抢
		[[20, 50, 21, 0], [21, 0, 21, 5]],//开始时间 结束时间 4强
		[[21, 5, 21, 15], [21, 15, 21, 20]]//开始时间 结束时间 呵呵
	];
	private initDta() {
		let s = this;
		let m = GGlobal.modelsgws;
		let raceMembers = m.raceInfo;
		let c = m.champion;
		let lun = m.lun;
		let st = m.state;
		let v: Node_SGWS;
		//线条组合
		for (let i = 0; i < s.lineArr.length; i++) {
			//处理名字的灰暗
			if (i < s.nameArr.length) {
				let lb = s.nameArr[i];
				if (i < raceMembers.length) {
					v = raceMembers[i];
					lb.setVo(v);
					lb.grayed = !v.isLife();
				} else {
					lb.resetView();
				}
			}

			//====处理线条灰暗
			let img = s.lineArr[i];
			let data = JSON.parse(img.data);
			let lineLun = data[0];
			let child = data[1];
			// if (lun >= lineLun) {
			let showLine = false;
			for (let j = 0, k = child.length; j < k; j++) {
				let childIndex = child[j] - 1;
				let racedata = raceMembers[childIndex];
				if (racedata) {//所归属的节点,有玩家并且进入了当前比赛进程
					showLine = racedata.lun > lineLun;
					if (showLine) {
						break;
					}
				}
			}
			img.visible = showLine;
			// } else {
			// 	img.visible = false;
			// }

			//按钮状态
			if (s.nodes[i]) {
				let checkBtn = s.nodes[i];
				let btnDta = JSON.parse(checkBtn.data);
				let btnLun = btnDta[0];
				let btnZu = btnDta[1];
				let canYz = !m.checkYazhu(btnLun, btnZu);//没押注过并且本组是有玩家的
				checkBtn.icon = canYz ? "ui://me1skowlhfct5q" : "ui://me1skowlhfct55";
				checkBtn.grayed = btnLun > lun;
			}
		}

		//冠军数据
		if (lun != 4 && c.length && c[2]! + 0) {
			s.head.setdata(c[2], null, c[1], -1, false, c[3]);
		} else {
			s.head.setdata(0, null, "", -1, false, 0);
		}

		if (!m.isOpen()) {//周日活动
			s.lbTitle.text = "下轮赛事";
			s.lbPro.text = "<font color='#fe0000'>周日20：30</font>";
		}

		if (GGlobal.modelsgws.isOpen())
			Timer.instance.listen(s.updateTime, s, 1000);
	}

	private nodeHandler(e: egret.TouchEvent) {
		let data = JSON.parse(e.target.data);
		let lun = data[0];
		let zu = data[1];
		let nowLun = GGlobal.modelsgws.lun;
		let now = GGlobal.modelsgws.lun;
		let st = GGlobal.modelsgws.state;
		let racer = GGlobal.modelsgws.getGrouperByLun(lun, zu);
		if (now == 0) {
			ViewCommonWarn.text("赛事未开启");
		} else if (now > lun || (now == lun && st == 2)) {//看比赛
			if (racer.length == 2) {
				GGlobal.modelsgws.CG_BATTLE_1841(lun, zu);
			} else if (racer.length == 1) {
				ViewCommonWarn.text("选手轮空直接晋级");
			}
		} else {
			if (lun <= nowLun) {
				if (racer.length > 0) {
					GGlobal.layerMgr.open(UIConst.SGWS_YZ, data);
				// } else {
				// 	ViewCommonWarn.text("赛事轮空无法押注");
				}
			} else {
				ViewCommonWarn.text("赛事未开启");
			}
		}
	}

	private openDesc(e: egret.TouchEvent) {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SANGUO_WUSHUANG);
	}

	private openRank(e: egret.TouchEvent) {
		GGlobal.layerMgr.open(UIConst.SGWS_RANK);
	}

	private openPool(e: egret.TouchEvent) {
		GGlobal.layerMgr.open(UIConst.SGWS_POOL);
	}

	private checkPool() {
		this.btnPool.checkNotice = GGlobal.reddot.checkCondition(UIConst.SANGUO_WUSHUANG, 2);
	}

	private synchroCount = 0;
	private updateTime() {
		let s = this;
		let m = GGlobal.modelsgws;
		if (!m.isOpen()) {//周日活动
			s.lbTitle.text = "下轮赛事";
			s.lbPro.text = "<font color='#fe0000'>周日20：30</font>";
			Timer.instance.remove(s.updateTime, s);
			return;
		}
		let date = new Date(Model_GlobalMsg.getServerTime());
		let nowHour = date.getHours();
		let nowMin = date.getMinutes();
		let nowSecen = date.getSeconds();
		let dateDta = this.raceTime[m.lun][m.state - 1];
		if (!dateDta) return;

		let endHour = dateDta[2];
		let endMin = dateDta[3];
		let timeLimit = (Number(endHour) - nowHour) * 3600 + (Number(endMin) - nowMin) * 60 - nowSecen;
		if (timeLimit < 0&&this.synchroCount < 5) {
			this.synchroCount ++;
			GGlobal.modelsgws.CG_OPEN_SANGUOWS();
			return;
		}

		let timeStr = DateUtil.getMSBySecond4(timeLimit);

		s.lbTitle.text = s.raceStr[m.lun];
		s.lbPro.text = s.stateStr[m.state] + "\n" + timeStr;
	}

	private checkReddot() {
		let red = GGlobal.reddot.checkCondition(UIConst.SANGUO_WUSHUANG,2);
		this.btnPool.checkNotice = red;
	}

	public show(): void {
		let a = this;
		let c = GGlobal.control;
		for (var i = 0; i < 15; i++) {
			a.nodes[i].addClickListener(a.nodeHandler, a);
		}
		a.checkReddot();
		c.listen(Enum_MsgType.SGWS_OPENUI, a.initDta, a);
		c.listen(Enum_MsgType.SGWS_YZ, a.initDta, a);
		a.btnDesc.addClickListener(a.openDesc, a);
		a.btnRank.addClickListener(a.openRank, a);
		a.btnPool.addClickListener(a.openPool, a);
		GGlobal.modelsgws.CG_OPEN_SANGUOWS();
		GGlobal.modelsgws.CG_POOL_1835();//为了获取是否有红点
		GGlobal.control.listen(Enum_MsgType.SGWS_POOL, a.checkReddot, a);
	}

	public clean(): void {
		let a = this;
		a.synchroCount = 0;
		let c = GGlobal.control;
		for (var i = 0; i < 14; i++) {
			a.nodes[i].removeClickListener(a.nodeHandler, a);
		}
		Timer.instance.remove(a.updateTime, a);
		c.remove(Enum_MsgType.SGWS_OPENUI, a.initDta, a);
		c.remove(Enum_MsgType.SGWS_YZ, a.initDta, a);
		a.btnDesc.removeClickListener(a.openDesc, a);
		a.btnRank.removeClickListener(a.openRank, a);
		a.btnPool.removeClickListener(a.openPool, a);
		GGlobal.reddot.remove(UIConst.SANGUO_WUSHUANG, this.checkReddot, this);
	}
}