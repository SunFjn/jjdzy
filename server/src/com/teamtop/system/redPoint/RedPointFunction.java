package com.teamtop.system.redPoint;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RedPointOpTaskRunable;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.system.redPoint.model.RedPointData;
import com.teamtop.util.log.LogTool;

public class RedPointFunction {

	private static RedPointFunction redPointFunction;

	private RedPointFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RedPointFunction getIns() {
		if (redPointFunction == null) {
			redPointFunction = new RedPointFunction();
		}
		return redPointFunction;
	}

	/**
	 * 登录添加红点
	 * @param hero
	 * @param sysId	系统id
	 * @param index	红点编号
	 * @param state 状态  RedPointConst.NO_RED, RedPointConst.HAS_RED
	 */
	public void addLoginRedPoint(Hero hero, int sysId, int index, int state) {
		try {
			if (state != RedPointConst.HAS_RED) {
				return;
			}
			RedPointData redPointData = hero.getRedPointData();
			if (redPointData == null) {
				redPointData = new RedPointData();
				hero.setRedPointData(redPointData);
			}
			Map<Integer, Map<Integer, Integer>> loginRedPointMap = redPointData.getLoginRedPointMap();
			Map<Integer, Integer> map = loginRedPointMap.get(sysId);
			if (map == null) {
				map = new HashMap<>();
				loginRedPointMap.put(sysId, map);
			}
			map.put(index, state);
		} catch (Exception e) {
			LogTool.error(e, RedPointFunction.class, hero.getId(), hero.getName(), "addLoginRedPoint");
		}
	}

