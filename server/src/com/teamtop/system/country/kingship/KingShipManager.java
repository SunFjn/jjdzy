package com.teamtop.system.country.kingship;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.country.CountryFunction;
import com.teamtop.system.country.CountrySysCache;
import com.teamtop.system.country.CountryType;
import com.teamtop.system.country.kingship.model.KingShipData;
import com.teamtop.system.country.kingship.model.KingShipModel;
import com.teamtop.system.country.model.Country;
import com.teamtop.system.country.model.CountryStrengthRankModel;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.title.TitleFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.illiegalUtil.IlliegalUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_NPC_200;
import excel.config.Config_wwzd_227;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_NPC_200;
import excel.struct.Struct_wwzd_227;

/**
 * @author jjjjyyy
 *
 */
public class KingShipManager {
	public static KingShipManager ins;

	public static KingShipManager getIns() {
		if (ins == null) {
			ins = new KingShipManager();
		}
		return ins;
	}

	private KingShipManager() {
	}

	/**
	 * 王位之争挑战UI
	 * 
	 * @param hero
	 */
	public void openUIKingShip(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
			return;
		}
		if (hero.getCountryType() == 0) {
			return;
		}
		int currentTime = TimeDateUtil.getCurrentTime();
		KingShipData kingShipData = hero.getCountryData().getKingShipData();
		if (KingShipCache.isWWStartTime) {
			ArrayList<Object> arrayList = new ArrayList<Object>();
			List<KingShipModel> KSModelList = KingShipCache.getCountry(hero.getCountryType()).getKingShipModelList();
			for (int i = 0; i < KSModelList.size(); i++) {
				KingShipModel kingShipModel = KSModelList.get(i);
				arrayList.add(new Object[] { kingShipModel.getId(), kingShipModel.getOfficial(),
						kingShipModel.getName(), kingShipModel.getIcon(), kingShipModel.getFrame(),
						kingShipModel.getTotalStrength(), kingShipModel.getOnlyWinTimes(), 0, 0 });
			}
			int recoverTime = calcrecoverTime(hero); // 刷新挑战次数
			int chaTimes = kingShipData.getChaTimes();
			String[] split = KingShipConst.END_TIME.split(":");
			Integer hour = Integer.valueOf(split[0]);
			Integer min = Integer.valueOf(split[1]);
			int gameEndTime = TimeDateUtil.getOneTime(0, hour, min, 0) - currentTime;
			int myOnlyWinTimes = kingShipData.getOnlyWinTimes();
			int canBuyTimes = KingShipCache.getKsConfig().get(KingShipConst.KINGSHIP_CANBUGTIMES).getNum();
			int buyChaTimes = kingShipData.getBuyChaTimes();
			int restbuyChaTimes = canBuyTimes - buyChaTimes;
			List<Struct_wwzd_227> sortList = Config_wwzd_227.getIns().getSortList();
			Map<Integer, Integer> bxAwardMap = kingShipData.getBXAwardMap();
			List<Object> arrayList2 = new ArrayList<>();
			for (Struct_wwzd_227 struct_wwzd_227 : sortList) {
				Integer status = bxAwardMap.get(struct_wwzd_227.getId());
				if (status == null) {
					status = KingShipConst.NOT_REACH;
				}
				arrayList2.add(new Object[] { status });
			}
			int totalTimes = kingShipData.getWinTimes() + kingShipData.getFailTimes();// 按总场数算
			KingShipSender.sendCmd_1762(hero.getId(), arrayList.toArray(), chaTimes, restbuyChaTimes, recoverTime,
					kingShipData.getWinTimes(), gameEndTime, null, KingShipConst.OPEN_UI, arrayList2.toArray(), 0,
					totalTimes);
		} else {
			ArrayList<Object> kingShipList = new ArrayList<Object>();
			int i = 0;
			List<KingShipModel> arrayList = KingShipCache.getCountry(hero.getCountryType()).getKingShipModelList();
			Map<Integer, Long> mobai = kingShipData.getMobai();
			for (KingShipModel kingShipModel : arrayList) {
				int k = KingShipConst.NOT_MOBAI;
				if (mobai.get(i) != null && mobai.get(i) != 0) {
					k = KingShipConst.MOBAI;
				}
				int bodyId = FashionClothesManager.getIns().getBodyid(kingShipModel.getJob(),
						kingShipModel.getBodyId());
				kingShipList.add(new Object[] { kingShipModel.getId(), kingShipModel.getOfficial(),
						kingShipModel.getName(), kingShipModel.getIcon(), kingShipModel.getFrame(),
						kingShipModel.getTotalStrength(), 0, bodyId, kingShipModel.getTitleId() });
				i++;
			}
			ArrayList<Object> guardList = new ArrayList<Object>();
			List<KingShipModel> list = KingShipCache.getCountry(hero.getCountryType()).getKingShiplGuardList();
			for (KingShipModel kingShipGuard : list) {
				int bodyId = FashionClothesManager.getIns().getBodyid(kingShipGuard.getJob(),
						kingShipGuard.getBodyId());
				guardList.add(new Object[] { kingShipGuard.getName(), bodyId, kingShipGuard.getTitleId(),
						kingShipGuard.getOfficial() });
			}
			String[] split = KingShipConst.OPEN_TIME.split(":");
			Integer hour = Integer.valueOf(split[0]);
			Integer min = Integer.valueOf(split[1]);
//			int betweenOpen = TimeDateUtil.betweenOpen();
			int time = 0;
//			if (betweenOpen % KingShipConst.KINGSHIP_ROUND == 0) {
//				time = 1;
//			} else {
//				if (betweenOpen % KingShipConst.KINGSHIP_ROUND == 1
//						&& currentTime < TimeDateUtil.getOneTime(0, hour, min, 0)) {
//				} else {
//					time = KingShipConst.KINGSHIP_ROUND - betweenOpen % KingShipConst.KINGSHIP_ROUND + 1;
//				}
//			}
			if (KingShipFunction.getIns().isStartWeek() && currentTime < TimeDateUtil.getOneTime(0, hour, min, 0)) {
				time = 0;
			} else {
				time = calcDistantDay();
			}
			int gameEndTime = TimeDateUtil.getOneTime(time, hour, min, 0) - currentTime;
			KingShipSender.sendCmd_1762(hero.getId(), kingShipList.toArray(), 0, 0, 0, 0, gameEndTime,
					guardList.toArray(), KingShipConst.END_UI, null,
					mobai.size() == 0 ? KingShipConst.NOT_MOBAI : KingShipConst.MOBAI, 0);
		}
	}

	/**
	 * 计算距离下一次活动开启间隔天数
	 * 
	 * @return
	 */
	public int calcDistantDay() {
		int START_BEFORE = 7;
		int[] START_WEEK_BEFORE7 = { 2, 5 };// 王位之争开启星期配置(前七天)(顺序配)
		int betweenOpen = TimeDateUtil.betweenOpen();
		int week = TimeDateUtil.getWeek();
		if (betweenOpen < START_BEFORE) {// 开服前7天
			int[] startWeekArray = START_WEEK_BEFORE7;
			int index;
			for (index = 0; index < startWeekArray.length; index++) {
				if (betweenOpen < startWeekArray[index]) {
					break;
				}
			}
			if (index == startWeekArray.length) {
				int lastWeek = START_BEFORE - betweenOpen + week;
				int i;
				for (i = 0; i < KingShipConst.START_WEEK_ARRAY.length; i++) {
					if (lastWeek < KingShipConst.START_WEEK_ARRAY[i]) {
						break;
					}
				}
				if (i == KingShipConst.START_WEEK_ARRAY.length) {
					return START_BEFORE - betweenOpen + 7 - lastWeek + KingShipConst.START_WEEK_ARRAY[0];
				} else {
					int j = KingShipConst.START_WEEK_ARRAY[i];
					return START_BEFORE - betweenOpen + j - lastWeek;
				}

			} else {
				return startWeekArray[index] - betweenOpen;
			}
		} else {// 开服后7天
			int[] startWeekArray = KingShipConst.START_WEEK_ARRAY;
			int index;
			for (index = 0; index < startWeekArray.length; index++) {
				if (week < startWeekArray[index]) {
					break;
				}
			}
			if (index == startWeekArray.length) {
				return startWeekArray[0] + 7 - week;
			} else {
				return startWeekArray[index] - week;
			}
		}
	}

	/**
	 * 根据最后一次刷新时间设置恢复次数 返回最新的刷新时间
	 * 
	 * @param hero
	 * @param refreshTime
	 * @return
	 */
	public int calcrecoverTime(Hero hero) {
		if(hero.getCountryData()==null) {
			return 0;
		}
		KingShipData kingShipData = hero.getCountryData().getKingShipData();
		if(kingShipData==null) {
			return 0;
		}
		int chaTimes = kingShipData.getChaTimes();
		if (chaTimes >= KingShipConst.KINGSHIP_CHATIMES) {
			return 0;
		}

		int currentTime = TimeDateUtil.getCurrentTime();
		int refreshTime = kingShipData.getRefreshTime();
		int time = currentTime - refreshTime;
		int times = time / 3600;
		if (time < 3600) {
			return 3600 - time;
		} else if (time > 3600) {
			if ((times + chaTimes) > KingShipConst.KINGSHIP_CHATIMES) {
				kingShipData.setChaTimes(KingShipConst.KINGSHIP_CHATIMES);
				kingShipData.setRefreshTime(currentTime);
				KingShipFunction.getIns().startRedPoint(hero, false);// 红点
				return 0;
			}
			kingShipData.setChaTimes(chaTimes + times);
			kingShipData.setRefreshTime(currentTime - (time - 3600 * times));
			KingShipFunction.getIns().startRedPoint(hero, false);// 红点
			return time - 3600 * times;
		}
		return 0;
	}

	/**
	 * 本国挑战
	 * 
	 * @param hero
	 */
	public void ownCountryChallenge(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
			return;
		}
		if (!KingShipCache.isWWStartTime) {
			return;
		}
		if (hero.getCountryType() == 0) {
			return;
		}
		calcrecoverTime(hero); // 刷新挑战次数
		KingShipData kingShipData = hero.getCountryData().getKingShipData();
		int chaTimes = kingShipData.getChaTimes();
		int state = 0;
		if (chaTimes <= 0) { // 没有挑战次数
			state = KingShipConst.KINGSHIP_NOT_CHALLENGE;
			KingShipSender.sendCmd_1764(hero.getId(), 0, null, 0, 0, state, 0);
			return;
		}

		int winTimes = kingShipData.getWinTimes();
		int failTimes = kingShipData.getFailTimes();
		int totalTimes = winTimes + failTimes;
		int myOnlyWinTimes = kingShipData.getOnlyWinTimes();
		long matchChaId = 0;
		Hero matchChaHero = null;
		int result = 0;
		List<KingShipModel> arrayList = KingShipFunction.getIns().handleJoinKingShipMap(hero);
		state = KingShipConst.KINGSHIP_SUCCESS;
		if (arrayList.size() == 0) { // 没有匹配到对手
			state = KingShipConst.KINGSHIP_NOT_OPPONENT;
		} else {
			List<Long> list = new ArrayList<Long>();
			if (isMatchScopePlayer(hero, arrayList, list)) {
				int size = list.size();
				int randomNumInAreas = RandomUtil.getRandomNumInAreas(0, size - 1);
				matchChaId = list.get(randomNumInAreas);
				matchChaHero = HeroCache.getHero(matchChaId, HeroConst.FIND_TYPE_BATTLE);
				result = BattleFunction.checkWinPlayer(hero, matchChaHero, BattleConst.OTHER);
			} else {// 第3场匹配优先匹配总场数＞自己的对手，每3场一轮
				if (totalTimes != 0 && totalTimes % 3 == 0) {
					ArrayList<Long> upMyArrayList = new ArrayList<Long>();
					for (KingShipModel kingShipModel : arrayList) {
						if (kingShipModel.getOnlyWinTimes() > winTimes) {
							upMyArrayList.add(kingShipModel.getId());
						}
					}
					int size = upMyArrayList.size();
					if (size != 0) {
						int randomNumInAreas = RandomUtil.getRandomNumInAreas(0, size - 1);
						matchChaId = upMyArrayList.get(randomNumInAreas);
						matchChaHero = HeroCache.getHero(matchChaId, HeroConst.FIND_TYPE_BATTLE);
						result = BattleFunction.checkWinPlayer(hero, matchChaHero, BattleConst.OTHER);
					}
				}
			}
		}
		Object[] npcItemArray = null;
		if (matchChaId == 0 && matchChaHero == null) {
			if (state != KingShipConst.KINGSHIP_NOT_OPPONENT) {
				List<Object> randomList = getRandomHero(arrayList);
				matchChaId = (Long) randomList.get(0);
				matchChaHero = (Hero) randomList.get(1);
				result = BattleFunction.checkWinPlayer(hero, matchChaHero, BattleConst.OTHER);
			} else {
				npcItemArray = createNPCItemArray(hero);
				int npcId = (int) npcItemArray[1];
				matchChaId = (long) npcId;
				result = BattleFunction.checkWinBoss(hero, npcId, BattleConst.OTHER);
			}
		}
		Object[] objects = KingShipCache.getChaResultMap().get(hero.getId());
		int currentTime = TimeDateUtil.getCurrentTime();
		if (objects != null) {
			int heroTime = (int) objects[1];
			if ((currentTime - heroTime) < KingShipConst.FIGHT_TIME) {
				return;
			} else {
				KingShipCache.getChaResultMap().remove(hero.getId());
			}
		}
		objects = new Object[] { 0, currentTime, matchChaId };
		KingShipCache.getChaResultMap().put(hero.getId(), objects);
		objects[0] = result;
		objects[1] = currentTime;
		objects[2] = matchChaId;
		if (state == KingShipConst.KINGSHIP_SUCCESS) {
			HeroFunction.getIns().sendBattleHeroAttr(hero, matchChaId);
		}
		if (chaTimes == KingShipConst.KINGSHIP_CHATIMES) {
			kingShipData.setRefreshTime(TimeDateUtil.getCurrentTime());
		}
		kingShipData.setChaTimes(chaTimes - 1); // 减少挑战次数 
		KingShipSender.sendCmd_1764(hero.getId(), matchChaHero == null ? matchChaId : matchChaHero.getId(),
				matchChaHero == null ? (String) npcItemArray[0] : matchChaHero.getName(),
				matchChaHero == null ? 0 : matchChaHero.getSettingData().getIcon(),
				matchChaHero == null ? 0 : matchChaHero.getSettingData().getFrame(), state, result);
		LogTool.info("ownCountryChallenge id:" + hero.getId() + " chaTimes:" + kingShipData.getChaTimes(), this);
	}

	/**
	 * 优先匹配玩家当前胜场±3范围内的玩家
	 * 
	 * @return
	 */
	public boolean isMatchScopePlayer(Hero hero, List<KingShipModel> joinList, List<Long> list) {
		boolean flag = false;
		int winTimes = hero.getCountryData().getKingShipData().getWinTimes();
		int low = winTimes - KingShipConst.WIN_SCORE;
		int high = winTimes + KingShipConst.WIN_SCORE;
		if (low < 0) {
			low = 0;
		}
		for (int i = 0; i < joinList.size(); i++) {
			KingShipModel kingShipModel = joinList.get(i);
			if (kingShipModel.getOnlyWinTimes() <= high && kingShipModel.getOnlyWinTimes() >= low) {
				list.add(kingShipModel.getId());
			}
		}
		if (list.size() > 0) {
			flag = true;
		}
		return flag;
	}

	/**
	 * 创建NPC
	 * 
	 * @param hero
	 * @return
	 */
	public Object[] createNPCItemArray(Hero hero) {
		Object[] npcItemArray = new Object[2];
		npcItemArray[0] = IlliegalUtil.rankName();
		if (hero.getCountryType() == CountryType.WEI_COUNTRY.getCountryType()) {
			Struct_NPC_200 struct_NPC_200 = Config_NPC_200.getIns().get(KingShipConst.NPC_WEI);
			npcItemArray[1] = struct_NPC_200.getID();
			return npcItemArray;
		}
		if (hero.getCountryType() == CountryType.SHU_COUNTRY.getCountryType()) {
			Struct_NPC_200 struct_NPC_200 = Config_NPC_200.getIns().get(KingShipConst.NPC_WEI + 1);
			npcItemArray[1] = struct_NPC_200.getID();
			return npcItemArray;
		}
		if (hero.getCountryType() == CountryType.WU_COUNTRY.getCountryType()) {
			Struct_NPC_200 struct_NPC_200 = Config_NPC_200.getIns().get(KingShipConst.NPC_WEI + 2);
			npcItemArray[1] = struct_NPC_200.getID();
			return npcItemArray;
		}
		return npcItemArray;
	}

	/**
	 * 随机玩家
	 * 
	 * @param arrayList
	 * @return
	 */
	public List<Object> getRandomHero(List<KingShipModel> arrayList) {
		ArrayList<Object> returnList = new ArrayList<Object>();
		int size = arrayList.size();
		int randomNumInAreas = RandomUtil.getRandomNumInAreas(0, size - 1);
		Long matchChaId = arrayList.get(randomNumInAreas).getId();
		returnList.add(matchChaId);
		Hero matchChaHero = HeroCache.getHero(matchChaId, HeroConst.FIND_TYPE_BATTLE);
		returnList.add(matchChaHero);
		return returnList;
	}

	/**
	 * 膜拜
	 * 
	 * @param hero
	 * @param moBaiHid
	 */
	public void moBai(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
			return;
		}
		if (KingShipCache.isWWStartTime) {
			return;
		}
		if (hero.getCountryType() == 0) {
			return;
		}
		List<KingShipModel> kingShipModelList = KingShipCache.getCountry(hero.getCountryType()).getKingShipModelList();
		int size = kingShipModelList.size();
		if (size == 0) {
			KingShipSender.sendCmd_1766(hero.getId(), 0);
			return;
		}
		Map<Integer, Long> mobai = hero.getCountryData().getKingShipData().getMobai();
		for (int i = 0; i < size; i++) {
			long moBaiHid = kingShipModelList.get(i).getId();
			mobai.put(i, moBaiHid);
			int[][] mobaiAwards = KingShipCache.getKsConfig().get(KingShipConst.KINGSHIP_MOBAI_AWARD).getOther();
			UseAddUtil.add(hero, mobaiAwards, SourceGoodConst.KS_MOBAI_AWARDS, null, true);
			int[][] beMobaiAwards = Config_xtcs_004.getIns().get(KingShipConst.KINGSHIP_MOBAI_AWARD).getOther();
			Object[] contentData = new Object[] { MailConst.MAIL_ID_BEMOBAI_AWARD };
			MailFunction.getIns().sendMailWithFujianData2(moBaiHid, MailConst.MAIL_ID_BEMOBAI_AWARD, contentData,
					beMobaiAwards);
		}

		KingShipSender.sendCmd_1766(hero.getId(), 1);
	}

	/**
	 * 检查膜拜的玩家id是否合法
	 * 
	 * @param countryId
	 * @param moBaiHid
	 * @return
	 */
	public int checkMoBai(int countryId, long moBaiHid) {
		List<KingShipModel> linkedList = KingShipCache.getCountry(countryId).getKingShipModelList();
		if (linkedList == null) {
			return -1;
		}
		Iterator<KingShipModel> iterator = linkedList.iterator();
		int i = 0;
		while (iterator.hasNext()) {
			KingShipModel next = iterator.next();
			if (next.getId() == moBaiHid) {
				return i;
			}
			i++;
		}
		return -1;
	}

	/**
	 * 打开皇城侍卫界面
	 * 
	 * @param hero
	 */
	public void openKingShipGuardUI(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
			return;
		}
		if (KingShipCache.isWWStartTime) {
			return;
		}
		if (hero.getCountryType() == 0) {
			return;
		}
		if (!checkCanAssign(hero.getCountryType(), hero.getId())) {
			return;
		}
		ConcurrentHashMap<Integer, Country> countryMap = CountrySysCache.getCountryCache().getCountryMap();
		List<KingShipModel> kingShiplGuardList = countryMap.get(hero.getCountryType()).getKingShiplGuardList();
		List<CountryStrengthRankModel> guardUIList = KingShipFunction.getIns().handleGuardList(hero);
		List<Object> guardList = new ArrayList<Object>();
		for (CountryStrengthRankModel countryStrengthRankModel : guardUIList) {
			int isCanAssign = isCanAssign(kingShiplGuardList, countryStrengthRankModel.getId());
			int bodyId = FashionClothesManager.getIns().getBodyid(countryStrengthRankModel.getJob(),
					countryStrengthRankModel.getBodyId());
			guardList.add(new Object[] { countryStrengthRankModel.getId(), countryStrengthRankModel.getOfficial(),
					countryStrengthRankModel.getName(), countryStrengthRankModel.getIcon(),
					countryStrengthRankModel.getFrame(), countryStrengthRankModel.getTotalStrength(),
					KingShipConst.KINGSHIP_GUAJIEXP, isCanAssign, bodyId });
		}
		int restNum = KingShipConst.KINGSHIP_MAX_ASSIGNNUM - kingShiplGuardList.size();
		KingShipSender.sendCmd_1768(hero.getId(), guardList.toArray(), restNum);
	}

	/**
	 * 检查该玩家是否为君主
	 * 
	 * @param countryId
	 * @param hid
	 * @return
	 */
	public boolean checkCanAssign(int countryId, long hid) {
		List<KingShipModel> linkedList = KingShipCache.getCountry(countryId).getKingShipModelList();
		if (linkedList == null) {
			return false;
		}
		int size = linkedList.size();
		if (size > 0) {
			KingShipModel kingShipModel = linkedList.get(0);
			if (kingShipModel.getId() == hid) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	}

	/**
	 * 任命皇城侍卫
	 * 
	 * @param hero
	 * @param hid
	 */
	public void assignGuard(Hero hero, Long hid) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
			return;
		}
		if (KingShipCache.isWWStartTime) {
			return;
		}
		if (hero.getCountryType() == 0) {
			return;
		}
		if (!checkCanAssign(hero.getCountryType(), hero.getId())) {
			return;
		}

		List<CountryStrengthRankModel> list = CountrySysCache.getCountryStrengthMap().get(hero.getCountryType());
		if (list == null || list.size() == 0) { // 没有人来任命
			KingShipSender.sendCmd_1770(hero.getId(), KingShipConst.KINGSHIP_FAILURE, 0);
			return;
		}
		List<KingShipModel> kingShipModelList = KingShipCache.getCountry(hero.getCountryType()).getKingShipModelList();
		for (int i = 0; i < kingShipModelList.size(); i++) {
			if (kingShipModelList.get(i).getId() == hid) {
				KingShipSender.sendCmd_1770(hero.getId(), KingShipConst.KINGSHIP_FAILURE, 0);
				return;
			}
		}
		for (CountryStrengthRankModel countryStrengthRankModel : list) {
			if (countryStrengthRankModel.getId() == hid) {
				List<KingShipModel> listAssignList = KingShipCache.getCountry(hero.getCountryType())
						.getKingShiplGuardList();
				int size = listAssignList.size();
				if (size >= KingShipConst.KINGSHIP_MAX_ASSIGNNUM) {// 任命成员过量
					KingShipSender.sendCmd_1770(hero.getId(), KingShipConst.KINGSHIP_OVER_NUM, 0);
					return;
				}
				int isCanAssign = isCanAssign(listAssignList, hid); // 判断hid能否任命侍卫，防止重复
				if (isCanAssign == 1) {// 重复任命侍卫
					KingShipSender.sendCmd_1770(hero.getId(), KingShipConst.KINGSHIP_NOT_REP, 0);
					return;
				}
				Hero newAssignHero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BASIC);
				KingShipModel kingShipGuard = new KingShipModel();
				kingShipGuard.setId(newAssignHero.getId());
				kingShipGuard.setName(newAssignHero.getName());
				kingShipGuard.setIcon(newAssignHero.getSettingData().getIcon());
				kingShipGuard.setFrame(newAssignHero.getSettingData().getFrame());
				kingShipGuard.setJob(newAssignHero.getJob());
				kingShipGuard.setBodyId(newAssignHero.getShowModel().getBodyModel());
				kingShipGuard.setTitleId(newAssignHero.getTitleId());
				kingShipGuard.setOfficial(newAssignHero.getOfficial());
				listAssignList.add(kingShipGuard);
				TitleFunction.getIns().addTitle(hid, KingShipConst.KINGSHIP_TITLE); // 增加称号
				KingShipSender.sendCmd_1770(hero.getId(), KingShipConst.KINGSHIP_SUCCESS, hid);
				return;
			}
		} // 成员不存在
		KingShipSender.sendCmd_1770(hero.getId(), KingShipConst.KINGSHIP_FAILURE, 0);
	}

	/**
	 * 判断hid能否任命侍卫，防止重复
	 * 
	 * @param list
	 * @param hid
	 * @return 0：未任命，1：已任命
	 */
	public int isCanAssign(List<KingShipModel> list, long hid) {
		for (KingShipModel guard : list) {
			if (guard.getId() == hid) {
				return 1;
			}
		}
		return 0;
	}

	/**
	 * 购买挑战次数
	 * 
	 * @param hero
	 */
	public void buyCha(Hero hero, int buyTimes) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
			return;
		}
		if (!KingShipCache.isWWStartTime) {
			return;
		}
		if (hero.getCountryType() == 0) {
			return;
		}
		int canBuyTimes = KingShipCache.getKsConfig().get(KingShipConst.KINGSHIP_CANBUGTIMES).getNum();
		int[][] other = KingShipCache.getKsConfig().get(KingShipConst.KINGSHIP_BUGTIMES_CONSUME).getOther();
		calcrecoverTime(hero); // 刷新挑战次数
		KingShipData kingShipData = hero.getCountryData().getKingShipData();
		int chaTimes = kingShipData.getChaTimes();
		int buyChaTimes = kingShipData.getBuyChaTimes();
		if (chaTimes + buyTimes > 10) {
			return;
		}
		if (buyChaTimes + buyTimes > canBuyTimes) {
			return;
		}
		int restBuyTimes = canBuyTimes - buyChaTimes - buyTimes;
		int refreshTime = calcrecoverTime(hero);
		if (!UseAddUtil.canUse(hero, other, buyTimes)) { // 没有足够的元宝
			KingShipSender.sendCmd_1772(hero.getId(), KingShipConst.KINGSHIP_NOTENOUGH_YUANBAO, chaTimes,
					canBuyTimes - buyChaTimes, refreshTime);
			return;
		}
		UseAddUtil.use(hero, other, buyTimes, SourceGoodConst.KS_BUY_CHA, true);
		kingShipData.setChaTimes(chaTimes + buyTimes);
		kingShipData.setBuyChaTimes(buyChaTimes + buyTimes);
		KingShipSender.sendCmd_1772(hero.getId(), KingShipConst.KINGSHIP_SUCCESS, chaTimes + buyTimes, restBuyTimes,
				refreshTime);
	}

	/**
	 * 战斗结果
	 * 
	 * @param hero
	 * @param result
	 */
	public void fightEnd(Hero hero, int result) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
			return;
		}
		if (!KingShipCache.isWWStartTime) {
			return;
		}
		if (hero.getCountryType() == 0) {
			return;
		}
		Object[] objects = KingShipCache.getChaResultMap().get(hero.getId());
		if (objects == null) {// 非法错误
			return;
		}
		int cacheResult = (int) objects[0];
		if (cacheResult == 2) {
			cacheResult = result;
		}
		if (result == 2) {
			cacheResult = 0;
		}
		ArrayList<Object[]> arrayList = new ArrayList<Object[]>();
		KingShipData kingShipData = hero.getCountryData().getKingShipData();
		int winTimes = kingShipData.getWinTimes();
		int failTimes = kingShipData.getFailTimes();
		int onlyWinTimes = kingShipData.getOnlyWinTimes();
		if (cacheResult == 1) { // 战斗胜利奖励
			int[][] successAwards = KingShipCache.getKsConfig().get(KingShipConst.KINGSHIP_SUCCESS_AWARD).getOther();
			UseAddUtil.add(hero, successAwards, SourceGoodConst.KS_CHA_SUCCESS, null, true);
			for (int[] award : successAwards) {
				arrayList.add(new Object[] { award[0], award[1], award[2] });
			}
			kingShipData.setWinTimes(winTimes + 1);
			onlyWinTimes = onlyWinTimes + 1;
			kingShipData.setOnlyWinTimes(onlyWinTimes);
		} else if (cacheResult == 0) { // 战斗失败奖励
			int[][] failAwards = KingShipCache.getKsConfig().get(KingShipConst.KINGSHIP_FAILUER_AWARD).getOther();
			UseAddUtil.add(hero, failAwards, SourceGoodConst.KS_CHA_FAIL, null, true);
			for (int[] award : failAwards) {
				arrayList.add(new Object[] { award[0], award[1], award[2] });
			}
			kingShipData.setFailTimes(failTimes + 1);
			onlyWinTimes = onlyWinTimes - 1;
			if (onlyWinTimes < 0) {
				onlyWinTimes = 0;
			}
			kingShipData.setOnlyWinTimes(onlyWinTimes);
		} 
		updateBXAwardMap(hero); 
		KingShipFunction.getIns().refreshKingShipModelMap(hero, 1);// 刷新缓存
		CountryFunction.getIns().refreshjoinKingShipMapByOWT(hero.getCountryType(), hero.getId(),
				kingShipData.getWinTimes());
		KingShipCache.getChaResultMap().remove(hero.getId());// 删除战斗结果临时缓存记录
		KingShipSender.sendCmd_1774(hero.getId(), cacheResult, arrayList.toArray());
	}

	/**
	 * 更新宝箱奖励Map状态
	 * 
	 * @param hero
	 */
	public void updateBXAwardMap(Hero hero) {
		KingShipData kingShipData = hero.getCountryData().getKingShipData();
		int totalTimes = kingShipData.getWinTimes() + kingShipData.getFailTimes();// 按总场数算
		List<Struct_wwzd_227> sortList = Config_wwzd_227.getIns().getSortList();
		int i;
		for (i = 0; i < sortList.size(); i++) {
			int num = sortList.get(i).getNum();
			if (totalTimes < num) {
				break;
			}
		}
		if (i - 1 < 0) {
		} else {
			Integer id = sortList.get(i - 1).getId();
			Map<Integer, Integer> bxAwardMap = kingShipData.getBXAwardMap();
			Integer status = bxAwardMap.get(id);
			if (status == null) {
				bxAwardMap.put(id, KingShipConst.CAN_GET);
			}
		}
	}

	public void getBXAward(Hero hero, int id) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, KingShipConst.COUNTRY_KINGSHIP)) {
			return;
		}
		Struct_wwzd_227 struct_wwzd_227 = Config_wwzd_227.getIns().get(id);
		if (struct_wwzd_227 == null) {
			KingShipSender.sendCmd_1776(hero.getId(), KingShipConst.FAILURE_NOT_AWARD, id);
			return;
		}
		Map<Integer, Integer> bxAwardMap = hero.getCountryData().getKingShipData().getBXAwardMap();
		Integer status = bxAwardMap.get(id);
		if (status == null) {
			KingShipSender.sendCmd_1776(hero.getId(), KingShipConst.FAILURE_NOT_REACH, id);
			return;
		}
		if (status == KingShipConst.GETTED) {
			KingShipSender.sendCmd_1776(hero.getId(), KingShipConst.FAILURE_NOT_REP_GET, id);
			return;
		}
		int[][] reward = struct_wwzd_227.getReward();
		UseAddUtil.add(hero, reward, SourceGoodConst.KINGSHIP_BXAWARD, null, true); // 发放奖励
		bxAwardMap.put(id, KingShipConst.GETTED);
		KingShipSender.sendCmd_1776(hero.getId(), KingShipConst.SUCCESS, id);

	}
}
