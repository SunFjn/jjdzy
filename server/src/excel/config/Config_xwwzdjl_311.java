package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xwwzdjl_311;
public class Config_xwwzdjl_311 extends ConfigBase<Struct_xwwzdjl_311> {
    private static Config_xwwzdjl_311 ins = null;
    public static Config_xwwzdjl_311 getIns(){
        if(ins==null){
            ins = new Config_xwwzdjl_311();
        }
        return ins;
    }
    private Config_xwwzdjl_311(){
        put(1001,new Struct_xwwzdjl_311(1001,"[[4,0,3000],[1,400176,20],[7,0,200]]"));
        put(1002,new Struct_xwwzdjl_311(1002,"[[4,0,2500],[1,400176,10],[7,0,100]]"));
        put(1003,new Struct_xwwzdjl_311(1003,"[[4,0,2500],[1,400176,10],[7,0,100]]"));
        put(1004,new Struct_xwwzdjl_311(1004,"[[4,0,1500],[1,400176,5],[7,0,50]]"));
        put(1005,new Struct_xwwzdjl_311(1005,"[[4,0,1000],[1,400176,2],[7,0,20]]"));
        put(2001,new Struct_xwwzdjl_311(2001,"[[4,0,3000],[1,400176,20],[7,0,200]]"));
        put(2002,new Struct_xwwzdjl_311(2002,"[[4,0,2500],[1,400176,10],[7,0,100]]"));
        put(2003,new Struct_xwwzdjl_311(2003,"[[4,0,2500],[1,400176,10],[7,0,100]]"));
        put(2004,new Struct_xwwzdjl_311(2004,"[[4,0,1500],[1,400176,5],[7,0,50]]"));
        put(2005,new Struct_xwwzdjl_311(2005,"[[4,0,1000],[1,400176,2],[7,0,20]]"));
        put(3001,new Struct_xwwzdjl_311(3001,"[[4,0,3000],[1,400176,20],[7,0,200]]"));
        put(3002,new Struct_xwwzdjl_311(3002,"[[4,0,2500],[1,400176,10],[7,0,100]]"));
        put(3003,new Struct_xwwzdjl_311(3003,"[[4,0,2500],[1,400176,10],[7,0,100]]"));
        put(3004,new Struct_xwwzdjl_311(3004,"[[4,0,1500],[1,400176,5],[7,0,50]]"));
        put(3005,new Struct_xwwzdjl_311(3005,"[[4,0,1000],[1,400176,2],[7,0,20]]"));
    }
    public void reset(){
        ins = null;
    }
}