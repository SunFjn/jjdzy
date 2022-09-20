package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_254_烽火狼烟排名奖励表.xlsx
 */
public class Struct_fhlyreward_254 {
    /**id
	 * 1X：区服排名
	 * 2X：个人排名*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**奖励*/
    private int[][] reward;
    /**
     * id
	 * 1X：区服排名
	 * 2X：个人排名
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
    public Struct_fhlyreward_254(int id,String rank,String reward) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}