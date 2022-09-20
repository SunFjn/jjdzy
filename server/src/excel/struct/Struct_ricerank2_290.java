package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_290_粮草争夺排名表2.xlsx
 */
public class Struct_ricerank2_290 {
    /**id*/
    private int id;
    /**个人排名*/
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
     * 个人排名
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
    public Struct_ricerank2_290(int id,String rank,String reward) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}