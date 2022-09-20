package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_232_乱世枭雄积分表.xlsx
 */
public class Struct_lsxxbp_232 {
    /**id*/
    private int id;
    /**积分*/
    private int bp;
    /**奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 积分
     */
    public int getBp() {
        return bp;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_lsxxbp_232(int id,int bp,String reward) {
        this.id = id;
        this.bp = bp;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}