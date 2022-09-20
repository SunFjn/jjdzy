package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_506_登峰造极决赛排名表.xlsx
 */
public class Struct_dfzjjs1_261 {
    /**id*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**奖励*/
    private int[][] reward;
    /**挑战积分*/
    private int point;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 排名
     */
    public int[][] getRank() {
        return rank;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 挑战积分
     */
    public int getPoint() {
        return point;
    }
    public Struct_dfzjjs1_261(int id,String rank,String reward,int point) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.point = point;
    }
}