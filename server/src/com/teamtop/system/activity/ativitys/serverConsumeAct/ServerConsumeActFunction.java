package com.teamtop.system.activity.ativitys.serverConsumeAct;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;

import com.alibaba.fastjson.JSON;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.serverConsumeAct.model.ServerConsumeAct;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_qfxf_768;

public class ServerConsumeActFunction {
	private static volatile ServerConsumeActFunction ins = null;

	public static ServerConsumeActFunction getIns() {
		if (ins == null) {
			synchronized (ServerConsumeActFunction.class) {
				if (ins == null) {
					ins = new ServerConsumeActFunction();
				}
			}
		}
		return ins;
	}

	private ServerConsumeActFunction() {
	}

	/**
	 * 个人消费处理
	 * 
	 * @param hero
	 * @param money
	 * @param reason 操作原因，用于流水记录
	 */
	public void heroConsumeHandler(Hero hero, int money, int reason) {
		// TODO Auto-generated method stub
		long serverConsumeLong = 0;
		ServerConsumeAct model = null;
		try {
			// 玩家未开启活动,但只要是在活动期间消费就要计算.注意外网当天更新前的消费也要记录
			if (!ActivityFunction.getIns().checkActOpen(ActivitySysId.SERVERCONSUME_NEWACT)) {
				return;
			}
			model = (ServerConsumeAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.SERVERCONSUME_NEWACT);
			int consumeYb = model.getConsumeYb();
			model.setConsumeYb(consumeYb + money);
			AtomicLong serverConsume = ServerConsumeActSysCache.getServerConsume();
			serverConsumeLong = serverConsume.addAndGet(money);
			serverConsumeHandler(hero, model);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ServerConsumeActFunction heroConsumeHandler money:" + money + " product_id:" + reason + "modelStr:"
							+ model == null ? "" : JSON.toJSONString(model) + " serverConsume:" + serverConsumeLong);
		}
	}

	/**
	 * 全服消费处理
	 * 
	 * @param hero
	 * @param model
	 */
	public long serverConsumeHandler(Hero hero, ServerConsumeAct model) {
		long serverConsume = 0;
		try {
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			int myConsume = model.getConsumeYb();
			serverConsume = ServerConsumeActSysCache.getServerConsume().get();
			Map<Integer, List<Struct_qfxf_768>> configMap = ServerConsumeActSysCache.getConfigMap()
					.get(model.getPeriods());
			Set<Integer> redPointStateSet = ServerConsumeActSysCache.getRedPointStateSet();
			boolean flag = false;
			for (Entry<Integer, List<Struct_qfxf_768>> entry : configMap.entrySet()) {
				Integer qf = entry.getKey();
				if (serverConsume < qf) {
					continue;
				}
				boolean redPointHas = redPointStateSet.contains(qf);
				if (!redPointHas) {
					redPointStateSet.add(qf);
					redPointServerHandler();
				}
				List<Struct_qfxf_768> list = entry.getValue();
				for (Struct_qfxf_768 struct_qfxf_768 : list) {
					int id = struct_qfxf_768.getId();
					if (myConsume >= struct_qfxf_768.getGr() && awardStateMap.get(id) == null) {
						awardStateMap.put(id, ServerConsumeActConst.CAN_GET);
						flag = true;
					}
				}
			}

			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.SERVERCONSUME_NEWACT)) {
				return serverConsume;
			}
			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.SERVERCONSUME_NEWACT, 1,
						RedPointConst.HAS_RED);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ServerConsumeActFunction serverConsumeHandler modelStr:" + model == null ? ""
							: JSON.toJSONString(model) + " serverConsume:" + serverConsume);
		}
		return serverConsume;
	}

	/**
	 * 红点全服处理
	 */
	public void redPointServerHandler() {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					Map<Long, Hero> heroMap = HeroCache.getHeroMap();
					for (Hero hero : heroMap.values()) {
						redPointServerHandler_f1(hero);
					}
				}

				@Override
				public Object getSession() {
					return OpTaskConst.BATTLEGOODS_RANK;
				}
			});
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "ServerConsumeActFunction redPointHandler");
		}
	}

	public void redPointServerHandler_f1(Hero hero) {
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				ServerConsumeAct model = null;
				try {
					if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.SERVERCONSUME_NEWACT)) {
						return;
					}
					model = (ServerConsumeAct) ActivityFunction.getIns().getActivityData(hero,
							ActivitySysId.SERVERCONSUME_NEWACT);
					serverConsumeHandler(hero, model);
				} catch (Exception e) {
					// TODO: handle exception
					LogTool.error(e, this, hero.getId(), hero.getName(),
							"ServerConsumeActFunction redPointServerHandler_f1 modelStr:" + model == null ? ""
									: JSON.toJSONString(model));
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return hero.getId();
			}
		});
	}

	/**
	 * 玩家红点
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void heroRedPoint(Hero hero, boolean isLogin) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.SERVERCONSUME_NEWACT)) {
			return;
		}
		ServerConsumeAct model = (ServerConsumeAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.SERVERCONSUME_NEWACT);
		Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
		for (Entry<Integer, Byte> entry : awardStateMap.entrySet()) {
			Byte state = entry.getValue();
			if (state == ServerConsumeActConst.CAN_GET) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.SERVERCONSUME_NEWACT, 1,
							RedPointConst.HAS_RED);
					break;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.SERVERCONSUME_NEWACT, 1,
							RedPointConst.HAS_RED);
					break;
				}
			}
		}
	}

}
