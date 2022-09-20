package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-261-三国庆典-豪礼转盘目标表.xlsx
 */
public class Struct_sgzpmb_261 {
    /**索引id*/
    private int id;
    /**活动期数*/
    private int qs;
    /**需转盘次数*/
    private int time;
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
     * 需转盘次数
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
    public Struct_sgzpmb_261(int id,int qs,int time,String reward) {
        this.id = id;
        this.qs = qs;
        this.time = time;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}