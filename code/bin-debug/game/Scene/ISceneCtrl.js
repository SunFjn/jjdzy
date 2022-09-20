var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneCtrl = (function () {
    function SceneCtrl() {
        this.pveTime = 120000;
        this.pvpTime = 60000;
        this.surTime = 20000;
        this.damageFix = 0;
        this.lastTime = 0;
        this.deadInvide = 0;
    }
    SceneCtrl.getCtrl = function (scenetype) {
        var sceneCtrl = SceneCtrl;
        GGlobal.sceneType = scenetype;
        if (scenetype == sceneCtrl.GUANQIA) {
            // if (DEBUG) {
            // 	return new GuanQiaSceneTestCtrl();
            // }
            // if (RELEASE) {
            return GuanQiaSceneCtrl.getIns();
            // }
        }
        else if (scenetype == sceneCtrl.GUANQIABOSS) {
            return GuanQiaBossCtrl.getIns();
        }
        else if (scenetype == sceneCtrl.MAINTOWN) {
            return new MainTownSceneCtrl();
        }
        else if (scenetype == sceneCtrl.YJDQ) {
            return YJDQSceneCtrl.instance;
        }
        else if (scenetype == sceneCtrl.PBOSS) {
            return new PersonalBossCtr();
        }
        else if (scenetype == sceneCtrl.PEACOCK) {
            return new PeacockSceneCtrl();
        }
        else if (scenetype == sceneCtrl.CAILIAO_FUBEN) {
            return CaiLiaoFuBenSceneCtrl.instance;
        }
        else if (scenetype == sceneCtrl.QMBOSS) {
            return new QuanMinBossSceneCtrl();
        }
        else if (scenetype == sceneCtrl.QMBOSS_DJ) {
            return new QuanMinBossSceneCtrl_dj();
        }
        else if (scenetype == sceneCtrl.NANZHENG_BEIZHAN) {
            return NanZhengBeiZhanCtrl.instance;
        }
        else if (scenetype == sceneCtrl.RUNMAN) {
            return new RunManSceneCtrl();
        }
        else if (scenetype == sceneCtrl.LVBU) {
            return new LvBuSceneCtrl();
        }
        else if (scenetype == sceneCtrl.SANGUO_ZHANSHEN) {
            return SanGuoZhanShenCtrl.instance;
        }
        else if (scenetype == sceneCtrl.KING_SHIP) {
            return KingShipCtrl.instance;
        }
        else if (scenetype == sceneCtrl.CROSS_KING) {
            return CrossKingCtrl.instance;
        }
        else if (scenetype == sceneCtrl.CROSS_WARS) {
            return CrossWarsCtrl.instance;
        }
        else if (scenetype == sceneCtrl.QXZL) {
            return QxzlCtrl.instance;
        }
        else if (scenetype == sceneCtrl.MENGHUO) {
            return new MengHuoCtr();
        }
        else if (scenetype == sceneCtrl.SGWS) {
            return PVPFightSceneProgresser.getInst();
        }
        else if (scenetype == sceneCtrl.DANDAO_FUHUI) {
            return DanDaoFuHuiCtrl.instance;
        }
        else if (scenetype == sceneCtrl.WARTODEAD) {
            return WarToDeadSceneCtrl.getInst();
        }
        else if (scenetype == sceneCtrl.COUNTRYBOSS) {
            return CountryBossCtrl.getInst();
        }
        else if (scenetype == sceneCtrl.CROSS_TEAM) {
            return CrossTeamSceneCtrl.getInst();
        }
        else if (scenetype == sceneCtrl.CROSS_SJMJ) {
            return ShengJieMJSceneCtrl.getInst();
        }
        else if (scenetype == sceneCtrl.BW_XIANSHI) {
            return new BaoWuXianShiCtrl();
        }
        else if (scenetype == sceneCtrl.FHLY) {
            return FengHuoLYCtrl.getInstance();
        }
        else if (scenetype == sceneCtrl.SERVERBATTLE) {
            return ServerDataBattleCtrl.instance;
        }
        else if (scenetype == sceneCtrl.KFWZ) {
            return KfwzCtrl.instance;
        }
        else if (scenetype == sceneCtrl.ARPG) {
            return ARPGCtrl.getInstance();
        }
        else if (scenetype == sceneCtrl.WDTX_PVE) {
            return WenDingTXPVECtrl.getInstance();
        }
        else if (scenetype == sceneCtrl.ZJYWBAT) {
            return ZJYWSceneCtrl.getInst();
        }
        else if (scenetype == sceneCtrl.BOSSZC) {
            return BossZCCtrl.getInstance();
        }
        else if (scenetype == sceneCtrl.GUANQIABOSS_HELP) {
            return GuanQiaBossServerCtr.getInstance();
        }
        else if (scenetype == sceneCtrl.SANGUO_YITONG) {
            return SanGuoYiTongSceneCtrl.instance;
        }
        else if (scenetype == sceneCtrl.LHFB) {
            return LhfbCtrl.instance;
        }
        else if (scenetype == sceneCtrl.WA_KUANG) {
            return WaKuangCtrl.instance;
        }
        else if (scenetype == sceneCtrl.HSCB) {
            return HscbSceneCtrl.getInstance();
        }
        else if (scenetype == sceneCtrl.SHAOZHU_ESCORT) {
            return ShaoZhuEscortCtrl.instance;
        }
        else if (scenetype == sceneCtrl.LIU_CHU_QS) {
            return LiuChuQSSceneCtrl.getInst();
        }
        else if (scenetype == sceneCtrl.SYZLB) {
            return SyzlbSceneCtrl.getInst();
        }
        else if (scenetype == sceneCtrl.CAOCAOLAIXI) {
            return CaoCaoCtr.instance;
        }
        else if (scenetype == sceneCtrl.TIGER_PASS) {
            return TigerPassSceneCtrl.getInst();
        }
        else if (scenetype == sceneCtrl.YISHOUBOSS) {
            return YiShouBossCtrl.getInst();
        }
        else if (scenetype == sceneCtrl.HFHD_ZFZJ) {
            return ZFZJCtr.instance;
        }
        else if (scenetype == sceneCtrl.LIANGCAO) {
            return LiangCaoPveCtr.instance;
        }
        else if (scenetype == sceneCtrl.CLIENT_BATTLE) {
            return ClientBattleSceneCtrl.instance;
        }
        else if (scenetype == sceneCtrl.TAOYUANJIEYI) {
            return TaoYuanBossCtrl.getInst();
        }
        else if (scenetype == sceneCtrl.COMMON_VIDEOTAP) {
            return CommonVideotapeCtrl.instance;
        }
        else if (scenetype == sceneCtrl.ACTCOM_LEITAI) {
            return ActComLeiTaiSceneCtrl.instance;
        }
        else if (scenetype == sceneCtrl.DENG_FENG) {
            return DengFengCtrl.instance;
        }
        else if (scenetype == sceneCtrl.HOME_QD) {
            return HomeBattleCtrl.instance;
        }
    };
    SceneCtrl.prototype.createEmeny = function (id) {
        var cfgInfo = Config.NPC_200[id];
        var enemy = SceneCharRole.create();
        enemy.id = SceneObject.COUNTER++;
        enemy.enemyid = id;
        enemy.curhp = enemy.maxhp = Number(cfgInfo.hp);
        enemy.faceDir = -1;
        enemy.force = 2;
        enemy.invalid = 1023;
        enemy.forceRightWeight = 1000;
        var skills = JSON.parse(cfgInfo.skill);
        if (skills) {
            for (var i = 0; i < skills.length; i += 1) {
                var pg = Vo_Skill.create(parseInt(skills[i][0]), parseInt(skills[i][1]), parseInt(skills[i][1]), 0, 1);
                enemy.skillList.push(pg);
            }
        }
        AttributeUtil.initEnemyAttr(enemy, cfgInfo);
        return enemy;
    };
    /***
     * 相对自己的胜负改变属性
     * 1失败 2胜利
    */
    SceneCtrl.prototype.scaleAttribute = function (role, battleRet, isSelf) {
        if (battleRet === void 0) { battleRet = 1; }
        if (isSelf === void 0) { isSelf = false; }
        // if (!isSelf) {//小怪相反
        // 	if (battleRet == 1) role.serverCtr = 2;
        // 	else if (battleRet == 2) role.serverCtr = 1;
        // } else {
        // 	role.serverCtr = battleRet;
        // }
        // role.scaleAttribute();
    };
    /**设置地图 id=地图表地图id */
    SceneCtrl.prototype.setMapHead = function (id) {
        this.scene.initWithID(id);
    };
    SceneCtrl.prototype.setRolePos = function (role, offsetX) {
        if (offsetX === void 0) { offsetX = 0; }
        var x = this.scene.map.focusx;
        if (!x) {
            x = 418;
        }
        role.x = x + offsetX;
        role.y = 612;
    };
    SceneCtrl.prototype.setBossPos = function (role, offsetX) {
        if (offsetX === void 0) { offsetX = 0; }
        var cx = this.scene.map.focusx;
        role.x = cx + 400 + offsetX;
        role.y = 600;
    };
    SceneCtrl.prototype.setMonsterPos = function (enemy) {
        var role = this.scene.getLifeHero();
        enemy.x = MathUtil.rndNum(role.x + 400, role.x + 600);
        enemy.y = MathUtil.rndNum(562, 662);
    };
    SceneCtrl.prototype.addHpAndName = function (role, isSelf) {
        var namebar = RoleHpAndNamePlug.create(isSelf);
        namebar.role = role;
        role.addPlug(namebar);
    };
    /**判断强制杀死战力低的人 */
    SceneCtrl.prototype.killRole = function (role0, role1) {
        if (role0.str >= role1.str) {
            role1.takeMaxHurt();
        }
        else {
            role0.takeMaxHurt();
        }
    };
    SceneCtrl.prototype.dmgByClient = function (ebos, bossDmgPer) {
        var self = this;
        if (GGlobal.pauseBattle)
            return;
        var role = Model_player.voMine.sceneChar;
        var now = egret.getTimer();
        if (now - self.lastTime < 1000)
            return;
        self.lastTime = now;
        if (role && role.curhp > 0 && GGlobal.mapscene.getForceCount(2) > 0) {
            if (role.immuneDmg || role.invincible) {
                return; //无敌不计算伤害
            }
            if (ebos && ((ebos.dizzState && ebos.dizzState.isWorking) || ebos.changeModel > 0)) {
                return; //定身 眩晕不计算伤害
            }
            var ret = (role.maxhp * bossDmgPer / 100) >> 0;
            if (role.curShield > 0) {
                role.curShield = role.curShield > ret ? role.curShield - ret : 0;
                ret = role.curShield > ret ? 0 : ret - role.curShield;
            }
            ret = role.curhp - ret;
            ret = ret < 0 ? 0 : ret;
            role.curhp = ret;
            if (ret <= 0 && self.deadInvide == 0) {
                role.deadThrow(5, 15);
                if (role.curhp <= 0) {
                    self.deadInvide |= 1;
                    self.tellDead();
                }
                else {
                    ret = role.curhp;
                }
            }
            GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: ret });
        }
    };
    SceneCtrl.prototype.tellDead = function () {
    };
    /**关卡小怪 */ SceneCtrl.GUANQIA = 1;
    /**关卡BOSS */ SceneCtrl.GUANQIABOSS = 2;
    /**一骑当千 */ SceneCtrl.YJDQ = 3;
    /**材料副本 */ SceneCtrl.CAILIAO_FUBEN = 4;
    /**主城地图 */ SceneCtrl.MAINTOWN = 5;
    /**单人BOSS */ SceneCtrl.PBOSS = 6;
    /**铜雀台 */ SceneCtrl.PEACOCK = 7;
    /**南征北战 */ SceneCtrl.NANZHENG_BEIZHAN = 8;
    /**过关斩将 */ SceneCtrl.RUNMAN = 9;
    /**三国战神 */ SceneCtrl.SANGUO_ZHANSHEN = 10;
    /**王位之争 */ SceneCtrl.KING_SHIP = 11;
    /**单刀赴会 */ SceneCtrl.DANDAO_FUHUI = 12;
    /**乱世枭雄 */ SceneCtrl.CROSS_KING = 13;
    /**枭雄争霸 */ SceneCtrl.CROSS_WARS = 14;
    /**全名BOSS */ SceneCtrl.QMBOSS = 21;
    /**吕布 */ SceneCtrl.LVBU = 22;
    /**孟获 */ SceneCtrl.MENGHUO = 23;
    /**三国无双 */ SceneCtrl.SGWS = 24;
    /**血战到底 */ SceneCtrl.WARTODEAD = 25;
    /**国家BOSS */ SceneCtrl.COUNTRYBOSS = 26;
    /**组队副本 */ SceneCtrl.CROSS_TEAM = 27;
    /**宝物现世 */ SceneCtrl.BW_XIANSHI = 28;
    /**升阶秘境 */ SceneCtrl.CROSS_SJMJ = 29;
    /**烽火狼烟 */ SceneCtrl.FHLY = 40;
    /**后端数据战斗 */ SceneCtrl.SERVERBATTLE = 41;
    /**自由行走地图*/ SceneCtrl.ARPG = 10000;
    /**问鼎天下 PVE战斗*/ SceneCtrl.WDTX_PVE = 42;
    /**诸将演武战斗*/ SceneCtrl.ZJYWBAT = 43;
    /**BOSS战场 BOSS*/ SceneCtrl.BOSSZC = 44;
    /**关卡协助BOSS */ SceneCtrl.GUANQIABOSS_HELP = 45;
    /**三国一统*/ SceneCtrl.SANGUO_YITONG = 46;
    /**挖矿战斗*/ SceneCtrl.WA_KUANG = 47;
    /**全名BOSS 单机*/ SceneCtrl.QMBOSS_DJ = 48;
    /**火烧赤壁*/ SceneCtrl.HSCB = 49;
    /**少主护送*/ SceneCtrl.SHAOZHU_ESCORT = 50;
    /**升阶秘境 */ SceneCtrl.LIU_CHU_QS = 51;
    /**曹操来袭 */ SceneCtrl.CAOCAOLAIXI = 52;
    /**虎牢关 */ SceneCtrl.TIGER_PASS = 53;
    /**群雄逐鹿 */ SceneCtrl.QXZL = 54;
    /**异兽BOSS*/ SceneCtrl.YISHOUBOSS = 55;
    /**张飞醉酒*/ SceneCtrl.HFHD_ZFZJ = 56;
    /**三英战吕布=*/ SceneCtrl.SYZLB = 57;
    /**粮草=*/ SceneCtrl.LIANGCAO = 58;
    /**前端用战斗 测试中*/ SceneCtrl.CLIENT_BATTLE = 59;
    /**桃园结义 */ SceneCtrl.TAOYUANJIEYI = 60;
    /**跨服王者*/ SceneCtrl.KFWZ = 61;
    /**录像*/ SceneCtrl.COMMON_VIDEOTAP = 62;
    /**活动-擂台*/ SceneCtrl.ACTCOM_LEITAI = 63;
    /**轮回副本*/ SceneCtrl.LHFB = 64;
    /**登峰造极-海选 */ SceneCtrl.DENG_FENG = 65;
    /**家园强盗*/ SceneCtrl.HOME_QD = 66;
    return SceneCtrl;
}());
__reflect(SceneCtrl.prototype, "SceneCtrl");
