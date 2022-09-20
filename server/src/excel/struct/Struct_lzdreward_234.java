package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_234_隆中对奖励表.xlsx
 */
public class Struct_lzdreward_234 {
    /**奖励id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**奖励*/
    private int[][] reward;
    /**
     * 奖励id
     */
    public int getId() {
        return id;
    }
    /**
     * 排名
     */
    public int[][] getRank() {
        return rank;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_lzdreward_234(int id,String rank,String reward) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}