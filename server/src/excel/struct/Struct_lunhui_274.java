package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_274_轮回表.xlsx
 */
public class Struct_lunhui_274 {
    /**id*/
    private int id;
    /**下个id*/
    private int next;
    /**轮回需要等级*/
    private int lv;
    /**消耗*/
    private int[][] conmuse;
    /**属性*/
    private int[][] attr;
    /**奖励*/
    private int[][] reward;
    /**升级经验系数
	 * 百分比，向上取整*/
    private int exp;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 下个id
     */
    public int getNext() {
        return next;
    }
    /**
     * 轮回需要等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 消耗
     */
    public int[][] getConmuse() {
        return conmuse;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 升级经验系数
	 * 百分比，向上取整
     */
    public int getExp() {
        return exp;
    }
    public Struct_lunhui_274(int id,int next,int lv,String conmuse,String attr,String reward,int exp) {
        this.id = id;
        this.next = next;
        this.lv = lv;
        this.conmuse = ExcelJsonUtils.toObj(conmuse,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.exp = exp;
    }
}