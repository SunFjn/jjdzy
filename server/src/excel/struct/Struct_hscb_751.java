package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * H_751_火烧赤壁.xlsx
 */
public class Struct_hscb_751 {
    /**关卡*/
    private int id;
    /**boss*/
    private int[][] boss;
    /**BOSS掉落*/
    private String bossdl;
    /**
     * 关卡
     */
    public int getId() {
        return id;
    }
    /**
     * boss
     */
    public int[][] getBoss() {
        return boss;
    }
    /**
     * BOSS掉落
     */
    public String getBossdl() {
        return bossdl;
    }
    public Struct_hscb_751(int id,String boss,String bossdl) {
        this.id = id;
        this.boss = ExcelJsonUtils.toObj(boss,int[][].class);
        this.bossdl = bossdl;
    }
}