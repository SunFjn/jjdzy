var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapManager = (function () {
    function MapManager() {
    }
    // 		/**	 * 场景元素，矩形随机出生点用	 */
    // public static  rdRectBorn = "rdRectBorn";
    // /**	 * 场景元素，圆形随机出生点用	 */
    // public static  rdCircleBorn = "rdCircleBorn";
    // /**	 * 场景元素，矩形+圆形随机出生点用	 */
    // public static  rdCircleRect = "rdCircleRect";
    MapManager.findArea = function (areaname) {
        var ret;
        for (var i = 0; i < MapManager.mapAreas.length; i++) {
            var term = MapManager.mapAreas[i];
            if (term.areaid == areaname) {
                ret = term;
                break;
            }
        }
        return ret;
    };
    /**
     * @param groupname 设置组的激活性
     * @param enable
     */
    MapManager.setGroupEnable = function (groupName, enable) {
        var old = MapManager.enablegroups[groupName];
        MapManager.enablegroups[groupName] = enable;
        if (old != enable) {
            MapManager.updateGroupEnabel(groupName, enable);
        }
    };
    MapManager.updateGroupEnabel = function (groupName, enable) {
        if (enable) {
            MapManager.addGroupAndShow(groupName);
        }
        else {
            MapManager.removeGroup(groupName);
        }
    };
    MapManager.reSize = function (w, h) {
        w = Math.max(640, w);
        h = Math.max(1136, h);
        ArpgMap.getInstance()._portProxy.setTXY(-w / 2 + 20, -h / 2 - 40);
        ArpgMap.getInstance()._portProxy.setPortWH(w, h);
        if (ModelArpgMap.sceneReady)
            ArpgMap.getInstance().rebuild();
    };
    MapManager.onMapCfgLoadComplete = function (byte) {
        MapManager.mapdecodeinfo = LMessageFormat.instance.decode(byte);
    };
    MapManager.decode = function () {
        MapManager.decodeConfig(MapManager.mapdecodeinfo);
    };
    //获取地图信息 初始化地图单位和地形
    MapManager.decodeConfig = function (mapinfo) {
        MapManager.mapGroupHash = {};
        for (var i = 0; i < mapinfo.items.length; i++) {
            var groupHash = mapinfo.items[i];
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
    };
    MapManager.initArea = function (groupname) {
        if (MapManager.mapGroupHash[groupname]) {
            var list = MapManager.mapGroupHash[groupname].items;
            for (var i = 0; i < list.length; i++) {
                var info = list[i];
                var area = AreaBase.create(info);
                if (area != null) {
                    var batch = MapManager.getAreaBatch(area.areaid);
                    if (batch == null) {
                        batch = AreaBatch.createWithTypeID(area.areaid);
                        MapManager.mapAreas.push(batch);
                    }
                    batch.addArea(area);
                }
            }
        }
    };
    MapManager.getAreaBatch = function (id) {
        var ret;
        for (var i = 0; i < MapManager.mapAreas.length; i++) {
            var batch = MapManager.mapAreas[i];
            if (batch != null && batch.areaid == id) {
                ret = batch;
            }
        }
        return ret;
    };
    MapManager.createTransPoint = function (groupname) {
        if (MapManager.mapGroupHash[groupname]) {
            var list = MapManager.mapGroupHash[groupname].items;
            for (var i = 0; i < list.length; i++) {
                var info = list[i];
                if (info.type == "transpoint") {
                    var door = Door.create(info.x, info.y, info.distmapid);
                    GameUnitManager.addUnit(door);
                    var row = Math.floor(door.y / 32);
                    var col = Math.floor(door.x / 32);
                    for (var r = row - 2; r < row + 2; r++) {
                        for (var c = col - 2; c < col + 2; c++) {
                            var node = AStar._grid.getNode(c, r);
                            if (node) {
                                node.jumpLink = door;
                                node.jumpArea = true;
                            }
                        }
                    }
                }
            }
        }
    };
    MapManager.createJumpPoint = function (groupname) {
        if (MapManager.mapGroupHash[groupname]) {
            var list = MapManager.mapGroupHash[groupname].items;
            for (var i = 0; i < list.length; i++) {
                var info = list[i];
                if (info.type == "transpoint") {
                    AStar._grid.link(info.x, info.y, info.dx, info.dy, AStar.M_JUMP);
                }
            }
        }
    };
    MapManager.mappingRCItem = function () {
        var rcItems = [];
        MapManager.sceneEffectInfo = {};
        if (MapManager.mapGroupHash["default"]) {
            var defList = MapManager.mapGroupHash["default"].items;
            var count = 1;
            var now = egret.getTimer();
            var cfg = Config.NPC_200;
            if (defList) {
                for (var i = 0; i < defList.length; i++) {
                    var iteminfo = defList[i];
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
            var effList = MapManager.mapGroupHash["decoratorgroup"].items;
            if (effList) {
                for (var i = 0; i < effList.length; i++) {
                    var iteminfo = effList[i];
                    rcItems.push(iteminfo);
                }
            }
        }
        for (var enablegname in MapManager.enablegroups) {
            if (MapManager.mapGroupHash[enablegname]) {
                effList = MapManager.mapGroupHash[enablegname].items;
                if (effList) {
                    for (var i = 0; i < effList.length; i++) {
                        var iteminfo = effList[i];
                        rcItems.push(iteminfo);
                    }
                }
            }
        }
        for (var i = 0; i < rcItems.length; i++) {
            var iteminfo = rcItems[i];
            var x = iteminfo.x;
            var y = iteminfo.y;
            var r = Math.floor(y / ModelArpgMap.MAPBLOCKH);
            var c = Math.floor(x / ModelArpgMap.MAPBLOCKW);
            var k = r + "_" + c;
            if (!MapManager.sceneEffectInfo[k])
                MapManager.sceneEffectInfo[k] = [];
            MapManager.sceneEffectInfo[k].push(iteminfo);
        }
    };
    MapManager.addGroupAndShow = function (groupname) {
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
    };
    MapManager.removeGroup = function (grouname) {
        delete MapManager.enablegroups[grouname];
        if (MapManager.mapGroupHash && MapManager.mapGroupHash[grouname]) {
            var effList = MapManager.mapGroupHash[grouname].items;
            if (effList) {
                for (var i = 0; i < effList.length; i++) {
                    var iteminfo = effList[i];
                    var x = iteminfo.x;
                    var y = iteminfo.y;
                    var r = Math.floor(y / ModelArpgMap.MAPBLOCKH);
                    var c = Math.floor(x / ModelArpgMap.MAPBLOCKW);
                    var k = r + "_" + c;
                    if (MapManager.sceneEffectInfo[k]) {
                        var sceneEffectList = MapManager.sceneEffectInfo[k];
                        var idx = sceneEffectList.indexOf(iteminfo);
                        if (idx != -1)
                            sceneEffectList.splice(idx, 1);
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
    };
    MapManager.addItemRC = function (r, c) {
        var k = r + "_" + c;
        var list = MapManager.sceneEffectInfo[k];
        if (list == null)
            return;
        for (var key in list) {
            var iteminfo = list[key];
            if (!MapManager.itemsRC[k])
                MapManager.itemsRC[k] = [];
            switch (iteminfo.type) {
                case "npc":
                    var npc = GameUnitManager.getUnit(UnitType.NPC);
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
    };
    MapManager.getNearestArea = function (x, y) {
        var bestScore = Number.MAX_VALUE;
        var bestArea;
        for (var i = 0; i < MapManager.mapAreas.length; i++) {
            var area = MapManager.mapAreas[i];
            var compareArea;
            if (area instanceof AreaBatch) {
                compareArea = MapManager.getNearestArea1(area, x, y);
            }
            else {
                compareArea = area;
            }
            var score = MapManager.getAreaFar(compareArea, x, y);
            if (score < bestScore) {
                bestScore = score;
                bestArea = compareArea;
            }
        }
        return bestArea;
    };
    MapManager.getNearestArea1 = function (areaBatch, x, y) {
        var bestScore = Number.MAX_VALUE;
        var bestArea;
        for (var key in areaBatch.areas) {
            var area = areaBatch.areas[key];
            var compareArea;
            if (area instanceof AreaBatch) {
                compareArea = MapManager.getNearestArea1(areaBatch, x, y);
            }
            else {
                compareArea = area;
            }
            var score = MapManager.getAreaFar(area, x, y);
            if (score < bestScore) {
                bestScore = score;
                bestArea = compareArea;
            }
        }
        return bestArea;
    };
    MapManager.getAreaFar = function (area, x, y) {
        var ret = Number.MAX_VALUE;
        if (area instanceof RectArea) {
            var rect = area;
            var sx;
            if (x < rect.x) {
                sx = rect.x - x;
            }
            else if (x > rect.right) {
                sx = x - rect.right;
            }
            var sy;
            if (y < rect.y) {
                sy = rect.y - y;
            }
            else if (y > rect.bottom) {
                sy = y - rect.bottom;
            }
            ret = sx + sy;
        }
        return ret;
    };
    MapManager.removeItemRC = function (r, c) {
        var k = r + "_" + c;
        var list = MapManager.itemsRC[k];
        if (!list)
            return;
        for (var key in list) {
            var unit = list[key];
            GameUnitManager.removeUnit(unit);
        }
        list.length = 0;
    };
    MapManager.setJumpItemVisible = function (isShow) {
        if (isShow === void 0) { isShow = true; }
        // isFubenFinish = isShow;
        // for (var i: int = 0; i < mapInfo.jumpItems.length; i++)
        // 	mapInfo.jumpItems[i].visible = isShow;
    };
    MapManager.clearSceneeff = function () {
        for (var k in MapManager.itemsRC) {
            var list = MapManager.itemsRC[k];
            for (var key in list) {
                var unit = list[key];
                GameUnitManager.removeUnit(unit);
            }
            list.length = 0;
        }
        MapManager.sceneEffectInfo = {};
    };
    MapManager.clearArea = function () {
        for (var key in MapManager.mapAreas) {
            var area = MapManager.mapAreas[key];
            area.dispose();
        }
        MapManager.mapAreas.splice(0, MapManager.mapAreas.length);
    };
    MapManager.dispose = function () {
        MapManager.clearSceneeff();
        MapManager.clearArea();
    };
    MapManager.mapInfo = {}; //地图物件信息和格子信息
    MapManager.list = []; //用于屏幕更新的地图块
    MapManager.listPool = []; //多余块
    MapManager.mapPool = {}; //地图资源缓存
    MapManager.alphamapinfo = {};
    MapManager.sceneEffectInfo = {};
    MapManager.mapAreas = [];
    MapManager.enablegroups = {};
    MapManager.miniScaleX = 1;
    MapManager.miniScaleY = 1;
    MapManager.useingminibg = false;
    MapManager.uidcount = 0;
    MapManager.itemsRC = {};
    MapManager.isFubenFinish = false;
    return MapManager;
}());
__reflect(MapManager.prototype, "MapManager");
