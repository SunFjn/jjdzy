package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_281_新活动-充值转盘奖励表.xlsx
 */
public class Struct_czzpreward_281 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**充值金额：元*/
    private int cz;
    /**奖励*/
    private int[][] show;
    /**是否添加大奖标识*/
    private int big;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 充值金额：元
     */
    public int getCz() {
        return cz;
    }
    /**
     * 奖励
     */
    public int[][] getShow() {
        return show;
    }
    /**
     * 是否添加大奖标识
     */
    public int getBig() {
        return big;
    }
    public Struct_czzpreward_281(int id,int qs,int cz,String show,int big) {
        this.id = id;
        this.qs = qs;
        this.cz = cz;
        this.show = ExcelJsonUtils.toObj(show,int[][].class);
        this.big = big;
    }
}