package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_251_桃园结义世外表.xlsx
 */
public class Struct_tyjyswty_251 {
    /**等级
	 * 1XXX：桃树
	 * 2XXX：商店
	 * */
    private int lv;
    /**升级积分*/
    private int lvup;
    /**奖励*/
    private int[][] reward;
    /**
     * 等级
	 * 1XXX：桃树
	 * 2XXX：商店
	 * 
     */
    public int getLv() {
        return lv;
    }
    /**
     * 升级积分
     */
    public int getLvup() {
        return lvup;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_tyjyswty_251(int lv,int lvup,String reward) {
        this.lv = lv;
        this.lvup = lvup;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}