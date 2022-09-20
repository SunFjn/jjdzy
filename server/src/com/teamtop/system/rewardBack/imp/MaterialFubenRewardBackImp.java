package com.teamtop.system.rewardBack.imp;

import java.util.List;
import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.materialFuben.MaterialFuben;
import com.teamtop.system.materialFuben.MaterialFubenConst;
import com.teamtop.system.materialFuben.MaterialFubenModel;
import com.teamtop.system.rewardBack.RewardBackAbs;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.system.weekCard.WeekCardFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_cailiaofuben_709;
import excel.struct.Struct_cailiaofuben_709;

/**
 * 材料副本
 * 
 * @author jjjjyyy
 *
 */
public class MaterialFubenRewardBackImp extends RewardBackAbs {

	@Override
	public void handle(Hero hero, Integer sysId, Object... param) {
		// TODO Auto-generated method stub
		MaterialFuben materialFuben = hero.getMaterialFuben();
		Map<Integer, MaterialFubenModel> materialFubenCountMap = materialFuben.getMaterialFubenCount();
		List<Struct_cailiaofuben_709> sortList = Config_cailiaofuben_709.getIns().getSortList();
		int addNum = WeekCardFunction.getIns().getMaterialFuben(hero);
		int restTimes = 0;
		int zhuanNum = 0;
		int fubenId = 0;
		for (Struct_cailiaofuben_709 struct_cailiaofuben_709 : sortList) {
			try {
				int[][] condition = struct_cailiaofuben_709.getStartcondition();
				boolean isOpen = checkCondition(hero, condition);
				if (!isOpen) {
					continue;
				}
				MaterialFubenModel materialFubenModel = materialFubenCountMap.get(struct_cailiaofuben_709.getID());

				fubenId = struct_cailiaofuben_709.getID();
				restTimes = MaterialFubenConst.DAY_COUNT + materialFubenModel.getHasBuyNum() + addNum
						- materialFubenModel.getHasChaNum();
				if (restTimes <= 0) {
					continue;
				}
				zhuanNum = hero.getRebornlv() / 1000;
				// 材料副本 找回奖励=次数*基础奖励*（转数+1）
				RewardBackFunction.getIns().handleData(hero, sysId, fubenId, restTimes, restTimes * (zhuanNum + 1));
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, hero.getId(), hero.getName(),
						"fubenId:" + fubenId + " restTimes:" + restTimes + " zhuanNum:" + zhuanNum);
			}
		}

	}

	private boolean checkCondition(Hero hero, int[][] condition) {
		if (condition != null) {
			for (int[] info : condition) {
				switch (info[0]) {
				case 1:
					int curGuanqia = 0;
					if (hero.getGuanqia() != null) {
						curGuanqia = hero.getGuanqia().getCurGuanqia();
					}
					if (curGuanqia < info[1]) {
						return false;
					}
					break;
				case 2:
					int rebornlv = hero.getRebornlv();
					if (rebornlv < info[1]) {
						return false;
					}
					break;
				case 3:
					if (hero.getRealLevel() < info[1]) {
						return false;
					}
					break;
				default:
					break;
				}
			}
			return true;
		}
		return false;
	}

}
