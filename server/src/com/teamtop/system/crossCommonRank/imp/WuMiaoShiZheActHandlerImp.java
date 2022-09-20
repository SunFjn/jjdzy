package com.teamtop.system.crossCommonRank.imp;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.activity.ativitys.wuMiaoShiZheAct.WuMiaoShiZheActConst;
import com.teamtop.system.activity.ativitys.wuMiaoShiZheAct.WuMiaoShiZheActFunction;
import com.teamtop.system.activity.ativitys.wuMiaoShiZheAct.WuMiaoShiZheActSysCache;
import com.teamtop.system.activity.ativitys.wuMiaoShiZheAct.model.WuMiaoShiZheAct;
import com.teamtop.system.activity.ativitys.wuMiaoShiZheAct.model.WuMiaoShiZheActRankModel;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_wmpm_779;

import java.util.List;
import java.util.Map;

/**
 * 武庙十哲
 */
public class WuMiaoShiZheActHandlerImp
        extends CommonActivityRankHandlerAbs<WuMiaoShiZheAct, WuMiaoShiZheActRankModel> {

    @Override
    public void sendAward(List<WuMiaoShiZheActRankModel> awardList, int qs) {
        Map<Integer, Map<Integer, Struct_wmpm_779>> rankConfigMap = WuMiaoShiZheActSysCache.getRankConfigMap();
        Map<Integer, Struct_wmpm_779> map = rankConfigMap.get(qs);
        int size = awardList.size();
        WuMiaoShiZheActRankModel rankModel = null;
        for (int i = 0; i < size; i++) {
            try {
                rankModel = awardList.get(i);
                long hid = rankModel.getHid();
//                LogTool.info("WuMiaoShiZheActHandlerImp hid:" + hid + " score:" + rankModel.getParameter(), this);
                if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
                    LogTool.warn(
                            "WuMiaoShiZheActHandlerImp sendAward hid:" + hid + " name:" + rankModel.getName() + " qs:"
                                    + qs + " rank:" + rankModel.getRank() + " parameter:" + rankModel.getParameter(),
                            this);
                    continue;
                }
                Struct_wmpm_779 struct_wmpm_779 = map.get(rankModel.getRank());
                MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.WUMIAOSHIZHE_ACT_RANKAWARD,
                        new Object[]{MailConst.WUMIAOSHIZHE_ACT_RANKAWARD, rankModel.getRank()},
                        struct_wmpm_779.getReward1());
            } catch (Exception e) {
                LogTool.error(e, this, rankModel.getHid(), rankModel.getName(),
                        "WuMiaoShiZheActHandlerImp sendAward rank:" + rankModel.getRank() + " times:"
                                + rankModel.getParameter());
            }
        }
    }

    @Override
    public void updateSuccessHandler(Hero hero, WuMiaoShiZheAct model) {
        WuMiaoShiZheActFunction.getIns().targetHandler(hero, model);
    }

    @Override
    public int globalId() {
        return GlobalConst.WUMIAOSHIZHE_RANK_ACT_CEN;
    }

    @Override
    public int rankNum() {
        return WuMiaoShiZheActConst.RANKMAXNUM;
    }

    @Override
    public int upRankCondition() {
        int num = Config_xtcs_004.getIns().get(WuMiaoShiZheActConst.UP_RANK_CONDITION).getNum();
        return num;
    }

    @Override
    public WuMiaoShiZheActRankModel createRankModel(Hero hero, int parameter) {
        return new WuMiaoShiZheActRankModel(hero.getId(), hero.getNameZoneid(), parameter);
    }

}
