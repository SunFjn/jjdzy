class MapManager {
	public constructor() {
	}

	public static mapInfo: any = {}; //地图物件信息和格子信息

	private static list: egret.Bitmap[] = [];			//用于屏幕更新的地图块
	private static listPool: egret.Bitmap[] = [];		//多余块
	private static mapPool: any = {};		//地图资源缓存
	private static block_row: number; 		//用于屏幕显示更新需要的地图块数
	private static block_col: number;	//用于屏幕显示更新需要的地图块数
	private static len: number;	//当前屏幕已addchild地图块数量



	public static alphamapinfo: any = {};

	public static sceneEffectInfo: any = {};

	public static mapAreas: AreaBase[] = [];

	public static enablegroups: any = {};

	// 		/**	 * 场景元素，矩形随机出生点用	 */
	// public static  rdRectBorn = "rdRectBorn";
	// /**	 * 场景元素，圆形随机出生点用	 */
	// public static  rdCircleBorn = "rdCircleBorn";
	// /**	 * 场景元素，矩形+圆形随机出生点用	 */
	// public static  rdCircleRect = "rdCircleRect";

	public static findArea(areaname: string): AreaBase {
		var ret: AreaBase;
		for (var i = 0; i < MapManager.mapAreas.length; i++) {
			let term: AreaBase = MapManager.mapAreas[i];
			if (term.areaid == areaname) {
				ret = term;
				break;
			}
		}

		return ret;
	}

	/**
	 * @param groupname 设置组的激活性
	 * @param enable
	 */
	public static setGroupEnable(groupName: string, enable: boolean): void {
		var old: boolean = MapManager.enablegroups[groupName];
		MapManager.enablegroups[groupName] = enable;
		if (old != enable) {
			MapManager.updateGroupEnabel(groupName, enable);
		}
	}

	public static updateGroupEnabel(groupName: string, enable: boolean): void {
		if (enable) {
			MapManager.addGroupAndShow(groupName);
		} else {
			MapManager.removeGroup(groupName);
		}
	}


	public static reSize(w: number, h: number): void {
		w = Math.max(640, w);
		h = Math.max(1136, h);

		ArpgMap.getInstance()._portProxy.setTXY(-w / 2 + 20, -h / 2 - 40);
		ArpgMap.getInstance()._portProxy.setPortWH(w, h);

		if (ModelArpgMap.sceneReady) ArpgMap.getInstance().rebuild();
	}

	public static miniScaleX: number = 1;
	public static miniScaleY: number = 1;
	public static useingminibg: boolean = false;
	public static mapdecodeinfo: any;
	public static onMapCfgLoadComplete(byte: egret.ByteArray): void {
		MapManager.mapdecodeinfo = LMessageFormat.instance.decode(byte as BaseBytes);
	}

	public static decode(): void {
		MapManager.decodeConfig(MapManager.mapdecodeinfo);
	}

	public static mapGroupHash: any;
	//获取地图信息 初始化地图单位和地形
	public static decodeConfig(mapinfo: any): void {
		MapManager.mapGroupHash = {};
		for (var i = 0; i < mapinfo.items.length; i++) {
			let groupHash: any = mapinfo.items[i];
			MapManager.mapGroupHash[groupHash.name] = groupHash;
		}

		MapManager.mapInfo.id = mapinfo.id;
		MapManager.mapInfo.name = mapinfo.name;
		MapManager.mapInfo.width = mapinfo.width;
		MapManager.mapInfo.height = mapinfo.height;

		AStar.init2(mapinfo.tile);

		MapManager.isFubenFinish = false;
		ArpgMap.getInstance().setRestrictWH(mapinfo.width, mapinfo.height);

		MapManager.uidcount = 0;
		MapManager.mappingRCItem();
		MapManager.createTransPoint("transpointgroup");
		MapManager.initArea("areagroup");
		MapManager.createJumpPoint("jumpgroup");
	}

	public static initArea(groupname: string): void {
		if (MapManager.mapGroupHash[groupname]) {
			var list: any[] = MapManager.mapGroupHash[groupname].items;
			for (var i = 0; i < list.length; i++) {
				let info: any = list[i];
				var area: AreaBase = AreaBase.create(info);
				if (area != null) {
					var batch: AreaBatch = MapManager.getAreaBatch(area.areaid);
					if (batch == null) {
						batch = AreaBatch.createWithTypeID(area.areaid);
						MapManager.mapAreas.push(batch);
					}
					batch.addArea(area);
				}
			}
		}
	}

	private static getAreaBatch(id: string): AreaBatch {
		var ret: AreaBatch;
		for (var i = 0; i < MapManager.mapAreas.length; i++) {
			var batch: AreaBatch = MapManager.mapAreas[i] as AreaBatch;
			if (batch != null && batch.areaid == id) {
				ret = batch;
			}
		}
		return ret;
	}

	public static createTransPoint(groupname: string): void {
		if (MapManager.mapGroupHash[groupname]) {
			var list: any[] = MapManager.mapGroupHash[groupname].items;
			for (var i = 0; i < list.length; i++) {
				let info: any = list[i];
				if (info.type == "transpoint") {
					var door: Door = Door.create(info.x, info.y,info.distmapid);
					GameUnitManager.addUnit(door);

					var row: number = Math.floor(door.y /32);
					var col: number = Math.floor(door.x / 32);
					for (var r: number = row - 2; r < row + 2; r++) {
						for (var c: number = col - 2; c < col + 2; c++) {
							var node: AstarNode = AStar._grid.getNode(c, r);
							if (node) {
								node.jumpLink = door; 
								node.jumpArea = true;
							}
						}
					}
				}
			}
		}
	}

	public static createJumpPoint(groupname: string): void {
		if (MapManager.mapGroupHash[groupname]) {
			var list: any[] = MapManager.mapGroupHash[groupname].items;
			for (var i = 0; i < list.length; i++) {
				let info: any = list[i];
				if (info.type == "transpoint") {
					AStar._grid.link(info.x, info.y, info.dx, info.dy, AStar.M_JUMP);
				}
			}
		}
	}

	private static uidcount: number = 0;
	private static mappingRCItem(): void {
		let rcItems: any[] = [];
		MapManager.sceneEffectInfo = {};
		if (MapManager.mapGroupHash["default"]) {
			let defList: any[] = MapManager.mapGroupHash["default"].items;
			let count: number = 1;
			let now = egret.getTimer();
			let cfg = Config.NPC_200;
			if (defList) {
				for (var i = 0; i < defList.length; i++) {
					let iteminfo = defList[i];
					if (iteminfo.type == "npc") {
						if (!cfg[iteminfo.sysID]) {
							ViewCommonWarn.text("不存在NpcId" + iteminfo.sysID);
							continue;
						}
						iteminfo.clientID = now + count++;
						rcItems.push(iteminfo);
					}
				}
			}
		}

		if (MapManager.mapGroupHash["decoratorgroup"]) {
			var effList: any[] = MapManager.mapGroupHash["decoratorgroup"].items;
			if (effList) {
				for (var i = 0; i < effList.length; i++) {
					let iteminfo = effList[i]
					rcItems.push(iteminfo);
				}
			}
		}

		for (var enablegname in MapManager.enablegroups) {
			if (MapManager.mapGroupHash[enablegname]) {
				effList = MapManager.mapGroupHash[enablegname].items;
				if (effList) {
					for (var i = 0; i < effList.length; i++) {
						let iteminfo = effList[i]
						rcItems.push(iteminfo);
					}
				}
			}
		}

		for (var i = 0; i < rcItems.length; i++) {
			let iteminfo = rcItems[i]
			var x: number = iteminfo.x;
			var y: number = iteminfo.y;

			var r: number = Math.floor(y / ModelArpgMap.MAPBLOCKH);
			var c: number = Math.floor(x / ModelArpgMap.MAPBLOCKW);

			var k: string = r + "_" + c;
			if (!MapManager.sceneEffectInfo[k]) MapManager.sceneEffectInfo[k] = []
			MapManager.sceneEffectInfo[k].push(iteminfo);
		}
	}

	public static addGroupAndShow(groupname: string): void {
		// if (MapManager.mapGroupHash && MapManager.mapGroupHash[groupname]) {
		// 	var effList: any[] = MapManager.mapGroupHash[groupname].items;
		// 	if (effList) {
		// 		for (var i = 0; i < effList.length; i++) {
		// 			let iteminfo: any = effList[i];
		// 			var x: number = iteminfo.x;
		// 			var y: number = iteminfo.y;
		// 			var r: number = Math.floor(y / MapManager.BLOCK_HEIGHT);
		// 			var c: number = Math.floor(x / MapManager.BLOCK_WIDTH);
		// 			var k: string = r + "_" + c;
		// 			if (!MapManager.sceneEffectInfo[k]) MapManager.sceneEffectInfo[k] = []
		// 			MapManager.sceneEffectInfo[k].push(iteminfo);
		// 			if (!MapManager.itemsRC[k]) MapManager.itemsRC[k] = []
		// 			var nowblock: MapBlock = MapManager.sceneView._rcDict[GGlobal.sceneMap + "_" + k];
		// 			if (nowblock) {
		// 				if (iteminfo.type == "decorator") {
		// 					var sceneeff: Magic = Magic.create(iteminfo.style, iteminfo.act, iteminfo.x, iteminfo.y, iteminfo.rotate, iteminfo.totalTime, true, iteminfo.blendMode);
		// 					var layer: number = iteminfo.layer;

		// 					GameUnitManager.addUnit(sceneeff, layer);
		// 					MapManager.itemsRC[k].push(sceneeff);
		// 					sceneeff.visible = true;
		// 					sceneeff.groupStr = iteminfo.groupStr;
		// 				}
		// 			}
		// 		}
		// 	}
		// }
	}

	public static removeGroup(grouname: string): void {
		delete MapManager.enablegroups[grouname];
		if (MapManager.mapGroupHash && MapManager.mapGroupHash[grouname]) {
			var effList: any[] = MapManager.mapGroupHash[grouname].items;
			if (effList) {
				for (var i = 0; i < effList.length; i++) {
					let iteminfo: any = effList[i];
					var x: number = iteminfo.x;
					var y: number = iteminfo.y;
					var r: number = Math.floor(y / ModelArpgMap.MAPBLOCKH);
					var c: number = Math.floor(x / ModelArpgMap.MAPBLOCKW);
					var k: string = r + "_" + c;
					if (MapManager.sceneEffectInfo[k]) {
						var sceneEffectList: any[] = MapManager.sceneEffectInfo[k];
						var idx: number = sceneEffectList.indexOf(iteminfo);
						if (idx != -1) sceneEffectList.splice(idx, 1);
					}
				}
			}
		}

		// for (var key in Magic.list) {
		// 	var eff: Magic = Magic.list[key];
		// 	if (eff.groupStr == grouname) {
		// 		r = Math.floor(eff.y / MapManager.BLOCK_HEIGHT);
		// 		c = Math.floor(eff.x / MapManager.BLOCK_WIDTH);
		// 		k = r + "_" + c;
		// 		var list: Array<any> = MapManager.itemsRC[k];
		// 		if (list) {
		// 			var index: number = list.indexOf(eff);
		// 			if (index != -1) {
		// 				list.splice(index, 1);
		// 			}
		// 		}
		// 		GameUnitManager.removeUnit(eff);
		// 	}
		// }
	}

	private static itemsRC: any = {};
	public static addItemRC(r: number, c: number): void {
		var k: string = r + "_" + c;
		var list: any[] = MapManager.sceneEffectInfo[k];
		if (list == null) return;
		for (let key in list) {
			var iteminfo: any = list[key];
			if (!MapManager.itemsRC[k]) MapManager.itemsRC[k] = [];

			switch (iteminfo.type) {
				case "npc":
					var npc: ARPGNpc = GameUnitManager.getUnit(UnitType.NPC) as ARPGNpc;
					npc.init1(iteminfo.clientID, iteminfo.sysID, iteminfo.x, iteminfo.y);
					// npc.faceX(iteminfo.dir);
					GameUnitManager.addUnit(npc);
					MapManager.itemsRC[k].push(npc);
					GGlobal.control.notify(Enum_MsgType.ARPG_SCENE_ADD_NPC, iteminfo.sysID);
					break;
				default:
					// var sceneeff: Magic = Magic.create(iteminfo.style, iteminfo.act, iteminfo.x, iteminfo.y, iteminfo.rotate, iteminfo.totalTime, true, iteminfo.blendMode);
					// var layer: number = iteminfo.layer;

					// GameUnitManager.addUnit(sceneeff, layer);
					// MapManager.itemsRC[k].push(sceneeff);
					// sceneeff.visible = true;
					// sceneeff.groupStr = iteminfo.group;
					break;
			}
		}
	}

	public static getNearestArea(x: number, y: number): AreaBase {
		var bestScore: number = Number.MAX_VALUE;
		var bestArea: AreaBase;
		for (var i = 0; i < MapManager.mapAreas.length; i++) {
			let area: AreaBase = MapManager.mapAreas[i];
			var compareArea: AreaBase;
			if (area instanceof AreaBatch) {
				compareArea = MapManager.getNearestArea1(area as AreaBatch, x, y);
			} else {
				compareArea = area;
			}
			var score: number = MapManager.getAreaFar(compareArea, x, y);
			if (score < bestScore) {
				bestScore = score;
				bestArea = compareArea;
			}
		}
		return bestArea;
	}

	private static getNearestArea1(areaBatch: AreaBatch, x: number, y: number): AreaBase {
		var bestScore: number = Number.MAX_VALUE;
		var bestArea: AreaBase;
		for (var key in areaBatch.areas) {
			var area: AreaBase = areaBatch.areas[key];
			var compareArea: AreaBase;
			if (area instanceof AreaBatch) {
				compareArea = MapManager.getNearestArea1(areaBatch, x, y);
			} else {
				compareArea = area;
			}
			var score: number = MapManager.getAreaFar(area, x, y);
			if (score < bestScore) {
				bestScore = score;
				bestArea = compareArea;
			}
		}
		return bestArea;
	}

	public static getAreaFar(area: AreaBase, x: number, y: number): number {
		var ret: number = Number.MAX_VALUE;
		if (area instanceof RectArea) {
			var rect: RectArea = area as RectArea;

			var sx: number;
			if (x < rect.x) {
				sx = rect.x - x;
			} else if (x > rect.right) {
				sx = x - rect.right;
			}
			var sy: number;
			if (y < rect.y) {
				sy = rect.y - y;
			} else if (y > rect.bottom) {
				sy = y - rect.bottom;
			}
			ret = sx + sy;
		}
		return ret;
	}

	public static removeItemRC(r: number, c: number): void {
		var k: string = r + "_" + c;
		var list: any[] = MapManager.itemsRC[k];
		if (!list) return;
		for (var key in list) {
			var unit: ISceneObject = list[key];
			GameUnitManager.removeUnit(unit);
		}
		list.length = 0;
	}

	public static isFubenFinish: boolean = false;
	public static setJumpItemVisible(isShow: boolean = true): void {
		// isFubenFinish = isShow;
		// for (var i: int = 0; i < mapInfo.jumpItems.length; i++)
		// 	mapInfo.jumpItems[i].visible = isShow;
	}

	public static clearSceneeff(): void {
		for (var k in MapManager.itemsRC) {
			var list: any[] = MapManager.itemsRC[k];
			for (var key in list) {
				var unit: ISceneObject = list[key];
				GameUnitManager.removeUnit(unit);
			}
			list.length = 0;
		}
		MapManager.sceneEffectInfo = {};
	}

	public static clearArea(): void {
		for (var key in MapManager.mapAreas) {
			var area: AreaBase = MapManager.mapAreas[key];
			area.dispose();
		}
		MapManager.mapAreas.splice(0, MapManager.mapAreas.length);
	}

	public static dispose(): void {
		MapManager.clearSceneeff();
		MapManager.clearArea();
	}
}