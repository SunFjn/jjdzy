package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_205_关卡BOSS.xlsx
 */
public class Struct_BOSS_205 {
    /**关卡*/
    private int guaiqia;
    /**BOSS列表*/
    private int[][] BL;
    /**BOSS掉落*/
    private String BD;
    /**波数*/
    private int BS;
    /**BOSS地图*/
    private int m;
    /**小怪链接*/
    private int lj;
    /**挂机奖励(1小时）*/
    private int[][] auto;
    /**
     * 关卡
     */
    public int getGuaiqia() {
        return guaiqia;
    }
    /**
     * BOSS列表
     */
    public int[][] getBL() {
        return BL;
    }
    /**
     * BOSS掉落
     */
    public String getBD() {
        return BD;
    }
    /**
     * 波数
     */
    public int getBS() {
        return BS;
    }
    /**
     * BOSS地图
     */
    public int getM() {
        return m;
    }
    /**
     * 小怪链接
     */
    public int getLj() {
        return lj;
    }
    /**
     * 挂机奖励(1小时）
     */
    public int[][] getAuto() {
        return auto;
    }
    public Struct_BOSS_205(int guaiqia,String BL,String BD,int BS,int m,int lj,String auto) {
        this.guaiqia = guaiqia;
        this.BL = ExcelJsonUtils.toObj(BL,int[][].class);
        this.BD = BD;
        this.BS = BS;
        this.m = m;
        this.lj = lj;
        this.auto = ExcelJsonUtils.toObj(auto,int[][].class);
    }
}