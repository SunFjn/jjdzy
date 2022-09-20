package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_013_分享.xlsx
 */
public class Struct_fenxiang_013 {
    /**编号*/
    private int id;
    /**分享奖励*/
    private int[][] reward;
    /**任务ID*/
    private int renwu;
    /**
     * 编号
     */
    public int getId() {
        return id;
    }
    /**
     * 分享奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 任务ID
     */
    public int getRenwu() {
        return renwu;
    }
    public Struct_fenxiang_013(int id,String reward,int renwu) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.renwu = renwu;
    }
}