class Model_LuckTurn extends BaseModel {
	public constructor() {
		super();
	}

	static OPENUI = 'openui'
	static TURN = 'turn'
	static TARGET = 'target'

	static isMoive = false

	public turnTenCt() {
		let m = this;
		if (Model_player.voMine.yuanbao < m.ybTen) {
			ModelChongZhi.guideToRecharge()
			return;
		}
		let max = ConfigHelp.getSystemNum(7635)
		if (m.turnCt >= max) {
			ViewCommonWarn.text("今日翻牌次数已达上限");
			return;
		}
		if (m.turnCt + 10 > max) {
			ViewCommonWarn.text("今日翻牌次数不足10次");
			return;
		}
		if (Model_LuckTurn.isMoive) {
			ViewCommonWarn.text("请稍后")
			return;
		}
		if(!Model_LuckTurn.skipTween){
			Model_LuckTurn.isMoive = true;
		}
		m.CG_TURN_10341(30);
	}

	/**翻牌 B:10:随机翻牌(位置10，11，12)，20:必胜翻牌，30:十连胜*/
	public CG_TURN_10341(id: number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(id);
		this.sendSocket(10341, ba);
	}

	/**打开目标奖励界面   */
	public CG_TARGET_OPEN_10343() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(10343, ba);
	}

	public CG_TARGET_GET_10345(id) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(10345, ba);
	}

	cardArr: number[] = [];
	turnCt: number = 0;
	winCt: number = 0;

	static skipTween = false

	targetArr: { id: number, st: number }[] = [];

	public ybTen//10次
	public ybMust//必中
	public ybCost//普通

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let s = this;
		s.socket = wsm;
		wsm.regHand(10340, s.GC_OPENUI_10340, s);
		wsm.regHand(10342, s.GC_TURN_10342, s);
		wsm.regHand(10344, s.GC_TARGET_OPEN_10344, s);
		wsm.regHand(10346, s.GC_TARGET_GET_10346, s);
	}

	//打开界面返回 [B:位置，从0开始B:状态:-1未抽，1已抽中，2未抽中，3未抽中]翻牌列表I:翻牌次数I:累胜次数
	private GC_OPENUI_10340(s: Model_LuckTurn, data: BaseBytes) {
		let len = data.readShort();
		s.cardArr = [];
		for (let i = 0; i < len; i++) {
			let pos = data.readByte()
			let st = data.readByte()
			s.cardArr[pos] = st;
		}
		s.turnCt = data.readInt();
		s.winCt = data.readInt();
		s.notify(Model_LuckTurn.OPENUI);
		Model_LuckTurn.isMoive = false;
	}

	//翻牌返回 B:状态：1：已抽中(必胜翻牌和十连胜则为成功)，2：未抽中，3：未抽中，-1：今日翻牌次数已达上限，-2：元宝不足B:类型，同上[B:类型I:道具idI:数量B:是否大奖（1：是，0：否）]获得奖励
	private GC_TURN_10342(s: Model_LuckTurn, data: BaseBytes) {
		let res = data.readByte();
		let pos = data.readByte();
		if (res > 0) {
			let type;
			let idx
			if (pos == 30) {//10连 展示奖励
				type = 10
				idx = 30
				for (let i = 0; i < s.cardArr.length; i++) {
					s.cardArr[i] = 1;
				}
				s.turnCt += 10;
			} else if (pos == 20) {//必中 随机一个抽中
				let radArr = []
				for (let i = 0; i < s.cardArr.length; i++) {
					if (s.cardArr[i] == -1) {
						radArr.push(i);
					}
				}
				idx = RandomName.getRndStr(radArr)
				s.cardArr[idx] = 1;
				type = 1
				s.turnCt += 1;
			} else {
				idx = pos % 10
				s.cardArr[idx] = res;
				type = 0
				s.turnCt += 1;
			}
			let len = data.readShort();
			var dropArr: IGridImpl[] = [];
			for (let i = 0; i < len; i++) {
				let item = ConfigHelp.parseItemBa(data)
				item.extra = data.readByte() == 1 ? 5 : 0
				dropArr.push(item);
			}
			let dTime = Model_LuckTurn.skipTween ? 0 : 800;
			setTimeout(function () {
				GGlobal.layerMgr.open(UIConst.LUCK_TURN_PRIZE, [dropArr, type]);
				let arrGet = [];
				for (let i = 0; i < dropArr.length; i++) {
					let it = dropArr[i]
					if (it.gType == Enum_Attr.ITEM && it.quality > 5) {
						arrGet.push(it)
					}
				}
				if (arrGet) {
					ViewCommonPrompt.textItemList(arrGet);
				}
				//还原数据
				GGlobal.modelActivity.CG_OPENACT(UIConst.LUCK_TURN)
			}, dTime);
			if(!Model_LuckTurn.skipTween){
				s.notify(Model_LuckTurn.TURN, idx);
			}
		}
		else {
			Model_LuckTurn.isMoive = false;
			if (res == -1) {
				ViewCommonWarn.text("今日翻牌次数已达上限");
			} else if (res == -2) {
				ViewCommonWarn.text("元宝不足");
			} else {
				ViewCommonWarn.text("翻牌失败");
			}
		}

	}

	//打开目标奖励界面返回 [I:配置表idB:奖励状态，0:未达到，1:可领取，2:已领取]奖励状态列表
	private GC_TARGET_OPEN_10344(s: Model_LuckTurn, data: BaseBytes) {
		let len = data.readShort();
		s.targetArr = [];
		for (let i = 0; i < len; i++) {
			let v = { id: data.readInt(), st: data.readByte() }
			s.targetArr.push(v);
		}
		s.notify(Model_LuckTurn.TARGET);
		s.checkRed();
	}

	//领取目标奖励返回 B:领取状态，0:没有该奖励，1:成功，2:未达到条件，3:已领取I:领取的奖励id
	private GC_TARGET_GET_10346(s: Model_LuckTurn, data: BaseBytes) {
		let res = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			for (let i = 0; i < s.targetArr.length; i++) {
				let v = s.targetArr[i];
				if (v.id == id) {
					v.st = 2;
					break;
				}
			}
			s.notify(Model_LuckTurn.TARGET);
			s.checkRed();
		} else if (res == 0) {
			ViewCommonWarn.text("没有该奖励")
		} else if (res == 2) {
			ViewCommonWarn.text("未达到条件")
		} else if (res == 3) {
			ViewCommonWarn.text("已领取")
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}


	private checkRed() {
		let sf = GGlobal.reddot;
		sf.setCondition(UIConst.LUCK_TURN, 0, Model_LuckTurn.isVoNotice(this.targetArr));
		sf.notifyMsg(UIConst.LUCK_TURN);
	}

	public static isVoNotice(arr: Array<any>) {
		if (!arr) {
			return false;
		}
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].st == 1) {
				return true;
			}
		}
		return false;
	}
}