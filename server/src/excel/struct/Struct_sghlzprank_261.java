package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-261-三国庆典-豪礼转盘排名表.xlsx
 */
public class Struct_sghlzprank_261 {
    /**索引id*/
    private int id;
    /**活动期数*/
    private int qs;
    /**排名*/
    private int[][] rank;
    /**奖励*/
    private int[][] reward;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 活动期数
     */
    public int getQs() {
        return qs;
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
    public Struct_sghlzprank_261(int id,int qs,String rank,String reward) {
        this.id = id;
        this.qs = qs;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}