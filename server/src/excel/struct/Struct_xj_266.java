package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-266-兽魂二十八宿表.xlsx
 */
public class Struct_xj_266 {
    /**等级
	 * 1XXXXX：青龙
	 * 2XXXXX：白虎
	 * 3XXXXX：朱雀
	 * 4XXXXX：玄武*/
    private int lv;
    /**下一级*/
    private int next;
    /**消耗*/
    private int[][] cost;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**
     * 等级
	 * 1XXXXX：青龙
	 * 2XXXXX：白虎
	 * 3XXXXX：朱雀
	 * 4XXXXX：玄武
     */
    public int getLv() {
        return lv;
    }
    /**
     * 下一级
     */
    public int getNext() {
        return next;
    }
    /**
     * 消耗
     */
    public int[][] getCost() {
        return cost;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 战力
     */
    public int getPower() {
        return power;
    }
    public Struct_xj_266(int lv,int next,String cost,String attr,int power) {
        this.lv = lv;
        this.next = next;
        this.cost = ExcelJsonUtils.toObj(cost,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
    }
}