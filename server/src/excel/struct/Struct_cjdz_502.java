package excel.struct;
/**
 * X_502_新活动_超级弹珠表.xlsx
 */
public class Struct_cjdz_502 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**pool
	 * ShuHen LIU:
	 * 1：1等奖奖池
	 * 2：2等奖奖池
	 * 以此类推*/
    private int jc;
    /**奖励
	 * Administrator:
	 * A,B,C,D,E
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=随机概率（十万分比）
	 * E=是否是大奖*/
    private String reward;
    /**权重*/
    private int qz;
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
     * pool
	 * ShuHen LIU:
	 * 1：1等奖奖池
	 * 2：2等奖奖池
	 * 以此类推
     */
    public int getJc() {
        return jc;
    }
    /**
     * 奖励
	 * Administrator:
	 * A,B,C,D,E
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=随机概率（十万分比）
	 * E=是否是大奖
     */
    public String getReward() {
        return reward;
    }
    /**
     * 权重
     */
    public int getQz() {
        return qz;
    }
    public Struct_cjdz_502(int id,int qs,int jc,String reward,int qz) {
        this.id = id;
        this.qs = qs;
        this.jc = jc;
        this.reward = reward;
        this.qz = qz;
    }
}