var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuideCtrl = (function () {
    function GuideCtrl() {
    }
    GuideCtrl.getGuideStepsByName = function (gname, src) {
        if (src === void 0) { src = null; }
        var ret;
        return ret;
    };
    //穿戴装备
    GuideCtrl.putOn_Equip = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.ROLE, 'taskid': taskid },
            { 'type': 'keyEquip', 'arg': UIConst.ROLE, 'taskid': taskid, 'index': 2 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.ROLE, 'index': 3 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //通关关卡
    GuideCtrl.pass_guanqia_boss = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.GUANQIABOSSUI, 'taskid': taskid },
            { 'type': 'guanqia', 'taskid': taskid, 'index': 2 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //升级技能等级
    GuideCtrl.skill_upgrade = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.MAIN_SKILL, 'taskid': taskid },
            { 'type': 'keySkill', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.MAIN_SKILL, 'index': 3 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //武将升阶
    GuideCtrl.generalUpLevel = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.WU_JIANG, 'taskid': taskid },
            { 'type': 'generalTab', 'arg': 1, 'taskid': taskid, 'index': 2 },
            { 'type': 'keyGeneralUpLevel', 'arg': 0, 'taskid': taskid, 'index': 3 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.WU_JIANG, 'index': 4 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //晋升
    GuideCtrl.jinsheng = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.JINSHENG, 'taskid': taskid },
            { 'type': 'jinSheng_draw', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'jinSheng_jihuo', 'arg': 0, 'taskid': taskid, 'index': 3 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.JINSHENG, 'index': 4 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //装备宝物
    GuideCtrl.baowu_equip = function (taskid) {
        var cfg = Config.mission_243[taskid];
        var ret = [
            { 'type': 'openui', 'arg': UIConst.BAOWU, 'taskid': taskid },
            { 'type': 'baowu_Grid', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'baowu_upstar', 'arg': 0, 'taskid': taskid, 'index': 3 },
            { 'type': 'baowu_select', 'arg': cfg.can2 - 1, 'taskid': taskid, 'index': 4 },
            { 'type': 'baowu_use', 'arg': 0, 'taskid': taskid, 'index': 5 },
            { 'type': 'baowu_change', 'arg': 0, 'taskid': taskid, 'index': 6 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.BAOWU, 'index': 7 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //挑战个人BOSS
    GuideCtrl.personalBoss_battle = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.BOSS, 'taskid': taskid },
            { 'type': 'DRBOSS_battle', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.BOSS, 'index': 3 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //挑战铜雀台
    GuideCtrl.peacock_battle = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.FUBEN, 'taskid': taskid },
            // { 'type': 'fuben_tab', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'peacock_battleBt', 'arg': 0, 'taskid': taskid, 'index': 2 },
            // { 'type': 'peacockExit', 'arg': 0, 'taskid': taskid, 'index': 3 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.FUBEN, 'index': 3 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //熔炼一次装备
    GuideCtrl.ronglian_equip = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.RONGLIAN, 'taskid': taskid },
            // { 'type': 'rongLian_tab', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'ronglianBt', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.RONGLIAN, 'index': 3 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //锻造强化
    GuideCtrl.duanzao_streng = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.DUANZAO_STRENG, 'taskid': taskid },
            // { 'type': 'daunzao_tab', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'duanzao_keyStreng', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.DUANZAO_STRENG, 'index': 3 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //挑战全民BOSS
    GuideCtrl.quanminBoss_battle = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.BOSS, 'taskid': taskid },
            // { 'type': 'DRBOSS_tab', 'arg': 1, 'taskid': taskid, 'index': 2 },
            { 'type': 'QMBOSS_battle', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.BOSS, 'index': 3 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //加入国家
    GuideCtrl.join_country = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.COUNTRY_SELECT, 'taskid': taskid },
            { 'type': 'country_random_join', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //南征北战
    GuideCtrl.NZBZ_battle = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.COUNTRY, 'taskid': taskid, panelId: UIConst.NANZHENG_BEIZHAN },
            { 'type': 'openui', 'arg': UIConst.NANZHENG_BEIZHAN, 'taskid': taskid, 'index': 2 },
            { 'type': 'NZBZ_battle', 'arg': 0, 'taskid': taskid, 'index': 3 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.NANZHENG_BEIZHAN, 'index': 4 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //提升将衔
    GuideCtrl.up_jiangxian = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.GUANXIAN, 'taskid': taskid },
            { 'type': 'jiangxian_up', 'arg': UIConst.GUANXIAN, 'taskid': taskid, 'index': 2 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.GUANXIAN, 'index': 3 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //转生
    GuideCtrl.zhuansheng = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.ROLE, 'taskid': taskid },
            { 'type': 'zhaunsheng_tab', 'arg': 1, 'taskid': taskid, 'index': 2 },
            { 'type': 'zhuanshengBt', 'arg': UIConst.REBIRTH, 'taskid': taskid, 'index': 3 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.REBIRTH, 'index': 4 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //战甲升阶
    GuideCtrl.zhanjiaUpLevel = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.ZHAN_JIA, 'taskid': taskid },
            { 'type': 'zhanjiaTab', 'arg': 1, 'taskid': taskid },
            { 'type': 'keyZhanJiaUpLevel', 'arg': 0, 'taskid': taskid },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.ZHAN_JIA },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //玲珑阁 抽奖
    GuideCtrl.linglongge = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.LING_LONG, 'taskid': taskid },
            { 'type': 'LLG_draw', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'LLG_rewardShow', 'arg': 0, 'taskid': taskid, 'index': 3 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.LING_LONG, 'index': 4 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //自动闯关
    GuideCtrl.autoGuanQia = function (taskid) {
        var ret = [
            { 'type': 'auto_guanqia', 'arg': 0, 'taskid': taskid, 'index': 1 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //功能预览
    GuideCtrl.functionView = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.FUNCTIONPREVIEW, 'taskid': taskid },
            { 'type': 'functionView_draw', 'arg': 0, 'taskid': taskid },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.FUNCTIONPREVIEW },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //材料副本
    GuideCtrl.cailiaoFuBen = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.FUBEN_CAILIAO, 'taskid': taskid },
            { 'type': 'cailiao_battle', 'arg': Config.mission_243[taskid].type, 'taskid': taskid, 'index': 2 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.FUBEN_CAILIAO, 'index': 3 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //宝物升阶
    GuideCtrl.baowu_upgradeLv = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.BAOWU_SJ, 'taskid': taskid },
            { 'type': 'baowu_upLv', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.BAOWU_SJ, 'index': 3 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //挑战三国战神
    GuideCtrl.sgzs_battle = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.SANGUO_ZHANSHEN, 'taskid': taskid },
            { 'type': 'sgzs_battle', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.SANGUO_ZHANSHEN, 'index': 3 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //藏宝阁 抽奖
    GuideCtrl.cangbaoge = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.CANGBAOGE, 'taskid': taskid },
            { 'type': 'CBG_draw', 'arg': 0, 'taskid': taskid, index: 2 },
            { 'type': 'CBG_rewardShow', 'arg': 0, 'taskid': taskid, index: 3 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.CANGBAOGE, index: 4 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //闯关有礼
    GuideCtrl.chuangguanyouli = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.CHUANGGUANYOULI, 'taskid': taskid },
            { 'type': 'chuangguanyouli_draw', 'arg': 0, 'taskid': taskid, index: 2 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.CHUANGGUANYOULI, index: 3 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //关卡大地图
    GuideCtrl.guanqiaMap = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.GUANQIAMAP, 'taskid': taskid },
            { 'type': 'guanqiaMap_Draw', 'arg': 0, 'taskid': taskid },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.GUANQIAMAP },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //激活神剑
    GuideCtrl.shenjian_jihuo = function (taskid) {
        var cfg = Config.mission_243[taskid];
        var ret = [
            { 'type': 'openui', 'arg': UIConst.SHEN_JIAN, 'taskid': taskid },
            { 'type': 'shenJian_Grid', 'arg': cfg.can2, 'taskid': taskid, 'index': 2 },
            { 'type': 'shenJian_upstar', 'arg': cfg.can2, 'taskid': taskid, 'index': 3 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.SHEN_JIAN, 'index': 4 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    //更换武将
    GuideCtrl.change_wujiang = function (taskid) {
        var ret = [
            { 'type': 'openui', 'arg': UIConst.WU_JIANG, 'taskid': taskid },
            { 'type': 'wujiang_Grid', 'arg': 0, 'taskid': taskid, 'index': 2 },
            { 'type': 'wujiang_upstar', 'arg': 0, 'taskid': taskid, 'index': 3 },
            { 'type': 'wujiang_changeBt', 'arg': 0, 'taskid': taskid, 'index': 4 },
            { 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.WU_JIANG, 'index': 5 },
            { 'type': 'taskFinsh', 'taskid': taskid }
        ];
        return ret;
    };
    GuideCtrl.prototype.nearTarget_enter = function (ctx) {
    };
    GuideCtrl.getGuideStepArr = function (taskid, taskType) {
        switch (taskType) {
            case 15:
            case 20:
                GuideStepManager.instance.doSeq(GuideCtrl.putOn_Equip(taskid)); //穿装备
                break;
            case 1:
                GuideStepManager.instance.doSeq(GuideCtrl.pass_guanqia_boss(taskid)); //通关关卡
                break;
            case 9:
                GuideStepManager.instance.doSeq(GuideCtrl.skill_upgrade(taskid)); //技能升级
                break;
            case 10:
                GuideStepManager.instance.doSeq(GuideCtrl.generalUpLevel(taskid)); //将领升级
                break;
            case 16:
                GuideStepManager.instance.doSeq(GuideCtrl.jinsheng(taskid)); //晋升
                break;
            case 18:
                GuideStepManager.instance.doSeq(GuideCtrl.baowu_equip(taskid)); //宝物装备
                break;
            case 19:
                GuideStepManager.instance.doSeq(GuideCtrl.personalBoss_battle(taskid)); //挑战个人BOSS
                break;
            case 7:
                GuideStepManager.instance.doSeq(GuideCtrl.peacock_battle(taskid));
                break;
            case 22:
                GuideStepManager.instance.doSeq(GuideCtrl.ronglian_equip(taskid));
                break;
            case 23:
                GuideStepManager.instance.doSeq(GuideCtrl.quanminBoss_battle(taskid));
                break;
            case 2:
                GuideStepManager.instance.doSeq(GuideCtrl.duanzao_streng(taskid));
                break;
            case 24:
                GuideStepManager.instance.doSeq(GuideCtrl.join_country(taskid));
                break;
            case 25:
                GuideStepManager.instance.doSeq(GuideCtrl.NZBZ_battle(taskid));
                break;
            case 26:
                GuideStepManager.instance.doSeq(GuideCtrl.up_jiangxian(taskid));
                break;
            case 8:
                GuideStepManager.instance.doSeq(GuideCtrl.zhuansheng(taskid));
                break;
            case 11:
                GuideStepManager.instance.doSeq(GuideCtrl.zhanjiaUpLevel(taskid));
                break;
            case 6:
                ViewLingLongShow.isGuide = Model_player.taskSt != 0;
                GuideStepManager.instance.doSeq(GuideCtrl.linglongge(taskid));
                break;
            case 21:
                if (GGlobal.modelGuanQia.auto) {
                    GGlobal.modelPlayer.CG_SCENETASK_SUBMISSION(1);
                }
                else {
                    GuideStepManager.instance.doSeq(GuideCtrl.autoGuanQia(taskid));
                }
                break;
            case 27:
                GuideStepManager.instance.doSeq(GuideCtrl.functionView(taskid));
                break;
            case 29:
                GuideStepManager.instance.doSeq(GuideCtrl.cailiaoFuBen(taskid));
                break;
            case 12:
                GuideStepManager.instance.doSeq(GuideCtrl.baowu_upgradeLv(taskid));
                break;
            case 39:
                GuideStepManager.instance.doSeq(GuideCtrl.sgzs_battle(taskid));
                break;
            case 44:
                View_Reward_Show2.isGuide = Model_player.taskSt != 0;
                GuideStepManager.instance.doSeq(GuideCtrl.cangbaoge(taskid));
                break;
            case 43:
                //取消关卡大地图的引导
                //GuideStepManager.instance.doSeq(GuideCtrl.guanqiaMap(taskid) as Array<any>);
                break;
            case 42:
                ViewChuangGuanYL.isGuide = Model_player.taskSt != 0;
                GuideStepManager.instance.doSeq(GuideCtrl.chuangguanyouli(taskid));
                break;
            case 45:
                GuideStepManager.instance.doSeq(GuideCtrl.shenjian_jihuo(taskid));
                break;
            case 48:
                GuideStepManager.instance.doSeq(GuideCtrl.change_wujiang(taskid));
                break;
        }
    };
    return GuideCtrl;
}());
__reflect(GuideCtrl.prototype, "GuideCtrl");
