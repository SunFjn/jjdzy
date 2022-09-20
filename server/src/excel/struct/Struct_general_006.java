package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J_006_将魂表.xlsx
 */
public class Struct_general_006 {
    /**将魂ID*/
    private int ID;
    /**名称*/
    private String name;
    /**分类
	 * 1.曹魏
	 * 2.蜀汉
	 * 3.孙吴
	 * 4.群雄*/
    private int type;
    /**品质
	 * 1.白
	 * 2.绿
	 * 3.蓝
	 * 4.紫
	 * 5.橙
	 * 6.红*/
    private int quality;
    /**头像*/
    private int pic;
    /**激活
	 * [[x,y]]
	 * x为过关斩将难度
	 * x=1  普通
	 * x=2  困难
	 * x=3  噩梦
	 * x=4  传说
	 * 
	 * y=通关关卡数*/
    private int[][] activation;
    /**
     * 将魂ID
     */
    public int getID() {
        return ID;
    }
    /**
     * 名称
     */
    public String getName() {
        return name;
    }
    /**
     * 分类
	 * 1.曹魏
	 * 2.蜀汉
	 * 3.孙吴
	 * 4.群雄
     */
    public int getType() {
        return type;
    }
    /**
     * 品质
	 * 1.白
	 * 2.绿
	 * 3.蓝
	 * 4.紫
	 * 5.橙
	 * 6.红
     */
    public int getQuality() {
        return quality;
    }
    /**
     * 头像
     */
    public int getPic() {
        return pic;
    }
    /**
     * 激活
	 * [[x,y]]
	 * x为过关斩将难度
	 * x=1  普通
	 * x=2  困难
	 * x=3  噩梦
	 * x=4  传说
	 * 
	 * y=通关关卡数
     */
    public int[][] getActivation() {
        return activation;
    }
    public Struct_general_006(int ID,String name,int type,int quality,int pic,String activation) {
        this.ID = ID;
        this.name = name;
        this.type = type;
        this.quality = quality;
        this.pic = pic;
        this.activation = ExcelJsonUtils.toObj(activation,int[][].class);
    }
}