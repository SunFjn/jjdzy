package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_005_图鉴升星表.xlsx
 */
public class Struct_picstar_005 {
    /**索引*/
    private int index;
    /**图鉴ID*/
    private int id;
    /**星级*/
    private int lv;
    /**属性*/
    private int[][] attr;
    /**升星消耗*/
    private int[][] consume;
    /**等级上限*/
    private int lvmax;
    /**下一星级*/
    private int next;
    /**战力*/
    private int power;
    /**
     * 索引
     */
    public int getIndex() {
        return index;
    }
    /**
     * 图鉴ID
     */
    public int getId() {
        return id;
    }
    /**
     * 星级
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
     * 升星消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 等级上限
     */
    public int getLvmax() {
        return lvmax;
    }
    /**
     * 下一星级
     */
    public int getNext() {
        return next;
    }
    /**
     * 战力
     */
    public int getPower() {
        return power;
    }
    public Struct_picstar_005(int index,int id,int lv,String attr,String consume,int lvmax,int next,int power) {
        this.index = index;
        this.id = id;
        this.lv = lv;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.lvmax = lvmax;
        this.next = next;
        this.power = power;
    }
}