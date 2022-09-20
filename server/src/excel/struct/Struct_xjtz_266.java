package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-266-兽魂星宿套装表.xlsx
 */
public class Struct_xjtz_266 {
    /**等级
	 * 10XX：青龙
	 * 11XX：白虎
	 * 12XX：朱雀
	 * 13XX：玄武*/
    private int lv;
    /**类型
	 * 1：青龙
	 * 2：白虎
	 * 3：朱雀
	 * 4：玄武*/
    private int lx;
    /**阶数要求*/
    private int next;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**
     * 等级
	 * 10XX：青龙
	 * 11XX：白虎
	 * 12XX：朱雀
	 * 13XX：玄武
     */
    public int getLv() {
        return lv;
    }
    /**
     * 类型
	 * 1：青龙
	 * 2：白虎
	 * 3：朱雀
	 * 4：玄武
     */
    public int getLx() {
        return lx;
    }
    /**
     * 阶数要求
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
    public Struct_xjtz_266(int lv,int lx,int next,String attr,int power) {
        this.lv = lv;
        this.lx = lx;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
    }
}