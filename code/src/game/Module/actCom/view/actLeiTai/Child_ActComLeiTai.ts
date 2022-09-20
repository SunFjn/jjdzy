class Child_ActComLeiTai extends fairygui.GComponent implements IPanel {

	public c1: fairygui.Controller;
	public imgBg: fairygui.GLoader;
	public tai0: ItemLeiTai;
	public tai1: ItemLeiTai;
	public tai2: ItemLeiTai;
	public tai3: ItemLeiTai;
	public tai4: ItemLeiTai;
	public vhead0: ItemLeiTaiHead;
	public vhead1: ItemLeiTaiHead;
	public vhead2: ItemLeiTaiHead;
	public lbCt: fairygui.GRichTextField;
	public btnBat: fairygui.GButton;
	public imgTime: fairygui.GImage;
	public labTime: fairygui.GRichTextField;
	public imgArrow: fairygui.GImage;
	public imgDes: fairygui.GImage;
	public lbDes: fairygui.GRichTextField;
	public btnReport: Button2;

	public static URL: string = "ui://rhfap29in0930";

	public static pkg = "actComLeiTai";

	public static createInstance(): Child_ActComLeiTai {
		return <Child_ActComLeiTai><any>(fairygui.UIPackage.createObject("actComLeiTai", "Child_ActComLeiTai"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
		s.lbDes.text = HtmlUtil.createLink("玩法说明", true);
	}

	public static setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ItemLeiTai.URL, ItemLeiTai);
		f(ItemLeiTaiHead.URL, ItemLeiTaiHead);
		f(ItemLeiTaiReport.URL, ItemLeiTaiReport);
	}

	private _taiArr: ItemLeiTai[];
	private _headArr: ItemLeiTaiHead[]
	private _act: Vo_Activity
	private _openUI: boolean = false;

	initView(pParent: fairygui.GObject) {
		let s = this;
		s._taiArr = [s.tai0, s.tai1, s.tai2, s.tai3, s.tai4];
		s._headArr = [s.vhead0, s.vhead1, s.vhead2];
	}

	openPanel(pData?: any) {
		let s = this;
		let m = GGlobal.model_ActLeiTai
		s.y = 0;
		s._act = pData as Vo_Activity;
		GGlobal.modelActivity.CG_OPENACT(s._act.id)
		s._openUI = true
		m.actId = s._act.id;//刷新用
		IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "leitai.jpg");
		Timer.instance.listen(s.upTimer, s, 1000);
		s.registerEvent(true);
		if (m.batLeiTai) {
			s._selVo = m.batLeiTai
			m.batLeiTai = null;
		}
	}

	closePanel(pData?: any) {
		let s = this;
		IconUtil.setImg(s.imgBg, null);
		Timer.instance.remove(s.upTimer, s);
		Timer.instance.remove(s.upCd, s);
		s.registerEvent(false);
		for (let i = 0; i < s._taiArr.length; i++) {
			s._taiArr[i].clean();
		}
		s._selVo = null
		let m = GGlobal.model_ActLeiTai
		if (!m.batPlyId) {
			//关闭跨服
			Model_WorldNet.exiteCross();
		}
	}

	private registerEvent(pFlag: boolean): void {
		let s = this;
		let m = GGlobal.model_ActLeiTai;
		m.register(pFlag, Model_ActLeiTai.OPENUI, s.upView, s);
		EventUtil.register(pFlag, s.btnBat, egret.TouchEvent.TOUCH_TAP, s.onBattle, s);
		EventUtil.register(pFlag, s.btnReport, egret.TouchEvent.TOUCH_TAP, s.onReport, s);
		EventUtil.register(pFlag, s.lbDes, egret.TextEvent.LINK, s.onTFClick, s);
		EventUtil.register(pFlag, s.c1, fairygui.StateChangeEvent.CHANGED, s.onSel, s);
		let reddot = GGlobal.reddot
		reddot.register(pFlag, UIConst.ACTCOM_LEITAI, s.upRed, s);
	}

	private upTimer() {
		let s = this;
		const end = s._act ? s._act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;

		let leiTaiTime = GGlobal.model_ActLeiTai.leiTaiTime
		const date = new Date(servTime * 1000);
		let hours = date.getHours();
		let mins = date.getMinutes();

		let vostart = leiTaiTime[0];
		if (hours < vostart.start) {//下场擂台开启时间：12:00
			s.labTime.text = "下场擂台开启时间：" + vostart.start + ":00:00";
			s._openUI = false
			return;
		}
		let voend = leiTaiTime[leiTaiTime.length - 1];
		if (hours > voend.end0 || (hours == voend.end0 && mins >= voend.end1)) {
			if (end - servTime < 86400) {
				s.labTime.text = "活动已结束";//最后一天
			} else {
				s.labTime.text = "下场擂台开启时间：" + vostart.start + ":00:00";
			}
			return;
		}
		let curCfg: { start: number, end0: number, end1: number } = null
		let nextCfg: { start: number, end0: number, end1: number } = null
		for (let i = 0; i < leiTaiTime.length; i++) {
			let v = leiTaiTime[i];
			if (hours < v.start && nextCfg == null) {
				nextCfg = v;
			}
			if (hours >= v.start && hours <= v.end0 && mins < v.end1) {
				curCfg = v;
				break;
			}
		}
		if (curCfg) {
			date.setHours(curCfg.end0)
			date.setMinutes(curCfg.end1)
			date.setSeconds(0)
			s.labTime.text = "本场剩余时间：" + DateUtil.getMSBySecond4(date.getTime() / 1000 - servTime);
			if (!s._openUI) {
				GGlobal.modelActivity.CG_OPENACT(s._act.id)
				s._openUI = true
			}
		} else {
			if (nextCfg) {
				s.labTime.text = "下场擂台开启时间：" + nextCfg.start + ":00:00";
				s._openUI = false
			} else {
				s.labTime.text = "活动已经结束";
			}
		}
	}

	private _selVo: Vo_ActLeiTai;
	private upView() {
		let m = GGlobal.model_ActLeiTai;
		let s = this;

		let arr = m.leiTaiArr
		s.imgArrow.visible = false;
		let mineId = Model_player.voMine.id
		let selIdx = 0;
		for (let i = 0; i < s._taiArr.length; i++) {
			let tai = s._taiArr[i]
			let voTai = arr[i]
			tai.setVo(voTai, i);
			if (s._selVo && voTai && s._selVo.id == voTai.id) {
				selIdx = i;
			}
			if (!s.imgArrow.visible) {
				for (let j = 0; j < voTai.plyArr.length; j++) {
					if (voTai.plyArr[j] && voTai.plyArr[j].plyId == mineId) {
						s.imgArrow.visible = true;
						s.imgArrow.x = tai.x + tai.width / 2
						s.imgArrow.y = tai.y - s.imgArrow.height + 40;
					}
				}
			}
		}
		s._selVo = arr[selIdx];
		s.c1.selectedIndex = selIdx;
		s.upSel();

		if (m.batCd > 0) {
			Timer.instance.listen(s.upCd, s, 1000);
		} else {
			Timer.instance.remove(s.upCd, s);
			s.lbCt.text = ""
		}
		s.upRed();
	}

	private upRed() {
		let s = this;
		let reddot = GGlobal.reddot
		s.btnReport.checkNotice = reddot.checkCondition(UIConst.ACTCOM_LEITAI, 1)
	}

	private upCd() {
		let m = GGlobal.model_ActLeiTai;
		let s = this;
		if (m.batCd > 0) {
			s.lbCt.text = "挑战CD:" + DateUtil.getHMSBySecond(m.batCd)
		} else {
			Timer.instance.remove(s.upCd, s);
			s.lbCt.text = ""
		}
		m.batCd--;
	}

	private onSel() {
		let s = this;
		let m = GGlobal.model_ActLeiTai;
		if (!m.leiTaiArr) {
			return;
		}
		let idx = s.c1.selectedIndex
		s._selVo = m.leiTaiArr[idx];
		s.upSel();
	}

	private upSel() {
		let s = this;
		let arr = s._selVo.plyArr
		for (let i = 0; i < 3; i++) {
			s._headArr[i].setVo(arr[i], s._selVo, i);
		}
	}

	private onBattle() {
		let s = this;
		if (!s._selVo) {
			return;
		}
		let m = GGlobal.model_ActLeiTai;
		if (!m.isOpenTime()) {
			ViewCommonWarn.text("不在开启时间")
			return;
		}
		if (m.batCd > 0) {
			ViewCommonWarn.text("挑战CD中")
			return;
		}
		if (m.hasMine()) {
			ViewAlert.show("同一时间只能守擂（协助）一个擂台\n是否确定挑战（协助）", new Handler(s, s.onBattleSure))
		} else {
			s.onBattleSure();
		}
	}

	private onBattleSure() {
		let m = GGlobal.model_ActLeiTai
		let s = this;
		m.CG_CHALLENGE_11601(s._selVo.id, s._selVo.plyArr[0].plyId)
	}

	private onTFClick(evt: egret.TextEvent) {
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_LEITAI);
	}

	private onReport() {
		GGlobal.layerMgr.open(UIConst.ACTCOM_LEITAI_REPORT);
	}

}