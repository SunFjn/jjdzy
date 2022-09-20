package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_750_专属神兵-淬炼表.xlsx
 */
public class Struct_sbcl_750 {
    /**等级
	 * Windows 用户:
	 * 
	 * Axxxx
	 * A：品质
	 * xxxx：等级*/
    private int lv;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**升级经验
	 * Windows 用户:
	 * 
	 * 一颗淬炼丹加10点经验*/
    private int exp;
    /**升阶条件
	 * Windows 用户:
	 * 
	 * 对应神兵所需星级*/
    private int tiaojian;
    /**
     * 等级
	 * Windows 用户:
	 * 
	 * Axxxx
	 * A：品质
	 * xxxx：等级
     */
    public int getLv() {
        return lv;
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
     * 升级经验
	 * Windows 用户:
	 * 
	 * 一颗淬炼丹加10点经验
     */
    public int getExp() {
        return exp;
    }
    /**
     * 升阶条件
	 * Windows 用户:
	 * 
	 * 对应神兵所需星级
     */
    public int getTiaojian() {
        return tiaojian;
    }
    public Struct_sbcl_750(int lv,String attr,int power,int exp,int tiaojian) {
        this.lv = lv;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.exp = exp;
        this.tiaojian = tiaojian;
    }
}