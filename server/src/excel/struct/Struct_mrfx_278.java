package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_278_分享-每日分享表.xlsx
 */
public class Struct_mrfx_278 {
    /**id*/
    private int id;
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
    public Struct_mrfx_278(int id,String time,String reward) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.reward = reward;
    }
}