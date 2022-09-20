package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_768_新活动-全服消费.xlsx
 */
public class Struct_qfxf_768 {
    /**序号*/
    private int id;
    /**期数*/
    private int qs;
    /**全服消费
	 * 单位：元宝*/
    private int qf;
    /**个人消费
	 * 元宝*/
    private int gr;
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
     * 全服消费
	 * 单位：元宝
     */
    public int getQf() {
        return qf;
    }
    /**
     * 个人消费
	 * 元宝
     */
    public int getGr() {
        return gr;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_qfxf_768(int id,int qs,int qf,int gr,String jl) {
        this.id = id;
        this.qs = qs;
        this.qf = qf;
        this.gr = gr;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}