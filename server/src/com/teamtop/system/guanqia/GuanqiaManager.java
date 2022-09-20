package com.teamtop.system.guanqia;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.actGift.ActGiftManager;
import com.teamtop.system.antiAddictionSystem.AntiAddictionFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.countrySkill.CountrySkillFunction;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.guanQiaHelp.GuanQiaHelp;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.vip.VipAddType;
import com.teamtop.system.vip.VipFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.clone.CloneUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_BOSS_205;
import excel.config.Config_clear_205;
import excel.config.Config_dgq_205;
import excel.config.Config_kill_205;
import excel.config.Config_xiaoguai_205;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_BOSS_205;
import excel.struct.Struct_dgq_205;
import excel.struct.Struct_kill_205;
import excel.struct.Struct_xtcs_004;


/**
 * 关卡
 */
public class GuanqiaManager {
	private static GuanqiaManager ins = null;

	public static GuanqiaManager getIns() {
		if (ins == null) {
			ins = new GuanqiaManager();
		}
		return ins;
	}
	/**
	 * 打完第X波小怪  1101
	 * @param curMonsterCount| 第X波小怪| byte
	 */
	public void syncCurMonster(Hero hero, int curMonsterCount) {
		Guanqia guanqia = hero.getGuanqia();
		long now = System.currentTimeMillis();
		int awardNum = 1;// 奖励倍数
		if(guanqia.getSyncTime()>0){
			int compare = (int) (now - guanqia.getSyncTime());
			if(compare<3000){
				//若前端发送给后端的请求时间<3s，则视为异常，不给奖励且后台记录异常流水
				LogTool.warn("guanqia compare:"+compare+",hid:"+hero.getId(), this);
				return;
			}else if(compare>=6000){
				//若前端在线且请求时间>=6s，则玩家奖励=int((当前时间-上次请求时间)/3)*当前关卡奖励 （向下取整）。
				//注：前端飘字仍然只显示1次本关奖励
				awardNum = compare / 3000;
			}else{
				//若前端在线请求时间≥3，且＜6，则玩家获得一波关卡奖励

			}
		}
		guanqia.setSyncTime(now);
		int curGuanqia = guanqia.getCurGuanqia();
		int bigGuanqia = guanqia.getBigGuanqia();
		int tmepBigGuanqia = GuanqiaFunction.getIns().getBigGuanqia(curGuanqia);
		if (tmepBigGuanqia != bigGuanqia) {
			curGuanqia -= 1;
		}
		int curMonster = guanqia.getCurMonster();
		Struct_BOSS_205 struct_BOSS_205 = Config_BOSS_205.getIns().get(curGuanqia);
		int[][] m = Config_xiaoguai_205.getIns().get(struct_BOSS_205.getLj()).getM();
		int npcid = BattleFunction.getMaxNpcid(m, 1);
		boolean checkWinGuanqia = BattleFunction.checkWinGuanqia(hero, npcid, m[0][2]);
		if(!checkWinGuanqia){
			GuanqiaSender.sendCmd_1102(hero.getId(), null,curMonster);
			return;
		}
		if (curMonster < struct_BOSS_205.getBS()) {
			curMonster++;
			guanqia.setCurMonster(curMonster);
		}
		// 斩杀数量
		int monsterNum = 0;// 当前这波怪的数量
		for (int i = 0; i < m.length; i++) {
			monsterNum += m[i][2];
		}
		int killMonsterCount = guanqia.getKillMonsterCount();
		int maxKillMosterNum = GuanqiaCache.getMaxKillMosterNum();
		if (killMonsterCount < maxKillMosterNum) {
			killMonsterCount += monsterNum;
			if (killMonsterCount > maxKillMosterNum) {
				killMonsterCount = maxKillMosterNum;
			}
		}
		guanqia.setKillMonsterCount(killMonsterCount);

		List<ProbabilityEventModel> pelist = GuanqiaCache.getMonsterDropMap().get(struct_BOSS_205.getLj());
		int size = pelist.size();
		List<Object[]> dropTips = new ArrayList<Object[]>();
		List<int[]> dropArr = new ArrayList<int[]>();
		
		int addition = GuanqiaFunction.getIns().getAddition(hero);
		int punish = AntiAddictionFunction.getIns().getPunish(hero);
		for(int i=0;i<size;i++){
			ProbabilityEventModel pe = pelist.get(i);
			int[] reward = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
			if (reward != null) {
				int[] js = new int[reward.length];
				for (int n = 0; n < reward.length; n++) {
					js[n] = reward[n];
				}
				int type = js[0];
				if(type==GameConst.GENDROP){
					int num = js[2];
					ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
					for(int j=1;j<=num;j++){
						js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
						dropArr.add(js);
						dropTips.add(new Object[]{js[0],js[1],js[2]});
					}
				}else{
					if (js[0] == GameConst.EXP) {
						js[2] = js[2] * (100 + addition) / 100;
					}
					if (punish > 0) {
						js[2] = js[2] / punish;
					}
					dropArr.add(js);
					dropTips.add(new Object[]{js[0],js[1],js[2]});
				}
			}
		}
		// double coinEff = Math.round(102857+514.286*(curGuanqia-1));
		// double expEff = Math.round((25740+643.333*(curGuanqia-1))/60)*60;
		// double exp = expEff/3600*7*RandomUtil.getRandomNumInAreas(90, 110)/100f;
		// double coin = coinEff/3600*7*RandomUtil.getRandomNumInAreas(90, 110)/100f;
		// if(ProbabilityEventUtil.canRunEvent(20, 100)){
		// coin += coinEff/3600*7*RandomUtil.getRandomNumInAreas(90, 110)/100f;
		// }
		// if(ProbabilityEventUtil.canRunEvent(5, 100)){
		// coin += coinEff/3600*7*RandomUtil.getRandomNumInAreas(90, 110)/100f;
		// }
		// dropTips.add(new Object[]{GameConst.EXP,0,(int)exp});
		// dropTips.add(new Object[]{GameConst.COIN,0,(int)coin});
		// UseAddUtil.add(hero, GameConst.EXP, (int) exp * awardNum,
		// SourceGoodConst.GUANQIA_ZHANG_REWARD, false);
		// UseAddUtil.add(hero, GameConst.COIN, (int) coin * awardNum,
		// SourceGoodConst.GUANQIA_ZHANG_REWARD, false);
		if (punish > 0) {
			CountrySkillFunction.getIns().onlineExpAndCoinHandle(hero, dropArr, dropTips, false);
			int[][] d = new int[dropArr.size()][];
			dropArr.toArray(d);
			UseAddUtil.add(hero, d, awardNum, SourceGoodConst.GUANQIA_ZHANG_REWARD, null, false);
		} else if (punish == 0) {
			dropTips.clear();
		}
		GuanqiaSender.sendCmd_1102(hero.getId(), dropTips.toArray(),curMonster);
//		GuanqiaFunction.getIns().updateRedPoint(hero);
	}
	/**
	 * 打开挑战boss界面 1103
	 */
	public void openBossUI(Hero hero) {
		List<GuanqiaRank> rankList = GuanqiaCache.getRankList();
		int size = 3;
		if(rankList.size()<size){
			size = rankList.size();
		}
		Object[] rankData = new Object[size];
		for(int i=0;i<size;i++){
			GuanqiaRank guanqiaRank = rankList.get(i);
			rankData[i] = new Object[]{guanqiaRank.getHid(),guanqiaRank.getName()==null?"":guanqiaRank.getName(),guanqiaRank.getGuanqia()};
		}
		Guanqia guanqia = hero.getGuanqia();
		int killMonsterNum = guanqia.getKillMonsterCount();
		int killAwardIndex = guanqia.getKillAwardIndex();
		int alreadyUseKillNum = 0;
		Map<Integer, Struct_kill_205> map = Config_kill_205.getIns().getMap();
		for (int i = 1; i <= killAwardIndex; i++) {
			alreadyUseKillNum += map.get(i).getNum();
		}
		int leftNum = killMonsterNum - alreadyUseKillNum;
		int mopUpNum = guanqia.getTodayMopUp();// 已扫荡次数
		// vip增加的扫荡次数
		int vipMopUp = VipFunction.getIns().getVipNum(hero, VipAddType.mopUpQuanqia);
		int totalMopUp = Config_xtcs_004.getIns().get(GuanqiaConst.MOP_UP_CONST_ID).getNum() + vipMopUp;
		
		// 关卡求助
		GuanQiaHelp guanQiaHelp = hero.getGuanqiahelp();
		int seekHelpTimes = guanQiaHelp.getSeekHelpTimes();
		int helpTimes = guanQiaHelp.getHelpTimes();
		GuanqiaSender.sendCmd_1104(hero.getId(), rankData, leftNum, killAwardIndex, mopUpNum, totalMopUp,seekHelpTimes,helpTimes);
	}

