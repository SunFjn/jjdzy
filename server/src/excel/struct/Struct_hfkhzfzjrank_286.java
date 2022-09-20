package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * H_286_合服狂欢_张飞醉酒排名表.xlsx
 */
public class Struct_hfkhzfzjrank_286 {
    /**id*/
    private int id;
    /**排名*/
    private int[][] rank;
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
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_hfkhzfzjrank_286(int id,String rank,String reward) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}