package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget;

import java.util.ArrayList;
import java.util.HashMap;
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
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.model.ShaoZhuSevenDayTarget;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.model.ShaoZhuSevenDayTargetModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_scqrmb_272;
import excel.struct.Struct_scqrmb_272;

public class ShaoZhuSevenDayTargetManager extends AbsOpenDaysManager {
	private static volatile ShaoZhuSevenDayTargetManager ins = null;

	public static ShaoZhuSevenDayTargetManager getIns() {
		if (ins == null) {
			synchronized (ShaoZhuSevenDayTargetManager.class) {
				if (ins == null) {
					ins = new ShaoZhuSevenDayTargetManager();
				}
			}
		}
		return ins;
	}

	private ShaoZhuSevenDayTargetManager() {
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 * @param type 任务类型，1:少主星级，2:亲密度，3:技能洗练，4:技能星级，5:少主战力
	 */
	public void openUI(Hero hero, int type) {
		// TODO Auto-generated method stub
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_SEVENDAYTARGET)) {
			return;
		}
		ShaoZhuSevenDayTarget sevenDayTarget = ShaoZhuSevenDayTargetFunction.getIns().getModel(hero);
		Map<Integer, ShaoZhuSevenDayTargetModel> modelByTypeMap = sevenDayTarget.getModelByTypeMap();
		Map<Integer, Struct_scqrmb_272> configMap = ShaoZhuSevenDayTargetCache.getConfigMap().get(type);
		if (configMap == null) {
			LogTool.warn("hid:" + hero.getId() + " name:" + hero.getName() + " type:" + type, this);
			return;
		}
		ArrayList<Object> awardList = new ArrayList<>();
		for (Struct_scqrmb_272 struct_scqrmb_272 : configMap.values()) {
			Integer id = struct_scqrmb_272.getId();
			Integer state = Optional.ofNullable(modelByTypeMap).map(map -> map.get(type))
					.map(model -> model.getAwardStateMapById()).map(map -> map.get(id))
					.orElse(ShaoZhuSevenDayTargetConst.NOT_REACH);
			int c2 = struct_scqrmb_272.getC2();
			Integer schedule = Optional.ofNullable(modelByTypeMap).map(map -> map.get(type))
					.map(model -> model.getScheduleMap()).map(map -> map.get(c2)).orElse(0);
			awardList.add(new Object[] { id, state, schedule });
		}
		ShaoZhuSevenDayTargetSender.sendCmd_5412(hero.getId(), awardList.toArray());
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_SEVENDAYTARGET)) {
				return;
			}
			Struct_scqrmb_272 struct_scqrmb_272 = Config_scqrmb_272.getIns().get(awardId);
			if (struct_scqrmb_272 == null) {
				ShaoZhuSevenDayTargetSender.sendCmd_5414(hero.getId(), ShaoZhuSevenDayTargetConst.FAILURE_NOT_AWARD,
						awardId);
				LogTool.warn("hid:" + hero.getId() + " name:" + hero.getName() + " awardId:" + awardId, this);
				return;
			}
			ShaoZhuSevenDayTarget sevenDayTarget = ShaoZhuSevenDayTargetFunction.getIns().getModel(hero);
			Map<Integer, ShaoZhuSevenDayTargetModel> modelByTypeMap = sevenDayTarget.getModelByTypeMap();
			int type = awardId / 1000;
			Integer state = Optional.ofNullable(modelByTypeMap).map(map -> map.get(type))
					.map(model -> model.getAwardStateMapById()).map(map -> map.get(awardId)).orElse(null);
			if (state == null) {
				ShaoZhuSevenDayTargetSender.sendCmd_5414(hero.getId(), ShaoZhuSevenDayTargetConst.FAILURE_NOT_REACH,
						awardId);
				return;
			}
			if (state == ShaoZhuSevenDayTargetConst.GETTED) {
				ShaoZhuSevenDayTargetSender.sendCmd_5414(hero.getId(), ShaoZhuSevenDayTargetConst.FAILURE_NOT_REP,
						awardId);
				return;
			}
			Map<Integer, Integer> awardStateMapById = modelByTypeMap.get(type).getAwardStateMapById();
			awardStateMapById.put(awardId, ShaoZhuSevenDayTargetConst.GETTED);
			int[][] reward = struct_scqrmb_272.getReward();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.SHAOZHU_SEVENDAYTARGET_REWARD, UseAddUtil.getDefaultMail(),
					true);
			ShaoZhuSevenDayTargetSender.sendCmd_5414(hero.getId(), ShaoZhuSevenDayTargetConst.SUCCESS, awardId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getAward awardId:" + awardId);
		}
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub
		// 少主活动-七日目标 少主星级 亲密度 技能星级 少主战力 更新处理
		ShaoZhuSevenDayTargetFunction.getIns().updateHandle(hero,
				new int[] { ShaoZhuSevenDayTargetConst.SHAOZHU_STAR, ShaoZhuSevenDayTargetConst.QINMIDU,
						ShaoZhuSevenDayTargetConst.SKILL_STAR, ShaoZhuSevenDayTargetConst.SHAOZHU_STRENGTH });
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
			ShaoZhuSevenDayTarget sevenDayTarget = (ShaoZhuSevenDayTarget) ShaoZhuSevenDayTargetManager.getIns()
					.getSystemModel(hero, uid);
			Map<Integer, ShaoZhuSevenDayTargetModel> modelByTypeMap = sevenDayTarget.getModelByTypeMap();
			for (ShaoZhuSevenDayTargetModel model : modelByTypeMap.values()) {
				Map<Integer, Integer> awardStateMapById = model.getAwardStateMapById();
				for (Entry<Integer, Integer> entry : awardStateMapById.entrySet()) {
					Integer state = entry.getValue();
					if (state == ShaoZhuSevenDayTargetConst.CAN_GET) {
						configId = entry.getKey();
						Struct_scqrmb_272 struct_scqrmb_272 = Config_scqrmb_272.getIns().get(configId);
						int[][] reward = struct_scqrmb_272.getReward();
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(),
								MailConst.SHAOZHU_SEVENDAYTARGET_AWARD,
								new Object[] { MailConst.SHAOZHU_SEVENDAYTARGET_AWARD }, reward);
						entry.setValue(ShaoZhuSevenDayTargetConst.GETTED);
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "handleEnd configId:" + configId);
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		// TODO Auto-generated method stub
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		ShaoZhuSevenDayTarget sevenDayTarget = (ShaoZhuSevenDayTarget) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (sevenDayTarget == null) {
			sevenDayTarget = new ShaoZhuSevenDayTarget();
			sevenDayTarget.setModelByTypeMap(new HashMap<>());
			sevenDayTarget.setWashNumMap(new HashMap<>());
		}
		return sevenDayTarget;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return ShaoZhuSevenDayTarget.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return ShaoZhuSevenDayTargetEvent.getIns();
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
