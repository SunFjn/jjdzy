package com.teamtop.system.activity.ativitys.serverConsumeAct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.serverConsumeAct.model.ServerConsumeAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_qfxf_768;
import excel.struct.Struct_qfxf_768;

public class ServerConsumeActManager extends AbstractActivityManager {
	private static volatile ServerConsumeActManager ins = null;

	public static ServerConsumeActManager getIns() {
		if (ins == null) {
			synchronized (ServerConsumeActManager.class) {
				if (ins == null) {
					ins = new ServerConsumeActManager();
				}
			}
		}
		return ins;
	}

	private ServerConsumeActManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.SERVERCONSUME_NEWACT)) {
			return;
		}
		ServerConsumeAct model = (ServerConsumeAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.SERVERCONSUME_NEWACT);
		long serverConsume = ServerConsumeActFunction.getIns().serverConsumeHandler(hero, model);
		Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
		Map<Integer, List<Struct_qfxf_768>> configMap = ServerConsumeActSysCache.getConfigMap().get(model.getPeriods());
		ArrayList<Object[]> awardStateList = new ArrayList<>();
		for (Entry<Integer, List<Struct_qfxf_768>> entry : configMap.entrySet()) {
			List<Struct_qfxf_768> configList = entry.getValue();
			for (Struct_qfxf_768 struct_qfxf_768 : configList) {
				int id = struct_qfxf_768.getId();
				Byte state = Optional.ofNullable(awardStateMap).map(map -> map.get(id))
						.orElse(ServerConsumeActConst.NOT_REACH);
				awardStateList.add(new Object[] { id, state });
			}
		}
		int myConsume = model.getConsumeYb();
		ServerConsumeActSender.sendCmd_10420(hero.getId(), awardStateList.toArray(), serverConsume, myConsume);
	}

	public void getReward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		ServerConsumeAct model = null;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.SERVERCONSUME_NEWACT)) {
				return;
			}
			model = (ServerConsumeAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.SERVERCONSUME_NEWACT);
			Struct_qfxf_768 struct_qfxf_768 = Config_qfxf_768.getIns().get(awardId);
			if (struct_qfxf_768 == null || struct_qfxf_768.getQs() != model.getPeriods()) {
				ServerConsumeActSender.sendCmd_10422(hero.getId(), ServerConsumeActConst.FAILURE_NOT_AWARD, awardId);
				return;
			}
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			Byte state = awardStateMap.get(awardId);
			if (state == null) {
				ServerConsumeActSender.sendCmd_10422(hero.getId(), ServerConsumeActConst.FAILURE_NOT_REACH, awardId);
				return;
			}
			if (state == ServerConsumeActConst.GETTED) {
				ServerConsumeActSender.sendCmd_10422(hero.getId(), ServerConsumeActConst.FAILURE_NOT_REP, awardId);
				return;
			}
			awardStateMap.put(awardId, ServerConsumeActConst.GETTED);
			int[][] reward = struct_qfxf_768.getJl();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.SERVERCONSUME_NEWACT_TARGET_REWARD,
					UseAddUtil.getDefaultMail(), true);
			ServerConsumeActSender.sendCmd_10422(hero.getId(), ServerConsumeActConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ServerConsumeActManager getReward awardId:" + awardId + " modelStr:" + model == null ? ""
							: JSON.toJSONString(model));
		}
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		AtomicLong serverConsume = ServerConsumeActSysCache.getServerConsume();
		serverConsume.getAndSet(0);

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		// 玩家未开启活动,但只要是在活动期间消费就要计算.注意外网当天更新前的消费也要记录
		int oneDayConsume = hero.getOneDayConsume();
		if (oneDayConsume > 0) {
			ServerConsumeActFunction.getIns().heroConsumeHandler(hero, oneDayConsume, 0);
		}
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		// 补发邮件奖励
		Integer configId = 0;
		try {
			ServerConsumeAct model = (ServerConsumeAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.SERVERCONSUME_NEWACT);
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			for (Entry<Integer, Byte> entry : awardStateMap.entrySet()) {
				Byte state = entry.getValue();
				if (state == ServerConsumeActConst.CAN_GET) {
					configId = entry.getKey();
					Struct_qfxf_768 struct_qfxf_768 = Config_qfxf_768.getIns().get(configId);
					int[][] reward = struct_qfxf_768.getJl();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.SERVERCONSUME_NEWACT,
							new Object[] { MailConst.SERVERCONSUME_NEWACT }, reward);
					entry.setValue(ServerConsumeActConst.GETTED);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ServerConsumeActManager handleEnd configId:" + configId);
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		ServerConsumeAct model = new ServerConsumeAct(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		model.setAwardStateMap(new HashMap<>());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return ServerConsumeAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return ServerConsumeActEvent.getIns();
	}

}
