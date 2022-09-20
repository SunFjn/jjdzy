package com.teamtop.system.crossCommonRank.imp;

import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank.ConsumeRankConst;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank.ConsumeRankSysCache;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank.model.ConsumeRank;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank.model.ConsumeRankModel;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_sgxfph_261;

/**
 * 消费排行
 */
public class ConsumeRankHandlerImp extends CommonActivityRankHandlerAbs<ConsumeRank, ConsumeRankModel> {

	@Override
	public void sendAward(List<ConsumeRankModel> awardList, int qs) {
		// TODO Auto-generated method stub
		Map<Integer, Map<Integer, Struct_sgxfph_261>> rankConfigMap = ConsumeRankSysCache.getRankConfigMap();
		Map<Integer, Struct_sgxfph_261> map = rankConfigMap.get(qs);
		int size = awardList.size();
		ConsumeRankModel rankModel = null;
		for (int i = 0; i < size; i++) {
			try {
				rankModel = awardList.get(i);
				long hid = rankModel.getHid();
				int rank = rankModel.getRank();
				if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
					LogTool.warn("ConsumeRankHandlerImp sendAward hid:" + hid + " name:" + rankModel.getName() + " qs:"
							+ qs + " rank:" + rank + " parameter:" + rankModel.getParameter(), this);
					continue;
				}
				Struct_sgxfph_261 struct_sgxfph_261 = map.get(rank);
				int[][] reward = struct_sgxfph_261.getTips();
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.MAIL_CONSUMERANK_AWARD,
						new Object[] { MailConst.MAIL_CONSUMERANK_AWARD, rank }, reward);// 邮件发放普通奖励
				int fh = struct_sgxfph_261.getFh();
				double fhPer = (double) fh / 100;
				int consume = rankModel.getParameter();
				double fhYb = consume * fhPer;
				int FhYbInt = (int) Math.floor(fhYb);// 向下取整
				if (FhYbInt != 0) {
					int[][] fhYbreward = new int[][] { new int[] { GameConst.YUANBAO, 0, FhYbInt } };
					MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.MAIL_FHYB_AWARD,
							new Object[] { MailConst.MAIL_FHYB_AWARD }, fhYbreward);// 邮件发放元宝返还奖励
				}
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, rankModel.getHid(), rankModel.getName(), "ConsumeRankHandlerImp sendAward rank:"
						+ rankModel.getRank() + " times:" + rankModel.getParameter());
			}
		}
	}

	@Override
	public boolean otherHandler(Hero hero, TreeSet<ConsumeRankModel> rankTreeSet) {
		// TODO Auto-generated method stub
		if (rankTreeSet.size() <= 0) {
			return false;
		}
		ConsumeRankModel firstModel = rankTreeSet.first();
		if (firstModel.getRank() != 1 || hero.getId() != firstModel.getHid()) {
			return false;
		}
		return true;
	}

	@Override
	public int globalId() {
		// TODO Auto-generated method stub
		return GlobalConst.CROSS_CONSUMERANK_ACT_CEN;
	}

	@Override
	public int rankNum() {
		// TODO Auto-generated method stub
		return ConsumeRankConst.RANKMAXNUM;
	}

	@Override
	public int upRankCondition(int rank, int qs) {
		// TODO Auto-generated method stub
		int tj = ConsumeRankSysCache.getRankConfigMap().get(qs).get(rank).getTj();
		return tj;
	}

	@Override
	public int earlyEndDay() {
		// TODO Auto-generated method stub
		return Config_xtcs_004.getIns().get(ConsumeRankConst.BEFORE_DAY).getNum();
	}

	@Override
	public ConsumeRankModel createRankModel(Hero hero, int parameter) {
		// TODO Auto-generated method stub
		return new ConsumeRankModel(hero.getId(), hero.getNameZoneid(), parameter, hero.getJob(),
				hero.getShowModel().getBodyModel(), GodWeaponFunction.getIns().getNowGodWeapon(hero),hero.getMountId());
	}

}
