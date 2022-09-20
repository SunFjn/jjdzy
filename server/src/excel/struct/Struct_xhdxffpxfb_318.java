package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_318_新活动消费翻牌消费表.xlsx
 */
public class Struct_xhdxffpxfb_318 {
    /**序号*/
    private int id;
    /**次数*/
    private int times;
    /**消耗元宝*/
    private int[][] yb;
    /**奖励展示（非实际对应奖励）*/
    private int[][] show;
    /**期数*/
    private int qs;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 次数
     */
    public int getTimes() {
        return times;
    }
    /**
     * 消耗元宝
     */
    public int[][] getYb() {
        return yb;
    }
    /**
     * 奖励展示（非实际对应奖励）
     */
    public int[][] getShow() {
        return show;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_xhdxffpxfb_318(int id,int times,String yb,String show,int qs) {
        this.id = id;
        this.times = times;
        this.yb = ExcelJsonUtils.toObj(yb,int[][].class);
        this.show = ExcelJsonUtils.toObj(show,int[][].class);
        this.qs = qs;
    }
}