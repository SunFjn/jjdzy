class GameUnitManager {
	public constructor() {
	}

	public static initData(): void {
		GameUnitManager.hero = new ARPGHero();
		GameUnitManager.hero.id = Model_player.voMine.id;
	}
	public static hero: ARPGHero;
	public static list: Array<any> = [];
	private static len: number;
	private static count: number;

	public static moveTargetPoint: MoveTargetPoint;
	public static overObj: ISceneObject;
	public static hideSceneEffInt: number = 0;//隐藏场景特效
	public static BIT_OPTION: number = 1;

	public static init(): void {
		let hero = GameUnitManager.hero;
		hero.initData(ModelArpgMap.hero);
		GameUnitManager.addUnit(hero);
		var namebar = ArpgPlayerNamePlug.create();
		namebar.role = hero;
		hero.addSinglePlug(namebar, ArpgPlayerNamePlug);
		ModelArpgMap.getInstance().notify(Enum_MsgType.ARPG_SCENE_ADD_PLAYER, hero.id);
		// GameUnitManager.moveTargetPoint = new MoveTargetPoint();
		// GameUnitManager.addUnit(GameUnitManager.moveTargetPoint);
	}

	private static lastUpdateTime: number = 0;
	private static lastRenderTime: number = 0;
	private static lastCheckOvertime: number = 0;
	public static sortTime = 0;
	public static run(ctx): void {
		let self = this;
		var list = self.list;
		var len = self.list.length;
		var cleanflag;
		self.sortTime += ctx.dt;
		ctx.logicTime = self.sortTime >= 179;
		for (var i = 0; i < len;) {
			var term: ISceneObject = self.list[i];
			if (!term) {
				i++;
				cleanflag = 1;
				continue;
			}
			ctx.d = null;
			term.update(ctx);
			if (ctx.d) {
				delete self.list[term.id];
				list[i] = null;
				term.onRemove();
				len--;
			} else {
				i++;
			}
		}

		if (cleanflag) {
			ArrayUitl.cleannull(self.list);
		}

		self.sortTime += ctx.dt;
		if (ctx.logicTime) {
			SceneManager.sortChild();
			self.sortTime = 0;
		}
	}

	private static getObjectUnderPoint(point: egret.Point): ArpgRole | any {
		for (let key in ARPGNpc.list) {
			var npc: ARPGNpc = ARPGNpc.list[key];
			if (npc && npc.view.hitTestPoint(point.x, point.y, true)) {
				return npc;
			}
		}

		for (let key in ArpgPlayer.list) {
			var player: ArpgRole = ArpgPlayer.list[key];
			if (player.view.hitTestPoint(point.x, point.y, true)) {
				return player;
			}
		}

		for (let key in Door.list) {
			var door: Door = Door.list[key];
			if (door.view.hitTestPoint(point.x, point.y)) {
				return door;
			}
		}
		return null;
	}

	public static updatePlayerColorName() {
		for (let key in ArpgPlayer.list) {
			var player: ArpgRole = ArpgPlayer.list[key];
			let plug = player.getPlugBytype(ArpgPlayerNamePlug);
			if (plug) {
				plug.updateNameColor();
			}
		}
	}

	public static getPlayerListUnderPoint(point: egret.Point): Array<ArpgPlayer> {
		let arr: Array<ArpgPlayer> = [];
		for (let key in ArpgPlayer.list) {
			var player: ArpgPlayer = ArpgPlayer.list[key];
			if (player.view.hitTestPoint(point.x, point.y)) {
				arr.push(player)
			}
		}
		return arr;
	}

	public static addUnit(unit: ISceneObject, layer: number = 1): void {
		for (let i = 0; i < GameUnitManager.list.length; i++) {
			if (unit.id == GameUnitManager.list[i].id) {
				return;
			}
		}
		unit.onAdd();
		GameUnitManager.list.push(unit);

		if (GameUnitManager.list.length > 200) {
			DEBUGWARING.log("场景动画过多！！！！");
		}
	}

	public static removeUnit(unit: ISceneObject): void {
		for (let i = 0; i < GameUnitManager.list.length; i++) {
			if (unit.id == GameUnitManager.list[i].id) {
				GameUnitManager.list.splice(i, 1);
				unit.onRemove();
				break;
			}
		}
	}

	public static findUnit(unitId: any, type: number): ArpgRole {
		if (Model_player.isMineID(unitId)) {
			return this.hero;
		}
		switch (type) {
			case UnitType.PLAYER:
				return ArpgPlayer.list[unitId];
			case UnitType.NPC:
			case UnitType.MONSTER:
				return ARPGNpc.getNPC(unitId);
			default:
				return null;
		}
	}

	public static findHeroOrPlayer(id: number): ArpgRole {
		if (id == Model_player.voMine.id) {
			var ret: ArpgRole = GameUnitManager.hero as ArpgRole;
		} else {
			ret = GameUnitManager.findUnit(id, UnitType.PLAYER) as ArpgRole;
		}
		return ret;
	}

	public static findUnitByID(id) {
		for (var i: number = GameUnitManager.list.length - 1; i >= 0; i--) {
			if (GameUnitManager.list[i].id == id) {
				return GameUnitManager.list[i];
			}
		}
		return null;
	}

	public static getUnit(type: number): ArpgRole {
		switch (type) {
			case UnitType.PLAYER:
				return Pool.getItemByClass("ArpgPlayer", ArpgPlayer);
			case UnitType.NPC:
				return Pool.getItemByClass("ARPGNpc", ARPGNpc);
			default:
				return null;
		}
	}

	/**
	 * 同场景切换坐标要先删除玩家NPC，不然会越来越多
	 */
	public static removePlayerNpc(): void {
		for (var i: number = GameUnitManager.list.length - 1; i >= 0; i--) {
			var u: ArpgRole = GameUnitManager.list[i];
			if (u && u.isHero() == false) {
				GameUnitManager.removeUnit(u);
			}
		}
	}

	public static checkUnit(): string {
		var ret: string = '';
		var roleNum: number;
		for (var i: number = GameUnitManager.list.length - 1; i >= 0; i--) {
			if (GameUnitManager.list[i] instanceof SceneObject) {
				roleNum++;
			}
		}
		return ret;
	}

	public static setSceneEffOption(v: boolean): void {
		var reason: number = GameUnitManager.BIT_OPTION;
		if (v) {
			var temp: number = GameUnitManager.hideSceneEffInt & reason;
			GameUnitManager.hideSceneEffInt = GameUnitManager.hideSceneEffInt ^ temp;
		} else {
			GameUnitManager.hideSceneEffInt = GameUnitManager.hideSceneEffInt | reason;
		}

		for (var key in Magic.list) {
			var eff = Magic.list[key];
			if (eff.type == UnitType.MAGIC) {
				eff.visible = v;
			}
		}
	}

	public static dispose(): void {
		while (GameUnitManager.list.length > 0) {
			GameUnitManager.removeUnit(GameUnitManager.list[0]);
		}
		ArpgPlayer.list = {};
		ARPGNpc.list = {};
	}


	public static getOverObj(): void {
		ModelArpgMap.touchPoint.x = fairygui.GRoot.mouseX;
		ModelArpgMap.touchPoint.y = fairygui.GRoot.mouseY;
		var ret: ArpgRole = GameUnitManager.getObjectUnderPoint(ModelArpgMap.touchPoint);
		GameUnitManager.overObj = ret;
	}

	public static isMyCamp(camp) {
		if (GameUnitManager.hero && GameUnitManager.hero.camp == camp) {
			return true;
		}
		return false;
	}

	public static refreshName() {
		for (var i: number = GameUnitManager.list.length - 1; i >= 0; i--) {
			let item = GameUnitManager.list[i]
			if (item instanceof ArpgPlayer) {
				item.refreshName();
			}
		}
	}

	public static hideFilter() {
		for (var i: number = GameUnitManager.list.length - 1; i >= 0; i--) {
			let item = GameUnitManager.list[i]
			if (item instanceof ArpgRole) {
				item.hideFilter();
			}
		}
	}
}