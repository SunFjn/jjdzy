package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_kfwztz_770;
public class Config_kfwztz_770 extends ConfigBase<Struct_kfwztz_770> {
    private static Config_kfwztz_770 ins = null;
    public static Config_kfwztz_770 getIns(){
        if(ins==null){
            ins = new Config_kfwztz_770();
        }
        return ins;
    }
    private Config_kfwztz_770(){
        put(1,new Struct_kfwztz_770(1,"[[1,411024,10],[7,0,10]]","[[1,411024,10],[7,0,10]]",10,5,5,35));
        put(2,new Struct_kfwztz_770(2,"[[1,411024,10],[7,0,10]]","[[1,411024,10],[7,0,10]]",10,5,5,35));
        put(3,new Struct_kfwztz_770(3,"[[1,411024,10],[7,0,10]]","[[1,411024,10],[7,0,10]]",10,5,5,35));
        put(4,new Struct_kfwztz_770(4,"[[1,411024,10],[7,0,10]]","[[1,411024,10],[7,0,10]]",10,5,5,35));
        put(5,new Struct_kfwztz_770(5,"[[1,411024,10],[7,0,10]]","[[1,411024,10],[7,0,10]]",10,5,5,35));
    }
    public void reset(){
        ins = null;
    }
}