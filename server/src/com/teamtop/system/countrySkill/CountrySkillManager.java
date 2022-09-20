package com.teamtop.system.countrySkill;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.AsyncOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.country.newkingship.NewKingShipCache;
import com.teamtop.system.country.newkingship.NewKingShipFunction;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;

import excel.config.Config_gjjn_748;
import excel.struct.Struct_gjjn_748;

public class CountrySkillManager {
	private static volatile CountrySkillManager ins = null;

	public static CountrySkillManager getIns() {
		if (ins == null) {
			synchronized (CountrySkillManager.class) {
				if (ins == null) {
					ins = new CountrySkillManager();
				}
			}
		}
		return ins;
	}

	private CountrySkillManager() {
	}

	/**
	 * 打开界面 6001
	 */
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.COUNTRYSKILL_SYSID)) {
			return;
		}
		int countryType = hero.getCountryType();
		if (countryType == 0) {
			// 没有加入国家
			LogTool.warn("hid" + hero.getId() + " name:" + hero.getName() + "openUI countryType=0", this);
			return;
		}
		Map<Integer, Integer> countrySkillMap = CountrySkillCache.getCountrySkillByTypeMap().get(countryType);
		Map<Integer, List<Struct_gjjn_748>> configByTypeMap = CountrySkillCache.getConfigByTypeMap();
		List<Object[]> arrayList = new ArrayList<>();
		int countrySkillTotalLV = CountrySkillFunction.getIns().getCountrySkillTotalLV(countryType);
		for (Entry<Integer, List<Struct_gjjn_748>> entry : configByTypeMap.entrySet()) {
			int type = entry.getKey();
			Integer skillId = countrySkillMap.get(type);
			List<Struct_gjjn_748> list = entry.getValue();
			Object[] array = Optional.ofNullable(skillId).map(skillId1 -> {
				Struct_gjjn_748 struct_gjjn_748 = Config_gjjn_748.getIns().get(skillId1);
				int tj = struct_gjjn_748.getTj();
				if (tj != 0 && countrySkillTotalLV >= tj) {
					return new Object[] { skillId1, CountrySkillConst.CAN_LV };
				} else {
					return new Object[] { skillId1, CountrySkillConst.NOT_LV };
				}
			}).orElseGet(() -> {
				Struct_gjjn_748 struct_gjjn_748 = list.get(0);
				int id = struct_gjjn_748.getId();
				int tj = struct_gjjn_748.getTj();
				if (countrySkillTotalLV >= tj) {
					return new Object[] { id, CountrySkillConst.CAN_JIHUO };
				} else {
					return new Object[] { id, CountrySkillConst.NOT_JIHUO };
				}
			});
			arrayList.add(array);
		}
		AtomicLong countryPrestige = CountrySkillCache.getCountryPrestigeByTypeMap().get(countryType);
		// 王位之争活动开启状态，0：未开启，1：已开启
		int isKingShipOpenState = NewKingShipCache.isWWStartTime ? 1 : 0;
		CountrySkillSender.sendCmd_6002(hero.getId(), arrayList.toArray(), countryPrestige.get(), isKingShipOpenState);
	}

	/**
	 * 激活或升级 6003
	 * 
	 * @param skillId| 技能id| int
	 */
	public void jihuoOrUpLv(Hero hero, int skillId) {
		// TODO Auto-generated method stub
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.COUNTRYSKILL_SYSID)) {
				return;
			}
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				// 没有加入国家
				LogTool.warn("hid" + hero.getId() + " name:" + hero.getName() + "jihuoOrUpLv countryType=0 skillId:"
						+ skillId, this);
				return;
			}

			boolean king = NewKingShipFunction.getIns().isKing(countryType, hero.getId());
			if (!king) {
				// 不是国王
				LogTool.warn("hid" + hero.getId() + " name:" + hero.getName() + "jihuoOrUpLv !king skillId:" + skillId,
						this);
				return;
			}

			Struct_gjjn_748 struct_gjjn_748 = Config_gjjn_748.getIns().get(skillId);
			if (struct_gjjn_748 == null) {
				// 配置表找不到国家技能
				LogTool.warn("hid" + hero.getId() + " name:" + hero.getName()
						+ "getAward struct_gjjn_748 == null skillId:" + skillId, this);
				CountrySkillSender.sendCmd_6004(hero.getId(), CountrySkillConst.FAILURE, 0, 0);
				return;
			}

			int id = struct_gjjn_748.getId();
			int type = struct_gjjn_748.getWz();
			Map<Integer, Integer> countrySkillMap = CountrySkillCache.getCountrySkillByTypeMap().get(countryType);
			Integer localSkillId = countrySkillMap.get(type);
			int nextSkillId = struct_gjjn_748.getNext();
			if (localSkillId == null) {
				// 激活
				Map<Integer, List<Struct_gjjn_748>> configByTypeMap = CountrySkillCache.getConfigByTypeMap();
				Struct_gjjn_748 struct_gjjn_7482 = configByTypeMap.get(type).get(0);
				if (id != struct_gjjn_7482.getId()) {
					// 不是激活的国家技能id
					LogTool.warn("hid" + hero.getId() + " name:" + hero.getName()
							+ "getAward id != struct_gjjn_7482.getId() skillId:" + skillId, this);
					CountrySkillSender.sendCmd_6004(hero.getId(), CountrySkillConst.FAILURE, 0, 0);
					return;
				}
			} else {
				// 升级
				if (skillId == localSkillId) {
					if (nextSkillId == 0) {
						// 已满级
						LogTool.warn("hid" + hero.getId() + " name:" + hero.getName() + "getAward full lv skillId:"
								+ skillId, this);
						CountrySkillSender.sendCmd_6004(hero.getId(), CountrySkillConst.FAILURE_FULL_LV, 0, 0);
						return;
					}
				} else {
					// 跨级升级,非法
					LogTool.warn(
							"hid" + hero.getId() + " name:" + hero.getName() + "getAward cross lv skillId:" + skillId,
							this);
					CountrySkillSender.sendCmd_6004(hero.getId(), CountrySkillConst.FAILURE, 0, 0);
					return;
				}
			}
			int tj = struct_gjjn_748.getTj();
			int countrySkillTotalLV = CountrySkillFunction.getIns().getCountrySkillTotalLV(countryType);
			if (countrySkillTotalLV >= tj) {
				int prestigeConsume = struct_gjjn_748.getConsume()[0][2];
				Map<Integer, AtomicLong> countryPrestigeByTypeMap = CountrySkillCache.getCountryPrestigeByTypeMap();
				AtomicLong atomicLong = countryPrestigeByTypeMap.get(countryType);
				long countryPrestige = atomicLong.get();
				if (countryPrestige >= prestigeConsume) {
					atomicLong.addAndGet((long) prestigeConsume * -1);
					// 下一等级技能id
					countrySkillMap.put(type, nextSkillId);
					countryPrestige = atomicLong.get();
					// 成功
					CountrySkillSender.sendCmd_6004(hero.getId(), CountrySkillConst.SUCCESS, nextSkillId,
							countryPrestige);
					// 在线和离线经验和铜钱收益缓存处理
					addOnAndOfflineExpCoin(hero, skillId, nextSkillId);
					// 单个技能等级达到10的倍数时，进行全服公告
					if (nextSkillId % CountrySkillConst.NOTICE_LVBEI == 0) {
						ChatManager.getIns().broadCast(ChatConst.COUNTRYSKILL_NOTIC,
								new Object[] { countryType, nextSkillId, nextSkillId % 100 });
					}
					// 重算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.COUNTRYSKILL, SystemIdConst.COUNTRYSKILL_SYSID);
					// 异步，给相同国家其他所有玩家重算国家技能战力，防止阻塞国王线程
					asyncOtherPlayerFightCalc(hero);
				} else {
					// 国家声望不足
					CountrySkillSender.sendCmd_6004(hero.getId(), CountrySkillConst.FAILURE_NOT_COUNTRYPRE, 0, 0);
					return;
				}
			} else {
				// 不满足激活或升级条件
				CountrySkillSender.sendCmd_6004(hero.getId(), CountrySkillConst.FAILURE_NOT_REACH, 0, 0);
				return;
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "jihuoOrUpLv skillId:" + skillId);
		}
	}

	/**
	 * 异步，给相同国家其他所有玩家重算国家技能战力，防止阻塞国王线程
	 * 
	 * @param hero
	 */
	private void asyncOtherPlayerFightCalc(Hero hero) {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new AsyncOpTaskRunnable() {

				@Override
				public void run() {
					// TODO Auto-generated method stub
					Map<Long, Hero> heroMap = HeroCache.getHeroMap();
					for (Hero otherHero : heroMap.values()) {
						if (otherHero.getId() == hero.getId()) {
							continue;
						}
						// TODO Auto-generated method stub
						if (!HeroFunction.getIns().checkSystemOpen(otherHero, SystemIdConst.COUNTRYSKILL_SYSID)) {
							return;
						}
						if(!HeroFunction.getIns().isOnline(otherHero.getId())) {
							return;
						}
						// 给相同国家其他所有玩家重算国家技能战力
						FightCalcFunction.setRecalcAll(otherHero, FightCalcConst.COUNTRYSKILL,
								SystemIdConst.COUNTRYSKILL_SYSID);
					}
				}

				@Override
				public Object getSession() {
					// TODO Auto-generated method stub
					return OpTaskConst.COUNTRYSKILL_ASYNC;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "asyncOtherPlayerFightCalc");
		}
	}

	/**
	 * 在线和离线经验和铜钱收益缓存处理
	 * 
	 * @return
	 */
	private void addOnAndOfflineExpCoin(Hero hero, int skillId, int nextSkillId) {
		try {
			Struct_gjjn_748 skill = Config_gjjn_748.getIns().get(skillId);
			Struct_gjjn_748 nextSkill = Config_gjjn_748.getIns().get(nextSkillId);
			Map<Integer, Integer[]> onAndOfflineExpCoinMap = CountrySkillCache.getOnAndOfflineExpCoinMap();
			Integer[] expCoinArray = onAndOfflineExpCoinMap.get(hero.getCountryType());
			if (skill.getId() % 100 != 0) {
				// 减去上一等级技能的在线小怪经验
				expCoinArray[0] = expCoinArray[0] - skill.getZxjy();
				expCoinArray[1] = expCoinArray[1] - skill.getZxtq();
				expCoinArray[2] = expCoinArray[2] - skill.getLxjy();
				expCoinArray[3] = expCoinArray[3] - skill.getLxtq();
			}
			// 在线小怪经验增加
			int zxjy = nextSkill.getZxjy();
			expCoinArray[0] += zxjy;
			// 在线小怪铜钱增加
			int zxtq = nextSkill.getZxtq();
			expCoinArray[1] += zxtq;
			// 离线每小时经验
			int lxjy = nextSkill.getLxjy();
			expCoinArray[2] += lxjy;
			// 离线每小时铜钱
			int lxtq = nextSkill.getLxtq();
			expCoinArray[3] += lxtq;

		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "addOnAndOfflineExpCoin nextSkillId:" + nextSkillId);
		}
	}

}
