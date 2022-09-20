package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_267_少主六艺学堂表.xlsx
 */
public class Struct_sonsixschool_267 {
    /**id*/
    private int id;
    /**下个id*/
    private int next;
    /**属性加成*/
    private int[][] attr;
    /**开启六艺*/
    private int[][] six;
    /**考试要求
	 * 六艺id 等级要求*/
    private int[][] yq;
    /**合格概率
	 * 十万分比
	 * */
    private int[][] ks;
    /**每门考试消耗*/
    private int[][] consume;
    /**提升属性
	 * 提升少主升星基础属性
	 * A,B
	 * A=属性类型
	 * B=十万分比*/
    private int[][] jc1;
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
     * 属性加成
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 开启六艺
     */
    public int[][] getSix() {
        return six;
    }
    /**
     * 考试要求
	 * 六艺id 等级要求
     */
    public int[][] getYq() {
        return yq;
    }
    /**
     * 合格概率
	 * 十万分比
	 * 
     */
    public int[][] getKs() {
        return ks;
    }
    /**
     * 每门考试消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 提升属性
	 * 提升少主升星基础属性
	 * A,B
	 * A=属性类型
	 * B=十万分比
     */
    public int[][] getJc1() {
        return jc1;
    }
    public Struct_sonsixschool_267(int id,int next,String attr,String six,String yq,String ks,String consume,String jc1) {
        this.id = id;
        this.next = next;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.six = ExcelJsonUtils.toObj(six,int[][].class);
        this.yq = ExcelJsonUtils.toObj(yq,int[][].class);
        this.ks = ExcelJsonUtils.toObj(ks,int[][].class);
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.jc1 = ExcelJsonUtils.toObj(jc1,int[][].class);
    }
}