package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_235_群英积分表.xlsx
 */
public class Struct_qypoint_235 {
    /**id
	 * jingyu:
	 * AXX
	 * A=群英榜id
	 * B=排序*/
    private int hb;
    /**积分要求*/
    private int point;
    /**奖励*/
    private int[][] reward;
    /**
     * id
	 * jingyu:
	 * AXX
	 * A=群英榜id
	 * B=排序
     */
    public int getHb() {
        return hb;
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
    public Struct_qypoint_235(int hb,int point,String reward) {
        this.hb = hb;
        this.point = point;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}