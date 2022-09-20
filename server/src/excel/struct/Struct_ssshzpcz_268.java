package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-268-圣兽降临-圣兽转盘充值表.xlsx
 */
public class Struct_ssshzpcz_268 {
    /**次数*/
    private int id;
    /**充值金额：元*/
    private int cz;
    /**奖励*/
    private int[][] show;
    /**是否添加大奖标识*/
    private int big;
    /**
     * 次数
     */
    public int getId() {
        return id;
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
    public Struct_ssshzpcz_268(int id,int cz,String show,int big) {
        this.id = id;
        this.cz = cz;
        this.show = ExcelJsonUtils.toObj(show,int[][].class);
        this.big = big;
    }
}