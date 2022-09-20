package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_230_三国无双表.xlsx
 */
public class Struct_double_230 {
    /**索引id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**奖励*/
    private int[][] reward;
    /**描述*/
    private String tips;
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
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 描述
     */
    public String getTips() {
        return tips;
    }
    public Struct_double_230(int id,String rank,String reward,String tips) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.tips = tips;
    }
}