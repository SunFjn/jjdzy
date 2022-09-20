package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_200_跨服表.xlsx
 */
public class Struct_kuafu_200 {
    /**战斗服id*/
    private int id;
    /**服务器区间*/
    private int[][] boss;
    /**微端ID*/
    private String wd;
    /**中央服ID*/
    private int zyf;
    /**是否合区处理
	 * 作为主区填写0
	 * 作为副区填写1
	 * 以前合过的不用改*/
    private int cl;
    /**合并的目标区
	 * 填写战斗服id
	 * 以前合过的不用改*/
    private int mb;
    /**
     * 战斗服id
     */
    public int getId() {
        return id;
    }
    /**
     * 服务器区间
     */
    public int[][] getBoss() {
        return boss;
    }
    /**
     * 微端ID
     */
    public String getWd() {
        return wd;
    }
    /**
     * 中央服ID
     */
    public int getZyf() {
        return zyf;
    }
    /**
     * 是否合区处理
	 * 作为主区填写0
	 * 作为副区填写1
	 * 以前合过的不用改
     */
    public int getCl() {
        return cl;
    }
    /**
     * 合并的目标区
	 * 填写战斗服id
	 * 以前合过的不用改
     */
    public int getMb() {
        return mb;
    }
    public Struct_kuafu_200(int id,String boss,String wd,int zyf,int cl,int mb) {
        this.id = id;
        this.boss = ExcelJsonUtils.toObj(boss,int[][].class);
        this.wd = wd;
        this.zyf = zyf;
        this.cl = cl;
        this.mb = mb;
    }
}