	/**
	 * 登录发送红点信息
	 * @param hero
	 */
	public void sendLoginRedPoint(Hero hero) {
		try {
			RedPointData redPointData = hero.getRedPointData();
			if(redPointData==null) {
				redPointData = new RedPointData();
				hero.setRedPointData(redPointData);
			}
			Map<Integer, Map<Integer, Integer>> loginRedPointMap = redPointData.getLoginRedPointMap();
			if (loginRedPointMap.size() == 0) {
				redPointData.setSendLogin(true);
				return;
			}
			List<Object[]> rpData = new ArrayList<>();
			Iterator<Entry<Integer, Map<Integer, Integer>>> iterator = loginRedPointMap.entrySet().iterator();
			Entry<Integer, Map<Integer, Integer>> entry = null;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				List<Object[]> funcData = new ArrayList<>();
				Iterator<Entry<Integer, Integer>> funcRedItr = entry.getValue().entrySet().iterator();
				for (; funcRedItr.hasNext();) {
					Entry<Integer, Integer> funcEntry = funcRedItr.next();
					funcData.add(new Object[] { funcEntry.getKey(), funcEntry.getValue() });
				}
				rpData.add(new Object[] { entry.getKey(), funcData.toArray() });
			}
			loginRedPointMap.clear();
			redPointData.setSendLogin(true);
			HeroSender.sendCmd_160(hero.getId(), rpData.toArray());
		} catch (Exception e) {
			LogTool.error(e, RedPointFunction.class, hero.getId(), hero.getName(), "sendLoginRedPoint");
		}
	}

	/**
	 * 更新红点（定时检测刷新）
	 * @param hero
	 * @param sysId
	 * @param index
	 * @param state
	 */
	public void updateRedPoint(Hero hero, int sysId, int index, int state) {
		try {
			if (state != RedPointConst.HAS_RED && state != RedPointConst.NO_RED) {
				return;
			}
			RedPointData redPointData = hero.getRedPointData();
			if(redPointData==null) {
				redPointData = new RedPointData();
				hero.setRedPointData(redPointData);
			}
			Map<Integer, Map<Integer, Integer>> updateRedPointMap = redPointData.getUpdateRedPointMap();
			Map<Integer, Integer> map = updateRedPointMap.get(sysId);
			if (map == null) {
				map = new HashMap<>();
				updateRedPointMap.put(sysId, map);
			}
			map.put(index, state);
		} catch (Exception e) {
			LogTool.error(e, RedPointFunction.class, hero.getId(), hero.getName(), "updateRedPoint");
		}
	}

	/**
	 * 更新发送红点状态
	 * @param hero
	 */
	public void sendUpdateRedPoint(Hero hero) {
		try {
			RedPointData redPointData = hero.getRedPointData();
			if (redPointData == null) {
				return;
			}
			if (!redPointData.isSendLogin()) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> updateRedPointMap = redPointData.getUpdateRedPointMap();
			if (updateRedPointMap.size() == 0) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> sendMap = new HashMap<>();
			sendMap.putAll(updateRedPointMap);
			updateRedPointMap = new HashMap<>();
			redPointData.setUpdateRedPointMap(updateRedPointMap);

			List<Object[]> rpData = new ArrayList<>();
			Iterator<Entry<Integer, Map<Integer, Integer>>> iterator = sendMap.entrySet().iterator();
			Entry<Integer, Map<Integer, Integer>> entry = null;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				List<Object[]> funcData = new ArrayList<>();
				Iterator<Entry<Integer, Integer>> funcRedItr = entry.getValue().entrySet().iterator();
				for (; funcRedItr.hasNext();) {
					Entry<Integer, Integer> funcEntry = funcRedItr.next();
					funcData.add(new Object[] { funcEntry.getKey(), funcEntry.getValue() });
				}
				rpData.add(new Object[] { entry.getKey(), funcData.toArray() });
			}
			HeroSender.sendCmd_160(hero.getId(), rpData.toArray());
		} catch (Exception e) {
			LogTool.error(e, RedPointFunction.class, hero.getId(), hero.getName(), "sendUpdateRedPoint");
		}
	}
	
	/**
	 * 快速更新红点（定时检测刷新）
	 * @param hero
	 * @param sysId
	 * @param index
	 * @param state
	 */
	public void fastUpdateRedPoint(Hero hero, int sysId, int index, int state) {
		OpTaskExecutorService.PublicOrderService.execute(new RedPointOpTaskRunable() {

			@Override
			public void run() {
				try {
					fastUpdateRedPointHandle(hero, sysId, index, state);
				} catch (Exception e) {
					LogTool.error(e, RedPointFunction.class, hero.getId(), hero.getName(), "updateRedPoint");
				}
			}

			@Override
			public Object getSession() {
				return OpTaskConst.RED_POINT;
			}
		});
	}

	/**
	 * 快速更新红点（定时检测刷新）
	 * @param hero
	 * @param sysId
	 * @param index
	 * @param state
	 */
	public void fastUpdateRedPointHandle(Hero hero, int sysId, int index, int state) {
		try {
			if (state != RedPointConst.HAS_RED && state != RedPointConst.NO_RED) {
				return;
			}
			RedPointData redPointData = hero.getRedPointData();
			if(redPointData==null) {
				redPointData = new RedPointData();
				hero.setRedPointData(redPointData);
			}
			Map<Integer, Map<Integer, Integer>> fastRedPointMap = redPointData.getFastRedPointMap();
			Map<Integer, Integer> map = fastRedPointMap.get(sysId);
			if (map == null) {
				map = new HashMap<>();
				fastRedPointMap.put(sysId, map);
			}
			map.put(index, state);
		} catch (Exception e) {
			LogTool.error(e, RedPointFunction.class, hero.getId(), hero.getName(), "updateRedPoint");
		}
	}

	/**
	 * 快速更新发送红点状态
	 * @param hero
	 */
	public void sendFastRedPoint(Hero hero) {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new RedPointOpTaskRunable() {

				@Override
				public Object getSession() {
					// TODO Auto-generated method stub
					return OpTaskConst.RED_POINT;
				}

				@Override
				public void run() {
					try {
						sendFastRedPointHandle(hero);
					} catch (Exception e) {
						LogTool.error(e, RedPointFunction.class, hero.getId(), hero.getName(), "sendFastRedPoint");
					}
				}

			});
		} catch (Exception e) {
			LogTool.error(e, RedPointFunction.class, hero.getId(), hero.getName(), "sendFastRedPoint");
		}
	}

	/**
	 * 快速更新发送红点状态
	 * @param hero
	 */
	public void sendFastRedPointHandle(Hero hero) {
		try {
			RedPointData redPointData = hero.getRedPointData();
			if (redPointData == null) {
				return;
			}
			if (!redPointData.isSendLogin()) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> fastRedPointMap = redPointData.getFastRedPointMap();
			if (fastRedPointMap.size() == 0) {
				return;
			}
			Map<Integer, Map<Integer, Integer>> sendMap = new HashMap<>();
			sendMap.putAll(fastRedPointMap);
			fastRedPointMap = new HashMap<>();
			redPointData.setFastRedPointMap(fastRedPointMap);

			List<Object[]> rpData = new ArrayList<>();
			Iterator<Entry<Integer, Map<Integer, Integer>>> iterator = sendMap.entrySet().iterator();
			Entry<Integer, Map<Integer, Integer>> entry = null;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				List<Object[]> funcData = new ArrayList<>();
				Iterator<Entry<Integer, Integer>> funcRedItr = entry.getValue().entrySet().iterator();
				for (; funcRedItr.hasNext();) {
					Entry<Integer, Integer> funcEntry = funcRedItr.next();
					funcData.add(new Object[] { funcEntry.getKey(), funcEntry.getValue() });
				}
				rpData.add(new Object[] { entry.getKey(), funcData.toArray() });
			}
			HeroSender.sendCmd_160(hero.getId(), rpData.toArray());
		} catch (Exception e) {
			LogTool.error(e, RedPointFunction.class, hero.getId(), hero.getName(), "sendFastRedPoint");
		}
	}

}
