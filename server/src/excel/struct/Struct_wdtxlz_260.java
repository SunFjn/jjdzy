package excel.struct;
/**
 * W_260_问鼎天下连斩表.xlsx
 */
public class Struct_wdtxlz_260 {
    /**索引id*/
    private int id;
    /**kill*/
    private int reward;
    /**终结积分*/
    private int point;
    /**头顶连斩称号*/
    private int ch;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * kill
     */
    public int getReward() {
        return reward;
    }
    /**
     * 终结积分
     */
    public int getPoint() {
        return point;
    }
    /**
     * 头顶连斩称号
     */
    public int getCh() {
        return ch;
    }
    public Struct_wdtxlz_260(int id,int reward,int point,int ch) {
        this.id = id;
        this.reward = reward;
        this.point = point;
        this.ch = ch;
    }
}