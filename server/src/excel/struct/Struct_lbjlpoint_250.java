package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_250_吕布降临积分表.xlsx
 */
public class Struct_lbjlpoint_250 {
    /**索引id*/
    private int id;
    /**积分*/
    private int point;
    /**排名奖励*/
    private int[][] reward;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 积分
     */
    public int getPoint() {
        return point;
    }
    /**
     * 排名奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_lbjlpoint_250(int id,int point,String reward) {
        this.id = id;
        this.point = point;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}