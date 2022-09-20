package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_729藏宝阁排名表1.xlsx
 */
public class Struct_cbgrank1_729 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**排名*/
    private int[][] rank;
    /**普通奖励*/
    private int[][] reward1;
    /**特殊奖励*/
    private int[][] reward2;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 排名
     */
    public int[][] getRank() {
        return rank;
    }
    /**
     * 普通奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 特殊奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    public Struct_cbgrank1_729(int id,int qs,String rank,String reward1,String reward2) {
        this.id = id;
        this.qs = qs;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
    }
}