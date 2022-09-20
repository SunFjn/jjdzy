package com.teamtop.system.crossCommonRank.imp;

import java.util.List;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.crossCommonRank.model.CommonActivityRank;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.house.yard.model.CrossHouseRank;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fdrank_019;
import excel.struct.Struct_fdrank_019;

/**
 * 府邸排名
 */
public class CrossHouseHandlerImp extends CommonActivityRankHandlerAbs<CommonActivityRank, CrossHouseRank> {

	@Override
	public void sendAward(List<CrossHouseRank> awardList, int qs) {
		int size = awardList.size();
		CrossHouseRank rankModel = null;
		for (int i = 0; i < size; i++) {
			try {
				rankModel = awardList.get(i);
				long hid = rankModel.getHid();
				if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
					LogTool.warn("CrossHouseHandlerImp sendAward hid:" + hid + " name:" + rankModel.getName() + " qs:"
							+ qs + " rank:" + rankModel.getRank() + " parameter:" + rankModel.getParameter(), this);
					continue;
				}
				for (Struct_fdrank_019 cfg : Config_fdrank_019.getIns().getSortList()) {
					if (rankModel.getRank() >= cfg.getPm1() && rankModel.getRank() <= cfg.getPm2()) {
						// 发放邮件奖励
						int award[][] = cfg.getAward();
						MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.HOUSE_RANK_MAIL_200,
								new Object[] { MailConst.HOUSE_RANK_MAIL_200, rankModel.getRank() }, award);
					}
				}
			} catch (Exception e) {
				LogTool.error(e, this, rankModel.getHid(), rankModel.getName(), "CrossHouseHandlerImp sendAward rank:"
						+ rankModel.getRank() + " times:" + rankModel.getParameter());
			}
		}
	}

	@Override
	public int globalId() {
		return GlobalConst.CROSS_HOUSE_RANK;
	}

	@Override
	public int rankNum() {
		return 50;
	}

	@Override
	public Object[] arrayType(int rank, CrossHouseRank rankModel) {
		return new Object[] { rank, rankModel.getHid(), rankModel.getName(), rankModel.getIcon(), rankModel.getFrame(),
				rankModel.getLevel(), rankModel.getHouseLv(), rankModel.getHouseDc(), rankModel.getHadRandomEvent() };
	}
}