	/**
	 * 请求挑战关卡Boss
	 */
	public void challengeBoss(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			int hasGoldMonster=0;
			long hid = hero.getId();
			Guanqia guanqia = hero.getGuanqia();
			int curGuanqia = guanqia.getCurGuanqia();
			Struct_BOSS_205 struct_BOSS_205 = Config_BOSS_205.getIns().get(curGuanqia);
			int bs = struct_BOSS_205.getBS();
			int curMonster = guanqia.getCurMonster();
			if (curMonster < bs) {
				GuanqiaSender.sendCmd_1114(hid, 0, 1, 0,0);// 波数未达标
				return;
			}
			int bigGuanqia = guanqia.getBigGuanqia();
			int nowBig = GuanqiaFunction.getIns().getBigGuanqia(curGuanqia);
			if (bigGuanqia != nowBig) {
				GuanqiaSender.sendCmd_1114(hid, 0, 3, 0,0);// 请先前往下一关
				return;
			}
			// 检测装备背包
			int equipEmptyGrid = BagFunction.getIns().getEquipEmptyGrid(hero, BagFunction.getIns().getEquipData(hero));
			if (equipEmptyGrid < GuanqiaConst.BAG_EMPTY_GRID_NUM) {
				GuanqiaSender.sendCmd_1114(hid, 0, 2, 0,0);// 背包格子不足
				return;
			}
			int npcid = struct_BOSS_205.getBL()[0][1];
			int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);
			hero.setOperateTempStrength(0);
			if (guanqia.getJingJiaSateByGuan()==null) {
				int[] jingJiaSateByGuan=new int[] {curGuanqia,0};
				guanqia.setJingJiaSateByGuan(jingJiaSateByGuan);
			}
			if(guanqia.getJingJiaSateByGuan()[0]!=curGuanqia) {
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(GuanqiaConst.GUANQIA_NUM);
				if (curGuanqia<struct_xtcs_004.getNum()) {
					//关卡＜X不刷金甲兵
					int[] jingJiaSateByGuan=new int[] {curGuanqia,0};
					guanqia.setJingJiaSateByGuan(jingJiaSateByGuan);
				}else {
					//金甲兵概率
					boolean canRunEvent=ProbabilityEventUtil.canRunEvent(guanqia.getJingJiaPro(), 100000);
					if (canRunEvent) {
						int[] jingJiaSateByGuan=new int[] {curGuanqia,1};
						guanqia.setJingJiaSateByGuan(jingJiaSateByGuan);
					}else {
						int[] jingJiaSateByGuan=new int[] {curGuanqia,0};
						guanqia.setJingJiaSateByGuan(jingJiaSateByGuan);
					}
					
					if (guanqia.getNoJingJia()>=GuanqiaConst.JINGJIA_BICHU) {
						//连续超过19关没出金甲兵
						int[] jingJiaSateByGuan=new int[] {curGuanqia,1};
						guanqia.setJingJiaSateByGuan(jingJiaSateByGuan);
					}
					
				}
			}
			hasGoldMonster=guanqia.getJingJiaSateByGuan()[1];
			GuanqiaSender.sendCmd_1114(hid, 1, curGuanqia, result,hasGoldMonster);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "guanqia challengeBoss fail");
		}
	}

	/**
	 * 战斗胜利，请求掉落 1105
	 */
	public void beatBossWin(Hero hero,int rs) {
		Guanqia guanqia = hero.getGuanqia();
		int curGuanqia = guanqia.getCurGuanqia();
		int passGuanqia = curGuanqia;
		Struct_BOSS_205 struct_BOSS_205 = Config_BOSS_205.getIns().get(curGuanqia);
		if (guanqia.getCurMonster() < struct_BOSS_205.getBS()) {
			LogTool.warn("currMonster:" + guanqia.getCurMonster() + ",hid:" + hero.getId(), this);
			GuanqiaSender.sendCmd_1106(hero.getId(), curGuanqia, null,null);
			return;
		}
		int npcid = struct_BOSS_205.getBL()[0][1];
		int result = BattleFunction.checkWinGuanqiaBoss(hero, npcid);
		if (result == 2) {
			result = rs;
		}
		if (rs == 2 || rs == 0) {
			result = 0;
		}
		if (result == 0) {
			GuanqiaSender.sendCmd_1106(hero.getId(), curGuanqia, null,null);
			return;
		}

		List<Object[]> dropTips = new ArrayList<Object[]>();
		// double coin = Math.round(50000 + (curGuanqia - 1) * 260 *
		// RandomUtil.getRandomNumInAreas(90, 110) / 100f);
		// double exp = Math.round(418 + 10.72185 * curGuanqia);
		// dropTips.add(new Object[] { GameConst.EXP, 0, (int) exp });
		// dropTips.add(new Object[] { GameConst.COIN, 0, (int) coin });
		// UseAddUtil.add(hero, GameConst.EXP, (int) exp,
		// SourceGoodConst.GUANQIA_BOSS_DROP, false);
		// UseAddUtil.add(hero, GameConst.COIN, (int) coin,
		// SourceGoodConst.GUANQIA_BOSS_DROP, false);
		List<ProbabilityEventModel> pelist = GuanqiaCache.getBossDropMap().get(curGuanqia);
		int size = pelist.size();
		int punish = AntiAddictionFunction.getIns().getPunish(hero);
		List<int[]> dropArr = new ArrayList<int[]>();
		for (int i = 0; i < size; i++) {
			ProbabilityEventModel pe = pelist.get(i);
			int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
			if (js != null) {
				int type = js[0];
				if (type == GameConst.GENDROP) {
					int num = js[2];
					ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
					for (int j = 1; j <= num; j++) {
						js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
						dropArr.add(js);
						dropTips.add(new Object[] { js[0], js[1], js[2] });
					}
				} else {
					if (punish > 0) {
						js[2] = js[2] / punish;
					}
					dropArr.add(js);
					dropTips.add(new Object[] { js[0], js[1], js[2] });
				}
			}
		}
		List<Object[]> jingJiadropTips = new ArrayList<Object[]>();
		List<int[]> jingJiadropArr = new ArrayList<int[]>();
		int[] jingJiaSateByGuan = guanqia.getJingJiaSateByGuan();
		Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(GuanqiaConst.GUANQIA_NUM);
		//关卡＜X不刷金甲兵
		if (curGuanqia>=struct_xtcs_004.getNum()&&jingJiaSateByGuan[0]==curGuanqia) {
			
			if (jingJiaSateByGuan[1]==GuanqiaConst.HAS_JINGJIA) {
				//有金甲兵
				struct_xtcs_004 = Config_xtcs_004.getIns().get(GuanqiaConst.JINGJIA_REWARD);
				int[][] other = struct_xtcs_004.getOther();
				for (int i = 0; i < other.length; i++) {
					int[] js = other[i];
					jingJiadropArr.add(new int[] { js[0], js[1], js[2] });
					jingJiadropTips.add(new Object[] { js[0], js[1], js[2] });
				}
				//概率恢复初始化
				guanqia.setJingJiaPro(GuanqiaConst.JINGJIA_BASEPRO);
				guanqia.setNoJingJia(0);
			}else{
				//没有金甲兵 概率成长  关卡成长
				guanqia.setNoJingJia(guanqia.getNoJingJia()+1);
				guanqia.setJingJiaPro(guanqia.getJingJiaPro()+GuanqiaConst.JINGJIA_ADDPRO);
			}
		}
		
		int[][] drops = new int[dropArr.size()][];
		dropArr.toArray(drops);
		
		int[][] jingJiadrops = new int[jingJiadropArr.size()][];
		jingJiadropArr.toArray(jingJiadrops);
		
		if (punish > 0) {
			if (UseAddUtil.canAdd(hero, drops, false)) {
				UseAddUtil.add(hero, drops, SourceGoodConst.GUANQIA_BOSS_DROP, null, false);
			}
			if (UseAddUtil.canAdd(hero, jingJiadrops, false)) {
				UseAddUtil.add(hero, jingJiadrops, SourceGoodConst.JINGJIABING_DROP, null, false);
			}
		} else if (punish == 0) {
			dropTips.clear();
			jingJiadropTips.clear();
		}
		int newGuanqia = curGuanqia + 1;
		int maxGuanqia = Config_BOSS_205.getIns().getSortList().size();
		if (newGuanqia >= maxGuanqia) {
			newGuanqia = maxGuanqia;
		}
		GuanqiaSender.sendCmd_1106(hero.getId(), newGuanqia, dropTips.toArray(),jingJiadropTips.toArray());
		guanqia.setCurMonster(0);
		hero.setOperateTempStrength(0);
		if (newGuanqia != curGuanqia) {
			guanqia.setCurGuanqia(newGuanqia);
			guanqia.setTimeTopGuanQia( TimeDateUtil.getCurrentTime());
			GuanqiaFunction.getIns().refreshRank(hero, newGuanqia);
			// 通关事件触发
			SystemEventFunction.triggerPassGuanqiaEvent(hero, newGuanqia);
		}
	}
	/**
	 * 排行榜 1107
	 */
	public void getRank(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			List<GuanqiaRank> rankList = GuanqiaCache.getRankList();
			int size = Math.min( rankList.size(),  GuanqiaConst.RANK_SIZE);
			List<Object[]> rankData = new ArrayList<>();
			for (int i = 0; i <size ; i++) {
				GuanqiaRank guanqiaRank = rankList.get(i);
				rankData.add(new Object[] { i + 1, guanqiaRank.getHid(), guanqiaRank.getName(),guanqiaRank.getGuanqia() });
//				System.out.println(guanqiaRank.getName()+"  "+guanqiaRank.getGuanqia());
			}
			GuanqiaRank model = new GuanqiaRank();
			model.setHid(hero.getId());
			int index = rankList.indexOf(model);
			if (index < 0) {
				index = -1;
			}
			index++;
			GuanqiaSender.sendCmd_1108(hero.getId(), index, rankData.toArray());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "guanqia getRank fail");
		}
	}

	/**
	 * 扫荡1109
	 * @param hero
	 */
	public void mopUp(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			Guanqia guanqia = hero.getGuanqia();
			int todayMopUp = guanqia.getTodayMopUp();
			// vip增加的扫荡次数
			int vipMopUp = VipFunction.getIns().getVipNum(hero, VipAddType.mopUpQuanqia);
			int totalMopUp = Config_xtcs_004.getIns().get(GuanqiaConst.MOP_UP_CONST_ID).getNum() + vipMopUp;
			if(todayMopUp>=totalMopUp) {
				GuanqiaSender.sendCmd_1110(hid, 0, 1, null);// 已无扫荡次数
				return;
			}
			// 检测背包
			int equipEmptyGrid = BagFunction.getIns().getEquipEmptyGrid(hero, BagFunction.getIns().getEquipData(hero));
			if (equipEmptyGrid < GuanqiaConst.BAG_EMPTY_GRID_NUM) {
				GuanqiaSender.sendCmd_1110(hid, 0, 2, null);// 背包格子不足
				return;
			}
			int curGuanqia = guanqia.getCurGuanqia();
			Struct_BOSS_205 struct_BOSS_205 = Config_BOSS_205.getIns().get(curGuanqia);
			int[][] auto = struct_BOSS_205.getAuto();
			int[][] autoTemp = (int[][]) CloneUtils.deepClone(auto);
			int length = autoTemp.length;
			int equipNum = 0;
			int addition = GuanqiaFunction.getIns().getAddition(hero);
			for (int i = 0; i < length; i++) {
				int[] info = autoTemp[i];
				autoTemp[i][2] = info[2] * GuanqiaConst.MOPUP_AWARD_TIME;
				if (info[0] == GameConst.EQUIP) {
//					equipNum += info[2];
					if(equipEmptyGrid==0) {
						autoTemp[i][2] = 0;
					}else if(equipEmptyGrid>info[2]) {
						equipEmptyGrid -= info[2];
						autoTemp[i][2] = info[2];
					}else if(equipEmptyGrid<info[2]){
						autoTemp[i][2] = equipEmptyGrid;
						equipEmptyGrid = 0;
					}
				}
				if (info[0] == GameConst.EXP) {
					autoTemp[i][2] = info[2] * (100 + addition) / 100;
				}
			}
//			if (equipNum > equipEmptyGrid) {
//				GuanqiaSender.sendCmd_1110(hid, 0, 2);// 背包格子不足
//				return;
//			}
			todayMopUp += 1;
			if (todayMopUp > 0) {// 非免费
				int[][] xh = Config_clear_205.getIns().get(todayMopUp).getXh();
				if (!UseAddUtil.canUse(hero, xh)) {
					// 材料不足
					GuanqiaSender.sendCmd_1110(hid, 0, 4, null);
				}
				UseAddUtil.use(hero, xh, SourceGoodConst.GUANQIA_MOPUP_COST, true);
			}
			guanqia.setTodayMopUp(todayMopUp);
			List<Object[]> dropTips = new ArrayList<Object[]>();
			int punish = AntiAddictionFunction.getIns().getPunish(hero);
			if (punish > 0) {
				for (int[] info : autoTemp) {
					info[2] = info[2] / punish;
					dropTips.add(new Object[] { info[0], info[1], info[2] });
				}
				List<int[]> collect = Arrays.stream(autoTemp).collect(Collectors.toList());
				CountrySkillFunction.getIns().onlineExpAndCoinHandle(hero, collect, dropTips, true);
				autoTemp=new int[collect.size()][];
				collect.toArray(autoTemp);
				UseAddUtil.add(hero, autoTemp, SourceGoodConst.GUANQIA_OFFLINE, null, false);
			} else if (punish == 0) {
				dropTips.clear();
			}
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE26);
			// 任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_47, todayMopUp);
			GuanqiaSender.sendCmd_1110(hid, 1, curGuanqia, dropTips.toArray());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "guanqia mopUp fail");
		}
	}

	/**
	 * 领取斩杀奖励
	 * 
	 * @param hero
	 */
	public void getKillAward(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			Guanqia guanqia = hero.getGuanqia();
			int killMonsterCount = guanqia.getKillMonsterCount();
			int killAwardIndex = guanqia.getKillAwardIndex();
			int alreadyUseKillNum = 0;
			Map<Integer, Struct_kill_205> map = Config_kill_205.getIns().getMap();
			for (int i = 1; i <= killAwardIndex; i++) {
				alreadyUseKillNum += map.get(i).getNum();
			}
			int leftNum = killMonsterCount - alreadyUseKillNum;
			Struct_kill_205 struct_kill_205 = map.get(killAwardIndex + 1);
			int tj = struct_kill_205.getTj();
			if (guanqia.getCurGuanqia() < tj) {
				// 通关数不满足条件
				GuanqiaSender.sendCmd_1112(hid, 0, 2, 0);
				return;
			}
			int costNum = struct_kill_205.getNum();
			if (leftNum < costNum) {
				// 斩杀数未达标无法领取
				GuanqiaSender.sendCmd_1112(hid, 0, 1, 0);
				return;
			}
			guanqia.setKillAwardIndex(killAwardIndex + 1);
			int[][] reward = struct_kill_205.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.GUANQIA_KILL_AWARD, null, true);
			GuanqiaSender.sendCmd_1112(hid, 1, killAwardIndex + 1, leftNum - costNum);
			GuanqiaFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "guanqia getKillAward fail");
		}
	}

	/**
	 * 领取大关卡通关奖励
	 * 
	 * @param hero
	 * @param bigId
	 */
	public void getBigReward(Hero hero, int bigId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			Guanqia guanqia = hero.getGuanqia();
			Set<Integer> bigRewardSet = guanqia.getBigRewardSet();
			if (bigRewardSet.contains(bigId)) {
				// 已领取
				GuanqiaSender.sendCmd_1116(hid, 0, 2);
				return;
			}
			Struct_dgq_205 struct_dgq_205 = Config_dgq_205.getIns().get(bigId);
			int[][] range = struct_dgq_205.getGuanqia();
			int rangeStart = range[0][0];
			int rangeEnd = range[0][1];
			int curGuanqia = guanqia.getCurGuanqia();
			if (curGuanqia <= rangeEnd) {
				// 未通关
				GuanqiaSender.sendCmd_1116(hid, 0, 1);
				return;
			}
			int[][] reward = struct_dgq_205.getJiangli();
			if (!UseAddUtil.canAdd(hero, reward, false)) {
				// 背包满
				GuanqiaSender.sendCmd_1116(hid, 0, 3);
				return;
			}
			bigRewardSet.add(bigId);
			UseAddUtil.add(hero, reward, SourceGoodConst.BIG_GUANQIA_PASS_REWARD, UseAddUtil.getDefaultMail(), true);
			GuanqiaSender.sendCmd_1116(hid, 1, bigId);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "guanqia getBigReward fail");
		}
	}

	/**
	 * 前往下一个大关卡
	 */
	public void nextBigGuanqia(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			Guanqia guanqia = hero.getGuanqia();
			int curGuanqia = guanqia.getCurGuanqia();
			int bigGuanqia = guanqia.getBigGuanqia();
			Map<Integer, Struct_dgq_205> map = Config_dgq_205.getIns().getMap();
			Struct_dgq_205 dgq_205 = map.get(bigGuanqia);
			int[][] limit = dgq_205.getGuanqia();
			if (curGuanqia > limit[0][1]) {
				bigGuanqia += 1;
				if (map.containsKey(bigGuanqia)) {
					guanqia.setBigGuanqia(bigGuanqia);
					// 前往成功
					GuanqiaSender.sendCmd_1118(hid, 1, bigGuanqia);
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_43, bigGuanqia);
					ActGiftManager.getIns().sendMsg(hero);
				} else {
					GuanqiaSender.sendCmd_1118(hid, 0, 2);
				}
			} else {
				GuanqiaSender.sendCmd_1118(hid, 0, 1);
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "guanqia nextBigGuanqia fail");
		}
	}
}
