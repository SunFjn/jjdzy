package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_019_府邸商店表.xlsx
 */
public class Struct_fdshop_019 {
    /**索引id*/
    private int id;
    /**道具*/
    private int[][] dj;
    /**价格*/
    private int[][] yj;
    /**刷出概率
	 * 所有商品总概率为100000*/
    private int gailv;
    /**限购数量*/
    private int xiangou;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 道具
     */
    public int[][] getDj() {
        return dj;
    }
    /**
     * 价格
     */
    public int[][] getYj() {
        return yj;
    }
    /**
     * 刷出概率
	 * 所有商品总概率为100000
     */
    public int getGailv() {
        return gailv;
    }
    /**
     * 限购数量
     */
    public int getXiangou() {
        return xiangou;
    }
    public Struct_fdshop_019(int id,String dj,String yj,int gailv,int xiangou) {
        this.id = id;
        this.dj = ExcelJsonUtils.toObj(dj,int[][].class);
        this.yj = ExcelJsonUtils.toObj(yj,int[][].class);
        this.gailv = gailv;
        this.xiangou = xiangou;
    }
}