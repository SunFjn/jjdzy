package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_267_少主六艺表.xlsx
 */
public class Struct_sonsix_267 {
    /**id
	 * 六艺id*1000+等级*/
    private int id;
    /**下个id*/
    private int next;
    /**属性加成*/
    private int[][] attr;
    /**升级消耗*/
    private int[][] consume;
    /**需要少主星级*/
    private int star;
    /**
     * id
	 * 六艺id*1000+等级
     */
    public int getId() {
        return id;
    }
    /**
     * 下个id
     */
    public int getNext() {
        return next;
    }
    /**
     * 属性加成
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
     * 需要少主星级
     */
    public int getStar() {
        return star;
    }
    public Struct_sonsix_267(int id,int next,String attr,String consume,int star) {
        this.id = id;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.star = star;
    }
}