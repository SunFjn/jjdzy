package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_019_装饰升级表.xlsx
 */
public class Struct_fdzssj_019 {
    /**装饰ID*/
    private int zhuangshi;
    /**装饰类型*/
    private int zslx;
    /**等级*/
    private int zsdj;
    /**属性*/
    private int[][] shuxing;
    /**战力*/
    private int zhanli;
    /**升级消耗*/
    private int[][] xiaohao;
    /**模型ID*/
    private int moxing;
    /**
     * 装饰ID
     */
    public int getZhuangshi() {
        return zhuangshi;
    }
    /**
     * 装饰类型
     */
    public int getZslx() {
        return zslx;
    }
    /**
     * 等级
     */
    public int getZsdj() {
        return zsdj;
    }
    /**
     * 属性
     */
    public int[][] getShuxing() {
        return shuxing;
    }
    /**
     * 战力
     */
    public int getZhanli() {
        return zhanli;
    }
    /**
     * 升级消耗
     */
    public int[][] getXiaohao() {
        return xiaohao;
    }
    /**
     * 模型ID
     */
    public int getMoxing() {
        return moxing;
    }
    public Struct_fdzssj_019(int zhuangshi,int zslx,int zsdj,String shuxing,int zhanli,String xiaohao,int moxing) {
        this.zhuangshi = zhuangshi;
        this.zslx = zslx;
        this.zsdj = zsdj;
        this.shuxing = ExcelJsonUtils.toObj(shuxing,int[][].class);
        this.zhanli = zhanli;
        this.xiaohao = ExcelJsonUtils.toObj(xiaohao,int[][].class);
        this.moxing = moxing;
    }
}