package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_507_坐骑幻化培养表.xlsx
 */
public class Struct_horsepy_507 {
    /**id
	 * id*1000+阶数*10+等级*/
    private int id;
    /**下一级*/
    private int next;
    /**升阶条件
	 * 坐骑id，星级
	 * 读本条*/
    private int[][] up;
    /**消耗*/
    private int[][] consume;
    /**属性*/
    private int[][] attr;
    /**
     * id
	 * id*1000+阶数*10+等级
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
     * 升阶条件
	 * 坐骑id，星级
	 * 读本条
     */
    public int[][] getUp() {
        return up;
    }
    /**
     * 消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    public Struct_horsepy_507(int id,int next,String up,String consume,String attr) {
        this.id = id;
        this.next = next;
        this.up = ExcelJsonUtils.toObj(up,int[][].class);
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}