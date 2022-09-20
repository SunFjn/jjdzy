package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_281_新活动-充值转盘表.xlsx
 */
public class Struct_czzp_281 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**转盘次数*/
    private int[][] time;
    /**奖励
	 * A,B
	 * A=位置
	 * B=概率*/
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
     * 转盘次数
     */
    public int[][] getTime() {
        return time;
    }
    /**
     * 奖励
	 * A,B
	 * A=位置
	 * B=概率
     */
    public String getReward() {
        return reward;
    }
    public Struct_czzp_281(int id,int qs,String time,String reward) {
        this.id = id;
        this.qs = qs;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.reward = reward;
    }
}