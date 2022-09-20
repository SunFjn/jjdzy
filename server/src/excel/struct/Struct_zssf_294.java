package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_294_镇守四方表.xlsx
 */
public class Struct_zssf_294 {
    /**id*/
    private int id;
    /**轮回开启条件*/
    private int lh;
    /**vip开启条件*/
    private int vip;
    /**镇守时长（秒）*/
    private int time;
    /**每10分钟奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 轮回开启条件
     */
    public int getLh() {
        return lh;
    }
    /**
     * vip开启条件
     */
    public int getVip() {
        return vip;
    }
    /**
     * 镇守时长（秒）
     */
    public int getTime() {
        return time;
    }
    /**
     * 每10分钟奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_zssf_294(int id,int lh,int vip,int time,String reward) {
        this.id = id;
        this.lh = lh;
        this.vip = vip;
        this.time = time;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}