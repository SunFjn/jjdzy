package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_316_消费转盘表.xlsx
 */
public class Struct_xfzp_316 {
    /**id*/
    private int id;
    /**转盘次数*/
    private int[][] time;
    /**奖励*/
    private String reward;
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
    public Struct_xfzp_316(int id,String time,String reward) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.reward = reward;
    }
}