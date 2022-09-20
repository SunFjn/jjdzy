package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-272-少主活动-少主祈愿排名表.xlsx
 */
public class Struct_szqypm_272 {
    /**id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**大奖*/
    private int[][] big;
    /**奖励*/
    private int[][] reward;
    /**
     * id
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
     * 大奖
     */
    public int[][] getBig() {
        return big;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_szqypm_272(int id,String rank,String big,String reward) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.big = ExcelJsonUtils.toObj(big,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}