package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_225_单刀赴会排行表.xlsx
 */
public class Struct_ddfhrank_225 {
    /**索引id
	 * jingyu:
	 * 1XX：本服
	 * 2XX：跨服*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**奖励*/
    private int[][] reward;
    /**
     * 索引id
	 * jingyu:
	 * 1XX：本服
	 * 2XX：跨服
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
    public Struct_ddfhrank_225(int id,String rank,String reward) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}