package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_508_新活动-幸运福签每日目标表.xlsx
 */
public class Struct_xyfqmr_508 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**次数*/
    private int time;
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
     * 次数
     */
    public int getTime() {
        return time;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_xyfqmr_508(int id,int qs,int time,String reward) {
        this.id = id;
        this.qs = qs;
        this.time = time;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}