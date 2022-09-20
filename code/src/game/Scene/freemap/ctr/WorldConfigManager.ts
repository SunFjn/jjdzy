class WorldConfigManager {
	public constructor() {
	}

	public static mapDic: any = {};
	public static paths: Array<any> = [];
	public static countMap: number;

	public static packWorldConfig(): void {
		WorldConfigManager.countMap = 0;
		var self = this;
		var dic: any = ModelArpgMap.getInstance().mapCfg();
		for (var mapID in dic) {
			var mapResources: number = dic[mapID].mapUrl;
			var type: number = dic[mapID].type;
			if (WorldConfigManager.isNeedPack(type)) {
				WorldConfigManager.countMap++;
				let url = RESManager.getVersionUrl("resource/map/" + mapResources + "/clientSceneFile.bin");
				RES.getResByUrl(url, WorldConfigManager.loadMapInfoCom, self, RES.ResourceItem.TYPE_BIN);
			}
		}
	}

	private static loadMapInfoCom(bytebuffer: ArrayBuffer): void {
		var byte: BaseBytes = new BaseBytes();
		byte.setArrayBuffer(bytebuffer);

		var mapinfo: any = LMessageFormat.instance.decode(byte);;
		var mapGroupHash: Object = {};
		for (let key in mapinfo.items) {
			var groupObj: any = mapinfo.items[key];
			mapGroupHash[groupObj.name] = groupObj;
		}

		var mapID: number = mapinfo.id;
		var node: MapNode = new MapNode();
		WorldConfigManager.mapDic[mapID] = node;
		node.id = mapID;

		if (mapGroupHash["default"]) {
			var list: Array<any> = mapGroupHash["default"].items;
			//添加Demo组的npc
			if (mapGroupHash["demo"]) {
				var list2: Array<any> = mapGroupHash["demo"].items;
				list = list.concat(list2);
			}
			//添加task组的npc
			if (mapGroupHash["task"]) {
				var list3: Array<any> = mapGroupHash["task"].items;
				list = list.concat(list3);
			}

			for (let key in list) {
				var itemInfo: any = list[key]
				if (itemInfo.type == "transpoint") {
					itemInfo.distmapx;
					itemInfo.distmapy;
					var disMapId: number = itemInfo.distmapid;
					let cfg = ModelArpgMap.getInstance().mapCfg();
					var type: number = cfg[disMapId].type;
					if (WorldConfigManager.isNeedPack(type)) {
						node.links.push(disMapId);
					}
				}

				if (itemInfo.type == "npc") {
					node.npcDic[itemInfo.sysID] = [itemInfo.sysID, itemInfo.x, itemInfo.y]
				}
			}
		}
	}
	/**
	 * 支持垮地图寻路的地图类型
	 */
	private static isNeedPack(type: number): Boolean {
		return false;
	}

	public static initConfig(bytebuffer): void {
		var byte: egret.ByteArray = new egret.ByteArray(bytebuffer);
		WorldConfigManager.mapDic = {};
		var str: string = byte.readUTF();
		var mapInfo: any = JSON.parse(str);
		for (var key in mapInfo) {
			var item: Object = mapInfo[key];
			var mapN: MapNode = item["MapNode"];
			WorldConfigManager.mapDic[key] = mapN;
		}
	}

	public static findJumpPoint(): void {
		if (MapManager.mapGroupHash["default"]) {
			var list: Array<any> = MapManager.mapGroupHash["default"].items;
			for (let key in list) {
				var info: any = list[key];
				if (info.type == "transpoint") {
					WorldConfigManager.findTargetPoint(ModelArpgMap.getInstance().sceneMap, info.x, info.y);
				}
			}
		}
	}

	public static findTargetPoint(endMapID: number, tx: number = -1, ty: number = -1): void {
		WorldConfigManager.find(ModelArpgMap.getInstance().sceneMap, endMapID);
		var vo: Vo_mapTarItem = new Vo_mapTarItem();
		vo.tarMap = endMapID;
		vo.x = tx;
		vo.y = ty;
		vo.dis = 0;
		WorldConfigManager.paths.push(vo);
		WorldConfigManager.startGo();
	}

	public static interactObj(endMapID: number, tx: number, ty: number, npcsysid: number): void {
		WorldConfigManager.find(ModelArpgMap.getInstance().sceneMap, endMapID);
		var vo: Vo_mapTarItem = new Vo_mapTarItem();
		vo.tarMap = endMapID;
		vo.x = tx;
		vo.y = ty;
		vo.dis = 0;
		WorldConfigManager.paths.push(vo);
		vo.tarsysid = npcsysid;
		WorldConfigManager.startGo();
	}

	public static findNPC(npcID: number): void {
		let m = ModelArpgMap.getInstance();
		let mgr = WorldConfigManager;
		var startTime: number = egret.getTimer();

		var endMapID: number;
		var curNode: MapNode = mgr.mapDic[m.sceneMap];

		if (curNode == null) {//全局路径没有该节点提示
			ViewCommonWarn.text("全局路径没有该节点提示");
			return;
		}

		endMapID = curNode.id;
		mgr.paths = [];


		if (curNode.npcDic[npcID]) {
			mgr.paths.push(npcID);
			mgr.startGo();
			return;
		}

		var matchList: Array<any> = [];
		let dic = mgr.mapDic;
		for (let key in dic) {
			var node: MapNode = dic[key];
			if (node.npcDic[npcID]) {
				matchList.push(node.id);
			}
		}

		if (matchList.length == 0) {
			ViewCommonWarn.text("查找不到NPC：" + npcID);
			return;
		}

		var min: number = 1000;
		var minMapID: number;
		let len = matchList.length;
		for (var i = 0; i < len; i++) {
			mgr.find(m.sceneMap, matchList[i]);
			if (mgr.paths.length <= min && mgr.paths.length != 0) {
				min = mgr.paths.length;
				minMapID = matchList[i];
			}
		}

		mgr.find(m.sceneMap, minMapID);
		mgr.paths.push(npcID);

		var endTime: number = egret.getTimer();
		console.log("花费：" + (endTime - startTime));

		mgr.startGo();
	}

	public static getInfoByNPCID(npcID: number): any {
		var ret: any;
		let dic = WorldConfigManager.mapDic;
		for (let key in dic) {
			var node: MapNode = dic[key];
			if (node.npcDic[npcID]) {
				ret = { node: node, info: node.npcDic[npcID] };
				break;
			}
		}
		return ret;
	}

	private static _startNode: MapNode;
	private static _endNode: MapNode;
	private static find(startMapID: number, endMapID: number): boolean {
		if (startMapID == endMapID)
			return false;
		let mgr = WorldConfigManager;
		let dic = mgr.mapDic;

		mgr._startNode = dic[startMapID];
		mgr._endNode = dic[endMapID];
		if (mgr._startNode == null || mgr._endNode == null) return true;

		var node: MapNode = mgr._startNode;
		var closePath: Array<any> = [];
		mgr.paths = [];

		mgr.reset();

		mgr.findNode(mgr._startNode);
		return true;
	}

	private static reset(): void {
		let mgr = WorldConfigManager;
		let dic = mgr.mapDic;
		for (let key in dic) {
			var node: MapNode = dic[key];
			node.child = null;
			node.parent = null;
			node.lock = false;
		}
	}

	private static findNode(node: MapNode): void {
		if (node == null) return;
		let mgr = WorldConfigManager;
		let dic = mgr.mapDic;
		var len: number = node.links.length;
		var nextNode: MapNode;
		for (var i: number = 0; i < len; i++) {
			var targetMapID: number = node.links[i];
			if (targetMapID == mgr._endNode.id) {
				nextNode = dic[targetMapID];
				node.parent = nextNode;
				mgr.buildPath();
				break;
			} else {
				if (dic[targetMapID]) {
					if (node.lock)
						break;
					nextNode = dic[targetMapID];
					if (node.child == nextNode)
						continue;
					node.parent = nextNode;
					nextNode.child = node;
					mgr.findNode(nextNode);
				}
			}
		}
	}

	private static buildPath(): void {
		let mgr = WorldConfigManager;
		let dic = mgr.mapDic;
		var node: MapNode = mgr._startNode;
		var conut: number = 0;
		while (true) {
			mgr.paths.push(node.id);
			node.lock = true;
			node.parent.lock = true;
			if (node.links.indexOf(mgr._endNode.id) != -1)
				break;
			node = node.parent;
			conut++;
			if (conut > 1000) {
				ViewCommonWarn.text("创建路径失败 WorldConfigManager");
				break;
			}
		}
	}

	private static startGo(): void {
		GameUnitManager.hero.checkPath();
	}

	public static antoMove(id: number, type: number = 2): void {
		if (type == UnitType.NPC) {
			WorldConfigManager.findNPC(id);
		} else {
			WorldConfigManager.find(ModelArpgMap.getInstance().sceneMap, id);
		}
	}

	public static getVo(): Vo_mapTarItem {
		let m = ModelArpgMap.getInstance();
		let mgr = WorldConfigManager;
		let dic = mgr.mapDic;
		var data: any = mgr.paths.shift();
		if (data instanceof Vo_mapTarItem)
			return data;

		try {
			var node: MapNode = dic[data];
			var vo: Vo_mapTarItem;

			if (node == null) {
				var npcInfo: Array<any> = (dic[m.sceneMap] as MapNode).npcDic[data];
				if (npcInfo == null) {
					console.log("WorldConfigManager 没有NPC VO");
					return null;
				}
				vo = new Vo_mapTarItem;
				vo.tarsysid = npcInfo[0];
				vo.x = npcInfo[1];
				vo.y = npcInfo[2];
				return vo;
			}

			var list: Array<any> = Door.list;

			for (let key in Door.list) {
				var door: Door = list[key];
				if (door.mapid == node.parent.id) {
					vo = new Vo_mapTarItem;
					vo.tarMap = node.parent.id;
					vo.x = door.x;
					vo.y = door.y;
					return vo;
				}
			}
		} catch (e) {
			return null;
		}
		return null;
	}
}

class MapNode {
	public g: Number;
	public links: Array<any> = [];
	public id: number;
	public parent: MapNode;
	public child: MapNode;
	public npcDic: any = {};
	public lock: boolean = false;
}