package excel.struct;
/**
 * S-268-圣兽寻宝表.xlsx
 */
public class Struct_shxb_268 {
    /**id*/
    private int id;
    /**下个格子*/
    private int next;
    /**奖励*/
    private String reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 下个格子
     */
    public int getNext() {
        return next;
    }
    /**
     * 奖励
     */
    public String getReward() {
        return reward;
    }
    public Struct_shxb_268(int id,int next,String reward) {
        this.id = id;
        this.next = next;
        this.reward = reward;
    }
}