package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_293_新活动财神送礼表.xlsx
 */
public class Struct_moneygod_293 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**抽奖次数区间*/
    private int[][] qj;
    /**奖励*/
    private String reward;
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
     * 抽奖次数区间
     */
    public int[][] getQj() {
        return qj;
    }
    /**
     * 奖励
     */
    public String getReward() {
        return reward;
    }
    public Struct_moneygod_293(int id,int qs,String qj,String reward) {
        this.id = id;
        this.qs = qs;
        this.qj = ExcelJsonUtils.toObj(qj,int[][].class);
        this.reward = reward;
    }
}