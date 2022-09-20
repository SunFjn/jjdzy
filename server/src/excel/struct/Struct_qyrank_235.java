package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_235_群英排名表.xlsx
 */
public class Struct_qyrank_235 {
    /**id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**周1排名奖励*/
    private int[][] reward1;
    /**周2排名奖励*/
    private int[][] reward2;
    /**周3排名奖励*/
    private int[][] reward3;
    /**周4排名奖励*/
    private int[][] reward4;
    /**周5排名奖励*/
    private int[][] reward5;
    /**周6排名奖励*/
    private int[][] reward6;
    /**周日排名奖励*/
    private int[][] reward7;
    /**
     * id
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
     * 周1排名奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 周2排名奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 周3排名奖励
     */
    public int[][] getReward3() {
        return reward3;
    }
    /**
     * 周4排名奖励
     */
    public int[][] getReward4() {
        return reward4;
    }
    /**
     * 周5排名奖励
     */
    public int[][] getReward5() {
        return reward5;
    }
    /**
     * 周6排名奖励
     */
    public int[][] getReward6() {
        return reward6;
    }
    /**
     * 周日排名奖励
     */
    public int[][] getReward7() {
        return reward7;
    }
    public Struct_qyrank_235(int id,String rank,String reward1,String reward2,String reward3,String reward4,String reward5,String reward6,String reward7) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.reward3 = ExcelJsonUtils.toObj(reward3,int[][].class);
        this.reward4 = ExcelJsonUtils.toObj(reward4,int[][].class);
        this.reward5 = ExcelJsonUtils.toObj(reward5,int[][].class);
        this.reward6 = ExcelJsonUtils.toObj(reward6,int[][].class);
        this.reward7 = ExcelJsonUtils.toObj(reward7,int[][].class);
    }
}