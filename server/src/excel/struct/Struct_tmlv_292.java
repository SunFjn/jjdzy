package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_292_天命升级表.xlsx
 */
public class Struct_tmlv_292 {
    /**id
	 * 1开头：厚土天命
	 * 2开头：玄水天命
	 * 3开头：烈火天命
	 * 4开头：狂风天命
	 * 5开头：太阴天命
	 * 6开头：太阳天命*/
    private int id;
    /**下一级*/
    private int next;
    /**升级消耗*/
    private int[][] consume;
    /**属性*/
    private int[][] attr;
    /**需要品质*/
    private int pin;
    /**
     * id
	 * 1开头：厚土天命
	 * 2开头：玄水天命
	 * 3开头：烈火天命
	 * 4开头：狂风天命
	 * 5开头：太阴天命
	 * 6开头：太阳天命
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
     * 需要品质
     */
    public int getPin() {
        return pin;
    }
    public Struct_tmlv_292(int id,int next,String consume,String attr,int pin) {
        this.id = id;
        this.next = next;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.pin = pin;
    }
}