package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_295_幸运扭蛋次数表.xlsx
 */
public class Struct_luckeggtime_295 {
    /**id*/
    private int id;
    /**次数*/
    private int[][] time;
    /**奖励
	 * A,B,C,D
	 * A=奖池1随机个数
	 * B=奖池2随机个数
	 * C=奖池3随机个数
	 * D=概率（十万分比）*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 次数
     */
    public int[][] getTime() {
        return time;
    }
    /**
     * 奖励
	 * A,B,C,D
	 * A=奖池1随机个数
	 * B=奖池2随机个数
	 * C=奖池3随机个数
	 * D=概率（十万分比）
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_luckeggtime_295(int id,String time,String reward) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}