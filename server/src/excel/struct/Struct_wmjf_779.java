package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_779_新活动_武庙积分目标.xlsx
 */
public class Struct_wmjf_779 {
    /**id
	 * jingyu:
	 * AXX
	 * A=期数
	 * B=排序*/
    private int id;
    /**积分要求*/
    private int point;
    /**奖励*/
    private int[][] reward;
    /**
     * id
	 * jingyu:
	 * AXX
	 * A=期数
	 * B=排序
     */
    public int getId() {
        return id;
    }
    /**
     * 积分要求
     */
    public int getPoint() {
        return point;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_wmjf_779(int id,int point,String reward) {
        this.id = id;
        this.point = point;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}