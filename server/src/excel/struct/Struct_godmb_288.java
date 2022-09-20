package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_288_新活动_神将现世目标表.xlsx
 */
public class Struct_godmb_288 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**抽奖次数*/
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
     * 抽奖次数
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
    public Struct_godmb_288(int id,int qs,int time,String reward) {
        this.id = id;
        this.qs = qs;
        this.time = time;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}