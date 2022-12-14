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
var Model_Skill = (function (_super) {
    __extends(Model_Skill, _super);
    function Model_Skill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Model_Skill.getSkillByPos = function (pos) {
        var skillList = Model_player.voMine.skillList;
        var len = skillList.length;
        var vo;
        for (var i = 0; i < len; i++) {
            vo = skillList[i];
            if (vo.type == Model_Skill.TYPE2 && (vo.id % 100) - 4 == pos) {
                return vo;
            }
        }
    };
    Model_Skill.getSkillLv = function () {
        var level = 0;
        var skillList = Model_player.voMine.skillList;
        var len = skillList.length;
        var vo;
        for (var i = 0; i < len; i++) {
            vo = skillList[i];
            if (vo.type == Model_Skill.TYPE2) {
                level += vo.level;
            }
        }
        return level;
    };
    Model_Skill.checkGodSkillTabNotice = function () {
        var len = Model_player.voMine.skillList.length;
        var isCheck = false;
        var vo;
        for (var i = 0; i < len; i++) {
            if (Model_player.voMine.skillList[i].type == Model_Skill.TYPE3) {
                vo = Model_player.voMine.skillList[i];
                break;
            }
        }
        if (!vo)
            return;
        for (var i = 0; i < 3; i++) {
            var skillId = vo.zhenYanArr[i];
            var cfg = Config.godskill_210[skillId];
            if (cfg.next > 0) {
                var costArr = JSON.parse(cfg.consume);
                var count = Model_Bag.getItemCount(costArr[0][1]);
                if (count >= costArr[0][2]) {
                    isCheck = true;
                    break;
                }
            }
        }
        return isCheck;
    };
    Model_Skill.checkSkillTabNotice = function () {
        var arr = Model_player.voMine.skillList;
        var len = arr.length;
        var ret = false;
        for (var i = 0; i < len; i++) {
            var vo = arr[i];
            if (vo.type == Model_Skill.TYPE2 && vo.level > 0 && vo.level < Model_LunHui.realLv) {
                var cost = Config.xiaohao_210[vo.level].xiaohao;
                if (cost <= 0) {
                }
                else {
                    if (Model_player.voMine.tongbi >= cost) {
                        ret = true;
                        break;
                    }
                    else {
                    }
                }
            }
        }
        return ret;
    };
    /**621 ???????????? I:??????id  */
    Model_Skill.prototype.CG_UPGRADE_SKILL = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(621, ba);
    };
    /**623 ???????????? I:??????id  */
    Model_Skill.prototype.CG_UPGRADE_GODSKILL_ZHENYAN = function (id) {
        var ba = new BaseBytes();
        ba.writeInt(id);
        this.sendSocket(623, ba);
    };
    /**625  ????????????????????????    */
    Model_Skill.prototype.CG_KEYUPGRADE_SKILL = function () {
        var ba = new BaseBytes();
        this.sendSocket(625, ba);
    };
    /**627	CG ?????????????????????1??????2??????????????? B:????????????I:??????id */
    Model_Skill.prototype.CG_USE_SKILL = function (type, id) {
        var ba = new BaseBytes();
        ba.writeByte(type);
        ba.writeInt(id);
        this.sendSocket(627, ba, true);
    };
    /** ?????? WEBSOCKET HANLDER ??????*/
    Model_Skill.prototype.listenServ = function (wsm) {
        this.socket = wsm;
        wsm.regHand(622, this.GC_UPGRADE_SKILL, this);
        wsm.regHand(624, this.GC_UPGRADE_GODSKILL_ZHENYAN, this);
        wsm.regHand(626, this.GC_KEYUPGRADE_SKILL, this);
        wsm.regHand(630, this.GC_SKILL_OPEN, this);
    };
    /**630 ?????????????????? B:????????????I:??????idS:????????????  */
    Model_Skill.prototype.GC_SKILL_OPEN = function (self, data) {
        var pos = data.readByte();
        var skillId = data.readInt();
        var level = data.readShort();
        if (!Model_player.voMine)
            return;
        var skillList = Model_player.voMine.skillList;
        var len = skillList.length;
        var vo;
        for (var i = 0; i < len; i++) {
            if (skillList[i].id == skillId) {
                vo = skillList[i];
                break;
            }
        }
        vo.level = level;
        vo.updatePower();
        GGlobal.control.notify(Enum_MsgType.SKILL_UPDATE);
    };
    /**626 ?????????????????? B:???????????? 0?????????1??????[I:??????idS:????????????]????????????  */
    Model_Skill.prototype.GC_KEYUPGRADE_SKILL = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var len = data.readShort();
            for (var i = 0; i < len; i++) {
                var skillID = data.readInt();
                var level = data.readShort();
                for (var j = 0; j < Model_player.voMine.skillList.length; j++) {
                    if (Model_player.voMine.skillList[j].id == skillID) {
                        Model_player.voMine.skillList[j].level = level;
                        Model_player.voMine.skillList[j].updatePower();
                        break;
                    }
                }
            }
            GGlobal.control.notify(Enum_MsgType.SKILL_UPDATE);
        }
    };
    /**624 ?????????????????? B:0?????????1??????I:??????????????????id?????????????????????I:?????????id  */
    Model_Skill.prototype.GC_UPGRADE_GODSKILL_ZHENYAN = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var zhenyanId = data.readInt();
            var id = data.readInt();
            var arr = Model_player.voMine.skillList;
            var len = arr.length;
            var vo = void 0;
            for (var i = 0; i < len; i++) {
                if (arr[i].type == Model_Skill.TYPE3) {
                    vo = arr[i];
                    vo.zhenYanArr[Math.floor(zhenyanId / 1000) - 1] = zhenyanId;
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.GODSKILL_UPDATE, zhenyanId);
        }
    };
    /**622 ?????????????????? B:0?????????1??????I:???????????????id?????????????????????  */
    Model_Skill.prototype.GC_UPGRADE_SKILL = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            var skillID = data.readInt();
            var len = Model_player.voMine.skillList.length;
            for (var i = 0; i < len; i++) {
                if (skillID == Model_player.voMine.skillList[i].id) {
                    Model_player.voMine.skillList[i].level++;
                    Model_player.voMine.skillList[i].updatePower();
                    break;
                }
            }
            GGlobal.control.notify(Enum_MsgType.SKILL_UPDATE);
        }
    };
    /**1.??????2.??????3.???????????? */
    Model_Skill.TYPE1 = 1;
    /**1.??????2.??????3.???????????? */
    Model_Skill.TYPE2 = 2;
    /**1.??????2.??????3.???????????? */
    Model_Skill.TYPE3 = 3;
    /**???????????? */
    Model_Skill.TYPE4 = 4;
    /**???????????? */
    Model_Skill.TYPE5 = 5;
    /**???????????? */
    Model_Skill.TYPE6 = 6;
    /**???????????? */
    Model_Skill.TYPE7 = 7;
    /**?????????????????? */
    Model_Skill.TYPE10 = 10;
    /**??????????????????ID */
    Model_Skill.bqSkillID = 150001;
    return Model_Skill;
}(BaseModel));
__reflect(Model_Skill.prototype, "Model_Skill");
