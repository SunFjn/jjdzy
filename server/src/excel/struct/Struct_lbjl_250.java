package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_250_吕布降临表.xlsx
 */
public class Struct_lbjl_250 {
    /**索引id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**排名奖励*/
    private int[][] reward;
    /**大奖奖励*/
    private int[][] reward1;
    /**
     * 索引id
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
     * 排名奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 大奖奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    public Struct_lbjl_250(int id,String rank,String reward,String reward1) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
    }
}