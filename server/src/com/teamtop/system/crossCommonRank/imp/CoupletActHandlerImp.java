package com.teamtop.system.crossCommonRank.imp;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.activity.ativitys.coupletAct.CoupletActConst;
import com.teamtop.system.activity.ativitys.coupletAct.CoupletActFunction;
import com.teamtop.system.activity.ativitys.coupletAct.CoupletActManager;
import com.teamtop.system.activity.ativitys.coupletAct.CoupletActSysCache;
import com.teamtop.system.activity.ativitys.coupletAct.model.CoupletAct;
import com.teamtop.system.activity.ativitys.coupletAct.model.CoupletActRankModel;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import excel.struct.Struct_ddlrank_297;

import java.util.List;
import java.util.Map;

/**
 * 对对联
 */
public class CoupletActHandlerImp
        extends CommonActivityRankHandlerAbs<CoupletAct, CoupletActRankModel> {

    @Override
    public void sendAward(List<CoupletActRankModel> awardList, int qs) {
        // TODO Auto-generated method stub
        Map<Integer, Map<Integer, Struct_ddlrank_297>> rankConfigMap = CoupletActSysCache.getRankConfigMap();
        Map<Integer, Struct_ddlrank_297> map = rankConfigMap.get(qs);
        int size = awardList.size();
        CoupletActRankModel rankModel = null;
        for (int i = 0; i < size; i++) {
            try {
                rankModel = awardList.get(i);
                long hid = rankModel.getHid();
                if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
                    LogTool.warn(
                            "CoupletActHandlerImp sendAward hid:" + hid + " name:" + rankModel.getName() + " qs:"
                                    + qs + " rank:" + rankModel.getRank() + " parameter:" + rankModel.getParameter(),
                            this);
                    continue;
                }
                Struct_ddlrank_297 struct_ddlrank_297 = map.get(rankModel.getRank());
                MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.COUPLET_ACT_RANKAWARD,
                        new Object[]{MailConst.COUPLET_ACT_RANKAWARD, rankModel.getRank()},
                        struct_ddlrank_297.getReward());
            } catch (Exception e) {
                // TODO: handle exception
                LogTool.error(e, this, rankModel.getHid(), rankModel.getName(),
                        "CoupletActHandlerImp sendAward rank:" + rankModel.getRank() + " times:"
                                + rankModel.getParameter());
            }
        }
    }

    @Override
    public void updateSuccessHandler(Hero hero, CoupletAct model) {
        // TODO Auto-generated method stub
        CoupletActFunction.getIns().targetHandler(hero, model);
        CoupletActManager.getIns().openUI(hero);
    }

    @Override
    public int globalId() {
        // TODO Auto-generated method stub
        return GlobalConst.CROSS_COUPLET_RANK_ACT_CEN;
    }

    @Override
    public int rankNum() {
        // TODO Auto-generated method stub
        return CoupletActConst.RANKMAXNUM;
    }


    @Override
    public CoupletActRankModel createRankModel(Hero hero, int parameter) {
        // TODO Auto-generated method stub
        return new CoupletActRankModel(hero.getId(), hero.getNameZoneid(), parameter);
    }

}
