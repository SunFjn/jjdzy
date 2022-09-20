package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_288_新活动_神将现世排名表.xlsx
 */
public class Struct_godrank_288 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
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
     * 期数
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
    public Struct_godrank_288(int id,int qs,String rank,String reward) {
        this.id = id;
        this.qs = qs;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}