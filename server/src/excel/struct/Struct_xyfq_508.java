package excel.struct;
/**
 * X_508_新活动-幸运福签表.xlsx
 */
public class Struct_xyfq_508 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**签id*/
    private int q;
    /**奖励*/
    private String reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 签id
     */
    public int getQ() {
        return q;
    }
    /**
     * 奖励
     */
    public String getReward() {
        return reward;
    }
    public Struct_xyfq_508(int id,int qs,int q,String reward) {
        this.id = id;
        this.qs = qs;
        this.q = q;
        this.reward = reward;
    }
}