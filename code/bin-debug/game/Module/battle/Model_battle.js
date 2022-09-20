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
var Model_battle = (function (_super) {
    __extends(Model_battle, _super);
    function Model_battle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_battle.prototype.enterScene = function (sysID) {
        var sceneType = 0;
        switch (sysID) {
            case UIConst.FHLY:
                FengHuoLYCtr.enterBattle();
                break;
            case UIConst.WENDINGTX:
                WenDingTXManager.enterBattle();
                break;
            case UIConst.KFWZ:
                //跨服王者不走公共的SERVERBATTLE
                GGlobal.mapscene.enterScene(SceneCtrl.KFWZ);
                return;
            default:
                break;
        }
        GGlobal.mapscene.enterScene(SceneCtrl.SERVERBATTLE);
    };
    /**3861	使用技能 I:技能id */
    Model_battle.prototype.CG_PLAYER_USESKILL = function (skillID) {
        var ba = new BaseBytes();
        ba.writeInt(skillID);
        this.sendSocket(3861, ba, true);
    };
    /**3865	技能击中 I:技能id[L:玩家id]技能攻击范围内玩家集合 */
    Model_battle.prototype.CG_BATTLE_BEATENEMY = function (skillID, roles) {
        var ba = new BaseBytes();
        ba.writeInt(skillID);
        ba.writeShort(roles.length);
        for (var i = 0; i < roles.length; i++) {
            ba.writeLong(roles[i].id);
        }
        this.sendSocket(3865, ba, true);
    };
    /**3871 退出 */
    Model_battle.prototype.CG_EXIT_BATTLE = function () {
        var ba = new BaseBytes();
        this.sendSocket(3871, ba, true);
    };
    Model_battle.prototype.listenServ = function (wsm) {
        var s = this;
        s.socket = wsm;
        wsm.regHand(3860, s.GC_BATTLE_DATA, s);
        wsm.regHand(3862, s.GC_BATTLE_USESKILL, s);
        wsm.regHand(3864, s.GC_BATTLE_UPDATEROLE_STATE, s);
        wsm.regHand(3866, s.GC_UPDATE_BATTLE_BUFFSTATE, s);
        wsm.regHand(3868, s.GC_BATTLE_OVER, s);
        wsm.regHand(3870, s.GC_UPDATE_ROLEHP, s);
        wsm.regHand(3872, s.GC_EXIT_BATTLE, s);
        wsm.regHand(3874, s.GC_BATTLE_NEXT_ROUND, s);
    };
    /**3872	玩家离开战斗 L:离开的玩家id */
    Model_battle.prototype.GC_EXIT_BATTLE = function (self, data) {
        var roleID = data.readLong();
        var role = GGlobal.mapscene.getUnit(roleID);
        if (role) {
            role.takeMaxHurt();
            ViewCommonWarn.text(role.name + "退出了战斗");
        }
    };
    /**3870	更新玩家血量 [L:玩家idL:当前血量]玩家血量 */
    Model_battle.prototype.GC_UPDATE_ROLEHP = function (self, data) {
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var roleID = data.readLong();
            var curHp = data.readLong();
            var role = GGlobal.mapscene.getUnit(roleID);
            if (role) {
                console.log("玩家名称" + role.name + "玩家当前气血+" + curHp);
                role.curhp = curHp;
                if (role.curhp <= 0) {
                    role.takeMaxHurt();
                }
            }
        }
    };
    /**3868	战斗结束 L:战斗唯一idB:战斗结果：0：失败，1：胜利[B:类型I:道具idI:数量B:是否额外]奖励数据 */
    Model_battle.prototype.GC_BATTLE_OVER = function (self, data) {
        var battleId = data.readLong();
        var result = data.readByte();
        var moduleId = data.readInt();
        var len = data.readShort();
        var arr = [];
        if (result == 1) {
            for (var i = 0; i < len; i++) {
                var type = data.readByte();
                var id = data.readInt();
                var count = data.readInt();
                var extra = data.readByte();
                var vo;
                if (type == Enum_Attr.EQUIP) {
                    vo = VoEquip.create(id);
                }
                else if (type == Enum_Attr.ITEM) {
                    vo = VoItem.create(id);
                }
                else {
                    vo = Vo_Currency.create(type);
                }
                vo.count = count;
                vo.extra = extra;
                arr.push(vo);
            }
        }
        switch (moduleId) {
            case UIConst.WENDINGTX:
                WenDingTXManager.leavelBattleScene();
                break;
            case UIConst.BOSS_BATTLEFIELD_CROSS:
            case UIConst.BOSS_BATTLEFIELD_LOCAL:
                BossZCManager.battleEnd(result, arr);
                break;
            case UIConst.LIANGCAO://do nothing
                if (result == 1) {
                    ViewCommonWin.show(arr, 5000, self, "确定", null, null, true);
                }
                else {
                    ViewBattleFault.show(5000, self, "退出", function () { }, function () { }, function () { });
                }
                break;
            case UIConst.KFWZ:
                if (result == 1) {
                    //胜利
                    GGlobal.modelKfwz.showResultPanel(0);
                }
                else {
                    GGlobal.modelKfwz.showResultPanel(1);
                }
                break;
            // case UIConst.LHFB:
            // 	GGlobal.modelLhfb.showResultPanel(result, arr);
            // 	break;
            default:
                if (result == 1) {
                    ViewCommonWin.show(arr, 5000);
                }
                else {
                    ViewCommonFail.show(5000);
                }
                break;
        }
        Model_battle.battleId = 0;
    };
    /**3866	刷新buff状态 [L:玩家id[I:buffIdB:状态（1：生效，2：失效）]]玩家buff数据 */
    Model_battle.prototype.GC_UPDATE_BATTLE_BUFFSTATE = function (self, data) {
        var roleArr = {};
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            var roleID = data.readLong();
            if (!roleArr[roleID])
                roleArr[roleID] = [];
            for (var j = 0, len1 = data.readShort(); j < len1; j++) {
                var buffid = data.readInt();
                var state = data.readByte();
                roleArr[roleID].push({ buffID: buffid, state: state });
            }
        }
        Model_battle.buffDic = roleArr;
        self.updateBuff(roleArr);
    };
    Model_battle.prototype.updateBuff = function (roleData) {
        var self = this;
        for (var key in roleData) {
            var role = GGlobal.mapscene.getUnit(key);
            if (role) {
                for (var i = 0; i < roleData[key].length; i++) {
                    if (roleData[key][i].state == 1) {
                        role.addServerBuff(roleData[key][i].buffID);
                    }
                    else {
                        role.clearServerBuff(roleData[key][i].buffID);
                    }
                }
                delete Model_battle.buffDic[Number(key)];
            }
        }
    };
    /**3862	同步技能释放 L:玩家idI:技能id */
    Model_battle.prototype.GC_BATTLE_USESKILL = function (self, data) {
        var roleID = data.readLong();
        var skillID = data.readInt();
        var role = GGlobal.mapscene.getUnit(roleID);
        if (role) {
            role.waitSkillID = skillID;
        }
    };
    /**3864	同步技能释放 L:放技能的玩家I:技能id[L:玩家idL:变化血量（负的为扣除，正的为增加）B:是否暴击，1：是，0：否[I:buffid]]玩家信息*/
    Model_battle.prototype.GC_BATTLE_UPDATEROLE_STATE = function (self, data) {
        var roleID = data.readLong();
        var skillID = data.readInt();
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var playerID = data.readLong();
            var hp = data.readLong();
            var isCrit = data.readByte();
            var buffArr = [];
            for (var j = 0, len1 = data.readShort(); j < len1; j++) {
                var buffID = data.readInt();
            }
            Model_battle.hurtArr.push([playerID, hp, isCrit, buffArr]);
        }
        if (Model_player.voMine.id != roleID) {
            var role = GGlobal.mapscene.getUnit(roleID);
            if (role) {
                role.endSkill();
                role.waitSkillID = skillID;
            }
        }
    };
    /**3860	通知前端战斗信息战斗开始 L:战斗唯一id[L:阵营1玩家idL:当前气血L:最大气血I:宝物1I:宝物1星级I:宝物2I:宝物2星级I:天书I:天书星级I:神剑]阵营1玩家集合
     * [L:阵营2玩家idL:当前气血L:最大气血I:宝物1I:宝物1星级I:宝物2I:宝物2星级I:天书I:天书星级I:神剑]阵营2玩家集合I:功能系统id */
    Model_battle.prototype.GC_BATTLE_DATA = function (self, data) {
        Model_battle.battleId = data.readLong();
        Model_battle.leftPlayerArr = [];
        Model_battle.rightPlayerArr = [];
        var arr1 = [];
        var arr2 = [];
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var playerID = data.readLong();
            var playerVo = void 0;
            if (playerID == Model_player.voMine.id) {
                playerVo = Model_player.voMine;
            }
            else {
                playerVo = GGlobal.modelPlayer.playerDetailDic[playerID];
            }
            if (playerVo) {
                playerVo.currentHp = data.readLong();
                playerVo.hp = data.readLong();
                console.log("round1================1", playerVo.currentHp, playerVo.hp);
                console.log(playerVo.name, playerVo.id);
                playerVo.bwID1 = data.readInt();
                playerVo.bwStar1 = data.readInt();
                playerVo.bwID2 = data.readInt();
                playerVo.bwStar2 = data.readInt();
                playerVo.tsID = data.readInt();
                playerVo.tsStar = data.readInt();
                playerVo.shenJianID = data.readInt();
            }
            arr1.push(playerVo);
        }
        for (var i = 0, len = data.readShort(); i < len; i++) {
            var playerID = data.readLong();
            var playerVo = void 0;
            if (playerID == Model_player.voMine.id) {
                playerVo = Model_player.voMine;
            }
            else {
                playerVo = GGlobal.modelPlayer.playerDetailDic[playerID];
            }
            if (playerVo) {
                playerVo.currentHp = data.readLong();
                playerVo.hp = data.readLong();
                console.log("round1================2", playerVo.currentHp, playerVo.hp);
                console.log(playerVo.name, playerVo.id);
                playerVo.bwID1 = data.readInt();
                playerVo.bwStar1 = data.readInt();
                playerVo.bwID2 = data.readInt();
                playerVo.bwStar2 = data.readInt();
                playerVo.tsID = data.readInt();
                playerVo.tsStar = data.readInt();
                playerVo.shenJianID = data.readInt();
            }
            arr2.push(playerVo);
        }
        Model_battle.leftPlayerArr = arr1;
        Model_battle.rightPlayerArr = arr2;
        Model_battle.systemID = data.readInt();
        self.enterScene(Model_battle.systemID);
        CollectManager.serverEnd();
    };
    /**3874 L-[L-L-L-I-I-I-I-I-I-I]-[L-L-L-I-I-I-I-I-I-I]-I 开始下一轮战斗 L:战斗唯一idbattleUid[L:阵营1玩家idL:当前气血L:最大气血I:宝物1I:宝物1星级I:宝物2I:宝物2星级I:天书I:天书星级I:神剑]阵营1玩家集合camp1[L:阵营2玩家idL:当前气血L:最大气血I:宝物1I:宝物1星级I:宝物2I:宝物2星级I:天书I:天书星级I:神剑]阵营2玩家集合camp2I:功能系统idsysId*/
    Model_battle.prototype.GC_BATTLE_NEXT_ROUND = function (self, data) {
        var arg1 = data.readLong();
        Model_battle.battleId = arg1;
        var t_list1 = [];
        var t_list2 = [];
        {
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var arg2 = data.readLong();
                var arg3 = data.readLong();
                var arg4 = data.readLong();
                var arg5 = data.readInt();
                var arg6 = data.readInt();
                var arg7 = data.readInt();
                var arg8 = data.readInt();
                var arg9 = data.readInt();
                var arg10 = data.readInt();
                var arg11 = data.readInt();
                var playerID = arg2;
                var playerVo = void 0;
                if (playerID == Model_player.voMine.id) {
                    playerVo = Model_player.voMine;
                }
                else {
                    playerVo = GGlobal.modelPlayer.playerDetailDic[playerID];
                }
                if (playerVo) {
                    playerVo.currentHp = arg3;
                    playerVo.hp = arg4;
                    console.log("round2================1", playerVo.currentHp, playerVo.hp);
                    console.log(playerVo.name, playerVo.id);
                    playerVo.bwID1 = arg5;
                    playerVo.bwStar1 = arg6;
                    playerVo.bwID2 = arg7;
                    playerVo.bwStar2 = arg8;
                    playerVo.tsID = arg9;
                    playerVo.tsStar = arg10;
                    playerVo.shenJianID = arg11;
                    t_list1.push(playerVo);
                }
            }
        }
        {
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var arg12 = data.readLong();
                var arg13 = data.readLong();
                var arg14 = data.readLong();
                var arg15 = data.readInt();
                var arg16 = data.readInt();
                var arg17 = data.readInt();
                var arg18 = data.readInt();
                var arg19 = data.readInt();
                var arg20 = data.readInt();
                var arg21 = data.readInt();
                var playerID = arg12;
                var playerVo = void 0;
                if (playerID == Model_player.voMine.id) {
                    playerVo = Model_player.voMine;
                }
                else {
                    playerVo = GGlobal.modelPlayer.playerDetailDic[playerID];
                }
                if (playerVo) {
                    playerVo.currentHp = arg13;
                    playerVo.hp = arg14;
                    console.log("round2================2", playerVo.currentHp, playerVo.hp);
                    console.log(playerVo.name, playerVo.id);
                    playerVo.bwID1 = arg15;
                    playerVo.bwStar1 = arg16;
                    playerVo.bwID2 = arg17;
                    playerVo.bwStar2 = arg18;
                    playerVo.tsID = arg19;
                    playerVo.tsStar = arg20;
                    playerVo.shenJianID = arg21;
                    t_list2.push(playerVo);
                }
            }
        }
        Model_battle.leftPlayerArr = t_list1;
        Model_battle.rightPlayerArr = t_list2;
        var arg22 = data.readInt();
        Model_battle.systemID = arg22;
        self.enterScene(Model_battle.systemID);
    };
    Model_battle.battleId = 0;
    Model_battle.leftPlayerArr = [];
    Model_battle.rightPlayerArr = [];
    Model_battle.systemID = 0;
    Model_battle.hurtArr = [];
    Model_battle.hurtRoleArr = [];
    /**少主攻击受伤列表 */
    Model_battle.hurtRoleArr1 = [];
    Model_battle.battleTimeDic = {};
    Model_battle.buffDic = {};
    return Model_battle;
}(BaseModel));
__reflect(Model_battle.prototype, "Model_battle");
