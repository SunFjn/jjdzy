package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_278_分享-每日分享奖励表.xlsx
 */
public class Struct_mrfxjl_278 {
    /**位置*/
    private int id;
    /**奖励*/
    private int[][] reward;
    /**
     * 位置
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
    public Struct_mrfxjl_278(int id,String reward) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}