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
var ARPGNpc = (function (_super) {
    __extends(ARPGNpc, _super);
    function ARPGNpc() {
        var _this = _super.call(this) || this;
        _this.cfgID = 0;
        var self = _this;
        self.lbName = new fairygui.GRichTextField();
        self.lbName.align = fairygui.AlignType.Center;
        self.lbName.fontSize = 18;
        self.lbName.stroke = 1;
        self.lbName.color = 0xfe0000;
        self.headGroup.addChild(self.lbName.displayObject);
        return _this;
    }
    ARPGNpc.prototype.init1 = function (serverID, cfgID, GlobalX, GlobalY) {
        var s = this;
        //构建外观
        s.id = serverID;
        s.cfgID = cfgID;
        s.vo = Vo_Npc.create(serverID, cfgID);
        s.setXY(GlobalX, GlobalY);
        var cfg = s.vo.cfg;
        s.lbName.text = cfg.name;
        s.name = cfg.name;
        s.lbName.color = Color.YELLOWINT;
        if (cfg.type == 12) {
            s.lbName.text = "";
        }
        else {
            if (cfg.type == Enum_NpcType.COLLECT_NPC) {
                s.lbName.color = 0xf1f1f1;
                var quility = ModelLiangCao.checkNpcQuility(cfgID);
                if (quility > -1) {
                    s.lbName.color = Color.getColorInt(quility);
                }
            }
            else if (cfg.Gongji != 0) {
                s.lbName.color = Color.REDINT;
            }
        }
        s.setBody(cfg.mod);
        if (cfg.weapon)
            s.setWeapon(cfg.mod);
        s.setMoveState(Enum_MoveState.STAND);
        s.setNameY();
    };
    ARPGNpc.prototype.setWeapon = function (v) {
        var s = this;
        v = Config.sz_739[v] ? Config.sz_739[v].moxing : v;
        if (s.weapon != v) {
            if (v) {
                s.weaponpic = v + "";
            }
            else {
                s.weaponpic = undefined;
            }
            s.weapon = v;
            s.invalid |= 1;
        }
        else {
        }
        if (!v) {
            s.parts.removePartByType(2); //移除PART
        }
    };
    ARPGNpc.prototype.setName = function (val) {
        var s = this;
        s.lbName.text = val;
        s.setNameY();
    };
    ARPGNpc.prototype.setNameY = function () {
        var s = this;
        var cfg = Config.mod_200[s.body];
        if (cfg && cfg.h) {
            if (s.namey != -cfg.h) {
                s.headGroup.y = -cfg.h;
                s.lbName.setXY(-(s.lbName.textWidth / 2) >> 0, -this.lbName.height);
            }
        }
    };
    Object.defineProperty(ARPGNpc.prototype, "isCollect", {
        set: function (value) {
            if (value) {
                if (!ARPGNpc._collectView) {
                    ARPGNpc._collectView = fairygui.UIPackage.createObjectFromURL(CommonManager.getCommonUrl("HpBar")).asProgress;
                }
                GGlobal.layerMgr.UI_MainBottom.addChild(ARPGNpc._collectView);
                var _p = this.headGroup.localToGlobal(0, 0);
                ARPGNpc._collectView.y = _p.y - this.lbName.height - ARPGNpc._collectView.height;
                ARPGNpc._collectView.x = _p.x - (ARPGNpc._collectView.width / 2);
            }
            else {
                if (ARPGNpc._collectView)
                    GGlobal.layerMgr.UI_MainBottom.removeChild(ARPGNpc._collectView);
            }
        },
        enumerable: true,
        configurable: true
    });
    ARPGNpc.setCollectViewLabel = function (label) {
        if (!ARPGNpc._collectView) {
            ARPGNpc._collectView = fairygui.UIPackage.createObjectFromURL(CommonManager.getCommonUrl("HpBar")).asProgress;
        }
        ARPGNpc._collectView.text = label;
    };
    ARPGNpc.prototype.updateCollectPro = function (rate) {
        ARPGNpc._collectView.value = rate;
    };
    ARPGNpc.prototype.interaction = function (mode) {
        if (mode === void 0) { mode = 0; }
        var self = this;
        if (!self.vo || !self.vo.cfg) {
            return;
        }
        var hero = GameUnitManager.hero;
        if (hero.lockTarget == self) {
            hero.lockTarget = null;
            hero.autoMoveID = -1;
            hero.autoMoveType = -1;
        }
        if (GGlobal.sceneType == SceneCtrl.ARPG) {
            var mapType = ModelArpgMap.getInstance().sceneType;
            switch (mapType) {
                case EnumMapType.WDTX:
                    WenDingTXManager.enterPve(self.id);
                    break;
                case EnumMapType.BOSSZC_LOCAL:
                case EnumMapType.BOSSZC_CROSS:
                    GGlobal.modelBossZc.CGfightBoss4459();
                    break;
                case EnumMapType.SANGUO_YT:
                    if (self.vo.cfg.type == Enum_NpcType.COLLECT_NPC) {
                        GGlobal.modelSanGuoYT.CG_YITONG_COLLECT_5805(self.id);
                    }
                    else {
                        GGlobal.modelSanGuoYT.CG_YITONG_BATTLE_MONEST_5811(self.id);
                    }
                    break;
                case EnumMapType.LIANGCAO:
                    if (self.vo.cfg.type == Enum_NpcType.COLLECT_NPC) {
                        GGlobal.modelLiangCao.CG_BattleGoods_getBox_10109(this.id);
                    }
                    else {
                        GGlobal.modelLiangCao.CG_BattleGoods_battleMonster_10105(this.id);
                    }
                    break;
                case EnumMapType.SYZLB:
                    GGlobal.model_Syzlb.CG_CHA_BOSS();
                    break;
                case EnumMapType.YANHUI:
                    var model = GGlobal.modelYanHui;
                    if (model.bossData1[self.id] == 1) {
                        ViewCommonWarn.text("该BOSS已挑战");
                    }
                    else {
                        model.CG_Yanhui_battleboss_11469(this.cfgID);
                    }
                    break;
                case EnumMapType.HOME:
                    HomeManager.interaction(this);
                    break;
                case EnumMapType.HOME_JD:
                    if (GGlobal.homemodel.isSelfHome) {
                        GGlobal.layerMgr.open(UIConst.HOME_JIADING_UI);
                    }
                    break;
            }
            self.hideFilter();
        }
    };
    ARPGNpc.prototype.onAdd = function () {
        _super.prototype.onAdd.call(this);
        var s = this;
        ARPGNpc.list[s.id] = this;
    };
    ARPGNpc.prototype.onRemove = function () {
        var s = this;
        delete ARPGNpc.list[s.id];
        _super.prototype.onRemove.call(this);
        if (s.vo) {
            s.vo.recover();
            s.vo = null;
        }
        Pool.recover("ARPGNpc", this);
    };
    ARPGNpc.getNPC = function (unitId) {
        var ret = ARPGNpc.list[unitId];
        if (!ret) {
            for (var i in ARPGNpc.list) {
                var temp = ARPGNpc.list[i];
                if (temp.cfgID == unitId) {
                    ret = temp;
                    break;
                }
            }
        }
        return ret;
    };
    ARPGNpc.list = {};
    return ARPGNpc;
}(ArpgRole));
__reflect(ARPGNpc.prototype, "ARPGNpc");
