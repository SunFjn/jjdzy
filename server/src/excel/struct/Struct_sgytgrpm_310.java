package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_310_三国一统个人排名表.xlsx
 */
public class Struct_sgytgrpm_310 {
    /**索引id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**本服奖励*/
    private int[][] reward1;
    /**跨服奖励*/
    private int[][] reward2;
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
     * 本服奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 跨服奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    public Struct_sgytgrpm_310(int id,String rank,String reward1,String reward2) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
    }
}