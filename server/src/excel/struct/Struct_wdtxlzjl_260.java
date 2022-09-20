package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_260_问鼎天下连斩奖励表.xlsx
 */
public class Struct_wdtxlzjl_260 {
    /**索引id*/
    private int id;
    /**奖励*/
    private int[][] reward;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_wdtxlzjl_260(int id,String reward) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}