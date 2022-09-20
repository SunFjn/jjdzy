package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_273_群雄逐鹿排名奖励表.xlsx
 */
public class Struct_qxzlrank_273 {
    /**id
	 * 1XX：国家排名
	 * 2XX：国家内部排名
	 * 3XX：所有人个人排名*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**奖励*/
    private int[][] reward;
    /**
     * id
	 * 1XX：国家排名
	 * 2XX：国家内部排名
	 * 3XX：所有人个人排名
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
    public Struct_qxzlrank_273(int id,String rank,String reward) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}