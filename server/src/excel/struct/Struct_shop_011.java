package excel.struct;
/**
 * C_011_充值商品ID.xlsx
 */
public class Struct_shop_011 {
    /**编号*/
    private int Index;
    /**名称*/
    private String name;
    /**类型
	 * 1.充值额度
	 * 2.特权卡
	 * 3.首充
	 * 4.每日直购
	 * 5.庆典基金
	 * 6.尊享周卡
	 * 7.金猪送财
	 * 8.三国战令
	 * 9.限时礼包
	 * 10.高级犒赏令
	 * 12：超值周礼包
	 * 13：超值月礼包*/
    private int type;
    /**人民币*/
    private int RMB;
    /**说明*/
    private String explain;
    /**元宝数量*/
    private int num;
    /**价格RMB
	 * 单位为分*/
    private int rmb;
    /**关联道具*/
    private int daoju;
    /**排序*/
    private int px;
    /**
     * 编号
     */
    public int getIndex() {
        return Index;
    }
    /**
     * 名称
     */
    public String getName() {
        return name;
    }
    /**
     * 类型
	 * 1.充值额度
	 * 2.特权卡
	 * 3.首充
	 * 4.每日直购
	 * 5.庆典基金
	 * 6.尊享周卡
	 * 7.金猪送财
	 * 8.三国战令
	 * 9.限时礼包
	 * 10.高级犒赏令
	 * 12：超值周礼包
	 * 13：超值月礼包
     */
    public int getType() {
        return type;
    }
    /**
     * 人民币
     */
    public int getRMB() {
        return RMB;
    }
    /**
     * 说明
     */
    public String getExplain() {
        return explain;
    }
    /**
     * 元宝数量
     */
    public int getNum() {
        return num;
    }
    /**
     * 价格RMB
	 * 单位为分
     */
    public int getRmb() {
        return rmb;
    }
    /**
     * 关联道具
     */
    public int getDaoju() {
        return daoju;
    }
    /**
     * 排序
     */
    public int getPx() {
        return px;
    }
    public Struct_shop_011(int Index,String name,int type,int RMB,String explain,int num,int rmb,int daoju,int px) {
        this.Index = Index;
        this.name = name;
        this.type = type;
        this.RMB = RMB;
        this.explain = explain;
        this.num = num;
        this.rmb = rmb;
        this.daoju = daoju;
        this.px = px;
    }
}