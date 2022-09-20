package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dzgemsuit_209;
public class Config_dzgemsuit_209 extends ConfigBase<Struct_dzgemsuit_209> {
    private static Config_dzgemsuit_209 ins = null;
    public static Config_dzgemsuit_209 getIns(){
        if(ins==null){
            ins = new Config_dzgemsuit_209();
        }
        return ins;
    }
    private Config_dzgemsuit_209(){
        put(1,new Struct_dzgemsuit_209(1,40,"[[102,14000],[103,1900],[104,1200]]",19000));
        put(2,new Struct_dzgemsuit_209(2,80,"[[102,37000],[103,4900],[104,3200]]",49750));
        put(3,new Struct_dzgemsuit_209(3,160,"[[102,84000],[103,11100],[104,7200]]",112500));
        put(4,new Struct_dzgemsuit_209(4,240,"[[102,153000],[103,20400],[104,13100]]",205750));
        put(5,new Struct_dzgemsuit_209(5,320,"[[102,246000],[103,32700],[104,21100]]",330500));
        put(6,new Struct_dzgemsuit_209(6,400,"[[102,432000],[103,57400],[104,37000]]",580000));
        put(7,new Struct_dzgemsuit_209(7,480,"[[102,710000],[103,94400],[104,60900]]",954000));
        put(8,new Struct_dzgemsuit_209(8,560,"[[102,1082000],[103,143700],[104,92700]]",1452500));
        put(9,new Struct_dzgemsuit_209(9,640,"[[102,1546000],[103,205400],[104,132500]]",2076000));
        put(10,new Struct_dzgemsuit_209(10,720,"[[102,2103000],[103,279500],[104,180300]]",2824750));
        put(11,new Struct_dzgemsuit_209(11,800,"[[102,2800000],[103,372000],[104,240000]]",3760000));
    }
    public void reset(){
        ins = null;
    }
}