package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_733_新单笔充值2.xlsx
 */
public class Struct_dbcz2_733 {
    /**序号*/
    private int xh;
    /**星期
	 * jingyu:
	 * 星期x：
	 * x=1,2,3,4,5,6,7*/
    private int xq;
    /**金额
	 * jingyu:
	 * RMB*/
    private int je;
    /**奖励*/
    private int[][] jl;
    /**领取次数*/
    private int cs;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
     */
    public int getXh() {
        return xh;
    }
    /**
     * 星期
	 * jingyu:
	 * 星期x：
	 * x=1,2,3,4,5,6,7
     */
    public int getXq() {
        return xq;
    }
    /**
     * 金额
	 * jingyu:
	 * RMB
     */
    public int getJe() {
        return je;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    /**
     * 领取次数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_dbcz2_733(int xh,int xq,int je,String jl,int cs,int jiankong) {
        this.xh = xh;
        this.xq = xq;
        this.je = je;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
        this.cs = cs;
        this.jiankong = jiankong;
    }
}