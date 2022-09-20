package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_233_枭雄争霸表.xlsx
 */
public class Struct_xxzb_233 {
    /**索引id
	 * jingyu:
	 * AB
	 * A=转生区间id
	 *   见乱世枭雄跨服表
	 * B=奖励id
	 *   1：冠军奖励
	 *   2：亚军奖励
	 *   3：4强奖励
	 *   4：8强奖励
	 *   5：16强奖励*/
    private int id;
    /**奖励*/
    private int[][] reward;
    /**
     * 索引id
	 * jingyu:
	 * AB
	 * A=转生区间id
	 *   见乱世枭雄跨服表
	 * B=奖励id
	 *   1：冠军奖励
	 *   2：亚军奖励
	 *   3：4强奖励
	 *   4：8强奖励
	 *   5：16强奖励
     */
    public int getId() {
        return id;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_xxzb_233(int id,String reward) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}