package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_737_连续消费大奖表(8-28).xlsx
 */
public class Struct_lxxfreward3_737 {
    /**id
	 * 1XXX
	 * 1=期数
	 * 尾数=天数
	 * 1期:8-14
	 * 2期：15-21
	 * 3期：22-28*/
    private int id;
    /**奖励*/
    private int[][] reward;
    /**
     * id
	 * 1XXX
	 * 1=期数
	 * 尾数=天数
	 * 1期:8-14
	 * 2期：15-21
	 * 3期：22-28
     */
    public int getId() {
        return id;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_lxxfreward3_737(int id,String reward) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}