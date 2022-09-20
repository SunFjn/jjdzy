package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_767跨服试炼-buff表.xlsx
 */
public class Struct_slbuff_767 {
    /**id
	 * buff层id*/
    private int id;
    /**初级加成
	 * 均为十万分比
	 * 
	 * [[属性id,加成,抽取概率]]*/
    private int[][] cj;
    /**初级单价
	 * 单价：试炼点*/
    private int dj1;
    /**中级加成*/
    private int[][] zj;
    /**中级单价*/
    private int dj2;
    /**高级加成*/
    private int[][] gj;
    /**高级单价*/
    private int dj3;
    /**
     * id
	 * buff层id
     */
    public int getId() {
        return id;
    }
    /**
     * 初级加成
	 * 均为十万分比
	 * 
	 * [[属性id,加成,抽取概率]]
     */
    public int[][] getCj() {
        return cj;
    }
    /**
     * 初级单价
	 * 单价：试炼点
     */
    public int getDj1() {
        return dj1;
    }
    /**
     * 中级加成
     */
    public int[][] getZj() {
        return zj;
    }
    /**
     * 中级单价
     */
    public int getDj2() {
        return dj2;
    }
    /**
     * 高级加成
     */
    public int[][] getGj() {
        return gj;
    }
    /**
     * 高级单价
     */
    public int getDj3() {
        return dj3;
    }
    public Struct_slbuff_767(int id,String cj,int dj1,String zj,int dj2,String gj,int dj3) {
        this.id = id;
        this.cj = ExcelJsonUtils.toObj(cj,int[][].class);
        this.dj1 = dj1;
        this.zj = ExcelJsonUtils.toObj(zj,int[][].class);
        this.dj2 = dj2;
        this.gj = ExcelJsonUtils.toObj(gj,int[][].class);
        this.dj3 = dj3;
    }
}