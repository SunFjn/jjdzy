package excel.struct;
/**
 * X_295_幸运扭蛋表.xlsx
 */
public class Struct_luckegg_295 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**奖励
	 * A,B,C,D,E
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率（十万分比）
	 * E=是否是大奖*/
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
     * 奖励
	 * A,B,C,D,E
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率（十万分比）
	 * E=是否是大奖
     */
    public String getReward() {
        return reward;
    }
    public Struct_luckegg_295(int id,int qs,String reward) {
        this.id = id;
        this.qs = qs;
        this.reward = reward;
    }
}