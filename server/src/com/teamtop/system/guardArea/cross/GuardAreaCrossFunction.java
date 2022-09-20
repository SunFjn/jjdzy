package com.teamtop.system.guardArea.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.godbook.GodBookModel;
import com.teamtop.system.guardArea.GuardAreaConst;
import com.teamtop.system.guardArea.GuardAreaLocalCache;
import com.teamtop.system.guardArea.GuardAreaManager;
import com.teamtop.system.guardArea.model.CityInfo;
import com.teamtop.system.guardArea.model.GuardArea;
import com.teamtop.system.guardArea.model.GuardAreaDao;
import com.teamtop.system.hero.FightAttrFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.config.Config_zssf_294;
import excel.struct.Struct_zssf_294;
import io.netty.channel.Channel;

public class GuardAreaCrossFunction {
	public static GuardAreaCrossFunction ins;

	public static GuardAreaCrossFunction getIns() {
		if (ins == null) {
			ins = new GuardAreaCrossFunction();
		}
		return ins;
	}

	private GuardAreaCrossFunction() {
	}

	public GuardArea addGuardArea(int partId, long hid, int belongZoneid) {
		GuardArea guardArea = new GuardArea();
		guardArea.setHid(hid);
		guardArea.setCityInfoMap(new HashMap<>());
		guardArea.setPlunderMap(new HashMap<>());
		guardArea.setBelongZoneid(belongZoneid);
		GuardAreaCrossCache.allGuardAreaCache.get(partId).put(hid, guardArea);

		for (Struct_zssf_294 config : Config_zssf_294.getIns().getSortList()) {
			CityInfo cityInfo = new CityInfo();
			cityInfo.setCityId(config.getId());
			cityInfo.setHid(hid);
			cityInfo.setPlunderTimes(0);
			cityInfo.setStartTime(0);
			cityInfo.setState(0);
			cityInfo.setWuJiangId(0);
			cityInfo.setAddValue(0);
			guardArea.getCityInfoMap().put(config.getId(), cityInfo);
		}

		try {
			GuardAreaDao.getIns().insertData(guardArea);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return guardArea;
	}

	public void checkCityInfo(GuardArea guardArea) {
		for (Struct_zssf_294 config : Config_zssf_294.getIns().getSortList()) {
			CityInfo cityInfo = guardArea.getCityInfoMap().get(config.getId());
			if (cityInfo.getState() == 1) {
				int endTime = cityInfo.getStartTime() + config.getTime();
				if (TimeDateUtil.getCurrentTime() >= endTime) {
					cityInfo.setState(2);
				}
			}
		}
	}

	public void getRandomCityInfo(GuardArea guardArea, int partId) {
		int maxPlunderTimes = Config_xtcs_004.getIns().get(GuardAreaConst.CONST_8007).getNum();
		guardArea.getPlunderMap().clear();
		ConcurrentHashMap<Long, GuardArea> allGuardArea = GuardAreaCrossCache.allGuardAreaCache.get(partId);
		for (Struct_zssf_294 config : Config_zssf_294.getIns().getSortList()) {
			List<CityInfo> canCityInfo = new ArrayList<>();
			for (GuardArea ga : allGuardArea.values()) {
				if (ga.getHid() == guardArea.getHid()) {
					continue;
				}
				CityInfo cityInfo = ga.getCityInfoMap().get(config.getId());
				if (cityInfo.getState() == 0) {
					continue;
				}
				if (cityInfo.getState() == 1 && TimeDateUtil.getCurrentTime() <= cityInfo.getStartTime() + 7200) {
					continue;
				}
				if (cityInfo.getPlunderTimes() >= maxPlunderTimes) {
					continue;
				}
				canCityInfo.add(cityInfo);
			}
			if (canCityInfo.isEmpty()) {
				continue;
			}

			int size = canCityInfo.size();
			int index = RandomUtil.getRandomNumInAreas(0, size - 1);
			CityInfo cityInfo = canCityInfo.get(index);
			guardArea.getPlunderMap().put(config.getId(), cityInfo.getHid());
		}
	}

	/**
	 * 发送战斗玩家的属性
	 * 
	 * @param hero
	 *            发送到的玩家对象
	 * @param beHid
	 *            需查询的玩家id
	 */
	public void sendBattleHeroAttr(Hero hero, CityInfo cityInfo) {
		Map<Integer, SkillInfo> skillMap = cityInfo.getSkill().getSkillMap();
		List<Object[]> attrData = new ArrayList<Object[]>();
		FinalFightAttr attr = cityInfo.getFinalFightAttr();
		// 技能数据
		Map<Integer, Integer> skillHurtAddMap = HeroFunction.getIns().getSkillHurtAddMap(hero, cityInfo.getHid(),
				cityInfo.getGodSkillLevel(), cityInfo.getWuJiangId());
		List<Object[]> skillData = new ArrayList<Object[]>();
		for (Entry<Integer, SkillInfo> entry : skillMap.entrySet()) {
			int index = entry.getKey();
			SkillInfo skillInfo = entry.getValue();
			Integer skillHurtAdd = Optional.ofNullable(skillHurtAddMap).map(mapper -> mapper.get(skillInfo.getId()))
					.orElse(0);
			skillData.add(new Object[] { index, skillInfo.getId(), skillInfo.getLevel(), skillHurtAdd });
		}
		int fashionID = 0;
		// 出战兽灵
		int fms = cityInfo.getFigthMonsterSpirit();
		// L:唯一id，第一个跟hid一样B:武将类型I:生命I:内力I:攻击I:物防I:法防I:暴击率I:抗暴率I:暴击伤害I:伤害加成I:伤害减免I:pvp伤害加成I:pvp伤害减免I:移动速度I:战力[S:技能等级S:技能觉醒等级]技能数据
		List<Object[]> attrSendData = FightAttrFunction.createAttrSendData(attr);
		attrData.add(new Object[] { attr.getUid(), cityInfo.getWuJiangId(), attrSendData.toArray(), skillData.toArray(),
				fashionID });
		// GC[I:0（宝物1id）1（宝物1星级）2（宝物2）3（宝物2星级）4（天书id）5（天书星级）6（武将星级）]其他参数数组
		List<Object[]> extdataList = new ArrayList<>();
		int wearTreasure1 = 0;
		int baowu1Star = 0;
		int wearTreasure2 = 0;
		int baowu2Star = 0;
		int godBookid = 0;
		int godBookStar = 0;
		int wujiangStar = 0;
		int godWeapon = 0;
		int nowjob = cityInfo.getWuJiangId();
		TreasureData treasureData = cityInfo.getBaowu();
		if (treasureData != null) {
			List<Integer> wearTreasureList = treasureData.getWearTreasureList();
			if (wearTreasureList != null) {
				Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
				wearTreasure1 = wearTreasureList.get(0);
				wearTreasure2 = wearTreasureList.get(1);
				if (wearTreasure1 != 0 && treasureMap.containsKey(wearTreasure1)) {
					TreasureModel treasureModel = treasureMap.get(wearTreasure1);
					baowu1Star = treasureModel.getStarLevel();
				}
				if (wearTreasure2 != 0 && treasureMap.containsKey(wearTreasure2)) {
					TreasureModel treasureModel = treasureMap.get(wearTreasure2);
					baowu2Star = treasureModel.getStarLevel();
				}
			}
		}
		GodBook godBook = cityInfo.getTianshu();
		if (godBook != null) {
			HashMap<Integer, GodBookModel> hasBooks = godBook.getHasBooks();
			godBookid = godBook.getWearid();
			if (godBookid != 0 && hasBooks.containsKey(godBookid)) {
				GodBookModel godBookModel = hasBooks.get(godBookid);
				godBookStar = godBookModel.getStar();
			}
		}

		extdataList.add(new Object[] { wearTreasure1 });
		extdataList.add(new Object[] { baowu1Star });
		extdataList.add(new Object[] { wearTreasure2 });
		extdataList.add(new Object[] { baowu2Star });
		extdataList.add(new Object[] { godBookid });
		extdataList.add(new Object[] { godBookStar });
		extdataList.add(new Object[] { wujiangStar });
		extdataList.add(new Object[] { godWeapon });
		extdataList.add(new Object[] { 0 });

		// 少主信息
		int withLeaderId = 0;
		int withLeaderFid = 0;
		int leaderStarId = 0;
		int leaderSkillId = 0;
		LittleLeader littleLeader = cityInfo.getLittleLeader();
		if (littleLeader != null) {
			withLeaderId = littleLeader.getWearType();
			if (withLeaderId != 0) {
				LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(withLeaderId);
				withLeaderFid = littleLeaderModel.getNowFashId();
				leaderStarId = littleLeaderModel.getStar();
				leaderSkillId = littleLeaderModel.getActivityKillLv();
			}

		}
		// 推送前端
		HeroSender.sendCmd_130(hero.getId(), cityInfo.getHid(), cityInfo.getName(), 0, cityInfo.getCountryId(), 0, fms,
				attrData.toArray(), cityInfo.getStrength(), extdataList.toArray(), withLeaderId, withLeaderFid,
				leaderStarId, leaderSkillId);
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean[] checkRedPoint(Hero hero) {
		boolean[] hadRedPoint = new boolean[3];
		hadRedPoint[0] = false;
		hadRedPoint[1] = false;
		hadRedPoint[2] = false;

		if (GuardAreaLocalCache.redPointPushZhanBao.contains(hero.getId())) {
			hadRedPoint[2] = true;
		}
		CrossData crossData = new CrossData();
		crossData.putObject(GuardAreaEnum.hid, hero.getId());
		crossData.putObject(GuardAreaEnum.belongZoneid, hero.getZoneid());

		Channel channel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(channel, CrossConst.CROSS_GUARD_AREA_OPEN_UI, crossData, new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				try {
					GuardArea guardArea = crossData.getObject(GuardAreaEnum.guardArea, GuardArea.class);

					List<Integer> wujiangList = new ArrayList<>();
					wujiangList.addAll(hero.getWujiang().getWujiangs().keySet());

					List<Integer> needStartCity = new ArrayList<>();

					for (Struct_zssf_294 config : Config_zssf_294.getIns().getSortList()) {
						CityInfo cityInfo = guardArea.getCityInfoMap().get(config.getId());
						if (cityInfo.getState() == 2) {
							RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.GUARD_AREA, 1,
									RedPointConst.HAS_RED);
							return;
						}
						if (cityInfo.getState() == 0) {
							int vipLv = hero.getVipLv();
							int rLv = hero.getReincarnationLevel();
							if (rLv < config.getLh() && vipLv < config.getVip()) {
								continue;
							}
							needStartCity.add(cityInfo.getCityId());
						} else {
							wujiangList.remove(Integer.valueOf(cityInfo.getWuJiangId()));
						}
					}
					for (int c : needStartCity) {
						if (c == 5) {
							for (int w : wujiangList) {
								if (w > 50) {
									RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.GUARD_AREA, 1,
											RedPointConst.HAS_RED);
									return;
								}
							}
						} else {
							for (int w : wujiangList) {
								if (w < 50) {
									RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.GUARD_AREA, 1,
											RedPointConst.HAS_RED);
									return;
								}
							}
						}
					}
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.GUARD_AREA, 1,
							RedPointConst.NO_RED);
				} catch (Exception e) {
					LogTool.error(e, GuardAreaManager.class, "checkRedPoint has wrong");
				}
			}
		});

		return hadRedPoint;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GUARD_AREA)) {
				return;
			}
			boolean[] redPoint = checkRedPoint(hero);
			for (int i = 1; i < 3; i++) {
				boolean hadRed = redPoint[i];
				if (hadRed) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.GUARD_AREA, i,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.GUARD_AREA, i,
							RedPointConst.NO_RED);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, GuardAreaManager.class, "updateRedPoint has wrong");
		}
	}
}
