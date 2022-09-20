package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_215_天书升级表.xlsx
 */
public class Struct_booklv_215 {
    /**等级*/
    private int lv;
    /**阶数*/
    private String jie;
    /**属性
	 * Administrator:
	 * 碎片编号：
	 * 402A01
	 * A为种族：
	 * 1.人族
	 * 2.妖族
	 * 3.仙族*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**升级经验*/
    private int exp;
    /**
     * 等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 阶数
     */
    public String getJie() {
        return jie;
    }
    /**
     * 属性
	 * Administrator:
	 * 碎片编号：
	 * 402A01
	 * A为种族：
	 * 1.人族
	 * 2.妖族
	 * 3.仙族
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
     */
    public int getExp() {
        return exp;
    }
    public Struct_booklv_215(int lv,String jie,String attr,int power,int exp) {
        this.lv = lv;
        this.jie = jie;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.exp = exp;
    }
}