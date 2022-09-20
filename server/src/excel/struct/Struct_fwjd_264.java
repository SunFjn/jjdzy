package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_264_符文鉴定表.xlsx
 */
public class Struct_fwjd_264 {
    /**id*/
    private int id;
    /**次数*/
    private int time;
    /**奖励*/
    private int[][] reward;
    /**期数
	 * 1 8-14天
	 * 2 15-21天
	 * 3 22-28天*/
    private int qs;
    /**
     * id
     */
    public int getId() {
        return id;
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
    /**
     * 期数
	 * 1 8-14天
	 * 2 15-21天
	 * 3 22-28天
     */
    public int getQs() {
        return qs;
    }
    public Struct_fwjd_264(int id,int time,String reward,int qs) {
        this.id = id;
        this.time = time;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.qs = qs;
    }
}