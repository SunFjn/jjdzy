package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * 武圣榜补偿.xlsx
 */
public class Struct_wsbc_022 {
    /**编号*/
    private int bianhao;
    /**第1名*/
    private int[][] one;
    /**第2名*/
    private int[][] two;
    /**第3名*/
    private int[][] three;
    /**4到10名*/
    private int[][] other;
    /**
     * 编号
     */
    public int getBianhao() {
        return bianhao;
    }
    /**
     * 第1名
     */
    public int[][] getOne() {
        return one;
    }
    /**
     * 第2名
     */
    public int[][] getTwo() {
        return two;
    }
    /**
     * 第3名
     */
    public int[][] getThree() {
        return three;
    }
    /**
     * 4到10名
     */
    public int[][] getOther() {
        return other;
    }
    public Struct_wsbc_022(int bianhao,String one,String two,String three,String other) {
        this.bianhao = bianhao;
        this.one = ExcelJsonUtils.toObj(one,int[][].class);
        this.two = ExcelJsonUtils.toObj(two,int[][].class);
        this.three = ExcelJsonUtils.toObj(three,int[][].class);
        this.other = ExcelJsonUtils.toObj(other,int[][].class);
    }
}