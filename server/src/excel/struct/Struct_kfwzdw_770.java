package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_770_跨服王者-段位表.xlsx
 */
public class Struct_kfwzdw_770 {
    /**序号*/
    private int id;
    /**转生区间*/
    private int zs;
    /**段位*/
    private int dw;
    /**下一段位*/
    private int next;
    /**升级所需积分*/
    private int jf;
    /**段位奖励*/
    private int[][] jl;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 转生区间
     */
    public int getZs() {
        return zs;
    }
    /**
     * 段位
     */
    public int getDw() {
        return dw;
    }
    /**
     * 下一段位
     */
    public int getNext() {
        return next;
    }
    /**
     * 升级所需积分
     */
    public int getJf() {
        return jf;
    }
    /**
     * 段位奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_kfwzdw_770(int id,int zs,int dw,int next,int jf,String jl) {
        this.id = id;
        this.zs = zs;
        this.dw = dw;
        this.next = next;
        this.jf = jf;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}