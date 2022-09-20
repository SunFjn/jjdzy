package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_272_少主活动累计充值表.xlsx
 */
public class Struct_scljcz_272 {
    /**索引id*/
    private int id;
    /**累计充值rmb*/
    private int lj;
    /**奖励*/
    private int[][] reward;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 累计充值rmb
     */
    public int getLj() {
        return lj;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_scljcz_272(int id,int lj,String reward) {
        this.id = id;
        this.lj = lj;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}