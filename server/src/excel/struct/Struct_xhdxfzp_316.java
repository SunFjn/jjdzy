package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_316_新活动消费转盘表.xlsx
 */
public class Struct_xhdxfzp_316 {
    /**id*/
    private int id;
    /**转盘次数*/
    private int[][] time;
    /**奖励*/
    private String reward;
    /**期数*/
    private int qs;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 转盘次数
     */
    public int[][] getTime() {
        return time;
    }
    /**
     * 奖励
     */
    public String getReward() {
        return reward;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_xhdxfzp_316(int id,String time,String reward,int qs) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.reward = reward;
        this.qs = qs;
    }
}