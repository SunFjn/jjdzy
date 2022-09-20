package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_777_攻城拔寨宝库.xlsx
 */
public class Struct_gcbk_777 {
    /**id*/
    private int id;
    /**宝库道具*/
    private int[][] item;
    /**位置*/
    private int wz;
    /**需要物资数量*/
    private int[][] money;
    /**限购数量*/
    private int xg;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 宝库道具
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * 位置
     */
    public int getWz() {
        return wz;
    }
    /**
     * 需要物资数量
     */
    public int[][] getMoney() {
        return money;
    }
    /**
     * 限购数量
     */
    public int getXg() {
        return xg;
    }
    public Struct_gcbk_777(int id,String item,int wz,String money,int xg) {
        this.id = id;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.wz = wz;
        this.money = ExcelJsonUtils.toObj(money,int[][].class);
        this.xg = xg;
    }
}