package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xtwl_776;
public class Config_xtwl_776 extends ConfigBase<Struct_xtwl_776> {
    private static Config_xtwl_776 ins = null;
    public static Config_xtwl_776 getIns(){
        if(ins==null){
            ins = new Config_xtwl_776();
        }
        return ins;
    }
    private Config_xtwl_776(){
        put(1,new Struct_xtwl_776(1,1,"[[1,411024,10]]",400001,2400,60000));
        put(2,new Struct_xtwl_776(2,1,"[[1,411024,20]]",400002,1500,30000));
        put(3,new Struct_xtwl_776(3,1,"[[1,411024,60]]",400003,1000,10000));
        put(4,new Struct_xtwl_776(4,1,"[[1,411025,1]]",400004,1500,10000));
        put(5,new Struct_xtwl_776(5,1,"[[1,402068,1]]",400001,1000,10000));
        put(6,new Struct_xtwl_776(6,1,"[[1,402069,1]]",400002,1000,10000));
        put(7,new Struct_xtwl_776(7,1,"[[1,402070,1]]",400003,1000,10000));
        put(8,new Struct_xtwl_776(8,1,"[[1,447101,1]]",400004,300,5000));
        put(9,new Struct_xtwl_776(9,1,"[[1,447102,1]]",400004,300,5000));
        put(10,new Struct_xtwl_776(10,2,"[[1,447104,1]]",400005,2000,4000));
        put(11,new Struct_xtwl_776(11,2,"[[1,447103,1]]",400006,2000,4000));
        put(12,new Struct_xtwl_776(12,2,"[[1,447105,1]]",400007,2000,4000));
        put(13,new Struct_xtwl_776(13,2,"[[1,447106,1]]",400008,2000,4000));
        put(14,new Struct_xtwl_776(14,2,"[[1,402071,1]]",400009,1000,4000));
        put(15,new Struct_xtwl_776(15,2,"[[1,402072,1]]",400009,1000,4000));
    }
    public void reset(){
        ins = null;
    }
}