package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_757_新活动_限定武将-活跃奖.xlsx
 */
public class Struct_xdwjhy_757 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**活跃值*/
    private int hy;
    /**奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 活跃值
     */
    public int getHy() {
        return hy;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_xdwjhy_757(int id,int qs,int hy,String reward) {
        this.id = id;
        this.qs = qs;
        this.hy = hy;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}