package com.teamtop.system.crossCommonRank.imp;

import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.activity.ativitys.godGenThisLifeAct.GodGenThisLifeActConst;
import com.teamtop.system.activity.ativitys.godGenThisLifeAct.GodGenThisLifeActFunction;
import com.teamtop.system.activity.ativitys.godGenThisLifeAct.GodGenThisLifeActSysCache;
import com.teamtop.system.activity.ativitys.godGenThisLifeAct.model.GodGenThisLifeAct;
import com.teamtop.system.activity.ativitys.godGenThisLifeAct.model.GodGenThisLifeActRankModel;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_godrank_288;

/**
 * 神将现世
 */
public class GodGenThisLifeHandlerImp
		extends CommonActivityRankHandlerAbs<GodGenThisLifeAct, GodGenThisLifeActRankModel> {

	@Override
	public void sendAward(List<GodGenThisLifeActRankModel> awardList, int qs) {
		// TODO Auto-generated method stub
		Map<Integer, Map<Integer, Struct_godrank_288>> rankConfigMap = GodGenThisLifeActSysCache.getRankConfigMap();
		Map<Integer, Struct_godrank_288> map = rankConfigMap.get(qs);
		int size = awardList.size();
		GodGenThisLifeActRankModel rankModel = null;
		for (int i = 0; i < size; i++) {
			try {
				rankModel = awardList.get(i);
				long hid = rankModel.getHid();
				if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
					LogTool.warn(
							"GodGenThisLifeHandlerImp sendAward hid:" + hid + " name:" + rankModel.getName() + " qs:"
									+ qs + " rank:" + rankModel.getRank() + " parameter:" + rankModel.getParameter(),
							this);
					continue;
				}
				Struct_godrank_288 struct_godrank_288 = map.get(rankModel.getRank());
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.CROSS_GODGENTHISLIFE_RANKAWARD,
						new Object[] { MailConst.CROSS_GODGENTHISLIFE_RANKAWARD, rankModel.getRank() },
						struct_godrank_288.getReward());
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, rankModel.getHid(), rankModel.getName(),
						"GodGenThisLifeHandlerImp sendAward rank:" + rankModel.getRank() + " times:"
								+ rankModel.getParameter());
			}
		}
	}

	@Override
	public void updateSuccessHandler(Hero hero, GodGenThisLifeAct model) {
		// TODO Auto-generated method stub
		GodGenThisLifeActFunction.getIns().targetHandler(hero, model);
	}

	@Override
	public int globalId() {
		// TODO Auto-generated method stub
		return GlobalConst.CROSS_GODGENTHISLIFE_RANK_ACT_CEN;
	}

	@Override
	public int rankNum() {
		// TODO Auto-generated method stub
		return GodGenThisLifeActConst.RANKMAXNUM;
	}

	@Override
	public int upRankCondition(int rank, int qs) {
		// TODO Auto-generated method stub
		int num = 0;
		if (rank <= 3) {
			num = Config_xtcs_004.getIns().get(GodGenThisLifeActConst.UP_RANK_CONDITION).getNum();
		}
		return num;
	}

	@Override
	public GodGenThisLifeActRankModel createRankModel(Hero hero, int parameter) {
		// TODO Auto-generated method stub
		return new GodGenThisLifeActRankModel(hero.getId(), hero.getNameZoneid(), parameter);
	}

}
