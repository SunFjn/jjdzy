package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-266-兽魂觉醒星级套装表.xlsx
 */
public class Struct_shjxstartz_266 {
    /**id*/
    private int id;
    /**下个id*/
    private int next;
    /**所属部位*/
    private int bw;
    /**星级*/
    private int star;
    /**属性*/
    private int[][] attr;
    /**
     * id
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
     * 所属部位
     */
    public int getBw() {
        return bw;
    }
    /**
     * 星级
     */
    public int getStar() {
        return star;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    public Struct_shjxstartz_266(int id,int next,int bw,int star,String attr) {
        this.id = id;
        this.next = next;
        this.bw = bw;
        this.star = star;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
    }
}