package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zzmbxh_503;
public class Config_zzmbxh_503 extends ConfigBase<Struct_zzmbxh_503> {
    private static Config_zzmbxh_503 ins = null;
    public static Config_zzmbxh_503 getIns(){
        if(ins==null){
            ins = new Config_zzmbxh_503();
        }
        return ins;
    }
    private Config_zzmbxh_503(){
        put(1,new Struct_zzmbxh_503(1,"[[1,410435,50]]"));
        put(2,new Struct_zzmbxh_503(2,"[[1,410435,50]]"));
        put(3,new Struct_zzmbxh_503(3,"[[1,410435,100]]"));
        put(4,new Struct_zzmbxh_503(4,"[[1,410435,100]]"));
        put(5,new Struct_zzmbxh_503(5,"[[1,410435,150]]"));
        put(6,new Struct_zzmbxh_503(6,"[[1,410435,150]]"));
        put(7,new Struct_zzmbxh_503(7,"[[1,410435,200]]"));
        put(8,new Struct_zzmbxh_503(8,"[[1,410435,200]]"));
    }
    public void reset(){
        ins = null;
    }
}