class ChildCaoCao extends fairygui.GComponent implements IPanel {

	public progress: fairygui.GProgressBar;
	public lbTime: fairygui.GRichTextField;
	public btnFight: fairygui.GButton;
	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GLabel;
	public timeLb: fairygui.GRichTextField;
	public lbTimelimit: fairygui.GRichTextField;
	public g2: fairygui.GGroup;
	public promptLb: fairygui.GGroup;
	public roleIcon: fairygui.GLoader;
	public backIcon: fairygui.GLoader;

	public static URL: string = "ui://n6fub9ddeq410";
	public static pkg = "CaoCaoLaiXi";
	public static createInstance(): ChildCaoCao {
		return <ChildCaoCao><any>(fairygui.UIPackage.createObject("CaoCaoLaiXi", "ChildCaoCao"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	private vo: Vo_Activity;
	private awatar: UIRole;
	openPanel(vo?: Vo_Activity) {
		let self = this;
		self.vo = vo;
		self.setdata();
		self.listen();
		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.uiparent = self.roleIcon.displayObject as fairygui.UIContainer;
			self.awatar.setPos(self.roleIcon.width / 2, self.roleIcon.height);
			self.awatar.setScaleXY(1.5, 1.5);
		}
		let cfg = Config.cclx_754[1];
		let lb = Config.NPC_200[JSON.parse(cfg.boss)[0][1]];
		self.awatar.setBody(lb.mod);
		if (lb.weapon) {
			self.awatar.setWeapon(lb.mod);
		}
		self.awatar.onAdd();
		if (vo.getSurTime() > 0) {
			self.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(vo.getSurTime());
			Timer.instance.listen(self.timeHandler, self);
		} else {
			self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
		}
		GGlobal.modelActivity.CG_OPENACT(UIConst.CAOCAO_LAIXI);
		// IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "frameBg3.jpg");
	}

	private timeHandler() {
		let self = this;
		if (self.vo.getSurTime() > 0) {
			self.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
			Timer.instance.listen(self.timeHandler, self);
		} else {
			self.timeLb.text = HtmlUtil.fontNoSize("活动已结束", Color.getColorStr(6));
			Timer.instance.remove(self.timeHandler, self);
		}
	}

	closePanel(pData?: any) {
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
		self.removelis();
		self.clearGrid();
		Timer.instance.remove(self.timeHandler, self);
		// IconUtil.setImg(self.backIcon, null);
		GGlobal.layerMgr.close(UIConst.CAOCAO_LAIXI_RANK);
	}

	private com: fairygui.GComponent;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.com = new fairygui.GComponent;
		this.addChild(self.com);
		self.com.setScale(0.8, 0.8);
	}

	private onTxTClick(e: egret.TouchEvent) {
		e.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.CAOCAO_LAIXI_RANK, 0);
	}

	private onFight() {
		if (TimeUitl.cool("ChildCaoCao", 1000)) {
			GGlobal.modelCaoCao.CG_CaoCaoCome_join_8513();
		}
	}

	private updateTime() {
		let s = this;
		let m = GGlobal.modelCaoCao;
		let t = Model_GlobalMsg.getServerTime();
		if (m.ccSt == 1) {
			if (m.CDEnter <= 0) {
				s.lbTime.text = "";
			} else {
				m.CDEnter--;
				s.lbTime.text = "进入冷却时间：" + m.CDEnter + "秒";
			}
			s.lbTimelimit.visible = false;
		} else {
			s.lbTime.text = "";
			s.lbTimelimit.visible = true;
			let data = JSON.parse(ConfigHelp.getSystemDesc(7020))
			let nowData = new Date(t);
			let hour = nowData.getHours();
			let min = nowData.getMinutes();
			let sec = nowData.getSeconds();
			let nextIndex: number = -1;
			for (let i = 0; i < 3; i++) {
				if (hour == data[i][0]) {//优先检查是否被击杀
					if (min >= data[i][1]) {
						s.lbTimelimit.text = "<font color='#ffc334'>曹操已被击败</font>";
						return;
					}
				}
				if (hour < data[i][0] || (hour == data[i][0] && min < data[i][1])) {
					nextIndex = i;
					break;
				}
			}
			let time;
			if (nextIndex == -1) {
				time = (23 - hour + data[0][0]) * 3600 + (59 - min + data[0][1]) * 60 + 59 - sec;
			} else {
				time = (data[nextIndex][0] - hour) * 3600 + (data[nextIndex][1] - min) * 60 - sec;
			}
			s.lbTimelimit.text = "<font color='#fe0000'>BOSS刷新倒计时：</font>\n" + TimeUitl.getRemainingTime(time * 1000, 0, { hour: ":", minute: ":", second: " " });
			let now = egret.getTimer();
			if (time < 2 && now - s.requstTime > 2000) {
				s.requstTime = now;
				GGlobal.modelActivity.CG_OPENACT(UIConst.CAOCAO_LAIXI);
			}
		}
	}

	private requstTime: number = 0;
	private yulanWards: any[] = [];
	private lastWards: any[] = [];
	private setdata() {
		let s = this;
		let lib = Config.cclx_754[1];
		let m = GGlobal.modelCaoCao;
		let bid = JSON.parse(lib.boss)[0][1];
		let bossname = Config.NPC_200[bid]["name"];
		s.lbName.text = bossname.replace("·", "\n·\n");;
		if (m.ccSt == 1) {
			s.progress.visible = true;
			s.g2.visible = false;
			s.progress.max = m.bossMaxHp;
			s.progress.value = m.bossHp;
		} else {
			s.progress.visible = false;
			s.g2.visible = true;
		}

		s.clearGrid();
		let join = lib.jlyl;
		let kill = lib.zhyj;
		join = JSON.parse(join);
		kill = JSON.parse(kill);
		s.yulanWards = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(join), s.com, 85, 510, true, true, 2, 113);
		s.lastWards = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(kill), s.com, 85, 820, true, true, 2, 113);
		s.promptLb.text = "下轮曹操生命提高<font color='#15f234'>" + m.qmHpMul * 100 + "%</font>";
	}

	private clearGrid() {
		let s = this;
		ConfigHelp.cleanGridview(s.yulanWards);
		ConfigHelp.cleanGridview(s.lastWards);
	}

	private reqData() {
		GGlobal.modelActivity.CG_OPENACT(UIConst.CAOCAO_LAIXI);
	}

	private listen() {
		let s = this;
		Timer.instance.listen(s.updateTime, s, 1000);
		s.lbRank.addClickListener(s.onTxTClick, s);
		s.btnFight.addClickListener(s.onFight, s);
		GGlobal.control.listen(UIConst.CAOCAO_LAIXI, s.setdata, s);
	}

	private removelis() {
		let s = this;
		s.btnFight.removeClickListener(s.onFight, s);
		s.lbRank.removeClickListener(s.onTxTClick, s);
		Timer.instance.remove(s.updateTime, s);
		GGlobal.control.remove(UIConst.CAOCAO_LAIXI, s.setdata, s);
	}

}