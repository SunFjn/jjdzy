package com.teamtop.system.openDaysSystem.bagGoodIdea;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.bagGoodIdea.model.BagGoodIdea;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_jnmj_327;
import excel.struct.Struct_jnmj_327;

public class BagGoodIdeaManager extends AbsOpenDaysManager {
	private static volatile BagGoodIdeaManager ins = null;

	public static BagGoodIdeaManager getIns() {
		if (ins == null) {
			synchronized (BagGoodIdeaManager.class) {
				if (ins == null) {
					ins = new BagGoodIdeaManager();
				}
			}
		}
		return ins;
	}

	private BagGoodIdeaManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.BAGGOODIDEA)) {
			return;
		}
		BagGoodIdea model = BagGoodIdeaFunction.getIns().getModel(hero);
		Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
		List<Struct_jnmj_327> configList = BagGoodIdeaSysCache.getConfigListMap().get(model.getQs());
		int size = configList.size();
		ArrayList<Object[]> awardStateList = new ArrayList<>(size);
		for (Struct_jnmj_327 struct_jnmj_327 : configList) {
			int id = struct_jnmj_327.getXh();
			Byte state = Optional.ofNullable(awardStateMap).map(map -> map.get(id)).orElse(BagGoodIdeaConst.NOT_REACH);
			awardStateList.add(new Object[] { id, state });
		}
		int times = model.getTimes();
		BagGoodIdeaSender.sendCmd_9900(hero.getId(), awardStateList.toArray(), times);
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param awardId 要领取的奖励id
	 */
	public void getAward(Hero hero, int awardId) {
		// TODO Auto-generated method stub
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.BAGGOODIDEA)) {
				return;
			}
			Struct_jnmj_327 struct_jnmj_327 = Config_jnmj_327.getIns().get(awardId);
			if (struct_jnmj_327 == null) {
				BagGoodIdeaSender.sendCmd_9902(hero.getId(), BagGoodIdeaConst.FAILURE_NOT_AWARD, awardId);
				return;
			}
			BagGoodIdea model = BagGoodIdeaFunction.getIns().getModel(hero);
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			Byte state = awardStateMap.get(awardId);
			if (state == null) {
				BagGoodIdeaSender.sendCmd_9902(hero.getId(), BagGoodIdeaConst.FAILURE_NOT_REACH, awardId);
				return;
			}
			if (state == BagGoodIdeaConst.GETTED) {
				BagGoodIdeaSender.sendCmd_9902(hero.getId(), BagGoodIdeaConst.FAILURE_NOT_REP, awardId);
				return;
			}
			awardStateMap.put(awardId, BagGoodIdeaConst.GETTED);
			int[][] reward = struct_jnmj_327.getJl();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.BAGGOODIDEA_REWARD, UseAddUtil.getDefaultMail(), true);
			BagGoodIdeaSender.sendCmd_9902(hero.getId(), BagGoodIdeaConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "BagGoodIdeaManager getAward awardId:" + awardId);
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub
	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub
	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		// TODO Auto-generated method stub
		// 补发邮件奖励
		Integer configId = 0;
		try {
			BagGoodIdea model = (BagGoodIdea) BagGoodIdeaManager.getIns().getSystemModel(hero, uid);
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			for (Entry<Integer, Byte> entry : awardStateMap.entrySet()) {
				Byte state = entry.getValue();
				if (state == BagGoodIdeaConst.CAN_GET) {
					configId = entry.getKey();
					Struct_jnmj_327 struct_jnmj_327 = Config_jnmj_327.getIns().get(configId);
					int[][] reward = struct_jnmj_327.getJl();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.BAGGOODIDEA_REWARD,
							new Object[] { MailConst.BAGGOODIDEA_REWARD }, reward);
					entry.setValue(BagGoodIdeaConst.GETTED);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "BagGoodIdeaManager handleEnd configId:" + configId);
		}

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		// TODO Auto-generated method stub
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		BagGoodIdea model = (BagGoodIdea) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (model == null) {
			model = new BagGoodIdea();
			model.setAwardStateMap(new HashMap<>());
		}
		return model;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return BagGoodIdea.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return BagGoodIdeaEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
