package com.teamtop.system.crossCommonRank.imp;

import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.activity.ativitys.wishingTree.WishingTreeActConst;
import com.teamtop.system.activity.ativitys.wishingTree.WishingTreeActFunction;
import com.teamtop.system.activity.ativitys.wishingTree.WishingTreeActSysCache;
import com.teamtop.system.activity.ativitys.wishingTree.model.WishingTreeAct;
import com.teamtop.system.activity.ativitys.wishingTree.model.WishingTreeActRankModel;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_xyspmb_328;

public class WishingTreeActHandlerImp
		extends CommonActivityRankHandlerAbs<WishingTreeAct, WishingTreeActRankModel> {

	@Override
	public void sendAward(List<WishingTreeActRankModel> awardList, int qs) {
		// TODO Auto-generated method stub
		Map<Integer, Map<Integer, Struct_xyspmb_328>> rankConfigMap = WishingTreeActSysCache.getRankConfigMap();
		Map<Integer, Struct_xyspmb_328> map = rankConfigMap.get(qs);
		int size = awardList.size();
		WishingTreeActRankModel rankModel = null;
		for (int i = 0; i < size; i++) {
			try {
				rankModel = awardList.get(i);
				long hid = rankModel.getHid();
				if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
					LogTool.warn(
							"WishingTreeActHandlerImp sendAward hid:" + hid + " name:" + rankModel.getName() + " qs:"
									+ qs + " rank:" + rankModel.getRank() + " parameter:" + rankModel.getParameter(),
							this);
					continue;
				}
				Struct_xyspmb_328 struct_xyspmb_328 = map.get(rankModel.getRank());
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.WISHING_TREE_RANKAWARD,
						new Object[] { MailConst.WISHING_TREE_RANKAWARD, rankModel.getRank() },
						struct_xyspmb_328.getReward1());
				int parameter = rankModel.getParameter();
				int num = Config_xtcs_004.getIns().get(WishingTreeActConst.UP_RANK_CONDITION).getNum();
				if (parameter >= num) {
					// 特殊奖励次数
					int[][] reward2 = struct_xyspmb_328.getReward2();
					MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.WISHING_TREE_RANK_BIGAWARD,
							new Object[] { MailConst.WISHING_TREE_RANK_BIGAWARD }, reward2);
				}

			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, rankModel.getHid(), rankModel.getName(),
						"WishingTreeHandlerImp sendAward rank:" + rankModel.getRank() + " times:"
								+ rankModel.getParameter());
			}
		}
	}

	@Override
	public void updateSuccessHandler(Hero hero, WishingTreeAct model) {
		// TODO Auto-generated method stub
		WishingTreeActFunction.getIns().targetHandler(hero, model);
	}

	@Override
	public int globalId() {
		// TODO Auto-generated method stub
		return GlobalConst.CROSS_WISHINGTREE_RANK_ACT_CEN;
	}

	@Override
	public int rankNum() {
		// TODO Auto-generated method stub
		return WishingTreeActConst.RANKMAXNUM;
	}

	@Override
	public int upRankCondition(int rank, int qs) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public WishingTreeActRankModel createRankModel(Hero hero, int parameter) {
		// TODO Auto-generated method stub
		return new WishingTreeActRankModel(hero.getId(), hero.getNameZoneid(), parameter);
	}

}
