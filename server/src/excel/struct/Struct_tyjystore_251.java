package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_251_桃园结义商店表.xlsx
 */
public class Struct_tyjystore_251 {
    /**id*/
    private int id;
    /**奖励道具*/
    private int[][] reward;
    /**消耗道具*/
    private int[][] consume;
    /**限购次数*/
    private int time;
    /**商店等级*/
    private int vip;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 奖励道具
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 消耗道具
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 限购次数
     */
    public int getTime() {
        return time;
    }
    /**
     * 商店等级
     */
    public int getVip() {
        return vip;
    }
    public Struct_tyjystore_251(int id,String reward,String consume,int time,int vip) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.time = time;
        this.vip = vip;
    }
}