package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-268-圣兽降临-圣兽寻宝排名表.xlsx
 */
public class Struct_ssshxbrank_268 {
    /**id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**奖励*/
    private int[][] reward;
    /**大奖*/
    private int[][] reward1;
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
    /**
     * 大奖
     */
    public int[][] getReward1() {
        return reward1;
    }
    public Struct_ssshxbrank_268(int id,String rank,String reward,String reward1) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
    }
}