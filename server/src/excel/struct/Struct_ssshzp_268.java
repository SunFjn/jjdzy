package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-268-圣兽降临-圣兽转盘表.xlsx
 */
public class Struct_ssshzp_268 {
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
    public Struct_ssshzp_268(int id,String time,String reward) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.reward = reward;
    }
}