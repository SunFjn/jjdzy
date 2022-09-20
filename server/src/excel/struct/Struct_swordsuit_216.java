package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_216_神剑羁绊表.xlsx
 */
public class Struct_swordsuit_216 {
    /**套装id
	 * 
	 * 1XXX
	 * 1=id
	 * XXX=等级*/
    private int suitid;
    /**套装名字
	 * jingyu:
	 * 
	 * [A,B]
	 * A=战甲id
	 * B=战甲星级*/
    private String name;
    /**条件
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
    private int[][] item;
    /**羁绊属性*/
    private int[][] attr1;
    /**属性加成（十万分比）*/
    private int jc;
    /**
     * 套装id
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
	 * jingyu:
	 * 
	 * [A,B]
	 * A=战甲id
	 * B=战甲星级
     */
    public String getName() {
        return name;
    }
    /**
     * 条件
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
    public int[][] getItem() {
        return item;
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
    public Struct_swordsuit_216(int suitid,String name,String condition,String attr,int power,String item,String attr1,int jc) {
        this.suitid = suitid;
        this.name = name;
        this.condition = ExcelJsonUtils.toObj(condition,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.attr1 = ExcelJsonUtils.toObj(attr1,int[][].class);
        this.jc = jc;
    }
}