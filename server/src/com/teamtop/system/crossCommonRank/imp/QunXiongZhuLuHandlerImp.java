package com.teamtop.system.crossCommonRank.imp;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.crossCommonRank.model.CommonActivityRank;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuPersonRank;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import excel.config.Config_qxzlrank_273;

import java.util.List;

/**
 * 群雄
 */
public class QunXiongZhuLuHandlerImp
        extends CommonActivityRankHandlerAbs<CommonActivityRank, CrossZhuLuPersonRank> {

    @Override
    public void sendAward(List<CrossZhuLuPersonRank> awardList, int qs) {
        // TODO Auto-generated method stub
        int size = awardList.size();
        CrossZhuLuPersonRank rankModel = null;
        for (int i = 0; i < size; i++) {
            try {
                rankModel = awardList.get(i);
                long hid = rankModel.getHid();
                if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
                    LogTool.warn(
                            "QunXiongZhuLuHandlerImp sendAward hid:" + hid + " name:" + rankModel.getName() + " qs:"
                                    + qs + " rank:" + rankModel.getRank() + " parameter:" + rankModel.getParameter(),
                            this);
                    continue;
                }
                int award[][] = Config_qxzlrank_273.getIns().get(300 + rankModel.getRank()).getReward();
                MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.QUN_XIONG_TASK_MAIL_194,
                        new Object[]{MailConst.QUN_XIONG_TASK_MAIL_194, rankModel.getRank()},
                        award);
            } catch (Exception e) {
                // TODO: handle exception
                LogTool.error(e, this, rankModel.getHid(), rankModel.getName(),
                        "QunXiongZhuLuHandlerImp sendAward rank:" + rankModel.getRank() + " times:"
                                + rankModel.getParameter());
            }
        }
    }


    @Override
    public int rankNum() {
        // TODO Auto-generated method stub
        return 10;
    }

    @Override
    public Object[] arrayType(int rank, CrossZhuLuPersonRank rankModel) {
        return new Object[]{rank, rankModel.getName(), rankModel.getParameter(), rankModel.getCountryId()};
    }
}
