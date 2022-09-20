/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildCZDJ extends fairygui.GComponent implements IChildHuoDong {

	public imgHeadbg: fairygui.GLoader;
	public lbTime: fairygui.GRichTextField;
	public lbYuanBao: fairygui.GRichTextField;
	public lbCount: fairygui.GRichTextField;
	public bar: fairygui.GProgressBar;
	public lst: fairygui.GList;
	public tip: ChaoJiTip;
	public n17: fairygui.GList;

	public static URL: string = "ui://vrw7je9rhfv1f";

	private static _instance: ChildCZDJ
	public static get instance(): ChildCZDJ {
		if (ChildCZDJ._instance == null) {
			ChildCZDJ._instance = <ChildCZDJ><any>(fairygui.UIPackage.createObject("huoDong", "ChildCZDJ"));
		}
		return ChildCZDJ._instance
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.lst.setVirtual();
		s.lst.callbackThisObj = s;
		s.lst.itemRenderer = s.itenRender;
		s.n17.callbackThisObj = s;
		s.n17.itemRenderer = s.itenTitleRender;
	}

	private itenRender(idx, obj) {
		let it: ChildDL = obj as ChildDL;
		it.setdata(this.dta[idx], idx);
	}

	private _showDta: any[];
	private itenTitleRender(idx, obj) {
		let it: ItemCJDJ = obj as ItemCJDJ;
		it.setdata(this._showDta[idx]);
	}

	private _day;
	//needQs 是否需要判断期数
	private getShowDta(lib, day, needQs = false) {
		if (this._day != day || !this._showDta) {
			let qs = GGlobal.modelHuoDong.CJDJ_qishu;
			let temp = [];
			let shunxu = JSON.parse(ConfigHelp.getSystemDesc(2701))[0]
			// let shunxu = [8,6,4,2,7,5,3,1]
			for (let i in lib) {
				let cfg = lib[i];
				if (needQs) {
					if (qs != cfg.qishu) {
						continue;
					}
				}
				let vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
				let xunhao = shunxu.indexOf(Number(cfg.cishu));
				temp[xunhao] = [cfg.cishu, vo];
			}
			this._showDta = temp;
			this._day = day;
		}
	}

	private dta = [];
	private update() {
		let s = this;
		let m = GGlobal.modelHuoDong;
		let lib;
		if (Model_GlobalMsg.kaifuDay > 7) {
			lib = Config.cjdj1_010[m.CJDJ_index];
			s.getShowDta(Config.cjdj1_010, 7, true);
		} else {
			lib = Config.cjdj_010[m.CJDJ_index];
			s.getShowDta(Config.cjdj_010, 1);
		}
		let yb = lib.yuanbao;
		if (Model_GlobalMsg.kaifuDay > 7) {
			this.lbTime.text = "剩余时间："
		} else {
			let ax = Model_GlobalMsg.getkaiFuTime();
			if (ax < 0) {
				this.lbTime.text = "剩余时间：已结束";
			} else {
				this.lbTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
			}
		}
		s.lbYuanBao.visible = yb > m.rechargeVal;
		s.bar.max = yb;
		s.bar.value = m.rechargeVal;
		s.lbYuanBao.text = "再充值<font color='#15f234'>" + (yb - m.rechargeVal) + "元</font>可获得1次点将次数";
		s.lbCount.text = "剩余点将次数：" + m.CJDJ_count;

		s.dta = m.CJDJ_data;
		s.lst.numItems = s.dta.length;
		s.n17.numItems = s._showDta.length;
	}

	private lqCallBack() {
		this.update();
	}

	private _st = 0;
	private _lastTime = 0;
	private randomEff() {
		let s = this;
		let st = 0;
		let now = egret.getTimer();
		let m = GGlobal.modelHuoDong;
		if (m.CJDJ_count > 0 || Config.cjdj_010[m.CJDJ_index + 1] || Config.cjdj1_010[m.CJDJ_index + 1]) {
			if (this._st == 0) {
				if (now - 2000 > s._lastTime) {
					st = 1;
					s._lastTime = now;
				} else {
					st = 0;
				}
			} else {
				if (now - 3000 > s._lastTime) {
					st = 0;
					s._lastTime = now;
				} else {
					st = 1;
				}
			}
		} else {
			st = 0;
		}
		this.setTip(st);
	}

	private setTip(val) {
		if (this._st == val) return;
		this._st = val;
		if (val == 0) {
			this.tip.visible = false;
		} else if (val == 1) {
			this.findNewPos();
		}
	}

	private findNewPos() {
		let countArr = [];
		for (let i = 0; i < this.dta.length; i++) {
			let st = this.dta[i][0];
			if (st != 2) {
				countArr.push(i);
			}
		}
		let count = Math.floor(Math.random() * countArr.length);
		count = countArr[count];
		if (count == 3 || count == 7) {
			this.tip.visible = false;
		} else {
			this.tip.visible = true;
			this.tip.setXY(this.lst.x + (count % 4) * 154 + 100, this.lst.y + Math.floor(count / 4) * 143 - 4);
		}
	}

	private updateX() {
		if (Model_GlobalMsg.kaifuDay > 7) {
			if (this._act) {
				var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
				d = Math.max(d, 0)
				this.lbTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d);
			} else {
				this.lbTime.text = "剩余时间："
			}
		} else {
			let ax = Model_GlobalMsg.getkaiFuTime();
			if (ax < 0) {
				this.lbTime.text = "剩余时间：已结束";
			} else {
				this.lbTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
			}
		}
		this.randomEff();
	}

	disposePanel() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		let s = this;
		GGlobal.control.remove(Enum_MsgType.HD_CJDJ, s.update, s);
		GGlobal.control.remove(Enum_MsgType.HD_CJDJLQ, s.lqCallBack, s);
		Timer.instance.remove(s.updateX, s);
		s.tip.visible = false;
		s.lst.numItems = 0;
		s.n17.numItems = 0;
		IconUtil.setImg(s.imgHeadbg, null);
	}

	private _act;
	private _hid;
	public show(p: fairygui.GComponent, id): void {
		let s = this;
		s._hid = id;
		p.addChild(s);
		s.setXY(0, 290);
		// s._act = Model_Activity.getActivty1(Model_HuoDong.TYPE, UIConst.HUODONG_DIANJIANG)
		GGlobal.control.listen(Enum_MsgType.HD_CJDJ, s.update, s);
		GGlobal.control.listen(Enum_MsgType.HD_CJDJLQ, s.lqCallBack, s);
		if (Model_GlobalMsg.kaifuDay > 7) {
			s._act = GGlobal.modelActivity.get(Model_HuoDong.TYPE, UIConst.HUODONG_DIANJIANG);
			GGlobal.modelActivity.CG_OPENACT(UIConst.HUODONG_DIANJIANG);
		} else {
			GGlobal.modelHuoDong.CG_OPENUI_4371();
		}
		Timer.instance.listen(s.updateX, s, 1000);
		this.setTip(0);
		IconUtil.setImg(s.imgHeadbg, Enum_Path.PIC_URL + "bar4506.jpg");
	}
}