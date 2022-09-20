package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * H_741_豪礼兑换.xlsx
 */
public class Struct_hldh_741 {
    /**序号*/
    private int id;
    /**期数*/
    private int qishu;
    /**所需材料*/
    private int[][] cailiao;
    /**兑换道具*/
    private int[][] daoju;
    /**兑换次数
	 * Windows 用户:
	 * 0：无限制
	 * x：具体的兑换次数*/
    private int cishu;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQishu() {
        return qishu;
    }
    /**
     * 所需材料
     */
    public int[][] getCailiao() {
        return cailiao;
    }
    /**
     * 兑换道具
     */
    public int[][] getDaoju() {
        return daoju;
    }
    /**
     * 兑换次数
	 * Windows 用户:
	 * 0：无限制
	 * x：具体的兑换次数
     */
    public int getCishu() {
        return cishu;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_hldh_741(int id,int qishu,String cailiao,String daoju,int cishu,int jiankong) {
        this.id = id;
        this.qishu = qishu;
        this.cailiao = ExcelJsonUtils.toObj(cailiao,int[][].class);
        this.daoju = ExcelJsonUtils.toObj(daoju,int[][].class);
        this.cishu = cishu;
        this.jiankong = jiankong;
    }
}