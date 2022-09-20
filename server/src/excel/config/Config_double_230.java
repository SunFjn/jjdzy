package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_double_230;
public class Config_double_230 extends ConfigBase<Struct_double_230> {
    private static Config_double_230 ins = null;
    public static Config_double_230 getIns(){
        if(ins==null){
            ins = new Config_double_230();
        }
        return ins;
    }
    private Config_double_230(){
        put(1,new Struct_double_230(1,"[[1,1]]","[[1,410082,50],[1,410017,5000],[1,411006,500],[1,460044,1]]","冠军"));
        put(2,new Struct_double_230(2,"[[2,2]]","[[1,410082,40],[1,410017,4000],[1,411006,500]]","亚军"));
        put(3,new Struct_double_230(3,"[[3,4]]","[[1,410082,30],[1,410017,4000],[1,411006,400]]","4强"));
        put(4,new Struct_double_230(4,"[[5,8]]","[[1,410082,20],[1,410017,3000],[1,411006,300]]","8强"));
        put(5,new Struct_double_230(5,"[[9,16]]","[[1,410082,10],[1,410017,3000],[1,411006,200]]","16强"));
    }
    public void reset(){
        ins = null;
    }
}