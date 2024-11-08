/*------------------------------------------------------------------------------  											
 * NAME : COM_01_ServiceImpl.java                                                                    					
 * DESC :                                                                                                        			
 * VER  : V1.0                                                                                                   			
 * PROJ : 목포과학대 차세대 프로젝트                                                                           			
 * Copyright 2021 avereduSystem All rights reserved                                                                			
 *------------------------------------------------------------------------------                                 			
 *                               MODIFICATION LOG                                                                			
 *------------------------------------------------------------------------------                                 			
 *    DATE     AUTHOR                      DESCRIPTION                        												
 * ----------  ------  ---------------------------------------------------------                                 			
 * 2020/11/19  jiback                                                               			
 *------------------------------------------------------------------------------*/                               			
package com.msu.prj.com.service.impl;                                                                                        
                                                                                                                             
import java.util.List;                                                                                                       
import java.util.Map;                                                                                                        
                                                                                                                             
import javax.annotation.Resource;                                                                                            
                                                                                                                             
import org.apache.commons.logging.Log;                                                                                       
import org.apache.commons.logging.LogFactory;                                                                                
import org.springframework.stereotype.Service;                                                                               
                                                                                                                             
import com.nexacro17.xapi.data.DataSet;                                                                                      
                                                                                                                             
import com.msu.common.exception.CommException;                                                                         
import com.msu.common.vo.SessionVO;                                                                                   	
import com.msu.prj.com.dao.COM_P01_DAO;                                                                             
import com.msu.prj.com.service.COM_P01_Service;                                                                        
import egovframework.rte.cmmn.ria.nexacroplatform.NexacroPlatformConstant;                                                   
import egovframework.rte.cmmn.ria.nexacroplatform.map.DataSetMap;                                                            
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;                                                                   
                                                                                                                             
@Service("COM_P01_Service")                                                                               
public class COM_P01_ServiceImpl extends EgovAbstractServiceImpl implements COM_P01_Service {                  
    protected Log log = LogFactory.getLog(this.getClass()); 	                                                                
                                                                                                                             
    /** COM_P01_DAO */                                                                                             
    @Resource(name="COM_P01_DAO")                                                                      
    private COM_P01_DAO com_P01_DAO;                                                                     
                                                                                                                             
    /**                                                                                                             			
     * 부서리스트 조회(retrieve_P01_)                                                         	
     * @param input                                                                                                 			
     * @return                                                                                                      			
     * @throws Exception                                                                                           			
     */                                                                                                             			
    public void retrieve_P01( Map<String, Object> inVar, Map<String, DataSetMap> inDataset,                     
            Map<String, Object> outVar, Map<String, DataSetMap> outDataset, SessionVO sessionVO) throws Exception {          
	                                                                       
    	String strMenuId = inVar.get("GBV_MENUID").toString(); 
    	
        DataSetMap dsMap = (DataSetMap) inDataset.get("ds_input");                                     
        Map<String, Object> map = (Map<String, Object>)dsMap.get(0); 
        map.put("MENU_ID", strMenuId); 
        map.put("USER_ID", sessionVO.getUserId().toString());   
        List<Map> records = com_P01_DAO.retrieve_P01(map);                                            
		                                                                                                                        
        DataSetMap dsOut = new DataSetMap();                                                                                 
        dsOut.setRowMaps(records);                                                                                           
        outDataset.put("dsMaster", dsOut);                                                             
		                                                                                                                        
        return;                                                                                                              
    }                                                                                                                                                                                                                             			
}                                                                                                                            
