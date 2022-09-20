var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameUnitManager = (function () {
    function GameUnitManager() {
    }
    GameUnitManager.initData = function () {
        GameUnitManager.hero = new ARPGHero();
        GameUnitManager.hero.id = Model_player.voMine.id;
    };
    GameUnitManager.init = function () {
        var hero = GameUnitManager.hero;
        hero.initData(ModelArpgMap.hero);
        GameUnitManager.addUnit(hero);
        var namebar = ArpgPlayerNamePlug.create();
        namebar.role = hero;
        hero.addSinglePlug(namebar, ArpgPlayerNamePlug);
        ModelArpgMap.getInstance().notify(Enum_MsgType.ARPG_SCENE_ADD_PLAYER, hero.id);
        // GameUnitManager.moveTargetPoint = new MoveTargetPoint();
        // GameUnitManager.addUnit(GameUnitManager.moveTargetPoint);
    };
    GameUnitManager.run = function (ctx) {
        var self = this;
        var list = self.list;
        var len = self.list.length;
        var cleanflag;
        self.sortTime += ctx.dt;
        ctx.logicTime = self.sortTime >= 179;
        for (var i = 0; i < len;) {
            var term = self.list[i];
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
            }
            else {
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
    };
    GameUnitManager.getObjectUnderPoint = function (point) {
        for (var key in ARPGNpc.list) {
            var npc = ARPGNpc.list[key];
            if (npc && npc.view.hitTestPoint(point.x, point.y, true)) {
                return npc;
            }
        }
        for (var key in ArpgPlayer.list) {
            var player = ArpgPlayer.list[key];
            if (player.view.hitTestPoint(point.x, point.y, true)) {
                return player;
            }
        }
        for (var key in Door.list) {
            var door = Door.list[key];
            if (door.view.hitTestPoint(point.x, point.y)) {
                return door;
            }
        }
        return null;
    };
    GameUnitManager.updatePlayerColorName = function () {
        for (var key in ArpgPlayer.list) {
            var player = ArpgPlayer.list[key];
            var plug = player.getPlugBytype(ArpgPlayerNamePlug);
            if (plug) {
                plug.updateNameColor();
            }
        }
    };
    GameUnitManager.getPlayerListUnderPoint = function (point) {
        var arr = [];
        for (var key in ArpgPlayer.list) {
            var player = ArpgPlayer.list[key];
            if (player.view.hitTestPoint(point.x, point.y)) {
                arr.push(player);
            }
        }
        return arr;
    };
    GameUnitManager.addUnit = function (unit, layer) {
        if (layer === void 0) { layer = 1; }
        for (var i = 0; i < GameUnitManager.list.length; i++) {
            if (unit.id == GameUnitManager.list[i].id) {
                return;
            }
        }
        unit.onAdd();
        GameUnitManager.list.push(unit);
        if (GameUnitManager.list.length > 200) {
            DEBUGWARING.log("场景动画过多！！！！");
        }
    };
    GameUnitManager.removeUnit = function (unit) {
        for (var i = 0; i < GameUnitManager.list.length; i++) {
            if (unit.id == GameUnitManager.list[i].id) {
                GameUnitManager.list.splice(i, 1);
                unit.onRemove();
                break;
            }
        }
    };
    GameUnitManager.findUnit = function (unitId, type) {
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
    };
    GameUnitManager.findHeroOrPlayer = function (id) {
        if (id == Model_player.voMine.id) {
            var ret = GameUnitManager.hero;
        }
        else {
            ret = GameUnitManager.findUnit(id, UnitType.PLAYER);
        }
        return ret;
    };
    GameUnitManager.findUnitByID = function (id) {
        for (var i = GameUnitManager.list.length - 1; i >= 0; i--) {
            if (GameUnitManager.list[i].id == id) {
                return GameUnitManager.list[i];
            }
        }
        return null;
    };
    GameUnitManager.getUnit = function (type) {
        switch (type) {
            case UnitType.PLAYER:
                return Pool.getItemByClass("ArpgPlayer", ArpgPlayer);
            case UnitType.NPC:
                return Pool.getItemByClass("ARPGNpc", ARPGNpc);
            default:
                return null;
        }
    };
    /**
     * 同场景切换坐标要先删除玩家NPC，不然会越来越多
     */
    GameUnitManager.removePlayerNpc = function () {
        for (var i = GameUnitManager.list.length - 1; i >= 0; i--) {
            var u = GameUnitManager.list[i];
            if (u && u.isHero() == false) {
                GameUnitManager.removeUnit(u);
            }
        }
    };
    GameUnitManager.checkUnit = function () {
        var ret = '';
        var roleNum;
        for (var i = GameUnitManager.list.length - 1; i >= 0; i--) {
            if (GameUnitManager.list[i] instanceof SceneObject) {
                roleNum++;
            }
        }
        return ret;
    };
    GameUnitManager.setSceneEffOption = function (v) {
        var reason = GameUnitManager.BIT_OPTION;
        if (v) {
            var temp = GameUnitManager.hideSceneEffInt & reason;
            GameUnitManager.hideSceneEffInt = GameUnitManager.hideSceneEffInt ^ temp;
        }
        else {
            GameUnitManager.hideSceneEffInt = GameUnitManager.hideSceneEffInt | reason;
        }
        for (var key in Magic.list) {
            var eff = Magic.list[key];
            if (eff.type == UnitType.MAGIC) {
                eff.visible = v;
            }
        }
    };
    GameUnitManager.dispose = function () {
        while (GameUnitManager.list.length > 0) {
            GameUnitManager.removeUnit(GameUnitManager.list[0]);
        }
        ArpgPlayer.list = {};
        ARPGNpc.list = {};
    };
    GameUnitManager.getOverObj = function () {
        ModelArpgMap.touchPoint.x = fairygui.GRoot.mouseX;
        ModelArpgMap.touchPoint.y = fairygui.GRoot.mouseY;
        var ret = GameUnitManager.getObjectUnderPoint(ModelArpgMap.touchPoint);
        GameUnitManager.overObj = ret;
    };
    GameUnitManager.isMyCamp = function (camp) {
        if (GameUnitManager.hero && GameUnitManager.hero.camp == camp) {
            return true;
        }
        return false;
    };
    GameUnitManager.refreshName = function () {
        for (var i = GameUnitManager.list.length - 1; i >= 0; i--) {
            var item = GameUnitManager.list[i];
            if (item instanceof ArpgPlayer) {
                item.refreshName();
            }
        }
    };
    GameUnitManager.hideFilter = function () {
        for (var i = GameUnitManager.list.length - 1; i >= 0; i--) {
            var item = GameUnitManager.list[i];
            if (item instanceof ArpgRole) {
                item.hideFilter();
            }
        }
    };
    GameUnitManager.list = [];
    GameUnitManager.hideSceneEffInt = 0; //隐藏场景特效
    GameUnitManager.BIT_OPTION = 1;
    GameUnitManager.lastUpdateTime = 0;
    GameUnitManager.lastRenderTime = 0;
    GameUnitManager.lastCheckOvertime = 0;
    GameUnitManager.sortTime = 0;
    return GameUnitManager;
}());
__reflect(GameUnitManager.prototype, "GameUnitManager");
