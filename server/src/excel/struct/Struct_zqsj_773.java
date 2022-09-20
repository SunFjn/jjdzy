package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_773_坐骑升级表.xlsx
 */
public class Struct_zqsj_773 {
    /**等级
	 * 品质*100000+等级
	 * */
    private int lv;
    /**下一级*/
    private int next;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**升级消耗
	 * 每10级升阶一次*/
    private int[][] exp;
    /**
     * 等级
	 * 品质*100000+等级
	 * 
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
    /**
     * 升级消耗
	 * 每10级升阶一次
     */
    public int[][] getExp() {
        return exp;
    }
    public Struct_zqsj_773(int lv,int next,String attr,int power,String exp) {
        this.lv = lv;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.exp = ExcelJsonUtils.toObj(exp,int[][].class);
    }
}