package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J-270-奖励找回表.xlsx
 */
public class Struct_rewardback_270 {
    /**id*/
    private int id;
    /**所属系统*/
    private int sys;
    /**子副本*/
    private int fb;
    /**奖励*/
    private int[][] reward;
    /**铜钱消耗*/
    private int[][] conmuse;
    /**元宝消耗*/
    private int[][] conmuse1;
    /**系数（十万比）*/
    private int xs;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 所属系统
     */
    public int getSys() {
        return sys;
    }
    /**
     * 子副本
     */
    public int getFb() {
        return fb;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 铜钱消耗
     */
    public int[][] getConmuse() {
        return conmuse;
    }
    /**
     * 元宝消耗
     */
    public int[][] getConmuse1() {
        return conmuse1;
    }
    /**
     * 系数（十万比）
     */
    public int getXs() {
        return xs;
    }
    public Struct_rewardback_270(int id,int sys,int fb,String reward,String conmuse,String conmuse1,int xs) {
        this.id = id;
        this.sys = sys;
        this.fb = fb;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.conmuse = ExcelJsonUtils.toObj(conmuse,int[][].class);
        this.conmuse1 = ExcelJsonUtils.toObj(conmuse1,int[][].class);
        this.xs = xs;
    }
}