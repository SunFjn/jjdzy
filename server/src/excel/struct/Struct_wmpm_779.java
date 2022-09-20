package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_779_新活动_武庙排名表.xlsx
 */
public class Struct_wmpm_779 {
    /**id
	 * Administrator:
	 * AXX
	 * A:期数
	 * XX：排序*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**排名奖励*/
    private int[][] reward1;
    /**
     * id
	 * Administrator:
	 * AXX
	 * A:期数
	 * XX：排序
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
     * 排名奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    public Struct_wmpm_779(int id,String rank,String reward1) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
    }
}