package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_292_天命升品表.xlsx
 */
public class Struct_tmpin_292 {
    /**id
	 * 1开头：厚土天命+品质id
	 * 2开头：玄水天命+品质id
	 * 3开头：烈火天命+品质id
	 * 4开头：狂风天命+品质id
	 * 5开头：太阴天命+品质id
	 * 6开头：太阳天命+品质id*/
    private int id;
    /**下一级*/
    private int next;
    /**升级消耗*/
    private int[][] consume;
    /**属性*/
    private int[][] attr;
    /**升下一品需要等级*/
    private int lv;
    /**
     * id
	 * 1开头：厚土天命+品质id
	 * 2开头：玄水天命+品质id
	 * 3开头：烈火天命+品质id
	 * 4开头：狂风天命+品质id
	 * 5开头：太阴天命+品质id
	 * 6开头：太阳天命+品质id
     */
    public int getId() {
        return id;
    }
    /**
     * 下一级
     */
    public int getNext() {
        return next;
    }
    /**
     * 升级消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 升下一品需要等级
     */
    public int getLv() {
        return lv;
    }
    public Struct_tmpin_292(int id,int next,String consume,String attr,int lv) {
        this.id = id;
        this.next = next;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.lv = lv;
    }
}