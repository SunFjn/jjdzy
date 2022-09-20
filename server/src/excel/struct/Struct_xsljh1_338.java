package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_338_犒赏三军激活表.xlsx
 */
public class Struct_xsljh1_338 {
    /**期数*/
    private int qs;
    /**激活高级悬赏奖励*/
    private int[][] reward;
    /**充值id*/
    private int cz;
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 激活高级悬赏奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 充值id
     */
    public int getCz() {
        return cz;
    }
    public Struct_xsljh1_338(int qs,String reward,int cz) {
        this.qs = qs;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.cz = cz;
    }
}