package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_729藏宝阁目标表1.xlsx
 */
public class Struct_cbgmb1_729 {
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
    public Struct_cbgmb1_729(int id,int qs,int time,String reward) {
        this.id = id;
        this.qs = qs;
        this.time = time;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}