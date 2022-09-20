package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_son_267;
public class Config_son_267 extends ConfigBase<Struct_son_267> {
    private static Config_son_267 ins = null;
    public static Config_son_267 getIns(){
        if(ins==null){
            ins = new Config_son_267();
        }
        return ins;
    }
    private Config_son_267(){
        put(1,new Struct_son_267(1,"刘禅",4,"[[410054,10],[410055,100],[410056,1000],[410057,5000]]","[[140001]]"));
        put(2,new Struct_son_267(2,"曹冲",5,"[[410054,10],[410055,100],[410056,1000],[410057,5000]]","[[140002]]"));
        put(3,new Struct_son_267(3,"孙鲁育",6,"[[410054,10],[410055,100],[410056,1000],[410057,5000]]","[[140003]]"));
        put(4,new Struct_son_267(4,"吕玲绮",6,"[[410054,10],[410055,100],[410056,1000],[410057,5000]]","[[140004]]"));
        put(5,new Struct_son_267(5,"刘协",8,"[[410054,10],[410055,100],[410056,1000],[410057,5000]]","[[140005]]"));
    }
    public void reset(){
        ins = null;
    }
}