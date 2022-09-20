package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_330_新活动-幸运翻牌奖励表.xlsx
 */
public class Struct_slfplsb_330 {
    /**序号*/
    private int id;
    /**累计胜利次数*/
    private int cs;
    /**奖励和展示*/
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
     * 累计胜利次数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 奖励和展示
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
    public Struct_slfplsb_330(int id,int cs,String show,int qs) {
        this.id = id;
        this.cs = cs;
        this.show = ExcelJsonUtils.toObj(show,int[][].class);
        this.qs = qs;
    }
}