package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_752_异兽录升级表.xlsx
 */
public class Struct_yssj_752 {
    /**等级
	 * 1XXXXX：穷奇
	 * 2XXXXX：天狗
	 * 3XXXXX：麒麟
	 * 4XXXXX：毕方
	 * 5XXXXX：虎蛟
	 * 6XXXXX：狰
	 * 7XXXXX：九尾狐
	 * 8XXXXX：白泽*/
    private int lv;
    /**下一级*/
    private int next;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**经验
	 * 消耗异兽灵元丹，每颗灵元丹10点经验*/
    private int exp;
    /**进阶*/
    private int[][] jj;
    /**
     * 等级
	 * 1XXXXX：穷奇
	 * 2XXXXX：天狗
	 * 3XXXXX：麒麟
	 * 4XXXXX：毕方
	 * 5XXXXX：虎蛟
	 * 6XXXXX：狰
	 * 7XXXXX：九尾狐
	 * 8XXXXX：白泽
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
     * 经验
	 * 消耗异兽灵元丹，每颗灵元丹10点经验
     */
    public int getExp() {
        return exp;
    }
    /**
     * 进阶
     */
    public int[][] getJj() {
        return jj;
    }
    public Struct_yssj_752(int lv,int next,String attr,int power,int exp,String jj) {
        this.lv = lv;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.exp = exp;
        this.jj = ExcelJsonUtils.toObj(jj,int[][].class);
    }
}