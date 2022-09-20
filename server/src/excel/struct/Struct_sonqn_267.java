package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_267_少主潜能表.xlsx
 */
public class Struct_sonqn_267 {
    /**id
	 * 少主id*100000+重数*10+等级*/
    private int id;
    /**下个id*/
    private int next;
    /**属性加成*/
    private int[][] attr;
    /**升级消耗*/
    private int[][] consume;
    /**提升玉露丸上限*/
    private int max1;
    /**提升大还丹上限*/
    private int max2;
    /**少主升星十万分比加成属性（后端用）*/
    private int[][] jc1;
    /**
     * id
	 * 少主id*100000+重数*10+等级
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
     * 提升玉露丸上限
     */
    public int getMax1() {
        return max1;
    }
    /**
     * 提升大还丹上限
     */
    public int getMax2() {
        return max2;
    }
    /**
     * 少主升星十万分比加成属性（后端用）
     */
    public int[][] getJc1() {
        return jc1;
    }
    public Struct_sonqn_267(int id,int next,String attr,String consume,int max1,int max2,String jc1) {
        this.id = id;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.max1 = max1;
        this.max2 = max2;
        this.jc1 = ExcelJsonUtils.toObj(jc1,int[][].class);
    }
}