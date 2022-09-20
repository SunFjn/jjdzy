package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_310_三国一统积分奖励表.xlsx
 */
public class Struct_sgytjfjl_310 {
    /**索引id*/
    private int id;
    /**个人积分*/
    private int point;
    /**本服奖励*/
    private int[][] reward;
    /**跨服奖励*/
    private int[][] reward1;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 个人积分
     */
    public int getPoint() {
        return point;
    }
    /**
     * 本服奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 跨服奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    public Struct_sgytjfjl_310(int id,int point,String reward,String reward1) {
        this.id = id;
        this.point = point;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
    }
}