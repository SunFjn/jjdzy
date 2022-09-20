package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_222_三国战神奖励表.xlsx
 */
public class Struct_warreward_222 {
    /**索引id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**排名奖励（0点邮件）*/
    private int[][] reward1;
    /**晋升奖励（历史排名奖励）
	 * jingyu:
	 * 每上升1名就给1份对应的元宝奖励*/
    private int[][] reward2;
    /**挑战胜利奖励*/
    private int[][] reward3;
    /**挑战失败奖励*/
    private int[][] reward4;
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
     * 排名奖励（0点邮件）
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 晋升奖励（历史排名奖励）
	 * jingyu:
	 * 每上升1名就给1份对应的元宝奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 挑战胜利奖励
     */
    public int[][] getReward3() {
        return reward3;
    }
    /**
     * 挑战失败奖励
     */
    public int[][] getReward4() {
        return reward4;
    }
    public Struct_warreward_222(int id,String rank,String reward1,String reward2,String reward3,String reward4) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.reward3 = ExcelJsonUtils.toObj(reward3,int[][].class);
        this.reward4 = ExcelJsonUtils.toObj(reward4,int[][].class);
    }
}