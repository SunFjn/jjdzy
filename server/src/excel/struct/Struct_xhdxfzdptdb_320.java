package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_320_新活动-消费砸蛋普通蛋表.xlsx
 */
public class Struct_xhdxfzdptdb_320 {
    /**id*/
    private int id;
    /**普通砸蛋次数*/
    private int[][] time;
    /**奖励
	 * A,B,C,D,E
	 * A=类型
	 * B=id
	 * C=数量
	 * D=概率*/
    private int[][] reward;
    /**期数*/
    private int qs;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 普通砸蛋次数
     */
    public int[][] getTime() {
        return time;
    }
    /**
     * 奖励
	 * A,B,C,D,E
	 * A=类型
	 * B=id
	 * C=数量
	 * D=概率
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_xhdxfzdptdb_320(int id,String time,String reward,int qs) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.qs = qs;
    }
}