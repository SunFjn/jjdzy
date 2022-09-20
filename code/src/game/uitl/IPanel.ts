/**
 * 二级面板的接口
 * @author: lujiahao 
 * @date: 2018-04-11 15:40:23 
 */
interface IPanel 
{
    initView(pParent:fairygui.GObject);
    openPanel(pData?:any);
    closePanel(pData?:any);
    dispose();
}