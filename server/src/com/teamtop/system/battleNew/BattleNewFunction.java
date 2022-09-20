package com.teamtop.system.battleNew;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.BattleNewOpTaskRunnable;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battleNew.model.BattleNewInfo;
import com.teamtop.system.battleNew.model.BuffInfo;
import com.teamtop.system.battleNew.model.PeronalBattleData;
import com.teamtop.system.battleNew.model.SkillDamage;
import com.teamtop.system.battleNew.model.SpecialInfo;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.godbook.GodBookModel;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.clone.CloneUtils;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_NPC_200;
import excel.config.Config_buff_011;
import excel.config.Config_changshu_101;
import excel.config.Config_skill_210;
import excel.struct.Struct_NPC_200;
import excel.struct.Struct_buff_011;
import excel.struct.Struct_skill_210;

public class BattleNewFunction {

	private static BattleNewFunction battleNewFunction;

	private BattleNewFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BattleNewFunction getIns() {
		if (battleNewFunction == null) {
			battleNewFunction = new BattleNewFunction();
		}
		return battleNewFunction;
	}
	
	/**
	 * 初始化玩家战斗数据
	 * 
	 * @param hero
	 * @param campType
	 * @param hp 初始血量（为0时默认最大血量）
	 * @param hudun 初始护盾值（为0时默认最大护盾）
	 * @return
	 */
	public PeronalBattleData createPeronalBattleData(Hero hero, int campType, long hp, long hudun) {
		PeronalBattleData myBattleData = new PeronalBattleData();
		try {
			myBattleData.setHid(hero.getId());
			myBattleData.setCampType(campType);
			FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
			FinalFightAttr attr = (FinalFightAttr) CloneUtils.deepClone(finalFightAttr);
			myBattleData.setAttr(attr);
			if (hp == 0) {
				hp = attr.getHpMax();
				hudun = attr.getHudun();
			}
			myBattleData.setHp(hp);
			myBattleData.setHudun(hudun);
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, hero.getId(), hero.getName(), "createPeronalBattleData");
		}
		return myBattleData;
	}

	/**
	 * 初始化NPC战斗数据
	 * 
	 * @param npcId
	 * @param campType
	 * @param hp 初始血量（为0时默认最大血量）
	 * @return
	 */
	public PeronalBattleData createPeronalBattleData(int npcId, int campType, int npcFightType, long hp) {
		PeronalBattleData npcBattleData = new PeronalBattleData();
		try {
			npcBattleData.setHid(npcId);
			npcBattleData.setNpc(true);
			npcBattleData.setCampType(campType);
			Struct_NPC_200 npc = Config_NPC_200.getIns().getMap().get(npcId);
			FinalFightAttr attr = new FinalFightAttr();
			if(hp==0) {
				hp = npc.getHp();
			}
			attr.setHp(hp);
			npcBattleData.setHp(hp);
			attr.setHpMax(npc.getHp());
			attr.setAtt(npc.getAtt());
			attr.setDef(npc.getDef());
			npcBattleData.setAttr(attr);
			npcBattleData.setNpcFightType(npcFightType);
			int[][] skill = npc.getSkill();
			npcBattleData.setNpcSkill(skill);
			npcBattleData.setNpcLevel(npc.getLv());
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, "createPeronalBattleData npcId=" + npcId);
		}
		return npcBattleData;
	}

	/**
	 * 开始PVP战斗
	 * @param hero
	 * @param enemy 敌人
	 * @param sysId 系统id
	 * @param battleType 战斗类型（定义在BattleTypeConst）
	 * @param curHp 战斗初始血量，为 0时默认最大血量
	 * @param enermyHp 敌人战斗初始血量，为 0时默认最大血量
	 * @param battleUid 为零时自动生成, 外部生成调用battleUid = BattleNewSysCache.getBattleUid();
	 * @param sInfo 特殊数据保存对象
	 * @return 返回战斗唯一id
	 */
	public long startPVPBattle(Hero hero, Hero enemy, int sysId, int battleType, long curHp, long enemyHp, long hudun,
			long eHudun, long battleUid, SpecialInfo... sInfo) {
		try {
			if (battleUid == 0) {
				battleUid = BattleNewSysCache.getBattleUid();
			}
			BattleNewInfo info = new BattleNewInfo();
			info.setBattleUid(battleUid);
			info.setSysId(sysId);
			info.setBattleType(battleType);
			info.setSysType(BattleSysType.Single_PVP);
			info.setCreateTime(TimeDateUtil.getCurrentTime());
			info.setAttHid(hero.getId());
			Map<Long, PeronalBattleData> playerDataMap = info.getPlayerDataMap();
			// 初始化玩家战斗数据
			PeronalBattleData myBattleData = createPeronalBattleData(hero, BattleNewConst.CAMP_1, curHp, hudun);
			PeronalBattleData enemyBattleData = createPeronalBattleData(enemy, BattleNewConst.CAMP_2, enemyHp, eHudun);
			playerDataMap.put(hero.getId(), myBattleData);
			playerDataMap.put(enemy.getId(), enemyBattleData);

			Map<Byte, Set<Long>> campMap = info.getCampMap();
			Set<Long> camp1 = new HashSet<>();
			long hid = hero.getId();
			camp1.add(hid);
			List<Object[]> sendCamp1 = new ArrayList<>();
			setSendCamp(hero, curHp+hudun, sendCamp1);

			Set<Long> camp2 = new HashSet<>();
			long enemyId = enemy.getId();
			camp2.add(enemyId);
			List<Object[]> sendCamp2 = new ArrayList<>();
			setSendCamp(enemy, enemyHp+eHudun, sendCamp2);

			campMap.put(BattleNewConst.CAMP_1, camp1);
			campMap.put(BattleNewConst.CAMP_2, camp2);
			BattleNewSysCache.getBattleMap().put(battleUid, info);
			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			heroBattleMap.put(hid, battleUid);
			heroBattleMap.put(enemyId, battleUid);
			// 下发战斗信息
			HeroFunction.getIns().sendBattleHeroAttr(hero, enemyId);
			HeroFunction.getIns().sendBattleHeroAttr(enemy, hid);
			// 通知前端战斗信息战斗开始 L:战斗唯一id[L:阵营1玩家id]阵营1玩家集合[L:阵营2玩家id]阵营2玩家集合I:功能系统id
//			System.err.println("camp1::"+JSON.toJSONString(sendCamp1));
//			System.err.println("camp2::"+JSON.toJSONString(sendCamp2));
			BattleNewSender.sendCmd_3860(hid, battleUid, sendCamp1.toArray(), sendCamp2.toArray(), sysId);
			BattleNewSender.sendCmd_3860(enemyId, battleUid, sendCamp1.toArray(), sendCamp2.toArray(), sysId);
			int job = hero.getJob();
			int skillJob = job;
			if(job>1000) {
				skillJob = job/1000;
			}
			if(skillJob==53) {		
				BattleNewManager.getIns().generalCheck(hero, myBattleData, info);
			}
			int emJob = enemy.getJob();
			int emSkillJob = emJob;
			if(job>1000) {
				emSkillJob = emJob/1000;
			}
			if(emSkillJob==53) {
				BattleNewManager.getIns().generalCheck(enemy, enemyBattleData, info);
			}
			return battleUid;
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, hero.getId(), hero.getName(), "battleType=" + battleType);
		}
		return -1;
	}

	public void setSendCamp(Hero hero, long curHp, List<Object[]> sendCamp) {
		long hid = hero.getId();
		long hpMax = hero.getFinalFightAttr().getHpMax();
		if (curHp == 0) {
			curHp = hpMax;
		}
		TreasureData treasureData = hero.getTreasureData();
		int wearTreasure1 = 0;
		int wearTreasure2 = 0;
		int tstartLevel1 = 0;
		int tstartLevel2 = 0;
		if (treasureData != null) {
			List<Integer> wearTreasureList = treasureData.getWearTreasureList();
			wearTreasure1 = wearTreasureList.get(0);
			if (wearTreasure1 > 0) {
				tstartLevel1 = treasureData.getTreasureMap().get(wearTreasure1).getStarLevel();
			}
			wearTreasure2 = wearTreasureList.get(1);
			if (wearTreasure2 > 0) {
				tstartLevel2 = treasureData.getTreasureMap().get(wearTreasure2).getStarLevel();
			}
		}
		GodBook godbook = hero.getGodbook();
		int wearid = 0;
		int gStar = 0;
		if (godbook != null) {
			wearid = godbook.getWearid();
			GodBookModel godBookModel = godbook.getHasBooks().get(wearid);
			if (godBookModel != null) {
				gStar = godBookModel.getStar();
			}
		}
		int excaliburId = hero.getExcaliburId();
		sendCamp.add(new Object[] { hid, curHp, hpMax, wearTreasure1, tstartLevel1, wearTreasure2, tstartLevel2,
				wearid, gStar, excaliburId });
//		System.out.println("3860玩家:"+hero.getName()+" hp:"+curHp+" hpMax:"+hpMax+" hd:"+(curHp-hpMax));
	}

	/**
	 * 设置NPC阵营数据
	 * 
	 * @param npcId
	 * @param curHp
	 * @param sendCamp
	 */
	private void setSendCampNpc(long npcId, long curHp, List<Object[]> sendCamp) {
		long hpMax = Config_NPC_200.getIns().get((int) npcId).getHp();
		if (curHp == 0) {
			curHp = hpMax;
		}
		int wearTreasure1 = 0;
		int wearTreasure2 = 0;
		int tstartLevel1 = 0;
		int tstartLevel2 = 0;
		int wearid = 0;
		int gStar = 0;
		int excaliburId = 0;
		sendCamp.add(new Object[] { npcId, curHp, hpMax, wearTreasure1, tstartLevel1, wearTreasure2, tstartLevel2,
				wearid, gStar, excaliburId });
	}

	/**
	 * 开始PVE战斗(人打人or机器人)
	 * @param hero
	 * @param enemyList 敌人集合
	 * @param sysId 系统id
	 * @param battleType 战斗类型（定义在BattleTypeConst）
	 * @param curHp 战斗初始血量，为 0时默认最大血量
	 * @param hpMap 敌人战斗初始血量，map为null或<key, value>value为 0时默认最大血量
	 * @param battleUid 为零时自动生成, 外部生成调用battleUid = BattleNewSysCache.getBattleUid();
	 * @param sInfo 特殊数据保存对象
	 * @return 返回战斗唯一id
	 */
	public void startPVEPlayherBattle(Hero hero, int sysId, List<Hero> enemyList, int battleType, long curHp,
			Map<Long, Long> hpMap, long battleUid, SpecialInfo... sInfo) {
		try {
			if (battleUid == 0) {
				battleUid = BattleNewSysCache.getBattleUid();
			}
			BattleNewInfo info = new BattleNewInfo();
			info.setBattleUid(battleUid);
			info.setSysId(sysId);
			info.setBattleType(battleType);
			info.setSysType(BattleSysType.Single_PVE);
			info.setCreateTime(TimeDateUtil.getCurrentTime());
			Map<Long, PeronalBattleData> playerDataMap = info.getPlayerDataMap();
			// 初始化玩家战斗数据
			PeronalBattleData myBattleData = createPeronalBattleData(hero, BattleNewConst.CAMP_1, curHp, 0);
			int size = enemyList.size();
			playerDataMap.put(hero.getId(), myBattleData);
			Map<Byte, Set<Long>> campMap = info.getCampMap();
			Set<Long> camp1 = new HashSet<>();
			long hid = hero.getId();
			camp1.add(hid);
			campMap.put(BattleNewConst.CAMP_1, camp1);
			List<Object[]> sendCamp1 = new ArrayList<>();
			setSendCamp(hero, curHp, sendCamp1);

			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			heroBattleMap.put(hid, battleUid);
			List<Object[]> sendCamp2 = new ArrayList<>();
			for (int i = 0; i < size; i++) {
				Hero enemy = enemyList.get(i);
				PeronalBattleData enemyBattleData = createPeronalBattleData(enemy, BattleNewConst.CAMP_2, 0, 0);
				long enemyId = enemy.getId();
				playerDataMap.put(enemyId, enemyBattleData);
				Set<Long> camp2 = new HashSet<>();
				camp2.add(enemyId);
				campMap.put(BattleNewConst.CAMP_2, camp2);
				Long eHp = 0L;
				if (hpMap != null) {
					eHp = hpMap.get(enemyId);
					if (eHp == null) {
						eHp = 0L;
					}
				}
				setSendCamp(enemy, eHp, sendCamp2);
				heroBattleMap.put(enemyId, battleUid);
			}
			BattleNewSysCache.getBattleMap().put(battleUid, info);
			// 通知前端战斗信息战斗开始 L:战斗唯一id[L:阵营1玩家id]阵营1玩家集合[L:阵营2玩家id]阵营2玩家集合I:功能系统id
			BattleNewSender.sendCmd_3860(hid, battleUid, sendCamp1.toArray(), sendCamp2.toArray(), sysId);
			for (int i = 0; i < size; i++) {
				Hero enemy = enemyList.get(i);
				long enemyId = enemy.getId();
				BattleNewSender.sendCmd_3860(enemyId, battleUid, sendCamp1.toArray(), sendCamp2.toArray(), sysId);
			}
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, hero.getId(), hero.getName(), "battleType=" + battleType);
		}
	}

	/**
	 * 开始PVE战斗(人打Npc)
	 * @param hero
	 * @param enemyList 敌人集合
	 * @param sysId 系统id
	 * @param battleType 战斗类型（定义在BattleTypeConst）
	 * @param curHp 战斗初始血量，为 0时默认最大血量
	 * @param hpMap 敌人战斗初始血量，map为null或<key, value>value为 0时默认最大血量
	 * @param battleUid 为零时自动生成, 外部生成调用battleUid = BattleNewSysCache.getBattleUid();
	 * @param sInfo 特殊数据保存对象
	 * @return 返回战斗唯一id
	 */
	public void startPVENpcBattle(Hero hero, int sysId, List<Long> enemyList, int battleType, int npcFightType,
			long curHp, Map<Long, Long> hpMap, long battleUid, SpecialInfo... sInfo) {
		try {
			if (battleUid == 0) {
				battleUid = BattleNewSysCache.getBattleUid();
			}
			BattleNewInfo info = new BattleNewInfo();
			info.setBattleUid(battleUid);
			info.setSysId(sysId);
			info.setBattleType(battleType);
			info.setSysType(BattleSysType.Single_PVE);
			info.setCreateTime(TimeDateUtil.getCurrentTime());
			Map<Long, PeronalBattleData> playerDataMap = info.getPlayerDataMap();
			// 初始化玩家战斗数据
			PeronalBattleData myBattleData = createPeronalBattleData(hero, BattleNewConst.CAMP_1, curHp, 0);
			int size = enemyList.size();
			playerDataMap.put(hero.getId(), myBattleData);
			Map<Byte, Set<Long>> campMap = info.getCampMap();
			Set<Long> camp1 = new HashSet<>();
			long hid = hero.getId();
			camp1.add(hid);
			campMap.put(BattleNewConst.CAMP_1, camp1);
			List<Object[]> sendCamp1 = new ArrayList<>();
			setSendCamp(hero, curHp, sendCamp1);

			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			heroBattleMap.put(hid, battleUid);
			List<Object[]> sendCamp2 = new ArrayList<>();
			for (int i = 0; i < size; i++) {
				long npcId = enemyList.get(i);
				PeronalBattleData enemyBattleData = createPeronalBattleData((int) npcId, BattleNewConst.CAMP_2,
						npcFightType, 0);
				playerDataMap.put(npcId, enemyBattleData);
				Set<Long> camp2 = new HashSet<>();
				camp2.add(npcId);
				campMap.put(BattleNewConst.CAMP_2, camp2);
				Long eHp = 0L;
				if (hpMap != null) {
					eHp = hpMap.get(npcId);
					if (eHp == null) {
						eHp = 0L;
					}
				}
				setSendCampNpc(npcId, curHp, sendCamp2);
				heroBattleMap.put(npcId, battleUid);
			}
			BattleNewSysCache.getBattleMap().put(battleUid, info);
			// 通知前端战斗信息战斗开始 L:战斗唯一id[L:阵营1玩家id]阵营1玩家集合[L:阵营2玩家id]阵营2玩家集合I:功能系统id
			BattleNewSender.sendCmd_3860(hid, battleUid, sendCamp1.toArray(), sendCamp2.toArray(), sysId);
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, hero.getId(), hero.getName(), "battleType=" + battleType);
		}
	}

	/**
	 * 开始组队PVE战斗（组队打怪）
	 * 
	 * @param members 队伍
	 * @param sysId 系统id
	 * @param enemyList 敌人
	 * @param battleType 战斗类型
	 * @param npcFightType npc战斗类型（1：百分比扣血，2：秒伤扣血，3：ai技能释放）BattleNewConst
	 * @param hpMap 己方战斗初始血量，map为null或<key, value>value为 0时默认最大血量
	 * @param enemyHpMap 敌人战斗初始血量，map为null或<key, value>value为 0时默认最大血量
	 * @param battleUid 为零时自动生成, 外部生成调用battleUid = BattleNewSysCache.getBattleUid();
	 * @param sInfo 特殊数据保存对象
	 */
	public void startPVEBattle(List<Hero> members, int sysId, List<Long> enemyList, int battleType, int npcFightType,
			Map<Long, Long> hpMap, Map<Long, Long> enemyHpMap, long battleUid, SpecialInfo... sInfo) {
		StringBuilder teamMember = new StringBuilder();
		try {
			if (battleUid == 0) {
				battleUid = BattleNewSysCache.getBattleUid();
			}
			BattleNewInfo info = new BattleNewInfo();
			info.setBattleUid(battleUid);
			info.setSysId(sysId);
			info.setBattleType(battleType);
			info.setSysType(BattleSysType.Single_PVE);
			info.setCreateTime(TimeDateUtil.getCurrentTime());
			Map<Long, PeronalBattleData> playerDataMap = info.getPlayerDataMap();
			// 初始化玩家战斗数据
			Map<Byte, Set<Long>> campMap = info.getCampMap();
			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			int mSize = members.size();
			Hero hero = null;
			List<Object[]> sendCamp1 = new ArrayList<>();
			for (int i = 0; i < mSize; i++) {
				hero = members.get(i);
				long hid = hero.getId();
				teamMember.append("hid=").append(hid).append(", name=").append(hero.getNameZoneid()).append(", ");
				PeronalBattleData myBattleData = createPeronalBattleData(hero, BattleNewConst.CAMP_1, 0, 0);
				playerDataMap.put(hid, myBattleData);
				Set<Long> camp1 = new HashSet<>();
				camp1.add(hid);
				campMap.put(BattleNewConst.CAMP_1, camp1);
				Long curHp = 0L;
				if (hpMap != null) {
					curHp = hpMap.get(hid);
				}
				setSendCamp(hero, curHp, sendCamp1);
				heroBattleMap.put(hid, battleUid);
			}
			List<Object[]> sendCamp2 = new ArrayList<>();
			int size = enemyList.size();
			for (int i = 0; i < size; i++) {
				long npcId = enemyList.get(i);
				PeronalBattleData enemyBattleData = createPeronalBattleData((int) npcId, BattleNewConst.CAMP_2,
						npcFightType, 0);
				playerDataMap.put(npcId, enemyBattleData);
				Set<Long> camp2 = new HashSet<>();
				camp2.add(npcId);
				campMap.put(BattleNewConst.CAMP_2, camp2);
				Long curHp = 0L;
				if (enemyHpMap != null) {
					curHp = hpMap.get(npcId);
				}
				setSendCampNpc(npcId, curHp, sendCamp2);
				heroBattleMap.put(npcId, battleUid);
			}
			BattleNewSysCache.getBattleMap().put(battleUid, info);
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class,
					"battleType=" + battleType + ", members=" + teamMember.toString());
		}
	}

	/**
	 * 开始组队PVP战斗（组队对战）
	 */
	public void startPVPBattle(List<Hero> members, int sysId, List<Hero> enemyList, int battleType) {
		StringBuilder teamMember = new StringBuilder();
		StringBuilder enemyMember = new StringBuilder();
		try {
			long battleUid = BattleNewSysCache.getBattleUid();
			BattleNewInfo info = new BattleNewInfo();
			info.setBattleUid(battleUid);
			info.setSysId(sysId);
			info.setBattleType(battleType);
			info.setSysType(BattleSysType.Single_PVE);
			info.setCreateTime(TimeDateUtil.getCurrentTime());
			Map<Long, PeronalBattleData> playerDataMap = info.getPlayerDataMap();
			// 初始化玩家战斗数据
			Map<Byte, Set<Long>> campMap = info.getCampMap();
			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			int mSize = members.size();
			Hero hero = null;
			for (int i = 0; i < mSize; i++) {
				hero = members.get(i);
				long hid = hero.getId();
				teamMember.append("hid=").append(hid).append(", name=").append(hero.getNameZoneid()).append(", ");
				PeronalBattleData myBattleData = createPeronalBattleData(hero, BattleNewConst.CAMP_1, 0, 0);
				playerDataMap.put(hid, myBattleData);
				Set<Long> camp1 = new HashSet<>();
				camp1.add(hid);
				campMap.put(BattleNewConst.CAMP_1, camp1);
				heroBattleMap.put(hid, battleUid);
			}
			int size = enemyList.size();
			for (int i = 0; i < size; i++) {
				hero = enemyList.get(i);
				long hid = hero.getId();
				enemyMember.append("hid=").append(hid).append(", name=").append(hero.getNameZoneid()).append(", ");
				PeronalBattleData enemyBattleData = createPeronalBattleData(hero, BattleNewConst.CAMP_2, 0, 0);
				playerDataMap.put(hid, enemyBattleData);
				Set<Long> camp2 = new HashSet<>();
				camp2.add(hid);
				campMap.put(BattleNewConst.CAMP_2, camp2);
				heroBattleMap.put(hid, battleUid);
			}
			BattleNewSysCache.getBattleMap().put(battleUid, info);
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, "battleType=" + battleType + ", members=" + teamMember.toString()
					+ ", enemyMembers=" + enemyMember.toString());
		}
	}

	/**
	 * 开始组队轮换PVP战斗
	 */
	public long startTeamRoundPVPBattle(List<Hero> members, int sysId, List<Hero> enemyList, int battleType, long curHp,
			long enemyHp, long hudun, long eHudun,Set<Long> synHidSet) {
		StringBuilder teamMember = new StringBuilder();
		StringBuilder enemyMember = new StringBuilder();
		try {
			long battleUid = BattleNewSysCache.getBattleUid();
			BattleNewInfo info = new BattleNewInfo();
			info.setBattleUid(battleUid);
			info.setSysId(sysId);
			info.setBattleType(battleType);
			info.setSysType(BattleSysType.ROUND_PVP);
			info.setCreateTime(TimeDateUtil.getCurrentTime());
			Map<Long, PeronalBattleData> playerDataMap = info.getPlayerDataMap();
			// 初始化玩家战斗数据
			Map<Byte, Set<Long>> campMap = info.getCampMap();
			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			int mSize = members.size();
			int size = enemyList.size();
			Hero hero = null;
			Hero enemy = null;
			Set<Long> sendList = new HashSet<>();
			for (int i = 0; i < mSize; i++) {
				sendList.add(members.get(i).getId());
			}
			for (int i = 0; i < size; i++) {
				sendList.add(enemyList.get(i).getId());
			}
			info.getSynHidSet().addAll(sendList);
			hero = members.get(0);
			long hid = hero.getId();
			teamMember.append("hid=").append(hid).append(", name=").append(hero.getNameZoneid()).append(", ");
			PeronalBattleData myBattleData = createPeronalBattleData(hero, BattleNewConst.CAMP_1, 0, 0);
			playerDataMap.put(hid, myBattleData);
			Set<Long> camp1 = new HashSet<>();
			camp1.add(hid);
			campMap.put(BattleNewConst.CAMP_1, camp1);
			List<Object[]> sendCamp1 = new ArrayList<>();
			setSendCamp(hero, curHp + hudun, sendCamp1);
			heroBattleMap.put(hid, battleUid);
				
			enemy = enemyList.get(0);
			long enemyId = enemy.getId();
			enemyMember.append("enemyId=").append(enemyId).append(", name=").append(enemy.getNameZoneid()).append(", ");
			PeronalBattleData enemyBattleData = createPeronalBattleData(enemy, BattleNewConst.CAMP_2, 0, 0);
			playerDataMap.put(enemyId, enemyBattleData);
			Set<Long> camp2 = new HashSet<>();
			camp2.add(enemyId);
			campMap.put(BattleNewConst.CAMP_2, camp2);
			List<Object[]> sendCamp2 = new ArrayList<>();
			setSendCamp(enemy, enemyHp + eHudun, sendCamp2);
			heroBattleMap.put(enemyId, battleUid);
			
			for (int i = 0; i < mSize; i++) {
				for (Long sid : sendList) {
					HeroFunction.getIns().sendBattleHeroAttr(members.get(i), sid);
				}
			}
			for (int i = 0; i < size; i++) {
				for (Long sid : sendList) {
					HeroFunction.getIns().sendBattleHeroAttr(enemyList.get(i), sid);
				}
			}
			BattleNewSysCache.getBattleMap().put(battleUid, info);
			for (Long sid : sendList) {
				BattleNewSender.sendCmd_3860(sid, battleUid, sendCamp1.toArray(), sendCamp2.toArray(), sysId);
			}
			return battleUid; 
			//BattleNewSender.sendCmd_3860(hid, battleUid, sendCamp1.toArray(), sendCamp2.toArray(), sysId);
			//BattleNewSender.sendCmd_3860(enemyId, battleUid, sendCamp1.toArray(), sendCamp2.toArray(), sysId);
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, "battleType=" + battleType + ", members=" + teamMember.toString()
					+ ", enemyMembers=" + enemyMember.toString());
		}
		return 0;
	}

	/**
	 * 组队轮回战斗下一轮开始
	 * @param hero
	 * @param enemy
	 * @param sysId
	 * @param battleType
	 */
	public void nextTeamRoundPVPBattle(Hero hero, Hero enemy, int sysId, int battleType, long curHp, long enemyHp,
			long hudun, long eHudun, long battleUid, Set<Long> synHidSet,Map<Long, PeronalBattleData> playerDataMap) {
		StringBuilder teamMember = new StringBuilder();
		StringBuilder enemyMember = new StringBuilder();
		try {
			// long battleUid = BattleNewSysCache.getBattleUid();
			BattleNewInfo info = new BattleNewInfo();
			info.setBattleUid(battleUid);
			info.setSysId(sysId);
			info.setBattleType(battleType);
			info.setSysType(BattleSysType.ROUND_PVP);
			info.setCreateTime(TimeDateUtil.getCurrentTime());
			if (synHidSet != null) {
				info.getSynHidSet().addAll(synHidSet);
			}
			Map<Long, PeronalBattleData> newplayerDataMap = info.getPlayerDataMap();
			info.setPlayerDataMap(newplayerDataMap);
			// 初始化玩家战斗数据
			Map<Byte, Set<Long>> campMap = info.getCampMap();
			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			long hid = hero.getId();
			
			
			PeronalBattleData peronalBattleData = playerDataMap.get(hid);
			teamMember.append("hid=").append(hid).append(", name=").append(hero.getNameZoneid()).append(", ");
			PeronalBattleData myBattleData = createPeronalBattleData(hero, BattleNewConst.CAMP_1,curHp, hudun);
			if (peronalBattleData!=null) {
				myBattleData.setSkillMap(peronalBattleData.getSkillMap());
				newplayerDataMap.put(hid, myBattleData);
			}
			newplayerDataMap.put(hid, myBattleData);
			
			Set<Long> camp1 = new HashSet<>();
			camp1.add(hid);
			campMap.put(BattleNewConst.CAMP_1, camp1);
			List<Object[]> sendCamp1 = new ArrayList<>();
			setSendCamp(hero, curHp + hudun, sendCamp1);
			heroBattleMap.put(hid, battleUid);

			long enemyId = enemy.getId();
			
			PeronalBattleData enemyOldBattleData = playerDataMap.get(enemyId);
			enemyMember.append("enemyId=").append(enemyId).append(", name=").append(enemy.getNameZoneid()).append(", ");
			PeronalBattleData enemyBattleData = createPeronalBattleData(enemy, BattleNewConst.CAMP_2,enemyHp, eHudun);
			if (enemyOldBattleData!=null) {
				enemyBattleData.setSkillMap(enemyOldBattleData.getSkillMap());
			}
			newplayerDataMap.put(enemyId, enemyBattleData);
			
			Set<Long> camp2 = new HashSet<>();
			camp2.add(enemyId);
			campMap.put(BattleNewConst.CAMP_2, camp2);
			List<Object[]> sendCamp2 = new ArrayList<>();
			setSendCamp(enemy, enemyHp + eHudun, sendCamp2);
			heroBattleMap.put(enemyId, battleUid);

			BattleNewSysCache.getBattleMap().put(battleUid, info);
			for (Long sid : synHidSet) {
				BattleNewSender.sendCmd_3874(sid, battleUid, sendCamp1.toArray(), sendCamp2.toArray(), sysId);
			}
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, "battleType=" + battleType + ", members=" + teamMember.toString()
					+ ", enemyMembers=" + enemyMember.toString());
		}
	}

	public void checkBattle() {
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			ConcurrentHashMap<Long,BattleNewInfo> battleMap = BattleNewSysCache.getBattleMap();
			Iterator<BattleNewInfo> iterator = battleMap.values().iterator();
			BattleNewInfo info = null;
			for(;iterator.hasNext();) {
				info = iterator.next();
				long battleUid = info.getBattleUid();
				try {
					int createTime = info.getCreateTime();
					if ((currentTime - createTime) >= BattleNewConst.OVER_TIME) {
						//超时处理
						OpTaskExecutorService.PublicOrderService.execute(new BattleNewOpTaskRunnable() {

							@Override
							public void run() {
								BattleNewInfo info2 = battleMap.remove(battleUid);
								Map<Long, PeronalBattleData> playerDataMap = info2.getPlayerDataMap();
								ConcurrentHashMap<Long, Set<Long>> heroBuffMap = BattleNewSysCache.getHeroBuffMap();
								heroBuffMap.remove(battleUid);
								Iterator<Long> playerIterator = playerDataMap.keySet().iterator();
								ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
								for (; playerIterator.hasNext();) {
									long hid = playerIterator.next();
									heroBattleMap.remove(hid);
								}
							}

							@Override
							public Object getSession() {
								return battleUid;
							}
						});
					}
				} catch (Exception e) {
					LogTool.error(e, BattleNewFunction.class, "BattleNewFunction checkBattle, battleInfo = "+info.toString());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, "BattleNewFunction checkBattle");
		}
	}

	public void checkBuff() {
		try {
			long currentTime = TimeDateUtil.getCurrentTimeInMillis();
			Map<Integer, Struct_buff_011> sysBuffMap = Config_buff_011.getIns().getMap();
			ConcurrentHashMap<Long, BattleNewInfo> battleMap = BattleNewSysCache.getBattleMap();
			ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
			ConcurrentHashMap<Long, Set<Long>> heroBuffMap = BattleNewSysCache.getHeroBuffMap();
			Iterator<Entry<Long, Set<Long>>> iterator = heroBuffMap.entrySet().iterator();
			Entry<Long, Set<Long>> entry = null;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				long battleUid = entry.getKey();
				Set<Long> pSet = entry.getValue();
				OpTaskExecutorService.PublicOrderService.execute(new BattleNewOpTaskRunnable() {

					@Override
					public void run() {
						checkBuffHandle(battleUid, currentTime, pSet, battleMap, sysBuffMap);
					}

					@Override
					public Object getSession() {
						return battleUid;
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, "BattleNewFunction checkBuff");
		}
	}

	/**
	 * 检测buff处理
	 * @param battleUid
	 * @param currentTime
	 * @param pSet
	 * @param battleMap
	 * @param sysBuffMap
	 */
	public void checkBuffHandle(long battleUid, long currentTime, Set<Long> pSet,
			ConcurrentHashMap<Long, BattleNewInfo> battleMap, Map<Integer, Struct_buff_011> sysBuffMap) {
		try {
			BattleNewInfo battleNewInfo = battleMap.get(battleUid);
			if (battleNewInfo == null) {
				return;
			}
			List<Object[]> buffData = new ArrayList<>();
			for (long hid : pSet) {
				PeronalBattleData battleData = battleNewInfo.getPlayerDataMap().get(hid);
				Map<Integer, BuffInfo> buffMap = battleData.getBuffMap();
				Map<Integer, int[][]> buffTempAttrMap = battleData.getBuffTempAttrMap();
				Iterator<Entry<Integer, BuffInfo>> buffIterator = buffMap.entrySet().iterator();
				Entry<Integer, BuffInfo> entry = null;
				Struct_buff_011 buff_011 = null;
				int buffId = 0;
				long effectEndTime = 0;
				int[][] xiaoguo = null;
				List<Object[]> data = new ArrayList<>();
				for (; buffIterator.hasNext();) {
					entry = buffIterator.next();
					buffId = entry.getKey();
					BuffInfo info = entry.getValue();
					effectEndTime = info.getEffectEndTime();
					buff_011 = sysBuffMap.get(buffId);
					xiaoguo = buff_011.getXiaoguo();
					if (buff_011.getType() == 2) {// 复活不处理
						continue;
					}
					if (currentTime > effectEndTime) {
						if(buff_011.getType() == 3) {
							buffIterator.remove();
							buffTempAttrMap.remove(buffId);
							List<Object[]> tempBuffData = new ArrayList<>();
							List<Object[]> tempData = new ArrayList<>();
							tempData.add(new Object[] { buffId, BattleNewConst.BUFF_STATE_END });
							tempBuffData.add(new Object[] { hid, tempData.toArray() });
							BattleNewSender.sendCmd_3866(hid, tempBuffData.toArray());
							continue;
						}
						buffIterator.remove();
						buffTempAttrMap.remove(buffId);
						data.add(new Object[] { buffId, BattleNewConst.BUFF_STATE_END });
					}
				}
				if (data.size() > 0) {
					buffData.add(new Object[] { hid, data.toArray() });
				}
			}
			if (buffData.size() > 0) {
				Iterator<Long> pIterator = battleNewInfo.getPlayerDataMap().keySet().iterator();
				for (; pIterator.hasNext();) {
					long pid = pIterator.next();
					LogTool.info("BattleNewSender.sendCmd_3866 88", this);
					BattleNewSender.sendCmd_3866(pid, buffData.toArray());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, "BattleNewFunction checkBuffHandle");
		}
	}

	/**
	 * 获取临时属性
	 * @param myFightAttr
	 * @param tempAttr
	 * @return
	 */
	public FinalFightAttr getTempFinalFightAttr(FightAttr fAttr, int[][] tempAttr) {
		FinalFightAttr finalFightAttr = new FinalFightAttr();
		FightAttr tempMyFightAttr = null;
		try {
			tempMyFightAttr = (FightAttr) CloneUtils.deepClone(fAttr);
			Map<Integer, Long> attrMap = new HashMap<>();
			CommonUtil.arrChargeMap(tempAttr, attrMap);
			long[][] totalAttr = CommonUtil.mapToArr(attrMap);
			FightCalcFunction.setFightValue(totalAttr, tempMyFightAttr);
			FightCalcFunction.calcEquipAttr(finalFightAttr, tempMyFightAttr, 0);
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, "BattleNewFunction getTempFinalFightAttr");
		}
		return finalFightAttr;
	}

	/**
	 * 计算技能伤害
	 * 
	 * @param hero
	 * @param enermy
	 * @param skillId
	 * @return
	 */
	public long calculateDamage(Hero hero, Hero enermy, int skillId, Map<Long, PeronalBattleData> playerDataMap,
			SkillDamage skillDamage) {
		try {
			if (enermy == null) {
				return 0;
			}
			long currentTime = TimeDateUtil.getCurrentTimeInMillis();
			long strengthA = hero.getTotalStrength();
			long strengthD = enermy.getTotalStrength();
			Map<Long, Long> damageMap = skillDamage.getDamageMap();
			Set<Long> criticalSet = skillDamage.getCriticalSet();
			Struct_skill_210 skill = Config_skill_210.getIns().get(skillId);
			int[][] buffArr = skill.getBuff();
			PeronalBattleData myBattleData = playerDataMap.get(hero.getId());
			Map<Integer, BuffInfo> buffMap = myBattleData.getBuffMap();
			long enermyId = enermy.getId();
			PeronalBattleData enermyBattleData = playerDataMap.get(enermyId);
			Map<Integer, BuffInfo> enermyBuffMap = enermyBattleData.getBuffMap();
			// 获取成功触发的buff
			int[][] enermyTempAttr = new int[0][];
			Map<Integer, int[][]> eEuffTempAttrMap = enermyBattleData.getBuffTempAttrMap();
			for (int buffId : enermyBuffMap.keySet()) {
				BuffInfo buffInfo = enermyBuffMap.get(buffId);
				if (buffInfo != null && currentTime < buffInfo.getEffectEndTime()) {
					int[][] attr = eEuffTempAttrMap.get(buffId);
					if (attr == null) {
						continue;
					}
					enermyTempAttr = CommonUtil.arrayPlusArrays(enermyTempAttr, attr);
				}
			}

			Map<Integer, Integer> pMap = new HashMap<>();
			// 获取成功触发的buff
			int[][] myTempAttr = new int[0][];
			Map<Integer, int[][]> buffTempAttrMap = myBattleData.getBuffTempAttrMap();
			for (int buffId : buffMap.keySet()) {
				BuffInfo buffInfo = buffMap.get(buffId);
				if (currentTime < buffInfo.getEffectEndTime()) {
					int[][] attr = buffTempAttrMap.get(buffId);
					if (attr == null) {
						continue;
					}
					myTempAttr = CommonUtil.arrayPlusArrays(myTempAttr, attr);
				}
			}
			// 检测是有必定暴击buff
			boolean mustCrit = false;
			if (buffMap.containsKey(BuffConst.MUST_CRIT_BUFF)) {
				mustCrit = true;
			}

			// 技能效果
			Map<Integer, Long> skillEffectMap = enermyBattleData.getSkillEffectMap();
			if (skillEffectMap.size() > 0) {
				Iterator<Integer> iterator = skillEffectMap.keySet().iterator();
				for (; iterator.hasNext();) {
					int effectType = iterator.next();
					if (effectType == 2) {
						// 无敌
						Long endTime = skillEffectMap.get(effectType);
						if (endTime != null && TimeDateUtil.getCurrentTimeInMillis() < endTime) {
							// 当前无敌状态
							return 0;
						}
					}
				}
			}
			FightAttr fightAttr = hero.getFightAttr();
			FinalFightAttr myFightAttr = null;
			if (myTempAttr.length > 0) {
				LogTool.info("getTempFinalFightAttr 66", this);
				myFightAttr = getTempFinalFightAttr(fightAttr, myTempAttr);
			} else {
				myFightAttr = hero.getFinalFightAttr();
			}

			FightAttr enermyFightAttr1 = enermy.getFightAttr();
			FinalFightAttr enermyFightAttr = null;
			if (enermyTempAttr.length > 0) {
				enermyFightAttr = getTempFinalFightAttr(enermyFightAttr1, enermyTempAttr);
			} else {
				enermyFightAttr = enermy.getFinalFightAttr();
			}

			double hitA = myFightAttr.getHit();
			double hitRateA = myFightAttr.getHitRate();
			double evadeD = enermyFightAttr.getEvade();
			double evadeRateD = enermyFightAttr.getEvadeRate();
			//命中常数
			double hitConst = (double) Config_changshu_101.getIns().get(BattleConst.HIT_EVADE_CONST).getNum() / 100;
			double hitPercent = (1 + (hitA - evadeD) / (hitA + evadeD + hitConst)) * 100000 + hitRateA - evadeRateD;// 处理为非小数
			int random = RandomUtil.getRandomNumInAreas(0, 100000);
			if (random > hitPercent) {
				// 未命中
				// return 0;
			}
			SkillInfo skillInfo = null;
//			int level = 1;
//			Iterator<SkillInfo> iterator = hero.getSkill().getSkillMap().values().iterator();
//			for (; iterator.hasNext();) {
//				skillInfo = iterator.next();
//				if (skillInfo.getId() == skillId) {
//					level = skillInfo.getLevel();
//					break;
//				}
//			}
			int job = hero.getJob();
			if(job>1000) {
				job = job/1000;
			}
			WuJiang wujiang = hero.getWujiang();
			HashMap<Integer, WuJiangModel> wujiangs = wujiang.getWujiangs();
			WuJiangModel wuJiangModel = wujiangs.get(job);
			int startLevel = wuJiangModel.getStar();
			int tId = skill.getDybw();
			if (tId > 0) {
				TreasureData treasureData = hero.getTreasureData();
				if (treasureData != null && treasureData.getTreasureMap().containsKey(tId)) {
					startLevel = treasureData.getTreasureMap().get(tId).getStarLevel();
				}
				GodBook godbook = hero.getGodbook();
				if (godbook != null && godbook.getHasBooks().containsKey(tId)) {
					startLevel = godbook.getHasBooks().get(tId).getStar();
				}
			}
			// 开始计算实际伤害
			double attA = myFightAttr.getAtt();
			double defD = enermyFightAttr.getDef();
			//* ap=基础伤害百分比+等级*伤害百分比成长
			//* p=基础威力+等级*威力成长*/
			Integer skillHurtAdd = 0;
			if(skill.getType()==2) {				
				int godSkillLevel = WuJiangFunction.getIns().getGodSkillLevel(hero.getJob(), hero.getWujiang());
				Map<Integer, Integer> skillHurtAddMap = HeroFunction.getIns().getSkillHurtAddMap(hero, hero.getId(), godSkillLevel, hero.getJob());
				skillHurtAdd = Optional.ofNullable(skillHurtAddMap).map(mapper -> mapper.get(skillId))
						.orElse(0);
			}
			double attDamagePercent = (skill.getAttp() + startLevel * skill.getAttpg() + skillHurtAdd) / 100000d;
			int power = skill.getBp() + startLevel * skill.getPg();
			// 基础伤害
			double baseDamage = Math.max(attA * attDamagePercent + power - defD, attA * 0.3);
			if (skill.getType() == 1 && skill.getType() != 8) {
				// 不是普攻，不是少主技能
				int attDamageAdd = hero.getFinalFightAttr().getAttDamageAdd();
				int lowerDamage = enermy.getFinalFightAttr().getLowerDamage();
				int change = attDamageAdd - lowerDamage;
				if (change != 0) {
					baseDamage = baseDamage + baseDamage * change / 100000;
					// damageMap.put(pid, (long) baseDamage * -1);
				}
			} else if (skill.getType() == 8) {
				int szAttDamageAdd = hero.getFinalFightAttr().getSzAttDamageAdd();
				if (szAttDamageAdd > 0) {
					baseDamage = baseDamage + baseDamage * szAttDamageAdd / 100000;
				}
			}

			int criticalA = myFightAttr.getCritical();
			int criticalRateA = myFightAttr.getCriticalRate();
			int resistCritD = enermyFightAttr.getResistCrit();
			int resistCritRateD = enermyFightAttr.getResistCritRate();
			// 暴击概率
			double critResCritConst = (double) Config_changshu_101.getIns().get(BattleConst.CRIT_RESCRIT_CONST).getNum()/ 100;// 暴击/抗暴常数
			double criticalPencent = (0.05 + (criticalA - resistCritD) / (criticalA + resistCritD + critResCritConst)) * 100000
					+ criticalRateA - resistCritRateD;
			random = RandomUtil.getRandomNumInAreas(0, 100000);
			// 暴击伤害
			double criticalDamage = baseDamage;
			if (random < criticalPencent || mustCrit) {
				double criticalDamageAddA = myFightAttr.getCriticalDamageAdd();
				double criticalDamageDerateD = enermyFightAttr.getCriticalDamageDerate();
				// 暴击
				criticalDamage = baseDamage * (1.5 + criticalDamageAddA / 100000 - criticalDamageDerateD / 100000);
				criticalSet.add(enermyId);
			}
			double damageAddA = myFightAttr.getDamageAdd();
			int damageA = myFightAttr.getDamage();
			double damageDerate = enermyFightAttr.getDamageDerate();
			double value = strengthQuell(strengthA, strengthD, damageAddA, damageDerate);
			if (strengthA > strengthD) {
				damageAddA = value;
			} else if (strengthA < strengthD) {
				damageDerate = value;
			}
			double baseCountDamage = criticalDamage * (1 + damageAddA / 100000 - damageDerate / 100000) + damageA;
			// PVP
			int pvpAddHurt = myFightAttr.getPvpAddHurt();
			int pvpMinuteHurt = enermyFightAttr.getPvpMinuteHurt();
			double playerBaseCountDamage = baseCountDamage*(1+pvpAddHurt/100000-pvpMinuteHurt/100000);
			// 五行
			int fireDamageA = myFightAttr.getFireDamage();
			int frozenDamageA = myFightAttr.getFrozenDamage();
			int electricDamageA = myFightAttr.getElectricDamage();
			int boomDamageA = myFightAttr.getBoomDamage();
			int poisonDamageA = myFightAttr.getPoisonDamage();
			double fiveDamageA = fireDamageA + frozenDamageA + electricDamageA + boomDamageA + poisonDamageA
					+ attA * myFightAttr.getElementAddHurt() / 100000d;
			int fireResD = enermyFightAttr.getFireRes();
			int frozenResD = enermyFightAttr.getFrozenRes();
			int electricResD = enermyFightAttr.getElectricRes();
			int boomResd = enermyFightAttr.getBoomRes();
			int poisonResD = enermyFightAttr.getPoisonRes();
			long attD = enermyFightAttr.getAtt();
			double fiveResD = fireResD + frozenResD + electricResD + boomResd + poisonResD + attD * enermyFightAttr.getElementMinuteHurt()/100000d;
			// 五行伤害=max（（A火焰伤害+A冰冻伤害+A爆炸伤害+A毒液伤害+A雷电伤害+A攻击*A五行伤害转化）-
			// （D火焰抗性+D冰冻抗性+D爆炸抗性+D毒液抗性+D雷电抗性+D攻击*D五行抗性转化），0）
			double fiveDamage = Math.max(fiveDamageA, fiveResD);
			// 实际伤害结果 最终伤害=(基础结算伤害+五行伤害)*rand(0.95,1.05)
			double hpMaxE = enermyFightAttr.getHpMax();
			double maxDamgPercent = (double)Config_changshu_101.getIns().get(BattleNewConst.MAX_DAMAGE_LIMIT).getNum() / 100000;
			double finalDamage = Math.min(Math.max((playerBaseCountDamage + fiveDamage), attA * 0.3),
					hpMaxE * maxDamgPercent)
					* RandomUtil.getRandomNumInAreas(95, 105) / 100;
			// buff效果
			if(pMap.containsKey(GameConst.BUFF_VAMP)) {
				long addHp = (long) (finalDamage * pMap.get(GameConst.BUFF_VAMP) / 100);
				long hp = myBattleData.getHp()+addHp;
				long hpMax = myFightAttr.getHpMax();
				if(hp>hpMax) {
					hp = hpMax;
				}
				myBattleData.setHp(hp);
			}else if(pMap.containsKey(GameConst.BUFF_DOUBLE_HIT)) {
				finalDamage = finalDamage + finalDamage * pMap.get(GameConst.BUFF_VAMP) / 100;
			}
			long allDamage = (long) finalDamage;
			damageMap.put(enermyId, allDamage * -1);
			int extDamage = myFightAttr.getExtDamage();
			if (skill.getType() == 1 && skill.getType() != 8) {
				allDamage = allDamage + allDamage * extDamage / 100000;
			}
			return allDamage;
		} catch (Exception e) {
			LogTool.error(e, BattleNewFunction.class, hero.getId(), hero.getName(),
					"BattleNewFunction calculateDamage enermy=" + enermy.getId() + ", name=" + enermy.getName());
		}
		return 0;
	}
	
	/**
	 * 战力压制
	 * 
	 * @param strengthA
	 * @param strengthD
	 * @param damageAddA
	 * @param damageDerateD
	 * @return double[]{防御方伤害减免, 攻击方伤害加成}
	 */
	public double strengthQuell(long strengthA, long strengthD, double damageAddA, double damageDerateD) {
		int stregthQuell6 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_QUELL6).getNum();
		int stregthQuell5 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_QUELL5).getNum();
		int stregthQuell4 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_QUELL4).getNum();
		int stregthQuell3 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_QUELL3).getNum();
		int stregthQuell2 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_QUELL2).getNum();
		int stregthQuell1 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_QUELL1).getNum();
		
		int stregthValue6 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_VALUE6).getNum();
		int stregthValue5 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_VALUE5).getNum();
		int stregthValue4 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_VALUE4).getNum();
		int stregthValue3 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_VALUE3).getNum();
		int stregthValue2 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_VALUE2).getNum();
		int stregthValue1 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_VALUE1).getNum();
		
		int stregthDamAdd6 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_DAMAGE_ADD6).getNum();
		int stregthDamAdd5 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_DAMAGE_ADD5).getNum();
		int stregthDamAdd4 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_DAMAGE_ADD4).getNum();
		int stregthDamAdd3 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_DAMAGE_ADD3).getNum();
		int stregthDamAdd2 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_DAMAGE_ADD2).getNum();
		int stregthDamAdd1 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_DAMAGE_ADD1).getNum();
		
		int stregthDamDet6 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_DAMAGE_DERATE6).getNum();
		int stregthDamDet5 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_DAMAGE_DERATE5).getNum();
		int stregthDamDet4 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_DAMAGE_DERATE4).getNum();
		int stregthDamDet3 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_DAMAGE_DERATE3).getNum();
		int stregthDamDet2 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_DAMAGE_DERATE2).getNum();
		int stregthDamDet1 = Config_changshu_101.getIns().get(BattleNewConst.STRENGTH_DAMAGE_DERATE1).getNum();
		double value1 = damageDerateD;
		if(strengthD>strengthA) {			
			if (strengthD >= (strengthD+Math.min((double) strengthA * stregthQuell6 / 100000, (double) stregthValue6))) {
				value1 = damageDerateD + stregthDamDet6;
			} else if (strengthD >= (strengthD+Math.min((double) strengthA * stregthQuell5 / 100000, (double) stregthValue5))) {
				value1 = damageDerateD + stregthDamDet5;
			}else if(strengthD>=(strengthA+Math.min((double)strengthA*stregthQuell4/100000, (double)stregthValue4))) {
				value1 = damageDerateD + stregthDamDet4;
			}else if(strengthD>=(strengthA+Math.min((double)strengthA*stregthQuell3/100000, (double)stregthValue3))) {
				value1 = damageDerateD + stregthDamDet3;
			}else if(strengthD>=(strengthA+Math.min((double)strengthA*stregthQuell2/100000, (double)stregthValue2))) {
				value1 = damageDerateD + stregthDamDet2;
			}else if(strengthD>=(strengthA+Math.min((double)strengthA*stregthQuell1/100000, (double)stregthValue1))) {
				value1 = damageDerateD + stregthDamDet1;
			}
			return value1;
		}
		double value2 = damageAddA;
		if (strengthA >= strengthD + Math.min(strengthD * stregthQuell6 / 100000d, (double) stregthValue6)) {
			value2 = damageAddA + stregthDamAdd6;
		} else if (strengthA >= strengthD + Math.min(strengthD * stregthQuell5 / 100000d, (double) stregthValue5)) {
			value2 = damageAddA + stregthDamAdd5;
		} else if (strengthA >= strengthD + Math.min(strengthD * stregthQuell4 / 100000d, (double) stregthValue4)) {
			value2 = damageAddA + stregthDamAdd4;
		} else if (strengthA >= strengthD + Math.min(strengthD * stregthQuell3 / 100000d, (double) stregthValue3)) {
			value2 = damageAddA + stregthDamAdd3;
		} else if (strengthA >= strengthD + Math.min(strengthD * stregthQuell2 / 100000d, (double) stregthValue2)) {
			value2 = damageAddA + stregthDamAdd2;
		} else if (strengthA >= strengthD + Math.min(strengthD * stregthQuell1 / 100000d, (double) stregthValue1)) {
			value2 = damageAddA + stregthDamAdd1;
		}
		return value2;
	}
	
	/**
	 * 检测buffId 是否能作用
	 * 
	 * @param buffId
	 * @param enermyBuffMap
	 * @return
	 */
	public boolean checkBuffCanEffect(int buffId, Map<Integer, BuffInfo> enermyBuffMap) {
		Iterator<Entry<Integer, BuffInfo>> iterator = enermyBuffMap.entrySet().iterator();
		Entry<Integer, BuffInfo> entry = null;
		for(;iterator.hasNext();) {
			entry = iterator.next();
			int bId = entry.getKey();
			Struct_buff_011 buff_011 = Config_buff_011.getIns().get(bId);
			int[][] xiaoguo = buff_011.getXiaoguo();
			int effectId = xiaoguo[0][0];
			if (effectId == GameConst.BUFF_CLOAKING) {
				return false;
			}
		}
		return false;
	}

	public boolean checkIsBattle(long hid) {
		ConcurrentHashMap<Long, Long> heroBattleMap = BattleNewSysCache.getHeroBattleMap();
		if (heroBattleMap.containsKey(hid)) {
			return true;
		}
		return false;
	}

	/**
	 * 获取胜利方玩家集合（1个玩家时用）
	 */
	public long getWinHID(BattleNewInfo battleNewInfo) {
		int winCamp = battleNewInfo.getWinCamp();
		Set<Long> set = battleNewInfo.getCampMap().get((byte) winCamp);
		return set.iterator().next();
	}
	/**
	 * 获取失败方玩家集合（1个玩家时用）
	 */
	public long getFailHID(BattleNewInfo battleNewInfo) {
		int winCamp = battleNewInfo.getWinCamp();
		int failCamp = BattleNewConst.CAMP_1;
		if(winCamp == BattleNewConst.CAMP_1) {
			failCamp = BattleNewConst.CAMP_2;
		}
		Set<Long> set = battleNewInfo.getCampMap().get((byte) failCamp);
		return set.iterator().next();
	}
	/**
	 * 获取胜利方玩家集合（多个玩家时用）
	 */
	public Set<Long> getWinSet(BattleNewInfo battleNewInfo) {
		int winCamp = battleNewInfo.getWinCamp();
		Set<Long> set = battleNewInfo.getCampMap().get((byte) winCamp);
		return set;
	}
	/**
	 * 获取失败方玩家集合（多个玩家时用）
	 */
	public Set<Long> getFailSet(BattleNewInfo battleNewInfo) {
		int winCamp = battleNewInfo.getWinCamp();
		int failCamp = BattleNewConst.CAMP_1;
		if(winCamp == BattleNewConst.CAMP_1) {
			failCamp = BattleNewConst.CAMP_2;
		}
		Set<Long> set = battleNewInfo.getCampMap().get((byte) failCamp);
		return set;
	}
}
