package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cgyl_262;
public class Config_cgyl_262 extends ConfigBase<Struct_cgyl_262> {
    private static Config_cgyl_262 ins = null;
    public static Config_cgyl_262 getIns(){
        if(ins==null){
            ins = new Config_cgyl_262();
        }
        return ins;
    }
    private Config_cgyl_262(){
        put(1,new Struct_cgyl_262(1,"[[1,430001,1]]",2,37001));
        put(2,new Struct_cgyl_262(2,"[[1,440005,1]]",3,37002));
        put(3,new Struct_cgyl_262(3,"[[1,431207,1]]",4,37003));
        put(4,new Struct_cgyl_262(4,"[[1,432001,1]]",5,37004));
        put(5,new Struct_cgyl_262(5,"[[1,431213,1]]",0,37005));
    }
    public void reset(){
        ins = null;
    }
}