package excel.struct;
/**
 * X_503_新活动-至尊秘宝表.xlsx
 */
public class Struct_zzmb_503 {
    /**位置id*/
    private int id;
    /**期数*/
    private int qs;
    /**奖励
	 * 道具类型 道具id 道具数量 随机概率 是否广播 奖励份数*/
    private String reward;
    /**奖励概率*/
    private int gl;
    /**
     * 位置id
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
     * 奖励
	 * 道具类型 道具id 道具数量 随机概率 是否广播 奖励份数
     */
    public String getReward() {
        return reward;
    }
    /**
     * 奖励概率
     */
    public int getGl() {
        return gl;
    }
    public Struct_zzmb_503(int id,int qs,String reward,int gl) {
        this.id = id;
        this.qs = qs;
        this.reward = reward;
        this.gl = gl;
    }
}