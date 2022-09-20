package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ddfh_225;
public class Config_ddfh_225 extends ConfigBase<Struct_ddfh_225> {
    private static Config_ddfh_225 ins = null;
    public static Config_ddfh_225 getIns(){
        if(ins==null){
            ins = new Config_ddfh_225();
        }
        return ins;
    }
    private Config_ddfh_225(){
        put(3,new Struct_ddfh_225(3,"[[1,410017,20],[1,400175,60]]"));
        put(5,new Struct_ddfh_225(5,"[[1,410017,50],[1,400175,60]]"));
        put(7,new Struct_ddfh_225(7,"[[1,410017,90],[1,400175,120]]"));
        put(10,new Struct_ddfh_225(10,"[[1,410017,120],[1,412005,10]]"));
    }
    public void reset(){
        ins = null;
    }
}