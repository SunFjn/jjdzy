package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_019_府邸强盗.xlsx
 */
public class Struct_fdqd_019 {
    /**编号*/
    private int bianhao;
    /**强盗ID*/
    private int id;
    /**刷出几率*/
    private int jilv;
    /**掉落奖励*/
    private int[][] jiangli;
    /**
     * 编号
     */
    public int getBianhao() {
        return bianhao;
    }
    /**
     * 强盗ID
     */
    public int getId() {
        return id;
    }
    /**
     * 刷出几率
     */
    public int getJilv() {
        return jilv;
    }
    /**
     * 掉落奖励
     */
    public int[][] getJiangli() {
        return jiangli;
    }
    public Struct_fdqd_019(int bianhao,int id,int jilv,String jiangli) {
        this.bianhao = bianhao;
        this.id = id;
        this.jilv = jilv;
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
    }
}