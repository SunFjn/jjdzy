class Model_Recharge extends BaseModel {
	public constructor() {
		super();
	}

	/**首冲状态 */
	public scState: number = 0;
	private setFirstChargeState() {
		this.scState = 1;//收到红点默认为充值成功
		GGlobal.reddot.remove(UIConst.SHOUCHONG, this.setFirstChargeState, this);
	}
	public hasShouchong = false;
	public hasMRShouchong = false;
	/**每日首冲状态  */
	public mrscState: number = 0;
	public day: number = 0;
	public mrsc: number = 0;
	mrscBox: any[] = [[0], [0], [0]];

	public checkNotice() {
		let r = false;
		if (this.mrscState == 1) {
			r = true;
		} else {
			for (var i = 0; i < this.mrscBox.length; i++) {
				if (this.mrscBox[i][0] == 1) {
					r = true;
					break;
				}
			}
		}
		GGlobal.reddot.setCondition(UIConst.MEIRISHOUCHONG, 0, r);
		GGlobal.mainUICtr.setIconNotice(UIConst.MEIRISHOUCHONG, r);
	}

	public setChongZhiState(id) {
		if (id == UIConst.SHOUCHONG) {
			GGlobal.modelRecharge.hasShouchong = true;
		} else if (id == UIConst.MEIRISHOUCHONG) {
			GGlobal.modelRecharge.hasMRShouchong = true;
		}
	}

	public listenServ(m: WebSocketMgr) {
		let s = this;
		let c = GGlobal.control;
		this.socket = m;
		m.regHand(1930, this.GC_MRSC_1932, this);
		m.regHand(1932, this.GC_MRSC_1934, this);
		m.regHand(1934, this.GC_MRSC_1936, this);
		m.regHand(1962, this.GC_SC_1962, this);
		m.regHand(1964, this.GC_SC_1964, this);
		m.regHand(2752, this.GC2752, this);
		m.regHand(2754, this.GC2754, this);
		m.regHand(2756, this.GC2756, this);

		GGlobal.reddot.listen(UIConst.SHOUCHONG, s.setFirstChargeState, s);
	}

	/**打开每日首冲界面  */
	public CG_MRSC_1931() {
		GGlobal.modelActivity.CG_OPENACT(UIConst.MEIRISHOUCHONG);
		// this.sendSocket(1931, this.getBytes());
	}
	/** 
   [B]-B-B 每日首冲打开界面返回 [B:宝箱的状态0未达成1可领取2已领取]宝箱列表B:累计天数B:每日首充奖励领取状态，0：未充值，1：可领取，2：已领取*/
	private GC_MRSC_1932(s: Model_Recharge, b: BaseBytes) {
		s.mrscBox = b.readFmt([["B"]])[0];
		s.day = b.readByte();
		s.mrscState = b.readByte();
		s.checkNotice();
		GGlobal.control.notify(Enum_MsgType.MEIRISHOUCHONGUP);
	}

	/**领取宝箱奖励 B:要领取的宝箱id */
	public CG_MRSC_1933(i) {
		var b = this.getBytes();
		b.writeByte(i);
		this.sendSocket(1931, b);
	}
	/** B-B  领取宝箱奖励返回 B:状态，1：成功，2：宝箱不存在，3：累计天数不满足，4：不能重复领取B:领取的宝箱id，成功时才返回 */
	private GC_MRSC_1934(s: Model_Recharge, b: BaseBytes) {
		var r = b.readByte();
		if (r == 1) {
			var id = b.readByte();
			s.mrscBox[id - 1] = [2];
			s.checkNotice();
			GGlobal.control.notify(Enum_MsgType.MEIRISHOUCHONGUP);
		} else if (r == 2) {
			ViewCommonWarn.text("宝箱不存在");
		} else if (r == 3) {
			ViewCommonWarn.text("累计天数不满足");
		} else if (r == 4) {
			ViewCommonWarn.text("不能重复领取");
		}
	}

	/**每日首充奖励  */
	public CG_MRSC_1935() {
		this.sendSocket(1933, this.getBytes());
	}
	/**B 每日首充奖励返回 B:状态，0：首充没达成，不能领取，1：成功，4：不能重复领取 */
	private GC_MRSC_1936(s: Model_Recharge, b: BaseBytes) {
		var r = b.readByte();
		if (r == 0) {
			ViewCommonWarn.text("您今日尚未进行充值");
		} else if (r == 1) {
			s.mrscState = 2;
			s.checkNotice();
			GGlobal.control.notify(Enum_MsgType.MEIRISHOUCHONGUP);
		} else if (r == 4) {
			ViewCommonWarn.text("不能重复领取");
		}
	}

	/**首充奖励返回 B:状态，0：首充没达成，不能领取，1：成功，2：不能重复领取 */
	public CG_SC_1961() {
		this.sendSocket(1961, this.getBytes());
	}
	/**首充奖励返回 B:状态，0：首充没达成，不能领取，1：成功，2：不能重复领取 */
	private GC_SC_1962(s: Model_Recharge, b: BaseBytes) {
		var r = b.readByte();
		if (r == 1) {
			GGlobal.layerMgr.close2(UIConst.SHOUCHONG);
			s.hasShouchong = false;
			GGlobal.mainUICtr.removeIcon(UIConst.SHOUCHONG);
			GGlobal.control.notify(Enum_MsgType.SHOUCHONGUP);
		}
	}

	//--新首充
	public static readonly msg_info = "msg_info";
	public scInfos: any = {};//1可领取，2已领取
	/**打开UI */
	public CG2751() { this.sendSocket(2751, this.getBytes()) }
	private GC2752(self: Model_Recharge, bytes: BaseBytes) {
		for (let i = 0, len = bytes.readShort(); i < len; i++) {
			var id: number = bytes.readByte();
			var state = bytes.readByte();
			self.scInfos[id] = state;
		}
		self.notify(Model_Recharge.msg_info);
	}
	/**领取 */
	public CG2753(id: number) {
		var bytes = this.getBytes();
		bytes.writeByte(id);
		this.sendSocket(2753, bytes);
	}
	private GC2754(self: Model_Recharge, bytes: BaseBytes) {
		const state = bytes.readByte();
		if (state == 1) {
			const id = bytes.readByte();
			self.scInfos[id] = 2;
			self.notify(Model_Recharge.msg_info);
		} else {
			ViewCommonWarn.text("未达领取条件");
		}
	}
	/**是否首充过了 */
	public getHasSC() {
		return Object.keys(this.scInfos).length > 0;
	}
	/**是否显示图标 */
	public disShowIcon() {
		const keys = Object.keys(this.scInfos);
		const firstSt = this.scInfos[keys[0]];
		const secondSt = this.scInfos[keys[1]];
		return firstSt == 2 && secondSt == 2;
	}

	/**是否显示图标 */
	public isFirstGet() {
		const keys = Object.keys(this.scInfos);
		const state1 = this.scInfos["1"];
		const state2 = this.scInfos["2"];
		const state3 = this.scInfos["3"];
		return (state1 == 2 || state2 == 2 || state3 == 2);
	}
	/**获取固定职业(登录发) */
	public static heroJob: number;
	private GC_SC_1964(self: Model_Recharge, bytes: BaseBytes) {
		Model_Recharge.heroJob = bytes.readByte();
	}
	private GC2756(self) {
		self.showOrHideSC(true);
	}
	/**关闭通知后端 */
	public CG2757() { this.sendSocket(2757, this.getBytes()) }
	private scTip = null;
	public showOrHideSC(value: boolean) {
		if (value) {
			if (!this.scTip) {
				const iconSC = GGlobal.mainUICtr.getIcon(UIConst.SHOUCHONG);
				if (iconSC && iconSC.parent) {
					this.scTip = VSCTip.createInstance();
					this.scTip.showPanel();
					iconSC.parent.addChild(this.scTip);
					this.scTip.x = iconSC.x + 65;
					this.scTip.y = iconSC.y + 30;
					const pic = JSON.parse(Config.xsc_731[4].zuo)[0][1];
					this.scTip.getChild("container").showPic(Enum_Path.PIC_URL + pic + ".png");
					this.scTip.addClickListener(() => { GGlobal.layerMgr.open(UIConst.SHOUCHONG) });
				}
			}
		} else {
			if (this.scTip) {
				this.scTip.parent.removeChild(this.scTip);
				this.scTip.hidePanel();
				this.scTip = null;
			}
		}
		this.visOnChange();
	}
	private visOnChange() {
		const self = this;
		if (self.scTip) {
			self.scTip.visible = GGlobal.sceneType == SceneCtrl.GUANQIA && !GGlobal.modelGuanQia.inGuanQiaBoss();
			GGlobal.control.listen(Enum_MsgType.SCENE_CHANGE, onSceneChange, self);
		} else {
			GGlobal.control.remove(Enum_MsgType.SCENE_CHANGE, onSceneChange, self);
		}
		function onSceneChange() {
			if (self.scTip) {
				self.scTip.visible = GGlobal.sceneType == SceneCtrl.GUANQIA && !GGlobal.modelGuanQia.inGuanQiaBoss();
			}
		}
	}
}