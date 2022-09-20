package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_778_新活动-貔貅散宝大奖.xlsx
 */
public class Struct_pxsbdj_778 {
    /**序号*/
    private int id;
    /**期数*/
    private int qs;
    /**消费*/
    private int xf;
    /**领取条件
	 * 累计消费指定元宝满xx天可领取*/
    private int tj;
    /**奖励*/
    private int[][] jl;
    /**
     * 序号
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
     * 消费
     */
    public int getXf() {
        return xf;
    }
    /**
     * 领取条件
	 * 累计消费指定元宝满xx天可领取
     */
    public int getTj() {
        return tj;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_pxsbdj_778(int id,int qs,int xf,int tj,String jl) {
        this.id = id;
        this.qs = qs;
        this.xf = xf;
        this.tj = tj;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}