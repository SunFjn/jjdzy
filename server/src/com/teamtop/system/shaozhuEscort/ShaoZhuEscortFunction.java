package com.teamtop.system.shaozhuEscort;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.TreeSet;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.shaozhuEscort.model.ShaoZhuEscort;
import com.teamtop.system.shaozhuEscort.model.ShaoZhuEscortInfo;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_szhs_401;
import excel.struct.Struct_szhs_401;

public class ShaoZhuEscortFunction {
	private static volatile ShaoZhuEscortFunction ins = null;

	public static ShaoZhuEscortFunction getIns() {
		if (ins == null) {
			synchronized (ShaoZhuEscortFunction.class) {
				if (ins == null) {
					ins = new ShaoZhuEscortFunction();
				}
			}
		}
		return ins;
	}

	private ShaoZhuEscortFunction() {
	}

	/**
	 * 是否领取完奖励
	 * 
	 * @param hero
	 */
	public boolean isGettedAward(Hero hero) {
		ShaoZhuEscort shaozhuEscort = hero.getShaozhuEscort();
		int currentTime = TimeDateUtil.getCurrentTime();
		int reachTime = shaozhuEscort.getReachTime();
		int state = shaozhuEscort.getState();
		if (state == ShaoZhuEscortConst.ESCORT_FINISH
				|| (state == ShaoZhuEscortConst.ESCORTING && currentTime >= reachTime)) {
			shaozhuEscort.setState(ShaoZhuEscortConst.ESCORT_FINISH);
			int escortWuJiang = shaozhuEscort.getEscortWuJiang();
			Struct_szhs_401 struct_szhs_401 = Config_szhs_401.getIns().get(escortWuJiang);
			int[][] reward = struct_szhs_401.getReward();
			int[][] lj = struct_szhs_401.getLj();
			int interceptedTimes = shaozhuEscort.getInterceptedTimes();
			// 计算奖励:奖励-拦截奖励*拦截次数
			Map<Integer, Map<Integer, Integer>> rewardMap = new HashMap<>();
			CommonUtil.arrayIntoMap(rewardMap, reward, 1);
			Map<Integer, Map<Integer, Integer>> ljMap = new HashMap<>();
			boolean isLvBuEscort = isLvBuEscort(escortWuJiang);
			if (!isLvBuEscort) {
				// 不是吕布护送，扣除拦截奖励
				CommonUtil.arrayIntoMap(ljMap, lj, interceptedTimes);
			}
			Object[][] sendAwardArray = createAwardArrayList(rewardMap, ljMap);
			ShaoZhuEscortSender.sendCmd_8008(hero.getId(), hero.getName(), hero.getTotalStrength(), hero.getIcon(),
					hero.getFrame(), hero.getCountryType(), escortWuJiang, sendAwardArray);
			ShaoZhuEscortFunction.getIns().redPoint(hero, false);
			return false;
		}
		return true;
	}

	public Object[][] createAwardArrayList(Map<Integer, Map<Integer, Integer>> awardMap,
			Map<Integer, Map<Integer, Integer>> ljMap) {
		int len = 0;
		for (Map<Integer, Integer> idMap : awardMap.values()) {
			len += idMap.size();
		}
		Object[][] sendAwardArray = new Object[len][];
		int i = 0;
		for (Entry<Integer, Map<Integer, Integer>> entryType : awardMap.entrySet()) {
			Integer type = entryType.getKey();
			Map<Integer, Integer> map = ljMap.get(type);
			Map<Integer, Integer> value = entryType.getValue();
			for (Entry<Integer, Integer> entryid : value.entrySet()) {
				Integer id = entryid.getKey();
				Integer num = entryid.getValue();
				// 被拦截次数
				Integer interceptedNum = Optional.ofNullable(map).map(mapper -> mapper.get(id)).orElse(0);
				sendAwardArray[i++] = new Object[] { type, id, num, interceptedNum };
			}
		}
		return sendAwardArray;
	}

