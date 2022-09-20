package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_328_新活动许愿树送礼表.xlsx
 */
public class Struct_xysslb_328 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**许愿次数*/
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
     * 许愿次数
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
    public Struct_xysslb_328(int id,int qs,int time,String reward) {
        this.id = id;
        this.qs = qs;
        this.time = time;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}