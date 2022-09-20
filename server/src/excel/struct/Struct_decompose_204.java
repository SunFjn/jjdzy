package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_246_分解表.xlsx
 */
public class Struct_decompose_204 {
    /**id*/
    private int id;
    /**道具类型
	 * 
	 * 1 道具
	 * 2 装备
	 * */
    private int type;
    /**分解消耗*/
    private int[][] consume;
    /**分解奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 道具类型
	 * 
	 * 1 道具
	 * 2 装备
	 * 
     */
    public int getType() {
        return type;
    }
    /**
     * 分解消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 分解奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_decompose_204(int id,int type,String consume,String reward) {
        this.id = id;
        this.type = type;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}