var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WorldConfigManager = (function () {
    function WorldConfigManager() {
    }
    WorldConfigManager.packWorldConfig = function () {
        WorldConfigManager.countMap = 0;
        var self = this;
        var dic = ModelArpgMap.getInstance().mapCfg();
        for (var mapID in dic) {
            var mapResources = dic[mapID].mapUrl;
            var type = dic[mapID].type;
            if (WorldConfigManager.isNeedPack(type)) {
                WorldConfigManager.countMap++;
                var url = RESManager.getVersionUrl("resource/map/" + mapResources + "/clientSceneFile.bin");
                RES.getResByUrl(url, WorldConfigManager.loadMapInfoCom, self, RES.ResourceItem.TYPE_BIN);
            }
        }
    };
    WorldConfigManager.loadMapInfoCom = function (bytebuffer) {
        var byte = new BaseBytes();
        byte.setArrayBuffer(bytebuffer);
        var mapinfo = LMessageFormat.instance.decode(byte);
        ;
        var mapGroupHash = {};
        for (var key in mapinfo.items) {
            var groupObj = mapinfo.items[key];
            mapGroupHash[groupObj.name] = groupObj;
        }
        var mapID = mapinfo.id;
        var node = new MapNode();
        WorldConfigManager.mapDic[mapID] = node;
        node.id = mapID;
        if (mapGroupHash["default"]) {
            var list = mapGroupHash["default"].items;
            //添加Demo组的npc
            if (mapGroupHash["demo"]) {
                var list2 = mapGroupHash["demo"].items;
                list = list.concat(list2);
            }
            //添加task组的npc
            if (mapGroupHash["task"]) {
                var list3 = mapGroupHash["task"].items;
                list = list.concat(list3);
            }
            for (var key in list) {
                var itemInfo = list[key];
                if (itemInfo.type == "transpoint") {
                    itemInfo.distmapx;
                    itemInfo.distmapy;
                    var disMapId = itemInfo.distmapid;
                    var cfg = ModelArpgMap.getInstance().mapCfg();
                    var type = cfg[disMapId].type;
                    if (WorldConfigManager.isNeedPack(type)) {
                        node.links.push(disMapId);
                    }
                }
                if (itemInfo.type == "npc") {
                    node.npcDic[itemInfo.sysID] = [itemInfo.sysID, itemInfo.x, itemInfo.y];
                }
            }
        }
    };
    /**
     * 支持垮地图寻路的地图类型
     */
    WorldConfigManager.isNeedPack = function (type) {
        return false;
    };
    WorldConfigManager.initConfig = function (bytebuffer) {
        var byte = new egret.ByteArray(bytebuffer);
        WorldConfigManager.mapDic = {};
        var str = byte.readUTF();
        var mapInfo = JSON.parse(str);
        for (var key in mapInfo) {
            var item = mapInfo[key];
            var mapN = item["MapNode"];
            WorldConfigManager.mapDic[key] = mapN;
        }
    };
    WorldConfigManager.findJumpPoint = function () {
        if (MapManager.mapGroupHash["default"]) {
            var list = MapManager.mapGroupHash["default"].items;
            for (var key in list) {
                var info = list[key];
                if (info.type == "transpoint") {
                    WorldConfigManager.findTargetPoint(ModelArpgMap.getInstance().sceneMap, info.x, info.y);
                }
            }
        }
    };
    WorldConfigManager.findTargetPoint = function (endMapID, tx, ty) {
        if (tx === void 0) { tx = -1; }
        if (ty === void 0) { ty = -1; }
        WorldConfigManager.find(ModelArpgMap.getInstance().sceneMap, endMapID);
        var vo = new Vo_mapTarItem();
        vo.tarMap = endMapID;
        vo.x = tx;
        vo.y = ty;
        vo.dis = 0;
        WorldConfigManager.paths.push(vo);
        WorldConfigManager.startGo();
    };
    WorldConfigManager.interactObj = function (endMapID, tx, ty, npcsysid) {
        WorldConfigManager.find(ModelArpgMap.getInstance().sceneMap, endMapID);
        var vo = new Vo_mapTarItem();
        vo.tarMap = endMapID;
        vo.x = tx;
        vo.y = ty;
        vo.dis = 0;
        WorldConfigManager.paths.push(vo);
        vo.tarsysid = npcsysid;
        WorldConfigManager.startGo();
    };
    WorldConfigManager.findNPC = function (npcID) {
        var m = ModelArpgMap.getInstance();
        var mgr = WorldConfigManager;
        var startTime = egret.getTimer();
        var endMapID;
        var curNode = mgr.mapDic[m.sceneMap];
        if (curNode == null) {
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
        var matchList = [];
        var dic = mgr.mapDic;
        for (var key in dic) {
            var node = dic[key];
            if (node.npcDic[npcID]) {
                matchList.push(node.id);
            }
        }
        if (matchList.length == 0) {
            ViewCommonWarn.text("查找不到NPC：" + npcID);
            return;
        }
        var min = 1000;
        var minMapID;
        var len = matchList.length;
        for (var i = 0; i < len; i++) {
            mgr.find(m.sceneMap, matchList[i]);
            if (mgr.paths.length <= min && mgr.paths.length != 0) {
                min = mgr.paths.length;
                minMapID = matchList[i];
            }
        }
        mgr.find(m.sceneMap, minMapID);
        mgr.paths.push(npcID);
        var endTime = egret.getTimer();
        console.log("花费：" + (endTime - startTime));
        mgr.startGo();
    };
    WorldConfigManager.getInfoByNPCID = function (npcID) {
        var ret;
        var dic = WorldConfigManager.mapDic;
        for (var key in dic) {
            var node = dic[key];
            if (node.npcDic[npcID]) {
                ret = { node: node, info: node.npcDic[npcID] };
                break;
            }
        }
        return ret;
    };
    WorldConfigManager.find = function (startMapID, endMapID) {
        if (startMapID == endMapID)
            return false;
        var mgr = WorldConfigManager;
        var dic = mgr.mapDic;
        mgr._startNode = dic[startMapID];
        mgr._endNode = dic[endMapID];
        if (mgr._startNode == null || mgr._endNode == null)
            return true;
        var node = mgr._startNode;
        var closePath = [];
        mgr.paths = [];
        mgr.reset();
        mgr.findNode(mgr._startNode);
        return true;
    };
    WorldConfigManager.reset = function () {
        var mgr = WorldConfigManager;
        var dic = mgr.mapDic;
        for (var key in dic) {
            var node = dic[key];
            node.child = null;
            node.parent = null;
            node.lock = false;
        }
    };
    WorldConfigManager.findNode = function (node) {
        if (node == null)
            return;
        var mgr = WorldConfigManager;
        var dic = mgr.mapDic;
        var len = node.links.length;
        var nextNode;
        for (var i = 0; i < len; i++) {
            var targetMapID = node.links[i];
            if (targetMapID == mgr._endNode.id) {
                nextNode = dic[targetMapID];
                node.parent = nextNode;
                mgr.buildPath();
                break;
            }
            else {
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
    };
    WorldConfigManager.buildPath = function () {
        var mgr = WorldConfigManager;
        var dic = mgr.mapDic;
        var node = mgr._startNode;
        var conut = 0;
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
    };
    WorldConfigManager.startGo = function () {
        GameUnitManager.hero.checkPath();
    };
    WorldConfigManager.antoMove = function (id, type) {
        if (type === void 0) { type = 2; }
        if (type == UnitType.NPC) {
            WorldConfigManager.findNPC(id);
        }
        else {
            WorldConfigManager.find(ModelArpgMap.getInstance().sceneMap, id);
        }
    };
    WorldConfigManager.getVo = function () {
        var m = ModelArpgMap.getInstance();
        var mgr = WorldConfigManager;
        var dic = mgr.mapDic;
        var data = mgr.paths.shift();
        if (data instanceof Vo_mapTarItem)
            return data;
        try {
            var node = dic[data];
            var vo;
            if (node == null) {
                var npcInfo = dic[m.sceneMap].npcDic[data];
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
            var list = Door.list;
            for (var key in Door.list) {
                var door = list[key];
                if (door.mapid == node.parent.id) {
                    vo = new Vo_mapTarItem;
                    vo.tarMap = node.parent.id;
                    vo.x = door.x;
                    vo.y = door.y;
                    return vo;
                }
            }
        }
        catch (e) {
            return null;
        }
        return null;
    };
    WorldConfigManager.mapDic = {};
    WorldConfigManager.paths = [];
    return WorldConfigManager;
}());
__reflect(WorldConfigManager.prototype, "WorldConfigManager");
var MapNode = (function () {
    function MapNode() {
        this.links = [];
        this.npcDic = {};
        this.lock = false;
    }
    return MapNode;
}());
__reflect(MapNode.prototype, "MapNode");
