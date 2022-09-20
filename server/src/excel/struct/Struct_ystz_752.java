package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_752_异兽录套装表.xlsx
 */
public class Struct_ystz_752 {
    /**等级
	 * 1XXX：穷奇
	 * 2XXX：天狗
	 * 3XXX：麒麟
	 * 4XXX：毕方
	 * 5XXX：虎蛟
	 * 6XXX：狰
	 * 7XXX：九尾狐
	 * 8XXX：白泽*/
    private int lv;
    /**类型*/
    private int lx;
    /**阶数要求
	 * 对应升级表*/
    private int next;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**
     * 等级
	 * 1XXX：穷奇
	 * 2XXX：天狗
	 * 3XXX：麒麟
	 * 4XXX：毕方
	 * 5XXX：虎蛟
	 * 6XXX：狰
	 * 7XXX：九尾狐
	 * 8XXX：白泽
     */
    public int getLv() {
        return lv;
    }
    /**
     * 类型
     */
    public int getLx() {
        return lx;
    }
    /**
     * 阶数要求
	 * 对应升级表
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
    public Struct_ystz_752(int lv,int lx,int next,String attr,int power) {
        this.lv = lv;
        this.lx = lx;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
    }
}