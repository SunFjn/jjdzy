package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_251_桃园结义BOSS表.xlsx
 */
public class Struct_tyjyboss_251 {
    /**BOSSid*/
    private int id;
    /**奖励*/
    private int[][] reward;
    /**开启消耗*/
    private int[][] consume;
    /**BOSS伤害*/
    private int shanghai;
    /**BOSS固伤*/
    private int guding;
    /**验证时间*/
    private int time;
    /**
     * BOSSid
     */
    public int getId() {
        return id;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 开启消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * BOSS伤害
     */
    public int getShanghai() {
        return shanghai;
    }
    /**
     * BOSS固伤
     */
    public int getGuding() {
        return guding;
    }
    /**
     * 验证时间
     */
    public int getTime() {
        return time;
    }
    public Struct_tyjyboss_251(int id,String reward,String consume,int shanghai,int guding,int time) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.shanghai = shanghai;
        this.guding = guding;
        this.time = time;
    }
}