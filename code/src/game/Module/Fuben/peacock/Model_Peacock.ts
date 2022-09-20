class Model_Peacock extends BaseModel {
	/**打开铜雀台ui */
	public CG_OPENUI(): void {
		var bates = this.getBytes();
		this.sendSocket(1221, bates);
	}

	/**获取某一双倍关卡的通过人数 I:关卡id */
	public CG_GETNUM(gateId: number): void {
		var bates = this.getBytes();
		bates.writeInt(gateId)
		this.sendSocket(1223, bates);
	}

	/**获取某关卡的双倍奖励 I:层数 */
	public CG_GETREWARD(gateId: number): void {
		var bates = this.getBytes();
		bates.writeInt(gateId)
		this.sendSocket(1225, bates);
	}

	/**爬塔 */
	public CG_UPTOWER(): void {
		var bates = this.getBytes();
		this.sendSocket(1227, bates);
	}

	/**请求本关卡奖励*/
	public CG_BEATBOSSWIN(): void {
		var bates = this.getBytes();
		this.sendSocket(1229, bates);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(1222, this.GC_OPENUI, this);
		mgr.regHand(1224, this.GC_GETNUM, this);
		mgr.regHand(1226, this.GC_GETREWARD, this);
		mgr.regHand(1228, this.GC_UPPOWER, this);
		mgr.regHand(1230, this.GC_DROPDATA, this);
	}

	public static curLayer: number = 0;//已通过
	public static maxLayer: number = 0;
	public static maxName: string = "";
	public static maxHead: number = 0;
	public static maxFrame: number = 0;
	
	public static ultimateName: string = "";
	public static ultimatePower: number = 0;
	public static rewPeopleObj: any = {};//已经通关的人数
	public static rewLayerArr: number[] = [];//可以领奖的层数
	//战斗层
	public static battleLayer;
	public static battleRes;
	public static dropLayer: number = 0;
	public static dropArr: Array<any> = [];


	//打开铜雀台ui I:当前层数（已通过）I:最高层U:最高层姓名U:极限通关者L:极限通关者战力[I:那些层数奖励没有领取B:已经通关的人数]
	public GC_OPENUI(self: Model_Peacock, data: BaseBytes): void {
		Model_Peacock.curLayer = data.readInt();
		Model_Peacock.maxLayer = data.readInt();
		Model_Peacock.maxName = data.readUTF();
		Model_Peacock.maxHead = data.readInt();
		Model_Peacock.maxFrame= data.readInt();
		var len = data.readShort();
		Model_Peacock.rewLayerArr = [];
		for (let i = 0; i < len; i++) {
			let layer = data.readInt();
			let people = data.readByte();
			Model_Peacock.rewLayerArr.push(layer)
			Model_Peacock.rewPeopleObj[layer] = people;
		}
		Model_Peacock.rewLayerArr.sort(function (a, b) { return a - b });
		GGlobal.control.notify(Enum_MsgType.PEACOCK_OPENUI)
		GGlobal.control.notify(Enum_MsgType.REBIRTH_UPDATE)
	}


	//GC 通过人数 I:关卡idB:通过人数
	public GC_GETNUM(self: Model_Peacock, data: BaseBytes): void {
		var layer = data.readInt();
		var num = data.readByte();
		Model_Peacock.rewPeopleObj[layer] = num
		GGlobal.control.notify(Enum_MsgType.PEACOCK_PASSLAYER_NUM)
	}

	//GC 获取某关卡双倍奖励 B:0成功 1失败I:关卡数
	public GC_GETREWARD(self: Model_Peacock, data: BaseBytes): void {
		var reslut = data.readByte();
		if (reslut == 0) {
			var layer = data.readInt();
			var i = Model_Peacock.rewLayerArr.indexOf(layer)
			Model_Peacock.rewLayerArr.splice(i, 1);
			GGlobal.control.notify(Enum_MsgType.PEACOCK_PASSLAYER_NUM)
			ViewCommonWarn.text("领取成功", 0xffffff);
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}


	//GC 爬塔返回 B:0成功 1失败 2背包已满I:当前击败关卡idB:  0:失败，1：成功，2：由前端结果决定
	public GC_UPPOWER(self: Model_Peacock, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 0) {
			Model_Peacock.battleLayer = data.readInt();
			Model_Peacock.battleRes = data.readByte() + 1;
			if (Model_Peacock.battleRes > 2) {
				Model_Peacock.battleRes = 0;
			}
			GGlobal.layerMgr.close2(UIConst.FUBEN);
			GGlobal.mapscene.enterScene(SceneCtrl.PEACOCK);
		} else if (result == 1) {
			ViewCommonWarn.text("失败")
		} else if (result == 2) {
			ViewCommonWarn.text("背包空间不足")
		} else {
			ViewCommonWarn.text("失败")
		}
	}


	//GC boss掉落 I:铜雀台关卡id[B:类型I:系统idI:数量]
	public GC_DROPDATA(self: Model_Peacock, data: BaseBytes): void {
		Model_Peacock.dropLayer = data.readInt();
		Model_Peacock.dropArr = []
		var len = data.readShort();
		for (let i = 0; i < len; i++) {
			Model_Peacock.dropArr.push([data.readByte(), data.readInt(), data.readInt()]);
		}
		GGlobal.control.notify(Enum_MsgType.PEACOCK_BATTLE_DROP)
	}


	private static _towerArr: Array<Itower_219>;
	public static get towerArr(): Array<Itower_219> {
		if (Model_Peacock._towerArr == null) {
			Model_Peacock._towerArr = [];
			for (let keys in Config.tower_219) {
				Model_Peacock._towerArr.push(Config.tower_219[keys])
			}
		}
		return Model_Peacock._towerArr
	}

	public static getRewardLayer(): number {
		var curLayer = Model_Peacock.curLayer + 1;
		//小奖
		var layerReward1 = 0;
		if (Model_Peacock.rewLayerArr.length > 0) {
			layerReward1 = Model_Peacock.rewLayerArr[0]
		} else {
			for (let i = curLayer - 1; i < Model_Peacock.towerArr.length; i++) {
				let tower = Model_Peacock.towerArr[i];
				if (tower.reward1 != "0") {
					layerReward1 = tower.id
					break;
				}
			}
		}
		return layerReward1
	}


	public static checkNotice():boolean{
		//小奖
		var layerReward = 99999;
		var curLayer = Model_Peacock.curLayer + 1;
		if (Model_Peacock.rewLayerArr.length > 0) {
			layerReward = Model_Peacock.rewLayerArr[0]
		} else {
			for (let i = curLayer - 1; i < Model_Peacock.towerArr.length; i++) {
				let tower = Model_Peacock.towerArr[i];
				if (tower.reward1 != "0") {
					layerReward = tower.id
					break;
				}
			}
		}
		return Model_Peacock.curLayer >= layerReward
	}

	public static getBatBigRewad():Itower_219{
		var curLayer = Model_Peacock.battleLayer;//向后找
		var bigReward = ""
		for (let i = curLayer - 1; i < Model_Peacock.towerArr.length; i++) {
			let tower = Model_Peacock.towerArr[i];
			if (tower.reward != "0") {
				return tower
			}
		}
		return null
	}
}


