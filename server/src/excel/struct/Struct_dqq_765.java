package excel.struct;
/**
 * X_765_新活动-打气球.xlsx
 */
public class Struct_dqq_765 {
    /**序号*/
    private int xh;
    /**期数*/
    private int qs;
    /**射击次数*/
    private int cs;
    /**消费元宝*/
    private int yb;
    /**奖励
	 * [道具类型,道具id,道具数量,概率,是否广播]*/
    private String reward;
    /**
     * 序号
     */
    public int getXh() {
        return xh;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 射击次数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 消费元宝
     */
    public int getYb() {
        return yb;
    }
    /**
     * 奖励
	 * [道具类型,道具id,道具数量,概率,是否广播]
     */
    public String getReward() {
        return reward;
    }
    public Struct_dqq_765(int xh,int qs,int cs,int yb,String reward) {
        this.xh = xh;
        this.qs = qs;
        this.cs = cs;
        this.yb = yb;
        this.reward = reward;
    }
}