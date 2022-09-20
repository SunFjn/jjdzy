class ModelArpgMap extends BaseModel {
	private static _instant: ModelArpgMap;
	public static getInstance(): ModelArpgMap {
		if (!this._instant) {
			this._instant = new ModelArpgMap();
			ARPGSceneController.registerManager();
			this._instant.listenServ(GGlobal.socketMgr);
		}
		return this._instant;
	}

	static hero: Vo_ArpgPlayer;
	static needShowTarPoint;
	static sceneReady = false;
	static touchPoint: egret.Point = new egret.Point();
	static constlockLength = 10000;
	static constlockLengAdd = 5000;
	static MAPBLOCKW = 256;
	static MAPBLOCKH = 256;


	static myCamp = 0;
	/**当前场景ID*/_sceneMap;
	set sceneMap(v){
		RESManager.recordMapInvild(this._sceneMap, 0);
		this._sceneMap=v;
		RESManager.recordMapInvild(v, 1);
	}
	get sceneMap(){
		return this._sceneMap;
	}
	/**当前场景 资源目录*/sceneMapSRC;
	/**当前场景 type*/sceneType;
	isServerControlMap = true;//是否是由后端控制场景切换
	/**是否真实离开活动场景：true 离开通知后端将人物从活动地图移除 false：执行系统的逻辑，进入战斗等，活动场景依然存在自己的模型*/
	isAutoExite = true;
	/**跳转地图*/targetSceneId; toX; toY;
	public mapCfg() {
		return Config.map_200;
	}

	public static playerMap: any = {};
	public static getPlayerData(id: number): Vo_ArpgPlayer {
		if (!ModelArpgMap.playerMap[id]) {
			var vo_player: Vo_ArpgPlayer = Vo_ArpgPlayer.create();
			vo_player.id = id;
			ModelArpgMap.addPlayerData(vo_player);
		}
		return ModelArpgMap.playerMap[id];
	}
	public static count: number = 0;
	public static addPlayerData(vo: Vo_ArpgPlayer): void {
		if (!vo.id) return;
		if (!ModelArpgMap.playerMap[vo.id]) {
			ModelArpgMap.count++;
		}
		ModelArpgMap.playerMap[vo.id] = vo;
	}

	public createMyCharData() {
		let vo = Vo_ArpgPlayer.create();
		let mine = Model_player.voMine;
		vo.id = mine.id;
		vo.jiangXian = mine.jiangXian;
		vo.title = mine.title;
		vo.viplv = mine.viplv;
		vo.job = mine.job;
		vo.country = mine.country;
		vo.name = mine.name;
		vo.level = mine.level;
		vo.body = mine.getBody();
		vo.weapon = mine.weapon;
		vo.speed = mine.speed;
		vo.dir = 1;
		vo.godWeapon = mine.godWeapon;
		vo.setShouHun(mine.shouHun);
		vo.setHorseId(mine.horseId)
		ModelArpgMap.hero = vo;
		ModelArpgMap.playerMap[vo.id] = vo;
	}

	public exiteARPG() {
		let s = this;
		if (s.isAutoExite) {
			s.isCross = false;
			s.CG_EXITE_ARPG();
		}
		ARPGSceneController.exite();
		s.sceneMap = 0;
		s.toX = 0;
		s.toY = 0;
		s.targetSceneId = 0;
		ModelArpgMap.sceneReady = false;
		ModelArpgMap.playerMap = {};
	}

	//通知后端将玩家从场景移除
	public exiteScene() {
		let s = this;
		s.isCross = false;
		s.CG_EXITE_ARPG();
	}

	public constructor() {
		super();
	}


	public CG_ENTER_SCENE(id) {
		var ba = this.getBytes();
		ba.writeInt(id);
		this.sendSocket(3901, ba);
	}

	public CG_ENTER_SCENE_OK() {
		var ba = this.getBytes();
		this.sendSocket(3903, ba);
	}

	public CG_CHANGE_SCENE_OK() {
		var ba = this.getBytes();
		this.sendSocket(3905, ba);
	}
	//3907 移动 [S:xS:yB:走？跳]坐标点集合
	public CG_MOVE(route: Array<any>): void {
		var ba = this.getBytes();
		var len = route[0].length;
		ba.writeShort(len);
		for (let i = 0; i < len; i++) {
			ba.writeShort(route[0][i][0]);
			ba.writeShort(route[0][i][1]);
			ba.writeByte(route[0][i][2]);
		}
		this.sendSocket(3907, ba);
	}

	//3909 	移动完毕 S:endXS:endY
	public CG_STOP_MOVE(x: number, y: number): void {
		var ba = this.getBytes();
		ba.writeShort(x);
		ba.writeShort(y);
		this.sendSocket(3909, ba);
	}

	//3911 	坐标同步 S:X坐标S:Y坐标
	public CG_POINT(x: number, y: number): void {
		var ba = this.getBytes();
		ba.writeShort(x);
		ba.writeShort(y);
		this.sendSocket(3911, ba);
	}

	//3913 	路径同步 [S:xS:y]坐标点集合
	public CG_PATH(route: Array<any>): void {
		var ba = this.getBytes();
		ba.writeShort(route.length);
		for (let i = 0; i < route.length; i++) {
			ba.writeShort(route[i][0][0]);
			ba.writeShort(route[i][0][1]);
		}
		this.sendSocket(3913, ba);
	}

	public CG_EXITE_ARPG(): void {
		var ba = this.getBytes();
		this.sendSocket(3919, ba);
	}

	public listenServ(wsm: WebSocketMgr) {
		super.listenServ(wsm);
		wsm.regHand(3902, this.GC_ENTER_SCENE, this);
		wsm.regHand(3904, this.GC_ADD_PLAYER, this);
		wsm.regHand(3906, this.GC_DEL_ROLE, this);
		wsm.regHand(3908, this.GC_MOVE, this);
		wsm.regHand(3910, this.GC_STOP_GO, this);
		wsm.regHand(3914, this.GC_SETPLAYER_POS, this);
		wsm.regHand(3918, this.GC_ADD_NPC, this);
		wsm.regHand(3916, this.GC_PLAYER_DATA_UPDATE, this);
	}

	//3902 进入场景 B:结果 1：成功 2：体力不足，3：组队状态下队员不能跳转地图I:场景IDS:坐标XS:坐标Y
	protected GC_ENTER_SCENE(self: ModelArpgMap, ba: BaseBytes) {
		let result = ba.readByte();
		if (result == 1) {
			let sceneId: number = ba.readInt();
			let posX: number = ba.readShort();
			let posY: number = ba.readShort();
			self.sceneMap = sceneId;
			let cfg = self.mapCfg();
			var map: Imap_200 = cfg[sceneId];
			self.sceneMapSRC = map.s;
			self.sceneType = map.severtype;
			ARPGSceneController.enter();
			self.sceneMap = sceneId;
			GameUnitManager.hero.setXY(posX, posY);
			GameUnitManager.hero.isOnJumpPoint = false;
			let url = "";
			GameUnitManager.removePlayerNpc();
			ArpgMap.getInstance().disposeByChangeScene();
			let mapDes = map.name;
			GGlobal.layerMgr.open(UIConst.ARPG_SCENEVIEW, mapDes);
			url = RESManager.getVersionUrl("resource/map/" + map.s + "/clientSceneFile.bin");
			RES.getResByUrl(url, self.onMapLoadComplete, self, RES.ResourceItem.TYPE_BIN);
			SoundManager.getInstance().playBGM(map.b);
		}
	}

	public onMapLoadComplete(bytebuffer: ArrayBuffer): void {
		// ViewSmallMap.instance.refresh();
		var byte: egret.ByteArray = new egret.ByteArray(bytebuffer);
		MapManager.onMapCfgLoadComplete(byte);
		MapManager.decode();
		ModelArpgMap.sceneReady = true;
		GGlobal.layerMgr.close2(UIConst.ARPG_SCENEVIEW);
		SceneManager.showScene();
		ModelArpgMap.getInstance().CG_CHANGE_SCENE_OK();

		//问鼎天下和BOSS战场历史原因不做兼容
		// let cfg = this.mapCfg();
		// var map: Imap_200 = cfg[this.sceneMap];
		// let mapType = map.severtype;
		// if (
		// 	GGlobal.sceneType != SceneCtrl.ARPG
		// 	&& mapType == EnumMapType.WDTX
		// 	&& mapType == EnumMapType.BOSSZC_CROSS
		// 	&& mapType == EnumMapType.BOSSZC_LOCAL
		// ) {

		GGlobal.control.notify(Enum_MsgType.ARPG_SCENE_READY);
	}

	/**3916 	广播玩家最新状态，例如移动速度,挂机状态，称号，时装 U:，key为属性，value为属性值 */
	protected GC_PLAYER_DATA_UPDATE(self: ModelArpgMap, ba: BaseBytes): void {
		var content: string = ba.readUTF();
		var info = JSON.parse(content);
		let id = info[Enum_Attribute.ID];
		if (!GameUnitManager.hero || id != GameUnitManager.hero.id)
			var player: ArpgPlayer = GameUnitManager.findUnit(id, UnitType.PLAYER) as ArpgPlayer;
		else {
			player = GameUnitManager.hero;
		}

		if (!player)
			return;
		player.id = id;
		self.updatePlayerInfo(player, info);
	}

	//3904 	GC 添加玩家
	protected GC_ADD_PLAYER(self: ModelArpgMap, ba: BaseBytes): void {
		if (!ModelArpgMap.sceneReady) return;
		var info = LMessageFormat.instance.read(ba)
		var player: ArpgRole = GameUnitManager.findUnit(info[Enum_Attribute.ID], UnitType.PLAYER) as ArpgPlayer;
		if (!player)
			player = GameUnitManager.getUnit(UnitType.PLAYER) as ArpgPlayer;
		var vo: Vo_ArpgPlayer = ModelArpgMap.getPlayerData(info[Enum_Attribute.ID]);
		vo.id = info[Enum_Attribute.ID];
		vo.name = info[Enum_Attribute.PLAYER_NAME];

		vo.speed = info[Enum_Attribute.SPEED];
		vo.godWeapon = info[Enum_Attribute.PLAYER_WEAPON]
		vo.setWeapon(info[Enum_Attribute.PLAYER_BODY]);
		vo.setBody(info[Enum_Attribute.PLAYER_BODY]);
		vo.setShouHun(info[Enum_Attribute.SHOUHUN]);
		vo.viplv = info[Enum_Attribute.VIP];
		vo.state = info[Enum_Attribute.STATE];
		vo.route = JSON.parse(info[Enum_Attribute.ROUTE]);
		vo.level = info[Enum_Attribute.LEVEL];
		vo.zs = info[Enum_Attribute.ZS];
		vo.tongbi = info[Enum_Attribute.TONGBI];
		vo.yuanbao = info[Enum_Attribute.YUANBAO];
		vo.system_id = info[Enum_Attribute.SYSTEM_ID];
		vo.type = info[Enum_Attribute.TYPE];
		vo.title = info[Enum_Attribute.TITLES];
		vo.hp = info[Enum_Attribute.CUR_HP];
		vo.maxHp = info[Enum_Attribute.MAX_HP];
		vo.setHorseId(info[Enum_Attribute.HORSE]);

		let x = info[Enum_Attribute.GLOBAL_X];
		let y = info[Enum_Attribute.GLOBAL_Y];
		let dir = info[Enum_Attribute.PLAYER_DIR];
		let camp = info[Enum_Attribute.CAMP] ? info[Enum_Attribute.CAMP] : 0;
		player.initData(vo);
		player.setXY(x, y, true);
		player.setDir(dir);
		player.camp = camp;

		GameUnitManager.addUnit(player);
		var namebar = ArpgPlayerNamePlug.create();
		namebar.role = player;
		player.addSinglePlug(namebar, ArpgPlayerNamePlug);
		namebar.updateNameColor();

		ModelArpgMap.getInstance().notify(Enum_MsgType.ARPG_SCENE_ADD_PLAYER, vo.id);
	}

	private updatePlayerInfo(player: ArpgRole, info: any): void {
		var vo: Vo_ArpgPlayer = ModelArpgMap.getPlayerData(player.id);
		if (vo.isMineID()) {
			var isHero: boolean = true;
		}
		for (var key in info) {
			switch (key) {
				case Enum_Attribute.SPEED:
					player.speed = info[key];
					break;
				case Enum_Attribute.LEVEL:
					vo.level = info[key];
					break;
				case Enum_Attribute.TITLES:
					vo.title = info[key];
					player.setTitle(info[key]);
					break

				case Enum_Attribute.PLAYER_BODY:
					vo.body = info[key];
					vo.weapon = info[key];
					player.setBody(info[key]);
					player.setWeapon(info[key]);
					break;
				case Enum_Attribute.PLAYER_DIR:
					vo.dir = info[key];
					player.setDir(vo.dir);
					break;
				case Enum_Attribute.PLAYER_WEAPON://神兵武器
					vo.godWeapon = info[key];
					player.setGodWeapon(info[key]);
					break;
				case Enum_Attribute.PLAYER_NAME:
					vo.name = info[key];
					player.setName(info[key]);
					break;
				case Enum_Attribute.VIP:
					vo.viplv = info[key];
					break;
				case Enum_Attribute.CUR_HP:
					vo.setHp(info[key]);
					break;
				case Enum_Attribute.MAX_HP:
					vo.maxHp = info[key];
					break;
				case Enum_Attribute.CAMP:
					player.camp = info[key];
					//刷新后端的数据 后端无法实现实时顺序更新阵营
					if (isHero) GameUnitManager.refreshName();
					break;
			}
		}
	}

	//3906 	删除显示对象 L:ID B:类型
	protected GC_DEL_ROLE(self: ModelArpgMap, ba: BaseBytes): void {
		let id: number = ba.readLong();
		let type: number = ba.readByte();
		var hero: ArpgRole = GameUnitManager.hero;
		var unit: ISceneObject = GameUnitManager.findUnit(id, type);

		if (!unit || Model_player.isMineID(unit.id)) {//切换ctr时候再移除自己。
			return;
		}
		if (unit == GameUnitManager.hero.target)
			GameUnitManager.hero.target = null;

		GameUnitManager.removeUnit(unit);
		if (type == UnitType.PLAYER)
			self.notify(Enum_MsgType.ARPG_SCENE_REMOVE_PLAYER, id);
		else if (type == UnitType.NPC)
			self.notify(Enum_MsgType.ARPG_SCENE_REMOVE_NPC, id);
	}
	//禁用移动
	public static moveEnable = true;
	//3908 移动 L:idB:类型[S:坐标XS:坐标YB:走?跳]坐标
	protected GC_MOVE(self: ModelArpgMap, ba: BaseBytes): void {
		if (ModelArpgMap.hero == null) return;
		var heroid: number = ModelArpgMap.hero.id;
		var id: number = ba.readLong();
		var type: number = ba.readByte();
		if (heroid != id) {
			var role: ArpgRole = GameUnitManager.findUnit(id, type) as ArpgRole;
		} else {
			role = GameUnitManager.hero;
		}
		if (!role) return;

		var r: Array<any> = [];
		for (let i = 0, len = ba.readShort(); i < len; i++) {
			let posX: number = ba.readShort();
			let posY: number = ba.readShort();
			let posType: number = ba.readByte();
			r.push([posX, posY, posType]);
		}
		let fuc: Handler = ModelArpgMap._moveHandle[ARPGMapManager.currentSystem]
		if (fuc) {
			fuc.runWith({ role: role, r: r });
			return;
		}
		role.setRoute(r);
	}

	private static _moveHandle: any = {}
	public static registerMoveBack(uiconst, hd: Handler) {
		ModelArpgMap._moveHandle[uiconst] = hd
	}

	public static removeMoveBack(uiconst) {
		ModelArpgMap._moveHandle[uiconst] = null
	}

	//3910 停止移动 L:IDS:XS:YB:类型 1：人 2：非战斗NPC，3：战斗NPC
	protected GC_STOP_GO(self: ModelArpgMap, ba: BaseBytes): void {
		var role: ArpgRole;
		var id: number = ba.readLong();
		var x: number = ba.readShort();
		var y: number = ba.readShort();
		var type: number = ba.readByte();
		if (id == Model_player.voMine.id) {
			role = GameUnitManager.hero;
		} else {
			role = GameUnitManager.findUnit(id, type) as ArpgRole;
		}
		if (!role) return;
		var subx: number = x - role.x;
		var suby: number = y - role.y;
		if (subx >= 200 || subx <= -200 || suby >= 150 || suby <= -150) {
			role.setXY(x, y, true);
		}
		role.stopGo();
	}

	//重新设置自己的坐标点
	public GC_SETPLAYER_POS(self: ModelArpgMap, ba: BaseBytes) {
		let role = GameUnitManager.hero;
		role && role.setXY(ba.readInt(), ba.readInt());
	}

	//3918 X
	protected GC_ADD_NPC(self: ModelArpgMap, ba: BaseBytes): void {
		if (!ModelArpgMap.sceneReady) return;
		var npcInfo = LMessageFormat.instance.read(ba)
		var id: number = npcInfo[Enum_Attribute.ID];
		var sId: number = npcInfo[Enum_Attribute.SYSTEM_ID];
		var posX: number = npcInfo[Enum_Attribute.GLOBAL_X];
		var posY: number = npcInfo[Enum_Attribute.GLOBAL_Y];
		var route = npcInfo[Enum_Attribute.ROUTE];
		var state: number = npcInfo[Enum_Attribute.STATE];

		var herodata: Vo_ArpgPlayer = ModelArpgMap.hero;
		var npc: ARPGNpc = GameUnitManager.findUnit(id, UnitType.NPC) as ARPGNpc;
		if (!npc) {
			npc = GameUnitManager.getUnit(UnitType.NPC) as ARPGNpc;
		}
		npc.init1(id, sId, posX, posY);
		GameUnitManager.addUnit(npc);

		if (npc)
			GGlobal.control.notify(Enum_MsgType.ARPG_SCENE_ADD_NPC, id);
	}

	//某些跨服活动要求是走跨服协议
	public isCross = false;
	public sendSocket(cmd, ba: BaseBytes) {
		if (!this.socket.webSocket.connect) {
			return;
		}
		this.socket.sendCMDBytes(cmd, ba, this.isCross);
	}

}