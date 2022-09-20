package com.teamtop.system.crossAttackCity.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.crossAttackCity.AttackCityConst;
import com.teamtop.system.crossAttackCity.AttackCityLocalCache;
import com.teamtop.system.crossAttackCity.AttackCityManager;
import com.teamtop.system.crossAttackCity.AttackCitySender;
import com.teamtop.system.crossAttackCity.model.AttackCity;
import com.teamtop.system.crossAttackCity.model.AttackCityLocal;
import com.teamtop.system.crossAttackCity.model.CityInfo;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.godbook.GodBookModel;
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
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_gcbz_777;
import excel.struct.Struct_gcbz_777;

public class AttackCityCrossFunction {
	public static AttackCityCrossFunction ins;

	public static AttackCityCrossFunction getIns() {
		if (ins == null) {
			ins = new AttackCityCrossFunction();
		}
		return ins;
	}

	private AttackCityCrossFunction() {
	}

	/**
	 * 攻城拔塞是否进行开启 
	 * 23：50-00：05时间段内不可入驻；
	 * 
	 * @return
	 */
	public boolean isOpen() {
		try {
			int hour = TimeDateUtil.getHour();
			int minute = TimeDateUtil.getMinute();
			int[] hours = AttackCityConst.HOURS;
			if (hour == hours[0]) {
				if (minute >= hours[1] && minute <= hours[2]) {
					return false;
				}
			}
			if (hour == hours[3]) {
				if (minute >= hours[4] && minute <= hours[5]) {
					return false;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return true;
	}

	/**
	 * 加攻城次数
	 * 
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addAttackNum(Hero hero, int id, int num) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return false;
			}
			AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
			int times = attackCityLocal.getTimes();
			attackCityLocal.setTimes(times + num);
			return true;
		} catch (Exception e) {
			LogTool.error(e, AttackCityCrossFunction.class, hero.getId(), hero.getName(),
					"AttackCityCrossFunction addAttackNum");
		}
		return false;
	}

	public void checkCityInfo(AttackCity AttackCity) {
		for (Struct_gcbz_777 config : Config_gcbz_777.getIns().getSortList()) {
			ConcurrentHashMap<Integer, CityInfo> cityInfoMap = AttackCity.getCityInfoMap();
			if (cityInfoMap == null) {
				continue;
			}
			CityInfo cityInfo = cityInfoMap.get(config.getTgs());
			if (cityInfo == null) {
				continue;
			}
			if (cityInfo.getState() == 1) {
				int reTime = cityInfo.getReTime();
				int endTime = cityInfo.getStartTime() + reTime;
				if (TimeDateUtil.getCurrentTime() >= endTime) {
					cityInfo.setState(2);
				}
				int awardTime = TimeDateUtil.getCurrentTime() - cityInfo.getStartTime();
				// if (TimeDateUtil.getCurrentTime() < cityInfo.getStartTime()) {
				// // 非法时间 驻守时间比中央服时间还远
				// cityInfo.setState(2);
				// }
				if (awardTime > reTime) {
					awardTime = reTime;
				}
				int award = awardTime / AttackCityConst.XTCS_8250;
				int wuzi = cityInfo.getWuzi() + award * config.getZsjl()[0][2];
				if (wuzi >= AttackCityConst.XTCS_8251[0][2]) {
					cityInfo.setState(2);
				}
				long currentTimeInMillis = TimeDateUtil.getCurrentTimeInMillis();
				if (!TimeDateUtil.isSameDay(cityInfo.getStartTime() * 1000L, currentTimeInMillis)) {
					// 结束时间不为同一天
					cityInfo.setState(2);
				}
			}
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
		HeroSender.sendCmd_130(hero.getId(), cityInfo.getHid(), cityInfo.getName(), cityInfo.getOfficial(),
				cityInfo.getCountryId(), cityInfo.getTitleId(), fms,
				attrData.toArray(), cityInfo.getStrength(), extdataList.toArray(), withLeaderId, withLeaderFid,
				leaderStarId, leaderSkillId);
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean[] checkRedPoint(Hero hero, int countAward) {
		boolean[] hadRedPoint = new boolean[3];
		hadRedPoint[0] = false;
		hadRedPoint[1] = false;
		hadRedPoint[2] = false;

		if (AttackCityLocalCache.redPointPushZhanBao.contains(hero.getId())) {
			hadRedPoint[2] = true;
		}

		// AttackCityLocal attackCityLocal = hero.getAttackCityLocal();
		// int countAward = attackCityLocal.getCountAward();
		if (countAward >= AttackCityConst.XTCS_8251[0][2]) {
			hadRedPoint[1] = true;
		}
		return hadRedPoint;
	}

	/**
	 * 系统id 攻城拔塞 7831
	 * 系统编号index 1是物资已满 2是被打提示
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero, int countAward) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ATTACT_CITY)) {
				return;
			}
			boolean[] redPoint = checkRedPoint(hero, countAward);
			for (int i = 1; i < 3; i++) {
				boolean hadRed = redPoint[i];
				if (hadRed) {
					AttackCitySender.sendCmd_12080(hero.getId(), i, RedPointConst.HAS_RED);
				} else {
					AttackCitySender.sendCmd_12080(hero.getId(), i, RedPointConst.NO_RED);
				}
			}
			if (countAward > 0) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.ATTACT_CITY, 1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.ATTACT_CITY, 1, RedPointConst.NO_RED);
			}
			boolean contains = AttackCityLocalCache.redPoint.contains(hero.getId());
			if (contains) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.ATTACT_CITY, 2, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.ATTACT_CITY, 2, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, AttackCityManager.class, "updateRedPoint has wrong");
		}
	}
}
