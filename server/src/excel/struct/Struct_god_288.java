package excel.struct;
/**
 * X_288_新活动_神将现世表.xlsx
 */
public class Struct_god_288 {
    /**期数*/
    private int id;
    /**普通奖池*/
    private String reward;
    /**大奖奖池*/
    private String bigreward;
    /**
     * 期数
     */
    public int getId() {
        return id;
    }
    /**
     * 普通奖池
     */
    public String getReward() {
        return reward;
    }
    /**
     * 大奖奖池
     */
    public String getBigreward() {
        return bigreward;
    }
    public Struct_god_288(int id,String reward,String bigreward) {
        this.id = id;
        this.reward = reward;
        this.bigreward = bigreward;
    }
}