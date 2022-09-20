package com.teamtop.system.crossCommonRank.imp;

import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.CelebrationHaoLiZhuanPanCache;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.CelebrationHaoLiZhuanPanConst;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.CelebrationHaoLiZhuanPanFunction;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.model.CelebrationHaoLiZhuanPan;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.model.CelebrationHaoLiZhuanPanRank;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;

/**
 * 三国庆典-豪礼转盘
 */
public class CelebrationHaoLiZhuanPanHandlerImp
		extends CommonActivityRankHandlerAbs<CelebrationHaoLiZhuanPan, CelebrationHaoLiZhuanPanRank> {

	@Override
	public void sendAward(List<CelebrationHaoLiZhuanPanRank> awardList, int qs) {
		// TODO Auto-generated method stub
		Map<Integer, int[][]> awardsMap = CelebrationHaoLiZhuanPanCache.getRankAwardsMap().get(qs);
		int size = awardList.size();
		CelebrationHaoLiZhuanPanRank rankModel = null;
		for (int i = 0; i < size; i++) {
			try {
				rankModel = awardList.get(i);
				long hid = rankModel.getHid();
				if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
					LogTool.warn("CelebrationHaoLiZhuanPanHandlerImp sendAward hid:" + hid + " name:"
							+ rankModel.getName() + " qs:" + qs + " rank:" + rankModel.getRank() + " parameter:"
							+ rankModel.getParameter(), this);
					continue;
				}
				int[][] reward = awardsMap.get(rankModel.getRank());
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.MAIL_CELEBRATION_HAO_LI_ZHUAN_PAN,
						new Object[] { MailConst.MAIL_CELEBRATION_HAO_LI_ZHUAN_PAN, rankModel.getRank() }, reward);
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, rankModel.getHid(), rankModel.getName(),
						"CelebrationHaoLiZhuanPanHandlerImp sendAward rank:" + rankModel.getRank() + " times:"
								+ rankModel.getParameter());
			}
		}
	}

	@Override
	public int globalId() {
		// TODO Auto-generated method stub
		return GlobalConst.CELEBRATION_HAO_LI_ZHUAN_PAN_RANK;
	}

	@Override
	public int rankNum() {
		// TODO Auto-generated method stub
		return CelebrationHaoLiZhuanPanConst.NUM_MAX_RANK;
	}

	@Override
	public void updateSuccessHandler(Hero hero, CelebrationHaoLiZhuanPan model) {
		// TODO Auto-generated method stub
		CelebrationHaoLiZhuanPanFunction.getIns().updateTargetAwardMapState(hero, model);
	}

	@Override
	public int upRankCondition() {
		// TODO Auto-generated method stub
		int num = Config_xtcs_004.getIns().get(XTCS004Const.CELEBRATION_HAO_LI_ZHUAN_PAN_RANK_MIN_COUNT).getNum();
		return num;
	}

	@Override
	public int earlyEndDay() {
		// TODO Auto-generated method stub
		return Config_xtcs_004.getIns().get(CelebrationHaoLiZhuanPanConst.DAY_ID).getNum();
	}

	@Override
	public CelebrationHaoLiZhuanPanRank createRankModel(Hero hero, int parameter) {
		// TODO Auto-generated method stub
		return new CelebrationHaoLiZhuanPanRank(hero.getId(), hero.getNameZoneid(), parameter);
	}

}
