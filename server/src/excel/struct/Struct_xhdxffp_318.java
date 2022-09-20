package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_318_新活动消费翻牌表.xlsx
 */
public class Struct_xhdxffp_318 {
    /**id*/
    private int id;
    /**转盘次数*/
    private int[][] time;
    /**奖励
	 * A,B,C,D,E
	 * A=类型
	 * B=id
	 * C=数量
	 * D=是否大奖，0否，1是
	 * E=顺序*/
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
     * 转盘次数
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
	 * D=是否大奖，0否，1是
	 * E=顺序
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
    public Struct_xhdxffp_318(int id,String time,String reward,int qs) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.qs = qs;
    }
}