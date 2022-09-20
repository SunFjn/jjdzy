package excel.struct;
/**
 * S_272_少主活动登录红包表.xlsx
 */
public class Struct_scdlhb_272 {
    /**天数*/
    private int id;
    /**大奖*/
    private String big;
    /**奖励*/
    private String reward;
    /**
     * 天数
     */
    public int getId() {
        return id;
    }
    /**
     * 大奖
     */
    public String getBig() {
        return big;
    }
    /**
     * 奖励
     */
    public String getReward() {
        return reward;
    }
    public Struct_scdlhb_272(int id,String big,String reward) {
        this.id = id;
        this.big = big;
        this.reward = reward;
    }
}