	/**
	 * 开始护送处理
	 * 
	 * @param hero
	 * @param type 0:改名,头像,头像框,国家,战力，!0:开始护送，入缓存
	 */
	public void escortAddCacheHandle(Hero hero, int reachTime, boolean isLogin) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_ESCORT)) {
			return;
		}
		try {
			ShaoZhuEscortInfo addModel = new ShaoZhuEscortInfo();
			addModel.setHid(hero.getId());
			addModel.setName(hero.getNameZoneid());
			addModel.setIcon(hero.getIcon());
			addModel.setFrame(hero.getFrame());
			addModel.setCountryType(hero.getCountryType());
			addModel.setStrength(hero.getTotalStrength());
			if (reachTime != 0) {
				ShaoZhuEscort shaozhuEscort = hero.getShaozhuEscort();
				int escortWuJiang = shaozhuEscort.getEscortWuJiang();
				addModel.setWujiangId(escortWuJiang);
				Struct_szhs_401 struct_szhs_401 = Config_szhs_401.getIns().get(escortWuJiang);
				int pz = struct_szhs_401.getPz();
				addModel.setPz(pz);
				addModel.setReachTime(reachTime);
			}
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					updateEscortInfoTreeSet(addModel);
					createShaoZhuEscortInfoList();
					if (!isLogin) {
						ShaoZhuEscortManager.getIns().openUI(hero);
					}
				}

				@Override
				public Object getSession() {
					// TODO Auto-generated method stub
					return OpTaskConst.SHAOZHU_ESCORT;
				}

			});
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "reachTime:" + reachTime);
		}
	}

	/**
	 * 重新创建少主护送列表
	 */
	public void createShaoZhuEscortInfoList() {
		int refreshTime = ShaoZhuEscortSysCache.getRefreshTime();
		int currentTime = TimeDateUtil.getCurrentTime();
		if (refreshTime == 0 || currentTime >= refreshTime) {
			// 10秒更新一次
			ShaoZhuEscortSysCache.setRefreshTime(currentTime + 10);
			return;
		}
		int i = 0;
		TreeSet<ShaoZhuEscortInfo> shaozhuEscortInfoTreeSet = ShaoZhuEscortSysCache.getShaozhuEscortInfoTreeSet();
		List<ShaoZhuEscortInfo> shaozhuEscortInfoList = new ArrayList<>();
		for (ShaoZhuEscortInfo shaozhuEscortInfo : shaozhuEscortInfoTreeSet) {
			if (i >= ShaoZhuEscortConst.ESCORT_MAX_NUM) {
				break;
			}
			if (currentTime + ShaoZhuEscortConst.ESCORT_CLEAR_TIME >= shaozhuEscortInfo.getReachTime()) {
				// 护送小于3分钟不再出来
				continue;
			}
			shaozhuEscortInfoList.add(shaozhuEscortInfo);
			i++;
		}
		ShaoZhuEscortSysCache.setShaozhuEscortInfoList(shaozhuEscortInfoList);
	}

	/**
	 * 更新缓存数据
	 * 
	 * @param rankTreeSet
	 * @param addModel
	 */
	public void updateEscortInfoTreeSet(ShaoZhuEscortInfo addModel) {
		TreeSet<ShaoZhuEscortInfo> treeSet = ShaoZhuEscortSysCache.getShaozhuEscortInfoTreeSet();
		Iterator<ShaoZhuEscortInfo> iterator = treeSet.iterator();
		while (iterator.hasNext()) {
			ShaoZhuEscortInfo model = iterator.next();
			if (model.getHid() == addModel.getHid()) {
				if (addModel.getWujiangId() == 0) {
					// 改名,头像,头像框,国家,战力
					model.setName(addModel.getName());
					model.setIcon(addModel.getIcon());
					model.setFrame(addModel.getFrame());
					model.setCountryType(addModel.getCountryType());
					model.setStrength(addModel.getStrength());
					return;
				}
				iterator.remove();
				treeSet.add(addModel);
				return;
			}
		}
		if (addModel.getWujiangId() == 0) {
			return;
		}

		if (treeSet.size() >= ShaoZhuEscortConst.CACHE_MAX_NUM) {
			ShaoZhuEscortInfo lastModel = treeSet.last();
			if (addModel.getInterceptedTimes() >= ShaoZhuEscortConst.MAX_INTERCEPTED_TIMES) {
				return;
			}
			if (lastModel.getInterceptedTimes() < ShaoZhuEscortConst.MAX_INTERCEPTED_TIMES
					&& addModel.getPz() <= lastModel.getPz()) {
				return;
			}
			treeSet.remove(lastModel);
		}
		treeSet.add(addModel);
	}

	/**
	 * 删除过期数据
	 */
	public List<ShaoZhuEscortInfo> deleteExpireAndFindHero(long findHid) {
		TreeSet<ShaoZhuEscortInfo> treeSet = ShaoZhuEscortSysCache.getShaozhuEscortInfoTreeSet();
		Iterator<ShaoZhuEscortInfo> iterator = treeSet.iterator();
		int currentTime = TimeDateUtil.getCurrentTime();
		ShaoZhuEscortInfo findShaoZhuEscortInfo = null;
		List<ShaoZhuEscortInfo> list = new ArrayList<>();
		while (iterator.hasNext()) {
			ShaoZhuEscortInfo next = iterator.next();
			if (findHid != 0 && next.getHid() == findHid) {
				findShaoZhuEscortInfo = next;
			}
			if (currentTime >= next.getReachTime()) {
				iterator.remove();
				if (findHid == 0) {
					list.add(next);
				}
				if (findHid != 0 && next.getHid() == findHid) {
					findShaoZhuEscortInfo = null;
				}
			}
		}
		if (findHid != 0 && findShaoZhuEscortInfo != null) {
			list.add(findShaoZhuEscortInfo);
		}
		return list;
	}

	/**
	 * 是否吕布护送
	 * 
	 * @param hero
	 * @return
	 */
	public boolean isLvBuEscort(int escortWuJiang) {
		int size = Config_szhs_401.getIns().getSortList().size();
		if (escortWuJiang == size) {
			return true;
		}
		return false;
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_ESCORT)) {
			return;
		}
		int type = 0;
		ShaoZhuEscort shaozhuEscort = hero.getShaozhuEscort();
		int state = shaozhuEscort.getState();
		int escortTimes = shaozhuEscort.getEscortTimes();
		int reachTime = shaozhuEscort.getReachTime();
		int currentTime = TimeDateUtil.getCurrentTime();
		// 玩家有可领取的奖励时和玩家有护送次数,并不在护送中加红点
		if (state == ShaoZhuEscortConst.ESCORT_FINISH
				|| (escortTimes < ShaoZhuEscortConst.MAX_DAY_CAN_ESCORT_TIMES && state != ShaoZhuEscortConst.ESCORTING)
				|| (state == ShaoZhuEscortConst.ESCORTING && currentTime >= reachTime)) {
			type = 1;
		}
		int battleRecordRedPointState = shaozhuEscort.getBattleRecordRedPointState();
		// 战报红点
		if (battleRecordRedPointState == 1) {
			type = 2;
		}

		if (isLogin) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.ZHUCHENG_SYSID, type, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.HUODONG, type, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SHAOZHU_ESCORT, type, RedPointConst.HAS_RED);
		} else {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.ZHUCHENG_SYSID, type,
					RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.HUODONG, type, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAOZHU_ESCORT, type,
					RedPointConst.HAS_RED);
		}
	}
}
