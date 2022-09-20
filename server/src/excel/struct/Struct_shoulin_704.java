package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_704_兽灵.xlsx
 */
public class Struct_shoulin_704 {
    /**类型
	 * jingyu:
	 * 类型*1000+等级
	 * 1为青龙
	 * 2白虎 3朱雀 4玄武*/
    private int id;
    /**等级*/
    private int lv;
    /**属性*/
    private int[][] attr;
    /**升级消耗*/
    private int[][] consume;
    /**战斗力*/
    private int fight;
    /**下级ID*/
    private int next;
    /**
     * 类型
	 * jingyu:
	 * 类型*1000+等级
	 * 1为青龙
	 * 2白虎 3朱雀 4玄武
     */
    public int getId() {
        return id;
    }
    /**
     * 等级
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
     * 升级消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 战斗力
     */
    public int getFight() {
        return fight;
    }
    /**
     * 下级ID
     */
    public int getNext() {
        return next;
    }
    public Struct_shoulin_704(int id,int lv,String attr,String consume,int fight,int next) {
        this.id = id;
        this.lv = lv;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.fight = fight;
        this.next = next;
    }
}