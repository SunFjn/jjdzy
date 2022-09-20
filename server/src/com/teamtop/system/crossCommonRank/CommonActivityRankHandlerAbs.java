package com.teamtop.system.crossCommonRank;

import java.util.List;
import java.util.TreeSet;

import com.teamtop.system.crossCommonRank.model.CommonActivityRank;
import com.teamtop.system.crossCommonRank.model.CommonRankModel;
import com.teamtop.system.hero.Hero;

public abstract class CommonActivityRankHandlerAbs<T extends CommonActivityRank, U extends CommonRankModel> {
    /**
     * 创建排行model
     *
     * @param hero
     * @param parameter
     * @return
     */
    public U createRankModel(Hero hero, int parameter){
        return null;
    }

    /**
     * 头像，头像框，神兵处理等
     * @param hero
     * @param rankTreeSet
     * @return 是否处理
     */
    public boolean otherHandler(Hero hero, TreeSet<U> rankTreeSet) {
        return false;
    }

    /**
     * 更新成功后的处理
     *
     * @param hero
     * @param model
     */
    public void updateSuccessHandler(Hero hero, T model) {

    }

    /**
     * 提早结束天数
     */
    public int earlyEndDay() {
        return 0;
    }

    /**
     * 上榜条件
     */
    public int upRankCondition() {
        return 0;
    }

    /**
     * 上榜条件
     *
     * @param rank 最大值为rankNum
     * @param qs
     * @return
     */
    public int upRankCondition(int rank, int qs) {
        return 0;
    }

    /**
     * 邮件发奖励
     *
     * @param awardList
     * @param qs
     */
    public abstract void sendAward(List<U> awardList, int qs);

    /**
     * 缓存入库编号 GlobalConst，为0不入库
     */
    public int globalId() {
        return 0;
    }

    /**
     * 打开界面返回数组类型
     */
    public Object[] arrayType(int rank, U rankModel) {
        return new Object[]{rank, rankModel.getName(), rankModel.getParameter()};
    }

    /**
     * 排行数量
     */
    public abstract int rankNum();

}
