class GuideCtrl {
	public constructor() {
	}

	public static getGuideStepsByName(gname: string, src: any = null): any {
		var ret: any;

		return ret;
	}

	//穿戴装备
	public static putOn_Equip(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.ROLE, 'taskid': taskid},
			{ 'type': 'keyEquip', 'arg': UIConst.ROLE, 'taskid': taskid, 'index': 2 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.ROLE, 'index': 3 },
			{ 'type': 'taskFinsh', 'taskid': taskid}
		];
		return ret;
	}

	//通关关卡
	public static pass_guanqia_boss(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.GUANQIABOSSUI, 'taskid': taskid },
			{ 'type': 'guanqia', 'taskid': taskid, 'index': 2 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//升级技能等级
	public static skill_upgrade(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.MAIN_SKILL, 'taskid': taskid },
			{ 'type': 'keySkill', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.MAIN_SKILL, 'index': 3 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//武将升阶
	public static generalUpLevel(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.WU_JIANG, 'taskid': taskid },
			{ 'type': 'generalTab', 'arg': 1, 'taskid': taskid, 'index': 2 },
			{ 'type': 'keyGeneralUpLevel', 'arg': 0, 'taskid': taskid, 'index': 3 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.WU_JIANG, 'index': 4 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//晋升
	public static jinsheng(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.JINSHENG, 'taskid': taskid },
			{ 'type': 'jinSheng_draw', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'jinSheng_jihuo', 'arg': 0, 'taskid': taskid, 'index': 3 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.JINSHENG, 'index': 4 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//装备宝物
	public static baowu_equip(taskid: number): any {
		let cfg = Config.mission_243[taskid]
		var ret: any = [
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
	}

	//挑战个人BOSS
	public static personalBoss_battle(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.BOSS, 'taskid': taskid },
			{ 'type': 'DRBOSS_battle', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.BOSS, 'index': 3 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//挑战铜雀台
	public static peacock_battle(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.FUBEN, 'taskid': taskid },
			// { 'type': 'fuben_tab', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'peacock_battleBt', 'arg': 0, 'taskid': taskid, 'index': 2 },
			// { 'type': 'peacockExit', 'arg': 0, 'taskid': taskid, 'index': 3 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.FUBEN, 'index': 3 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//熔炼一次装备
	public static ronglian_equip(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.RONGLIAN, 'taskid': taskid },
			// { 'type': 'rongLian_tab', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'ronglianBt', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.RONGLIAN, 'index': 3 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//锻造强化
	public static duanzao_streng(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.DUANZAO_STRENG, 'taskid': taskid },
			// { 'type': 'daunzao_tab', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'duanzao_keyStreng', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.DUANZAO_STRENG, 'index': 3 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//挑战全民BOSS
	public static quanminBoss_battle(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.BOSS, 'taskid': taskid },
			// { 'type': 'DRBOSS_tab', 'arg': 1, 'taskid': taskid, 'index': 2 },
			{ 'type': 'QMBOSS_battle', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.BOSS, 'index': 3 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//加入国家
	public static join_country(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.COUNTRY_SELECT, 'taskid': taskid },
			{ 'type': 'country_random_join', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//南征北战
	public static NZBZ_battle(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.COUNTRY, 'taskid': taskid, panelId: UIConst.NANZHENG_BEIZHAN },
			{ 'type': 'openui', 'arg': UIConst.NANZHENG_BEIZHAN, 'taskid': taskid, 'index': 2 },
			{ 'type': 'NZBZ_battle', 'arg': 0, 'taskid': taskid, 'index': 3 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.NANZHENG_BEIZHAN, 'index': 4 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//提升将衔
	public static up_jiangxian(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.GUANXIAN, 'taskid': taskid },
			{ 'type': 'jiangxian_up', 'arg': UIConst.GUANXIAN, 'taskid': taskid, 'index': 2 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.GUANXIAN, 'index': 3 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//转生
	public static zhuansheng(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.ROLE, 'taskid': taskid },
			{ 'type': 'zhaunsheng_tab', 'arg': 1, 'taskid': taskid, 'index': 2 },
			{ 'type': 'zhuanshengBt', 'arg': UIConst.REBIRTH, 'taskid': taskid, 'index': 3 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.REBIRTH, 'index': 4 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//战甲升阶
	public static zhanjiaUpLevel(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.ZHAN_JIA, 'taskid': taskid },
			{ 'type': 'zhanjiaTab', 'arg': 1, 'taskid': taskid },
			{ 'type': 'keyZhanJiaUpLevel', 'arg': 0, 'taskid': taskid },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.ZHAN_JIA },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//玲珑阁 抽奖
	public static linglongge(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.LING_LONG, 'taskid': taskid },
			{ 'type': 'LLG_draw', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'LLG_rewardShow', 'arg': 0, 'taskid': taskid, 'index': 3 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.LING_LONG, 'index': 4 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//自动闯关
	public static autoGuanQia(taskid: number): any {
		var ret: any = [
			{ 'type': 'auto_guanqia', 'arg': 0, 'taskid': taskid, 'index': 1 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//功能预览
	public static functionView(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.FUNCTIONPREVIEW, 'taskid': taskid },
			{ 'type': 'functionView_draw', 'arg': 0, 'taskid': taskid },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.FUNCTIONPREVIEW },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//材料副本
	public static cailiaoFuBen(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.FUBEN_CAILIAO, 'taskid': taskid },
			{ 'type': 'cailiao_battle', 'arg': Config.mission_243[taskid].type, 'taskid': taskid, 'index': 2 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.FUBEN_CAILIAO, 'index': 3 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//宝物升阶
	public static baowu_upgradeLv(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.BAOWU_SJ, 'taskid': taskid },
			{ 'type': 'baowu_upLv', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.BAOWU_SJ, 'index': 3 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//挑战三国战神
	public static sgzs_battle(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.SANGUO_ZHANSHEN, 'taskid': taskid },
			{ 'type': 'sgzs_battle', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.SANGUO_ZHANSHEN, 'index': 3 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//藏宝阁 抽奖
	public static cangbaoge(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.CANGBAOGE, 'taskid': taskid },
			{ 'type': 'CBG_draw', 'arg': 0, 'taskid': taskid, index: 2 },
			{ 'type': 'CBG_rewardShow', 'arg': 0, 'taskid': taskid, index: 3 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.CANGBAOGE, index: 4 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//闯关有礼
	public static chuangguanyouli(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.CHUANGGUANYOULI, 'taskid': taskid },
			{ 'type': 'chuangguanyouli_draw', 'arg': 0, 'taskid': taskid, index: 2 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.CHUANGGUANYOULI, index: 3 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//关卡大地图
	public static guanqiaMap(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.GUANQIAMAP, 'taskid': taskid },
			{ 'type': 'guanqiaMap_Draw', 'arg': 0, 'taskid': taskid },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.GUANQIAMAP },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//激活神剑
	public static shenjian_jihuo(taskid: number): any {
		let cfg = Config.mission_243[taskid]
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.SHEN_JIAN, 'taskid': taskid },
			{ 'type': 'shenJian_Grid', 'arg': cfg.can2, 'taskid': taskid, 'index': 2 },
			{ 'type': 'shenJian_upstar', 'arg': cfg.can2, 'taskid': taskid, 'index': 3 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.SHEN_JIAN, 'index': 4 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	//更换武将
	public static change_wujiang(taskid: number): any {
		var ret: any = [
			{ 'type': 'openui', 'arg': UIConst.WU_JIANG, 'taskid': taskid },
			{ 'type': 'wujiang_Grid', 'arg': 0, 'taskid': taskid, 'index': 2 },
			{ 'type': 'wujiang_upstar', 'arg': 0, 'taskid': taskid, 'index': 3 },
			{ 'type': 'wujiang_changeBt', 'arg': 0, 'taskid': taskid, 'index': 4 },
			{ 'type': 'closeui', 'irreversible': '1', 'arg': UIConst.WU_JIANG, 'index': 5 },
			{ 'type': 'taskFinsh', 'taskid': taskid }
		];
		return ret;
	}

	public nearTarget_enter(ctx: Object): void {
	}

	public static getGuideStepArr(taskid: number, taskType: number): void {
		switch (taskType) {
			case 15:
			case 20:
				GuideStepManager.instance.doSeq(GuideCtrl.putOn_Equip(taskid) as Array<any>);//穿装备
				break;
			case 1:
				GuideStepManager.instance.doSeq(GuideCtrl.pass_guanqia_boss(taskid) as Array<any>);//通关关卡
				break;
			case 9:
				GuideStepManager.instance.doSeq(GuideCtrl.skill_upgrade(taskid) as Array<any>);//技能升级
				break;
			case 10:
				GuideStepManager.instance.doSeq(GuideCtrl.generalUpLevel(taskid) as Array<any>);//将领升级
				break;
			case 16:
				GuideStepManager.instance.doSeq(GuideCtrl.jinsheng(taskid) as Array<any>);//晋升
				break;
			case 18:
				GuideStepManager.instance.doSeq(GuideCtrl.baowu_equip(taskid) as Array<any>);//宝物装备
				break;
			case 19:
				GuideStepManager.instance.doSeq(GuideCtrl.personalBoss_battle(taskid) as Array<any>);//挑战个人BOSS
				break;
			case 7:
				GuideStepManager.instance.doSeq(GuideCtrl.peacock_battle(taskid) as Array<any>);
				break;
			case 22:
				GuideStepManager.instance.doSeq(GuideCtrl.ronglian_equip(taskid) as Array<any>);
				break;
			case 23:
				GuideStepManager.instance.doSeq(GuideCtrl.quanminBoss_battle(taskid) as Array<any>);
				break;
			case 2:
				GuideStepManager.instance.doSeq(GuideCtrl.duanzao_streng(taskid) as Array<any>);
				break;
			case 24:
				GuideStepManager.instance.doSeq(GuideCtrl.join_country(taskid) as Array<any>);
				break;
			case 25:
				GuideStepManager.instance.doSeq(GuideCtrl.NZBZ_battle(taskid) as Array<any>);
				break;
			case 26:
				GuideStepManager.instance.doSeq(GuideCtrl.up_jiangxian(taskid) as Array<any>);
				break;
			case 8:
				GuideStepManager.instance.doSeq(GuideCtrl.zhuansheng(taskid) as Array<any>);
				break;
			case 11:
				GuideStepManager.instance.doSeq(GuideCtrl.zhanjiaUpLevel(taskid) as Array<any>);
				break;
			case 6:
				ViewLingLongShow.isGuide = Model_player.taskSt != 0;
				GuideStepManager.instance.doSeq(GuideCtrl.linglongge(taskid) as Array<any>);
				break;
			case 21:
				if (GGlobal.modelGuanQia.auto) {
					GGlobal.modelPlayer.CG_SCENETASK_SUBMISSION(1);
				} else {
					GuideStepManager.instance.doSeq(GuideCtrl.autoGuanQia(taskid) as Array<any>);
				}
				break;
			case 27:
				GuideStepManager.instance.doSeq(GuideCtrl.functionView(taskid) as Array<any>);
				break;
			case 29:
				GuideStepManager.instance.doSeq(GuideCtrl.cailiaoFuBen(taskid) as Array<any>);
				break;
			case 12:
				GuideStepManager.instance.doSeq(GuideCtrl.baowu_upgradeLv(taskid) as Array<any>);
				break;
			case 39:
				GuideStepManager.instance.doSeq(GuideCtrl.sgzs_battle(taskid) as Array<any>);
				break;
			case 44:
				View_Reward_Show2.isGuide = Model_player.taskSt != 0;
				GuideStepManager.instance.doSeq(GuideCtrl.cangbaoge(taskid) as Array<any>);
				break;
			case 43:
				//取消关卡大地图的引导
				//GuideStepManager.instance.doSeq(GuideCtrl.guanqiaMap(taskid) as Array<any>);
				break;
			case 42:
				ViewChuangGuanYL.isGuide = Model_player.taskSt != 0
				GuideStepManager.instance.doSeq(GuideCtrl.chuangguanyouli(taskid) as Array<any>);
				break;
			case 45:
				GuideStepManager.instance.doSeq(GuideCtrl.shenjian_jihuo(taskid) as Array<any>);
				break;
			case 48:
				GuideStepManager.instance.doSeq(GuideCtrl.change_wujiang(taskid) as Array<any>);
				break;
		}
	}
}