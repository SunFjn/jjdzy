package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J_271_觉醒表.xlsx
 */
public class Struct_jx_271 {
    /**id
	 * id=品质id*10000+觉醒技能id*1000+等级*/
    private int id;
    /**下一级*/
    private int next;
    /**需要觉醒之力等级*/
    private int lv;
    /**属性*/
    private int[][] attr;
    /**消耗升星道具数量
	 * 只配置了数量
	 * 消耗道具取对应升星道具*/
    private int consume;
    /**
     * id
	 * id=品质id*10000+觉醒技能id*1000+等级
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
     * 需要觉醒之力等级
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
     * 消耗升星道具数量
	 * 只配置了数量
	 * 消耗道具取对应升星道具
     */
    public int getConsume() {
        return consume;
    }
    public Struct_jx_271(int id,int next,int lv,String attr,int consume) {
        this.id = id;
        this.next = next;
        this.lv = lv;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.consume = consume;
    }
}