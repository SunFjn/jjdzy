package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_278_分享-累计分享表.xlsx
 */
public class Struct_ljfx_278 {
    /**id*/
    private int id;
    /**分享次数*/
    private int time;
    /**奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 分享次数
     */
    public int getTime() {
        return time;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_ljfx_278(int id,int time,String reward) {
        this.id = id;
        this.time = time;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}