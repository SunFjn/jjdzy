class Child_XuTian extends fairygui.GComponent {

	public backImg: fairygui.GLoader;
	public listRew: fairygui.GList;
	public boxRew: fairygui.GGroup;
	public boxBuf: fairygui.GGroup;
	public boxTime: fairygui.GGroup;
	public boxArrow: fairygui.GGroup;
	public btnAdd: fairygui.GButton;
	public startBt: Button2;
	public imgBuf0: fairygui.GLoader;
	public imgBuf1: fairygui.GLoader;
	public imgBuf2: fairygui.GLoader;
	public imgBuf3: fairygui.GLoader;
	public imgBufBg: fairygui.GImage;

	public lbBuf0: fairygui.GRichTextField;
	public lbBuf1: fairygui.GRichTextField;
	public lbBuf2: fairygui.GRichTextField;
	public lbBuf3: fairygui.GRichTextField;

	public btnCanKu: fairygui.GButton;
	public smBt: fairygui.GButton;
	public lbTime: fairygui.GRichTextField;
	public lbHunt: fairygui.GRichTextField;
	public lbArrCt: fairygui.GRichTextField;
	public lbCt: fairygui.GRichTextField;
	public btnArrow: fairygui.GButton;
	public imgArrow: fairygui.GImage;

	public groupItem: fairygui.GGroup;
	public itemLb: fairygui.GRichTextField;
	public itemCt: fairygui.GRichTextField;
	public itemIcon: fairygui.GLoader;


	public static URL: string = "ui://j0lk55yeg53a1";

	public static createInstance(): Child_XuTian {
		return <Child_XuTian><any>(fairygui.UIPackage.createObject("xuTian", "Child_XuTian"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
		s.listRew.callbackThisObj = s;
		s.listRew.itemRenderer = s.renderRew
	}

	private rewArr: IGridImpl[]//奖励预览
	private _endTime = 0//倒计时

	private cfgSpe
	public openPanel(pData?: any) {
		let s = this;
		s.cfgSpe = ConfigHelp.getSystemNum(8215);
		let m = GGlobal.model_XuTian
		// m.CG_OPENUI();
		s.zeroReset()
		m.st = 0;
		s._endTime = 0
		IconUtil.setImg(s.backImg, Enum_Path.BACK_URL + "xutian.jpg");
		s.registerEvent(true);
		s.upView();
		s.rewArr = ConfigHelp.makeItemListArr(ConfigHelp.getSystemDesc(8213));
		s.listRew.numItems = s.rewArr.length;

		Timer.instance.listen(s.onTimer, s, 1000);
	}
	public closePanel(pData?: any) {
		let s = this;
		IconUtil.setImg(s.backImg, null);
		s.registerEvent(false);
		Timer.instance.remove(s.onTimer, s);
		s.listRew.numItems = 0;
		let m = GGlobal.model_XuTian
		s.cleanHunt();
		if (m.st == 1) {
			GGlobal.model_XuTian.CG_END_HUNT()
		}
		m.st = 0
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.model_XuTian.register(pFlag, Model_XuTian.OPENUI, self.upView, self);
		GGlobal.model_XuTian.register(pFlag, Model_XuTian.START_HUNT, self.startHunt, self);
		GGlobal.model_XuTian.register(pFlag, Model_XuTian.END_HUNT, self.endHunt, self);
		GGlobal.model_XuTian.register(pFlag, Model_XuTian.WIN_HUNT, self.winHunt, self);
		EventUtil.register(pFlag, self.startBt, egret.TouchEvent.TOUCH_TAP, self.onStart, self);
		EventUtil.register(pFlag, self.btnCanKu, egret.TouchEvent.TOUCH_TAP, self.onCanKu, self);
		EventUtil.register(pFlag, self.btnAdd, egret.TouchEvent.TOUCH_TAP, self.onAdd, self);
		EventUtil.register(pFlag, self.smBt, egret.TouchEvent.TOUCH_TAP, self.onSM, self);
		for (let i = 0; i < 4; i++) {
			EventUtil.register(pFlag, self["imgBuf" + i], egret.TouchEvent.TOUCH_TAP, self.onBufTip, self);
		}
		GGlobal.control.register(pFlag, Enum_MsgType.ZERO_RESET, self.zeroReset, self);
	}
	private _reset18//18点重置时间
	private _reset12//12点重置时间
	private zeroReset() {
		let s = this
		let m = GGlobal.model_XuTian
		m.CG_OPENUI();

		const servTime = Model_GlobalMsg.getServerTime();
		let date = new Date(servTime);

		date.setHours(12);
		date.setMinutes(0)
		date.setSeconds(0)
		let t12 = date.getTime();
		s._reset12 = t12 - servTime > 0 ? t12 - servTime + egret.getTimer() : 0

		date.setHours(18);
		date.setMinutes(0)
		date.setSeconds(0)
		let t18 = date.getTime();
		s._reset18 = t18 - servTime > 0 ? t18 - servTime + egret.getTimer() : 0
	}


	private onTimer() {//每秒
		let s = this;
		let m = GGlobal.model_XuTian
		if (s._endTime > 0) {
			let end = Math.floor((s._endTime - egret.getTimer()) / 1000)
			if (end < 0) {
				s.lbTime.text = "已结束";
				s._endTime = 0
				m.CG_END_HUNT()
			} else {
				s.lbTime.text = "剩余时间：" + end + "秒"
			}
		}

		if (s._reset12 > 0) {
			let end = Math.floor((s._reset12 - egret.getTimer()) / 1000)
			if (end < 0) {
				m.CG_OPENUI();
				s._reset12 = 0;
			}
		}

		if (s._reset18 > 0) {
			let end = Math.floor((s._reset18 - egret.getTimer()) / 1000)
			if (end < 0) {
				m.CG_OPENUI();
				s._reset18 = 0;
			}
		}
	}

	private onSM() {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.XU_TIAN);
	}

	private onCanKu() {
		GGlobal.layerMgr.open(UIConst.XU_TIAN_CANKU);
	}

	private renderRew(index, obj: ViewGrid) {
		obj.tipEnabled = true;
		obj.isShowEff = true;
		obj.vo = this.rewArr[index]
	}

	private onStart() {
		let m = GGlobal.model_XuTian
		let itemCt = Model_Bag.getItemCount(Model_XuTian.ITEM_BATCT)
		if (m.lastCt <= 0 && itemCt <= 0) {
			ViewCommonWarn.text("挑战次数不足");
			return;
		}
		GGlobal.model_XuTian.CG_START_HUNT();
	}

	private upView() {
		let s = this;
		let m = GGlobal.model_XuTian

		let itemCt = Model_Bag.getItemCount(Model_XuTian.ITEM_BATCT)
		if (m.lastCt == 0 && itemCt > 0) {
			s.lbCt.text = ""
			s.btnAdd.visible = false
			s.groupItem.visible = true;
			s.itemLb.text = "狩猎令："
			s.itemCt.text = "" + itemCt
			let icon = Config.daoju_204[Model_XuTian.ITEM_BATCT].icon
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + icon + ".png", s.itemIcon);
		} else {
			s.lbCt.text = "挑战次数：" + HtmlUtil.fontNoSize(m.lastCt + "/" + ConfigHelp.getSystemNum(8210), m.lastCt > 0 ? Color.GREENSTR : Color.REDSTR);
			s.btnAdd.visible = true
			s.groupItem.visible = false;
		}

		//状态
		if (m.st == 0) {
			s.boxTime.visible = false;
			s.btnCanKu.visible = false
			s.boxRew.visible = true;
			s.boxBuf.visible = false;
			s.lbHunt.visible = false;
			s.startBt.visible = true;
			s.startBt.checkNotice = m.lastCt > 0
			s.boxArrow.visible = false
		} else {
			s.boxTime.visible = true;
			s.btnCanKu.visible = true
			s.boxRew.visible = false;
			s.lbHunt.visible = true;
			s.startBt.visible = false;
			s.showArrCt();
			s.boxArrow.visible = true
		}
	}

	private onAdd() {
		let m = GGlobal.model_XuTian
		let s = this;
		let cfg = Config.xtwlcs_776[m.hasBuy + 1]
		if (!cfg) {
			ViewCommonWarn.text("已达购买上限");
			return;
		}
		View_XuTian_Buy.show(m.hasBuy, m.maxBuy, Handler.create(null, s.okHandle));
	}

	private okHandle(count): void {
		GGlobal.model_XuTian.CG_BUY_HUNT(count);
	}

	private vHuntArr: VXuTianHunt[] = [];
	private startHunt() {
		let s = this;
		let m = GGlobal.model_XuTian
		s._endTime = ConfigHelp.getSystemNum(8214) * 1000 + egret.getTimer();
		s.onTimer();
		s.upView()
		s.vHuntArr = [];
		s._addPox = 0
		s._preWith = 0
		s._preTime = egret.getTimer();
		Timer.instance.listen(s.onTimerHunt, s, 50);
		s.backImg.addClickListener(s.clickHunt, s);
	}

	private endHunt() {
		let s = this;
		s.upView()
		s.cleanHunt()
	}

	private cleanHunt() {
		let s = this;
		let m = GGlobal.model_XuTian
		for (let i = 0; i < s.vHuntArr.length; i++) {
			let v = s.vHuntArr[i]
			if (v) {
				v.clean();
				v.removeFromParent();
			}
		}
		s.vHuntArr = [];
		Timer.instance.remove(s.onTimerHunt, s);
		s.backImg.removeClickListener(s.clickHunt, s);

		s._buf0 = 0
		s._bufTime0 = 0//冰冻
		s._buf1 = 0
		s._bufTime1 = 0//减速
		s._bufDep1 = 0
		s._buf2 = 0
		s._bufTime2 = 0//加速射击
		s._bufDep2 = 0
		s._buf3 = 0
		s._bufTime3 = 0//概率提升
		s._endTime = 0
	}

	private clickHunt(e: egret.TouchEvent) {
		let m = GGlobal.model_XuTian
		if (m.yuCt <= 0) {
			ViewCommonWarn.text("羽箭不足")
			return;
		}
		let xp = e.stageX
		let yp = e.stageY
		let s = this;
		//发射
		// s.btnArrow.fireClick()
		let imgFire = new fairygui.GLoader();
		imgFire.touchable = false;
		imgFire.setPivot(0.5, 0, true);
		imgFire.setScale(0.5, 0.5);
		imgFire.url = "ui://j0lk55yeg53ad";
		s.addChild(imgFire)
		imgFire.x = s.btnArrow.x - 10;
		imgFire.y = s.btnArrow.y;
		imgFire.rotation = Math.atan((xp - imgFire.x) / (imgFire.y - yp)) * 180 / Math.PI

		let endTime = ConfigHelp.getSystemNum(8212);
		let now = egret.getTimer();
		if (s._bufTime2 > now) {
			endTime = endTime * (1 - (s._bufDep2 / 100000));
		}
		egret.Tween.get(imgFire).to({ x: xp, y: yp }, endTime, egret.Ease.sineIn).call(s.fireEnd, s, [xp, yp, imgFire]);
		//弓箭特效
		EffectMgr.addEff("uieff/10097", s.displayListContainer, s.btnArrow.x, s.btnArrow.y + s.btnArrow.height / 2, 400, 400, false);
	}

	private fireEnd(x, y, imgFire: fairygui.GLoader) {
		let s = this;
		// EffectMgr.addEff("uieff/10007", s.displayListContainer, x, y, 400, 400, false);
		imgFire.removeFromParent();
		//找到坐标
		for (let i = 0; i < s.vHuntArr.length; i++) {
			let v = s.vHuntArr[i]
			if (!v || !v.awatar) continue;
			// let hit = v.displayListContainer.hitTestPoint(x, y);
			let hit = v.awaUI.displayObject.hitTestPoint(x, y);
			if (hit) {
				GGlobal.model_XuTian.CG_HUNT(v.vo.type, v.vo.id);
				//击中特效
				EffectMgr.addEff("uieff/10098", s.displayListContainer, x, y, 400, 400, false);
				return;
			}
		}
		GGlobal.model_XuTian.CG_HUNT(-1, -1);
	}

	private winHunt(obj) {
		let s = this;
		s.showArrCt();
		if (obj.type == -1 || obj.id == -1) {
			return;
		}

		for (let i = 0; i < s.vHuntArr.length; i++) {
			let v = s.vHuntArr[i]
			if (!v) {
				continue;
			}
			if (v.vo.type == obj.type && v.vo.id == obj.id) {
				if (obj.res == 1) {//中奖
					if (obj.type == 1) {//飘奖励
						s.popRew(v)
					} else {//飘buf
						s.popBuf(v);
					}
					v.removeFromParent();
					v.clean();
					s.vHuntArr[i] = null;
					EffectMgr.addEff("uieff/10099", s.displayListContainer, v.x + v.width / 2, v.y + v.height + 100, 400, 400, false);
				} else {
					//闪避
					let s = this;
					let hp = VXuTianHp.create();
					hp.init(v.x + v.width / 2, v.y + v.height + 100, 0, false, false, false, false);
					hp.onAdd(s);
				}
				break;
			}
		}

	}
	//飘奖励
	private popRew(vRew: VXuTianHunt) {
		let s = this;
		let v: ViewGrid = ViewGrid.create()
		v.tipEnabled = v.isShowEff = false;
		v.touchable = false;
		let hunt = Config.xtwl_776[vRew.vo.cfgId]
		let item = ConfigHelp.makeItemListArr(JSON.parse(hunt.jl))[0];
		v.vo = item;
		this.addChild(v);
		v.x = vRew.x
		v.y = vRew.y
		//飘入
		egret.Tween.get(v).to({ x: s.btnCanKu.x + s.btnCanKu.width / 2, y: s.btnCanKu.y }, 400, egret.Ease.sineIn).call(s.popRewEnd, s, [v]);
	}

	private popRewEnd(v: ViewGrid) {
		let s = this;
		v.clean();
		v.removeFromParent();
	}

	private popBuf(vRew: VXuTianHunt) {
		let s = this;
		let v: fairygui.GLoader = new fairygui.GLoader();
		v.touchable = false;
		let buf = Config.xtwlbf_776[vRew.vo.cfgId];
		v.url = CommonManager.getUrl("xuTian", "buf" + buf.lx);
		s.addChild(v);
		v.x = vRew.x
		v.y = vRew.y

		if (buf.lx == 1) {//全屏冰冻效果
			let b: fairygui.GLoader = new fairygui.GLoader();
			IconUtil.setImg(b, Enum_Path.BACK_URL + "xut_bing.png");
			b.setXY(0, s.backImg.y)
			b.setScale(2, 2);
			b.touchable = false;
			s.addChild(b);
			b.alpha = 0;
			egret.Tween.get(b).to({ alpha: 1 }, 400, egret.Ease.sineIn).to({ alpha: 0 }, 200, egret.Ease.sineIn).call(s.popBufEnd, s, [b]);
		}

		//飘入
		if (buf.lx == 3) {//额外弓箭
			egret.Tween.get(v).to({ x: s.boxArrow.x + s.boxArrow.width / 2, y: s.boxArrow.y }, 400, egret.Ease.sineIn).call(s.popBufEnd, s, [v]);
		} else {
			egret.Tween.get(v).to({ x: s.boxBuf.x + s.boxBuf.width / 2, y: s.boxBuf.y }, 400, egret.Ease.sineIn).call(s.popBufEnd, s, [v]);
		}
		s.onBuf(buf)
	}
	private _buf0 = 0
	private _bufTime0 = 0//冰冻

	private _buf1 = 0
	private _bufTime1 = 0//减速
	private _bufDep1 = 0

	private _buf2 = 0
	private _bufTime2 = 0//加速射击
	private _bufDep2 = 0

	private _buf3 = 0
	private _bufTime3 = 0//概率提升

	private onBuf(cfg: Ixtwlbf_776) {//单个buf
		let s = this;
		let arr = JSON.parse(cfg.buff)
		let time = Number(arr[0][2]) * 1000 + egret.getTimer();
		let dep = Number(arr[0][0])
		let now = egret.getTimer();
		if (cfg.lx == 1) {//冰冻
			if (now > s._bufTime0 || cfg.id >= s._buf0) {//失效 或者强  替换
				s._buf0 = cfg.id
				s._bufTime0 = time
				s.imgBuf0.data = s._buf0
			}
		} else if (cfg.lx == 2) {//减速
			if (now > s._bufTime1 || cfg.id >= s._buf1) {//失效 或者强  替换
				s._buf1 = cfg.id
				s._bufTime1 = time;
				s._bufDep1 = dep
				s.imgBuf1.data = s._buf1
			}
		} else if (cfg.lx == 4) {//加速射击
			if (now > s._bufTime2 || cfg.id >= s._buf2) {//失效 或者强  替换
				s._buf2 = cfg.id
				s._bufTime2 = time;
				s._bufDep2 = dep
				s.imgBuf2.data = s._buf2
			}
		} else if (cfg.lx == 5) {//概率提升
			if (now > s._bufTime3 || cfg.id >= s._buf3) {//失效 或者强  替换
				s._buf3 = cfg.id
				s._bufTime3 = time;
				s.imgBuf3.data = s._buf3
			}
		}
	}

	private onBufTip(e: egret.TouchEvent) {
		let img: fairygui.GLoader = e.currentTarget
		GGlobal.layerMgr.open(UIConst.XU_TIAN_TIP, img.data)
	}

	private popBufEnd(v: fairygui.GLoader) {
		let s = this;
		v.removeFromParent();
	}

	private showArrCt() {
		let m = GGlobal.model_XuTian
		let s = this;
		s.lbArrCt.text = m.yuCt + "/" + ConfigHelp.getSystemNum(8211);
	}

	private _addPox = 0;
	private _curTime = 0;
	private _preTime = 0;
	private onTimerHunt() {
		let s = this;
		let time = egret.getTimer();
		let addPox = s.cfgSpe * (time - s._preTime) / 1000;
		s._preTime = time
		let m = GGlobal.model_XuTian
		if (s._bufTime0 > time) {
			addPox = 0;
			for (let i = 0; i < s.vHuntArr.length; i++) {
				let v = s.vHuntArr[i]
				if (v) v.setFrozen();
			}
		} else {
			for (let i = 0; i < s.vHuntArr.length; i++) {
				let v = s.vHuntArr[i]
				if (v) v.unFrozen();
			}
			if (s._bufTime1 > time) {
				addPox = addPox * (1 - s._bufDep1 / 100000);
			}
		}


		s._addPox += addPox
		if (s._addPox >= s._preWith) {
			s.createNew()
			s._addPox = 0;
		}
		for (let i = 0; i < s.vHuntArr.length; i++) {
			let v = s.vHuntArr[i]
			if (!v) {
				s.vHuntArr.splice(i, 1);
				i--;
				continue;
			}
			v.x += addPox;
			if (v.x >= 640 + 200) {
				m.huntArr.push(v.vo);//加入循环
				v.clean();
				v.removeFromParent();
				s.vHuntArr.splice(i, 1);
				i--;
			}
		}
		if (time - s._curTime < 1000) {
			return;
		}
		s._curTime = time;
		//buf
		let bufObj = {}
		let bufLen = 0
		if (s._bufTime0 > time) {
			bufObj[0] = 1;
			bufLen++
		}
		if (s._bufTime1 > time) {
			bufObj[1] = 1;
			bufLen++
		}
		if (s._bufTime2 > time) {
			bufObj[2] = 1;
			bufLen++
		}
		if (s._bufTime3 > time) {
			bufObj[3] = 1;
			bufLen++
		}

		if (bufLen == 0) {
			s.boxBuf.visible = false;
		} else {
			s.boxBuf.visible = true;
			let j = 0;
			for (let i = 0; i < 4; i++) {
				let img = s["imgBuf" + i]
				let lb = s["lbBuf" + i]
				if (bufObj[i]) {
					let ypot = s.imgBufBg.y + 10 + j * 77;
					j++
					img.visible = true;
					img.y = ypot

					lb.visible = true;
					lb.y = ypot + 20
					lb.text = "" + Math.floor((s["_bufTime" + i] - time) / 1000);
				} else {
					img.visible = false;
					lb.visible = false;
				}
			}
			s.imgBufBg.height = 77 * bufLen + 10
		}
	}

	private _preWith = 0
	private createNew() {
		let s = this;
		let m = GGlobal.model_XuTian
		if (m.huntArr.length <= 0) {
			return;
		}
		let data = m.huntArr.shift();
		let v = VXuTianHunt.createInstance();
		s.addChild(v);
		v.touchable = false;
		v.setVo(data);
		s.vHuntArr.push(v);
		v.x = -200;
		v.y = 235 + Math.floor(Math.random() * 200);
		s._preWith = v.cfgWith ? v.cfgWith : 300
	}

}