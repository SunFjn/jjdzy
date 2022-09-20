package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_260_问鼎天下排名奖励表.xlsx
 */
public class Struct_wdtxrank_260 {
    /**索引id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**奖励*/
    private int[][] reward;
    /**区分
	 * 1 本服时排名奖励
	 * 2 跨服时排名奖励*/
    private int qf;
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
     * 区分
	 * 1 本服时排名奖励
	 * 2 跨服时排名奖励
     */
    public int getQf() {
        return qf;
    }
    public Struct_wdtxrank_260(int id,String rank,String reward,int qf) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.qf = qf;
    }
}