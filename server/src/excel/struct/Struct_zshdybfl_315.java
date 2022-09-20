package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_315_专属活动-元宝返利表.xlsx
 */
public class Struct_zshdybfl_315 {
    /**索引id*/
    private int id;
    /**期数*/
    private int qs;
    /**消耗*/
    private int[][] xh;
    /**奖励*/
    private int[][] reward;
    /**
     * 索引id
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
     * 消耗
     */
    public int[][] getXh() {
        return xh;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_zshdybfl_315(int id,int qs,String xh,String reward) {
        this.id = id;
        this.qs = qs;
        this.xh = ExcelJsonUtils.toObj(xh,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}