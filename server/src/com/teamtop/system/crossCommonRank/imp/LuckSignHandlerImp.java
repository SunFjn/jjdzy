package com.teamtop.system.crossCommonRank.imp;

import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.activity.ativitys.luckSign.LuckSignConst;
import com.teamtop.system.activity.ativitys.luckSign.LuckSignFunction;
import com.teamtop.system.activity.ativitys.luckSign.LuckSignSysCache;
import com.teamtop.system.activity.ativitys.luckSign.model.LuckSign;
import com.teamtop.system.activity.ativitys.luckSign.model.LuckSignRankModel;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xyfqrank_508;

public class LuckSignHandlerImp
		extends CommonActivityRankHandlerAbs<LuckSign, LuckSignRankModel> {

	@Override
	public void sendAward(List<LuckSignRankModel> awardList, int qs) {
		// TODO Auto-generated method stub
		Map<Integer, Map<Integer, Struct_xyfqrank_508>> rankConfigMap = LuckSignSysCache.getRankConfigMap();
		Map<Integer, Struct_xyfqrank_508> map = rankConfigMap.get(qs);
		int size = awardList.size();
		LuckSignRankModel rankModel = null;
		for (int i = 0; i < size; i++) {
			try {
				rankModel = awardList.get(i);
				long hid = rankModel.getHid();
				if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
					LogTool.warn(
							"LuckSignHandlerImp sendAward hid:" + hid + " name:" + rankModel.getName() + " qs:"
									+ qs + " rank:" + rankModel.getRank() + " parameter:" + rankModel.getParameter(),
							this);
					continue;
				}
				Struct_xyfqrank_508 struct_xyspmb_328 = map.get(rankModel.getRank());
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.LUCK_SIGN_RANKAWARD,
						new Object[] { MailConst.LUCK_SIGN_RANKAWARD, rankModel.getRank() },
						struct_xyspmb_328.getReward());
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, rankModel.getHid(), rankModel.getName(),
						"LuckSignHandlerImp sendAward rank:" + rankModel.getRank() + " times:"
								+ rankModel.getParameter());
			}
		}
	}

	@Override
	public void updateSuccessHandler(Hero hero, LuckSign model) {
		// TODO Auto-generated method stub
		LuckSignFunction.getIns().targetHandler(hero, model);
	}

	@Override
	public int globalId() {
		// TODO Auto-generated method stub
		return GlobalConst.CROSS_LUCKSIGN_RANK_ACT_CEN;
	}

	@Override
	public int rankNum() {
		// TODO Auto-generated method stub
		return LuckSignConst.RANKMAXNUM;
	}

	@Override
	public int upRankCondition(int rank, int qs) {
		// TODO Auto-generated method stub
		int num = 0;
		if (rank <= 3) {
			num = Config_xtcs_004.getIns().get(LuckSignConst.UP_RANK_CONDITION).getNum();
		}
		return num;
	}

	@Override
	public LuckSignRankModel createRankModel(Hero hero, int parameter) {
		// TODO Auto-generated method stub
		return new LuckSignRankModel(hero.getId(), hero.getNameZoneid(), parameter);
	}

}
