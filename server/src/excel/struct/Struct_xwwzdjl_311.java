package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_311_新王位争夺奖励表.xlsx
 */
public class Struct_xwwzdjl_311 {
    /**官位
	 * XXX1：王
	 * XXX2：相
	 * XXX3：大将军
	 * XXX4：皇城侍卫
	 * XXX5：平民
	 * 1XXX：魏国
	 * 2XXX：蜀国
	 * 3XXX：吴国*/
    private int num;
    /**每日宝箱俸禄奖励*/
    private int[][] reward;
    /**
     * 官位
	 * XXX1：王
	 * XXX2：相
	 * XXX3：大将军
	 * XXX4：皇城侍卫
	 * XXX5：平民
	 * 1XXX：魏国
	 * 2XXX：蜀国
	 * 3XXX：吴国
     */
    public int getNum() {
        return num;
    }
    /**
     * 每日宝箱俸禄奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_xwwzdjl_311(int num,String reward) {
        this.num = num;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}