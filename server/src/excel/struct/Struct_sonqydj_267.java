package excel.struct;
/**
 * S_267_少主祈愿大奖表.xlsx
 */
public class Struct_sonqydj_267 {
    /**id*/
    private int id;
    /**需要祈愿次数*/
    private int yq;
    /**高级奖励1
	 * 道具类型，道具id，道具数量，概率，是否广播*/
    private String reward1;
    /**高级奖励2
	 * 道具类型，道具id，道具数量，概率，是否广播*/
    private String reward2;
    /**高级奖励3
	 * 道具类型，道具id，道具数量，概率，是否广播*/
    private String reward3;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 需要祈愿次数
     */
    public int getYq() {
        return yq;
    }
    /**
     * 高级奖励1
	 * 道具类型，道具id，道具数量，概率，是否广播
     */
    public String getReward1() {
        return reward1;
    }
    /**
     * 高级奖励2
	 * 道具类型，道具id，道具数量，概率，是否广播
     */
    public String getReward2() {
        return reward2;
    }
    /**
     * 高级奖励3
	 * 道具类型，道具id，道具数量，概率，是否广播
     */
    public String getReward3() {
        return reward3;
    }
    public Struct_sonqydj_267(int id,int yq,String reward1,String reward2,String reward3) {
        this.id = id;
        this.yq = yq;
        this.reward1 = reward1;
        this.reward2 = reward2;
        this.reward3 = reward3;
    }
}