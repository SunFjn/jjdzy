package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_shinv_020;
public class Config_shinv_020 extends ConfigBase<Struct_shinv_020> {
    private static Config_shinv_020 ins = null;
    public static Config_shinv_020 getIns(){
        if(ins==null){
            ins = new Config_shinv_020();
        }
        return ins;
    }
    private Config_shinv_020(){
        put(100001,new Struct_shinv_020(100001,416075,200001,"[[1,416075,1]]",4,50,10));
        put(100002,new Struct_shinv_020(100002,416076,200002,"[[1,416076,1]]",5,50,10));
        put(100003,new Struct_shinv_020(100003,416077,200003,"[[1,416077,1]]",5,50,10));
        put(100004,new Struct_shinv_020(100004,416078,200004,"[[1,416078,1]]",6,50,10));
        put(100005,new Struct_shinv_020(100005,416079,200005,"[[1,416079,1]]",6,50,10));
        put(100006,new Struct_shinv_020(100006,416080,200006,"[[1,416080,1]]",8,50,10));
    }
    public void reset(){
        ins = null;
    }
}