package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_260_问鼎天下积分奖励表.xlsx
 */
public class Struct_wdtxpoint_260 {
    /**索引id*/
    private int id;
    /**积分*/
    private int point;
    /**奖励*/
    private int[][] reward;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 积分
     */
    public int getPoint() {
        return point;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_wdtxpoint_260(int id,int point,String reward) {
        this.id = id;
        this.point = point;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}