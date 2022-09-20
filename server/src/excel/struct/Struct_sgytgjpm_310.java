package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_310_三国一统国家排名表.xlsx
 */
public class Struct_sgytgjpm_310 {
    /**索引id*/
    private int id;
    /**排名*/
    private int rank;
    /**本服国王专属奖励*/
    private int[][] reward1;
    /**本服所有人奖励*/
    private int[][] reward2;
    /**本服战利品奖励*/
    private int[][] reward3;
    /**跨服国王专属奖励*/
    private int[][] reward4;
    /**跨服所有人奖励*/
    private int[][] reward5;
    /**跨服战利品奖励*/
    private int[][] reward6;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 排名
     */
    public int getRank() {
        return rank;
    }
    /**
     * 本服国王专属奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 本服所有人奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 本服战利品奖励
     */
    public int[][] getReward3() {
        return reward3;
    }
    /**
     * 跨服国王专属奖励
     */
    public int[][] getReward4() {
        return reward4;
    }
    /**
     * 跨服所有人奖励
     */
    public int[][] getReward5() {
        return reward5;
    }
    /**
     * 跨服战利品奖励
     */
    public int[][] getReward6() {
        return reward6;
    }
    public Struct_sgytgjpm_310(int id,int rank,String reward1,String reward2,String reward3,String reward4,String reward5,String reward6) {
        this.id = id;
        this.rank = rank;
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.reward3 = ExcelJsonUtils.toObj(reward3,int[][].class);
        this.reward4 = ExcelJsonUtils.toObj(reward4,int[][].class);
        this.reward5 = ExcelJsonUtils.toObj(reward5,int[][].class);
        this.reward6 = ExcelJsonUtils.toObj(reward6,int[][].class);
    }
}