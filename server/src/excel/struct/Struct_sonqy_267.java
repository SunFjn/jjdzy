package excel.struct;
/**
 * S_267_少主祈愿表.xlsx
 */
public class Struct_sonqy_267 {
    /**id*/
    private int id;
    /**普通奖池
	 * 道具类型，道具id，道具数量，概率，是否广播*/
    private String reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 普通奖池
	 * 道具类型，道具id，道具数量，概率，是否广播
     */
    public String getReward() {
        return reward;
    }
    public Struct_sonqy_267(int id,String reward) {
        this.id = id;
        this.reward = reward;
    }
}