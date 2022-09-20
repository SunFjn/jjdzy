package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_312_宴会表.xlsx
 */
public class Struct_qgb_312 {
    /**索引id*/
    private int id;
    /**宴会名字*/
    private String name;
    /**宾客上限*/
    private int sx;
    /**设宴消耗
	 * [[A,B,C]]
	 * A=类型
	 * B=ID
	 * C=数量*/
    private int[][] xh1;
    /**设宴奖励*/
    private int[][] jl;
    /**赴宴奖励*/
    private int[][] jl2;
    /**主人敬酒消耗*/
    private int[][] xh2;
    /**主人敬酒，主人奖励*/
    private int[][] jl3;
    /**主人敬酒，客人奖励*/
    private int[][] jl4;
    /**客人敬酒消耗*/
    private int[][] xh3;
    /**客人敬酒，客人奖励*/
    private int[][] jl5;
    /**客人敬酒，主人奖励*/
    private int[][] jl6;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 宴会名字
     */
    public String getName() {
        return name;
    }
    /**
     * 宾客上限
     */
    public int getSx() {
        return sx;
    }
    /**
     * 设宴消耗
	 * [[A,B,C]]
	 * A=类型
	 * B=ID
	 * C=数量
     */
    public int[][] getXh1() {
        return xh1;
    }
    /**
     * 设宴奖励
     */
    public int[][] getJl() {
        return jl;
    }
    /**
     * 赴宴奖励
     */
    public int[][] getJl2() {
        return jl2;
    }
    /**
     * 主人敬酒消耗
     */
    public int[][] getXh2() {
        return xh2;
    }
    /**
     * 主人敬酒，主人奖励
     */
    public int[][] getJl3() {
        return jl3;
    }
    /**
     * 主人敬酒，客人奖励
     */
    public int[][] getJl4() {
        return jl4;
    }
    /**
     * 客人敬酒消耗
     */
    public int[][] getXh3() {
        return xh3;
    }
    /**
     * 客人敬酒，客人奖励
     */
    public int[][] getJl5() {
        return jl5;
    }
    /**
     * 客人敬酒，主人奖励
     */
    public int[][] getJl6() {
        return jl6;
    }
    public Struct_qgb_312(int id,String name,int sx,String xh1,String jl,String jl2,String xh2,String jl3,String jl4,String xh3,String jl5,String jl6) {
        this.id = id;
        this.name = name;
        this.sx = sx;
        this.xh1 = ExcelJsonUtils.toObj(xh1,int[][].class);
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
        this.jl2 = ExcelJsonUtils.toObj(jl2,int[][].class);
        this.xh2 = ExcelJsonUtils.toObj(xh2,int[][].class);
        this.jl3 = ExcelJsonUtils.toObj(jl3,int[][].class);
        this.jl4 = ExcelJsonUtils.toObj(jl4,int[][].class);
        this.xh3 = ExcelJsonUtils.toObj(xh3,int[][].class);
        this.jl5 = ExcelJsonUtils.toObj(jl5,int[][].class);
        this.jl6 = ExcelJsonUtils.toObj(jl6,int[][].class);
    }
}