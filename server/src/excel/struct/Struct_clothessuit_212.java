package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_212_战甲套装表.xlsx
 */
public class Struct_clothessuit_212 {
    /**套装id
	 * jingyu:
	 * 
	 * 1XXX
	 * 1=id
	 * XXX=等级*/
    private int suitid;
    /**套装名字*/
    private String name;
    /**条件
	 * jingyu:
	 * 
	 * [A,B]
	 * A=战甲id
	 * B=战甲星级*/
    private int[][] condition;
    /**属性*/
    private int[][] attr;
    /**战力*/
    private int power;
    /**升阶道具*/
    private int[][] consume;
    /**羁绊属性*/
    private int[][] attr1;
    /**属性加成（十万分比）*/
    private int jc;
    /**
     * 套装id
	 * jingyu:
	 * 
	 * 1XXX
	 * 1=id
	 * XXX=等级
     */
    public int getSuitid() {
        return suitid;
    }
    /**
     * 套装名字
     */
    public String getName() {
        return name;
    }
    /**
     * 条件
	 * jingyu:
	 * 
	 * [A,B]
	 * A=战甲id
	 * B=战甲星级
     */
    public int[][] getCondition() {
        return condition;
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
     * 升阶道具
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 羁绊属性
     */
    public int[][] getAttr1() {
        return attr1;
    }
    /**
     * 属性加成（十万分比）
     */
    public int getJc() {
        return jc;
    }
    public Struct_clothessuit_212(int suitid,String name,String condition,String attr,int power,String consume,String attr1,int jc) {
        this.suitid = suitid;
        this.name = name;
        this.condition = ExcelJsonUtils.toObj(condition,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.attr1 = ExcelJsonUtils.toObj(attr1,int[][].class);
        this.jc = jc;
    }
}