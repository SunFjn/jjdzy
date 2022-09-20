package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_338_犒赏三军表.xlsx
 */
public class Struct_kssj1_338 {
    /**ID*/
    private int id;
    /**期数*/
    private int qs;
    /**犒赏等级*/
    private int lv;
    /**升级经验*/
    private int exp;
    /**犒赏奖励*/
    private int[][] reward;
    /**高级犒赏奖励*/
    private int[][] reward1;
    /**是否大奖*/
    private int dj;
    /**
     * ID
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
     * 犒赏等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 升级经验
     */
    public int getExp() {
        return exp;
    }
    /**
     * 犒赏奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 高级犒赏奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 是否大奖
     */
    public int getDj() {
        return dj;
    }
    public Struct_kssj1_338(int id,int qs,int lv,int exp,String reward,String reward1,int dj) {
        this.id = id;
        this.qs = qs;
        this.lv = lv;
        this.exp = exp;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.dj = dj;
    }
}