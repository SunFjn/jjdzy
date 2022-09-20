var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ModelArpgMap = (function (_super) {
    __extends(ModelArpgMap, _super);
    function ModelArpgMap() {
        var _this = _super.call(this) || this;
        _this.isServerControlMap = true; //是否是由后端控制场景切换
        /**是否真实离开活动场景：true 离开通知后端将人物从活动地图移除 false：执行系统的逻辑，进入战斗等，活动场景依然存在自己的模型*/
        _this.isAutoExite = true;
        //某些跨服活动要求是走跨服协议
        _this.isCross = false;
        return _this;
    }
    ModelArpgMap.getInstance = function () {
        if (!this._instant) {
            this._instant = new ModelArpgMap();
            ARPGSceneController.registerManager();
            this._instant.listenServ(GGlobal.socketMgr);
        }
        return this._instant;
    };
    Object.defineProperty(ModelArpgMap.prototype, "sceneMap", {
        get: function () {
            return this._sceneMap;
        },
        set: function (v) {
            RESManager.recordMapInvild(this._sceneMap, 0);
            this._sceneMap = v;
            RESManager.recordMapInvild(v, 1);
        },
        enumerable: true,
        configurable: true
    });
    ModelArpgMap.prototype.mapCfg = function () {
        return Config.map_200;
    };
    ModelArpgMap.getPlayerData = function (id) {
        if (!ModelArpgMap.playerMap[id]) {
            var vo_player = Vo_ArpgPlayer.create();
            vo_player.id = id;
            ModelArpgMap.addPlayerData(vo_player);
        }
        return ModelArpgMap.playerMap[id];
    };
    ModelArpgMap.addPlayerData = function (vo) {
        if (!vo.id)
            return;
        if (!ModelArpgMap.playerMap[vo.id]) {
            ModelArpgMap.count++;
        }
        ModelArpgMap.playerMap[vo.id] = vo;
    };
    ModelArpgMap.prototype.createMyCharData = function () {
        var vo = Vo_ArpgPlayer.create();
        var mine = Model_player.voMine;
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
        vo.setHorseId(mine.horseId);
        ModelArpgMap.hero = vo;
        ModelArpgMap.playerMap[vo.id] = vo;
    };
    ModelArpgMap.prototype.exiteARPG = function () {
        var s = this;
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
    };
    //通知后端将玩家从场景移除
    ModelArpgMap.prototype.exiteScene = function () {
        var s = this;
        s.isCross = false;
        s.CG_EXITE_ARPG();
    };
    ModelArpgMap.prototype.CG_ENTER_SCENE = function (id) {
        var ba = this.getBytes();
        ba.writeInt(id);
        this.sendSocket(3901, ba);
    };
    ModelArpgMap.prototype.CG_ENTER_SCENE_OK = function () {
        var ba = this.getBytes();
        this.sendSocket(3903, ba);
    };
    ModelArpgMap.prototype.CG_CHANGE_SCENE_OK = function () {
        var ba = this.getBytes();
        this.sendSocket(3905, ba);
    };
    //3907 移动 [S:xS:yB:走？跳]坐标点集合
    ModelArpgMap.prototype.CG_MOVE = function (route) {
        var ba = this.getBytes();
        var len = route[0].length;
        ba.writeShort(len);
        for (var i = 0; i < len; i++) {
            ba.writeShort(route[0][i][0]);
            ba.writeShort(route[0][i][1]);
            ba.writeByte(route[0][i][2]);
        }
        this.sendSocket(3907, ba);
    };
    //3909 	移动完毕 S:endXS:endY
    ModelArpgMap.prototype.CG_STOP_MOVE = function (x, y) {
        var ba = this.getBytes();
        ba.writeShort(x);
        ba.writeShort(y);
        this.sendSocket(3909, ba);
    };
    //3911 	坐标同步 S:X坐标S:Y坐标
    ModelArpgMap.prototype.CG_POINT = function (x, y) {
        var ba = this.getBytes();
        ba.writeShort(x);
        ba.writeShort(y);
        this.sendSocket(3911, ba);
    };
    //3913 	路径同步 [S:xS:y]坐标点集合
    ModelArpgMap.prototype.CG_PATH = function (route) {
        var ba = this.getBytes();
        ba.writeShort(route.length);
        for (var i = 0; i < route.length; i++) {
            ba.writeShort(route[i][0][0]);
            ba.writeShort(route[i][0][1]);
        }
        this.sendSocket(3913, ba);
    };
    ModelArpgMap.prototype.CG_EXITE_ARPG = function () {
        var ba = this.getBytes();
        this.sendSocket(3919, ba);
    };
    ModelArpgMap.prototype.listenServ = function (wsm) {
        _super.prototype.listenServ.call(this, wsm);
        wsm.regHand(3902, this.GC_ENTER_SCENE, this);
        wsm.regHand(3904, this.GC_ADD_PLAYER, this);
        wsm.regHand(3906, this.GC_DEL_ROLE, this);
        wsm.regHand(3908, this.GC_MOVE, this);
        wsm.regHand(3910, this.GC_STOP_GO, this);
        wsm.regHand(3914, this.GC_SETPLAYER_POS, this);
        wsm.regHand(3918, this.GC_ADD_NPC, this);
        wsm.regHand(3916, this.GC_PLAYER_DATA_UPDATE, this);
    };
    //3902 进入场景 B:结果 1：成功 2：体力不足，3：组队状态下队员不能跳转地图I:场景IDS:坐标XS:坐标Y
    ModelArpgMap.prototype.GC_ENTER_SCENE = function (self, ba) {
        var result = ba.readByte();
        if (result == 1) {
            var sceneId = ba.readInt();
            var posX = ba.readShort();
            var posY = ba.readShort();
            self.sceneMap = sceneId;
            var cfg = self.mapCfg();
            var map = cfg[sceneId];
            self.sceneMapSRC = map.s;
            self.sceneType = map.severtype;
            ARPGSceneController.enter();
            self.sceneMap = sceneId;
            GameUnitManager.hero.setXY(posX, posY);
            GameUnitManager.hero.isOnJumpPoint = false;
            var url = "";
            GameUnitManager.removePlayerNpc();
            ArpgMap.getInstance().disposeByChangeScene();
            var mapDes = map.name;
            GGlobal.layerMgr.open(UIConst.ARPG_SCENEVIEW, mapDes);
            url = RESManager.getVersionUrl("resource/map/" + map.s + "/clientSceneFile.bin");
            RES.getResByUrl(url, self.onMapLoadComplete, self, RES.ResourceItem.TYPE_BIN);
            SoundManager.getInstance().playBGM(map.b);
        }
    };
    ModelArpgMap.prototype.onMapLoadComplete = function (bytebuffer) {
        // ViewSmallMap.instance.refresh();
        var byte = new egret.ByteArray(bytebuffer);
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
    };
    /**3916 	广播玩家最新状态，例如移动速度,挂机状态，称号，时装 U:，key为属性，value为属性值 */
    ModelArpgMap.prototype.GC_PLAYER_DATA_UPDATE = function (self, ba) {
        var content = ba.readUTF();
        var info = JSON.parse(content);
        var id = info[Enum_Attribute.ID];
        if (!GameUnitManager.hero || id != GameUnitManager.hero.id)
            var player = GameUnitManager.findUnit(id, UnitType.PLAYER);
        else {
            player = GameUnitManager.hero;
        }
        if (!player)
            return;
        player.id = id;
        self.updatePlayerInfo(player, info);
    };
    //3904 	GC 添加玩家
    ModelArpgMap.prototype.GC_ADD_PLAYER = function (self, ba) {
        if (!ModelArpgMap.sceneReady)
            return;
        var info = LMessageFormat.instance.read(ba);
        var player = GameUnitManager.findUnit(info[Enum_Attribute.ID], UnitType.PLAYER);
        if (!player)
            player = GameUnitManager.getUnit(UnitType.PLAYER);
        var vo = ModelArpgMap.getPlayerData(info[Enum_Attribute.ID]);
        vo.id = info[Enum_Attribute.ID];
        vo.name = info[Enum_Attribute.PLAYER_NAME];
        vo.speed = info[Enum_Attribute.SPEED];
        vo.godWeapon = info[Enum_Attribute.PLAYER_WEAPON];
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
        var x = info[Enum_Attribute.GLOBAL_X];
        var y = info[Enum_Attribute.GLOBAL_Y];
        var dir = info[Enum_Attribute.PLAYER_DIR];
        var camp = info[Enum_Attribute.CAMP] ? info[Enum_Attribute.CAMP] : 0;
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
    };
    ModelArpgMap.prototype.updatePlayerInfo = function (player, info) {
        var vo = ModelArpgMap.getPlayerData(player.id);
        if (vo.isMineID()) {
            var isHero = true;
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
                    break;
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
                    if (isHero)
                        GameUnitManager.refreshName();
                    break;
            }
        }
    };
    //3906 	删除显示对象 L:ID B:类型
    ModelArpgMap.prototype.GC_DEL_ROLE = function (self, ba) {
        var id = ba.readLong();
        var type = ba.readByte();
        var hero = GameUnitManager.hero;
        var unit = GameUnitManager.findUnit(id, type);
        if (!unit || Model_player.isMineID(unit.id)) {
            return;
        }
        if (unit == GameUnitManager.hero.target)
            GameUnitManager.hero.target = null;
        GameUnitManager.removeUnit(unit);
        if (type == UnitType.PLAYER)
            self.notify(Enum_MsgType.ARPG_SCENE_REMOVE_PLAYER, id);
        else if (type == UnitType.NPC)
            self.notify(Enum_MsgType.ARPG_SCENE_REMOVE_NPC, id);
    };
    //3908 移动 L:idB:类型[S:坐标XS:坐标YB:走?跳]坐标
    ModelArpgMap.prototype.GC_MOVE = function (self, ba) {
        if (ModelArpgMap.hero == null)
            return;
        var heroid = ModelArpgMap.hero.id;
        var id = ba.readLong();
        var type = ba.readByte();
        if (heroid != id) {
            var role = GameUnitManager.findUnit(id, type);
        }
        else {
            role = GameUnitManager.hero;
        }
        if (!role)
            return;
        var r = [];
        for (var i = 0, len = ba.readShort(); i < len; i++) {
            var posX = ba.readShort();
            var posY = ba.readShort();
            var posType = ba.readByte();
            r.push([posX, posY, posType]);
        }
        var fuc = ModelArpgMap._moveHandle[ARPGMapManager.currentSystem];
        if (fuc) {
            fuc.runWith({ role: role, r: r });
            return;
        }
        role.setRoute(r);
    };
    ModelArpgMap.registerMoveBack = function (uiconst, hd) {
        ModelArpgMap._moveHandle[uiconst] = hd;
    };
    ModelArpgMap.removeMoveBack = function (uiconst) {
        ModelArpgMap._moveHandle[uiconst] = null;
    };
    //3910 停止移动 L:IDS:XS:YB:类型 1：人 2：非战斗NPC，3：战斗NPC
    ModelArpgMap.prototype.GC_STOP_GO = function (self, ba) {
        var role;
        var id = ba.readLong();
        var x = ba.readShort();
        var y = ba.readShort();
        var type = ba.readByte();
        if (id == Model_player.voMine.id) {
            role = GameUnitManager.hero;
        }
        else {
            role = GameUnitManager.findUnit(id, type);
        }
        if (!role)
            return;
        var subx = x - role.x;
        var suby = y - role.y;
        if (subx >= 200 || subx <= -200 || suby >= 150 || suby <= -150) {
            role.setXY(x, y, true);
        }
        role.stopGo();
    };
    //重新设置自己的坐标点
    ModelArpgMap.prototype.GC_SETPLAYER_POS = function (self, ba) {
        var role = GameUnitManager.hero;
        role && role.setXY(ba.readInt(), ba.readInt());
    };
    //3918 X
    ModelArpgMap.prototype.GC_ADD_NPC = function (self, ba) {
        if (!ModelArpgMap.sceneReady)
            return;
        var npcInfo = LMessageFormat.instance.read(ba);
        var id = npcInfo[Enum_Attribute.ID];
        var sId = npcInfo[Enum_Attribute.SYSTEM_ID];
        var posX = npcInfo[Enum_Attribute.GLOBAL_X];
        var posY = npcInfo[Enum_Attribute.GLOBAL_Y];
        var route = npcInfo[Enum_Attribute.ROUTE];
        var state = npcInfo[Enum_Attribute.STATE];
        var herodata = ModelArpgMap.hero;
        var npc = GameUnitManager.findUnit(id, UnitType.NPC);
        if (!npc) {
            npc = GameUnitManager.getUnit(UnitType.NPC);
        }
        npc.init1(id, sId, posX, posY);
        GameUnitManager.addUnit(npc);
        if (npc)
            GGlobal.control.notify(Enum_MsgType.ARPG_SCENE_ADD_NPC, id);
    };
    ModelArpgMap.prototype.sendSocket = function (cmd, ba) {
        if (!this.socket.webSocket.connect) {
            return;
        }
        this.socket.sendCMDBytes(cmd, ba, this.isCross);
    };
    ModelArpgMap.sceneReady = false;
    ModelArpgMap.touchPoint = new egret.Point();
    ModelArpgMap.constlockLength = 10000;
    ModelArpgMap.constlockLengAdd = 5000;
    ModelArpgMap.MAPBLOCKW = 256;
    ModelArpgMap.MAPBLOCKH = 256;
    ModelArpgMap.myCamp = 0;
    ModelArpgMap.playerMap = {};
    ModelArpgMap.count = 0;
    //禁用移动
    ModelArpgMap.moveEnable = true;
    ModelArpgMap._moveHandle = {};
    return ModelArpgMap;
}(BaseModel));
__reflect(ModelArpgMap.prototype, "ModelArpgMap");
