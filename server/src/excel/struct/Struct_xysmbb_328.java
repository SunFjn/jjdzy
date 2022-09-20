package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_328_新活动许愿树目标表.xlsx
 */
public class Struct_xysmbb_328 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**所需次数*/
    private int cs;
    /**奖励*/
    private int[][] reward;
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
     * 所需次数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_xysmbb_328(int id,int qs,int cs,String reward) {
        this.id = id;
        this.qs = qs;
        this.cs = cs;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}