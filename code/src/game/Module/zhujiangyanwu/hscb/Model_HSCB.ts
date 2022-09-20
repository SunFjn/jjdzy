class Model_HSCB extends BaseModel {

	public static msg_openui = "msg_openui"
	public static msg_battle = "msg_battle"
	public static msg_bat_rew = "msg_bat_rew"

	public listenServ(wsm: WebSocketMgr) {
		super.listenServ(wsm);
		wsm.regHand(7932, this.GC_OPENUI_7932, this);
		wsm.regHand(7934, this.GC_UPLAYER_7934, this);
		wsm.regHand(7936, this.GC_BAT_REW_7936, this);
	}

	public curLayer: number = 0;
	//第一名
	public firLayer: number;
	public firName: string
	public firHead: number
	public firFrame: number;
	//战斗
	batLayer: number;
	batRes: number;
	batDrop: any[];

	public CG_OPENUI_7931() {
		const bytes = this.getBytes();
		this.sendSocket(7931, bytes);
	}

	//爬塔
	public CG_UPLAYER_7933() {
		const bytes = this.getBytes();
		this.sendSocket(7933, bytes);
	}

	//战斗结束奖励
	public CG_BAT_REW_7935() {
		const bytes = this.getBytes();
		this.sendSocket(7935, bytes);
	}
	//打开界面 I:当前关数（已通关）I:最高关数（第一名）U:最高关数名字（第一名）I:最高关数头像（第一名）I:最高关数头像框（第一名）
	private GC_OPENUI_7932(self: Model_HSCB, bytes: BaseBytes) {
		self.curLayer = bytes.readInt();
		self.firLayer = bytes.readInt();
		self.firName = bytes.readUTF();
		self.firHead = bytes.readInt();
		self.firFrame = bytes.readInt();
		self.notify(Model_HSCB.msg_openui);
	}
	//爬塔 B:0成功 1失败 I:当前击败关卡B:战斗结果 0失败 1成功 2由前端决定结果
	private GC_UPLAYER_7934(self: Model_HSCB, bytes: BaseBytes) {
		let res = bytes.readByte();
		if (res == 0) {
			self.batLayer = bytes.readInt();
			self.batRes = bytes.readByte() + 1;
			if (self.batRes > 2) {
				self.batRes = 0;
			}
			GGlobal.layerMgr.close2(UIConst.CHILDZJYW);
			GGlobal.mapscene.enterScene(SceneCtrl.HSCB);
		} else {
			ViewCommonWarn.text("挑战失败")
		}
		self.notify(Model_HSCB.msg_battle);
	}
	//请求本人关卡奖励 I:挑战关卡[B:类型I:系统I:数量]boss掉落
	private GC_BAT_REW_7936(self: Model_HSCB, bytes: BaseBytes) {
		let layer = bytes.readInt();
		let len = bytes.readShort();
		self.batDrop = [];
		for (let i = 0; i < len; i++) {
			self.batDrop.push([bytes.readByte(), bytes.readInt(), bytes.readInt()])
		}
		self.notify(Model_HSCB.msg_bat_rew);
	}

	public getBigRewCfg(curLayer): Ihscb_751 {
		//大奖
		let maxLay = curLayer;
		let maxCfg: Ihscb_751 = null
		while (true) {
			let cfg = Config.hscb_751[maxLay]
			if (!cfg) {//最大
				break;
			}
			if (cfg.dj != "0") {
				maxCfg = cfg
				break;
			}
			maxLay++
		}
		if (maxCfg == null) {
			maxLay = curLayer - 1;
			while (true) {
				let cfg = Config.hscb_751[maxLay]
				if (!cfg) {
					break;
				}
				if (cfg.dj != "0") {
					maxCfg = cfg
					break;
				}
				maxLay--
			}
		}
		return maxCfg
	}

}