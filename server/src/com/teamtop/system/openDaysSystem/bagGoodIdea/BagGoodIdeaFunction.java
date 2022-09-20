package com.teamtop.system.openDaysSystem.bagGoodIdea;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.bagGoodIdea.model.BagGoodIdea;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_jnmj_327;

public class BagGoodIdeaFunction {
	private static volatile BagGoodIdeaFunction ins = null;

	public static BagGoodIdeaFunction getIns() {
		if (ins == null) {
			synchronized (BagGoodIdeaFunction.class) {
				if (ins == null) {
					ins = new BagGoodIdeaFunction();
				}
			}
		}
		return ins;
	}

	private BagGoodIdeaFunction() {
	}

	/**
	 * 取得运筹帷幄-锦囊妙计model
	 * 
	 * @param hero
	 * @return
	 */
	public BagGoodIdea getModel(Hero hero) {
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.BAGGOODIDEA);
		BagGoodIdea model = (BagGoodIdea) BagGoodIdeaManager.getIns().getSystemModel(hero, uid);
		return model;
	}

	/**
	 * 奖励状态处理
	 * 
	 * @param hero
	 * @param addTimes
	 */
	public void awardStateHandler(Hero hero, int addTimes) {
		// TODO Auto-generated method stub
		int id = 0;
		int newTimes = 0;
		try {
			//  当天版本更新前玩家进行了充值，版本更新后，要计算当天已充值的金额（若活动正好当天开启）；
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.BAGGOODIDEA)) {
				return;
			}
			BagGoodIdea model = getModel(hero);
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			int times = model.getTimes();
			model.setTimes(times + addTimes);
			newTimes = model.getTimes();
			boolean flag = false;
			List<Struct_jnmj_327> configList = BagGoodIdeaSysCache.getConfigListMap().get(model.getQs());
			for (Struct_jnmj_327 struct_jnmj_327 : configList) {
				id = struct_jnmj_327.getXh();
				if (newTimes >= struct_jnmj_327.getCs() && awardStateMap.get(id) == null) {
					awardStateMap.put(id, BagGoodIdeaConst.CAN_GET);
					flag = true;
				}
			}

			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.YUNCHOUWEIWO, 1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.BAGGOODIDEA, 1, RedPointConst.HAS_RED);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "BagGoodIdeaFunction awardStateHandler addTimes:"
					+ addTimes + " id:" + id + " newTimes:" + newTimes);
		}
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.BAGGOODIDEA)) {
			return;
		}
		BagGoodIdea model = getModel(hero);
		Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
		for (Entry<Integer, Byte> entry : awardStateMap.entrySet()) {
			Byte state = entry.getValue();
			if (state == BagGoodIdeaConst.CAN_GET) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.YUNCHOUWEIWO, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.BAGGOODIDEA, 1,
							RedPointConst.HAS_RED);
					break;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.YUNCHOUWEIWO, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.BAGGOODIDEA, 1,
							RedPointConst.HAS_RED);
					break;
				}
			}
		}
	}

}
