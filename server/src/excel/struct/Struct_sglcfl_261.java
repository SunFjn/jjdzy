package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-261-三国庆典-累充返利表.xlsx
 */
public class Struct_sglcfl_261 {
    /**索引id*/
    private int id;
    /**活动期数*/
    private int qs;
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
     * 活动期数
     */
    public int getQs() {
        return qs;
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
    public Struct_sglcfl_261(int id,int qs,int lj,String reward) {
        this.id = id;
        this.qs = qs;
        this.lj = lj;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}